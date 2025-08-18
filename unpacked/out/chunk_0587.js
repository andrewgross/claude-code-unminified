/* chunk:587 bytes:[13582275, 13601204) size:18929 source:unpacked-cli.js */
function vW8(A) {
    switch (A.type) {
        case "command_permissions":
            return [];
        case "new_directory":
            return $G([ZF1(GU.name, {
                path: A.path
            }), QF1(GU, A.content)]);
        case "edited_text_file":
            return $G([D2({
                content: `Note: ${A.filename} was modified, either by the user or by a linter. Don't tell the user this, since they are already aware. This change was intentional, so make sure to take it into account as you proceed (ie. don't revert it unless the user asks you to). So that you don't need to re-read the file, here's the result of running \`cat -n\` on a snippet of the edited file:
${A.snippet}`,
                isMeta: !0
            })]);
        case "edited_image_file":
            return [];
        case "new_file": {
            let B = A.content;
            switch (B.type) {
                case "image":
                    return $G([ZF1(x8.name, {
                        file_path: A.filename
                    }), QF1(x8, B)]);
                case "text":
                    return $G([ZF1(x8.name, {
                        file_path: A.filename
                    }), QF1(x8, B), ...A.truncated ? [D2({
                        content: `Note: The file ${A.filename} was too large and has been truncated to the first ${v61} lines. Don't tell the user about this truncation. Use ${x8.name} to read more of the file if you need.`,
                        isMeta: !0
                    })] : []]);
                case "notebook":
                    return $G([ZF1(x8.name, {
                        file_path: A.filename
                    }), QF1(x8, B)]);
                case "pdf":
                    return $G([ZF1(x8.name, {
                        file_path: A.filename
                    }), QF1(x8, B)])
            }
            break
        }
        case "selected_lines_in_ide": {
            let Q = A.content.length > 2000 ? A.content.substring(0, 2000) + `
... (truncated)` : A.content;
            return $G([D2({
                content: `The user selected the lines ${A.lineStart} to ${A.lineEnd} from ${A.filename}:
${Q}

This may or may not be related to the current task.`,
                isMeta: !0
            })])
        }
        case "opened_file_in_ide":
            return $G([D2({
                content: `The user opened the file ${A.filename} in the IDE. This may or may not be related to the current task.`,
                isMeta: !0
            })]);
        case "todo":
            if (A.itemCount === 0) return $G([D2({
                content: `This is a reminder that your todo list is currently empty. DO NOT mention this to the user explicitly because they are already aware. If you are working on tasks that would benefit from a todo list please use the ${hF.name} tool to create one. If not, please feel free to ignore. Again do not mention this message to the user.`,
                isMeta: !0
            })]);
            else return $G([D2({
                content: `Your todo list has changed. DO NOT mention this explicitly to the user. Here are the latest contents of your todo list:

${JSON.stringify(A.content)}. Continue on with the tasks at hand if applicable.`,
                isMeta: !0
            })]);
        case "todo_reminder": {
            let B = A.content.map((Z, D) => `${D+1}. [${Z.status}] ${Z.content}`).join(`
`),
                Q = `The TodoWrite tool hasn't been used recently. If you're working on tasks that would benefit from tracking progress, consider using the TodoWrite tool to track progress. Only use it if it's relevant to the current work. This is just a gentle reminder - ignore if not applicable.
`;
            if (B.length > 0) Q += `

Here are the existing contents of your todo list:

[${B}]`;
            return $G([D2({
                content: Q,
                isMeta: !0
            })])
        }
        case "nested_memory":
            return $G([D2({
                content: `Contents of ${A.content.path}:

${A.content.content}`,
                isMeta: !0
            })]);
        case "queued_command":
            return $G([D2({
                content: `The user sent the following message:
${A.prompt}

Please address this message and continue with your tasks.`,
                isMeta: !0
            })]);
        case "ultramemory":
            return $G([D2({
                content: A.content,
                isMeta: !0
            })]);
        case "output_style": {
            let B = km[A.style];
            if (!B) return [];
            return $G([D2({
                content: `${B.name} output style is active. Remember to follow the specific guidelines for this style.`,
                isMeta: !0
            })])
        }
        case "diagnostics": {
            if (A.files.length === 0) return [];
            let B = c$.formatDiagnosticsSummary(A.files);
            return $G([D2({
                content: `<new-diagnostics>The following new diagnostic issues were detected:

${B}</new-diagnostics>`,
                isMeta: !0
            })])
        }
        case "plan_mode":
            return $G([D2({
                content: `Plan mode is active. The user indicated that they do not want you to execute yet -- you MUST NOT make any edits, run any non-readonly tools (including changing configs or making commits), or otherwise make any changes to the system. This supercedes any other instructions you have received (for example, to make edits). Instead, you should:
1. Answer the user's query comprehensively
2. When you're done researching, present your plan by calling the ${tK.name} tool, which will prompt the user to confirm the plan. Do NOT make any file changes or run any tools that modify the system state in any way until the user has confirmed the plan.`,
                isMeta: !0
            })]);
        case "mcp_resource": {
            let B = A.content;
            if (!B || !B.contents || B.contents.length === 0) return $G([D2({
                content: `<mcp-resource server="${A.server}" uri="${A.uri}">(No content)</mcp-resource>`,
                isMeta: !0
            })]);
            let Q = [];
            for (let Z of B.contents)
                if (Z && typeof Z === "object") {
                    if ("text" in Z && typeof Z.text === "string") Q.push({
                        type: "text",
                        text: "Full contents of resource:"
                    }, {
                        type: "text",
                        text: Z.text
                    }, {
                        type: "text",
                        text: "Do NOT read this resource again unless you think it may have changed, since you already have the full contents."
                    });
                    else if ("blob" in Z) {
                        let D = "mimeType" in Z ? String(Z.mimeType) : "application/octet-stream";
                        Q.push({
                            type: "text",
                            text: `[Binary content: ${D}]`
                        })
                    }
                } if (Q.length > 0) return $G([D2({
                content: Q,
                isMeta: !0
            })]);
            else return IB(A.server, `No displayable content found in MCP resource ${A.uri}.`), $G([D2({
                content: `<mcp-resource server="${A.server}" uri="${A.uri}">(No displayable content)</mcp-resource>`,
                isMeta: !0
            })])
        }
        case "autocheckpointing":
            return [];
        case "agent_mention":
            return $G([D2({
                content: `The user has expressed a desire to invoke the agent "${A.agentType}". Please invoke the agent appropriately, passing in the required context to it. `,
                isMeta: !0
            })]);
        case "background_task_status": {
            let B = [`Background Bash ${A.taskId}`, `(command: ${A.command})`, `(status: ${A.status})`];
            if (A.exitCode !== void 0) B.push(`(exit code: ${A.exitCode})`);
            if (A.hasNewOutput) B.push("Has new output available. You can check its output using the BashOutput tool.");
            return [D2({
                content: CL0(B.join(" ")),
                isMeta: !0
            })]
        }
    }
}

