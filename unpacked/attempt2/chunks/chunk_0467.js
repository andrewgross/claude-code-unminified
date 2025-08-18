/* chunk:467 bytes:[11243044, 11260621) size:17577 source:unpacked-cli.js */
var ivB = E((PO3, pvB) => {
    function vH8(A) {
        for (var B = 1; B < arguments.length; B++) {
            var Q = arguments[B];
            for (var Z in Q)
                if (Q.hasOwnProperty(Z)) A[Z] = Q[Z]
        }
        return A
    }

    function JR0(A, B) {
        return Array(B + 1).join(A)
    }

    function bH8(A) {
        return A.replace(/^\n*/, "")
    }

    function fH8(A) {
        var B = A.length;
        while (B > 0 && A[B - 1] === `
`) B--;
        return A.substring(0, B)
    }
    var hH8 = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];

    function XR0(A) {
        return VR0(A, hH8)
    }
    var fvB = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];

    function hvB(A) {
        return VR0(A, fvB)
    }

    function gH8(A) {
        return uvB(A, fvB)
    }
    var gvB = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];

    function uH8(A) {
        return VR0(A, gvB)
    }

    function mH8(A) {
        return uvB(A, gvB)
    }

    function VR0(A, B) {
        return B.indexOf(A.nodeName) >= 0
    }

    function uvB(A, B) {
        return A.getElementsByTagName && B.some(function(Q) {
            return A.getElementsByTagName(Q).length
        })
    }
    var LJ = {};
    LJ.paragraph = {
        filter: "p",
        replacement: function(A) {
            return `

` + A + `

`
        }
    };
    LJ.lineBreak = {
        filter: "br",
        replacement: function(A, B, Q) {
            return Q.br + `
`
        }
    };
    LJ.heading = {
        filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
        replacement: function(A, B, Q) {
            var Z = Number(B.nodeName.charAt(1));
            if (Q.headingStyle === "setext" && Z < 3) {
                var D = JR0(Z === 1 ? "=" : "-", A.length);
                return `

` + A + `
` + D + `

`
            } else return `

` + JR0("#", Z) + " " + A + `

`
        }
    };
    LJ.blockquote = {
        filter: "blockquote",
        replacement: function(A) {
            return A = A.replace(/^\n+|\n+$/g, ""), A = A.replace(/^/gm, "> "), `

` + A + `

`
        }
    };
    LJ.list = {
        filter: ["ul", "ol"],
        replacement: function(A, B) {
            var Q = B.parentNode;
            if (Q.nodeName === "LI" && Q.lastElementChild === B) return `
` + A;
            else return `

` + A + `

`
        }
    };
    LJ.listItem = {
        filter: "li",
        replacement: function(A, B, Q) {
            A = A.replace(/^\n+/, "").replace(/\n+$/, `
`).replace(/\n/gm, `
    `);
            var Z = Q.bulletListMarker + "   ",
                D = B.parentNode;
            if (D.nodeName === "OL") {
                var G = D.getAttribute("start"),
                    F = Array.prototype.indexOf.call(D.children, B);
                Z = (G ? Number(G) + F : F + 1) + ".  "
            }
            return Z + A + (B.nextSibling && !/\n$/.test(A) ? `
` : "")
        }
    };
    LJ.indentedCodeBlock = {
        filter: function(A, B) {
            return B.codeBlockStyle === "indented" && A.nodeName === "PRE" && A.firstChild && A.firstChild.nodeName === "CODE"
        },
        replacement: function(A, B, Q) {
            return `

    ` + B.firstChild.textContent.replace(/\n/g, `
    `) + `

`
        }
    };
    LJ.fencedCodeBlock = {
        filter: function(A, B) {
            return B.codeBlockStyle === "fenced" && A.nodeName === "PRE" && A.firstChild && A.firstChild.nodeName === "CODE"
        },
        replacement: function(A, B, Q) {
            var Z = B.firstChild.getAttribute("class") || "",
                D = (Z.match(/language-(\S+)/) || [null, ""])[1],
                G = B.firstChild.textContent,
                F = Q.fence.charAt(0),
                I = 3,
                Y = new RegExp("^" + F + "{3,}", "gm"),
                W;
            while (W = Y.exec(G))
                if (W[0].length >= I) I = W[0].length + 1;
            var J = JR0(F, I);
            return `

` + J + D + `
` + G.replace(/\n$/, "") + `
` + J + `

`
        }
    };
    LJ.horizontalRule = {
        filter: "hr",
        replacement: function(A, B, Q) {
            return `

` + Q.hr + `

`
        }
    };
    LJ.inlineLink = {
        filter: function(A, B) {
            return B.linkStyle === "inlined" && A.nodeName === "A" && A.getAttribute("href")
        },
        replacement: function(A, B) {
            var Q = B.getAttribute("href");
            if (Q) Q = Q.replace(/([()])/g, "\\$1");
            var Z = mf1(B.getAttribute("title"));
            if (Z) Z = ' "' + Z.replace(/"/g, "\\\"") + '"';
            return "[" + A + "](" + Q + Z + ")"
        }
    };
    LJ.referenceLink = {
        filter: function(A, B) {
            return B.linkStyle === "referenced" && A.nodeName === "A" && A.getAttribute("href")
        },
        replacement: function(A, B, Q) {
            var Z = B.getAttribute("href"),
                D = mf1(B.getAttribute("title"));
            if (D) D = ' "' + D + '"';
            var G, F;
            switch (Q.linkReferenceStyle) {
                case "collapsed":
                    G = "[" + A + "][]", F = "[" + A + "]: " + Z + D;
                    break;
                case "shortcut":
                    G = "[" + A + "]", F = "[" + A + "]: " + Z + D;
                    break;
                default:
                    var I = this.references.length + 1;
                    G = "[" + A + "][" + I + "]", F = "[" + I + "]: " + Z + D
            }
            return this.references.push(F), G
        },
        references: [],
        append: function(A) {
            var B = "";
            if (this.references.length) B = `

` + this.references.join(`
`) + `

`, this.references = [];
            return B
        }
    };
    LJ.emphasis = {
        filter: ["em", "i"],
        replacement: function(A, B, Q) {
            if (!A.trim()) return "";
            return Q.emDelimiter + A + Q.emDelimiter
        }
    };
    LJ.strong = {
        filter: ["strong", "b"],
        replacement: function(A, B, Q) {
            if (!A.trim()) return "";
            return Q.strongDelimiter + A + Q.strongDelimiter
        }
    };
    LJ.code = {
        filter: function(A) {
            var B = A.previousSibling || A.nextSibling,
                Q = A.parentNode.nodeName === "PRE" && !B;
            return A.nodeName === "CODE" && !Q
        },
        replacement: function(A) {
            if (!A) return "";
            A = A.replace(/\r?\n|\r/g, " ");
            var B = /^`|^ .*?[^ ].* $|`$/.test(A) ? " " : "",
                Q = "`",
                Z = A.match(/`+/gm) || [];
            while (Z.indexOf(Q) !== -1) Q = Q + "`";
            return Q + B + A + B + Q
        }
    };
    LJ.image = {
        filter: "img",
        replacement: function(A, B) {
            var Q = mf1(B.getAttribute("alt")),
                Z = B.getAttribute("src") || "",
                D = mf1(B.getAttribute("title")),
                G = D ? ' "' + D + '"' : "";
            return Z ? "![" + Q + "](" + Z + G + ")" : ""
        }
    };

    function mf1(A) {
        return A ? A.replace(/(\n+\s*)+/g, `
`) : ""
    }

    function mvB(A) {
        this.options = A, this._keep = [], this._remove = [], this.blankRule = {
            replacement: A.blankReplacement
        }, this.keepReplacement = A.keepReplacement, this.defaultRule = {
            replacement: A.defaultReplacement
        }, this.array = [];
        for (var B in A.rules) this.array.push(A.rules[B])
    }
    mvB.prototype = {
        add: function(A, B) {
            this.array.unshift(B)
        },
        keep: function(A) {
            this._keep.unshift({
                filter: A,
                replacement: this.keepReplacement
            })
        },
        remove: function(A) {
            this._remove.unshift({
                filter: A,
                replacement: function() {
                    return ""
                }
            })
        },
        forNode: function(A) {
            if (A.isBlank) return this.blankRule;
            var B;
            if (B = IR0(this.array, A, this.options)) return B;
            if (B = IR0(this._keep, A, this.options)) return B;
            if (B = IR0(this._remove, A, this.options)) return B;
            return this.defaultRule
        },
        forEach: function(A) {
            for (var B = 0; B < this.array.length; B++) A(this.array[B], B)
        }
    };

    function IR0(A, B, Q) {
        for (var Z = 0; Z < A.length; Z++) {
            var D = A[Z];
            if (dH8(D, B, Q)) return D
        }
        return
    }

    function dH8(A, B, Q) {
        var Z = A.filter;
        if (typeof Z === "string") {
            if (Z === B.nodeName.toLowerCase()) return !0
        } else if (Array.isArray(Z)) {
            if (Z.indexOf(B.nodeName.toLowerCase()) > -1) return !0
        } else if (typeof Z === "function") {
            if (Z.call(A, B, Q)) return !0
        } else throw new TypeError("`filter` needs to be a string, array, or function")
    }

    function cH8(A) {
        var {
            element: B,
            isBlock: Q,
            isVoid: Z
        } = A, D = A.isPre || function(X) {
            return X.nodeName === "PRE"
        };
        if (!B.firstChild || D(B)) return;
        var G = null,
            F = !1,
            I = null,
            Y = vvB(I, B, D);
        while (Y !== B) {
            if (Y.nodeType === 3 || Y.nodeType === 4) {
                var W = Y.data.replace(/[ \r\n\t]+/g, " ");
                if ((!G || / $/.test(G.data)) && !F && W[0] === " ") W = W.substr(1);
                if (!W) {
                    Y = YR0(Y);
                    continue
                }
                Y.data = W, G = Y
            } else if (Y.nodeType === 1) {
                if (Q(Y) || Y.nodeName === "BR") {
                    if (G) G.data = G.data.replace(/ $/, "");
                    G = null, F = !1
                } else if (Z(Y) || D(Y)) G = null, F = !0;
                else if (G) F = !1
            } else {
                Y = YR0(Y);
                continue
            }
            var J = vvB(I, Y, D);
            I = Y, Y = J
        }
        if (G) {
            if (G.data = G.data.replace(/ $/, ""), !G.data) YR0(G)
        }
    }

    function YR0(A) {
        var B = A.nextSibling || A.parentNode;
        return A.parentNode.removeChild(A), B
    }

    function vvB(A, B, Q) {
        if (A && A.parentNode === B || Q(B)) return B.nextSibling || B.parentNode;
        return B.firstChild || B.nextSibling || B.parentNode
    }
    var dvB = typeof window !== "undefined" ? window : {};

    function lH8() {
        var A = dvB.DOMParser,
            B = !1;
        try {
            if (new A().parseFromString("", "text/html")) B = !0
        } catch (Q) {}
        return B
    }

    function pH8() {
        var A = function() {};
        {
            var B = xvB();
            A.prototype.parseFromString = function(Q) {
                return B.createDocument(Q)
            }
        }
        return A
    }
    var iH8 = lH8() ? dvB.DOMParser : pH8();

    function nH8(A, B) {
        var Q;
        if (typeof A === "string") {
            var Z = aH8().parseFromString('<x-turndown id="turndown-root">' + A + "</x-turndown>", "text/html");
            Q = Z.getElementById("turndown-root")
        } else Q = A.cloneNode(!0);
        return cH8({
            element: Q,
            isBlock: XR0,
            isVoid: hvB,
            isPre: B.preformattedCode ? sH8 : null
        }), Q
    }
    var WR0;

    function aH8() {
        return WR0 = WR0 || new iH8, WR0
    }

    function sH8(A) {
        return A.nodeName === "PRE" || A.nodeName === "CODE"
    }

    function rH8(A, B) {
        return A.isBlock = XR0(A), A.isCode = A.nodeName === "CODE" || A.parentNode.isCode, A.isBlank = oH8(A), A.flankingWhitespace = tH8(A, B), A
    }

    function oH8(A) {
        return !hvB(A) && !uH8(A) && /^\s*$/i.test(A.textContent) && !gH8(A) && !mH8(A)
    }

    function tH8(A, B) {
        if (A.isBlock || B.preformattedCode && A.isCode) return {
            leading: "",
            trailing: ""
        };
        var Q = eH8(A.textContent);
        if (Q.leadingAscii && bvB("left", A, B)) Q.leading = Q.leadingNonAscii;
        if (Q.trailingAscii && bvB("right", A, B)) Q.trailing = Q.trailingNonAscii;
        return {
            leading: Q.leading,
            trailing: Q.trailing
        }
    }

    function eH8(A) {
        var B = A.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
        return {
            leading: B[1],
            leadingAscii: B[2],
            leadingNonAscii: B[3],
            trailing: B[4],
            trailingNonAscii: B[5],
            trailingAscii: B[6]
        }
    }

    function bvB(A, B, Q) {
        var Z, D, G;
        if (A === "left") Z = B.previousSibling, D = / $/;
        else Z = B.nextSibling, D = /^ /;
        if (Z) {
            if (Z.nodeType === 3) G = D.test(Z.nodeValue);
            else if (Q.preformattedCode && Z.nodeName === "CODE") G = !1;
            else if (Z.nodeType === 1 && !XR0(Z)) G = D.test(Z.textContent)
        }
        return G
    }
    var Az8 = Array.prototype.reduce,
        Bz8 = [
            [/\\/g, "\\\\"],
            [/\*/g, "\\*"],
            [/^-/g, "\\-"],
            [/^\+ /g, "\\+ "],
            [/^(=+)/g, "\\$1"],
            [/^(#{1,6}) /g, "\\$1 "],
            [/`/g, "\\`"],
            [/^~~~/g, "\\~~~"],
            [/\[/g, "\\["],
            [/\]/g, "\\]"],
            [/^>/g, "\\>"],
            [/_/g, "\\_"],
            [/^(\d+)\. /g, "$1\\. "]
        ];

    function df1(A) {
        if (!(this instanceof df1)) return new df1(A);
        var B = {
            rules: LJ,
            headingStyle: "setext",
            hr: "* * *",
            bulletListMarker: "*",
            codeBlockStyle: "indented",
            fence: "```",
            emDelimiter: "_",
            strongDelimiter: "**",
            linkStyle: "inlined",
            linkReferenceStyle: "full",
            br: "  ",
            preformattedCode: !1,
            blankReplacement: function(Q, Z) {
                return Z.isBlock ? `

` : ""
            },
            keepReplacement: function(Q, Z) {
                return Z.isBlock ? `

` + Z.outerHTML + `

` : Z.outerHTML
            },
            defaultReplacement: function(Q, Z) {
                return Z.isBlock ? `

` + Q + `

` : Q
            }
        };
        this.options = vH8({}, B, A), this.rules = new mvB(this.options)
    }
    df1.prototype = {
        turndown: function(A) {
            if (!Dz8(A)) throw new TypeError(A + " is not a string, or an element/document/fragment node.");
            if (A === "") return "";
            var B = cvB.call(this, new nH8(A, this.options));
            return Qz8.call(this, B)
        },
        use: function(A) {
            if (Array.isArray(A))
                for (var B = 0; B < A.length; B++) this.use(A[B]);
            else if (typeof A === "function") A(this);
            else throw new TypeError("plugin must be a Function or an Array of Functions");
            return this
        },
        addRule: function(A, B) {
            return this.rules.add(A, B), this
        },
        keep: function(A) {
            return this.rules.keep(A), this
        },
        remove: function(A) {
            return this.rules.remove(A), this
        },
        escape: function(A) {
            return Bz8.reduce(function(B, Q) {
                return B.replace(Q[0], Q[1])
            }, A)
        }
    };

    function cvB(A) {
        var B = this;
        return Az8.call(A.childNodes, function(Q, Z) {
            Z = new rH8(Z, B.options);
            var D = "";
            if (Z.nodeType === 3) D = Z.isCode ? Z.nodeValue : B.escape(Z.nodeValue);
            else if (Z.nodeType === 1) D = Zz8.call(B, Z);
            return lvB(Q, D)
        }, "")
    }

    function Qz8(A) {
        var B = this;
        return this.rules.forEach(function(Q) {
            if (typeof Q.append === "function") A = lvB(A, Q.append(B.options))
        }), A.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "")
    }

    function Zz8(A) {
        var B = this.rules.forNode(A),
            Q = cvB.call(this, A),
            Z = A.flankingWhitespace;
        if (Z.leading || Z.trailing) Q = Q.trim();
        return Z.leading + B.replacement(Q, A, this.options) + Z.trailing
    }

    function lvB(A, B) {
        var Q = fH8(A),
            Z = bH8(B),
            D = Math.max(A.length - Q.length, B.length - Z.length),
            G = `

`.substring(0, D);
        return Q + G + Z
    }

    function Dz8(A) {
        return A != null && (typeof A === "string" || A.nodeType && (A.nodeType === 1 || A.nodeType === 9 || A.nodeType === 11))
    }
    pvB.exports = df1
});
var j4 = E((ck3, AfB) => {
    AfB.exports = {
        options: {
            usePureJavaScript: !1
        }
    }
});