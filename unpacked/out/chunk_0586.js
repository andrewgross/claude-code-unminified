/* chunk:586 bytes:[13565881, 13582273) size:16392 source:unpacked-cli.js */
var E01 = "[Request interrupted by user]",
    IU = "[Request interrupted by user for tool use]",
    lv = "The user doesn't want to take this action right now. STOP what you are doing and wait for the user to tell you how to proceed.",
    DF1 = "The user doesn't want to proceed with this tool use. The tool use was rejected (eg. if it was a file edit, the new_string was NOT written to the file). STOP what you are doing and wait for the user to tell you how to proceed.",
    GF1 = `The agent proposed a plan that was rejected by the user. The user chose to stay in plan mode rather than proceed with implementation.

Rejected plan:
`;
var FF1 = "No response requested.",
    hN0 = new Set([E01, IU, lv, DF1, FF1, ...[]]);

function gb1(A) {
    return A.type !== "progress" && A.type !== "attachment" && A.type !== "system" && Array.isArray(A.message.content) && A.message.content[0]?.type === "text" && hN0.has(A.message.content[0].text)
}

function TW8(A) {
    return A.type === "assistant" && A.isApiErrorMessage === !0 && A.message.model === "<synthetic>"
}

function NjB({
    content: A,
    isApiErrorMessage: B = !1,
    usage: Q = {
        input_tokens: 0,
        output_tokens: 0,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
        server_tool_use: {
            web_search_requests: 0
        },
        service_tier: null
    }
}) {
    return {
        type: "assistant",
        uuid: cv(),
        timestamp: new Date().toISOString(),
        message: {
            id: cv(),
            model: "<synthetic>",
            role: "assistant",
            stop_reason: "stop_sequence",
            stop_sequence: "",
            type: "message",
            usage: Q,
            content: A
        },
        requestId: void 0,
        isApiErrorMessage: B
    }
}

function YU({
    content: A,
    usage: B
}) {
    return NjB({
        content: typeof A === "string" ? [{
            type: "text",
            text: A === "" ? rV : A
        }] : A,
        usage: B
    })
}

function VX({
    content: A
}) {
    return NjB({
        content: [{
            type: "text",
            text: A === "" ? rV : A
        }],
        isApiErrorMessage: !0
    })
}

function D2({
    content: A,
    isMeta: B,
    isVisibleInTranscriptOnly: Q,
    isCompactSummary: Z,
    toolUseResult: D
}) {
    return {
        type: "user",
        message: {
            role: "user",
            content: A || rV
        },
        isMeta: B,
        isVisibleInTranscriptOnly: Q,
        isCompactSummary: Z,
        uuid: cv(),
        timestamp: new Date().toISOString(),
        toolUseResult: D
    }
}

function $S({
    inputString: A,
    precedingInputBlocks: B
}) {
    if (B.length === 0) return A;
    return [...B, {
        text: A,
        type: "text"
    }]
}

function LjB({
    toolUse: A = !1,
    hardcodedMessage: B = void 0
}) {
    let Q;
    if (B !== void 0) Q = B;
    else if (A) Q = IU;
    else Q = E01;
    return D2({
        content: [{
            type: "text",
            text: Q
        }]
    })
}

function MjB({
    toolUseID: A,
    parentToolUseID: B,
    data: Q
}) {
    return {
        type: "progress",
        data: Q,
        toolUseID: A,
        parentToolUseID: B,
        uuid: cv(),
        timestamp: new Date().toISOString()
    }
}

function ub1(A) {
    return {
        type: "tool_result",
        content: lv,
        is_error: !0,
        tool_use_id: A
    }
}

function l4(A, B) {
    if (!A.trim() || !B.trim()) return null;
    let Q = B.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        Z = new RegExp(`<${Q}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${Q}>`, "gi"),
        D, G = 0,
        F = 0,
        I = new RegExp(`<${Q}(?:\\s+[^>]*?)?>`, "gi"),
        Y = new RegExp(`<\\/${Q}>`, "gi");
    while ((D = Z.exec(A)) !== null) {
        let W = D[1],
            J = A.slice(F, D.index);
        G = 0, I.lastIndex = 0;
        while (I.exec(J) !== null) G++;
        Y.lastIndex = 0;
        while (Y.exec(J) !== null) G--;
        if (G === 0 && W) return W;
        F = D.index + D[0].length
    }
    return null
}

function Ld(A) {
    if (A.type === "progress" || A.type === "attachment" || A.type === "system") return !0;
    if (typeof A.message.content === "string") return A.message.content.trim().length > 0;
    if (A.message.content.length === 0) return !1;
    if (A.message.content.length > 1) return !0;
    if (A.message.content[0].type !== "text") return !0;
    return A.message.content[0].text.trim().length > 0 && A.message.content[0].text !== rV && A.message.content[0].text !== IU
}

