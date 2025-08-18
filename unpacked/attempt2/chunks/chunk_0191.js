/* chunk:191 bytes:[4203314, 4220943) size:17629 source:unpacked-cli.js */
var PaA = E((eW5, TaA) => {
    function w54(A) {
        var B = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
            Q = ["baremodule", "begin", "break", "catch", "ccall", "const", "continue", "do", "else", "elseif", "end", "export", "false", "finally", "for", "function", "global", "if", "import", "in", "isa", "let", "local", "macro", "module", "quote", "return", "true", "try", "using", "where", "while"],
            Z = ["ARGS", "C_NULL", "DEPOT_PATH", "ENDIAN_BOM", "ENV", "Inf", "Inf16", "Inf32", "Inf64", "InsertionSort", "LOAD_PATH", "MergeSort", "NaN", "NaN16", "NaN32", "NaN64", "PROGRAM_FILE", "QuickSort", "RoundDown", "RoundFromZero", "RoundNearest", "RoundNearestTiesAway", "RoundNearestTiesUp", "RoundToZero", "RoundUp", "VERSION|0", "devnull", "false", "im", "missing", "nothing", "pi", "stderr", "stdin", "stdout", "true", "undef", "π", "ℯ"],
            D = ["AbstractArray", "AbstractChannel", "AbstractChar", "AbstractDict", "AbstractDisplay", "AbstractFloat", "AbstractIrrational", "AbstractMatrix", "AbstractRange", "AbstractSet", "AbstractString", "AbstractUnitRange", "AbstractVecOrMat", "AbstractVector", "Any", "ArgumentError", "Array", "AssertionError", "BigFloat", "BigInt", "BitArray", "BitMatrix", "BitSet", "BitVector", "Bool", "BoundsError", "CapturedException", "CartesianIndex", "CartesianIndices", "Cchar", "Cdouble", "Cfloat", "Channel", "Char", "Cint", "Cintmax_t", "Clong", "Clonglong", "Cmd", "Colon", "Complex", "ComplexF16", "ComplexF32", "ComplexF64", "CompositeException", "Condition", "Cptrdiff_t", "Cshort", "Csize_t", "Cssize_t", "Cstring", "Cuchar", "Cuint", "Cuintmax_t", "Culong", "Culonglong", "Cushort", "Cvoid", "Cwchar_t", "Cwstring", "DataType", "DenseArray", "DenseMatrix", "DenseVecOrMat", "DenseVector", "Dict", "DimensionMismatch", "Dims", "DivideError", "DomainError", "EOFError", "Enum", "ErrorException", "Exception", "ExponentialBackOff", "Expr", "Float16", "Float32", "Float64", "Function", "GlobalRef", "HTML", "IO", "IOBuffer", "IOContext", "IOStream", "IdDict", "IndexCartesian", "IndexLinear", "IndexStyle", "InexactError", "InitError", "Int", "Int128", "Int16", "Int32", "Int64", "Int8", "Integer", "InterruptException", "InvalidStateException", "Irrational", "KeyError", "LinRange", "LineNumberNode", "LinearIndices", "LoadError", "MIME", "Matrix", "Method", "MethodError", "Missing", "MissingException", "Module", "NTuple", "NamedTuple", "Nothing", "Number", "OrdinalRange", "OutOfMemoryError", "OverflowError", "Pair", "PartialQuickSort", "PermutedDimsArray", "Pipe", "ProcessFailedException", "Ptr", "QuoteNode", "Rational", "RawFD", "ReadOnlyMemoryError", "Real", "ReentrantLock", "Ref", "Regex", "RegexMatch", "RoundingMode", "SegmentationFault", "Set", "Signed", "Some", "StackOverflowError", "StepRange", "StepRangeLen", "StridedArray", "StridedMatrix", "StridedVecOrMat", "StridedVector", "String", "StringIndexError", "SubArray", "SubString", "SubstitutionString", "Symbol", "SystemError", "Task", "TaskFailedException", "Text", "TextDisplay", "Timer", "Tuple", "Type", "TypeError", "TypeVar", "UInt", "UInt128", "UInt16", "UInt32", "UInt64", "UInt8", "UndefInitializer", "UndefKeywordError", "UndefRefError", "UndefVarError", "Union", "UnionAll", "UnitRange", "Unsigned", "Val", "Vararg", "VecElement", "VecOrMat", "Vector", "VersionNumber", "WeakKeyDict", "WeakRef"],
            G = {
                $pattern: B,
                keyword: Q,
                literal: Z,
                built_in: D
            },
            F = {
                keywords: G,
                illegal: /<\//
            },
            I = {
                className: "number",
                begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
                relevance: 0
            },
            Y = {
                className: "string",
                begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
            },
            W = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                keywords: G
            },
            J = {
                className: "variable",
                begin: "\\$" + B
            },
            X = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, W, J],
                variants: [{
                    begin: /\w*"""/,
                    end: /"""\w*/,
                    relevance: 10
                }, {
                    begin: /\w*"/,
                    end: /"\w*/
                }]
            },
            V = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, W, J],
                begin: "`",
                end: "`"
            },
            C = {
                className: "meta",
                begin: "@" + B
            },
            K = {
                className: "comment",
                variants: [{
                    begin: "#=",
                    end: "=#",
                    relevance: 10
                }, {
                    begin: "#",
                    end: "$"
                }]
            };
        return F.name = "Julia", F.contains = [I, Y, X, V, C, K, A.HASH_COMMENT_MODE, {
            className: "keyword",
            begin: "\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"
        }, {
            begin: /<:/
        }], W.contains = F.contains, F
    }
    TaA.exports = w54
});
var jaA = E((AJ5, SaA) => {
    function $54(A) {
        return {
            name: "Julia REPL",
            contains: [{
                className: "meta",
                begin: /^julia>/,
                relevance: 10,
                starts: {
                    end: /^(?![ ]{6})/,
                    subLanguage: "julia"
                },
                aliases: ["jldoctest"]
            }]
        }
    }
    SaA.exports = $54
});
var yaA = E((BJ5, kaA) => {
    var Is = "[0-9](_*[0-9])*",
        n$1 = `\\.(${Is})`,
        a$1 = "[0-9a-fA-F](_*[0-9a-fA-F])*",
        q54 = {
            className: "number",
            variants: [{
                begin: `(\\b(${Is})((${n$1})|\\.)?|(${n$1}))[eE][+-]?(${Is})[fFdD]?\\b`
            }, {
                begin: `\\b(${Is})((${n$1})[fFdD]?\\b|\\.([fFdD]\\b)?)`
            }, {
                begin: `(${n$1})[fFdD]?\\b`
            }, {
                begin: `\\b(${Is})[fFdD]\\b`
            }, {
                begin: `\\b0[xX]((${a$1})\\.?|(${a$1})?\\.(${a$1}))[pP][+-]?(${Is})[fFdD]?\\b`
            }, {
                begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
            }, {
                begin: `\\b0[xX](${a$1})[lL]?\\b`
            }, {
                begin: "\\b0(_*[0-7])*[lL]?\\b"
            }, {
                begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
            }],
            relevance: 0
        };

    function N54(A) {
        let B = {
                keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
                built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
                literal: "true false null"
            },
            Q = {
                className: "keyword",
                begin: /\b(break|continue|return|this)\b/,
                starts: {
                    contains: [{
                        className: "symbol",
                        begin: /@\w+/
                    }]
                }
            },
            Z = {
                className: "symbol",
                begin: A.UNDERSCORE_IDENT_RE + "@"
            },
            D = {
                className: "subst",
                begin: /\$\{/,
                end: /\}/,
                contains: [A.C_NUMBER_MODE]
            },
            G = {
                className: "variable",
                begin: "\\$" + A.UNDERSCORE_IDENT_RE
            },
            F = {
                className: "string",
                variants: [{
                    begin: '"""',
                    end: '"""(?=[^"])',
                    contains: [G, D]
                }, {
                    begin: "'",
                    end: "'",
                    illegal: /\n/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: '"',
                    end: '"',
                    illegal: /\n/,
                    contains: [A.BACKSLASH_ESCAPE, G, D]
                }]
            };
        D.contains.push(F);
        let I = {
                className: "meta",
                begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + A.UNDERSCORE_IDENT_RE + ")?"
            },
            Y = {
                className: "meta",
                begin: "@" + A.UNDERSCORE_IDENT_RE,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    contains: [A.inherit(F, {
                        className: "meta-string"
                    })]
                }]
            },
            W = q54,
            J = A.COMMENT("/\\*", "\\*/", {
                contains: [A.C_BLOCK_COMMENT_MODE]
            }),
            X = {
                variants: [{
                    className: "type",
                    begin: A.UNDERSCORE_IDENT_RE
                }, {
                    begin: /\(/,
                    end: /\)/,
                    contains: []
                }]
            },
            V = X;
        return V.variants[1].contains = [X], X.variants[1].contains = [V], {
            name: "Kotlin",
            aliases: ["kt", "kts"],
            keywords: B,
            contains: [A.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), A.C_LINE_COMMENT_MODE, J, Q, Z, I, Y, {
                className: "function",
                beginKeywords: "fun",
                end: "[(]|$",
                returnBegin: !0,
                excludeEnd: !0,
                keywords: B,
                relevance: 5,
                contains: [{
                    begin: A.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [A.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    keywords: "reified",
                    relevance: 0
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    endsParent: !0,
                    keywords: B,
                    relevance: 0,
                    contains: [{
                        begin: /:/,
                        end: /[=,\/]/,
                        endsWithParent: !0,
                        contains: [X, A.C_LINE_COMMENT_MODE, J],
                        relevance: 0
                    }, A.C_LINE_COMMENT_MODE, J, I, Y, F, A.C_NUMBER_MODE]
                }, J]
            }, {
                className: "class",
                beginKeywords: "class interface trait",
                end: /[:\{(]|$/,
                excludeEnd: !0,
                illegal: "extends implements",
                contains: [{
                    beginKeywords: "public protected internal private constructor"
                }, A.UNDERSCORE_TITLE_MODE, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0
                }, {
                    className: "type",
                    begin: /[,:]\s*/,
                    end: /[<\(,]|$/,
                    excludeBegin: !0,
                    returnEnd: !0
                }, I, Y]
            }, F, {
                className: "meta",
                begin: "^#!/usr/bin/env",
                end: "$",
                illegal: `
`
            }, W]
        }
    }
    kaA.exports = N54
});
var xaA = E((QJ5, _aA) => {
    function L54(A) {
        let D = {
                $pattern: "[a-zA-Z_][\\w.]*|&[lg]t;",
                literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
                built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
                keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
            },
            G = A.COMMENT("<!--", "-->", {
                relevance: 0
            }),
            F = {
                className: "meta",
                begin: "\\[noprocess\\]",
                starts: {
                    end: "\\[/noprocess\\]",
                    returnEnd: !0,
                    contains: [G]
                }
            },
            I = {
                className: "meta",
                begin: "\\[/noprocess|<\\?(lasso(script)?|=)"
            },
            Y = {
                className: "symbol",
                begin: "'[a-zA-Z_][\\w.]*'"
            },
            W = [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.inherit(A.C_NUMBER_MODE, {
                begin: A.C_NUMBER_RE + "|(-?infinity|NaN)\\b"
            }), A.inherit(A.APOS_STRING_MODE, {
                illegal: null
            }), A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }), {
                className: "string",
                begin: "`",
                end: "`"
            }, {
                variants: [{
                    begin: "[#$][a-zA-Z_][\\w.]*"
                }, {
                    begin: "#",
                    end: "\\d+",
                    illegal: "\\W"
                }]
            }, {
                className: "type",
                begin: "::\\s*",
                end: "[a-zA-Z_][\\w.]*",
                illegal: "\\W"
            }, {
                className: "params",
                variants: [{
                    begin: "-(?!infinity)[a-zA-Z_][\\w.]*",
                    relevance: 0
                }, {
                    begin: "(\\.\\.\\.)"
                }]
            }, {
                begin: /(->|\.)\s*/,
                relevance: 0,
                contains: [Y]
            }, {
                className: "class",
                beginKeywords: "define",
                returnEnd: !0,
                end: "\\(|=>",
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[a-zA-Z_][\\w.]*(=(?!>))?|[-+*/%](?!>)"
                })]
            }];
        return {
            name: "Lasso",
            aliases: ["ls", "lassoscript"],
            case_insensitive: !0,
            keywords: D,
            contains: [{
                className: "meta",
                begin: "\\]|\\?>",
                relevance: 0,
                starts: {
                    end: "\\[|<\\?(lasso(script)?|=)",
                    returnEnd: !0,
                    relevance: 0,
                    contains: [G]
                }
            }, F, I, {
                className: "meta",
                begin: "\\[no_square_brackets",
                starts: {
                    end: "\\[/no_square_brackets\\]",
                    keywords: D,
                    contains: [{
                        className: "meta",
                        begin: "\\]|\\?>",
                        relevance: 0,
                        starts: {
                            end: "\\[noprocess\\]|<\\?(lasso(script)?|=)",
                            returnEnd: !0,
                            contains: [G]
                        }
                    }, F, I].concat(W)
                }
            }, {
                className: "meta",
                begin: "\\[",
                relevance: 0
            }, {
                className: "meta",
                begin: "^#!",
                end: "lasso9$",
                relevance: 10
            }].concat(W)
        }
    }
    _aA.exports = L54
});