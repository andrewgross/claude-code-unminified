/* chunk:502 bytes:[11967691, 11980118) size:12427 source:unpacked-cli.js */
var mt0 = EA((A) => {
        let B = [],
            Q = A.includes("haiku");
        if (!Q) B.push(xt0);
        if (KB()) B.push(gp);
        if (A.includes("[1m]")) B.push(ft0);
        if (!IQ(process.env.DISABLE_INTERLEAVED_THINKING) && Wv9(A)) B.push(vt0);
        if (DZ() === "firstParty" && !IQ(process.env.CLAUDE_CODE_DISABLE_FINE_GRAINED_TOOL_STREAMING)) B.push(bt0);
        if (IQ(process.env.USE_API_CONTEXT_MANAGEMENT), process.env.ANTHROPIC_BETAS && !Q) B.push(...process.env.ANTHROPIC_BETAS.split(",").map((D) => D.trim()).filter(Boolean));
        return B
    }),
    VV = EA((A) => {
        let B = mt0(A);
        if (DZ() === "bedrock") return B.filter((Q) => !Fn1.has(Q));
        return B
    }),
    dt0 = EA((A) => {
        return mt0(A).filter((Q) => Fn1.has(Q))
    });
var Vh = {
        firstParty: "claude-3-7-sonnet-20250219",
        bedrock: "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
        vertex: "claude-3-7-sonnet@20250219"
    },
    Ch = {
        firstParty: "claude-3-5-sonnet-20241022",
        bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0",
        vertex: "claude-3-5-sonnet-v2@20241022"
    },
    Y91 = {
        firstParty: "claude-3-5-haiku-20241022",
        bedrock: "us.anthropic.claude-3-5-haiku-20241022-v1:0",
        vertex: "claude-3-5-haiku@20241022"
    },
    jO = {
        firstParty: "claude-sonnet-4-20250514",
        bedrock: "us.anthropic.claude-sonnet-4-20250514-v1:0",
        vertex: "claude-sonnet-4@20250514"
    };
var Kh = {
        firstParty: "claude-opus-4-20250514",
        bedrock: "us.anthropic.claude-opus-4-20250514-v1:0",
        vertex: "claude-opus-4@20250514"
    },
    Hh = {
        firstParty: "claude-opus-4-1-20250805",
        bedrock: "us.anthropic.claude-opus-4-1-20250805-v1:0",
        vertex: "claude-opus-4-1@20250805"
    };

function ct0(A) {
    let B = A.toLowerCase();
    if (B.includes("claude-sonnet-4") && B.includes("[1m]")) return "Sonnet 4 (with 1M token context)";
    if (B.includes("claude-sonnet-4")) return "Sonnet 4";
    if (B.includes("claude-opus-4-1")) return "Opus 4.1";
    if (B.includes("claude-opus-4")) return "Opus 4";
    if (B.includes("claude-3-7-sonnet")) return "Claude 3.7 Sonnet";
    if (B.includes("claude-3-5-sonnet")) return "Claude 3.5 Sonnet";
    if (B.includes("claude-3-5-haiku")) return "Claude 3.5 Haiku";
    return
}
var Nw1 = G1(dJA(), 1);
var G_A = G1(u10(), 1),
    F_A = G1(x3(), 1);
var $w1 = G1(d10(), 1);
var qw1 = G1(X20(), 1);
import {
    Agent as zhQ
} from "https";
var B_A = G1(X20(), 1);
var YT = EA(() => {
        let A = {};
        if (process.env.CLAUDE_CODE_CLIENT_CERT) try {
            A.cert = j1().readFileSync(process.env.CLAUDE_CODE_CLIENT_CERT, {
                encoding: "utf8"
            }), n1("mTLS: Loaded client certificate from CLAUDE_CODE_CLIENT_CERT")
        } catch (B) {
            SA(`mTLS: Failed to load client certificate: ${B}`)
        }
        if (process.env.CLAUDE_CODE_CLIENT_KEY) try {
            A.key = j1().readFileSync(process.env.CLAUDE_CODE_CLIENT_KEY, {
                encoding: "utf8"
            }), n1("mTLS: Loaded client key from CLAUDE_CODE_CLIENT_KEY")
        } catch (B) {
            SA(`mTLS: Failed to load client key: ${B}`)
        }
        if (process.env.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE) A.passphrase = process.env.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE, n1("mTLS: Using client key passphrase");
        if (Object.keys(A).length === 0) return;
        return A
    }),
    Q_A = EA(() => {
        let A = YT();
        if (!A) return;
        let B = {
            ...A,
            keepAlive: !0
        };
        return n1("mTLS: Creating HTTPS agent with custom certificates"), new zhQ(B)
    });

