/* chunk:642 bytes:[14553113, 14572658) size:19545 source:unpacked-cli.js */
class ZP0 extends DD1 {
    constructor(A, B) {
        var Q;
        super(B);
        this._serverInfo = A, this._capabilities = (Q = B === null || B === void 0 ? void 0 : B.capabilities) !== null && Q !== void 0 ? Q : {}, this._instructions = B === null || B === void 0 ? void 0 : B.instructions, this.setRequestHandler(GH0, (Z) => this._oninitialize(Z)), this.setNotificationHandler(Pk1, () => {
            var Z;
            return (Z = this.oninitialized) === null || Z === void 0 ? void 0 : Z.call(this)
        })
    }
    registerCapabilities(A) {
        if (this.transport) throw new Error("Cannot register capabilities after connecting to transport");
        this._capabilities = _k1(this._capabilities, A)
    }
    assertCapabilityForMethod(A) {
        var B, Q, Z;
        switch (A) {
            case "sampling/createMessage":
                if (!((B = this._clientCapabilities) === null || B === void 0 ? void 0 : B.sampling)) throw new Error(`Client does not support sampling (required for ${A})`);
                break;
            case "elicitation/create":
                if (!((Q = this._clientCapabilities) === null || Q === void 0 ? void 0 : Q.elicitation)) throw new Error(`Client does not support elicitation (required for ${A})`);
                break;
            case "roots/list":
                if (!((Z = this._clientCapabilities) === null || Z === void 0 ? void 0 : Z.roots)) throw new Error(`Client does not support listing roots (required for ${A})`);
                break;
            case "ping":
                break
        }
    }
    assertNotificationCapability(A) {
        switch (A) {
            case "notifications/message":
                if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${A})`);
                break;
            case "notifications/resources/updated":
            case "notifications/resources/list_changed":
                if (!this._capabilities.resources) throw new Error(`Server does not support notifying about resources (required for ${A})`);
                break;
            case "notifications/tools/list_changed":
                if (!this._capabilities.tools) throw new Error(`Server does not support notifying of tool list changes (required for ${A})`);
                break;
            case "notifications/prompts/list_changed":
                if (!this._capabilities.prompts) throw new Error(`Server does not support notifying of prompt list changes (required for ${A})`);
                break;
            case "notifications/cancelled":
                break;
            case "notifications/progress":
                break
        }
    }
    assertRequestHandlerCapability(A) {
        switch (A) {
            case "sampling/createMessage":
                if (!this._capabilities.sampling) throw new Error(`Server does not support sampling (required for ${A})`);
                break;
            case "logging/setLevel":
                if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${A})`);
                break;
            case "prompts/get":
            case "prompts/list":
                if (!this._capabilities.prompts) throw new Error(`Server does not support prompts (required for ${A})`);
                break;
            case "resources/list":
            case "resources/templates/list":
            case "resources/read":
                if (!this._capabilities.resources) throw new Error(`Server does not support resources (required for ${A})`);
                break;
            case "tools/call":
            case "tools/list":
                if (!this._capabilities.tools) throw new Error(`Server does not support tools (required for ${A})`);
                break;
            case "ping":
            case "initialize":
                break
        }
    }
    async _oninitialize(A) {
        let B = A.params.protocolVersion;
        return this._clientCapabilities = A.params.capabilities, this._clientVersion = A.params.clientInfo, {
            protocolVersion: Lk1.includes(B) ? B : cx,
            capabilities: this.getCapabilities(),
            serverInfo: this._serverInfo,
            ...this._instructions && {
                instructions: this._instructions
            }
        }
    }
    getClientCapabilities() {
        return this._clientCapabilities
    }
    getClientVersion() {
        return this._clientVersion
    }
    getCapabilities() {
        return this._capabilities
    }
    async ping() {
        return this.request({
            method: "ping"
        }, rP)
    }
    async createMessage(A, B) {
        return this.request({
            method: "sampling/createMessage",
            params: A
        }, KH0, B)
    }
    async elicitInput(A, B) {
        let Q = await this.request({
            method: "elicitation/create",
            params: A
        }, HH0, B);
        if (Q.action === "accept" && Q.content) try {
            let Z = new DlB.default,
                D = Z.compile(A.requestedSchema);
            if (!D(Q.content)) throw new KX(CX.InvalidParams, `Elicitation response content does not match requested schema: ${Z.errorsText(D.errors)}`)
        } catch (Z) {
            if (Z instanceof KX) throw Z;
            throw new KX(CX.InternalError, `Error validating elicitation response: ${Z}`)
        }
        return Q
    }
    async listRoots(A, B) {
        return this.request({
            method: "roots/list",
            params: A
        }, UH0, B)
    }
    async sendLoggingMessage(A) {
        return this.notification({
            method: "notifications/message",
            params: A
        })
    }
    async sendResourceUpdated(A) {
        return this.notification({
            method: "notifications/resources/updated",
            params: A
        })
    }
    async sendResourceListChanged() {
        return this.notification({
            method: "notifications/resources/list_changed"
        })
    }
    async sendToolListChanged() {
        return this.notification({
            method: "notifications/tools/list_changed"
        })
    }
    async sendPromptListChanged() {
        return this.notification({
            method: "notifications/prompts/list_changed"
        })
    }
}
import GlB from "node:process";
class DP0 {
    constructor(A = GlB.stdin, B = GlB.stdout) {
        this._stdin = A, this._stdout = B, this._readBuffer = new FD1, this._started = !1, this._ondata = (Q) => {
            this._readBuffer.append(Q), this.processReadBuffer()
        }, this._onerror = (Q) => {
            var Z;
            (Z = this.onerror) === null || Z === void 0 || Z.call(this, Q)
        }
    }
    async start() {
        if (this._started) throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
        this._started = !0, this._stdin.on("data", this._ondata), this._stdin.on("error", this._onerror)
    }
    processReadBuffer() {
        var A, B;
        while (!0) try {
            let Q = this._readBuffer.readMessage();
            if (Q === null) break;
            (A = this.onmessage) === null || A === void 0 || A.call(this, Q)
        } catch (Q) {
            (B = this.onerror) === null || B === void 0 || B.call(this, Q)
        }
    }
    async close() {
        var A;
        if (this._stdin.off("data", this._ondata), this._stdin.off("error", this._onerror), this._stdin.listenerCount("data") === 0) this._stdin.pause();
        this._readBuffer.clear(), (A = this.onclose) === null || A === void 0 || A.call(this)
    }
    send(A) {
        return new Promise((B) => {
            let Q = tk1(A);
            if (this._stdout.write(Q)) B();
            else this._stdout.once("drain", B)
        })
    }
}
var FlB = [Ag1];
async function IlB(A, B, Q) {
    let D = Y01(100);
    if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "mcp";
    rE(A);
    let G = new ZP0({
        name: "claude/tengu",
        version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION
    }, {
        capabilities: {
            tools: {}
        }
    });
    G.setRequestHandler(VH0, async () => {
        let I = hV(),
            Y = Qq(I, H0().todoFeatureEnabled);
        return {
            tools: await Promise.all(Y.map(async (W) => ({
                ...W,
                description: await W.prompt({
                    getToolPermissionContext: () => I,
                    tools: Y
                }),
                inputSchema: hg(W.inputSchema)
            })))
        }
    }), G.setRequestHandler(CH0, async ({
        params: {
            name: I,
            arguments: Y
        }
    }) => {
        let W = Qq(hV(), H0().todoFeatureEnabled),
            J = W.find((X) => X.name === I);
        if (!J) throw new Error(`Tool ${I} not found`);
        try {
            if (!J.isEnabled()) throw new Error(`Tool ${I} is not enabled`);
            let X = AG(),
                V = await J.validateInput?.(Y ?? {}, {
                    abortController: h4(),
                    options: {
                        commands: FlB,
                        tools: W,
                        mainLoopModel: X,
                        maxThinkingTokens: 0,
                        mcpClients: [],
                        mcpResources: {},
                        isNonInteractiveSession: !0,
                        debug: B,
                        verbose: Q
                    },
                    getQueuedCommands: () => [],
                    getToolPermissionContext: hV,
                    removeQueuedCommands: () => {},
                    readFileState: D,
                    setInProgressToolUseIDs: () => {},
                    setResponseLength: () => {},
                    agentId: CB()
                });
            if (V && !V.result) throw new Error(`Tool ${I} input is invalid: ${V.message}`);
            let C = J.call(Y ?? {}, {
                    abortController: h4(),
                    options: {
                        commands: FlB,
                        tools: W,
                        mainLoopModel: AG(),
                        maxThinkingTokens: 0,
                        mcpClients: [],
                        mcpResources: {},
                        isNonInteractiveSession: !0,
                        debug: B,
                        verbose: Q
                    },
                    getQueuedCommands: () => [],
                    getToolPermissionContext: hV,
                    removeQueuedCommands: () => {},
                    readFileState: D,
                    setInProgressToolUseIDs: () => {},
                    setResponseLength: () => {},
                    agentId: CB()
                }, iw, YU({
                    content: []
                })),
                K = await tM(C);
            if (K.type !== "result") throw new Error(`Tool ${I} did not return a result`);
            return {
                content: Array.isArray(K) ? K.map((H) => ({
                    type: "text",
                    text: "text" in H ? H.text : JSON.stringify(H)
                })) : [{
                    type: "text",
                    text: typeof K === "string" ? K : JSON.stringify(K.data)
                }]
            }
        } catch (X) {
            return R1(X instanceof Error ? X : new Error(String(X))), {
                isError: !0,
                content: [{
                    type: "text",
                    text: `Error: ${X instanceof Error?X.message:String(X)}`
                }]
            }
        }
    });
    async function F() {
        let I = new DP0;
        await G.connect(I)
    }
    return await F()
}
import {
    join as xA1
} from "path";
var bO8 = 30;

