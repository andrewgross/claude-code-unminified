/* chunk:645 bytes:[14607947, 14627339) size:19392 source:unpacked-cli.js */
function SlB({
    onStashAndContinue: A,
    onCancel: B
}) {
    let [Q, Z] = Z3.useState(null), D = Q !== null ? [...Q.tracked, ...Q.untracked] : [], [G, F] = Z3.useState(!0), [I, Y] = Z3.useState(!1), [W, J] = Z3.useState(null);
    Z3.useEffect(() => {
        (async () => {
            try {
                let H = await B40();
                Z(H)
            } catch (H) {
                let z = H instanceof Error ? H.message : String(H);
                SA(`Error getting changed files: ${z}`), J("Failed to get changed files")
            } finally {
                F(!1)
            }
        })()
    }, []);
    let X = async () => {
        Y(!0);
        try {
            if (n1("Stashing changes before teleport..."), await YeA("Teleport auto-stash")) n1("Successfully stashed changes"), A();
            else J("Failed to stash changes")
        } catch (K) {
            let H = K instanceof Error ? K.message : String(K);
            SA(`Error stashing changes: ${H}`), J("Failed to stash changes")
        } finally {
            Y(!1)
        }
    }, V = (K) => {
        if (K === "stash") X();
        else B()
    };
    if (G) return Z3.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, Z3.default.createElement(v, {
        marginBottom: 1
    }, Z3.default.createElement(g6, null), Z3.default.createElement(T, null, " Checking git status", s0.ellipsis)));
    if (W) return Z3.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, Z3.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "Error: ", W), Z3.default.createElement(v, {
        marginTop: 1
    }, Z3.default.createElement(T, {
        dimColor: !0
    }, "Press "), Z3.default.createElement(T, {
        bold: !0
    }, "Escape"), Z3.default.createElement(T, {
        dimColor: !0
    }, " to cancel")));
    let C = D.length > 8;
    return Z3.default.createElement(Bb, {
        title: "Working Directory Has Changes",
        onCancel: B,
        borderColor: "secondaryBorder"
    }, Z3.default.createElement(T, null, "Teleport will switch git branches. The following changes were found:"), Z3.default.createElement(v, {
        flexDirection: "column",
        paddingLeft: 2
    }, D.length > 0 ? C ? Z3.default.createElement(T, null, D.length, " files changed") : D.map((K, H) => Z3.default.createElement(T, {
        key: H
    }, K)) : Z3.default.createElement(T, {
        dimColor: !0
    }, "No changes detected")), Z3.default.createElement(T, null, "Would you like to stash these changes and continue with teleport?"), I ? Z3.default.createElement(v, null, Z3.default.createElement(g6, null), Z3.default.createElement(T, null, " Stashing changes...")) : Z3.default.createElement(uA, {
        options: [{
            label: "Stash changes and continue",
            value: "stash"
        }, {
            label: "Exit",
            value: "exit"
        }],
        onChange: V,
        onCancel: () => B()
    }))
}

function sg1({
    onComplete: A,
    errorsToIgnore: B = new Set
}) {
    let [Q, Z] = VF.useState(null), [D, G] = VF.useState(!1), F = VF.useCallback(async () => {
        let V = await XP0(),
            C = new Set(Array.from(V).filter((K) => !B.has(K)));
        if (C.size === 0) {
            A();
            return
        }
        if (C.has("needsLogin")) Z("needsLogin");
        else if (C.has("needsGitStash")) Z("needsGitStash")
    }, [A, B]);
    VF.useEffect(() => {
        F()
    }, [F]);
    let I = VF.useCallback(() => {
            O5(0)
        }, []),
        Y = VF.useCallback(() => {
            G(!1), F()
        }, [F]),
        W = VF.useCallback(() => {
            G(!0)
        }, [G]),
        J = VF.useCallback((V) => {
            if (V === "login") W();
            else I()
        }, [W, I]),
        X = VF.useCallback(() => {
            F()
        }, [F]);
    if (!Q) return null;
    switch (Q) {
        case "needsGitStash":
            return VF.default.createElement(SlB, {
                onStashAndContinue: X,
                onCancel: I
            });
        case "needsLogin": {
            if (D) return VF.default.createElement(Hb, {
                onDone: Y,
                mode: "login",
                forceLoginMethod: "claudeai"
            });
            return VF.default.createElement(Bb, {
                title: "Log in to Claude",
                onCancel: I
            }, VF.default.createElement(v, {
                flexDirection: "column"
            }, VF.default.createElement(T, {
                dimColor: !0
            }, "Teleport requires a Claude.ai account."), VF.default.createElement(T, {
                dimColor: !0
            }, "Your Claude Pro/Max subscription will be used by Claude Code.")), VF.default.createElement(uA, {
                options: [{
                    label: "Login with Claude account",
                    value: "login"
                }, {
                    label: "Exit",
                    value: "exit"
                }],
                onChange: J,
                onCancel: I
            }))
        }
    }
}
async function rg1() {
    try {
        let A = await j61();
        if (n1(`Git remote URL: ${A}`), !A) return n1("No git remote URL found"), null;
        let B = IT8(A);
        return n1(`Parsed repository: ${B} from URL: ${A}`), B
    } catch (A) {
        return n1(`Error detecting repository: ${A}`), null
    }
}

