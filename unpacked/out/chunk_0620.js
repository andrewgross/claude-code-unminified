/* chunk:620 bytes:[14180858, 14200476) size:19618 source:unpacked-cli.js */
function BmB({
    hookEventMetadata: A,
    exitStatePending: B,
    exitStateKeyName: Q,
    configDifference: Z,
    onSelectEvent: D
}) {
    return m2.createElement(m2.Fragment, null, m2.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "warning"
    }, m2.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, m2.createElement(v, null, m2.createElement(T, {
        bold: !0,
        color: "warning"
    }, "Hook Configuration")), m2.createElement(v, {
        flexDirection: "column"
    }, m2.createElement(v, {
        marginY: 0.5
    }, m2.createElement(T, null, e1.bold("Hooks"), " are shell commands you can register to run during Claude Code processing.", " ", m2.createElement(C3, {
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks"
    }, "Docs"))), m2.createElement(v, {
        flexDirection: "column",
        paddingTop: 0.25
    }, m2.createElement(T, null, "• Each hook event has its own input and output behavior"), m2.createElement(T, null, "• Multiple hooks can be registered per event, executed in parallel"), m2.createElement(T, null, "• Any changes to hooks outside of /hooks require a restart"), m2.createElement(T, null, "• Timeout: 60 seconds"))), m2.createElement(v, {
        borderStyle: "round",
        borderColor: "error",
        paddingX: 1,
        marginY: 0.5
    }, m2.createElement(v, {
        flexDirection: "column"
    }, m2.createElement(T, {
        bold: !0,
        color: "error"
    }, s0.warning, " CRITICAL SECURITY WARNING - USE AT YOUR OWN RISK"), m2.createElement(T, null, "Hooks execute arbitrary shell commands with YOUR full user permissions without confirmation."), m2.createElement(T, null, "• You are SOLELY RESPONSIBLE for ensuring your hooks are safe and secure"), m2.createElement(T, null, "• Hooks can modify, delete, or access ANY files your user account can access"), m2.createElement(T, null, "• Malicious or poorly written hooks can cause irreversible data loss or system damage"), m2.createElement(T, null, "• Anthropic provides NO WARRANTY and assumes NO LIABILITY for any damages resulting from hook usage"), m2.createElement(T, null, "• Only use hooks from trusted sources to prevent data exfiltration"), m2.createElement(T, null, "• Review", " ", m2.createElement(C3, {
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks"
    }, "the hooks documentation"), " ", "before proceeding"))), Z && m2.createElement(v, {
        borderStyle: "round",
        borderColor: "warning",
        paddingX: 1,
        marginY: 0.5
    }, m2.createElement(v, {
        flexDirection: "column"
    }, m2.createElement(T, {
        bold: !0,
        color: "warning"
    }, s0.warning, " Settings Changed"), m2.createElement(T, null, "Hook settings have been modified outside of this menu. Review the following changes carefully:"), m2.createElement(T, {
        dimColor: !0
    }, Z)))), m2.createElement(v, {
        flexDirection: "column"
    }, m2.createElement(T, {
        bold: !0
    }, "Select hook event:"), m2.createElement(uA, {
        onChange: (G) => {
            if (G === "disable-all") D("disable-all");
            else D(G)
        },
        onCancel: () => {},
        options: [...Object.entries(A).map(([G, F]) => ({
            label: `${G} - ${F.summary}`,
            value: G
        })), {
            label: e1.red("Disable all hooks"),
            value: "disable-all"
        }]
    }))), m2.createElement(v, {
        marginLeft: 3
    }, B ? m2.createElement(T, {
        dimColor: !0
    }, "Press ", Q, " again to exit") : m2.createElement(T, {
        dimColor: !0
    }, "Enter to acknowledge risks and continue · Esc to exit")))
}
var N3 = G1(z1(), 1);

