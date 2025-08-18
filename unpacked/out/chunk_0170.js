/* chunk:170 bytes:[3749005, 3766858) size:17853 source:unpacked-cli.js */
var olA = E((EY5, rlA) => {
    function $44(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function q44(...A) {
        return A.map((Q) => $44(Q)).join("")
    }

    function N44(A) {
        let B = {
                ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/,
                unexpectedChars: /[!@#$^&',?+~`|:]/
            },
            Q = ["ALPHA", "BIT", "CHAR", "CR", "CRLF", "CTL", "DIGIT", "DQUOTE", "HEXDIG", "HTAB", "LF", "LWSP", "OCTET", "SP", "VCHAR", "WSP"],
            Z = A.COMMENT(/;/, /$/),
            D = {
                className: "symbol",
                begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
            },
            G = {
                className: "symbol",
                begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
            },
            F = {
                className: "symbol",
                begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
            },
            I = {
                className: "symbol",
                begin: /%[si]/
            },
            Y = {
                className: "attribute",
                begin: q44(B.ruleDeclaration, /(?=\s*=)/)
            };
        return {
            name: "Augmented Backus-Naur Form",
            illegal: B.unexpectedChars,
            keywords: Q,
            contains: [Y, Z, D, G, F, I, A.QUOTE_STRING_MODE, A.NUMBER_MODE]
        }
    }
    rlA.exports = N44
});
var ApA = E((UY5, elA) => {
    function tlA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function L44(...A) {
        return A.map((Q) => tlA(Q)).join("")
    }

    function M44(...A) {
        return "(" + A.map((Q) => tlA(Q)).join("|") + ")"
    }

    function R44(A) {
        let B = ["GET", "POST", "HEAD", "PUT", "DELETE", "CONNECT", "OPTIONS", "PATCH", "TRACE"];
        return {
            name: "Apache Access Log",
            contains: [{
                className: "number",
                begin: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?\b/,
                relevance: 5
            }, {
                className: "number",
                begin: /\b\d+\b/,
                relevance: 0
            }, {
                className: "string",
                begin: L44(/"/, M44(...B)),
                end: /"/,
                keywords: B,
                illegal: /\n/,
                relevance: 5,
                contains: [{
                    begin: /HTTP\/[12]\.\d'/,
                    relevance: 5
                }]
            }, {
                className: "string",
                begin: /\[\d[^\]\n]{8,}\]/,
                illegal: /\n/,
                relevance: 1
            }, {
                className: "string",
                begin: /\[/,
                end: /\]/,
                illegal: /\n/,
                relevance: 0
            }, {
                className: "string",
                begin: /"Mozilla\/\d\.\d \(/,
                end: /"/,
                illegal: /\n/,
                relevance: 3
            }, {
                className: "string",
                begin: /"/,
                end: /"/,
                illegal: /\n/,
                relevance: 0
            }]
        }
    }
    elA.exports = R44
});
var QpA = E((wY5, BpA) => {
    function O44(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function T44(...A) {
        return A.map((Q) => O44(Q)).join("")
    }

    function P44(A) {
        let B = /[a-zA-Z_$][a-zA-Z0-9_$]*/,
            Q = /([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)/,
            Z = {
                className: "rest_arg",
                begin: /[.]{3}/,
                end: B,
                relevance: 10
            };
        return {
            name: "ActionScript",
            aliases: ["as"],
            keywords: {
                keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
                literal: "true false null undefined"
            },
            contains: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.C_NUMBER_MODE, {
                className: "class",
                beginKeywords: "package",
                end: /\{/,
                contains: [A.TITLE_MODE]
            }, {
                className: "class",
                beginKeywords: "class interface",
                end: /\{/,
                excludeEnd: !0,
                contains: [{
                    beginKeywords: "extends implements"
                }, A.TITLE_MODE]
            }, {
                className: "meta",
                beginKeywords: "import include",
                end: /;/,
                keywords: {
                    "meta-keyword": "import include"
                }
            }, {
                className: "function",
                beginKeywords: "function",
                end: /[{;]/,
                excludeEnd: !0,
                illegal: /\S/,
                contains: [A.TITLE_MODE, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    contains: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Z]
                }, {
                    begin: T44(/:\s*/, Q)
                }]
            }, A.METHOD_GUARD],
            illegal: /#/
        }
    }
    BpA.exports = P44
});
var DpA = E(($Y5, ZpA) => {
    function S44(A) {
        let Q = "[eE][-+]?\\d(_|\\d)*",
            Z = "\\d(_|\\d)*(\\.\\d(_|\\d)*)?(" + Q + ")?",
            D = "\\w+",
            F = "\\b(" + ("\\d(_|\\d)*#\\w+(\\.\\w+)?#(" + Q + ")?") + "|" + Z + ")",
            I = "[A-Za-z](_?[A-Za-z0-9.])*",
            Y = `[]\\{\\}%#'"`,
            W = A.COMMENT("--", "$"),
            J = {
                begin: "\\s+:\\s+",
                end: "\\s*(:=|;|\\)|=>|$)",
                illegal: `[]\\{\\}%#'"`,
                contains: [{
                    beginKeywords: "loop for declare others",
                    endsParent: !0
                }, {
                    className: "keyword",
                    beginKeywords: "not null constant access function procedure in out aliased exception"
                }, {
                    className: "type",
                    begin: "[A-Za-z](_?[A-Za-z0-9.])*",
                    endsParent: !0,
                    relevance: 0
                }]
            };
        return {
            name: "Ada",
            case_insensitive: !0,
            keywords: {
                keyword: "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
                literal: "True False"
            },
            contains: [W, {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [{
                    begin: /""/,
                    relevance: 0
                }]
            }, {
                className: "string",
                begin: /'.'/
            }, {
                className: "number",
                begin: F,
                relevance: 0
            }, {
                className: "symbol",
                begin: "'[A-Za-z](_?[A-Za-z0-9.])*"
            }, {
                className: "title",
                begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
                end: "(is|$)",
                keywords: "package body",
                excludeBegin: !0,
                excludeEnd: !0,
                illegal: `[]\\{\\}%#'"`
            }, {
                begin: "(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",
                end: "(\\bis|\\bwith|\\brenames|\\)\\s*;)",
                keywords: "overriding function procedure with is renames return",
                returnBegin: !0,
                contains: [W, {
                    className: "title",
                    begin: "(\\bwith\\s+)?\\b(function|procedure)\\s+",
                    end: "(\\(|\\s+|$)",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    illegal: `[]\\{\\}%#'"`
                }, J, {
                    className: "type",
                    begin: "\\breturn\\s+",
                    end: "(\\s+|;|$)",
                    keywords: "return",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    endsParent: !0,
                    illegal: `[]\\{\\}%#'"`
                }]
            }, {
                className: "type",
                begin: "\\b(sub)?type\\s+",
                end: "\\s+",
                keywords: "type",
                excludeBegin: !0,
                illegal: `[]\\{\\}%#'"`
            }, J]
        }
    }
    ZpA.exports = S44
});
var FpA = E((qY5, GpA) => {
    function j44(A) {
        var B = {
                className: "built_in",
                begin: "\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)"
            },
            Q = {
                className: "symbol",
                begin: "[a-zA-Z0-9_]+@"
            },
            Z = {
                className: "keyword",
                begin: "<",
                end: ">",
                contains: [B, Q]
            };
        return B.contains = [Z], Q.contains = [Z], {
            name: "AngelScript",
            aliases: ["asc"],
            keywords: "for in|0 break continue while do|0 return if else case switch namespace is cast or and xor not get|0 in inout|10 out override set|0 private public const default|0 final shared external mixin|10 enum typedef funcdef this super import from interface abstract|0 try catch protected explicit property",
            illegal: "(^using\\s+[A-Za-z0-9_\\.]+;$|\\bfunction\\s*[^\\(])",
            contains: [{
                className: "string",
                begin: "'",
                end: "'",
                illegal: "\\n",
                contains: [A.BACKSLASH_ESCAPE],
                relevance: 0
            }, {
                className: "string",
                begin: '"""',
                end: '"""'
            }, {
                className: "string",
                begin: '"',
                end: '"',
                illegal: "\\n",
                contains: [A.BACKSLASH_ESCAPE],
                relevance: 0
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "string",
                begin: "^\\s*\\[",
                end: "\\]"
            }, {
                beginKeywords: "interface namespace",
                end: /\{/,
                illegal: "[;.\\-]",
                contains: [{
                    className: "symbol",
                    begin: "[a-zA-Z0-9_]+"
                }]
            }, {
                beginKeywords: "class",
                end: /\{/,
                illegal: "[;.\\-]",
                contains: [{
                    className: "symbol",
                    begin: "[a-zA-Z0-9_]+",
                    contains: [{
                        begin: "[:,]\\s*",
                        contains: [{
                            className: "symbol",
                            begin: "[a-zA-Z0-9_]+"
                        }]
                    }]
                }]
            }, B, Q, {
                className: "literal",
                begin: "\\b(null|true|false)"
            }, {
                className: "number",
                relevance: 0,
                begin: "(-?)(\\b0[xXbBoOdD][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)"
            }]
        }
    }
    GpA.exports = j44
});
var YpA = E((NY5, IpA) => {
    function k44(A) {
        let B = {
                className: "number",
                begin: /[$%]\d+/
            },
            Q = {
                className: "number",
                begin: /\d+/
            },
            Z = {
                className: "number",
                begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
            },
            D = {
                className: "number",
                begin: /:\d{1,5}/
            };
        return {
            name: "Apache config",
            aliases: ["apacheconf"],
            case_insensitive: !0,
            contains: [A.HASH_COMMENT_MODE, {
                className: "section",
                begin: /<\/?/,
                end: />/,
                contains: [Z, D, A.inherit(A.QUOTE_STRING_MODE, {
                    relevance: 0
                })]
            }, {
                className: "attribute",
                begin: /\w+/,
                relevance: 0,
                keywords: {
                    nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    end: /$/,
                    relevance: 0,
                    keywords: {
                        literal: "on off all deny allow"
                    },
                    contains: [{
                        className: "meta",
                        begin: /\s\[/,
                        end: /\]$/
                    }, {
                        className: "variable",
                        begin: /[\$%]\{/,
                        end: /\}/,
                        contains: ["self", B]
                    }, Z, Q, A.QUOTE_STRING_MODE]
                }
            }],
            illegal: /\S/
        }
    }
    IpA.exports = k44
});
var CpA = E((LY5, VpA) => {
    function XpA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function WpA(...A) {
        return A.map((Q) => XpA(Q)).join("")
    }

    function JpA(...A) {
        return "(" + A.map((Q) => XpA(Q)).join("|") + ")"
    }

    function y44(A) {
        let B = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }),
            Q = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                contains: ["self", A.C_NUMBER_MODE, B]
            },
            Z = A.COMMENT(/--/, /$/),
            D = A.COMMENT(/\(\*/, /\*\)/, {
                contains: ["self", Z]
            }),
            G = [Z, D, A.HASH_COMMENT_MODE],
            F = [/apart from/, /aside from/, /instead of/, /out of/, /greater than/, /isn't|(doesn't|does not) (equal|come before|come after|contain)/, /(greater|less) than( or equal)?/, /(starts?|ends|begins?) with/, /contained by/, /comes (before|after)/, /a (ref|reference)/, /POSIX (file|path)/, /(date|time) string/, /quoted form/],
            I = [/clipboard info/, /the clipboard/, /info for/, /list (disks|folder)/, /mount volume/, /path to/, /(close|open for) access/, /(get|set) eof/, /current date/, /do shell script/, /get volume settings/, /random number/, /set volume/, /system attribute/, /system info/, /time to GMT/, /(load|run|store) script/, /scripting components/, /ASCII (character|number)/, /localized string/, /choose (application|color|file|file name|folder|from list|remote application|URL)/, /display (alert|dialog)/];
        return {
            name: "AppleScript",
            aliases: ["osascript"],
            keywords: {
                keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the|0 then third through thru timeout times to transaction try until where while whose with without",
                literal: "AppleScript false linefeed return pi quote result space tab true",
                built_in: "alias application boolean class constant date file integer list number real record string text activate beep count delay launch log offset read round run say summarize write character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
            },
            contains: [B, A.C_NUMBER_MODE, {
                className: "built_in",
                begin: WpA(/\b/, JpA(...I), /\b/)
            }, {
                className: "built_in",
                begin: /^\s*return\b/
            }, {
                className: "literal",
                begin: /\b(text item delimiters|current application|missing value)\b/
            }, {
                className: "keyword",
                begin: WpA(/\b/, JpA(...F), /\b/)
            }, {
                beginKeywords: "on",
                illegal: /[${=;\n]/,
                contains: [A.UNDERSCORE_TITLE_MODE, Q]
            }, ...G],
            illegal: /\/\/|->|=>|\[\[/
        }
    }
    VpA.exports = y44
});