function JlB() {
    let Q = ((GB() || {}).cleanupPeriodDays ?? bO8) * 24 * 60 * 60 * 1000;
    return new Date(Date.now() - Q)
}

function fO8(A, B) {
    return {
        messages: A.messages + B.messages,
        errors: A.errors + B.errors
    }
}

function hO8(A) {
    let B = A.split(".")[0].replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/, "T$1:$2:$3.$4Z");
    return new Date(B)
}

function YlB(A, B, Q) {
    let Z = {
        messages: 0,
        errors: 0
    };
    try {
        let D = j1().readdirSync(A);
        for (let G of D) try {
            if (hO8(G.name) < B)
                if (j1().unlinkSync(xA1(A, G.name)), Q) Z.messages++;
                else Z.errors++
        } catch (F) {
            R1(F)
        }
    } catch (D) {
        if (D instanceof Error && "code" in D && D.code !== "ENOENT") R1(D)
    }
    return Z
}
async function gO8() {
    let A = j1(),
        B = JlB(),
        Q = $L.errors(),
        Z = $L.baseLogs(),
        D = YlB(Q, B, !1);
    try {
        if (A.existsSync(Z)) {
            let F = A.readdirSync(Z).filter((I) => I.isDirectory() && I.name.startsWith("mcp-logs-")).map((I) => xA1(Z, I.name));
            for (let I of F) {
                D = fO8(D, YlB(I, B, !0));
                try {
                    if (A.isDirEmptySync(I)) A.rmdirSync(I)
                } catch {}
            }
        }
    } catch (G) {
        if (G instanceof Error && "code" in G && G.code !== "ENOENT") R1(G)
    }
    return D
}