function Z_A() {
    let A = YT();
    if (!A) return;
    return {
        cert: A.cert,
        key: A.key,
        passphrase: A.passphrase
    }
}

function Yg() {
    let A = YT();
    if (!A) return {};
    let B = {
            cert: A.cert,
            key: A.key,
            passphrase: A.passphrase
        },
        Q = new B_A.Agent({
            connect: B,
            pipelining: 1
        });
    return n1("mTLS: Created undici agent with custom certificates"), {
        dispatcher: Q
    }
}

function D_A() {
    if (!YT()) return;
    if (process.env.NODE_EXTRA_CA_CERTS) n1("NODE_EXTRA_CA_CERTS detected - Node.js will automatically append to built-in CAs")
}

function m41() {
    return process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY
}
var I_A = EA((A) => {
    let B = YT(),
        Q = {
            uri: A,
            pipelining: 1
        };
    if (B) Q.requestTls = {
        cert: B.cert,
        key: B.key,
        passphrase: B.passphrase
    };
    return new qw1.default.ProxyAgent(Q)
});

function Y_A() {
    let A = m41(),
        B = Yg();
    if (A) return {
        dispatcher: I_A(A)
    };
    return B
}

function W_A() {
    let A = m41(),
        B = Q_A(),
        Q = YT();
    if (A) {
        if (J9.defaults.proxy = !1, Q) J9.defaults.httpsAgent = new $w1.default.HttpsProxyAgent(A, {
            cert: Q.cert,
            key: Q.key,
            passphrase: Q.passphrase
        });
        else J9.defaults.httpsAgent = new $w1.default.HttpsProxyAgent(A);
        qw1.default.setGlobalDispatcher(I_A(A))
    } else if (B) {
        J9.defaults.httpsAgent = B;
        let Z = Yg();
        if (Z.dispatcher) qw1.default.setGlobalDispatcher(Z.dispatcher)
    }
}

function J_A() {
    let A = m41();
    if (!A) return {};
    let B = new $w1.default.HttpsProxyAgent(A),
        Q = new F_A.NodeHttpHandler({
            httpAgent: B,
            httpsAgent: B
        });
    return {
        requestHandler: Q,
        credentials: G_A.defaultProvider({
            clientConfig: {
                requestHandler: Q
            }
        })
    }
}
var X_A = EA(async function() {
    let A = fp(),
        B = await d41(),
        Q = {
            region: A,
            ...J_A()
        };
    if (B) Q.credentials = {
        accessKeyId: B.accessKeyId,
        secretAccessKey: B.secretAccessKey,
        sessionToken: B.sessionToken
    };
    let Z = new Nw1.BedrockClient(Q),
        D = new Nw1.ListInferenceProfilesCommand;
    try {
        return ((await Z.send(D)).inferenceProfileSummaries || []).filter((W) => W.inferenceProfileId?.includes("anthropic")).map((W) => W.inferenceProfileId).filter(Boolean)
    } catch (G) {
        throw R1(G), G
    }
});

function Wg(A, B) {
    return A.find((Q) => Q.includes(B)) ?? null
}

function Lw1(A) {
    let B = [],
        Q = !1;
    async function Z() {
        if (Q) return;
        if (B.length === 0) return;
        Q = !0;
        while (B.length > 0) {
            let {
                args: D,
                resolve: G,
                reject: F,
                context: I
            } = B.shift();
            try {
                let Y = await A.apply(I, D);
                G(Y)
            } catch (Y) {
                F(Y)
            }
        }
        if (Q = !1, B.length > 0) Z()
    }
    return function(...D) {
        return new Promise((G, F) => {
            B.push({
                args: D,
                resolve: G,
                reject: F,
                context: this
            }), Z()
        })
    }
}

