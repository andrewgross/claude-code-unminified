/* chunk:174 bytes:[3822266, 3839986) size:17720 source:unpacked-cli.js */
var hpA = E((xY5, fpA) => {
    function r44(A) {
        return {
            name: "X++",
            aliases: ["x++"],
            keywords: {
                keyword: ["abstract", "as", "asc", "avg", "break", "breakpoint", "by", "byref", "case", "catch", "changecompany", "class", "client", "client", "common", "const", "continue", "count", "crosscompany", "delegate", "delete_from", "desc", "display", "div", "do", "edit", "else", "eventhandler", "exists", "extends", "final", "finally", "firstfast", "firstonly", "firstonly1", "firstonly10", "firstonly100", "firstonly1000", "flush", "for", "forceliterals", "forcenestedloop", "forceplaceholders", "forceselectorder", "forupdate", "from", "generateonly", "group", "hint", "if", "implements", "in", "index", "insert_recordset", "interface", "internal", "is", "join", "like", "maxof", "minof", "mod", "namespace", "new", "next", "nofetch", "notexists", "optimisticlock", "order", "outer", "pessimisticlock", "print", "private", "protected", "public", "readonly", "repeatableread", "retry", "return", "reverse", "select", "server", "setting", "static", "sum", "super", "switch", "this", "throw", "try", "ttsabort", "ttsbegin", "ttscommit", "unchecked", "update_recordset", "using", "validtimestate", "void", "where", "while"],
                built_in: ["anytype", "boolean", "byte", "char", "container", "date", "double", "enum", "guid", "int", "int64", "long", "real", "short", "str", "utcdatetime", "var"],
                literal: ["default", "false", "null", "true"]
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "#",
                end: "$"
            }, {
                className: "class",
                beginKeywords: "class interface",
                end: /\{/,
                excludeEnd: !0,
                illegal: ":",
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }]
        }
    }
    fpA.exports = r44
});
var upA = E((vY5, gpA) => {
    function o44(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function t44(...A) {
        return A.map((Q) => o44(Q)).join("")
    }

    function e44(A) {
        let B = {},
            Q = {
                begin: /\$\{/,
                end: /\}/,
                contains: ["self", {
                    begin: /:-/,
                    contains: [B]
                }]
            };
        Object.assign(B, {
            className: "variable",
            variants: [{
                begin: t44(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
            }, Q]
        });
        let Z = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                contains: [A.BACKSLASH_ESCAPE]
            },
            D = {
                begin: /<<-?\s*(?=\w+)/,
                starts: {
                    contains: [A.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        className: "string"
                    })]
                }
            },
            G = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [A.BACKSLASH_ESCAPE, B, Z]
            };
        Z.contains.push(G);
        let F = {
                className: "",
                begin: /\\"/
            },
            I = {
                className: "string",
                begin: /'/,
                end: /'/
            },
            Y = {
                begin: /\$\(\(/,
                end: /\)\)/,
                contains: [{
                    begin: /\d+#[0-9a-f]+/,
                    className: "number"
                }, A.NUMBER_MODE, B]
            },
            W = ["fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"],
            J = A.SHEBANG({
                binary: `(${W.join("|")})`,
                relevance: 10
            }),
            X = {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: /\w[\w\d_]*/
                })],
                relevance: 0
            };
        return {
            name: "Bash",
            aliases: ["sh", "zsh"],
            keywords: {
                $pattern: /\b[a-z._-]+\b/,
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
            },
            contains: [J, A.SHEBANG(), X, Y, A.HASH_COMMENT_MODE, D, G, F, I, B]
        }
    }
    gpA.exports = e44
});
var dpA = E((bY5, mpA) => {
    function A64(A) {
        return {
            name: "BASIC",
            case_insensitive: !0,
            illegal: "^.",
            keywords: {
                $pattern: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
                keyword: "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
            },
            contains: [A.QUOTE_STRING_MODE, A.COMMENT("REM", "$", {
                relevance: 10
            }), A.COMMENT("'", "$", {
                relevance: 0
            }), {
                className: "symbol",
                begin: "^[0-9]+ ",
                relevance: 10
            }, {
                className: "number",
                begin: "\\b\\d+(\\.\\d+)?([edED]\\d+)?[#!]?",
                relevance: 0
            }, {
                className: "number",
                begin: "(&[hH][0-9a-fA-F]{1,4})"
            }, {
                className: "number",
                begin: "(&[oO][0-7]{1,6})"
            }]
        }
    }
    mpA.exports = A64
});
var lpA = E((fY5, cpA) => {
    function B64(A) {
        return {
            name: "Backus–Naur Form",
            contains: [{
                className: "attribute",
                begin: /</,
                end: />/
            }, {
                begin: /::=/,
                end: /$/,
                contains: [{
                    begin: /</,
                    end: />/
                }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
            }]
        }
    }
    cpA.exports = B64
});
var ipA = E((hY5, ppA) => {
    function Q64(A) {
        let B = {
            className: "literal",
            begin: /[+-]/,
            relevance: 0
        };
        return {
            name: "Brainfuck",
            aliases: ["bf"],
            contains: [A.COMMENT(`[^\\[\\]\\.,\\+\\-<> \r
]`, `[\\[\\]\\.,\\+\\-<> \r
]`, {
                returnEnd: !0,
                relevance: 0
            }), {
                className: "title",
                begin: "[\\[\\]]",
                relevance: 0
            }, {
                className: "string",
                begin: "[\\.,]",
                relevance: 0
            }, {
                begin: /(?:\+\+|--)/,
                contains: [B]
            }, B]
        }
    }
    ppA.exports = Q64
});
var apA = E((gY5, npA) => {
    function Z64(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function D64(A) {
        return TQ0("(?=", A, ")")
    }

    function d$1(A) {
        return TQ0("(", A, ")?")
    }

    function TQ0(...A) {
        return A.map((Q) => Z64(Q)).join("")
    }

    function G64(A) {
        let B = A.COMMENT("//", "$", {
                contains: [{
                    begin: /\\\n/
                }]
            }),
            Q = "decltype\\(auto\\)",
            Z = "[a-zA-Z_]\\w*::",
            D = "<[^<>]+>",
            G = "(decltype\\(auto\\)|" + d$1("[a-zA-Z_]\\w*::") + "[a-zA-Z_]\\w*" + d$1("<[^<>]+>") + ")",
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
                begin: d$1("[a-zA-Z_]\\w*::") + A.IDENT_RE,
                relevance: 0
            },
            V = d$1("[a-zA-Z_]\\w*::") + A.IDENT_RE + "\\s*\\(",
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
                begin: TQ0(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!while)/, A.IDENT_RE, D64(/\s*\(/))
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

    function F64(A) {
        let B = G64(A),
            Q = ["c", "h"],
            Z = ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"];
        if (B.disableAutodetect = !0, B.aliases = [], !A.getLanguage("c")) B.aliases.push(...Q);
        if (!A.getLanguage("cpp")) B.aliases.push(...Z);
        return B
    }
    npA.exports = F64
});