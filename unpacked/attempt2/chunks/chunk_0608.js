/* chunk:608 bytes:[13967693, 13987035) size:19342 source:unpacked-cli.js */
function Hb({
    onDone: A,
    startingMessage: B,
    mode: Q = "login",
    forceLoginMethod: Z
}) {
    let D = GB() || {},
        G = Z ?? D.forceLoginMethod,
        [F, I] = BB.useState(!1),
        Y = G === "claudeai" ? "Login method pre-selected: Subscription Plan (Claude Pro/Max)" : G === "console" ? "Login method pre-selected: API Usage Billing (Anthropic Console)" : null,
        [W, J] = BB.useState(() => {
            if (Q === "setup-token") return {
                state: "ready_to_start"
            };
            if (G === "claudeai" || G === "console") return {
                state: "ready_to_start"
            };
            return {
                state: "idle"
            }
        }),
        [X, V] = BB.useState(""),
        [C, K] = BB.useState(0),
        [H] = BB.useState(() => new wI1),
        [z, $] = BB.useState(() => {
            return Q === "setup-token" || G === "claudeai"
        }),
        [L, N] = BB.useState(!1),
        [R] = BB.useState(() => new qI1),
        O = r9().columns - hgB.length - 1;
    BB.useEffect(() => {
        MY("tengu_show_all_subscription_types").then(I)
    }, []), BB.useEffect(() => {
        if (G === "claudeai") X1("tengu_oauth_claudeai_forced", {});
        else if (G === "console") X1("tengu_oauth_console_forced", {})
    }, [G]), BB.useEffect(() => {
        if (W.state === "about_to_retry") V7(), R.reset(), setTimeout(() => {
            J(W.nextState)
        }, 1000)
    }, [W, R]), DA(async (c, u) => {
        if (u.return) {
            if (W.state === "success" && Q !== "setup-token") X1("tengu_oauth_success", {
                loginWithClaudeAi: z
            }), await V7(), A();
            else if (W.state === "error" && W.toRetry) V(""), J({
                state: "about_to_retry",
                nextState: W.toRetry
            })
        }
    });
    async function P(c, u) {
        try {
            let [a, l] = c.split("#");
            if (!a || !l) {
                J({
                    state: "error",
                    message: "Invalid code. Please make sure the full code was copied",
                    toRetry: {
                        state: "waiting_for_login",
                        url: u
                    }
                });
                return
            }
            X1("tengu_oauth_manual_entry", {}), H.handleManualAuthCodeInput({
                authorizationCode: a,
                state: l
            })
        } catch (a) {
            R1(a instanceof Error ? a : new Error(String(a))), J({
                state: "error",
                message: a.message,
                toRetry: {
                    state: "waiting_for_login",
                    url: u
                }
            })
        }
    }
    let j = BB.useCallback(async () => {
            try {
                let c = await H.startOAuthFlow(async (a) => {
                        J({
                            state: "waiting_for_login",
                            url: a
                        }), setTimeout(() => N(!0), 3000)
                    }, {
                        loginWithClaudeAi: z,
                        inferenceOnly: Q === "setup-token",
                        expiresIn: Q === "setup-token" ? 31536000 : void 0
                    }).catch((a) => {
                        let l = a.message.includes("Token exchange failed");
                        throw J({
                            state: "error",
                            message: l ? "Failed to exchange authorization code for access token. Please try again." : a.message,
                            toRetry: Q === "setup-token" ? {
                                state: "ready_to_start"
                            } : {
                                state: "idle"
                            }
                        }), X1("tengu_oauth_token_exchange_error", {
                            error: a.message
                        }), a
                    }),
                    u = S51(c);
                if (u.warning) X1("tengu_oauth_storage_warning", {
                    warning: u.warning
                });
                if (J({
                        state: "creating_api_key"
                    }), Q === "setup-token") J({
                    state: "success",
                    token: c.accessToken
                });
                else if (await y02(c.accessToken).catch((l) => {
                        throw J({
                            state: "error",
                            message: "Failed to fetch user roles: " + l.message,
                            toRetry: {
                                state: "idle"
                            }
                        }), X1("tengu_oauth_user_roles_error", {
                            error: l.message
                        }), l
                    }), TT(c.scopes) ? !0 : await _02(c.accessToken).catch((l) => {
                        throw J({
                            state: "error",
                            message: "Failed to create API key: " + l.message,
                            toRetry: {
                                state: "idle"
                            }
                        }), X1("tengu_oauth_api_key_error", {
                            error: l.message
                        }), l
                    })) await Promise.all([Nb1(), ...TT(c.scopes) ? [q_A()] : []]), iO0(), J({
                    state: "success"
                }), w01({
                    message: "Claude Code login successful"
                });
                else J({
                    state: "error",
                    message: "Unable to create API key. The server accepted the request but didn't return a key.",
                    toRetry: {
                        state: "idle"
                    }
                }), X1("tengu_oauth_api_key_error", {
                    error: "server_returned_no_key"
                })
            } catch (c) {
                let u = c.message;
                X1("tengu_oauth_error", {
                    error: u
                })
            }
        }, [H, N, z, Q]),
        f = BB.useRef(!1);
    BB.useEffect(() => {
        if (W.state === "ready_to_start" && !f.current) f.current = !0, process.nextTick(() => {
            j(), f.current = !1
        })
    }, [W.state, j]), BB.useEffect(() => {
        if (Q === "setup-token" && W.state === "success") {
            let c = setTimeout(async () => {
                X1("tengu_oauth_success", {
                    loginWithClaudeAi: z
                }), A()
            }, 500);
            return () => clearTimeout(c)
        }
    }, [Q, W, z, A]);

    function k() {
        switch (W.state) {
            case "idle":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, BB.default.createElement(T, {
                    bold: !0
                }, B ? B : "Claude Code can now be used with your Claude subscription or billed based on API usage through your Console account."), BB.default.createElement(v, {
                    marginTop: 1
                }, BB.default.createElement(T, {
                    bold: !0
                }, "Select login method:")), BB.default.createElement(v, null, BB.default.createElement(uA, {
                    options: [{
                        label: F ? `Claude account with subscription
 ${e1.dim("Pro, Max, Team, or Enterprise")}
` : `Claude account with subscription
 ${e1.dim("Starting at $20/mo for Pro, $100/mo for Max - Best value, predictable pricing")}
`,
                        value: "claudeai"
                    }, {
                        label: `Anthropic Console account
 ${e1.dim("API usage billing")}
`,
                        value: "console"
                    }],
                    onCancel: () => {},
                    onChange: (c) => {
                        if (J({
                                state: "ready_to_start"
                            }), c === "claudeai") X1("tengu_oauth_claudeai_selected", {}), $(!0);
                        else X1("tengu_oauth_console_selected", {}), $(!1)
                    }
                })));
            case "waiting_for_login":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, Y && BB.default.createElement(v, null, BB.default.createElement(T, {
                    dimColor: !0
                }, Y)), !L && BB.default.createElement(v, null, BB.default.createElement(g6, null), BB.default.createElement(T, null, "Opening browser to sign in…")), L && BB.default.createElement(v, null, BB.default.createElement(T, null, hgB), BB.default.createElement(y8, {
                    value: X,
                    onChange: V,
                    onSubmit: (c) => P(c, W.url),
                    cursorOffset: C,
                    onChangeCursorOffset: K,
                    columns: O
                })));
            case "creating_api_key":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, BB.default.createElement(v, null, BB.default.createElement(g6, null), BB.default.createElement(T, null, "Creating API key for Claude Code…")));
            case "about_to_retry":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, BB.default.createElement(T, {
                    color: "permission"
                }, "Retrying…"));
            case "success":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 2
                }, Q === "setup-token" && W.token ? null : BB.default.createElement(BB.default.Fragment, null, H0().oauthAccount?.emailAddress ? BB.default.createElement(T, {
                    dimColor: !0
                }, "Logged in as", " ", BB.default.createElement(T, null, H0().oauthAccount?.emailAddress)) : null, BB.default.createElement(T, {
                    color: "success"
                }, "Login successful. Press ", BB.default.createElement(T, {
                    bold: !0
                }, "Enter"), " to continue…")));
            case "error":
                return BB.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, BB.default.createElement(T, {
                    color: "error"
                }, "OAuth error: ", W.message), W.toRetry && BB.default.createElement(v, {
                    marginTop: 1
                }, BB.default.createElement(T, {
                    color: "permission"
                }, "Press ", BB.default.createElement(T, {
                    bold: !0
                }, "Enter"), " to retry.")));
            default:
                return null
        }
    }
    return BB.useEffect(() => {
        let c = {};
        if (c.header = BB.default.createElement(v, {
                key: "header",
                flexDirection: "column",
                gap: 1
            }, BB.default.createElement(aO0, null), BB.default.createElement(v, {
                paddingBottom: 1,
                paddingLeft: 1
            }, BB.default.createElement(_gB, null))), W.state === "waiting_for_login" && L) c.urlToCopy = BB.default.createElement(v, {
            flexDirection: "column",
            key: "urlToCopy",
            gap: 1,
            paddingBottom: 1
        }, BB.default.createElement(v, {
            paddingX: 1
        }, BB.default.createElement(T, {
            dimColor: !0
        }, "Browser didn't open? Use the url below to sign in:")), BB.default.createElement(v, {
            width: 1000
        }, BB.default.createElement(T, {
            dimColor: !0
        }, W.url)));
        if (Q === "setup-token" && W.state === "success" && W.token) c.tokenOutput = BB.default.createElement(v, {
            key: "tokenOutput",
            flexDirection: "column",
            gap: 1,
            paddingTop: 1
        }, BB.default.createElement(T, {
            color: "success"
        }, "✓ Long-lived authentication token created successfully!"), BB.default.createElement(v, {
            flexDirection: "column",
            gap: 1
        }, BB.default.createElement(T, null, "Your OAuth token (valid for 1 year):"), BB.default.createElement(v, {
            width: 1000
        }, BB.default.createElement(T, {
            color: "warning"
        }, W.token)), BB.default.createElement(T, {
            dimColor: !0
        }, "Store this token securely. You won't be able to see it again."), BB.default.createElement(T, {
            dimColor: !0
        }, "Use this token by setting: export CLAUDE_CODE_OAUTH_TOKEN=<token>")));
        R.renderStatic(c)
    }, [R, W, L, Q]), BB.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, BB.default.createElement(v, {
        paddingLeft: 1,
        flexDirection: "column",
        gap: 1
    }, k()))
}
var PQ = G1(z1(), 1);
var ZN8 = 53;

