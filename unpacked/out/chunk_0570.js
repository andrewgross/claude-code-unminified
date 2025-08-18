/* chunk:570 bytes:[13285140, 13299921) size:14781 source:unpacked-cli.js */
class DC {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(A) {
        this.tokens = [], this.tokens.links = Object.create(null), this.options = A || Fd, this.options.tokenizer = this.options.tokenizer || new qG1, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        let B = {
            other: $X,
            block: jv1.normal,
            inline: EG1.normal
        };
        if (this.options.pedantic) B.block = jv1.pedantic, B.inline = EG1.pedantic;
        else if (this.options.gfm)
            if (B.block = jv1.gfm, this.options.breaks) B.inline = EG1.breaks;
            else B.inline = EG1.gfm;
        this.tokenizer.rules = B
    }
    static get rules() {
        return {
            block: jv1,
            inline: EG1
        }
    }
    static lex(A, B) {
        return new DC(B).lex(A)
    }
    static lexInline(A, B) {
        return new DC(B).inlineTokens(A)
    }
    lex(A) {
        A = A.replace($X.carriageReturn, `
`), this.blockTokens(A, this.tokens);
        for (let B = 0; B < this.inlineQueue.length; B++) {
            let Q = this.inlineQueue[B];
            this.inlineTokens(Q.src, Q.tokens)
        }
        return this.inlineQueue = [], this.tokens
    }
    blockTokens(A, B = [], Q = !1) {
        if (this.options.pedantic) A = A.replace($X.tabCharGlobal, "    ").replace($X.spaceLine, "");
        while (A) {
            let Z;
            if (this.options.extensions?.block?.some((G) => {
                    if (Z = G.call({
                            lexer: this
                        }, A, B)) return A = A.substring(Z.raw.length), B.push(Z), !0;
                    return !1
                })) continue;
            if (Z = this.tokenizer.space(A)) {
                A = A.substring(Z.raw.length);
                let G = B.at(-1);
                if (Z.raw.length === 1 && G !== void 0) G.raw += `
`;
                else B.push(Z);
                continue
            }
            if (Z = this.tokenizer.code(A)) {
                A = A.substring(Z.raw.length);
                let G = B.at(-1);
                if (G?.type === "paragraph" || G?.type === "text") G.raw += `
` + Z.raw, G.text += `
` + Z.text, this.inlineQueue.at(-1).src = G.text;
                else B.push(Z);
                continue
            }
            if (Z = this.tokenizer.fences(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.heading(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.hr(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.blockquote(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.list(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.html(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.def(A)) {
                A = A.substring(Z.raw.length);
                let G = B.at(-1);
                if (G?.type === "paragraph" || G?.type === "text") G.raw += `
` + Z.raw, G.text += `
` + Z.raw, this.inlineQueue.at(-1).src = G.text;
                else if (!this.tokens.links[Z.tag]) this.tokens.links[Z.tag] = {
                    href: Z.href,
                    title: Z.title
                };
                continue
            }
            if (Z = this.tokenizer.table(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            if (Z = this.tokenizer.lheading(A)) {
                A = A.substring(Z.raw.length), B.push(Z);
                continue
            }
            let D = A;
            if (this.options.extensions?.startBlock) {
                let G = 1 / 0,
                    F = A.slice(1),
                    I;
                if (this.options.extensions.startBlock.forEach((Y) => {
                        if (I = Y.call({
                                lexer: this
                            }, F), typeof I === "number" && I >= 0) G = Math.min(G, I)
                    }), G < 1 / 0 && G >= 0) D = A.substring(0, G + 1)
            }
            if (this.state.top && (Z = this.tokenizer.paragraph(D))) {
                let G = B.at(-1);
                if (Q && G?.type === "paragraph") G.raw += `
` + Z.raw, G.text += `
` + Z.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = G.text;
                else B.push(Z);
                Q = D.length !== A.length, A = A.substring(Z.raw.length);
                continue
            }
            if (Z = this.tokenizer.text(A)) {
                A = A.substring(Z.raw.length);
                let G = B.at(-1);
                if (G?.type === "text") G.raw += `
` + Z.raw, G.text += `
` + Z.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = G.text;
                else B.push(Z);
                continue
            }
            if (A) {
                let G = "Infinite loop on byte: " + A.charCodeAt(0);
                if (this.options.silent) {
                    console.error(G);
                    break
                } else throw new Error(G)
            }
        }
        return this.state.top = !0, B
    }
    inline(A, B = []) {
        return this.inlineQueue.push({
            src: A,
            tokens: B
        }), B
    }
    inlineTokens(A, B = []) {
        let Q = A,
            Z = null;
        if (this.tokens.links) {
            let F = Object.keys(this.tokens.links);
            if (F.length > 0) {
                while ((Z = this.tokenizer.rules.inline.reflinkSearch.exec(Q)) != null)
                    if (F.includes(Z[0].slice(Z[0].lastIndexOf("[") + 1, -1))) Q = Q.slice(0, Z.index) + "[" + "a".repeat(Z[0].length - 2) + "]" + Q.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex)
            }
        }
        while ((Z = this.tokenizer.rules.inline.blockSkip.exec(Q)) != null) Q = Q.slice(0, Z.index) + "[" + "a".repeat(Z[0].length - 2) + "]" + Q.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        while ((Z = this.tokenizer.rules.inline.anyPunctuation.exec(Q)) != null) Q = Q.slice(0, Z.index) + "++" + Q.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        let D = !1,
            G = "";
        while (A) {
            if (!D) G = "";
            D = !1;
            let F;
            if (this.options.extensions?.inline?.some((Y) => {
                    if (F = Y.call({
                            lexer: this
                        }, A, B)) return A = A.substring(F.raw.length), B.push(F), !0;
                    return !1
                })) continue;
            if (F = this.tokenizer.escape(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.tag(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.link(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.reflink(A, this.tokens.links)) {
                A = A.substring(F.raw.length);
                let Y = B.at(-1);
                if (F.type === "text" && Y?.type === "text") Y.raw += F.raw, Y.text += F.text;
                else B.push(F);
                continue
            }
            if (F = this.tokenizer.emStrong(A, Q, G)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.codespan(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.br(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.del(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (F = this.tokenizer.autolink(A)) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            if (!this.state.inLink && (F = this.tokenizer.url(A))) {
                A = A.substring(F.raw.length), B.push(F);
                continue
            }
            let I = A;
            if (this.options.extensions?.startInline) {
                let Y = 1 / 0,
                    W = A.slice(1),
                    J;
                if (this.options.extensions.startInline.forEach((X) => {
                        if (J = X.call({
                                lexer: this
                            }, W), typeof J === "number" && J >= 0) Y = Math.min(Y, J)
                    }), Y < 1 / 0 && Y >= 0) I = A.substring(0, Y + 1)
            }
            if (F = this.tokenizer.inlineText(I)) {
                if (A = A.substring(F.raw.length), F.raw.slice(-1) !== "_") G = F.raw.slice(-1);
                D = !0;
                let Y = B.at(-1);
                if (Y?.type === "text") Y.raw += F.raw, Y.text += F.text;
                else B.push(F);
                continue
            }
            if (A) {
                let Y = "Infinite loop on byte: " + A.charCodeAt(0);
                if (this.options.silent) {
                    console.error(Y);
                    break
                } else throw new Error(Y)
            }
        }
        return B
    }
}
class NG1 {
    options;
    parser;
    constructor(A) {
        this.options = A || Fd
    }
    space(A) {
        return ""
    }
    code({
        text: A,
        lang: B,
        escaped: Q
    }) {
        let Z = (B || "").match($X.notSpaceStart)?.[0],
            D = A.replace($X.endingNewline, "") + `
`;
        if (!Z) return "<pre><code>" + (Q ? D : sM(D, !0)) + `</code></pre>
`;
        return '<pre><code class="language-' + sM(Z) + '">' + (Q ? D : sM(D, !0)) + `</code></pre>
`
    }
    blockquote({
        tokens: A
    }) {
        return `<blockquote>
${this.parser.parse(A)}</blockquote>
`
    }
    html({
        text: A
    }) {
        return A
    }
    heading({
        tokens: A,
        depth: B
    }) {
        return `<h${B}>${this.parser.parseInline(A)}</h${B}>
`
    }
    hr(A) {
        return `<hr>
`
    }
    list(A) {
        let {
            ordered: B,
            start: Q
        } = A, Z = "";
        for (let F = 0; F < A.items.length; F++) {
            let I = A.items[F];
            Z += this.listitem(I)
        }
        let D = B ? "ol" : "ul",
            G = B && Q !== 1 ? ' start="' + Q + '"' : "";
        return "<" + D + G + `>
` + Z + "</" + D + `>
`
    }
    listitem(A) {
        let B = "";
        if (A.task) {
            let Q = this.checkbox({
                checked: !!A.checked
            });
            if (A.loose)
                if (A.tokens[0]?.type === "paragraph") {
                    if (A.tokens[0].text = Q + " " + A.tokens[0].text, A.tokens[0].tokens && A.tokens[0].tokens.length > 0 && A.tokens[0].tokens[0].type === "text") A.tokens[0].tokens[0].text = Q + " " + sM(A.tokens[0].tokens[0].text), A.tokens[0].tokens[0].escaped = !0
                } else A.tokens.unshift({
                    type: "text",
                    raw: Q + " ",
                    text: Q + " ",
                    escaped: !0
                });
            else B += Q + " "
        }
        return B += this.parser.parse(A.tokens, !!A.loose), `<li>${B}</li>
`
    }
    checkbox({
        checked: A
    }) {
        return "<input " + (A ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }
    paragraph({
        tokens: A
    }) {
        return `<p>${this.parser.parseInline(A)}</p>
`
    }
    table(A) {
        let B = "",
            Q = "";
        for (let D = 0; D < A.header.length; D++) Q += this.tablecell(A.header[D]);
        B += this.tablerow({
            text: Q
        });
        let Z = "";
        for (let D = 0; D < A.rows.length; D++) {
            let G = A.rows[D];
            Q = "";
            for (let F = 0; F < G.length; F++) Q += this.tablecell(G[F]);
            Z += this.tablerow({
                text: Q
            })
        }
        if (Z) Z = `<tbody>${Z}</tbody>`;
        return `<table>
<thead>
` + B + `</thead>
` + Z + `</table>
`
    }
    tablerow({
        text: A
    }) {
        return `<tr>
${A}</tr>
`
    }
    tablecell(A) {
        let B = this.parser.parseInline(A.tokens),
            Q = A.header ? "th" : "td";
        return (A.align ? `<${Q} align="${A.align}">` : `<${Q}>`) + B + `</${Q}>
`
    }
    strong({
        tokens: A
    }) {
        return `<strong>${this.parser.parseInline(A)}</strong>`
    }
    em({
        tokens: A
    }) {
        return `<em>${this.parser.parseInline(A)}</em>`
    }
    codespan({
        text: A
    }) {
        return `<code>${sM(A,!0)}</code>`
    }
    br(A) {
        return "<br>"
    }
    del({
        tokens: A
    }) {
        return `<del>${this.parser.parseInline(A)}</del>`
    }
    link({
        href: A,
        title: B,
        tokens: Q
    }) {
        let Z = this.parser.parseInline(Q),
            D = CRB(A);
        if (D === null) return Z;
        A = D;
        let G = '<a href="' + A + '"';
        if (B) G += ' title="' + sM(B) + '"';
        return G += ">" + Z + "</a>", G
    }
    image({
        href: A,
        title: B,
        text: Q
    }) {
        let Z = CRB(A);
        if (Z === null) return sM(Q);
        A = Z;
        let D = `<img src="${A}" alt="${Q}"`;
        if (B) D += ` title="${sM(B)}"`;
        return D += ">", D
    }
    text(A) {
        return "tokens" in A && A.tokens ? this.parser.parseInline(A.tokens) : ("escaped" in A) && A.escaped ? A.text : sM(A.text)
    }
}
class xv1 {
    strong({
        text: A
    }) {
        return A
    }
    em({
        text: A
    }) {
        return A
    }
    codespan({
        text: A
    }) {
        return A
    }
    del({
        text: A
    }) {
        return A
    }
    html({
        text: A
    }) {
        return A
    }
    text({
        text: A
    }) {
        return A
    }
    link({
        text: A
    }) {
        return "" + A
    }
    image({
        text: A
    }) {
        return "" + A
    }
    br() {
        return ""
    }
}