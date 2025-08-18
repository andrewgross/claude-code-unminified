/* chunk:580 bytes:[13461333, 13480275) size:18942 source:unpacked-cli.js */
function II8() {
    return lN0.useEffect(() => {
        qb1 = !0
    }, []), mF.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1,
        paddingTop: 1
    }, mF.createElement(T, {
        color: "text"
    }, "Enrolled in", " ", mF.createElement(C3, {
        url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
    }, "Development Partner Program")))
}

function DSB() {
    return H0().initialDataSharingMessageSeen ? mF.createElement(II8, null) : mF.createElement(FI8, null)
}

function YI8(A, B) {
    return {
        inputTokens: A.inputTokens + B.inputTokens,
        outputTokens: A.outputTokens + B.outputTokens,
        promptCacheWriteTokens: A.promptCacheWriteTokens + B.promptCacheWriteTokens,
        promptCacheReadTokens: A.promptCacheReadTokens + B.promptCacheReadTokens,
        webSearchRequests: A.webSearchRequests + B.webSearchRequests
    }
}
var Lb1 = {
        inputTokens: 3,
        outputTokens: 15,
        promptCacheWriteTokens: 3.75,
        promptCacheReadTokens: 0.3,
        webSearchRequests: 0.01
    },
    GSB = {
        inputTokens: 15,
        outputTokens: 75,
        promptCacheWriteTokens: 18.75,
        promptCacheReadTokens: 1.5,
        webSearchRequests: 0.01
    },
    FSB = {
        [kw(Y91.firstParty)]: {
            inputTokens: 0.8,
            outputTokens: 4,
            promptCacheWriteTokens: 1,
            promptCacheReadTokens: 0.08,
            webSearchRequests: 0.01
        },
        [kw(Ch.firstParty)]: Lb1,
        [kw(Vh.firstParty)]: Lb1,
        [kw(jO.firstParty)]: Lb1,
        [kw(Kh.firstParty)]: GSB,
        [kw(Hh.firstParty)]: GSB,
        ...{}
    },
    WI8 = {
        inputTokens: -0.9,
        outputTokens: 0,
        promptCacheReadTokens: -0.09,
        promptCacheWriteTokens: -1.125,
        webSearchRequests: 0
    };

function ISB(A, B) {
    return B.input_tokens / 1e6 * A.inputTokens + B.output_tokens / 1e6 * A.outputTokens + (B.cache_read_input_tokens ?? 0) / 1e6 * A.promptCacheReadTokens + (B.cache_creation_input_tokens ?? 0) / 1e6 * A.promptCacheWriteTokens + (B.server_tool_use?.web_search_requests ?? 0) * A.webSearchRequests
}

function JI8(A) {
    return A.input_tokens + (A.cache_read_input_tokens ?? 0) + (A.cache_creation_input_tokens ?? 0)
}

function XI8(A, B) {
    let Q = kw(A),
        Z = FSB[Q];
    if (Z === Lb1 && JI8(B) > 200000) return {
        inputTokens: 6,
        outputTokens: 22.5,
        promptCacheWriteTokens: 7.5,
        promptCacheReadTokens: 0.6,
        webSearchRequests: 0.01
    };
    if (!Z) return X1("tengu_unknown_model_cost", {
        model: A,
        shortName: Q
    }), Um1(), FSB[kw(U_A)];
    return Z
}

function YSB(A, B) {
    let Q = XI8(A, B),
        Z = ISB(Q, B),
        D = Z;
    if (Ed() && ZSB(A)) {
        let G = YI8(Q, WI8);
        X1("tengu_model_cost_discount", {
            model: A
        }), D = ISB(G, B)
    }
    return {
        stickerCostUSD: Z,
        finalCostUSD: D
    }
}

function VI8() {
    return Boolean(process.env.OTEL_LOG_USER_PROMPTS)
}

