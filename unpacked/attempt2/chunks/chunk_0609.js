/* chunk:609 bytes:[13987036, 14007026) size:19990 source:unpacked-cli.js */
var lgB = "Add Claude Code GitHub Workflow",
    ER = "https://github.com/anthropics/claude-code-action/blob/main/docs/setup.md",
    pgB = `name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
      actions: read # Required for Claude to read CI results on PRs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code
        id: claude
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}

          # This is an optional setting that allows Claude to read CI results on PRs
          additional_permissions: |
            actions: read
          
          # Optional: Specify model (defaults to Claude Sonnet 4, uncomment for Claude Opus 4.1)
          # model: "claude-opus-4-1-20250805"
          
          # Optional: Customize the trigger phrase (default: @claude)
          # trigger_phrase: "/claude"
          
          # Optional: Trigger when specific user is assigned to an issue
          # assignee_trigger: "claude-bot"
          
          # Optional: Allow Claude to run specific commands
          # allowed_tools: "Bash(npm install),Bash(npm run build),Bash(npm run test:*),Bash(npm run lint:*)"
          
          # Optional: Add custom instructions for Claude to customize its behavior for your project
          # custom_instructions: |
          #   Follow our coding standards
          #   Ensure all new code has tests
          #   Use TypeScript for new files
          
          # Optional: Custom environment variables for Claude
          # claude_env: |
          #   NODE_ENV: test

`,
    igB = `## \uD83E\uDD16 Installing Claude Code GitHub App

This PR adds a GitHub Actions workflow that enables Claude Code integration in our repository.

### What is Claude Code?

[Claude Code](https://claude.ai/code) is an AI coding agent that can help with:
- Bug fixes and improvements  
- Documentation updates
- Implementing new features
- Code reviews and suggestions
- Writing tests
- And more!

### How it works

Once this PR is merged, we'll be able to interact with Claude by mentioning @claude in a pull request or issue comment.
Once the workflow is triggered, Claude will analyze the comment and surrounding context, and execute on the request in a GitHub action.

### Important Notes

- **This workflow won't take effect until this PR is merged**
- **@claude mentions won't work until after the merge is complete**
- The workflow runs automatically whenever Claude is mentioned in PR or issue comments
- Claude gets access to the entire PR or issue context including files, diffs, and previous comments

### Security

- Our Anthropic API key is securely stored as a GitHub Actions secret
- Only users with write access to the repository can trigger the workflow
- All Claude runs are stored in the GitHub Actions run history
- Claude's default tools are limited to reading/writing files and interacting with our repo by creating comments, branches, and commits.
- We can add more allowed tools by adding them to the workflow file like:

\`\`\`
allowed_tools: Bash(npm install),Bash(npm run build),Bash(npm run lint),Bash(npm run test)
\`\`\`

There's more information in the [Claude Code action repo](https://github.com/anthropics/claude-code-action).

After merging this PR, let's try mentioning @claude in a comment on any PR to get started!`,
    ngB = `name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  claude-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'
    
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}

          # Optional: Specify model (defaults to Claude Sonnet 4, uncomment for Claude Opus 4.1)
          # model: "claude-opus-4-1-20250805"

          # Direct prompt for automated review (no @claude mention needed)
          direct_prompt: |
            Please review this pull request and provide feedback on:
            - Code quality and best practices
            - Potential bugs or issues
            - Performance considerations
            - Security concerns
            - Test coverage
            
            Be constructive and helpful in your feedback.

          # Optional: Use sticky comments to make Claude reuse the same comment on subsequent pushes to the same PR
          # use_sticky_comment: true
          
          # Optional: Customize review based on file types
          # direct_prompt: |
          #   Review this PR focusing on:
          #   - For TypeScript files: Type safety and proper interface usage
          #   - For API endpoints: Security, input validation, and error handling
          #   - For React components: Performance, accessibility, and best practices
          #   - For tests: Coverage, edge cases, and test quality
          
          # Optional: Different prompts for different authors
          # direct_prompt: |
          #   \${{ github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR' && 
          #   'Welcome! Please review this PR from a first-time contributor. Be encouraging and provide detailed explanations for any suggestions.' ||
          #   'Please provide a thorough code review focusing on our coding standards and best practices.' }}
          
          # Optional: Add specific tools for running tests or linting
          # allowed_tools: "Bash(npm run test),Bash(npm run lint),Bash(npm run typecheck)"
          
          # Optional: Skip review for certain conditions
          # if: |
          #   !contains(github.event.pull_request.title, '[skip-review]') &&
          #   !contains(github.event.pull_request.title, '[WIP]')

`;

