/* chunk:557 bytes:[13008246, 13028174) size:19928 source:unpacked-cli.js */
class Iv1 extends H3 {
    constructor({
        baseURL: A = Gv1("ANTHROPIC_VERTEX_BASE_URL"),
        region: B = Gv1("CLOUD_ML_REGION") ?? null,
        projectId: Q = Gv1("ANTHROPIC_VERTEX_PROJECT_ID") ?? null,
        ...Z
    } = {}) {
        if (!B) throw new Error("No region was given. The client should be instantiated with the `region` option or the `CLOUD_ML_REGION` environment variable should be set.");
        super({
            baseURL: A || `https://${B}-aiplatform.googleapis.com/v1`,
            ...Z
        });
        this.messages = w48(this), this.beta = $48(this), this.region = B, this.projectId = Q, this.accessToken = Z.accessToken ?? null, this._auth = Z.googleAuth ?? new MLB.GoogleAuth({
            scopes: "https://www.googleapis.com/auth/cloud-platform"
        }), this._authClientPromise = this._auth.getClient()
    }
    validateHeaders() {}
    async prepareOptions(A) {
        let B = await this._authClientPromise,
            Q = await B.getRequestHeaders(),
            Z = B.projectId ?? Q["x-goog-user-project"];
        if (!this.projectId && Z) this.projectId = Z;
        A.headers = LLB([Q, A.headers])
    }
    buildRequest(A) {
        if (Fv1(A.body)) A.body = {
            ...A.body
        };
        if (Fv1(A.body)) {
            if (!A.body.anthropic_version) A.body.anthropic_version = E48
        }
        if (U48.has(A.path) && A.method === "post") {
            if (!this.projectId) throw new Error("No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.");
            if (!Fv1(A.body)) throw new Error("Expected request body to be an object for post /v1/messages");
            let B = A.body.model;
            A.body.model = void 0;
            let Z = A.body.stream ?? !1 ? "streamRawPredict" : "rawPredict";
            A.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/${B}:${Z}`
        }
        if (A.path === "/v1/messages/count_tokens" || A.path == "/v1/messages/count_tokens?beta=true" && A.method === "post") {
            if (!this.projectId) throw new Error("No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.");
            A.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/count-tokens:rawPredict`
        }
        return super.buildRequest(A)
    }
}

function w48(A) {
    let B = new w$(A);
    return delete B.batches, B
}

function $48(A) {
    let B = new iK(A);
    return delete B.messages.batches, B
}
import {
    join as RLB
} from "path";

function q48() {
    return async (A, B) => {
        let Q = globalThis.fetch;
        if (B?.method === "POST" && B.body) try {
            let Z = JSON.parse(B.body),
                D = {};
            if (Object.keys(Z).forEach((G) => {
                    if (!["tools", "system", "messages"].includes(G)) D[G] = Z[G]
                }), "tools" in Z) D.tools = Z.tools;
            if ("system" in Z) D.system = Z.system;
            if ("messages" in Z) D.messages = Z.messages;
            j1().mkdirSync(RLB(e9(), "dump-prompts", CB())), j1().writeFileSync(RLB(e9(), "dump-prompts", CB(), `${new Date().toISOString()}.json`), JSON.stringify(D, null, 2), {
                encoding: "utf-8",
                flush: !0
            })
        } catch (Z) {}
        return Q(A, B)
    }
}
async function y$({
    apiKey: A,
    maxRetries: B = 0,
    model: Q,
    isNonInteractiveSession: Z,
    isSmallFastModel: D = !1
}) {
    let G = {
        "x-app": "cli",
        "User-Agent": Cy(),
        ...L48()
    };
    if (await Po(), !KB()) N48(G);
    let F = !1,
        I = {
            defaultHeaders: G,
            maxRetries: B,
            timeout: parseInt(process.env.API_TIMEOUT_MS || String(60000), 10),
            dangerouslyAllowBrowser: !0,
            fetchOptions: Y_A(),
            ...F && {
                fetch: q48()
            }
        };
    if (process.env.CLAUDE_CODE_USE_BEDROCK) {
        let W = D && process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION ? process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION : fp(),
            J = {
                ...I,
                awsRegion: W,
                ...process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH && {
                    skipAuth: !0
                }
            };
        if (process.env.AWS_BEARER_TOKEN_BEDROCK) J.skipAuth = !0, J.defaultHeaders = {
            ...J.defaultHeaders,
            Authorization: `Bearer ${process.env.AWS_BEARER_TOKEN_BEDROCK}`
        };
        else {
            let X = await d41();
            if (X) J.awsAccessKey = X.accessKeyId, J.awsSecretKey = X.secretAccessKey, J.awsSessionToken = X.sessionToken
        }
        return new zx1(J)
    }
    if (process.env.CLAUDE_CODE_USE_VERTEX) {
        let W = {
            ...I,
            region: jt0(Q),
            ...process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH && {
                googleAuth: {
                    getClient: () => ({
                        getRequestHeaders: () => ({})
                    })
                }
            }
        };
        return new Iv1(W)
    }
    let Y = {
        apiKey: KB() ? null : A || LY(Z),
        authToken: KB() ? CZ()?.accessToken : void 0,
        ...I
    };
    return new sP(Y)
}

