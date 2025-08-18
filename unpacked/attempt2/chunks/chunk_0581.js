/* chunk:581 bytes:[13480276, 13500202) size:19926 source:unpacked-cli.js */
async function* KSB(A, B, Q, Z, D, G) {
    if (!KB() && (await yw("tengu-off-switch", {
            activated: !1
        })).activated && Ca(G.model)) {
        X1("tengu_off_switch_query", {}), yield Nk1(new Error(be), G.model, G.isNonInteractiveSession);
        return
    }
    let [F, I] = await Promise.all([Promise.all(Z.map((k) => iPB(k, {
        getToolPermissionContext: G.getToolPermissionContext,
        tools: Z
    }))), VV(G.model)]);
    if (G.prependCLISysprompt) nPB(B), B = [mLB(), ...B];
    let Y = HSB(B),
        W = wd() && I.length > 0,
        J = G.temperature ?? NI8,
        X = AW(A);
    nN0({
        model: G.model,
        messagesLength: JSON.stringify([...Y, ...X, ...F, ...G.extraToolSchemas ?? []]).length,
        temperature: J,
        betas: W ? I : [],
        permissionMode: G.getToolPermissionContext().mode,
        promptCategory: G.promptCategory
    });
    let V = Date.now(),
        C = Date.now(),
        K = 0,
        H = void 0,
        z = (k) => {
            let c = uLB(),
                u = k.maxTokensOverride ? Math.min(Q, k.maxTokensOverride - 1) : Q,
                a = eN0(DZ() === "bedrock" ? dt0(k.model) : []),
                l = Q > 0 ? {
                    budget_tokens: u,
                    type: "enabled"
                } : void 0,
                y = k?.maxTokensOverride || G.maxOutputTokensOverride || Math.max(Q + 1, AL0(G.model));
            return {
                model: VSB(G.model),
                messages: TI8(X),
                temperature: J,
                system: Y,
                tools: [...F, ...G.extraToolSchemas ?? []],
                tool_choice: G.toolChoice,
                ...W ? {
                    betas: I
                } : {},
                metadata: aG1(),
                max_tokens: y,
                thinking: l,
                ...c && W && I.includes(ht0) ? {
                    context_management: c
                } : {},
                ...a
            }
        },
        $ = [],
        L = 0,
        N = void 0,
        R = [],
        O = Ud,
        P = null,
        j = !1,
        f = 0;
    try {
        H = await sG1(() => y$({
            maxRetries: 0,
            model: G.model,
            isNonInteractiveSession: G.isNonInteractiveSession
        }), async (k, c, u) => {
            K = c, C = Date.now();
            let a = z(u);
            return f = a.max_tokens, k.beta.messages.stream(a, {
                signal: D
            })
        }, {
            showErrors: !G.isNonInteractiveSession,
            model: G.model,
            fallbackModel: G.fallbackModel,
            maxThinkingTokens: Q
        }), $.length = 0, L = 0, N = void 0, R.length = 0, O = Ud;
        try {
            let k = !0;
            for await (let u of H) {
                if (k) n1("Stream started - received first chunk"), k = !1;
                switch (u.type) {
                    case "message_start":
                        N = u.message, L = Date.now() - C, O = $d(O, u.message.usage);
                        break;
                    case "content_block_start":
                        switch (u.content_block.type) {
                            case "tool_use":
                                R[u.index] = {
                                    ...u.content_block,
                                    input: ""
                                };
                                break;
                            case "server_tool_use":
                                R[u.index] = {
                                    ...u.content_block,
                                    input: ""
                                };
                                break;
                            case "text":
                                R[u.index] = {
                                    ...u.content_block,
                                    text: ""
                                };
                                break;
                            case "thinking":
                                R[u.index] = {
                                    ...u.content_block,
                                    thinking: ""
                                };
                                break;
                            default:
                                R[u.index] = {
                                    ...u.content_block
                                };
                                break
                        }
                        break;
                    case "content_block_delta": {
                        let a = R[u.index];
                        if (!a) throw X1("tengu_streaming_error", {
                            error_type: "content_block_not_found_delta",
                            part_type: u.type,
                            part_index: u.index
                        }), new RangeError("Content block not found");
                        switch (u.delta.type) {
                            case "citations_delta":
                                break;
                            case "input_json_delta":
                                if (a.type !== "tool_use" && a.type !== "server_tool_use") throw X1("tengu_streaming_error", {
                                    error_type: "content_block_type_mismatch_input_json",
                                    expected_type: "tool_use",
                                    actual_type: a.type
                                }), new Error("Content block is not a input_json block");
                                if (typeof a.input !== "string") throw X1("tengu_streaming_error", {
                                    error_type: "content_block_input_not_string",
                                    input_type: typeof a.input
                                }), new Error("Content block input is not a string");
                                a.input += u.delta.partial_json;
                                break;
                            case "text_delta":
                                if (a.type !== "text") throw X1("tengu_streaming_error", {
                                    error_type: "content_block_type_mismatch_text",
                                    expected_type: "text",
                                    actual_type: a.type
                                }), new Error("Content block is not a text block");
                                a.text += u.delta.text;
                                break;
                            case "signature_delta":
                                if (a.type !== "thinking") throw X1("tengu_streaming_error", {
                                    error_type: "content_block_type_mismatch_thinking_signature",
                                    expected_type: "thinking",
                                    actual_type: a.type
                                }), new Error("Content block is not a thinking block");
                                a.signature = u.delta.signature;
                                break;
                            case "thinking_delta":
                                if (a.type !== "thinking") throw X1("tengu_streaming_error", {
                                    error_type: "content_block_type_mismatch_thinking_delta",
                                    expected_type: "thinking",
                                    actual_type: a.type
                                }), new Error("Content block is not a thinking block");
                                a.thinking += u.delta.thinking;
                                break
                        }
                        break
                    }
                    case "content_block_stop": {
                        let a = R[u.index];
                        if (!a) throw X1("tengu_streaming_error", {
                            error_type: "content_block_not_found_stop",
                            part_type: u.type,
                            part_index: u.index
                        }), new RangeError("Content block not found");
                        if (!N) throw X1("tengu_streaming_error", {
                            error_type: "partial_message_not_found",
                            part_type: u.type
                        }), new Error("Message not found");
                        let l = fN0({
                            message: {
                                ...N,
                                content: rG1(tN0([a]))
                            },
                            requestId: H.request_id ?? void 0,
                            type: "assistant",
                            uuid: oN0(),
                            timestamp: new Date().toISOString()
                        }, Z);
                        $.push(l), yield l;
                        break
                    }
                    case "message_delta": {
                        O = $d(O, u.usage), P = u.delta.stop_reason;
                        let a = DH0(u.delta.stop_reason);
                        if (a) yield a;
                        if (P === "max_tokens") X1("tengu_max_tokens_reached", {
                            max_tokens: f
                        }), yield VX({
                            content: `${CJ}: Claude's response exceeded the ${f} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`
                        });
                        break
                    }
                    case "message_stop":
                        break
                }
                yield {
                    type: "stream_event",
                    event: u
                }
            }
            let c = (await H.withResponse()).response;
            zSB(c), uN0(c.headers)
        } catch (k) {
            if (k instanceof xF) throw n1(`Streaming aborted: ${k instanceof Error?k.message:String(k)}`), k;
            if (SA(`Error streaming, falling back to non-streaming mode: ${k instanceof Error?k.message:String(k)}`), j = !0, G.onStreamingFallback) G.onStreamingFallback();
            let c = await sG1(() => y$({
                    maxRetries: 0,
                    model: G.model,
                    isNonInteractiveSession: G.isNonInteractiveSession
                }), async (a, l, y) => {
                    K = l;
                    let t = z(y);
                    return f = t.max_tokens, await a.beta.messages.create({
                        ...t,
                        model: VSB(t.model),
                        max_tokens: Math.min(t.max_tokens, SI8)
                    })
                }, {
                    showErrors: !G.isNonInteractiveSession,
                    model: G.model,
                    maxThinkingTokens: Q
                }),
                u = fN0({
                    message: {
                        ...c,
                        content: rG1(tN0(c.content))
                    },
                    requestId: H.request_id ?? void 0,
                    type: "assistant",
                    uuid: oN0(),
                    timestamp: new Date().toISOString()
                }, Z);
            $.push(u), yield u
        }
    } catch (k) {
        SA(`Error in non-streaming fallback: ${k instanceof Error?k.message:String(k)}`);
        let c = k,
            u = G.model;
        if (k instanceof uv) c = k.originalError, u = k.retryContext.model;
        if (c instanceof D6) mN0(c);
        if (aN0({
                error: c,
                model: u,
                messageCount: X.length,
                messageTokens: UJ(X),
                durationMs: Date.now() - C,
                durationMsIncludingRetries: Date.now() - V,
                attempt: K,
                requestId: H?.request_id,
                didFallBackToNonStreaming: j,
                promptCategory: G.promptCategory
            }), c instanceof xF) return;
        yield Nk1(c, u, G.isNonInteractiveSession);
        return
    }
    sN0({
        model: $[0]?.message.model ?? N?.model ?? G.model,
        preNormalizedModel: G.model,
        usage: O,
        start: C,
        startIncludingRetries: V,
        attempt: K,
        messageCount: X.length,
        messageTokens: UJ(X),
        requestId: H?.request_id ?? null,
        stopReason: P,
        ttftMs: L,
        didFallBackToNonStreaming: j,
        promptCategory: G.promptCategory
    })
}

