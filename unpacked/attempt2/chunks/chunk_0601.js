/* chunk:601 bytes:[13834764, 13853931) size:19167 source:unpacked-cli.js */
function pz8(A, B = {}) {
    return A.split(lz8).map((Q) => {
        let Z = Q.trim().split(cz8).filter((G) => G && !!G.trim()),
            D = [];
        for (let G = 0, F = Z.length; G < F; G += 1) {
            let I = Z[G],
                Y = !1,
                W = -1;
            while (!Y && ++W < JbB) {
                let J = wR0[W],
                    X = J.isMultiMatch(I);
                if (X) D.push(new J(X, B)), Y = !0
            }
            if (Y) continue;
            W = -1;
            while (++W < JbB) {
                let J = wR0[W],
                    X = J.isSingleMatch(I);
                if (X) {
                    D.push(new J(X, B));
                    break
                }
            }
        }
        return D
    })
}
var iz8 = new Set([RR0.type, OR0.type]);
class MbB {
    constructor(A, {
        isCaseSensitive: B = pQ.isCaseSensitive,
        includeMatches: Q = pQ.includeMatches,
        minMatchCharLength: Z = pQ.minMatchCharLength,
        ignoreLocation: D = pQ.ignoreLocation,
        findAllMatches: G = pQ.findAllMatches,
        location: F = pQ.location,
        threshold: I = pQ.threshold,
        distance: Y = pQ.distance
    } = {}) {
        this.query = null, this.options = {
            isCaseSensitive: B,
            includeMatches: Q,
            minMatchCharLength: Z,
            findAllMatches: G,
            ignoreLocation: D,
            location: F,
            threshold: I,
            distance: Y
        }, this.pattern = B ? A : A.toLowerCase(), this.query = pz8(this.pattern, this.options)
    }
    static condition(A, B) {
        return B.useExtendedSearch
    }
    searchIn(A) {
        let B = this.query;
        if (!B) return {
            isMatch: !1,
            score: 1
        };
        let {
            includeMatches: Q,
            isCaseSensitive: Z
        } = this.options;
        A = Z ? A : A.toLowerCase();
        let D = 0,
            G = [],
            F = 0;
        for (let I = 0, Y = B.length; I < Y; I += 1) {
            let W = B[I];
            G.length = 0, D = 0;
            for (let J = 0, X = W.length; J < X; J += 1) {
                let V = W[J],
                    {
                        isMatch: C,
                        indices: K,
                        score: H
                    } = V.search(A);
                if (C) {
                    if (D += 1, F += H, Q) {
                        let z = V.constructor.type;
                        if (iz8.has(z)) G = [...G, ...K];
                        else G.push(K)
                    }
                } else {
                    F = 0, D = 0, G.length = 0;
                    break
                }
            }
            if (D) {
                let J = {
                    isMatch: !0,
                    score: F / D
                };
                if (Q) J.indices = G;
                return J
            }
        }
        return {
            isMatch: !1,
            score: 1
        }
    }
}
var $R0 = [];

function nz8(...A) {
    $R0.push(...A)
}

function qR0(A, B) {
    for (let Q = 0, Z = $R0.length; Q < Z; Q += 1) {
        let D = $R0[Q];
        if (D.condition(A, B)) return new D(A, B)
    }
    return new MR0(A, B)
}
var if1 = {
        AND: "$and",
        OR: "$or"
    },
    NR0 = {
        PATH: "$path",
        PATTERN: "$val"
    },
    LR0 = (A) => !!(A[if1.AND] || A[if1.OR]),
    az8 = (A) => !!A[NR0.PATH],
    sz8 = (A) => !xS(A) && CbB(A) && !LR0(A),
    XbB = (A) => ({
        [if1.AND]: Object.keys(A).map((B) => ({
            [B]: A[B]
        }))
    });

function RbB(A, B, {
    auto: Q = !0
} = {}) {
    let Z = (D) => {
        let G = Object.keys(D),
            F = az8(D);
        if (!F && G.length > 1 && !LR0(D)) return Z(XbB(D));
        if (sz8(D)) {
            let Y = F ? D[NR0.PATH] : G[0],
                W = F ? D[NR0.PATTERN] : D[Y];
            if (!FR(W)) throw new Error(Pz8(Y));
            let J = {
                keyId: UR0(Y),
                pattern: W
            };
            if (Q) J.searcher = qR0(W, B);
            return J
        }
        let I = {
            children: [],
            operator: G[0]
        };
        return G.forEach((Y) => {
            let W = D[Y];
            if (xS(W)) W.forEach((J) => {
                I.children.push(Z(J))
            })
        }), I
    };
    if (!LR0(A)) A = XbB(A);
    return Z(A)
}