function N48(A) {
    let B = process.env.ANTHROPIC_AUTH_TOKEN || Mu();
    if (B) A.Authorization = `Bearer ${B}`
}

function L48() {
    let A = {},
        B = process.env.ANTHROPIC_CUSTOM_HEADERS;
    if (!B) return A;
    let Q = B.split(/\n|\r\n/);
    for (let Z of Q) {
        if (!Z.trim()) continue;
        let D = Z.match(/^\s*(.*?)\s*:\s*(.*?)\s*$/);
        if (D) {
            let [, G, F] = D;
            if (G && F !== void 0) A[G] = F
        }
    }
    return A
}
async function OLB(A, B) {
    if (!A) return 0;
    return u$0([{
        role: "user",
        content: A
    }], B)
}
async function u$0(A, B) {
    try {
        if (!A || A.length === 0) return 0;
        let Q = AG(),
            Z = await y$({
                maxRetries: 1,
                model: Q,
                isNonInteractiveSession: B
            }),
            D = VV(Q);
        return (await Z.beta.messages.countTokens({
            model: Q,
            messages: A,
            ...D.length > 0 ? {
                betas: D
            } : {}
        })).input_tokens
    } catch (Q) {
        return R1(Q), null
    }
}

function zJ(A) {
    return Math.round(A.length / 4)
}
var M48 = 0.5;

function m$0() {
    return parseInt(process.env.MAX_MCP_OUTPUT_TOKENS ?? "25000", 10)
}

function R48(A) {
    return A.type === "text"
}

function O48(A) {
    return A.type === "image"
}

function T48(A) {
    if (!A) return 0;
    if (typeof A === "string") return zJ(A);
    return A.reduce((B, Q) => {
        if (R48(Q)) return B + zJ(Q.text);
        else if (O48(Q)) return B + 1600;
        return B
    }, 0)
}
class GG1 extends Error {
    constructor(A, B) {
        super(`MCP tool "${A}" response (${B} tokens) exceeds maximum allowed tokens (${m$0()}). Please use pagination, filtering, or limit parameters to reduce the response size.`);
        this.name = "MCPContentTooLargeError"
    }
}
async function d$0(A, B, Q) {
    if (!A) return;
    if (T48(A) <= m$0() * M48) return;
    try {
        let G = await u$0(typeof A === "string" ? [{
            role: "user",
            content: A
        }] : [{
            role: "user",
            content: A
        }], Q);
        if (G && G > m$0()) throw new GG1(B, G)
    } catch (D) {
        if (D instanceof GG1) throw D;
        R1(D instanceof Error ? D : new Error(String(D)))
    }
}
F31();
class c$0 {
    ws;
    started = !1;
    opened;
    constructor(A) {
        this.ws = A;
        this.opened = new Promise((B, Q) => {
            if (this.ws.readyState === aL.OPEN) B();
            else this.ws.on("open", () => {
                B()
            }), this.ws.on("error", (Z) => {
                Q(Z)
            })
        }), this.ws.on("message", this.onMessageHandler), this.ws.on("error", this.onErrorHandler), this.ws.on("close", this.onCloseHandler)
    }
    onclose;
    onerror;
    onmessage;
    onMessageHandler = (A) => {
        try {
            let B = JSON.parse(A.toString("utf-8")),
                Q = jM.parse(B);
            this.onmessage?.(Q)
        } catch (B) {
            this.onErrorHandler(B)
        }
    };
    onErrorHandler = (A) => {
        this.onerror?.(A instanceof Error ? A : new Error("Failed to process message"))
    };
    onCloseHandler = () => {
        this.onclose?.(), this.ws.off("message", this.onMessageHandler), this.ws.off("error", this.onErrorHandler), this.ws.off("close", this.onCloseHandler)
    };
    async start() {
        if (this.started) throw new Error("Start can only be called once per transport.");
        if (await this.opened, this.ws.readyState !== aL.OPEN) throw new Error("WebSocket is not open. Cannot start transport.");
        this.started = !0
    }
    async close() {
        if (this.ws.readyState === aL.OPEN || this.ws.readyState === aL.CONNECTING) this.ws.close();
        this.onCloseHandler()
    }
    async send(A) {
        if (this.ws.readyState !== aL.OPEN) throw new Error("WebSocket is not open. Cannot send message.");
        let B = JSON.stringify(A);
        try {
            await new Promise((Q, Z) => {
                this.ws.send(B, (D) => {
                    if (D) Z(D);
                    else Q()
                })
            })
        } catch (Q) {
            throw this.onErrorHandler(Q), Q
        }
    }
}
var oZ = G1(z1(), 1);
var FG1 = G1(z1(), 1);

