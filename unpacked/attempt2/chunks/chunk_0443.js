/* chunk:443 bytes:[10581693, 10601619) size:19926 source:unpacked-cli.js */
var jv = E((K58) => {
    var _q0 = K58.NAMESPACES = {
        HTML: "http://www.w3.org/1999/xhtml",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/"
    };
    K58.ATTRS = {
        TYPE: "type",
        ACTION: "action",
        ENCODING: "encoding",
        PROMPT: "prompt",
        NAME: "name",
        COLOR: "color",
        FACE: "face",
        SIZE: "size"
    };
    K58.DOCUMENT_MODE = {
        NO_QUIRKS: "no-quirks",
        QUIRKS: "quirks",
        LIMITED_QUIRKS: "limited-quirks"
    };
    var I2 = K58.TAG_NAMES = {
        A: "a",
        ADDRESS: "address",
        ANNOTATION_XML: "annotation-xml",
        APPLET: "applet",
        AREA: "area",
        ARTICLE: "article",
        ASIDE: "aside",
        B: "b",
        BASE: "base",
        BASEFONT: "basefont",
        BGSOUND: "bgsound",
        BIG: "big",
        BLOCKQUOTE: "blockquote",
        BODY: "body",
        BR: "br",
        BUTTON: "button",
        CAPTION: "caption",
        CENTER: "center",
        CODE: "code",
        COL: "col",
        COLGROUP: "colgroup",
        DD: "dd",
        DESC: "desc",
        DETAILS: "details",
        DIALOG: "dialog",
        DIR: "dir",
        DIV: "div",
        DL: "dl",
        DT: "dt",
        EM: "em",
        EMBED: "embed",
        FIELDSET: "fieldset",
        FIGCAPTION: "figcaption",
        FIGURE: "figure",
        FONT: "font",
        FOOTER: "footer",
        FOREIGN_OBJECT: "foreignObject",
        FORM: "form",
        FRAME: "frame",
        FRAMESET: "frameset",
        H1: "h1",
        H2: "h2",
        H3: "h3",
        H4: "h4",
        H5: "h5",
        H6: "h6",
        HEAD: "head",
        HEADER: "header",
        HGROUP: "hgroup",
        HR: "hr",
        HTML: "html",
        I: "i",
        IMG: "img",
        IMAGE: "image",
        INPUT: "input",
        IFRAME: "iframe",
        KEYGEN: "keygen",
        LABEL: "label",
        LI: "li",
        LINK: "link",
        LISTING: "listing",
        MAIN: "main",
        MALIGNMARK: "malignmark",
        MARQUEE: "marquee",
        MATH: "math",
        MENU: "menu",
        META: "meta",
        MGLYPH: "mglyph",
        MI: "mi",
        MO: "mo",
        MN: "mn",
        MS: "ms",
        MTEXT: "mtext",
        NAV: "nav",
        NOBR: "nobr",
        NOFRAMES: "noframes",
        NOEMBED: "noembed",
        NOSCRIPT: "noscript",
        OBJECT: "object",
        OL: "ol",
        OPTGROUP: "optgroup",
        OPTION: "option",
        P: "p",
        PARAM: "param",
        PLAINTEXT: "plaintext",
        PRE: "pre",
        RB: "rb",
        RP: "rp",
        RT: "rt",
        RTC: "rtc",
        RUBY: "ruby",
        S: "s",
        SCRIPT: "script",
        SECTION: "section",
        SELECT: "select",
        SOURCE: "source",
        SMALL: "small",
        SPAN: "span",
        STRIKE: "strike",
        STRONG: "strong",
        STYLE: "style",
        SUB: "sub",
        SUMMARY: "summary",
        SUP: "sup",
        TABLE: "table",
        TBODY: "tbody",
        TEMPLATE: "template",
        TEXTAREA: "textarea",
        TFOOT: "tfoot",
        TD: "td",
        TH: "th",
        THEAD: "thead",
        TITLE: "title",
        TR: "tr",
        TRACK: "track",
        TT: "tt",
        U: "u",
        UL: "ul",
        SVG: "svg",
        VAR: "var",
        WBR: "wbr",
        XMP: "xmp"
    };
    K58.SPECIAL_ELEMENTS = {
        [_q0.HTML]: {
            [I2.ADDRESS]: !0,
            [I2.APPLET]: !0,
            [I2.AREA]: !0,
            [I2.ARTICLE]: !0,
            [I2.ASIDE]: !0,
            [I2.BASE]: !0,
            [I2.BASEFONT]: !0,
            [I2.BGSOUND]: !0,
            [I2.BLOCKQUOTE]: !0,
            [I2.BODY]: !0,
            [I2.BR]: !0,
            [I2.BUTTON]: !0,
            [I2.CAPTION]: !0,
            [I2.CENTER]: !0,
            [I2.COL]: !0,
            [I2.COLGROUP]: !0,
            [I2.DD]: !0,
            [I2.DETAILS]: !0,
            [I2.DIR]: !0,
            [I2.DIV]: !0,
            [I2.DL]: !0,
            [I2.DT]: !0,
            [I2.EMBED]: !0,
            [I2.FIELDSET]: !0,
            [I2.FIGCAPTION]: !0,
            [I2.FIGURE]: !0,
            [I2.FOOTER]: !0,
            [I2.FORM]: !0,
            [I2.FRAME]: !0,
            [I2.FRAMESET]: !0,
            [I2.H1]: !0,
            [I2.H2]: !0,
            [I2.H3]: !0,
            [I2.H4]: !0,
            [I2.H5]: !0,
            [I2.H6]: !0,
            [I2.HEAD]: !0,
            [I2.HEADER]: !0,
            [I2.HGROUP]: !0,
            [I2.HR]: !0,
            [I2.HTML]: !0,
            [I2.IFRAME]: !0,
            [I2.IMG]: !0,
            [I2.INPUT]: !0,
            [I2.LI]: !0,
            [I2.LINK]: !0,
            [I2.LISTING]: !0,
            [I2.MAIN]: !0,
            [I2.MARQUEE]: !0,
            [I2.MENU]: !0,
            [I2.META]: !0,
            [I2.NAV]: !0,
            [I2.NOEMBED]: !0,
            [I2.NOFRAMES]: !0,
            [I2.NOSCRIPT]: !0,
            [I2.OBJECT]: !0,
            [I2.OL]: !0,
            [I2.P]: !0,
            [I2.PARAM]: !0,
            [I2.PLAINTEXT]: !0,
            [I2.PRE]: !0,
            [I2.SCRIPT]: !0,
            [I2.SECTION]: !0,
            [I2.SELECT]: !0,
            [I2.SOURCE]: !0,
            [I2.STYLE]: !0,
            [I2.SUMMARY]: !0,
            [I2.TABLE]: !0,
            [I2.TBODY]: !0,
            [I2.TD]: !0,
            [I2.TEMPLATE]: !0,
            [I2.TEXTAREA]: !0,
            [I2.TFOOT]: !0,
            [I2.TH]: !0,
            [I2.THEAD]: !0,
            [I2.TITLE]: !0,
            [I2.TR]: !0,
            [I2.TRACK]: !0,
            [I2.UL]: !0,
            [I2.WBR]: !0,
            [I2.XMP]: !0
        },
        [_q0.MATHML]: {
            [I2.MI]: !0,
            [I2.MO]: !0,
            [I2.MN]: !0,
            [I2.MS]: !0,
            [I2.MTEXT]: !0,
            [I2.ANNOTATION_XML]: !0
        },
        [_q0.SVG]: {
            [I2.TITLE]: !0,
            [I2.FOREIGN_OBJECT]: !0,
            [I2.DESC]: !0
        }
    }
});
var dRB = E((WF3, mRB) => {
    var gRB = jv(),
        C2 = gRB.TAG_NAMES,
        $3 = gRB.NAMESPACES;

    function hRB(A) {
        switch (A.length) {
            case 1:
                return A === C2.P;
            case 2:
                return A === C2.RB || A === C2.RP || A === C2.RT || A === C2.DD || A === C2.DT || A === C2.LI;
            case 3:
                return A === C2.RTC;
            case 6:
                return A === C2.OPTION;
            case 8:
                return A === C2.OPTGROUP
        }
        return !1
    }

    function U58(A) {
        switch (A.length) {
            case 1:
                return A === C2.P;
            case 2:
                return A === C2.RB || A === C2.RP || A === C2.RT || A === C2.DD || A === C2.DT || A === C2.LI || A === C2.TD || A === C2.TH || A === C2.TR;
            case 3:
                return A === C2.RTC;
            case 5:
                return A === C2.TBODY || A === C2.TFOOT || A === C2.THEAD;
            case 6:
                return A === C2.OPTION;
            case 7:
                return A === C2.CAPTION;
            case 8:
                return A === C2.OPTGROUP || A === C2.COLGROUP
        }
        return !1
    }

    function hv1(A, B) {
        switch (A.length) {
            case 2:
                if (A === C2.TD || A === C2.TH) return B === $3.HTML;
                else if (A === C2.MI || A === C2.MO || A === C2.MN || A === C2.MS) return B === $3.MATHML;
                break;
            case 4:
                if (A === C2.HTML) return B === $3.HTML;
                else if (A === C2.DESC) return B === $3.SVG;
                break;
            case 5:
                if (A === C2.TABLE) return B === $3.HTML;
                else if (A === C2.MTEXT) return B === $3.MATHML;
                else if (A === C2.TITLE) return B === $3.SVG;
                break;
            case 6:
                return (A === C2.APPLET || A === C2.OBJECT) && B === $3.HTML;
            case 7:
                return (A === C2.CAPTION || A === C2.MARQUEE) && B === $3.HTML;
            case 8:
                return A === C2.TEMPLATE && B === $3.HTML;
            case 13:
                return A === C2.FOREIGN_OBJECT && B === $3.SVG;
            case 14:
                return A === C2.ANNOTATION_XML && B === $3.MATHML
        }
        return !1
    }
    class uRB {
        constructor(A, B) {
            this.stackTop = -1, this.items = [], this.current = A, this.currentTagName = null, this.currentTmplContent = null, this.tmplCount = 0, this.treeAdapter = B
        }
        _indexOf(A) {
            let B = -1;
            for (let Q = this.stackTop; Q >= 0; Q--)
                if (this.items[Q] === A) {
                    B = Q;
                    break
                } return B
        }
        _isInTemplate() {
            return this.currentTagName === C2.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === $3.HTML
        }
        _updateCurrentElement() {
            this.current = this.items[this.stackTop], this.currentTagName = this.current && this.treeAdapter.getTagName(this.current), this.currentTmplContent = this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : null
        }
        push(A) {
            if (this.items[++this.stackTop] = A, this._updateCurrentElement(), this._isInTemplate()) this.tmplCount++
        }
        pop() {
            if (this.stackTop--, this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
            this._updateCurrentElement()
        }
        replace(A, B) {
            let Q = this._indexOf(A);
            if (this.items[Q] = B, Q === this.stackTop) this._updateCurrentElement()
        }
        insertAfter(A, B) {
            let Q = this._indexOf(A) + 1;
            if (this.items.splice(Q, 0, B), Q === ++this.stackTop) this._updateCurrentElement()
        }
        popUntilTagNamePopped(A) {
            while (this.stackTop > -1) {
                let B = this.currentTagName,
                    Q = this.treeAdapter.getNamespaceURI(this.current);
                if (this.pop(), B === A && Q === $3.HTML) break
            }
        }
        popUntilElementPopped(A) {
            while (this.stackTop > -1) {
                let B = this.current;
                if (this.pop(), B === A) break
            }
        }
        popUntilNumberedHeaderPopped() {
            while (this.stackTop > -1) {
                let A = this.currentTagName,
                    B = this.treeAdapter.getNamespaceURI(this.current);
                if (this.pop(), A === C2.H1 || A === C2.H2 || A === C2.H3 || A === C2.H4 || A === C2.H5 || A === C2.H6 && B === $3.HTML) break
            }
        }
        popUntilTableCellPopped() {
            while (this.stackTop > -1) {
                let A = this.currentTagName,
                    B = this.treeAdapter.getNamespaceURI(this.current);
                if (this.pop(), A === C2.TD || A === C2.TH && B === $3.HTML) break
            }
        }
        popAllUpToHtmlElement() {
            this.stackTop = 0, this._updateCurrentElement()
        }
        clearBackToTableContext() {
            while (this.currentTagName !== C2.TABLE && this.currentTagName !== C2.TEMPLATE && this.currentTagName !== C2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== $3.HTML) this.pop()
        }
        clearBackToTableBodyContext() {
            while (this.currentTagName !== C2.TBODY && this.currentTagName !== C2.TFOOT && this.currentTagName !== C2.THEAD && this.currentTagName !== C2.TEMPLATE && this.currentTagName !== C2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== $3.HTML) this.pop()
        }
        clearBackToTableRowContext() {
            while (this.currentTagName !== C2.TR && this.currentTagName !== C2.TEMPLATE && this.currentTagName !== C2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== $3.HTML) this.pop()
        }
        remove(A) {
            for (let B = this.stackTop; B >= 0; B--)
                if (this.items[B] === A) {
                    this.items.splice(B, 1), this.stackTop--, this._updateCurrentElement();
                    break
                }
        }
        tryPeekProperlyNestedBodyElement() {
            let A = this.items[1];
            return A && this.treeAdapter.getTagName(A) === C2.BODY ? A : null
        }
        contains(A) {
            return this._indexOf(A) > -1
        }
        getCommonAncestor(A) {
            let B = this._indexOf(A);
            return --B >= 0 ? this.items[B] : null
        }
        isRootHtmlElementCurrent() {
            return this.stackTop === 0 && this.currentTagName === C2.HTML
        }
        hasInScope(A) {
            for (let B = this.stackTop; B >= 0; B--) {
                let Q = this.treeAdapter.getTagName(this.items[B]),
                    Z = this.treeAdapter.getNamespaceURI(this.items[B]);
                if (Q === A && Z === $3.HTML) return !0;
                if (hv1(Q, Z)) return !1
            }
            return !0
        }
        hasNumberedHeaderInScope() {
            for (let A = this.stackTop; A >= 0; A--) {
                let B = this.treeAdapter.getTagName(this.items[A]),
                    Q = this.treeAdapter.getNamespaceURI(this.items[A]);
                if ((B === C2.H1 || B === C2.H2 || B === C2.H3 || B === C2.H4 || B === C2.H5 || B === C2.H6) && Q === $3.HTML) return !0;
                if (hv1(B, Q)) return !1
            }
            return !0
        }
        hasInListItemScope(A) {
            for (let B = this.stackTop; B >= 0; B--) {
                let Q = this.treeAdapter.getTagName(this.items[B]),
                    Z = this.treeAdapter.getNamespaceURI(this.items[B]);
                if (Q === A && Z === $3.HTML) return !0;
                if ((Q === C2.UL || Q === C2.OL) && Z === $3.HTML || hv1(Q, Z)) return !1
            }
            return !0
        }
        hasInButtonScope(A) {
            for (let B = this.stackTop; B >= 0; B--) {
                let Q = this.treeAdapter.getTagName(this.items[B]),
                    Z = this.treeAdapter.getNamespaceURI(this.items[B]);
                if (Q === A && Z === $3.HTML) return !0;
                if (Q === C2.BUTTON && Z === $3.HTML || hv1(Q, Z)) return !1
            }
            return !0
        }
        hasInTableScope(A) {
            for (let B = this.stackTop; B >= 0; B--) {
                let Q = this.treeAdapter.getTagName(this.items[B]);
                if (this.treeAdapter.getNamespaceURI(this.items[B]) !== $3.HTML) continue;
                if (Q === A) return !0;
                if (Q === C2.TABLE || Q === C2.TEMPLATE || Q === C2.HTML) return !1
            }
            return !0
        }
        hasTableBodyContextInTableScope() {
            for (let A = this.stackTop; A >= 0; A--) {
                let B = this.treeAdapter.getTagName(this.items[A]);
                if (this.treeAdapter.getNamespaceURI(this.items[A]) !== $3.HTML) continue;
                if (B === C2.TBODY || B === C2.THEAD || B === C2.TFOOT) return !0;
                if (B === C2.TABLE || B === C2.HTML) return !1
            }
            return !0
        }
        hasInSelectScope(A) {
            for (let B = this.stackTop; B >= 0; B--) {
                let Q = this.treeAdapter.getTagName(this.items[B]);
                if (this.treeAdapter.getNamespaceURI(this.items[B]) !== $3.HTML) continue;
                if (Q === A) return !0;
                if (Q !== C2.OPTION && Q !== C2.OPTGROUP) return !1
            }
            return !0
        }
        generateImpliedEndTags() {
            while (hRB(this.currentTagName)) this.pop()
        }
        generateImpliedEndTagsThoroughly() {
            while (U58(this.currentTagName)) this.pop()
        }
        generateImpliedEndTagsWithExclusion(A) {
            while (hRB(this.currentTagName) && this.currentTagName !== A) this.pop()
        }
    }
    mRB.exports = uRB
});
var lRB = E((JF3, cRB) => {
    class f$ {
        constructor(A) {
            this.length = 0, this.entries = [], this.treeAdapter = A, this.bookmark = null
        }
        _getNoahArkConditionCandidates(A) {
            let B = [];
            if (this.length >= 3) {
                let Q = this.treeAdapter.getAttrList(A).length,
                    Z = this.treeAdapter.getTagName(A),
                    D = this.treeAdapter.getNamespaceURI(A);
                for (let G = this.length - 1; G >= 0; G--) {
                    let F = this.entries[G];
                    if (F.type === f$.MARKER_ENTRY) break;
                    let I = F.element,
                        Y = this.treeAdapter.getAttrList(I);
                    if (this.treeAdapter.getTagName(I) === Z && this.treeAdapter.getNamespaceURI(I) === D && Y.length === Q) B.push({
                        idx: G,
                        attrs: Y
                    })
                }
            }
            return B.length < 3 ? [] : B
        }
        _ensureNoahArkCondition(A) {
            let B = this._getNoahArkConditionCandidates(A),
                Q = B.length;
            if (Q) {
                let Z = this.treeAdapter.getAttrList(A),
                    D = Z.length,
                    G = Object.create(null);
                for (let F = 0; F < D; F++) {
                    let I = Z[F];
                    G[I.name] = I.value
                }
                for (let F = 0; F < D; F++)
                    for (let I = 0; I < Q; I++) {
                        let Y = B[I].attrs[F];
                        if (G[Y.name] !== Y.value) B.splice(I, 1), Q--;
                        if (B.length < 3) return
                    }
                for (let F = Q - 1; F >= 2; F--) this.entries.splice(B[F].idx, 1), this.length--
            }
        }
        insertMarker() {
            this.entries.push({
                type: f$.MARKER_ENTRY
            }), this.length++
        }
        pushElement(A, B) {
            this._ensureNoahArkCondition(A), this.entries.push({
                type: f$.ELEMENT_ENTRY,
                element: A,
                token: B
            }), this.length++
        }
        insertElementAfterBookmark(A, B) {
            let Q = this.length - 1;
            for (; Q >= 0; Q--)
                if (this.entries[Q] === this.bookmark) break;
            this.entries.splice(Q + 1, 0, {
                type: f$.ELEMENT_ENTRY,
                element: A,
                token: B
            }), this.length++
        }
        removeEntry(A) {
            for (let B = this.length - 1; B >= 0; B--)
                if (this.entries[B] === A) {
                    this.entries.splice(B, 1), this.length--;
                    break
                }
        }
        clearToLastMarker() {
            while (this.length) {
                let A = this.entries.pop();
                if (this.length--, A.type === f$.MARKER_ENTRY) break
            }
        }
        getElementEntryInScopeWithTagName(A) {
            for (let B = this.length - 1; B >= 0; B--) {
                let Q = this.entries[B];
                if (Q.type === f$.MARKER_ENTRY) return null;
                if (this.treeAdapter.getTagName(Q.element) === A) return Q
            }
            return null
        }
        getElementEntry(A) {
            for (let B = this.length - 1; B >= 0; B--) {
                let Q = this.entries[B];
                if (Q.type === f$.ELEMENT_ENTRY && Q.element === A) return Q
            }
            return null
        }
    }
    f$.MARKER_ENTRY = "MARKER_ENTRY";
    f$.ELEMENT_ENTRY = "ELEMENT_ENTRY";
    cRB.exports = f$
});