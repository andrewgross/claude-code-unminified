/* chunk:583 bytes:[13516571, 13526381) size:9810 source:unpacked-cli.js */
async function YjB(A, B, Q, Z) {
    IjB(A, B), X1("tengu_mcp_oauth_flow_start", {
        isOAuthFlow: !0
    });
    let D = await WW8(),
        G = `http://localhost:${D}/callback`;
    IB(A, `Using redirect port: ${D}`);
    let F = new Nd(A, B, G, !0),
        I, Y = await F.state(),
        W = null,
        J = null,
        X = () => {
            if (W) W.close(), W = null;
            if (J) clearTimeout(J), J = null;
            IB(A, "MCP OAuth server cleaned up")
        },
        V = await new Promise((C, K) => {
            if (Z) {
                let H = () => {
                    X(), K(new bb1)
                };
                if (Z.aborted) {
                    H();
                    return
                }
                Z.addEventListener("abort", H)
            }
            W = IL0((H, z) => {
                let $ = ZW8(H.url || "", !0);
                if ($.pathname === "/callback") {
                    let L = $.query.code,
                        N = $.query.state,
                        R = $.query.error,
                        O = $.query.error_description,
                        P = $.query.error_uri;
                    if (!R && N !== Y) {
                        z.writeHead(400, {
                            "Content-Type": "text/html"
                        }), z.end("<h1>Authentication Error</h1><p>Invalid state parameter. Please try again.</p><p>You can close this window.</p>"), X(), K(new Error("OAuth state mismatch - possible CSRF attack"));
                        return
                    }
                    if (R) {
                        z.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        let j = YL0.default(String(R)),
                            f = O ? YL0.default(String(O)) : "";
                        z.end(`<h1>Authentication Error</h1><p>${j}: ${f}</p><p>You can close this window.</p>`), X();
                        let k = `OAuth error: ${R}`;
                        if (O) k += ` - ${O}`;
                        if (P) k += ` (See: ${P})`;
                        K(new Error(k));
                        return
                    }
                    if (L) z.writeHead(200, {
                        "Content-Type": "text/html"
                    }), z.end("<h1>Authentication Successful</h1><p>You can close this window. Return to Claude Code.</p>"), X(), C(L)
                }
            }), W.listen(D, async () => {
                try {
                    IB(A, "Starting SDK auth"), IB(A, `Server URL: ${B.url}`);
                    let H = await q$(F, {
                        serverUrl: B.url
                    });
                    if (IB(A, `Initial auth result: ${H}`), I = F.authorizationUrl, I) Q(I);
                    if (H !== "REDIRECT") IB(A, `Unexpected auth result, expected REDIRECT: ${H}`)
                } catch (H) {
                    IB(A, `SDK auth error: ${H}`), X(), K(H)
                }
            }), J = setTimeout(() => {
                X(), K(new Error("Authentication timeout"))
            }, 300000)
        });
    try {
        IB(A, "Completing auth flow with authorization code");
        let C = await q$(F, {
            serverUrl: B.url,
            authorizationCode: V
        });
        if (IB(A, `Auth result: ${C}`), C === "AUTHORIZED") {
            let K = await F.tokens();
            if (IB(A, `Tokens after auth: ${K?"Present":"Missing"}`), K) IB(A, `Token access_token length: ${K.access_token?.length}`), IB(A, `Token expires_in: ${K.expires_in}`);
            X1("tengu_mcp_oauth_flow_success", {})
        } else throw new Error("Unexpected auth result: " + C)
    } catch (C) {
        if (IB(A, `Error during auth completion: ${C}`), J9.isAxiosError(C)) try {
            let K = gZB.parse(C.response?.data);
            if (K.error === "invalid_client" && K.error_description?.includes("Client not found")) {
                let H = wK(),
                    z = H.read() || {},
                    $ = qd(A, B);
                if (z.mcpOAuth?.[$]) delete z.mcpOAuth[$].clientId, delete z.mcpOAuth[$].clientSecret, H.update(z)
            }
        } catch {}
        throw X1("tengu_mcp_oauth_flow_error", {}), C
    }
}
class Nd {
    serverName;
    serverConfig;
    redirectUri;
    handleRedirection;
    _codeVerifier;
    _authorizationUrl;
    _state;
    constructor(A, B, Q = IW8, Z = !1) {
        this.serverName = A, this.serverConfig = B, this.redirectUri = Q, this.handleRedirection = Z
    }
    get redirectUrl() {
        return this.redirectUri
    }
    get authorizationUrl() {
        return this._authorizationUrl
    }
    get clientMetadata() {
        return {
            client_name: `Claude Code (${this.serverName})`,
            redirect_uris: [this.redirectUri],
            grant_types: ["authorization_code", "refresh_token"],
            response_types: ["code"],
            token_endpoint_auth_method: "none"
        }
    }
    async state() {
        if (!this._state) this._state = GW8(32).toString("base64url"), IB(this.serverName, "Generated new OAuth state");
        return this._state
    }
    async clientInformation() {
        let B = wK().read(),
            Q = qd(this.serverName, this.serverConfig),
            Z = B?.mcpOAuth?.[Q];
        if (Z?.clientId) return IB(this.serverName, "Found client info"), {
            client_id: Z.clientId,
            client_secret: Z.clientSecret
        };
        IB(this.serverName, "No client info found");
        return
    }
    async saveClientInformation(A) {
        let B = wK(),
            Q = B.read() || {},
            Z = qd(this.serverName, this.serverConfig),
            D = {
                ...Q,
                mcpOAuth: {
                    ...Q.mcpOAuth,
                    [Z]: {
                        ...Q.mcpOAuth?.[Z],
                        serverName: this.serverName,
                        serverUrl: this.serverConfig.url,
                        clientId: A.client_id,
                        clientSecret: A.client_secret,
                        accessToken: Q.mcpOAuth?.[Z]?.accessToken || "",
                        expiresAt: Q.mcpOAuth?.[Z]?.expiresAt || 0
                    }
                }
            };
        B.update(D)
    }
    async tokens() {
        let B = wK().read(),
            Q = qd(this.serverName, this.serverConfig),
            Z = B?.mcpOAuth?.[Q];
        if (!Z) {
            IB(this.serverName, "No token data found");
            return
        }
        let D = (Z.expiresAt - Date.now()) / 1000;
        if (D <= 0 && !Z.refreshToken) {
            IB(this.serverName, "Token expired without refresh token");
            return
        }
        let G = {
            access_token: Z.accessToken,
            refresh_token: Z.refreshToken,
            expires_in: D,
            scope: Z.scope,
            token_type: "Bearer"
        };
        if (IB(this.serverName, "Returning tokens"), IB(this.serverName, `Token length: ${G.access_token?.length}`), IB(this.serverName, `Has refresh token: ${!!G.refresh_token}`), IB(this.serverName, `Expires in: ${G.expires_in}`), D <= 60) IB(this.serverName, "Token is expired or about to expire - SDK should refresh");
        return G
    }
    async saveTokens(A) {
        let B = wK(),
            Q = B.read() || {},
            Z = qd(this.serverName, this.serverConfig);
        IB(this.serverName, "Saving tokens"), IB(this.serverName, `Token expires in: ${A.expires_in}`), IB(this.serverName, `Has refresh token: ${!!A.refresh_token}`);
        let D = {
            ...Q,
            mcpOAuth: {
                ...Q.mcpOAuth,
                [Z]: {
                    ...Q.mcpOAuth?.[Z],
                    serverName: this.serverName,
                    serverUrl: this.serverConfig.url,
                    accessToken: A.access_token,
                    refreshToken: A.refresh_token,
                    expiresAt: Date.now() + (A.expires_in || 3600) * 1000,
                    scope: A.scope
                }
            }
        };
        B.update(D)
    }
    async redirectToAuthorization(A) {
        if (this._authorizationUrl = A.toString(), !this.handleRedirection) {
            IB(this.serverName, "Redirection handling is disabled, skipping redirect");
            return
        }
        let B = A.toString();
        if (!B.startsWith("http://") && !B.startsWith("https://")) throw new Error("Invalid authorization URL: must use http:// or https:// scheme");
        if (IB(this.serverName, "Redirecting to authorization URL"), IB(this.serverName, `Authorization URL: ${B}`), IB(this.serverName, `Opening authorization URL: ${B}`), !await ZU(B)) process.stdout.write(`
Couldn't open browser automatically. Please manually open the URL above in your browser.
`)
    }
    async saveCodeVerifier(A) {
        IB(this.serverName, "Saving code verifier"), this._codeVerifier = A
    }
    async codeVerifier() {
        if (!this._codeVerifier) throw IB(this.serverName, "No code verifier saved"), new Error("No code verifier saved");
        return IB(this.serverName, "Returning code verifier"), this._codeVerifier
    }
}
var JW8 = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

function XW8() {
    return parseInt(process.env.MCP_TOOL_TIMEOUT || "", 10) || 1e8
}

function WjB() {
    return parseInt(process.env.MCP_TIMEOUT || "", 10) || 30000
}

function VW8() {
    return parseInt(process.env.MCP_SERVER_CONNECTION_BATCH_SIZE || "", 10) || 3
}
var CW8 = ["mcp__ide__executeCode", "mcp__ide__getDiagnostics"];

function KW8(A) {
    return !A.name.startsWith("mcp__ide__") || CW8.includes(A.name)
}

function JjB(A, B) {
    return `${A}-${JSON.stringify(B)}`
}