function IT8(A) {
    let B = A.trim(),
        Q = [/github\.com[:/]([^/]+\/[^/.]+?)(\.git)?$/, /github\.com[:/]([^/]+\/[^/.]+)$/];
    for (let Z of Q) {
        let D = B.match(Z);
        if (D && D[1]) return n1(`Parsed repository: ${D[1]} from ${B}`), D[1]
    }
    if (!B.includes("://") && !B.includes("@") && B.includes("/")) {
        let Z = B.split("/");
        if (Z.length === 2 && Z[0] && Z[1]) {
            let D = Z[1].replace(/\.git$/, "");
            return `${Z[0]}/${D}`
        }
    }
    return n1(`Could not parse repository from: ${B}`), null
}
var jlB = "Updated",
    YT8 = "  ";

function klB({
    onSelect: A,
    onCancel: B,
    isEmbedded: Q = !1
}) {
    let {
        rows: Z
    } = r9(), [D, G] = fQ.useState([]), [F, I] = fQ.useState(null), [Y, W] = fQ.useState(!0), [J, X] = fQ.useState(null), [V, C] = fQ.useState(!1), [K, H] = fQ.useState(!1), z = fQ.useCallback(async () => {
        try {
            W(!0), X(null);
            let f = await rg1();
            I(f), n1(`Current repository: ${f||"not detected"}`);
            let k = await ylB(),
                c = k;
            if (f) c = k.filter((a) => {
                if (!a.repo) return !1;
                return `${a.repo.owner.login}/${a.repo.name}` === f
            }), n1(`Filtered ${c.length} sessions for repo ${f} from ${k.length} total`);
            let u = [...c].sort((a, l) => {
                let y = new Date(a.updated_at);
                return new Date(l.updated_at).getTime() - y.getTime()
            });
            G(u)
        } catch (f) {
            let k = f instanceof Error ? f.message : String(f);
            n1(`Error loading code sessions: ${k}`), X(WT8(k))
        } finally {
            W(!1), C(!1)
        }
    }, []), $ = () => {
        C(!0), z()
    };
    DA((f, k) => {
        if (k.escape || k.ctrl && f === "c") {
            B();
            return
        }
        if (k.ctrl && f === "r" && J) {
            $();
            return
        }
        if (J !== null && k.return) {
            B();
            return
        }
    });
    let L = fQ.useCallback(() => {
        H(!0), z()
    }, [H, z]);
    if (!K) return fQ.default.createElement(sg1, {
        onComplete: L
    });
    if (Y) return fQ.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, fQ.default.createElement(v, {
        flexDirection: "row"
    }, fQ.default.createElement(g6, null), fQ.default.createElement(T, {
        bold: !0
    }, "Loading Claude Code sessions…")), fQ.default.createElement(T, {
        dimColor: !0
    }, V ? "Retrying…" : "Fetching your Claude Code sessions…"));
    if (J) return fQ.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, fQ.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "Error loading Claude Code sessions"), JT8(J), fQ.default.createElement(T, {
        dimColor: !0
    }, "Press ", fQ.default.createElement(T, {
        bold: !0
    }, "Ctrl+R"), " to retry · Press ", fQ.default.createElement(T, {
        bold: !0
    }, "Esc"), " ", "to cancel"));
    if (D.length === 0) return fQ.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, fQ.default.createElement(T, {
        bold: !0
    }, "No Claude Code sessions found", F && fQ.default.createElement(T, null, " for ", F)), fQ.default.createElement(v, {
        marginTop: 1
    }, fQ.default.createElement(T, {
        dimColor: !0
    }, "Press ", fQ.default.createElement(T, {
        bold: !0
    }, "Esc"), " to cancel")));
    let N = D.map((f) => ({
            ...f,
            timeString: wv1(new Date(f.updated_at))
        })),
        R = Math.max(jlB.length, ...N.map((f) => f.timeString.length)),
        O = N.map(({
            timeString: f,
            title: k,
            id: c
        }) => {
            return {
                label: `${f.padEnd(R," ")}  ${k}`,
                value: c
            }
        }),
        P = Q ? Math.min(D.length + 7, Z - 6) : Z - 1,
        j = Q ? Math.min(D.length, 12) : Math.min(D.length, Z - 6);
    return fQ.default.createElement(v, {
        flexDirection: "column",
        padding: 1,
        height: P
    }, fQ.default.createElement(T, {
        bold: !0
    }, "Select a session to resume", F && fQ.default.createElement(T, {
        dimColor: !0
    }, " (", F, ")"), ":"), fQ.default.createElement(v, {
        flexDirection: "column",
        marginY: 1,
        flexGrow: 1
    }, fQ.default.createElement(v, {
        marginLeft: 2
    }, fQ.default.createElement(T, {
        bold: !0
    }, jlB.padEnd(R, " "), YT8, "Session Title")), fQ.default.createElement(hO2, {
        visibleOptionCount: j,
        options: O,
        onChange: (f) => {
            let k = D.find((c) => c.id === f);
            if (k) A(k)
        }
    })), fQ.default.createElement(v, {
        flexDirection: "row"
    }, fQ.default.createElement(T, {
        dimColor: !0
    }, "↑/↓ to select · Enter to confirm · Esc to cancel")))
}

