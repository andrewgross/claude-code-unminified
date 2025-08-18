/* chunk:553 bytes:[12934091, 12950139) size:16048 source:unpacked-cli.js */
function dZB({
    requestedResource: A,
    configuredResource: B
}) {
    let Q = typeof A === "string" ? new URL(A) : new URL(A.href),
        Z = typeof B === "string" ? new URL(B) : new URL(B.href);
    if (Q.origin !== Z.origin) return !1;
    if (Q.pathname.length < Z.pathname.length) return !1;
    let D = Q.pathname.endsWith("/") ? Q.pathname : Q.pathname + "/",
        G = Z.pathname.endsWith("/") ? Z.pathname : Z.pathname + "/";
    return D.startsWith(G)
}
class nK extends Error {
    constructor(A) {
        super(A !== null && A !== void 0 ? A : "Unauthorized")
    }
}
async function q$(A, {
    serverUrl: B,
    authorizationCode: Q,
    scope: Z,
    resourceMetadataUrl: D
}) {
    let G, F = B;
    try {
        if (G = await Ix6(B, {
                resourceMetadataUrl: D
            }), G.authorization_servers && G.authorization_servers.length > 0) F = G.authorization_servers[0]
    } catch (K) {}
    let I = await Fx6(B, A, G),
        Y = await Iz0(F),
        W = await Promise.resolve(A.clientInformation());
    if (!W) {
        if (Q !== void 0) throw new Error("Existing OAuth client information is required when exchanging an authorization code");
        if (!A.saveClientInformation) throw new Error("OAuth client information must be saveable for dynamic registration");
        let K = await Cx6(F, {
            metadata: Y,
            clientMetadata: A.clientMetadata
        });
        await A.saveClientInformation(K), W = K
    }
    if (Q !== void 0) {
        let K = await A.codeVerifier(),
            H = await Xx6(F, {
                metadata: Y,
                clientInformation: W,
                authorizationCode: Q,
                codeVerifier: K,
                redirectUri: A.redirectUrl,
                resource: I
            });
        return await A.saveTokens(H), "AUTHORIZED"
    }
    let J = await A.tokens();
    if (J === null || J === void 0 ? void 0 : J.refresh_token) try {
        let K = await Vx6(F, {
            metadata: Y,
            clientInformation: W,
            refreshToken: J.refresh_token,
            resource: I
        });
        return await A.saveTokens(K), "AUTHORIZED"
    } catch (K) {}
    let X = A.state ? await A.state() : void 0,
        {
            authorizationUrl: V,
            codeVerifier: C
        } = await Jx6(F, {
            metadata: Y,
            clientInformation: W,
            state: X,
            redirectUrl: A.redirectUrl,
            scope: Z || A.clientMetadata.scope,
            resource: I
        });
    return await A.saveCodeVerifier(C), await A.redirectToAuthorization(V), "REDIRECT"
}
async function Fx6(A, B, Q) {
    let Z = mZB(A);
    if (B.validateResourceURL) return await B.validateResourceURL(Z, Q === null || Q === void 0 ? void 0 : Q.resource);
    if (!Q) return;
    if (!dZB({
            requestedResource: Z,
            configuredResource: Q.resource
        })) throw new Error(`Protected resource ${Q.resource} does not match expected ${Z} (or origin)`);
    return new URL(Q.resource)
}

