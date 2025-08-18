/* chunk:582 bytes:[13500204, 13516570) size:16366 source:unpacked-cli.js */
function yI8(A) {
    try {
        let B = JSON.parse(A);
        return JSON.stringify(B, null, 2)
    } catch {
        return A
    }
}

function $SB(A) {
    return A.split(`
`).map(yI8).join(`
`)
}

function IC({
    content: A,
    verbose: B,
    isError: Q
}) {
    let {
        columns: Z
    } = r9(), D = qSB.useMemo(() => {
        if (B) return Xv1($SB(A));
        else return Xv1(wSB($SB(A), Z))
    }, [A, B, Z]);
    return oG1.createElement(OA, null, oG1.createElement(T, {
        color: Q ? "error" : void 0
    }, D))
}

function Xv1(A) {
    return A.replace(/\u001b\[([0-9]+;)*4(;[0-9]+)*m|\u001b\[4(;[0-9]+)*m|\u001b\[([0-9]+;)*4m/g, "")
}
var _I8 = h.object({}).passthrough(),
    KC3 = h.string().describe("MCP tool execution result"),
    NSB = {
        isMcp: !0,
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !1
        },
        isReadOnly() {
            return !1
        },
        isDestructive() {
            return !1
        },
        isOpenWorld() {
            return !1
        },
        name: "mcp",
        async description() {
            return PLB
        },
        async prompt() {
            return TLB
        },
        inputSchema: _I8,
        async * call() {
            yield {
                type: "result",
                data: ""
            }
        },
        async checkPermissions() {
            return {
                behavior: "passthrough",
                message: "MCPTool requires permission.",
                ruleSuggestions: []
            }
        },
        renderToolUseMessage(A) {
            if (Object.keys(A).length === 0) return null;
            return Object.entries(A).map(([B, Q]) => `${B}: ${JSON.stringify(Q)}`).join(", ")
        },
        userFacingName: () => "mcp",
        renderToolUseRejectedMessage() {
            return oZ.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return oZ.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, {
            verbose: Q
        }) {
            if (Array.isArray(A)) return oZ.createElement(v, {
                flexDirection: "column"
            }, A.map((Z, D) => {
                if (Z.type === "image") return oZ.createElement(v, {
                    key: D,
                    justifyContent: "space-between",
                    overflowX: "hidden",
                    width: "100%"
                }, oZ.createElement(OA, {
                    height: 1
                }, oZ.createElement(T, null, "[Image]")));
                return oZ.createElement(IC, {
                    key: D,
                    content: Z.text,
                    verbose: Q
                })
            }));
            if (!A) return oZ.createElement(v, {
                justifyContent: "space-between",
                overflowX: "hidden",
                width: "100%"
            }, oZ.createElement(OA, {
                height: 1
            }, oZ.createElement(T, {
                color: "secondaryText"
            }, "(No content)")));
            return oZ.createElement(IC, {
                content: A,
                verbose: Q
            })
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: A
            }
        }
    };
var MX = G1(z1(), 1);
var LSB = `
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`
`,
    MSB = `
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
`;
var xI8 = h.object({
        server: h.string().optional().describe("Optional server name to filter resources by")
    }),
    RC3 = h.array(h.object({
        uri: h.string().describe("Resource URI"),
        name: h.string().describe("Resource name"),
        mimeType: h.string().optional().describe("MIME type of the resource"),
        description: h.string().optional().describe("Resource description"),
        server: h.string().describe("Server that provides this resource")
    })),
    C01 = {
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        name: "ListMcpResourcesTool",
        async description() {
            return LSB
        },
        async prompt() {
            return MSB
        },
        inputSchema: xI8,
        async * call(A, {
            options: {
                mcpClients: B
            }
        }) {
            let Q = [],
                {
                    server: Z
                } = A,
                D = Z ? B.filter((G) => G.name === Z) : B;
            if (Z && D.length === 0) throw new Error(`Server "${Z}" not found. Available servers: ${B.map((G)=>G.name).join(", ")}`);
            for (let G of D) {
                if (G.type !== "connected") continue;
                let F = G;
                try {
                    if (!F.capabilities?.resources) continue;
                    let I = await F.client.request({
                        method: "resources/list"
                    }, xm);
                    if (!I.resources) continue;
                    let Y = I.resources.map((W) => ({
                        ...W,
                        server: G.name
                    }));
                    Q.push(...Y)
                } catch (I) {
                    XG(G.name, `Failed to fetch resources: ${I instanceof Error?I.message:String(I)}`)
                }
            }
            yield {
                type: "result",
                data: Q
            }
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        renderToolUseMessage(A) {
            return A.server ? `List MCP resources from server "${A.server}"` : "List all MCP resources"
        },
        userFacingName: () => "listMcpResources",
        renderToolUseRejectedMessage() {
            return MX.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return MX.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, {
            verbose: Q
        }) {
            if (!A || A.length === 0) return MX.createElement(v, {
                justifyContent: "space-between",
                overflowX: "hidden",
                width: "100%"
            }, MX.createElement(v, {
                flexDirection: "row"
            }, MX.createElement(T, null, "  ⎿  "), MX.createElement(T, {
                color: "secondaryText"
            }, "(No resources found)")));
            let Z = JSON.stringify(A, null, 2);
            return MX.createElement(IC, {
                content: Z,
                verbose: Q
            })
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: JSON.stringify(A)
            }
        }
    };
var oK = G1(z1(), 1);
var RSB = `
Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: \`readMcpResource({ server: "myserver", uri: "my-resource-uri" })\`
`,
    OSB = `
Reads a specific resource from an MCP server, identified by server name and resource URI.

Parameters:
- server (required): The name of the MCP server from which to read the resource
- uri (required): The URI of the resource to read
`;
var vI8 = h.object({
        server: h.string().describe("The MCP server name"),
        uri: h.string().describe("The resource URI to read")
    }),
    bC3 = h.object({
        contents: h.array(h.object({
            uri: h.string().describe("Resource URI"),
            mimeType: h.string().optional().describe("MIME type of the content"),
            text: h.string().optional().describe("Text content of the resource")
        }))
    }),
    K01 = {
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        name: "ReadMcpResourceTool",
        async description() {
            return RSB
        },
        async prompt() {
            return OSB
        },
        inputSchema: vI8,
        async * call(A, {
            options: {
                mcpClients: B
            }
        }) {
            let {
                server: Q,
                uri: Z
            } = A, D = B.find((I) => I.name === Q);
            if (!D) throw new Error(`Server "${Q}" not found. Available servers: ${B.map((I)=>I.name).join(", ")}`);
            if (D.type !== "connected") throw new Error(`Server "${Q}" is not connected`);
            let G = D;
            if (!G.capabilities?.resources) throw new Error(`Server "${Q}" does not support resources`);
            yield {
                type: "result",
                data: await G.client.request({
                    method: "resources/read",
                    params: {
                        uri: Z
                    }
                }, BD1)
            }
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        renderToolUseMessage(A) {
            if (!A.uri || !A.server) return null;
            return `Read resource "${A.uri}" from server "${A.server}"`
        },
        userFacingName: () => "readMcpResource",
        renderToolUseRejectedMessage() {
            return oK.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return oK.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, {
            verbose: Q
        }) {
            if (!A || !A.contents || A.contents.length === 0) return oK.createElement(v, {
                justifyContent: "space-between",
                overflowX: "hidden",
                width: "100%"
            }, oK.createElement(OA, {
                height: 1
            }, oK.createElement(T, {
                color: "secondaryText"
            }, "(No content)")));
            let Z = JSON.stringify(A, null, 2);
            return oK.createElement(IC, {
                content: Z,
                verbose: Q
            })
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: JSON.stringify(A)
            }
        }
    };
import {
    createServer as IL0
} from "http";
import {
    parse as ZW8
} from "url";

function bI8(A) {
    let B;
    try {
        B = new URL(A)
    } catch (Q) {
        throw new Error(`Invalid URL format: ${A}`)
    }
    if (B.protocol !== "http:" && B.protocol !== "https:") throw new Error(`Invalid URL protocol: must use http:// or https://, got ${B.protocol}`)
}
async function ZU(A) {
    try {
        bI8(A);
        let B = process.env.BROWSER,
            Q = process.platform;
        if (Q === "win32") {
            if (B) {
                let {
                    code: D
                } = await F2(B, [`"${A}"`]);
                return D === 0
            }
            let {
                code: Z
            } = await F2("rundll32", ["url,OpenURL", A], {});
            return Z === 0
        } else {
            let Z = B || (Q === "darwin" ? "open" : "xdg-open"),
                {
                    code: D
                } = await F2(Z, [A]);
            return D === 0
        }
    } catch (B) {
        return !1
    }
}
var YL0 = G1(GjB(), 1);
import {
    createHash as DW8,
    randomBytes as GW8
} from "crypto";
class bb1 extends Error {
    constructor() {
        super("Authentication was cancelled");
        this.name = "AuthenticationCancelledError"
    }
}
var FW8 = L9() === "windows" ? {
        min: 39152,
        max: 49151
    } : {
        min: 49152,
        max: 65535
    },
    FjB = 3118,
    IW8 = "http://localhost:3118/callback";

function YW8() {
    let A = parseInt(process.env.MCP_OAUTH_CALLBACK_PORT || "", 10);
    return A > 0 ? A : void 0
}
async function WW8() {
    let A = YW8();
    if (A) return A;
    let {
        min: B,
        max: Q
    } = FW8, Z = Q - B + 1, D = Math.min(Z, 100);
    for (let G = 0; G < D; G++) {
        let F = B + Math.floor(Math.random() * Z);
        try {
            return await new Promise((I, Y) => {
                let W = IL0();
                W.once("error", Y), W.listen(F, () => {
                    W.close(() => I())
                })
            }), F
        } catch {
            continue
        }
    }
    try {
        return await new Promise((G, F) => {
            let I = IL0();
            I.once("error", F), I.listen(FjB, () => {
                I.close(() => G())
            })
        }), FjB
    } catch {
        throw new Error("No available ports for OAuth redirect")
    }
}

function qd(A, B) {
    let Q = JSON.stringify({
            type: B.type,
            url: B.url,
            headers: B.headers || {}
        }),
        Z = DW8("sha256").update(Q).digest("hex").substring(0, 16);
    return `${A}|${Z}`
}
async function WL0(A, B) {
    let Z = wK().read();
    if (!Z?.mcpOAuth) return;
    let D = qd(A, B),
        G = Z.mcpOAuth[D];
    if (!G?.accessToken) {
        IB(A, "No tokens to revoke");
        return
    }
    try {
        let F = await Iz0(B.url);
        if (!F?.revocation_endpoint) {
            IB(A, "Server does not support token revocation");
            return
        }
        IB(A, "Revoking tokens on server"), IB(A, `Revocation endpoint: ${F.revocation_endpoint}`);
        let I = new URLSearchParams;
        if (I.set("token", G.accessToken), I.set("token_type_hint", "access_token"), G.clientId) I.set("client_id", G.clientId);
        if (await J9.post(F.revocation_endpoint, I, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${G.accessToken}`
                }
            }), IB(A, "Successfully revoked access token"), G.refreshToken) {
            let Y = new URLSearchParams;
            if (Y.set("token", G.refreshToken), Y.set("token_type_hint", "refresh_token"), G.clientId) Y.set("client_id", G.clientId);
            await J9.post(F.revocation_endpoint, Y, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${G.accessToken}`
                }
            }), IB(A, "Successfully revoked refresh token")
        }
    } catch (F) {
        if (J9.isAxiosError(F) && F.response) IB(A, `Failed to revoke tokens on server: ${F.message}, Status: ${F.response.status}, Data: ${JSON.stringify(F.response.data)}`);
        else IB(A, `Failed to revoke tokens on server: ${F}`)
    }
    IjB(A, B)
}

function IjB(A, B) {
    let Q = wK(),
        Z = Q.read();
    if (!Z?.mcpOAuth) return;
    let D = qd(A, B);
    if (Z.mcpOAuth[D]) delete Z.mcpOAuth[D], Q.update(Z), IB(A, "Cleared stored tokens")
}