function agB({
    repoUrl: A,
    onSubmit: B
}) {
    return DA((Q, Z) => {
        if (Z.return) B()
    }), WF.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, WF.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, WF.default.createElement(T, {
        bold: !0
    }, "Install the Claude GitHub App")), WF.default.createElement(v, {
        marginBottom: 1
    }, WF.default.createElement(T, null, "Opening browser to install the Claude GitHub App…")), WF.default.createElement(v, {
        marginBottom: 1
    }, WF.default.createElement(T, null, "If your browser doesn't open automatically, visit:")), WF.default.createElement(v, {
        marginBottom: 1
    }, WF.default.createElement(T, {
        underline: !0
    }, "https://github.com/apps/claude")), WF.default.createElement(v, {
        marginBottom: 1
    }, WF.default.createElement(T, null, "Please install the app for repository: ", WF.default.createElement(T, {
        bold: !0
    }, A))), WF.default.createElement(v, {
        marginBottom: 1
    }, WF.default.createElement(T, {
        dimColor: !0
    }, "Important: Make sure to grant access to this specific repository")), WF.default.createElement(v, null, WF.default.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Press Enter once you've installed the app", s0.ellipsis)), WF.default.createElement(v, {
        marginTop: 1
    }, WF.default.createElement(T, {
        dimColor: !0
    }, "Having trouble? See manual setup instructions at:", " ", WF.default.createElement(T, {
        color: "claude"
    }, ER))))
}
var xZ = G1(z1(), 1);

function sgB({
    useExistingSecret: A,
    secretName: B,
    onToggleUseExistingSecret: Q,
    onSecretNameChange: Z,
    onSubmit: D
}) {
    let [G, F] = xZ.useState(0), I = r9(), [Y] = fB();
    return DA((W, J) => {
        if (J.upArrow) Q(!0);
        else if (J.downArrow) Q(!1);
        else if (J.return) D()
    }), xZ.default.createElement(xZ.default.Fragment, null, xZ.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, xZ.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, xZ.default.createElement(T, {
        bold: !0
    }, "Install GitHub App"), xZ.default.createElement(T, {
        dimColor: !0
    }, "Setup API key secret")), xZ.default.createElement(v, {
        marginBottom: 1
    }, xZ.default.createElement(T, {
        color: "warning"
    }, "ANTHROPIC_API_KEY already exists in repository secrets!")), xZ.default.createElement(v, {
        marginBottom: 1
    }, xZ.default.createElement(T, null, "Would you like to:")), xZ.default.createElement(v, {
        marginBottom: 1
    }, xZ.default.createElement(T, null, A ? pB("success", Y)("> ") : "  ", "Use the existing API key")), xZ.default.createElement(v, {
        marginBottom: 1
    }, xZ.default.createElement(T, null, !A ? pB("success", Y)("> ") : "  ", "Create a new secret with a different name")), !A && xZ.default.createElement(xZ.default.Fragment, null, xZ.default.createElement(v, {
        marginBottom: 1
    }, xZ.default.createElement(T, null, "Enter new secret name (alphanumeric with underscores):")), xZ.default.createElement(y8, {
        value: B,
        onChange: Z,
        onSubmit: D,
        focus: !0,
        placeholder: "e.g., CLAUDE_API_KEY",
        columns: I.columns,
        cursorOffset: G,
        onChangeCursorOffset: F,
        showCursor: !0
    }))), xZ.default.createElement(v, {
        marginLeft: 3
    }, xZ.default.createElement(T, {
        dimColor: !0
    }, "↑/↓ to select · Enter to continue")))
}
var dI = G1(z1(), 1);