function P5() {
    return FG1.createElement(OA, {
        height: 1
    }, FG1.createElement(T, {
        color: "error"
    }, "No (tell Claude what to do differently)"))
}
var TLB = "",
    PLB = "";
var oG1 = G1(z1(), 1),
    qSB = G1(z1(), 1);
var jLB = G1(z1(), 1);
var Yv1 = [],
    l$0 = {
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24
    },
    SLB = !1;

function P48() {
    if (SLB || !process.stdout.isTTY) return;
    SLB = !0, process.stdout.on("resize", () => {
        l$0 = {
            columns: process.stdout.columns || 80,
            rows: process.stdout.rows || 24
        }, Yv1.forEach((A) => A())
    })
}

function S48(A) {
    return P48(), Yv1.push(A), () => {
        Yv1 = Yv1.filter((B) => B !== A)
    }
}

function j48() {
    return l$0
}

function k48() {
    return l$0
}

function r9() {
    let A = rO1();
    return jLB.useSyncExternalStore(A ? () => () => {} : S48, j48, k48)
}
var SZ = "Bash";
var zv = "Glob",
    p$0 = `- Fast file pattern matching tool that works with any codebase size
- Supports glob patterns like "**/*.js" or "src/**/*.ts"
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files by name patterns
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
- You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.`;
var k7 = "Task";
var pM = "Grep";

function i$0() {
    return `A powerful search tool built on ripgrep

  Usage:
  - ALWAYS use ${pM} for search tasks. NEVER invoke \`grep\` or \`rg\` as a ${SZ} command. The ${pM} tool has been optimized for correct permissions and access.
  - Supports full regex syntax (e.g., "log.*Error", "function\\s+\\w+")
  - Filter files with glob parameter (e.g., "*.js", "**/*.tsx") or type parameter (e.g., "js", "py", "rust")
  - Output modes: "content" shows matching lines, "files_with_matches" shows only file paths (default), "count" shows match counts
  - Use ${k7} tool for open-ended searches requiring multiple rounds
  - Pattern syntax: Uses ripgrep (not grep) - literal braces need escaping (use \`interface\\{\\}\` to find \`interface{}\` in Go code)
  - Multiline matching: By default patterns match within single lines only. For cross-line patterns like \`struct \\{[\\s\\S]*?field\`, use \`multiline: true\`
`
}
var Ev = "LS",
    n$0 = "Lists files and directories in a given path. The path parameter must be an absolute path, not a relative path. You can optionally provide an array of glob patterns to ignore with the ignore parameter. You should generally prefer the Glob and Grep tools, if you know which directories to search.";
