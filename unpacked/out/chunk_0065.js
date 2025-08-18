/* chunk:65 bytes:[1529158, 1547704) size:18546 source:unpacked-cli.js */
var gQA = E((o15, hQA) => {
    var bQA = vK1(),
        R91 = kQA(),
        Kn9 = _QA(),
        Hn9 = vQA();
    class fQA {
        constructor(A) {
            this.options = A, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
                apos: {
                    regex: /&(apos|#39|#x27);/g,
                    val: "'"
                },
                gt: {
                    regex: /&(gt|#62|#x3E);/g,
                    val: ">"
                },
                lt: {
                    regex: /&(lt|#60|#x3C);/g,
                    val: "<"
                },
                quot: {
                    regex: /&(quot|#34|#x22);/g,
                    val: '"'
                }
            }, this.ampEntity = {
                regex: /&(amp|#38|#x26);/g,
                val: "&"
            }, this.htmlEntities = {
                space: {
                    regex: /&(nbsp|#160);/g,
                    val: " "
                },
                cent: {
                    regex: /&(cent|#162);/g,
                    val: "¢"
                },
                pound: {
                    regex: /&(pound|#163);/g,
                    val: "£"
                },
                yen: {
                    regex: /&(yen|#165);/g,
                    val: "¥"
                },
                euro: {
                    regex: /&(euro|#8364);/g,
                    val: "€"
                },
                copyright: {
                    regex: /&(copy|#169);/g,
                    val: "©"
                },
                reg: {
                    regex: /&(reg|#174);/g,
                    val: "®"
                },
                inr: {
                    regex: /&(inr|#8377);/g,
                    val: "₹"
                },
                num_dec: {
                    regex: /&#([0-9]{1,7});/g,
                    val: (B, Q) => String.fromCharCode(Number.parseInt(Q, 10))
                },
                num_hex: {
                    regex: /&#x([0-9a-fA-F]{1,6});/g,
                    val: (B, Q) => String.fromCharCode(Number.parseInt(Q, 16))
                }
            }, this.addExternalEntities = zn9, this.parseXml = qn9, this.parseTextData = En9, this.resolveNameSpace = Un9, this.buildAttributesMap = $n9, this.isItStopNode = Rn9, this.replaceEntitiesValue = Ln9, this.readStopNodeData = Tn9, this.saveTextToParentTag = Mn9, this.addChild = Nn9
        }
    }

    function zn9(A) {
        let B = Object.keys(A);
        for (let Q = 0; Q < B.length; Q++) {
            let Z = B[Q];
            this.lastEntities[Z] = {
                regex: new RegExp("&" + Z + ";", "g"),
                val: A[Z]
            }
        }
    }

    function En9(A, B, Q, Z, D, G, F) {
        if (A !== void 0) {
            if (this.options.trimValues && !Z) A = A.trim();
            if (A.length > 0) {
                if (!F) A = this.replaceEntitiesValue(A);
                let I = this.options.tagValueProcessor(B, A, Q, D, G);
                if (I === null || I === void 0) return A;
                else if (typeof I !== typeof A || I !== A) return I;
                else if (this.options.trimValues) return ba1(A, this.options.parseTagValue, this.options.numberParseOptions);
                else if (A.trim() === A) return ba1(A, this.options.parseTagValue, this.options.numberParseOptions);
                else return A
            }
        }
    }

    function Un9(A) {
        if (this.options.removeNSPrefix) {
            let B = A.split(":"),
                Q = A.charAt(0) === "/" ? "/" : "";
            if (B[0] === "xmlns") return "";
            if (B.length === 2) A = Q + B[1]
        }
        return A
    }
    var wn9 = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");

    function $n9(A, B, Q) {
        if (!this.options.ignoreAttributes && typeof A === "string") {
            let Z = bQA.getAllMatches(A, wn9),
                D = Z.length,
                G = {};
            for (let F = 0; F < D; F++) {
                let I = this.resolveNameSpace(Z[F][1]),
                    Y = Z[F][4],
                    W = this.options.attributeNamePrefix + I;
                if (I.length) {
                    if (this.options.transformAttributeName) W = this.options.transformAttributeName(W);
                    if (W === "__proto__") W = "#__proto__";
                    if (Y !== void 0) {
                        if (this.options.trimValues) Y = Y.trim();
                        Y = this.replaceEntitiesValue(Y);
                        let J = this.options.attributeValueProcessor(I, Y, B);
                        if (J === null || J === void 0) G[W] = Y;
                        else if (typeof J !== typeof Y || J !== Y) G[W] = J;
                        else G[W] = ba1(Y, this.options.parseAttributeValue, this.options.numberParseOptions)
                    } else if (this.options.allowBooleanAttributes) G[W] = !0
                }
            }
            if (!Object.keys(G).length) return;
            if (this.options.attributesGroupName) {
                let F = {};
                return F[this.options.attributesGroupName] = G, F
            }
            return G
        }
    }
    var qn9 = function(A) {
        A = A.replace(/\r\n?/g, `
`);
        let B = new R91("!xml"),
            Q = B,
            Z = "",
            D = "";
        for (let G = 0; G < A.length; G++)
            if (A[G] === "<")
                if (A[G + 1] === "/") {
                    let I = Lh(A, ">", G, "Closing Tag is not closed."),
                        Y = A.substring(G + 2, I).trim();
                    if (this.options.removeNSPrefix) {
                        let X = Y.indexOf(":");
                        if (X !== -1) Y = Y.substr(X + 1)
                    }
                    if (this.options.transformTagName) Y = this.options.transformTagName(Y);
                    if (Q) Z = this.saveTextToParentTag(Z, Q, D);
                    let W = D.substring(D.lastIndexOf(".") + 1);
                    if (Y && this.options.unpairedTags.indexOf(Y) !== -1) throw new Error(`Unpaired tag can not be used as closing tag: </${Y}>`);
                    let J = 0;
                    if (W && this.options.unpairedTags.indexOf(W) !== -1) J = D.lastIndexOf(".", D.lastIndexOf(".") - 1), this.tagsNodeStack.pop();
                    else J = D.lastIndexOf(".");
                    D = D.substring(0, J), Q = this.tagsNodeStack.pop(), Z = "", G = I
                } else if (A[G + 1] === "?") {
            let I = va1(A, G, !1, "?>");
            if (!I) throw new Error("Pi Tag is not closed.");
            if (Z = this.saveTextToParentTag(Z, Q, D), this.options.ignoreDeclaration && I.tagName === "?xml" || this.options.ignorePiTags);
            else {
                let Y = new R91(I.tagName);
                if (Y.add(this.options.textNodeName, ""), I.tagName !== I.tagExp && I.attrExpPresent) Y[":@"] = this.buildAttributesMap(I.tagExp, D, I.tagName);
                this.addChild(Q, Y, D)
            }
            G = I.closeIndex + 1
        } else if (A.substr(G + 1, 3) === "!--") {
            let I = Lh(A, "-->", G + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
                let Y = A.substring(G + 4, I - 2);
                Z = this.saveTextToParentTag(Z, Q, D), Q.add(this.options.commentPropName, [{
                    [this.options.textNodeName]: Y
                }])
            }
            G = I
        } else if (A.substr(G + 1, 2) === "!D") {
            let I = Kn9(A, G);
            this.docTypeEntities = I.entities, G = I.i
        } else if (A.substr(G + 1, 2) === "![") {
            let I = Lh(A, "]]>", G, "CDATA is not closed.") - 2,
                Y = A.substring(G + 9, I);
            Z = this.saveTextToParentTag(Z, Q, D);
            let W = this.parseTextData(Y, Q.tagname, D, !0, !1, !0, !0);
            if (W == null) W = "";
            if (this.options.cdataPropName) Q.add(this.options.cdataPropName, [{
                [this.options.textNodeName]: Y
            }]);
            else Q.add(this.options.textNodeName, W);
            G = I + 2
        } else {
            let I = va1(A, G, this.options.removeNSPrefix),
                Y = I.tagName,
                W = I.rawTagName,
                J = I.tagExp,
                X = I.attrExpPresent,
                V = I.closeIndex;
            if (this.options.transformTagName) Y = this.options.transformTagName(Y);
            if (Q && Z) {
                if (Q.tagname !== "!xml") Z = this.saveTextToParentTag(Z, Q, D, !1)
            }
            let C = Q;
            if (C && this.options.unpairedTags.indexOf(C.tagname) !== -1) Q = this.tagsNodeStack.pop(), D = D.substring(0, D.lastIndexOf("."));
            if (Y !== B.tagname) D += D ? "." + Y : Y;
            if (this.isItStopNode(this.options.stopNodes, D, Y)) {
                let K = "";
                if (J.length > 0 && J.lastIndexOf("/") === J.length - 1) {
                    if (Y[Y.length - 1] === "/") Y = Y.substr(0, Y.length - 1), D = D.substr(0, D.length - 1), J = Y;
                    else J = J.substr(0, J.length - 1);
                    G = I.closeIndex
                } else if (this.options.unpairedTags.indexOf(Y) !== -1) G = I.closeIndex;
                else {
                    let z = this.readStopNodeData(A, W, V + 1);
                    if (!z) throw new Error(`Unexpected end of ${W}`);
                    G = z.i, K = z.tagContent
                }
                let H = new R91(Y);
                if (Y !== J && X) H[":@"] = this.buildAttributesMap(J, D, Y);
                if (K) K = this.parseTextData(K, Y, D, !0, X, !0, !0);
                D = D.substr(0, D.lastIndexOf(".")), H.add(this.options.textNodeName, K), this.addChild(Q, H, D)
            } else {
                if (J.length > 0 && J.lastIndexOf("/") === J.length - 1) {
                    if (Y[Y.length - 1] === "/") Y = Y.substr(0, Y.length - 1), D = D.substr(0, D.length - 1), J = Y;
                    else J = J.substr(0, J.length - 1);
                    if (this.options.transformTagName) Y = this.options.transformTagName(Y);
                    let K = new R91(Y);
                    if (Y !== J && X) K[":@"] = this.buildAttributesMap(J, D, Y);
                    this.addChild(Q, K, D), D = D.substr(0, D.lastIndexOf("."))
                } else {
                    let K = new R91(Y);
                    if (this.tagsNodeStack.push(Q), Y !== J && X) K[":@"] = this.buildAttributesMap(J, D, Y);
                    this.addChild(Q, K, D), Q = K
                }
                Z = "", G = V
            }
        } else Z += A[G];
        return B.child
    };

    function Nn9(A, B, Q) {
        let Z = this.options.updateTag(B.tagname, Q, B[":@"]);
        if (Z === !1);
        else if (typeof Z === "string") B.tagname = Z, A.addChild(B);
        else A.addChild(B)
    }
    var Ln9 = function(A) {
        if (this.options.processEntities) {
            for (let B in this.docTypeEntities) {
                let Q = this.docTypeEntities[B];
                A = A.replace(Q.regx, Q.val)
            }
            for (let B in this.lastEntities) {
                let Q = this.lastEntities[B];
                A = A.replace(Q.regex, Q.val)
            }
            if (this.options.htmlEntities)
                for (let B in this.htmlEntities) {
                    let Q = this.htmlEntities[B];
                    A = A.replace(Q.regex, Q.val)
                }
            A = A.replace(this.ampEntity.regex, this.ampEntity.val)
        }
        return A
    };

    function Mn9(A, B, Q, Z) {
        if (A) {
            if (Z === void 0) Z = Object.keys(B.child).length === 0;
            if (A = this.parseTextData(A, B.tagname, Q, !1, B[":@"] ? Object.keys(B[":@"]).length !== 0 : !1, Z), A !== void 0 && A !== "") B.add(this.options.textNodeName, A);
            A = ""
        }
        return A
    }

    function Rn9(A, B, Q) {
        let Z = "*." + Q;
        for (let D in A) {
            let G = A[D];
            if (Z === G || B === G) return !0
        }
        return !1
    }

    function On9(A, B, Q = ">") {
        let Z, D = "";
        for (let G = B; G < A.length; G++) {
            let F = A[G];
            if (Z) {
                if (F === Z) Z = ""
            } else if (F === '"' || F === "'") Z = F;
            else if (F === Q[0])
                if (Q[1]) {
                    if (A[G + 1] === Q[1]) return {
                        data: D,
                        index: G
                    }
                } else return {
                    data: D,
                    index: G
                };
            else if (F === "\t") F = " ";
            D += F
        }
    }

    function Lh(A, B, Q, Z) {
        let D = A.indexOf(B, Q);
        if (D === -1) throw new Error(Z);
        else return D + B.length - 1
    }

    function va1(A, B, Q, Z = ">") {
        let D = On9(A, B + 1, Z);
        if (!D) return;
        let {
            data: G,
            index: F
        } = D, I = G.search(/\s/), Y = G, W = !0;
        if (I !== -1) Y = G.substring(0, I), G = G.substring(I + 1).trimStart();
        let J = Y;
        if (Q) {
            let X = Y.indexOf(":");
            if (X !== -1) Y = Y.substr(X + 1), W = Y !== D.data.substr(X + 1)
        }
        return {
            tagName: Y,
            tagExp: G,
            closeIndex: F,
            attrExpPresent: W,
            rawTagName: J
        }
    }

    function Tn9(A, B, Q) {
        let Z = Q,
            D = 1;
        for (; Q < A.length; Q++)
            if (A[Q] === "<")
                if (A[Q + 1] === "/") {
                    let G = Lh(A, ">", Q, `${B} is not closed`);
                    if (A.substring(Q + 2, G).trim() === B) {
                        if (D--, D === 0) return {
                            tagContent: A.substring(Z, Q),
                            i: G
                        }
                    }
                    Q = G
                } else if (A[Q + 1] === "?") Q = Lh(A, "?>", Q + 1, "StopNode is not closed.");
        else if (A.substr(Q + 1, 3) === "!--") Q = Lh(A, "-->", Q + 3, "StopNode is not closed.");
        else if (A.substr(Q + 1, 2) === "![") Q = Lh(A, "]]>", Q, "StopNode is not closed.") - 2;
        else {
            let G = va1(A, Q, ">");
            if (G) {
                if ((G && G.tagName) === B && G.tagExp[G.tagExp.length - 1] !== "/") D++;
                Q = G.closeIndex
            }
        }
    }

    function ba1(A, B, Q) {
        if (B && typeof A === "string") {
            let Z = A.trim();
            if (Z === "true") return !0;
            else if (Z === "false") return !1;
            else return Hn9(A, Q)
        } else if (bQA.isExist(A)) return A;
        else return ""
    }
    hQA.exports = fQA
});
var mQA = E((yn9) => {
    function Pn9(A, B) {
        return uQA(A, B)
    }

    function uQA(A, B, Q) {
        let Z, D = {};
        for (let G = 0; G < A.length; G++) {
            let F = A[G],
                I = Sn9(F),
                Y = "";
            if (Q === void 0) Y = I;
            else Y = Q + "." + I;
            if (I === B.textNodeName)
                if (Z === void 0) Z = F[I];
                else Z += "" + F[I];
            else if (I === void 0) continue;
            else if (F[I]) {
                let W = uQA(F[I], B, Y),
                    J = kn9(W, B);
                if (F[":@"]) jn9(W, F[":@"], Y, B);
                else if (Object.keys(W).length === 1 && W[B.textNodeName] !== void 0 && !B.alwaysCreateTextNode) W = W[B.textNodeName];
                else if (Object.keys(W).length === 0)
                    if (B.alwaysCreateTextNode) W[B.textNodeName] = "";
                    else W = "";
                if (D[I] !== void 0 && D.hasOwnProperty(I)) {
                    if (!Array.isArray(D[I])) D[I] = [D[I]];
                    D[I].push(W)
                } else if (B.isArray(I, Y, J)) D[I] = [W];
                else D[I] = W
            }
        }
        if (typeof Z === "string") {
            if (Z.length > 0) D[B.textNodeName] = Z
        } else if (Z !== void 0) D[B.textNodeName] = Z;
        return D
    }

    function Sn9(A) {
        let B = Object.keys(A);
        for (let Q = 0; Q < B.length; Q++) {
            let Z = B[Q];
            if (Z !== ":@") return Z
        }
    }

    function jn9(A, B, Q, Z) {
        if (B) {
            let D = Object.keys(B),
                G = D.length;
            for (let F = 0; F < G; F++) {
                let I = D[F];
                if (Z.isArray(I, Q + "." + I, !0, !0)) A[I] = [B[I]];
                else A[I] = B[I]
            }
        }
    }

    function kn9(A, B) {
        let {
            textNodeName: Q
        } = B, Z = Object.keys(A).length;
        if (Z === 0) return !0;
        if (Z === 1 && (A[Q] || typeof A[Q] === "boolean" || A[Q] === 0)) return !0;
        return !1
    }
    yn9.prettify = Pn9
});
var lQA = E((e15, cQA) => {
    var {
        buildOptions: xn9
    } = PQA(), vn9 = gQA(), {
        prettify: bn9
    } = mQA(), fn9 = xa1();
    class dQA {
        constructor(A) {
            this.externalEntities = {}, this.options = xn9(A)
        }
        parse(A, B) {
            if (typeof A === "string");
            else if (A.toString) A = A.toString();
            else throw new Error("XML data is accepted in String or Bytes[] form.");
            if (B) {
                if (B === !0) B = {};
                let D = fn9.validate(A, B);
                if (D !== !0) throw Error(`${D.err.msg}:${D.err.line}:${D.err.col}`)
            }
            let Q = new vn9(this.options);
            Q.addExternalEntities(this.externalEntities);
            let Z = Q.parseXml(A);
            if (this.options.preserveOrder || Z === void 0) return Z;
            else return bn9(Z, this.options)
        }
        addEntity(A, B) {
            if (B.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
            else if (A.indexOf("&") !== -1 || A.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
            else if (B === "&") throw new Error("An entity with value '&' is not permitted");
            else this.externalEntities[A] = B
        }
    }
    cQA.exports = dQA
});