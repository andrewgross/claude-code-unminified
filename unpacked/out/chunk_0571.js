/* chunk:571 bytes:[13299922, 13319907) size:19985 source:unpacked-cli.js */
class tE {
    options;
    renderer;
    textRenderer;
    constructor(A) {
        this.options = A || Fd, this.options.renderer = this.options.renderer || new NG1, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new xv1
    }
    static parse(A, B) {
        return new tE(B).parse(A)
    }
    static parseInline(A, B) {
        return new tE(B).parseInline(A)
    }
    parse(A, B = !0) {
        let Q = "";
        for (let Z = 0; Z < A.length; Z++) {
            let D = A[Z];
            if (this.options.extensions?.renderers?.[D.type]) {
                let F = D,
                    I = this.options.extensions.renderers[F.type].call({
                        parser: this
                    }, F);
                if (I !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(F.type)) {
                    Q += I || "";
                    continue
                }
            }
            let G = D;
            switch (G.type) {
                case "space": {
                    Q += this.renderer.space(G);
                    continue
                }
                case "hr": {
                    Q += this.renderer.hr(G);
                    continue
                }
                case "heading": {
                    Q += this.renderer.heading(G);
                    continue
                }
                case "code": {
                    Q += this.renderer.code(G);
                    continue
                }
                case "table": {
                    Q += this.renderer.table(G);
                    continue
                }
                case "blockquote": {
                    Q += this.renderer.blockquote(G);
                    continue
                }
                case "list": {
                    Q += this.renderer.list(G);
                    continue
                }
                case "html": {
                    Q += this.renderer.html(G);
                    continue
                }
                case "paragraph": {
                    Q += this.renderer.paragraph(G);
                    continue
                }
                case "text": {
                    let F = G,
                        I = this.renderer.text(F);
                    while (Z + 1 < A.length && A[Z + 1].type === "text") F = A[++Z], I += `
` + this.renderer.text(F);
                    if (B) Q += this.renderer.paragraph({
                        type: "paragraph",
                        raw: I,
                        text: I,
                        tokens: [{
                            type: "text",
                            raw: I,
                            text: I,
                            escaped: !0
                        }]
                    });
                    else Q += I;
                    continue
                }
                default: {
                    let F = 'Token with "' + G.type + '" type was not found.';
                    if (this.options.silent) return console.error(F), "";
                    else throw new Error(F)
                }
            }
        }
        return Q
    }
    parseInline(A, B = this.renderer) {
        let Q = "";
        for (let Z = 0; Z < A.length; Z++) {
            let D = A[Z];
            if (this.options.extensions?.renderers?.[D.type]) {
                let F = this.options.extensions.renderers[D.type].call({
                    parser: this
                }, D);
                if (F !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(D.type)) {
                    Q += F || "";
                    continue
                }
            }
            let G = D;
            switch (G.type) {
                case "escape": {
                    Q += B.text(G);
                    break
                }
                case "html": {
                    Q += B.html(G);
                    break
                }
                case "link": {
                    Q += B.link(G);
                    break
                }
                case "image": {
                    Q += B.image(G);
                    break
                }
                case "strong": {
                    Q += B.strong(G);
                    break
                }
                case "em": {
                    Q += B.em(G);
                    break
                }
                case "codespan": {
                    Q += B.codespan(G);
                    break
                }
                case "br": {
                    Q += B.br(G);
                    break
                }
                case "del": {
                    Q += B.del(G);
                    break
                }
                case "text": {
                    Q += B.text(G);
                    break
                }
                default: {
                    let F = 'Token with "' + G.type + '" type was not found.';
                    if (this.options.silent) return console.error(F), "";
                    else throw new Error(F)
                }
            }
        }
        return Q
    }
}
class $G1 {
    options;
    block;
    constructor(A) {
        this.options = A || Fd
    }
    static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(A) {
        return A
    }
    postprocess(A) {
        return A
    }
    processAllTokens(A) {
        return A
    }
    provideLexer() {
        return this.block ? DC.lex : DC.lexInline
    }
    provideParser() {
        return this.block ? tE.parse : tE.parseInline
    }
}
class TRB {
    defaults = Mq0();
    options = this.setOptions;
    parse = this.parseMarkdown(!0);
    parseInline = this.parseMarkdown(!1);
    Parser = tE;
    Renderer = NG1;
    TextRenderer = xv1;
    Lexer = DC;
    Tokenizer = qG1;
    Hooks = $G1;
    constructor(...A) {
        this.use(...A)
    }
    walkTokens(A, B) {
        let Q = [];
        for (let Z of A) switch (Q = Q.concat(B.call(this, Z)), Z.type) {
            case "table": {
                let D = Z;
                for (let G of D.header) Q = Q.concat(this.walkTokens(G.tokens, B));
                for (let G of D.rows)
                    for (let F of G) Q = Q.concat(this.walkTokens(F.tokens, B));
                break
            }
            case "list": {
                let D = Z;
                Q = Q.concat(this.walkTokens(D.items, B));
                break
            }
            default: {
                let D = Z;
                if (this.defaults.extensions?.childTokens?.[D.type]) this.defaults.extensions.childTokens[D.type].forEach((G) => {
                    let F = D[G].flat(1 / 0);
                    Q = Q.concat(this.walkTokens(F, B))
                });
                else if (D.tokens) Q = Q.concat(this.walkTokens(D.tokens, B))
            }
        }
        return Q
    }
    use(...A) {
        let B = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        return A.forEach((Q) => {
            let Z = {
                ...Q
            };
            if (Z.async = this.defaults.async || Z.async || !1, Q.extensions) Q.extensions.forEach((D) => {
                if (!D.name) throw new Error("extension name required");
                if ("renderer" in D) {
                    let G = B.renderers[D.name];
                    if (G) B.renderers[D.name] = function(...F) {
                        let I = D.renderer.apply(this, F);
                        if (I === !1) I = G.apply(this, F);
                        return I
                    };
                    else B.renderers[D.name] = D.renderer
                }
                if ("tokenizer" in D) {
                    if (!D.level || D.level !== "block" && D.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                    let G = B[D.level];
                    if (G) G.unshift(D.tokenizer);
                    else B[D.level] = [D.tokenizer];
                    if (D.start) {
                        if (D.level === "block")
                            if (B.startBlock) B.startBlock.push(D.start);
                            else B.startBlock = [D.start];
                        else if (D.level === "inline")
                            if (B.startInline) B.startInline.push(D.start);
                            else B.startInline = [D.start]
                    }
                }
                if ("childTokens" in D && D.childTokens) B.childTokens[D.name] = D.childTokens
            }), Z.extensions = B;
            if (Q.renderer) {
                let D = this.defaults.renderer || new NG1(this.defaults);
                for (let G in Q.renderer) {
                    if (!(G in D)) throw new Error(`renderer '${G}' does not exist`);
                    if (["options", "parser"].includes(G)) continue;
                    let F = G,
                        I = Q.renderer[F],
                        Y = D[F];
                    D[F] = (...W) => {
                        let J = I.apply(D, W);
                        if (J === !1) J = Y.apply(D, W);
                        return J || ""
                    }
                }
                Z.renderer = D
            }
            if (Q.tokenizer) {
                let D = this.defaults.tokenizer || new qG1(this.defaults);
                for (let G in Q.tokenizer) {
                    if (!(G in D)) throw new Error(`tokenizer '${G}' does not exist`);
                    if (["options", "rules", "lexer"].includes(G)) continue;
                    let F = G,
                        I = Q.tokenizer[F],
                        Y = D[F];
                    D[F] = (...W) => {
                        let J = I.apply(D, W);
                        if (J === !1) J = Y.apply(D, W);
                        return J
                    }
                }
                Z.tokenizer = D
            }
            if (Q.hooks) {
                let D = this.defaults.hooks || new $G1;
                for (let G in Q.hooks) {
                    if (!(G in D)) throw new Error(`hook '${G}' does not exist`);
                    if (["options", "block"].includes(G)) continue;
                    let F = G,
                        I = Q.hooks[F],
                        Y = D[F];
                    if ($G1.passThroughHooks.has(G)) D[F] = (W) => {
                        if (this.defaults.async) return Promise.resolve(I.call(D, W)).then((X) => {
                            return Y.call(D, X)
                        });
                        let J = I.call(D, W);
                        return Y.call(D, J)
                    };
                    else D[F] = (...W) => {
                        let J = I.apply(D, W);
                        if (J === !1) J = Y.apply(D, W);
                        return J
                    }
                }
                Z.hooks = D
            }
            if (Q.walkTokens) {
                let D = this.defaults.walkTokens,
                    G = Q.walkTokens;
                Z.walkTokens = function(F) {
                    let I = [];
                    if (I.push(G.call(this, F)), D) I = I.concat(D.call(this, F));
                    return I
                }
            }
            this.defaults = {
                ...this.defaults,
                ...Z
            }
        }), this
    }
    setOptions(A) {
        return this.defaults = {
            ...this.defaults,
            ...A
        }, this
    }
    lexer(A, B) {
        return DC.lex(A, B ?? this.defaults)
    }
    parser(A, B) {
        return tE.parse(A, B ?? this.defaults)
    }
    parseMarkdown(A) {
        return (Q, Z) => {
            let D = {
                    ...Z
                },
                G = {
                    ...this.defaults,
                    ...D
                },
                F = this.onError(!!G.silent, !!G.async);
            if (this.defaults.async === !0 && D.async === !1) return F(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
            if (typeof Q === "undefined" || Q === null) return F(new Error("marked(): input parameter is undefined or null"));
            if (typeof Q !== "string") return F(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(Q) + ", string expected"));
            if (G.hooks) G.hooks.options = G, G.hooks.block = A;
            let I = G.hooks ? G.hooks.provideLexer() : A ? DC.lex : DC.lexInline,
                Y = G.hooks ? G.hooks.provideParser() : A ? tE.parse : tE.parseInline;
            if (G.async) return Promise.resolve(G.hooks ? G.hooks.preprocess(Q) : Q).then((W) => I(W, G)).then((W) => G.hooks ? G.hooks.processAllTokens(W) : W).then((W) => G.walkTokens ? Promise.all(this.walkTokens(W, G.walkTokens)).then(() => W) : W).then((W) => Y(W, G)).then((W) => G.hooks ? G.hooks.postprocess(W) : W).catch(F);
            try {
                if (G.hooks) Q = G.hooks.preprocess(Q);
                let W = I(Q, G);
                if (G.hooks) W = G.hooks.processAllTokens(W);
                if (G.walkTokens) this.walkTokens(W, G.walkTokens);
                let J = Y(W, G);
                if (G.hooks) J = G.hooks.postprocess(J);
                return J
            } catch (W) {
                return F(W)
            }
        }
    }
    onError(A, B) {
        return (Q) => {
            if (Q.message += `
Please report this to https://github.com/markedjs/marked.`, A) {
                let Z = "<p>An error occurred:</p><pre>" + sM(Q.message + "", !0) + "</pre>";
                if (B) return Promise.resolve(Z);
                return Z
            }
            if (B) return Promise.reject(Q);
            throw Q
        }
    }
}
var Gd = new TRB;

function f5(A, B) {
    return Gd.parse(A, B)
}
f5.options = f5.setOptions = function(A) {
    return Gd.setOptions(A), f5.defaults = Gd.defaults, zRB(f5.defaults), f5
};
f5.getDefaults = Mq0;
f5.defaults = Fd;
f5.use = function(...A) {
    return Gd.use(...A), f5.defaults = Gd.defaults, zRB(f5.defaults), f5
};
f5.walkTokens = function(A, B) {
    return Gd.walkTokens(A, B)
};
f5.parseInline = Gd.parseInline;
f5.Parser = tE;
f5.parser = tE.parse;
f5.Renderer = NG1;
f5.TextRenderer = xv1;
f5.Lexer = DC;
f5.lexer = DC.lex;
f5.Tokenizer = qG1;
f5.Hooks = $G1;
f5.parse = f5;
var {
    options: nG3,
    setOptions: aG3,
    use: sG3,
    walkTokens: rG3,
    parseInline: oG3
} = f5;
var tG3 = tE.parse,
    eG3 = DC.lex;
var bG1 = G1(IN0(), 1);
import {
    EOL as qX
} from "os";

function ZW(A, B) {
    return f5.lexer(fG1(A)).map((Q) => NX(Q, B)).join("").trim()
}

function NX(A, B, Q = 0, Z = null, D = null) {
    switch (A.type) {
        case "blockquote":
            return e1.dim.italic((A.tokens ?? []).map((G) => NX(G, B)).join(""));
        case "code":
            if (A.lang && bG1.supportsLanguage(A.lang)) return bG1.highlight(A.text, {
                language: A.lang
            }) + qX;
            else return R1(new Error(`Language not supported while highlighting code, falling back to markdown: ${A.lang}`)), bG1.highlight(A.text, {
                language: "markdown"
            }) + qX;
        case "codespan":
            return pB("permission", B)(A.text);
        case "em":
            return e1.italic((A.tokens ?? []).map((G) => NX(G, B)).join(""));
        case "strong":
            return e1.bold((A.tokens ?? []).map((G) => NX(G, B)).join(""));
        case "del":
            return e1.strikethrough((A.tokens ?? []).map((G) => NX(G, B)).join(""));
        case "heading":
            switch (A.depth) {
                case 1:
                    return e1.bold.italic.underline((A.tokens ?? []).map((G) => NX(G, B)).join("")) + qX + qX;
                case 2:
                    return e1.bold((A.tokens ?? []).map((G) => NX(G, B)).join("")) + qX + qX;
                default:
                    return e1.bold.dim((A.tokens ?? []).map((G) => NX(G, B)).join("")) + qX + qX
            }
        case "hr":
            return "---";
        case "image":
            return A.href;
        case "link": {
            if (A.href.startsWith("mailto:")) return A.href.replace(/^mailto:/, "");
            return pB("permission", B)(A.href)
        }
        case "list":
            return A.items.map((G, F) => NX(G, B, Q, A.ordered ? A.start + F : null, A)).join("");
        case "list_item":
            return (A.tokens ?? []).map((G) => `${"  ".repeat(Q)}${NX(G,B,Q+1,Z,A)}`).join("");
        case "paragraph":
            return (A.tokens ?? []).map((G) => NX(G, B)).join("") + qX;
        case "space":
            return qX;
        case "text":
            if (D?.type === "list_item") return `${Z===null?"-":AG8(Q,Z)+"."} ${A.tokens?A.tokens.map((G)=>NX(G,B,Q,Z,A)).join(""):A.text}${qX}`;
            else return A.text;
        case "table": {
            let F = function(W) {
                    return eG(W?.map((J) => NX(J, B)).join("") ?? "")
                },
                G = A,
                I = G.header.map((W, J) => {
                    let X = F(W.tokens).length;
                    for (let V of G.rows) {
                        let C = F(V[J]?.tokens).length;
                        X = Math.max(X, C)
                    }
                    return Math.max(X, 3)
                }),
                Y = "| ";
            return G.header.forEach((W, J) => {
                let X = W.tokens?.map((z) => NX(z, B)).join("") ?? "",
                    V = F(W.tokens),
                    C = I[J],
                    K = G.align?.[J],
                    H;
                if (K === "center") {
                    let z = C - V.length,
                        $ = Math.floor(z / 2),
                        L = z - $;
                    H = " ".repeat($) + X + " ".repeat(L)
                } else if (K === "right") {
                    let z = C - V.length;
                    H = " ".repeat(z) + X
                } else H = X + " ".repeat(C - V.length);
                Y += H + " | "
            }), Y = Y.trimEnd() + qX, Y += "|", I.forEach((W) => {
                let J = "-".repeat(W + 2);
                Y += J + "|"
            }), Y += qX, G.rows.forEach((W) => {
                Y += "| ", W.forEach((J, X) => {
                    let V = J.tokens?.map(($) => NX($, B)).join("") ?? "",
                        C = F(J.tokens),
                        K = I[X],
                        H = G.align?.[X],
                        z;
                    if (H === "center") {
                        let $ = K - C.length,
                            L = Math.floor($ / 2),
                            N = $ - L;
                        z = " ".repeat(L) + V + " ".repeat(N)
                    } else if (H === "right") {
                        let $ = K - C.length;
                        z = " ".repeat($) + V
                    } else z = V + " ".repeat(K - C.length);
                    Y += z + " | "
                }), Y = Y.trimEnd() + qX
            }), Y + qX
        }
    }
    return ""
}
var tD8 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az"],
    eD8 = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx", "xxi", "xxii", "xxiii", "xxiv", "xxv", "xxvi", "xxvii", "xxviii", "xxix", "xxx", "xxxi", "xxxii", "xxxiii", "xxxiv", "xxxv", "xxxvi", "xxxvii", "xxxviii", "xxxix", "xl"];