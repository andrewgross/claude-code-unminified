/* chunk:177 bytes:[3873360, 3892659) size:19299 source:unpacked-cli.js */
var UiA = E((oY5, EiA) => {
    function T64(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function P64(A) {
        return PQ0("(?=", A, ")")
    }

    function l$1(A) {
        return PQ0("(", A, ")?")
    }

    function PQ0(...A) {
        return A.map((Q) => T64(Q)).join("")
    }

    function S64(A) {
        let B = A.COMMENT("//", "$", {
                contains: [{
                    begin: /\\\n/
                }]
            }),
            Q = "decltype\\(auto\\)",
            Z = "[a-zA-Z_]\\w*::",
            D = "<[^<>]+>",
            G = "(decltype\\(auto\\)|" + l$1("[a-zA-Z_]\\w*::") + "[a-zA-Z_]\\w*" + l$1("<[^<>]+>") + ")",
            F = {
                className: "keyword",
                begin: "\\b[a-z\\d_]*_t\\b"
            },
            I = "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)",
            Y = {
                className: "string",
                variants: [{
                    begin: '(u8?|U|L)?"',
                    end: '"',
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                    end: "'",
                    illegal: "."
                }, A.END_SAME_AS_BEGIN({
                    begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                    end: /\)([^()\\ ]{0,16})"/
                })]
            },
            W = {
                className: "number",
                variants: [{
                    begin: "\\b(0b[01']+)"
                }, {
                    begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                }, {
                    begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                }],
                relevance: 0
            },
            J = {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                },
                contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, A.inherit(Y, {
                    className: "meta-string"
                }), {
                    className: "meta-string",
                    begin: /<.*?>/
                }, B, A.C_BLOCK_COMMENT_MODE]
            },
            X = {
                className: "title",
                begin: l$1("[a-zA-Z_]\\w*::") + A.IDENT_RE,
                relevance: 0
            },
            V = l$1("[a-zA-Z_]\\w*::") + A.IDENT_RE + "\\s*\\(",
            K = {
                keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
                built_in: "_Bool _Complex _Imaginary",
                _relevance_hints: ["asin", "atan2", "atan", "calloc", "ceil", "cosh", "cos", "exit", "exp", "fabs", "floor", "fmod", "fprintf", "fputs", "free", "frexp", "auto_ptr", "deque", "list", "queue", "stack", "vector", "map", "set", "pair", "bitset", "multiset", "multimap", "unordered_set", "fscanf", "future", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "tolower", "toupper", "labs", "ldexp", "log10", "log", "malloc", "realloc", "memchr", "memcmp", "memcpy", "memset", "modf", "pow", "printf", "putchar", "puts", "scanf", "sinh", "sin", "snprintf", "sprintf", "sqrt", "sscanf", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "tanh", "tan", "unordered_map", "unordered_multiset", "unordered_multimap", "priority_queue", "make_pair", "array", "shared_ptr", "abort", "terminate", "abs", "acos", "vfprintf", "vprintf", "vsprintf", "endl", "initializer_list", "unique_ptr", "complex", "imaginary", "std", "string", "wstring", "cin", "cout", "cerr", "clog", "stdin", "stdout", "stderr", "stringstream", "istringstream", "ostringstream"],
                literal: "true false nullptr NULL"
            },
            H = {
                className: "function.dispatch",
                relevance: 0,
                keywords: K,
                begin: PQ0(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!while)/, A.IDENT_RE, P64(/\s*\(/))
            },
            z = [H, J, F, B, A.C_BLOCK_COMMENT_MODE, W, Y],
            $ = {
                variants: [{
                    begin: /=/,
                    end: /;/
                }, {
                    begin: /\(/,
                    end: /\)/
                }, {
                    beginKeywords: "new throw return else",
                    end: /;/
                }],
                keywords: K,
                contains: z.concat([{
                    begin: /\(/,
                    end: /\)/,
                    keywords: K,
                    contains: z.concat(["self"]),
                    relevance: 0
                }]),
                relevance: 0
            },
            L = {
                className: "function",
                begin: "(" + G + "[\\*&\\s]+)+" + V,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: K,
                illegal: /[^\w\s\*&:<>.]/,
                contains: [{
                    begin: "decltype\\(auto\\)",
                    keywords: K,
                    relevance: 0
                }, {
                    begin: V,
                    returnBegin: !0,
                    contains: [X],
                    relevance: 0
                }, {
                    begin: /::/,
                    relevance: 0
                }, {
                    begin: /:/,
                    endsWithParent: !0,
                    contains: [Y, W]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: K,
                    relevance: 0,
                    contains: [B, A.C_BLOCK_COMMENT_MODE, Y, W, F, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: K,
                        relevance: 0,
                        contains: ["self", B, A.C_BLOCK_COMMENT_MODE, Y, W, F]
                    }]
                }, F, B, A.C_BLOCK_COMMENT_MODE, J]
            };
        return {
            name: "C++",
            aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
            keywords: K,
            illegal: "</",
            classNameAliases: {
                "function.dispatch": "built_in"
            },
            contains: [].concat($, L, H, z, [J, {
                begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                end: ">",
                keywords: K,
                contains: ["self", F]
            }, {
                begin: A.IDENT_RE + "::",
                keywords: K
            }, {
                className: "class",
                beginKeywords: "enum class struct union",
                end: /[{;:<>=]/,
                contains: [{
                    beginKeywords: "final class struct"
                }, A.TITLE_MODE]
            }]),
            exports: {
                preprocessor: J,
                strings: Y,
                keywords: K
            }
        }
    }
    EiA.exports = S64
});
var $iA = E((tY5, wiA) => {
    function j64(A) {
        let Q = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml",
            Z = "property rsc_defaults op_defaults",
            D = "params meta operations op rule attributes utilization",
            G = "read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\",
            F = "number string",
            I = "Master Started Slave Stopped start promote demote stop monitor true false";
        return {
            name: "crmsh",
            aliases: ["crm", "pcmk"],
            case_insensitive: !0,
            keywords: {
                keyword: "params meta operations op rule attributes utilization " + G + " number string",
                literal: "Master Started Slave Stopped start promote demote stop monitor true false"
            },
            contains: [A.HASH_COMMENT_MODE, {
                beginKeywords: "node",
                starts: {
                    end: "\\s*([\\w_-]+:)?",
                    starts: {
                        className: "title",
                        end: "\\s*[\\$\\w_][\\w_-]*"
                    }
                }
            }, {
                beginKeywords: "primitive rsc_template",
                starts: {
                    className: "title",
                    end: "\\s*[\\$\\w_][\\w_-]*",
                    starts: {
                        end: "\\s*@?[\\w_][\\w_\\.:-]*"
                    }
                }
            }, {
                begin: "\\b(" + Q.split(" ").join("|") + ")\\s+",
                keywords: Q,
                starts: {
                    className: "title",
                    end: "[\\$\\w_][\\w_-]*"
                }
            }, {
                beginKeywords: "property rsc_defaults op_defaults",
                starts: {
                    className: "title",
                    end: "\\s*([\\w_-]+:)?"
                }
            }, A.QUOTE_STRING_MODE, {
                className: "meta",
                begin: "(ocf|systemd|service|lsb):[\\w_:-]+",
                relevance: 0
            }, {
                className: "number",
                begin: "\\b\\d+(\\.\\d+)?(ms|s|h|m)?",
                relevance: 0
            }, {
                className: "literal",
                begin: "[-]?(infinity|inf)",
                relevance: 0
            }, {
                className: "attr",
                begin: /([A-Za-z$_#][\w_-]+)=/,
                relevance: 0
            }, {
                className: "tag",
                begin: "</?",
                end: "/?>",
                relevance: 0
            }]
        }
    }
    wiA.exports = j64
});
var NiA = E((eY5, qiA) => {
    function k64(A) {
        let F = {
                $pattern: "[a-zA-Z_]\\w*[!?=]?",
                keyword: "abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",
                literal: "false nil true"
            },
            I = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: F
            },
            Y = {
                className: "template-variable",
                variants: [{
                    begin: "\\{\\{",
                    end: "\\}\\}"
                }, {
                    begin: "\\{%",
                    end: "%\\}"
                }],
                keywords: F
            };

        function W(z, $) {
            let L = [{
                begin: z,
                end: $
            }];
            return L[0].contains = L, L
        }
        let J = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, I],
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /`/,
                    end: /`/
                }, {
                    begin: "%[Qwi]?\\(",
                    end: "\\)",
                    contains: W("\\(", "\\)")
                }, {
                    begin: "%[Qwi]?\\[",
                    end: "\\]",
                    contains: W("\\[", "\\]")
                }, {
                    begin: "%[Qwi]?\\{",
                    end: /\}/,
                    contains: W(/\{/, /\}/)
                }, {
                    begin: "%[Qwi]?<",
                    end: ">",
                    contains: W("<", ">")
                }, {
                    begin: "%[Qwi]?\\|",
                    end: "\\|"
                }, {
                    begin: /<<-\w+$/,
                    end: /^\s*\w+$/
                }],
                relevance: 0
            },
            X = {
                className: "string",
                variants: [{
                    begin: "%q\\(",
                    end: "\\)",
                    contains: W("\\(", "\\)")
                }, {
                    begin: "%q\\[",
                    end: "\\]",
                    contains: W("\\[", "\\]")
                }, {
                    begin: "%q\\{",
                    end: /\}/,
                    contains: W(/\{/, /\}/)
                }, {
                    begin: "%q<",
                    end: ">",
                    contains: W("<", ">")
                }, {
                    begin: "%q\\|",
                    end: "\\|"
                }, {
                    begin: /<<-'\w+'$/,
                    end: /^\s*\w+$/
                }],
                relevance: 0
            },
            V = {
                begin: "(?!%\\})(" + A.RE_STARTERS_RE + "|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*",
                keywords: "case if select unless until when while",
                contains: [{
                    className: "regexp",
                    contains: [A.BACKSLASH_ESCAPE, I],
                    variants: [{
                        begin: "//[a-z]*",
                        relevance: 0
                    }, {
                        begin: "/(?!\\/)",
                        end: "/[a-z]*"
                    }]
                }],
                relevance: 0
            },
            C = {
                className: "regexp",
                contains: [A.BACKSLASH_ESCAPE, I],
                variants: [{
                    begin: "%r\\(",
                    end: "\\)",
                    contains: W("\\(", "\\)")
                }, {
                    begin: "%r\\[",
                    end: "\\]",
                    contains: W("\\[", "\\]")
                }, {
                    begin: "%r\\{",
                    end: /\}/,
                    contains: W(/\{/, /\}/)
                }, {
                    begin: "%r<",
                    end: ">",
                    contains: W("<", ">")
                }, {
                    begin: "%r\\|",
                    end: "\\|"
                }],
                relevance: 0
            },
            K = {
                className: "meta",
                begin: "@\\[",
                end: "\\]",
                contains: [A.inherit(A.QUOTE_STRING_MODE, {
                    className: "meta-string"
                })]
            },
            H = [Y, J, X, C, V, K, A.HASH_COMMENT_MODE, {
                className: "class",
                beginKeywords: "class module struct",
                end: "$|;",
                illegal: /=/,
                contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
                }), {
                    begin: "<"
                }]
            }, {
                className: "class",
                beginKeywords: "lib enum union",
                end: "$|;",
                illegal: /=/,
                contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
                })]
            }, {
                beginKeywords: "annotation",
                end: "$|;",
                illegal: /=/,
                contains: [A.HASH_COMMENT_MODE, A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
                })],
                relevance: 2
            }, {
                className: "function",
                beginKeywords: "def",
                end: /\B\b/,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
                    endsParent: !0
                })]
            }, {
                className: "function",
                beginKeywords: "fun macro",
                end: /\B\b/,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",
                    endsParent: !0
                })],
                relevance: 2
            }, {
                className: "symbol",
                begin: A.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                relevance: 0
            }, {
                className: "symbol",
                begin: ":",
                contains: [J, {
                    begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?"
                }],
                relevance: 0
            }, {
                className: "number",
                variants: [{
                    begin: "\\b0b([01_]+)(_?[ui](8|16|32|64|128))?"
                }, {
                    begin: "\\b0o([0-7_]+)(_?[ui](8|16|32|64|128))?"
                }, {
                    begin: "\\b0x([A-Fa-f0-9_]+)(_?[ui](8|16|32|64|128))?"
                }, {
                    begin: "\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_?[-+]?[0-9_]*)?(_?f(32|64))?(?!_)"
                }, {
                    begin: "\\b([1-9][0-9_]*|0)(_?[ui](8|16|32|64|128))?"
                }],
                relevance: 0
            }];
        return I.contains = H, Y.contains = H.slice(1), {
            name: "Crystal",
            aliases: ["cr"],
            keywords: F,
            contains: H
        }
    }
    qiA.exports = k64
});