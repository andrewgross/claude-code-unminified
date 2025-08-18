/* chunk:639 bytes:[14512324, 14519206) size:6882 source:unpacked-cli.js */
var lR8 = [{
        id: "ide-hotkey",
        content: `${L9()==="macos"?"Cmd+Escape":"Ctrl+Escape"} to launch Claude in your IDE`,
        cooldownSessions: 8,
        isRelevant: () => {
            let A = qz0();
            return A ? Nz0(A) : !1
        }
    }, {
        id: "new-user-warmup",
        content: "Start with small features or bug fixes, tell Claude to propose a plan, and verify its suggested edits",
        cooldownSessions: 3,
        isRelevant: () => {
            return H0().numStartups < 10
        }
    }, {
        id: "git-worktrees",
        content: "Use git worktrees to run multiple Claude sessions in parallel.",
        cooldownSessions: 10,
        isRelevant: async () => {
            try {
                let A = H0();
                return await k61() <= 1 && A.numStartups > 50
            } catch (A) {
                return !1
            }
        }
    }, {
        id: "terminal-setup",
        content: sA.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable convenient terminal integration like Option + Enter for new line and more" : "Run /terminal-setup to enable convenient terminal integration like Shift + Enter for new line and more",
        cooldownSessions: 10,
        isRelevant: () => {
            let A = H0();
            if (sA.terminal === "Apple_Terminal") return TM.isEnabled() && !A.optionAsMetaKeyInstalled;
            return TM.isEnabled() && !A.shiftEnterKeyBindingInstalled
        }
    }, {
        id: "shift-enter",
        content: sA.terminal === "Apple_Terminal" ? "Press Option+Enter to send a multi-line message" : "Press Shift+Enter to send a multi-line message",
        cooldownSessions: 10,
        isRelevant: () => {
            let A = H0();
            return Boolean((sA.terminal === "Apple_Terminal" ? A.optionAsMetaKeyInstalled : A.shiftEnterKeyBindingInstalled) && A.numStartups > 3)
        }
    }, {
        id: "shift-enter",
        content: sA.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable Option+Enter for new lines" : "Run /terminal-setup to enable Shift+Enter for new lines",
        cooldownSessions: 10,
        isRelevant: () => {
            if (!CZ1()) return !1;
            let A = H0();
            return !(sA.terminal === "Apple_Terminal" ? A.optionAsMetaKeyInstalled : A.shiftEnterKeyBindingInstalled)
        }
    }, {
        id: "memory-command",
        content: "Use /memory to view and manage Claude memory",
        cooldownSessions: 15,
        isRelevant: () => {
            return H0().memoryUsageCount <= 0
        }
    }, {
        id: "theme-command",
        content: "Use /theme to change the color theme",
        cooldownSessions: 20,
        isRelevant: () => !0
    }, {
        id: "status-line",
        content: "Use /statusline to set up a custom status line that will display beneath the input box",
        cooldownSessions: 25,
        isRelevant: () => GB().statusLine === void 0
    }, {
        id: "prompt-queue",
        content: "Hit Enter to queue up additional messages while Claude is working.",
        cooldownSessions: 5,
        isRelevant: () => {
            return H0().promptQueueUseCount <= 3
        }
    }, {
        id: "enter-to-steer-in-relatime",
        content: "Send messages to Claude while it works to steer Claude in real-time",
        cooldownSessions: 20,
        isRelevant: () => !0
    }, {
        id: "todo-list",
        content: "Ask Claude to create a todo list when working on complex tasks to track progress and remain on track",
        cooldownSessions: 20,
        isRelevant: () => !0
    }, {
        id: "vscode-command-install",
        content: `Open the Command Palette (Cmd+Shift+P) and run "Shell Command: Install '${sA.terminal==="vscode"?"code":sA.terminal}' command in PATH" to enable IDE integration`,
        cooldownSessions: 0,
        isRelevant: () => {
            if (!HD1()) return !1;
            if (L9() !== "macos") return !1;
            switch (sA.terminal) {
                case "vscode":
                    return !EGB();
                case "cursor":
                    return !HGB();
                case "windsurf":
                    return !zGB();
                default:
                    return !1
            }
        }
    }, {
        id: "ide-upsell-external-terminal",
        content: "Connect Claude to your IDE · /ide",
        cooldownSessions: 4,
        isRelevant: () => {
            if (fF()) return !1;
            if (Vy1().length !== 0) return !1;
            return Ky1().length > 0
        }
    }, {
        id: "# for memory",
        content: "Want Claude to remember something? Hit # to add preferences, tools, and instructions to Claude's memory",
        cooldownSessions: 10,
        isRelevant: () => H0().memoryUsageCount <= 10
    }, {
        id: "install-github-app",
        content: "Run /install-github-app to tag @claude right from your Github issues and PRs",
        cooldownSessions: 10,
        isRelevant: () => !H0().githubActionSetupCount
    }, {
        id: "permissions",
        content: "Use /permissions to pre-approve and pre-deny bash, edit, and MCP tools",
        cooldownSessions: 10,
        isRelevant: () => {
            return H0().numStartups > 10
        }
    }, {
        id: "drag-and-drop-images",
        content: "Did you know you can drag and drop image files into your terminal?",
        cooldownSessions: 10,
        isRelevant: () => !0
    }, {
        id: "paste-images-mac",
        content: "Paste images into Claude Code using control+v (not cmd+v!)",
        cooldownSessions: 10,
        isRelevant: () => L9() === "macos"
    }, {
        id: "double-esc",
        content: "Press Esc twice to edit your previous messages",
        cooldownSessions: 10,
        isRelevant: () => !0
    }, {
        id: "continue",
        content: "Run claude --continue or claude --resume to resume a conversation",
        cooldownSessions: 10,
        isRelevant: () => !0
    }, {
        id: "custom-commands",
        content: "Create custom slash commands by adding .md files to .claude/commands/ in your project or ~/.claude/commands/ for commands that work in any project",
        cooldownSessions: 15,
        isRelevant: () => {
            return H0().numStartups > 10
        }
    }, {
        id: "shift-tab",
        content: `Hit ${ZH.displayText} to cycle between default mode, auto-accept edit mode, and plan mode`,
        cooldownSessions: 10,
        isRelevant: () => !0
    }, {
        id: "custom-agents",
        content: "Use /agents to create context-efficient experts for specific tasks. Eg. Code Reviewer, Software Architect, Data Scientist",
        cooldownSessions: 15,
        isRelevant: () => {
            return H0().numStartups > 5
        }
    }],
    pR8 = [],
    kcB = [...lR8, ...pR8];
var iR8 = 100;