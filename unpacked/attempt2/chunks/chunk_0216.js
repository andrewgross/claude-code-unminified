/* chunk:216 bytes:[4741805, 4749816) size:8011 source:unpacked-cli.js */
var roA = E((SX5, soA) => {
    function f74(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function h74(A) {
        return aoA("(", A, ")?")
    }

    function aoA(...A) {
        return A.map((Q) => f74(Q)).join("")
    }

    function g74(A) {
        let B = /[a-zA-Z_][a-zA-Z0-9_]*/,
            Q = {
                className: "number",
                variants: [A.BINARY_NUMBER_MODE, A.C_NUMBER_MODE]
            };
        return {
            name: "Tcl",
            aliases: ["tk"],
            keywords: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
            contains: [A.COMMENT(";[ \\t]*#", "$"), A.COMMENT("^[ \\t]*#", "$"), {
                beginKeywords: "proc",
                end: "[\\{]",
                excludeEnd: !0,
                contains: [{
                    className: "title",
                    begin: "[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
                    end: "[ \\t\\n\\r]",
                    endsWithParent: !0,
                    excludeEnd: !0
                }]
            }, {
                className: "variable",
                variants: [{
                    begin: aoA(/\$/, h74(/::/), B, "(::", B, ")*")
                }, {
                    begin: "\\$\\{(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
                    end: "\\}",
                    contains: [Q]
                }]
            }, {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE],
                variants: [A.inherit(A.QUOTE_STRING_MODE, {
                    illegal: null
                })]
            }, Q]
        }
    }
    soA.exports = g74
});
var toA = E((jX5, ooA) => {
    function u74(A) {
        return {
            name: "Thrift",
            keywords: {
                keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
                built_in: "bool byte i16 i32 i64 double string binary",
                literal: "true false"
            },
            contains: [A.QUOTE_STRING_MODE, A.NUMBER_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "class",
                beginKeywords: "struct enum service exception",
                end: /\{/,
                illegal: /\n/,
                contains: [A.inherit(A.TITLE_MODE, {
                    starts: {
                        endsWithParent: !0,
                        excludeEnd: !0
                    }
                })]
            }, {
                begin: "\\b(set|list|map)\\s*<",
                end: ">",
                keywords: "bool byte i16 i32 i64 double string binary",
                contains: ["self"]
            }]
        }
    }
    ooA.exports = u74
});
var AtA = E((kX5, eoA) => {
    function m74(A) {
        let B = {
                className: "number",
                begin: "[1-9][0-9]*",
                relevance: 0
            },
            Q = {
                className: "symbol",
                begin: ":[^\\]]+"
            },
            Z = {
                className: "built_in",
                begin: "(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",
                end: "\\]",
                contains: ["self", B, Q]
            },
            D = {
                className: "built_in",
                begin: "(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",
                end: "\\]",
                contains: ["self", B, A.QUOTE_STRING_MODE, Q]
            };
        return {
            name: "TP",
            keywords: {
                keyword: "ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN SUBSTR FINDSTR VOFFSET PROG ATTR MN POS",
                literal: "ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET"
            },
            contains: [Z, D, {
                className: "keyword",
                begin: "/(PROG|ATTR|MN|POS|END)\\b"
            }, {
                className: "keyword",
                begin: "(CALL|RUN|POINT_LOGIC|LBL)\\b"
            }, {
                className: "keyword",
                begin: "\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"
            }, {
                className: "number",
                begin: "\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",
                relevance: 0
            }, A.COMMENT("//", "[;$]"), A.COMMENT("!", "[;$]"), A.COMMENT("--eg:", "$"), A.QUOTE_STRING_MODE, {
                className: "string",
                begin: "'",
                end: "'"
            }, A.C_NUMBER_MODE, {
                className: "variable",
                begin: "\\$[A-Za-z0-9_]+"
            }]
        }
    }
    eoA.exports = m74
});
var QtA = E((yX5, BtA) => {
    function d74(A) {
        var B = {
                className: "params",
                begin: "\\(",
                end: "\\)"
            },
            Q = "attribute block constant cycle date dump include max min parent random range source template_from_string",
            Z = {
                beginKeywords: Q,
                keywords: {
                    name: Q
                },
                relevance: 0,
                contains: [B]
            },
            D = {
                begin: /\|[A-Za-z_]+:?/,
                keywords: "abs batch capitalize column convert_encoding date date_modify default escape filter first format inky_to_html inline_css join json_encode keys last length lower map markdown merge nl2br number_format raw reduce replace reverse round slice sort spaceless split striptags title trim upper url_encode",
                contains: [Z]
            },
            G = "apply autoescape block deprecated do embed extends filter flush for from if import include macro sandbox set use verbatim with";
        return G = G + " " + G.split(" ").map(function(F) {
            return "end" + F
        }).join(" "), {
            name: "Twig",
            aliases: ["craftcms"],
            case_insensitive: !0,
            subLanguage: "xml",
            contains: [A.COMMENT(/\{#/, /#\}/), {
                className: "template-tag",
                begin: /\{%/,
                end: /%\}/,
                contains: [{
                    className: "name",
                    begin: /\w+/,
                    keywords: G,
                    starts: {
                        endsWithParent: !0,
                        contains: [D, Z],
                        relevance: 0
                    }
                }]
            }, {
                className: "template-variable",
                begin: /\{\{/,
                end: /\}\}/,
                contains: ["self", D, Z]
            }]
        }
    }
    BtA.exports = d74
});