function QmB({
    selectedEvent: A,
    matchersForSelectedEvent: B,
    hooksByEventAndMatcher: Q,
    eventDescription: Z,
    onSelect: D,
    onCancel: G
}) {
    let F = N3.useMemo(() => {
        return B.map((I) => {
            let Y = Q[A]?.[I] || [],
                W = Array.from(new Set(Y.map((J) => J.source)));
            return {
                matcher: I,
                sources: W,
                hookCount: Y.length
            }
        })
    }, [B, Q, A]);
    return N3.createElement(N3.Fragment, null, N3.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "suggestion"
    }, N3.createElement(T, {
        bold: !0,
        color: "suggestion"
    }, A, " - Tool Matchers"), Z && N3.createElement(v, {
        marginTop: 1
    }, N3.createElement(T, {
        dimColor: !0
    }, Z)), N3.createElement(v, {
        marginY: 1
    }, N3.createElement(uA, {
        options: [{
            label: `+ Add new matcher${s0.ellipsis}`,
            value: "add-new"
        }, ...F.map((I) => {
            return {
                label: `[${I.sources.map(tuB).join(", ")}] ${I.matcher}`,
                value: I.matcher,
                description: `${I.hookCount} hook${I.hookCount!==1?"s":""}`
            }
        })],
        onChange: (I) => {
            if (I === "add-new") D(null);
            else D(I)
        },
        onCancel: G
    }), B.length === 0 && N3.createElement(v, {
        marginLeft: 2
    }, N3.createElement(T, {
        dimColor: !0
    }, "No matchers configured yet")))), N3.createElement(v, {
        marginLeft: 3
    }, N3.createElement(T, {
        dimColor: !0
    }, "Enter to select · Esc to go back")))
}
var G6 = G1(z1(), 1);

function ZmB({
    selectedEvent: A,
    newMatcher: B,
    onChangeNewMatcher: Q,
    eventDescription: Z,
    matcherMetadata: D
}) {
    let [G, F] = G6.useState(B.length);
    return G6.createElement(G6.Fragment, null, G6.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "success",
        gap: 1
    }, G6.createElement(T, {
        bold: !0,
        color: "success"
    }, "Add new matcher for ", A), Z && G6.createElement(v, {
        marginBottom: 0.5
    }, G6.createElement(T, {
        dimColor: !0
    }, Z)), G6.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, G6.createElement(T, null, "Possible matcher values for field ", D.fieldToMatch, ":"), G6.createElement(T, {
        dimColor: !0
    }, D.values.join(", "))), G6.createElement(v, {
        flexDirection: "column"
    }, G6.createElement(T, null, "Tool matcher:"), G6.createElement(v, {
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingLeft: 1,
        paddingRight: 1
    }, G6.createElement(y8, {
        value: B,
        onChange: Q,
        columns: 78,
        showCursor: !0,
        cursorOffset: G,
        onChangeCursorOffset: F
    }))), G6.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, G6.createElement(T, {
        dimColor: !0
    }, "Example Matchers:", `
`, "• Write (single tool)", `
`, "• Write|Edit|MultiEdit (multiple tools)", `
`, "• Web.* (regex pattern)"))), G6.createElement(v, {
        marginLeft: 3
    }, G6.createElement(T, {
        dimColor: !0
    }, "Enter to confirm · Esc to cancel")))
}
var W2 = G1(z1(), 1);