function WT8(A) {
    let B = A.toLowerCase();
    if (B.includes("fetch") || B.includes("network") || B.includes("timeout")) return "network";
    if (B.includes("auth") || B.includes("token") || B.includes("permission") || B.includes("oauth") || B.includes("not authenticated") || B.includes("/login") || B.includes("console account") || B.includes("403")) return "auth";
    if (B.includes("api") || B.includes("rate limit") || B.includes("500") || B.includes("529")) return "api";
    return "other"
}

function JT8(A) {
    switch (A) {
        case "network":
            return fQ.default.createElement(v, {
                marginY: 1,
                flexDirection: "column"
            }, fQ.default.createElement(T, {
                dimColor: !0
            }, "Check your internet connection"));
        case "auth":
            return fQ.default.createElement(v, {
                marginY: 1,
                flexDirection: "column"
            }, fQ.default.createElement(T, {
                dimColor: !0
            }, "Teleport requires a Claude account"), fQ.default.createElement(T, {
                dimColor: !0
            }, "Run ", fQ.default.createElement(T, {
                bold: !0
            }, "/login"), ' and select "Claude account with subscription"'));
        case "api":
            return fQ.default.createElement(v, {
                marginY: 1,
                flexDirection: "column"
            }, fQ.default.createElement(T, {
                dimColor: !0
            }, "Sorry, Claude encountered an error"));
        case "other":
            return fQ.default.createElement(v, {
                marginY: 1,
                flexDirection: "row"
            }, fQ.default.createElement(T, {
                dimColor: !0
            }, "Sorry, Claude Code encountered an error"))
    }
}
var Ic = G1(z1(), 1);

function _lB(A) {
    let [B, Q] = Ic.useState(!1), [Z, D] = Ic.useState(null), [G, F] = Ic.useState(null), I = Ic.useCallback(async (W) => {
        Q(!0), D(null), F(W), X1("tengu_teleport_resume_session", {
            source: A,
            session_id: W.id
        });
        try {
            let J = await VP0(W.id, async (X) => {
                let V = {
                    message: X instanceof kY ? X.message : `Failed to resume session: ${X.message}`,
                    formattedMessage: X instanceof kY ? X.formattedMessage : void 0,
                    isOperationError: X instanceof kY
                };
                D(V), Q(!1)
            });
            return Q(!1), J
        } catch (J) {
            let X = {
                message: J instanceof kY ? J.message : J instanceof Error ? J.message : String(J),
                formattedMessage: J instanceof kY ? J.formattedMessage : void 0,
                isOperationError: J instanceof kY
            };
            return D(X), Q(!1), null
        }
    }, [A]), Y = Ic.useCallback(() => {
        D(null)
    }, []);
    return {
        resumeSession: I,
        isResuming: B,
        error: Z,
        selectedSession: G,
        clearError: Y
    }
}

