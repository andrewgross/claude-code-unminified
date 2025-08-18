/* chunk:200 bytes:[4453886, 4471737) size:17851 source:unpacked-cli.js */
var wsA = E((wJ5, UsA) => {
    function Q34(A) {
        return {
            name: "MIPS Assembly",
            case_insensitive: !0,
            aliases: ["mips"],
            keywords: {
                $pattern: "\\.?" + A.IDENT_RE,
                meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .ltorg ",
                built_in: "$0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15 $16 $17 $18 $19 $20 $21 $22 $23 $24 $25 $26 $27 $28 $29 $30 $31 zero at v0 v1 a0 a1 a2 a3 a4 a5 a6 a7 t0 t1 t2 t3 t4 t5 t6 t7 t8 t9 s0 s1 s2 s3 s4 s5 s6 s7 s8 k0 k1 gp sp fp ra $f0 $f1 $f2 $f2 $f4 $f5 $f6 $f7 $f8 $f9 $f10 $f11 $f12 $f13 $f14 $f15 $f16 $f17 $f18 $f19 $f20 $f21 $f22 $f23 $f24 $f25 $f26 $f27 $f28 $f29 $f30 $f31 Context Random EntryLo0 EntryLo1 Context PageMask Wired EntryHi HWREna BadVAddr Count Compare SR IntCtl SRSCtl SRSMap Cause EPC PRId EBase Config Config1 Config2 Config3 LLAddr Debug DEPC DESAVE CacheErr ECC ErrorEPC TagLo DataLo TagHi DataHi WatchLo WatchHi PerfCtl PerfCnt "
            },
            contains: [{
                className: "keyword",
                begin: "\\b(addi?u?|andi?|b(al)?|beql?|bgez(al)?l?|bgtzl?|blezl?|bltz(al)?l?|bnel?|cl[oz]|divu?|ext|ins|j(al)?|jalr(\\.hb)?|jr(\\.hb)?|lbu?|lhu?|ll|lui|lw[lr]?|maddu?|mfhi|mflo|movn|movz|move|msubu?|mthi|mtlo|mul|multu?|nop|nor|ori?|rotrv?|sb|sc|se[bh]|sh|sllv?|slti?u?|srav?|srlv?|subu?|sw[lr]?|xori?|wsbh|abs\\.[sd]|add\\.[sd]|alnv.ps|bc1[ft]l?|c\\.(s?f|un|u?eq|[ou]lt|[ou]le|ngle?|seq|l[et]|ng[et])\\.[sd]|(ceil|floor|round|trunc)\\.[lw]\\.[sd]|cfc1|cvt\\.d\\.[lsw]|cvt\\.l\\.[dsw]|cvt\\.ps\\.s|cvt\\.s\\.[dlw]|cvt\\.s\\.p[lu]|cvt\\.w\\.[dls]|div\\.[ds]|ldx?c1|luxc1|lwx?c1|madd\\.[sd]|mfc1|mov[fntz]?\\.[ds]|msub\\.[sd]|mth?c1|mul\\.[ds]|neg\\.[ds]|nmadd\\.[ds]|nmsub\\.[ds]|p[lu][lu]\\.ps|recip\\.fmt|r?sqrt\\.[ds]|sdx?c1|sub\\.[ds]|suxc1|swx?c1|break|cache|d?eret|[de]i|ehb|mfc0|mtc0|pause|prefx?|rdhwr|rdpgpr|sdbbp|ssnop|synci?|syscall|teqi?|tgei?u?|tlb(p|r|w[ir])|tlti?u?|tnei?|wait|wrpgpr)",
                end: "\\s"
            }, A.COMMENT("[;#](?!\\s*$)", "$"), A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, {
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
                    begin: "0x[0-9a-f]+"
                }, {
                    begin: "\\b-?\\d+"
                }],
                relevance: 0
            }, {
                className: "symbol",
                variants: [{
                    begin: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
                }, {
                    begin: "^\\s*[0-9]+:"
                }, {
                    begin: "[0-9]+[bf]"
                }],
                relevance: 0
            }],
            illegal: /\//
        }
    }
    UsA.exports = Q34
});
var qsA = E(($J5, $sA) => {
    function Z34(A) {
        return {
            name: "Mizar",
            keywords: "environ vocabularies notations constructors definitions registrations theorems schemes requirements begin end definition registration cluster existence pred func defpred deffunc theorem proof let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from be being by means equals implies iff redefine define now not or attr is mode suppose per cases set thesis contradiction scheme reserve struct correctness compatibility coherence symmetry assymetry reflexivity irreflexivity connectedness uniqueness commutativity idempotence involutiveness projectivity",
            contains: [A.COMMENT("::", "$")]
        }
    }
    $sA.exports = Z34
});
var RsA = E((qJ5, MsA) => {
    function LsA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function Ys(...A) {
        return A.map((Q) => LsA(Q)).join("")
    }

    function NsA(...A) {
        return "(" + A.map((Q) => LsA(Q)).join("|") + ")"
    }

    function D34(A) {
        let B = ["abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "lc", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "ma", "map", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "ne", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "y|0"],
            Q = /[dualxmsipngr]{0,12}/,
            Z = {
                $pattern: /[\w.]+/,
                keyword: B.join(" ")
            },
            D = {
                className: "subst",
                begin: "[$@]\\{",
                end: "\\}",
                keywords: Z
            },
            G = {
                begin: /->\{/,
                end: /\}/
            },
            F = {
                variants: [{
                    begin: /\$\d/
                }, {
                    begin: Ys(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
                }, {
                    begin: /[$%@][^\s\w{]/,
                    relevance: 0
                }]
            },
            I = [A.BACKSLASH_ESCAPE, D, F],
            Y = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/],
            W = (V, C, K = "\\1") => {
                let H = K === "\\1" ? K : Ys(K, C);
                return Ys(Ys("(?:", V, ")"), C, /(?:\\.|[^\\\/])*?/, H, /(?:\\.|[^\\\/])*?/, K, Q)
            },
            J = (V, C, K) => {
                return Ys(Ys("(?:", V, ")"), C, /(?:\\.|[^\\\/])*?/, K, Q)
            },
            X = [F, A.HASH_COMMENT_MODE, A.COMMENT(/^=\w/, /=cut/, {
                endsWithParent: !0
            }), G, {
                className: "string",
                contains: I,
                variants: [{
                    begin: "q[qwxr]?\\s*\\(",
                    end: "\\)",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\[",
                    end: "\\]",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\{",
                    end: "\\}",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\|",
                    end: "\\|",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*<",
                    end: ">",
                    relevance: 5
                }, {
                    begin: "qw\\s+q",
                    end: "q",
                    relevance: 5
                }, {
                    begin: "'",
                    end: "'",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: '"',
                    end: '"'
                }, {
                    begin: "`",
                    end: "`",
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /\{\w+\}/,
                    relevance: 0
                }, {
                    begin: "-?\\w+\\s*=>",
                    relevance: 0
                }]
            }, {
                className: "number",
                begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                relevance: 0
            }, {
                begin: "(\\/\\/|" + A.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                keywords: "split return print reverse grep",
                relevance: 0,
                contains: [A.HASH_COMMENT_MODE, {
                    className: "regexp",
                    variants: [{
                        begin: W("s|tr|y", NsA(...Y))
                    }, {
                        begin: W("s|tr|y", "\\(", "\\)")
                    }, {
                        begin: W("s|tr|y", "\\[", "\\]")
                    }, {
                        begin: W("s|tr|y", "\\{", "\\}")
                    }],
                    relevance: 2
                }, {
                    className: "regexp",
                    variants: [{
                        begin: /(m|qr)\/\//,
                        relevance: 0
                    }, {
                        begin: J("(?:m|qr)?", /\//, /\//)
                    }, {
                        begin: J("m|qr", NsA(...Y), /\1/)
                    }, {
                        begin: J("m|qr", /\(/, /\)/)
                    }, {
                        begin: J("m|qr", /\[/, /\]/)
                    }, {
                        begin: J("m|qr", /\{/, /\}/)
                    }]
                }]
            }, {
                className: "function",
                beginKeywords: "sub",
                end: "(\\s*\\(.*?\\))?[;{]",
                excludeEnd: !0,
                relevance: 5,
                contains: [A.TITLE_MODE]
            }, {
                begin: "-\\w\\b",
                relevance: 0
            }, {
                begin: "^__DATA__$",
                end: "^__END__$",
                subLanguage: "mojolicious",
                contains: [{
                    begin: "^@@.*",
                    end: "$",
                    className: "comment"
                }]
            }];
        return D.contains = X, G.contains = X, {
            name: "Perl",
            aliases: ["pl", "pm"],
            keywords: Z,
            contains: X
        }
    }
    MsA.exports = D34
});
var TsA = E((NJ5, OsA) => {
    function G34(A) {
        return {
            name: "Mojolicious",
            subLanguage: "xml",
            contains: [{
                className: "meta",
                begin: "^__(END|DATA)__$"
            }, {
                begin: "^\\s*%{1,2}={0,2}",
                end: "$",
                subLanguage: "perl"
            }, {
                begin: "<%{1,2}={0,2}",
                end: "={0,1}%>",
                subLanguage: "perl",
                excludeBegin: !0,
                excludeEnd: !0
            }]
        }
    }
    OsA.exports = G34
});
var SsA = E((LJ5, PsA) => {
    function F34(A) {
        let B = {
            className: "number",
            relevance: 0,
            variants: [{
                begin: "[$][a-fA-F0-9]+"
            }, A.NUMBER_MODE]
        };
        return {
            name: "Monkey",
            case_insensitive: !0,
            keywords: {
                keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw import",
                built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI",
                literal: "true false null and or shl shr mod"
            },
            illegal: /\/\*/,
            contains: [A.COMMENT("#rem", "#end"), A.COMMENT("'", "$", {
                relevance: 0
            }), {
                className: "function",
                beginKeywords: "function method",
                end: "[(=:]|$",
                illegal: /\n/,
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, {
                className: "class",
                beginKeywords: "class interface",
                end: "$",
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                className: "built_in",
                begin: "\\b(self|super)\\b"
            }, {
                className: "meta",
                begin: "\\s*#",
                end: "$",
                keywords: {
                    "meta-keyword": "if else elseif endif end then"
                }
            }, {
                className: "meta",
                begin: "^\\s*strict\\b"
            }, {
                beginKeywords: "alias",
                end: "=",
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, A.QUOTE_STRING_MODE, B]
        }
    }
    PsA.exports = F34
});
var ksA = E((MJ5, jsA) => {
    function I34(A) {
        let B = {
                keyword: "if then not for in while do return else elseif break continue switch and or unless when class extends super local import export from using",
                literal: "true false nil",
                built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
            },
            Q = "[A-Za-z$_][0-9A-Za-z$_]*",
            Z = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: B
            },
            D = [A.inherit(A.C_NUMBER_MODE, {
                starts: {
                    end: "(\\s*/)?",
                    relevance: 0
                }
            }), {
                className: "string",
                variants: [{
                    begin: /'/,
                    end: /'/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /"/,
                    end: /"/,
                    contains: [A.BACKSLASH_ESCAPE, Z]
                }]
            }, {
                className: "built_in",
                begin: "@__" + A.IDENT_RE
            }, {
                begin: "@" + A.IDENT_RE
            }, {
                begin: A.IDENT_RE + "\\\\" + A.IDENT_RE
            }];
        Z.contains = D;
        let G = A.inherit(A.TITLE_MODE, {
                begin: "[A-Za-z$_][0-9A-Za-z$_]*"
            }),
            F = "(\\(.*\\)\\s*)?\\B[-=]>",
            I = {
                className: "params",
                begin: "\\([^\\(]",
                returnBegin: !0,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    keywords: B,
                    contains: ["self"].concat(D)
                }]
            };
        return {
            name: "MoonScript",
            aliases: ["moon"],
            keywords: B,
            illegal: /\/\*/,
            contains: D.concat([A.COMMENT("--", "$"), {
                className: "function",
                begin: "^\\s*[A-Za-z$_][0-9A-Za-z$_]*\\s*=\\s*" + F,
                end: "[-=]>",
                returnBegin: !0,
                contains: [G, I]
            }, {
                begin: /[\(,:=]\s*/,
                relevance: 0,
                contains: [{
                    className: "function",
                    begin: F,
                    end: "[-=]>",
                    returnBegin: !0,
                    contains: [I]
                }]
            }, {
                className: "class",
                beginKeywords: "class",
                end: "$",
                illegal: /[:="\[\]]/,
                contains: [{
                    beginKeywords: "extends",
                    endsWithParent: !0,
                    illegal: /[:="\[\]]/,
                    contains: [G]
                }, G]
            }, {
                className: "name",
                begin: "[A-Za-z$_][0-9A-Za-z$_]*:",
                end: ":",
                returnBegin: !0,
                returnEnd: !0,
                relevance: 0
            }])
        }
    }
    jsA.exports = I34
});