function VA1({
    model: A
}) {
    let B = IQ(process.env.IS_DEMO) ? 29 : Math.max(ZN8, t0().length + 12),
        Q = LY(!1),
        {
            columns: Z
        } = r9(),
        D = Z < B,
        G = Boolean(process.env.ANTHROPIC_API_KEY && dq2(process.env.ANTHROPIC_API_KEY)),
        F = IQ(process.env.DISABLE_PROMPT_CACHING),
        I = O_A(A),
        Y = null,
        W = Boolean(G || F || process.env.API_TIMEOUT_MS || process.env.MAX_THINKING_TOKENS || process.env.ANTHROPIC_BASE_URL);
    return PQ.createElement(v, {
        flexDirection: "column"
    }, PQ.createElement(v, {
        ...D ? {} : {
            borderColor: "claude",
            borderStyle: "round"
        },
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1,
        width: B
    }, PQ.createElement(T, null, PQ.createElement(T, {
        color: "claude"
    }, "✻"), " Welcome to ", PQ.createElement(T, {
        bold: !0
    }, "Claude Code"), "!"), process.env.IS_DEMO ? null : PQ.createElement(PQ.Fragment, null, PQ.createElement(v, {
        paddingLeft: 2,
        flexDirection: "column",
        gap: 1
    }, PQ.createElement(T, {
        color: "secondaryText",
        italic: !0
    }, "/help for help, /status for your current setup"), PQ.createElement(T, {
        color: "secondaryText"
    }, "cwd: ", t0()), !1, !1), W && PQ.createElement(v, {
        borderColor: "secondaryBorder",
        borderStyle: "single",
        borderBottom: !1,
        borderLeft: !1,
        borderRight: !1,
        borderTop: !0,
        flexDirection: "column",
        marginLeft: 2,
        marginRight: 1,
        paddingTop: 1
    }, PQ.createElement(v, {
        marginBottom: 1
    }, PQ.createElement(T, {
        color: "secondaryText"
    }, "Overrides (via env):")), G && Q ? PQ.createElement(T, {
        color: "secondaryText"
    }, "• API Key:", " ", PQ.createElement(T, {
        bold: !0
    }, Q.length < 25 ? `${Q.slice(0,3)}…` : `sk-ant-…${Q.slice(-B+25)}`)) : null, F ? PQ.createElement(T, {
        color: "secondaryText"
    }, "• Prompt caching:", " ", PQ.createElement(T, {
        color: "error",
        bold: !0
    }, "off")) : null, process.env.API_TIMEOUT_MS ? PQ.createElement(T, {
        color: "secondaryText"
    }, "• API timeout:", " ", PQ.createElement(T, {
        bold: !0
    }, process.env.API_TIMEOUT_MS, "ms")) : null, process.env.MAX_THINKING_TOKENS ? PQ.createElement(T, {
        color: "secondaryText"
    }, "• Max thinking tokens:", " ", PQ.createElement(T, {
        bold: !0
    }, process.env.MAX_THINKING_TOKENS)) : null, process.env.ANTHROPIC_BASE_URL ? PQ.createElement(T, {
        color: "secondaryText"
    }, "• API Base URL:", " ", PQ.createElement(T, {
        bold: !0
    }, process.env.ANTHROPIC_BASE_URL)) : null))))
}
var ggB = G1(z1(), 1);

