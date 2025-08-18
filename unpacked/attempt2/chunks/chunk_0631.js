/* chunk:631 bytes:[14374955, 14393478) size:18523 source:unpacked-cli.js */
var zM8 = {
        id: "large-memory-files",
        type: "warning",
        isActive: () => {
            return EF1().length > 0
        },
        render: () => {
            let A = EF1();
            return I9.createElement(I9.Fragment, null, A.map((B) => {
                let Q = B.path.startsWith(t0()) ? HM8(t0(), B.path) : B.path;
                return I9.createElement(v, {
                    key: B.path,
                    flexDirection: "row"
                }, I9.createElement(T, {
                    color: "warning"
                }, s0.warning), I9.createElement(T, {
                    color: "warning"
                }, "Large ", I9.createElement(T, {
                    bold: !0
                }, Q), " will impact performance (", SI(B.content.length), " chars >", " ", SI(zF1), ")", I9.createElement(T, {
                    color: "secondaryText",
                    dimColor: !0
                }, " ", "• /memory to edit")))
            }))
        }
    },
    EM8 = {
        id: "ultra-claude-md",
        type: "warning",
        isActive: () => {
            let A = RS();
            return A !== null && A.content.length > L01
        },
        render: () => {
            let A = RS();
            if (!A) return null;
            let B = A.content.length;
            return I9.createElement(v, {
                flexDirection: "row",
                gap: 1
            }, I9.createElement(T, {
                color: "warning"
            }, s0.warning), I9.createElement(T, {
                color: "warning"
            }, "ULTRACLAUDE.md exceeds ", L01, " chars (", B, " chars)", I9.createElement(T, {
                color: "secondaryText",
                dimColor: !0
            }, " ", "• /memory to edit")))
        }
    },
    UM8 = {
        id: "claude-ai-external-token",
        type: "warning",
        isActive: () => {
            let A = Lu();
            return KB() && (A.source === "ANTHROPIC_AUTH_TOKEN" || A.source === "apiKeyHelper")
        },
        render: () => {
            let A = Lu();
            return I9.createElement(v, {
                flexDirection: "row",
                marginTop: 1
            }, I9.createElement(T, {
                color: "warning"
            }, s0.warning), I9.createElement(T, {
                color: "warning"
            }, "Auth conflict: Using ", A.source, " instead of Claude account subscription token. Either unset ", A.source, ", or run `claude /logout`."))
        }
    },
    wM8 = {
        id: "api-key-conflict",
        type: "warning",
        isActive: () => {
            let {
                source: A
            } = DX(!1);
            return !!P51() && (A === "ANTHROPIC_API_KEY" || A === "apiKeyHelper")
        },
        render: () => {
            let {
                source: A
            } = DX(!1);
            return I9.createElement(v, {
                flexDirection: "row",
                marginTop: 1
            }, I9.createElement(T, {
                color: "warning"
            }, s0.warning), I9.createElement(T, {
                color: "warning"
            }, "Auth conflict: Using ", A, " instead of Anthropic Console key. Either unset ", A, ", or run `claude /logout`."))
        }
    },
    $M8 = {
        id: "both-auth-methods",
        type: "warning",
        isActive: () => {
            let {
                source: A
            } = DX(!1), B = Lu();
            return A !== "none" && B.source !== "none" && !(A === "apiKeyHelper" && B.source === "apiKeyHelper")
        },
        render: () => {
            let {
                source: A
            } = DX(!1), B = Lu();
            return I9.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, I9.createElement(v, {
                flexDirection: "row"
            }, I9.createElement(T, {
                color: "warning"
            }, s0.warning), I9.createElement(T, {
                color: "warning"
            }, "Auth conflict: Both a token (", B.source, ") and an API key (", A, ") are set. This may lead to unexpected behavior.")), I9.createElement(v, {
                flexDirection: "column",
                marginLeft: 3
            }, I9.createElement(T, {
                color: "warning"
            }, "• Trying to use", " ", B.source === "claude.ai" ? "claude.ai" : B.source, "?", " ", A === "ANTHROPIC_API_KEY" ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.' : A === "apiKeyHelper" ? "Unset the apiKeyHelper setting." : "claude /logout"), I9.createElement(T, {
                color: "warning"
            }, "• Trying to use ", A, "?", " ", B.source === "claude.ai" ? "claude /logout to sign out of claude.ai." : `Unset the ${B.source} environment variable.`)))
        }
    },
    qM8 = {
        id: "release-notes",
        type: "info",
        isActive: (A) => {
            let {
                hasReleaseNotes: B
            } = eh1(A.config.lastReleaseNotesSeen);
            return B
        },
        render: (A) => {
            let {
                releaseNotes: B
            } = eh1(A.config.lastReleaseNotesSeen);
            return I9.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, I9.createElement(T, {
                color: "secondaryText"
            }, "What's new:"), I9.createElement(v, {
                flexDirection: "column",
                marginLeft: 1
            }, B.map((Q, Z) => I9.createElement(T, {
                key: Z,
                color: "secondaryText"
            }, "• ", Q))))
        }
    },
    NM8 = {
        id: "sonnet-1m-welcome",
        type: "info",
        isActive: (A) => A.showSonnet1MNotice === !0,
        render: () => {
            return I9.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, I9.createElement(T, {
                bold: !0
            }, "Your default model is now Sonnet 4 with 1M context (uses more rate limits than Sonnet on long requests) • /model to switch back"))
        }
    },
    LM8 = [zM8, EM8, UM8, wM8, $M8, qM8, NM8];

