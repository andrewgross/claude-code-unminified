/* chunk:181 bytes:[3948527, 3967913) size:19386 source:unpacked-cli.js */
var InA = E((UW5, FnA) => {
    function I84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function Y84(A) {
        return GnA("(?=", A, ")")
    }

    function GnA(...A) {
        return A.map((Q) => I84(Q)).join("")
    }

    function W84(A) {
        let Q = {
                keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
                built_in: "proc lambda",
                literal: "true false nil"
            },
            Z = {
                className: "doctag",
                begin: "@[A-Za-z]+"
            },
            D = {
                begin: "#<",
                end: ">"
            },
            G = [A.COMMENT("#", "$", {
                contains: [Z]
            }), A.COMMENT("^=begin", "^=end", {
                contains: [Z],
                relevance: 10
            }), A.COMMENT("^__END__", "\\n$")],
            F = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: Q
            },
            I = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, F],
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /`/,
                    end: /`/
                }, {
                    begin: /%[qQwWx]?\(/,
                    end: /\)/
                }, {
                    begin: /%[qQwWx]?\[/,
                    end: /\]/
                }, {
                    begin: /%[qQwWx]?\{/,
                    end: /\}/
                }, {
                    begin: /%[qQwWx]?</,
                    end: />/
                }, {
                    begin: /%[qQwWx]?\//,
                    end: /\//
                }, {
                    begin: /%[qQwWx]?%/,
                    end: /%/
                }, {
                    begin: /%[qQwWx]?-/,
                    end: /-/
                }, {
                    begin: /%[qQwWx]?\|/,
                    end: /\|/
                }, {
                    begin: /\B\?(\\\d{1,3})/
                }, {
                    begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
                }, {
                    begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
                }, {
                    begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\(c|C-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\?\S/
                }, {
                    begin: /<<[-~]?'?(\w+)\n(?:[^\n]*\n)*?\s*\1\b/,
                    returnBegin: !0,
                    contains: [{
                        begin: /<<[-~]?'?/
                    }, A.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        contains: [A.BACKSLASH_ESCAPE, F]
                    })]
                }]
            },
            Y = "[1-9](_?[0-9])*|0",
            W = "[0-9](_?[0-9])*",
            J = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: "\\b([1-9](_?[0-9])*|0)(\\.([0-9](_?[0-9])*))?([eE][+-]?([0-9](_?[0-9])*)|r)?i?\\b"
                }, {
                    begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
                }, {
                    begin: "\\b0(_?[0-7])+r?i?\\b"
                }]
            },
            X = {
                className: "params",
                begin: "\\(",
                end: "\\)",
                endsParent: !0,
                keywords: Q
            },
            V = [I, {
                className: "class",
                beginKeywords: "class module",
                end: "$|;",
                illegal: /=/,
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
                }), {
                    begin: "<\\s*",
                    contains: [{
                        begin: "(" + A.IDENT_RE + "::)?" + A.IDENT_RE,
                        relevance: 0
                    }]
                }].concat(G)
            }, {
                className: "function",
                begin: GnA(/def\s+/, Y84("([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)\\s*(\\(|;|$)")),
                relevance: 0,
                keywords: "def",
                end: "$|;",
                contains: [A.inherit(A.TITLE_MODE, {
                    begin: "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
                }), X].concat(G)
            }, {
                begin: A.IDENT_RE + "::"
            }, {
                className: "symbol",
                begin: A.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                relevance: 0
            }, {
                className: "symbol",
                begin: ":(?!\\s)",
                contains: [I, {
                    begin: "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
                }],
                relevance: 0
            }, J, {
                className: "variable",
                begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
            }, {
                className: "params",
                begin: /\|/,
                end: /\|/,
                relevance: 0,
                keywords: Q
            }, {
                begin: "(" + A.RE_STARTERS_RE + "|unless)\\s*",
                keywords: "unless",
                contains: [{
                    className: "regexp",
                    contains: [A.BACKSLASH_ESCAPE, F],
                    illegal: /\n/,
                    variants: [{
                        begin: "/",
                        end: "/[a-z]*"
                    }, {
                        begin: /%r\{/,
                        end: /\}[a-z]*/
                    }, {
                        begin: "%r\\(",
                        end: "\\)[a-z]*"
                    }, {
                        begin: "%r!",
                        end: "![a-z]*"
                    }, {
                        begin: "%r\\[",
                        end: "\\][a-z]*"
                    }]
                }].concat(D, G),
                relevance: 0
            }].concat(D, G);
        F.contains = V, X.contains = V;
        let C = "[>?]>",
            K = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
            H = "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>",
            z = [{
                begin: /^\s*=>/,
                starts: {
                    end: "$",
                    contains: V
                }
            }, {
                className: "meta",
                begin: "^(" + C + "|" + K + "|" + H + ")(?=[ ])",
                starts: {
                    end: "$",
                    contains: V
                }
            }];
        return G.unshift(D), {
            name: "Ruby",
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            keywords: Q,
            illegal: /\/\*/,
            contains: [A.SHEBANG({
                binary: "ruby"
            })].concat(z).concat(G).concat(V)
        }
    }
    FnA.exports = W84
});
var WnA = E((wW5, YnA) => {
    function J84(A) {
        return {
            name: "ERB",
            subLanguage: "xml",
            contains: [A.COMMENT("<%#", "%>"), {
                begin: "<%[%=-]?",
                end: "[%-]?%>",
                subLanguage: "ruby",
                excludeBegin: !0,
                excludeEnd: !0
            }]
        }
    }
    YnA.exports = J84
});
var XnA = E(($W5, JnA) => {
    function X84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function V84(...A) {
        return A.map((Q) => X84(Q)).join("")
    }

    function C84(A) {
        return {
            name: "Erlang REPL",
            keywords: {
                built_in: "spawn spawn_link self",
                keyword: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
            },
            contains: [{
                className: "meta",
                begin: "^[0-9]+> ",
                relevance: 10
            }, A.COMMENT("%", "$"), {
                className: "number",
                begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
                relevance: 0
            }, A.APOS_STRING_MODE, A.QUOTE_STRING_MODE, {
                begin: V84(/\?(::)?/, /([A-Z]\w*)/, /((::)[A-Z]\w*)*/)
            }, {
                begin: "->"
            }, {
                begin: "ok"
            }, {
                begin: "!"
            }, {
                begin: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
                relevance: 0
            }, {
                begin: "[A-Z][a-zA-Z0-9_']*",
                relevance: 0
            }]
        }
    }
    JnA.exports = C84
});
var CnA = E((qW5, VnA) => {
    function K84(A) {
        let Q = "([a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*|[a-z'][a-zA-Z0-9_']*)",
            Z = {
                keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
                literal: "false true"
            },
            D = A.COMMENT("%", "$"),
            G = {
                className: "number",
                begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
                relevance: 0
            },
            F = {
                begin: "fun\\s+[a-z'][a-zA-Z0-9_']*/\\d+"
            },
            I = {
                begin: Q + "\\(",
                end: "\\)",
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    begin: Q,
                    relevance: 0
                }, {
                    begin: "\\(",
                    end: "\\)",
                    endsWithParent: !0,
                    returnEnd: !0,
                    relevance: 0
                }]
            },
            Y = {
                begin: /\{/,
                end: /\}/,
                relevance: 0
            },
            W = {
                begin: "\\b_([A-Z][A-Za-z0-9_]*)?",
                relevance: 0
            },
            J = {
                begin: "[A-Z][a-zA-Z0-9_]*",
                relevance: 0
            },
            X = {
                begin: "#" + A.UNDERSCORE_IDENT_RE,
                relevance: 0,
                returnBegin: !0,
                contains: [{
                    begin: "#" + A.UNDERSCORE_IDENT_RE,
                    relevance: 0
                }, {
                    begin: /\{/,
                    end: /\}/,
                    relevance: 0
                }]
            },
            V = {
                beginKeywords: "fun receive if try case",
                end: "end",
                keywords: Z
            };
        V.contains = [D, F, A.inherit(A.APOS_STRING_MODE, {
            className: ""
        }), V, I, A.QUOTE_STRING_MODE, G, Y, W, J, X];
        let C = [D, F, V, I, A.QUOTE_STRING_MODE, G, Y, W, J, X];
        I.contains[1].contains = C, Y.contains = C, X.contains[1].contains = C;
        let K = ["-module", "-record", "-undef", "-export", "-ifdef", "-ifndef", "-author", "-copyright", "-doc", "-vsn", "-import", "-include", "-include_lib", "-compile", "-define", "-else", "-endif", "-file", "-behaviour", "-behavior", "-spec"],
            H = {
                className: "params",
                begin: "\\(",
                end: "\\)",
                contains: C
            };
        return {
            name: "Erlang",
            aliases: ["erl"],
            keywords: Z,
            illegal: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
            contains: [{
                className: "function",
                begin: "^[a-z'][a-zA-Z0-9_']*\\s*\\(",
                end: "->",
                returnBegin: !0,
                illegal: "\\(|#|//|/\\*|\\\\|:|;",
                contains: [H, A.inherit(A.TITLE_MODE, {
                    begin: "[a-z'][a-zA-Z0-9_']*"
                })],
                starts: {
                    end: ";|\\.",
                    keywords: Z,
                    contains: C
                }
            }, D, {
                begin: "^-",
                end: "\\.",
                relevance: 0,
                excludeEnd: !0,
                returnBegin: !0,
                keywords: {
                    $pattern: "-" + A.IDENT_RE,
                    keyword: K.map((z) => `${z}|1.5`).join(" ")
                },
                contains: [H]
            }, G, A.QUOTE_STRING_MODE, X, W, J, Y, {
                begin: /\.$/
            }]
        }
    }
    VnA.exports = K84
});
var HnA = E((NW5, KnA) => {
    function H84(A) {
        return {
            name: "Excel formulae",
            aliases: ["xlsx", "xls"],
            case_insensitive: !0,
            keywords: {
                $pattern: /[a-zA-Z][\w\.]*/,
                built_in: "ABS ACCRINT ACCRINTM ACOS ACOSH ACOT ACOTH AGGREGATE ADDRESS AMORDEGRC AMORLINC AND ARABIC AREAS ASC ASIN ASINH ATAN ATAN2 ATANH AVEDEV AVERAGE AVERAGEA AVERAGEIF AVERAGEIFS BAHTTEXT BASE BESSELI BESSELJ BESSELK BESSELY BETADIST BETA.DIST BETAINV BETA.INV BIN2DEC BIN2HEX BIN2OCT BINOMDIST BINOM.DIST BINOM.DIST.RANGE BINOM.INV BITAND BITLSHIFT BITOR BITRSHIFT BITXOR CALL CEILING CEILING.MATH CEILING.PRECISE CELL CHAR CHIDIST CHIINV CHITEST CHISQ.DIST CHISQ.DIST.RT CHISQ.INV CHISQ.INV.RT CHISQ.TEST CHOOSE CLEAN CODE COLUMN COLUMNS COMBIN COMBINA COMPLEX CONCAT CONCATENATE CONFIDENCE CONFIDENCE.NORM CONFIDENCE.T CONVERT CORREL COS COSH COT COTH COUNT COUNTA COUNTBLANK COUNTIF COUNTIFS COUPDAYBS COUPDAYS COUPDAYSNC COUPNCD COUPNUM COUPPCD COVAR COVARIANCE.P COVARIANCE.S CRITBINOM CSC CSCH CUBEKPIMEMBER CUBEMEMBER CUBEMEMBERPROPERTY CUBERANKEDMEMBER CUBESET CUBESETCOUNT CUBEVALUE CUMIPMT CUMPRINC DATE DATEDIF DATEVALUE DAVERAGE DAY DAYS DAYS360 DB DBCS DCOUNT DCOUNTA DDB DEC2BIN DEC2HEX DEC2OCT DECIMAL DEGREES DELTA DEVSQ DGET DISC DMAX DMIN DOLLAR DOLLARDE DOLLARFR DPRODUCT DSTDEV DSTDEVP DSUM DURATION DVAR DVARP EDATE EFFECT ENCODEURL EOMONTH ERF ERF.PRECISE ERFC ERFC.PRECISE ERROR.TYPE EUROCONVERT EVEN EXACT EXP EXPON.DIST EXPONDIST FACT FACTDOUBLE FALSE|0 F.DIST FDIST F.DIST.RT FILTERXML FIND FINDB F.INV F.INV.RT FINV FISHER FISHERINV FIXED FLOOR FLOOR.MATH FLOOR.PRECISE FORECAST FORECAST.ETS FORECAST.ETS.CONFINT FORECAST.ETS.SEASONALITY FORECAST.ETS.STAT FORECAST.LINEAR FORMULATEXT FREQUENCY F.TEST FTEST FV FVSCHEDULE GAMMA GAMMA.DIST GAMMADIST GAMMA.INV GAMMAINV GAMMALN GAMMALN.PRECISE GAUSS GCD GEOMEAN GESTEP GETPIVOTDATA GROWTH HARMEAN HEX2BIN HEX2DEC HEX2OCT HLOOKUP HOUR HYPERLINK HYPGEOM.DIST HYPGEOMDIST IF IFERROR IFNA IFS IMABS IMAGINARY IMARGUMENT IMCONJUGATE IMCOS IMCOSH IMCOT IMCSC IMCSCH IMDIV IMEXP IMLN IMLOG10 IMLOG2 IMPOWER IMPRODUCT IMREAL IMSEC IMSECH IMSIN IMSINH IMSQRT IMSUB IMSUM IMTAN INDEX INDIRECT INFO INT INTERCEPT INTRATE IPMT IRR ISBLANK ISERR ISERROR ISEVEN ISFORMULA ISLOGICAL ISNA ISNONTEXT ISNUMBER ISODD ISREF ISTEXT ISO.CEILING ISOWEEKNUM ISPMT JIS KURT LARGE LCM LEFT LEFTB LEN LENB LINEST LN LOG LOG10 LOGEST LOGINV LOGNORM.DIST LOGNORMDIST LOGNORM.INV LOOKUP LOWER MATCH MAX MAXA MAXIFS MDETERM MDURATION MEDIAN MID MIDBs MIN MINIFS MINA MINUTE MINVERSE MIRR MMULT MOD MODE MODE.MULT MODE.SNGL MONTH MROUND MULTINOMIAL MUNIT N NA NEGBINOM.DIST NEGBINOMDIST NETWORKDAYS NETWORKDAYS.INTL NOMINAL NORM.DIST NORMDIST NORMINV NORM.INV NORM.S.DIST NORMSDIST NORM.S.INV NORMSINV NOT NOW NPER NPV NUMBERVALUE OCT2BIN OCT2DEC OCT2HEX ODD ODDFPRICE ODDFYIELD ODDLPRICE ODDLYIELD OFFSET OR PDURATION PEARSON PERCENTILE.EXC PERCENTILE.INC PERCENTILE PERCENTRANK.EXC PERCENTRANK.INC PERCENTRANK PERMUT PERMUTATIONA PHI PHONETIC PI PMT POISSON.DIST POISSON POWER PPMT PRICE PRICEDISC PRICEMAT PROB PRODUCT PROPER PV QUARTILE QUARTILE.EXC QUARTILE.INC QUOTIENT RADIANS RAND RANDBETWEEN RANK.AVG RANK.EQ RANK RATE RECEIVED REGISTER.ID REPLACE REPLACEB REPT RIGHT RIGHTB ROMAN ROUND ROUNDDOWN ROUNDUP ROW ROWS RRI RSQ RTD SEARCH SEARCHB SEC SECH SECOND SERIESSUM SHEET SHEETS SIGN SIN SINH SKEW SKEW.P SLN SLOPE SMALL SQL.REQUEST SQRT SQRTPI STANDARDIZE STDEV STDEV.P STDEV.S STDEVA STDEVP STDEVPA STEYX SUBSTITUTE SUBTOTAL SUM SUMIF SUMIFS SUMPRODUCT SUMSQ SUMX2MY2 SUMX2PY2 SUMXMY2 SWITCH SYD T TAN TANH TBILLEQ TBILLPRICE TBILLYIELD T.DIST T.DIST.2T T.DIST.RT TDIST TEXT TEXTJOIN TIME TIMEVALUE T.INV T.INV.2T TINV TODAY TRANSPOSE TREND TRIM TRIMMEAN TRUE|0 TRUNC T.TEST TTEST TYPE UNICHAR UNICODE UPPER VALUE VAR VAR.P VAR.S VARA VARP VARPA VDB VLOOKUP WEBSERVICE WEEKDAY WEEKNUM WEIBULL WEIBULL.DIST WORKDAY WORKDAY.INTL XIRR XNPV XOR YEAR YEARFRAC YIELD YIELDDISC YIELDMAT Z.TEST ZTEST"
            },
            contains: [{
                begin: /^=/,
                end: /[^=]/,
                returnEnd: !0,
                illegal: /=/,
                relevance: 10
            }, {
                className: "symbol",
                begin: /\b[A-Z]{1,2}\d+\b/,
                end: /[^\d]/,
                excludeEnd: !0,
                relevance: 0
            }, {
                className: "symbol",
                begin: /[A-Z]{0,2}\d*:[A-Z]{0,2}\d*/,
                relevance: 0
            }, A.BACKSLASH_ESCAPE, A.QUOTE_STRING_MODE, {
                className: "number",
                begin: A.NUMBER_RE + "(%)?",
                relevance: 0
            }, A.COMMENT(/\bN\(/, /\)/, {
                excludeBegin: !0,
                excludeEnd: !0,
                illegal: /\n/
            })]
        }
    }
    KnA.exports = H84
});
var EnA = E((LW5, znA) => {
    function z84(A) {
        return {
            name: "FIX",
            contains: [{
                begin: /[^\u2401\u0001]+/,
                end: /[\u2401\u0001]/,
                excludeEnd: !0,
                returnBegin: !0,
                returnEnd: !1,
                contains: [{
                    begin: /([^\u2401\u0001=]+)/,
                    end: /=([^\u2401\u0001=]+)/,
                    returnEnd: !0,
                    returnBegin: !1,
                    className: "attr"
                }, {
                    begin: /=/,
                    end: /([\u2401\u0001])/,
                    excludeEnd: !0,
                    excludeBegin: !0,
                    className: "string"
                }]
            }],
            case_insensitive: !0
        }
    }
    znA.exports = z84
});