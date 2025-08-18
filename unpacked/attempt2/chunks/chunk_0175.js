/* chunk:175 bytes:[3839987, 3859084) size:19097 source:unpacked-cli.js */
var rpA = E((uY5, spA) => {
    function I64(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function c$1(A) {
        return Y64("(", A, ")?")
    }

    function Y64(...A) {
        return A.map((Q) => I64(Q)).join("")
    }

    function W64(A) {
        let B = A.COMMENT("//", "$", {
                contains: [{
                    begin: /\\\n/
                }]
            }),
            Q = "decltype\\(auto\\)",
            Z = "[a-zA-Z_]\\w*::",
            D = "<[^<>]+>",
            G = "(decltype\\(auto\\)|" + c$1("[a-zA-Z_]\\w*::") + "[a-zA-Z_]\\w*" + c$1("<[^<>]+>") + ")",
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
                begin: c$1("[a-zA-Z_]\\w*::") + A.IDENT_RE,
                relevance: 0
            },
            V = c$1("[a-zA-Z_]\\w*::") + A.IDENT_RE + "\\s*\\(",
            C = {
                keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
                built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
                literal: "true false nullptr NULL"
            },
            K = [J, F, B, A.C_BLOCK_COMMENT_MODE, W, Y],
            H = {
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
                keywords: C,
                contains: K.concat([{
                    begin: /\(/,
                    end: /\)/,
                    keywords: C,
                    contains: K.concat(["self"]),
                    relevance: 0
                }]),
                relevance: 0
            },
            z = {
                className: "function",
                begin: "(" + G + "[\\*&\\s]+)+" + V,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: C,
                illegal: /[^\w\s\*&:<>.]/,
                contains: [{
                    begin: "decltype\\(auto\\)",
                    keywords: C,
                    relevance: 0
                }, {
                    begin: V,
                    returnBegin: !0,
                    contains: [X],
                    relevance: 0
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: C,
                    relevance: 0,
                    contains: [B, A.C_BLOCK_COMMENT_MODE, Y, W, F, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: C,
                        relevance: 0,
                        contains: ["self", B, A.C_BLOCK_COMMENT_MODE, Y, W, F]
                    }]
                }, F, B, A.C_BLOCK_COMMENT_MODE, J]
            };
        return {
            name: "C",
            aliases: ["h"],
            keywords: C,
            disableAutodetect: !0,
            illegal: "</",
            contains: [].concat(H, z, K, [J, {
                begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                end: ">",
                keywords: C,
                contains: ["self", F]
            }, {
                begin: A.IDENT_RE + "::",
                keywords: C
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
                keywords: C
            }
        }
    }
    spA.exports = W64
});
var tpA = E((mY5, opA) => {
    function J64(A) {
        let B = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",
            Q = "false true",
            Z = [A.C_LINE_COMMENT_MODE, A.COMMENT(/\{/, /\}/, {
                relevance: 0
            }), A.COMMENT(/\(\*/, /\*\)/, {
                relevance: 10
            })],
            D = {
                className: "string",
                begin: /'/,
                end: /'/,
                contains: [{
                    begin: /''/
                }]
            },
            G = {
                className: "string",
                begin: /(#\d+)+/
            },
            F = {
                className: "number",
                begin: "\\b\\d+(\\.\\d+)?(DT|D|T)",
                relevance: 0
            },
            I = {
                className: "string",
                begin: '"',
                end: '"'
            },
            Y = {
                className: "function",
                beginKeywords: "procedure",
                end: /[:;]/,
                keywords: "procedure|10",
                contains: [A.TITLE_MODE, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: B,
                    contains: [D, G]
                }].concat(Z)
            },
            W = {
                className: "class",
                begin: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
                returnBegin: !0,
                contains: [A.TITLE_MODE, Y]
            };
        return {
            name: "C/AL",
            case_insensitive: !0,
            keywords: {
                keyword: B,
                literal: "false true"
            },
            illegal: /\/\*/,
            contains: [D, G, F, I, A.NUMBER_MODE, W, Y]
        }
    }
    opA.exports = J64
});
var AiA = E((dY5, epA) => {
    function X64(A) {
        return {
            name: "Cap’n Proto",
            aliases: ["capnp"],
            keywords: {
                keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
                built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
                literal: "true false"
            },
            contains: [A.QUOTE_STRING_MODE, A.NUMBER_MODE, A.HASH_COMMENT_MODE, {
                className: "meta",
                begin: /@0x[\w\d]{16};/,
                illegal: /\n/
            }, {
                className: "symbol",
                begin: /@\d+\b/
            }, {
                className: "class",
                beginKeywords: "struct enum",
                end: /\{/,
                illegal: /\n/,
                contains: [A.inherit(A.TITLE_MODE, {
                    starts: {
                        endsWithParent: !0,
                        excludeEnd: !0
                    }
                })]
            }, {
                className: "class",
                beginKeywords: "interface",
                end: /\{/,
                illegal: /\n/,
                contains: [A.inherit(A.TITLE_MODE, {
                    starts: {
                        endsWithParent: !0,
                        excludeEnd: !0
                    }
                })]
            }]
        }
    }
    epA.exports = X64
});
var QiA = E((cY5, BiA) => {
    function V64(A) {
        let B = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty",
            Q = "shared abstract formal default actual variable late native deprecated final sealed annotation suppressWarnings small",
            Z = "doc by license see throws tagged",
            D = {
                className: "subst",
                excludeBegin: !0,
                excludeEnd: !0,
                begin: /``/,
                end: /``/,
                keywords: B,
                relevance: 10
            },
            G = [{
                className: "string",
                begin: '"""',
                end: '"""',
                relevance: 10
            }, {
                className: "string",
                begin: '"',
                end: '"',
                contains: [D]
            }, {
                className: "string",
                begin: "'",
                end: "'"
            }, {
                className: "number",
                begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
                relevance: 0
            }];
        return D.contains = G, {
            name: "Ceylon",
            keywords: {
                keyword: B + " " + Q,
                meta: "doc by license see throws tagged"
            },
            illegal: "\\$[^01]|#[^0-9a-fA-F]",
            contains: [A.C_LINE_COMMENT_MODE, A.COMMENT("/\\*", "\\*/", {
                contains: ["self"]
            }), {
                className: "meta",
                begin: '@[a-z]\\w*(?::"[^"]*")?'
            }].concat(G)
        }
    }
    BiA.exports = V64
});
var DiA = E((lY5, ZiA) => {
    function C64(A) {
        return {
            name: "Clean",
            aliases: ["icl", "dcl"],
            keywords: {
                keyword: "if let in with where case of class instance otherwise implementation definition system module from import qualified as special code inline foreign export ccall stdcall generic derive infix infixl infixr",
                built_in: "Int Real Char Bool",
                literal: "True False"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, {
                begin: "->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>"
            }]
        }
    }
    ZiA.exports = C64
});
var FiA = E((pY5, GiA) => {
    function K64(A) {
        let Q = "[a-zA-Z_\\-!.?+*=<>&#'][a-zA-Z_\\-!.?+*=<>&#'0-9/;:]*",
            Z = "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord",
            D = {
                $pattern: Q,
                "builtin-name": "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord cond apply if-not if-let if not not= =|0 <|0 >|0 <=|0 >=|0 ==|0 +|0 /|0 *|0 -|0 rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy first rest cons cast coll last butlast sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
            },
            G = "[-+]?\\d+(\\.\\d+)?",
            F = {
                begin: Q,
                relevance: 0
            },
            I = {
                className: "number",
                begin: "[-+]?\\d+(\\.\\d+)?",
                relevance: 0
            },
            Y = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }),
            W = A.COMMENT(";", "$", {
                relevance: 0
            }),
            J = {
                className: "literal",
                begin: /\b(true|false|nil)\b/
            },
            X = {
                begin: "[\\[\\{]",
                end: "[\\]\\}]"
            },
            V = {
                className: "comment",
                begin: "\\^" + Q
            },
            C = A.COMMENT("\\^\\{", "\\}"),
            K = {
                className: "symbol",
                begin: "[:]{1,2}" + Q
            },
            H = {
                begin: "\\(",
                end: "\\)"
            },
            z = {
                endsWithParent: !0,
                relevance: 0
            },
            $ = {
                keywords: D,
                className: "name",
                begin: Q,
                relevance: 0,
                starts: z
            },
            L = [H, Y, V, C, W, K, X, I, J, F],
            N = {
                beginKeywords: "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord",
                lexemes: Q,
                end: '(\\[|#|\\d|"|:|\\{|\\)|\\(|$)',
                contains: [{
                    className: "title",
                    begin: Q,
                    relevance: 0,
                    excludeEnd: !0,
                    endsParent: !0
                }].concat(L)
            };
        return H.contains = [A.COMMENT("comment", ""), N, $, z], z.contains = L, X.contains = L, C.contains = [X], {
            name: "Clojure",
            aliases: ["clj"],
            illegal: /\S/,
            contains: [H, Y, V, C, W, K, X, I, J]
        }
    }
    GiA.exports = K64
});
var YiA = E((iY5, IiA) => {
    function H64(A) {
        return {
            name: "Clojure REPL",
            contains: [{
                className: "meta",
                begin: /^([\w.-]+|\s*#_)?=>/,
                starts: {
                    end: /$/,
                    subLanguage: "clojure"
                }
            }]
        }
    }
    IiA.exports = H64
});