function $d(A, B) {
    return {
        input_tokens: A.input_tokens + (B.input_tokens ?? 0),
        cache_creation_input_tokens: A.cache_creation_input_tokens + (B.cache_creation_input_tokens ?? 0),
        cache_read_input_tokens: A.cache_read_input_tokens + (B.cache_read_input_tokens ?? 0),
        output_tokens: A.output_tokens + (B.output_tokens ?? 0),
        server_tool_use: {
            web_search_requests: A.server_tool_use.web_search_requests + (B.server_tool_use?.web_search_requests ?? 0)
        },
        service_tier: A.service_tier
    }
}

function TI8(A) {
    return A.map((B, Q) => {
        return B.type === "user" ? RI8(B, Q > A.length - 3) : OI8(B, Q > A.length - 3)
    })
}
async function PI8({
    systemPrompt: A,
    userPrompt: B,
    assistantPrompt: Q,
    signal: Z,
    isNonInteractiveSession: D,
    temperature: G = 0,
    enablePromptCaching: F,
    promptCategory: I
}) {
    let Y = WT(),
        W = [{
            role: "user",
            content: B
        }, ...Q ? [{
            role: "assistant",
            content: Q
        }] : []],
        J = HSB(A, F && wd()),
        X = F ? [...J, ...W] : [{
            systemPrompt: A
        }, ...W];
    nN0({
        model: Y,
        messagesLength: JSON.stringify(X).length,
        temperature: G,
        promptCategory: I
    });
    let V = 0,
        C = Date.now(),
        K = Date.now(),
        H, z, $ = VV(Y);
    try {
        if (H = await sG1(() => y$({
                maxRetries: 0,
                model: Y,
                isNonInteractiveSession: D,
                isSmallFastModel: !0
            }), async (O, P, j) => {
                return V = P, C = Date.now(), z = O.beta.messages.stream({
                    model: j.model,
                    max_tokens: 512,
                    messages: W,
                    system: J,
                    temperature: G,
                    metadata: aG1(),
                    stream: !0,
                    ...$.length > 0 ? {
                        betas: $
                    } : {},
                    ...eN0()
                }, {
                    signal: Z
                }), await MI8(z)
            }, {
                showErrors: !1,
                model: Y
            }), z) {
            let O = (await z.withResponse()).response;
            zSB(O)
        }
    } catch (O) {
        let P = O,
            j = Y;
        if (O instanceof uv) P = O.originalError, j = O.retryContext.model;
        return aN0({
            error: P,
            model: j,
            messageCount: Q ? 2 : 1,
            durationMs: Date.now() - C,
            durationMsIncludingRetries: Date.now() - K,
            attempt: V,
            requestId: z?.request_id,
            promptCategory: I
        }), Nk1(P, j, D)
    }
    let L = DH0(H.stopReason);
    if (L) return L;
    let R = {
        message: F ? {
            ...H.message,
            content: rG1(H.message.content)
        } : {
            ...H.message,
            content: rG1(H.message.content),
            usage: {
                ...H.usage,
                cache_read_input_tokens: 0,
                cache_creation_input_tokens: 0
            }
        },
        uuid: oN0(),
        requestId: z?.request_id ?? void 0,
        type: "assistant",
        timestamp: new Date().toISOString()
    };
    return sN0({
        model: Y,
        preNormalizedModel: Y,
        usage: H.usage,
        start: C,
        startIncludingRetries: K,
        attempt: V,
        messageCount: Q ? 2 : 1,
        messageTokens: UJ([R]),
        requestId: z?.request_id ?? null,
        stopReason: H.stopReason,
        ttftMs: H.ttftMs,
        didFallBackToNonStreaming: !1,
        promptCategory: I
    }), R
}

