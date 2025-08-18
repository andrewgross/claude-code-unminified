/* chunk:592 bytes:[13666967, 13686914) size:19947 source:unpacked-cli.js */
function MJ8(A, B, Q, Z, D) {
    try {
        let {
            name: G,
            description: F
        } = Q;
        if (!G || typeof G !== "string" || !F || typeof F !== "string") {
            let C = `Agent file ${A} is missing required '${!G||typeof G!=="string"?"name":"description"}' in frontmatter`;
            return n1(C), R1(new Error(C)), null
        }
        F = F.replace(/\\n/g, `
`);
        let {
            color: I,
            model: Y
        } = Q, W = Y && typeof Y === "string" && l41.includes(Y);
        if (Y && typeof Y === "string" && !W) {
            let V = `Agent file ${A} has invalid model '${Y}'. Valid options: ${l41.join(", ")}`;
            n1(V), R1(new Error(V))
        }
        let J = NJ8(A, ".md");
        return {
            baseDir: B,
            agentType: G,
            whenToUse: F,
            tools: aj1(Q.tools),
            systemPrompt: Z.trim(),
            source: D,
            filename: J,
            ...I && typeof I === "string" && iv.includes(I) ? {
                color: I
            } : {},
            ...W ? {
                model: Y
            } : {}
        }
    } catch (G) {
        let F = G instanceof Error ? G.message : String(G);
        return n1(`Error parsing agent from ${A}: ${F}`), R1(G instanceof Error ? G : new Error(String(G))), null
    }
}
var SkB = {
    TURNS_SINCE_WRITE: 20,
    TURNS_BETWEEN_REMINDERS: 10
};
async function OJ8(A, B, Q, Z, D, G) {
    let F = h4();
    setTimeout(() => {
        F.abort()
    }, 1000);
    let I = {
            ...B,
            abortController: F
        },
        [Y, W, J, X, V, C, K, H, z, $, L, N, R, O, P] = await Promise.all([A ? OX("at_mentioned_files", () => _J8(A, I)) : Promise.resolve([]), A ? OX("mcp_resources", () => vJ8(A, I)) : Promise.resolve([]), A ? OX("agent_mentions", () => xJ8(A)) : Promise.resolve([]), OX("changed_files", () => bJ8(I)), OX("ide_selection", async () => kJ8(Q, B)), OX("ide_opened_file", async () => yJ8(Q)), OX("nested_memory", () => fJ8(I)), OX("ultra_claude_md", async () => Promise.resolve(jJ8())), OX("output_style", async () => Promise.resolve(SJ8())), OX("queued_commands", async () => TJ8(Z)), OX("diagnostics", async () => dJ8()), OX("plan_mode", async () => Promise.resolve(PJ8(B))), OX("checkpoints", async () => jkB(D)), OX("todo_reminders", async () => lJ8(G, B)), OX("background_tasks", async () => pJ8())]);
    return [...Y, ...W, ...J, ...X, ...V, ...C, ...K, ...H, ...z, ...$, ...L, ...N, ...R, ...O, ...P]
}
async function OX(A, B) {
    let Q = Date.now();
    try {
        let Z = await B(),
            D = Date.now() - Q;
        if (Math.random() < 0.05) X1("tengu_attachment_compute_duration", {
            label: A,
            duration_ms: D
        });
        return Z
    } catch (Z) {
        let D = Date.now() - Q;
        if (Math.random() < 0.05) X1("tengu_attachment_compute_duration", {
            label: A,
            duration_ms: D,
            error: !0
        });
        return R1(Z), []
    }
}

function TJ8(A) {
    if (!A) return [];
    return A.filter((B) => B.mode === "prompt").map((B) => ({
        type: "queued_command",
        prompt: B.value
    }))
}

function PJ8(A) {
    if (A.getToolPermissionContext().mode !== "plan") return [];
    return [{
        type: "plan_mode"
    }]
}

function SJ8() {
    let B = GB()?.outputStyle || "default";
    if (B === "default") return [];
    return [{
        type: "output_style",
        style: B
    }]
}

function jJ8() {
    return []
}

