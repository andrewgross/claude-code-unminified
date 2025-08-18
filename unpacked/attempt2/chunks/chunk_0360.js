/* chunk:360 bytes:[8488197, 8505633) size:17436 source:unpacked-cli.js */
var x9B = E((GR6) => {
    var eM6 = f71(),
        AR6 = qC0(),
        P9B = w9B(),
        k9B = T9B(),
        BR6 = AR6.DOMImplementation,
        S9B = eM6.NAMESPACE,
        QR6 = k9B.ParseError,
        ZR6 = k9B.XMLReader;

    function y9B(A) {
        return A.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`)
    }

    function _9B(A) {
        this.options = A || {
            locator: {}
        }
    }
    _9B.prototype.parseFromString = function(A, B) {
        var Q = this.options,
            Z = new ZR6,
            D = Q.domBuilder || new n71,
            G = Q.errorHandler,
            F = Q.locator,
            I = Q.xmlns || {},
            Y = /\/x?html?$/.test(B),
            W = Y ? P9B.HTML_ENTITIES : P9B.XML_ENTITIES;
        if (F) D.setDocumentLocator(F);
        if (Z.errorHandler = DR6(G, D, F), Z.domBuilder = Q.domBuilder || D, Y) I[""] = S9B.HTML;
        I.xml = I.xml || S9B.XML;
        var J = Q.normalizeLineEndings || y9B;
        if (A && typeof A === "string") Z.parse(J(A), I, W);
        else Z.errorHandler.error("invalid doc source");
        return D.doc
    };

    function DR6(A, B, Q) {
        if (!A) {
            if (B instanceof n71) return B;
            A = B
        }
        var Z = {},
            D = A instanceof Function;
        Q = Q || {};

        function G(F) {
            var I = A[F];
            if (!I && D) I = A.length == 2 ? function(Y) {
                A(F, Y)
            } : A;
            Z[F] = I && function(Y) {
                I("[xmldom " + F + "]	" + Y + LC0(Q))
            } || function() {}
        }
        return G("warning"), G("error"), G("fatalError"), Z
    }

    function n71() {
        this.cdata = !1
    }

    function Je(A, B) {
        B.lineNumber = A.lineNumber, B.columnNumber = A.columnNumber
    }
    n71.prototype = {
        startDocument: function() {
            if (this.doc = new BR6().createDocument(null, null, null), this.locator) this.doc.documentURI = this.locator.systemId
        },
        startElement: function(A, B, Q, Z) {
            var D = this.doc,
                G = D.createElementNS(A, Q || B),
                F = Z.length;
            nS1(this, G), this.currentElement = G, this.locator && Je(this.locator, G);
            for (var I = 0; I < F; I++) {
                var A = Z.getURI(I),
                    Y = Z.getValue(I),
                    Q = Z.getQName(I),
                    W = D.createAttributeNS(A, Q);
                this.locator && Je(Z.getLocator(I), W), W.value = W.nodeValue = Y, G.setAttributeNode(W)
            }
        },
        endElement: function(A, B, Q) {
            var Z = this.currentElement,
                D = Z.tagName;
            this.currentElement = Z.parentNode
        },
        startPrefixMapping: function(A, B) {},
        endPrefixMapping: function(A) {},
        processingInstruction: function(A, B) {
            var Q = this.doc.createProcessingInstruction(A, B);
            this.locator && Je(this.locator, Q), nS1(this, Q)
        },
        ignorableWhitespace: function(A, B, Q) {},
        characters: function(A, B, Q) {
            if (A = j9B.apply(this, arguments), A) {
                if (this.cdata) var Z = this.doc.createCDATASection(A);
                else var Z = this.doc.createTextNode(A);
                if (this.currentElement) this.currentElement.appendChild(Z);
                else if (/^\s*$/.test(A)) this.doc.appendChild(Z);
                this.locator && Je(this.locator, Z)
            }
        },
        skippedEntity: function(A) {},
        endDocument: function() {
            this.doc.normalize()
        },
        setDocumentLocator: function(A) {
            if (this.locator = A) A.lineNumber = 0
        },
        comment: function(A, B, Q) {
            A = j9B.apply(this, arguments);
            var Z = this.doc.createComment(A);
            this.locator && Je(this.locator, Z), nS1(this, Z)
        },
        startCDATA: function() {
            this.cdata = !0
        },
        endCDATA: function() {
            this.cdata = !1
        },
        startDTD: function(A, B, Q) {
            var Z = this.doc.implementation;
            if (Z && Z.createDocumentType) {
                var D = Z.createDocumentType(A, B, Q);
                this.locator && Je(this.locator, D), nS1(this, D), this.doc.doctype = D
            }
        },
        warning: function(A) {
            console.warn("[xmldom warning]	" + A, LC0(this.locator))
        },
        error: function(A) {
            console.error("[xmldom error]	" + A, LC0(this.locator))
        },
        fatalError: function(A) {
            throw new QR6(A, this.locator)
        }
    };

    function LC0(A) {
        if (A) return `
@` + (A.systemId || "") + "#[line:" + A.lineNumber + ",col:" + A.columnNumber + "]"
    }

    function j9B(A, B, Q) {
        if (typeof A == "string") return A.substr(B, Q);
        else {
            if (A.length >= B + Q || B) return new java.lang.String(A, B, Q) + "";
            return A
        }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(A) {
        n71.prototype[A] = function() {
            return null
        }
    });

    function nS1(A, B) {
        if (!A.currentElement) A.doc.appendChild(B);
        else A.currentElement.appendChild(B)
    }
    GR6.__DOMHandler = n71;
    GR6.normalizeLineEndings = y9B;
    GR6.DOMParser = _9B
});
var b9B = E((WR6) => {
    var v9B = qC0();
    WR6.DOMImplementation = v9B.DOMImplementation;
    WR6.XMLSerializer = v9B.XMLSerializer;
    WR6.DOMParser = x9B().DOMParser
});
var h9B = E((zR6) => {
    var {
        DOMParser: CR6
    } = b9B();
    zR6.parse = HR6;
    var aS1 = 3,
        f9B = 4,
        KR6 = 8;

    function MC0(A) {
        return A.nodeType === aS1 || A.nodeType === KR6 || A.nodeType === f9B
    }

    function fP(A) {
        if (!A.childNodes || A.childNodes.length === 0) return !0;
        else return !1
    }

    function Om(A, B) {
        if (!A) throw new Error(B)
    }

    function HR6(A) {
        var B = new CR6().parseFromString(A);
        Om(B.documentElement.nodeName === "plist", "malformed document. First element should be <plist>");
        var Q = Xe(B.documentElement);
        if (Q.length == 1) Q = Q[0];
        return Q
    }

    function Xe(A) {
        var B, Q, Z, D, G, F, I, Y;
        if (!A) return null;
        if (A.nodeName === "plist") {
            if (G = [], fP(A)) return G;
            for (B = 0; B < A.childNodes.length; B++)
                if (!MC0(A.childNodes[B])) G.push(Xe(A.childNodes[B]));
            return G
        } else if (A.nodeName === "dict") {
            if (Q = {}, Z = null, I = 0, fP(A)) return Q;
            for (B = 0; B < A.childNodes.length; B++) {
                if (MC0(A.childNodes[B])) continue;
                if (I % 2 === 0) Om(A.childNodes[B].nodeName === "key", "Missing key while parsing <dict/>."), Z = Xe(A.childNodes[B]);
                else Om(A.childNodes[B].nodeName !== "key", 'Unexpected key "' + Xe(A.childNodes[B]) + '" while parsing <dict/>.'), Q[Z] = Xe(A.childNodes[B]);
                I += 1
            }
            if (I % 2 === 1) Q[Z] = "";
            return Q
        } else if (A.nodeName === "array") {
            if (G = [], fP(A)) return G;
            for (B = 0; B < A.childNodes.length; B++)
                if (!MC0(A.childNodes[B])) {
                    if (F = Xe(A.childNodes[B]), F != null) G.push(F)
                } return G
        } else if (A.nodeName === "#text");
        else if (A.nodeName === "key") {
            if (fP(A)) return "";
            return Om(A.childNodes[0].nodeValue !== "__proto__", "__proto__ keys can lead to prototype pollution. More details on CVE-2022-22912"), A.childNodes[0].nodeValue
        } else if (A.nodeName === "string") {
            if (F = "", fP(A)) return F;
            for (B = 0; B < A.childNodes.length; B++) {
                var Y = A.childNodes[B].nodeType;
                if (Y === aS1 || Y === f9B) F += A.childNodes[B].nodeValue
            }
            return F
        } else if (A.nodeName === "integer") return Om(!fP(A), 'Cannot parse "" as integer.'), parseInt(A.childNodes[0].nodeValue, 10);
        else if (A.nodeName === "real") {
            Om(!fP(A), 'Cannot parse "" as real.'), F = "";
            for (B = 0; B < A.childNodes.length; B++)
                if (A.childNodes[B].nodeType === aS1) F += A.childNodes[B].nodeValue;
            return parseFloat(F)
        } else if (A.nodeName === "data") {
            if (F = "", fP(A)) return Buffer.from(F, "base64");
            for (B = 0; B < A.childNodes.length; B++)
                if (A.childNodes[B].nodeType === aS1) F += A.childNodes[B].nodeValue.replace(/\s+/g, "");
            return Buffer.from(F, "base64")
        } else if (A.nodeName === "date") return Om(!fP(A), 'Cannot parse "" as Date.'), new Date(A.childNodes[0].nodeValue);
        else if (A.nodeName === "null") return null;
        else if (A.nodeName === "true") return !0;
        else if (A.nodeName === "false") return !1;
        else throw new Error("Invalid PLIST tag " + A.nodeName)
    }
});
var TC0 = E((RR6) => {
    RR6.byteLength = wR6;
    RR6.toByteArray = qR6;
    RR6.fromByteArray = MR6;
    var wM = [],
        _E = [],
        UR6 = typeof Uint8Array !== "undefined" ? Uint8Array : Array,
        RC0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (Ox = 0, OC0 = RC0.length; Ox < OC0; ++Ox) wM[Ox] = RC0[Ox], _E[RC0.charCodeAt(Ox)] = Ox;
    var Ox, OC0;
    _E[45] = 62;
    _E[95] = 63;

    function g9B(A) {
        var B = A.length;
        if (B % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var Q = A.indexOf("=");
        if (Q === -1) Q = B;
        var Z = Q === B ? 0 : 4 - Q % 4;
        return [Q, Z]
    }

    function wR6(A) {
        var B = g9B(A),
            Q = B[0],
            Z = B[1];
        return (Q + Z) * 3 / 4 - Z
    }

    function $R6(A, B, Q) {
        return (B + Q) * 3 / 4 - Q
    }

    function qR6(A) {
        var B, Q = g9B(A),
            Z = Q[0],
            D = Q[1],
            G = new UR6($R6(A, Z, D)),
            F = 0,
            I = D > 0 ? Z - 4 : Z,
            Y;
        for (Y = 0; Y < I; Y += 4) B = _E[A.charCodeAt(Y)] << 18 | _E[A.charCodeAt(Y + 1)] << 12 | _E[A.charCodeAt(Y + 2)] << 6 | _E[A.charCodeAt(Y + 3)], G[F++] = B >> 16 & 255, G[F++] = B >> 8 & 255, G[F++] = B & 255;
        if (D === 2) B = _E[A.charCodeAt(Y)] << 2 | _E[A.charCodeAt(Y + 1)] >> 4, G[F++] = B & 255;
        if (D === 1) B = _E[A.charCodeAt(Y)] << 10 | _E[A.charCodeAt(Y + 1)] << 4 | _E[A.charCodeAt(Y + 2)] >> 2, G[F++] = B >> 8 & 255, G[F++] = B & 255;
        return G
    }

    function NR6(A) {
        return wM[A >> 18 & 63] + wM[A >> 12 & 63] + wM[A >> 6 & 63] + wM[A & 63]
    }

    function LR6(A, B, Q) {
        var Z, D = [];
        for (var G = B; G < Q; G += 3) Z = (A[G] << 16 & 16711680) + (A[G + 1] << 8 & 65280) + (A[G + 2] & 255), D.push(NR6(Z));
        return D.join("")
    }

    function MR6(A) {
        var B, Q = A.length,
            Z = Q % 3,
            D = [],
            G = 16383;
        for (var F = 0, I = Q - Z; F < I; F += G) D.push(LR6(A, F, F + G > I ? I : F + G));
        if (Z === 1) B = A[Q - 1], D.push(wM[B >> 2] + wM[B << 4 & 63] + "==");
        else if (Z === 2) B = (A[Q - 2] << 8) + A[Q - 1], D.push(wM[B >> 10] + wM[B >> 4 & 63] + wM[B << 2 & 63] + "=");
        return D.join("")
    }
});
var $M = E((u9B, Tx) => {
    (function() {
        var A, B, Q, Z, D, G, F, I = {}.hasOwnProperty;
        A = function(Y, ...W) {
            var J, X, V, C;
            if (D(Object.assign)) Object.assign.apply(null, arguments);
            else
                for (J = 0, V = W.length; J < V; J++)
                    if (C = W[J], C != null)
                        for (X in C) {
                            if (!I.call(C, X)) continue;
                            Y[X] = C[X]
                        }
            return Y
        }, D = function(Y) {
            return !!Y && Object.prototype.toString.call(Y) === "[object Function]"
        }, G = function(Y) {
            var W;
            return !!Y && ((W = typeof Y) === "function" || W === "object")
        }, Q = function(Y) {
            if (D(Array.isArray)) return Array.isArray(Y);
            else return Object.prototype.toString.call(Y) === "[object Array]"
        }, Z = function(Y) {
            var W;
            if (Q(Y)) return !Y.length;
            else {
                for (W in Y) {
                    if (!I.call(Y, W)) continue;
                    return !1
                }
                return !0
            }
        }, F = function(Y) {
            var W, J;
            return G(Y) && (J = Object.getPrototypeOf(Y)) && (W = J.constructor) && typeof W === "function" && W instanceof W && Function.prototype.toString.call(W) === Function.prototype.toString.call(Object)
        }, B = function(Y) {
            if (D(Y.valueOf)) return Y.valueOf();
            else return Y
        }, u9B.assign = A, u9B.isFunction = D, u9B.isObject = G, u9B.isArray = Q, u9B.isEmpty = Z, u9B.isPlainObject = F, u9B.getValue = B
    }).call(u9B)
});
var PC0 = E((m9B, d9B) => {
    (function() {
        var A;
        d9B.exports = A = class B {
            hasFeature(Q, Z) {
                return !0
            }
            createDocumentType(Q, Z, D) {
                throw new Error("This DOM method is not implemented.")
            }
            createDocument(Q, Z, D) {
                throw new Error("This DOM method is not implemented.")
            }
            createHTMLDocument(Q) {
                throw new Error("This DOM method is not implemented.")
            }
            getFeature(Q, Z) {
                throw new Error("This DOM method is not implemented.")
            }
        }
    }).call(m9B)
});
var p9B = E((c9B, l9B) => {
    (function() {
        var A;
        l9B.exports = A = class B {
            constructor() {}
            handleError(Q) {
                throw new Error(Q)
            }
        }
    }).call(c9B)
});
var a9B = E((i9B, n9B) => {
    (function() {
        var A;
        n9B.exports = A = function() {
            class B {
                constructor(Q) {
                    this.arr = Q || []
                }
                item(Q) {
                    return this.arr[Q] || null
                }
                contains(Q) {
                    return this.arr.indexOf(Q) !== -1
                }
            }
            return Object.defineProperty(B.prototype, "length", {
                get: function() {
                    return this.arr.length
                }
            }), B
        }.call(this)
    }).call(i9B)
});
var o9B = E((s9B, r9B) => {
    (function() {
        var A, B, Q;
        B = p9B(), Q = a9B(), r9B.exports = A = function() {
            class Z {
                constructor() {
                    var D;
                    this.defaultParams = {
                        "canonical-form": !1,
                        "cdata-sections": !1,
                        comments: !1,
                        "datatype-normalization": !1,
                        "element-content-whitespace": !0,
                        entities: !0,
                        "error-handler": new B,
                        infoset: !0,
                        "validate-if-schema": !1,
                        namespaces: !0,
                        "namespace-declarations": !0,
                        "normalize-characters": !1,
                        "schema-location": "",
                        "schema-type": "",
                        "split-cdata-sections": !0,
                        validate: !1,
                        "well-formed": !0
                    }, this.params = D = Object.create(this.defaultParams)
                }
                getParameter(D) {
                    if (this.params.hasOwnProperty(D)) return this.params[D];
                    else return null
                }
                canSetParameter(D, G) {
                    return !0
                }
                setParameter(D, G) {
                    if (G != null) return this.params[D] = G;
                    else return delete this.params[D]
                }
            }
            return Object.defineProperty(Z.prototype, "parameterNames", {
                get: function() {
                    return new Q(Object.keys(this.defaultParams))
                }
            }), Z
        }.call(this)
    }).call(s9B)
});
var zG = E((t9B, e9B) => {
    (function() {
        e9B.exports = {
            Element: 1,
            Attribute: 2,
            Text: 3,
            CData: 4,
            EntityReference: 5,
            EntityDeclaration: 6,
            ProcessingInstruction: 7,
            Comment: 8,
            Document: 9,
            DocType: 10,
            DocumentFragment: 11,
            NotationDeclaration: 12,
            Declaration: 201,
            Raw: 202,
            AttributeDeclaration: 203,
            ElementDeclaration: 204,
            Dummy: 205
        }
    }).call(t9B)
});