function WlB(A, B, Q, Z) {
    let D = {
        messages: 0,
        errors: 0
    };
    if (!Z.existsSync(A)) return D;
    let F = Z.readdirSync(A).filter((I) => I.isFile() && I.name.endsWith(Q));
    for (let I of F) try {
        let Y = xA1(A, I.name);
        if (Z.statSync(Y).mtime < B) Z.unlinkSync(Y), D.messages++
    } catch {
        D.errors++
    }
    try {
        if (Z.isDirEmptySync(A)) Z.rmdirSync(A)
    } catch {
        D.errors++
    }
    return D
}

function uO8() {
    let A = JlB(),
        B = {
            messages: 0,
            errors: 0
        },
        Q = _61(),
        Z = j1();
    try {
        if (!Z.existsSync(Q)) return B;
        let G = Z.readdirSync(Q).filter((F) => F.isDirectory()).map((F) => xA1(Q, F.name));
        for (let F of G) try {
            let I = WlB(F, A, ".jsonl", Z);
            B.messages += I.messages, B.errors += I.errors;
            let Y = xA1(F, "bash-outputs");
            if (Z.existsSync(Y)) try {
                let W = Z.readdirSync(Y);
                for (let J of W)
                    if (J.isDirectory()) {
                        let X = xA1(Y, J.name),
                            V = WlB(X, A, ".txt", Z);
                        B.messages += V.messages, B.errors += V.errors
                    } if (Z.isDirEmptySync(Y)) Z.rmdirSync(Y)
            } catch {
                B.errors++
            }
            try {
                if (Z.isDirEmptySync(F)) Z.rmdirSync(F)
            } catch {}
        } catch {
            B.errors++;
            continue
        }
    } catch {
        B.errors++
    }
    return B
}

function XlB() {
    setImmediate(() => {
        gO8(), uO8()
    }).unref()
}
import {
    join as ClB,
    basename as mO8
} from "path";
var dO8 = `
Summarize this coding conversation in under 50 characters.
Capture the main task, key files, problems addressed, and current status.
`.trim(),
    VlB = 50000;