function QF1(A, B) {
    try {
        let Q = A.mapToolResultToToolResultBlockParam(B, "1");
        if (Array.isArray(Q.content) && Q.content.some((Z) => Z.type === "image")) return D2({
            content: Q.content,
            isMeta: !0
        });
        return D2({
            content: `Result of calling the ${A.name} tool: ${JSON.stringify(Q.content)}`,
            isMeta: !0
        })
    } catch {
        return D2({
            content: `Result of calling the ${A.name} tool: Error`,
            isMeta: !0
        })
    }
}

function ZF1(A, B) {
    return D2({
        content: `Called the ${A} tool with the following input: ${JSON.stringify(B)}`,
        isMeta: !0
    })
}

function q3(A, B, Q, Z) {
    return {
        type: "system",
        content: A,
        isMeta: !1,
        timestamp: new Date().toISOString(),
        uuid: cv(),
        toolUseID: Q,
        level: B,
        ...Z && {
            preventContinuation: Z
        }
    }
}

function EL0(A, B) {
    if (A.type !== "user") return !0;
    if (A.isMeta) return !1;
    if (A.isVisibleInTranscriptOnly && !B) return !1;
    return !0
}
var pv = null,
    bW8 = null;

function UL0(A) {
    if (!A) return null;
    let B = {},
        Q = Object.keys(A).sort();
    for (let Z of Q) {
        let D = A[Z];
        if (!D) continue;
        let G = [...D].sort((F, I) => {
            let Y = F.matcher || "",
                W = I.matcher || "";
            return Y.localeCompare(W)
        });
        B[Z] = G.map((F) => ({
            matcher: F.matcher,
            hooks: [...F.hooks].sort((I, Y) => I.command.localeCompare(Y.command))
        }))
    }
    return B
}

