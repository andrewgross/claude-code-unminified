/* chunk:577 bytes:[13405369, 13424185) size:18816 source:unpacked-cli.js */
function NF8(A) {
    let B = [],
        Q = 0;
    while (Q < A.length) {
        let Z = A[Q];
        if (!Z) {
            Q++;
            continue
        }
        if (Z.type === "remove") {
            let D = [Z],
                G = Q + 1;
            while (G < A.length && A[G]?.type === "remove") {
                let I = A[G];
                if (I) D.push(I);
                G++
            }
            let F = [];
            while (G < A.length && A[G]?.type === "add") {
                let I = A[G];
                if (I) F.push(I);
                G++
            }
            if (D.length > 0 && F.length > 0) {
                let I = Math.min(D.length, F.length);
                for (let Y = 0; Y < I; Y++) {
                    let W = D[Y],
                        J = F[Y];
                    if (W && J) W.wordDiff = !0, J.wordDiff = !0, W.matchedLine = J, J.matchedLine = W
                }
                B.push(...D.filter(Boolean)), B.push(...F.filter(Boolean)), Q = G
            } else B.push(Z), Q++
        } else B.push(Z), Q++
    }
    return B
}

function LF8(A, B) {
    return RPB(A, B, {
        ignoreCase: !1
    })
}

function MF8(A, B, Q, Z, D, G) {
    let {
        type: F,
        i: I,
        wordDiff: Y,
        matchedLine: W,
        originalCode: J
    } = A, X = `${F}-${I}-${B}`;
    if (!Y || !W || B !== 0) return null;
    let V = J,
        C = W.originalCode,
        K, H;
    if (F === "remove") K = V, H = C;
    else K = W.originalCode, H = J;
    let z = LF8(K, H),
        $ = K.length + H.length,
        R = z.filter((O) => O.added || O.removed).reduce((O, P) => O + P.value.length, 0) / $ > wF8 || Z;
    if (F === "add") return rB.createElement(T, {
        key: X
    }, rB.createElement(W01, {
        i: I,
        width: Q,
        hidden: D
    }), rB.createElement(T, {
        backgroundColor: Z ? "diffAddedDimmed" : "diffAdded"
    }, rB.createElement(T, {
        dimColor: Z
    }, "+", "  "), R ? rB.createElement(T, {
        color: G ? "text" : void 0,
        dimColor: Z
    }, J) : z.map((O, P) => {
        if (O.added) return rB.createElement(T, {
            key: `part-${P}`,
            backgroundColor: Z ? "diffAddedWordDimmed" : "diffAddedWord",
            color: G ? "text" : void 0,
            dimColor: Z
        }, O.value);
        else if (O.removed) return null;
        else return rB.createElement(T, {
            key: `part-${P}`,
            color: G ? "text" : void 0,
            dimColor: Z
        }, O.value)
    })));
    else if (F === "remove") return rB.createElement(T, {
        key: X
    }, rB.createElement(W01, {
        i: I,
        width: Q,
        hidden: D
    }), rB.createElement(T, {
        backgroundColor: Z ? "diffRemovedDimmed" : "diffRemoved"
    }, rB.createElement(T, {
        dimColor: Z
    }, "-", "  "), R ? rB.createElement(T, {
        color: G ? "text" : void 0,
        dimColor: Z
    }, J) : z.map((O, P) => {
        if (O.removed) return rB.createElement(T, {
            key: `part-${P}`,
            backgroundColor: Z ? "diffRemovedWordDimmed" : "diffRemovedWord",
            color: G ? "text" : void 0,
            dimColor: Z
        }, O.value);
        else if (O.added) return null;
        else return rB.createElement(T, {
            key: `part-${P}`,
            color: G ? "text" : void 0,
            dimColor: Z
        }, O.value)
    })));
    return null
}

