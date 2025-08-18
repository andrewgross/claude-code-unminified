/* chunk:217 bytes:[4749817, 4768605) size:18788 source:unpacked-cli.js */
var YtA = E((_X5, ItA) => {
    var DtA = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
        GtA = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        c74 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
        l74 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
        p74 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
        i74 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
        FtA = [].concat(p74, i74, c74, l74);

    function n74(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function ZtA(A) {
        return mQ0("(?=", A, ")")
    }

    function mQ0(...A) {
        return A.map((Q) => n74(Q)).join("")
    }

    function a74(A) {
        let B = (R, {
                after: O
            }) => {
                let P = "</" + R[0].slice(1);
                return R.input.indexOf(P, O) !== -1
            },
            Q = "[A-Za-z$_][0-9A-Za-z$_]*",
            Z = {
                begin: "<>",
                end: "</>"
            },
            D = {
                begin: /<[A-Za-z0-9\\._:-]+/,
                end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                isTrulyOpeningTag: (R, O) => {
                    let P = R[0].length + R.index,
                        j = R.input[P];
                    if (j === "<") {
                        O.ignoreMatch();
                        return
                    }
                    if (j === ">") {
                        if (!B(R, {
                                after: P
                            })) O.ignoreMatch()
                    }
                }
            },
            G = {
                $pattern: "[A-Za-z$_][0-9A-Za-z$_]*",
                keyword: DtA,
                literal: GtA,
                built_in: FtA
            },
            F = "[0-9](_?[0-9])*",
            I = "\\.([0-9](_?[0-9])*)",
            Y = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
            W = {
                className: "number",
                variants: [{
                    begin: "(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((\\.([0-9](_?[0-9])*))|\\.)?|(\\.([0-9](_?[0-9])*)))[eE][+-]?([0-9](_?[0-9])*)\\b"
                }, {
                    begin: "\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((\\.([0-9](_?[0-9])*))\\b|\\.)?|(\\.([0-9](_?[0-9])*))\\b"
                }, {
                    begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                }, {
                    begin: "\\b0[0-7]+n?\\b"
                }],
                relevance: 0
            },
            J = {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}",
                keywords: G,
                contains: []
            },
            X = {
                begin: "html`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [A.BACKSLASH_ESCAPE, J],
                    subLanguage: "xml"
                }
            },
            V = {
                begin: "css`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [A.BACKSLASH_ESCAPE, J],
                    subLanguage: "css"
                }
            },
            C = {
                className: "string",
                begin: "`",
                end: "`",
                contains: [A.BACKSLASH_ESCAPE, J]
            },
            H = {
                className: "comment",
                variants: [A.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                    relevance: 0,
                    contains: [{
                        className: "doctag",
                        begin: "@[A-Za-z]+",
                        contains: [{
                            className: "type",
                            begin: "\\{",
                            end: "\\}",
                            relevance: 0
                        }, {
                            className: "variable",
                            begin: "[A-Za-z$_][0-9A-Za-z$_]*(?=\\s*(-)|$)",
                            endsParent: !0,
                            relevance: 0
                        }, {
                            begin: /(?=[^\n])\s/,
                            relevance: 0
                        }]
                    }]
                }), A.C_BLOCK_COMMENT_MODE, A.C_LINE_COMMENT_MODE]
            },
            z = [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, X, V, C, W, A.REGEXP_MODE];
        J.contains = z.concat({
            begin: /\{/,
            end: /\}/,
            keywords: G,
            contains: ["self"].concat(z)
        });
        let $ = [].concat(H, J.contains),
            L = $.concat([{
                begin: /\(/,
                end: /\)/,
                keywords: G,
                contains: ["self"].concat($)
            }]),
            N = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: G,
                contains: L
            };
        return {
            name: "Javascript",
            aliases: ["js", "jsx", "mjs", "cjs"],
            keywords: G,
            exports: {
                PARAMS_CONTAINS: L
            },
            illegal: /#(?![$_A-z])/,
            contains: [A.SHEBANG({
                label: "shebang",
                binary: "node",
                relevance: 5
            }), {
                label: "use_strict",
                className: "meta",
                relevance: 10,
                begin: /^\s*['"]use (strict|asm)['"]/
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, X, V, C, H, W, {
                begin: mQ0(/[{,\n]\s*/, ZtA(mQ0(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, "[A-Za-z$_][0-9A-Za-z$_]*\\s*:"))),
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*" + ZtA("\\s*:"),
                    relevance: 0
                }]
            }, {
                begin: "(" + A.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                keywords: "return throw case",
                contains: [H, A.REGEXP_MODE, {
                    className: "function",
                    begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + A.UNDERSCORE_IDENT_RE + ")\\s*=>",
                    returnBegin: !0,
                    end: "\\s*=>",
                    contains: [{
                        className: "params",
                        variants: [{
                            begin: A.UNDERSCORE_IDENT_RE,
                            relevance: 0
                        }, {
                            className: null,
                            begin: /\(\s*\)/,
                            skip: !0
                        }, {
                            begin: /\(/,
                            end: /\)/,
                            excludeBegin: !0,
                            excludeEnd: !0,
                            keywords: G,
                            contains: L
                        }]
                    }]
                }, {
                    begin: /,/,
                    relevance: 0
                }, {
                    className: "",
                    begin: /\s/,
                    end: /\s*/,
                    skip: !0
                }, {
                    variants: [{
                        begin: Z.begin,
                        end: Z.end
                    }, {
                        begin: D.begin,
                        "on:begin": D.isTrulyOpeningTag,
                        end: D.end
                    }],
                    subLanguage: "xml",
                    contains: [{
                        begin: D.begin,
                        end: D.end,
                        skip: !0,
                        contains: ["self"]
                    }]
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "function",
                end: /[{;]/,
                excludeEnd: !0,
                keywords: G,
                contains: ["self", A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*"
                }), N],
                illegal: /%/
            }, {
                beginKeywords: "while if switch catch for"
            }, {
                className: "function",
                begin: A.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                returnBegin: !0,
                contains: [N, A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*"
                })]
            }, {
                variants: [{
                    begin: "\\.[A-Za-z$_][0-9A-Za-z$_]*"
                }, {
                    begin: "\\$[A-Za-z$_][0-9A-Za-z$_]*"
                }],
                relevance: 0
            }, {
                className: "class",
                beginKeywords: "class",
                end: /[{;=]/,
                excludeEnd: !0,
                illegal: /[:"[\]]/,
                contains: [{
                    beginKeywords: "extends"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                begin: /\b(?=constructor)/,
                end: /[{;]/,
                excludeEnd: !0,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*"
                }), "self", N]
            }, {
                begin: "(get|set)\\s+(?=[A-Za-z$_][0-9A-Za-z$_]*\\()",
                end: /\{/,
                keywords: "get set",
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*"
                }), {
                    begin: /\(\)/
                }, N]
            }, {
                begin: /\$[(.]/
            }]
        }
    }

    function s74(A) {
        let Q = {
                beginKeywords: "namespace",
                end: /\{/,
                excludeEnd: !0
            },
            Z = {
                beginKeywords: "interface",
                end: /\{/,
                excludeEnd: !0,
                keywords: "interface extends"
            },
            D = {
                className: "meta",
                relevance: 10,
                begin: /^\s*['"]use strict['"]/
            },
            G = ["any", "void", "number", "boolean", "string", "object", "never", "enum"],
            F = ["type", "namespace", "typedef", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly"],
            I = {
                $pattern: "[A-Za-z$_][0-9A-Za-z$_]*",
                keyword: DtA.concat(F),
                literal: GtA,
                built_in: FtA.concat(G)
            },
            Y = {
                className: "meta",
                begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
            },
            W = (V, C, K) => {
                let H = V.contains.findIndex((z) => z.label === C);
                if (H === -1) throw new Error("can not find mode to replace");
                V.contains.splice(H, 1, K)
            },
            J = a74(A);
        Object.assign(J.keywords, I), J.exports.PARAMS_CONTAINS.push(Y), J.contains = J.contains.concat([Y, Q, Z]), W(J, "shebang", A.SHEBANG()), W(J, "use_strict", D);
        let X = J.contains.find((V) => V.className === "function");
        return X.relevance = 0, Object.assign(J, {
            name: "TypeScript",
            aliases: ["ts", "tsx"]
        }), J
    }
    ItA.exports = s74
});
var JtA = E((xX5, WtA) => {
    function r74(A) {
        return {
            name: "Vala",
            keywords: {
                keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override virtual delegate if while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
                built_in: "DBus GLib CCode Gee Object Gtk Posix",
                literal: "false true null"
            },
            contains: [{
                className: "class",
                beginKeywords: "class interface namespace",
                end: /\{/,
                excludeEnd: !0,
                illegal: "[^,:\\n\\s\\.]",
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "string",
                begin: '"""',
                end: '"""',
                relevance: 5
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "^#",
                end: "$",
                relevance: 2
            }]
        }
    }
    WtA.exports = r74
});
var CtA = E((vX5, VtA) => {
    function XtA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function t$1(...A) {
        return A.map((Q) => XtA(Q)).join("")
    }

    function dQ0(...A) {
        return "(" + A.map((Q) => XtA(Q)).join("|") + ")"
    }

    function o74(A) {
        let B = {
                className: "string",
                begin: /"(""|[^/n])"C\b/
            },
            Q = {
                className: "string",
                begin: /"/,
                end: /"/,
                illegal: /\n/,
                contains: [{
                    begin: /""/
                }]
            },
            Z = /\d{1,2}\/\d{1,2}\/\d{4}/,
            D = /\d{4}-\d{1,2}-\d{1,2}/,
            G = /(\d|1[012])(:\d+){0,2} *(AM|PM)/,
            F = /\d{1,2}(:\d{1,2}){1,2}/,
            I = {
                className: "literal",
                variants: [{
                    begin: t$1(/# */, dQ0(D, Z), / *#/)
                }, {
                    begin: t$1(/# */, F, / *#/)
                }, {
                    begin: t$1(/# */, G, / *#/)
                }, {
                    begin: t$1(/# */, dQ0(D, Z), / +/, dQ0(G, F), / *#/)
                }]
            },
            Y = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
                }, {
                    begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
                }, {
                    begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
                }, {
                    begin: /&O[0-7_]+((U?[SIL])|[%&])?/
                }, {
                    begin: /&B[01_]+((U?[SIL])|[%&])?/
                }]
            },
            W = {
                className: "label",
                begin: /^\w+:/
            },
            J = A.COMMENT(/'''/, /$/, {
                contains: [{
                    className: "doctag",
                    begin: /<\/?/,
                    end: />/
                }]
            }),
            X = A.COMMENT(null, /$/, {
                variants: [{
                    begin: /'/
                }, {
                    begin: /([\t ]|^)REM(?=\s)/
                }]
            });
        return {
            name: "Visual Basic .NET",
            aliases: ["vb"],
            case_insensitive: !0,
            classNameAliases: {
                label: "symbol"
            },
            keywords: {
                keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
                built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
                type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
                literal: "true false nothing"
            },
            illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
            contains: [B, Q, I, Y, W, J, X, {
                className: "meta",
                begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
                end: /$/,
                keywords: {
                    "meta-keyword": "const disable else elseif enable end externalsource if region then"
                },
                contains: [X]
            }]
        }
    }
    VtA.exports = o74
});