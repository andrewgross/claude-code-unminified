/* chunk:563 bytes:[13112120, 13118445) size:6325 source:unpacked-cli.js */
var k68 = 1,
    y68 = 2,
    _68 = /[\w-]+/g,
    UD3 = {
        Zero: 0,
        ZeroOrOne: 1,
        ZeroOrMore: 2,
        One: 3,
        OneOrMore: 4
    },
    kMB = i0((A) => A.type === "capture", "isCaptureStep"),
    Jq0 = i0((A) => A.type === "string", "isStringStep"),
    v$ = {
        Syntax: 1,
        NodeName: 2,
        FieldName: 3,
        CaptureName: 4,
        PatternStructure: 5
    },
    XG1 = class A extends Error {
        constructor(B, Q, Z, D) {
            super(A.formatMessage(B, Q));
            this.kind = B, this.info = Q, this.index = Z, this.length = D, this.name = "QueryError"
        }
        static {
            i0(this, "QueryError")
        }
        static formatMessage(B, Q) {
            switch (B) {
                case v$.NodeName:
                    return `Bad node name '${Q.word}'`;
                case v$.FieldName:
                    return `Bad field name '${Q.word}'`;
                case v$.CaptureName:
                    return `Bad capture name @${Q.word}`;
                case v$.PatternStructure:
                    return `Bad pattern structure at offset ${Q.suffix}`;
                case v$.Syntax:
                    return `Bad syntax at offset ${Q.suffix}`
            }
        }
    };

function bMB(A, B, Q, Z) {
    if (A.length !== 3) throw new Error(`Wrong number of arguments to \`#${Q}\` predicate. Expected 2, got ${A.length-1}`);
    if (!kMB(A[1])) throw new Error(`First argument of \`#${Q}\` predicate must be a capture. Got "${A[1].value}"`);
    let D = Q === "eq?" || Q === "any-eq?",
        G = !Q.startsWith("any-");
    if (kMB(A[2])) {
        let F = A[1].name,
            I = A[2].name;
        Z[B].push((Y) => {
            let W = [],
                J = [];
            for (let V of Y) {
                if (V.name === F) W.push(V.node);
                if (V.name === I) J.push(V.node)
            }
            let X = i0((V, C, K) => {
                return K ? V.text === C.text : V.text !== C.text
            }, "compare");
            return G ? W.every((V) => J.some((C) => X(V, C, D))) : W.some((V) => J.some((C) => X(V, C, D)))
        })
    } else {
        let F = A[1].name,
            I = A[2].value,
            Y = i0((J) => J.text === I, "matches"),
            W = i0((J) => J.text !== I, "doesNotMatch");
        Z[B].push((J) => {
            let X = [];
            for (let C of J)
                if (C.name === F) X.push(C.node);
            let V = D ? Y : W;
            return G ? X.every(V) : X.some(V)
        })
    }
}
i0(bMB, "parseAnyPredicate");

function fMB(A, B, Q, Z) {
    if (A.length !== 3) throw new Error(`Wrong number of arguments to \`#${Q}\` predicate. Expected 2, got ${A.length-1}.`);
    if (A[1].type !== "capture") throw new Error(`First argument of \`#${Q}\` predicate must be a capture. Got "${A[1].value}".`);
    if (A[2].type !== "string") throw new Error(`Second argument of \`#${Q}\` predicate must be a string. Got @${A[2].name}.`);
    let D = Q === "match?" || Q === "any-match?",
        G = !Q.startsWith("any-"),
        F = A[1].name,
        I = new RegExp(A[2].value);
    Z[B].push((Y) => {
        let W = [];
        for (let X of Y)
            if (X.name === F) W.push(X.node.text);
        let J = i0((X, V) => {
            return V ? I.test(X) : !I.test(X)
        }, "test");
        if (W.length === 0) return !D;
        return G ? W.every((X) => J(X, D)) : W.some((X) => J(X, D))
    })
}
i0(fMB, "parseMatchPredicate");

function hMB(A, B, Q, Z) {
    if (A.length < 2) throw new Error(`Wrong number of arguments to \`#${Q}\` predicate. Expected at least 1. Got ${A.length-1}.`);
    if (A[1].type !== "capture") throw new Error(`First argument of \`#${Q}\` predicate must be a capture. Got "${A[1].value}".`);
    let D = Q === "any-of?",
        G = A[1].name,
        F = A.slice(2);
    if (!F.every(Jq0)) throw new Error(`Arguments to \`#${Q}\` predicate must be strings.".`);
    let I = F.map((Y) => Y.value);
    Z[B].push((Y) => {
        let W = [];
        for (let J of Y)
            if (J.name === G) W.push(J.node.text);
        if (W.length === 0) return !D;
        return W.every((J) => I.includes(J)) === D
    })
}
i0(hMB, "parseAnyOfPredicate");

function gMB(A, B, Q, Z, D) {
    if (A.length < 2 || A.length > 3) throw new Error(`Wrong number of arguments to \`#${Q}\` predicate. Expected 1 or 2. Got ${A.length-1}.`);
    if (!A.every(Jq0)) throw new Error(`Arguments to \`#${Q}\` predicate must be strings.".`);
    let G = Q === "is?" ? Z : D;
    if (!G[B]) G[B] = {};
    G[B][A[1].value] = A[2]?.value ?? null
}
i0(gMB, "parseIsPredicate");

function uMB(A, B, Q) {
    if (A.length < 2 || A.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${A.length-1}.`);
    if (!A.every(Jq0)) throw new Error('Arguments to `#set!` predicate must be strings.".');
    if (!Q[B]) Q[B] = {};
    Q[B][A[1].value] = A[2]?.value ?? null
}
i0(uMB, "parseSetDirective");

function mMB(A, B, Q, Z, D, G, F, I, Y, W, J) {
    if (B === k68) {
        let X = Z[Q];
        G.push({
            type: "capture",
            name: X
        })
    } else if (B === y68) G.push({
        type: "string",
        value: D[Q]
    });
    else if (G.length > 0) {
        if (G[0].type !== "string") throw new Error("Predicates must begin with a literal value");
        let X = G[0].value;
        switch (X) {
            case "any-not-eq?":
            case "not-eq?":
            case "any-eq?":
            case "eq?":
                bMB(G, A, X, F);
                break;
            case "any-not-match?":
            case "not-match?":
            case "any-match?":
            case "match?":
                fMB(G, A, X, F);
                break;
            case "not-any-of?":
            case "any-of?":
                hMB(G, A, X, F);
                break;
            case "is?":
            case "is-not?":
                gMB(G, A, X, W, J);
                break;
            case "set!":
                uMB(G, A, Y);
                break;
            default:
                I[A].push({
                    operator: X,
                    operands: G.slice(1)
                })
        }
        G.length = 0
    }
}
i0(mMB, "parsePattern");