function XD1(A) {
    let B = A.headers.get("WWW-Authenticate");
    if (!B) return;
    let [Q, Z] = B.split(" ");
    if (Q.toLowerCase() !== "bearer" || !Z) return;
    let G = /resource_metadata="([^"]*)"/.exec(B);
    if (!G) return;
    try {
        return new URL(G[1])
    } catch (F) {
        return
    }
}
async function Ix6(A, B) {
    var Q;
    let Z;
    if (B === null || B === void 0 ? void 0 : B.resourceMetadataUrl) Z = new URL(B === null || B === void 0 ? void 0 : B.resourceMetadataUrl);
    else Z = new URL("/.well-known/oauth-protected-resource", A);
    let D;
    try {
        D = await fetch(Z, {
            headers: {
                "MCP-Protocol-Version": (Q = B === null || B === void 0 ? void 0 : B.protocolVersion) !== null && Q !== void 0 ? Q : cx
            }
        })
    } catch (G) {
        if (G instanceof TypeError) D = await fetch(Z);
        else throw G
    }
    if (D.status === 404) throw new Error("Resource server does not implement OAuth 2.0 Protected Resource Metadata.");
    if (!D.ok) throw new Error(`HTTP ${D.status} trying to load well-known OAuth protected resource metadata.`);
    return fZB.parse(await D.json())
}
async function lZB(A, B) {
    try {
        return await fetch(A, {
            headers: B
        })
    } catch (Q) {
        if (Q instanceof TypeError)
            if (B) return lZB(A);
            else return;
        throw Q
    }
}

function Yx6(A) {
    let B = `/.well-known/oauth-authorization-server${A}`;
    if (A.endsWith("/")) B = B.slice(0, -1);
    return B
}
async function cZB(A, B) {
    return await lZB(A, {
        "MCP-Protocol-Version": B
    })
}