function tmB(A) {
    return LM8.filter((B) => B.isActive(A))
}

function emB() {
    let A = H0(),
        B = A.oauthAccount?.organizationUuid,
        Z = yw1() === zy.value,
        D = B && A.hasShownS1MWelcome?.[B],
        F = {
            config: A,
            showSonnet1MNotice: Z && !D
        },
        I = tmB(F);
    if (NR.useEffect(() => {
            if (I.some((W) => W.id === "sonnet-1m-welcome") && B) X1("tengu_sonnet_1m_notice_shown", {}), gA({
                ...A,
                hasShownS1MWelcome: {
                    ...A.hasShownS1MWelcome,
                    [B]: !0
                }
            })
        }, [I, A, B]), NR.useEffect(() => {
            if (I.some((W) => W.id === "release-notes")) gA({
                ...A,
                lastReleaseNotesSeen: {
                    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                    PACKAGE_URL: "@anthropic-ai/claude-code",
                    README_URL: "https://docs.anthropic.com/s/claude-code",
                    VERSION: "1.0.83"
                }.VERSION
            })
        }, [A, I]), I.length === 0) return null;
    return NR.createElement(v, {
        flexDirection: "column",
        paddingLeft: 1
    }, I.map((Y) => NR.createElement(NR.Fragment, {
        key: Y.id
    }, Y.render(F))))
}
var TU = G1(z1(), 1);
async function MM8() {
    if (KB()) return !1;
    let A = await S02(!1);
    if (!A) return !1;
    return Boolean(A.account.has_claude_max) || Boolean(A.account.has_claude_pro)
}

function AdB() {
    let [A] = TU.useState(() => {
        let B = H0(),
            Q = B.subscriptionNoticeCount ?? 0,
            Z = B.hasAvailableSubscription;
        if (Q >= 3) return !1;
        return Z ?? !1
    });
    return TU.useEffect(() => {
        MM8().then((B) => {
            let Q = H0(),
                Z = Q.subscriptionNoticeCount ?? 0;
            if (B) Z += 1;
            if (Q.subscriptionNoticeCount !== Z || Q.hasAvailableSubscription !== B) gA({
                ...Q,
                subscriptionNoticeCount: Z,
                hasAvailableSubscription: B
            })
        })
    }, [A]), A
}

function BdB() {
    return TU.useEffect(() => {
        X1("tengu_switch_to_subscription_notice_shown", {})
    }, []), TU.createElement(v, {
        paddingLeft: 1,
        marginTop: 1,
        marginBottom: 1
    }, TU.createElement(T, {
        color: "suggestion"
    }, "You can now use your Claude subscription with Claude Code", TU.createElement(T, {
        color: "text",
        dimColor: !0
    }, " ", "• /login to activate")))
}
var jT0 = G1(z1(), 1);