function pN0(A) {
    return VI8() ? A : "<REDACTED>"
}
async function d$(A, B = {}) {
    let Q = dk0();
    if (!Q) return;
    let Z = {
        ...bS1(),
        "event.name": A,
        "event.timestamp": new Date().toISOString()
    };
    for (let [D, G] of Object.entries(B))
        if (G !== void 0) Z[D] = G;
    Q.emit({
        body: `claude_code.${A}`,
        attributes: Z
    })
}

function iN0() {
    return {
        ...process.env.ANTHROPIC_BASE_URL ? {
            baseUrl: process.env.ANTHROPIC_BASE_URL
        } : {},
        ...process.env.ANTHROPIC_MODEL ? {
            envModel: process.env.ANTHROPIC_MODEL
        } : {},
        ...process.env.ANTHROPIC_SMALL_FAST_MODEL ? {
            envSmallFastModel: process.env.ANTHROPIC_SMALL_FAST_MODEL
        } : {}
    }
}

function nN0({
    model: A,
    messagesLength: B,
    temperature: Q,
    betas: Z,
    permissionMode: D,
    promptCategory: G
}) {
    X1("tengu_api_query", {
        model: A,
        messagesLength: B,
        temperature: Q,
        provider: HN(),
        ...Z?.length ? {
            betas: Z.join(",")
        } : {},
        permissionMode: D,
        ...G ? {
            promptCategory: G
        } : {},
        ...iN0()
    })
}

function aN0({
    error: A,
    model: B,
    messageCount: Q,
    messageTokens: Z,
    durationMs: D,
    durationMsIncludingRetries: G,
    attempt: F,
    requestId: I,
    didFallBackToNonStreaming: Y,
    promptCategory: W
}) {
    let J = A instanceof Error ? A.message : String(A),
        X = A instanceof D6 ? String(A.status) : void 0;
    R1(A), X1("tengu_api_error", {
        model: B,
        error: J,
        status: X,
        messageCount: Q,
        messageTokens: Z,
        durationMs: D,
        durationMsIncludingRetries: G,
        attempt: F,
        provider: HN(),
        requestId: I || void 0,
        didFallBackToNonStreaming: Y,
        ...W ? {
            promptCategory: W
        } : {},
        ...iN0()
    }), d$("api_error", {
        model: B,
        error: J,
        status_code: String(X),
        duration_ms: String(D),
        attempt: String(F)
    })
}

function CI8({
    model: A,
    preNormalizedModel: B,
    messageCount: Q,
    messageTokens: Z,
    usage: D,
    durationMs: G,
    durationMsIncludingRetries: F,
    attempt: I,
    ttftMs: Y,
    requestId: W,
    stopReason: J,
    stickerCostUSD: X,
    costUSD: V,
    didFallBackToNonStreaming: C,
    promptCategory: K
}) {
    let H = Nl(),
        z = process.argv.includes("-p") || process.argv.includes("--print");
    X1("tengu_api_success", {
        model: A,
        ...B !== A ? {
            preNormalizedModel: B
        } : {},
        messageCount: Q,
        messageTokens: Z,
        inputTokens: D.input_tokens,
        outputTokens: D.output_tokens,
        cachedInputTokens: D.cache_read_input_tokens ?? 0,
        uncachedInputTokens: D.cache_creation_input_tokens ?? 0,
        durationMs: G,
        durationMsIncludingRetries: F,
        attempt: I,
        ttftMs: Y ?? void 0,
        provider: HN(),
        requestId: W ?? void 0,
        stop_reason: J ?? void 0,
        stickerCostUSD: X,
        costUSD: V,
        didFallBackToNonStreaming: C,
        isNonInteractiveSession: H,
        print: z,
        isTTY: process.stdout.isTTY ?? !1,
        ...K ? {
            promptCategory: K
        } : {},
        ...iN0()
    })
}

function KI8(A, B, Q, Z) {
    let {
        stickerCostUSD: D,
        finalCostUSD: G
    } = YSB(A, B), F = Date.now() - Q, I = Date.now() - Z;
    return kPB(G, I, F, B, A), {
        stickerCostUSD: D,
        costUSD: G,
        durationMs: F,
        durationMsIncludingRetries: I
    }
}
var Ud = {
    input_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 0,
    server_tool_use: {
        web_search_requests: 0
    },
    service_tier: "standard"
};