var Uv = "NotebookEdit";
var Wv1 = "MultiEdit",
    kLB = `This is a tool for making multiple edits to a single file in one operation. It is built on top of the ${eJ} tool and allows you to perform multiple find-and-replace operations efficiently. Prefer this tool over the ${eJ} tool when you need to make multiple edits to the same file.

Before using this tool:

1. Use the ${QG} tool to understand the file's contents and context
2. Verify the directory path is correct

To make multiple file edits, provide the following:
1. file_path: The absolute path to the file to modify (must be absolute, not relative)
2. edits: An array of edit operations to perform, where each edit contains:
   - old_string: The text to replace (must match the file contents exactly, including all whitespace and indentation)
   - new_string: The edited text to replace the old_string
   - replace_all: Replace all occurences of old_string. This parameter is optional and defaults to false.

IMPORTANT:
- All edits are applied in sequence, in the order they are provided
- Each edit operates on the result of the previous edit
- All edits must be valid for the operation to succeed - if any edit fails, none will be applied
- This tool is ideal when you need to make several changes to different parts of the same file
- For Jupyter notebooks (.ipynb files), use the ${Uv} instead

CRITICAL REQUIREMENTS:
1. All edits follow the same requirements as the single Edit tool
2. The edits are atomic - either all succeed or none are applied
3. Plan your edits carefully to avoid conflicts between sequential operations

WARNING:
- The tool will fail if edits.old_string doesn't match the file contents exactly (including whitespace)
- The tool will fail if edits.old_string and edits.new_string are the same
- Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are trying to find

When making edits:
- Ensure all edits result in idiomatic, correct code
- Do not leave the code in a broken state
- Always use absolute file paths (starting with /)
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- Use replace_all for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.

If you want to create a new file, use:
- A new file path, including dir name if needed
- First edit: empty old_string and the new file's contents as new_string
- Subsequent edits: normal edit operations on the created content`;
var wv = "Write";
var yLB = `Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.
- If this is an existing file, you MUST use the ${QG} tool first to read the file's contents. This tool will fail if you did not read the file first.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.`;
var VS = "WebFetch",
    _LB = `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions. All MCP-provided tools start with "mcp__".
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
  - When a URL redirects to a different host, the tool will inform you and provide the redirect URL in a special format. You should then make a new WebFetch request with the redirect URL to fetch the content.
`;

function xLB(A, B) {
    return `
Web page content:
---
${A}
---

${B}

Provide a concise response based only on the content above. In your response:
 - Enforce a strict 125-character maximum for quotes from any source document. Open Source Software is ok as long as we respect the license.
 - Use quotation marks for exact language from articles; any language outside of the quotation should never be word-for-word the same.
 - You are not a lawyer and never comment on the legality of your own prompts and responses.
 - Never produce or reproduce exact song lyrics.
`
}
var Jv1 = "WebSearch",
    vLB = `
- Allows Claude to search the web and use the results to inform responses
- Provides up-to-date information for current events and recent data
- Returns search result information formatted as search result blocks
- Use this tool for accessing information beyond Claude's knowledge cutoff
- Searches are performed automatically within a single API call

Usage notes:
  - Domain filtering is supported to include or block specific websites
  - Web search is only available in the US
  - Account for "Today's date" in <env>. For example, if <env> says "Today's date: 2025-07-01", and the user wants the latest docs, do not use 2024 in the search query. Use 2025.
`;
var bLB = 20,
    fLB = 3,
    hLB = 20,
    gLB = 3,
    y48 = [SZ, zv, pM, Ev, QG, VS, Jv1],
    _48 = [eJ, Wv1, wv, Uv];

function uLB() {
    return
}
import {
    randomUUID as oN0
} from "crypto";

function mLB() {
    return "You are Claude Code, Anthropic's official CLI for Claude."
}
import {
    createHash as nF8
} from "crypto";
import {
    EOL as Wb1
} from "os";
import {
    isAbsolute as iG8,
    resolve as nG8
} from "path";
var _7 = G1(z1(), 1);
var CS = G1(z1(), 1);
var a$0 = 10;

function f6({
    result: A,
    verbose: B
}) {
    let Q;
    if (typeof A !== "string") Q = "Error";
    else {
        let G = (l4(A, "tool_use_error") ?? A).trim();
        if (!B && G.includes("InputValidationError: ")) Q = "Invalid tool parameters";
        else if (G.startsWith("Error: ")) Q = G;
        else Q = `Error: ${G}`
    }
    let Z = Q.split(`
`).length - a$0;
    return CS.createElement(OA, null, CS.createElement(v, {
        flexDirection: "column"
    }, CS.createElement(T, {
        color: "error"
    }, Xv1(B ? Q : Q.split(`
`).slice(0, a$0).join(`
`))), !B && Q.split(`
`).length > a$0 && CS.createElement(T, {
        color: "secondaryText"
    }, "… +", Z, " ", Z === 1 ? "line" : "lines", " (", e1.bold("ctrl+r"), " to see all)")))
}
import {
    createHash as E68
} from "crypto";
import {
    join as PMB
} from "path";
var dLB = "https://claude.ai/code";
var Vv1 = G1(gw(), 1);
import {
    constants as x48
} from "fs";
import * as cLB from "os";
import * as lLB from "path";