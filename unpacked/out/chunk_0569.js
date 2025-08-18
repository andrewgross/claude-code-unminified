/* chunk:569 bytes:[13266717, 13285139) size:18422 source:unpacked-cli.js */
class qG1 {
    options;
    rules;
    lexer;
    constructor(A) {
        this.options = A || Fd
    }
    space(A) {
        let B = this.rules.block.newline.exec(A);
        if (B && B[0].length > 0) return {
            type: "space",
            raw: B[0]
        }
    }
    code(A) {
        let B = this.rules.block.code.exec(A);
        if (B) {
            let Q = B[0].replace(this.rules.other.codeRemoveIndent, "");
            return {
                type: "code",
                raw: B[0],
                codeBlockStyle: "indented",
                text: !this.options.pedantic ? UG1(Q, `
`) : Q
            }
        }
    }
    fences(A) {
        let B = this.rules.block.fences.exec(A);
        if (B) {
            let Q = B[0],
                Z = A58(Q, B[3] || "", this.rules);
            return {
                type: "code",
                raw: Q,
                lang: B[2] ? B[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : B[2],
                text: Z
            }
        }
    }
    heading(A) {
        let B = this.rules.block.heading.exec(A);
        if (B) {
            let Q = B[2].trim();
            if (this.rules.other.endingHash.test(Q)) {
                let Z = UG1(Q, "#");
                if (this.options.pedantic) Q = Z.trim();
                else if (!Z || this.rules.other.endingSpaceChar.test(Z)) Q = Z.trim()
            }
            return {
                type: "heading",
                raw: B[0],
                depth: B[1].length,
                text: Q,
                tokens: this.lexer.inline(Q)
            }
        }
    }
    hr(A) {
        let B = this.rules.block.hr.exec(A);
        if (B) return {
            type: "hr",
            raw: UG1(B[0], `
`)
        }
    }
    blockquote(A) {
        let B = this.rules.block.blockquote.exec(A);
        if (B) {
            let Q = UG1(B[0], `
`).split(`
`),
                Z = "",
                D = "",
                G = [];
            while (Q.length > 0) {
                let F = !1,
                    I = [],
                    Y;
                for (Y = 0; Y < Q.length; Y++)
                    if (this.rules.other.blockquoteStart.test(Q[Y])) I.push(Q[Y]), F = !0;
                    else if (!F) I.push(Q[Y]);
                else break;
                Q = Q.slice(Y);
                let W = I.join(`
`),
                    J = W.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
                Z = Z ? `${Z}
${W}` : W, D = D ? `${D}
${J}` : J;
                let X = this.lexer.state.top;
                if (this.lexer.state.top = !0, this.lexer.blockTokens(J, G, !0), this.lexer.state.top = X, Q.length === 0) break;
                let V = G.at(-1);
                if (V?.type === "code") break;
                else if (V?.type === "blockquote") {
                    let C = V,
                        K = C.raw + `
` + Q.join(`
`),
                        H = this.blockquote(K);
                    G[G.length - 1] = H, Z = Z.substring(0, Z.length - C.raw.length) + H.raw, D = D.substring(0, D.length - C.text.length) + H.text;
                    break
                } else if (V?.type === "list") {
                    let C = V,
                        K = C.raw + `
` + Q.join(`
`),
                        H = this.list(K);
                    G[G.length - 1] = H, Z = Z.substring(0, Z.length - V.raw.length) + H.raw, D = D.substring(0, D.length - C.raw.length) + H.raw, Q = K.substring(G.at(-1).raw.length).split(`
`);
                    continue
                }
            }
            return {
                type: "blockquote",
                raw: Z,
                tokens: G,
                text: D
            }
        }
    }
    list(A) {
        let B = this.rules.block.list.exec(A);
        if (B) {
            let Q = B[1].trim(),
                Z = Q.length > 1,
                D = {
                    type: "list",
                    raw: "",
                    ordered: Z,
                    start: Z ? +Q.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
            if (Q = Z ? `\\d{1,9}\\${Q.slice(-1)}` : `\\${Q}`, this.options.pedantic) Q = Z ? Q : "[*+-]";
            let G = this.rules.other.listItemRegex(Q),
                F = !1;
            while (A) {
                let Y = !1,
                    W = "",
                    J = "";
                if (!(B = G.exec(A))) break;
                if (this.rules.block.hr.test(A)) break;
                W = B[0], A = A.substring(W.length);
                let X = B[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, ($) => " ".repeat(3 * $.length)),
                    V = A.split(`
`, 1)[0],
                    C = !X.trim(),
                    K = 0;
                if (this.options.pedantic) K = 2, J = X.trimStart();
                else if (C) K = B[1].length + 1;
                else K = B[2].search(this.rules.other.nonSpaceChar), K = K > 4 ? 1 : K, J = X.slice(K), K += B[1].length;
                if (C && this.rules.other.blankLine.test(V)) W += V + `
`, A = A.substring(V.length + 1), Y = !0;
                if (!Y) {
                    let $ = this.rules.other.nextBulletRegex(K),
                        L = this.rules.other.hrRegex(K),
                        N = this.rules.other.fencesBeginRegex(K),
                        R = this.rules.other.headingBeginRegex(K),
                        O = this.rules.other.htmlBeginRegex(K);
                    while (A) {
                        let P = A.split(`
`, 1)[0],
                            j;
                        if (V = P, this.options.pedantic) V = V.replace(this.rules.other.listReplaceNesting, "  "), j = V;
                        else j = V.replace(this.rules.other.tabCharGlobal, "    ");
                        if (N.test(V)) break;
                        if (R.test(V)) break;
                        if (O.test(V)) break;
                        if ($.test(V)) break;
                        if (L.test(V)) break;
                        if (j.search(this.rules.other.nonSpaceChar) >= K || !V.trim()) J += `
` + j.slice(K);
                        else {
                            if (C) break;
                            if (X.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) break;
                            if (N.test(X)) break;
                            if (R.test(X)) break;
                            if (L.test(X)) break;
                            J += `
` + V
                        }
                        if (!C && !V.trim()) C = !0;
                        W += P + `
`, A = A.substring(P.length + 1), X = j.slice(K)
                    }
                }
                if (!D.loose) {
                    if (F) D.loose = !0;
                    else if (this.rules.other.doubleBlankLine.test(W)) F = !0
                }
                let H = null,
                    z;
                if (this.options.gfm) {
                    if (H = this.rules.other.listIsTask.exec(J), H) z = H[0] !== "[ ] ", J = J.replace(this.rules.other.listReplaceTask, "")
                }
                D.items.push({
                    type: "list_item",
                    raw: W,
                    task: !!H,
                    checked: z,
                    loose: !1,
                    text: J,
                    tokens: []
                }), D.raw += W
            }
            let I = D.items.at(-1);
            if (I) I.raw = I.raw.trimEnd(), I.text = I.text.trimEnd();
            else return;
            D.raw = D.raw.trimEnd();
            for (let Y = 0; Y < D.items.length; Y++)
                if (this.lexer.state.top = !1, D.items[Y].tokens = this.lexer.blockTokens(D.items[Y].text, []), !D.loose) {
                    let W = D.items[Y].tokens.filter((X) => X.type === "space"),
                        J = W.length > 0 && W.some((X) => this.rules.other.anyLine.test(X.raw));
                    D.loose = J
                } if (D.loose)
                for (let Y = 0; Y < D.items.length; Y++) D.items[Y].loose = !0;
            return D
        }
    }
    html(A) {
        let B = this.rules.block.html.exec(A);
        if (B) return {
            type: "html",
            block: !0,
            raw: B[0],
            pre: B[1] === "pre" || B[1] === "script" || B[1] === "style",
            text: B[0]
        }
    }
    def(A) {
        let B = this.rules.block.def.exec(A);
        if (B) {
            let Q = B[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "),
                Z = B[2] ? B[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                D = B[3] ? B[3].substring(1, B[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : B[3];
            return {
                type: "def",
                tag: Q,
                raw: B[0],
                href: Z,
                title: D
            }
        }
    }
    table(A) {
        let B = this.rules.block.table.exec(A);
        if (!B) return;
        if (!this.rules.other.tableDelimiter.test(B[2])) return;
        let Q = KRB(B[1]),
            Z = B[2].replace(this.rules.other.tableAlignChars, "").split("|"),
            D = B[3]?.trim() ? B[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [],
            G = {
                type: "table",
                raw: B[0],
                header: [],
                align: [],
                rows: []
            };
        if (Q.length !== Z.length) return;
        for (let F of Z)
            if (this.rules.other.tableAlignRight.test(F)) G.align.push("right");
            else if (this.rules.other.tableAlignCenter.test(F)) G.align.push("center");
        else if (this.rules.other.tableAlignLeft.test(F)) G.align.push("left");
        else G.align.push(null);
        for (let F = 0; F < Q.length; F++) G.header.push({
            text: Q[F],
            tokens: this.lexer.inline(Q[F]),
            header: !0,
            align: G.align[F]
        });
        for (let F of D) G.rows.push(KRB(F, G.header.length).map((I, Y) => {
            return {
                text: I,
                tokens: this.lexer.inline(I),
                header: !1,
                align: G.align[Y]
            }
        }));
        return G
    }
    lheading(A) {
        let B = this.rules.block.lheading.exec(A);
        if (B) return {
            type: "heading",
            raw: B[0],
            depth: B[2].charAt(0) === "=" ? 1 : 2,
            text: B[1],
            tokens: this.lexer.inline(B[1])
        }
    }
    paragraph(A) {
        let B = this.rules.block.paragraph.exec(A);
        if (B) {
            let Q = B[1].charAt(B[1].length - 1) === `
` ? B[1].slice(0, -1) : B[1];
            return {
                type: "paragraph",
                raw: B[0],
                text: Q,
                tokens: this.lexer.inline(Q)
            }
        }
    }
    text(A) {
        let B = this.rules.block.text.exec(A);
        if (B) return {
            type: "text",
            raw: B[0],
            text: B[0],
            tokens: this.lexer.inline(B[0])
        }
    }
    escape(A) {
        let B = this.rules.inline.escape.exec(A);
        if (B) return {
            type: "escape",
            raw: B[0],
            text: B[1]
        }
    }
    tag(A) {
        let B = this.rules.inline.tag.exec(A);
        if (B) {
            if (!this.lexer.state.inLink && this.rules.other.startATag.test(B[0])) this.lexer.state.inLink = !0;
            else if (this.lexer.state.inLink && this.rules.other.endATag.test(B[0])) this.lexer.state.inLink = !1;
            if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(B[0])) this.lexer.state.inRawBlock = !0;
            else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(B[0])) this.lexer.state.inRawBlock = !1;
            return {
                type: "html",
                raw: B[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: !1,
                text: B[0]
            }
        }
    }
    link(A) {
        let B = this.rules.inline.link.exec(A);
        if (B) {
            let Q = B[2].trim();
            if (!this.options.pedantic && this.rules.other.startAngleBracket.test(Q)) {
                if (!this.rules.other.endAngleBracket.test(Q)) return;
                let G = UG1(Q.slice(0, -1), "\\");
                if ((Q.length - G.length) % 2 === 0) return
            } else {
                let G = e88(B[2], "()");
                if (G > -1) {
                    let I = (B[0].indexOf("!") === 0 ? 5 : 4) + B[1].length + G;
                    B[2] = B[2].substring(0, G), B[0] = B[0].substring(0, I).trim(), B[3] = ""
                }
            }
            let Z = B[2],
                D = "";
            if (this.options.pedantic) {
                let G = this.rules.other.pedanticHrefTitle.exec(Z);
                if (G) Z = G[1], D = G[3]
            } else D = B[3] ? B[3].slice(1, -1) : "";
            if (Z = Z.trim(), this.rules.other.startAngleBracket.test(Z))
                if (this.options.pedantic && !this.rules.other.endAngleBracket.test(Q)) Z = Z.slice(1);
                else Z = Z.slice(1, -1);
            return HRB(B, {
                href: Z ? Z.replace(this.rules.inline.anyPunctuation, "$1") : Z,
                title: D ? D.replace(this.rules.inline.anyPunctuation, "$1") : D
            }, B[0], this.lexer, this.rules)
        }
    }
    reflink(A, B) {
        let Q;
        if ((Q = this.rules.inline.reflink.exec(A)) || (Q = this.rules.inline.nolink.exec(A))) {
            let Z = (Q[2] || Q[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
                D = B[Z.toLowerCase()];
            if (!D) {
                let G = Q[0].charAt(0);
                return {
                    type: "text",
                    raw: G,
                    text: G
                }
            }
            return HRB(Q, D, Q[0], this.lexer, this.rules)
        }
    }
    emStrong(A, B, Q = "") {
        let Z = this.rules.inline.emStrongLDelim.exec(A);
        if (!Z) return;
        if (Z[3] && Q.match(this.rules.other.unicodeAlphaNumeric)) return;
        if (!(Z[1] || Z[2]) || !Q || this.rules.inline.punctuation.exec(Q)) {
            let G = [...Z[0]].length - 1,
                F, I, Y = G,
                W = 0,
                J = Z[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            J.lastIndex = 0, B = B.slice(-1 * A.length + G);
            while ((Z = J.exec(B)) != null) {
                if (F = Z[1] || Z[2] || Z[3] || Z[4] || Z[5] || Z[6], !F) continue;
                if (I = [...F].length, Z[3] || Z[4]) {
                    Y += I;
                    continue
                } else if (Z[5] || Z[6]) {
                    if (G % 3 && !((G + I) % 3)) {
                        W += I;
                        continue
                    }
                }
                if (Y -= I, Y > 0) continue;
                I = Math.min(I, I + Y + W);
                let X = [...Z[0]][0].length,
                    V = A.slice(0, G + Z.index + X + I);
                if (Math.min(G, I) % 2) {
                    let K = V.slice(1, -1);
                    return {
                        type: "em",
                        raw: V,
                        text: K,
                        tokens: this.lexer.inlineTokens(K)
                    }
                }
                let C = V.slice(2, -2);
                return {
                    type: "strong",
                    raw: V,
                    text: C,
                    tokens: this.lexer.inlineTokens(C)
                }
            }
        }
    }
    codespan(A) {
        let B = this.rules.inline.code.exec(A);
        if (B) {
            let Q = B[2].replace(this.rules.other.newLineCharGlobal, " "),
                Z = this.rules.other.nonSpaceChar.test(Q),
                D = this.rules.other.startingSpaceChar.test(Q) && this.rules.other.endingSpaceChar.test(Q);
            if (Z && D) Q = Q.substring(1, Q.length - 1);
            return {
                type: "codespan",
                raw: B[0],
                text: Q
            }
        }
    }
    br(A) {
        let B = this.rules.inline.br.exec(A);
        if (B) return {
            type: "br",
            raw: B[0]
        }
    }
    del(A) {
        let B = this.rules.inline.del.exec(A);
        if (B) return {
            type: "del",
            raw: B[0],
            text: B[2],
            tokens: this.lexer.inlineTokens(B[2])
        }
    }
    autolink(A) {
        let B = this.rules.inline.autolink.exec(A);
        if (B) {
            let Q, Z;
            if (B[2] === "@") Q = B[1], Z = "mailto:" + Q;
            else Q = B[1], Z = Q;
            return {
                type: "link",
                raw: B[0],
                text: Q,
                href: Z,
                tokens: [{
                    type: "text",
                    raw: Q,
                    text: Q
                }]
            }
        }
    }
    url(A) {
        let B;
        if (B = this.rules.inline.url.exec(A)) {
            let Q, Z;
            if (B[2] === "@") Q = B[0], Z = "mailto:" + Q;
            else {
                let D;
                do D = B[0], B[0] = this.rules.inline._backpedal.exec(B[0])?.[0] ?? ""; while (D !== B[0]);
                if (Q = B[0], B[1] === "www.") Z = "http://" + B[0];
                else Z = B[0]
            }
            return {
                type: "link",
                raw: B[0],
                text: Q,
                href: Z,
                tokens: [{
                    type: "text",
                    raw: Q,
                    text: Q
                }]
            }
        }
    }
    inlineText(A) {
        let B = this.rules.inline.text.exec(A);
        if (B) {
            let Q = this.lexer.state.inRawBlock;
            return {
                type: "text",
                raw: B[0],
                text: B[0],
                escaped: Q
            }
        }
    }
}