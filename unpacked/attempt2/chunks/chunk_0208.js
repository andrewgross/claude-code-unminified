/* chunk:208 bytes:[4597110, 4615210) size:18100 source:unpacked-cli.js */
var orA = E((IX5, rrA) => {
    function o34(A) {
        let Q = "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
            Z = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
        return {
            name: "Rust",
            aliases: ["rs"],
            keywords: {
                $pattern: A.IDENT_RE + "!?",
                keyword: Q,
                literal: "true false Some None Ok Err",
                built_in: Z
            },
            illegal: "</",
            contains: [A.C_LINE_COMMENT_MODE, A.COMMENT("/\\*", "\\*/", {
                contains: ["self"]
            }), A.inherit(A.QUOTE_STRING_MODE, {
                begin: /b?"/,
                illegal: null
            }), {
                className: "string",
                variants: [{
                    begin: /r(#*)"(.|\n)*?"\1(?!#)/
                }, {
                    begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
                }]
            }, {
                className: "symbol",
                begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
            }, {
                className: "number",
                variants: [{
                    begin: "\\b0b([01_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
                }, {
                    begin: "\\b0o([0-7_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
                }, {
                    begin: "\\b0x([A-Fa-f0-9_]+)([ui](8|16|32|64|128|size)|f(32|64))?"
                }, {
                    begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)([ui](8|16|32|64|128|size)|f(32|64))?"
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "fn",
                end: "(\\(|<)",
                excludeEnd: !0,
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, {
                className: "meta",
                begin: "#!?\\[",
                end: "\\]",
                contains: [{
                    className: "meta-string",
                    begin: /"/,
                    end: /"/
                }]
            }, {
                className: "class",
                beginKeywords: "type",
                end: ";",
                contains: [A.inherit(A.UNDERSCORE_TITLE_MODE, {
                    endsParent: !0
                })],
                illegal: "\\S"
            }, {
                className: "class",
                beginKeywords: "trait enum struct union",
                end: /\{/,
                contains: [A.inherit(A.UNDERSCORE_TITLE_MODE, {
                    endsParent: !0
                })],
                illegal: "[\\w\\d]"
            }, {
                begin: A.IDENT_RE + "::",
                keywords: {
                    built_in: Z
                }
            }, {
                begin: "->"
            }]
        }
    }
    rrA.exports = o34
});
var erA = E((YX5, trA) => {
    function t34(A) {
        let B = "do if then else end until while abort array attrib by call cards cards4 catname continue datalines datalines4 delete delim delimiter display dm drop endsas error file filename footnote format goto in infile informat input keep label leave length libname link list lostcard merge missing modify options output out page put redirect remove rename replace retain return select set skip startsas stop title update waitsas where window x systask add and alter as cascade check create delete describe distinct drop foreign from group having index insert into in key like message modify msgtype not null on or order primary references reset restrict select set table unique update validate view where",
            Q = "abs|addr|airy|arcos|arsin|atan|attrc|attrn|band|betainv|blshift|bnot|bor|brshift|bxor|byte|cdf|ceil|cexist|cinv|close|cnonct|collate|compbl|compound|compress|cos|cosh|css|curobs|cv|daccdb|daccdbsl|daccsl|daccsyd|dacctab|dairy|date|datejul|datepart|datetime|day|dclose|depdb|depdbsl|depdbsl|depsl|depsl|depsyd|depsyd|deptab|deptab|dequote|dhms|dif|digamma|dim|dinfo|dnum|dopen|doptname|doptnum|dread|dropnote|dsname|erf|erfc|exist|exp|fappend|fclose|fcol|fdelete|fetch|fetchobs|fexist|fget|fileexist|filename|fileref|finfo|finv|fipname|fipnamel|fipstate|floor|fnonct|fnote|fopen|foptname|foptnum|fpoint|fpos|fput|fread|frewind|frlen|fsep|fuzz|fwrite|gaminv|gamma|getoption|getvarc|getvarn|hbound|hms|hosthelp|hour|ibessel|index|indexc|indexw|input|inputc|inputn|int|intck|intnx|intrr|irr|jbessel|juldate|kurtosis|lag|lbound|left|length|lgamma|libname|libref|log|log10|log2|logpdf|logpmf|logsdf|lowcase|max|mdy|mean|min|minute|mod|month|mopen|mort|n|netpv|nmiss|normal|note|npv|open|ordinal|pathname|pdf|peek|peekc|pmf|point|poisson|poke|probbeta|probbnml|probchi|probf|probgam|probhypr|probit|probnegb|probnorm|probt|put|putc|putn|qtr|quote|ranbin|rancau|ranexp|rangam|range|rank|rannor|ranpoi|rantbl|rantri|ranuni|repeat|resolve|reverse|rewind|right|round|saving|scan|sdf|second|sign|sin|sinh|skewness|soundex|spedis|sqrt|std|stderr|stfips|stname|stnamel|substr|sum|symget|sysget|sysmsg|sysprod|sysrc|system|tan|tanh|time|timepart|tinv|tnonct|today|translate|tranwrd|trigamma|trim|trimn|trunc|uniform|upcase|uss|var|varfmt|varinfmt|varlabel|varlen|varname|varnum|varray|varrayx|vartype|verify|vformat|vformatd|vformatdx|vformatn|vformatnx|vformatw|vformatwx|vformatx|vinarray|vinarrayx|vinformat|vinformatd|vinformatdx|vinformatn|vinformatnx|vinformatw|vinformatwx|vinformatx|vlabel|vlabelx|vlength|vlengthx|vname|vnamex|vtype|vtypex|weekday|year|yyq|zipfips|zipname|zipnamel|zipstate";
        return {
            name: "SAS",
            case_insensitive: !0,
            keywords: {
                literal: "null missing _all_ _automatic_ _character_ _infile_ _n_ _name_ _null_ _numeric_ _user_ _webout_",
                meta: B
            },
            contains: [{
                className: "keyword",
                begin: /^\s*(proc [\w\d_]+|data|run|quit)[\s;]/
            }, {
                className: "variable",
                begin: /&[a-zA-Z_&][a-zA-Z0-9_]*\.?/
            }, {
                className: "emphasis",
                begin: /^\s*datalines|cards.*;/,
                end: /^\s*;\s*$/
            }, {
                className: "built_in",
                begin: "%(" + "bquote|nrbquote|cmpres|qcmpres|compstor|datatyp|display|do|else|end|eval|global|goto|if|index|input|keydef|label|left|length|let|local|lowcase|macro|mend|nrbquote|nrquote|nrstr|put|qcmpres|qleft|qlowcase|qscan|qsubstr|qsysfunc|qtrim|quote|qupcase|scan|str|substr|superq|syscall|sysevalf|sysexec|sysfunc|sysget|syslput|sysprod|sysrc|sysrput|then|to|trim|unquote|until|upcase|verify|while|window" + ")"
            }, {
                className: "name",
                begin: /%[a-zA-Z_][a-zA-Z_0-9]*/
            }, {
                className: "meta",
                begin: "[^%](" + Q + ")[(]"
            }, {
                className: "string",
                variants: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
            }, A.COMMENT("\\*", ";"), A.C_BLOCK_COMMENT_MODE]
        }
    }
    trA.exports = t34
});
var BoA = E((WX5, AoA) => {
    function e34(A) {
        let B = {
                className: "meta",
                begin: "@[A-Za-z]+"
            },
            Q = {
                className: "subst",
                variants: [{
                    begin: "\\$[A-Za-z0-9_]+"
                }, {
                    begin: /\$\{/,
                    end: /\}/
                }]
            },
            Z = {
                className: "string",
                variants: [{
                    begin: '"""',
                    end: '"""'
                }, {
                    begin: '"',
                    end: '"',
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: '[a-z]+"',
                    end: '"',
                    illegal: "\\n",
                    contains: [A.BACKSLASH_ESCAPE, Q]
                }, {
                    className: "string",
                    begin: '[a-z]+"""',
                    end: '"""',
                    contains: [Q],
                    relevance: 10
                }]
            },
            D = {
                className: "symbol",
                begin: "'\\w[\\w\\d_]*(?!')"
            },
            G = {
                className: "type",
                begin: "\\b[A-Z][A-Za-z0-9_]*",
                relevance: 0
            },
            F = {
                className: "title",
                begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
                relevance: 0
            },
            I = {
                className: "class",
                beginKeywords: "class object trait type",
                end: /[:={\[\n;]/,
                excludeEnd: !0,
                contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                    beginKeywords: "extends with",
                    relevance: 10
                }, {
                    begin: /\[/,
                    end: /\]/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0,
                    contains: [G]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0,
                    contains: [G]
                }, F]
            },
            Y = {
                className: "function",
                beginKeywords: "def",
                end: /[:={\[(\n;]/,
                excludeEnd: !0,
                contains: [F]
            };
        return {
            name: "Scala",
            keywords: {
                literal: "true false null",
                keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, Z, D, G, Y, I, A.C_NUMBER_MODE, B]
        }
    }
    AoA.exports = e34
});
var ZoA = E((JX5, QoA) => {
    function A74(A) {
        let Z = "(-|\\+)?\\d+([./]\\d+)?[+\\-](-|\\+)?\\d+([./]\\d+)?i",
            D = {
                $pattern: "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
                "builtin-name": "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"
            },
            G = {
                className: "literal",
                begin: "(#t|#f|#\\\\[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+|#\\\\.)"
            },
            F = {
                className: "number",
                variants: [{
                    begin: "(-|\\+)?\\d+([./]\\d+)?",
                    relevance: 0
                }, {
                    begin: Z,
                    relevance: 0
                }, {
                    begin: "#b[0-1]+(/[0-1]+)?"
                }, {
                    begin: "#o[0-7]+(/[0-7]+)?"
                }, {
                    begin: "#x[0-9a-f]+(/[0-9a-f]+)?"
                }]
            },
            I = A.QUOTE_STRING_MODE,
            Y = [A.COMMENT(";", "$", {
                relevance: 0
            }), A.COMMENT("#\\|", "\\|#")],
            W = {
                begin: "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
                relevance: 0
            },
            J = {
                className: "symbol",
                begin: "'[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+"
            },
            X = {
                endsWithParent: !0,
                relevance: 0
            },
            V = {
                variants: [{
                    begin: /'/
                }, {
                    begin: "`"
                }],
                contains: [{
                    begin: "\\(",
                    end: "\\)",
                    contains: ["self", G, I, F, W, J]
                }]
            },
            C = {
                className: "name",
                relevance: 0,
                begin: "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
                keywords: D
            },
            H = {
                variants: [{
                    begin: "\\(",
                    end: "\\)"
                }, {
                    begin: "\\[",
                    end: "\\]"
                }],
                contains: [{
                    begin: /lambda/,
                    endsWithParent: !0,
                    returnBegin: !0,
                    contains: [C, {
                        endsParent: !0,
                        variants: [{
                            begin: /\(/,
                            end: /\)/
                        }, {
                            begin: /\[/,
                            end: /\]/
                        }],
                        contains: [W]
                    }]
                }, C, X]
            };
        return X.contains = [G, F, I, W, J, V, H].concat(Y), {
            name: "Scheme",
            illegal: /\S/,
            contains: [A.SHEBANG(), F, I, J, V, H].concat(Y)
        }
    }
    QoA.exports = A74
});
var GoA = E((XX5, DoA) => {
    function B74(A) {
        let B = [A.C_NUMBER_MODE, {
            className: "string",
            begin: `'|"`,
            end: `'|"`,
            contains: [A.BACKSLASH_ESCAPE, {
                begin: "''"
            }]
        }];
        return {
            name: "Scilab",
            aliases: ["sci"],
            keywords: {
                $pattern: /%?\w+/,
                keyword: "abort break case clear catch continue do elseif else endfunction end for function global if pause return resume select try then while",
                literal: "%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
                built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan type typename warning zeros matrix"
            },
            illegal: '("|#|/\\*|\\s+/\\w+)',
            contains: [{
                className: "function",
                beginKeywords: "function",
                end: "$",
                contains: [A.UNDERSCORE_TITLE_MODE, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)"
                }]
            }, {
                begin: "[a-zA-Z_][a-zA-Z_0-9]*[\\.']+",
                relevance: 0
            }, {
                begin: "\\[",
                end: "\\][\\.']*",
                relevance: 0,
                contains: B
            }, A.COMMENT("//", "$")].concat(B)
        }
    }
    DoA.exports = B74
});