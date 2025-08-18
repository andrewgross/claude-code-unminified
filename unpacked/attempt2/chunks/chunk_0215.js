/* chunk:215 bytes:[4722666, 4741804) size:19138 source:unpacked-cli.js */
var moA = E((RX5, uoA) => {
    function boA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function Ws(A) {
        return b3("(?=", A, ")")
    }

    function b3(...A) {
        return A.map((Q) => boA(Q)).join("")
    }

    function oJ(...A) {
        return "(" + A.map((Q) => boA(Q)).join("|") + ")"
    }
    var uQ0 = (A) => b3(/\b/, A, /\w$/.test(A) ? /\b/ : /\B/),
        _oA = ["Protocol", "Type"].map(uQ0),
        bQ0 = ["init", "self"].map(uQ0),
        P74 = ["Any", "Self"],
        fQ0 = ["associatedtype", "async", "await", /as\?/, /as!/, "as", "break", "case", "catch", "class", "continue", "convenience", "default", "defer", "deinit", "didSet", "do", "dynamic", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "lazy", "let", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet"],
        xoA = ["false", "nil", "true"],
        S74 = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"],
        j74 = ["#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warn_unqualified_access", "#warning"],
        voA = ["abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip"],
        foA = oJ(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/),
        hoA = oJ(foA, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/),
        hQ0 = b3(foA, hoA, "*"),
        goA = oJ(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/),
        o$1 = oJ(goA, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),
        wT = b3(goA, o$1, "*"),
        gQ0 = b3(/[A-Z]/, o$1, "*"),
        k74 = ["autoclosure", b3(/convention\(/, oJ("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", b3(/objc\(/, wT, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "testable", "UIApplicationMain", "unknown", "usableFromInline"],
        y74 = ["iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift"];

    function _74(A) {
        let B = {
                match: /\s+/,
                relevance: 0
            },
            Q = A.COMMENT("/\\*", "\\*/", {
                contains: ["self"]
            }),
            Z = [A.C_LINE_COMMENT_MODE, Q],
            D = {
                className: "keyword",
                begin: b3(/\./, Ws(oJ(..._oA, ...bQ0))),
                end: oJ(..._oA, ...bQ0),
                excludeBegin: !0
            },
            G = {
                match: b3(/\./, oJ(...fQ0)),
                relevance: 0
            },
            F = fQ0.filter((Z1) => typeof Z1 === "string").concat(["_|0"]),
            I = fQ0.filter((Z1) => typeof Z1 !== "string").concat(P74).map(uQ0),
            Y = {
                variants: [{
                    className: "keyword",
                    match: oJ(...I, ...bQ0)
                }]
            },
            W = {
                $pattern: oJ(/\b\w+/, /#\w+/),
                keyword: F.concat(j74),
                literal: xoA
            },
            J = [D, G, Y],
            X = {
                match: b3(/\./, oJ(...voA)),
                relevance: 0
            },
            V = {
                className: "built_in",
                match: b3(/\b/, oJ(...voA), /(?=\()/)
            },
            C = [X, V],
            K = {
                match: /->/,
                relevance: 0
            },
            H = {
                className: "operator",
                relevance: 0,
                variants: [{
                    match: hQ0
                }, {
                    match: `\\.(\\.|${hoA})+`
                }]
            },
            z = [K, H],
            $ = "([0-9]_*)+",
            L = "([0-9a-fA-F]_*)+",
            N = {
                className: "number",
                relevance: 0,
                variants: [{
                    match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
                }, {
                    match: "\\b0x(([0-9a-fA-F]_*)+)(\\.(([0-9a-fA-F]_*)+))?([pP][+-]?(([0-9]_*)+))?\\b"
                }, {
                    match: /\b0o([0-7]_*)+\b/
                }, {
                    match: /\b0b([01]_*)+\b/
                }]
            },
            R = (Z1 = "") => ({
                className: "subst",
                variants: [{
                    match: b3(/\\/, Z1, /[0\\tnr"']/)
                }, {
                    match: b3(/\\/, Z1, /u\{[0-9a-fA-F]{1,8}\}/)
                }]
            }),
            O = (Z1 = "") => ({
                className: "subst",
                match: b3(/\\/, Z1, /[\t ]*(?:[\r\n]|\r\n)/)
            }),
            P = (Z1 = "") => ({
                className: "subst",
                label: "interpol",
                begin: b3(/\\/, Z1, /\(/),
                end: /\)/
            }),
            j = (Z1 = "") => ({
                begin: b3(Z1, /"""/),
                end: b3(/"""/, Z1),
                contains: [R(Z1), O(Z1), P(Z1)]
            }),
            f = (Z1 = "") => ({
                begin: b3(Z1, /"/),
                end: b3(/"/, Z1),
                contains: [R(Z1), P(Z1)]
            }),
            k = {
                className: "string",
                variants: [j(), j("#"), j("##"), j("###"), f(), f("#"), f("##"), f("###")]
            },
            c = {
                match: b3(/`/, wT, /`/)
            },
            u = {
                className: "variable",
                match: /\$\d+/
            },
            a = {
                className: "variable",
                match: `\\$${o$1}+`
            },
            l = [c, u, a],
            y = {
                match: /(@|#)available/,
                className: "keyword",
                starts: {
                    contains: [{
                        begin: /\(/,
                        end: /\)/,
                        keywords: y74,
                        contains: [...z, N, k]
                    }]
                }
            },
            t = {
                className: "keyword",
                match: b3(/@/, oJ(...k74))
            },
            E1 = {
                className: "meta",
                match: b3(/@/, wT)
            },
            C1 = [y, t, E1],
            _1 = {
                match: Ws(/\b[A-Z]/),
                relevance: 0,
                contains: [{
                    className: "type",
                    match: b3(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, o$1, "+")
                }, {
                    className: "type",
                    match: gQ0,
                    relevance: 0
                }, {
                    match: /[?!]+/,
                    relevance: 0
                }, {
                    match: /\.\.\./,
                    relevance: 0
                }, {
                    match: b3(/\s+&\s+/, Ws(gQ0)),
                    relevance: 0
                }]
            },
            F0 = {
                begin: /</,
                end: />/,
                keywords: W,
                contains: [...Z, ...J, ...C1, K, _1]
            };
        _1.contains.push(F0);
        let W0 = {
                match: b3(wT, /\s*:/),
                keywords: "_|0",
                relevance: 0
            },
            g1 = {
                begin: /\(/,
                end: /\)/,
                relevance: 0,
                keywords: W,
                contains: ["self", W0, ...Z, ...J, ...C, ...z, N, k, ...l, ...C1, _1]
            },
            w1 = {
                beginKeywords: "func",
                contains: [{
                    className: "title",
                    match: oJ(c.match, wT, hQ0),
                    endsParent: !0,
                    relevance: 0
                }, B]
            },
            Q1 = {
                begin: /</,
                end: />/,
                contains: [...Z, _1]
            },
            k1 = {
                begin: oJ(Ws(b3(wT, /\s*:/)), Ws(b3(wT, /\s+/, wT, /\s*:/))),
                end: /:/,
                relevance: 0,
                contains: [{
                    className: "keyword",
                    match: /\b_\b/
                }, {
                    className: "params",
                    match: wT
                }]
            },
            H1 = {
                begin: /\(/,
                end: /\)/,
                keywords: W,
                contains: [k1, ...Z, ...J, ...z, N, k, ...C1, _1, g1],
                endsParent: !0,
                illegal: /["']/
            },
            A0 = {
                className: "function",
                match: Ws(/\bfunc\b/),
                contains: [w1, Q1, H1, B],
                illegal: [/\[/, /%/]
            },
            V0 = {
                className: "function",
                match: /\b(subscript|init[?!]?)\s*(?=[<(])/,
                keywords: {
                    keyword: "subscript init init? init!",
                    $pattern: /\w+[?!]?/
                },
                contains: [Q1, H1, B],
                illegal: /\[|%/
            },
            o1 = {
                beginKeywords: "operator",
                end: A.MATCH_NOTHING_RE,
                contains: [{
                    className: "title",
                    match: hQ0,
                    endsParent: !0,
                    relevance: 0
                }]
            },
            e = {
                beginKeywords: "precedencegroup",
                end: A.MATCH_NOTHING_RE,
                contains: [{
                    className: "title",
                    match: gQ0,
                    relevance: 0
                }, {
                    begin: /{/,
                    end: /}/,
                    relevance: 0,
                    endsParent: !0,
                    keywords: [...S74, ...xoA],
                    contains: [_1]
                }]
            };
        for (let Z1 of k.variants) {
            let I1 = Z1.contains.find((O1) => O1.label === "interpol");
            I1.keywords = W;
            let U1 = [...J, ...C, ...z, N, k, ...l];
            I1.contains = [...U1, {
                begin: /\(/,
                end: /\)/,
                contains: ["self", ...U1]
            }]
        }
        return {
            name: "Swift",
            keywords: W,
            contains: [...Z, A0, V0, {
                className: "class",
                beginKeywords: "struct protocol class extension enum",
                end: "\\{",
                excludeEnd: !0,
                keywords: W,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
                }), ...J]
            }, o1, e, {
                beginKeywords: "import",
                end: /$/,
                contains: [...Z],
                relevance: 0
            }, ...J, ...C, ...z, N, k, ...l, ...C1, _1, g1]
        }
    }
    uoA.exports = _74
});
var coA = E((OX5, doA) => {
    function x74(A) {
        return {
            name: "Tagger Script",
            contains: [{
                className: "comment",
                begin: /\$noop\(/,
                end: /\)/,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    contains: ["self", {
                        begin: /\\./
                    }]
                }],
                relevance: 10
            }, {
                className: "keyword",
                begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
                end: /\(/,
                excludeEnd: !0
            }, {
                className: "variable",
                begin: /%[_a-zA-Z0-9:]*/,
                end: "%"
            }, {
                className: "symbol",
                begin: /\\./
            }]
        }
    }
    doA.exports = x74
});
var poA = E((TX5, loA) => {
    function v74(A) {
        var B = "true false yes no null",
            Q = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
            Z = {
                className: "attr",
                variants: [{
                    begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)"
                }, {
                    begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
                }, {
                    begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)"
                }]
            },
            D = {
                className: "template-variable",
                variants: [{
                    begin: /\{\{/,
                    end: /\}\}/
                }, {
                    begin: /%\{/,
                    end: /\}/
                }]
            },
            G = {
                className: "string",
                relevance: 0,
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /\S+/
                }],
                contains: [A.BACKSLASH_ESCAPE, D]
            },
            F = A.inherit(G, {
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /[^\s,{}[\]]+/
                }]
            }),
            I = "[0-9]{4}(-[0-9][0-9]){0,2}",
            Y = "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?",
            W = "(\\.[0-9]*)?",
            J = "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?",
            X = {
                className: "number",
                begin: "\\b" + I + Y + W + J + "\\b"
            },
            V = {
                end: ",",
                endsWithParent: !0,
                excludeEnd: !0,
                keywords: B,
                relevance: 0
            },
            C = {
                begin: /\{/,
                end: /\}/,
                contains: [V],
                illegal: "\\n",
                relevance: 0
            },
            K = {
                begin: "\\[",
                end: "\\]",
                contains: [V],
                illegal: "\\n",
                relevance: 0
            },
            H = [Z, {
                className: "meta",
                begin: "^---\\s*$",
                relevance: 10
            }, {
                className: "string",
                begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
            }, {
                begin: "<%[%=-]?",
                end: "[%-]?%>",
                subLanguage: "ruby",
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0
            }, {
                className: "type",
                begin: "!\\w+!" + Q
            }, {
                className: "type",
                begin: "!<" + Q + ">"
            }, {
                className: "type",
                begin: "!" + Q
            }, {
                className: "type",
                begin: "!!" + Q
            }, {
                className: "meta",
                begin: "&" + A.UNDERSCORE_IDENT_RE + "$"
            }, {
                className: "meta",
                begin: "\\*" + A.UNDERSCORE_IDENT_RE + "$"
            }, {
                className: "bullet",
                begin: "-(?=[ ]|$)",
                relevance: 0
            }, A.HASH_COMMENT_MODE, {
                beginKeywords: B,
                keywords: {
                    literal: B
                }
            }, X, {
                className: "number",
                begin: A.C_NUMBER_RE + "\\b",
                relevance: 0
            }, C, K, G],
            z = [...H];
        return z.pop(), z.push(F), V.contains = z, {
            name: "YAML",
            case_insensitive: !0,
            aliases: ["yml"],
            contains: H
        }
    }
    loA.exports = v74
});
var noA = E((PX5, ioA) => {
    function b74(A) {
        return {
            name: "Test Anything Protocol",
            case_insensitive: !0,
            contains: [A.HASH_COMMENT_MODE, {
                className: "meta",
                variants: [{
                    begin: "^TAP version (\\d+)$"
                }, {
                    begin: "^1\\.\\.(\\d+)$"
                }]
            }, {
                begin: /---$/,
                end: "\\.\\.\\.$",
                subLanguage: "yaml",
                relevance: 0
            }, {
                className: "number",
                begin: " (\\d+) "
            }, {
                className: "symbol",
                variants: [{
                    begin: "^ok"
                }, {
                    begin: "^not ok"
                }]
            }]
        }
    }
    ioA.exports = b74
});