function Wx6(A, B) {
    return !A || A.status === 404 && B !== "/"
}
async function Iz0(A, B) {
    var Q;
    let Z = new URL(A),
        D = (Q = B === null || B === void 0 ? void 0 : B.protocolVersion) !== null && Q !== void 0 ? Q : cx,
        G = Yx6(Z.pathname),
        F = new URL(G, Z),
        I = await cZB(F, D);
    if (Wx6(I, Z.pathname)) {
        let Y = new URL("/.well-known/oauth-authorization-server", Z);
        I = await cZB(Y, D)
    }
    if (!I || I.status === 404) return;
    if (!I.ok) throw new Error(`HTTP ${I.status} trying to load well-known OAuth metadata`);
    return hZB.parse(await I.json())
}
async function Jx6(A, {
    metadata: B,
    clientInformation: Q,
    redirectUrl: Z,
    scope: D,
    state: G,
    resource: F
}) {
    let W;
    if (B) {
        if (W = new URL(B.authorization_endpoint), !B.response_types_supported.includes("code")) throw new Error("Incompatible auth server: does not support response type code");
        if (!B.code_challenge_methods_supported || !B.code_challenge_methods_supported.includes("S256")) throw new Error("Incompatible auth server: does not support code challenge method S256")
    } else W = new URL("/authorize", A);
    let J = await Gz0(),
        X = J.code_verifier,
        V = J.code_challenge;
    if (W.searchParams.set("response_type", "code"), W.searchParams.set("client_id", Q.client_id), W.searchParams.set("code_challenge", V), W.searchParams.set("code_challenge_method", "S256"), W.searchParams.set("redirect_uri", String(Z)), G) W.searchParams.set("state", G);
    if (D) W.searchParams.set("scope", D);
    if (F) W.searchParams.set("resource", F.href);
    return {
        authorizationUrl: W,
        codeVerifier: X
    }
}
async function Xx6(A, {
    metadata: B,
    clientInformation: Q,
    authorizationCode: Z,
    codeVerifier: D,
    redirectUri: G,
    resource: F
}) {
    let Y;
    if (B) {
        if (Y = new URL(B.token_endpoint), B.grant_types_supported && !B.grant_types_supported.includes("authorization_code")) throw new Error("Incompatible auth server: does not support grant type authorization_code")
    } else Y = new URL("/token", A);
    let W = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: Q.client_id,
        code: Z,
        code_verifier: D,
        redirect_uri: String(G)
    });
    if (Q.client_secret) W.set("client_secret", Q.client_secret);
    if (F) W.set("resource", F.href);
    let J = await fetch(Y, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: W
    });
    if (!J.ok) throw new Error(`Token exchange failed: HTTP ${J.status}`);
    return Fz0.parse(await J.json())
}
async function Vx6(A, {
    metadata: B,
    clientInformation: Q,
    refreshToken: Z,
    resource: D
}) {
    let F;
    if (B) {
        if (F = new URL(B.token_endpoint), B.grant_types_supported && !B.grant_types_supported.includes("refresh_token")) throw new Error("Incompatible auth server: does not support grant type refresh_token")
    } else F = new URL("/token", A);
    let I = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: Q.client_id,
        refresh_token: Z
    });
    if (Q.client_secret) I.set("client_secret", Q.client_secret);
    if (D) I.set("resource", D.href);
    let Y = await fetch(F, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: I
    });
    if (!Y.ok) throw new Error(`Token refresh failed: HTTP ${Y.status}`);
    return Fz0.parse({
        refresh_token: Z,
        ...await Y.json()
    })
}
async function Cx6(A, {
    metadata: B,
    clientMetadata: Q
}) {
    let Z;
    if (B) {
        if (!B.registration_endpoint) throw new Error("Incompatible auth server: does not support dynamic client registration");
        Z = new URL(B.registration_endpoint)
    } else Z = new URL("/register", A);
    let D = await fetch(Z, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Q)
    });
    if (!D.ok) throw new Error(`Dynamic client registration failed: HTTP ${D.status}`);
    return uZB.parse(await D.json())
}
class pZB extends Error {
    constructor(A, B, Q) {
        super(`SSE error: ${B}`);
        this.code = A, this.event = Q
    }
}
class Zy1 {
    constructor(A, B) {
        this._url = A, this._resourceMetadataUrl = void 0, this._eventSourceInit = B === null || B === void 0 ? void 0 : B.eventSourceInit, this._requestInit = B === null || B === void 0 ? void 0 : B.requestInit, this._authProvider = B === null || B === void 0 ? void 0 : B.authProvider, this._fetch = B === null || B === void 0 ? void 0 : B.fetch
    }
    async _authThenStart() {
        var A;
        if (!this._authProvider) throw new nK("No auth provider");
        let B;
        try {
            B = await q$(this._authProvider, {
                serverUrl: this._url,
                resourceMetadataUrl: this._resourceMetadataUrl
            })
        } catch (Q) {
            throw (A = this.onerror) === null || A === void 0 || A.call(this, Q), Q
        }
        if (B !== "AUTHORIZED") throw new nK;
        return await this._startOrAuth()
    }
    async _commonHeaders() {
        var A;
        let B = {
            ...(A = this._requestInit) === null || A === void 0 ? void 0 : A.headers
        };
        if (this._authProvider) {
            let Q = await this._authProvider.tokens();
            if (Q) B.Authorization = `Bearer ${Q.access_token}`
        }
        if (this._protocolVersion) B["mcp-protocol-version"] = this._protocolVersion;
        return B
    }
    _startOrAuth() {
        var A, B, Q;
        let Z = (Q = (B = (A = this === null || this === void 0 ? void 0 : this._eventSourceInit) === null || A === void 0 ? void 0 : A.fetch) !== null && B !== void 0 ? B : this._fetch) !== null && Q !== void 0 ? Q : fetch;
        return new Promise((D, G) => {
            this._eventSource = new ce(this._url.href, {
                ...this._eventSourceInit,
                fetch: async (F, I) => {
                    let Y = await this._commonHeaders(),
                        W = await Z(F, {
                            ...I,
                            headers: new Headers({
                                ...Y,
                                Accept: "text/event-stream"
                            })
                        });
                    if (W.status === 401 && W.headers.has("www-authenticate")) this._resourceMetadataUrl = XD1(W);
                    return W
                }
            }), this._abortController = new AbortController, this._eventSource.onerror = (F) => {
                var I;
                if (F.code === 401 && this._authProvider) {
                    this._authThenStart().then(D, G);
                    return
                }
                let Y = new pZB(F.code, F.message, F);
                G(Y), (I = this.onerror) === null || I === void 0 || I.call(this, Y)
            }, this._eventSource.onopen = () => {}, this._eventSource.addEventListener("endpoint", (F) => {
                var I;
                let Y = F;
                try {
                    if (this._endpoint = new URL(Y.data, this._url), this._endpoint.origin !== this._url.origin) throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`)
                } catch (W) {
                    G(W), (I = this.onerror) === null || I === void 0 || I.call(this, W), this.close();
                    return
                }
                D()
            }), this._eventSource.onmessage = (F) => {
                var I, Y;
                let W = F,
                    J;
                try {
                    J = jM.parse(JSON.parse(W.data))
                } catch (X) {
                    (I = this.onerror) === null || I === void 0 || I.call(this, X);
                    return
                }(Y = this.onmessage) === null || Y === void 0 || Y.call(this, J)
            }
        })
    }
    async start() {
        if (this._eventSource) throw new Error("SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.");
        return await this._startOrAuth()
    }
    async finishAuth(A) {
        if (!this._authProvider) throw new nK("No auth provider");
        if (await q$(this._authProvider, {
                serverUrl: this._url,
                authorizationCode: A,
                resourceMetadataUrl: this._resourceMetadataUrl
            }) !== "AUTHORIZED") throw new nK("Failed to authorize")
    }
    async close() {
        var A, B, Q;
        (A = this._abortController) === null || A === void 0 || A.abort(), (B = this._eventSource) === null || B === void 0 || B.close(), (Q = this.onclose) === null || Q === void 0 || Q.call(this)
    }
    async send(A) {
        var B, Q, Z;
        if (!this._endpoint) throw new Error("Not connected");
        try {
            let D = await this._commonHeaders(),
                G = new Headers(D);
            G.set("content-type", "application/json");
            let F = {
                    ...this._requestInit,
                    method: "POST",
                    headers: G,
                    body: JSON.stringify(A),
                    signal: (B = this._abortController) === null || B === void 0 ? void 0 : B.signal
                },
                I = await ((Q = this._fetch) !== null && Q !== void 0 ? Q : fetch)(this._endpoint, F);
            if (!I.ok) {
                if (I.status === 401 && this._authProvider) {
                    if (this._resourceMetadataUrl = XD1(I), await q$(this._authProvider, {
                            serverUrl: this._url,
                            resourceMetadataUrl: this._resourceMetadataUrl
                        }) !== "AUTHORIZED") throw new nK;
                    return this.send(A)
                }
                let Y = await I.text().catch(() => null);
                throw new Error(`Error POSTing to endpoint (HTTP ${I.status}): ${Y}`)
            }
        } catch (D) {
            throw (Z = this.onerror) === null || Z === void 0 || Z.call(this, D), D
        }
    }
    setProtocolVersion(A) {
        this._protocolVersion = A
    }
}
class Yz0 extends TransformStream {
    constructor({
        onError: A,
        onRetry: B,
        onComment: Q
    } = {}) {
        let Z;
        super({
            start(D) {
                Z = Ay1({
                    onEvent: (G) => {
                        D.enqueue(G)
                    },
                    onError(G) {
                        A === "terminate" ? D.error(G) : typeof A == "function" && A(G)
                    },
                    onRetry: B,
                    onComment: Q
                })
            },
            transform(D) {
                Z.feed(D)
            }
        })
    }
}
var Kx6 = {
    initialReconnectionDelay: 1000,
    maxReconnectionDelay: 30000,
    reconnectionDelayGrowFactor: 1.5,
    maxRetries: 2
};
class Dy1 extends Error {
    constructor(A, B) {
        super(`Streamable HTTP error: ${B}`);
        this.code = A
    }
}