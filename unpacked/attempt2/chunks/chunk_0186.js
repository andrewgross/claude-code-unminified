/* chunk:186 bytes:[4058994, 4076691) size:17697 source:unpacked-cli.js */
var fnA = E((_W5, bnA) => {
    function S84(A) {
        let B = {
            keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
            literal: "true false iota nil",
            built_in: "append cap close complex copy imag len make new panic print println real recover delete"
        };
        return {
            name: "Go",
            aliases: ["golang"],
            keywords: B,
            illegal: "</",
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "string",
                variants: [A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, {
                    begin: "`",
                    end: "`"
                }]
            }, {
                className: "number",
                variants: [{
                    begin: A.C_NUMBER_RE + "[i]",
                    relevance: 1
                }, A.C_NUMBER_MODE]
            }, {
                begin: /:=/
            }, {
                className: "function",
                beginKeywords: "func",
                end: "\\s*(\\{|$)",
                excludeEnd: !0,
                contains: [A.TITLE_MODE, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: B,
                    illegal: /["']/
                }]
            }]
        }
    }
    bnA.exports = S84
});
var gnA = E((xW5, hnA) => {
    function j84(A) {
        return {
            name: "Golo",
            keywords: {
                keyword: "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull DynamicObject|10 DynamicVariable struct Observable map set vector list array",
                literal: "true false null"
            },
            contains: [A.HASH_COMMENT_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "@[A-Za-z]+"
            }]
        }
    }
    hnA.exports = j84
});
var mnA = E((vW5, unA) => {
    function k84(A) {
        return {
            name: "Gradle",
            case_insensitive: !0,
            keywords: {
                keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.NUMBER_MODE, A.REGEXP_MODE]
        }
    }
    unA.exports = k84
});
var cnA = E((bW5, dnA) => {
    function y84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function _84(A) {
        return x84("(?=", A, ")")
    }

    function x84(...A) {
        return A.map((Q) => y84(Q)).join("")
    }

    function kQ0(A, B = {}) {
        return B.variants = A, B
    }

    function v84(A) {
        let Q = kQ0([A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    begin: /\w+@/,
                    relevance: 0
                }, {
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            })]),
            Z = {
                className: "regexp",
                begin: /~?\/[^\/\n]+\//,
                contains: [A.BACKSLASH_ESCAPE]
            },
            D = kQ0([A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE]),
            G = kQ0([{
                begin: /"""/,
                end: /"""/
            }, {
                begin: /'''/,
                end: /'''/
            }, {
                begin: "\\$/",
                end: "/\\$",
                relevance: 10
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE], {
                className: "string"
            });
        return {
            name: "Groovy",
            keywords: {
                built_in: "this super",
                literal: "true false null",
                keyword: "byte short char int long boolean float double void def as in assert trait abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
            },
            contains: [A.SHEBANG({
                binary: "groovy",
                relevance: 10
            }), Q, G, Z, D, {
                className: "class",
                beginKeywords: "class interface trait enum",
                end: /\{/,
                illegal: ":",
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                className: "meta",
                begin: "@[A-Za-z]+",
                relevance: 0
            }, {
                className: "attr",
                begin: "[A-Za-z0-9_$]+[ 	]*:",
                relevance: 0
            }, {
                begin: /\?/,
                end: /:/,
                relevance: 0,
                contains: [Q, G, Z, D, "self"]
            }, {
                className: "symbol",
                begin: "^[ 	]*" + _84("[A-Za-z0-9_$]+:"),
                excludeBegin: !0,
                end: "[A-Za-z0-9_$]+:",
                relevance: 0
            }],
            illegal: /#|<\//
        }
    }
    dnA.exports = v84
});
var pnA = E((fW5, lnA) => {
    function b84(A) {
        return {
            name: "HAML",
            case_insensitive: !0,
            contains: [{
                className: "meta",
                begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
                relevance: 10
            }, A.COMMENT("^\\s*(!=#|=#|-#|/).*$", !1, {
                relevance: 0
            }), {
                begin: "^\\s*(-|=|!=)(?!#)",
                starts: {
                    end: "\\n",
                    subLanguage: "ruby"
                }
            }, {
                className: "tag",
                begin: "^\\s*%",
                contains: [{
                    className: "selector-tag",
                    begin: "\\w+"
                }, {
                    className: "selector-id",
                    begin: "#[\\w-]+"
                }, {
                    className: "selector-class",
                    begin: "\\.[\\w-]+"
                }, {
                    begin: /\{\s*/,
                    end: /\s*\}/,
                    contains: [{
                        begin: ":\\w+\\s*=>",
                        end: ",\\s+",
                        returnBegin: !0,
                        endsWithParent: !0,
                        contains: [{
                            className: "attr",
                            begin: ":\\w+"
                        }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                            begin: "\\w+",
                            relevance: 0
                        }]
                    }]
                }, {
                    begin: "\\(\\s*",
                    end: "\\s*\\)",
                    excludeEnd: !0,
                    contains: [{
                        begin: "\\w+\\s*=",
                        end: "\\s+",
                        returnBegin: !0,
                        endsWithParent: !0,
                        contains: [{
                            className: "attr",
                            begin: "\\w+",
                            relevance: 0
                        }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                            begin: "\\w+",
                            relevance: 0
                        }]
                    }]
                }]
            }, {
                begin: "^\\s*[=~]\\s*"
            }, {
                begin: /#\{/,
                starts: {
                    end: /\}/,
                    subLanguage: "ruby"
                }
            }]
        }
    }
    lnA.exports = b84
});
var anA = E((hW5, nnA) => {
    function inA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function f84(A) {
        return M61("(", A, ")*")
    }

    function h84(A) {
        return M61("(", A, ")?")
    }

    function M61(...A) {
        return A.map((Q) => inA(Q)).join("")
    }

    function g84(...A) {
        return "(" + A.map((Q) => inA(Q)).join("|") + ")"
    }

    function u84(A) {
        let B = {
                "builtin-name": ["action", "bindattr", "collection", "component", "concat", "debugger", "each", "each-in", "get", "hash", "if", "in", "input", "link-to", "loc", "log", "lookup", "mut", "outlet", "partial", "query-params", "render", "template", "textarea", "unbound", "unless", "view", "with", "yield"]
            },
            Q = {
                literal: ["true", "false", "undefined", "null"]
            },
            Z = /""|"[^"]+"/,
            D = /''|'[^']+'/,
            G = /\[\]|\[[^\]]+\]/,
            F = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/,
            I = /(\.|\/)/,
            Y = g84(Z, D, G, F),
            W = M61(h84(/\.|\.\/|\//), Y, f84(M61(I, Y))),
            J = M61("(", G, "|", F, ")(?==)"),
            X = {
                begin: W,
                lexemes: /[\w.\/]+/
            },
            V = A.inherit(X, {
                keywords: Q
            }),
            C = {
                begin: /\(/,
                end: /\)/
            },
            K = {
                className: "attr",
                begin: J,
                relevance: 0,
                starts: {
                    begin: /=/,
                    end: /=/,
                    starts: {
                        contains: [A.NUMBER_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, V, C]
                    }
                }
            },
            H = {
                begin: /as\s+\|/,
                keywords: {
                    keyword: "as"
                },
                end: /\|/,
                contains: [{
                    begin: /\w+/
                }]
            },
            z = {
                contains: [A.NUMBER_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, H, K, V, C],
                returnEnd: !0
            },
            $ = A.inherit(X, {
                className: "name",
                keywords: B,
                starts: A.inherit(z, {
                    end: /\)/
                })
            });
        C.contains = [$];
        let L = A.inherit(X, {
                keywords: B,
                className: "name",
                starts: A.inherit(z, {
                    end: /\}\}/
                })
            }),
            N = A.inherit(X, {
                keywords: B,
                className: "name"
            }),
            R = A.inherit(X, {
                className: "name",
                keywords: B,
                starts: A.inherit(z, {
                    end: /\}\}/
                })
            });
        return {
            name: "Handlebars",
            aliases: ["hbs", "html.hbs", "html.handlebars", "htmlbars"],
            case_insensitive: !0,
            subLanguage: "xml",
            contains: [{
                begin: /\\\{\{/,
                skip: !0
            }, {
                begin: /\\\\(?=\{\{)/,
                skip: !0
            }, A.COMMENT(/\{\{!--/, /--\}\}/), A.COMMENT(/\{\{!/, /\}\}/), {
                className: "template-tag",
                begin: /\{\{\{\{(?!\/)/,
                end: /\}\}\}\}/,
                contains: [L],
                starts: {
                    end: /\{\{\{\{\//,
                    returnEnd: !0,
                    subLanguage: "xml"
                }
            }, {
                className: "template-tag",
                begin: /\{\{\{\{\//,
                end: /\}\}\}\}/,
                contains: [N]
            }, {
                className: "template-tag",
                begin: /\{\{#/,
                end: /\}\}/,
                contains: [L]
            }, {
                className: "template-tag",
                begin: /\{\{(?=else\}\})/,
                end: /\}\}/,
                keywords: "else"
            }, {
                className: "template-tag",
                begin: /\{\{(?=else if)/,
                end: /\}\}/,
                keywords: "else if"
            }, {
                className: "template-tag",
                begin: /\{\{\//,
                end: /\}\}/,
                contains: [N]
            }, {
                className: "template-variable",
                begin: /\{\{\{/,
                end: /\}\}\}/,
                contains: [R]
            }, {
                className: "template-variable",
                begin: /\{\{/,
                end: /\}\}/,
                contains: [R]
            }]
        }
    }
    nnA.exports = u84
});
var rnA = E((gW5, snA) => {
    function m84(A) {
        let B = {
                variants: [A.COMMENT("--", "$"), A.COMMENT(/\{-/, /-\}/, {
                    contains: ["self"]
                })]
            },
            Q = {
                className: "meta",
                begin: /\{-#/,
                end: /#-\}/
            },
            Z = {
                className: "meta",
                begin: "^#",
                end: "$"
            },
            D = {
                className: "type",
                begin: "\\b[A-Z][\\w']*",
                relevance: 0
            },
            G = {
                begin: "\\(",
                end: "\\)",
                illegal: '"',
                contains: [Q, Z, {
                    className: "type",
                    begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
                }, A.inherit(A.TITLE_MODE, {
                    begin: "[_a-z][\\w']*"
                }), B]
            },
            F = {
                begin: /\{/,
                end: /\}/,
                contains: G.contains
            };
        return {
            name: "Haskell",
            aliases: ["hs"],
            keywords: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
            contains: [{
                beginKeywords: "module",
                end: "where",
                keywords: "module where",
                contains: [G, B],
                illegal: "\\W\\.|;"
            }, {
                begin: "\\bimport\\b",
                end: "$",
                keywords: "import qualified as hiding",
                contains: [G, B],
                illegal: "\\W\\.|;"
            }, {
                className: "class",
                begin: "^(\\s*)?(class|instance)\\b",
                end: "where",
                keywords: "class family instance where",
                contains: [D, G, B]
            }, {
                className: "class",
                begin: "\\b(data|(new)?type)\\b",
                end: "$",
                keywords: "data family type newtype deriving",
                contains: [Q, D, G, F, B]
            }, {
                beginKeywords: "default",
                end: "$",
                contains: [D, G, B]
            }, {
                beginKeywords: "infix infixl infixr",
                end: "$",
                contains: [A.C_NUMBER_MODE, B]
            }, {
                begin: "\\bforeign\\b",
                end: "$",
                keywords: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
                contains: [D, A.QUOTE_STRING_MODE, B]
            }, {
                className: "meta",
                begin: "#!\\/usr\\/bin\\/env runhaskell",
                end: "$"
            }, Q, Z, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, D, A.inherit(A.TITLE_MODE, {
                begin: "^[_a-z][\\w']*"
            }), B, {
                begin: "->|<-"
            }]
        }
    }
    snA.exports = m84
});