function sN0({
    model: A,
    preNormalizedModel: B,
    start: Q,
    startIncludingRetries: Z,
    ttftMs: D,
    usage: G,
    attempt: F,
    messageCount: I,
    messageTokens: Y,
    requestId: W,
    stopReason: J,
    didFallBackToNonStreaming: X,
    promptCategory: V
}) {
    let {
        stickerCostUSD: C,
        costUSD: K,
        durationMs: H,
        durationMsIncludingRetries: z
    } = KI8(B, G, Q, Z);
    CI8({
        model: A,
        preNormalizedModel: B,
        messageCount: I,
        messageTokens: Y,
        usage: G,
        durationMs: H,
        durationMsIncludingRetries: z,
        attempt: F,
        ttftMs: D,
        requestId: W,
        stopReason: J,
        stickerCostUSD: C,
        costUSD: K,
        didFallBackToNonStreaming: X,
        promptCategory: V
    }), d$("api_request", {
        model: A,
        input_tokens: String(G.input_tokens),
        output_tokens: String(G.output_tokens),
        cache_read_tokens: String(G.cache_read_input_tokens),
        cache_creation_tokens: String(G.cache_creation_input_tokens),
        cost_usd: String(K),
        duration_ms: String(H)
    })
}

function WSB(A) {
    let B = A.message;
    if (B.includes("<!DOCTYPE html") || B.includes("<html")) {
        let Q = B.match(/<title>([^<]+)<\/title>/);
        if (Q && Q[1]) return Q[1].trim();
        return ""
    }
    return A.message
}
var HI8 = 10,
    rN0 = 3000,
    zI8 = 3,
    EI8 = 500;
class uv extends Error {
    originalError;
    retryContext;
    constructor(A, B) {
        let Q = A instanceof Error ? A.message : String(A);
        super(Q);
        this.originalError = A;
        this.retryContext = B;
        if (this.name = "RetryError", A instanceof Error && A.stack) this.stack = A.stack
    }
}
class Mb1 extends Error {
    originalModel;
    fallbackModel;
    constructor(A, B) {
        super(`Model fallback triggered: ${A} -> ${B}`);
        this.originalModel = A;
        this.fallbackModel = B;
        this.name = "FallbackTriggeredError"
    }
}
async function sG1(A, B, Q) {
    let Z = Q.maxRetries ?? (process.env.CLAUDE_CODE_MAX_RETRIES ? parseInt(process.env.CLAUDE_CODE_MAX_RETRIES, 10) : HI8),
        D, G = {
            model: Q.model,
            maxThinkingTokens: Q.maxThinkingTokens
        },
        F = 0,
        I = null;
    for (let Y = 1; Y <= Z + 1; Y++) try {
        if (I === null || D instanceof D6 && D.status === 401 || XSB(D)) I = await A();
        return await B(I, Y, G)
    } catch (W) {
        if (D = W, wI8(W) && !KB() && Ca(Q.model)) {
            if (F++, F >= zI8) {
                if (Q.fallbackModel) throw X1("tengu_api_opus_fallback_triggered", {
                    original_model: Q.model,
                    fallback_model: Q.fallbackModel,
                    provider: HN()
                }), new Mb1(Q.model, Q.fallbackModel);
                else if (!process.env.IS_SANDBOX) throw X1("tengu_api_custom_529_overloaded_error", {}), new uv(new Error(ZH0), G)
            }
        }
        let J = $I8(W);
        if (Y > Z || (!(W instanceof D6) || !qI8(W)) && !J) throw new uv(W, G);
        if (W instanceof D6) {
            let C = JSB(W);
            if (C) {
                let {
                    inputTokens: K,
                    contextLimit: H
                } = C, z = 1000, $ = Math.max(0, H - K - 1000);
                if ($ < rN0) throw R1(new Error(`availableContext ${$} is less than FLOOR_OUTPUT_TOKENS ${rN0}`)), W;
                let L = (G.maxThinkingTokens || 0) + 1,
                    N = Math.max(rN0, $, L);
                G.maxTokensOverride = N, X1("tengu_max_tokens_context_overflow_adjustment", {
                    inputTokens: K,
                    contextLimit: H,
                    adjustedMaxTokens: N,
                    attempt: Y
                });
                continue
            }
        }
        let X = (W.headers?.["retry-after"] || W.headers?.get?.("retry-after")) ?? null,
            V = UI8(Y, X);
        if (Q.showErrors && W instanceof D6) {
            let C = WSB(W),
                K = C !== W.message && C.length > 0 ? C : W.message;
            console.error(`  ⎿  ${e1.red(`API ${W.name} (${K}) · Retrying in ${Math.round(V/1000)} seconds… (attempt ${Y}/${Z})`)}`);
            let H = W.cause;
            if (H instanceof Error) console.error(`    ⎿  ${e1.red(`${H.name} (${H.message})${"code"in H?` (${H.code})`:""}`)}`)
        }
        X1("tengu_api_retry", {
            attempt: Y,
            delayMs: V,
            error: W.message,
            status: W.status,
            provider: HN()
        }), await new Promise((C) => setTimeout(C, V))
    }
    throw new uv(D, G)
}