function DmB({
    selectedEvent: A,
    selectedMatcher: B,
    eventDescription: Q,
    fullDescription: Z,
    supportsMatcher: D,
    command: G,
    onChangeCommand: F
}) {
    let [I, Y] = W2.useState(G.length), {
        columns: W
    } = r9(), J = G.trim().split(/\s+/)[0] || "", X = J && !J.startsWith("/") && !J.startsWith("~") && J.includes("/"), V = /\bsudo\b/.test(G);
    return W2.createElement(W2.Fragment, null, W2.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "success",
        gap: 1
    }, W2.createElement(T, {
        bold: !0,
        color: "success"
    }, "Add new hook"), W2.createElement(v, {
        borderStyle: "round",
        borderColor: "error",
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: "column"
    }, W2.createElement(T, {
        bold: !0,
        color: "error"
    }, s0.warning, " CRITICAL SECURITY WARNING"), W2.createElement(T, null, "Hooks execute arbitrary shell commands with YOUR full user permissions. By proceeding, you acknowledge:"), W2.createElement(T, null, "• You are SOLELY responsible for any commands you configure"), W2.createElement(T, null, "• Hooks can modify, delete, or access ANY files your user can access"), W2.createElement(T, null, "• Anthropic provides NO WARRANTY and assumes NO LIABILITY for damages"), W2.createElement(T, null, "• USE AT YOUR OWN RISK - Test thoroughly before production use"), W2.createElement(T, null, "• Review", " ", W2.createElement(C3, {
        url: "https://docs.anthropic.com/en/docs/claude-code/hooks"
    }, "the hooks documentation"), " ", "before proceeding")), W2.createElement(T, null, "Event: ", W2.createElement(T, {
        bold: !0
    }, A), " - ", Q), Z && W2.createElement(v, null, W2.createElement(T, {
        dimColor: !0
    }, Z)), D && W2.createElement(T, null, "Matcher: ", W2.createElement(T, {
        bold: !0
    }, B)), W2.createElement(T, null, "Command:"), W2.createElement(v, {
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingLeft: 1,
        paddingRight: 1
    }, W2.createElement(y8, {
        value: G,
        onChange: F,
        columns: W - 8,
        showCursor: !0,
        cursorOffset: I,
        onChangeCursorOffset: Y,
        multiline: !0
    })), (X || V) && W2.createElement(v, {
        flexDirection: "column",
        gap: 0
    }, X && W2.createElement(T, {
        color: "warning"
    }, s0.warning, " Warning: Using a relative path for the executable may be insecure. Consider using an absolute path instead."), V && W2.createElement(T, {
        color: "warning"
    }, s0.warning, " Warning: Using sudo in hooks can be dangerous and may expose your system to security risks.")), W2.createElement(T, {
        dimColor: !0
    }, "Examples:", W2.createElement(S7, null), `• jq -r '.tool_input.file_path | select(endswith(".go"))' | xargs -r gofmt -w`, W2.createElement(S7, null), `• jq -r '"\\(.tool_input.command) - \\(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt`, W2.createElement(S7, null), "• /usr/local/bin/security_check.sh", W2.createElement(S7, null), "• python3 ~/hooks/validate_changes.py"), W2.createElement(v, {
        marginTop: 1,
        flexDirection: "column",
        gap: 0
    }, W2.createElement(T, {
        bold: !0,
        color: "warning"
    }, s0.warning, " Security Best Practices:"), W2.createElement(T, {
        dimColor: !0
    }, "• Use absolute paths for custom scripts (~/scripts/check.sh not check.sh)", W2.createElement(S7, null), "• Avoid using sudo - hooks run with your user permissions", W2.createElement(S7, null), "• Be cautious with patterns that match sensitive files (.env, .ssh/*, secrets.*)", W2.createElement(S7, null), "• Validate and sanitize input paths (reject ../ paths, check expected formats)", W2.createElement(S7, null), "• Avoid piping untrusted content to shells (curl ... | sh, | bash)", W2.createElement(S7, null), "• Use restrictive file permissions (chmod 644, not 777)", W2.createElement(S7, null), '• Quote all variable expansions to prevent injection: "$VAR"', W2.createElement(S7, null), "• Keep error checking enabled in scripts (avoid set +e)"), W2.createElement(T, {
        bold: !0,
        color: "warning"
    }, "By adding this hook, you accept all responsibility for its execution and any consequences."))), W2.createElement(v, {
        marginLeft: 3
    }, W2.createElement(T, {
        dimColor: !0
    }, "Enter to confirm · Esc to cancel")))
}
var bZ = G1(z1(), 1);

function GmB({
    selectedMatcher: A,
    selectedEvent: B,
    onDelete: Q,
    onCancel: Z
}) {
    return bZ.createElement(bZ.Fragment, null, bZ.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error",
        gap: 1
    }, bZ.createElement(T, {
        bold: !0,
        color: "error"
    }, "Delete matcher?"), bZ.createElement(v, {
        flexDirection: "column",
        marginX: 2
    }, bZ.createElement(T, {
        bold: !0
    }, A), bZ.createElement(T, {
        color: "text"
    }, "Event: ", B)), bZ.createElement(T, null, "This matcher has no hooks configured. Delete it?"), bZ.createElement(uA, {
        onChange: (D) => D === "yes" ? Q() : Z(),
        onCancel: Z,
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: "No",
            value: "no"
        }]
    })), bZ.createElement(v, {
        marginLeft: 3
    }, bZ.createElement(T, {
        dimColor: !0
    }, "Enter to confirm · Esc to cancel")))
}
var U7 = G1(z1(), 1);

function FmB({
    selectedEvent: A,
    selectedMatcher: B,
    hooksForSelectedMatcher: Q,
    hookEventMetadata: Z,
    onSelect: D,
    onCancel: G
}) {
    return U7.createElement(U7.Fragment, null, U7.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "success"
    }, U7.createElement(T, {
        bold: !0,
        color: "success"
    }, A, Z.matcherMetadata !== void 0 ? ` - Matcher: ${B}` : ""), Z.description && U7.createElement(v, {
        marginTop: 1
    }, U7.createElement(T, {
        dimColor: !0
    }, Z.description)), U7.createElement(v, {
        marginY: 1
    }, U7.createElement(uA, {
        options: [{
            label: `+ Add new hook${s0.ellipsis}`,
            value: "add-new"
        }, ...Q.map((F, I) => ({
            label: F.config.command,
            value: I.toString(),
            description: ouB(F.source)
        }))],
        onChange: (F) => {
            if (F === "add-new") D(null);
            else {
                let I = parseInt(F, 10),
                    Y = Q[I];
                if (Y) D(Y)
            }
        },
        onCancel: G
    }), Q.length === 0 && U7.createElement(v, {
        marginLeft: 2
    }, U7.createElement(T, {
        dimColor: !0
    }, "No hooks configured yet")))), U7.createElement(v, {
        marginLeft: 3
    }, U7.createElement(T, {
        dimColor: !0
    }, "Enter to select · Esc to go back")))
}
var L3 = G1(z1(), 1);