function HSB(A, B = wd()) {
    return vN0(A).map((Q) => ({
        type: "text",
        text: Q,
        ...B ? {
            cache_control: {
                type: "ephemeral"
            }
        } : {}
    }))
}
async function jI({
    systemPrompt: A = [],
    userPrompt: B,
    assistantPrompt: Q,
    enablePromptCaching: Z = !1,
    signal: D,
    isNonInteractiveSession: G,
    temperature: F = 0,
    promptCategory: I
}) {
    return (await dN0([D2({
        content: A.map((W) => ({
            type: "text",
            text: W
        }))
    }), D2({
        content: B
    })], async () => {
        return [await PI8({
            systemPrompt: A,
            userPrompt: B,
            assistantPrompt: Q,
            signal: D,
            isNonInteractiveSession: G,
            temperature: F,
            enablePromptCaching: Z,
            promptCategory: I
        })]
    }))[0]
}
var SI8 = 21333;

function AL0(A) {
    if (A.includes("3-5")) return 8192;
    if (A.includes("haiku")) return 8192;
    let B = process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS;
    if (B) {
        let Q = parseInt(B, 10);
        if (!isNaN(Q) && Q > 0 && Q <= 32000) return Q;
        else throw new Error(`Invalid env var CLAUDE_CODE_MAX_OUTPUT_TOKENS: ${B}`)
    }
    return 32000
}