function QdB({
    message: A,
    isTranscriptMode: B
}) {
    if (!(B && A.timestamp && A.type === "assistant" && A.message.content.some((D) => D.type === "text"))) return null;
    let Z = new Date(A.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
    });
    return jT0.default.createElement(v, {
        marginTop: 1
    }, jT0.default.createElement(T, {
        dimColor: !0
    }, Z))
}
var yI1 = 10,
    RM8 = ({
        messages: A,
        normalizedMessageHistory: B,
        tools: Q,
        verbose: Z,
        toolJSX: D,
        toolUseConfirmQueue: G,
        inProgressToolUseIDs: F,
        isMessageSelectorVisible: I,
        conversationId: Y,
        screen: W,
        screenToggleId: J,
        streamingToolUses: X,
        showAllInTranscript: V = !1
    }) => {
        let C = zR(),
            {
                columns: K
            } = r9(),
            H = AdB(),
            z = TPB(),
            [$, L] = E9.useState([]);
        E9.useEffect(() => {
            EA1().then((k) => L(k))
        }, []);
        let N = Nb.useMemo(() => IF(A).filter(Ld), [A]),
            R = Nb.useMemo(() => new Set(Object.keys(U01(N))), [N]),
            O = Nb.useMemo(() => mb1(N), [N]),
            P = Nb.useMemo(() => X.filter((k) => {
                if (F.has(k.contentBlock.id)) return !1;
                if (N.some((c) => c.type === "assistant" && c.message.content[0].type === "tool_use" && c.message.content[0].id === k.contentBlock.id)) return !1;
                return !0
            }), [X, F, N]),
            j = Nb.useMemo(() => P.flatMap((k) => IF([YU({
                content: [k.contentBlock]
            })])), [P]),
            f = Nb.useCallback((k) => {
                let c = W === "transcript",
                    u = c && !V,
                    a = u ? N.slice(-yI1) : N,
                    l = u && N.length > yI1;
                return [{
                    type: "static",
                    jsx: E9.createElement(v, {
                        flexDirection: "column",
                        gap: 1,
                        key: `logo-${Y}-${J}`
                    }, E9.createElement(VA1, {
                        model: C
                    }), hj1() ? E9.createElement(HK0, null) : E9.createElement(emB, null))
                }, ...H ? [{
                    type: "static",
                    jsx: E9.createElement(v, {
                        key: `max-subscription-${Y}-${J}`
                    }, E9.createElement(BdB, null))
                }] : [], ...z && !H ? [{
                    type: "static",
                    jsx: E9.createElement(v, {
                        key: `subscription-upsell-${Y}-${J}`
                    }, E9.createElement(PPB, null))
                }] : [], ...$.length > 0 ? [{
                    type: "static",
                    jsx: E9.createElement(v, {
                        key: `install-messages-${Y}-${J}`,
                        flexDirection: "column",
                        paddingLeft: 1
                    }, $.map((y, t) => E9.createElement(v, {
                        key: t,
                        flexDirection: "row",
                        marginTop: 1
                    }, E9.createElement(T, {
                        color: "warning"
                    }, s0.bullet), E9.createElement(T, {
                        color: "warning"
                    }, " ", y))))
                }] : [], ...l ? [{
                    type: "static",
                    jsx: E9.createElement(Bc, {
                        key: `truncation-indicator-${Y}-${J}`,
                        dividerChar: "─",
                        title: `Ctrl+E to show ${e1.bold(N.length-yI1)} previous messages`,
                        titleColor: "secondaryText",
                        dividerColor: "secondaryBorder",
                        width: K
                    })
                }] : [], ...c && V && N.length > yI1 ? [{
                    type: "static",
                    jsx: E9.createElement(Bc, {
                        key: `hide-indicator-${Y}-${J}`,
                        dividerChar: "─",
                        title: `Ctrl+E to hide ${e1.bold(N.length-yI1)} previous messages`,
                        titleColor: "secondaryText",
                        dividerColor: "secondaryBorder",
                        width: K
                    })
                }] : [], ...B.length > 0 ? [{
                    type: "static",
                    jsx: E9.createElement(v, {
                        flexDirection: "column",
                        gap: 1,
                        key: `history-${Y}-${J}`
                    }, KL0(B.filter((y) => y.type !== "progress").filter((y) => EL0(y, c)), []).map((y) => E9.createElement(v, {
                        key: `history-${y.uuid}-${J}`,
                        width: K - 5
                    }, E9.createElement(PS, {
                        message: y,
                        messages: B,
                        addMargin: !0,
                        tools: Q,
                        verbose: k,
                        erroredToolUseIDs: new Set,
                        inProgressToolUseIDs: new Set,
                        progressMessagesForMessage: [],
                        shouldAnimate: !1,
                        shouldShowDot: !0,
                        resolvedToolUseIDs: new Set
                    }))), E9.createElement(Bc, {
                        dividerChar: "=",
                        title: "Previous Conversation Compacted"
                    }))
                }] : [], ...KL0(a.filter((y) => y.type !== "progress").filter((y) => EL0(y, c)), j).map((y) => {
                    let t = IF1(y),
                        E1 = PjB(y, N),
                        C1 = y.type === "user" && y.isCompactSummary ? E9.createElement(omB, {
                            message: y,
                            screen: W
                        }) : E9.createElement(PS, {
                            message: y,
                            messages: N,
                            addMargin: !0,
                            tools: Q,
                            verbose: k,
                            erroredToolUseIDs: O,
                            inProgressToolUseIDs: F,
                            progressMessagesForMessage: E1,
                            shouldAnimate: (!D || !!D.shouldContinueAnimation) && !G.length && !I && (!t || F.has(t)),
                            shouldShowDot: !0,
                            resolvedToolUseIDs: R
                        });
                    return {
                        type: OM8(y, A, new Set(X.map((F0) => F0.contentBlock.id)), R, W) ? "static" : "transient",
                        jsx: E9.createElement(v, {
                            key: `${y.uuid}-${E1.length}-${J}`,
                            width: K - 5,
                            flexDirection: "column"
                        }, E9.createElement(QdB, {
                            message: y,
                            isTranscriptMode: c
                        }), C1)
                    }
                }).filter((y) => y !== void 0), ...QSB() ? [{
                    type: "static",
                    jsx: E9.createElement(DSB, null)
                }] : []]
            }, [W, V, N, Y, J, C, H, z, $, K, B, j, Q, O, F, D, G.length, I, R, A, X]);
        return E9.createElement(E9.Fragment, null, E9.createElement(oO1, {
            key: `static-messages-${Y}-${J}`,
            items: f(Z).filter((k) => k.type === "static")
        }, (k) => k.jsx), f(Z).filter((k) => k.type === "transient").map((k) => k.jsx))
    },
    _I1 = E9.memo(RM8);

