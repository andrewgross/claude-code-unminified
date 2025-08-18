/* chunk:192 bytes:[4220944, 4240880) size:19936 source:unpacked-cli.js */
var baA = E((ZJ5, vaA) => {
    function M54(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function R54(...A) {
        return "(" + A.map((Q) => M54(Q)).join("|") + ")"
    }

    function O54(A) {
        let B = R54(...["(?:NeedsTeXFormat|RequirePackage|GetIdInfo)", "Provides(?:Expl)?(?:Package|Class|File)", "(?:DeclareOption|ProcessOptions)", "(?:documentclass|usepackage|input|include)", "makeat(?:letter|other)", "ExplSyntax(?:On|Off)", "(?:new|renew|provide)?command", "(?:re)newenvironment", "(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand", "(?:New|Renew|Provide|Declare)DocumentEnvironment", "(?:(?:e|g|x)?def|let)", "(?:begin|end)", "(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)", "caption", "(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)", "(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)", "(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)", "(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)", "(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)", "(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"].map((k) => k + "(?![a-zA-Z@:_])")),
            Q = new RegExp(["(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*", "[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}", "[qs]__?[a-zA-Z](?:_?[a-zA-Z])+", "use(?:_i)?:[a-zA-Z]*", "(?:else|fi|or):", "(?:if|cs|exp):w", "(?:hbox|vbox):n", "::[a-zA-Z]_unbraced", "::[a-zA-Z:]"].map((k) => k + "(?![a-zA-Z:_])").join("|")),
            Z = [{
                begin: /[a-zA-Z@]+/
            }, {
                begin: /[^a-zA-Z@]?/
            }],
            D = [{
                begin: /\^{6}[0-9a-f]{6}/
            }, {
                begin: /\^{5}[0-9a-f]{5}/
            }, {
                begin: /\^{4}[0-9a-f]{4}/
            }, {
                begin: /\^{3}[0-9a-f]{3}/
            }, {
                begin: /\^{2}[0-9a-f]{2}/
            }, {
                begin: /\^{2}[\u0000-\u007f]/
            }],
            G = {
                className: "keyword",
                begin: /\\/,
                relevance: 0,
                contains: [{
                    endsParent: !0,
                    begin: B
                }, {
                    endsParent: !0,
                    begin: Q
                }, {
                    endsParent: !0,
                    variants: D
                }, {
                    endsParent: !0,
                    relevance: 0,
                    variants: Z
                }]
            },
            F = {
                className: "params",
                relevance: 0,
                begin: /#+\d?/
            },
            I = {
                variants: D
            },
            Y = {
                className: "built_in",
                relevance: 0,
                begin: /[$&^_]/
            },
            W = {
                className: "meta",
                begin: "% !TeX",
                end: "$",
                relevance: 10
            },
            J = A.COMMENT("%", "$", {
                relevance: 0
            }),
            X = [G, F, I, Y, W, J],
            V = {
                begin: /\{/,
                end: /\}/,
                relevance: 0,
                contains: ["self", ...X]
            },
            C = A.inherit(V, {
                relevance: 0,
                endsParent: !0,
                contains: [V, ...X]
            }),
            K = {
                begin: /\[/,
                end: /\]/,
                endsParent: !0,
                relevance: 0,
                contains: [V, ...X]
            },
            H = {
                begin: /\s+/,
                relevance: 0
            },
            z = [C],
            $ = [K],
            L = function(k, c) {
                return {
                    contains: [H],
                    starts: {
                        relevance: 0,
                        contains: k,
                        starts: c
                    }
                }
            },
            N = function(k, c) {
                return {
                    begin: "\\\\" + k + "(?![a-zA-Z@:_])",
                    keywords: {
                        $pattern: /\\[a-zA-Z]+/,
                        keyword: "\\" + k
                    },
                    relevance: 0,
                    contains: [H],
                    starts: c
                }
            },
            R = function(k, c) {
                return A.inherit({
                    begin: "\\\\begin(?=[ 	]*(\\r?\\n[ 	]*)?\\{" + k + "\\})",
                    keywords: {
                        $pattern: /\\[a-zA-Z]+/,
                        keyword: "\\begin"
                    },
                    relevance: 0
                }, L(z, c))
            },
            O = (k = "string") => {
                return A.END_SAME_AS_BEGIN({
                    className: k,
                    begin: /(.|\r?\n)/,
                    end: /(.|\r?\n)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    endsParent: !0
                })
            },
            P = function(k) {
                return {
                    className: "string",
                    end: "(?=\\\\end\\{" + k + "\\})"
                }
            },
            j = (k = "string") => {
                return {
                    relevance: 0,
                    begin: /\{/,
                    starts: {
                        endsParent: !0,
                        contains: [{
                            className: k,
                            end: /(?=\})/,
                            endsParent: !0,
                            contains: [{
                                begin: /\{/,
                                end: /\}/,
                                relevance: 0,
                                contains: ["self"]
                            }]
                        }]
                    }
                }
            },
            f = [...["verb", "lstinline"].map((k) => N(k, {
                contains: [O()]
            })), N("mint", L(z, {
                contains: [O()]
            })), N("mintinline", L(z, {
                contains: [j(), O()]
            })), N("url", {
                contains: [j("link"), j("link")]
            }), N("hyperref", {
                contains: [j("link")]
            }), N("href", L($, {
                contains: [j("link")]
            })), ...[].concat(...["", "\\*"].map((k) => [R("verbatim" + k, P("verbatim" + k)), R("filecontents" + k, L(z, P("filecontents" + k))), ...["", "B", "L"].map((c) => R(c + "Verbatim" + k, L($, P(c + "Verbatim" + k))))])), R("minted", L($, L(z, P("minted"))))];
        return {
            name: "LaTeX",
            aliases: ["tex"],
            contains: [...f, ...X]
        }
    }
    vaA.exports = O54
});
var haA = E((DJ5, faA) => {
    function T54(A) {
        return {
            name: "LDIF",
            contains: [{
                className: "attribute",
                begin: "^dn",
                end: ": ",
                excludeEnd: !0,
                starts: {
                    end: "$",
                    relevance: 0
                },
                relevance: 10
            }, {
                className: "attribute",
                begin: "^\\w",
                end: ": ",
                excludeEnd: !0,
                starts: {
                    end: "$",
                    relevance: 0
                }
            }, {
                className: "literal",
                begin: "^-",
                end: "$"
            }, A.HASH_COMMENT_MODE]
        }
    }
    faA.exports = T54
});
var uaA = E((GJ5, gaA) => {
    function P54(A) {
        return {
            name: "Leaf",
            contains: [{
                className: "function",
                begin: "#+[A-Za-z_0-9]*\\(",
                end: / \{/,
                returnBegin: !0,
                excludeEnd: !0,
                contains: [{
                    className: "keyword",
                    begin: "#+"
                }, {
                    className: "title",
                    begin: "[A-Za-z_][A-Za-z_0-9]*"
                }, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)",
                    endsParent: !0,
                    contains: [{
                        className: "string",
                        begin: '"',
                        end: '"'
                    }, {
                        className: "variable",
                        begin: "[A-Za-z_][A-Za-z_0-9]*"
                    }]
                }]
            }]
        }
    }
    gaA.exports = P54
});
var laA = E((FJ5, caA) => {
    var S54 = (A) => {
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
        j54 = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
        k54 = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"],
        maA = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"],
        daA = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"],
        y54 = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse(),
        _54 = maA.concat(daA);

    function x54(A) {
        let B = S54(A),
            Q = _54,
            Z = "and or not only",
            D = "[\\w-]+",
            G = "([\\w-]+|@\\{[\\w-]+\\})",
            F = [],
            I = [],
            Y = function(N) {
                return {
                    className: "string",
                    begin: "~?" + N + ".*?" + N
                }
            },
            W = function(N, R, O) {
                return {
                    className: N,
                    begin: R,
                    relevance: O
                }
            },
            J = {
                $pattern: /[a-z-]+/,
                keyword: "and or not only",
                attribute: k54.join(" ")
            },
            X = {
                begin: "\\(",
                end: "\\)",
                contains: I,
                keywords: J,
                relevance: 0
            };
        I.push(A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Y("'"), Y('"'), A.CSS_NUMBER_MODE, {
            begin: "(url|data-uri)\\(",
            starts: {
                className: "string",
                end: "[\\)\\n]",
                excludeEnd: !0
            }
        }, B.HEXCOLOR, X, W("variable", "@@?[\\w-]+", 10), W("variable", "@\\{[\\w-]+\\}"), W("built_in", "~?`[^`]*?`"), {
            className: "attribute",
            begin: "[\\w-]+\\s*:",
            end: ":",
            returnBegin: !0,
            excludeEnd: !0
        }, B.IMPORTANT);
        let V = I.concat({
                begin: /\{/,
                end: /\}/,
                contains: F
            }),
            C = {
                beginKeywords: "when",
                endsWithParent: !0,
                contains: [{
                    beginKeywords: "and not"
                }].concat(I)
            },
            K = {
                begin: G + "\\s*:",
                returnBegin: !0,
                end: /[;}]/,
                relevance: 0,
                contains: [{
                    begin: /-(webkit|moz|ms|o)-/
                }, {
                    className: "attribute",
                    begin: "\\b(" + y54.join("|") + ")\\b",
                    end: /(?=:)/,
                    starts: {
                        endsWithParent: !0,
                        illegal: "[<=$]",
                        relevance: 0,
                        contains: I
                    }
                }]
            },
            H = {
                className: "keyword",
                begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
                starts: {
                    end: "[;{}]",
                    keywords: J,
                    returnEnd: !0,
                    contains: I,
                    relevance: 0
                }
            },
            z = {
                className: "variable",
                variants: [{
                    begin: "@[\\w-]+\\s*:",
                    relevance: 15
                }, {
                    begin: "@[\\w-]+"
                }],
                starts: {
                    end: "[;}]",
                    returnEnd: !0,
                    contains: V
                }
            },
            $ = {
                variants: [{
                    begin: "[\\.#:&\\[>]",
                    end: "[;{}]"
                }, {
                    begin: G,
                    end: /\{/
                }],
                returnBegin: !0,
                returnEnd: !0,
                illegal: `[<='$"]`,
                relevance: 0,
                contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, C, W("keyword", "all\\b"), W("variable", "@\\{[\\w-]+\\}"), {
                    begin: "\\b(" + j54.join("|") + ")\\b",
                    className: "selector-tag"
                }, W("selector-tag", G + "%?", 0), W("selector-id", "#" + G), W("selector-class", "\\." + G, 0), W("selector-tag", "&", 0), B.ATTRIBUTE_SELECTOR_MODE, {
                    className: "selector-pseudo",
                    begin: ":(" + maA.join("|") + ")"
                }, {
                    className: "selector-pseudo",
                    begin: "::(" + daA.join("|") + ")"
                }, {
                    begin: "\\(",
                    end: "\\)",
                    contains: V
                }, {
                    begin: "!important"
                }]
            },
            L = {
                begin: `[\\w-]+:(:)?(${Q.join("|")})`,
                returnBegin: !0,
                contains: [$]
            };
        return F.push(A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, H, z, L, K, $), {
            name: "Less",
            case_insensitive: !0,
            illegal: `[=>'/<($"]`,
            contains: F
        }
    }
    caA.exports = x54
});