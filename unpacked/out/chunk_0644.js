/* chunk:644 bytes:[14590163, 14607945) size:17782 source:unpacked-cli.js */
class IP0 {
    ws = null;
    lastSentId = null;
    url;
    state = "idle";
    onData;
    headers;
    reconnectAttempts = 0;
    reconnectTimer = null;
    messageBuffer;
    constructor(A, B = {}) {
        this.url = A, this.headers = B, this.messageBuffer = new YG1(AT8)
    }
    connect() {
        if (this.state !== "idle" && this.state !== "reconnecting") {
            SA(`WebSocketTransport: Cannot connect, current state is ${this.state}`);
            return
        }
        this.state = "reconnecting", n1(`WebSocketTransport: Opening ${this.url.href}`);
        let A = {
            ...this.headers
        };
        if (this.lastSentId) A["X-Last-Request-Id"] = this.lastSentId, n1(`WebSocketTransport: Adding X-Last-Request-Id header: ${this.lastSentId}`);
        this.ws = new aL(this.url.href, {
            headers: A
        }), this.ws.on("open", () => {
            n1("WebSocketTransport: Connected");
            let B = this.ws.upgradeReq;
            if (B?.headers?.["x-last-request-id"]) {
                let Q = B.headers["x-last-request-id"];
                this.replayBufferedMessages(Q)
            }
            this.reconnectAttempts = 0, this.state = "connected"
        }), this.ws.on("message", (B) => {
            let Q = B.toString();
            if (this.onData) this.onData(Q)
        }), this.ws.on("error", (B) => {
            SA(`WebSocketTransport: Error: ${B.message}`), this.handleConnectionError()
        }), this.ws.on("close", (B, Q) => {
            SA(`WebSocketTransport: Closed: ${B}`), this.handleConnectionError()
        })
    }
    sendLine(A) {
        if (!this.ws || this.state !== "connected") return n1("WebSocketTransport: Not connected"), !1;
        try {
            return this.ws.send(A), !0
        } catch (B) {
            return SA(`WebSocketTransport: Failed to send: ${B}`), this.ws = null, this.handleConnectionError(), !1
        }
    }
    doDisconnect() {
        if (this.ws) this.ws.close(), this.ws = null
    }
    handleConnectionError() {
        if (n1(`WebSocketTransport: Disconnected from ${this.url.href}`), this.doDisconnect(), this.state === "closing" || this.state === "closed") return;
        if (this.reconnectAttempts < LlB) {
            if (this.reconnectTimer) clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
            this.state = "reconnecting", this.reconnectAttempts++;
            let A = Math.min(BT8 * Math.pow(2, this.reconnectAttempts - 1), QT8);
            n1(`WebSocketTransport: Reconnecting in ${A}ms (attempt ${this.reconnectAttempts}/${LlB})`), this.reconnectTimer = setTimeout(() => {
                this.reconnectTimer = null, this.connect()
            }, A)
        } else SA(`WebSocketTransport: Max reconnection attempts reached for ${this.url.href}`), this.state = "closed"
    }
    close() {
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
        this.state = "closing", this.doDisconnect()
    }
    replayBufferedMessages(A) {
        let B = this.messageBuffer.toArray();
        if (B.length === 0) return;
        let Q = 0;
        if (A) {
            let D = B.findIndex((G) => ("uuid" in G) && G.uuid === A);
            if (D >= 0) Q = D + 1
        }
        let Z = B.slice(Q);
        if (Z.length === 0) {
            n1("WebSocketTransport: No new messages to replay");
            return
        }
        n1(`WebSocketTransport: Replaying ${Z.length} buffered messages`);
        for (let D of Z) {
            let G = JSON.stringify(D) + `
`;
            if (!this.sendLine(G)) {
                this.handleConnectionError();
                break
            }
        }
    }
    isConnectedStatus() {
        return this.state === "connected"
    }
    setOnData(A) {
        this.onData = A
    }
    write(A) {
        if ("uuid" in A && typeof A.uuid === "string") this.messageBuffer.add(A), this.lastSentId = A.uuid;
        let B = JSON.stringify(A) + `
`;
        if (this.state !== "connected") return;
        this.sendLine(B)
    }
}