function UI8(A, B) {
    if (B) {
        let D = parseInt(B, 10);
        if (!isNaN(D)) return D * 1000
    }
    let Q = Math.min(EI8 * Math.pow(2, A - 1), 32000),
        Z = Math.random() * 0.25 * Q;
    return Q + Z
}

function JSB(A) {
    if (A.status !== 400 || !A.message) return;
    if (!A.message.includes("input length and `max_tokens` exceed context limit")) return;
    let B = /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/,
        Q = A.message.match(B);
    if (!Q || Q.length !== 4) return;
    if (!Q[1] || !Q[2] || !Q[3]) {
        R1(new Error("Unable to parse max_tokens from max_tokens exceed context limit error message"));
        return
    }
    let Z = parseInt(Q[1], 10),
        D = parseInt(Q[2], 10),
        G = parseInt(Q[3], 10);
    if (isNaN(Z) || isNaN(D) || isNaN(G)) return;
    return {
        inputTokens: Z,
        maxTokens: D,
        contextLimit: G
    }
}

function wI8(A) {
    if (!(A instanceof D6)) return !1;
    return A.status === 529 || (A.message?.includes('"type":"overloaded_error"') ?? !1)
}

function XSB(A) {
    if (process.env.CLAUDE_CODE_USE_BEDROCK) {
        if (vq2(A) || A instanceof D6 && A.status === 403) return !0
    }
    return !1
}

function $I8(A) {
    if (XSB(A)) return mq2(), !0;
    return !1
}

function qI8(A) {
    if (A.message?.includes('"type":"overloaded_error"')) return !0;
    if (JSB(A)) return !0;
    let B = A.headers?.get("x-should-retry");
    if (B === "true" && !KB()) return !0;
    if (B === "false") return !1;
    if (A instanceof pP) return !0;
    if (!A.status) return !1;
    if (A.status === 408) return !0;
    if (A.status === 409) return !0;
    if (A.status === 429) return !KB();
    if (A.status === 401) return uq2(), !0;
    if (A.status && A.status >= 500) return !0;
    return !1
}

function eN0(A) {
    let B = {},
        Q = process.env.CLAUDE_CODE_EXTRA_BODY,
        Z = {};
    if (Q) try {
        let G = T7(Q);
        if (G && typeof G === "object" && !Array.isArray(G)) Z = G;
        else SA(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${Q}`)
    } catch (G) {
        SA(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${G instanceof Error?G.message:String(G)}`)
    }
    let D = {
        ...B,
        ...Z
    };
    if (A && A.length > 0)
        if (D.anthropic_beta && Array.isArray(D.anthropic_beta)) {
            let G = D.anthropic_beta,
                F = A.filter((I) => !G.includes(I));
            D.anthropic_beta = [...G, ...F]
        } else D.anthropic_beta = A;
    return D
}