function Mw1(A) {
    return {
        haiku35: Y91[A],
        sonnet35: Ch[A],
        sonnet37: Vh[A],
        sonnet40: jO[A],
        opus40: Kh[A],
        opus41: Hh[A]
    }
}
async function EhQ() {
    let A;
    try {
        A = await X_A()
    } catch (I) {
        return R1(I), Mw1("bedrock")
    }
    if (!A?.length) return Mw1("bedrock");
    let B = Wg(A, "claude-3-5-haiku-20241022"),
        Q = Wg(A, "claude-3-5-sonnet-20241022"),
        Z = Wg(A, "claude-3-7-sonnet-20250219"),
        D = Wg(A, "claude-sonnet-4-20250514"),
        G = Wg(A, "claude-opus-4-20250514"),
        F = Wg(A, "claude-opus-4-1-20250805");
    return {
        haiku35: B || Y91.bedrock,
        sonnet35: Q || Ch.bedrock,
        sonnet37: Z || Vh.bedrock,
        sonnet40: D || jO.bedrock,
        opus40: G || Kh.bedrock,
        opus41: F || Hh.bedrock
    }
}
var UhQ = Lw1(async () => {
    if (cW1() !== null) return;
    try {
        let A = await EhQ();
        wm1(A)
    } catch (A) {
        R1(A)
    }
});

function whQ() {
    if (cW1() !== null) return;
    if (DZ() !== "bedrock") {
        wm1(Mw1(DZ()));
        return
    }
    UhQ()
}

function eD() {
    let A = cW1();
    if (A === null) return whQ(), Mw1(DZ());
    return A
}

function Cy() {
    return `claude-cli/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION} (external, ${process.env.CLAUDE_CODE_ENTRYPOINT})`
}

function Ya() {
    return `claude-code/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION}`
}

function Ky() {
    return `claude-code/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION}`
}

function AL() {
    if (KB()) {
        let B = CZ();
        if (!B?.accessToken) return {
            headers: {},
            error: "No OAuth token available"
        };
        return {
            headers: {
                Authorization: `Bearer ${B.accessToken}`,
                "anthropic-beta": gp
            }
        }
    }
    let A = LY(!1);
    if (!A) return {
        headers: {},
        error: "No API key available"
    };
    return {
        headers: {
            "x-api-key": A
        }
    }
}
var Wa = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date,
    C_A = new Set,
    V20 = typeof process === "object" && !!process ? process : {},
    K_A = (A, B, Q, Z) => {
        typeof V20.emitWarning === "function" ? V20.emitWarning(A, B, Q, Z) : console.error(`[${Q}] ${B}: ${A}`)
    },
    Rw1 = globalThis.AbortController,
    V_A = globalThis.AbortSignal;
if (typeof Rw1 === "undefined") {
    V_A = class Q {
        onabort;
        _onabort = [];
        reason;
        aborted = !1;
        addEventListener(Z, D) {
            this._onabort.push(D)
        }
    }, Rw1 = class Q {
        constructor() {
            B()
        }
        signal = new V_A;
        abort(Z) {
            if (this.signal.aborted) return;
            this.signal.reason = Z, this.signal.aborted = !0;
            for (let D of this.signal._onabort) D(Z);
            this.signal.onabort?.(Z)
        }
    };
    let A = V20.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1",
        B = () => {
            if (!A) return;
            A = !1, K_A("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", B)
        }
}
var $hQ = (A) => !C_A.has(A),
    c85 = Symbol("type"),
    Hy = (A) => A && A === Math.floor(A) && A > 0 && isFinite(A),
    H_A = (A) => !Hy(A) ? null : A <= Math.pow(2, 8) ? Uint8Array : A <= Math.pow(2, 16) ? Uint16Array : A <= Math.pow(2, 32) ? Uint32Array : A <= Number.MAX_SAFE_INTEGER ? c41 : null;
class c41 extends Array {
    constructor(A) {
        super(A);
        this.fill(0)
    }
}
class Ja {
    heap;
    length;
    static #A = !1;
    static create(A) {
        let B = H_A(A);
        if (!B) return [];
        Ja.#A = !0;
        let Q = new Ja(A, B);
        return Ja.#A = !1, Q
    }
    constructor(A, B) {
        if (!Ja.#A) throw new TypeError("instantiate Stack using Stack.create(n)");
        this.heap = new B(A), this.length = 0
    }
    push(A) {
        this.heap[this.length++] = A
    }
    pop() {
        return this.heap[--this.length]
    }
}