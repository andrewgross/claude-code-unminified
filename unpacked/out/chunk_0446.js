/* chunk:446 bytes:[10634280, 10701345) size:67065 source:unpacked-cli.js */
var dOB = E((TF3, mOB) => {
    var U0 = RG1(),
        x38 = dRB(),
        ROB = lRB(),
        v38 = ZOB(),
        b38 = HOB(),
        OOB = rM(),
        f38 = uq0(),
        h38 = mq0(),
        TOB = dq0(),
        oM = MOB(),
        QW = bv1(),
        g38 = vv1(),
        Vd = jv(),
        A1 = Vd.TAG_NAMES,
        gB = Vd.NAMESPACES,
        bOB = Vd.ATTRS,
        u38 = {
            scriptingEnabled: !0,
            sourceCodeLocationInfo: !1,
            onParseError: null,
            treeAdapter: f38
        },
        m38 = {
            [A1.TR]: "IN_ROW_MODE",
            [A1.TBODY]: "IN_TABLE_BODY_MODE",
            [A1.THEAD]: "IN_TABLE_BODY_MODE",
            [A1.TFOOT]: "IN_TABLE_BODY_MODE",
            [A1.CAPTION]: "IN_CAPTION_MODE",
            [A1.COLGROUP]: "IN_COLUMN_GROUP_MODE",
            [A1.TABLE]: "IN_TABLE_MODE",
            [A1.BODY]: "IN_BODY_MODE",
            [A1.FRAMESET]: "IN_FRAMESET_MODE"
        },
        d38 = {
            [A1.CAPTION]: "IN_TABLE_MODE",
            [A1.COLGROUP]: "IN_TABLE_MODE",
            [A1.TBODY]: "IN_TABLE_MODE",
            [A1.TFOOT]: "IN_TABLE_MODE",
            [A1.THEAD]: "IN_TABLE_MODE",
            [A1.COL]: "IN_COLUMN_GROUP_MODE",
            [A1.TR]: "IN_TABLE_BODY_MODE",
            [A1.TD]: "IN_ROW_MODE",
            [A1.TH]: "IN_ROW_MODE"
        },
        pq0 = {
            ["INITIAL_MODE"]: {
                [U0.CHARACTER_TOKEN]: TG1,
                [U0.NULL_CHARACTER_TOKEN]: TG1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: h6,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: r38,
                [U0.START_TAG_TOKEN]: TG1,
                [U0.END_TAG_TOKEN]: TG1,
                [U0.EOF_TOKEN]: TG1
            },
            ["BEFORE_HTML_MODE"]: {
                [U0.CHARACTER_TOKEN]: SG1,
                [U0.NULL_CHARACTER_TOKEN]: SG1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: h6,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: o38,
                [U0.END_TAG_TOKEN]: t38,
                [U0.EOF_TOKEN]: SG1
            },
            ["BEFORE_HEAD_MODE"]: {
                [U0.CHARACTER_TOKEN]: jG1,
                [U0.NULL_CHARACTER_TOKEN]: jG1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: h6,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: mv1,
                [U0.START_TAG_TOKEN]: e38,
                [U0.END_TAG_TOKEN]: A78,
                [U0.EOF_TOKEN]: jG1
            },
            ["IN_HEAD_MODE"]: {
                [U0.CHARACTER_TOKEN]: kG1,
                [U0.NULL_CHARACTER_TOKEN]: kG1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: mv1,
                [U0.START_TAG_TOKEN]: kI,
                [U0.END_TAG_TOKEN]: Cd,
                [U0.EOF_TOKEN]: kG1
            },
            ["IN_HEAD_NO_SCRIPT_MODE"]: {
                [U0.CHARACTER_TOKEN]: yG1,
                [U0.NULL_CHARACTER_TOKEN]: yG1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: mv1,
                [U0.START_TAG_TOKEN]: B78,
                [U0.END_TAG_TOKEN]: Q78,
                [U0.EOF_TOKEN]: yG1
            },
            ["AFTER_HEAD_MODE"]: {
                [U0.CHARACTER_TOKEN]: _G1,
                [U0.NULL_CHARACTER_TOKEN]: _G1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: mv1,
                [U0.START_TAG_TOKEN]: Z78,
                [U0.END_TAG_TOKEN]: D78,
                [U0.EOF_TOKEN]: _G1
            },
            ["IN_BODY_MODE"]: {
                [U0.CHARACTER_TOKEN]: dv1,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: FC,
                [U0.END_TAG_TOKEN]: iq0,
                [U0.EOF_TOKEN]: zS
            },
            ["TEXT_MODE"]: {
                [U0.CHARACTER_TOKEN]: GC,
                [U0.NULL_CHARACTER_TOKEN]: GC,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: h6,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: h6,
                [U0.END_TAG_TOKEN]: v78,
                [U0.EOF_TOKEN]: b78
            },
            ["IN_TABLE_MODE"]: {
                [U0.CHARACTER_TOKEN]: ES,
                [U0.NULL_CHARACTER_TOKEN]: ES,
                [U0.WHITESPACE_CHARACTER_TOKEN]: ES,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: nq0,
                [U0.END_TAG_TOKEN]: aq0,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_TABLE_TEXT_MODE"]: {
                [U0.CHARACTER_TOKEN]: i78,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: p78,
                [U0.COMMENT_TOKEN]: PG1,
                [U0.DOCTYPE_TOKEN]: PG1,
                [U0.START_TAG_TOKEN]: PG1,
                [U0.END_TAG_TOKEN]: PG1,
                [U0.EOF_TOKEN]: PG1
            },
            ["IN_CAPTION_MODE"]: {
                [U0.CHARACTER_TOKEN]: dv1,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: n78,
                [U0.END_TAG_TOKEN]: a78,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_COLUMN_GROUP_MODE"]: {
                [U0.CHARACTER_TOKEN]: lv1,
                [U0.NULL_CHARACTER_TOKEN]: lv1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: s78,
                [U0.END_TAG_TOKEN]: r78,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_TABLE_BODY_MODE"]: {
                [U0.CHARACTER_TOKEN]: ES,
                [U0.NULL_CHARACTER_TOKEN]: ES,
                [U0.WHITESPACE_CHARACTER_TOKEN]: ES,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: o78,
                [U0.END_TAG_TOKEN]: t78,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_ROW_MODE"]: {
                [U0.CHARACTER_TOKEN]: ES,
                [U0.NULL_CHARACTER_TOKEN]: ES,
                [U0.WHITESPACE_CHARACTER_TOKEN]: ES,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: e78,
                [U0.END_TAG_TOKEN]: AZ8,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_CELL_MODE"]: {
                [U0.CHARACTER_TOKEN]: dv1,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: BZ8,
                [U0.END_TAG_TOKEN]: QZ8,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_SELECT_MODE"]: {
                [U0.CHARACTER_TOKEN]: GC,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: hOB,
                [U0.END_TAG_TOKEN]: gOB,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_SELECT_IN_TABLE_MODE"]: {
                [U0.CHARACTER_TOKEN]: GC,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: ZZ8,
                [U0.END_TAG_TOKEN]: DZ8,
                [U0.EOF_TOKEN]: zS
            },
            ["IN_TEMPLATE_MODE"]: {
                [U0.CHARACTER_TOKEN]: dv1,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: GZ8,
                [U0.END_TAG_TOKEN]: FZ8,
                [U0.EOF_TOKEN]: uOB
            },
            ["AFTER_BODY_MODE"]: {
                [U0.CHARACTER_TOKEN]: pv1,
                [U0.NULL_CHARACTER_TOKEN]: pv1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: s38,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: IZ8,
                [U0.END_TAG_TOKEN]: YZ8,
                [U0.EOF_TOKEN]: OG1
            },
            ["IN_FRAMESET_MODE"]: {
                [U0.CHARACTER_TOKEN]: h6,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: WZ8,
                [U0.END_TAG_TOKEN]: JZ8,
                [U0.EOF_TOKEN]: OG1
            },
            ["AFTER_FRAMESET_MODE"]: {
                [U0.CHARACTER_TOKEN]: h6,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: GC,
                [U0.COMMENT_TOKEN]: gF,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: XZ8,
                [U0.END_TAG_TOKEN]: VZ8,
                [U0.EOF_TOKEN]: OG1
            },
            ["AFTER_AFTER_BODY_MODE"]: {
                [U0.CHARACTER_TOKEN]: cv1,
                [U0.NULL_CHARACTER_TOKEN]: cv1,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: POB,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: CZ8,
                [U0.END_TAG_TOKEN]: cv1,
                [U0.EOF_TOKEN]: OG1
            },
            ["AFTER_AFTER_FRAMESET_MODE"]: {
                [U0.CHARACTER_TOKEN]: h6,
                [U0.NULL_CHARACTER_TOKEN]: h6,
                [U0.WHITESPACE_CHARACTER_TOKEN]: Xd,
                [U0.COMMENT_TOKEN]: POB,
                [U0.DOCTYPE_TOKEN]: h6,
                [U0.START_TAG_TOKEN]: KZ8,
                [U0.END_TAG_TOKEN]: h6,
                [U0.EOF_TOKEN]: OG1
            }
        };
    class fOB {
        constructor(A) {
            if (this.options = h38(u38, A), this.treeAdapter = this.options.treeAdapter, this.pendingScript = null, this.options.sourceCodeLocationInfo) OOB.install(this, v38);
            if (this.options.onParseError) OOB.install(this, b38, {
                onParseError: this.options.onParseError
            })
        }
        parse(A) {
            let B = this.treeAdapter.createDocument();
            return this._bootstrap(B, null), this.tokenizer.write(A, !0), this._runParsingLoop(null), B
        }
        parseFragment(A, B) {
            if (!B) B = this.treeAdapter.createElement(A1.TEMPLATE, gB.HTML, []);
            let Q = this.treeAdapter.createElement("documentmock", gB.HTML, []);
            if (this._bootstrap(Q, B), this.treeAdapter.getTagName(B) === A1.TEMPLATE) this._pushTmplInsertionMode("IN_TEMPLATE_MODE");
            this._initTokenizerForFragmentParsing(), this._insertFakeRootElement(), this._resetInsertionMode(), this._findFormInFragmentContext(), this.tokenizer.write(A, !0), this._runParsingLoop(null);
            let Z = this.treeAdapter.getFirstChild(Q),
                D = this.treeAdapter.createDocumentFragment();
            return this._adoptNodes(Z, D), D
        }
        _bootstrap(A, B) {
            this.tokenizer = new U0(this.options), this.stopped = !1, this.insertionMode = "INITIAL_MODE", this.originalInsertionMode = "", this.document = A, this.fragmentContext = B, this.headElement = null, this.formElement = null, this.openElements = new x38(this.document, this.treeAdapter), this.activeFormattingElements = new ROB(this.treeAdapter), this.tmplInsertionModeStack = [], this.tmplInsertionModeStackTop = -1, this.currentTmplInsertionMode = null, this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1
        }
        _err() {}
        _runParsingLoop(A) {
            while (!this.stopped) {
                this._setupTokenizerCDATAMode();
                let B = this.tokenizer.getNextToken();
                if (B.type === U0.HIBERNATION_TOKEN) break;
                if (this.skipNextNewLine) {
                    if (this.skipNextNewLine = !1, B.type === U0.WHITESPACE_CHARACTER_TOKEN && B.chars[0] === `
`) {
                        if (B.chars.length === 1) continue;
                        B.chars = B.chars.substr(1)
                    }
                }
                if (this._processInputToken(B), A && this.pendingScript) break
            }
        }
        runParsingLoopForCurrentChunk(A, B) {
            if (this._runParsingLoop(B), B && this.pendingScript) {
                let Q = this.pendingScript;
                this.pendingScript = null, B(Q);
                return
            }
            if (A) A()
        }
        _setupTokenizerCDATAMode() {
            let A = this._getAdjustedCurrentElement();
            this.tokenizer.allowCDATA = A && A !== this.document && this.treeAdapter.getNamespaceURI(A) !== gB.HTML && !this._isIntegrationPoint(A)
        }
        _switchToTextParsing(A, B) {
            this._insertElement(A, gB.HTML), this.tokenizer.state = B, this.originalInsertionMode = this.insertionMode, this.insertionMode = "TEXT_MODE"
        }
        switchToPlaintextParsing() {
            this.insertionMode = "TEXT_MODE", this.originalInsertionMode = "IN_BODY_MODE", this.tokenizer.state = U0.MODE.PLAINTEXT
        }
        _getAdjustedCurrentElement() {
            return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current
        }
        _findFormInFragmentContext() {
            let A = this.fragmentContext;
            do {
                if (this.treeAdapter.getTagName(A) === A1.FORM) {
                    this.formElement = A;
                    break
                }
                A = this.treeAdapter.getParentNode(A)
            } while (A)
        }
        _initTokenizerForFragmentParsing() {
            if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === gB.HTML) {
                let A = this.treeAdapter.getTagName(this.fragmentContext);
                if (A === A1.TITLE || A === A1.TEXTAREA) this.tokenizer.state = U0.MODE.RCDATA;
                else if (A === A1.STYLE || A === A1.XMP || A === A1.IFRAME || A === A1.NOEMBED || A === A1.NOFRAMES || A === A1.NOSCRIPT) this.tokenizer.state = U0.MODE.RAWTEXT;
                else if (A === A1.SCRIPT) this.tokenizer.state = U0.MODE.SCRIPT_DATA;
                else if (A === A1.PLAINTEXT) this.tokenizer.state = U0.MODE.PLAINTEXT
            }
        }
        _setDocumentType(A) {
            let B = A.name || "",
                Q = A.publicId || "",
                Z = A.systemId || "";
            this.treeAdapter.setDocumentType(this.document, B, Q, Z)
        }
        _attachElementToTree(A) {
            if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(A);
            else {
                let B = this.openElements.currentTmplContent || this.openElements.current;
                this.treeAdapter.appendChild(B, A)
            }
        }
        _appendElement(A, B) {
            let Q = this.treeAdapter.createElement(A.tagName, B, A.attrs);
            this._attachElementToTree(Q)
        }
        _insertElement(A, B) {
            let Q = this.treeAdapter.createElement(A.tagName, B, A.attrs);
            this._attachElementToTree(Q), this.openElements.push(Q)
        }
        _insertFakeElement(A) {
            let B = this.treeAdapter.createElement(A, gB.HTML, []);
            this._attachElementToTree(B), this.openElements.push(B)
        }
        _insertTemplate(A) {
            let B = this.treeAdapter.createElement(A.tagName, gB.HTML, A.attrs),
                Q = this.treeAdapter.createDocumentFragment();
            this.treeAdapter.setTemplateContent(B, Q), this._attachElementToTree(B), this.openElements.push(B)
        }
        _insertFakeRootElement() {
            let A = this.treeAdapter.createElement(A1.HTML, gB.HTML, []);
            this.treeAdapter.appendChild(this.openElements.current, A), this.openElements.push(A)
        }
        _appendCommentNode(A, B) {
            let Q = this.treeAdapter.createCommentNode(A.data);
            this.treeAdapter.appendChild(B, Q)
        }
        _insertCharacters(A) {
            if (this._shouldFosterParentOnInsertion()) this._fosterParentText(A.chars);
            else {
                let B = this.openElements.currentTmplContent || this.openElements.current;
                this.treeAdapter.insertText(B, A.chars)
            }
        }
        _adoptNodes(A, B) {
            for (let Q = this.treeAdapter.getFirstChild(A); Q; Q = this.treeAdapter.getFirstChild(A)) this.treeAdapter.detachNode(Q), this.treeAdapter.appendChild(B, Q)
        }
        _shouldProcessTokenInForeignContent(A) {
            let B = this._getAdjustedCurrentElement();
            if (!B || B === this.document) return !1;
            let Q = this.treeAdapter.getNamespaceURI(B);
            if (Q === gB.HTML) return !1;
            if (this.treeAdapter.getTagName(B) === A1.ANNOTATION_XML && Q === gB.MATHML && A.type === U0.START_TAG_TOKEN && A.tagName === A1.SVG) return !1;
            let Z = A.type === U0.CHARACTER_TOKEN || A.type === U0.NULL_CHARACTER_TOKEN || A.type === U0.WHITESPACE_CHARACTER_TOKEN;
            if ((A.type === U0.START_TAG_TOKEN && A.tagName !== A1.MGLYPH && A.tagName !== A1.MALIGNMARK || Z) && this._isIntegrationPoint(B, gB.MATHML)) return !1;
            if ((A.type === U0.START_TAG_TOKEN || Z) && this._isIntegrationPoint(B, gB.HTML)) return !1;
            return A.type !== U0.EOF_TOKEN
        }
        _processToken(A) {
            pq0[this.insertionMode][A.type](this, A)
        }
        _processTokenInBodyMode(A) {
            pq0.IN_BODY_MODE[A.type](this, A)
        }
        _processTokenInForeignContent(A) {
            if (A.type === U0.CHARACTER_TOKEN) zZ8(this, A);
            else if (A.type === U0.NULL_CHARACTER_TOKEN) HZ8(this, A);
            else if (A.type === U0.WHITESPACE_CHARACTER_TOKEN) GC(this, A);
            else if (A.type === U0.COMMENT_TOKEN) gF(this, A);
            else if (A.type === U0.START_TAG_TOKEN) EZ8(this, A);
            else if (A.type === U0.END_TAG_TOKEN) UZ8(this, A)
        }
        _processInputToken(A) {
            if (this._shouldProcessTokenInForeignContent(A)) this._processTokenInForeignContent(A);
            else this._processToken(A);
            if (A.type === U0.START_TAG_TOKEN && A.selfClosing && !A.ackSelfClosing) this._err(QW.nonVoidHtmlElementStartTagWithTrailingSolidus)
        }
        _isIntegrationPoint(A, B) {
            let Q = this.treeAdapter.getTagName(A),
                Z = this.treeAdapter.getNamespaceURI(A),
                D = this.treeAdapter.getAttrList(A);
            return oM.isIntegrationPoint(Q, Z, D, B)
        }
        _reconstructActiveFormattingElements() {
            let A = this.activeFormattingElements.length;
            if (A) {
                let B = A,
                    Q = null;
                do
                    if (B--, Q = this.activeFormattingElements.entries[B], Q.type === ROB.MARKER_ENTRY || this.openElements.contains(Q.element)) {
                        B++;
                        break
                    } while (B > 0);
                for (let Z = B; Z < A; Z++) Q = this.activeFormattingElements.entries[Z], this._insertElement(Q.token, this.treeAdapter.getNamespaceURI(Q.element)), Q.element = this.openElements.current
            }
        }
        _closeTableCell() {
            this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = "IN_ROW_MODE"
        }
        _closePElement() {
            this.openElements.generateImpliedEndTagsWithExclusion(A1.P), this.openElements.popUntilTagNamePopped(A1.P)
        }
        _resetInsertionMode() {
            for (let A = this.openElements.stackTop, B = !1; A >= 0; A--) {
                let Q = this.openElements.items[A];
                if (A === 0) {
                    if (B = !0, this.fragmentContext) Q = this.fragmentContext
                }
                let Z = this.treeAdapter.getTagName(Q),
                    D = m38[Z];
                if (D) {
                    this.insertionMode = D;
                    break
                } else if (!B && (Z === A1.TD || Z === A1.TH)) {
                    this.insertionMode = "IN_CELL_MODE";
                    break
                } else if (!B && Z === A1.HEAD) {
                    this.insertionMode = "IN_HEAD_MODE";
                    break
                } else if (Z === A1.SELECT) {
                    this._resetInsertionModeForSelect(A);
                    break
                } else if (Z === A1.TEMPLATE) {
                    this.insertionMode = this.currentTmplInsertionMode;
                    break
                } else if (Z === A1.HTML) {
                    this.insertionMode = this.headElement ? "AFTER_HEAD_MODE" : "BEFORE_HEAD_MODE";
                    break
                } else if (B) {
                    this.insertionMode = "IN_BODY_MODE";
                    break
                }
            }
        }
        _resetInsertionModeForSelect(A) {
            if (A > 0)
                for (let B = A - 1; B > 0; B--) {
                    let Q = this.openElements.items[B],
                        Z = this.treeAdapter.getTagName(Q);
                    if (Z === A1.TEMPLATE) break;
                    else if (Z === A1.TABLE) {
                        this.insertionMode = "IN_SELECT_IN_TABLE_MODE";
                        return
                    }
                }
            this.insertionMode = "IN_SELECT_MODE"
        }
        _pushTmplInsertionMode(A) {
            this.tmplInsertionModeStack.push(A), this.tmplInsertionModeStackTop++, this.currentTmplInsertionMode = A
        }
        _popTmplInsertionMode() {
            this.tmplInsertionModeStack.pop(), this.tmplInsertionModeStackTop--, this.currentTmplInsertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStackTop]
        }
        _isElementCausesFosterParenting(A) {
            let B = this.treeAdapter.getTagName(A);
            return B === A1.TABLE || B === A1.TBODY || B === A1.TFOOT || B === A1.THEAD || B === A1.TR
        }
        _shouldFosterParentOnInsertion() {
            return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.current)
        }
        _findFosterParentingLocation() {
            let A = {
                parent: null,
                beforeElement: null
            };
            for (let B = this.openElements.stackTop; B >= 0; B--) {
                let Q = this.openElements.items[B],
                    Z = this.treeAdapter.getTagName(Q),
                    D = this.treeAdapter.getNamespaceURI(Q);
                if (Z === A1.TEMPLATE && D === gB.HTML) {
                    A.parent = this.treeAdapter.getTemplateContent(Q);
                    break
                } else if (Z === A1.TABLE) {
                    if (A.parent = this.treeAdapter.getParentNode(Q), A.parent) A.beforeElement = Q;
                    else A.parent = this.openElements.items[B - 1];
                    break
                }
            }
            if (!A.parent) A.parent = this.openElements.items[0];
            return A
        }
        _fosterParentElement(A) {
            let B = this._findFosterParentingLocation();
            if (B.beforeElement) this.treeAdapter.insertBefore(B.parent, A, B.beforeElement);
            else this.treeAdapter.appendChild(B.parent, A)
        }
        _fosterParentText(A) {
            let B = this._findFosterParentingLocation();
            if (B.beforeElement) this.treeAdapter.insertTextBefore(B.parent, A, B.beforeElement);
            else this.treeAdapter.insertText(B.parent, A)
        }
        _isSpecialElement(A) {
            let B = this.treeAdapter.getTagName(A),
                Q = this.treeAdapter.getNamespaceURI(A);
            return Vd.SPECIAL_ELEMENTS[Q][B]
        }
    }
    mOB.exports = fOB;

    function c38(A, B) {
        let Q = A.activeFormattingElements.getElementEntryInScopeWithTagName(B.tagName);
        if (Q) {
            if (!A.openElements.contains(Q.element)) A.activeFormattingElements.removeEntry(Q), Q = null;
            else if (!A.openElements.hasInScope(B.tagName)) Q = null
        } else h$(A, B);
        return Q
    }

    function l38(A, B) {
        let Q = null;
        for (let Z = A.openElements.stackTop; Z >= 0; Z--) {
            let D = A.openElements.items[Z];
            if (D === B.element) break;
            if (A._isSpecialElement(D)) Q = D
        }
        if (!Q) A.openElements.popUntilElementPopped(B.element), A.activeFormattingElements.removeEntry(B);
        return Q
    }

    function p38(A, B, Q) {
        let Z = B,
            D = A.openElements.getCommonAncestor(B);
        for (let G = 0, F = D; F !== Q; G++, F = D) {
            D = A.openElements.getCommonAncestor(F);
            let I = A.activeFormattingElements.getElementEntry(F),
                Y = I && G >= 3;
            if (!I || Y) {
                if (Y) A.activeFormattingElements.removeEntry(I);
                A.openElements.remove(F)
            } else {
                if (F = i38(A, I), Z === B) A.activeFormattingElements.bookmark = I;
                A.treeAdapter.detachNode(Z), A.treeAdapter.appendChild(F, Z), Z = F
            }
        }
        return Z
    }

    function i38(A, B) {
        let Q = A.treeAdapter.getNamespaceURI(B.element),
            Z = A.treeAdapter.createElement(B.token.tagName, Q, B.token.attrs);
        return A.openElements.replace(B.element, Z), B.element = Z, Z
    }

    function n38(A, B, Q) {
        if (A._isElementCausesFosterParenting(B)) A._fosterParentElement(Q);
        else {
            let Z = A.treeAdapter.getTagName(B),
                D = A.treeAdapter.getNamespaceURI(B);
            if (Z === A1.TEMPLATE && D === gB.HTML) B = A.treeAdapter.getTemplateContent(B);
            A.treeAdapter.appendChild(B, Q)
        }
    }

    function a38(A, B, Q) {
        let Z = A.treeAdapter.getNamespaceURI(Q.element),
            D = Q.token,
            G = A.treeAdapter.createElement(D.tagName, Z, D.attrs);
        A._adoptNodes(B, G), A.treeAdapter.appendChild(B, G), A.activeFormattingElements.insertElementAfterBookmark(G, Q.token), A.activeFormattingElements.removeEntry(Q), A.openElements.remove(Q.element), A.openElements.insertAfter(B, G)
    }

    function yv(A, B) {
        let Q;
        for (let Z = 0; Z < 8; Z++) {
            if (Q = c38(A, B, Q), !Q) break;
            let D = l38(A, Q);
            if (!D) break;
            A.activeFormattingElements.bookmark = Q;
            let G = p38(A, D, Q.element),
                F = A.openElements.getCommonAncestor(Q.element);
            A.treeAdapter.detachNode(G), n38(A, F, G), a38(A, D, Q)
        }
    }

    function h6() {}

    function mv1(A) {
        A._err(QW.misplacedDoctype)
    }

    function gF(A, B) {
        A._appendCommentNode(B, A.openElements.currentTmplContent || A.openElements.current)
    }

    function s38(A, B) {
        A._appendCommentNode(B, A.openElements.items[0])
    }

    function POB(A, B) {
        A._appendCommentNode(B, A.document)
    }

    function GC(A, B) {
        A._insertCharacters(B)
    }

    function OG1(A) {
        A.stopped = !0
    }

    function r38(A, B) {
        A._setDocumentType(B);
        let Q = B.forceQuirks ? Vd.DOCUMENT_MODE.QUIRKS : TOB.getDocumentMode(B);
        if (!TOB.isConforming(B)) A._err(QW.nonConformingDoctype);
        A.treeAdapter.setDocumentMode(A.document, Q), A.insertionMode = "BEFORE_HTML_MODE"
    }

    function TG1(A, B) {
        A._err(QW.missingDoctype, {
            beforeToken: !0
        }), A.treeAdapter.setDocumentMode(A.document, Vd.DOCUMENT_MODE.QUIRKS), A.insertionMode = "BEFORE_HTML_MODE", A._processToken(B)
    }

    function o38(A, B) {
        if (B.tagName === A1.HTML) A._insertElement(B, gB.HTML), A.insertionMode = "BEFORE_HEAD_MODE";
        else SG1(A, B)
    }

    function t38(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML || Q === A1.HEAD || Q === A1.BODY || Q === A1.BR) SG1(A, B)
    }

    function SG1(A, B) {
        A._insertFakeRootElement(), A.insertionMode = "BEFORE_HEAD_MODE", A._processToken(B)
    }

    function e38(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.HEAD) A._insertElement(B, gB.HTML), A.headElement = A.openElements.current, A.insertionMode = "IN_HEAD_MODE";
        else jG1(A, B)
    }

    function A78(A, B) {
        let Q = B.tagName;
        if (Q === A1.HEAD || Q === A1.BODY || Q === A1.HTML || Q === A1.BR) jG1(A, B);
        else A._err(QW.endTagWithoutMatchingOpenElement)
    }

    function jG1(A, B) {
        A._insertFakeElement(A1.HEAD), A.headElement = A.openElements.current, A.insertionMode = "IN_HEAD_MODE", A._processToken(B)
    }

    function kI(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.BASE || Q === A1.BASEFONT || Q === A1.BGSOUND || Q === A1.LINK || Q === A1.META) A._appendElement(B, gB.HTML), B.ackSelfClosing = !0;
        else if (Q === A1.TITLE) A._switchToTextParsing(B, U0.MODE.RCDATA);
        else if (Q === A1.NOSCRIPT)
            if (A.options.scriptingEnabled) A._switchToTextParsing(B, U0.MODE.RAWTEXT);
            else A._insertElement(B, gB.HTML), A.insertionMode = "IN_HEAD_NO_SCRIPT_MODE";
        else if (Q === A1.NOFRAMES || Q === A1.STYLE) A._switchToTextParsing(B, U0.MODE.RAWTEXT);
        else if (Q === A1.SCRIPT) A._switchToTextParsing(B, U0.MODE.SCRIPT_DATA);
        else if (Q === A1.TEMPLATE) A._insertTemplate(B, gB.HTML), A.activeFormattingElements.insertMarker(), A.framesetOk = !1, A.insertionMode = "IN_TEMPLATE_MODE", A._pushTmplInsertionMode("IN_TEMPLATE_MODE");
        else if (Q === A1.HEAD) A._err(QW.misplacedStartTagForHeadElement);
        else kG1(A, B)
    }

    function Cd(A, B) {
        let Q = B.tagName;
        if (Q === A1.HEAD) A.openElements.pop(), A.insertionMode = "AFTER_HEAD_MODE";
        else if (Q === A1.BODY || Q === A1.BR || Q === A1.HTML) kG1(A, B);
        else if (Q === A1.TEMPLATE)
            if (A.openElements.tmplCount > 0) {
                if (A.openElements.generateImpliedEndTagsThoroughly(), A.openElements.currentTagName !== A1.TEMPLATE) A._err(QW.closingOfElementWithOpenChildElements);
                A.openElements.popUntilTagNamePopped(A1.TEMPLATE), A.activeFormattingElements.clearToLastMarker(), A._popTmplInsertionMode(), A._resetInsertionMode()
            } else A._err(QW.endTagWithoutMatchingOpenElement);
        else A._err(QW.endTagWithoutMatchingOpenElement)
    }

    function kG1(A, B) {
        A.openElements.pop(), A.insertionMode = "AFTER_HEAD_MODE", A._processToken(B)
    }

    function B78(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.BASEFONT || Q === A1.BGSOUND || Q === A1.HEAD || Q === A1.LINK || Q === A1.META || Q === A1.NOFRAMES || Q === A1.STYLE) kI(A, B);
        else if (Q === A1.NOSCRIPT) A._err(QW.nestedNoscriptInHead);
        else yG1(A, B)
    }

    function Q78(A, B) {
        let Q = B.tagName;
        if (Q === A1.NOSCRIPT) A.openElements.pop(), A.insertionMode = "IN_HEAD_MODE";
        else if (Q === A1.BR) yG1(A, B);
        else A._err(QW.endTagWithoutMatchingOpenElement)
    }

    function yG1(A, B) {
        let Q = B.type === U0.EOF_TOKEN ? QW.openElementsLeftAfterEof : QW.disallowedContentInNoscriptInHead;
        A._err(Q), A.openElements.pop(), A.insertionMode = "IN_HEAD_MODE", A._processToken(B)
    }

    function Z78(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.BODY) A._insertElement(B, gB.HTML), A.framesetOk = !1, A.insertionMode = "IN_BODY_MODE";
        else if (Q === A1.FRAMESET) A._insertElement(B, gB.HTML), A.insertionMode = "IN_FRAMESET_MODE";
        else if (Q === A1.BASE || Q === A1.BASEFONT || Q === A1.BGSOUND || Q === A1.LINK || Q === A1.META || Q === A1.NOFRAMES || Q === A1.SCRIPT || Q === A1.STYLE || Q === A1.TEMPLATE || Q === A1.TITLE) A._err(QW.abandonedHeadElementChild), A.openElements.push(A.headElement), kI(A, B), A.openElements.remove(A.headElement);
        else if (Q === A1.HEAD) A._err(QW.misplacedStartTagForHeadElement);
        else _G1(A, B)
    }

    function D78(A, B) {
        let Q = B.tagName;
        if (Q === A1.BODY || Q === A1.HTML || Q === A1.BR) _G1(A, B);
        else if (Q === A1.TEMPLATE) Cd(A, B);
        else A._err(QW.endTagWithoutMatchingOpenElement)
    }

    function _G1(A, B) {
        A._insertFakeElement(A1.BODY), A.insertionMode = "IN_BODY_MODE", A._processToken(B)
    }

    function Xd(A, B) {
        A._reconstructActiveFormattingElements(), A._insertCharacters(B)
    }

    function dv1(A, B) {
        A._reconstructActiveFormattingElements(), A._insertCharacters(B), A.framesetOk = !1
    }

    function G78(A, B) {
        if (A.openElements.tmplCount === 0) A.treeAdapter.adoptAttributes(A.openElements.items[0], B.attrs)
    }

    function F78(A, B) {
        let Q = A.openElements.tryPeekProperlyNestedBodyElement();
        if (Q && A.openElements.tmplCount === 0) A.framesetOk = !1, A.treeAdapter.adoptAttributes(Q, B.attrs)
    }

    function I78(A, B) {
        let Q = A.openElements.tryPeekProperlyNestedBodyElement();
        if (A.framesetOk && Q) A.treeAdapter.detachNode(Q), A.openElements.popAllUpToHtmlElement(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_FRAMESET_MODE"
    }

    function HS(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML)
    }

    function Y78(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        let Q = A.openElements.currentTagName;
        if (Q === A1.H1 || Q === A1.H2 || Q === A1.H3 || Q === A1.H4 || Q === A1.H5 || Q === A1.H6) A.openElements.pop();
        A._insertElement(B, gB.HTML)
    }

    function SOB(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML), A.skipNextNewLine = !0, A.framesetOk = !1
    }

    function W78(A, B) {
        let Q = A.openElements.tmplCount > 0;
        if (!A.formElement || Q) {
            if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
            if (A._insertElement(B, gB.HTML), !Q) A.formElement = A.openElements.current
        }
    }

    function J78(A, B) {
        A.framesetOk = !1;
        let Q = B.tagName;
        for (let Z = A.openElements.stackTop; Z >= 0; Z--) {
            let D = A.openElements.items[Z],
                G = A.treeAdapter.getTagName(D),
                F = null;
            if (Q === A1.LI && G === A1.LI) F = A1.LI;
            else if ((Q === A1.DD || Q === A1.DT) && (G === A1.DD || G === A1.DT)) F = G;
            if (F) {
                A.openElements.generateImpliedEndTagsWithExclusion(F), A.openElements.popUntilTagNamePopped(F);
                break
            }
            if (G !== A1.ADDRESS && G !== A1.DIV && G !== A1.P && A._isSpecialElement(D)) break
        }
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML)
    }

    function X78(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML), A.tokenizer.state = U0.MODE.PLAINTEXT
    }

    function V78(A, B) {
        if (A.openElements.hasInScope(A1.BUTTON)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(A1.BUTTON);
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML), A.framesetOk = !1
    }

    function C78(A, B) {
        let Q = A.activeFormattingElements.getElementEntryInScopeWithTagName(A1.A);
        if (Q) yv(A, B), A.openElements.remove(Q.element), A.activeFormattingElements.removeEntry(Q);
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
    }

    function B01(A, B) {
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
    }

    function K78(A, B) {
        if (A._reconstructActiveFormattingElements(), A.openElements.hasInScope(A1.NOBR)) yv(A, B), A._reconstructActiveFormattingElements();
        A._insertElement(B, gB.HTML), A.activeFormattingElements.pushElement(A.openElements.current, B)
    }

    function jOB(A, B) {
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML), A.activeFormattingElements.insertMarker(), A.framesetOk = !1
    }

    function H78(A, B) {
        if (A.treeAdapter.getDocumentMode(A.document) !== Vd.DOCUMENT_MODE.QUIRKS && A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML), A.framesetOk = !1, A.insertionMode = "IN_TABLE_MODE"
    }

    function Q01(A, B) {
        A._reconstructActiveFormattingElements(), A._appendElement(B, gB.HTML), A.framesetOk = !1, B.ackSelfClosing = !0
    }

    function z78(A, B) {
        A._reconstructActiveFormattingElements(), A._appendElement(B, gB.HTML);
        let Q = U0.getTokenAttr(B, bOB.TYPE);
        if (!Q || Q.toLowerCase() !== "hidden") A.framesetOk = !1;
        B.ackSelfClosing = !0
    }

    function kOB(A, B) {
        A._appendElement(B, gB.HTML), B.ackSelfClosing = !0
    }

    function E78(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._appendElement(B, gB.HTML), A.framesetOk = !1, A.ackSelfClosing = !0
    }

    function U78(A, B) {
        B.tagName = A1.IMG, Q01(A, B)
    }

    function w78(A, B) {
        A._insertElement(B, gB.HTML), A.skipNextNewLine = !0, A.tokenizer.state = U0.MODE.RCDATA, A.originalInsertionMode = A.insertionMode, A.framesetOk = !1, A.insertionMode = "TEXT_MODE"
    }

    function $78(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._reconstructActiveFormattingElements(), A.framesetOk = !1, A._switchToTextParsing(B, U0.MODE.RAWTEXT)
    }

    function q78(A, B) {
        A.framesetOk = !1, A._switchToTextParsing(B, U0.MODE.RAWTEXT)
    }

    function yOB(A, B) {
        A._switchToTextParsing(B, U0.MODE.RAWTEXT)
    }

    function N78(A, B) {
        if (A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML), A.framesetOk = !1, A.insertionMode === "IN_TABLE_MODE" || A.insertionMode === "IN_CAPTION_MODE" || A.insertionMode === "IN_TABLE_BODY_MODE" || A.insertionMode === "IN_ROW_MODE" || A.insertionMode === "IN_CELL_MODE") A.insertionMode = "IN_SELECT_IN_TABLE_MODE";
        else A.insertionMode = "IN_SELECT_MODE"
    }

    function _OB(A, B) {
        if (A.openElements.currentTagName === A1.OPTION) A.openElements.pop();
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML)
    }

    function xOB(A, B) {
        if (A.openElements.hasInScope(A1.RUBY)) A.openElements.generateImpliedEndTags();
        A._insertElement(B, gB.HTML)
    }

    function L78(A, B) {
        if (A.openElements.hasInScope(A1.RUBY)) A.openElements.generateImpliedEndTagsWithExclusion(A1.RTC);
        A._insertElement(B, gB.HTML)
    }

    function M78(A, B) {
        if (A.openElements.hasInButtonScope(A1.P)) A._closePElement();
        A._insertElement(B, gB.HTML)
    }

    function R78(A, B) {
        if (A._reconstructActiveFormattingElements(), oM.adjustTokenMathMLAttrs(B), oM.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, gB.MATHML);
        else A._insertElement(B, gB.MATHML);
        B.ackSelfClosing = !0
    }

    function O78(A, B) {
        if (A._reconstructActiveFormattingElements(), oM.adjustTokenSVGAttrs(B), oM.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, gB.SVG);
        else A._insertElement(B, gB.SVG);
        B.ackSelfClosing = !0
    }

    function eE(A, B) {
        A._reconstructActiveFormattingElements(), A._insertElement(B, gB.HTML)
    }

    function FC(A, B) {
        let Q = B.tagName;
        switch (Q.length) {
            case 1:
                if (Q === A1.I || Q === A1.S || Q === A1.B || Q === A1.U) B01(A, B);
                else if (Q === A1.P) HS(A, B);
                else if (Q === A1.A) C78(A, B);
                else eE(A, B);
                break;
            case 2:
                if (Q === A1.DL || Q === A1.OL || Q === A1.UL) HS(A, B);
                else if (Q === A1.H1 || Q === A1.H2 || Q === A1.H3 || Q === A1.H4 || Q === A1.H5 || Q === A1.H6) Y78(A, B);
                else if (Q === A1.LI || Q === A1.DD || Q === A1.DT) J78(A, B);
                else if (Q === A1.EM || Q === A1.TT) B01(A, B);
                else if (Q === A1.BR) Q01(A, B);
                else if (Q === A1.HR) E78(A, B);
                else if (Q === A1.RB) xOB(A, B);
                else if (Q === A1.RT || Q === A1.RP) L78(A, B);
                else if (Q !== A1.TH && Q !== A1.TD && Q !== A1.TR) eE(A, B);
                break;
            case 3:
                if (Q === A1.DIV || Q === A1.DIR || Q === A1.NAV) HS(A, B);
                else if (Q === A1.PRE) SOB(A, B);
                else if (Q === A1.BIG) B01(A, B);
                else if (Q === A1.IMG || Q === A1.WBR) Q01(A, B);
                else if (Q === A1.XMP) $78(A, B);
                else if (Q === A1.SVG) O78(A, B);
                else if (Q === A1.RTC) xOB(A, B);
                else if (Q !== A1.COL) eE(A, B);
                break;
            case 4:
                if (Q === A1.HTML) G78(A, B);
                else if (Q === A1.BASE || Q === A1.LINK || Q === A1.META) kI(A, B);
                else if (Q === A1.BODY) F78(A, B);
                else if (Q === A1.MAIN || Q === A1.MENU) HS(A, B);
                else if (Q === A1.FORM) W78(A, B);
                else if (Q === A1.CODE || Q === A1.FONT) B01(A, B);
                else if (Q === A1.NOBR) K78(A, B);
                else if (Q === A1.AREA) Q01(A, B);
                else if (Q === A1.MATH) R78(A, B);
                else if (Q === A1.MENU) M78(A, B);
                else if (Q !== A1.HEAD) eE(A, B);
                break;
            case 5:
                if (Q === A1.STYLE || Q === A1.TITLE) kI(A, B);
                else if (Q === A1.ASIDE) HS(A, B);
                else if (Q === A1.SMALL) B01(A, B);
                else if (Q === A1.TABLE) H78(A, B);
                else if (Q === A1.EMBED) Q01(A, B);
                else if (Q === A1.INPUT) z78(A, B);
                else if (Q === A1.PARAM || Q === A1.TRACK) kOB(A, B);
                else if (Q === A1.IMAGE) U78(A, B);
                else if (Q !== A1.FRAME && Q !== A1.TBODY && Q !== A1.TFOOT && Q !== A1.THEAD) eE(A, B);
                break;
            case 6:
                if (Q === A1.SCRIPT) kI(A, B);
                else if (Q === A1.CENTER || Q === A1.FIGURE || Q === A1.FOOTER || Q === A1.HEADER || Q === A1.HGROUP || Q === A1.DIALOG) HS(A, B);
                else if (Q === A1.BUTTON) V78(A, B);
                else if (Q === A1.STRIKE || Q === A1.STRONG) B01(A, B);
                else if (Q === A1.APPLET || Q === A1.OBJECT) jOB(A, B);
                else if (Q === A1.KEYGEN) Q01(A, B);
                else if (Q === A1.SOURCE) kOB(A, B);
                else if (Q === A1.IFRAME) q78(A, B);
                else if (Q === A1.SELECT) N78(A, B);
                else if (Q === A1.OPTION) _OB(A, B);
                else eE(A, B);
                break;
            case 7:
                if (Q === A1.BGSOUND) kI(A, B);
                else if (Q === A1.DETAILS || Q === A1.ADDRESS || Q === A1.ARTICLE || Q === A1.SECTION || Q === A1.SUMMARY) HS(A, B);
                else if (Q === A1.LISTING) SOB(A, B);
                else if (Q === A1.MARQUEE) jOB(A, B);
                else if (Q === A1.NOEMBED) yOB(A, B);
                else if (Q !== A1.CAPTION) eE(A, B);
                break;
            case 8:
                if (Q === A1.BASEFONT) kI(A, B);
                else if (Q === A1.FRAMESET) I78(A, B);
                else if (Q === A1.FIELDSET) HS(A, B);
                else if (Q === A1.TEXTAREA) w78(A, B);
                else if (Q === A1.TEMPLATE) kI(A, B);
                else if (Q === A1.NOSCRIPT)
                    if (A.options.scriptingEnabled) yOB(A, B);
                    else eE(A, B);
                else if (Q === A1.OPTGROUP) _OB(A, B);
                else if (Q !== A1.COLGROUP) eE(A, B);
                break;
            case 9:
                if (Q === A1.PLAINTEXT) X78(A, B);
                else eE(A, B);
                break;
            case 10:
                if (Q === A1.BLOCKQUOTE || Q === A1.FIGCAPTION) HS(A, B);
                else eE(A, B);
                break;
            default:
                eE(A, B)
        }
    }

    function T78(A) {
        if (A.openElements.hasInScope(A1.BODY)) A.insertionMode = "AFTER_BODY_MODE"
    }

    function P78(A, B) {
        if (A.openElements.hasInScope(A1.BODY)) A.insertionMode = "AFTER_BODY_MODE", A._processToken(B)
    }

    function kv(A, B) {
        let Q = B.tagName;
        if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q)
    }

    function S78(A) {
        let B = A.openElements.tmplCount > 0,
            Q = A.formElement;
        if (!B) A.formElement = null;
        if ((Q || B) && A.openElements.hasInScope(A1.FORM))
            if (A.openElements.generateImpliedEndTags(), B) A.openElements.popUntilTagNamePopped(A1.FORM);
            else A.openElements.remove(Q)
    }

    function j78(A) {
        if (!A.openElements.hasInButtonScope(A1.P)) A._insertFakeElement(A1.P);
        A._closePElement()
    }

    function k78(A) {
        if (A.openElements.hasInListItemScope(A1.LI)) A.openElements.generateImpliedEndTagsWithExclusion(A1.LI), A.openElements.popUntilTagNamePopped(A1.LI)
    }

    function y78(A, B) {
        let Q = B.tagName;
        if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTagsWithExclusion(Q), A.openElements.popUntilTagNamePopped(Q)
    }

    function _78(A) {
        if (A.openElements.hasNumberedHeaderInScope()) A.openElements.generateImpliedEndTags(), A.openElements.popUntilNumberedHeaderPopped()
    }

    function vOB(A, B) {
        let Q = B.tagName;
        if (A.openElements.hasInScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q), A.activeFormattingElements.clearToLastMarker()
    }

    function x78(A) {
        A._reconstructActiveFormattingElements(), A._insertFakeElement(A1.BR), A.openElements.pop(), A.framesetOk = !1
    }

    function h$(A, B) {
        let Q = B.tagName;
        for (let Z = A.openElements.stackTop; Z > 0; Z--) {
            let D = A.openElements.items[Z];
            if (A.treeAdapter.getTagName(D) === Q) {
                A.openElements.generateImpliedEndTagsWithExclusion(Q), A.openElements.popUntilElementPopped(D);
                break
            }
            if (A._isSpecialElement(D)) break
        }
    }

    function iq0(A, B) {
        let Q = B.tagName;
        switch (Q.length) {
            case 1:
                if (Q === A1.A || Q === A1.B || Q === A1.I || Q === A1.S || Q === A1.U) yv(A, B);
                else if (Q === A1.P) j78(A, B);
                else h$(A, B);
                break;
            case 2:
                if (Q === A1.DL || Q === A1.UL || Q === A1.OL) kv(A, B);
                else if (Q === A1.LI) k78(A, B);
                else if (Q === A1.DD || Q === A1.DT) y78(A, B);
                else if (Q === A1.H1 || Q === A1.H2 || Q === A1.H3 || Q === A1.H4 || Q === A1.H5 || Q === A1.H6) _78(A, B);
                else if (Q === A1.BR) x78(A, B);
                else if (Q === A1.EM || Q === A1.TT) yv(A, B);
                else h$(A, B);
                break;
            case 3:
                if (Q === A1.BIG) yv(A, B);
                else if (Q === A1.DIR || Q === A1.DIV || Q === A1.NAV || Q === A1.PRE) kv(A, B);
                else h$(A, B);
                break;
            case 4:
                if (Q === A1.BODY) T78(A, B);
                else if (Q === A1.HTML) P78(A, B);
                else if (Q === A1.FORM) S78(A, B);
                else if (Q === A1.CODE || Q === A1.FONT || Q === A1.NOBR) yv(A, B);
                else if (Q === A1.MAIN || Q === A1.MENU) kv(A, B);
                else h$(A, B);
                break;
            case 5:
                if (Q === A1.ASIDE) kv(A, B);
                else if (Q === A1.SMALL) yv(A, B);
                else h$(A, B);
                break;
            case 6:
                if (Q === A1.CENTER || Q === A1.FIGURE || Q === A1.FOOTER || Q === A1.HEADER || Q === A1.HGROUP || Q === A1.DIALOG) kv(A, B);
                else if (Q === A1.APPLET || Q === A1.OBJECT) vOB(A, B);
                else if (Q === A1.STRIKE || Q === A1.STRONG) yv(A, B);
                else h$(A, B);
                break;
            case 7:
                if (Q === A1.ADDRESS || Q === A1.ARTICLE || Q === A1.DETAILS || Q === A1.SECTION || Q === A1.SUMMARY || Q === A1.LISTING) kv(A, B);
                else if (Q === A1.MARQUEE) vOB(A, B);
                else h$(A, B);
                break;
            case 8:
                if (Q === A1.FIELDSET) kv(A, B);
                else if (Q === A1.TEMPLATE) Cd(A, B);
                else h$(A, B);
                break;
            case 10:
                if (Q === A1.BLOCKQUOTE || Q === A1.FIGCAPTION) kv(A, B);
                else h$(A, B);
                break;
            default:
                h$(A, B)
        }
    }

    function zS(A, B) {
        if (A.tmplInsertionModeStackTop > -1) uOB(A, B);
        else A.stopped = !0
    }

    function v78(A, B) {
        if (B.tagName === A1.SCRIPT) A.pendingScript = A.openElements.current;
        A.openElements.pop(), A.insertionMode = A.originalInsertionMode
    }

    function b78(A, B) {
        A._err(QW.eofInElementThatCanContainOnlyText), A.openElements.pop(), A.insertionMode = A.originalInsertionMode, A._processToken(B)
    }

    function ES(A, B) {
        let Q = A.openElements.currentTagName;
        if (Q === A1.TABLE || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD || Q === A1.TR) A.pendingCharacterTokens = [], A.hasNonWhitespacePendingCharacterToken = !1, A.originalInsertionMode = A.insertionMode, A.insertionMode = "IN_TABLE_TEXT_MODE", A._processToken(B);
        else AU(A, B)
    }

    function f78(A, B) {
        A.openElements.clearBackToTableContext(), A.activeFormattingElements.insertMarker(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_CAPTION_MODE"
    }

    function h78(A, B) {
        A.openElements.clearBackToTableContext(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_COLUMN_GROUP_MODE"
    }

    function g78(A, B) {
        A.openElements.clearBackToTableContext(), A._insertFakeElement(A1.COLGROUP), A.insertionMode = "IN_COLUMN_GROUP_MODE", A._processToken(B)
    }

    function u78(A, B) {
        A.openElements.clearBackToTableContext(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_TABLE_BODY_MODE"
    }

    function m78(A, B) {
        A.openElements.clearBackToTableContext(), A._insertFakeElement(A1.TBODY), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
    }

    function d78(A, B) {
        if (A.openElements.hasInTableScope(A1.TABLE)) A.openElements.popUntilTagNamePopped(A1.TABLE), A._resetInsertionMode(), A._processToken(B)
    }

    function c78(A, B) {
        let Q = U0.getTokenAttr(B, bOB.TYPE);
        if (Q && Q.toLowerCase() === "hidden") A._appendElement(B, gB.HTML);
        else AU(A, B);
        B.ackSelfClosing = !0
    }

    function l78(A, B) {
        if (!A.formElement && A.openElements.tmplCount === 0) A._insertElement(B, gB.HTML), A.formElement = A.openElements.current, A.openElements.pop()
    }

    function nq0(A, B) {
        let Q = B.tagName;
        switch (Q.length) {
            case 2:
                if (Q === A1.TD || Q === A1.TH || Q === A1.TR) m78(A, B);
                else AU(A, B);
                break;
            case 3:
                if (Q === A1.COL) g78(A, B);
                else AU(A, B);
                break;
            case 4:
                if (Q === A1.FORM) l78(A, B);
                else AU(A, B);
                break;
            case 5:
                if (Q === A1.TABLE) d78(A, B);
                else if (Q === A1.STYLE) kI(A, B);
                else if (Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD) u78(A, B);
                else if (Q === A1.INPUT) c78(A, B);
                else AU(A, B);
                break;
            case 6:
                if (Q === A1.SCRIPT) kI(A, B);
                else AU(A, B);
                break;
            case 7:
                if (Q === A1.CAPTION) f78(A, B);
                else AU(A, B);
                break;
            case 8:
                if (Q === A1.COLGROUP) h78(A, B);
                else if (Q === A1.TEMPLATE) kI(A, B);
                else AU(A, B);
                break;
            default:
                AU(A, B)
        }
    }

    function aq0(A, B) {
        let Q = B.tagName;
        if (Q === A1.TABLE) {
            if (A.openElements.hasInTableScope(A1.TABLE)) A.openElements.popUntilTagNamePopped(A1.TABLE), A._resetInsertionMode()
        } else if (Q === A1.TEMPLATE) Cd(A, B);
        else if (Q !== A1.BODY && Q !== A1.CAPTION && Q !== A1.COL && Q !== A1.COLGROUP && Q !== A1.HTML && Q !== A1.TBODY && Q !== A1.TD && Q !== A1.TFOOT && Q !== A1.TH && Q !== A1.THEAD && Q !== A1.TR) AU(A, B)
    }

    function AU(A, B) {
        let Q = A.fosterParentingEnabled;
        A.fosterParentingEnabled = !0, A._processTokenInBodyMode(B), A.fosterParentingEnabled = Q
    }

    function p78(A, B) {
        A.pendingCharacterTokens.push(B)
    }

    function i78(A, B) {
        A.pendingCharacterTokens.push(B), A.hasNonWhitespacePendingCharacterToken = !0
    }

    function PG1(A, B) {
        let Q = 0;
        if (A.hasNonWhitespacePendingCharacterToken)
            for (; Q < A.pendingCharacterTokens.length; Q++) AU(A, A.pendingCharacterTokens[Q]);
        else
            for (; Q < A.pendingCharacterTokens.length; Q++) A._insertCharacters(A.pendingCharacterTokens[Q]);
        A.insertionMode = A.originalInsertionMode, A._processToken(B)
    }

    function n78(A, B) {
        let Q = B.tagName;
        if (Q === A1.CAPTION || Q === A1.COL || Q === A1.COLGROUP || Q === A1.TBODY || Q === A1.TD || Q === A1.TFOOT || Q === A1.TH || Q === A1.THEAD || Q === A1.TR) {
            if (A.openElements.hasInTableScope(A1.CAPTION)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(A1.CAPTION), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
        } else FC(A, B)
    }

    function a78(A, B) {
        let Q = B.tagName;
        if (Q === A1.CAPTION || Q === A1.TABLE) {
            if (A.openElements.hasInTableScope(A1.CAPTION)) {
                if (A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(A1.CAPTION), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_TABLE_MODE", Q === A1.TABLE) A._processToken(B)
            }
        } else if (Q !== A1.BODY && Q !== A1.COL && Q !== A1.COLGROUP && Q !== A1.HTML && Q !== A1.TBODY && Q !== A1.TD && Q !== A1.TFOOT && Q !== A1.TH && Q !== A1.THEAD && Q !== A1.TR) iq0(A, B)
    }

    function s78(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.COL) A._appendElement(B, gB.HTML), B.ackSelfClosing = !0;
        else if (Q === A1.TEMPLATE) kI(A, B);
        else lv1(A, B)
    }

    function r78(A, B) {
        let Q = B.tagName;
        if (Q === A1.COLGROUP) {
            if (A.openElements.currentTagName === A1.COLGROUP) A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE"
        } else if (Q === A1.TEMPLATE) Cd(A, B);
        else if (Q !== A1.COL) lv1(A, B)
    }

    function lv1(A, B) {
        if (A.openElements.currentTagName === A1.COLGROUP) A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
    }

    function o78(A, B) {
        let Q = B.tagName;
        if (Q === A1.TR) A.openElements.clearBackToTableBodyContext(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_ROW_MODE";
        else if (Q === A1.TH || Q === A1.TD) A.openElements.clearBackToTableBodyContext(), A._insertFakeElement(A1.TR), A.insertionMode = "IN_ROW_MODE", A._processToken(B);
        else if (Q === A1.CAPTION || Q === A1.COL || Q === A1.COLGROUP || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD) {
            if (A.openElements.hasTableBodyContextInTableScope()) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
        } else nq0(A, B)
    }

    function t78(A, B) {
        let Q = B.tagName;
        if (Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD) {
            if (A.openElements.hasInTableScope(Q)) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE"
        } else if (Q === A1.TABLE) {
            if (A.openElements.hasTableBodyContextInTableScope()) A.openElements.clearBackToTableBodyContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_MODE", A._processToken(B)
        } else if (Q !== A1.BODY && Q !== A1.CAPTION && Q !== A1.COL && Q !== A1.COLGROUP || Q !== A1.HTML && Q !== A1.TD && Q !== A1.TH && Q !== A1.TR) aq0(A, B)
    }

    function e78(A, B) {
        let Q = B.tagName;
        if (Q === A1.TH || Q === A1.TD) A.openElements.clearBackToTableRowContext(), A._insertElement(B, gB.HTML), A.insertionMode = "IN_CELL_MODE", A.activeFormattingElements.insertMarker();
        else if (Q === A1.CAPTION || Q === A1.COL || Q === A1.COLGROUP || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD || Q === A1.TR) {
            if (A.openElements.hasInTableScope(A1.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
        } else nq0(A, B)
    }

    function AZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.TR) {
            if (A.openElements.hasInTableScope(A1.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE"
        } else if (Q === A1.TABLE) {
            if (A.openElements.hasInTableScope(A1.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
        } else if (Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD) {
            if (A.openElements.hasInTableScope(Q) || A.openElements.hasInTableScope(A1.TR)) A.openElements.clearBackToTableRowContext(), A.openElements.pop(), A.insertionMode = "IN_TABLE_BODY_MODE", A._processToken(B)
        } else if (Q !== A1.BODY && Q !== A1.CAPTION && Q !== A1.COL && Q !== A1.COLGROUP || Q !== A1.HTML && Q !== A1.TD && Q !== A1.TH) aq0(A, B)
    }

    function BZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.CAPTION || Q === A1.COL || Q === A1.COLGROUP || Q === A1.TBODY || Q === A1.TD || Q === A1.TFOOT || Q === A1.TH || Q === A1.THEAD || Q === A1.TR) {
            if (A.openElements.hasInTableScope(A1.TD) || A.openElements.hasInTableScope(A1.TH)) A._closeTableCell(), A._processToken(B)
        } else FC(A, B)
    }

    function QZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.TD || Q === A1.TH) {
            if (A.openElements.hasInTableScope(Q)) A.openElements.generateImpliedEndTags(), A.openElements.popUntilTagNamePopped(Q), A.activeFormattingElements.clearToLastMarker(), A.insertionMode = "IN_ROW_MODE"
        } else if (Q === A1.TABLE || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD || Q === A1.TR) {
            if (A.openElements.hasInTableScope(Q)) A._closeTableCell(), A._processToken(B)
        } else if (Q !== A1.BODY && Q !== A1.CAPTION && Q !== A1.COL && Q !== A1.COLGROUP && Q !== A1.HTML) iq0(A, B)
    }

    function hOB(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.OPTION) {
            if (A.openElements.currentTagName === A1.OPTION) A.openElements.pop();
            A._insertElement(B, gB.HTML)
        } else if (Q === A1.OPTGROUP) {
            if (A.openElements.currentTagName === A1.OPTION) A.openElements.pop();
            if (A.openElements.currentTagName === A1.OPTGROUP) A.openElements.pop();
            A._insertElement(B, gB.HTML)
        } else if (Q === A1.INPUT || Q === A1.KEYGEN || Q === A1.TEXTAREA || Q === A1.SELECT) {
            if (A.openElements.hasInSelectScope(A1.SELECT)) {
                if (A.openElements.popUntilTagNamePopped(A1.SELECT), A._resetInsertionMode(), Q !== A1.SELECT) A._processToken(B)
            }
        } else if (Q === A1.SCRIPT || Q === A1.TEMPLATE) kI(A, B)
    }

    function gOB(A, B) {
        let Q = B.tagName;
        if (Q === A1.OPTGROUP) {
            let Z = A.openElements.items[A.openElements.stackTop - 1],
                D = Z && A.treeAdapter.getTagName(Z);
            if (A.openElements.currentTagName === A1.OPTION && D === A1.OPTGROUP) A.openElements.pop();
            if (A.openElements.currentTagName === A1.OPTGROUP) A.openElements.pop()
        } else if (Q === A1.OPTION) {
            if (A.openElements.currentTagName === A1.OPTION) A.openElements.pop()
        } else if (Q === A1.SELECT && A.openElements.hasInSelectScope(A1.SELECT)) A.openElements.popUntilTagNamePopped(A1.SELECT), A._resetInsertionMode();
        else if (Q === A1.TEMPLATE) Cd(A, B)
    }

    function ZZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.CAPTION || Q === A1.TABLE || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD || Q === A1.TR || Q === A1.TD || Q === A1.TH) A.openElements.popUntilTagNamePopped(A1.SELECT), A._resetInsertionMode(), A._processToken(B);
        else hOB(A, B)
    }

    function DZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.CAPTION || Q === A1.TABLE || Q === A1.TBODY || Q === A1.TFOOT || Q === A1.THEAD || Q === A1.TR || Q === A1.TD || Q === A1.TH) {
            if (A.openElements.hasInTableScope(Q)) A.openElements.popUntilTagNamePopped(A1.SELECT), A._resetInsertionMode(), A._processToken(B)
        } else gOB(A, B)
    }

    function GZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.BASE || Q === A1.BASEFONT || Q === A1.BGSOUND || Q === A1.LINK || Q === A1.META || Q === A1.NOFRAMES || Q === A1.SCRIPT || Q === A1.STYLE || Q === A1.TEMPLATE || Q === A1.TITLE) kI(A, B);
        else {
            let Z = d38[Q] || "IN_BODY_MODE";
            A._popTmplInsertionMode(), A._pushTmplInsertionMode(Z), A.insertionMode = Z, A._processToken(B)
        }
    }

    function FZ8(A, B) {
        if (B.tagName === A1.TEMPLATE) Cd(A, B)
    }

    function uOB(A, B) {
        if (A.openElements.tmplCount > 0) A.openElements.popUntilTagNamePopped(A1.TEMPLATE), A.activeFormattingElements.clearToLastMarker(), A._popTmplInsertionMode(), A._resetInsertionMode(), A._processToken(B);
        else A.stopped = !0
    }

    function IZ8(A, B) {
        if (B.tagName === A1.HTML) FC(A, B);
        else pv1(A, B)
    }

    function YZ8(A, B) {
        if (B.tagName === A1.HTML) {
            if (!A.fragmentContext) A.insertionMode = "AFTER_AFTER_BODY_MODE"
        } else pv1(A, B)
    }

    function pv1(A, B) {
        A.insertionMode = "IN_BODY_MODE", A._processToken(B)
    }

    function WZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.FRAMESET) A._insertElement(B, gB.HTML);
        else if (Q === A1.FRAME) A._appendElement(B, gB.HTML), B.ackSelfClosing = !0;
        else if (Q === A1.NOFRAMES) kI(A, B)
    }

    function JZ8(A, B) {
        if (B.tagName === A1.FRAMESET && !A.openElements.isRootHtmlElementCurrent()) {
            if (A.openElements.pop(), !A.fragmentContext && A.openElements.currentTagName !== A1.FRAMESET) A.insertionMode = "AFTER_FRAMESET_MODE"
        }
    }

    function XZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.NOFRAMES) kI(A, B)
    }

    function VZ8(A, B) {
        if (B.tagName === A1.HTML) A.insertionMode = "AFTER_AFTER_FRAMESET_MODE"
    }

    function CZ8(A, B) {
        if (B.tagName === A1.HTML) FC(A, B);
        else cv1(A, B)
    }

    function cv1(A, B) {
        A.insertionMode = "IN_BODY_MODE", A._processToken(B)
    }

    function KZ8(A, B) {
        let Q = B.tagName;
        if (Q === A1.HTML) FC(A, B);
        else if (Q === A1.NOFRAMES) kI(A, B)
    }

    function HZ8(A, B) {
        B.chars = g38.REPLACEMENT_CHARACTER, A._insertCharacters(B)
    }

    function zZ8(A, B) {
        A._insertCharacters(B), A.framesetOk = !1
    }

    function EZ8(A, B) {
        if (oM.causesExit(B) && !A.fragmentContext) {
            while (A.treeAdapter.getNamespaceURI(A.openElements.current) !== gB.HTML && !A._isIntegrationPoint(A.openElements.current)) A.openElements.pop();
            A._processToken(B)
        } else {
            let Q = A._getAdjustedCurrentElement(),
                Z = A.treeAdapter.getNamespaceURI(Q);
            if (Z === gB.MATHML) oM.adjustTokenMathMLAttrs(B);
            else if (Z === gB.SVG) oM.adjustTokenSVGTagName(B), oM.adjustTokenSVGAttrs(B);
            if (oM.adjustTokenXMLAttrs(B), B.selfClosing) A._appendElement(B, Z);
            else A._insertElement(B, Z);
            B.ackSelfClosing = !0
        }
    }

    function UZ8(A, B) {
        for (let Q = A.openElements.stackTop; Q > 0; Q--) {
            let Z = A.openElements.items[Q];
            if (A.treeAdapter.getNamespaceURI(Z) === gB.HTML) {
                A._processToken(B);
                break
            }
            if (A.treeAdapter.getTagName(Z).toLowerCase() === B.tagName) {
                A.openElements.popUntilElementPopped(Z);
                break
            }
        }
    }
});