function RF8(A, B, Q, Z, D, G, F) {
    let I = qF8(A),
        Y = NF8(I),
        W = OF8(Y, B),
        J = Math.max(...W.map(({
            i: C
        }) => C), 0),
        X = Math.max(J.toString().length + 2, 0),
        V = (C, K) => rB.createElement(T, {
            color: F ? "text" : void 0,
            backgroundColor: K,
            dimColor: Z
        }, " ", C);
    return W.flatMap((C) => {
        let {
            type: K,
            code: H,
            i: z,
            wordDiff: $,
            matchedLine: L
        } = C;
        if (D && K === "nochange") return [];
        return uo(H, Q - X, "wrap").split(`
`).map((O, P) => {
            let j = `${K}-${z}-${P}`;
            if ($ && L && P === 0) {
                let f = MF8(C, P, X, Z, G, F);
                if (f) return f;
                return rB.createElement(T, {
                    key: j
                }, rB.createElement(W01, {
                    i: P === 0 ? z : void 0,
                    width: X,
                    hidden: G
                }), V(O, void 0))
            }
            switch (K) {
                case "add":
                    return rB.createElement(T, {
                        key: j
                    }, rB.createElement(W01, {
                        i: P === 0 ? z : void 0,
                        width: X,
                        hidden: G
                    }), rB.createElement(T, {
                        color: F ? "text" : void 0,
                        backgroundColor: Z ? "diffAddedDimmed" : "diffAdded",
                        dimColor: Z
                    }, rB.createElement(T, {
                        dimColor: Z
                    }, "+ "), O));
                case "remove":
                    return rB.createElement(T, {
                        key: j
                    }, rB.createElement(W01, {
                        i: P === 0 ? z : void 0,
                        width: X,
                        hidden: G
                    }), rB.createElement(T, {
                        color: F ? "text" : void 0,
                        backgroundColor: Z ? "diffRemovedDimmed" : "diffRemoved",
                        dimColor: Z
                    }, rB.createElement(T, {
                        dimColor: Z
                    }, "- "), O));
                case "nochange":
                    return rB.createElement(T, {
                        key: j
                    }, rB.createElement(W01, {
                        i: P === 0 ? z : void 0,
                        width: X,
                        hidden: G
                    }), rB.createElement(T, {
                        color: F ? "text" : void 0,
                        dimColor: Z
                    }, "  ", O))
            }
        })
    })
}

function W01({
    i: A,
    width: B,
    hidden: Q
}) {
    if (Q) return null;
    return rB.createElement(T, {
        color: "secondaryText"
    }, A !== void 0 ? A.toString().padStart(B) : " ".repeat(B), " ")
}

function OF8(A, B) {
    let Q = B,
        Z = [],
        D = [...A];
    while (D.length > 0) {
        let G = D.shift(),
            {
                code: F,
                type: I,
                originalCode: Y,
                wordDiff: W,
                matchedLine: J
            } = G,
            X = {
                code: F,
                type: I,
                i: Q,
                originalCode: Y,
                wordDiff: W,
                matchedLine: J
            };
        switch (I) {
            case "nochange":
                Q++, Z.push(X);
                break;
            case "add":
                Q++, Z.push(X);
                break;
            case "remove": {
                Z.push(X);
                let V = 0;
                while (D[0]?.type === "remove") {
                    Q++;
                    let C = D.shift(),
                        {
                            code: K,
                            type: H,
                            originalCode: z,
                            wordDiff: $,
                            matchedLine: L
                        } = C,
                        N = {
                            code: K,
                            type: H,
                            i: Q,
                            originalCode: z,
                            wordDiff: $,
                            matchedLine: L
                        };
                    Z.push(N), V++
                }
                Q -= V;
                break
            }
        }
    }
    return Z
}
import {
    relative as TF8,
    resolve as PF8
} from "path";

function Kb1({
    filePath: A,
    structuredPatch: B,
    style: Q,
    verbose: Z
}) {
    let {
        columns: D
    } = r9(), G = B.reduce((X, V) => X + V.lines.filter((C) => C.startsWith("+")).length, 0), F = B.reduce((X, V) => X + V.lines.filter((C) => C.startsWith("-")).length, 0), I = fg(A), Y = PF8(_9(), "CLAUDE.md"), W = I === Y, J = S4.createElement(T, null, "Updated", " ", S4.createElement(T, {
        bold: !0
    }, Z ? A : TF8(t0(), A)), G > 0 || F > 0 ? " with " : "", G > 0 ? S4.createElement(S4.Fragment, null, S4.createElement(T, {
        bold: !0
    }, G), " ", G > 1 ? "additions" : "addition") : null, G > 0 && F > 0 ? " and " : null, F > 0 ? S4.createElement(S4.Fragment, null, S4.createElement(T, {
        bold: !0
    }, F), " ", F > 1 ? "removals" : "removal") : null);
    if (Q === "condensed" && !Z) return J;
    return S4.createElement(OA, null, S4.createElement(v, {
        flexDirection: "column"
    }, S4.createElement(T, null, J), WC(B.map((X) => S4.createElement(v, {
        flexDirection: "column",
        key: X.newStart
    }, S4.createElement(JC, {
        patch: X,
        dim: !1,
        width: D - 12
    }))), (X) => S4.createElement(v, {
        key: `ellipsis-${X}`
    }, S4.createElement(T, {
        color: "secondaryText"
    }, "..."))), W && S4.createElement(v, {
        marginTop: 1
    }, S4.createElement(T, null, S4.createElement(T, {
        bold: !0
    }, "Tip:"), " Use", " ", S4.createElement(T, {
        color: "remember"
    }, "# to memorize"), " shortcut to quickly add to CLAUDE.md"))))
}
var SPB = G1(z1(), 1);
var US = G1(z1(), 1);
async function OPB() {
    if (DZ() !== "firstParty" || KB()) return;
    let B = H0(),
        Q = B.oauthAccount?.organizationUuid;
    if (!Q) return;
    try {
        let Z = p8(),
            D = await J9.get(`${Z.BASE_API_URL}/api/organization/${Q}/claude_code_recommended_subscription`),
            G = D.data ? D.data.recommended_subscription || "" : "";
        if (B.recommendedSubscription !== G) gA({
            ...B,
            recommendedSubscription: G
        })
    } catch (Z) {}
}

