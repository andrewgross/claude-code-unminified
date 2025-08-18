/* chunk:552 bytes:[12914272, 12934089) size:19817 source:unpacked-cli.js */
function i_6(A) {
    return jM.parse(JSON.parse(A))
}

function tk1(A) {
    return JSON.stringify(A) + `
`
}
var a_6 = ek1.platform === "win32" ? ["APPDATA", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA", "PATH", "PROCESSOR_ARCHITECTURE", "SYSTEMDRIVE", "SYSTEMROOT", "TEMP", "USERNAME", "USERPROFILE", "PROGRAMFILES"] : ["HOME", "LOGNAME", "PATH", "SHELL", "TERM", "USER"];

function s_6() {
    let A = {};
    for (let B of a_6) {
        let Q = ek1.env[B];
        if (Q === void 0) continue;
        if (Q.startsWith("()")) continue;
        A[B] = Q
    }
    return A
}
class pH0 {
    constructor(A) {
        if (this._abortController = new AbortController, this._readBuffer = new FD1, this._stderrStream = null, this._serverParams = A, A.stderr === "pipe" || A.stderr === "overlapped") this._stderrStream = new n_6
    }
    async start() {
        if (this._process) throw new Error("StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.");
        return new Promise((A, B) => {
            var Q, Z, D, G, F, I;
            if (this._process = _ZB.default(this._serverParams.command, (Q = this._serverParams.args) !== null && Q !== void 0 ? Q : [], {
                    env: (Z = this._serverParams.env) !== null && Z !== void 0 ? Z : s_6(),
                    stdio: ["pipe", "pipe", (D = this._serverParams.stderr) !== null && D !== void 0 ? D : "inherit"],
                    shell: !1,
                    signal: this._abortController.signal,
                    windowsHide: ek1.platform === "win32" && r_6(),
                    cwd: this._serverParams.cwd
                }), this._process.on("error", (Y) => {
                    var W, J;
                    if (Y.name === "AbortError") {
                        (W = this.onclose) === null || W === void 0 || W.call(this);
                        return
                    }
                    B(Y), (J = this.onerror) === null || J === void 0 || J.call(this, Y)
                }), this._process.on("spawn", () => {
                    A()
                }), this._process.on("close", (Y) => {
                    var W;
                    this._process = void 0, (W = this.onclose) === null || W === void 0 || W.call(this)
                }), (G = this._process.stdin) === null || G === void 0 || G.on("error", (Y) => {
                    var W;
                    (W = this.onerror) === null || W === void 0 || W.call(this, Y)
                }), (F = this._process.stdout) === null || F === void 0 || F.on("data", (Y) => {
                    this._readBuffer.append(Y), this.processReadBuffer()
                }), (I = this._process.stdout) === null || I === void 0 || I.on("error", (Y) => {
                    var W;
                    (W = this.onerror) === null || W === void 0 || W.call(this, Y)
                }), this._stderrStream && this._process.stderr) this._process.stderr.pipe(this._stderrStream)
        })
    }
    get stderr() {
        var A, B;
        if (this._stderrStream) return this._stderrStream;
        return (B = (A = this._process) === null || A === void 0 ? void 0 : A.stderr) !== null && B !== void 0 ? B : null
    }
    get pid() {
        var A, B;
        return (B = (A = this._process) === null || A === void 0 ? void 0 : A.pid) !== null && B !== void 0 ? B : null
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
        this._abortController.abort(), this._process = void 0, this._readBuffer.clear()
    }
    send(A) {
        return new Promise((B) => {
            var Q;
            if (!((Q = this._process) === null || Q === void 0 ? void 0 : Q.stdin)) throw new Error("Not connected");
            let Z = tk1(A);
            if (this._process.stdin.write(Z)) B();
            else this._process.stdin.once("drain", B)
        })
    }
}

function r_6() {
    return "type" in ek1
}
class nH0 extends Error {
    constructor(A, B) {
        super(A), this.name = "ParseError", this.type = B.type, this.field = B.field, this.value = B.value, this.line = B.line
    }
}

function iH0(A) {}

function Ay1(A) {
    if (typeof A == "function") throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
    let {
        onEvent: B = iH0,
        onError: Q = iH0,
        onRetry: Z = iH0,
        onComment: D
    } = A, G = "", F = !0, I, Y = "", W = "";

    function J(H) {
        let z = F ? H.replace(/^\xEF\xBB\xBF/, "") : H,
            [$, L] = o_6(`${G}${z}`);
        for (let N of $) X(N);
        G = L, F = !1
    }

    function X(H) {
        if (H === "") {
            C();
            return
        }
        if (H.startsWith(":")) {
            D && D(H.slice(H.startsWith(": ") ? 2 : 1));
            return
        }
        let z = H.indexOf(":");
        if (z !== -1) {
            let $ = H.slice(0, z),
                L = H[z + 1] === " " ? 2 : 1,
                N = H.slice(z + L);
            V($, N, H);
            return
        }
        V(H, "", H)
    }

    function V(H, z, $) {
        switch (H) {
            case "event":
                W = z;
                break;
            case "data":
                Y = `${Y}${z}
`;
                break;
            case "id":
                I = z.includes("\x00") ? void 0 : z;
                break;
            case "retry":
                /^\d+$/.test(z) ? Z(parseInt(z, 10)) : Q(new nH0(`Invalid \`retry\` value: "${z}"`, {
                    type: "invalid-retry",
                    value: z,
                    line: $
                }));
                break;
            default:
                Q(new nH0(`Unknown field "${H.length>20?`${H.slice(0,20)}…`:H}"`, {
                    type: "unknown-field",
                    field: H,
                    value: z,
                    line: $
                }));
                break
        }
    }

    function C() {
        Y.length > 0 && B({
            id: I,
            event: W || void 0,
            data: Y.endsWith(`
`) ? Y.slice(0, -1) : Y
        }), I = void 0, Y = "", W = ""
    }

    function K(H = {}) {
        G && H.consume && X(G), F = !0, I = void 0, Y = "", W = "", G = ""
    }
    return {
        feed: J,
        reset: K
    }
}

function o_6(A) {
    let B = [],
        Q = "",
        Z = 0;
    for (; Z < A.length;) {
        let D = A.indexOf("\r", Z),
            G = A.indexOf(`
`, Z),
            F = -1;
        if (D !== -1 && G !== -1 ? F = Math.min(D, G) : D !== -1 ? F = D : G !== -1 && (F = G), F === -1) {
            Q = A.slice(Z);
            break
        } else {
            let I = A.slice(Z, F);
            B.push(I), Z = F + 1, A[Z - 1] === "\r" && A[Z] === `
` && Z++
        }
    }
    return [B, Q]
}
class aH0 extends Event {
    constructor(A, B) {
        var Q, Z;
        super(A), this.code = (Q = B == null ? void 0 : B.code) != null ? Q : void 0, this.message = (Z = B == null ? void 0 : B.message) != null ? Z : void 0
    } [Symbol.for("nodejs.util.inspect.custom")](A, B, Q) {
        return Q(xZB(this), B)
    } [Symbol.for("Deno.customInspect")](A, B) {
        return A(xZB(this), B)
    }
}

function t_6(A) {
    let B = globalThis.DOMException;
    return typeof B == "function" ? new B(A, "SyntaxError") : new SyntaxError(A)
}

function sH0(A) {
    return A instanceof Error ? "errors" in A && Array.isArray(A.errors) ? A.errors.map(sH0).join(", ") : ("cause" in A) && A.cause instanceof Error ? `${A}: ${sH0(A.cause)}` : A.message : `${A}`
}

function xZB(A) {
    return {
        type: A.type,
        message: A.message,
        code: A.code,
        defaultPrevented: A.defaultPrevented,
        cancelable: A.cancelable,
        timeStamp: A.timeStamp
    }
}
var bZB = (A) => {
        throw TypeError(A)
    },
    Zz0 = (A, B, Q) => B.has(A) || bZB("Cannot " + Q),
    z6 = (A, B, Q) => (Zz0(A, B, "read from private field"), Q ? Q.call(A) : B.get(A)),
    bF = (A, B, Q) => B.has(A) ? bZB("Cannot add the same private member more than once") : B instanceof WeakSet ? B.add(A) : B.set(A, Q),
    PZ = (A, B, Q, Z) => (Zz0(A, B, "write to private field"), B.set(A, Q), Q),
    oP = (A, B, Q) => (Zz0(A, B, "access private method"), Q),
    tV, fm, he, By1, Qy1, WD1, me, JD1, nx, ge, de, ue, ID1, $$, rH0, oH0, tH0, vZB, eH0, Az0, YD1, Bz0, Qz0;
class ce extends EventTarget {
    constructor(A, B) {
        var Q, Z;
        super(), bF(this, $$), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, bF(this, tV), bF(this, fm), bF(this, he), bF(this, By1), bF(this, Qy1), bF(this, WD1), bF(this, me), bF(this, JD1, null), bF(this, nx), bF(this, ge), bF(this, de, null), bF(this, ue, null), bF(this, ID1, null), bF(this, oH0, async (D) => {
            var G;
            z6(this, ge).reset();
            let {
                body: F,
                redirected: I,
                status: Y,
                headers: W
            } = D;
            if (Y === 204) {
                oP(this, $$, YD1).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
                return
            }
            if (I ? PZ(this, he, new URL(D.url)) : PZ(this, he, void 0), Y !== 200) {
                oP(this, $$, YD1).call(this, `Non-200 status code (${Y})`, Y);
                return
            }
            if (!(W.get("content-type") || "").startsWith("text/event-stream")) {
                oP(this, $$, YD1).call(this, 'Invalid content type, expected "text/event-stream"', Y);
                return
            }
            if (z6(this, tV) === this.CLOSED) return;
            PZ(this, tV, this.OPEN);
            let J = new Event("open");
            if ((G = z6(this, ID1)) == null || G.call(this, J), this.dispatchEvent(J), typeof F != "object" || !F || !("getReader" in F)) {
                oP(this, $$, YD1).call(this, "Invalid response body, expected a web ReadableStream", Y), this.close();
                return
            }
            let X = new TextDecoder,
                V = F.getReader(),
                C = !0;
            do {
                let {
                    done: K,
                    value: H
                } = await V.read();
                H && z6(this, ge).feed(X.decode(H, {
                    stream: !K
                })), K && (C = !1, z6(this, ge).reset(), oP(this, $$, Bz0).call(this))
            } while (C)
        }), bF(this, tH0, (D) => {
            PZ(this, nx, void 0), !(D.name === "AbortError" || D.type === "aborted") && oP(this, $$, Bz0).call(this, sH0(D))
        }), bF(this, eH0, (D) => {
            typeof D.id == "string" && PZ(this, JD1, D.id);
            let G = new MessageEvent(D.event || "message", {
                data: D.data,
                origin: z6(this, he) ? z6(this, he).origin : z6(this, fm).origin,
                lastEventId: D.id || ""
            });
            z6(this, ue) && (!D.event || D.event === "message") && z6(this, ue).call(this, G), this.dispatchEvent(G)
        }), bF(this, Az0, (D) => {
            PZ(this, WD1, D)
        }), bF(this, Qz0, () => {
            PZ(this, me, void 0), z6(this, tV) === this.CONNECTING && oP(this, $$, rH0).call(this)
        });
        try {
            if (A instanceof URL) PZ(this, fm, A);
            else if (typeof A == "string") PZ(this, fm, new URL(A, e_6()));
            else throw new Error("Invalid URL")
        } catch {
            throw t_6("An invalid or illegal string was specified")
        }
        PZ(this, ge, Ay1({
            onEvent: z6(this, eH0),
            onRetry: z6(this, Az0)
        })), PZ(this, tV, this.CONNECTING), PZ(this, WD1, 3000), PZ(this, Qy1, (Q = B == null ? void 0 : B.fetch) != null ? Q : globalThis.fetch), PZ(this, By1, (Z = B == null ? void 0 : B.withCredentials) != null ? Z : !1), oP(this, $$, rH0).call(this)
    }
    get readyState() {
        return z6(this, tV)
    }
    get url() {
        return z6(this, fm).href
    }
    get withCredentials() {
        return z6(this, By1)
    }
    get onerror() {
        return z6(this, de)
    }
    set onerror(A) {
        PZ(this, de, A)
    }
    get onmessage() {
        return z6(this, ue)
    }
    set onmessage(A) {
        PZ(this, ue, A)
    }
    get onopen() {
        return z6(this, ID1)
    }
    set onopen(A) {
        PZ(this, ID1, A)
    }
    addEventListener(A, B, Q) {
        let Z = B;
        super.addEventListener(A, Z, Q)
    }
    removeEventListener(A, B, Q) {
        let Z = B;
        super.removeEventListener(A, Z, Q)
    }
    close() {
        z6(this, me) && clearTimeout(z6(this, me)), z6(this, tV) !== this.CLOSED && (z6(this, nx) && z6(this, nx).abort(), PZ(this, tV, this.CLOSED), PZ(this, nx, void 0))
    }
}
tV = new WeakMap, fm = new WeakMap, he = new WeakMap, By1 = new WeakMap, Qy1 = new WeakMap, WD1 = new WeakMap, me = new WeakMap, JD1 = new WeakMap, nx = new WeakMap, ge = new WeakMap, de = new WeakMap, ue = new WeakMap, ID1 = new WeakMap, $$ = new WeakSet, rH0 = function() {
    PZ(this, tV, this.CONNECTING), PZ(this, nx, new AbortController), z6(this, Qy1)(z6(this, fm), oP(this, $$, vZB).call(this)).then(z6(this, oH0)).catch(z6(this, tH0))
}, oH0 = new WeakMap, tH0 = new WeakMap, vZB = function() {
    var A;
    let B = {
        mode: "cors",
        redirect: "follow",
        headers: {
            Accept: "text/event-stream",
            ...z6(this, JD1) ? {
                "Last-Event-ID": z6(this, JD1)
            } : void 0
        },
        cache: "no-store",
        signal: (A = z6(this, nx)) == null ? void 0 : A.signal
    };
    return "window" in globalThis && (B.credentials = this.withCredentials ? "include" : "same-origin"), B
}, eH0 = new WeakMap, Az0 = new WeakMap, YD1 = function(A, B) {
    var Q;
    z6(this, tV) !== this.CLOSED && PZ(this, tV, this.CLOSED);
    let Z = new aH0("error", {
        code: B,
        message: A
    });
    (Q = z6(this, de)) == null || Q.call(this, Z), this.dispatchEvent(Z)
}, Bz0 = function(A, B) {
    var Q;
    if (z6(this, tV) === this.CLOSED) return;
    PZ(this, tV, this.CONNECTING);
    let Z = new aH0("error", {
        code: B,
        message: A
    });
    (Q = z6(this, de)) == null || Q.call(this, Z), this.dispatchEvent(Z), PZ(this, me, setTimeout(z6(this, Qz0), z6(this, WD1)))
}, Qz0 = new WeakMap, ce.CONNECTING = 0, ce.OPEN = 1, ce.CLOSED = 2;

function e_6() {
    let A = "document" in globalThis ? globalThis.document : void 0;
    return A && typeof A == "object" && "baseURI" in A && typeof A.baseURI == "string" ? A.baseURI : void 0
}
var Dz0;
Dz0 = globalThis.crypto?.webcrypto ?? globalThis.crypto ?? import("node:crypto").then((A) => A.webcrypto);
async function Ax6(A) {
    return (await Dz0).getRandomValues(new Uint8Array(A))
}
async function Bx6(A) {
    let Q = "",
        Z = await Ax6(A);
    for (let D = 0; D < A; D++) {
        let G = Z[D] % 66;
        Q += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~" [G]
    }
    return Q
}
async function Qx6(A) {
    return await Bx6(A)
}
async function Zx6(A) {
    let B = await (await Dz0).subtle.digest("SHA-256", new TextEncoder().encode(A));
    return btoa(String.fromCharCode(...new Uint8Array(B))).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "")
}
async function Gz0(A) {
    if (!A) A = 43;
    if (A < 43 || A > 128) throw `Expected a length between 43 and 128. Received ${A}.`;
    let B = await Qx6(A),
        Q = await Zx6(B);
    return {
        code_verifier: B,
        code_challenge: Q
    }
}
var fZB = h.object({
        resource: h.string().url(),
        authorization_servers: h.array(h.string().url()).optional(),
        jwks_uri: h.string().url().optional(),
        scopes_supported: h.array(h.string()).optional(),
        bearer_methods_supported: h.array(h.string()).optional(),
        resource_signing_alg_values_supported: h.array(h.string()).optional(),
        resource_name: h.string().optional(),
        resource_documentation: h.string().optional(),
        resource_policy_uri: h.string().url().optional(),
        resource_tos_uri: h.string().url().optional(),
        tls_client_certificate_bound_access_tokens: h.boolean().optional(),
        authorization_details_types_supported: h.array(h.string()).optional(),
        dpop_signing_alg_values_supported: h.array(h.string()).optional(),
        dpop_bound_access_tokens_required: h.boolean().optional()
    }).passthrough(),
    hZB = h.object({
        issuer: h.string(),
        authorization_endpoint: h.string(),
        token_endpoint: h.string(),
        registration_endpoint: h.string().optional(),
        scopes_supported: h.array(h.string()).optional(),
        response_types_supported: h.array(h.string()),
        response_modes_supported: h.array(h.string()).optional(),
        grant_types_supported: h.array(h.string()).optional(),
        token_endpoint_auth_methods_supported: h.array(h.string()).optional(),
        token_endpoint_auth_signing_alg_values_supported: h.array(h.string()).optional(),
        service_documentation: h.string().optional(),
        revocation_endpoint: h.string().optional(),
        revocation_endpoint_auth_methods_supported: h.array(h.string()).optional(),
        revocation_endpoint_auth_signing_alg_values_supported: h.array(h.string()).optional(),
        introspection_endpoint: h.string().optional(),
        introspection_endpoint_auth_methods_supported: h.array(h.string()).optional(),
        introspection_endpoint_auth_signing_alg_values_supported: h.array(h.string()).optional(),
        code_challenge_methods_supported: h.array(h.string()).optional()
    }).passthrough(),
    Fz0 = h.object({
        access_token: h.string(),
        token_type: h.string(),
        expires_in: h.number().optional(),
        scope: h.string().optional(),
        refresh_token: h.string().optional()
    }).strip(),
    gZB = h.object({
        error: h.string(),
        error_description: h.string().optional(),
        error_uri: h.string().optional()
    }),
    Dx6 = h.object({
        redirect_uris: h.array(h.string()).refine((A) => A.every((B) => URL.canParse(B)), {
            message: "redirect_uris must contain valid URLs"
        }),
        token_endpoint_auth_method: h.string().optional(),
        grant_types: h.array(h.string()).optional(),
        response_types: h.array(h.string()).optional(),
        client_name: h.string().optional(),
        client_uri: h.string().optional(),
        logo_uri: h.string().optional(),
        scope: h.string().optional(),
        contacts: h.array(h.string()).optional(),
        tos_uri: h.string().optional(),
        policy_uri: h.string().optional(),
        jwks_uri: h.string().optional(),
        jwks: h.any().optional(),
        software_id: h.string().optional(),
        software_version: h.string().optional(),
        software_statement: h.string().optional()
    }).strip(),
    Gx6 = h.object({
        client_id: h.string(),
        client_secret: h.string().optional(),
        client_id_issued_at: h.number().optional(),
        client_secret_expires_at: h.number().optional()
    }).strip(),
    uZB = Dx6.merge(Gx6),
    YB3 = h.object({
        error: h.string(),
        error_description: h.string().optional()
    }).strip(),
    WB3 = h.object({
        token: h.string(),
        token_type_hint: h.string().optional()
    }).strip();

function mZB(A) {
    let B = typeof A === "string" ? new URL(A) : new URL(A.href);
    return B.hash = "", B
}