function rz8(A, {
    ignoreFieldNorm: B = pQ.ignoreFieldNorm
}) {
    A.forEach((Q) => {
        let Z = 1;
        Q.matches.forEach(({
            key: D,
            norm: G,
            score: F
        }) => {
            let I = D ? D.weight : null;
            Z *= Math.pow(F === 0 && I ? Number.EPSILON : F, (I || 1) * (B ? 1 : G))
        }), Q.score = Z
    })
}

function oz8(A, B) {
    let Q = A.matches;
    if (B.matches = [], !FH(Q)) return;
    Q.forEach((Z) => {
        if (!FH(Z.indices) || !Z.indices.length) return;
        let {
            indices: D,
            value: G
        } = Z, F = {
            indices: D,
            value: G
        };
        if (Z.key) F.key = Z.key.src;
        if (Z.idx > -1) F.refIndex = Z.idx;
        B.matches.push(F)
    })
}

function tz8(A, B) {
    B.score = A.score
}

function ez8(A, B, {
    includeMatches: Q = pQ.includeMatches,
    includeScore: Z = pQ.includeScore
} = {}) {
    let D = [];
    if (Q) D.push(oz8);
    if (Z) D.push(tz8);
    return A.map((G) => {
        let {
            idx: F
        } = G, I = {
            item: B[F],
            refIndex: F
        };
        if (D.length) D.forEach((Y) => {
            Y(G, I)
        });
        return I
    })
}
class HU {
    constructor(A, B = {}, Q) {
        this.options = {
            ...pQ,
            ...B
        }, this.options.useExtendedSearch, this._keyStore = new HbB(this.options.keys), this.setCollection(A, Q)
    }
    setCollection(A, B) {
        if (this._docs = A, B && !(B instanceof nf1)) throw new Error(Tz8);
        this._myIndex = B || EbB(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
        })
    }
    add(A) {
        if (!FH(A)) return;
        this._docs.push(A), this._myIndex.add(A)
    }
    remove(A = () => !1) {
        let B = [];
        for (let Q = 0, Z = this._docs.length; Q < Z; Q += 1) {
            let D = this._docs[Q];
            if (A(D, Q)) this.removeAt(Q), Q -= 1, Z -= 1, B.push(D)
        }
        return B
    }
    removeAt(A) {
        this._docs.splice(A, 1), this._myIndex.removeAt(A)
    }
    getIndex() {
        return this._myIndex
    }
    search(A, {
        limit: B = -1
    } = {}) {
        let {
            includeMatches: Q,
            includeScore: Z,
            shouldSort: D,
            sortFn: G,
            ignoreFieldNorm: F
        } = this.options, I = FR(A) ? FR(this._docs[0]) ? this._searchStringList(A) : this._searchObjectList(A) : this._searchLogical(A);
        if (rz8(I, {
                ignoreFieldNorm: F
            }), D) I.sort(G);
        if (VbB(B) && B > -1) I = I.slice(0, B);
        return ez8(I, this._docs, {
            includeMatches: Q,
            includeScore: Z
        })
    }
    _searchStringList(A) {
        let B = qR0(A, this.options),
            {
                records: Q
            } = this._myIndex,
            Z = [];
        return Q.forEach(({
            v: D,
            i: G,
            n: F
        }) => {
            if (!FH(D)) return;
            let {
                isMatch: I,
                score: Y,
                indices: W
            } = B.searchIn(D);
            if (I) Z.push({
                item: D,
                idx: G,
                matches: [{
                    score: Y,
                    value: D,
                    norm: F,
                    indices: W
                }]
            })
        }), Z
    }
    _searchLogical(A) {
        let B = RbB(A, this.options),
            Q = (F, I, Y) => {
                if (!F.children) {
                    let {
                        keyId: J,
                        searcher: X
                    } = F, V = this._findMatches({
                        key: this._keyStore.get(J),
                        value: this._myIndex.getValueForItemAtKeyId(I, J),
                        searcher: X
                    });
                    if (V && V.length) return [{
                        idx: Y,
                        item: I,
                        matches: V
                    }];
                    return []
                }
                let W = [];
                for (let J = 0, X = F.children.length; J < X; J += 1) {
                    let V = F.children[J],
                        C = Q(V, I, Y);
                    if (C.length) W.push(...C);
                    else if (F.operator === if1.AND) return []
                }
                return W
            },
            Z = this._myIndex.records,
            D = {},
            G = [];
        return Z.forEach(({
            $: F,
            i: I
        }) => {
            if (FH(F)) {
                let Y = Q(B, F, I);
                if (Y.length) {
                    if (!D[I]) D[I] = {
                        idx: I,
                        item: F,
                        matches: []
                    }, G.push(D[I]);
                    Y.forEach(({
                        matches: W
                    }) => {
                        D[I].matches.push(...W)
                    })
                }
            }
        }), G
    }
    _searchObjectList(A) {
        let B = qR0(A, this.options),
            {
                keys: Q,
                records: Z
            } = this._myIndex,
            D = [];
        return Z.forEach(({
            $: G,
            i: F
        }) => {
            if (!FH(G)) return;
            let I = [];
            if (Q.forEach((Y, W) => {
                    I.push(...this._findMatches({
                        key: Y,
                        value: G[W],
                        searcher: B
                    }))
                }), I.length) D.push({
                idx: F,
                item: G,
                matches: I
            })
        }), D
    }
    _findMatches({
        key: A,
        value: B,
        searcher: Q
    }) {
        if (!FH(B)) return [];
        let Z = [];
        if (xS(B)) B.forEach(({
            v: D,
            i: G,
            n: F
        }) => {
            if (!FH(D)) return;
            let {
                isMatch: I,
                score: Y,
                indices: W
            } = Q.searchIn(D);
            if (I) Z.push({
                score: Y,
                key: A,
                value: D,
                idx: G,
                norm: F,
                indices: W
            })
        });
        else {
            let {
                v: D,
                n: G
            } = B, {
                isMatch: F,
                score: I,
                indices: Y
            } = Q.searchIn(D);
            if (F) Z.push({
                score: I,
                key: A,
                value: D,
                norm: G,
                indices: Y
            })
        }
        return Z
    }
}
HU.version = "7.0.0";
HU.createIndex = EbB;
HU.parseIndex = gz8;
HU.config = pQ;
HU.parseQuery = RbB;
nz8(MbB);
var V2 = G1(z1(), 1),
    zU = G1(z1(), 1);
