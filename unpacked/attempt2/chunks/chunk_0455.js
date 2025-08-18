/* chunk:455 bytes:[10828996, 10851170) size:22174 source:unpacked-cli.js */
var Uf1 = E((x01, $_B) => {
    var Hf1 = Object.create(null, {
            location: {
                get: function() {
                    throw new Error("window.location is not supported.")
                }
            }
        }),
        hC8 = function(A, B) {
            return A.compareDocumentPosition(B)
        },
        gC8 = function(A, B) {
            return hC8(A, B) & 2 ? 1 : -1
        },
        Ef1 = function(A) {
            while ((A = A.nextSibling) && A.nodeType !== 1);
            return A
        },
        _01 = function(A) {
            while ((A = A.previousSibling) && A.nodeType !== 1);
            return A
        },
        uC8 = function(A) {
            if (A = A.firstChild)
                while (A.nodeType !== 1 && (A = A.nextSibling));
            return A
        },
        mC8 = function(A) {
            if (A = A.lastChild)
                while (A.nodeType !== 1 && (A = A.previousSibling));
            return A
        },
        y01 = function(A) {
            if (!A.parentNode) return !1;
            var B = A.parentNode.nodeType;
            return B === 1 || B === 9
        },
        H_B = function(A) {
            if (!A) return A;
            var B = A[0];
            if (B === '"' || B === "'") {
                if (A[A.length - 1] === B) A = A.slice(1, -1);
                else A = A.slice(1);
                return A.replace(LQ.str_escape, function(Q) {
                    var Z = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(Q);
                    if (!Z) return Q.slice(1);
                    if (Z[2]) return "";
                    var D = parseInt(Z[1], 16);
                    return String.fromCodePoint ? String.fromCodePoint(D) : String.fromCharCode(D)
                })
            } else if (LQ.ident.test(A)) return tv(A);
            else return A
        },
        tv = function(A) {
            return A.replace(LQ.escape, function(B) {
                var Q = /^\\([0-9A-Fa-f]+)/.exec(B);
                if (!Q) return B[1];
                var Z = parseInt(Q[1], 16);
                return String.fromCodePoint ? String.fromCodePoint(Z) : String.fromCharCode(Z)
            })
        },
        dC8 = function() {
            if (Array.prototype.indexOf) return Array.prototype.indexOf;
            return function(A, B) {
                var Q = this.length;
                while (Q--)
                    if (this[Q] === B) return Q;
                return -1
            }
        }(),
        E_B = function(A, B) {
            var Q = LQ.inside.source.replace(/</g, A).replace(/>/g, B);
            return new RegExp(Q)
        },
        CC = function(A, B, Q) {
            return A = A.source, A = A.replace(B, Q.source || Q), new RegExp(A)
        },
        z_B = function(A, B) {
            return A.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", B).join("/")
        },
        cC8 = function(A, B) {
            var Q = A.replace(/\s+/g, ""),
                Z;
            if (Q === "even") Q = "2n+0";
            else if (Q === "odd") Q = "2n+1";
            else if (Q.indexOf("n") === -1) Q = "0n" + Q;
            return Z = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(Q), {
                group: Z[1] === "-" ? -(Z[2] || 1) : +(Z[2] || 1),
                offset: Z[4] ? Z[3] === "-" ? -Z[4] : +Z[4] : 0
            }
        },
        CM0 = function(A, B, Q) {
            var Z = cC8(A),
                D = Z.group,
                G = Z.offset,
                F = !Q ? uC8 : mC8,
                I = !Q ? Ef1 : _01;
            return function(Y) {
                if (!y01(Y)) return;
                var W = F(Y.parentNode),
                    J = 0;
                while (W) {
                    if (B(W, Y)) J++;
                    if (W === Y) return J -= G, D && J ? J % D === 0 && J < 0 === D < 0 : !J;
                    W = I(W)
                }
            }
        },
        _I = {
            "*": function() {
                return function() {
                    return !0
                }
            }(),
            type: function(A) {
                return A = A.toLowerCase(),
                    function(B) {
                        return B.nodeName.toLowerCase() === A
                    }
            },
            attr: function(A, B, Q, Z) {
                return B = U_B[B],
                    function(D) {
                        var G;
                        switch (A) {
                            case "for":
                                G = D.htmlFor;
                                break;
                            case "class":
                                if (G = D.className, G === "" && D.getAttribute("class") == null) G = null;
                                break;
                            case "href":
                            case "src":
                                G = D.getAttribute(A, 2);
                                break;
                            case "title":
                                G = D.getAttribute("title") || null;
                                break;
                            case "id":
                            case "lang":
                            case "dir":
                            case "accessKey":
                            case "hidden":
                            case "tabIndex":
                            case "style":
                                if (D.getAttribute) {
                                    G = D.getAttribute(A);
                                    break
                                }
                            default:
                                if (D.hasAttribute && !D.hasAttribute(A)) break;
                                G = D[A] != null ? D[A] : D.getAttribute && D.getAttribute(A);
                                break
                        }
                        if (G == null) return;
                        if (G = G + "", Z) G = G.toLowerCase(), Q = Q.toLowerCase();
                        return B(G, Q)
                    }
            },
            ":first-child": function(A) {
                return !_01(A) && y01(A)
            },
            ":last-child": function(A) {
                return !Ef1(A) && y01(A)
            },
            ":only-child": function(A) {
                return !_01(A) && !Ef1(A) && y01(A)
            },
            ":nth-child": function(A, B) {
                return CM0(A, function() {
                    return !0
                }, B)
            },
            ":nth-last-child": function(A) {
                return _I[":nth-child"](A, !0)
            },
            ":root": function(A) {
                return A.ownerDocument.documentElement === A
            },
            ":empty": function(A) {
                return !A.firstChild
            },
            ":not": function(A) {
                var B = HM0(A);
                return function(Q) {
                    return !B(Q)
                }
            },
            ":first-of-type": function(A) {
                if (!y01(A)) return;
                var B = A.nodeName;
                while (A = _01(A))
                    if (A.nodeName === B) return;
                return !0
            },
            ":last-of-type": function(A) {
                if (!y01(A)) return;
                var B = A.nodeName;
                while (A = Ef1(A))
                    if (A.nodeName === B) return;
                return !0
            },
            ":only-of-type": function(A) {
                return _I[":first-of-type"](A) && _I[":last-of-type"](A)
            },
            ":nth-of-type": function(A, B) {
                return CM0(A, function(Q, Z) {
                    return Q.nodeName === Z.nodeName
                }, B)
            },
            ":nth-last-of-type": function(A) {
                return _I[":nth-of-type"](A, !0)
            },
            ":checked": function(A) {
                return !!(A.checked || A.selected)
            },
            ":indeterminate": function(A) {
                return !_I[":checked"](A)
            },
            ":enabled": function(A) {
                return !A.disabled && A.type !== "hidden"
            },
            ":disabled": function(A) {
                return !!A.disabled
            },
            ":target": function(A) {
                return A.id === Hf1.location.hash.substring(1)
            },
            ":focus": function(A) {
                return A === A.ownerDocument.activeElement
            },
            ":is": function(A) {
                return HM0(A)
            },
            ":matches": function(A) {
                return _I[":is"](A)
            },
            ":nth-match": function(A, B) {
                var Q = A.split(/\s*,\s*/),
                    Z = Q.shift(),
                    D = HM0(Q.join(","));
                return CM0(Z, D, B)
            },
            ":nth-last-match": function(A) {
                return _I[":nth-match"](A, !0)
            },
            ":links-here": function(A) {
                return A + "" === Hf1.location + ""
            },
            ":lang": function(A) {
                return function(B) {
                    while (B) {
                        if (B.lang) return B.lang.indexOf(A) === 0;
                        B = B.parentNode
                    }
                }
            },
            ":dir": function(A) {
                return function(B) {
                    while (B) {
                        if (B.dir) return B.dir === A;
                        B = B.parentNode
                    }
                }
            },
            ":scope": function(A, B) {
                var Q = B || A.ownerDocument;
                if (Q.nodeType === 9) return A === Q.documentElement;
                return A === Q
            },
            ":any-link": function(A) {
                return typeof A.href === "string"
            },
            ":local-link": function(A) {
                if (A.nodeName) return A.href && A.host === Hf1.location.host;
                var B = +A + 1;
                return function(Q) {
                    if (!Q.href) return;
                    var Z = Hf1.location + "",
                        D = Q + "";
                    return z_B(Z, B) === z_B(D, B)
                }
            },
            ":default": function(A) {
                return !!A.defaultSelected
            },
            ":valid": function(A) {
                return A.willValidate || A.validity && A.validity.valid
            },
            ":invalid": function(A) {
                return !_I[":valid"](A)
            },
            ":in-range": function(A) {
                return A.value > A.min && A.value <= A.max
            },
            ":out-of-range": function(A) {
                return !_I[":in-range"](A)
            },
            ":required": function(A) {
                return !!A.required
            },
            ":optional": function(A) {
                return !A.required
            },
            ":read-only": function(A) {
                if (A.readOnly) return !0;
                var B = A.getAttribute("contenteditable"),
                    Q = A.contentEditable,
                    Z = A.nodeName.toLowerCase();
                return Z = Z !== "input" && Z !== "textarea", (Z || A.disabled) && B == null && Q !== "true"
            },
            ":read-write": function(A) {
                return !_I[":read-only"](A)
            },
            ":hover": function() {
                throw new Error(":hover is not supported.")
            },
            ":active": function() {
                throw new Error(":active is not supported.")
            },
            ":link": function() {
                throw new Error(":link is not supported.")
            },
            ":visited": function() {
                throw new Error(":visited is not supported.")
            },
            ":column": function() {
                throw new Error(":column is not supported.")
            },
            ":nth-column": function() {
                throw new Error(":nth-column is not supported.")
            },
            ":nth-last-column": function() {
                throw new Error(":nth-last-column is not supported.")
            },
            ":current": function() {
                throw new Error(":current is not supported.")
            },
            ":past": function() {
                throw new Error(":past is not supported.")
            },
            ":future": function() {
                throw new Error(":future is not supported.")
            },
            ":contains": function(A) {
                return function(B) {
                    var Q = B.innerText || B.textContent || B.value || "";
                    return Q.indexOf(A) !== -1
                }
            },
            ":has": function(A) {
                return function(B) {
                    return w_B(A, B).length > 0
                }
            }
        },
        U_B = {
            "-": function() {
                return !0
            },
            "=": function(A, B) {
                return A === B
            },
            "*=": function(A, B) {
                return A.indexOf(B) !== -1
            },
            "~=": function(A, B) {
                var Q, Z, D, G;
                for (Z = 0;; Z = Q + 1) {
                    if (Q = A.indexOf(B, Z), Q === -1) return !1;
                    if (D = A[Q - 1], G = A[Q + B.length], (!D || D === " ") && (!G || G === " ")) return !0
                }
            },
            "|=": function(A, B) {
                var Q = A.indexOf(B),
                    Z;
                if (Q !== 0) return;
                return Z = A[Q + B.length], Z === "-" || !Z
            },
            "^=": function(A, B) {
                return A.indexOf(B) === 0
            },
            "$=": function(A, B) {
                var Q = A.lastIndexOf(B);
                return Q !== -1 && Q + B.length === A.length
            },
            "!=": function(A, B) {
                return A !== B
            }
        },
        hF1 = {
            " ": function(A) {
                return function(B) {
                    while (B = B.parentNode)
                        if (A(B)) return B
                }
            },
            ">": function(A) {
                return function(B) {
                    if (B = B.parentNode) return A(B) && B
                }
            },
            "+": function(A) {
                return function(B) {
                    if (B = _01(B)) return A(B) && B
                }
            },
            "~": function(A) {
                return function(B) {
                    while (B = _01(B))
                        if (A(B)) return B
                }
            },
            noop: function(A) {
                return function(B) {
                    return A(B) && B
                }
            },
            ref: function(A, B) {
                var Q;

                function Z(D) {
                    var G = D.ownerDocument,
                        F = G.getElementsByTagName("*"),
                        I = F.length;
                    while (I--)
                        if (Q = F[I], Z.test(D)) return Q = null, !0;
                    Q = null
                }
                return Z.combinator = function(D) {
                    if (!Q || !Q.getAttribute) return;
                    var G = Q.getAttribute(B) || "";
                    if (G[0] === "#") G = G.substring(1);
                    if (G === D.id && A(Q)) return Q
                }, Z
            }
        },
        LQ = {
            escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
            str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
            nonascii: /[\u00A0-\uFFFF]/,
            cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
            qname: /^ *(cssid|\*)/,
            simple: /^(?:([.#]cssid)|pseudo|attr)/,
            ref: /^ *\/(cssid)\/ */,
            combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
            attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
            pseudo: /^(:cssid)(?:\((inside)\))?/,
            inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
            ident: /^(cssid)$/
        };
    LQ.cssid = CC(LQ.cssid, "nonascii", LQ.nonascii);
    LQ.cssid = CC(LQ.cssid, "escape", LQ.escape);
    LQ.qname = CC(LQ.qname, "cssid", LQ.cssid);
    LQ.simple = CC(LQ.simple, "cssid", LQ.cssid);
    LQ.ref = CC(LQ.ref, "cssid", LQ.cssid);
    LQ.attr = CC(LQ.attr, "cssid", LQ.cssid);
    LQ.pseudo = CC(LQ.pseudo, "cssid", LQ.cssid);
    LQ.inside = CC(LQ.inside, `[^"'>]*`, LQ.inside);
    LQ.attr = CC(LQ.attr, "inside", E_B("\\[", "\\]"));
    LQ.pseudo = CC(LQ.pseudo, "inside", E_B("\\(", "\\)"));
    LQ.simple = CC(LQ.simple, "pseudo", LQ.pseudo);
    LQ.simple = CC(LQ.simple, "attr", LQ.attr);
    LQ.ident = CC(LQ.ident, "cssid", LQ.cssid);
    LQ.str_escape = CC(LQ.str_escape, "escape", LQ.escape);
    var gF1 = function(A) {
            var B = A.replace(/^\s+|\s+$/g, ""),
                Q, Z = [],
                D = [],
                G, F, I, Y, W;
            while (B) {
                if (I = LQ.qname.exec(B)) B = B.substring(I[0].length), F = tv(I[1]), D.push(zf1(F, !0));
                else if (I = LQ.simple.exec(B)) B = B.substring(I[0].length), F = "*", D.push(zf1(F, !0)), D.push(zf1(I));
                else throw new SyntaxError("Invalid selector.");
                while (I = LQ.simple.exec(B)) B = B.substring(I[0].length), D.push(zf1(I));
                if (B[0] === "!") B = B.substring(1), G = pC8(), G.qname = F, D.push(G.simple);
                if (I = LQ.ref.exec(B)) {
                    B = B.substring(I[0].length), W = hF1.ref(KM0(D), tv(I[1])), Z.push(W.combinator), D = [];
                    continue
                }
                if (I = LQ.combinator.exec(B)) {
                    if (B = B.substring(I[0].length), Y = I[1] || I[2] || I[3], Y === ",") {
                        Z.push(hF1.noop(KM0(D)));
                        break
                    }
                } else Y = "noop";
                if (!hF1[Y]) throw new SyntaxError("Bad combinator.");
                Z.push(hF1[Y](KM0(D))), D = []
            }
            if (Q = lC8(Z), Q.qname = F, Q.sel = B, G) G.lname = Q.qname, G.test = Q, G.qname = G.qname, G.sel = Q.sel, Q = G;
            if (W) W.test = Q, W.qname = Q.qname, W.sel = Q.sel, Q = W;
            return Q
        },
        zf1 = function(A, B) {
            if (B) return A === "*" ? _I["*"] : _I.type(A);
            if (A[1]) return A[1][0] === "." ? _I.attr("class", "~=", tv(A[1].substring(1)), !1) : _I.attr("id", "=", tv(A[1].substring(1)), !1);
            if (A[2]) return A[3] ? _I[tv(A[2])](H_B(A[3])) : _I[tv(A[2])];
            if (A[4]) {
                var Q = A[6],
                    Z = /["'\s]\s*I$/i.test(Q);
                if (Z) Q = Q.replace(/\s*I$/i, "");
                return _I.attr(tv(A[4]), A[5] || "-", H_B(Q), Z)
            }
            throw new SyntaxError("Unknown Selector.")
        },
        KM0 = function(A) {
            var B = A.length,
                Q;
            if (B < 2) return A[0];
            return function(Z) {
                if (!Z) return;
                for (Q = 0; Q < B; Q++)
                    if (!A[Q](Z)) return;
                return !0
            }
        },
        lC8 = function(A) {
            if (A.length < 2) return function(B) {
                return !!A[0](B)
            };
            return function(B) {
                var Q = A.length;
                while (Q--)
                    if (!(B = A[Q](B))) return;
                return !0
            }
        },
        pC8 = function() {
            var A;

            function B(Q) {
                var Z = Q.ownerDocument,
                    D = Z.getElementsByTagName(B.lname),
                    G = D.length;
                while (G--)
                    if (B.test(D[G]) && A === Q) return A = null, !0;
                A = null
            }
            return B.simple = function(Q) {
                return A = Q, !0
            }, B
        },
        HM0 = function(A) {
            var B = gF1(A),
                Q = [B];
            while (B.sel) B = gF1(B.sel), Q.push(B);
            if (Q.length < 2) return B;
            return function(Z) {
                var D = Q.length,
                    G = 0;
                for (; G < D; G++)
                    if (Q[G](Z)) return !0
            }
        },
        w_B = function(A, B) {
            var Q = [],
                Z = gF1(A),
                D = B.getElementsByTagName(Z.qname),
                G = 0,
                F;
            while (F = D[G++])
                if (Z(F)) Q.push(F);
            if (Z.sel) {
                while (Z.sel) {
                    Z = gF1(Z.sel), D = B.getElementsByTagName(Z.qname), G = 0;
                    while (F = D[G++])
                        if (Z(F) && dC8.call(Q, F) === -1) Q.push(F)
                }
                Q.sort(gC8)
            }
            return Q
        };
    $_B.exports = x01 = function(A, B) {
        var Q, Z;
        if (B.nodeType !== 11 && A.indexOf(" ") === -1) {
            if (A[0] === "#" && B.rooted && /^#[A-Z_][-A-Z0-9_]*$/i.test(A)) {
                if (B.doc._hasMultipleElementsWithId) {
                    if (Q = A.substring(1), !B.doc._hasMultipleElementsWithId(Q)) return Z = B.doc.getElementById(Q), Z ? [Z] : []
                }
            }
            if (A[0] === "." && /^\.\w+$/.test(A)) return B.getElementsByClassName(A.substring(1));
            if (/^\w+$/.test(A)) return B.getElementsByTagName(A)
        }
        return w_B(A, B)
    };
    x01.selectors = _I;
    x01.operators = U_B;
    x01.combinators = hF1;
    x01.matches = function(A, B) {
        var Q = {
            sel: B
        };
        do
            if (Q = gF1(Q.sel), Q(A)) return !0; while (Q.sel);
        return !1
    }
});