/* chunk:204 bytes:[4524761, 4541838) size:17077 source:unpacked-cli.js */
var GrA = E((hJ5, DrA) => {
    function q34(A) {
        let B = {
                className: "variable",
                begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*" + "(?![A-Za-z0-9])(?![$])"
            },
            Q = {
                className: "meta",
                variants: [{
                    begin: /<\?php/,
                    relevance: 10
                }, {
                    begin: /<\?[=]?/
                }, {
                    begin: /\?>/
                }]
            },
            Z = {
                className: "subst",
                variants: [{
                    begin: /\$\w+/
                }, {
                    begin: /\{\$/,
                    end: /\}/
                }]
            },
            D = A.inherit(A.APOS_STRING_MODE, {
                illegal: null
            }),
            G = A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null,
                contains: A.QUOTE_STRING_MODE.contains.concat(Z)
            }),
            F = A.END_SAME_AS_BEGIN({
                begin: /<<<[ \t]*(\w+)\n/,
                end: /[ \t]*(\w+)\b/,
                contains: A.QUOTE_STRING_MODE.contains.concat(Z)
            }),
            I = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE, Q],
                variants: [A.inherit(D, {
                    begin: "b'",
                    end: "'"
                }), A.inherit(G, {
                    begin: 'b"',
                    end: '"'
                }), G, D, F]
            },
            Y = {
                className: "number",
                variants: [{
                    begin: "\\b0b[01]+(?:_[01]+)*\\b"
                }, {
                    begin: "\\b0o[0-7]+(?:_[0-7]+)*\\b"
                }, {
                    begin: "\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b"
                }, {
                    begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?"
                }],
                relevance: 0
            },
            W = {
                keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
                literal: "false null true",
                built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
            };
        return {
            aliases: ["php3", "php4", "php5", "php6", "php7", "php8"],
            case_insensitive: !0,
            keywords: W,
            contains: [A.HASH_COMMENT_MODE, A.COMMENT("//", "$", {
                contains: [Q]
            }), A.COMMENT("/\\*", "\\*/", {
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), A.COMMENT("__halt_compiler.+?;", !1, {
                endsWithParent: !0,
                keywords: "__halt_compiler"
            }), Q, {
                className: "keyword",
                begin: /\$this\b/
            }, B, {
                begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                className: "function",
                relevance: 0,
                beginKeywords: "fn function",
                end: /[;{]/,
                excludeEnd: !0,
                illegal: "[$%\\[]",
                contains: [{
                    beginKeywords: "use"
                }, A.UNDERSCORE_TITLE_MODE, {
                    begin: "=>",
                    endsParent: !0
                }, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: W,
                    contains: ["self", B, A.C_BLOCK_COMMENT_MODE, I, Y]
                }]
            }, {
                className: "class",
                variants: [{
                    beginKeywords: "enum",
                    illegal: /[($"]/
                }, {
                    beginKeywords: "class interface trait",
                    illegal: /[:($"]/
                }],
                relevance: 0,
                end: /\{/,
                excludeEnd: !0,
                contains: [{
                    beginKeywords: "extends implements"
                }, A.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "namespace",
                relevance: 0,
                end: ";",
                illegal: /[.']/,
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "use",
                relevance: 0,
                end: ";",
                contains: [A.UNDERSCORE_TITLE_MODE]
            }, I, Y]
        }
    }
    DrA.exports = q34
});
var IrA = E((gJ5, FrA) => {
    function N34(A) {
        return {
            name: "PHP template",
            subLanguage: "xml",
            contains: [{
                begin: /<\?(php|=)?/,
                end: /\?>/,
                subLanguage: "php",
                contains: [{
                    begin: "/\\*",
                    end: "\\*/",
                    skip: !0
                }, {
                    begin: 'b"',
                    end: '"',
                    skip: !0
                }, {
                    begin: "b'",
                    end: "'",
                    skip: !0
                }, A.inherit(A.APOS_STRING_MODE, {
                    illegal: null,
                    className: null,
                    contains: null,
                    skip: !0
                }), A.inherit(A.QUOTE_STRING_MODE, {
                    illegal: null,
                    className: null,
                    contains: null,
                    skip: !0
                })]
            }]
        }
    }
    FrA.exports = N34
});
var WrA = E((uJ5, YrA) => {
    function L34(A) {
        return {
            name: "Plain text",
            aliases: ["text", "txt"],
            disableAutodetect: !0
        }
    }
    YrA.exports = L34
});
var XrA = E((mJ5, JrA) => {
    function M34(A) {
        let B = {
                keyword: "actor addressof and as be break class compile_error compile_intrinsic consume continue delegate digestof do else elseif embed end error for fun if ifdef in interface is isnt lambda let match new not object or primitive recover repeat return struct then trait try type until use var where while with xor",
                meta: "iso val tag trn box ref",
                literal: "this false true"
            },
            Q = {
                className: "string",
                begin: '"""',
                end: '"""',
                relevance: 10
            },
            Z = {
                className: "string",
                begin: '"',
                end: '"',
                contains: [A.BACKSLASH_ESCAPE]
            },
            D = {
                className: "string",
                begin: "'",
                end: "'",
                contains: [A.BACKSLASH_ESCAPE],
                relevance: 0
            },
            G = {
                className: "type",
                begin: "\\b_?[A-Z][\\w]*",
                relevance: 0
            },
            F = {
                begin: A.IDENT_RE + "'",
                relevance: 0
            };
        return {
            name: "Pony",
            keywords: B,
            contains: [G, Q, Z, D, F, {
                className: "number",
                begin: "(-?)(\\b0[xX][a-fA-F0-9]+|\\b0[bB][01]+|(\\b\\d+(_\\d+)?(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
                relevance: 0
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE]
        }
    }
    JrA.exports = M34
});
var CrA = E((dJ5, VrA) => {
    function R34(A) {
        let B = ["string", "char", "byte", "int", "long", "bool", "decimal", "single", "double", "DateTime", "xml", "array", "hashtable", "void"],
            Q = "Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|Unprotect|Use|ForEach|Sort|Tee|Where",
            Z = "-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|-split|-wildcard|-xor",
            D = {
                $pattern: /-?[A-z\.\-]+\b/,
                keyword: "if else foreach return do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch hidden static parameter",
                built_in: "ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write"
            },
            G = /\w[\w\d]*((-)[\w\d]+)*/,
            F = {
                begin: "`[\\s\\S]",
                relevance: 0
            },
            I = {
                className: "variable",
                variants: [{
                    begin: /\$\B/
                }, {
                    className: "keyword",
                    begin: /\$this/
                }, {
                    begin: /\$[\w\d][\w\d_:]*/
                }]
            },
            Y = {
                className: "literal",
                begin: /\$(null|true|false)\b/
            },
            W = {
                className: "string",
                variants: [{
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /@"/,
                    end: /^"@/
                }],
                contains: [F, I, {
                    className: "variable",
                    begin: /\$[A-z]/,
                    end: /[^A-z]/
                }]
            },
            J = {
                className: "string",
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /@'/,
                    end: /^'@/
                }]
            },
            X = {
                className: "doctag",
                variants: [{
                    begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
                }, {
                    begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
                }]
            },
            V = A.inherit(A.COMMENT(null, null), {
                variants: [{
                    begin: /#/,
                    end: /$/
                }, {
                    begin: /<#/,
                    end: /#>/
                }],
                contains: [X]
            }),
            C = {
                className: "built_in",
                variants: [{
                    begin: "(".concat(Q, ")+(-)[\\w\\d]+")
                }]
            },
            K = {
                className: "class",
                beginKeywords: "class enum",
                end: /\s*[{]/,
                excludeEnd: !0,
                relevance: 0,
                contains: [A.TITLE_MODE]
            },
            H = {
                className: "function",
                begin: /function\s+/,
                end: /\s*\{|$/,
                excludeEnd: !0,
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    begin: "function",
                    relevance: 0,
                    className: "keyword"
                }, {
                    className: "title",
                    begin: G,
                    relevance: 0
                }, {
                    begin: /\(/,
                    end: /\)/,
                    className: "params",
                    relevance: 0,
                    contains: [I]
                }]
            },
            z = {
                begin: /using\s/,
                end: /$/,
                returnBegin: !0,
                contains: [W, J, {
                    className: "keyword",
                    begin: /(using|assembly|command|module|namespace|type)/
                }]
            },
            $ = {
                variants: [{
                    className: "operator",
                    begin: "(".concat(Z, ")\\b")
                }, {
                    className: "literal",
                    begin: /(-)[\w\d]+/,
                    relevance: 0
                }]
            },
            L = {
                className: "selector-tag",
                begin: /@\B/,
                relevance: 0
            },
            N = {
                className: "function",
                begin: /\[.*\]\s*[\w]+[ ]??\(/,
                end: /$/,
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    className: "keyword",
                    begin: "(".concat(D.keyword.toString().replace(/\s/g, "|"), ")\\b"),
                    endsParent: !0,
                    relevance: 0
                }, A.inherit(A.TITLE_MODE, {
                    endsParent: !0
                })]
            },
            R = [N, V, F, A.NUMBER_MODE, W, J, C, I, Y, L],
            O = {
                begin: /\[/,
                end: /\]/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
                contains: [].concat("self", R, {
                    begin: "(" + B.join("|") + ")",
                    className: "built_in",
                    relevance: 0
                }, {
                    className: "type",
                    begin: /[\.\w\d]+/,
                    relevance: 0
                })
            };
        return N.contains.unshift(O), {
            name: "PowerShell",
            aliases: ["ps", "ps1"],
            case_insensitive: !0,
            keywords: D,
            contains: R.concat(K, H, z, $, O)
        }
    }
    VrA.exports = R34
});