function ImB({
    selectedHook: A,
    eventSupportsMatcher: B,
    onDelete: Q,
    onCancel: Z
}) {
    return L3.createElement(L3.Fragment, null, L3.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error",
        gap: 1
    }, L3.createElement(T, {
        bold: !0,
        color: "error"
    }, "Delete hook?"), L3.createElement(v, {
        flexDirection: "column",
        marginX: 2
    }, L3.createElement(T, {
        bold: !0
    }, A.config.command), L3.createElement(T, {
        color: "secondaryText"
    }, "Event: ", A.event), B && L3.createElement(T, {
        color: "secondaryText"
    }, "Matcher: ", A.matcher), L3.createElement(T, {
        color: "secondaryText"
    }, ruB(A.source))), L3.createElement(T, null, "This will remove the hook configuration from your settings."), L3.createElement(uA, {
        onChange: (D) => D === "yes" ? Q() : Z(),
        onCancel: Z,
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: "No",
            value: "no"
        }]
    })), L3.createElement(v, {
        marginLeft: 3
    }, L3.createElement(T, {
        dimColor: !0
    }, "Enter to confirm · Esc to cancel")))
}
var PI1 = EA(function(A) {
    return {
        PreToolUse: {
            summary: "Before tool execution",
            description: `Input to command is JSON of tool call arguments.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and block tool call
Other exit codes - show stderr to user only but continue with tool call`,
            matcherMetadata: {
                fieldToMatch: "tool_name",
                values: A
            }
        },
        PostToolUse: {
            summary: "After tool execution",
            description: `Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).
Exit code 0 - stdout shown in transcript mode (Ctrl-R)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
            matcherMetadata: {
                fieldToMatch: "tool_name",
                values: A
            }
        },
        Notification: {
            summary: "When notifications are sent",
            description: ""
        },
        UserPromptSubmit: {
            summary: "When the user submits a prompt",
            description: `Input to command is JSON with original user prompt text.
Exit code 0 - stdout shown to Claude
Exit code 2 - block processing, erase original prompt, and show stderr to user only
Other exit codes - show stderr to user only`
        },
        SessionStart: {
            summary: "When a new session is started",
            description: `Input to command is JSON with session start source.
Exit code 0 - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only`,
            matcherMetadata: {
                fieldToMatch: "source",
                values: ["startup", "resume", "clear", "compact"]
            }
        },
        Stop: {
            summary: "Right before Claude concludes its response",
            description: `Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and continue conversation
Other exit codes - show stderr to user only`
        },
        SubagentStop: {
            summary: "Right before a subagent (Task tool call) concludes its response",
            description: `Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to subagent and continue having it run
Other exit codes - show stderr to user only`
        },
        PreCompact: {
            summary: "Before conversation compaction",
            description: `Input to command is JSON with compaction details.
Exit code 0 - stdout appended as custom compact instructions
Exit code 2 - block compaction
Other exit codes - show stderr to user only but continue with compaction`,
            matcherMetadata: {
                fieldToMatch: "trigger",
                values: ["manual", "auto"]
            }
        }
    }
});

function YmB(A) {
    let B = {
            PreToolUse: {},
            PostToolUse: {},
            Notification: {},
            UserPromptSubmit: {},
            SessionStart: {},
            Stop: {},
            SubagentStop: {},
            PreCompact: {}
        },
        Q = PI1(A);
    return nuB().forEach((Z) => {
        let D = B[Z.event];
        if (D) {
            let G = Q[Z.event].matcherMetadata !== void 0 ? Z.matcher || "" : "";
            if (!D[G]) D[G] = [];
            D[G].push(Z)
        }
    }), B
}

function WmB(A, B) {
    let Q = Object.keys(A[B] || {});
    return euB(Q, A, B)
}

function JmB(A, B, Q) {
    let Z = Q ?? "";
    return A[B]?.[Z] ?? []
}

function lS(A, B) {
    return PI1(B)[A].matcherMetadata
}

function XmB(A, B) {
    return PI1(B)[A].summary
}