function OM8(A, B, Q, Z, D) {
    if (D === "transcript") return !0;
    switch (A.type) {
        case "attachment":
            return !0;
        case "system":
        case "user":
        case "assistant": {
            let G = IF1(A);
            if (!G) return !0;
            if (Q.has(G)) return !1;
            let F = RjB(A, B);
            return H3B(F, Z)
        }
        case "progress":
            return !1
    }
}
var xI1 = G1(z1(), 1);
var p3 = G1(z1(), 1);
import {
    join as PM8
} from "path";
import {
    execSync as TM8
} from "child_process";

function ZdB(A) {
    let B = L9(),
        Z = {
            macos: ["pbcopy"],
            linux: ["xclip -selection clipboard", "wl-copy"],
            wsl: ["clip.exe"],
            windows: ["clip"],
            unknown: ["xclip -selection clipboard", "wl-copy"]
        } [B];
    for (let D of Z) try {
        return TM8(D, {
            input: A,
            encoding: "utf-8"
        }), !0
    } catch (G) {
        R1(new Error(`Failed to execute clipboard command "${D}": ${G}`));
        continue
    }
    return R1(new Error(`Failed to copy to clipboard on ${B}`)), !1
}

function DdB() {
    let A = L9();
    return {
        macos: "Failed to copy to clipboard. Make sure the `pbcopy` command is available on your system and try again.",
        windows: "Failed to copy to clipboard. Make sure the `clip` command is available on your system and try again.",
        wsl: "Failed to copy to clipboard. Make sure the `clip.exe` command is available in your WSL environment and try again.",
        linux: "Failed to copy to clipboard. Make sure `xclip` or `wl-copy` is installed on your system and try again.",
        unknown: "Failed to copy to clipboard. Make sure `xclip` or `wl-copy` is installed on your system and try again."
    } [A]
}