function rgB({
    existingApiKey: A,
    apiKeyOrOAuthToken: B,
    onApiKeyChange: Q,
    onSubmit: Z,
    onToggleUseExistingKey: D,
    onCreateOAuthToken: G,
    selectedOption: F = A ? "existing" : G ? "oauth" : "new",
    onSelectOption: I
}) {
    let [Y, W] = dI.useState(0), J = r9(), [X] = fB();
    return DA((V, C) => {
        if (C.upArrow) {
            if (F === "new" && G) I?.("oauth");
            else if (F === "oauth" && A) I?.("existing"), D(!0)
        } else if (C.downArrow) {
            if (F === "existing") I?.(G ? "oauth" : "new"), D(!1);
            else if (F === "oauth") I?.("new")
        }
        if (C.return)
            if (F === "oauth" && G) G();
            else Z()
    }), dI.default.createElement(dI.default.Fragment, null, dI.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, dI.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, dI.default.createElement(T, {
        bold: !0
    }, "Install GitHub App"), dI.default.createElement(T, {
        dimColor: !0
    }, "Choose API key")), A && dI.default.createElement(v, {
        marginBottom: 1
    }, dI.default.createElement(T, null, F === "existing" ? pB("success", X)("> ") : "  ", "Use your existing Claude Code API key")), G && dI.default.createElement(v, {
        marginBottom: 1
    }, dI.default.createElement(T, null, F === "oauth" ? pB("success", X)("> ") : "  ", "Create a long-lived token with your Claude subscription")), dI.default.createElement(v, {
        marginBottom: 1
    }, dI.default.createElement(T, null, F === "new" ? pB("success", X)("> ") : "  ", "Enter a new API key")), F === "new" && dI.default.createElement(y8, {
        value: B,
        onChange: Q,
        onSubmit: Z,
        onPaste: Q,
        focus: !0,
        placeholder: "sk-ant… (Create a new key at https://console.anthropic.com/settings/keys)",
        mask: "*",
        columns: J.columns,
        cursorOffset: Y,
        onChangeCursorOffset: W,
        showCursor: !0
    })), dI.default.createElement(v, {
        marginLeft: 3
    }, dI.default.createElement(T, {
        dimColor: !0
    }, "↑/↓ to select · Enter to continue")))
}
var dS = G1(z1(), 1);

function ogB({
    currentWorkflowInstallStep: A,
    secretExists: B,
    useExistingSecret: Q,
    secretName: Z,
    skipWorkflow: D = !1,
    selectedWorkflows: G
}) {
    let F = D ? ["Getting repository information", B && Q ? "Using existing API key secret" : `Setting up ${Z} secret`] : ["Getting repository information", "Creating branch", G.length > 1 ? "Creating workflow files" : "Creating workflow file", B && Q ? "Using existing API key secret" : `Setting up ${Z} secret`, "Opening pull request page"];
    return dS.default.createElement(dS.default.Fragment, null, dS.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, dS.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, dS.default.createElement(T, {
        bold: !0
    }, "Install GitHub App"), dS.default.createElement(T, {
        dimColor: !0
    }, "Create GitHub Actions workflow")), F.map((I, Y) => {
        let W = "pending";
        if (Y < A) W = "completed";
        else if (Y === A) W = "in-progress";
        return dS.default.createElement(v, {
            key: Y
        }, dS.default.createElement(T, {
            color: W === "completed" ? "success" : W === "in-progress" ? "warning" : void 0
        }, W === "completed" ? "✓ " : "", I, W === "in-progress" ? "…" : ""))
    })))
}
var z7 = G1(z1(), 1);