var AE8 = 7250;

function i01(A) {
    let B = A;
    return B = B.replace(/"(sk-ant[^\s"']{24,})"/g, '"[REDACTED_API_KEY]"'), B = B.replace(/(?<![A-Za-z0-9"'])(sk-ant-?[A-Za-z0-9_-]{10,})(?![A-Za-z0-9"'])/g, "[REDACTED_API_KEY]"), B = B.replace(/AWS key: "(AWS[A-Z0-9]{20,})"/g, 'AWS key: "[REDACTED_AWS_KEY]"'), B = B.replace(/(AKIA[A-Z0-9]{16})/g, "[REDACTED_AWS_KEY]"), B = B.replace(/(?<![A-Za-z0-9])(AIza[A-Za-z0-9_-]{35})(?![A-Za-z0-9])/g, "[REDACTED_GCP_KEY]"), B = B.replace(/(?<![A-Za-z0-9])([a-z0-9-]+@[a-z0-9-]+\.iam\.gserviceaccount\.com)(?![A-Za-z0-9])/g, "[REDACTED_GCP_SERVICE_ACCOUNT]"), B = B.replace(/(["']?x-api-key["']?\s*[:=]\s*["']?)[^"',\s)}\]]+/gi, "$1[REDACTED_API_KEY]"), B = B.replace(/(["']?authorization["']?\s*[:=]\s*["']?(bearer\s+)?)[^"',\s)}\]]+/gi, "$1[REDACTED_TOKEN]"), B = B.replace(/(AWS[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED_AWS_VALUE]"), B = B.replace(/(GOOGLE[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED_GCP_VALUE]"), B = B.replace(/((API[-_]?KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED]"), B
}

function ObB() {
    return sq2().map((A) => {
        let B = {
            ...A
        };
        if (B && typeof B.error === "string") B.error = i01(B.error);
        return B
    })
}
var TbB = "https://github.com/anthropics/claude-code/issues";

function SbB({
    messages: A,
    onDone: B
}) {
    let [Q, Z] = zU.useState("userInput"), [D, G] = zU.useState(0), [F, I] = zU.useState(""), [Y, W] = zU.useState(null), [J, X] = zU.useState(null), [V, C] = zU.useState({
        isGit: !1,
        gitState: null
    }), [K, H] = zU.useState(null), z = r9().columns - 4;
    zU.useEffect(() => {
        async function N() {
            let R = await XL(),
                O = null;
            if (R) O = await WeA();
            C({
                isGit: R,
                gitState: O
            })
        }
        N()
    }, []);
    let $ = U2(),
        L = zU.useCallback(async () => {
            Z("submitting"), X(null), W(null);
            let N = ObB(),
                R = {
                    message_count: A.length,
                    datetime: new Date().toISOString(),
                    description: F,
                    platform: sA.platform,
                    gitRepo: V.isGit,
                    terminal: sA.terminal,
                    version: {
                        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                        PACKAGE_URL: "@anthropic-ai/claude-code",
                        README_URL: "https://docs.anthropic.com/s/claude-code",
                        VERSION: "1.0.83"
                    }.VERSION,
                    transcript: AW(A),
                    errors: N
                },
                [O, P] = await Promise.all([ZE8(R), QE8(F)]);
            if (H(P), O.success) {
                if (O.feedbackId) W(O.feedbackId), X1("tengu_bug_report_submitted", {
                    feedback_id: O.feedbackId
                });
                Z("done")
            } else {
                if (O.isZdrOrg) X("Feedback collection is not available for organizations with custom data retention policies.");
                else X("Could not submit feedback. Please try again later.");
                Z("done")
            }
        }, [F, V.isGit, A]);
    return DA((N, R) => {
        if (Q === "done") {
            if (R.return && K) {
                let O = BE8(Y ?? "", K, F, ObB());
                ZU(O)
            }
            if (J) B("Error submitting bug report");
            else B("Bug report submitted");
            return
        }
        if (J) {
            B("Error submitting bug report");
            return
        }
        if (R.escape) {
            B("Bug report cancelled");
            return
        }
        if (Q === "consent" && (R.return || N === " ")) L()
    }), V2.createElement(V2.Fragment, null, V2.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        paddingX: 1,
        paddingBottom: 1,
        gap: 1
    }, V2.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Submit Bug Report"), Q === "userInput" && V2.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, V2.createElement(T, null, "Describe the issue below:"), V2.createElement(y8, {
        value: F,
        onChange: I,
        columns: z,
        onSubmit: () => Z("consent"),
        onExitMessage: () => B("Bug report cancelled"),
        cursorOffset: D,
        onChangeCursorOffset: G
    }), J && V2.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, V2.createElement(T, {
        color: "error"
    }, J), V2.createElement(T, {
        dimColor: !0
    }, "Press any key to close"))), Q === "consent" && V2.createElement(v, {
        flexDirection: "column"
    }, V2.createElement(T, null, "This report will include:"), V2.createElement(v, {
        marginLeft: 2,
        flexDirection: "column"
    }, V2.createElement(T, null, "- Your bug description: ", V2.createElement(T, {
        dimColor: !0
    }, F)), V2.createElement(T, null, "- Environment info:", " ", V2.createElement(T, {
        dimColor: !0
    }, sA.platform, ", ", sA.terminal, ", v", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.VERSION)), V.gitState && V2.createElement(T, null, "- Git repo metadata:", " ", V2.createElement(T, {
        dimColor: !0
    }, V.gitState.branchName, V.gitState.commitHash ? `, ${V.gitState.commitHash.slice(0,7)}` : "", V.gitState.remoteUrl ? ` @ ${V.gitState.remoteUrl}` : "", !V.gitState.isHeadOnRemote && ", not synced", !V.gitState.isClean && ", has local changes")), V2.createElement(T, null, "- Current session transcript")), V2.createElement(v, {
        marginTop: 1
    }, V2.createElement(T, {
        wrap: "wrap",
        dimColor: !0
    }, "We will use your feedback to debug related issues or to improve", " ", "Claude Code's functionality (eg. to reduce the risk of bugs occurring in the future). Anthropic will not train generative models using feedback from Claude Code.")), V2.createElement(v, {
        marginTop: 1
    }, V2.createElement(T, null, "Press ", V2.createElement(T, {
        bold: !0
    }, "Enter"), " to confirm and submit."))), Q === "submitting" && V2.createElement(v, {
        flexDirection: "row",
        gap: 1
    }, V2.createElement(T, null, "Submitting report…")), Q === "done" && V2.createElement(v, {
        flexDirection: "column"
    }, J ? V2.createElement(T, {
        color: "error"
    }, J) : V2.createElement(T, {
        color: "success"
    }, "Thank you for your report!"), Y && V2.createElement(T, {
        dimColor: !0
    }, "Feedback ID: ", Y), V2.createElement(v, {
        marginTop: 1
    }, V2.createElement(T, null, "Press "), V2.createElement(T, {
        bold: !0
    }, "Enter "), V2.createElement(T, null, "to also create a GitHub issue, or any other key to close.")))), V2.createElement(v, {
        marginLeft: 1
    }, V2.createElement(T, {
        dimColor: !0
    }, $.pending ? V2.createElement(V2.Fragment, null, "Press ", $.keyName, " again to exit") : Q === "userInput" ? V2.createElement(V2.Fragment, null, "Enter to continue · Esc to cancel") : Q === "consent" ? V2.createElement(V2.Fragment, null, "Enter to submit · Esc to cancel") : null)))
}