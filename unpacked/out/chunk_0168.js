/* chunk:168 bytes:[3649604, 3690376) size:40772 source:unpacked-cli.js */
var nlA = E((HY5, ilA) => {
    function qQ0(A) {
        if (A instanceof Map) A.clear = A.delete = A.set = function() {
            throw new Error("map is read-only")
        };
        else if (A instanceof Set) A.add = A.clear = A.delete = function() {
            throw new Error("set is read-only")
        };
        return Object.freeze(A), Object.getOwnPropertyNames(A).forEach(function(B) {
            var Q = A[B];
            if (typeof Q == "object" && !Object.isFrozen(Q)) qQ0(Q)
        }), A
    }
    var flA = qQ0,
        SQ4 = qQ0;
    flA.default = SQ4;
    class wQ0 {
        constructor(A) {
            if (A.data === void 0) A.data = {};
            this.data = A.data, this.isMatchIgnored = !1
        }
        ignoreMatch() {
            this.isMatchIgnored = !0
        }
    }

    function Gs(A) {
        return A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
    }

    function ly(A, ...B) {
        let Q = Object.create(null);
        for (let Z in A) Q[Z] = A[Z];
        return B.forEach(function(Z) {
            for (let D in Z) Q[D] = Z[D]
        }), Q
    }
    var jQ4 = "</span>",
        klA = (A) => {
            return !!A.kind
        };
    class hlA {
        constructor(A, B) {
            this.buffer = "", this.classPrefix = B.classPrefix, A.walk(this)
        }
        addText(A) {
            this.buffer += Gs(A)
        }
        openNode(A) {
            if (!klA(A)) return;
            let B = A.kind;
            if (!A.sublanguage) B = `${this.classPrefix}${B}`;
            this.span(B)
        }
        closeNode(A) {
            if (!klA(A)) return;
            this.buffer += jQ4
        }
        value() {
            return this.buffer
        }
        span(A) {
            this.buffer += `<span class="${A}">`
        }
    }
    class NQ0 {
        constructor() {
            this.rootNode = {
                children: []
            }, this.stack = [this.rootNode]
        }
        get top() {
            return this.stack[this.stack.length - 1]
        }
        get root() {
            return this.rootNode
        }
        add(A) {
            this.top.children.push(A)
        }
        openNode(A) {
            let B = {
                kind: A,
                children: []
            };
            this.add(B), this.stack.push(B)
        }
        closeNode() {
            if (this.stack.length > 1) return this.stack.pop();
            return
        }
        closeAllNodes() {
            while (this.closeNode());
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4)
        }
        walk(A) {
            return this.constructor._walk(A, this.rootNode)
        }
        static _walk(A, B) {
            if (typeof B === "string") A.addText(B);
            else if (B.children) A.openNode(B), B.children.forEach((Q) => this._walk(A, Q)), A.closeNode(B);
            return A
        }
        static _collapse(A) {
            if (typeof A === "string") return;
            if (!A.children) return;
            if (A.children.every((B) => typeof B === "string")) A.children = [A.children.join("")];
            else A.children.forEach((B) => {
                NQ0._collapse(B)
            })
        }
    }
    class glA extends NQ0 {
        constructor(A) {
            super();
            this.options = A
        }
        addKeyword(A, B) {
            if (A === "") return;
            this.openNode(B), this.addText(A), this.closeNode()
        }
        addText(A) {
            if (A === "") return;
            this.add(A)
        }
        addSublanguage(A, B) {
            let Q = A.root;
            Q.kind = B, Q.sublanguage = !0, this.add(Q)
        }
        toHTML() {
            return new hlA(this, this.options).value()
        }
        finalize() {
            return !0
        }
    }

    function kQ4(A) {
        return new RegExp(A.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")
    }

    function N61(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function yQ4(...A) {
        return A.map((Q) => N61(Q)).join("")
    }

    function _Q4(...A) {
        return "(" + A.map((Q) => N61(Q)).join("|") + ")"
    }

    function xQ4(A) {
        return new RegExp(A.toString() + "|").exec("").length - 1
    }

    function vQ4(A, B) {
        let Q = A && A.exec(B);
        return Q && Q.index === 0
    }
    var bQ4 = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

    function fQ4(A, B = "|") {
        let Q = 0;
        return A.map((Z) => {
            Q += 1;
            let D = Q,
                G = N61(Z),
                F = "";
            while (G.length > 0) {
                let I = bQ4.exec(G);
                if (!I) {
                    F += G;
                    break
                }
                if (F += G.substring(0, I.index), G = G.substring(I.index + I[0].length), I[0][0] === "\\" && I[1]) F += "\\" + String(Number(I[1]) + D);
                else if (F += I[0], I[0] === "(") Q++
            }
            return F
        }).map((Z) => `(${Z})`).join(B)
    }
    var hQ4 = /\b\B/,
        ulA = "[a-zA-Z]\\w*",
        LQ0 = "[a-zA-Z_]\\w*",
        MQ0 = "\\b\\d+(\\.\\d+)?",
        mlA = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
        dlA = "\\b(0b[01]+)",
        gQ4 = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        uQ4 = (A = {}) => {
            let B = /^#![ ]*\//;
            if (A.binary) A.begin = yQ4(B, /.*\b/, A.binary, /\b.*/);
            return ly({
                className: "meta",
                begin: B,
                end: /$/,
                relevance: 0,
                "on:begin": (Q, Z) => {
                    if (Q.index !== 0) Z.ignoreMatch()
                }
            }, A)
        },
        L61 = {
            begin: "\\\\[\\s\\S]",
            relevance: 0
        },
        mQ4 = {
            className: "string",
            begin: "'",
            end: "'",
            illegal: "\\n",
            contains: [L61]
        },
        dQ4 = {
            className: "string",
            begin: '"',
            end: '"',
            illegal: "\\n",
            contains: [L61]
        },
        clA = {
            begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
        },
        u$1 = function(A, B, Q = {}) {
            let Z = ly({
                className: "comment",
                begin: A,
                end: B,
                contains: []
            }, Q);
            return Z.contains.push(clA), Z.contains.push({
                className: "doctag",
                begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
                relevance: 0
            }), Z
        },
        cQ4 = u$1("//", "$"),
        lQ4 = u$1("/\\*", "\\*/"),
        pQ4 = u$1("#", "$"),
        iQ4 = {
            className: "number",
            begin: MQ0,
            relevance: 0
        },
        nQ4 = {
            className: "number",
            begin: mlA,
            relevance: 0
        },
        aQ4 = {
            className: "number",
            begin: dlA,
            relevance: 0
        },
        sQ4 = {
            className: "number",
            begin: MQ0 + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
        },
        rQ4 = {
            begin: /(?=\/[^/\n]*\/)/,
            contains: [{
                className: "regexp",
                begin: /\//,
                end: /\/[gimuy]*/,
                illegal: /\n/,
                contains: [L61, {
                    begin: /\[/,
                    end: /\]/,
                    relevance: 0,
                    contains: [L61]
                }]
            }]
        },
        oQ4 = {
            className: "title",
            begin: ulA,
            relevance: 0
        },
        tQ4 = {
            className: "title",
            begin: LQ0,
            relevance: 0
        },
        eQ4 = {
            begin: "\\.\\s*" + LQ0,
            relevance: 0
        },
        A44 = function(A) {
            return Object.assign(A, {
                "on:begin": (B, Q) => {
                    Q.data._beginMatch = B[1]
                },
                "on:end": (B, Q) => {
                    if (Q.data._beginMatch !== B[1]) Q.ignoreMatch()
                }
            })
        },
        g$1 = Object.freeze({
            __proto__: null,
            MATCH_NOTHING_RE: hQ4,
            IDENT_RE: ulA,
            UNDERSCORE_IDENT_RE: LQ0,
            NUMBER_RE: MQ0,
            C_NUMBER_RE: mlA,
            BINARY_NUMBER_RE: dlA,
            RE_STARTERS_RE: gQ4,
            SHEBANG: uQ4,
            BACKSLASH_ESCAPE: L61,
            APOS_STRING_MODE: mQ4,
            QUOTE_STRING_MODE: dQ4,
            PHRASAL_WORDS_MODE: clA,
            COMMENT: u$1,
            C_LINE_COMMENT_MODE: cQ4,
            C_BLOCK_COMMENT_MODE: lQ4,
            HASH_COMMENT_MODE: pQ4,
            NUMBER_MODE: iQ4,
            C_NUMBER_MODE: nQ4,
            BINARY_NUMBER_MODE: aQ4,
            CSS_NUMBER_MODE: sQ4,
            REGEXP_MODE: rQ4,
            TITLE_MODE: oQ4,
            UNDERSCORE_TITLE_MODE: tQ4,
            METHOD_GUARD: eQ4,
            END_SAME_AS_BEGIN: A44
        });

    function B44(A, B) {
        if (A.input[A.index - 1] === ".") B.ignoreMatch()
    }

    function Q44(A, B) {
        if (!B) return;
        if (!A.beginKeywords) return;
        if (A.begin = "\\b(" + A.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", A.__beforeBegin = B44, A.keywords = A.keywords || A.beginKeywords, delete A.beginKeywords, A.relevance === void 0) A.relevance = 0
    }

    function Z44(A, B) {
        if (!Array.isArray(A.illegal)) return;
        A.illegal = _Q4(...A.illegal)
    }

    function D44(A, B) {
        if (!A.match) return;
        if (A.begin || A.end) throw new Error("begin & end are not supported with match");
        A.begin = A.match, delete A.match
    }

    function G44(A, B) {
        if (A.relevance === void 0) A.relevance = 1
    }
    var F44 = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"],
        I44 = "keyword";

    function llA(A, B, Q = I44) {
        let Z = {};
        if (typeof A === "string") D(Q, A.split(" "));
        else if (Array.isArray(A)) D(Q, A);
        else Object.keys(A).forEach(function(G) {
            Object.assign(Z, llA(A[G], B, G))
        });
        return Z;

        function D(G, F) {
            if (B) F = F.map((I) => I.toLowerCase());
            F.forEach(function(I) {
                let Y = I.split("|");
                Z[Y[0]] = [G, Y44(Y[0], Y[1])]
            })
        }
    }

    function Y44(A, B) {
        if (B) return Number(B);
        return W44(A) ? 0 : 1
    }

    function W44(A) {
        return F44.includes(A.toLowerCase())
    }

    function J44(A, {
        plugins: B
    }) {
        function Q(I, Y) {
            return new RegExp(N61(I), "m" + (A.case_insensitive ? "i" : "") + (Y ? "g" : ""))
        }
        class Z {
            constructor() {
                this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0
            }
            addRule(I, Y) {
                Y.position = this.position++, this.matchIndexes[this.matchAt] = Y, this.regexes.push([Y, I]), this.matchAt += xQ4(I) + 1
            }
            compile() {
                if (this.regexes.length === 0) this.exec = () => null;
                let I = this.regexes.map((Y) => Y[1]);
                this.matcherRe = Q(fQ4(I), !0), this.lastIndex = 0
            }
            exec(I) {
                this.matcherRe.lastIndex = this.lastIndex;
                let Y = this.matcherRe.exec(I);
                if (!Y) return null;
                let W = Y.findIndex((X, V) => V > 0 && X !== void 0),
                    J = this.matchIndexes[W];
                return Y.splice(0, W), Object.assign(Y, J)
            }
        }
        class D {
            constructor() {
                this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0
            }
            getMatcher(I) {
                if (this.multiRegexes[I]) return this.multiRegexes[I];
                let Y = new Z;
                return this.rules.slice(I).forEach(([W, J]) => Y.addRule(W, J)), Y.compile(), this.multiRegexes[I] = Y, Y
            }
            resumingScanAtSamePosition() {
                return this.regexIndex !== 0
            }
            considerAll() {
                this.regexIndex = 0
            }
            addRule(I, Y) {
                if (this.rules.push([I, Y]), Y.type === "begin") this.count++
            }
            exec(I) {
                let Y = this.getMatcher(this.regexIndex);
                Y.lastIndex = this.lastIndex;
                let W = Y.exec(I);
                if (this.resumingScanAtSamePosition())
                    if (W && W.index === this.lastIndex);
                    else {
                        let J = this.getMatcher(0);
                        J.lastIndex = this.lastIndex + 1, W = J.exec(I)
                    } if (W) {
                    if (this.regexIndex += W.position + 1, this.regexIndex === this.count) this.considerAll()
                }
                return W
            }
        }

        function G(I) {
            let Y = new D;
            if (I.contains.forEach((W) => Y.addRule(W.begin, {
                    rule: W,
                    type: "begin"
                })), I.terminatorEnd) Y.addRule(I.terminatorEnd, {
                type: "end"
            });
            if (I.illegal) Y.addRule(I.illegal, {
                type: "illegal"
            });
            return Y
        }

        function F(I, Y) {
            let W = I;
            if (I.isCompiled) return W;
            [D44].forEach((X) => X(I, Y)), A.compilerExtensions.forEach((X) => X(I, Y)), I.__beforeBegin = null, [Q44, Z44, G44].forEach((X) => X(I, Y)), I.isCompiled = !0;
            let J = null;
            if (typeof I.keywords === "object") J = I.keywords.$pattern, delete I.keywords.$pattern;
            if (I.keywords) I.keywords = llA(I.keywords, A.case_insensitive);
            if (I.lexemes && J) throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
            if (J = J || I.lexemes || /\w+/, W.keywordPatternRe = Q(J, !0), Y) {
                if (!I.begin) I.begin = /\B|\b/;
                if (W.beginRe = Q(I.begin), I.endSameAsBegin) I.end = I.begin;
                if (!I.end && !I.endsWithParent) I.end = /\B|\b/;
                if (I.end) W.endRe = Q(I.end);
                if (W.terminatorEnd = N61(I.end) || "", I.endsWithParent && Y.terminatorEnd) W.terminatorEnd += (I.end ? "|" : "") + Y.terminatorEnd
            }
            if (I.illegal) W.illegalRe = Q(I.illegal);
            if (!I.contains) I.contains = [];
            if (I.contains = [].concat(...I.contains.map(function(X) {
                    return X44(X === "self" ? I : X)
                })), I.contains.forEach(function(X) {
                    F(X, W)
                }), I.starts) F(I.starts, Y);
            return W.matcher = G(W), W
        }
        if (!A.compilerExtensions) A.compilerExtensions = [];
        if (A.contains && A.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        return A.classNameAliases = ly(A.classNameAliases || {}), F(A)
    }

    function plA(A) {
        if (!A) return !1;
        return A.endsWithParent || plA(A.starts)
    }

    function X44(A) {
        if (A.variants && !A.cachedVariants) A.cachedVariants = A.variants.map(function(B) {
            return ly(A, {
                variants: null
            }, B)
        });
        if (A.cachedVariants) return A.cachedVariants;
        if (plA(A)) return ly(A, {
            starts: A.starts ? ly(A.starts) : null
        });
        if (Object.isFrozen(A)) return ly(A);
        return A
    }
    var V44 = "10.7.3";

    function C44(A) {
        return Boolean(A || A === "")
    }

    function K44(A) {
        let B = {
            props: ["language", "code", "autodetect"],
            data: function() {
                return {
                    detectedLanguage: "",
                    unknownLanguage: !1
                }
            },
            computed: {
                className() {
                    if (this.unknownLanguage) return "";
                    return "hljs " + this.detectedLanguage
                },
                highlighted() {
                    if (!this.autoDetect && !A.getLanguage(this.language)) return console.warn(`The language "${this.language}" you specified could not be found.`), this.unknownLanguage = !0, Gs(this.code);
                    let Z = {};
                    if (this.autoDetect) Z = A.highlightAuto(this.code), this.detectedLanguage = Z.language;
                    else Z = A.highlight(this.language, this.code, this.ignoreIllegals), this.detectedLanguage = this.language;
                    return Z.value
                },
                autoDetect() {
                    return !this.language || C44(this.autodetect)
                },
                ignoreIllegals() {
                    return !0
                }
            },
            render(Z) {
                return Z("pre", {}, [Z("code", {
                    class: this.className,
                    domProps: {
                        innerHTML: this.highlighted
                    }
                })])
            }
        };
        return {
            Component: B,
            VuePlugin: {
                install(Z) {
                    Z.component("highlightjs", B)
                }
            }
        }
    }
    var H44 = {
        "after:highlightElement": ({
            el: A,
            result: B,
            text: Q
        }) => {
            let Z = ylA(A);
            if (!Z.length) return;
            let D = document.createElement("div");
            D.innerHTML = B.value, B.value = z44(Z, ylA(D), Q)
        }
    };

    function $Q0(A) {
        return A.nodeName.toLowerCase()
    }

    function ylA(A) {
        let B = [];
        return function Q(Z, D) {
            for (let G = Z.firstChild; G; G = G.nextSibling)
                if (G.nodeType === 3) D += G.nodeValue.length;
                else if (G.nodeType === 1) {
                if (B.push({
                        event: "start",
                        offset: D,
                        node: G
                    }), D = Q(G, D), !$Q0(G).match(/br|hr|img|input/)) B.push({
                    event: "stop",
                    offset: D,
                    node: G
                })
            }
            return D
        }(A, 0), B
    }

    function z44(A, B, Q) {
        let Z = 0,
            D = "",
            G = [];

        function F() {
            if (!A.length || !B.length) return A.length ? A : B;
            if (A[0].offset !== B[0].offset) return A[0].offset < B[0].offset ? A : B;
            return B[0].event === "start" ? A : B
        }

        function I(J) {
            function X(V) {
                return " " + V.nodeName + '="' + Gs(V.value) + '"'
            }
            D += "<" + $Q0(J) + [].map.call(J.attributes, X).join("") + ">"
        }

        function Y(J) {
            D += "</" + $Q0(J) + ">"
        }

        function W(J) {
            (J.event === "start" ? I : Y)(J.node)
        }
        while (A.length || B.length) {
            let J = F();
            if (D += Gs(Q.substring(Z, J[0].offset)), Z = J[0].offset, J === A) {
                G.reverse().forEach(Y);
                do W(J.splice(0, 1)[0]), J = F(); while (J === A && J.length && J[0].offset === Z);
                G.reverse().forEach(I)
            } else {
                if (J[0].event === "start") G.push(J[0].node);
                else G.pop();
                W(J.splice(0, 1)[0])
            }
        }
        return D + Gs(Q.substr(Z))
    }
    var _lA = {},
        EQ0 = (A) => {
            console.error(A)
        },
        xlA = (A, ...B) => {
            console.log(`WARN: ${A}`, ...B)
        },
        bz = (A, B) => {
            if (_lA[`${A}/${B}`]) return;
            console.log(`Deprecated as of ${A}. ${B}`), _lA[`${A}/${B}`] = !0
        },
        UQ0 = Gs,
        vlA = ly,
        blA = Symbol("nomatch"),
        E44 = function(A) {
            let B = Object.create(null),
                Q = Object.create(null),
                Z = [],
                D = !0,
                G = /(^(<[^>]+>|\t|)+|\n)/gm,
                F = "Could not find the language '{}', did you forget to load/include a language module?",
                I = {
                    disableAutodetect: !0,
                    name: "Plain text",
                    contains: []
                },
                Y = {
                    noHighlightRe: /^(no-?highlight)$/i,
                    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
                    classPrefix: "hljs-",
                    tabReplace: null,
                    useBR: !1,
                    languages: null,
                    __emitter: glA
                };

            function W(Q1) {
                return Y.noHighlightRe.test(Q1)
            }

            function J(Q1) {
                let k1 = Q1.className + " ";
                k1 += Q1.parentNode ? Q1.parentNode.className : "";
                let H1 = Y.languageDetectRe.exec(k1);
                if (H1) {
                    let A0 = t(H1[1]);
                    if (!A0) xlA(F.replace("{}", H1[1])), xlA("Falling back to no-highlight mode for this block.", Q1);
                    return A0 ? H1[1] : "no-highlight"
                }
                return k1.split(/\s+/).find((A0) => W(A0) || t(A0))
            }

            function X(Q1, k1, H1, A0) {
                let V0 = "",
                    o1 = "";
                if (typeof k1 === "object") V0 = Q1, H1 = k1.ignoreIllegals, o1 = k1.language, A0 = void 0;
                else bz("10.7.0", "highlight(lang, code, ...args) has been deprecated."), bz("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), o1 = Q1, V0 = k1;
                let e = {
                    code: V0,
                    language: o1
                };
                W0("before:highlight", e);
                let Z1 = e.result ? e.result : V(e.language, e.code, H1, A0);
                return Z1.code = e.code, W0("after:highlight", Z1), Z1
            }

            function V(Q1, k1, H1, A0) {
                function V0(kA, G2) {
                    let T2 = K0.case_insensitive ? G2[0].toLowerCase() : G2[0];
                    return Object.prototype.hasOwnProperty.call(kA.keywords, T2) && kA.keywords[T2]
                }

                function o1() {
                    if (!u0.keywords) {
                        dA.addText(J2);
                        return
                    }
                    let kA = 0;
                    u0.keywordPatternRe.lastIndex = 0;
                    let G2 = u0.keywordPatternRe.exec(J2),
                        T2 = "";
                    while (G2) {
                        T2 += J2.substring(kA, G2.index);
                        let pA = V0(u0, G2);
                        if (pA) {
                            let [bA, r2] = pA;
                            if (dA.addText(T2), T2 = "", s2 += r2, bA.startsWith("_")) T2 += G2[0];
                            else {
                                let xB = K0.classNameAliases[bA] || bA;
                                dA.addKeyword(G2[0], xB)
                            }
                        } else T2 += G2[0];
                        kA = u0.keywordPatternRe.lastIndex, G2 = u0.keywordPatternRe.exec(J2)
                    }
                    T2 += J2.substr(kA), dA.addText(T2)
                }

                function e() {
                    if (J2 === "") return;
                    let kA = null;
                    if (typeof u0.subLanguage === "string") {
                        if (!B[u0.subLanguage]) {
                            dA.addText(J2);
                            return
                        }
                        kA = V(u0.subLanguage, J2, !0, TA[u0.subLanguage]), TA[u0.subLanguage] = kA.top
                    } else kA = K(J2, u0.subLanguage.length ? u0.subLanguage : null);
                    if (u0.relevance > 0) s2 += kA.relevance;
                    dA.addSublanguage(kA.emitter, kA.language)
                }

                function Z1() {
                    if (u0.subLanguage != null) e();
                    else o1();
                    J2 = ""
                }

                function I1(kA) {
                    if (kA.className) dA.openNode(K0.classNameAliases[kA.className] || kA.className);
                    return u0 = Object.create(kA, {
                        parent: {
                            value: u0
                        }
                    }), u0
                }

                function U1(kA, G2, T2) {
                    let pA = vQ4(kA.endRe, T2);
                    if (pA) {
                        if (kA["on:end"]) {
                            let bA = new wQ0(kA);
                            if (kA["on:end"](G2, bA), bA.isMatchIgnored) pA = !1
                        }
                        if (pA) {
                            while (kA.endsParent && kA.parent) kA = kA.parent;
                            return kA
                        }
                    }
                    if (kA.endsWithParent) return U1(kA.parent, G2, T2)
                }

                function O1(kA) {
                    if (u0.matcher.regexIndex === 0) return J2 += kA[0], 1;
                    else return m6 = !0, 0
                }

                function B1(kA) {
                    let G2 = kA[0],
                        T2 = kA.rule,
                        pA = new wQ0(T2),
                        bA = [T2.__beforeBegin, T2["on:begin"]];
                    for (let r2 of bA) {
                        if (!r2) continue;
                        if (r2(kA, pA), pA.isMatchIgnored) return O1(G2)
                    }
                    if (T2 && T2.endSameAsBegin) T2.endRe = kQ4(G2);
                    if (T2.skip) J2 += G2;
                    else {
                        if (T2.excludeBegin) J2 += G2;
                        if (Z1(), !T2.returnBegin && !T2.excludeBegin) J2 = G2
                    }
                    return I1(T2), T2.returnBegin ? 0 : G2.length
                }

                function x1(kA) {
                    let G2 = kA[0],
                        T2 = k1.substr(kA.index),
                        pA = U1(u0, kA, T2);
                    if (!pA) return blA;
                    let bA = u0;
                    if (bA.skip) J2 += G2;
                    else {
                        if (!(bA.returnEnd || bA.excludeEnd)) J2 += G2;
                        if (Z1(), bA.excludeEnd) J2 = G2
                    }
                    do {
                        if (u0.className) dA.closeNode();
                        if (!u0.skip && !u0.subLanguage) s2 += u0.relevance;
                        u0 = u0.parent
                    } while (u0 !== pA.parent);
                    if (pA.starts) {
                        if (pA.endSameAsBegin) pA.starts.endRe = pA.endRe;
                        I1(pA.starts)
                    }
                    return bA.returnEnd ? 0 : G2.length
                }

                function c1() {
                    let kA = [];
                    for (let G2 = u0; G2 !== K0; G2 = G2.parent)
                        if (G2.className) kA.unshift(G2.className);
                    kA.forEach((G2) => dA.openNode(G2))
                }
                let a1 = {};

                function C0(kA, G2) {
                    let T2 = G2 && G2[0];
                    if (J2 += kA, T2 == null) return Z1(), 0;
                    if (a1.type === "begin" && G2.type === "end" && a1.index === G2.index && T2 === "") {
                        if (J2 += k1.slice(G2.index, G2.index + 1), !D) {
                            let pA = new Error("0 width match regex");
                            throw pA.languageName = Q1, pA.badRule = a1.rule, pA
                        }
                        return 1
                    }
                    if (a1 = G2, G2.type === "begin") return B1(G2);
                    else if (G2.type === "illegal" && !H1) {
                        let pA = new Error('Illegal lexeme "' + T2 + '" for mode "' + (u0.className || "<unnamed>") + '"');
                        throw pA.mode = u0, pA
                    } else if (G2.type === "end") {
                        let pA = x1(G2);
                        if (pA !== blA) return pA
                    }
                    if (G2.type === "illegal" && T2 === "") return 1;
                    if (U9 > 1e5 && U9 > G2.index * 3) throw new Error("potential infinite loop, way more iterations than matches");
                    return J2 += T2, T2.length
                }
                let K0 = t(Q1);
                if (!K0) throw EQ0(F.replace("{}", Q1)), new Error('Unknown language: "' + Q1 + '"');
                let R0 = J44(K0, {
                        plugins: Z
                    }),
                    wA = "",
                    u0 = A0 || R0,
                    TA = {},
                    dA = new Y.__emitter(Y);
                c1();
                let J2 = "",
                    s2 = 0,
                    N2 = 0,
                    U9 = 0,
                    m6 = !1;
                try {
                    u0.matcher.considerAll();
                    for (;;) {
                        if (U9++, m6) m6 = !1;
                        else u0.matcher.considerAll();
                        u0.matcher.lastIndex = N2;
                        let kA = u0.matcher.exec(k1);
                        if (!kA) break;
                        let G2 = k1.substring(N2, kA.index),
                            T2 = C0(G2, kA);
                        N2 = kA.index + T2
                    }
                    return C0(k1.substr(N2)), dA.closeAllNodes(), dA.finalize(), wA = dA.toHTML(), {
                        relevance: Math.floor(s2),
                        value: wA,
                        language: Q1,
                        illegal: !1,
                        emitter: dA,
                        top: u0
                    }
                } catch (kA) {
                    if (kA.message && kA.message.includes("Illegal")) return {
                        illegal: !0,
                        illegalBy: {
                            msg: kA.message,
                            context: k1.slice(N2 - 100, N2 + 100),
                            mode: kA.mode
                        },
                        sofar: wA,
                        relevance: 0,
                        value: UQ0(k1),
                        emitter: dA
                    };
                    else if (D) return {
                        illegal: !1,
                        relevance: 0,
                        value: UQ0(k1),
                        emitter: dA,
                        language: Q1,
                        top: u0,
                        errorRaised: kA
                    };
                    else throw kA
                }
            }

            function C(Q1) {
                let k1 = {
                    relevance: 0,
                    emitter: new Y.__emitter(Y),
                    value: UQ0(Q1),
                    illegal: !1,
                    top: I
                };
                return k1.emitter.addText(Q1), k1
            }

            function K(Q1, k1) {
                k1 = k1 || Y.languages || Object.keys(B);
                let H1 = C(Q1),
                    A0 = k1.filter(t).filter(C1).map((I1) => V(I1, Q1, !1));
                A0.unshift(H1);
                let V0 = A0.sort((I1, U1) => {
                        if (I1.relevance !== U1.relevance) return U1.relevance - I1.relevance;
                        if (I1.language && U1.language) {
                            if (t(I1.language).supersetOf === U1.language) return 1;
                            else if (t(U1.language).supersetOf === I1.language) return -1
                        }
                        return 0
                    }),
                    [o1, e] = V0,
                    Z1 = o1;
                return Z1.second_best = e, Z1
            }

            function H(Q1) {
                if (!(Y.tabReplace || Y.useBR)) return Q1;
                return Q1.replace(G, (k1) => {
                    if (k1 === `
`) return Y.useBR ? "<br>" : k1;
                    else if (Y.tabReplace) return k1.replace(/\t/g, Y.tabReplace);
                    return k1
                })
            }

            function z(Q1, k1, H1) {
                let A0 = k1 ? Q[k1] : H1;
                if (Q1.classList.add("hljs"), A0) Q1.classList.add(A0)
            }
            let $ = {
                    "before:highlightElement": ({
                        el: Q1
                    }) => {
                        if (Y.useBR) Q1.innerHTML = Q1.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, `
`)
                    },
                    "after:highlightElement": ({
                        result: Q1
                    }) => {
                        if (Y.useBR) Q1.value = Q1.value.replace(/\n/g, "<br>")
                    }
                },
                L = /^(<[^>]+>|\t)+/gm,
                N = {
                    "after:highlightElement": ({
                        result: Q1
                    }) => {
                        if (Y.tabReplace) Q1.value = Q1.value.replace(L, (k1) => k1.replace(/\t/g, Y.tabReplace))
                    }
                };

            function R(Q1) {
                let k1 = null,
                    H1 = J(Q1);
                if (W(H1)) return;
                W0("before:highlightElement", {
                    el: Q1,
                    language: H1
                }), k1 = Q1;
                let A0 = k1.textContent,
                    V0 = H1 ? X(A0, {
                        language: H1,
                        ignoreIllegals: !0
                    }) : K(A0);
                if (W0("after:highlightElement", {
                        el: Q1,
                        result: V0,
                        text: A0
                    }), Q1.innerHTML = V0.value, z(Q1, H1, V0.language), Q1.result = {
                        language: V0.language,
                        re: V0.relevance,
                        relavance: V0.relevance
                    }, V0.second_best) Q1.second_best = {
                    language: V0.second_best.language,
                    re: V0.second_best.relevance,
                    relavance: V0.second_best.relevance
                }
            }

            function O(Q1) {
                if (Q1.useBR) bz("10.3.0", "'useBR' will be removed entirely in v11.0"), bz("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
                Y = vlA(Y, Q1)
            }
            let P = () => {
                if (P.called) return;
                P.called = !0, bz("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead."), document.querySelectorAll("pre code").forEach(R)
            };

            function j() {
                bz("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."), f = !0
            }
            let f = !1;

            function k() {
                if (document.readyState === "loading") {
                    f = !0;
                    return
                }
                document.querySelectorAll("pre code").forEach(R)
            }

            function c() {
                if (f) k()
            }
            if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("DOMContentLoaded", c, !1);

            function u(Q1, k1) {
                let H1 = null;
                try {
                    H1 = k1(A)
                } catch (A0) {
                    if (EQ0("Language definition for '{}' could not be registered.".replace("{}", Q1)), !D) throw A0;
                    else EQ0(A0);
                    H1 = I
                }
                if (!H1.name) H1.name = Q1;
                if (B[Q1] = H1, H1.rawDefinition = k1.bind(null, A), H1.aliases) E1(H1.aliases, {
                    languageName: Q1
                })
            }

            function a(Q1) {
                delete B[Q1];
                for (let k1 of Object.keys(Q))
                    if (Q[k1] === Q1) delete Q[k1]
            }

            function l() {
                return Object.keys(B)
            }

            function y(Q1) {
                bz("10.4.0", "requireLanguage will be removed entirely in v11."), bz("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
                let k1 = t(Q1);
                if (k1) return k1;
                throw new Error("The '{}' language is required, but not loaded.".replace("{}", Q1))
            }

            function t(Q1) {
                return Q1 = (Q1 || "").toLowerCase(), B[Q1] || B[Q[Q1]]
            }

            function E1(Q1, {
                languageName: k1
            }) {
                if (typeof Q1 === "string") Q1 = [Q1];
                Q1.forEach((H1) => {
                    Q[H1.toLowerCase()] = k1
                })
            }

            function C1(Q1) {
                let k1 = t(Q1);
                return k1 && !k1.disableAutodetect
            }

            function _1(Q1) {
                if (Q1["before:highlightBlock"] && !Q1["before:highlightElement"]) Q1["before:highlightElement"] = (k1) => {
                    Q1["before:highlightBlock"](Object.assign({
                        block: k1.el
                    }, k1))
                };
                if (Q1["after:highlightBlock"] && !Q1["after:highlightElement"]) Q1["after:highlightElement"] = (k1) => {
                    Q1["after:highlightBlock"](Object.assign({
                        block: k1.el
                    }, k1))
                }
            }

            function F0(Q1) {
                _1(Q1), Z.push(Q1)
            }

            function W0(Q1, k1) {
                let H1 = Q1;
                Z.forEach(function(A0) {
                    if (A0[H1]) A0[H1](k1)
                })
            }

            function g1(Q1) {
                return bz("10.2.0", "fixMarkup will be removed entirely in v11.0"), bz("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534"), H(Q1)
            }

            function w1(Q1) {
                return bz("10.7.0", "highlightBlock will be removed entirely in v12.0"), bz("10.7.0", "Please use highlightElement now."), R(Q1)
            }
            Object.assign(A, {
                highlight: X,
                highlightAuto: K,
                highlightAll: k,
                fixMarkup: g1,
                highlightElement: R,
                highlightBlock: w1,
                configure: O,
                initHighlighting: P,
                initHighlightingOnLoad: j,
                registerLanguage: u,
                unregisterLanguage: a,
                listLanguages: l,
                getLanguage: t,
                registerAliases: E1,
                requireLanguage: y,
                autoDetection: C1,
                inherit: vlA,
                addPlugin: F0,
                vuePlugin: K44(A).VuePlugin
            }), A.debugMode = function() {
                D = !1
            }, A.safeMode = function() {
                D = !0
            }, A.versionString = V44;
            for (let Q1 in g$1)
                if (typeof g$1[Q1] === "object") flA(g$1[Q1]);
            return Object.assign(A, g$1), A.addPlugin($), A.addPlugin(H44), A.addPlugin(N), A
        },
        U44 = E44({});
    ilA.exports = U44
});