function MlB(A, B = {}) {
    if (A.protocol === "ws:" || A.protocol === "wss:") return new IP0(A, B);
    else throw new Error(`Unsupported protocol: ${A.protocol}`)
}
class YP0 extends sI1 {
    url;
    transport;
    inputStream;
    constructor(A, B) {
        let Q = new DT8({
            encoding: "utf8"
        });
        super(Q);
        this.inputStream = Q, this.url = new ZT8(A);
        let Z = {},
            D = gq2();
        if (D) Z.Authorization = `Bearer ${D}`;
        if (this.transport = MlB(this.url, Z), this.transport.setOnData((G) => {
                this.inputStream.write(G)
            }), this.transport.connect(), oL(() => this.close()), B) {
            let G = this.inputStream;
            (async () => {
                for await (let F of B) G.write(F + `
`)
            })()
        }
    }
    write(A) {
        this.transport.write(A)
    }
    close() {
        this.transport.close(), this.inputStream.end()
    }
}
class WP0 {
    returned;
    queue = [];
    readResolve;
    readReject;
    isDone = !1;
    hasError;
    started = !1;
    constructor(A) {
        this.returned = A
    } [Symbol.asyncIterator]() {
        if (this.started) throw new Error("Stream can only be iterated once");
        return this.started = !0, this
    }
    next() {
        if (this.queue.length > 0) return Promise.resolve({
            done: !1,
            value: this.queue.shift()
        });
        if (this.isDone) return Promise.resolve({
            done: !0,
            value: void 0
        });
        if (this.hasError) return Promise.reject(this.hasError);
        return new Promise((A, B) => {
            this.readResolve = A, this.readReject = B
        })
    }
    enqueue(A) {
        if (this.readResolve) {
            let B = this.readResolve;
            this.readResolve = void 0, this.readReject = void 0, B({
                done: !1,
                value: A
            })
        } else this.queue.push(A)
    }
    done() {
        if (this.isDone = !0, this.readResolve) {
            let A = this.readResolve;
            this.readResolve = void 0, this.readReject = void 0, A({
                done: !0,
                value: void 0
            })
        }
    }
    error(A) {
        if (this.hasError = A, this.readReject) {
            let B = this.readReject;
            this.readResolve = void 0, this.readReject = void 0, B(A)
        }
    }
    return () {
        if (this.isDone = !0, this.returned) this.returned();
        return Promise.resolve({
            done: !0,
            value: void 0
        })
    }
}
import {
    randomUUID as RlB
} from "node:crypto";
var GT8 = 10;
async function* TlB({
    commands: A,
    permissionContext: B,
    prompt: Q,
    cwd: Z,
    tools: D,
    mcpClients: G,
    verbose: F = !1,
    maxTurns: I,
    canUseTool: Y,
    mutableMessages: W = [],
    customSystemPrompt: J,
    appendSystemPrompt: X,
    userSpecifiedModel: V,
    fallbackModel: C,
    getQueuedCommands: K = () => [],
    removeQueuedCommands: H = () => {},
    abortController: z
}) {
    if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "sdk-cli";
    rE(Z);
    let $ = Date.now(),
        L = [],
        N = async (H1, A0, V0, o1, e, Z1) => {
            let I1 = await Y(H1, A0, V0, o1, e, Z1);
            if (I1.behavior !== "allow") {
                let U1 = {
                    tool_name: H1.name,
                    tool_use_id: e,
                    tool_input: A0
                };
                L.push(U1)
            }
            return I1
        }, R = V ? BL(V) : AG(), [O, P, j] = await Promise.all([NA1(D, R, Array.from(B.additionalWorkingDirectories.keys()), G, B), PX(), bS()]), f = [...J ? [J] : O, ...X ? [X] : []], k = JP0(W), c = $b(k), u = {
            messages: k,
            setMessages: () => {},
            onChangeAPIKey: () => {},
            options: {
                commands: A,
                debug: !1,
                tools: D,
                verbose: F,
                mainLoopModel: R,
                maxThinkingTokens: c,
                mcpClients: G,
                mcpResources: {},
                ideInstallationStatus: null,
                isNonInteractiveSession: !0,
                theme: H0().theme
            },
            getToolPermissionContext: () => B,
            getQueuedCommands: () => [],
            removeQueuedCommands: () => {},
            abortController: z ?? h4(),
            readFileState: OlB(k),
            setInProgressToolUseIDs: () => {},
            setToolPermissionContext: () => {},
            setResponseLength: () => {},
            agentId: CB()
        }, {
            messages: a,
            shouldQuery: l,
            allowedTools: y,
            maxThinkingTokens: t = c,
            model: E1
        } = await RA1({
            input: Q,
            mode: "prompt",
            setIsLoading: () => {},
            setToolJSX: () => {},
            context: {
                ...u,
                messages: k
            },
            messages: k
        }), C1 = [...k, ...a];
    for (let H1 of a)
        if (H1.type === "user") W.push({
            type: H1.type,
            message: H1.message,
            session_id: CB(),
            parent_tool_use_id: null
        });
    let _1 = {
            ...B,
            alwaysAllowRules: {
                ...B.alwaysAllowRules,
                command: y
            }
        },
        F0 = E1 ?? R;
    if (u = {
            messages: C1,
            setMessages: () => {},
            onChangeAPIKey: () => {},
            options: {
                commands: A,
                debug: !1,
                tools: D,
                verbose: F,
                mainLoopModel: F0,
                maxThinkingTokens: t,
                mcpClients: G,
                mcpResources: {},
                ideInstallationStatus: null,
                isNonInteractiveSession: !0,
                theme: H0().theme
            },
            getToolPermissionContext: () => _1,
            abortController: z || h4(),
            readFileState: OlB(C1),
            setToolPermissionContext: () => {},
            getQueuedCommands: K,
            removeQueuedCommands: H,
            setInProgressToolUseIDs: () => {},
            setResponseLength: () => {},
            agentId: CB()
        }, yield {
            type: "system",
            subtype: "init",
            cwd: Z,
            session_id: CB(),
            tools: D.map((H1) => H1.name),
            mcp_servers: G.map((H1) => ({
                name: H1.name,
                status: H1.type
            })),
            model: F0,
            permissionMode: _1.mode,
            slash_commands: A.map((H1) => H1.name),
            apiKeySource: DX(!0).source
        }, !l) {
        yield {
            type: "result",
            subtype: "success",
            is_error: !1,
            duration_ms: Date.now() - $,
            duration_api_ms: nj(),
            num_turns: C1.length - 1,
            result: "",
            session_id: CB(),
            total_cost_usd: aq(),
            usage: Ud,
            permission_denials: L
        };
        return
    }
    let W0 = Ud,
        g1 = 0,
        w1 = jI1();
    for await (let H1 of wR({
        messages: C1,
        systemPrompt: f,
        userContext: P,
        systemContext: j,
        canUseTool: N,
        toolUseContext: u,
        fallbackModel: C,
        promptCategory: w1
    })) {
        if (H1.type === "assistant" || H1.type === "user") C1.push(H1), await Gq1(C1);
        switch (H1.type) {
            case "assistant":
            case "progress":
            case "user":
                yield* FT8(H1);
                break;
            case "stream_event":
                if (H1.event.type === "message_start") W0 = $d(W0, H1.event.message.usage);
                if (H1.event.type === "message_delta") W0 = $d(W0, H1.event.usage);
                break;
            case "attachment":
            case "stream_request_start":
            case "system":
                break
        }
        if (H1.type === "user" && I && ++g1 >= I) {
            yield {
                type: "result",
                subtype: "error_max_turns",
                duration_ms: Date.now() - $,
                duration_api_ms: nj(),
                is_error: !1,
                num_turns: g1,
                session_id: CB(),
                total_cost_usd: aq(),
                usage: W0,
                permission_denials: L
            };
            return
        }
    }
    let Q1 = ZI(C1);
    if (!Q1 || Q1.type !== "assistant") {
        yield {
            type: "result",
            subtype: "error_during_execution",
            duration_ms: Date.now() - $,
            duration_api_ms: nj(),
            is_error: !1,
            num_turns: g1,
            session_id: CB(),
            total_cost_usd: aq(),
            usage: W0,
            permission_denials: L
        };
        return
    }
    let k1 = ZI(Q1.message.content);
    if (k1?.type !== "text" && k1?.type !== "thinking" && k1?.type !== "redacted_thinking") throw new Error(`Expected first content item to be text or thinking, but got ${JSON.stringify(Q1.message.content[0],null,2)}`);
    yield {
        type: "result",
        subtype: "success",
        is_error: Boolean(Q1.isApiErrorMessage),
        duration_ms: Date.now() - $,
        duration_api_ms: nj(),
        num_turns: C1.length - 1,
        result: k1.type === "text" ? k1.text : "",
        session_id: CB(),
        total_cost_usd: aq(),
        usage: W0,
        permission_denials: L
    }
}

