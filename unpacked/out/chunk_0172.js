/* chunk:172 bytes:[3784155, 3802785) size:18630 source:unpacked-cli.js */
var wpA = E((OY5, UpA) => {
    function h44(A) {
        let B = {
            variants: [A.COMMENT("^[ \\t]*(?=#)", "$", {
                relevance: 0,
                excludeBegin: !0
            }), A.COMMENT("[;@]", "$", {
                relevance: 0
            }), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
        };
        return {
            name: "ARM Assembly",
            case_insensitive: !0,
            aliases: ["arm"],
            keywords: {
                $pattern: "\\.?" + A.IDENT_RE,
                meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",
                built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 {PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @"
            },
            contains: [{
                className: "keyword",
                begin: "\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?(?=\\s)"
            }, B, A.QUOTE_STRING_MODE, {
                className: "string",
                begin: "'",
                end: "[^\\\\]'",
                relevance: 0
            }, {
                className: "title",
                begin: "\\|",
                end: "\\|",
                illegal: "\\n",
                relevance: 0
            }, {
                className: "number",
                variants: [{
                    begin: "[#$=]?0x[0-9a-f]+"
                }, {
                    begin: "[#$=]?0b[01]+"
                }, {
                    begin: "[#$=]\\d+"
                }, {
                    begin: "\\b\\d+"
                }],
                relevance: 0
            }, {
                className: "symbol",
                variants: [{
                    begin: "^[ \\t]*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
                }, {
                    begin: "^[a-z_\\.\\$][a-z0-9_\\.\\$]+"
                }, {
                    begin: "[=#]\\w+"
                }],
                relevance: 0
            }]
        }
    }
    UpA.exports = h44
});
var LpA = E((TY5, NpA) => {
    function qpA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function $pA(A) {
        return Ng("(?=", A, ")")
    }

    function g44(A) {
        return Ng("(", A, ")?")
    }

    function Ng(...A) {
        return A.map((Q) => qpA(Q)).join("")
    }

    function u44(...A) {
        return "(" + A.map((Q) => qpA(Q)).join("|") + ")"
    }

    function m44(A) {
        let B = Ng(/[A-Z_]/, g44(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/),
            Q = /[A-Za-z0-9._:-]+/,
            Z = {
                className: "symbol",
                begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
            },
            D = {
                begin: /\s/,
                contains: [{
                    className: "meta-keyword",
                    begin: /#?[a-z_][a-z1-9_-]+/,
                    illegal: /\n/
                }]
            },
            G = A.inherit(D, {
                begin: /\(/,
                end: /\)/
            }),
            F = A.inherit(A.APOS_STRING_MODE, {
                className: "meta-string"
            }),
            I = A.inherit(A.QUOTE_STRING_MODE, {
                className: "meta-string"
            }),
            Y = {
                endsWithParent: !0,
                illegal: /</,
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: Q,
                    relevance: 0
                }, {
                    begin: /=\s*/,
                    relevance: 0,
                    contains: [{
                        className: "string",
                        endsParent: !0,
                        variants: [{
                            begin: /"/,
                            end: /"/,
                            contains: [Z]
                        }, {
                            begin: /'/,
                            end: /'/,
                            contains: [Z]
                        }, {
                            begin: /[^\s"'=<>`]+/
                        }]
                    }]
                }]
            };
        return {
            name: "HTML, XML",
            aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
            case_insensitive: !0,
            contains: [{
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                relevance: 10,
                contains: [D, I, F, G, {
                    begin: /\[/,
                    end: /\]/,
                    contains: [{
                        className: "meta",
                        begin: /<![a-z]/,
                        end: />/,
                        contains: [D, G, I, F]
                    }]
                }]
            }, A.COMMENT(/<!--/, /-->/, {
                relevance: 10
            }), {
                begin: /<!\[CDATA\[/,
                end: /\]\]>/,
                relevance: 10
            }, Z, {
                className: "meta",
                begin: /<\?xml/,
                end: /\?>/,
                relevance: 10
            }, {
                className: "tag",
                begin: /<style(?=\s|>)/,
                end: />/,
                keywords: {
                    name: "style"
                },
                contains: [Y],
                starts: {
                    end: /<\/style>/,
                    returnEnd: !0,
                    subLanguage: ["css", "xml"]
                }
            }, {
                className: "tag",
                begin: /<script(?=\s|>)/,
                end: />/,
                keywords: {
                    name: "script"
                },
                contains: [Y],
                starts: {
                    end: /<\/script>/,
                    returnEnd: !0,
                    subLanguage: ["javascript", "handlebars", "xml"]
                }
            }, {
                className: "tag",
                begin: /<>|<\/>/
            }, {
                className: "tag",
                begin: Ng(/</, $pA(Ng(B, u44(/\/>/, />/, /\s/)))),
                end: /\/?>/,
                contains: [{
                    className: "name",
                    begin: B,
                    relevance: 0,
                    starts: Y
                }]
            }, {
                className: "tag",
                begin: Ng(/<\//, $pA(Ng(B, />/))),
                contains: [{
                    className: "name",
                    begin: B,
                    relevance: 0
                }, {
                    begin: />/,
                    relevance: 0,
                    endsParent: !0
                }]
            }]
        }
    }
    NpA.exports = m44
});
var OpA = E((PY5, RpA) => {
    function d44(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function MpA(...A) {
        return A.map((Q) => d44(Q)).join("")
    }

    function c44(A) {
        let B = {
                begin: "^'{3,}[ \\t]*$",
                relevance: 10
            },
            Q = [{
                begin: /\\[*_`]/
            }, {
                begin: /\\\\\*{2}[^\n]*?\*{2}/
            }, {
                begin: /\\\\_{2}[^\n]*_{2}/
            }, {
                begin: /\\\\`{2}[^\n]*`{2}/
            }, {
                begin: /[:;}][*_`](?![*_`])/
            }],
            Z = [{
                className: "strong",
                begin: /\*{2}([^\n]+?)\*{2}/
            }, {
                className: "strong",
                begin: MpA(/\*\*/, /((\*(?!\*)|\\[^\n]|[^*\n\\])+\n)+/, /(\*(?!\*)|\\[^\n]|[^*\n\\])*/, /\*\*/),
                relevance: 0
            }, {
                className: "strong",
                begin: /\B\*(\S|\S[^\n]*?\S)\*(?!\w)/
            }, {
                className: "strong",
                begin: /\*[^\s]([^\n]+\n)+([^\n]+)\*/
            }],
            D = [{
                className: "emphasis",
                begin: /_{2}([^\n]+?)_{2}/
            }, {
                className: "emphasis",
                begin: MpA(/__/, /((_(?!_)|\\[^\n]|[^_\n\\])+\n)+/, /(_(?!_)|\\[^\n]|[^_\n\\])*/, /__/),
                relevance: 0
            }, {
                className: "emphasis",
                begin: /\b_(\S|\S[^\n]*?\S)_(?!\w)/
            }, {
                className: "emphasis",
                begin: /_[^\s]([^\n]+\n)+([^\n]+)_/
            }, {
                className: "emphasis",
                begin: "\\B'(?!['\\s])",
                end: "(\\n{2}|')",
                contains: [{
                    begin: "\\\\'\\w",
                    relevance: 0
                }],
                relevance: 0
            }],
            G = {
                className: "symbol",
                begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
                relevance: 10
            },
            F = {
                className: "bullet",
                begin: "^(\\*+|-+|\\.+|[^\\n]+?::)\\s+"
            };
        return {
            name: "AsciiDoc",
            aliases: ["adoc"],
            contains: [A.COMMENT("^/{4,}\\n", "\\n/{4,}$", {
                relevance: 10
            }), A.COMMENT("^//", "$", {
                relevance: 0
            }), {
                className: "title",
                begin: "^\\.\\w.*$"
            }, {
                begin: "^[=\\*]{4,}\\n",
                end: "\\n^[=\\*]{4,}$",
                relevance: 10
            }, {
                className: "section",
                relevance: 10,
                variants: [{
                    begin: "^(={1,6})[ 	].+?([ 	]\\1)?$"
                }, {
                    begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"
                }]
            }, {
                className: "meta",
                begin: "^:.+?:",
                end: "\\s",
                excludeEnd: !0,
                relevance: 10
            }, {
                className: "meta",
                begin: "^\\[.+?\\]$",
                relevance: 0
            }, {
                className: "quote",
                begin: "^_{4,}\\n",
                end: "\\n_{4,}$",
                relevance: 10
            }, {
                className: "code",
                begin: "^[\\-\\.]{4,}\\n",
                end: "\\n[\\-\\.]{4,}$",
                relevance: 10
            }, {
                begin: "^\\+{4,}\\n",
                end: "\\n\\+{4,}$",
                contains: [{
                    begin: "<",
                    end: ">",
                    subLanguage: "xml",
                    relevance: 0
                }],
                relevance: 10
            }, F, G, ...Q, ...Z, ...D, {
                className: "string",
                variants: [{
                    begin: "``.+?''"
                }, {
                    begin: "`.+?'"
                }]
            }, {
                className: "code",
                begin: /`{2}/,
                end: /(\n{2}|`{2})/
            }, {
                className: "code",
                begin: "(`.+?`|\\+.+?\\+)",
                relevance: 0
            }, {
                className: "code",
                begin: "^[ \\t]",
                end: "$",
                relevance: 0
            }, B, {
                begin: "(link:)?(http|https|ftp|file|irc|image:?):\\S+?\\[[^[]*?\\]",
                returnBegin: !0,
                contains: [{
                    begin: "(link|image:?):",
                    relevance: 0
                }, {
                    className: "link",
                    begin: "\\w",
                    end: "[^\\[]+",
                    relevance: 0
                }, {
                    className: "string",
                    begin: "\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0
                }],
                relevance: 10
            }]
        }
    }
    RpA.exports = c44
});
var PpA = E((SY5, TpA) => {
    function l44(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function OQ0(...A) {
        return A.map((Q) => l44(Q)).join("")
    }

    function p44(A) {
        let B = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else extends implements break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws privileged aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization staticinitialization withincode target within execution getWithinTypeName handler thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart declare parents warning error soft precedence thisAspectInstance",
            Q = "get set args call";
        return {
            name: "AspectJ",
            keywords: B,
            illegal: /<\/|#/,
            contains: [A.COMMENT(/\/\*\*/, /\*\//, {
                relevance: 0,
                contains: [{
                    begin: /\w+@/,
                    relevance: 0
                }, {
                    className: "doctag",
                    begin: /@[A-Za-z]+/
                }]
            }), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                className: "class",
                beginKeywords: "aspect",
                end: /[{;=]/,
                excludeEnd: !0,
                illegal: /[:;"\[\]]/,
                contains: [{
                    beginKeywords: "extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton"
                }, A.UNDERSCORE_TITLE_MODE, {
                    begin: /\([^\)]*/,
                    end: /[)]+/,
                    keywords: B + " get set args call",
                    excludeEnd: !1
                }]
            }, {
                className: "class",
                beginKeywords: "class interface",
                end: /[{;=]/,
                excludeEnd: !0,
                relevance: 0,
                keywords: "class interface",
                illegal: /[:"\[\]]/,
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "pointcut after before around throwing returning",
                end: /[)]/,
                excludeEnd: !1,
                illegal: /["\[\]]/,
                contains: [{
                    begin: OQ0(A.UNDERSCORE_IDENT_RE, /\s*\(/),
                    returnBegin: !0,
                    contains: [A.UNDERSCORE_TITLE_MODE]
                }]
            }, {
                begin: /[:]/,
                returnBegin: !0,
                end: /[{;]/,
                relevance: 0,
                excludeEnd: !1,
                keywords: B,
                illegal: /["\[\]]/,
                contains: [{
                    begin: OQ0(A.UNDERSCORE_IDENT_RE, /\s*\(/),
                    keywords: B + " get set args call",
                    relevance: 0
                }, A.QUOTE_STRING_MODE]
            }, {
                beginKeywords: "new throw",
                relevance: 0
            }, {
                className: "function",
                begin: /\w+ +\w+(\.\w+)?\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
                returnBegin: !0,
                end: /[{;=]/,
                keywords: B,
                excludeEnd: !0,
                contains: [{
                    begin: OQ0(A.UNDERSCORE_IDENT_RE, /\s*\(/),
                    returnBegin: !0,
                    relevance: 0,
                    contains: [A.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    relevance: 0,
                    keywords: B,
                    contains: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, A.C_BLOCK_COMMENT_MODE]
                }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            }, A.C_NUMBER_MODE, {
                className: "meta",
                begin: /@[A-Za-z]+/
            }]
        }
    }
    TpA.exports = p44
});