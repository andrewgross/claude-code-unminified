/* chunk:359 bytes:[8472834, 8488196) size:15362 source:unpacked-cli.js */
var T9B = E((rM6) => {
    var i71 = f71().NAMESPACE,
        NC0 = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
        $9B = new RegExp("[\\-\\.0-9" + NC0.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
        q9B = new RegExp("^" + NC0.source + $9B.source + "*(?::" + NC0.source + $9B.source + "*)?$"),
        c71 = 0,
        Rx = 1,
        Fe = 2,
        l71 = 3,
        Ie = 4,
        Ye = 5,
        p71 = 6,
        iS1 = 7;

    function We(A, B) {
        if (this.message = A, this.locator = B, Error.captureStackTrace) Error.captureStackTrace(this, We)
    }
    We.prototype = new Error;
    We.prototype.name = We.name;

    function M9B() {}
    M9B.prototype = {
        parse: function(A, B, Q) {
            var Z = this.domBuilder;
            Z.startDocument(), R9B(B, B = {}), cM6(A, B, Q, Z, this.errorHandler), Z.endDocument()
        }
    };

    function cM6(A, B, Q, Z, D) {
        function G(E1) {
            if (E1 > 65535) {
                E1 -= 65536;
                var C1 = 55296 + (E1 >> 10),
                    _1 = 56320 + (E1 & 1023);
                return String.fromCharCode(C1, _1)
            } else return String.fromCharCode(E1)
        }

        function F(E1) {
            var C1 = E1.slice(1, -1);
            if (Object.hasOwnProperty.call(Q, C1)) return Q[C1];
            else if (C1.charAt(0) === "#") return G(parseInt(C1.substr(1).replace("x", "0x")));
            else return D.error("entity not found:" + E1), E1
        }

        function I(E1) {
            if (E1 > H) {
                var C1 = A.substring(H, E1).replace(/&#?\w+;/g, F);
                V && Y(H), Z.characters(C1, 0, E1 - H), H = E1
            }
        }

        function Y(E1, C1) {
            while (E1 >= J && (C1 = X.exec(A))) W = C1.index, J = W + C1[0].length, V.lineNumber++;
            V.columnNumber = E1 - W + 1
        }
        var W = 0,
            J = 0,
            X = /.*(?:\r\n?|\n)|.*$/g,
            V = Z.locator,
            C = [{
                currentNSMap: B
            }],
            K = {},
            H = 0;
        while (!0) {
            try {
                var z = A.indexOf("<", H);
                if (z < 0) {
                    if (!A.substr(H).match(/^\s*$/)) {
                        var $ = Z.doc,
                            L = $.createTextNode(A.substr(H));
                        $.appendChild(L), Z.currentElement = L
                    }
                    return
                }
                if (z > H) I(z);
                switch (A.charAt(z + 1)) {
                    case "/":
                        var u = A.indexOf(">", z + 3),
                            N = A.substring(z + 2, u).replace(/[ \t\n\r]+$/g, ""),
                            R = C.pop();
                        if (u < 0) N = A.substring(z + 2).replace(/[\s<].*/, ""), D.error("end tag name: " + N + " is not complete:" + R.tagName), u = z + 1 + N.length;
                        else if (N.match(/\s</)) N = N.replace(/[\s<].*/, ""), D.error("end tag name: " + N + " maybe not complete"), u = z + 1 + N.length;
                        var O = R.localNSMap,
                            P = R.tagName == N,
                            j = P || R.tagName && R.tagName.toLowerCase() == N.toLowerCase();
                        if (j) {
                            if (Z.endElement(R.uri, R.localName, N), O) {
                                for (var f in O)
                                    if (Object.prototype.hasOwnProperty.call(O, f)) Z.endPrefixMapping(f)
                            }
                            if (!P) D.fatalError("end tag name: " + N + " is not match the current start tagName:" + R.tagName)
                        } else C.push(R);
                        u++;
                        break;
                    case "?":
                        V && Y(z), u = aM6(A, z, Z);
                        break;
                    case "!":
                        V && Y(z), u = nM6(A, z, Z, D);
                        break;
                    default:
                        V && Y(z);
                        var k = new O9B,
                            c = C[C.length - 1].currentNSMap,
                            u = lM6(A, z, k, c, F, D),
                            a = k.length;
                        if (!k.closed && iM6(A, u, k.tagName, K)) {
                            if (k.closed = !0, !Q.nbsp) D.warning("unclosed xml attribute")
                        }
                        if (V && a) {
                            var l = N9B(V, {});
                            for (var y = 0; y < a; y++) {
                                var t = k[y];
                                Y(t.offset), t.locator = N9B(V, {})
                            }
                            if (Z.locator = l, L9B(k, Z, c)) C.push(k);
                            Z.locator = V
                        } else if (L9B(k, Z, c)) C.push(k);
                        if (i71.isHTML(k.uri) && !k.closed) u = pM6(A, u, k.tagName, F, Z);
                        else u++
                }
            } catch (E1) {
                if (E1 instanceof We) throw E1;
                D.error("element parse error: " + E1), u = -1
            }
            if (u > H) H = u;
            else I(Math.max(z, H) + 1)
        }
    }

    function N9B(A, B) {
        return B.lineNumber = A.lineNumber, B.columnNumber = A.columnNumber, B
    }

    function lM6(A, B, Q, Z, D, G) {
        function F(C, K, H) {
            if (Q.attributeNames.hasOwnProperty(C)) G.fatalError("Attribute " + C + " redefined");
            Q.addValue(C, K.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, D), H)
        }
        var I, Y, W = ++B,
            J = c71;
        while (!0) {
            var X = A.charAt(W);
            switch (X) {
                case "=":
                    if (J === Rx) I = A.slice(B, W), J = l71;
                    else if (J === Fe) J = l71;
                    else throw new Error("attribute equal must after attrName");
                    break;
                case "'":
                case '"':
                    if (J === l71 || J === Rx) {
                        if (J === Rx) G.warning('attribute value must after "="'), I = A.slice(B, W);
                        if (B = W + 1, W = A.indexOf(X, B), W > 0) Y = A.slice(B, W), F(I, Y, B - 1), J = Ye;
                        else throw new Error("attribute value no end '" + X + "' match")
                    } else if (J == Ie) Y = A.slice(B, W), F(I, Y, B), G.warning('attribute "' + I + '" missed start quot(' + X + ")!!"), B = W + 1, J = Ye;
                    else throw new Error('attribute value must after "="');
                    break;
                case "/":
                    switch (J) {
                        case c71:
                            Q.setTagName(A.slice(B, W));
                        case Ye:
                        case p71:
                        case iS1:
                            J = iS1, Q.closed = !0;
                        case Ie:
                        case Rx:
                            break;
                        case Fe:
                            Q.closed = !0;
                            break;
                        default:
                            throw new Error("attribute invalid close char('/')")
                    }
                    break;
                case "":
                    if (G.error("unexpected end of input"), J == c71) Q.setTagName(A.slice(B, W));
                    return W;
                case ">":
                    switch (J) {
                        case c71:
                            Q.setTagName(A.slice(B, W));
                        case Ye:
                        case p71:
                        case iS1:
                            break;
                        case Ie:
                        case Rx:
                            if (Y = A.slice(B, W), Y.slice(-1) === "/") Q.closed = !0, Y = Y.slice(0, -1);
                        case Fe:
                            if (J === Fe) Y = I;
                            if (J == Ie) G.warning('attribute "' + Y + '" missed quot(")!'), F(I, Y, B);
                            else {
                                if (!i71.isHTML(Z[""]) || !Y.match(/^(?:disabled|checked|selected)$/i)) G.warning('attribute "' + Y + '" missed value!! "' + Y + '" instead!!');
                                F(Y, Y, B)
                            }
                            break;
                        case l71:
                            throw new Error("attribute value missed!!")
                    }
                    return W;
                case "":
                    X = " ";
                default:
                    if (X <= " ") switch (J) {
                        case c71:
                            Q.setTagName(A.slice(B, W)), J = p71;
                            break;
                        case Rx:
                            I = A.slice(B, W), J = Fe;
                            break;
                        case Ie:
                            var Y = A.slice(B, W);
                            G.warning('attribute "' + Y + '" missed quot(")!!'), F(I, Y, B);
                        case Ye:
                            J = p71;
                            break
                    } else switch (J) {
                        case Fe:
                            var V = Q.tagName;
                            if (!i71.isHTML(Z[""]) || !I.match(/^(?:disabled|checked|selected)$/i)) G.warning('attribute "' + I + '" missed value!! "' + I + '" instead2!!');
                            F(I, I, B), B = W, J = Rx;
                            break;
                        case Ye:
                            G.warning('attribute space is required"' + I + '"!!');
                        case p71:
                            J = Rx, B = W;
                            break;
                        case l71:
                            J = Ie, B = W;
                            break;
                        case iS1:
                            throw new Error("elements closed character '/' and '>' must be connected to")
                    }
            }
            W++
        }
    }

    function L9B(A, B, Q) {
        var Z = A.tagName,
            D = null,
            X = A.length;
        while (X--) {
            var G = A[X],
                F = G.qName,
                I = G.value,
                V = F.indexOf(":");
            if (V > 0) var Y = G.prefix = F.slice(0, V),
                W = F.slice(V + 1),
                J = Y === "xmlns" && W;
            else W = F, Y = null, J = F === "xmlns" && "";
            if (G.localName = W, J !== !1) {
                if (D == null) D = {}, R9B(Q, Q = {});
                Q[J] = D[J] = I, G.uri = i71.XMLNS, B.startPrefixMapping(J, I)
            }
        }
        var X = A.length;
        while (X--) {
            G = A[X];
            var Y = G.prefix;
            if (Y) {
                if (Y === "xml") G.uri = i71.XML;
                if (Y !== "xmlns") G.uri = Q[Y || ""]
            }
        }
        var V = Z.indexOf(":");
        if (V > 0) Y = A.prefix = Z.slice(0, V), W = A.localName = Z.slice(V + 1);
        else Y = null, W = A.localName = Z;
        var C = A.uri = Q[Y || ""];
        if (B.startElement(C, W, Z, A), A.closed) {
            if (B.endElement(C, W, Z), D) {
                for (Y in D)
                    if (Object.prototype.hasOwnProperty.call(D, Y)) B.endPrefixMapping(Y)
            }
        } else return A.currentNSMap = Q, A.localNSMap = D, !0
    }

    function pM6(A, B, Q, Z, D) {
        if (/^(?:script|textarea)$/i.test(Q)) {
            var G = A.indexOf("</" + Q + ">", B),
                F = A.substring(B + 1, G);
            if (/[&<]/.test(F)) {
                if (/^script$/i.test(Q)) return D.characters(F, 0, F.length), G;
                return F = F.replace(/&#?\w+;/g, Z), D.characters(F, 0, F.length), G
            }
        }
        return B + 1
    }

    function iM6(A, B, Q, Z) {
        var D = Z[Q];
        if (D == null) {
            if (D = A.lastIndexOf("</" + Q + ">"), D < B) D = A.lastIndexOf("</" + Q);
            Z[Q] = D
        }
        return D < B
    }

    function R9B(A, B) {
        for (var Q in A)
            if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q]
    }

    function nM6(A, B, Q, Z) {
        var D = A.charAt(B + 2);
        switch (D) {
            case "-":
                if (A.charAt(B + 3) === "-") {
                    var G = A.indexOf("-->", B + 4);
                    if (G > B) return Q.comment(A, B + 4, G - B - 4), G + 3;
                    else return Z.error("Unclosed comment"), -1
                } else return -1;
            default:
                if (A.substr(B + 3, 6) == "CDATA[") {
                    var G = A.indexOf("]]>", B + 9);
                    return Q.startCDATA(), Q.characters(A, B + 9, G - B - 9), Q.endCDATA(), G + 3
                }
                var F = sM6(A, B),
                    I = F.length;
                if (I > 1 && /!doctype/i.test(F[0][0])) {
                    var Y = F[1][0],
                        W = !1,
                        J = !1;
                    if (I > 3) {
                        if (/^public$/i.test(F[2][0])) W = F[3][0], J = I > 4 && F[4][0];
                        else if (/^system$/i.test(F[2][0])) J = F[3][0]
                    }
                    var X = F[I - 1];
                    return Q.startDTD(Y, W, J), Q.endDTD(), X.index + X[0].length
                }
        }
        return -1
    }

    function aM6(A, B, Q) {
        var Z = A.indexOf("?>", B);
        if (Z) {
            var D = A.substring(B, Z).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
            if (D) {
                var G = D[0].length;
                return Q.processingInstruction(D[1], D[2]), Z + 2
            } else return -1
        }
        return -1
    }

    function O9B() {
        this.attributeNames = {}
    }
    O9B.prototype = {
        setTagName: function(A) {
            if (!q9B.test(A)) throw new Error("invalid tagName:" + A);
            this.tagName = A
        },
        addValue: function(A, B, Q) {
            if (!q9B.test(A)) throw new Error("invalid attribute:" + A);
            this.attributeNames[A] = this.length, this[this.length++] = {
                qName: A,
                value: B,
                offset: Q
            }
        },
        length: 0,
        getLocalName: function(A) {
            return this[A].localName
        },
        getLocator: function(A) {
            return this[A].locator
        },
        getQName: function(A) {
            return this[A].qName
        },
        getURI: function(A) {
            return this[A].uri
        },
        getValue: function(A) {
            return this[A].value
        }
    };

    function sM6(A, B) {
        var Q, Z = [],
            D = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
        D.lastIndex = B, D.exec(A);
        while (Q = D.exec(A))
            if (Z.push(Q), Q[1]) return Z
    }
    rM6.XMLReader = M9B;
    rM6.ParseError = We
});