function cO8() {
    let A = WT(),
        B = P01(A);
    if (B <= VlB) return Math.floor(B * 0.8);
    return B - VlB
}

function lO8(A) {
    return IF(A).map((B) => {
        if (B.type === "user") {
            if (typeof B.message.content === "string") return `User: ${B.message.content}`;
            else if (Array.isArray(B.message.content)) return `User: ${B.message.content.filter((Q)=>Q.type==="text").map((Q)=>Q.type==="text"?Q.text:"").join(`
`).trim()}`
        } else if (B.type === "assistant") {
            let Q = cb1(B);
            if (Q) return `Claude: ${fG1(Q).trim()}`
        }
        return null
    }).filter((B) => B !== null).join(`

`)
}
async function pO8(A) {
    if (!A.length) throw new Error("Can't summarize empty conversation");
    let B = [],
        Q = 0,
        Z = cO8();
    for (let W = A.length - 1; W >= 0; W--) {
        let J = A[W];
        if (!J) continue;
        let X = UJ([J]);
        if (Q + X > Z) break;
        B.unshift(J), Q += X
    }
    let D = B.length < A.length;
    n1(D ? `Summarizing last ${B.length} of ${A.length} messages (~${Q} tokens)` : `Summarizing all ${A.length} messages (~${Q} tokens)`);
    let G = lO8(B),
        I = [`Please write a 5-10 word title for the following conversation:

${D?`[Last ${B.length} of ${A.length} messages]

`:""}${G}
`, "Respond with the title for the conversation and nothing else."];
    return (await jI({
        systemPrompt: [dO8],
        userPrompt: I.join(`
`),
        enablePromptCaching: !0,
        isNonInteractiveSession: !1,
        promptCategory: "summarize_convo"
    })).message.content.filter((W) => W.type === "text").map((W) => W.text).join("")
}

function iO8(A) {
    return ClB(_61(), A.replace(/[^a-zA-Z0-9]/g, "-"))
}

function nO8(A) {
    let B = j1();
    try {
        B.statSync(A)
    } catch {
        return []
    }
    return B.readdirSync(A).filter((Z) => Z.isFile() && Z.name.endsWith(".jsonl")).map((Z) => ClB(A, Z.name)).sort((Z, D) => {
        let G = B.statSync(Z);
        return B.statSync(D).mtime.getTime() - G.mtime.getTime()
    })
}

function aO8(A, B) {
    let Q = [],
        Z = A;
    while (Z) {
        let {
            isSidechain: D,
            parentUuid: G,
            ...F
        } = Z;
        Q.unshift(F), Z = Z.parentUuid ? B.get(Z.parentUuid) : void 0
    }
    return Q
}

function sO8(A) {
    let B = new Set([...A.values()].map((Q) => Q.parentUuid).filter((Q) => Q !== null));
    return [...A.values()].filter((Q) => !B.has(Q.uuid))
}

function rO8(A) {
    let B = j1();
    try {
        let {
            buffer: Q
        } = B.readSync(A, {
            length: 512
        }), Z = Q.toString("utf8"), D = Z.indexOf(`
`);
        if (D === -1) return JSON.parse(Z.trim()).type === "summary";
        let G = Z.substring(0, D);
        return JSON.parse(G).type === "summary"
    } catch {
        return !1
    }
}
async function KlB() {
    let A = iO8(t0()),
        B = nO8(A);
    for (let Q of B) try {
        if (rO8(Q)) break;
        if (!VK(mO8(Q, ".jsonl"))) continue;
        let {
            messages: G,
            summaries: F
        } = await D40(Q), I = sO8(G);
        for (let Y of I) {
            if (F.has(Y.uuid)) continue;
            let W = aO8(Y, G);
            if (W.length === 0) continue;
            try {
                let J = await pO8(W);
                if (J) await UeA(Y.uuid, J)
            } catch (J) {
                R1(J instanceof Error ? J : new Error(String(J)))
            }
        }
    } catch (Z) {
        R1(Z instanceof Error ? Z : new Error(String(Z)))
    }
}
import {
    resolve as ilB
} from "path";
var nI1 = G1(z1(), 1);
var $C = G1(z1(), 1);
var GP0 = G1(z1(), 1);

function ng1() {
    return GP0.default.createElement(T, null, "MCP servers may execute code or access system resources. All tool calls require approval. Learn more in the", " ", GP0.default.createElement(hS1, {
        url: "https://docs.anthropic.com/s/claude-code-mcp"
    }, "MCP documentation"), ".")
}