function SF8() {
    if (DZ() !== "firstParty") return !1;
    if (KB()) return !1;
    let {
        source: B
    } = DX(!1), Z = H0().oauthAccount?.organizationUuid;
    if (B !== "/login managed key" || !Z) return !1;
    return !0
}

function kN0() {
    if (!SF8()) return "";
    let B = H0().recommendedSubscription || "",
        Q = "";
    switch (B) {
        case "pro":
            Q = `

You can now use a Claude Pro subscription with Claude Code! ${e1.bold("https://claude.ai/upgrade")} then run /login.
`;
            break;
        case "max5x":
            Q = `

With the $100/mo Max plan, use Sonnet as your daily driver with predictable pricing. • /upgrade to sign up
`;
            break;
        case "max20x":
            Q = `

With the $200/mo Max plan, use Opus as your daily driver with predictable pricing. • /upgrade to sign up
`;
            break;
        default:
            return ""
    }
    return X1("tengu_subscription_upsell_shown", {
        recommendedSubscription: B
    }), Q
}

function TPB() {
    let [A] = US.useState(() => {
        let B = H0(),
            Q = B.recommendedSubscription || "",
            Z = B.subscriptionUpsellShownCount ?? 0;
        if (!["pro", "max5x", "max20x"].includes(Q) || Z >= 5) return !1;
        return !0
    });
    return US.useEffect(() => {
        if (A) {
            let B = H0(),
                Q = (B.subscriptionUpsellShownCount ?? 0) + 1;
            if (B.subscriptionUpsellShownCount !== Q) gA({
                ...B,
                subscriptionUpsellShownCount: Q
            }), X1("tengu_subscription_upsell_shown", {})
        }
    }, [A]), A
}

function PPB() {
    let A = kN0();
    if (!A) return null;
    return US.createElement(v, {
        paddingLeft: 1,
        marginTop: 1,
        marginBottom: 1
    }, US.createElement(T, null, A.trim()))
}

function jF8(A) {
    return `$${A>0.5?yF8(A,100).toFixed(2):A.toFixed(4)}`
}

function kF8() {
    let A = yk0();
    if (Object.keys(A).length === 0) return "Usage:                 0 input, 0 output, 0 cache read, 0 cache write";
    let B = {};
    for (let [Z, D] of Object.entries(A)) {
        let G = kw(Z);
        if (!B[G]) B[G] = {
            inputTokens: 0,
            outputTokens: 0,
            cacheReadInputTokens: 0,
            cacheCreationInputTokens: 0,
            webSearchRequests: 0
        };
        let F = B[G];
        F.inputTokens += D.inputTokens, F.outputTokens += D.outputTokens, F.cacheReadInputTokens += D.cacheReadInputTokens, F.cacheCreationInputTokens += D.cacheCreationInputTokens, F.webSearchRequests += D.webSearchRequests
    }
    let Q = "Usage by model:";
    for (let [Z, D] of Object.entries(B)) {
        let G = `  ${SI(D.inputTokens)} input, ${SI(D.outputTokens)} output, ${SI(D.cacheReadInputTokens)} cache read, ${SI(D.cacheCreationInputTokens)} cache write` + (D.webSearchRequests > 0 ? `, ${SI(D.webSearchRequests)} web search` : "");
        Q += `
` + `${Z}:`.padStart(21) + G
    }
    return Q
}

function yN0() {
    let A = jF8(aq()) + (kk0() ? " (costs may be inaccurate due to usage of unknown models)" : ""),
        B = kF8();
    return e1.dim(`Total cost:            ${A}
Total duration (API):  ${tm(nj())}
Total duration (wall): ${tm(zm1())}
Total code changes:    ${gW1()} ${gW1()===1?"line":"lines"} added, ${uW1()} ${uW1()===1?"line":"lines"} removed
${B}`) + kN0()
}