function* FT8(A) {
    switch (A.type) {
        case "assistant":
            for (let B of IF([A])) yield {
                type: "assistant",
                message: B.message,
                parent_tool_use_id: null,
                session_id: CB()
            };
            return;
        case "progress":
            if (A.data.type !== "agent_progress") return;
            for (let B of IF([A.data.message])) switch (B.type) {
                case "assistant":
                    yield {
                        type: "assistant", message: B.message, parent_tool_use_id: A.parentToolUseID, session_id: CB()
                    };
                    break;
                case "user":
                    yield {
                        type: "user", message: B.message, parent_tool_use_id: A.parentToolUseID, session_id: CB()
                    };
                    break
            }
            break;
        case "user":
            for (let B of IF([A])) yield {
                type: "user",
                message: B.message,
                parent_tool_use_id: null,
                session_id: CB()
            };
            return;
        default:
    }
}

function JP0(A) {
    return A.flatMap((B) => {
        switch (B.type) {
            case "assistant":
                return [{
                    type: "assistant",
                    message: B.message,
                    uuid: RlB(),
                    requestId: void 0,
                    timestamp: new Date().toISOString()
                }];
            case "user":
                return [{
                    type: "user",
                    message: B.message,
                    uuid: RlB(),
                    timestamp: new Date().toISOString()
                }];
            default:
                return []
        }
    })
}