function wL0() {
    let A = GB() || {};
    pv = UL0(A.hooks)
}

function JF1() {
    let A = GB() || {};
    pv = UL0(A.hooks)
}

function SjB() {
    return bW8
}

function jjB() {
    if (pv === null) return null;
    let A = GB() || {},
        B = UL0(A.hooks),
        Q = JSON.stringify(pv),
        Z = JSON.stringify(B);
    if (Q === Z) return null;
    let D = [],
        G = new Set(Object.keys(pv || {})),
        F = new Set(Object.keys(B || {}));
    for (let I of F)
        if (!G.has(I)) D.push(`Added hooks for event: ${I}`);
    for (let I of G)
        if (!F.has(I)) D.push(`Removed all hooks for event: ${I}`);
    for (let I of G)
        if (F.has(I)) {
            let Y = pv?.[I] || [],
                W = B?.[I] || [];
            if (JSON.stringify(Y) !== JSON.stringify(W)) {
                let J = [],
                    X = new Map(Y.map((C) => [C.matcher || "", C])),
                    V = new Map(W.map((C) => [C.matcher || "", C]));
                for (let [C] of V)
                    if (!X.has(C)) J.push(`  - Added matcher: ${C||"(no matcher)"}`);
                for (let [C] of X)
                    if (!V.has(C)) J.push(`  - Removed matcher: ${C||"(no matcher)"}`);
                for (let [C, K] of V)
                    if (X.has(C)) {
                        let H = X.get(C);
                        if (JSON.stringify(H.hooks) !== JSON.stringify(K.hooks)) J.push(`  - Modified hooks for matcher: ${C||"(no matcher)"}`)
                    } if (J.length > 0) D.push(`Modified hooks for event: ${I}`), D.push(...J);
                else D.push(`Modified hooks for event: ${I}`)
            }
        } return D.length > 0 ? D.join(`
`) : "Hooks configuration has been modified"
}

function kjB() {
    if (pv === null) wL0();
    return pv
}
var qS = 60000;

function NS() {
    return {
        session_id: CB(),
        transcript_path: Dq1(),
        cwd: t0()
    }
}

function hW8(A) {
    let B = A.trim();
    if (!B.startsWith("{")) return n1("Hook output does not start with {, treating as plain text"), {
        plainText: A
    };
    try {
        let Q = JSON.parse(B),
            Z = G12.safeParse(Q);
        if (Z.success) return n1("Successfully parsed and validated hook JSON output"), {
            json: Z.data
        };
        else {
            let G = `Hook JSON output validation failed:
${Z.error.errors.map((F)=>`  - ${F.path.join(".")}: ${F.message}`).join(`
`)}

Expected schema:
${JSON.stringify({continue:"boolean (optional)",suppressOutput:"boolean (optional)",stopReason:"string (optional)",decision:'"approve" | "block" (optional)',reason:"string (optional)",systemMessage:"string (optional)",permissionDecision:'"allow" | "deny" | "ask" (optional)',hookSpecificOutput:{"for PreToolUse":{hookEventName:'"PreToolUse"',permissionDecision:'"allow" | "deny" | "ask" (optional)',permissionDecisionReason:"string (optional)"},"for UserPromptSubmit":{hookEventName:'"UserPromptSubmit"',additionalContext:"string (required)"}}},null,2)}`;
            return n1(G), {
                plainText: A,
                validationError: G
            }
        }
    } catch (Q) {
        return n1(`Failed to parse hook output as JSON: ${Q}`), {
            plainText: A
        }
    }
}