function IF(A) {
    let B = !1;
    return A.flatMap((Q) => {
        switch (Q.type) {
            case "assistant":
                return B = B || Q.message.content.length > 1, Q.message.content.map((Z) => {
                    let D = B ? cv() : Q.uuid;
                    return {
                        type: "assistant",
                        timestamp: new Date().toISOString(),
                        message: {
                            ...Q.message,
                            content: [Z]
                        },
                        isMeta: Q.isMeta,
                        requestId: Q.requestId,
                        uuid: D
                    }
                });
            case "attachment":
                return [Q];
            case "progress":
                return [Q];
            case "system":
                return [Q];
            case "user": {
                if (typeof Q.message.content === "string") {
                    let Z = B ? cv() : Q.uuid;
                    return [{
                        ...Q,
                        uuid: Z,
                        message: {
                            ...Q.message,
                            content: [{
                                type: "text",
                                text: Q.message.content
                            }]
                        }
                    }]
                }
                return B = B || Q.message.content.length > 1, Q.message.content.map((Z) => ({
                    ...D2({
                        content: [Z],
                        toolUseResult: Q.toolUseResult,
                        isMeta: Q.isMeta,
                        isVisibleInTranscriptOnly: Q.isVisibleInTranscriptOnly
                    }),
                    uuid: B ? cv() : Q.uuid
                }))
            }
        }
    })
}

function PW8(A) {
    return A.type === "assistant" && A.message.content.some((B) => B.type === "tool_use")
}

function KL0(A, B) {
    let Q = [],
        Z = [];
    for (let D of A) {
        if (PW8(D)) Z.push(D);
        if (D.type === "user" && Array.isArray(D.message.content) && D.message.content[0]?.type === "tool_result") {
            let G = D.message.content[0]?.tool_use_id,
                F = Z.find((I) => I.message.content[0]?.id === G);
            if (F) {
                Q.splice(Q.indexOf(F) + 1, 0, D);
                continue
            }
        } else Q.push(D)
    }
    for (let D of B) Q.push(D);
    return Q
}
var U01 = HL0((A) => Object.fromEntries(A.flatMap((B) => B.type === "user" && B.message.content[0]?.type === "tool_result" ? [
    [B.message.content[0].tool_use_id, B.message.content[0].is_error ?? !1]
] : [])));

function HL0(A) {
    return Tw1(A, (B) => {
        return B.map((Q) => Q.uuid).join(",")
    })
}

function RjB(A, B) {
    let Q = IF1(A);
    if (!Q) return new Set;
    let Z = B.find((F) => F.type === "assistant" && F.message.content.some((I) => I.type === "tool_use" && I.id === Q));
    if (!Z) return new Set;
    let D = Z.message.id,
        G = B.filter((F) => F.type === "assistant" && F.message.id === D);
    return new Set(G.flatMap((F) => F.message.content.filter((I) => I.type === "tool_use").map((I) => I.id)))
}

function zL0(A) {
    let B = U01(A),
        Q = SW8(A);
    return K3B(Q, new Set(Object.keys(B)))
}
var SW8 = HL0((A) => new Set(A.filter((B) => B.type === "assistant" && Array.isArray(B.message.content) && B.message.content[0]?.type === "tool_use").map((B) => B.message.content[0].id))),
    mb1 = HL0((A) => {
        let B = U01(A);
        return new Set(A.filter((Q) => Q.type === "assistant" && Array.isArray(Q.message.content) && Q.message.content[0]?.type === "tool_use" && (Q.message.content[0]?.id in B) && B[Q.message.content[0]?.id] === !0).map((Q) => Q.message.content[0].id))
    });

function AW(A) {
    let B = [];
    return A.filter((Q) => {
        if (Q.type === "progress" || Q.type === "system" || TW8(Q)) return !1;
        return !0
    }).forEach((Q) => {
        switch (Q.type) {
            case "user": {
                let Z = ZI(B);
                if (Z?.type === "user") {
                    B[B.indexOf(Z)] = yW8(Z, Q);
                    return
                }
                B.push(Q);
                return
            }
            case "assistant": {
                let Z = ZI(B);
                if (Z?.type === "assistant" && Z.message.id === Q.message.id) {
                    B[B.indexOf(Z)] = kW8(Z, Q);
                    return
                }
                B.push(Q);
                return
            }
            case "attachment": {
                let Z = vW8(Q.attachment),
                    D = ZI(B);
                if (D?.type === "user") {
                    B[B.indexOf(D)] = Z.reduce((G, F) => jW8(G, F), D);
                    return
                }
                B.push(...Z);
                return
            }
        }
    }), B
}

function jW8(A, B) {
    let Q = hb1(A.message.content),
        Z = hb1(B.message.content);
    return {
        ...A,
        message: {
            ...A.message,
            content: _W8(Q, Z)
        }
    }
}

function kW8(A, B) {
    return {
        ...A,
        message: {
            ...A.message,
            content: [...A.message.content, ...B.message.content]
        }
    }
}

function yW8(A, B) {
    let Q = hb1(A.message.content),
        Z = hb1(B.message.content);
    return {
        ...A,
        message: {
            ...A.message,
            content: [...Q, ...Z]
        }
    }
}

function hb1(A) {
    if (typeof A === "string") return [{
        type: "text",
        text: A
    }];
    return A
}