function kJ8(A, B) {
    let Q = Hy1(B.options.mcpClients);
    if (!Q || A?.lineStart === void 0 || !A.text || !A.filePath) return [];
    if (hz(A.filePath)) return [];
    return [{
        type: "selected_lines_in_ide",
        ideName: Q,
        lineStart: A.lineStart,
        lineEnd: A.lineStart + A.lineCount - 1,
        filename: A.filePath,
        content: A.text
    }]
}

function yJ8(A) {
    if (!A?.filePath || A.text) return [];
    if (hz(A.filePath)) return [];
    return [{
        type: "opened_file_in_ide",
        filename: A.filePath
    }]
}
async function _J8(A, B) {
    let Q = hJ8(A);
    return (await Promise.all(Q.map(async (D) => {
        try {
            let {
                filename: G,
                lineStart: F,
                lineEnd: I
            } = mJ8(D), Y = HD(G);
            if (hz(Y)) return null;
            try {
                if (j1().statSync(Y).isDirectory()) {
                    let J = {
                            path: Y
                        },
                        X = await tM(GU.call(J, B));
                    return X1("tengu_at_mention_extracting_directory_success", {}), {
                        type: "new_directory",
                        path: Y,
                        content: X.data
                    }
                }
            } catch {}
            return await fL0(Y, B, "tengu_at_mention_extracting_filename_success", "tengu_at_mention_extracting_filename_error", {
                offset: F,
                limit: I && F ? I - F + 1 : void 0
            })
        } catch {
            X1("tengu_at_mention_extracting_filename_error", {})
        }
    }))).filter(Boolean)
}
async function xJ8(A) {
    let B = uJ8(A);
    if (B.length === 0) return [];
    try {
        let Q = await OS();
        return B.map((D) => {
            let G = D.replace("agent-", ""),
                F = Q.find((I) => I.agentType === G);
            if (!F) return X1("tengu_at_mention_agent_not_found", {}), null;
            return X1("tengu_at_mention_agent_success", {}), {
                type: "agent_mention",
                agentType: F.agentType
            }
        }).filter((D) => D !== null)
    } catch (Q) {
        return R1(Q), []
    }
}
async function vJ8(A, B) {
    let Q = gJ8(A);
    if (Q.length === 0) return [];
    let Z = B.options.mcpClients || [];
    return (await Promise.all(Q.map(async (G) => {
        try {
            let [F, ...I] = G.split(":"), Y = I.join(":");
            if (!F || !Y) return X1("tengu_at_mention_mcp_resource_error", {}), null;
            let W = Z.find((V) => V.name === F);
            if (!W || W.type !== "connected") return X1("tengu_at_mention_mcp_resource_error", {}), null;
            let X = (B.options.mcpResources?.[F] || []).find((V) => V.uri === Y);
            if (!X) return X1("tengu_at_mention_mcp_resource_error", {}), null;
            try {
                let V = await W.client.readResource({
                    uri: Y
                });
                return X1("tengu_at_mention_mcp_resource_success", {}), {
                    type: "mcp_resource",
                    server: F,
                    uri: Y,
                    name: X.name || Y,
                    description: X.description,
                    content: V
                }
            } catch (V) {
                return X1("tengu_at_mention_mcp_resource_error", {}), R1(V), null
            }
        } catch {
            return X1("tengu_at_mention_mcp_resource_error", {}), null
        }
    }))).filter((G) => G !== null)
}
async function bJ8(A) {
    return (await Promise.all(hv(A.readFileState).map(async (Q) => {
        let Z = A.readFileState.get(Q);
        if (!Z) return null;
        if (hz(Q)) return null;
        try {
            if (j1().statSync(Q).mtimeMs <= Z.timestamp) return null;
            let G = {
                file_path: Q
            };
            if (!(await x8.validateInput(G)).result) return null;
            let I = await tM(x8.call(G, A));
            if (X1("tengu_watched_file_changed", {}), Q === $v(A.agentId)) {
                let Y = sE(A.agentId);
                return {
                    type: "todo",
                    content: Y,
                    itemCount: Y.length,
                    context: "file-watch"
                }
            }
            if (I.data.type === "text") return {
                type: "edited_text_file",
                filename: Q,
                snippet: uPB(Z.content, I.data.file.content)
            };
            return {
                type: "edited_image_file",
                filename: Q,
                content: I.data
            }
        } catch {
            return X1("tengu_watched_file_stat_error", {}), null
        }
    }))).filter((Q) => Q !== null)
}
async function fJ8(A) {
    let B = [];
    if (A.nestedMemoryAttachmentTriggers && A.nestedMemoryAttachmentTriggers.size > 0) {
        for (let Q of A.nestedMemoryAttachmentTriggers) try {
            let Z = MkB(Q, A.getToolPermissionContext());
            for (let D of Z)
                if (!A.readFileState.has(D.path)) B.push({
                    type: "nested_memory",
                    path: D.path,
                    content: D
                }), A.readFileState.set(D.path, {
                    content: D.content,
                    timestamp: Date.now()
                })
        } catch (Z) {
            R1(Z)
        }
        A.nestedMemoryAttachmentTriggers.clear()
    }
    return B
}

