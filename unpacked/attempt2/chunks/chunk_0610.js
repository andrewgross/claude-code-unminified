/* chunk:610 bytes:[14007028, 14025429) size:18401 source:unpacked-cli.js */
function BuB({
    warnings: A,
    onContinue: B
}) {
    return DA((Q, Z) => {
        if (Z.return) B()
    }), HW.default.createElement(HW.default.Fragment, null, HW.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, HW.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, HW.default.createElement(T, {
        bold: !0
    }, s0.warning, " Setup Warnings"), HW.default.createElement(T, {
        dimColor: !0
    }, "We found some potential issues, but you can continue anyway")), A.map((Q, Z) => HW.default.createElement(v, {
        key: Z,
        flexDirection: "column",
        marginBottom: 1
    }, HW.default.createElement(T, {
        color: "warning",
        bold: !0
    }, Q.title), HW.default.createElement(T, null, Q.message), Q.instructions.length > 0 && HW.default.createElement(v, {
        flexDirection: "column",
        marginLeft: 2,
        marginTop: 1
    }, Q.instructions.map((D, G) => HW.default.createElement(T, {
        key: G,
        dimColor: !0
    }, "• ", D))))), HW.default.createElement(v, {
        marginTop: 1
    }, HW.default.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Press Enter to continue anyway, or Ctrl+C to exit and fix issues")), HW.default.createElement(v, {
        marginTop: 1
    }, HW.default.createElement(T, {
        dimColor: !0
    }, "You can also try the manual setup steps if needed:", " ", HW.default.createElement(T, {
        color: "claude"
    }, ER)))))
}
var TD = G1(z1(), 1);

