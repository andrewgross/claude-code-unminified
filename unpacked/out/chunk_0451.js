/* chunk:451 bytes:[10758161, 10777949) size:19788 source:unpacked-cli.js */
var GL0 = E((HY8) => {
    var oI8 = Sb1().FilterCSS,
        tI8 = Sb1().getDefaultWhiteList,
        yb1 = jb1();

    function uSB() {
        return {
            a: ["target", "href", "title"],
            abbr: ["title"],
            address: [],
            area: ["shape", "coords", "href", "alt"],
            article: [],
            aside: [],
            audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
            b: [],
            bdi: ["dir"],
            bdo: ["dir"],
            big: [],
            blockquote: ["cite"],
            br: [],
            caption: [],
            center: [],
            cite: [],
            code: [],
            col: ["align", "valign", "span", "width"],
            colgroup: ["align", "valign", "span", "width"],
            dd: [],
            del: ["datetime"],
            details: ["open"],
            div: [],
            dl: [],
            dt: [],
            em: [],
            figcaption: [],
            figure: [],
            font: ["color", "size", "face"],
            footer: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            header: [],
            hr: [],
            i: [],
            img: ["src", "alt", "title", "width", "height", "loading"],
            ins: ["datetime"],
            kbd: [],
            li: [],
            mark: [],
            nav: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            section: [],
            small: [],
            span: [],
            sub: [],
            summary: [],
            sup: [],
            strong: [],
            strike: [],
            table: ["width", "border", "align", "valign"],
            tbody: ["align", "valign"],
            td: ["width", "rowspan", "colspan", "align", "valign"],
            tfoot: ["align", "valign"],
            th: ["width", "rowspan", "colspan", "align", "valign"],
            thead: ["align", "valign"],
            tr: ["rowspan", "align", "valign"],
            tt: [],
            u: [],
            ul: [],
            video: ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src", "height", "width"]
        }
    }
    var mSB = new oI8;

    function eI8(A, B, Q) {}

    function AY8(A, B, Q) {}

    function BY8(A, B, Q) {}

    function QY8(A, B, Q) {}

    function dSB(A) {
        return A.replace(DY8, "&lt;").replace(GY8, "&gt;")
    }

    function ZY8(A, B, Q, Z) {
        if (Q = aSB(Q), B === "href" || B === "src") {
            if (Q = yb1.trim(Q), Q === "#") return "#";
            if (!(Q.substr(0, 7) === "http://" || Q.substr(0, 8) === "https://" || Q.substr(0, 7) === "mailto:" || Q.substr(0, 4) === "tel:" || Q.substr(0, 11) === "data:image/" || Q.substr(0, 6) === "ftp://" || Q.substr(0, 2) === "./" || Q.substr(0, 3) === "../" || Q[0] === "#" || Q[0] === "/")) return ""
        } else if (B === "background") {
            if (kb1.lastIndex = 0, kb1.test(Q)) return ""
        } else if (B === "style") {
            if (hSB.lastIndex = 0, hSB.test(Q)) return "";
            if (gSB.lastIndex = 0, gSB.test(Q)) {
                if (kb1.lastIndex = 0, kb1.test(Q)) return ""
            }
            if (Z !== !1) Z = Z || mSB, Q = Z.process(Q)
        }
        return Q = sSB(Q), Q
    }
    var DY8 = /</g,
        GY8 = />/g,
        FY8 = /"/g,
        IY8 = /&quot;/g,
        YY8 = /&#([a-zA-Z0-9]*);?/gim,
        WY8 = /&colon;?/gim,
        JY8 = /&newline;?/gim,
        kb1 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,
        hSB = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
        gSB = /u\s*r\s*l\s*\(.*/gi;

    function cSB(A) {
        return A.replace(FY8, "&quot;")
    }

    function lSB(A) {
        return A.replace(IY8, '"')
    }

    function pSB(A) {
        return A.replace(YY8, function B(Q, Z) {
            return Z[0] === "x" || Z[0] === "X" ? String.fromCharCode(parseInt(Z.substr(1), 16)) : String.fromCharCode(parseInt(Z, 10))
        })
    }

    function iSB(A) {
        return A.replace(WY8, ":").replace(JY8, " ")
    }

    function nSB(A) {
        var B = "";
        for (var Q = 0, Z = A.length; Q < Z; Q++) B += A.charCodeAt(Q) < 32 ? " " : A.charAt(Q);
        return yb1.trim(B)
    }

    function aSB(A) {
        return A = lSB(A), A = pSB(A), A = iSB(A), A = nSB(A), A
    }

    function sSB(A) {
        return A = cSB(A), A = dSB(A), A
    }

    function XY8() {
        return ""
    }

    function VY8(A, B) {
        if (typeof B !== "function") B = function() {};
        var Q = !Array.isArray(A);

        function Z(F) {
            if (Q) return !0;
            return yb1.indexOf(A, F) !== -1
        }
        var D = [],
            G = !1;
        return {
            onIgnoreTag: function(F, I, Y) {
                if (Z(F))
                    if (Y.isClosing) {
                        var W = "[/removed]",
                            J = Y.position + W.length;
                        return D.push([G !== !1 ? G : Y.position, J]), G = !1, W
                    } else {
                        if (!G) G = Y.position;
                        return "[removed]"
                    }
                else return B(F, I, Y)
            },
            remove: function(F) {
                var I = "",
                    Y = 0;
                return yb1.forEach(D, function(W) {
                    I += F.slice(Y, W[0]), Y = W[1]
                }), I += F.slice(Y), I
            }
        }
    }

    function CY8(A) {
        var B = "",
            Q = 0;
        while (Q < A.length) {
            var Z = A.indexOf("<!--", Q);
            if (Z === -1) {
                B += A.slice(Q);
                break
            }
            B += A.slice(Q, Z);
            var D = A.indexOf("-->", Z);
            if (D === -1) break;
            Q = D + 3
        }
        return B
    }

    function KY8(A) {
        var B = A.split("");
        return B = B.filter(function(Q) {
            var Z = Q.charCodeAt(0);
            if (Z === 127) return !1;
            if (Z <= 31) {
                if (Z === 10 || Z === 13) return !0;
                return !1
            }
            return !0
        }), B.join("")
    }
    HY8.whiteList = uSB();
    HY8.getDefaultWhiteList = uSB;
    HY8.onTag = eI8;
    HY8.onIgnoreTag = AY8;
    HY8.onTagAttr = BY8;
    HY8.onIgnoreTagAttr = QY8;
    HY8.safeAttrValue = ZY8;
    HY8.escapeHtml = dSB;
    HY8.escapeQuote = cSB;
    HY8.unescapeQuote = lSB;
    HY8.escapeHtmlEntities = pSB;
    HY8.escapeDangerHtml5Entities = iSB;
    HY8.clearNonPrintableCharacter = nSB;
    HY8.friendlyAttrValue = aSB;
    HY8.escapeAttrValue = sSB;
    HY8.onIgnoreTagStripAll = XY8;
    HY8.StripTagBody = VY8;
    HY8.stripCommentTag = CY8;
    HY8.stripBlankChar = KY8;
    HY8.attributeWrapSign = '"';
    HY8.cssFilter = mSB;
    HY8.getDefaultCSSWhiteList = tI8
});
var FL0 = E((nY8) => {
    var mv = jb1();

    function hY8(A) {
        var B = mv.spaceIndex(A),
            Q;
        if (B === -1) Q = A.slice(1, -1);
        else Q = A.slice(1, B + 1);
        if (Q = mv.trim(Q).toLowerCase(), Q.slice(0, 1) === "/") Q = Q.slice(1);
        if (Q.slice(-1) === "/") Q = Q.slice(0, -1);
        return Q
    }

    function gY8(A) {
        return A.slice(0, 2) === "</"
    }

    function uY8(A, B, Q) {
        var Z = "",
            D = 0,
            G = !1,
            F = !1,
            I = 0,
            Y = A.length,
            W = "",
            J = "";
        A: for (I = 0; I < Y; I++) {
            var X = A.charAt(I);
            if (G === !1) {
                if (X === "<") {
                    G = I;
                    continue
                }
            } else if (F === !1) {
                if (X === "<") {
                    Z += Q(A.slice(D, I)), G = I, D = I;
                    continue
                }
                if (X === ">" || I === Y - 1) {
                    Z += Q(A.slice(D, G)), J = A.slice(G, I + 1), W = hY8(J), Z += B(G, Z.length, W, J, gY8(J)), D = I + 1, G = !1;
                    continue
                }
                if (X === '"' || X === "'") {
                    var V = 1,
                        C = A.charAt(I - V);
                    while (C.trim() === "" || C === "=") {
                        if (C === "=") {
                            F = X;
                            continue A
                        }
                        C = A.charAt(I - ++V)
                    }
                }
            } else if (X === F) {
                F = !1;
                continue
            }
        }
        if (D < Y) Z += Q(A.substr(D));
        return Z
    }
    var mY8 = /[^a-zA-Z0-9\\_:.-]/gim;

    function dY8(A, B) {
        var Q = 0,
            Z = 0,
            D = [],
            G = !1,
            F = A.length;

        function I(V, C) {
            if (V = mv.trim(V), V = V.replace(mY8, "").toLowerCase(), V.length < 1) return;
            var K = B(V, C || "");
            if (K) D.push(K)
        }
        for (var Y = 0; Y < F; Y++) {
            var W = A.charAt(Y),
                J, X;
            if (G === !1 && W === "=") {
                G = A.slice(Q, Y), Q = Y + 1, Z = A.charAt(Q) === '"' || A.charAt(Q) === "'" ? Q : lY8(A, Y + 1);
                continue
            }
            if (G !== !1) {
                if (Y === Z)
                    if (X = A.indexOf(W, Y + 1), X === -1) break;
                    else {
                        J = mv.trim(A.slice(Z + 1, X)), I(G, J), G = !1, Y = X, Q = Y + 1;
                        continue
                    }
            }
            if (/\s|\n|\t/.test(W))
                if (A = A.replace(/\s|\n|\t/g, " "), G === !1)
                    if (X = cY8(A, Y), X === -1) {
                        J = mv.trim(A.slice(Q, Y)), I(J), G = !1, Q = Y + 1;
                        continue
                    } else {
                        Y = X - 1;
                        continue
                    }
            else if (X = pY8(A, Y - 1), X === -1) {
                J = mv.trim(A.slice(Q, Y)), J = rSB(J), I(G, J), G = !1, Q = Y + 1;
                continue
            } else continue
        }
        if (Q < A.length)
            if (G === !1) I(A.slice(Q));
            else I(G, rSB(mv.trim(A.slice(Q))));
        return mv.trim(D.join(" "))
    }

    function cY8(A, B) {
        for (; B < A.length; B++) {
            var Q = A[B];
            if (Q === " ") continue;
            if (Q === "=") return B;
            return -1
        }
    }

    function lY8(A, B) {
        for (; B < A.length; B++) {
            var Q = A[B];
            if (Q === " ") continue;
            if (Q === "'" || Q === '"') return B;
            return -1
        }
    }

    function pY8(A, B) {
        for (; B > 0; B--) {
            var Q = A[B];
            if (Q === " ") continue;
            if (Q === "=") return B;
            return -1
        }
    }

    function iY8(A) {
        if (A[0] === '"' && A[A.length - 1] === '"' || A[0] === "'" && A[A.length - 1] === "'") return !0;
        else return !1
    }

    function rSB(A) {
        if (iY8(A)) return A.substr(1, A.length - 2);
        else return A
    }
    nY8.parseTag = uY8;
    nY8.parseAttr = dY8
});
var AjB = E((aC3, eSB) => {
    var rY8 = Sb1().FilterCSS,
        DU = GL0(),
        oSB = FL0(),
        oY8 = oSB.parseTag,
        tY8 = oSB.parseAttr,
        xb1 = jb1();

    function _b1(A) {
        return A === void 0 || A === null
    }

    function eY8(A) {
        var B = xb1.spaceIndex(A);
        if (B === -1) return {
            html: "",
            closing: A[A.length - 2] === "/"
        };
        A = xb1.trim(A.slice(B + 1, -1));
        var Q = A[A.length - 1] === "/";
        if (Q) A = xb1.trim(A.slice(0, -1));
        return {
            html: A,
            closing: Q
        }
    }

    function AW8(A) {
        var B = {};
        for (var Q in A) B[Q] = A[Q];
        return B
    }

    function BW8(A) {
        var B = {};
        for (var Q in A)
            if (Array.isArray(A[Q])) B[Q.toLowerCase()] = A[Q].map(function(Z) {
                return Z.toLowerCase()
            });
            else B[Q.toLowerCase()] = A[Q];
        return B
    }

    function tSB(A) {
        if (A = AW8(A || {}), A.stripIgnoreTag) {
            if (A.onIgnoreTag) console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time');
            A.onIgnoreTag = DU.onIgnoreTagStripAll
        }
        if (A.whiteList || A.allowList) A.whiteList = BW8(A.whiteList || A.allowList);
        else A.whiteList = DU.whiteList;
        if (this.attributeWrapSign = A.singleQuotedAttributeValue === !0 ? "'" : DU.attributeWrapSign, A.onTag = A.onTag || DU.onTag, A.onTagAttr = A.onTagAttr || DU.onTagAttr, A.onIgnoreTag = A.onIgnoreTag || DU.onIgnoreTag, A.onIgnoreTagAttr = A.onIgnoreTagAttr || DU.onIgnoreTagAttr, A.safeAttrValue = A.safeAttrValue || DU.safeAttrValue, A.escapeHtml = A.escapeHtml || DU.escapeHtml, this.options = A, A.css === !1) this.cssFilter = !1;
        else A.css = A.css || {}, this.cssFilter = new rY8(A.css)
    }
    tSB.prototype.process = function(A) {
        if (A = A || "", A = A.toString(), !A) return "";
        var B = this,
            Q = B.options,
            Z = Q.whiteList,
            D = Q.onTag,
            G = Q.onIgnoreTag,
            F = Q.onTagAttr,
            I = Q.onIgnoreTagAttr,
            Y = Q.safeAttrValue,
            W = Q.escapeHtml,
            J = B.attributeWrapSign,
            X = B.cssFilter;
        if (Q.stripBlankChar) A = DU.stripBlankChar(A);
        if (!Q.allowCommentTag) A = DU.stripCommentTag(A);
        var V = !1;
        if (Q.stripIgnoreTagBody) V = DU.StripTagBody(Q.stripIgnoreTagBody, G), G = V.onIgnoreTag;
        var C = oY8(A, function(K, H, z, $, L) {
            var N = {
                    sourcePosition: K,
                    position: H,
                    isClosing: L,
                    isWhite: Object.prototype.hasOwnProperty.call(Z, z)
                },
                R = D(z, $, N);
            if (!_b1(R)) return R;
            if (N.isWhite) {
                if (N.isClosing) return "</" + z + ">";
                var O = eY8($),
                    P = Z[z],
                    j = tY8(O.html, function(f, k) {
                        var c = xb1.indexOf(P, f) !== -1,
                            u = F(z, f, k, c);
                        if (!_b1(u)) return u;
                        if (c)
                            if (k = Y(z, f, k, X), k) return f + "=" + J + k + J;
                            else return f;
                        else {
                            if (u = I(z, f, k, c), !_b1(u)) return u;
                            return
                        }
                    });
                if ($ = "<" + z, j) $ += " " + j;
                if (O.closing) $ += " /";
                return $ += ">", $
            } else {
                if (R = G(z, $, N), !_b1(R)) return R;
                return W($)
            }
        }, W);
        if (V) C = V.remove(C);
        return C
    };
    eSB.exports = tSB
});
var GjB = E((H01, vb1) => {
    var BjB = GL0(),
        QjB = FL0(),
        ZjB = AjB();

    function DjB(A, B) {
        var Q = new ZjB(B);
        return Q.process(A)
    }
    H01 = vb1.exports = DjB;
    H01.filterXSS = DjB;
    H01.FilterXSS = ZjB;
    (function() {
        for (var A in BjB) H01[A] = BjB[A];
        for (var B in QjB) H01[B] = QjB[B]
    })();
    if (typeof window !== "undefined") window.filterXSS = vb1.exports;

    function QW8() {
        return typeof self !== "undefined" && typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope
    }
    if (QW8()) self.filterXSS = vb1.exports
});
var j01 = E((OR3, TyB) => {
    TyB.exports = Pd;
    Pd.CAPTURING_PHASE = 1;
    Pd.AT_TARGET = 2;
    Pd.BUBBLING_PHASE = 3;

    function Pd(A, B) {
        if (this.type = "", this.target = null, this.currentTarget = null, this.eventPhase = Pd.AT_TARGET, this.bubbles = !1, this.cancelable = !1, this.isTrusted = !1, this.defaultPrevented = !1, this.timeStamp = Date.now(), this._propagationStopped = !1, this._immediatePropagationStopped = !1, this._initialized = !0, this._dispatching = !1, A) this.type = A;
        if (B)
            for (var Q in B) this[Q] = B[Q]
    }
    Pd.prototype = Object.create(Object.prototype, {
        constructor: {
            value: Pd
        },
        stopPropagation: {
            value: function A() {
                this._propagationStopped = !0
            }
        },
        stopImmediatePropagation: {
            value: function A() {
                this._propagationStopped = !0, this._immediatePropagationStopped = !0
            }
        },
        preventDefault: {
            value: function A() {
                if (this.cancelable) this.defaultPrevented = !0
            }
        },
        initEvent: {
            value: function A(B, Q, Z) {
                if (this._initialized = !0, this._dispatching) return;
                this._propagationStopped = !1, this._immediatePropagationStopped = !1, this.defaultPrevented = !1, this.isTrusted = !1, this.target = null, this.type = B, this.bubbles = Q, this.cancelable = Z
            }
        }
    })
});
var nL0 = E((TR3, SyB) => {
    var PyB = j01();
    SyB.exports = iL0;

    function iL0() {
        PyB.call(this), this.view = null, this.detail = 0
    }
    iL0.prototype = Object.create(PyB.prototype, {
        constructor: {
            value: iL0
        },
        initUIEvent: {
            value: function(A, B, Q, Z, D) {
                this.initEvent(A, B, Q), this.view = Z, this.detail = D
            }
        }
    })
});
var sL0 = E((PR3, kyB) => {
    var jyB = nL0();
    kyB.exports = aL0;

    function aL0() {
        jyB.call(this), this.screenX = this.screenY = this.clientX = this.clientY = 0, this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1, this.button = 0, this.buttons = 1, this.relatedTarget = null
    }
    aL0.prototype = Object.create(jyB.prototype, {
        constructor: {
            value: aL0
        },
        initMouseEvent: {
            value: function(A, B, Q, Z, D, G, F, I, Y, W, J, X, V, C, K) {
                switch (this.initEvent(A, B, Q, Z, D), this.screenX = G, this.screenY = F, this.clientX = I, this.clientY = Y, this.ctrlKey = W, this.altKey = J, this.shiftKey = X, this.metaKey = V, this.button = C, C) {
                    case 0:
                        this.buttons = 1;
                        break;
                    case 1:
                        this.buttons = 4;
                        break;
                    case 2:
                        this.buttons = 2;
                        break;
                    default:
                        this.buttons = 0;
                        break
                }
                this.relatedTarget = K
            }
        },
        getModifierState: {
            value: function(A) {
                switch (A) {
                    case "Alt":
                        return this.altKey;
                    case "Control":
                        return this.ctrlKey;
                    case "Shift":
                        return this.shiftKey;
                    case "Meta":
                        return this.metaKey;
                    default:
                        return !1
                }
            }
        }
    })
});