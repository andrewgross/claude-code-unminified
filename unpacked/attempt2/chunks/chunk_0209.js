/* chunk:209 bytes:[4615211, 4630360) size:15149 source:unpacked-cli.js */
var IoA = E((VX5, FoA) => {
    var Q74 = (A) => {
            return {
                IMPORTANT: {
                    className: "meta",
                    begin: "!important"
                },
                HEXCOLOR: {
                    className: "number",
                    begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
                },
                ATTRIBUTE_SELECTOR_MODE: {
                    className: "selector-attr",
                    begin: /\[/,
                    end: /\]/,
                    illegal: "$",
                    contains: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
                }
            }
        },
        Z74 = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
        D74 = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"],
        G74 = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"],
        F74 = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"],
        I74 = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse();

    function Y74(A) {
        let B = Q74(A),
            Q = F74,
            Z = G74,
            D = "@[a-z-]+",
            G = "and or not only",
            F = "[a-zA-Z-][a-zA-Z0-9_-]*",
            I = {
                className: "variable",
                begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
            };
        return {
            name: "SCSS",
            case_insensitive: !0,
            illegal: "[=/|']",
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "selector-id",
                begin: "#[A-Za-z0-9_-]+",
                relevance: 0
            }, {
                className: "selector-class",
                begin: "\\.[A-Za-z0-9_-]+",
                relevance: 0
            }, B.ATTRIBUTE_SELECTOR_MODE, {
                className: "selector-tag",
                begin: "\\b(" + Z74.join("|") + ")\\b",
                relevance: 0
            }, {
                className: "selector-pseudo",
                begin: ":(" + Z.join("|") + ")"
            }, {
                className: "selector-pseudo",
                begin: "::(" + Q.join("|") + ")"
            }, I, {
                begin: /\(/,
                end: /\)/,
                contains: [A.CSS_NUMBER_MODE]
            }, {
                className: "attribute",
                begin: "\\b(" + I74.join("|") + ")\\b"
            }, {
                begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
            }, {
                begin: ":",
                end: ";",
                contains: [I, B.HEXCOLOR, A.CSS_NUMBER_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, B.IMPORTANT]
            }, {
                begin: "@(page|font-face)",
                lexemes: "@[a-z-]+",
                keywords: "@page @font-face"
            }, {
                begin: "@",
                end: "[{;]",
                returnBegin: !0,
                keywords: {
                    $pattern: /[a-z-]+/,
                    keyword: "and or not only",
                    attribute: D74.join(" ")
                },
                contains: [{
                    begin: "@[a-z-]+",
                    className: "keyword"
                }, {
                    begin: /[a-z-]+(?=:)/,
                    className: "attribute"
                }, I, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, B.HEXCOLOR, A.CSS_NUMBER_MODE]
            }]
        }
    }
    FoA.exports = Y74
});
var WoA = E((CX5, YoA) => {
    function W74(A) {
        return {
            name: "Shell Session",
            aliases: ["console"],
            contains: [{
                className: "meta",
                begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
                starts: {
                    end: /[^\\](?=\s*$)/,
                    subLanguage: "bash"
                }
            }]
        }
    }
    YoA.exports = W74
});
var XoA = E((KX5, JoA) => {
    function J74(A) {
        let B = ["add", "and", "cmp", "cmpg", "cmpl", "const", "div", "double", "float", "goto", "if", "int", "long", "move", "mul", "neg", "new", "nop", "not", "or", "rem", "return", "shl", "shr", "sput", "sub", "throw", "ushr", "xor"],
            Q = ["aget", "aput", "array", "check", "execute", "fill", "filled", "goto/16", "goto/32", "iget", "instance", "invoke", "iput", "monitor", "packed", "sget", "sparse"],
            Z = ["transient", "constructor", "abstract", "final", "synthetic", "public", "private", "protected", "static", "bridge", "system"];
        return {
            name: "Smali",
            contains: [{
                className: "string",
                begin: '"',
                end: '"',
                relevance: 0
            }, A.COMMENT("#", "$", {
                relevance: 0
            }), {
                className: "keyword",
                variants: [{
                    begin: "\\s*\\.end\\s[a-zA-Z0-9]*"
                }, {
                    begin: "^[ ]*\\.[a-zA-Z]*",
                    relevance: 0
                }, {
                    begin: "\\s:[a-zA-Z_0-9]*",
                    relevance: 0
                }, {
                    begin: "\\s(" + Z.join("|") + ")"
                }]
            }, {
                className: "built_in",
                variants: [{
                    begin: "\\s(" + B.join("|") + ")\\s"
                }, {
                    begin: "\\s(" + B.join("|") + ")((-|/)[a-zA-Z0-9]+)+\\s",
                    relevance: 10
                }, {
                    begin: "\\s(" + Q.join("|") + ")((-|/)[a-zA-Z0-9]+)*\\s",
                    relevance: 10
                }]
            }, {
                className: "class",
                begin: `L[^(;:
]*;`,
                relevance: 0
            }, {
                begin: "[vp][0-9]+"
            }]
        }
    }
    JoA.exports = J74
});
var CoA = E((HX5, VoA) => {
    function X74(A) {
        let Q = {
                className: "string",
                begin: "\\$.{1}"
            },
            Z = {
                className: "symbol",
                begin: "#" + A.UNDERSCORE_IDENT_RE
            };
        return {
            name: "Smalltalk",
            aliases: ["st"],
            keywords: "self super nil true false thisContext",
            contains: [A.COMMENT('"', '"'), A.APOS_STRING_MODE, {
                className: "type",
                begin: "\\b[A-Z][A-Za-z0-9_]*",
                relevance: 0
            }, {
                begin: "[a-z][a-zA-Z0-9_]*:",
                relevance: 0
            }, A.C_NUMBER_MODE, Z, Q, {
                begin: "\\|[ ]*[a-z][a-zA-Z0-9_]*([ ]+[a-z][a-zA-Z0-9_]*)*[ ]*\\|",
                returnBegin: !0,
                end: /\|/,
                illegal: /\S/,
                contains: [{
                    begin: "(\\|[ ]*)?[a-z][a-zA-Z0-9_]*"
                }]
            }, {
                begin: "#\\(",
                end: "\\)",
                contains: [A.APOS_STRING_MODE, Q, A.C_NUMBER_MODE, Z]
            }]
        }
    }
    VoA.exports = X74
});
var HoA = E((zX5, KoA) => {
    function V74(A) {
        return {
            name: "SML (Standard ML)",
            aliases: ["ml"],
            keywords: {
                $pattern: "[a-z_]\\w*!?",
                keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
                built_in: "array bool char exn int list option order real ref string substring vector unit word",
                literal: "true false NONE SOME LESS EQUAL GREATER nil"
            },
            illegal: /\/\/|>>/,
            contains: [{
                className: "literal",
                begin: /\[(\|\|)?\]|\(\)/,
                relevance: 0
            }, A.COMMENT("\\(\\*", "\\*\\)", {
                contains: ["self"]
            }), {
                className: "symbol",
                begin: "'[A-Za-z_](?!')[\\w']*"
            }, {
                className: "type",
                begin: "`[A-Z][\\w']*"
            }, {
                className: "type",
                begin: "\\b[A-Z][\\w']*",
                relevance: 0
            }, {
                begin: "[a-z_]\\w*'[\\w']*"
            }, A.inherit(A.APOS_STRING_MODE, {
                className: "string",
                relevance: 0
            }), A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }), {
                className: "number",
                begin: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
                relevance: 0
            }, {
                begin: /[-=]>/
            }]
        }
    }
    KoA.exports = V74
});