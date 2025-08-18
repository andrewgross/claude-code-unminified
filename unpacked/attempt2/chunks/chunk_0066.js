/* chunk:66 bytes:[1547705, 1563023) size:15318 source:unpacked-cli.js */
var sQA = E((A05, aQA) => {
    function hn9(A, B) {
        let Q = "";
        if (B.format && B.indentBy.length > 0) Q = `
`;
        return iQA(A, B, "", Q)
    }

    function iQA(A, B, Q, Z) {
        let D = "",
            G = !1;
        for (let F = 0; F < A.length; F++) {
            let I = A[F],
                Y = gn9(I);
            if (Y === void 0) continue;
            let W = "";
            if (Q.length === 0) W = Y;
            else W = `${Q}.${Y}`;
            if (Y === B.textNodeName) {
                let K = I[Y];
                if (!un9(W, B)) K = B.tagValueProcessor(Y, K), K = nQA(K, B);
                if (G) D += Z;
                D += K, G = !1;
                continue
            } else if (Y === B.cdataPropName) {
                if (G) D += Z;
                D += `<![CDATA[${I[Y][0][B.textNodeName]}]]>`, G = !1;
                continue
            } else if (Y === B.commentPropName) {
                D += Z + `<!--${I[Y][0][B.textNodeName]}-->`, G = !0;
                continue
            } else if (Y[0] === "?") {
                let K = pQA(I[":@"], B),
                    H = Y === "?xml" ? "" : Z,
                    z = I[Y][0][B.textNodeName];
                z = z.length !== 0 ? " " + z : "", D += H + `<${Y}${z}${K}?>`, G = !0;
                continue
            }
            let J = Z;
            if (J !== "") J += B.indentBy;
            let X = pQA(I[":@"], B),
                V = Z + `<${Y}${X}`,
                C = iQA(I[Y], B, W, J);
            if (B.unpairedTags.indexOf(Y) !== -1)
                if (B.suppressUnpairedNode) D += V + ">";
                else D += V + "/>";
            else if ((!C || C.length === 0) && B.suppressEmptyNode) D += V + "/>";
            else if (C && C.endsWith(">")) D += V + `>${C}${Z}</${Y}>`;
            else {
                if (D += V + ">", C && Z !== "" && (C.includes("/>") || C.includes("</"))) D += Z + B.indentBy + C + Z;
                else D += C;
                D += `</${Y}>`
            }
            G = !0
        }
        return D
    }

    function gn9(A) {
        let B = Object.keys(A);
        for (let Q = 0; Q < B.length; Q++) {
            let Z = B[Q];
            if (!A.hasOwnProperty(Z)) continue;
            if (Z !== ":@") return Z
        }
    }

    function pQA(A, B) {
        let Q = "";
        if (A && !B.ignoreAttributes)
            for (let Z in A) {
                if (!A.hasOwnProperty(Z)) continue;
                let D = B.attributeValueProcessor(Z, A[Z]);
                if (D = nQA(D, B), D === !0 && B.suppressBooleanAttributes) Q += ` ${Z.substr(B.attributeNamePrefix.length)}`;
                else Q += ` ${Z.substr(B.attributeNamePrefix.length)}="${D}"`
            }
        return Q
    }

    function un9(A, B) {
        A = A.substr(0, A.length - B.textNodeName.length - 1);
        let Q = A.substr(A.lastIndexOf(".") + 1);
        for (let Z in B.stopNodes)
            if (B.stopNodes[Z] === A || B.stopNodes[Z] === "*." + Q) return !0;
        return !1
    }

    function nQA(A, B) {
        if (A && A.length > 0 && B.processEntities)
            for (let Q = 0; Q < B.entities.length; Q++) {
                let Z = B.entities[Q];
                A = A.replace(Z.regex, Z.val)
            }
        return A
    }
    aQA.exports = hn9
});
var oQA = E((B05, rQA) => {
    var mn9 = sQA(),
        dn9 = {
            attributeNamePrefix: "@_",
            attributesGroupName: !1,
            textNodeName: "#text",
            ignoreAttributes: !0,
            cdataPropName: !1,
            format: !1,
            indentBy: "  ",
            suppressEmptyNode: !1,
            suppressUnpairedNode: !0,
            suppressBooleanAttributes: !0,
            tagValueProcessor: function(A, B) {
                return B
            },
            attributeValueProcessor: function(A, B) {
                return B
            },
            preserveOrder: !1,
            commentPropName: !1,
            unpairedTags: [],
            entities: [{
                regex: new RegExp("&", "g"),
                val: "&amp;"
            }, {
                regex: new RegExp(">", "g"),
                val: "&gt;"
            }, {
                regex: new RegExp("<", "g"),
                val: "&lt;"
            }, {
                regex: new RegExp("'", "g"),
                val: "&apos;"
            }, {
                regex: new RegExp('"', "g"),
                val: "&quot;"
            }],
            processEntities: !0,
            stopNodes: [],
            oneListGroup: !1
        };

    function Mk(A) {
        if (this.options = Object.assign({}, dn9, A), this.options.ignoreAttributes || this.options.attributesGroupName) this.isAttribute = function() {
            return !1
        };
        else this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = pn9;
        if (this.processTextOrObjNode = cn9, this.options.format) this.indentate = ln9, this.tagEndChar = `>
`, this.newLine = `
`;
        else this.indentate = function() {
            return ""
        }, this.tagEndChar = ">", this.newLine = ""
    }
    Mk.prototype.build = function(A) {
        if (this.options.preserveOrder) return mn9(A, this.options);
        else {
            if (Array.isArray(A) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) A = {
                [this.options.arrayNodeName]: A
            };
            return this.j2x(A, 0).val
        }
    };
    Mk.prototype.j2x = function(A, B) {
        let Q = "",
            Z = "";
        for (let D in A) {
            if (!Object.prototype.hasOwnProperty.call(A, D)) continue;
            if (typeof A[D] === "undefined") {
                if (this.isAttribute(D)) Z += ""
            } else if (A[D] === null)
                if (this.isAttribute(D)) Z += "";
                else if (D[0] === "?") Z += this.indentate(B) + "<" + D + "?" + this.tagEndChar;
            else Z += this.indentate(B) + "<" + D + "/" + this.tagEndChar;
            else if (A[D] instanceof Date) Z += this.buildTextValNode(A[D], D, "", B);
            else if (typeof A[D] !== "object") {
                let G = this.isAttribute(D);
                if (G) Q += this.buildAttrPairStr(G, "" + A[D]);
                else if (D === this.options.textNodeName) {
                    let F = this.options.tagValueProcessor(D, "" + A[D]);
                    Z += this.replaceEntitiesValue(F)
                } else Z += this.buildTextValNode(A[D], D, "", B)
            } else if (Array.isArray(A[D])) {
                let G = A[D].length,
                    F = "",
                    I = "";
                for (let Y = 0; Y < G; Y++) {
                    let W = A[D][Y];
                    if (typeof W === "undefined");
                    else if (W === null)
                        if (D[0] === "?") Z += this.indentate(B) + "<" + D + "?" + this.tagEndChar;
                        else Z += this.indentate(B) + "<" + D + "/" + this.tagEndChar;
                    else if (typeof W === "object")
                        if (this.options.oneListGroup) {
                            let J = this.j2x(W, B + 1);
                            if (F += J.val, this.options.attributesGroupName && W.hasOwnProperty(this.options.attributesGroupName)) I += J.attrStr
                        } else F += this.processTextOrObjNode(W, D, B);
                    else if (this.options.oneListGroup) {
                        let J = this.options.tagValueProcessor(D, W);
                        J = this.replaceEntitiesValue(J), F += J
                    } else F += this.buildTextValNode(W, D, "", B)
                }
                if (this.options.oneListGroup) F = this.buildObjectNode(F, D, I, B);
                Z += F
            } else if (this.options.attributesGroupName && D === this.options.attributesGroupName) {
                let G = Object.keys(A[D]),
                    F = G.length;
                for (let I = 0; I < F; I++) Q += this.buildAttrPairStr(G[I], "" + A[D][G[I]])
            } else Z += this.processTextOrObjNode(A[D], D, B)
        }
        return {
            attrStr: Q,
            val: Z
        }
    };
    Mk.prototype.buildAttrPairStr = function(A, B) {
        if (B = this.options.attributeValueProcessor(A, "" + B), B = this.replaceEntitiesValue(B), this.options.suppressBooleanAttributes && B === "true") return " " + A;
        else return " " + A + '="' + B + '"'
    };

    function cn9(A, B, Q) {
        let Z = this.j2x(A, Q + 1);
        if (A[this.options.textNodeName] !== void 0 && Object.keys(A).length === 1) return this.buildTextValNode(A[this.options.textNodeName], B, Z.attrStr, Q);
        else return this.buildObjectNode(Z.val, B, Z.attrStr, Q)
    }
    Mk.prototype.buildObjectNode = function(A, B, Q, Z) {
        if (A === "")
            if (B[0] === "?") return this.indentate(Z) + "<" + B + Q + "?" + this.tagEndChar;
            else return this.indentate(Z) + "<" + B + Q + this.closeTag(B) + this.tagEndChar;
        else {
            let D = "</" + B + this.tagEndChar,
                G = "";
            if (B[0] === "?") G = "?", D = "";
            if ((Q || Q === "") && A.indexOf("<") === -1) return this.indentate(Z) + "<" + B + Q + G + ">" + A + D;
            else if (this.options.commentPropName !== !1 && B === this.options.commentPropName && G.length === 0) return this.indentate(Z) + `<!--${A}-->` + this.newLine;
            else return this.indentate(Z) + "<" + B + Q + G + this.tagEndChar + A + this.indentate(Z) + D
        }
    };
    Mk.prototype.closeTag = function(A) {
        let B = "";
        if (this.options.unpairedTags.indexOf(A) !== -1) {
            if (!this.options.suppressUnpairedNode) B = "/"
        } else if (this.options.suppressEmptyNode) B = "/";
        else B = `></${A}`;
        return B
    };
    Mk.prototype.buildTextValNode = function(A, B, Q, Z) {
        if (this.options.cdataPropName !== !1 && B === this.options.cdataPropName) return this.indentate(Z) + `<![CDATA[${A}]]>` + this.newLine;
        else if (this.options.commentPropName !== !1 && B === this.options.commentPropName) return this.indentate(Z) + `<!--${A}-->` + this.newLine;
        else if (B[0] === "?") return this.indentate(Z) + "<" + B + Q + "?" + this.tagEndChar;
        else {
            let D = this.options.tagValueProcessor(B, A);
            if (D = this.replaceEntitiesValue(D), D === "") return this.indentate(Z) + "<" + B + Q + this.closeTag(B) + this.tagEndChar;
            else return this.indentate(Z) + "<" + B + Q + ">" + D + "</" + B + this.tagEndChar
        }
    };
    Mk.prototype.replaceEntitiesValue = function(A) {
        if (A && A.length > 0 && this.options.processEntities)
            for (let B = 0; B < this.options.entities.length; B++) {
                let Q = this.options.entities[B];
                A = A.replace(Q.regex, Q.val)
            }
        return A
    };

    function ln9(A) {
        return this.options.indentBy.repeat(A)
    }

    function pn9(A) {
        if (A.startsWith(this.options.attributeNamePrefix) && A !== this.options.textNodeName) return A.substr(this.attrPrefixLen);
        else return !1
    }
    rQA.exports = Mk
});
var $N = E((Q05, tQA) => {
    var in9 = xa1(),
        nn9 = lQA(),
        an9 = oQA();
    tQA.exports = {
        XMLParser: nn9,
        XMLValidator: in9,
        XMLBuilder: an9
    }
});
var O91 = E((Z05, Z4A) => {
    var {
        defineProperty: bK1,
        getOwnPropertyDescriptor: sn9,
        getOwnPropertyNames: rn9
    } = Object, on9 = Object.prototype.hasOwnProperty, fK1 = (A, B) => bK1(A, "name", {
        value: B,
        configurable: !0
    }), tn9 = (A, B) => {
        for (var Q in B) bK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, en9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of rn9(B))
                if (!on9.call(A, D) && D !== Q) bK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = sn9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Aa9 = (A) => en9(bK1({}, "__esModule", {
        value: !0
    }), A), eQA = {};
    tn9(eQA, {
        XmlNode: () => Ba9,
        XmlText: () => Q4A
    });
    Z4A.exports = Aa9(eQA);

    function A4A(A) {
        return A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }
    fK1(A4A, "escapeAttribute");

    function B4A(A) {
        return A.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;")
    }
    fK1(B4A, "escapeElement");
    var Q4A = class {
            constructor(A) {
                this.value = A
            }
            static {
                fK1(this, "XmlText")
            }
            toString() {
                return B4A("" + this.value)
            }
        },
        Ba9 = class A {
            constructor(B, Q = []) {
                this.name = B, this.children = Q
            }
            static {
                fK1(this, "XmlNode")
            }
            attributes = {};
            static of (B, Q, Z) {
                let D = new A(B);
                if (Q !== void 0) D.addChildNode(new Q4A(Q));
                if (Z !== void 0) D.withName(Z);
                return D
            }
            withName(B) {
                return this.name = B, this
            }
            addAttribute(B, Q) {
                return this.attributes[B] = Q, this
            }
            addChildNode(B) {
                return this.children.push(B), this
            }
            removeAttribute(B) {
                return delete this.attributes[B], this
            }
            n(B) {
                return this.name = B, this
            }
            c(B) {
                return this.children.push(B), this
            }
            a(B, Q) {
                if (Q != null) this.attributes[B] = Q;
                return this
            }
            cc(B, Q, Z = Q) {
                if (B[Q] != null) {
                    let D = A.of(Q, B[Q]).withName(Z);
                    this.c(D)
                }
            }
            l(B, Q, Z, D) {
                if (B[Q] != null) D().map((F) => {
                    F.withName(Z), this.c(F)
                })
            }
            lc(B, Q, Z, D) {
                if (B[Q] != null) {
                    let G = D(),
                        F = new A(Z);
                    G.map((I) => {
                        F.c(I)
                    }), this.c(F)
                }
            }
            toString() {
                let B = Boolean(this.children.length),
                    Q = `<${this.name}`,
                    Z = this.attributes;
                for (let D of Object.keys(Z)) {
                    let G = Z[D];
                    if (G != null) Q += ` ${D}="${A4A(""+G)}"`
                }
                return Q += !B ? "/>" : `>${this.children.map((D)=>D.toString()).join("")}</${this.name}>`
            }
        }
});