function hJ8(A) {
    let B = /(^|\s)@([^\s]+)\b/g,
        Q = A.match(B) || [];
    return [...new Set(Q.map((Z) => Z.slice(Z.indexOf("@") + 1)))]
}

function gJ8(A) {
    let B = /(^|\s)@([^\s]+:[^\s]+)\b/g,
        Q = A.match(B) || [];
    return [...new Set(Q.map((Z) => Z.slice(Z.indexOf("@") + 1)))]
}

function uJ8(A) {
    let B = /(^|\s)@(agent-[a-zA-Z0-9-]+)\b/g,
        Q = A.match(B) || [];
    return [...new Set(Q.map((Z) => Z.slice(Z.indexOf("@") + 1)))]
}

function mJ8(A) {
    let B = A.match(/^([^#]+)(?:#L(\d+)(?:-(\d+))?)?$/);
    if (!B) return {
        filename: A
    };
    let [, Q, Z, D] = B, G = Z ? parseInt(Z, 10) : void 0, F = D ? parseInt(D, 10) : G;
    return {
        filename: Q ?? A,
        lineStart: G,
        lineEnd: F
    }
}
async function dJ8() {
    let A = await u$.getNewDiagnostics();
    if (A.length === 0) return [];
    return [{
        type: "diagnostics",
        files: A,
        isNew: !0
    }]
}

function jkB(A) {
    if (!A || !A.checkpointId) return [];
    return [{
        type: "autocheckpointing",
        checkpointId: A.checkpointId,
        status: A.status
    }]
}

function qF1(A) {
    let B = [];
    try {
        let Q = jkB(A);
        for (let Z of Q) B.push(Rd(Z))
    } catch (Q) {
        R1(Q)
    }
    return B
}

function NF1(A, B) {
    for (let Q = B; Q < A.length; Q++) {
        let Z = A[Q];
        if (!Z) continue;
        if (Z.type === "user" && Q !== B) {
            if (typeof Z.message.content === "string") {
                let D = Z.message.content;
                if (D.indexOf("<local-command-stdout>") === -1 && D.indexOf("<local-command-stderr>") === -1) break
            }
        }
        if (Z.type === "attachment") {
            let D = Z.attachment;
            if (D.type === "autocheckpointing") return D.checkpointId
        }
    }
    return
}
async function* LF1(A, B, Q, Z, D, G) {
    let F = await OJ8(A, B, Q, Z, D, G);
    if (F.length === 0) return;
    X1("tengu_attachments", {
        attachment_types: F.map((I) => I.type)
    });
    for (let I of F) yield Rd(I)
}
async function fL0(A, B, Q, Z, D) {
    let {
        offset: G,
        limit: F
    } = D ?? {};
    if (hz(A)) return null;
    try {
        let I = {
            file_path: A,
            offset: G,
            limit: F
        };
        async function Y() {
            try {
                let J = {
                        file_path: A,
                        offset: G ?? 1,
                        limit: v61
                    },
                    X = await tM(x8.call(J, B));
                return X1(Q, {}), {
                    type: "new_file",
                    filename: A,
                    content: X.data,
                    truncated: !0
                }
            } catch {
                return X1(Z, {}), null
            }
        }
        let W = await x8.validateInput(I);
        if (!W.result) {
            if (W.meta?.fileSize) return await Y();
            return null
        }
        try {
            let J = await tM(x8.call(I, B));
            return X1(Q, {}), {
                type: "new_file",
                filename: A,
                content: J.data
            }
        } catch (J) {
            if (J instanceof Gb1) return await Y();
            throw J
        }
    } catch {
        return X1(Z, {}), null
    }
}

function Rd(A) {
    return {
        attachment: A,
        type: "attachment",
        uuid: RJ8(),
        timestamp: new Date().toISOString()
    }
}

function cJ8(A) {
    let B = -1,
        Q = -1,
        Z = 0,
        D = 0;
    for (let G = A.length - 1; G >= 0; G--) {
        let F = A[G];
        if (F?.type === "assistant") {
            if (B === -1) Z++;
            if (Q === -1) D++;
            if (B === -1 && "message" in F && Array.isArray(F.message?.content) && F.message.content.some((I) => I.type === "tool_use" && I.name === "TodoWrite")) B = G
        } else if (Q === -1 && F?.type === "attachment" && F.attachment.type === "todo_reminder") Q = G;
        if (B !== -1 && Q !== -1) break
    }
    return {
        turnsSinceLastTodoWrite: Z,
        turnsSinceLastReminder: D
    }
}
async function lJ8(A, B) {
    if (!A || A.length === 0) return [];
    let {
        turnsSinceLastTodoWrite: Q,
        turnsSinceLastReminder: Z
    } = cJ8(A);
    if (Q >= SkB.TURNS_SINCE_WRITE && Z >= SkB.TURNS_BETWEEN_REMINDERS) {
        let D = sE(B.agentId);
        return [{
            type: "todo_reminder",
            content: D,
            itemCount: D.length
        }]
    }
    return []
}
async function pJ8() {
    let A = tTB().filter((Q) => Q.hasNewOutput).map((Q) => ({
            type: "background_task_status",
            taskId: Q.id,
            command: Q.command,
            status: "running",
            hasNewOutput: Q.hasNewOutput
        })),
        B = eTB().map((Q) => {
            return APB(Q.id), {
                type: "background_task_status",
                taskId: Q.id,
                command: Q.command,
                status: Q.status,
                exitCode: Q.result?.code,
                hasNewOutput: KN0(Q)
            }
        });
    return [...A, ...B]
}

function kkB(A) {
    return A.attachment.type === "queued_command"
}
var ykB = ["User", "Project", "Local", "Managed", "ExperimentalUltraClaudeMd"];

function ab1(A) {
    if (A === "Local") return "project (local)";
    return A.toLowerCase()
}

function sb1(A) {
    if (A === "Local") return "Project (local) memory";
    return A + " memory"
}
var _kB = 20000;

function P01(A) {
    if (A.includes("[1m]")) return 1e6;
    return 200000
}

function vkB(A) {
    let B = {
            toolRequests: new Map,
            toolResults: new Map,
            humanMessages: 0,
            assistantMessages: 0,
            localCommandOutputs: 0,
            other: 0,
            attachments: new Map,
            duplicateFileReads: new Map,
            total: 0
        },
        Q = new Map,
        Z = new Map,
        D = new Map;
    return A.forEach((F) => {
        if (F.type === "attachment") {
            let I = F.attachment.type || "unknown";
            B.attachments.set(I, (B.attachments.get(I) || 0) + 1)
        }
    }), AW(A).forEach((F) => {
        let {
            content: I
        } = F.message;
        if (typeof I === "string") {
            let Y = zJ(I);
            if (B.total += Y, F.type === "user" && I.includes("local-command-stdout")) B.localCommandOutputs += Y;
            else B[F.type === "user" ? "humanMessages" : "assistantMessages"] += Y
        } else I.forEach((Y) => iJ8(Y, F, B, Q, Z, D))
    }), D.forEach((F, I) => {
        if (F.count > 1) {
            let W = Math.floor(F.totalTokens / F.count) * (F.count - 1);
            B.duplicateFileReads.set(I, {
                count: F.count,
                tokens: W
            })
        }
    }), B
}

function iJ8(A, B, Q, Z, D, G) {
    let F = zJ(JSON.stringify(A));
    switch (Q.total += F, A.type) {
        case "text":
            if (B.type === "user" && "text" in A && A.text.includes("local-command-stdout")) Q.localCommandOutputs += F;
            else Q[B.type === "user" ? "humanMessages" : "assistantMessages"] += F;
            break;
        case "tool_use": {
            if ("name" in A && "id" in A) {
                let I = A.name || "unknown";
                if (xkB(Q.toolRequests, I, F), Z.set(A.id, I), I === "Read" && "input" in A && A.input && typeof A.input === "object" && "file_path" in A.input) {
                    let Y = String(A.input.file_path);
                    D.set(A.id, Y)
                }
            }
            break
        }
        case "tool_result": {
            if ("tool_use_id" in A) {
                let I = Z.get(A.tool_use_id) || "unknown";
                if (xkB(Q.toolResults, I, F), I === "Read") {
                    let Y = D.get(A.tool_use_id);
                    if (Y) {
                        let W = G.get(Y) || {
                            count: 0,
                            totalTokens: 0
                        };
                        G.set(Y, {
                            count: W.count + 1,
                            totalTokens: W.totalTokens + F
                        })
                    }
                }
            }
            break
        }
        case "image":
        case "server_tool_use":
        case "web_search_tool_result":
        case "document":
        case "thinking":
        case "redacted_thinking":
            Q.other += F;
            break
    }
}

function xkB(A, B, Q) {
    A.set(B, (A.get(B) || 0) + Q)
}

function bkB(A) {
    let B = {
        total_tokens: A.total,
        human_message_tokens: A.humanMessages,
        assistant_message_tokens: A.assistantMessages,
        local_command_output_tokens: A.localCommandOutputs,
        other_tokens: A.other
    };
    A.attachments.forEach((Z, D) => {
        B[`attachment_${D}_count`] = Z
    }), A.toolRequests.forEach((Z, D) => {
        B[`tool_request_${D}_tokens`] = Z
    }), A.toolResults.forEach((Z, D) => {
        B[`tool_result_${D}_tokens`] = Z
    });
    let Q = [...A.duplicateFileReads.values()].reduce((Z, D) => Z + D.tokens, 0);
    if (B.duplicate_read_tokens = Q, B.duplicate_read_file_count = A.duplicateFileReads.size, A.total > 0) {
        B.human_message_percent = Math.round(A.humanMessages / A.total * 100), B.assistant_message_percent = Math.round(A.assistantMessages / A.total * 100), B.local_command_output_percent = Math.round(A.localCommandOutputs / A.total * 100), B.duplicate_read_percent = Math.round(Q / A.total * 100);
        let Z = [...A.toolRequests.values()].reduce((G, F) => G + F, 0),
            D = [...A.toolResults.values()].reduce((G, F) => G + F, 0);
        B.tool_request_percent = Math.round(Z / A.total * 100), B.tool_result_percent = Math.round(D / A.total * 100), A.toolRequests.forEach((G, F) => {
            B[`tool_request_${F}_percent`] = Math.round(G / A.total * 100)
        }), A.toolResults.forEach((G, F) => {
            B[`tool_result_${F}_percent`] = Math.round(G / A.total * 100)
        })
    }
    return B
}
async function WU(A) {
    let B = [],
        Q = [];
    for await (let Z of ljB(A)) {
        if (Z.message) B.push(Z.message);
        if (Z.additionalContexts && Z.additionalContexts.length > 0) Q.push(...Z.additionalContexts)
    }
    if (Q.length > 0) {
        let Z = D2({
            content: `<session-start-hook>${Q.join(`

`)}</session-start-hook>`
        });
        B.push(Z)
    }
    return B
}
var nJ8 = 5,
    aJ8 = 50000,
    sJ8 = 1e4,
    MF1 = "Not enough messages to compact.",
    rJ8 = "Conversation too long. Press esc to go up a few messages and try again.",
    RF1 = "API Error: Request was aborted.";