function _W8(A, B) {
    let Q = ZI(A);
    if (Q?.type === "tool_result" && typeof Q.content === "string" && B.every((Z) => Z.type === "text")) return [...A.slice(0, -1), {
        ...Q,
        content: [Q.content, ...B.map((Z) => Z.text)].map((Z) => Z.trim()).filter(Boolean).join(`

`)
    }];
    return [...A, ...B]
}

function rG1(A) {
    return A.map((B) => {
        switch (B.type) {
            case "tool_use":
                if (typeof B.input !== "string" && !QZ(B.input)) throw new Error("Tool use input must be a string or object");
                return {
                    ...B, input: typeof B.input === "string" ? T7(B.input) ?? {} : B.input
                };
            case "text":
                if (B.text.trim().length === 0) return X1("tengu_empty_model_response", {}), {
                    type: "text",
                    text: rV
                };
                return B;
            default:
                return B
        }
    })
}

function db1(A) {
    return fG1(A).trim() === "" || A.trim() === rV
}
var xW8 = ["commit_analysis", "context", "function_analysis", "pr_analysis"];

function fG1(A) {
    let B = new RegExp(`<(${xW8.join("|")})>.*?</\\1>
?`, "gs");
    return A.replace(B, "").trim()
}

function IF1(A) {
    switch (A.type) {
        case "attachment":
            return null;
        case "assistant":
            if (A.message.content[0]?.type !== "tool_use") return null;
            return A.message.content[0].id;
        case "user":
            if (A.message.content[0]?.type !== "tool_result") return null;
            return A.message.content[0].tool_use_id;
        case "progress":
            return A.toolUseID;
        case "system":
            return A.toolUseID ?? null
    }
}

function OjB(A) {
    let B = IF(A),
        Q = zL0(B);
    return B.filter((D, G) => {
        if (D.type === "assistant" && D.message.content[0]?.type === "tool_use" && Q.has(D.message.content[0].id)) return !1;
        return !0
    })
}

function cb1(A) {
    if (A.type !== "assistant") return null;
    if (Array.isArray(A.message.content)) return A.message.content.filter((B) => B.type === "text").map((B) => B.type === "text" ? B.text : "").join(`
`).trim() || null;
    return null
}

function TjB(A) {
    if (A.type !== "user") return null;
    let B = A.message.content;
    return YF1(B)
}

function YF1(A) {
    if (typeof A === "string") return A;
    if (Array.isArray(A)) return A.filter((B) => B.type === "text").map((B) => B.type === "text" ? B.text : "").join(`
`).trim() || null;
    return null
}

function PjB(A, B) {
    let Q = IF1(A);
    if (!Q) return [];
    return B.filter((Z) => Z.type === "progress" && Z.parentToolUseID === Q)
}

function WF1(A, B, Q, Z, D) {
    if (A.type !== "stream_event" && A.type !== "stream_request_start") {
        B(A);
        return
    }
    if (A.type === "stream_request_start") {
        Z("requesting");
        return
    }
    if (A.event.type === "message_stop") {
        Z("tool-use"), D(() => []);
        return
    }
    switch (A.event.type) {
        case "content_block_start":
            switch (A.event.content_block.type) {
                case "thinking":
                case "redacted_thinking":
                    Z("thinking");
                    return;
                case "text":
                    Z("responding");
                    return;
                case "tool_use": {
                    Z("tool-input");
                    let G = A.event.content_block,
                        F = A.event.index;
                    D((I) => [...I, {
                        index: F,
                        contentBlock: G,
                        unparsedToolInput: ""
                    }]);
                    return
                }
                case "server_tool_use":
                case "web_search_tool_result":
                case "code_execution_tool_result":
                case "mcp_tool_use":
                case "mcp_tool_result":
                case "container_upload":
                    Z("tool-input");
                    return
            }
            break;
        case "content_block_delta":
            switch (A.event.delta.type) {
                case "text_delta":
                    Q(A.event.delta.text);
                    return;
                case "input_json_delta": {
                    let G = A.event.delta.partial_json,
                        F = A.event.index;
                    Q(G), D((I) => {
                        let Y = I.find((W) => W.index === F);
                        if (!Y) return I;
                        return [...I.filter((W) => W !== Y), {
                            ...Y,
                            unparsedToolInput: Y.unparsedToolInput + G
                        }]
                    });
                    return
                }
                case "thinking_delta":
                    Q(A.event.delta.thinking);
                    return;
                case "signature_delta":
                    Q(A.event.delta.signature);
                    return;
                default:
                    return
            }
        default:
            Z("responding");
            return
    }
}

function CL0(A) {
    return `<system-reminder>
${A}
</system-reminder>`
}

function $G(A) {
    return A.map((B) => {
        if (typeof B.message.content === "string") return {
            ...B,
            message: {
                ...B.message,
                content: CL0(B.message.content)
            }
        };
        else if (Array.isArray(B.message.content)) {
            let Q = B.message.content.map((Z) => {
                if (Z.type === "text") return {
                    ...Z,
                    text: CL0(Z.text)
                };
                return Z
            });
            return {
                ...B,
                message: {
                    ...B.message,
                    content: Q
                }
            }
        }
        return B
    })
}