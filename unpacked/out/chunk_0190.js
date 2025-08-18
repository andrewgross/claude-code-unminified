/* chunk:190 bytes:[4184529, 4203313) size:18784 source:unpacked-cli.js */
var waA = E((sW5, UaA) => {
    var Fs = "[0-9](_*[0-9])*",
        p$1 = `\\.(${Fs})`,
        i$1 = "[0-9a-fA-F](_*[0-9a-fA-F])*",
        F54 = {
            className: "number",
            variants: [{
                begin: `(\\b(${Fs})((${p$1})|\\.)?|(${p$1}))[eE][+-]?(${Fs})[fFdD]?\\b`
            }, {
                begin: `\\b(${Fs})((${p$1})[fFdD]?\\b|\\.([fFdD]\\b)?)`
            }, {
                begin: `(${p$1})[fFdD]?\\b`
            }, {
                begin: `\\b(${Fs})[fFdD]\\b`
            }, {
                begin: `\\b0[xX]((${i$1})\\.?|(${i$1})?\\.(${i$1}))[pP][+-]?(${Fs})[fFdD]?\\b`
            }, {
                begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
            }, {
                begin: `\\b0[xX](${i$1})[lL]?\\b`
            }, {
                begin: "\\b0(_*[0-7])*[lL]?\\b"
            }, {
                begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
            }],
            relevance: 0
        };

    function I54(A) {
        var B = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
            Q = B + "(<" + B + "(\\s*,\\s*" + B + ")*>)?",
            Z = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
            D = {
                className: "meta",
                begin: "@" + B,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    contains: ["self"]
                }]
            };
        let G = F54;
        return {
            name: "Java",
            aliases: ["jsp"],
            keywords: Z,
            illegal: /<\/|#/,
            contains: [A.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    begin: /\w+@/,
                    relevance: 0
                }, {
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), {
                begin: /import java\.[a-z]+\./,
                keywords: "import",
                relevance: 2
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                className: "class",
                beginKeywords: "class interface enum",
                end: /[{;=]/,
                excludeEnd: !0,
                relevance: 1,
                keywords: "class interface enum",
                illegal: /[:"\[\]]/,
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "new throw return else",
                relevance: 0
            }, {
                className: "class",
                begin: "record\\s+" + A.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                excludeEnd: !0,
                end: /[{;=]/,
                keywords: Z,
                contains: [{
                    beginKeywords: "record"
                }, {
                    begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [A.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: Z,
                    relevance: 0,
                    contains: [A.C_BLOCK_COMMENT_MODE]
                }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            }, {
                className: "function",
                begin: "(" + Q + "\\s+)+" + A.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: Z,
                contains: [{
                    begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [A.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: Z,
                    relevance: 0,
                    contains: [D, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, G, A.C_BLOCK_COMMENT_MODE]
                }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            }, G, D]
        }
    }
    UaA.exports = I54
});
var NaA = E((rW5, qaA) => {
    var Y54 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
        W54 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        J54 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
        X54 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
        V54 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
        C54 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
        K54 = [].concat(V54, C54, J54, X54);

    function H54(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function $aA(A) {
        return _Q0("(?=", A, ")")
    }

    function _Q0(...A) {
        return A.map((Q) => H54(Q)).join("")
    }

    function z54(A) {
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
                keyword: Y54,
                literal: W54,
                built_in: K54
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
                begin: _Q0(/[{,\n]\s*/, $aA(_Q0(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, "[A-Za-z$_][0-9A-Za-z$_]*\\s*:"))),
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: "[A-Za-z$_][0-9A-Za-z$_]*" + $aA("\\s*:"),
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
    qaA.exports = z54
});
var MaA = E((oW5, LaA) => {
    function E54(A) {
        let Q = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                contains: [{
                    begin: /[\w-]+ *=/,
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{
                        className: "attr",
                        begin: /[\w-]+/
                    }]
                }],
                relevance: 0
            },
            Z = {
                className: "function",
                begin: /:[\w\-.]+/,
                relevance: 0
            },
            D = {
                className: "string",
                begin: /\B([\/.])[\w\-.\/=]+/
            },
            G = {
                className: "params",
                begin: /--[\w\-=\/]+/
            };
        return {
            name: "JBoss CLI",
            aliases: ["wildfly-cli"],
            keywords: {
                $pattern: "[a-z-]+",
                keyword: "alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",
                literal: "true false"
            },
            contains: [A.HASH_COMMENT_MODE, A.QUOTE_STRING_MODE, G, Z, D, Q]
        }
    }
    LaA.exports = E54
});
var OaA = E((tW5, RaA) => {
    function U54(A) {
        let B = {
                literal: "true false null"
            },
            Q = [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE],
            Z = [A.QUOTE_STRING_MODE, A.C_NUMBER_MODE],
            D = {
                end: ",",
                endsWithParent: !0,
                excludeEnd: !0,
                contains: Z,
                keywords: B
            },
            G = {
                begin: /\{/,
                end: /\}/,
                contains: [{
                    className: "attr",
                    begin: /"/,
                    end: /"/,
                    contains: [A.BACKSLASH_ESCAPE],
                    illegal: "\\n"
                }, A.inherit(D, {
                    begin: /:/
                })].concat(Q),
                illegal: "\\S"
            },
            F = {
                begin: "\\[",
                end: "\\]",
                contains: [A.inherit(D)],
                illegal: "\\S"
            };
        return Z.push(G, F), Q.forEach(function(I) {
            Z.push(I)
        }), {
            name: "JSON",
            contains: Z,
            keywords: B,
            illegal: "\\S"
        }
    }
    RaA.exports = U54
});