function QuB({
    onSubmit: A,
    defaultSelections: B
}) {
    let [Q, Z] = TD.useState(new Set(B)), [D, G] = TD.useState(0), [F, I] = TD.useState(!1), Y = [{
        value: "claude",
        label: "@Claude Code",
        description: "Tag @claude in issues and PR comments"
    }, {
        value: "claude-review",
        label: "Claude Code Review",
        description: "Automated code review on new PRs"
    }];
    return DA((W, J) => {
        if (J.upArrow) G((X) => X > 0 ? X - 1 : Y.length - 1), I(!1);
        else if (J.downArrow) G((X) => X < Y.length - 1 ? X + 1 : 0), I(!1);
        else if (W === " ") {
            let X = Y[D]?.value;
            if (X) Z((V) => {
                let C = new Set(V);
                if (C.has(X)) C.delete(X);
                else C.add(X);
                return C
            })
        } else if (J.return)
            if (Q.size === 0) I(!0);
            else A(Array.from(Q))
    }), TD.default.createElement(TD.default.Fragment, null, TD.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1,
        width: "100%"
    }, TD.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, TD.default.createElement(T, {
        bold: !0
    }, "Select GitHub workflows to install"), TD.default.createElement(T, {
        dimColor: !0
    }, "We'll create a workflow file in your repository for each one you select.")), TD.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, Y.map((W, J) => {
        let X = Q.has(W.value),
            V = J === D;
        return TD.default.createElement(v, {
            key: W.value,
            flexDirection: "row",
            marginBottom: J < Y.length - 1 ? 1 : 0
        }, TD.default.createElement(v, {
            marginRight: 1,
            minWidth: 2
        }, TD.default.createElement(T, {
            bold: V
        }, X ? "✓" : " ")), TD.default.createElement(v, {
            flexDirection: "column"
        }, TD.default.createElement(T, {
            bold: V
        }, W.label), TD.default.createElement(T, {
            dimColor: !0
        }, W.description)))
    }))), TD.default.createElement(v, {
        marginLeft: 2
    }, TD.default.createElement(T, {
        dimColor: !0
    }, "↑↓ Navigate · Space to toggle · Enter to confirm")), F && TD.default.createElement(v, {
        marginLeft: 1
    }, TD.default.createElement(T, {
        color: "error"
    }, "You must select at least one workflow to continue")))
}
async function DN8(A, B, Q, Z, D, G, F) {
    let I = await F2("gh", ["api", `repos/${A}/contents/${Q}`, "--jq", ".sha"]),
        Y = null;
    if (I.code === 0) Y = I.stdout.trim();
    let W = Z;
    if (D === "CLAUDE_CODE_OAUTH_TOKEN") W = Z.replace(/anthropic_api_key: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/g, "claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}");
    else if (D !== "ANTHROPIC_API_KEY") W = Z.replace(/anthropic_api_key: \$\{\{ secrets\.ANTHROPIC_API_KEY \}\}/g, `anthropic_api_key: \${{ secrets.${D} }}`);
    let J = Buffer.from(W).toString("base64"),
        X = ["api", "--method", "PUT", `repos/${A}/contents/${Q}`, "-f", `message=${Y?`"Update ${G}"`:`"${G}"`}`, "-f", `content=${J}`, "-f", `branch=${B}`];
    if (Y) X.push("-f", `sha=${Y}`);
    let V = await F2("gh", X);
    if (V.code !== 0) {
        if (V.stderr.includes("422") && V.stderr.includes("sha")) throw X1("tengu_setup_github_actions_failed", {
            reason: "failed_to_create_workflow_file",
            exit_code: V.code,
            ...F
        }), new Error(`Failed to create workflow file ${Q}: A Claude workflow file already exists in this repository. Please remove it first or update it manually.`);
        X1("tengu_setup_github_actions_failed", {
            reason: "failed_to_create_workflow_file",
            exit_code: V.code,
            ...F
        });
        let C = `

Need help? Common issues:
` + `• Permission denied → Run: gh auth refresh -h github.com -s repo,workflow
` + `• Not authorized → Ensure you have admin access to the repository
` + "• For manual setup → Visit: https://github.com/anthropics/claude-code-action";
        throw new Error(`Failed to create workflow file ${Q}: ${V.stderr}${C}`)
    }
}
async function ZuB(A, B, Q, Z, D = !1, G, F, I) {
    try {
        X1("tengu_setup_github_actions_started", {
            skip_workflow: D,
            has_api_key: !!B,
            using_default_secret_name: Q === "ANTHROPIC_API_KEY",
            selected_claude_workflow: G.includes("claude"),
            selected_claude_review_workflow: G.includes("claude-review"),
            ...I
        });
        let Y = await F2("gh", ["api", `repos/${A}`, "--jq", ".id"]);
        if (Y.code !== 0) throw X1("tengu_setup_github_actions_failed", {
            reason: "repo_not_found",
            exit_code: Y.code,
            ...I
        }), new Error(`Failed to access repository ${A}`);
        let W = await F2("gh", ["api", `repos/${A}`, "--jq", ".default_branch"]);
        if (W.code !== 0) throw X1("tengu_setup_github_actions_failed", {
            reason: "failed_to_get_default_branch",
            exit_code: W.code,
            ...I
        }), new Error(`Failed to get default branch: ${W.stderr}`);
        let J = W.stdout.trim(),
            X = await F2("gh", ["api", `repos/${A}/git/ref/heads/${J}`, "--jq", ".object.sha"]);
        if (X.code !== 0) throw X1("tengu_setup_github_actions_failed", {
            reason: "failed_to_get_branch_sha",
            exit_code: X.code,
            ...I
        }), new Error(`Failed to get branch SHA: ${X.stderr}`);
        let V = X.stdout.trim(),
            C = null;
        if (!D) {
            Z(), C = `add-claude-github-actions-${Date.now()}`;
            let K = await F2("gh", ["api", "--method", "POST", `repos/${A}/git/refs`, "-f", `ref=refs/heads/${C}`, "-f", `sha=${V}`]);
            if (K.code !== 0) throw X1("tengu_setup_github_actions_failed", {
                reason: "failed_to_create_branch",
                exit_code: K.code,
                ...I
            }), new Error(`Failed to create branch: ${K.stderr}`);
            Z();
            let H = [];
            if (G.includes("claude")) H.push({
                path: ".github/workflows/claude.yml",
                content: pgB,
                message: "Claude PR Assistant workflow"
            });
            if (G.includes("claude-review")) H.push({
                path: ".github/workflows/claude-code-review.yml",
                content: ngB,
                message: "Claude Code Review workflow"
            });
            for (let z of H) await DN8(A, C, z.path, z.content, Q, z.message, I)
        }
        if (Z(), B) {
            let K = await F2("gh", ["secret", "set", Q, "--body", B, "--repo", A]);
            if (K.code !== 0) {
                X1("tengu_setup_github_actions_failed", {
                    reason: "failed_to_set_api_key_secret",
                    exit_code: K.code,
                    ...I
                });
                let H = `

Need help? Common issues:
` + `• Permission denied → Run: gh auth refresh -h github.com -s repo
` + `• Not authorized → Ensure you have admin access to the repository
` + "• For manual setup → Visit: https://github.com/anthropics/claude-code-action";
                throw new Error(`Failed to set API key secret: ${K.stderr||"Unknown error"}${H}`)
            }
        }
        if (!D && C) {
            Z();
            let K = `https://github.com/${A}/compare/${J}...${C}?quick_pull=1&title=${encodeURIComponent(lgB)}&body=${encodeURIComponent(igB)}`;
            await ZU(K)
        }
        X1("tengu_setup_github_actions_completed", {
            skip_workflow: D,
            has_api_key: !!B,
            auth_type: F,
            using_default_secret_name: Q === "ANTHROPIC_API_KEY",
            selected_claude_workflow: G.includes("claude"),
            selected_claude_review_workflow: G.includes("claude-review"),
            ...I
        }), gA({
            ...H0(),
            githubActionSetupCount: (H0().githubActionSetupCount ?? 0) + 1
        })
    } catch (Y) {
        if (!Y || !(Y instanceof Error) || !Y.message.includes("Failed to")) X1("tengu_setup_github_actions_failed", {
            reason: "unexpected_error",
            ...I
        });
        if (Y instanceof Error) R1(Y);
        throw Y
    }
}
var o9 = G1(z1(), 1);
var DuB = "Paste code here if prompted > ";

