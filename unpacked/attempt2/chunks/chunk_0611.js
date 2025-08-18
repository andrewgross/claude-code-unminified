/* chunk:611 bytes:[14025431, 14042984) size:17553 source:unpacked-cli.js */
function FN8(A) {
    let [B] = u7.useState(() => LY(!1)), [Q, Z] = u7.useState({
        ...GN8,
        useExistingKey: !!B,
        selectedApiKeyOption: B ? "existing" : KE() ? "oauth" : "new"
    });
    U2(), u7.default.useEffect(() => {
        X1("tengu_install_github_app_started", {})
    }, []);
    let D = u7.useCallback(async () => {
        let P = [];
        try {
            ah1("gh --version", {
                stdio: "ignore"
            })
        } catch {
            P.push({
                title: "GitHub CLI not found",
                message: "GitHub CLI (gh) does not appear to be installed or accessible.",
                instructions: ["Install GitHub CLI from https://cli.github.com/", "macOS: brew install gh", "Windows: winget install --id GitHub.cli", "Linux: See installation instructions at https://github.com/cli/cli#installation"]
            })
        }
        try {
            let k = ah1("gh auth status -a", {
                encoding: "utf8"
            }).match(/Token scopes:.*$/m);
            if (k) {
                let c = k[0],
                    u = [];
                if (!c.includes("repo")) u.push("repo");
                if (!c.includes("workflow")) u.push("workflow");
                if (u.length > 0) {
                    Z((a) => ({
                        ...a,
                        step: "error",
                        error: `GitHub CLI is missing required permissions: ${u.join(", ")}.`,
                        errorReason: "Missing required scopes",
                        errorInstructions: [`Your GitHub CLI authentication is missing the "${u.join('" and "')}" scope${u.length>1?"s":""} needed to manage GitHub Actions and secrets.`, "", "To fix this, run:", "  gh auth refresh -h github.com -s repo,workflow", "", "This will add the necessary permissions to manage workflows and secrets."]
                    }));
                    return
                }
            }
        } catch {
            P.push({
                title: "GitHub CLI not authenticated",
                message: "GitHub CLI does not appear to be authenticated.",
                instructions: ["Run: gh auth login", "Follow the prompts to authenticate with GitHub", "Or set up authentication using environment variables or other methods"]
            })
        }
        let j = "";
        try {
            ah1("git rev-parse --is-inside-work-tree", {
                stdio: "ignore"
            });
            let k = ah1("git remote get-url origin", {
                encoding: "utf8"
            }).trim().match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
            if (k) j = k[1]?.replace(/\.git$/, "") || ""
        } catch {}
        Z((f) => ({
            ...f,
            warnings: P,
            currentRepo: j,
            selectedRepoName: j,
            step: P.length > 0 ? "warnings" : "choose-repo"
        }))
    }, []);
    u7.default.useEffect(() => {
        if (Q.step === "check-gh") D()
    }, [Q.step, D]);
    let G = u7.useCallback(async (P, j) => {
        Z((f) => ({
            ...f,
            step: "creating",
            currentWorkflowInstallStep: 0
        }));
        try {
            await ZuB(Q.selectedRepoName, P, j, () => {
                Z((f) => ({
                    ...f,
                    currentWorkflowInstallStep: f.currentWorkflowInstallStep + 1
                }))
            }, Q.workflowAction === "skip", Q.selectedWorkflows, Q.authType, {
                useCurrentRepo: Q.useCurrentRepo,
                workflowExists: Q.workflowExists,
                secretExists: Q.secretExists
            }), Z((f) => ({
                ...f,
                step: "success"
            }))
        } catch (f) {
            let k = f instanceof Error ? f.message : "Failed to set up GitHub Actions";
            if (k.includes("workflow file already exists")) X1("tengu_install_github_app_error", {
                reason: "workflow_file_exists"
            }), Z((c) => ({
                ...c,
                step: "error",
                error: "A Claude workflow file already exists in this repository.",
                errorReason: "Workflow file conflict",
                errorInstructions: ["The file .github/workflows/claude.yml already exists", "You can either:", "  1. Delete the existing file and run this command again", "  2. Update the existing file manually using the template from:", `     ${ER}`]
            }));
            else X1("tengu_install_github_app_error", {
                reason: "setup_github_actions_failed"
            }), Z((c) => ({
                ...c,
                step: "error",
                error: k,
                errorReason: "GitHub Actions setup failed",
                errorInstructions: []
            }))
        }
    }, [Q.selectedRepoName, Q.workflowAction, Q.selectedWorkflows, Q.useCurrentRepo, Q.workflowExists, Q.secretExists, Q.authType]);
    async function F() {
        await ZU("https://github.com/apps/claude")
    }
    async function I(P) {
        try {
            let j = await F2("gh", ["api", `repos/${P}`, "--jq", ".permissions.admin"]);
            if (j.code === 0) return {
                hasAccess: j.stdout.trim() === "true"
            };
            if (j.stderr.includes("404") || j.stderr.includes("Not Found")) return {
                hasAccess: !1,
                error: "repository_not_found"
            };
            return {
                hasAccess: !1
            }
        } catch {
            return {
                hasAccess: !1
            }
        }
    }
    async function Y(P) {
        return (await F2("gh", ["api", `repos/${P}/contents/.github/workflows/claude.yml`, "--jq", ".sha"])).code === 0
    }
    async function W() {
        let P = await F2("gh", ["secret", "list", "--app", "actions", "--repo", Q.selectedRepoName]);
        if (P.code === 0)
            if (P.stdout.split(`
`).some((k) => {
                    return /^ANTHROPIC_API_KEY\s+/.test(k)
                })) Z((k) => ({
                ...k,
                secretExists: !0,
                step: "check-existing-secret"
            }));
            else if (B) Z((k) => ({
            ...k,
            apiKeyOrOAuthToken: B,
            useExistingKey: !0
        })), await G(B, Q.secretName);
        else Z((k) => ({
            ...k,
            step: "api-key"
        }));
        else if (B) Z((j) => ({
            ...j,
            apiKeyOrOAuthToken: B,
            useExistingKey: !0
        })), await G(B, Q.secretName);
        else Z((j) => ({
            ...j,
            step: "api-key"
        }))
    }
    let J = async () => {
        if (Q.step === "warnings") Z((P) => ({
            ...P,
            step: "install-app"
        })), setTimeout(() => {
            F()
        }, 0);
        else if (Q.step === "choose-repo") {
            let P = Q.useCurrentRepo ? Q.currentRepo : Q.selectedRepoName;
            if (!P.trim()) return;
            let j = [];
            if (P.includes("github.com")) {
                let c = P.match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
                if (!c) j.push({
                    title: "Invalid GitHub URL format",
                    message: "The repository URL format appears to be invalid.",
                    instructions: ["Use format: owner/repo or https://github.com/owner/repo", "Example: anthropics/claude-cli"]
                });
                else P = c[1]?.replace(/\.git$/, "") || ""
            }
            if (!P.includes("/")) j.push({
                title: "Repository format warning",
                message: 'Repository should be in format "owner/repo"',
                instructions: ["Use format: owner/repo", "Example: anthropics/claude-cli"]
            });
            let f = await I(P);
            if (f.error === "repository_not_found") j.push({
                title: "Repository not found",
                message: `Repository ${P} was not found or you don't have access.`,
                instructions: [`Check that the repository name is correct: ${P}`, "Ensure you have access to this repository", 'For private repositories, make sure your GitHub token has the "repo" scope', "You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow"]
            });
            else if (!f.hasAccess) j.push({
                title: "Admin permissions required",
                message: `You might need admin permissions on ${P} to set up GitHub Actions.`,
                instructions: ["Repository admins can install GitHub Apps and set secrets", "Ask a repository admin to run this command if setup fails", "Alternatively, you can use the manual setup instructions"]
            });
            let k = await Y(P);
            if (j.length > 0) {
                let c = [...Q.warnings, ...j];
                Z((u) => ({
                    ...u,
                    selectedRepoName: P,
                    workflowExists: k,
                    warnings: c,
                    step: "warnings"
                }))
            } else Z((c) => ({
                ...c,
                selectedRepoName: P,
                workflowExists: k,
                step: "install-app"
            })), setTimeout(() => {
                F()
            }, 0)
        } else if (Q.step === "install-app")
            if (Q.workflowExists) Z((P) => ({
                ...P,
                step: "check-existing-workflow"
            }));
            else Z((P) => ({
                ...P,
                step: "select-workflows"
            }));
        else if (Q.step === "check-existing-workflow") return;
        else if (Q.step === "select-workflows") return;
        else if (Q.step === "check-existing-secret")
            if (Q.useExistingSecret) await G(null, Q.secretName);
            else await G(Q.apiKeyOrOAuthToken, Q.secretName);
        else if (Q.step === "api-key") {
            if (Q.selectedApiKeyOption === "oauth") return;
            let P = Q.selectedApiKeyOption === "existing" ? B : Q.apiKeyOrOAuthToken;
            if (!P) {
                X1("tengu_install_github_app_error", {
                    reason: "api_key_missing"
                }), Z((f) => ({
                    ...f,
                    step: "error",
                    error: "API key is required"
                }));
                return
            }
            Z((f) => ({
                ...f,
                apiKeyOrOAuthToken: P,
                useExistingKey: Q.selectedApiKeyOption === "existing"
            }));
            let j = await F2("gh", ["secret", "list", "--app", "actions", "--repo", Q.selectedRepoName]);
            if (j.code === 0)
                if (j.stdout.split(`
`).some((c) => {
                        return /^ANTHROPIC_API_KEY\s+/.test(c)
                    })) Z((c) => ({
                    ...c,
                    secretExists: !0,
                    step: "check-existing-secret"
                }));
                else await G(P, Q.secretName);
            else await G(P, Q.secretName)
        }
    }, X = (P) => {
        Z((j) => ({
            ...j,
            selectedRepoName: P
        }))
    }, V = (P) => {
        Z((j) => ({
            ...j,
            apiKeyOrOAuthToken: P
        }))
    }, C = (P) => {
        Z((j) => ({
            ...j,
            selectedApiKeyOption: P
        }))
    }, K = u7.useCallback(() => {
        Z((P) => ({
            ...P,
            step: "oauth-flow"
        }))
    }, []), H = u7.useCallback((P) => {
        Z((j) => ({
            ...j,
            apiKeyOrOAuthToken: P,
            useExistingKey: !1,
            secretName: "CLAUDE_CODE_OAUTH_TOKEN",
            authType: "oauth_token"
        })), G(P, "CLAUDE_CODE_OAUTH_TOKEN")
    }, [G]), z = u7.useCallback(() => {
        Z((P) => ({
            ...P,
            step: "api-key"
        }))
    }, []), $ = (P) => {
        if (P && !/^[a-zA-Z0-9_]+$/.test(P)) return;
        Z((j) => ({
            ...j,
            secretName: P
        }))
    }, L = (P) => {
        Z((j) => ({
            ...j,
            useCurrentRepo: P,
            selectedRepoName: P ? j.currentRepo : ""
        }))
    }, N = (P) => {
        Z((j) => ({
            ...j,
            useExistingKey: P
        }))
    }, R = (P) => {
        Z((j) => ({
            ...j,
            useExistingSecret: P,
            secretName: P ? "ANTHROPIC_API_KEY" : ""
        }))
    }, O = async (P) => {
        if (P === "exit") {
            A.onDone("Installation cancelled by user");
            return
        }
        if (Z((j) => ({
                ...j,
                workflowAction: P
            })), P === "skip" || P === "update")
            if (B) await W();
            else Z((j) => ({
                ...j,
                step: "api-key"
            }))
    };
    switch (DA(() => {
            if (Q.step === "success" || Q.step === "error") {
                if (Q.step === "success") X1("tengu_install_github_app_completed", {});
                A.onDone(Q.step === "success" ? "GitHub Actions setup complete!" : Q.error ? `Couldn't install GitHub App: ${Q.error}
For manual setup instructions, see: ${ER}` : `GitHub App installation failed
For manual setup instructions, see: ${ER}`)
            }
        }), Q.step) {
        case "check-gh":
            return u7.default.createElement(dgB, null);
        case "warnings":
            return u7.default.createElement(BuB, {
                warnings: Q.warnings,
                onContinue: J
            });
        case "choose-repo":
            return u7.default.createElement(cgB, {
                currentRepo: Q.currentRepo,
                useCurrentRepo: Q.useCurrentRepo,
                repoUrl: Q.selectedRepoName,
                onRepoUrlChange: X,
                onToggleUseCurrentRepo: L,
                onSubmit: J
            });
        case "install-app":
            return u7.default.createElement(agB, {
                repoUrl: Q.selectedRepoName,
                onSubmit: J
            });
        case "check-existing-workflow":
            return u7.default.createElement(AuB, {
                repoName: Q.selectedRepoName,
                onSelectAction: O
            });
        case "check-existing-secret":
            return u7.default.createElement(sgB, {
                useExistingSecret: Q.useExistingSecret,
                secretName: Q.secretName,
                onToggleUseExistingSecret: R,
                onSecretNameChange: $,
                onSubmit: J
            });
        case "api-key":
            return u7.default.createElement(rgB, {
                existingApiKey: B,
                useExistingKey: Q.useExistingKey,
                apiKeyOrOAuthToken: Q.apiKeyOrOAuthToken,
                onApiKeyChange: V,
                onToggleUseExistingKey: N,
                onSubmit: J,
                onCreateOAuthToken: KE() ? K : void 0,
                selectedOption: Q.selectedApiKeyOption,
                onSelectOption: C
            });
        case "creating":
            return u7.default.createElement(ogB, {
                currentWorkflowInstallStep: Q.currentWorkflowInstallStep,
                secretExists: Q.secretExists,
                useExistingSecret: Q.useExistingSecret,
                secretName: Q.secretName,
                skipWorkflow: Q.workflowAction === "skip",
                selectedWorkflows: Q.selectedWorkflows
            });
        case "success":
            return u7.default.createElement(tgB, {
                secretExists: Q.secretExists,
                useExistingSecret: Q.useExistingSecret,
                secretName: Q.secretName,
                skipWorkflow: Q.workflowAction === "skip"
            });
        case "error":
            return u7.default.createElement(egB, {
                error: Q.error,
                errorReason: Q.errorReason,
                errorInstructions: Q.errorInstructions
            });
        case "select-workflows":
            return u7.default.createElement(QuB, {
                defaultSelections: Q.selectedWorkflows,
                onSubmit: (P) => {
                    if (Z((j) => ({
                            ...j,
                            selectedWorkflows: P
                        })), B) W();
                    else Z((j) => ({
                        ...j,
                        step: "api-key"
                    }))
                }
            });
        case "oauth-flow":
            return u7.default.createElement(GuB, {
                onSuccess: H,
                onCancel: z
            })
    }
}
var IN8 = {
        type: "local-jsx",
        name: "install-github-app",
        description: "Set up Claude GitHub Actions for a repository",
        isEnabled: () => !process.env.DISABLE_INSTALL_GITHUB_APP_COMMAND && !So(),
        isHidden: !1,
        async call(A) {
            return u7.default.createElement(FN8, {
                onDone: A
            })
        },
        userFacingName() {
            return "install-github-app"
        }
    },
    FuB = IN8;
var IuB = G1(z1(), 1);
var _B = G1(z1(), 1);

function CA1({
    onPress: A
}) {
    return DA((B, Q) => {
        if (Q.return) A();
        else if (Q.escape) O5(1)
    }), _B.default.createElement(T, null, "Press ", _B.default.createElement(T, {
        bold: !0
    }, "Enter"), " to continue or ", _B.default.createElement(T, {
        bold: !0
    }, "Esc"), " to exit")
}