function wd() {
    return !IQ(process.env.DISABLE_PROMPT_CACHING)
}

function VSB(A) {
    return A.replace(/\[1m\]/gi, "")
}
var NI8 = 1;

function aG1() {
    let A = jo(),
        B = H0().oauthAccount?.accountUuid ?? "",
        Q = CB();
    return {
        user_id: `user_${A}_account_${B}_session_${Q}`
    }
}
async function CSB(A, B) {
    if (B) return !0;
    try {
        let Q = WT(),
            Z = VV(Q);
        return await sG1(() => y$({
            apiKey: A,
            maxRetries: 3,
            model: Q,
            isNonInteractiveSession: B
        }), async (D) => {
            let G = [{
                role: "user",
                content: "test"
            }];
            return await D.beta.messages.create({
                model: Q,
                max_tokens: 1,
                messages: G,
                temperature: 0,
                ...Z.length > 0 ? {
                    betas: Z
                } : {},
                metadata: aG1(),
                ...eN0()
            }), !0
        }, {
            maxRetries: 2,
            showErrors: !1,
            model: Q
        }), !0
    } catch (Q) {
        let Z = Q;
        if (Q instanceof uv) Z = Q.originalError;
        if (R1(Z), Z instanceof Error && Z.message.includes('{"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}')) return !1;
        throw Z
    }
}

function tN0(A) {
    return A.filter((B) => {
        if ("type" in B) switch (B.type) {
            case "code_execution_tool_result":
            case "mcp_tool_use":
            case "mcp_tool_result":
            case "container_upload":
                return !1;
            case "server_tool_use":
                return B.name === "web_search";
            default:
                return !0
        }
        return !0
    })
}

function LI8(A) {
    return {
        ...A,
        content: tN0(A.content)
    }
}
async function MI8(A) {
    let B = Date.now(),
        Q = null,
        Z = null,
        D = Ud;
    for await (let F of A) switch (F.type) {
        case "message_start":
            Z = Date.now() - B, D = $d(D, F.message.usage);
            break;
        case "message_delta":
            D = $d(D, F.usage), Q = F.delta.stop_reason;
            break;
        default:
            break
    }
    let G = await A.finalMessage();
    return {
        message: LI8(G),
        stopReason: Q,
        ttftMs: Z,
        usage: D
    }
}

function RI8(A, B = !1) {
    if (B)
        if (typeof A.message.content === "string") return {
            role: "user",
            content: [{
                type: "text",
                text: A.message.content,
                ...wd() ? {
                    cache_control: {
                        type: "ephemeral"
                    }
                } : {}
            }]
        };
        else return {
            role: "user",
            content: A.message.content.map((Q, Z) => ({
                ...Q,
                ...Z === A.message.content.length - 1 ? wd() ? {
                    cache_control: {
                        type: "ephemeral"
                    }
                } : {} : {}
            }))
        };
    return {
        role: "user",
        content: A.message.content
    }
}

function OI8(A, B = !1) {
    if (B)
        if (typeof A.message.content === "string") return {
            role: "assistant",
            content: [{
                type: "text",
                text: A.message.content,
                ...wd() ? {
                    cache_control: {
                        type: "ephemeral"
                    }
                } : {}
            }]
        };
        else return {
            role: "assistant",
            content: A.message.content.map((Q, Z) => ({
                ...Q,
                ...Z === A.message.content.length - 1 && Q.type !== "thinking" && Q.type !== "redacted_thinking" ? wd() ? {
                    cache_control: {
                        type: "ephemeral"
                    }
                } : {} : {}
            }))
        };
    return {
        role: "assistant",
        content: A.message.content
    }
}
async function Rb1(A, B, Q, Z, D, G) {
    for await (let F of cN0(A, async function*() {
        yield* KSB(A, B, Q, Z, D, G)
    })) if (F.type === "assistant") return F;
    throw new Error("No assistant message found")
}
async function* V01(A, B, Q, Z, D, G) {
    return yield* cN0(A, async function*() {
        yield* KSB(A, B, Q, Z, D, G)
    })
}