function zSB(A) {
    try {
        let B = A.headers.get("anthropic-ratelimit-unified-fallback-percentage");
        if (B !== null) {
            let Q = parseFloat(B);
            if (!isNaN(Q) && Q > 0 && Q <= 1) {
                if (H0().fallbackAvailableWarningThreshold !== Q) gA({
                    ...H0(),
                    fallbackAvailableWarningThreshold: Q
                })
            }
        }
    } catch {}
}

function BL0(A) {
    if (IQ(process.env.CLAUDE_CODE_DISABLE_TERMINAL_TITLE)) return;
    if (process.platform === "win32") process.title = A ? `✳ ${A}` : A;
    else process.stdout.write(`\x1B]0;${A?`✳ ${A}`:""}\x07`)
}
async function USB(A) {
    if (A.startsWith("<local-command-stdout>")) return;
    try {
        let Q = (await jI({
                systemPrompt: ["Analyze if this message indicates a new conversation topic. If it does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."],
                userPrompt: A,
                enablePromptCaching: !1,
                isNonInteractiveSession: !1,
                promptCategory: "terminal_title"
            })).message.content.filter((D) => D.type === "text").map((D) => D.text).join(""),
            Z = T7(Q);
        if (Z && typeof Z === "object" && "isNewTopic" in Z && "title" in Z) {
            if (Z.isNewTopic && Z.title) BL0(Z.title)
        }
    } catch (B) {
        R1(B)
    }
}

function V7() {
    return new Promise((A) => {
        process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
            A()
        })
    })
}
var ESB = 3,
    jI8 = 9;

function kI8(A, B) {
    let Q = A.split(`
`),
        Z = [];
    for (let D of Q)
        if (D.length <= B) Z.push(D.trimEnd());
        else
            for (let G = 0; G < D.length; G += B) Z.push(D.slice(G, G + B).trimEnd());
    return {
        aboveTheFold: Z.slice(0, ESB).join(`
`).trimEnd(),
        remainingLines: Z.slice(ESB).length
    }
}

function wSB(A, B) {
    let Q = A.trimEnd();
    if (!Q) return "";
    let {
        aboveTheFold: Z,
        remainingLines: D
    } = kI8(Q, Math.max(B - jI8, 10));
    return [Z, D > 0 ? e1.dim(`… +${D} ${D===1?"line":"lines"} ${mTB()}`) : ""].filter(Boolean).join(`
`)
}