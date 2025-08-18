/* chunk:180 bytes:[3929973, 3948526) size:18553 source:unpacked-cli.js */
var diA = E((WW5, miA) => {
    function t64(A) {
        return {
            name: "DNS Zone",
            aliases: ["bind", "zone"],
            keywords: {
                keyword: "IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT"
            },
            contains: [A.COMMENT(";", "$", {
                relevance: 0
            }), {
                className: "meta",
                begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
            }, {
                className: "number",
                begin: "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b"
            }, {
                className: "number",
                begin: "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b"
            }, A.inherit(A.NUMBER_MODE, {
                begin: /\b\d+[dhwm]?/
            })]
        }
    }
    miA.exports = t64
});
var liA = E((JW5, ciA) => {
    function e64(A) {
        return {
            name: "Dockerfile",
            aliases: ["docker"],
            case_insensitive: !0,
            keywords: "from maintainer expose env arg user onbuild stopsignal",
            contains: [A.HASH_COMMENT_MODE, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, A.NUMBER_MODE, {
                beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
                starts: {
                    end: /[^\\]$/,
                    subLanguage: "bash"
                }
            }],
            illegal: "</"
        }
    }
    ciA.exports = e64
});
var iiA = E((XW5, piA) => {
    function A84(A) {
        let B = A.COMMENT(/^\s*@?rem\b/, /$/, {
            relevance: 10
        });
        return {
            name: "Batch file (DOS)",
            aliases: ["bat", "cmd"],
            case_insensitive: !0,
            illegal: /\/\*/,
            keywords: {
                keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
                built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shift sort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
            },
            contains: [{
                className: "variable",
                begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
            }, {
                className: "function",
                begin: {
                    className: "symbol",
                    begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",
                    relevance: 0
                }.begin,
                end: "goto:eof",
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
                }), B]
            }, {
                className: "number",
                begin: "\\b\\d+",
                relevance: 0
            }, B]
        }
    }
    piA.exports = A84
});
var aiA = E((VW5, niA) => {
    function B84(A) {
        return {
            keywords: "dsconfig",
            contains: [{
                className: "keyword",
                begin: "^dsconfig",
                end: /\s/,
                excludeEnd: !0,
                relevance: 10
            }, {
                className: "built_in",
                begin: /(list|create|get|set|delete)-(\w+)/,
                end: /\s/,
                excludeEnd: !0,
                illegal: "!@#$%^&*()",
                relevance: 10
            }, {
                className: "built_in",
                begin: /--(\w+)/,
                end: /\s/,
                excludeEnd: !0
            }, {
                className: "string",
                begin: /"/,
                end: /"/
            }, {
                className: "string",
                begin: /'/,
                end: /'/
            }, {
                className: "string",
                begin: /[\w\-?]+:\w+/,
                end: /\W/,
                relevance: 0
            }, {
                className: "string",
                begin: /\w+(\-\w+)*/,
                end: /(?=\W)/,
                relevance: 0
            }, A.HASH_COMMENT_MODE]
        }
    }
    niA.exports = B84
});
var riA = E((CW5, siA) => {
    function Q84(A) {
        let B = {
                className: "string",
                variants: [A.inherit(A.QUOTE_STRING_MODE, {
                    begin: '((u8?|U)|L)?"'
                }), {
                    begin: '(u8?|U)?R"',
                    end: '"',
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: "'\\\\?.",
                    end: "'",
                    illegal: "."
                }]
            },
            Q = {
                className: "number",
                variants: [{
                    begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
                }, {
                    begin: A.C_NUMBER_RE
                }],
                relevance: 0
            },
            Z = {
                className: "meta",
                begin: "#",
                end: "$",
                keywords: {
                    "meta-keyword": "if else elif endif define undef ifdef ifndef"
                },
                contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, {
                    beginKeywords: "include",
                    end: "$",
                    keywords: {
                        "meta-keyword": "include"
                    },
                    contains: [A.inherit(B, {
                        className: "meta-string"
                    }), {
                        className: "meta-string",
                        begin: "<",
                        end: ">",
                        illegal: "\\n"
                    }]
                }, B, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
            },
            D = {
                className: "variable",
                begin: /&[a-z\d_]*\b/
            },
            G = {
                className: "meta-keyword",
                begin: "/[a-z][a-z\\d-]*/"
            },
            F = {
                className: "symbol",
                begin: "^\\s*[a-zA-Z_][a-zA-Z\\d_]*:"
            },
            I = {
                className: "params",
                begin: "<",
                end: ">",
                contains: [Q, D]
            },
            Y = {
                className: "class",
                begin: /[a-zA-Z_][a-zA-Z\d_@]*\s\{/,
                end: /[{;=]/,
                returnBegin: !0,
                excludeEnd: !0
            };
        return {
            name: "Device Tree",
            keywords: "",
            contains: [{
                className: "class",
                begin: "/\\s*\\{",
                end: /\};/,
                relevance: 10,
                contains: [D, G, F, Y, I, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Q, B]
            }, D, G, F, Y, I, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Q, B, Z, {
                begin: A.IDENT_RE + "::",
                keywords: ""
            }]
        }
    }
    siA.exports = Q84
});
var tiA = E((KW5, oiA) => {
    function Z84(A) {
        return {
            name: "Dust",
            aliases: ["dst"],
            case_insensitive: !0,
            subLanguage: "xml",
            contains: [{
                className: "template-tag",
                begin: /\{[#\/]/,
                end: /\}/,
                illegal: /;/,
                contains: [{
                    className: "name",
                    begin: /[a-zA-Z\.-]+/,
                    starts: {
                        endsWithParent: !0,
                        relevance: 0,
                        contains: [A.QUOTE_STRING_MODE]
                    }
                }]
            }, {
                className: "template-variable",
                begin: /\{/,
                end: /\}/,
                illegal: /;/,
                keywords: "if eq ne lt lte gt gte select default math sep"
            }]
        }
    }
    oiA.exports = Z84
});
var AnA = E((HW5, eiA) => {
    function D84(A) {
        let B = A.COMMENT(/\(\*/, /\*\)/),
            Q = {
                className: "attribute",
                begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
            },
            D = {
                begin: /=/,
                end: /[.;]/,
                contains: [B, {
                    className: "meta",
                    begin: /\?.*\?/
                }, {
                    className: "string",
                    variants: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                        begin: "`",
                        end: "`"
                    }]
                }]
            };
        return {
            name: "Extended Backus-Naur Form",
            illegal: /\S/,
            contains: [B, Q, D]
        }
    }
    eiA.exports = D84
});
var QnA = E((zW5, BnA) => {
    function G84(A) {
        let Z = {
                $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
                keyword: "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0"
            },
            D = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: Z
            },
            G = {
                className: "number",
                begin: "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
                relevance: 0
            },
            F = `[/|([{<"']`,
            I = {
                className: "string",
                begin: `~[a-z](?=[/|([{<"'])`,
                contains: [{
                    endsParent: !0,
                    contains: [{
                        contains: [A.BACKSLASH_ESCAPE, D],
                        variants: [{
                            begin: /"/,
                            end: /"/
                        }, {
                            begin: /'/,
                            end: /'/
                        }, {
                            begin: /\//,
                            end: /\//
                        }, {
                            begin: /\|/,
                            end: /\|/
                        }, {
                            begin: /\(/,
                            end: /\)/
                        }, {
                            begin: /\[/,
                            end: /\]/
                        }, {
                            begin: /\{/,
                            end: /\}/
                        }, {
                            begin: /</,
                            end: />/
                        }]
                    }]
                }]
            },
            Y = {
                className: "string",
                begin: `~[A-Z](?=[/|([{<"'])`,
                contains: [{
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /\//,
                    end: /\//
                }, {
                    begin: /\|/,
                    end: /\|/
                }, {
                    begin: /\(/,
                    end: /\)/
                }, {
                    begin: /\[/,
                    end: /\]/
                }, {
                    begin: /\{/,
                    end: /\}/
                }, {
                    begin: /</,
                    end: />/
                }]
            },
            W = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, D],
                variants: [{
                    begin: /"""/,
                    end: /"""/
                }, {
                    begin: /'''/,
                    end: /'''/
                }, {
                    begin: /~S"""/,
                    end: /"""/,
                    contains: []
                }, {
                    begin: /~S"/,
                    end: /"/,
                    contains: []
                }, {
                    begin: /~S'''/,
                    end: /'''/,
                    contains: []
                }, {
                    begin: /~S'/,
                    end: /'/,
                    contains: []
                }, {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }]
            },
            J = {
                className: "function",
                beginKeywords: "def defp defmacro",
                end: /\B\b/,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",
                    endsParent: !0
                })]
            },
            X = A.inherit(J, {
                className: "class",
                beginKeywords: "defimpl defmodule defprotocol defrecord",
                end: /\bdo\b|$|;/
            }),
            V = [W, Y, I, A.HASH_COMMENT_MODE, X, J, {
                begin: "::"
            }, {
                className: "symbol",
                begin: ":(?![\\s:])",
                contains: [W, {
                    begin: "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
                }],
                relevance: 0
            }, {
                className: "symbol",
                begin: "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?:(?!:)",
                relevance: 0
            }, G, {
                className: "variable",
                begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
            }, {
                begin: "->"
            }, {
                begin: "(" + A.RE_STARTERS_RE + ")\\s*",
                contains: [A.HASH_COMMENT_MODE, {
                    begin: /\/: (?=\d+\s*[,\]])/,
                    relevance: 0,
                    contains: [G]
                }, {
                    className: "regexp",
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE, D],
                    variants: [{
                        begin: "/",
                        end: "/[a-z]*"
                    }, {
                        begin: "%r\\[",
                        end: "\\][a-z]*"
                    }]
                }],
                relevance: 0
            }];
        return D.contains = V, {
            name: "Elixir",
            keywords: Z,
            contains: V
        }
    }
    BnA.exports = G84
});
var DnA = E((EW5, ZnA) => {
    function F84(A) {
        let B = {
                variants: [A.COMMENT("--", "$"), A.COMMENT(/\{-/, /-\}/, {
                    contains: ["self"]
                })]
            },
            Q = {
                className: "type",
                begin: "\\b[A-Z][\\w']*",
                relevance: 0
            },
            Z = {
                begin: "\\(",
                end: "\\)",
                illegal: '"',
                contains: [{
                    className: "type",
                    begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
                }, B]
            },
            D = {
                begin: /\{/,
                end: /\}/,
                contains: Z.contains
            },
            G = {
                className: "string",
                begin: "'\\\\?.",
                end: "'",
                illegal: "."
            };
        return {
            name: "Elm",
            keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
            contains: [{
                beginKeywords: "port effect module",
                end: "exposing",
                keywords: "port effect module where command subscription exposing",
                contains: [Z, B],
                illegal: "\\W\\.|;"
            }, {
                begin: "import",
                end: "$",
                keywords: "import as exposing",
                contains: [Z, B],
                illegal: "\\W\\.|;"
            }, {
                begin: "type",
                end: "$",
                keywords: "type alias",
                contains: [Q, Z, D, B]
            }, {
                beginKeywords: "infix infixl infixr",
                end: "$",
                contains: [A.C_NUMBER_MODE, B]
            }, {
                begin: "port",
                end: "$",
                keywords: "port",
                contains: [B]
            }, G, A.QUOTE_STRING_MODE, A.C_NUMBER_MODE, Q, A.inherit(A.TITLE_MODE, {
                begin: "^[_a-z][\\w']*"
            }), B, {
                begin: "->|<-"
            }],
            illegal: /;/
        }
    }
    ZnA.exports = F84
});