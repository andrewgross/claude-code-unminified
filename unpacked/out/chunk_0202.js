/* chunk:202 bytes:[4488730, 4501752) size:13022 source:unpacked-cli.js */
var psA = E((kJ5, lsA) => {
    function K34(A) {
        let B = {
                className: "built_in",
                begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
            },
            Q = /[a-zA-Z@][a-zA-Z0-9_]*/,
            Z = {
                $pattern: Q,
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            D = {
                $pattern: Q,
                keyword: "@interface @class @protocol @implementation"
            };
        return {
            name: "Objective-C",
            aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
            keywords: Z,
            illegal: "</",
            contains: [B, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.C_NUMBER_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, {
                className: "string",
                variants: [{
                    begin: '@"',
                    end: '"',
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE]
                }]
            }, {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
                },
                contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, A.inherit(A.QUOTE_STRING_MODE, {
                    className: "meta-string"
                }), {
                    className: "meta-string",
                    begin: /<.*?>/,
                    end: /$/,
                    illegal: "\\n"
                }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            }, {
                className: "class",
                begin: "(" + D.keyword.split(" ").join("|") + ")\\b",
                end: /(\{|$)/,
                excludeEnd: !0,
                keywords: D,
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, {
                begin: "\\." + A.UNDERSCORE_IDENT_RE,
                relevance: 0
            }]
        }
    }
    lsA.exports = K34
});
var nsA = E((yJ5, isA) => {
    function H34(A) {
        return {
            name: "OCaml",
            aliases: ["ml"],
            keywords: {
                $pattern: "[a-z_]\\w*!?",
                keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
                built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
                literal: "true false"
            },
            illegal: /\/\/|>>/,
            contains: [{
                className: "literal",
                begin: "\\[(\\|\\|)?\\]|\\(\\)",
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
                begin: "[a-z_]\\w*'[\\w']*",
                relevance: 0
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
                begin: /->/
            }]
        }
    }
    isA.exports = H34
});
var ssA = E((_J5, asA) => {
    function z34(A) {
        let B = {
                className: "keyword",
                begin: "\\$(f[asn]|t|vp[rtd]|children)"
            },
            Q = {
                className: "literal",
                begin: "false|true|PI|undef"
            },
            Z = {
                className: "number",
                begin: "\\b\\d+(\\.\\d+)?(e-?\\d+)?",
                relevance: 0
            },
            D = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }),
            G = {
                className: "meta",
                keywords: {
                    "meta-keyword": "include use"
                },
                begin: "include|use <",
                end: ">"
            },
            F = {
                className: "params",
                begin: "\\(",
                end: "\\)",
                contains: ["self", Z, D, B, Q]
            },
            I = {
                begin: "[*!#%]",
                relevance: 0
            },
            Y = {
                className: "function",
                beginKeywords: "module function",
                end: /=|\{/,
                contains: [F, A.UNDERSCORE_TITLE_MODE]
            };
        return {
            name: "OpenSCAD",
            aliases: ["scad"],
            keywords: {
                keyword: "function module include use for intersection_for if else \\%",
                literal: "false true PI undef",
                built_in: "circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Z, G, D, B, I, Y]
        }
    }
    asA.exports = z34
});
var osA = E((xJ5, rsA) => {
    function E34(A) {
        let B = {
                $pattern: /\.?\w+/,
                keyword: "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained"
            },
            Q = A.COMMENT(/\{/, /\}/, {
                relevance: 0
            }),
            Z = A.COMMENT("\\(\\*", "\\*\\)", {
                relevance: 10
            }),
            D = {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{
                    begin: "''"
                }]
            },
            G = {
                className: "string",
                begin: "(#\\d+)+"
            },
            F = {
                className: "function",
                beginKeywords: "function constructor destructor procedure method",
                end: "[:;]",
                keywords: "function constructor|10 destructor|10 procedure|10 method|10",
                contains: [A.TITLE_MODE, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)",
                    keywords: B,
                    contains: [D, G]
                }, Q, Z]
            };
        return {
            name: "Oxygene",
            case_insensitive: !0,
            keywords: B,
            illegal: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
            contains: [Q, Z, A.C_LINE_COMMENT_MODE, D, G, A.NUMBER_MODE, F, {
                className: "class",
                begin: "=\\bclass\\b",
                end: "end;",
                keywords: B,
                contains: [D, G, Q, Z, A.C_LINE_COMMENT_MODE, F]
            }]
        }
    }
    rsA.exports = E34
});
var esA = E((vJ5, tsA) => {
    function U34(A) {
        let B = A.COMMENT(/\{/, /\}/, {
            contains: ["self"]
        });
        return {
            name: "Parser3",
            subLanguage: "xml",
            relevance: 0,
            contains: [A.COMMENT("^#", "$"), A.COMMENT(/\^rem\{/, /\}/, {
                relevance: 10,
                contains: [B]
            }), {
                className: "meta",
                begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
                relevance: 10
            }, {
                className: "title",
                begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
            }, {
                className: "variable",
                begin: /\$\{?[\w\-.:]+\}?/
            }, {
                className: "keyword",
                begin: /\^[\w\-.:]+/
            }, {
                className: "number",
                begin: "\\^#[0-9a-fA-F]+"
            }, A.C_NUMBER_MODE]
        }
    }
    tsA.exports = U34
});
var BrA = E((bJ5, ArA) => {
    function w34(A) {
        let B = {
                className: "variable",
                begin: /\$[\w\d#@][\w\d_]*/
            },
            Q = {
                className: "variable",
                begin: /<(?!\/)/,
                end: />/
            };
        return {
            name: "Packet Filter config",
            aliases: ["pf.conf"],
            keywords: {
                $pattern: /[a-z0-9_<>-]+/,
                built_in: "block match pass load anchor|5 antispoof|10 set table",
                keyword: "in out log quick on rdomain inet inet6 proto from port os to route allow-opts divert-packet divert-reply divert-to flags group icmp-type icmp6-type label once probability recieved-on rtable prio queue tos tag tagged user keep fragment for os drop af-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robin source-hash static-port dup-to reply-to route-to parent bandwidth default min max qlimit block-policy debug fingerprints hostid limit loginterface optimization reassemble ruleset-optimization basic none profile skip state-defaults state-policy timeout const counters persist no modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppy source-track global rule max-src-nodes max-src-states max-src-conn max-src-conn-rate overload flush scrub|5 max-mss min-ttl no-df|10 random-id",
                literal: "all any no-route self urpf-failed egress|5 unknown"
            },
            contains: [A.HASH_COMMENT_MODE, A.NUMBER_MODE, A.QUOTE_STRING_MODE, B, Q]
        }
    }
    ArA.exports = w34
});