function xlB({
    onComplete: A,
    onCancel: B,
    onError: Q,
    isEmbedded: Z = !1,
    source: D
}) {
    let {
        resumeSession: G,
        isResuming: F,
        error: I,
        selectedSession: Y
    } = _lB(D), W = async (X) => {
        let V = await G(X);
        if (V) A(V);
        else if (I) {
            if (Q) Q(I.message, I.formattedMessage)
        }
    }, J = () => {
        X1("tengu_teleport_cancelled", {}), B()
    };
    if (F && Y) return KH.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, KH.default.createElement(v, {
        flexDirection: "row"
    }, KH.default.createElement(g6, null), KH.default.createElement(T, {
        bold: !0
    }, "Resuming session…")), KH.default.createElement(T, {
        dimColor: !0
    }, 'Loading "', Y.title, '"…'));
    if (I && !Q) return KH.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, KH.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "Failed to resume session"), KH.default.createElement(T, {
        dimColor: !0
    }, I.message), KH.default.createElement(v, {
        marginTop: 1
    }, KH.default.createElement(T, {
        dimColor: !0
    }, "Press ", KH.default.createElement(T, {
        bold: !0
    }, "Esc"), " to cancel")));
    return KH.default.createElement(klB, {
        onSelect: W,
        onCancel: J,
        isEmbedded: Z
    })
}

function XT8() {
    return q3("Session resumed", "warning")
}

function VT8() {
    return D2({
        content: `This session is being continued from another machine. Application state may have changed. The updated working directory is ${_9()}`,
        isMeta: !0
    })
}
var vlB = h.object({
        id: h.string(),
        title: h.string(),
        description: h.string(),
        status: h.enum(["idle", "working", "waiting", "completed", "archived", "cancelled", "rejected"]),
        repo: h.object({
            name: h.string(),
            owner: h.object({
                login: h.string()
            }),
            default_branch: h.string().optional()
        }).nullable(),
        turns: h.array(h.string()),
        created_at: h.string(),
        updated_at: h.string()
    }),
    CT8 = h.array(vlB),
    KT8 = `You are coming up with a succinct title for a coding session based on the provided description. The title should be clear, concise, and accurately reflect the content of the coding task.
You should keep it short and simple, ideally no more than 6 words. Avoid using jargon or overly technical terms unless absolutely necessary. The title should be easy to understand for anyone reading it.
You should wrap the title in <title> XML tags. You MUST return your best attempt for the title.

For example:
<title>Fix login button not working on mobile</title>
<title>Update README with installation instructions</title>
<title>Improve performance of data processing script</title>`;
async function HT8(A) {
    try {
        let B = `${KT8}

Here is the session description:
<description>${A}</description>

Please generate a title for this session.
`,
            Q = "<title>",
            D = (await jI({
                systemPrompt: [],
                userPrompt: B,
                assistantPrompt: "<title>",
                signal: new AbortController().signal,
                isNonInteractiveSession: !0,
                temperature: 0,
                promptCategory: "title_generation"
            })).message.content[0];
        if (D?.type === "text") {
            let F = D.text.trim();
            if (F.startsWith("<title>")) F = F.slice(7);
            if (F.endsWith("</title>")) F = F.slice(0, -8);
            return F.trim()
        }
    } catch (B) {
        SA(`Error generating title: ${B}`)
    }
    return A.length > 75 ? A.slice(0, 75) + "…" : A
}

function HP0(A) {
    return {
        Authorization: `Bearer ${A}`,
        "Content-Type": "application/json"
    }
}
async function ylB() {
    let A = CZ()?.accessToken;
    if (A === void 0) throw new Error("No access token found. Please authenticate first.");
    let B = await lq1(),
        Q = `${p8().BASE_API_URL}/api/oauth/organizations/${B}/code/sessions`;
    n1(`Fetching code sessions from: ${Q}`);
    try {
        let Z = await J9.get(Q, {
            headers: HP0(A)
        });
        if (Z.status !== 200) throw new Error(`Failed to fetch code sessions: ${Z.statusText}`);
        let D = CT8.safeParse(Z.data);
        if (!D.success) throw new Error(`Invalid response structure from code sessions API: ${D.error.message}`);
        return D.data
    } catch (Z) {
        let D = Z instanceof Error ? Z : new Error(String(Z));
        throw R1(D), SA(`Error message: ${D.message}`), Z
    }
}
async function zT8(A) {
    if (!await Zq1()) {
        let Q = new kY("Git working directory is not clean. Please commit or stash your changes before using --teleport.", e1.red(`Error: Git working directory is not clean. Please commit or stash your changes before using --teleport.
`));
        if (A) throw await A(Q), Q;
        await P4(1)
    }
}
async function ET8(A) {
    let B = A ? ["fetch", "origin", `${A}:${A}`] : ["fetch", "origin"],
        {
            code: Q,
            stderr: Z
        } = await F2("git", B);
    if (Q !== 0)
        if (A && Z.includes("refspec")) {
            n1(`Specific branch fetch failed, trying to fetch ref: ${A}`);
            let {
                code: D,
                stderr: G
            } = await F2("git", ["fetch", "origin", A]);
            if (D !== 0) SA(`Warning: Failed to fetch from remote origin: ${G}`)
        } else SA(`Warning: Failed to fetch from remote origin: ${Z}`)
}