function jPB() {
    SPB.useEffect(() => {
        let A = () => {
            if (SR1()) process.stdout.write(`
` + yN0() + `
`);
            let B = UQ();
            r5({
                ...B,
                lastCost: aq(),
                lastAPIDuration: nj(),
                lastDuration: zm1(),
                lastLinesAdded: gW1(),
                lastLinesRemoved: uW1(),
                lastTotalInputTokens: Ok0(),
                lastTotalOutputTokens: Tk0(),
                lastTotalCacheCreationInputTokens: Sk0(),
                lastTotalCacheReadInputTokens: Pk0(),
                lastTotalWebSearchRequests: jk0(),
                lastSessionId: CB()
            })
        };
        return process.on("exit", A), () => {
            process.off("exit", A)
        }
    }, [])
}

function yF8(A, B) {
    return Math.round(A * B) / B
}

function kPB(A, B, Q, Z, D) {
    Rk0(A, B, Q, Z, D), gk0()?.add(A, {
        model: D
    }), O21()?.add(Z.input_tokens, {
        type: "input",
        model: D
    }), O21()?.add(Z.output_tokens, {
        type: "output",
        model: D
    }), O21()?.add(Z.cache_read_input_tokens ?? 0, {
        type: "cacheRead",
        model: D
    }), O21()?.add(Z.cache_creation_input_tokens ?? 0, {
        type: "cacheCreation",
        model: D
    })
}
var yPB = 3,
    _PB = "<<:AMPERSAND_TOKEN:>>",
    xPB = "<<:DOLLAR_TOKEN:>>";

function cG1(A) {
    return A.replaceAll("&", _PB).replaceAll("$", xPB)
}

function vPB(A) {
    return A.replaceAll(_PB, "&").replaceAll(xPB, "$")
}

function Hd(A, B) {
    let Q = 0,
        Z = 0;
    if (A.length === 0 && B) Q = B.split(/\r?\n/).length;
    else Q = A.reduce((D, G) => D + G.lines.filter((F) => F.startsWith("+")).length, 0), Z = A.reduce((D, G) => D + G.lines.filter((F) => F.startsWith("-")).length, 0);
    Em1(Q, Z), $m1()?.add(Q, {
        type: "added"
    }), $m1()?.add(Z, {
        type: "removed"
    }), X1("tengu_file_changed", {
        lines_added: Q,
        lines_removed: Z
    })
}

function bPB({
    filePath: A,
    oldContent: B,
    newContent: Q,
    ignoreWhitespace: Z = !1,
    singleHunk: D = !1
}) {
    return dG1(A, A, cG1(B), cG1(Q), void 0, void 0, {
        ignoreWhitespace: Z,
        context: D ? 1e5 : yPB
    }).hunks.map((G) => ({
        ...G,
        lines: G.lines.map(vPB)
    }))
}

function QU({
    filePath: A,
    fileContents: B,
    edits: Q,
    ignoreWhitespace: Z = !1
}) {
    let D = cG1(gs(B));
    return dG1(A, A, D, Q.reduce((G, F) => {
        let {
            old_string: I,
            new_string: Y
        } = F, W = "replace_all" in F ? F.replace_all : !1, J = cG1(gs(I)), X = cG1(gs(Y));
        if (W) return G.replaceAll(J, () => X);
        else return G.replace(J, () => X)
    }, D), void 0, void 0, {
        context: yPB,
        ignoreWhitespace: Z
    }).hunks.map((G) => ({
        ...G,
        lines: G.lines.map(vPB)
    }))
}
var fPB = `Performs exact string replacements in files. 

Usage:
- You must use your \`${QG}\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file. 
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if \`old_string\` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use \`replace_all\` to change every instance of \`old_string\`. 
- Use \`replace_all\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.`;
var _F8 = "‘",
    xF8 = "’",
    vF8 = "“",
    bF8 = "”";

function hPB(A) {
    return A.replaceAll(_F8, "'").replaceAll(xF8, "'").replaceAll(vF8, '"').replaceAll(bF8, '"')
}

function J01(A, B) {
    if (A.includes(B)) return B;
    let Q = hPB(B),
        D = hPB(A).indexOf(Q);
    if (D !== -1) return A.substring(D, D + B.length);
    return null
}

function lG1(A) {
    return A.map(({
        old_string: B,
        new_string: Q,
        replace_all: Z = !1
    }) => ({
        old_string: B,
        new_string: Q,
        replace_all: Z
    }))
}

function gPB(A, B, Q, Z = !1) {
    let D = Z ? (F, I, Y) => F.replaceAll(I, () => Y) : (F, I, Y) => F.replace(I, () => Y);
    if (Q !== "") return D(A, B, Q);
    return !B.endsWith(`
`) && A.includes(B + `
`) ? D(A, B + `
`, Q) : D(A, B, Q)
}

function _N0({
    filePath: A,
    fileContents: B,
    oldString: Q,
    newString: Z,
    replaceAll: D = !1
}) {
    return wS({
        filePath: A,
        fileContents: B,
        edits: [{
            old_string: Q,
            new_string: Z,
            replace_all: D
        }]
    })
}