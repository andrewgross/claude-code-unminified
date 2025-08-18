/* chunk:187 bytes:[4076692, 4095865) size:19173 source:unpacked-cli.js */
var tnA = E((uW5, onA) => {
    function d84(A) {
        return {
            name: "Haxe",
            aliases: ["hx"],
            keywords: {
                keyword: "break case cast catch continue default do dynamic else enum extern for function here if import in inline never new override package private get set public return static super switch this throw trace try typedef untyped using var while Int Float String Bool Dynamic Void Array ",
                built_in: "trace this",
                literal: "true false null _"
            },
            contains: [{
                className: "string",
                begin: "'",
                end: "'",
                contains: [A.BACKSLASH_ESCAPE, {
                    className: "subst",
                    begin: "\\$\\{",
                    end: "\\}"
                }, {
                    className: "subst",
                    begin: "\\$",
                    end: /\W\}/
                }]
            }, A.QUOTE_STRING_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "@:",
                end: "$"
            }, {
                className: "meta",
                begin: "#",
                end: "$",
                keywords: {
                    "meta-keyword": "if else elseif end error"
                }
            }, {
                className: "type",
                begin: ":[ 	]*",
                end: "[^A-Za-z0-9_ 	\\->]",
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0
            }, {
                className: "type",
                begin: ":[ 	]*",
                end: "\\W",
                excludeBegin: !0,
                excludeEnd: !0
            }, {
                className: "type",
                begin: "new *",
                end: "\\W",
                excludeBegin: !0,
                excludeEnd: !0
            }, {
                className: "class",
                beginKeywords: "enum",
                end: "\\{",
                contains: [A.TITLE_MODE]
            }, {
                className: "class",
                beginKeywords: "abstract",
                end: "[\\{$]",
                contains: [{
                    className: "type",
                    begin: "\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "type",
                    begin: "from +",
                    end: "\\W",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "type",
                    begin: "to +",
                    end: "\\W",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, A.TITLE_MODE],
                keywords: {
                    keyword: "abstract from to"
                }
            }, {
                className: "class",
                begin: "\\b(class|interface) +",
                end: "[\\{$]",
                excludeEnd: !0,
                keywords: "class interface",
                contains: [{
                    className: "keyword",
                    begin: "\\b(extends|implements) +",
                    keywords: "extends implements",
                    contains: [{
                        className: "type",
                        begin: A.IDENT_RE,
                        relevance: 0
                    }]
                }, A.TITLE_MODE]
            }, {
                className: "function",
                beginKeywords: "function",
                end: "\\(",
                excludeEnd: !0,
                illegal: "\\S",
                contains: [A.TITLE_MODE]
            }],
            illegal: /<\//
        }
    }
    onA.exports = d84
});
var AaA = E((mW5, enA) => {
    function c84(A) {
        return {
            name: "HSP",
            case_insensitive: !0,
            keywords: {
                $pattern: /[\w._]+/,
                keyword: "goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, {
                className: "string",
                begin: /\{"/,
                end: /"\}/,
                contains: [A.BACKSLASH_ESCAPE]
            }, A.COMMENT(";", "$", {
                relevance: 0
            }), {
                className: "meta",
                begin: "#",
                end: "$",
                keywords: {
                    "meta-keyword": "addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib"
                },
                contains: [A.inherit(A.QUOTE_STRING_MODE, {
                    className: "meta-string"
                }), A.NUMBER_MODE, A.C_NUMBER_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            }, {
                className: "symbol",
                begin: "^\\*(\\w+|@)"
            }, A.NUMBER_MODE, A.C_NUMBER_MODE]
        }
    }
    enA.exports = c84
});
var ZaA = E((dW5, QaA) => {
    function BaA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function l84(A) {
        return R61("(", A, ")*")
    }

    function p84(A) {
        return R61("(", A, ")?")
    }

    function R61(...A) {
        return A.map((Q) => BaA(Q)).join("")
    }

    function i84(...A) {
        return "(" + A.map((Q) => BaA(Q)).join("|") + ")"
    }

    function n84(A) {
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
            Y = i84(Z, D, G, F),
            W = R61(p84(/\.|\.\/|\//), Y, l84(R61(I, Y))),
            J = R61("(", G, "|", F, ")(?==)"),
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

    function a84(A) {
        let B = n84(A);
        if (B.name = "HTMLbars", A.getLanguage("handlebars")) B.disableAutodetect = !0;
        return B
    }
    QaA.exports = a84
});
var GaA = E((cW5, DaA) => {
    function s84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function r84(...A) {
        return A.map((Q) => s84(Q)).join("")
    }

    function o84(A) {
        let Z = {
                className: "attribute",
                begin: r84("^", /[A-Za-z][A-Za-z0-9-]*/, "(?=\\:\\s)"),
                starts: {
                    contains: [{
                        className: "punctuation",
                        begin: /: /,
                        relevance: 0,
                        starts: {
                            end: "$",
                            relevance: 0
                        }
                    }]
                }
            },
            D = [Z, {
                begin: "\\n\\n",
                starts: {
                    subLanguage: [],
                    endsWithParent: !0
                }
            }];
        return {
            name: "HTTP",
            aliases: ["https"],
            illegal: /\S/,
            contains: [{
                begin: "^(?=HTTP/(2|1\\.[01]) \\d{3})",
                end: /$/,
                contains: [{
                    className: "meta",
                    begin: "HTTP/(2|1\\.[01])"
                }, {
                    className: "number",
                    begin: "\\b\\d{3}\\b"
                }],
                starts: {
                    end: /\b\B/,
                    illegal: /\S/,
                    contains: D
                }
            }, {
                begin: "(?=^[A-Z]+ (.*?) HTTP/(2|1\\.[01])$)",
                end: /$/,
                contains: [{
                    className: "string",
                    begin: " ",
                    end: " ",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "meta",
                    begin: "HTTP/(2|1\\.[01])"
                }, {
                    className: "keyword",
                    begin: "[A-Z]+"
                }],
                starts: {
                    end: /\b\B/,
                    illegal: /\S/,
                    contains: D
                }
            }, A.inherit(Z, {
                relevance: 0
            })]
        }
    }
    DaA.exports = o84
});
var IaA = E((lW5, FaA) => {
    function t84(A) {
        var B = "a-zA-Z_\\-!.?+*=<>&#'",
            Q = "[" + B + "][" + B + "0-9/;:]*",
            Z = {
                $pattern: Q,
                "builtin-name": "!= % %= & &= * ** **= *= *map + += , --build-class-- --import-- -= . / // //= /= < << <<= <= = > >= >> >>= @ @= ^ ^= abs accumulate all and any ap-compose ap-dotimes ap-each ap-each-while ap-filter ap-first ap-if ap-last ap-map ap-map-when ap-pipe ap-reduce ap-reject apply as-> ascii assert assoc bin break butlast callable calling-module-name car case cdr chain chr coll? combinations compile compress cond cons cons? continue count curry cut cycle dec def default-method defclass defmacro defmacro-alias defmacro/g! defmain defmethod defmulti defn defn-alias defnc defnr defreader defseq del delattr delete-route dict-comp dir disassemble dispatch-reader-macro distinct divmod do doto drop drop-last drop-while empty? end-sequence eval eval-and-compile eval-when-compile even? every? except exec filter first flatten float? fn fnc fnr for for* format fraction genexpr gensym get getattr global globals group-by hasattr hash hex id identity if if* if-not if-python2 import in inc input instance? integer integer-char? integer? interleave interpose is is-coll is-cons is-empty is-even is-every is-float is-instance is-integer is-integer-char is-iterable is-iterator is-keyword is-neg is-none is-not is-numeric is-odd is-pos is-string is-symbol is-zero isinstance islice issubclass iter iterable? iterate iterator? keyword keyword? lambda last len let lif lif-not list* list-comp locals loop macro-error macroexpand macroexpand-1 macroexpand-all map max merge-with method-decorator min multi-decorator multicombinations name neg? next none? nonlocal not not-in not? nth numeric? oct odd? open or ord partition permutations pos? post-route postwalk pow prewalk print product profile/calls profile/cpu put-route quasiquote quote raise range read read-str recursive-replace reduce remove repeat repeatedly repr require rest round route route-with-methods rwm second seq set-comp setattr setv some sorted string string? sum switch symbol? take take-nth take-while tee try unless unquote unquote-splicing vars walk when while with with* with-decorator with-gensyms xi xor yield yield-from zero? zip zip-longest | |= ~"
            },
            D = "[-+]?\\d+(\\.\\d+)?",
            G = {
                begin: Q,
                relevance: 0
            },
            F = {
                className: "number",
                begin: D,
                relevance: 0
            },
            I = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }),
            Y = A.COMMENT(";", "$", {
                relevance: 0
            }),
            W = {
                className: "literal",
                begin: /\b([Tt]rue|[Ff]alse|nil|None)\b/
            },
            J = {
                begin: "[\\[\\{]",
                end: "[\\]\\}]"
            },
            X = {
                className: "comment",
                begin: "\\^" + Q
            },
            V = A.COMMENT("\\^\\{", "\\}"),
            C = {
                className: "symbol",
                begin: "[:]{1,2}" + Q
            },
            K = {
                begin: "\\(",
                end: "\\)"
            },
            H = {
                endsWithParent: !0,
                relevance: 0
            },
            z = {
                className: "name",
                relevance: 0,
                keywords: Z,
                begin: Q,
                starts: H
            },
            $ = [K, I, X, V, Y, C, J, F, W, G];
        return K.contains = [A.COMMENT("comment", ""), z, H], H.contains = $, J.contains = $, {
            name: "Hy",
            aliases: ["hylang"],
            illegal: /\S/,
            contains: [A.SHEBANG(), K, I, X, V, Y, C, J, F, W]
        }
    }
    FaA.exports = t84
});