function zR() {
    let [{
        mainLoopModel: A,
        maxRateLimitFallbackActive: B
    }] = tQ();
    return ggB.useMemo(() => {
        return BL(A ?? z20(B))
    }, [A, B])
}
var ugB = () => ({
    type: "local-jsx",
    name: "login",
    description: LY(!1) ? "Switch Anthropic accounts" : "Sign in with your Anthropic account",
    isEnabled: () => !process.env.DISABLE_LOGIN_COMMAND,
    isHidden: !1,
    async call(A, B) {
        return await V7(), mI.createElement(rO0, {
            onDone: async (Q, Z) => {
                $I1(mI.createElement(VA1, {
                    model: Z
                })), B.onChangeAPIKey(), A(Q ? "Login successful" : "Login interrupted")
            }
        })
    },
    userFacingName() {
        return "login"
    }
});

function rO0(A) {
    let B = zR(),
        Q = U2(() => A.onDone(!1, B));
    return mI.createElement(v, {
        flexDirection: "column"
    }, mI.createElement(Hb, {
        onDone: () => A.onDone(!0, B),
        startingMessage: A.startingMessage
    }), mI.createElement(v, {
        marginLeft: 3
    }, mI.createElement(T, {
        dimColor: !0
    }, Q.pending ? mI.createElement(mI.Fragment, null, "Press ", Q.keyName, " again to exit") : "")))
}
var u7 = G1(z1(), 1);
import {
    execSync as ah1
} from "child_process";
var mgB = G1(z1(), 1);

