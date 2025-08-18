/* chunk:64 bytes:[1512864, 1529157) size:16293 source:unpacked-cli.js */
var xa1 = E((ai9) => {
    var _a1 = vK1(),
        gi9 = {
            allowBooleanAttributes: !1,
            unpairedTags: []
        };
    ai9.validate = function(A, B) {
        B = Object.assign({}, gi9, B);
        let Q = [],
            Z = !1,
            D = !1;
        if (A[0] === "\uFEFF") A = A.substr(1);
        for (let G = 0; G < A.length; G++)
            if (A[G] === "<" && A[G + 1] === "?") {
                if (G += 2, G = MQA(A, G), G.err) return G
            } else if (A[G] === "<") {
            let F = G;
            if (G++, A[G] === "!") {
                G = RQA(A, G);
                continue
            } else {
                let I = !1;
                if (A[G] === "/") I = !0, G++;
                let Y = "";
                for (; G < A.length && A[G] !== ">" && A[G] !== " " && A[G] !== "\t" && A[G] !== `
` && A[G] !== "\r"; G++) Y += A[G];
                if (Y = Y.trim(), Y[Y.length - 1] === "/") Y = Y.substring(0, Y.length - 1), G--;
                if (!ni9(Y)) {
                    let X;
                    if (Y.trim().length === 0) X = "Invalid space after '<'.";
                    else X = "Tag '" + Y + "' is an invalid name.";
                    return nD("InvalidTag", X, lJ(A, G))
                }
                let W = di9(A, G);
                if (W === !1) return nD("InvalidAttr", "Attributes for '" + Y + "' have open quote.", lJ(A, G));
                let J = W.value;
                if (G = W.index, J[J.length - 1] === "/") {
                    let X = G - J.length;
                    J = J.substring(0, J.length - 1);
                    let V = OQA(J, B);
                    if (V === !0) Z = !0;
                    else return nD(V.err.code, V.err.msg, lJ(A, X + V.err.line))
                } else if (I)
                    if (!W.tagClosed) return nD("InvalidTag", "Closing tag '" + Y + "' doesn't have proper closing.", lJ(A, G));
                    else if (J.trim().length > 0) return nD("InvalidTag", "Closing tag '" + Y + "' can't have attributes or invalid starting.", lJ(A, F));
                else if (Q.length === 0) return nD("InvalidTag", "Closing tag '" + Y + "' has not been opened.", lJ(A, F));
                else {
                    let X = Q.pop();
                    if (Y !== X.tagName) {
                        let V = lJ(A, X.tagStartPos);
                        return nD("InvalidTag", "Expected closing tag '" + X.tagName + "' (opened in line " + V.line + ", col " + V.col + ") instead of closing tag '" + Y + "'.", lJ(A, F))
                    }
                    if (Q.length == 0) D = !0
                } else {
                    let X = OQA(J, B);
                    if (X !== !0) return nD(X.err.code, X.err.msg, lJ(A, G - J.length + X.err.line));
                    if (D === !0) return nD("InvalidXml", "Multiple possible root nodes found.", lJ(A, G));
                    else if (B.unpairedTags.indexOf(Y) !== -1);
                    else Q.push({
                        tagName: Y,
                        tagStartPos: F
                    });
                    Z = !0
                }
                for (G++; G < A.length; G++)
                    if (A[G] === "<")
                        if (A[G + 1] === "!") {
                            G++, G = RQA(A, G);
                            continue
                        } else if (A[G + 1] === "?") {
                    if (G = MQA(A, ++G), G.err) return G
                } else break;
                else if (A[G] === "&") {
                    let X = pi9(A, G);
                    if (X == -1) return nD("InvalidChar", "char '&' is not expected.", lJ(A, G));
                    G = X
                } else if (D === !0 && !LQA(A[G])) return nD("InvalidXml", "Extra text at the end", lJ(A, G));
                if (A[G] === "<") G--
            }
        } else {
            if (LQA(A[G])) continue;
            return nD("InvalidChar", "char '" + A[G] + "' is not expected.", lJ(A, G))
        }
        if (!Z) return nD("InvalidXml", "Start tag expected.", 1);
        else if (Q.length == 1) return nD("InvalidTag", "Unclosed tag '" + Q[0].tagName + "'.", lJ(A, Q[0].tagStartPos));
        else if (Q.length > 0) return nD("InvalidXml", "Invalid '" + JSON.stringify(Q.map((G) => G.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
            line: 1,
            col: 1
        });
        return !0
    };

    function LQA(A) {
        return A === " " || A === "\t" || A === `
` || A === "\r"
    }

    function MQA(A, B) {
        let Q = B;
        for (; B < A.length; B++)
            if (A[B] == "?" || A[B] == " ") {
                let Z = A.substr(Q, B - Q);
                if (B > 5 && Z === "xml") return nD("InvalidXml", "XML declaration allowed only at the start of the document.", lJ(A, B));
                else if (A[B] == "?" && A[B + 1] == ">") {
                    B++;
                    break
                } else continue
            } return B
    }

    function RQA(A, B) {
        if (A.length > B + 5 && A[B + 1] === "-" && A[B + 2] === "-") {
            for (B += 3; B < A.length; B++)
                if (A[B] === "-" && A[B + 1] === "-" && A[B + 2] === ">") {
                    B += 2;
                    break
                }
        } else if (A.length > B + 8 && A[B + 1] === "D" && A[B + 2] === "O" && A[B + 3] === "C" && A[B + 4] === "T" && A[B + 5] === "Y" && A[B + 6] === "P" && A[B + 7] === "E") {
            let Q = 1;
            for (B += 8; B < A.length; B++)
                if (A[B] === "<") Q++;
                else if (A[B] === ">") {
                if (Q--, Q === 0) break
            }
        } else if (A.length > B + 9 && A[B + 1] === "[" && A[B + 2] === "C" && A[B + 3] === "D" && A[B + 4] === "A" && A[B + 5] === "T" && A[B + 6] === "A" && A[B + 7] === "[") {
            for (B += 8; B < A.length; B++)
                if (A[B] === "]" && A[B + 1] === "]" && A[B + 2] === ">") {
                    B += 2;
                    break
                }
        }
        return B
    }
    var ui9 = '"',
        mi9 = "'";

    function di9(A, B) {
        let Q = "",
            Z = "",
            D = !1;
        for (; B < A.length; B++) {
            if (A[B] === ui9 || A[B] === mi9)
                if (Z === "") Z = A[B];
                else if (Z !== A[B]);
            else Z = "";
            else if (A[B] === ">") {
                if (Z === "") {
                    D = !0;
                    break
                }
            }
            Q += A[B]
        }
        if (Z !== "") return !1;
        return {
            value: Q,
            index: B,
            tagClosed: D
        }
    }
    var ci9 = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");

    function OQA(A, B) {
        let Q = _a1.getAllMatches(A, ci9),
            Z = {};
        for (let D = 0; D < Q.length; D++) {
            if (Q[D][1].length === 0) return nD("InvalidAttr", "Attribute '" + Q[D][2] + "' has no space in starting.", M91(Q[D]));
            else if (Q[D][3] !== void 0 && Q[D][4] === void 0) return nD("InvalidAttr", "Attribute '" + Q[D][2] + "' is without value.", M91(Q[D]));
            else if (Q[D][3] === void 0 && !B.allowBooleanAttributes) return nD("InvalidAttr", "boolean attribute '" + Q[D][2] + "' is not allowed.", M91(Q[D]));
            let G = Q[D][2];
            if (!ii9(G)) return nD("InvalidAttr", "Attribute '" + G + "' is an invalid name.", M91(Q[D]));
            if (!Z.hasOwnProperty(G)) Z[G] = 1;
            else return nD("InvalidAttr", "Attribute '" + G + "' is repeated.", M91(Q[D]))
        }
        return !0
    }

    function li9(A, B) {
        let Q = /\d/;
        if (A[B] === "x") B++, Q = /[\da-fA-F]/;
        for (; B < A.length; B++) {
            if (A[B] === ";") return B;
            if (!A[B].match(Q)) break
        }
        return -1
    }

    function pi9(A, B) {
        if (B++, A[B] === ";") return -1;
        if (A[B] === "#") return B++, li9(A, B);
        let Q = 0;
        for (; B < A.length; B++, Q++) {
            if (A[B].match(/\w/) && Q < 20) continue;
            if (A[B] === ";") break;
            return -1
        }
        return B
    }

    function nD(A, B, Q) {
        return {
            err: {
                code: A,
                msg: B,
                line: Q.line || Q,
                col: Q.col
            }
        }
    }

    function ii9(A) {
        return _a1.isName(A)
    }

    function ni9(A) {
        return _a1.isName(A)
    }

    function lJ(A, B) {
        let Q = A.substring(0, B).split(/\r?\n/);
        return {
            line: Q.length,
            col: Q[Q.length - 1].length + 1
        }
    }

    function M91(A) {
        return A.startIndex + A[1].length
    }
});
var PQA = E((oi9) => {
    var TQA = {
            preserveOrder: !1,
            attributeNamePrefix: "@_",
            attributesGroupName: !1,
            textNodeName: "#text",
            ignoreAttributes: !0,
            removeNSPrefix: !1,
            allowBooleanAttributes: !1,
            parseTagValue: !0,
            parseAttributeValue: !1,
            trimValues: !0,
            cdataPropName: !1,
            numberParseOptions: {
                hex: !0,
                leadingZeros: !0,
                eNotation: !0
            },
            tagValueProcessor: function(A, B) {
                return B
            },
            attributeValueProcessor: function(A, B) {
                return B
            },
            stopNodes: [],
            alwaysCreateTextNode: !1,
            isArray: () => !1,
            commentPropName: !1,
            unpairedTags: [],
            processEntities: !0,
            htmlEntities: !1,
            ignoreDeclaration: !1,
            ignorePiTags: !1,
            transformTagName: !1,
            transformAttributeName: !1,
            updateTag: function(A, B, Q) {
                return A
            }
        },
        ri9 = function(A) {
            return Object.assign({}, TQA, A)
        };
    oi9.buildOptions = ri9;
    oi9.defaultOptions = TQA
});
var kQA = E((a15, jQA) => {
    class SQA {
        constructor(A) {
            this.tagname = A, this.child = [], this[":@"] = {}
        }
        add(A, B) {
            if (A === "__proto__") A = "#__proto__";
            this.child.push({
                [A]: B
            })
        }
        addChild(A) {
            if (A.tagname === "__proto__") A.tagname = "#__proto__";
            if (A[":@"] && Object.keys(A[":@"]).length > 0) this.child.push({
                [A.tagname]: A.child,
                [":@"]: A[":@"]
            });
            else this.child.push({
                [A.tagname]: A.child
            })
        }
    }
    jQA.exports = SQA
});
var _QA = E((s15, yQA) => {
    var An9 = vK1();

    function Bn9(A, B) {
        let Q = {};
        if (A[B + 3] === "O" && A[B + 4] === "C" && A[B + 5] === "T" && A[B + 6] === "Y" && A[B + 7] === "P" && A[B + 8] === "E") {
            B = B + 9;
            let Z = 1,
                D = !1,
                G = !1,
                F = "";
            for (; B < A.length; B++)
                if (A[B] === "<" && !G) {
                    if (D && Dn9(A, B)) {
                        if (B += 7, [entityName, val, B] = Qn9(A, B + 1), val.indexOf("&") === -1) Q[Yn9(entityName)] = {
                            regx: RegExp(`&${entityName};`, "g"),
                            val
                        }
                    } else if (D && Gn9(A, B)) B += 8;
                    else if (D && Fn9(A, B)) B += 8;
                    else if (D && In9(A, B)) B += 9;
                    else if (Zn9) G = !0;
                    else throw new Error("Invalid DOCTYPE");
                    Z++, F = ""
                } else if (A[B] === ">") {
                if (G) {
                    if (A[B - 1] === "-" && A[B - 2] === "-") G = !1, Z--
                } else Z--;
                if (Z === 0) break
            } else if (A[B] === "[") D = !0;
            else F += A[B];
            if (Z !== 0) throw new Error("Unclosed DOCTYPE")
        } else throw new Error("Invalid Tag instead of DOCTYPE");
        return {
            entities: Q,
            i: B
        }
    }

    function Qn9(A, B) {
        let Q = "";
        for (; B < A.length && (A[B] !== "'" && A[B] !== '"'); B++) Q += A[B];
        if (Q = Q.trim(), Q.indexOf(" ") !== -1) throw new Error("External entites are not supported");
        let Z = A[B++],
            D = "";
        for (; B < A.length && A[B] !== Z; B++) D += A[B];
        return [Q, D, B]
    }

    function Zn9(A, B) {
        if (A[B + 1] === "!" && A[B + 2] === "-" && A[B + 3] === "-") return !0;
        return !1
    }

    function Dn9(A, B) {
        if (A[B + 1] === "!" && A[B + 2] === "E" && A[B + 3] === "N" && A[B + 4] === "T" && A[B + 5] === "I" && A[B + 6] === "T" && A[B + 7] === "Y") return !0;
        return !1
    }

    function Gn9(A, B) {
        if (A[B + 1] === "!" && A[B + 2] === "E" && A[B + 3] === "L" && A[B + 4] === "E" && A[B + 5] === "M" && A[B + 6] === "E" && A[B + 7] === "N" && A[B + 8] === "T") return !0;
        return !1
    }

    function Fn9(A, B) {
        if (A[B + 1] === "!" && A[B + 2] === "A" && A[B + 3] === "T" && A[B + 4] === "T" && A[B + 5] === "L" && A[B + 6] === "I" && A[B + 7] === "S" && A[B + 8] === "T") return !0;
        return !1
    }

    function In9(A, B) {
        if (A[B + 1] === "!" && A[B + 2] === "N" && A[B + 3] === "O" && A[B + 4] === "T" && A[B + 5] === "A" && A[B + 6] === "T" && A[B + 7] === "I" && A[B + 8] === "O" && A[B + 9] === "N") return !0;
        return !1
    }

    function Yn9(A) {
        if (An9.isName(A)) return A;
        else throw new Error(`Invalid entity name ${A}`)
    }
    yQA.exports = Bn9
});
var vQA = E((r15, xQA) => {
    var Wn9 = /^[-+]?0x[a-fA-F0-9]+$/,
        Jn9 = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) Number.parseInt = window.parseInt;
    if (!Number.parseFloat && window.parseFloat) Number.parseFloat = window.parseFloat;
    var Xn9 = {
        hex: !0,
        leadingZeros: !0,
        decimalPoint: ".",
        eNotation: !0
    };

    function Vn9(A, B = {}) {
        if (B = Object.assign({}, Xn9, B), !A || typeof A !== "string") return A;
        let Q = A.trim();
        if (B.skipLike !== void 0 && B.skipLike.test(Q)) return A;
        else if (B.hex && Wn9.test(Q)) return Number.parseInt(Q, 16);
        else {
            let Z = Jn9.exec(Q);
            if (Z) {
                let D = Z[1],
                    G = Z[2],
                    F = Cn9(Z[3]),
                    I = Z[4] || Z[6];
                if (!B.leadingZeros && G.length > 0 && D && Q[2] !== ".") return A;
                else if (!B.leadingZeros && G.length > 0 && !D && Q[1] !== ".") return A;
                else {
                    let Y = Number(Q),
                        W = "" + Y;
                    if (W.search(/[eE]/) !== -1)
                        if (B.eNotation) return Y;
                        else return A;
                    else if (I)
                        if (B.eNotation) return Y;
                        else return A;
                    else if (Q.indexOf(".") !== -1)
                        if (W === "0" && F === "") return Y;
                        else if (W === F) return Y;
                    else if (D && W === "-" + F) return Y;
                    else return A;
                    if (G)
                        if (F === W) return Y;
                        else if (D + F === W) return Y;
                    else return A;
                    if (Q === W) return Y;
                    else if (Q === D + W) return Y;
                    return A
                }
            } else return A
        }
    }

    function Cn9(A) {
        if (A && A.indexOf(".") !== -1) {
            if (A = A.replace(/0+$/, ""), A === ".") A = "0";
            else if (A[0] === ".") A = "0" + A;
            else if (A[A.length - 1] === ".") A = A.substr(0, A.length - 1);
            return A
        }
        return A
    }
    xQA.exports = Vn9
});