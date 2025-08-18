/* chunk:206 bytes:[4558245, 4577466) size:19221 source:unpacked-cli.js */
var SrA = E((rJ5, PrA) => {
    function _34(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function x34(A) {
        return v34("(?=", A, ")")
    }

    function v34(...A) {
        return A.map((Q) => _34(Q)).join("")
    }

    function b34(A) {
        let G = {
                $pattern: /[A-Za-z]\w+|__\w+__/,
                keyword: ["and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"],
                built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
                literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
                type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
            },
            F = {
                className: "meta",
                begin: /^(>>>|\.\.\.) /
            },
            I = {
                className: "subst",
                begin: /\{/,
                end: /\}/,
                keywords: G,
                illegal: /#/
            },
            Y = {
                begin: /\{\{/,
                relevance: 0
            },
            W = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE],
                variants: [{
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                    end: /'''/,
                    contains: [A.BACKSLASH_ESCAPE, F],
                    relevance: 10
                }, {
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                    end: /"""/,
                    contains: [A.BACKSLASH_ESCAPE, F],
                    relevance: 10
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                    end: /'''/,
                    contains: [A.BACKSLASH_ESCAPE, F, Y, I]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                    end: /"""/,
                    contains: [A.BACKSLASH_ESCAPE, F, Y, I]
                }, {
                    begin: /([uU]|[rR])'/,
                    end: /'/,
                    relevance: 10
                }, {
                    begin: /([uU]|[rR])"/,
                    end: /"/,
                    relevance: 10
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])'/,
                    end: /'/
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])"/,
                    end: /"/
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'/,
                    end: /'/,
                    contains: [A.BACKSLASH_ESCAPE, Y, I]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"/,
                    end: /"/,
                    contains: [A.BACKSLASH_ESCAPE, Y, I]
                }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
            },
            J = "[0-9](_?[0-9])*",
            X = "(\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.",
            V = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: "(\\b([0-9](_?[0-9])*)|((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.))[eE][+-]?([0-9](_?[0-9])*)[jJ]?\\b"
                }, {
                    begin: "((\\b([0-9](_?[0-9])*))?\\.([0-9](_?[0-9])*)|\\b([0-9](_?[0-9])*)\\.)[jJ]?"
                }, {
                    begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
                }, {
                    begin: "\\b0[bB](_?[01])+[lL]?\\b"
                }, {
                    begin: "\\b0[oO](_?[0-7])+[lL]?\\b"
                }, {
                    begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
                }, {
                    begin: "\\b([0-9](_?[0-9])*)[jJ]\\b"
                }]
            },
            C = {
                className: "comment",
                begin: x34(/# type:/),
                end: /$/,
                keywords: G,
                contains: [{
                    begin: /# type:/
                }, {
                    begin: /#/,
                    end: /\b\B/,
                    endsWithParent: !0
                }]
            },
            K = {
                className: "params",
                variants: [{
                    className: "",
                    begin: /\(\s*\)/,
                    skip: !0
                }, {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: G,
                    contains: ["self", F, V, W, A.HASH_COMMENT_MODE]
                }]
            };
        return I.contains = [W, V, F], {
            name: "Python",
            aliases: ["py", "gyp", "ipython"],
            keywords: G,
            illegal: /(<\/|->|\?)|=>/,
            contains: [F, V, {
                begin: /\bself\b/
            }, {
                beginKeywords: "if",
                relevance: 0
            }, W, C, A.HASH_COMMENT_MODE, {
                variants: [{
                    className: "function",
                    beginKeywords: "def"
                }, {
                    className: "class",
                    beginKeywords: "class"
                }],
                end: /:/,
                illegal: /[${=;\n,]/,
                contains: [A.UNDERSCORE_TITLE_MODE, K, {
                    begin: /->/,
                    endsWithParent: !0,
                    keywords: G
                }]
            }, {
                className: "meta",
                begin: /^[\t ]*@/,
                end: /(?=#)|$/,
                contains: [V, K, W]
            }]
        }
    }
    PrA.exports = b34
});
var krA = E((oJ5, jrA) => {
    function f34(A) {
        return {
            aliases: ["pycon"],
            contains: [{
                className: "meta",
                starts: {
                    end: / |$/,
                    starts: {
                        end: "$",
                        subLanguage: "python"
                    }
                },
                variants: [{
                    begin: /^>>>(?=[ ]|$)/
                }, {
                    begin: /^\.\.\.(?=[ ]|$)/
                }]
            }]
        }
    }
    jrA.exports = f34
});
var _rA = E((tJ5, yrA) => {
    function h34(A) {
        return {
            name: "Q",
            aliases: ["k", "kdb"],
            keywords: {
                $pattern: /(`?)[A-Za-z0-9_]+\b/,
                keyword: "do while select delete by update from",
                literal: "0b 1b",
                built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
                type: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE]
        }
    }
    yrA.exports = h34
});
var vrA = E((eJ5, xrA) => {
    function g34(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function u34(...A) {
        return A.map((Q) => g34(Q)).join("")
    }

    function m34(A) {
        let B = {
                keyword: "in of on if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Behavior bool color coordinate date double enumeration font geocircle georectangle geoshape int list matrix4x4 parent point quaternion real rect size string url variant vector2d vector3d vector4d Promise"
            },
            Q = "[a-zA-Z_][a-zA-Z0-9\\._]*",
            Z = {
                className: "keyword",
                begin: "\\bproperty\\b",
                starts: {
                    className: "string",
                    end: "(:|=|;|,|//|/\\*|$)",
                    returnEnd: !0
                }
            },
            D = {
                className: "keyword",
                begin: "\\bsignal\\b",
                starts: {
                    className: "string",
                    end: "(\\(|:|=|;|,|//|/\\*|$)",
                    returnEnd: !0
                }
            },
            G = {
                className: "attribute",
                begin: "\\bid\\s*:",
                starts: {
                    className: "string",
                    end: "[a-zA-Z_][a-zA-Z0-9\\._]*",
                    returnEnd: !1
                }
            },
            F = {
                begin: "[a-zA-Z_][a-zA-Z0-9\\._]*\\s*:",
                returnBegin: !0,
                contains: [{
                    className: "attribute",
                    begin: "[a-zA-Z_][a-zA-Z0-9\\._]*",
                    end: "\\s*:",
                    excludeEnd: !0,
                    relevance: 0
                }],
                relevance: 0
            },
            I = {
                begin: u34("[a-zA-Z_][a-zA-Z0-9\\._]*", /\s*\{/),
                end: /\{/,
                returnBegin: !0,
                relevance: 0,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[a-zA-Z_][a-zA-Z0-9\\._]*"
                })]
            };
        return {
            name: "QML",
            aliases: ["qt"],
            case_insensitive: !1,
            keywords: B,
            contains: [{
                className: "meta",
                begin: /^\s*['"]use (strict|asm)['"]/
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                className: "string",
                begin: "`",
                end: "`",
                contains: [A.BACKSLASH_ESCAPE, {
                    className: "subst",
                    begin: "\\$\\{",
                    end: "\\}"
                }]
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "number",
                variants: [{
                    begin: "\\b(0[bB][01]+)"
                }, {
                    begin: "\\b(0[oO][0-7]+)"
                }, {
                    begin: A.C_NUMBER_RE
                }],
                relevance: 0
            }, {
                begin: "(" + A.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                keywords: "return throw case",
                contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.REGEXP_MODE, {
                    begin: /</,
                    end: />\s*[);\]]/,
                    relevance: 0,
                    subLanguage: "xml"
                }],
                relevance: 0
            }, D, Z, {
                className: "function",
                beginKeywords: "function",
                end: /\{/,
                excludeEnd: !0,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
                }],
                illegal: /\[|%/
            }, {
                begin: "\\." + A.IDENT_RE,
                relevance: 0
            }, G, F, I],
            illegal: /#/
        }
    }
    xrA.exports = m34
});
var frA = E((AX5, brA) => {
    function d34(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function c34(A) {
        return xQ0("(?=", A, ")")
    }

    function xQ0(...A) {
        return A.map((Q) => d34(Q)).join("")
    }

    function l34(A) {
        let B = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/,
            Q = /[a-zA-Z][a-zA-Z_0-9]*/;
        return {
            name: "R",
            illegal: /->/,
            keywords: {
                $pattern: B,
                keyword: "function if in break next repeat else for while",
                literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
                built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
            },
            compilerExtensions: [(Z, D) => {
                if (!Z.beforeMatch) return;
                if (Z.starts) throw new Error("beforeMatch cannot be used with starts");
                let G = Object.assign({}, Z);
                Object.keys(Z).forEach((F) => {
                    delete Z[F]
                }), Z.begin = xQ0(G.beforeMatch, c34(G.begin)), Z.starts = {
                    relevance: 0,
                    contains: [Object.assign(G, {
                        endsParent: !0
                    })]
                }, Z.relevance = 0, delete G.beforeMatch
            }],
            contains: [A.COMMENT(/#'/, /$/, {
                contains: [{
                    className: "doctag",
                    begin: "@examples",
                    starts: {
                        contains: [{
                            begin: /\n/
                        }, {
                            begin: /#'\s*(?=@[a-zA-Z]+)/,
                            endsParent: !0
                        }, {
                            begin: /#'/,
                            end: /$/,
                            excludeBegin: !0
                        }]
                    }
                }, {
                    className: "doctag",
                    begin: "@param",
                    end: /$/,
                    contains: [{
                        className: "variable",
                        variants: [{
                            begin: B
                        }, {
                            begin: /`(?:\\.|[^`\\])+`/
                        }],
                        endsParent: !0
                    }]
                }, {
                    className: "doctag",
                    begin: /@[a-zA-Z]+/
                }, {
                    className: "meta-keyword",
                    begin: /\\[a-zA-Z]+/
                }]
            }), A.HASH_COMMENT_MODE, {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE],
                variants: [A.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\(/,
                    end: /\)(-*)"/
                }), A.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\{/,
                    end: /\}(-*)"/
                }), A.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\[/,
                    end: /\](-*)"/
                }), A.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\(/,
                    end: /\)(-*)'/
                }), A.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\{/,
                    end: /\}(-*)'/
                }), A.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\[/,
                    end: /\](-*)'/
                }), {
                    begin: '"',
                    end: '"',
                    relevance: 0
                }, {
                    begin: "'",
                    end: "'",
                    relevance: 0
                }]
            }, {
                className: "number",
                relevance: 0,
                beforeMatch: /([^a-zA-Z0-9._])/,
                variants: [{
                    match: /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/
                }, {
                    match: /0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/
                }, {
                    match: /(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/
                }]
            }, {
                begin: "%",
                end: "%"
            }, {
                begin: xQ0(Q, "\\s+<-\\s+")
            }, {
                begin: "`",
                end: "`",
                contains: [{
                    begin: /\\./
                }]
            }]
        }
    }
    brA.exports = l34
});