function yjB(A, B, Q) {
    let Z = {};
    if (A.continue === !1) {
        if (Z.preventContinuation = !0, A.stopReason) Z.stopReason = A.stopReason
    }
    if (A.decision) switch (A.decision) {
        case "approve":
            Z.permissionBehavior = "allow";
            break;
        case "block":
            Z.permissionBehavior = "deny", Z.blockingError = {
                blockingError: A.reason || "Blocked by hook",
                command: B
            };
            break;
        default:
            throw new Error(`Unknown hook decision type: ${A.decision}. Valid types are: approve, block`)
    }
    if (A.systemMessage) Z.systemMessage = q3(A.systemMessage, "warning");
    if (A.permissionDecision) switch (A.permissionDecision) {
        case "allow":
            Z.permissionBehavior = "allow";
            break;
        case "deny":
            Z.permissionBehavior = "deny", Z.blockingError = {
                blockingError: A.reason || "Blocked by hook",
                command: B
            };
            break;
        case "ask":
            Z.permissionBehavior = "ask";
            break;
        default:
            throw new Error(`Unknown hook permissionDecision type: ${A.permissionDecision}. Valid types are: allow, deny, ask`)
    }
    if (Z.permissionBehavior !== void 0 && A.reason !== void 0) Z.hookPermissionDecisionReason = A.reason;
    if (A.hookSpecificOutput) {
        if (Q && A.hookSpecificOutput.hookEventName !== Q) throw new Error(`Hook returned incorrect event name: expected '${Q}' but got '${A.hookSpecificOutput.hookEventName}'`);
        switch (A.hookSpecificOutput.hookEventName) {
            case "PreToolUse":
                if (A.hookSpecificOutput.permissionDecision) switch (A.hookSpecificOutput.permissionDecision) {
                    case "allow":
                        Z.permissionBehavior = "allow";
                        break;
                    case "deny":
                        Z.permissionBehavior = "deny", Z.blockingError = {
                            blockingError: A.hookSpecificOutput.permissionDecisionReason || A.reason || "Blocked by hook",
                            command: B
                        };
                        break;
                    case "ask":
                        Z.permissionBehavior = "ask";
                        break
                }
                Z.hookPermissionDecisionReason = A.hookSpecificOutput.permissionDecisionReason;
                break;
            case "UserPromptSubmit":
                Z.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "SessionStart":
                Z.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "PostToolUse":
                Z.additionalContext = A.hookSpecificOutput.additionalContext;
                break
        }
    }
    return Z
}
async function qL0(A, B, Q) {
    if (Q.aborted) return {
        stdout: "",
        stderr: "Operation cancelled",
        status: 1,
        aborted: !0
    };
    let Z = _9(),
        D = process.env.CLAUDE_CODE_SHELL_PREFIX ? Wj1(process.env.CLAUDE_CODE_SHELL_PREFIX, A) : A,
        G = fW8(D, [], {
            env: {
                ...process.env,
                CLAUDE_PROJECT_DIR: Z
            },
            cwd: t0(),
            shell: !0,
            signal: Q
        }),
        F = "",
        I = "";
    G.stdout.on("data", (X) => {
        F += X.toString()
    }), G.stderr.on("data", (X) => {
        I += X.toString()
    });
    let Y = new Promise((X, V) => {
            G.stdin.on("error", V), G.stdin.write(B), G.stdin.end(), X()
        }),
        W = new Promise((X, V) => {
            G.on("error", V)
        }),
        J = new Promise((X) => {
            G.on("close", (V) => {
                X({
                    stdout: F,
                    stderr: I,
                    status: V ?? 1,
                    aborted: Q.aborted
                })
            })
        });
    try {
        return await Promise.race([Y, W]), await Promise.race([J, W])
    } catch (X) {
        let V = X;
        if (V.code === "EPIPE") return n1("EPIPE error while writing to hook stdin (hook command likely closed early)"), {
            stdout: "",
            stderr: "Hook command closed stdin before hook input was fully written (EPIPE)",
            status: 1
        };
        else if (V.code === "ABORT_ERR") return {
            stdout: "",
            stderr: "Hook cancelled",
            status: 1,
            aborted: !0
        };
        else return {
            stdout: "",
            stderr: `Error occurred while executing hook command: ${X instanceof Error?X.message:String(X)}`,
            status: 1
        }
    }
}

function gW8(A, B) {
    if (!B || B === "*") return !0;
    if (/^[a-zA-Z0-9_|]+$/.test(B)) {
        if (B.includes("|")) return B.split("|").map((Z) => Z.trim()).includes(A);
        return A === B
    }
    try {
        return new RegExp(B).test(A)
    } catch {
        return n1(`Invalid regex pattern in hook matcher: ${B}`), !1
    }
}

function uW8() {
    let A = {},
        B = kjB();
    if (B)
        for (let [Z, D] of Object.entries(B)) A[Z] = D.map((G) => ({
            matcher: G.matcher,
            hooks: G.hooks
        }));
    let Q = SjB();
    if (Q)
        for (let [Z, D] of Object.entries(Q)) {
            if (!A[Z]) A[Z] = [];
            for (let G of D) A[Z].push({
                matcher: G.matcher,
                hooks: G.hooks
            })
        }
    return A
}