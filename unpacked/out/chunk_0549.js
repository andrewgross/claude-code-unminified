/* chunk:549 bytes:[12861320, 12881355) size:20035 source:unpacked-cli.js */
class H3 {
    constructor({
        baseURL: A = rZ1("ANTHROPIC_BASE_URL"),
        apiKey: B = rZ1("ANTHROPIC_API_KEY") ?? null,
        authToken: Q = rZ1("ANTHROPIC_AUTH_TOKEN") ?? null,
        ...Z
    } = {}) {
        tK0.add(this), Uk1.set(this, void 0);
        let D = {
            apiKey: B,
            authToken: Q,
            ...Z,
            baseURL: A || "https://api.anthropic.com"
        };
        if (!D.dangerouslyAllowBrowser && f5B()) throw new P9(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
        this.baseURL = D.baseURL, this.timeout = D.timeout ?? eK0.DEFAULT_TIMEOUT, this.logger = D.logger ?? console;
        let G = "warn";
        this.logLevel = G, this.logLevel = bK0(D.logLevel, "ClientOptions.logLevel", this) ?? bK0(rZ1("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? G, this.fetchOptions = D.fetchOptions, this.maxRetries = D.maxRetries ?? 2, this.fetch = D.fetch ?? g5B(), $Q(this, Uk1, m5B, "f"), this._options = D, this.apiKey = B, this.authToken = Q
    }
    withOptions(A) {
        return new this.constructor({
            ...this._options,
            baseURL: this.baseURL,
            maxRetries: this.maxRetries,
            timeout: this.timeout,
            logger: this.logger,
            logLevel: this.logLevel,
            fetch: this.fetch,
            fetchOptions: this.fetchOptions,
            apiKey: this.apiKey,
            authToken: this.authToken,
            ...A
        })
    }
    defaultQuery() {
        return this._options.defaultQuery
    }
    validateHeaders({
        values: A,
        nulls: B
    }) {
        if (this.apiKey && A.get("x-api-key")) return;
        if (B.has("x-api-key")) return;
        if (this.authToken && A.get("authorization")) return;
        if (B.has("authorization")) return;
        throw new Error('Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted')
    }
    authHeaders(A) {
        return F5([this.apiKeyAuth(A), this.bearerAuth(A)])
    }
    apiKeyAuth(A) {
        if (this.apiKey == null) return;
        return F5([{
            "X-Api-Key": this.apiKey
        }])
    }
    bearerAuth(A) {
        if (this.authToken == null) return;
        return F5([{
            Authorization: `Bearer ${this.authToken}`
        }])
    }
    stringifyQuery(A) {
        return Object.entries(A).filter(([B, Q]) => typeof Q !== "undefined").map(([B, Q]) => {
            if (typeof Q === "string" || typeof Q === "number" || typeof Q === "boolean") return `${encodeURIComponent(B)}=${encodeURIComponent(Q)}`;
            if (Q === null) return `${encodeURIComponent(B)}=`;
            throw new P9(`Cannot stringify type ${typeof Q}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)
        }).join("&")
    }
    getUserAgent() {
        return `${this.constructor.name}/JS ${hx}`
    }
    defaultIdempotencyKey() {
        return `stainless-node-retry-${jK0()}`
    }
    makeStatusError(A, B, Q, Z) {
        return D6.generate(A, B, Q, Z)
    }
    buildURL(A, B, Q) {
        let Z = !_A(this, tK0, "m", C3B).call(this) && Q || this.baseURL,
            D = S5B(A) ? new URL(A) : new URL(Z + (Z.endsWith("/") && A.startsWith("/") ? A.slice(1) : A)),
            G = this.defaultQuery();
        if (!j5B(G)) B = {
            ...G,
            ...B
        };
        if (typeof B === "object" && B && !Array.isArray(B)) D.search = this.stringifyQuery(B);
        return D.toString()
    }
    _calculateNonstreamingTimeout(A) {
        if (3600 * A / 128000 > 600) throw new P9("Streaming is strongly recommended for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
        return 600000
    }
    async prepareOptions(A) {}
    async prepareRequest(A, {
        url: B,
        options: Q
    }) {}
    get(A, B) {
        return this.methodRequest("get", A, B)
    }
    post(A, B) {
        return this.methodRequest("post", A, B)
    }
    patch(A, B) {
        return this.methodRequest("patch", A, B)
    }
    put(A, B) {
        return this.methodRequest("put", A, B)
    }
    delete(A, B) {
        return this.methodRequest("delete", A, B)
    }
    methodRequest(A, B, Q) {
        return this.request(Promise.resolve(Q).then((Z) => {
            return {
                method: A,
                path: B,
                ...Z
            }
        }))
    }
    request(A, B = null) {
        return new ym(this, this.makeRequest(A, B, void 0))
    }
    async makeRequest(A, B, Q) {
        let Z = await A,
            D = Z.maxRetries ?? this.maxRetries;
        if (B == null) B = D;
        await this.prepareOptions(Z);
        let {
            req: G,
            url: F,
            timeout: I
        } = this.buildRequest(Z, {
            retryCount: D - B
        });
        await this.prepareRequest(G, {
            url: F,
            options: Z
        });
        let Y = "log_" + (Math.random() * 16777216 | 0).toString(16).padStart(6, "0"),
            W = Q === void 0 ? "" : `, retryOf: ${Q}`,
            J = Date.now();
        if (XJ(this).debug(`[${Y}] sending request`, iP({
                retryOfRequestLogID: Q,
                method: Z.method,
                url: F,
                options: Z,
                headers: G.headers
            })), Z.signal?.aborted) throw new xF;
        let X = new AbortController,
            V = await this.fetchWithTimeout(F, G, I, X).catch(wZ1),
            C = Date.now();
        if (V instanceof Error) {
            let z = `retrying, ${B} attempts remaining`;
            if (Z.signal?.aborted) throw new xF;
            let $ = lP(V) || /timed? ?out/i.test(String(V) + ("cause" in V ? String(V.cause) : ""));
            if (B) return XJ(this).info(`[${Y}] connection ${$?"timed out":"failed"} - ${z}`), XJ(this).debug(`[${Y}] connection ${$?"timed out":"failed"} (${z})`, iP({
                retryOfRequestLogID: Q,
                url: F,
                durationMs: C - J,
                message: V.message
            })), this.retryRequest(Z, B, Q ?? Y);
            if (XJ(this).info(`[${Y}] connection ${$?"timed out":"failed"} - error; no more retries left`), XJ(this).debug(`[${Y}] connection ${$?"timed out":"failed"} (error; no more retries left)`, iP({
                    retryOfRequestLogID: Q,
                    url: F,
                    durationMs: C - J,
                    message: V.message
                })), $) throw new $Z1;
            throw new pP({
                cause: V
            })
        }
        let K = [...V.headers.entries()].filter(([z]) => z === "request-id").map(([z, $]) => ", " + z + ": " + JSON.stringify($)).join(""),
            H = `[${Y}${W}${K}] ${G.method} ${F} ${V.ok?"succeeded":"failed"} with status ${V.status} in ${C-J}ms`;
        if (!V.ok) {
            let z = this.shouldRetry(V);
            if (B && z) {
                let P = `retrying, ${B} attempts remaining`;
                return await u5B(V.body), XJ(this).info(`${H} - ${P}`), XJ(this).debug(`[${Y}] response error (${P})`, iP({
                    retryOfRequestLogID: Q,
                    url: V.url,
                    status: V.status,
                    headers: V.headers,
                    durationMs: C - J
                })), this.retryRequest(Z, B, Q ?? Y, V.headers)
            }
            let $ = z ? "error; no more retries left" : "error; not retryable";
            XJ(this).info(`${H} - ${$}`);
            let L = await V.text().catch((P) => wZ1(P).message),
                N = sj1(L),
                R = N ? void 0 : L;
            throw XJ(this).debug(`[${Y}] response error (${$})`, iP({
                retryOfRequestLogID: Q,
                url: V.url,
                status: V.status,
                headers: V.headers,
                message: R,
                durationMs: Date.now() - J
            })), this.makeStatusError(V.status, N, R, V.headers)
        }
        return XJ(this).info(H), XJ(this).debug(`[${Y}] response start`, iP({
            retryOfRequestLogID: Q,
            url: V.url,
            status: V.status,
            headers: V.headers,
            durationMs: C - J
        })), {
            response: V,
            options: Z,
            controller: X,
            requestLogID: Y,
            retryOfRequestLogID: Q,
            startTime: J
        }
    }
    getAPIList(A, B, Q) {
        return this.requestAPIList(B, {
            method: "get",
            path: A,
            ...Q
        })
    }
    requestAPIList(A, B) {
        let Q = this.makeRequest(B, null, void 0);
        return new Bk1(this, Q, A)
    }
    async fetchWithTimeout(A, B, Q, Z) {
        let {
            signal: D,
            method: G,
            ...F
        } = B || {};
        if (D) D.addEventListener("abort", () => Z.abort());
        let I = setTimeout(() => Z.abort(), Q),
            Y = globalThis.ReadableStream && F.body instanceof globalThis.ReadableStream || typeof F.body === "object" && F.body !== null && Symbol.asyncIterator in F.body,
            W = {
                signal: Z.signal,
                ...Y ? {
                    duplex: "half"
                } : {},
                method: "GET",
                ...F
            };
        if (G) W.method = G.toUpperCase();
        try {
            return await this.fetch.call(void 0, A, W)
        } finally {
            clearTimeout(I)
        }
    }
    shouldRetry(A) {
        let B = A.headers.get("x-should-retry");
        if (B === "true") return !0;
        if (B === "false") return !1;
        if (A.status === 408) return !0;
        if (A.status === 409) return !0;
        if (A.status === 429) return !0;
        if (A.status >= 500) return !0;
        return !1
    }
    async retryRequest(A, B, Q, Z) {
        let D, G = Z?.get("retry-after-ms");
        if (G) {
            let I = parseFloat(G);
            if (!Number.isNaN(I)) D = I
        }
        let F = Z?.get("retry-after");
        if (F && !D) {
            let I = parseFloat(F);
            if (!Number.isNaN(I)) D = I * 1000;
            else D = Date.parse(F) - Date.now()
        }
        if (!(D && 0 <= D && D < 60000)) {
            let I = A.maxRetries ?? this.maxRetries;
            D = this.calculateDefaultRetryTimeoutMillis(B, I)
        }
        return await _5B(D), this.makeRequest(A, B - 1, Q)
    }
    calculateDefaultRetryTimeoutMillis(A, B) {
        let D = B - A,
            G = Math.min(0.5 * Math.pow(2, D), 8),
            F = 1 - Math.random() * 0.25;
        return G * F * 1000
    }
    calculateNonstreamingTimeout(A, B) {
        if (3600000 * A / 128000 > 600000 || B != null && A > B) throw new P9("Streaming is strongly recommended for operations that may token longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
        return 600000
    }
    buildRequest(A, {
        retryCount: B = 0
    } = {}) {
        let Q = {
                ...A
            },
            {
                method: Z,
                path: D,
                query: G,
                defaultBaseURL: F
            } = Q,
            I = this.buildURL(D, G, F);
        if ("timeout" in Q) y5B("timeout", Q.timeout);
        Q.timeout = Q.timeout ?? this.timeout;
        let {
            bodyHeaders: Y,
            body: W
        } = this.buildBody({
            options: Q
        }), J = this.buildHeaders({
            options: A,
            method: Z,
            bodyHeaders: Y,
            retryCount: B
        });
        return {
            req: {
                method: Z,
                headers: J,
                ...Q.signal && {
                    signal: Q.signal
                },
                ...globalThis.ReadableStream && W instanceof globalThis.ReadableStream && {
                    duplex: "half"
                },
                ...W && {
                    body: W
                },
                ...this.fetchOptions ?? {},
                ...Q.fetchOptions ?? {}
            },
            url: I,
            timeout: Q.timeout
        }
    }
    buildHeaders({
        options: A,
        method: B,
        bodyHeaders: Q,
        retryCount: Z
    }) {
        let D = {};
        if (this.idempotencyHeader && B !== "get") {
            if (!A.idempotencyKey) A.idempotencyKey = this.defaultIdempotencyKey();
            D[this.idempotencyHeader] = A.idempotencyKey
        }
        let G = F5([D, {
            Accept: "application/json",
            "User-Agent": this.getUserAgent(),
            "X-Stainless-Retry-Count": String(Z),
            ...A.timeout ? {
                "X-Stainless-Timeout": String(Math.trunc(A.timeout / 1000))
            } : {},
            ...h5B(),
            ...this._options.dangerouslyAllowBrowser ? {
                "anthropic-dangerous-direct-browser-access": "true"
            } : void 0,
            "anthropic-version": "2023-06-01"
        }, this.authHeaders(A), this._options.defaultHeaders, Q, A.headers]);
        return this.validateHeaders(G), G.values
    }
    buildBody({
        options: {
            body: A,
            headers: B
        }
    }) {
        if (!A) return {
            bodyHeaders: void 0,
            body: void 0
        };
        let Q = F5([B]);
        if (ArrayBuffer.isView(A) || A instanceof ArrayBuffer || A instanceof DataView || typeof A === "string" && Q.values.has("content-type") || A instanceof Blob || A instanceof FormData || A instanceof URLSearchParams || globalThis.ReadableStream && A instanceof globalThis.ReadableStream) return {
            bodyHeaders: void 0,
            body: A
        };
        else if (typeof A === "object" && ((Symbol.asyncIterator in A) || (Symbol.iterator in A) && ("next" in A) && typeof A.next === "function")) return {
            bodyHeaders: void 0,
            body: rj1(A)
        };
        else return _A(this, Uk1, "f").call(this, {
            body: A,
            headers: Q
        })
    }
}
eK0 = H3, Uk1 = new WeakMap, tK0 = new WeakSet, C3B = function A() {
    return this.baseURL !== "https://api.anthropic.com"
};
H3.Anthropic = eK0;
H3.HUMAN_PROMPT = `

Human:`;
H3.AI_PROMPT = `

Assistant:`;
H3.DEFAULT_TIMEOUT = 600000;
H3.AnthropicError = P9;
H3.APIError = D6;
H3.APIConnectionError = pP;
H3.APIConnectionTimeoutError = $Z1;
H3.APIUserAbortError = xF;
H3.NotFoundError = MZ1;
H3.ConflictError = RZ1;
H3.RateLimitError = TZ1;
H3.BadRequestError = qZ1;
H3.AuthenticationError = NZ1;
H3.InternalServerError = PZ1;
H3.PermissionDeniedError = LZ1;
H3.UnprocessableEntityError = OZ1;
H3.toFile = Qk1;
class sP extends H3 {
    constructor() {
        super(...arguments);
        this.completions = new mx(this), this.messages = new w$(this), this.models = new ve(this), this.beta = new iK(this)
    }
}
sP.Completions = mx;
sP.Messages = w$;
sP.Models = ve;
sP.Beta = iK;
var CJ = "API Error",
    oZ1 = "Prompt is too long",
    AH0 = "Credit balance is too low",
    wk1 = "Invalid API key · Please run /login",
    $k1 = "Invalid API key · Fix external API key",
    BH0 = "Claude AI usage limit reached",
    QH0 = "Repeated server overload with Opus model",
    rV = "(no content)",
    qk1 = "OAuth token revoked · Please run /login",
    ZH0 = "Repeated 529 Overloaded errors",
    be = "Opus is experiencing high load, please use /model to switch to Sonnet";

function Nk1(A, B, Q) {
    if (A instanceof Error && A.message.includes(ZH0)) return VX({
        content: QH0
    });
    if (A instanceof Error && A.message.includes(be)) return VX({
        content: be
    });
    if (A instanceof D6 && A.status === 429 && KB()) {
        let Z = A.headers?.get?.("anthropic-ratelimit-unified-reset"),
            D = Number(Z) || 0,
            G = `${BH0}|${D}`;
        return VX({
            content: G
        })
    }
    if (A instanceof Error && A.message.includes("prompt is too long")) return VX({
        content: oZ1
    });
    if (KB() && A instanceof D6 && A.status === 400 && A.message.toLowerCase().includes("invalid model name") && (Ca(B) || B === "opus")) return VX({
        content: "Claude Opus is not available with the Claude Pro plan. If you have updated your subscription plan recently, run /logout and /login for the plan to take effect."
    });
    if (A instanceof Error && A.message.includes("Your credit balance is too low")) return VX({
        content: AH0
    });
    if (A instanceof Error && A.message.toLowerCase().includes("x-api-key")) {
        let {
            source: Z
        } = DX(Q);
        return VX({
            content: Z === "ANTHROPIC_API_KEY" || Z === "apiKeyHelper" ? $k1 : wk1
        })
    }
    if (A instanceof D6 && A.status === 403 && A.message.includes("OAuth token has been revoked")) return VX({
        content: qk1
    });
    if (process.env.CLAUDE_CODE_USE_BEDROCK && A instanceof Error && A.message.toLowerCase().includes("model id")) return VX({
        content: `${CJ} (${B}): ${A.message}`
    });
    if (A instanceof Error) return VX({
        content: `${CJ}: ${A.message}`
    });
    return VX({
        content: CJ
    })
}

function DH0(A) {
    if (A !== "refusal") return;
    return X1("tengu_refusal_api_response", {}), VX({
        content: `${CJ}: Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup). Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.`
    })
}

function K3B(A, B) {
    let Q = new Set;
    for (let Z of A)
        if (!B.has(Z)) Q.add(Z);
    return Q
}

function H3B(A, B) {
    if (A.size === 0 || B.size === 0) return !1;
    for (let Q of A)
        if (!B.has(Q)) return !1;
    return !0
}
F31();
var cx = "2025-06-18";
var Lk1 = [cx, "2025-03-26", "2024-11-05", "2024-10-07"],
    Mk1 = "2.0",
    z3B = h.union([h.string(), h.number().int()]),
    E3B = h.string(),
    Tk6 = h.object({
        progressToken: h.optional(z3B)
    }).passthrough(),
    gE = h.object({
        _meta: h.optional(Tk6)
    }).passthrough(),
    oV = h.object({
        method: h.string(),
        params: h.optional(gE)
    }),
    tZ1 = h.object({
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    SM = h.object({
        method: h.string(),
        params: h.optional(tZ1)
    }),
    uE = h.object({
        _meta: h.optional(h.object({}).passthrough())
    }).passthrough(),
    Rk1 = h.union([h.string(), h.number().int()]),
    U3B = h.object({
        jsonrpc: h.literal(Mk1),
        id: Rk1
    }).merge(oV).strict(),
    Ok1 = (A) => U3B.safeParse(A).success,
    w3B = h.object({
        jsonrpc: h.literal(Mk1)
    }).merge(SM).strict(),
    $3B = (A) => w3B.safeParse(A).success,
    q3B = h.object({
        jsonrpc: h.literal(Mk1),
        id: Rk1,
        result: uE
    }).strict(),
    eZ1 = (A) => q3B.safeParse(A).success,
    CX;
(function(A) {
    A[A.ConnectionClosed = -32000] = "ConnectionClosed", A[A.RequestTimeout = -32001] = "RequestTimeout", A[A.ParseError = -32700] = "ParseError", A[A.InvalidRequest = -32600] = "InvalidRequest", A[A.MethodNotFound = -32601] = "MethodNotFound", A[A.InvalidParams = -32602] = "InvalidParams", A[A.InternalError = -32603] = "InternalError"
})(CX || (CX = {}));