function tgB({
    secretExists: A,
    useExistingSecret: B,
    secretName: Q,
    skipWorkflow: Z = !1
}) {
    return z7.default.createElement(z7.default.Fragment, null, z7.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, z7.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, z7.default.createElement(T, {
        bold: !0
    }, "Install GitHub App"), z7.default.createElement(T, {
        dimColor: !0
    }, "Success")), !Z && z7.default.createElement(T, {
        color: "success"
    }, "✓ GitHub Actions workflow created!"), A && B && z7.default.createElement(v, {
        marginTop: 1
    }, z7.default.createElement(T, {
        color: "success"
    }, "✓ Using existing ANTHROPIC_API_KEY secret")), (!A || !B) && z7.default.createElement(v, {
        marginTop: 1
    }, z7.default.createElement(T, {
        color: "success"
    }, "✓ API key saved as ", Q, " secret")), z7.default.createElement(v, {
        marginTop: 1
    }, z7.default.createElement(T, null, "Next steps:")), Z ? z7.default.createElement(z7.default.Fragment, null, z7.default.createElement(T, null, "1. Install the Claude GitHub App if you haven't already"), z7.default.createElement(T, null, "2. Your workflow file was kept unchanged"), z7.default.createElement(T, null, "3. API key is configured and ready to use")) : z7.default.createElement(z7.default.Fragment, null, z7.default.createElement(T, null, "1. A pre-filled PR page has been created"), z7.default.createElement(T, null, "2. Install the Claude GitHub App if you haven't already"), z7.default.createElement(T, null, "3. Merge the PR to enable Claude PR assistance"))), z7.default.createElement(v, {
        marginLeft: 3
    }, z7.default.createElement(T, {
        dimColor: !0
    }, "Press any key to exit")))
}
var lF = G1(z1(), 1);

function egB({
    error: A,
    errorReason: B,
    errorInstructions: Q
}) {
    return lF.default.createElement(lF.default.Fragment, null, lF.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, lF.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, lF.default.createElement(T, {
        bold: !0
    }, "Install GitHub App")), lF.default.createElement(T, {
        color: "error"
    }, "Error: ", A), B && lF.default.createElement(v, {
        marginTop: 1
    }, lF.default.createElement(T, {
        dimColor: !0
    }, "Reason: ", B)), Q && Q.length > 0 && lF.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, lF.default.createElement(T, {
        dimColor: !0
    }, "How to fix:"), Q.map((Z, D) => lF.default.createElement(v, {
        key: D,
        marginLeft: 2
    }, lF.default.createElement(T, {
        dimColor: !0
    }, "• "), lF.default.createElement(T, null, Z)))), lF.default.createElement(v, {
        marginTop: 1
    }, lF.default.createElement(T, {
        dimColor: !0
    }, "For manual setup instructions, see:", " ", lF.default.createElement(T, {
        color: "claude"
    }, ER)))), lF.default.createElement(v, {
        marginLeft: 3
    }, lF.default.createElement(T, {
        dimColor: !0
    }, "Press any key to exit")))
}
var EC = G1(z1(), 1);

function AuB({
    repoName: A,
    onSelectAction: B
}) {
    return EC.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1
    }, EC.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, EC.default.createElement(T, {
        bold: !0
    }, "Existing Workflow Found"), EC.default.createElement(T, {
        dimColor: !0
    }, "Repository: ", A)), EC.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, EC.default.createElement(T, null, "A Claude workflow file already exists at", " ", EC.default.createElement(T, {
        color: "claude"
    }, ".github/workflows/claude.yml")), EC.default.createElement(T, {
        dimColor: !0
    }, "What would you like to do?")), EC.default.createElement(v, {
        flexDirection: "column"
    }, EC.default.createElement(uA, {
        options: [{
            label: "Update workflow file with latest version",
            value: "update"
        }, {
            label: "Skip workflow update (configure secrets only)",
            value: "skip"
        }, {
            label: "Exit without making changes",
            value: "exit"
        }],
        onChange: (G) => {
            B(G)
        },
        onCancel: () => {
            B("exit")
        }
    })), EC.default.createElement(v, {
        marginTop: 1
    }, EC.default.createElement(T, {
        dimColor: !0
    }, "View the latest workflow template at:", " ", EC.default.createElement(T, {
        color: "claude"
    }, "https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml"))))
}
var HW = G1(z1(), 1);