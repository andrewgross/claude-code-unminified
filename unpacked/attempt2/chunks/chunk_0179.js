/* chunk:179 bytes:[3910156, 3929972) size:19816 source:unpacked-cli.js */
var jiA = E((ZW5, SiA) => {
    function l64(A) {
        let B = {
                $pattern: A.UNDERSCORE_IDENT_RE,
                keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
                built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
                literal: "false null true"
            },
            Q = "(0|[1-9][\\d_]*)",
            Z = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)",
            D = "0[bB][01_]+",
            G = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
            F = "0[xX]([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
            I = "([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))",
            Y = "((0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)(\\.\\d*|" + I + ")|\\d+\\.(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)|\\.(0|[1-9][\\d_]*)" + I + "?)",
            W = "(0[xX](([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)\\.([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)|\\.?([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))[pP][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))",
            J = "((0|[1-9][\\d_]*)|0[bB][01_]+|" + F + ")",
            X = "(" + W + "|" + Y + ")",
            V = `\\\\(['"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};`,
            C = {
                className: "number",
                begin: "\\b" + J + "(L|u|U|Lu|LU|uL|UL)?",
                relevance: 0
            },
            K = {
                className: "number",
                begin: "\\b(" + X + "([fF]|L|i|[fF]i|Li)?|" + J + "(i|[fF]i|Li))",
                relevance: 0
            },
            H = {
                className: "string",
                begin: "'(" + V + "|.)",
                end: "'",
                illegal: "."
            },
            $ = {
                className: "string",
                begin: '"',
                contains: [{
                    begin: V,
                    relevance: 0
                }],
                end: '"[cwd]?'
            },
            L = {
                className: "string",
                begin: '[rq]"',
                end: '"[cwd]?',
                relevance: 5
            },
            N = {
                className: "string",
                begin: "`",
                end: "`[cwd]?"
            },
            R = {
                className: "string",
                begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
                relevance: 10
            },
            O = {
                className: "string",
                begin: 'q"\\{',
                end: '\\}"'
            },
            P = {
                className: "meta",
                begin: "^#!",
                end: "$",
                relevance: 5
            },
            j = {
                className: "meta",
                begin: "#(line)",
                end: "$",
                relevance: 5
            },
            f = {
                className: "keyword",
                begin: "@[a-zA-Z_][a-zA-Z_\\d]*"
            },
            k = A.COMMENT("\\/\\+", "\\+\\/", {
                contains: ["self"],
                relevance: 10
            });
        return {
            name: "D",
            keywords: B,
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, k, R, $, L, N, O, K, C, H, P, j, f]
        }
    }
    SiA.exports = l64
});
var yiA = E((DW5, kiA) => {
    function p64(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function i64(...A) {
        return A.map((Q) => p64(Q)).join("")
    }

    function n64(A) {
        let B = {
                begin: /<\/?[A-Za-z_]/,
                end: ">",
                subLanguage: "xml",
                relevance: 0
            },
            Q = {
                begin: "^[-\\*]{3,}",
                end: "$"
            },
            Z = {
                className: "code",
                variants: [{
                    begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
                }, {
                    begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
                }, {
                    begin: "```",
                    end: "```+[ ]*$"
                }, {
                    begin: "~~~",
                    end: "~~~+[ ]*$"
                }, {
                    begin: "`.+?`"
                }, {
                    begin: "(?=^( {4}|\\t))",
                    contains: [{
                        begin: "^( {4}|\\t)",
                        end: "(\\n)$"
                    }],
                    relevance: 0
                }]
            },
            D = {
                className: "bullet",
                begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
                end: "\\s+",
                excludeEnd: !0
            },
            G = {
                begin: /^\[[^\n]+\]:/,
                returnBegin: !0,
                contains: [{
                    className: "symbol",
                    begin: /\[/,
                    end: /\]/,
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "link",
                    begin: /:\s*/,
                    end: /$/,
                    excludeBegin: !0
                }]
            },
            I = {
                variants: [{
                    begin: /\[.+?\]\[.*?\]/,
                    relevance: 0
                }, {
                    begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
                    relevance: 2
                }, {
                    begin: i64(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
                    relevance: 2
                }, {
                    begin: /\[.+?\]\([./?&#].*?\)/,
                    relevance: 1
                }, {
                    begin: /\[.+?\]\(.*?\)/,
                    relevance: 0
                }],
                returnBegin: !0,
                contains: [{
                    className: "string",
                    relevance: 0,
                    begin: "\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    returnEnd: !0
                }, {
                    className: "link",
                    relevance: 0,
                    begin: "\\]\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "symbol",
                    relevance: 0,
                    begin: "\\]\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    excludeEnd: !0
                }]
            },
            Y = {
                className: "strong",
                contains: [],
                variants: [{
                    begin: /_{2}/,
                    end: /_{2}/
                }, {
                    begin: /\*{2}/,
                    end: /\*{2}/
                }]
            },
            W = {
                className: "emphasis",
                contains: [],
                variants: [{
                    begin: /\*(?!\*)/,
                    end: /\*/
                }, {
                    begin: /_(?!_)/,
                    end: /_/,
                    relevance: 0
                }]
            };
        Y.contains.push(W), W.contains.push(Y);
        let J = [B, I];
        return Y.contains = Y.contains.concat(J), W.contains = W.contains.concat(J), J = J.concat(Y, W), {
            name: "Markdown",
            aliases: ["md", "mkdown", "mkd"],
            contains: [{
                className: "section",
                variants: [{
                    begin: "^#{1,6}",
                    end: "$",
                    contains: J
                }, {
                    begin: "(?=^.+?\\n[=-]{2,}$)",
                    contains: [{
                        begin: "^[=-]*$"
                    }, {
                        begin: "^",
                        end: "\\n",
                        contains: J
                    }]
                }]
            }, B, D, Y, W, {
                className: "quote",
                begin: "^>\\s+",
                contains: J,
                end: "$"
            }, Z, Q, I, G]
        }
    }
    kiA.exports = n64
});
var xiA = E((GW5, _iA) => {
    function a64(A) {
        let B = {
                className: "subst",
                variants: [{
                    begin: "\\$[A-Za-z0-9_]+"
                }]
            },
            Q = {
                className: "subst",
                variants: [{
                    begin: /\$\{/,
                    end: /\}/
                }],
                keywords: "true false null this is new super"
            },
            Z = {
                className: "string",
                variants: [{
                    begin: "r'''",
                    end: "'''"
                }, {
                    begin: 'r"""',
                    end: '"""'
                }, {
                    begin: "r'",
                    end: "'",
                    illegal: "\\n"
                }, {
                    begin: 'r"',
                    end: '"',
                    illegal: "\\n"
                }, {
                    begin: "'''",
                    end: "'''",
                    contains: [A.BACKSLASH_ESCAPE, B, Q]
                }, {
                    begin: '"""',
                    end: '"""',
                    contains: [A.BACKSLASH_ESCAPE, B, Q]
                }, {
                    begin: "'",
                    end: "'",
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE, B, Q]
                }, {
                    begin: '"',
                    end: '"',
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE, B, Q]
                }]
            };
        Q.contains = [A.C_NUMBER_MODE, Z];
        let D = ["Comparable", "DateTime", "Duration", "Function", "Iterable", "Iterator", "List", "Map", "Match", "Object", "Pattern", "RegExp", "Set", "Stopwatch", "String", "StringBuffer", "StringSink", "Symbol", "Type", "Uri", "bool", "double", "int", "num", "Element", "ElementList"],
            G = D.map((I) => `${I}?`);
        return {
            name: "Dart",
            keywords: {
                keyword: "abstract as assert async await break case catch class const continue covariant default deferred do dynamic else enum export extends extension external factory false final finally for Function get hide if implements import in inferface is late library mixin new null on operator part required rethrow return set show static super switch sync this throw true try typedef var void while with yield",
                built_in: D.concat(G).concat(["Never", "Null", "dynamic", "print", "document", "querySelector", "querySelectorAll", "window"]),
                $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
            },
            contains: [Z, A.COMMENT(/\/\*\*(?!\/)/, /\*\//, {
                subLanguage: "markdown",
                relevance: 0
            }), A.COMMENT(/\/{3,} ?/, /$/, {
                contains: [{
                    subLanguage: "markdown",
                    begin: ".",
                    end: "$",
                    relevance: 0
                }]
            }), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "class",
                beginKeywords: "class interface",
                end: /\{/,
                excludeEnd: !0,
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, A.C_NUMBER_MODE, {
                className: "meta",
                begin: "@[A-Za-z]+"
            }, {
                begin: "=>"
            }]
        }
    }
    _iA.exports = a64
});
var biA = E((FW5, viA) => {
    function s64(A) {
        let B = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure absolute reintroduce operator as is abstract alias assembler bitpacked break continue cppdecl cvar enumerator experimental platform deprecated unimplemented dynamic export far16 forward generic helper implements interrupt iochecks local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat specialize strict unaligned varargs ",
            Q = [A.C_LINE_COMMENT_MODE, A.COMMENT(/\{/, /\}/, {
                relevance: 0
            }), A.COMMENT(/\(\*/, /\*\)/, {
                relevance: 10
            })],
            Z = {
                className: "meta",
                variants: [{
                    begin: /\{\$/,
                    end: /\}/
                }, {
                    begin: /\(\*\$/,
                    end: /\*\)/
                }]
            },
            D = {
                className: "string",
                begin: /'/,
                end: /'/,
                contains: [{
                    begin: /''/
                }]
            },
            G = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: "\\$[0-9A-Fa-f]+"
                }, {
                    begin: "&[0-7]+"
                }, {
                    begin: "%[01]+"
                }]
            },
            F = {
                className: "string",
                begin: /(#\d+)+/
            },
            I = {
                begin: A.IDENT_RE + "\\s*=\\s*class\\s*\\(",
                returnBegin: !0,
                contains: [A.TITLE_MODE]
            },
            Y = {
                className: "function",
                beginKeywords: "function constructor destructor procedure",
                end: /[:;]/,
                keywords: "function constructor|10 destructor|10 procedure|10",
                contains: [A.TITLE_MODE, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: B,
                    contains: [D, F, Z].concat(Q)
                }, Z].concat(Q)
            };
        return {
            name: "Delphi",
            aliases: ["dpr", "dfm", "pas", "pascal", "freepascal", "lazarus", "lpr", "lfm"],
            case_insensitive: !0,
            keywords: B,
            illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
            contains: [D, F, A.NUMBER_MODE, G, I, Y, Z].concat(Q)
        }
    }
    viA.exports = s64
});
var hiA = E((IW5, fiA) => {
    function r64(A) {
        return {
            name: "Diff",
            aliases: ["patch"],
            contains: [{
                className: "meta",
                relevance: 10,
                variants: [{
                    begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
                }, {
                    begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                }, {
                    begin: /^--- +\d+,\d+ +----$/
                }]
            }, {
                className: "comment",
                variants: [{
                    begin: /Index: /,
                    end: /$/
                }, {
                    begin: /^index/,
                    end: /$/
                }, {
                    begin: /={3,}/,
                    end: /$/
                }, {
                    begin: /^-{3}/,
                    end: /$/
                }, {
                    begin: /^\*{3} /,
                    end: /$/
                }, {
                    begin: /^\+{3}/,
                    end: /$/
                }, {
                    begin: /^\*{15}$/
                }, {
                    begin: /^diff --git/,
                    end: /$/
                }]
            }, {
                className: "addition",
                begin: /^\+/,
                end: /$/
            }, {
                className: "deletion",
                begin: /^-/,
                end: /$/
            }, {
                className: "addition",
                begin: /^!/,
                end: /$/
            }]
        }
    }
    fiA.exports = r64
});
var uiA = E((YW5, giA) => {
    function o64(A) {
        let B = {
            begin: /\|[A-Za-z]+:?/,
            keywords: {
                name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
            },
            contains: [A.QUOTE_STRING_MODE, A.APOS_STRING_MODE]
        };
        return {
            name: "Django",
            aliases: ["jinja"],
            case_insensitive: !0,
            subLanguage: "xml",
            contains: [A.COMMENT(/\{%\s*comment\s*%\}/, /\{%\s*endcomment\s*%\}/), A.COMMENT(/\{#/, /#\}/), {
                className: "template-tag",
                begin: /\{%/,
                end: /%\}/,
                contains: [{
                    className: "name",
                    begin: /\w+/,
                    keywords: {
                        name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
                    },
                    starts: {
                        endsWithParent: !0,
                        keywords: "in by as",
                        contains: [B],
                        relevance: 0
                    }
                }]
            }, {
                className: "template-variable",
                begin: /\{\{/,
                end: /\}\}/,
                contains: [B]
            }]
        }
    }
    giA.exports = o64
});