function PlB(A) {
    return A.flatMap((B) => {
        switch (B.type) {
            case "assistant":
                return [{
                    type: "assistant",
                    message: B.message,
                    session_id: CB(),
                    parent_tool_use_id: null
                }];
            case "user":
                return [{
                    type: "user",
                    message: B.message,
                    session_id: CB(),
                    parent_tool_use_id: null
                }];
            default:
                return []
        }
    })
}

function OlB(A) {
    let B = Y01(GT8),
        Q = new Map;
    for (let Z of A)
        if (Z.type === "assistant" && Array.isArray(Z.message.content)) {
            for (let D of Z.message.content)
                if (D.type === "tool_use" && D.name === "Read") {
                    let G = D.input;
                    if (G?.file_path && G?.offset === void 0 && G?.limit === void 0) Q.set(D.id, G.file_path)
                }
        } for (let Z of A)
        if (Z.type === "user" && Array.isArray(Z.message.content)) {
            for (let D of Z.message.content)
                if (D.type === "tool_result" && D.tool_use_id) {
                    let G = Q.get(D.tool_use_id);
                    if (G && typeof D.content === "string") {
                        let Y = D.content.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, "").split(`
`).map((W) => {
                            let J = W.match(/^\s*\d+→(.*)$/);
                            return J ? J[1] : W
                        }).join(`
`).trim();
                        if (Z.timestamp) {
                            let W = new Date(Z.timestamp).getTime();
                            B.set(G, {
                                content: Y,
                                timestamp: W
                            })
                        }
                    }
                }
        } return B
}
import {
    cwd as qT8
} from "process";
var rI1 = G1(z1(), 1);
var KH = G1(z1(), 1);
var fQ = G1(z1(), 1);
var VF = G1(z1(), 1);
var Z3 = G1(z1(), 1);