function dgB() {
    return mgB.default.createElement(T, null, "Checking GitHub CLI installation…")
}
var KW = G1(z1(), 1);

function cgB({
    currentRepo: A,
    useCurrentRepo: B,
    repoUrl: Q,
    onRepoUrlChange: Z,
    onSubmit: D,
    onToggleUseCurrentRepo: G
}) {
    let [F, I] = KW.useState(0), W = r9().columns;
    return DA((J, X) => {
        if (X.upArrow) G(!0);
        else if (X.downArrow) G(!1);
        else if (X.return) D()
    }), KW.default.createElement(KW.default.Fragment, null, KW.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, KW.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, KW.default.createElement(T, {
        bold: !0
    }, "Install GitHub App"), KW.default.createElement(T, {
        dimColor: !0
    }, "Select GitHub repository")), A && KW.default.createElement(v, {
        marginBottom: 1
    }, KW.default.createElement(T, {
        bold: B,
        color: B ? "permission" : void 0
    }, B ? "> " : "  ", "Use current repository: ", A)), KW.default.createElement(v, {
        marginBottom: 1
    }, KW.default.createElement(T, {
        bold: !B || !A,
        color: !B || !A ? "permission" : void 0
    }, !B || !A ? "> " : "  ", "Enter a different repository")), (!B || !A) && KW.default.createElement(v, {
        marginBottom: 1
    }, KW.default.createElement(y8, {
        value: Q,
        onChange: Z,
        onSubmit: D,
        focus: !0,
        placeholder: "owner/repo or https://github.com/owner/repo",
        columns: W,
        cursorOffset: F,
        onChangeCursorOffset: I,
        showCursor: !0
    }))), KW.default.createElement(v, {
        marginLeft: 3
    }, KW.default.createElement(T, {
        dimColor: !0
    }, A ? "↑/↓ to select · " : "", "Enter to continue")))
}
var WF = G1(z1(), 1);