/* chunk:447 bytes:[10701346, 10715692) size:14346 source:unpacked-cli.js */
var pOB = E((PF3, lOB) => {
    var wZ8 = uq0(),
        $Z8 = mq0(),
        qZ8 = dq0(),
        cOB = jv(),
        d3 = cOB.TAG_NAMES,
        iv1 = cOB.NAMESPACES,
        NZ8 = {
            treeAdapter: wZ8
        },
        LZ8 = /&/g,
        MZ8 = /\u00a0/g,
        RZ8 = /"/g,
        OZ8 = /</g,
        TZ8 = />/g;
    class xG1 {
        constructor(A, B) {
            this.options = $Z8(NZ8, B), this.treeAdapter = this.options.treeAdapter, this.html = "", this.startNode = A
        }
        serialize() {
            return this._serializeChildNodes(this.startNode), this.html
        }
        _serializeChildNodes(A) {
            let B = this.treeAdapter.getChildNodes(A);
            if (B)
                for (let Q = 0, Z = B.length; Q < Z; Q++) {
                    let D = B[Q];
                    if (this.treeAdapter.isElementNode(D)) this._serializeElement(D);
                    else if (this.treeAdapter.isTextNode(D)) this._serializeTextNode(D);
                    else if (this.treeAdapter.isCommentNode(D)) this._serializeCommentNode(D);
                    else if (this.treeAdapter.isDocumentTypeNode(D)) this._serializeDocumentTypeNode(D)
                }
        }
        _serializeElement(A) {
            let B = this.treeAdapter.getTagName(A),
                Q = this.treeAdapter.getNamespaceURI(A);
            if (this.html += "<" + B, this._serializeAttributes(A), this.html += ">", B !== d3.AREA && B !== d3.BASE && B !== d3.BASEFONT && B !== d3.BGSOUND && B !== d3.BR && B !== d3.COL && B !== d3.EMBED && B !== d3.FRAME && B !== d3.HR && B !== d3.IMG && B !== d3.INPUT && B !== d3.KEYGEN && B !== d3.LINK && B !== d3.META && B !== d3.PARAM && B !== d3.SOURCE && B !== d3.TRACK && B !== d3.WBR) {
                let Z = B === d3.TEMPLATE && Q === iv1.HTML ? this.treeAdapter.getTemplateContent(A) : A;
                this._serializeChildNodes(Z), this.html += "</" + B + ">"
            }
        }
        _serializeAttributes(A) {
            let B = this.treeAdapter.getAttrList(A);
            for (let Q = 0, Z = B.length; Q < Z; Q++) {
                let D = B[Q],
                    G = xG1.escapeString(D.value, !0);
                if (this.html += " ", !D.namespace) this.html += D.name;
                else if (D.namespace === iv1.XML) this.html += "xml:" + D.name;
                else if (D.namespace === iv1.XMLNS) {
                    if (D.name !== "xmlns") this.html += "xmlns:";
                    this.html += D.name
                } else if (D.namespace === iv1.XLINK) this.html += "xlink:" + D.name;
                else this.html += D.prefix + ":" + D.name;
                this.html += '="' + G + '"'
            }
        }
        _serializeTextNode(A) {
            let B = this.treeAdapter.getTextNodeContent(A),
                Q = this.treeAdapter.getParentNode(A),
                Z = void 0;
            if (Q && this.treeAdapter.isElementNode(Q)) Z = this.treeAdapter.getTagName(Q);
            if (Z === d3.STYLE || Z === d3.SCRIPT || Z === d3.XMP || Z === d3.IFRAME || Z === d3.NOEMBED || Z === d3.NOFRAMES || Z === d3.PLAINTEXT || Z === d3.NOSCRIPT) this.html += B;
            else this.html += xG1.escapeString(B, !1)
        }
        _serializeCommentNode(A) {
            this.html += "<!--" + this.treeAdapter.getCommentNodeContent(A) + "-->"
        }
        _serializeDocumentTypeNode(A) {
            let B = this.treeAdapter.getDocumentTypeNodeName(A);
            this.html += "<" + qZ8.serializeContent(B, null, null) + ">"
        }
    }
    xG1.escapeString = function(A, B) {
        if (A = A.replace(LZ8, "&amp;").replace(MZ8, "&nbsp;"), B) A = A.replace(RZ8, "&quot;");
        else A = A.replace(OZ8, "&lt;").replace(TZ8, "&gt;");
        return A
    };
    lOB.exports = xG1
});
var nOB = E((SZ8) => {
    var iOB = dOB(),
        PZ8 = pOB();
    SZ8.parse = function A(B, Q) {
        return new iOB(Q).parse(B)
    };
    SZ8.parseFragment = function A(B, Q, Z) {
        if (typeof B === "string") Z = Q, Q = B, B = null;
        return new iOB(Z).parseFragment(Q, B)
    };
    SZ8.serialize = function(A, B) {
        return new PZ8(A, B).serialize()
    }
});
var rq0 = E((_Z8) => {
    var sq0 = _Z8.NAMESPACES = {
        HTML: "http://www.w3.org/1999/xhtml",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/"
    };
    _Z8.ATTRS = {
        TYPE: "type",
        ACTION: "action",
        ENCODING: "encoding",
        PROMPT: "prompt",
        NAME: "name",
        COLOR: "color",
        FACE: "face",
        SIZE: "size"
    };
    _Z8.DOCUMENT_MODE = {
        NO_QUIRKS: "no-quirks",
        QUIRKS: "quirks",
        LIMITED_QUIRKS: "limited-quirks"
    };
    var Y2 = _Z8.TAG_NAMES = {
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
    _Z8.SPECIAL_ELEMENTS = {
        [sq0.HTML]: {
            [Y2.ADDRESS]: !0,
            [Y2.APPLET]: !0,
            [Y2.AREA]: !0,
            [Y2.ARTICLE]: !0,
            [Y2.ASIDE]: !0,
            [Y2.BASE]: !0,
            [Y2.BASEFONT]: !0,
            [Y2.BGSOUND]: !0,
            [Y2.BLOCKQUOTE]: !0,
            [Y2.BODY]: !0,
            [Y2.BR]: !0,
            [Y2.BUTTON]: !0,
            [Y2.CAPTION]: !0,
            [Y2.CENTER]: !0,
            [Y2.COL]: !0,
            [Y2.COLGROUP]: !0,
            [Y2.DD]: !0,
            [Y2.DETAILS]: !0,
            [Y2.DIR]: !0,
            [Y2.DIV]: !0,
            [Y2.DL]: !0,
            [Y2.DT]: !0,
            [Y2.EMBED]: !0,
            [Y2.FIELDSET]: !0,
            [Y2.FIGCAPTION]: !0,
            [Y2.FIGURE]: !0,
            [Y2.FOOTER]: !0,
            [Y2.FORM]: !0,
            [Y2.FRAME]: !0,
            [Y2.FRAMESET]: !0,
            [Y2.H1]: !0,
            [Y2.H2]: !0,
            [Y2.H3]: !0,
            [Y2.H4]: !0,
            [Y2.H5]: !0,
            [Y2.H6]: !0,
            [Y2.HEAD]: !0,
            [Y2.HEADER]: !0,
            [Y2.HGROUP]: !0,
            [Y2.HR]: !0,
            [Y2.HTML]: !0,
            [Y2.IFRAME]: !0,
            [Y2.IMG]: !0,
            [Y2.INPUT]: !0,
            [Y2.LI]: !0,
            [Y2.LINK]: !0,
            [Y2.LISTING]: !0,
            [Y2.MAIN]: !0,
            [Y2.MARQUEE]: !0,
            [Y2.MENU]: !0,
            [Y2.META]: !0,
            [Y2.NAV]: !0,
            [Y2.NOEMBED]: !0,
            [Y2.NOFRAMES]: !0,
            [Y2.NOSCRIPT]: !0,
            [Y2.OBJECT]: !0,
            [Y2.OL]: !0,
            [Y2.P]: !0,
            [Y2.PARAM]: !0,
            [Y2.PLAINTEXT]: !0,
            [Y2.PRE]: !0,
            [Y2.SCRIPT]: !0,
            [Y2.SECTION]: !0,
            [Y2.SELECT]: !0,
            [Y2.SOURCE]: !0,
            [Y2.STYLE]: !0,
            [Y2.SUMMARY]: !0,
            [Y2.TABLE]: !0,
            [Y2.TBODY]: !0,
            [Y2.TD]: !0,
            [Y2.TEMPLATE]: !0,
            [Y2.TEXTAREA]: !0,
            [Y2.TFOOT]: !0,
            [Y2.TH]: !0,
            [Y2.THEAD]: !0,
            [Y2.TITLE]: !0,
            [Y2.TR]: !0,
            [Y2.TRACK]: !0,
            [Y2.UL]: !0,
            [Y2.WBR]: !0,
            [Y2.XMP]: !0
        },
        [sq0.MATHML]: {
            [Y2.MI]: !0,
            [Y2.MO]: !0,
            [Y2.MN]: !0,
            [Y2.MS]: !0,
            [Y2.MTEXT]: !0,
            [Y2.ANNOTATION_XML]: !0
        },
        [sq0.SVG]: {
            [Y2.TITLE]: !0,
            [Y2.FOREIGN_OBJECT]: !0,
            [Y2.DESC]: !0
        }
    }
});
var tOB = E((uZ8) => {
    var {
        DOCUMENT_MODE: Z01
    } = rq0(), rOB = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], fZ8 = rOB.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]), hZ8 = ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"], oOB = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], gZ8 = oOB.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]);

    function aOB(A) {
        let B = A.indexOf('"') !== -1 ? "'" : '"';
        return B + A + B
    }

    function sOB(A, B) {
        for (let Q = 0; Q < B.length; Q++)
            if (A.indexOf(B[Q]) === 0) return !0;
        return !1
    }
    uZ8.isConforming = function(A) {
        return A.name === "html" && A.publicId === null && (A.systemId === null || A.systemId === "about:legacy-compat")
    };
    uZ8.getDocumentMode = function(A) {
        if (A.name !== "html") return Z01.QUIRKS;
        let B = A.systemId;
        if (B && B.toLowerCase() === "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd") return Z01.QUIRKS;
        let Q = A.publicId;
        if (Q !== null) {
            if (Q = Q.toLowerCase(), hZ8.indexOf(Q) > -1) return Z01.QUIRKS;
            let Z = B === null ? fZ8 : rOB;
            if (sOB(Q, Z)) return Z01.QUIRKS;
            if (Z = B === null ? oOB : gZ8, sOB(Q, Z)) return Z01.LIMITED_QUIRKS
        }
        return Z01.NO_QUIRKS
    };
    uZ8.serializeContent = function(A, B, Q) {
        let Z = "!DOCTYPE ";
        if (A) Z += A;
        if (B) Z += " PUBLIC " + aOB(B);
        else if (Q) Z += " SYSTEM";
        if (Q !== null) Z += " " + aOB(Q);
        return Z
    }
});