function GuB({
    onSuccess: A,
    onCancel: B
}) {
    let [Q, Z] = o9.useState({
        state: "starting"
    }), [D] = o9.useState(() => new wI1), [G, F] = o9.useState(""), [I, Y] = o9.useState(0), [W, J] = o9.useState(!1), [X] = o9.useState(() => new qI1), V = o9.useRef(new Set), C = r9(), K = Math.max(50, C.columns - DuB.length - 4);
    DA((L, N) => {
        if (Q.state === "error")
            if (N.return && Q.toRetry) F(""), Y(0), Z({
                state: "about_to_retry",
                nextState: Q.toRetry
            });
            else B()
    });
    async function H(L, N) {
        try {
            let [R, O] = L.split("#");
            if (!R || !O) {
                Z({
                    state: "error",
                    message: "Invalid code. Please make sure the full code was copied",
                    toRetry: {
                        state: "waiting_for_login",
                        url: N
                    }
                });
                return
            }
            X1("tengu_oauth_manual_entry", {}), D.handleManualAuthCodeInput({
                authorizationCode: R,
                state: O
            })
        } catch (R) {
            R1(R instanceof Error ? R : new Error(String(R))), Z({
                state: "error",
                message: R.message,
                toRetry: {
                    state: "waiting_for_login",
                    url: N
                }
            })
        }
    }
    let z = o9.useCallback(async () => {
        V.current.forEach((L) => clearTimeout(L)), V.current.clear();
        try {
            let L = await D.startOAuthFlow(async (O) => {
                Z({
                    state: "waiting_for_login",
                    url: O
                });
                let P = setTimeout(() => J(!0), 3000);
                V.current.add(P)
            }, {
                loginWithClaudeAi: !0,
                inferenceOnly: !0,
                expiresIn: 31536000
            });
            await V7(), X.reset(), Z({
                state: "processing"
            });
            let N = S51(L);
            if (N.warning) X1("tengu_oauth_storage_warning", {
                warning: N.warning
            });
            let R = setTimeout(() => {
                Z({
                    state: "success",
                    token: L.accessToken
                });
                let O = setTimeout(() => {
                    A(L.accessToken)
                }, 1000);
                V.current.add(O)
            }, 100);
            V.current.add(R)
        } catch (L) {
            let N = L.message;
            await V7(), X.reset(), Z({
                state: "error",
                message: N,
                toRetry: {
                    state: "starting"
                }
            }), R1(L instanceof Error ? L : new Error(String(L))), X1("tengu_oauth_error", {
                error: N
            })
        }
    }, [D, A, X]);
    o9.useEffect(() => {
        if (Q.state === "starting") z()
    }, [Q.state, z]), o9.useEffect(() => {
        if (Q.state === "about_to_retry") {
            V7(), X.reset();
            let L = setTimeout(() => {
                if (Q.nextState.state === "waiting_for_login") J(!0);
                else J(!1);
                Z(Q.nextState)
            }, 500);
            V.current.add(L)
        }
    }, [Q, X]), o9.useEffect(() => {
        let L = {};
        if (Q.state !== "success" && Q.state !== "starting" && Q.state !== "processing") L.header = o9.default.createElement(v, {
            key: "header",
            flexDirection: "column",
            gap: 1,
            paddingBottom: 1
        }, o9.default.createElement(T, {
            bold: !0
        }, "Create Authentication Token"), o9.default.createElement(T, {
            dimColor: !0
        }, "Creating a long-lived token for GitHub Actions"));
        if (Q.state === "waiting_for_login" && W) L.urlToCopy = o9.default.createElement(v, {
            flexDirection: "column",
            key: "urlToCopy",
            gap: 1,
            paddingBottom: 1
        }, o9.default.createElement(v, {
            paddingX: 1
        }, o9.default.createElement(T, {
            dimColor: !0
        }, "Browser didn't open? Use the url below to sign in:")), o9.default.createElement(v, {
            width: 1000
        }, o9.default.createElement(T, {
            dimColor: !0
        }, Q.url)));
        X.renderStatic(L)
    }, [X, Q, W]), o9.useEffect(() => {
        let L = V.current;
        return () => {
            D.cleanup(), L.forEach((N) => clearTimeout(N)), L.clear()
        }
    }, [D]);

    function $() {
        switch (Q.state) {
            case "starting":
                return o9.default.createElement(v, null, o9.default.createElement(g6, null), o9.default.createElement(T, null, "Starting authentication…"));
            case "waiting_for_login":
                return o9.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, !W && o9.default.createElement(v, null, o9.default.createElement(g6, null), o9.default.createElement(T, null, "Opening browser to sign in with your Claude account…")), W && o9.default.createElement(v, null, o9.default.createElement(T, null, DuB), o9.default.createElement(y8, {
                    value: G,
                    onChange: F,
                    onSubmit: (L) => H(L, Q.url),
                    cursorOffset: I,
                    onChangeCursorOffset: Y,
                    columns: K
                })));
            case "processing":
                return o9.default.createElement(v, null, o9.default.createElement(g6, null), o9.default.createElement(T, null, "Processing authentication…"));
            case "success":
                return o9.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, o9.default.createElement(T, {
                    color: "success"
                }, "✓ Authentication token created successfully!"), o9.default.createElement(T, {
                    dimColor: !0
                }, "Using token for GitHub Actions setup…"));
            case "error":
                return o9.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, o9.default.createElement(T, {
                    color: "error"
                }, "OAuth error: ", Q.message), Q.toRetry ? o9.default.createElement(T, {
                    dimColor: !0
                }, "Press Enter to try again, or any other key to cancel") : o9.default.createElement(T, {
                    dimColor: !0
                }, "Press any key to return to API key selection"));
            case "about_to_retry":
                return o9.default.createElement(v, {
                    flexDirection: "column",
                    gap: 1
                }, o9.default.createElement(T, {
                    color: "permission"
                }, "Retrying…"));
            default:
                return null
        }
    }
    return o9.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, Q.state === "starting" && o9.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingBottom: 1
    }, o9.default.createElement(T, {
        bold: !0
    }, "Create Authentication Token"), o9.default.createElement(T, {
        dimColor: !0
    }, "Creating a long-lived token for GitHub Actions")), o9.default.createElement(v, {
        paddingLeft: 1,
        flexDirection: "column",
        gap: 1
    }, $()))
}
var GN8 = {
    step: "check-gh",
    selectedRepoName: "",
    currentRepo: "",
    useCurrentRepo: !0,
    apiKeyOrOAuthToken: "",
    useExistingKey: !0,
    currentWorkflowInstallStep: 0,
    warnings: [],
    secretExists: !1,
    secretName: "ANTHROPIC_API_KEY",
    useExistingSecret: !0,
    workflowExists: !1,
    selectedWorkflows: ["claude", "claude-review"],
    selectedApiKeyOption: "new",
    authType: "api_key"
};