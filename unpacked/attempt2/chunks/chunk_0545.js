/* chunk:545 bytes:[12785432, 12805351) size:19919 source:unpacked-cli.js */
class $Z1 extends pP {
    constructor({
        message: A
    } = {}) {
        super({
            message: A ?? "Request timed out."
        })
    }
}
class qZ1 extends D6 {}
class NZ1 extends D6 {}
class LZ1 extends D6 {}
class MZ1 extends D6 {}
class RZ1 extends D6 {}
class OZ1 extends D6 {}
class TZ1 extends D6 {}
class PZ1 extends D6 {}
var tj6 = /^[a-z][a-z0-9+.-]*:/i,
    S5B = (A) => {
        return tj6.test(A)
    },
    kK0 = (A) => (kK0 = Array.isArray, kK0(A)),
    yK0 = kK0;

function _K0(A) {
    if (typeof A !== "object") return {};
    return A ?? {}
}

function j5B(A) {
    if (!A) return !0;
    for (let B in A) return !1;
    return !0
}

function k5B(A, B) {
    return Object.prototype.hasOwnProperty.call(A, B)
}
var y5B = (A, B) => {
    if (typeof B !== "number" || !Number.isInteger(B)) throw new P9(`${A} must be an integer`);
    if (B < 0) throw new P9(`${A} must be a positive integer`);
    return B
};
var sj1 = (A) => {
    try {
        return JSON.parse(A)
    } catch (B) {
        return
    }
};
var _5B = (A) => new Promise((B) => setTimeout(B, A));
var hx = "0.55.1";
var f5B = () => {
    return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof navigator !== "undefined"
};

function ej6() {
    if (typeof Deno !== "undefined" && Deno.build != null) return "deno";
    if (typeof EdgeRuntime !== "undefined") return "edge";
    if (Object.prototype.toString.call(typeof globalThis.process !== "undefined" ? globalThis.process : 0) === "[object process]") return "node";
    return "unknown"
}
var Ak6 = () => {
    let A = ej6();
    if (A === "deno") return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": hx,
        "X-Stainless-OS": v5B(Deno.build.os),
        "X-Stainless-Arch": x5B(Deno.build.arch),
        "X-Stainless-Runtime": "deno",
        "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
    if (typeof EdgeRuntime !== "undefined") return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": hx,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": `other:${EdgeRuntime}`,
        "X-Stainless-Runtime": "edge",
        "X-Stainless-Runtime-Version": globalThis.process.version
    };
    if (A === "node") return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": hx,
        "X-Stainless-OS": v5B(globalThis.process.platform ?? "unknown"),
        "X-Stainless-Arch": x5B(globalThis.process.arch ?? "unknown"),
        "X-Stainless-Runtime": "node",
        "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
    };
    let B = Bk6();
    if (B) return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": hx,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": `browser:${B.browser}`,
        "X-Stainless-Runtime-Version": B.version
    };
    return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": hx,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": "unknown",
        "X-Stainless-Runtime-Version": "unknown"
    }
};

function Bk6() {
    if (typeof navigator === "undefined" || !navigator) return null;
    let A = [{
        key: "edge",
        pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
        key: "ie",
        pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
        key: "ie",
        pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
        key: "chrome",
        pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
        key: "firefox",
        pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    }, {
        key: "safari",
        pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
    }];
    for (let {
            key: B,
            pattern: Q
        }
        of A) {
        let Z = Q.exec(navigator.userAgent);
        if (Z) {
            let D = Z[1] || 0,
                G = Z[2] || 0,
                F = Z[3] || 0;
            return {
                browser: B,
                version: `${D}.${G}.${F}`
            }
        }
    }
    return null
}
var x5B = (A) => {
        if (A === "x32") return "x32";
        if (A === "x86_64" || A === "x64") return "x64";
        if (A === "arm") return "arm";
        if (A === "aarch64" || A === "arm64") return "arm64";
        if (A) return `other:${A}`;
        return "unknown"
    },
    v5B = (A) => {
        if (A = A.toLowerCase(), A.includes("ios")) return "iOS";
        if (A === "android") return "Android";
        if (A === "darwin") return "MacOS";
        if (A === "win32") return "Windows";
        if (A === "freebsd") return "FreeBSD";
        if (A === "openbsd") return "OpenBSD";
        if (A === "linux") return "Linux";
        if (A) return `Other:${A}`;
        return "Unknown"
    },
    b5B, h5B = () => {
        return b5B ?? (b5B = Ak6())
    };

function g5B() {
    if (typeof fetch !== "undefined") return fetch;
    throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")
}

function xK0(...A) {
    let B = globalThis.ReadableStream;
    if (typeof B === "undefined") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
    return new B(...A)
}

function rj1(A) {
    let B = Symbol.asyncIterator in A ? A[Symbol.asyncIterator]() : A[Symbol.iterator]();
    return xK0({
        start() {},
        async pull(Q) {
            let {
                done: Z,
                value: D
            } = await B.next();
            if (Z) Q.close();
            else Q.enqueue(D)
        },
        async cancel() {
            await B.return?.()
        }
    })
}

function SZ1(A) {
    if (A[Symbol.asyncIterator]) return A;
    let B = A.getReader();
    return {
        async next() {
            try {
                let Q = await B.read();
                if (Q?.done) B.releaseLock();
                return Q
            } catch (Q) {
                throw B.releaseLock(), Q
            }
        },
        async return () {
            let Q = B.cancel();
            return B.releaseLock(), await Q, {
                done: !0,
                value: void 0
            }
        },
        [Symbol.asyncIterator]() {
            return this
        }
    }
}
async function u5B(A) {
    if (A === null || typeof A !== "object") return;
    if (A[Symbol.asyncIterator]) {
        await A[Symbol.asyncIterator]().return?.();
        return
    }
    let B = A.getReader(),
        Q = B.cancel();
    B.releaseLock(), await Q
}
var m5B = ({
    headers: A,
    body: B
}) => {
    return {
        bodyHeaders: {
            "content-type": "application/json"
        },
        body: JSON.stringify(B)
    }
};

function l5B(A) {
    let B = 0;
    for (let D of A) B += D.length;
    let Q = new Uint8Array(B),
        Z = 0;
    for (let D of A) Q.set(D, Z), Z += D.length;
    return Q
}
var d5B;

function jZ1(A) {
    let B;
    return (d5B ?? (B = new globalThis.TextEncoder, d5B = B.encode.bind(B)))(A)
}
var c5B;

function vK0(A) {
    let B;
    return (c5B ?? (B = new globalThis.TextDecoder, c5B = B.decode.bind(B)))(A)
}
var lK, pK;
class gx {
    constructor() {
        lK.set(this, void 0), pK.set(this, void 0), $Q(this, lK, new Uint8Array, "f"), $Q(this, pK, null, "f")
    }
    decode(A) {
        if (A == null) return [];
        let B = A instanceof ArrayBuffer ? new Uint8Array(A) : typeof A === "string" ? jZ1(A) : A;
        $Q(this, lK, l5B([_A(this, lK, "f"), B]), "f");
        let Q = [],
            Z;
        while ((Z = Dk6(_A(this, lK, "f"), _A(this, pK, "f"))) != null) {
            if (Z.carriage && _A(this, pK, "f") == null) {
                $Q(this, pK, Z.index, "f");
                continue
            }
            if (_A(this, pK, "f") != null && (Z.index !== _A(this, pK, "f") + 1 || Z.carriage)) {
                Q.push(vK0(_A(this, lK, "f").subarray(0, _A(this, pK, "f") - 1))), $Q(this, lK, _A(this, lK, "f").subarray(_A(this, pK, "f")), "f"), $Q(this, pK, null, "f");
                continue
            }
            let D = _A(this, pK, "f") !== null ? Z.preceding - 1 : Z.preceding,
                G = vK0(_A(this, lK, "f").subarray(0, D));
            Q.push(G), $Q(this, lK, _A(this, lK, "f").subarray(Z.index), "f"), $Q(this, pK, null, "f")
        }
        return Q
    }
    flush() {
        if (!_A(this, lK, "f").length) return [];
        return this.decode(`
`)
    }
}
lK = new WeakMap, pK = new WeakMap;
gx.NEWLINE_CHARS = new Set([`
`, "\r"]);
gx.NEWLINE_REGEXP = /\r\n|[\n\r]/g;

function Dk6(A, B) {
    for (let D = B ?? 0; D < A.length; D++) {
        if (A[D] === 10) return {
            preceding: D,
            index: D + 1,
            carriage: !1
        };
        if (A[D] === 13) return {
            preceding: D,
            index: D + 1,
            carriage: !0
        }
    }
    return null
}

function p5B(A) {
    for (let Z = 0; Z < A.length - 1; Z++) {
        if (A[Z] === 10 && A[Z + 1] === 10) return Z + 2;
        if (A[Z] === 13 && A[Z + 1] === 13) return Z + 2;
        if (A[Z] === 13 && A[Z + 1] === 10 && Z + 3 < A.length && A[Z + 2] === 13 && A[Z + 3] === 10) return Z + 4
    }
    return -1
}
class XX {
    constructor(A, B) {
        this.iterator = A, this.controller = B
    }
    static fromSSEResponse(A, B) {
        let Q = !1;
        async function* Z() {
            if (Q) throw new P9("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            Q = !0;
            let D = !1;
            try {
                for await (let G of Gk6(A, B)) {
                    if (G.event === "completion") try {
                        yield JSON.parse(G.data)
                    } catch (F) {
                        throw console.error("Could not parse message into JSON:", G.data), console.error("From chunk:", G.raw), F
                    }
                    if (G.event === "message_start" || G.event === "message_delta" || G.event === "message_stop" || G.event === "content_block_start" || G.event === "content_block_delta" || G.event === "content_block_stop") try {
                        yield JSON.parse(G.data)
                    } catch (F) {
                        throw console.error("Could not parse message into JSON:", G.data), console.error("From chunk:", G.raw), F
                    }
                    if (G.event === "ping") continue;
                    if (G.event === "error") throw new D6(void 0, sj1(G.data) ?? G.data, void 0, A.headers)
                }
                D = !0
            } catch (G) {
                if (lP(G)) return;
                throw G
            } finally {
                if (!D) B.abort()
            }
        }
        return new XX(Z, B)
    }
    static fromReadableStream(A, B) {
        let Q = !1;
        async function* Z() {
            let G = new gx,
                F = SZ1(A);
            for await (let I of F) for (let Y of G.decode(I)) yield Y;
            for (let I of G.flush()) yield I
        }
        async function* D() {
            if (Q) throw new P9("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            Q = !0;
            let G = !1;
            try {
                for await (let F of Z()) {
                    if (G) continue;
                    if (F) yield JSON.parse(F)
                }
                G = !0
            } catch (F) {
                if (lP(F)) return;
                throw F
            } finally {
                if (!G) B.abort()
            }
        }
        return new XX(D, B)
    } [Symbol.asyncIterator]() {
        return this.iterator()
    }
    tee() {
        let A = [],
            B = [],
            Q = this.iterator(),
            Z = (D) => {
                return {
                    next: () => {
                        if (D.length === 0) {
                            let G = Q.next();
                            A.push(G), B.push(G)
                        }
                        return D.shift()
                    }
                }
            };
        return [new XX(() => Z(A), this.controller), new XX(() => Z(B), this.controller)]
    }
    toReadableStream() {
        let A = this,
            B;
        return xK0({
            async start() {
                B = A[Symbol.asyncIterator]()
            },
            async pull(Q) {
                try {
                    let {
                        value: Z,
                        done: D
                    } = await B.next();
                    if (D) return Q.close();
                    let G = jZ1(JSON.stringify(Z) + `
`);
                    Q.enqueue(G)
                } catch (Z) {
                    Q.error(Z)
                }
            },
            async cancel() {
                await B.return?.()
            }
        })
    }
}
async function* Gk6(A, B) {
    if (!A.body) {
        if (B.abort(), typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") throw new P9("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
        throw new P9("Attempted to iterate over a response with no body")
    }
    let Q = new i5B,
        Z = new gx,
        D = SZ1(A.body);
    for await (let G of Fk6(D)) for (let F of Z.decode(G)) {
        let I = Q.decode(F);
        if (I) yield I
    }
    for (let G of Z.flush()) {
        let F = Q.decode(G);
        if (F) yield F
    }
}
async function* Fk6(A) {
    let B = new Uint8Array;
    for await (let Q of A) {
        if (Q == null) continue;
        let Z = Q instanceof ArrayBuffer ? new Uint8Array(Q) : typeof Q === "string" ? jZ1(Q) : Q,
            D = new Uint8Array(B.length + Z.length);
        D.set(B), D.set(Z, B.length), B = D;
        let G;
        while ((G = p5B(B)) !== -1) yield B.slice(0, G), B = B.slice(G)
    }
    if (B.length > 0) yield B
}
class i5B {
    constructor() {
        this.event = null, this.data = [], this.chunks = []
    }
    decode(A) {
        if (A.endsWith("\r")) A = A.substring(0, A.length - 1);
        if (!A) {
            if (!this.event && !this.data.length) return null;
            let D = {
                event: this.event,
                data: this.data.join(`
`),
                raw: this.chunks
            };
            return this.event = null, this.data = [], this.chunks = [], D
        }
        if (this.chunks.push(A), A.startsWith(":")) return null;
        let [B, Q, Z] = Ik6(A, ":");
        if (Z.startsWith(" ")) Z = Z.substring(1);
        if (B === "event") this.event = Z;
        else if (B === "data") this.data.push(Z);
        return null
    }
}

function Ik6(A, B) {
    let Q = A.indexOf(B);
    if (Q !== -1) return [A.substring(0, Q), B, A.substring(Q + B.length)];
    return [A, "", ""]
}
var tj1 = {
        off: 0,
        error: 200,
        warn: 300,
        info: 400,
        debug: 500
    },
    bK0 = (A, B, Q) => {
        if (!A) return;
        if (k5B(tj1, A)) return A;
        XJ(Q).warn(`${B} was set to ${JSON.stringify(A)}, expected one of ${JSON.stringify(Object.keys(tj1))}`);
        return
    };

function kZ1() {}

function oj1(A, B, Q) {
    if (!B || tj1[A] > tj1[Q]) return kZ1;
    else return B[A].bind(B)
}
var Yk6 = {
        error: kZ1,
        warn: kZ1,
        info: kZ1,
        debug: kZ1
    },
    n5B = new WeakMap;

function XJ(A) {
    let B = A.logger,
        Q = A.logLevel ?? "off";
    if (!B) return Yk6;
    let Z = n5B.get(B);
    if (Z && Z[0] === Q) return Z[1];
    let D = {
        error: oj1("error", B, Q),
        warn: oj1("warn", B, Q),
        info: oj1("info", B, Q),
        debug: oj1("debug", B, Q)
    };
    return n5B.set(B, [Q, D]), D
}
var iP = (A) => {
    if (A.options) A.options = {
        ...A.options
    }, delete A.options.headers;
    if (A.headers) A.headers = Object.fromEntries((A.headers instanceof Headers ? [...A.headers] : Object.entries(A.headers)).map(([B, Q]) => [B, B.toLowerCase() === "x-api-key" || B.toLowerCase() === "authorization" || B.toLowerCase() === "cookie" || B.toLowerCase() === "set-cookie" ? "***" : Q]));
    if ("retryOfRequestLogID" in A) {
        if (A.retryOfRequestLogID) A.retryOf = A.retryOfRequestLogID;
        delete A.retryOfRequestLogID
    }
    return A
};
async function ej1(A, B) {
    let {
        response: Q,
        requestLogID: Z,
        retryOfRequestLogID: D,
        startTime: G
    } = B, F = await (async () => {
        if (B.options.stream) {
            if (XJ(A).debug("response", Q.status, Q.url, Q.headers, Q.body), B.options.__streamClass) return B.options.__streamClass.fromSSEResponse(Q, B.controller);
            return XX.fromSSEResponse(Q, B.controller)
        }
        if (Q.status === 204) return null;
        if (B.options.__binaryResponse) return Q;
        let Y = Q.headers.get("content-type")?.split(";")[0]?.trim();
        if (Y?.includes("application/json") || Y?.endsWith("+json")) {
            let X = await Q.json();
            return fK0(X, Q)
        }
        return await Q.text()
    })();
    return XJ(A).debug(`[${Z}] response parsed`, iP({
        retryOfRequestLogID: D,
        url: Q.url,
        status: Q.status,
        body: F,
        durationMs: Date.now() - G
    })), F
}

function fK0(A, B) {
    if (!A || typeof A !== "object" || Array.isArray(A)) return A;
    return Object.defineProperty(A, "_request_id", {
        value: B.headers.get("request-id"),
        enumerable: !1
    })
}
var yZ1;
class ym extends Promise {
    constructor(A, B, Q = ej1) {
        super((Z) => {
            Z(null)
        });
        this.responsePromise = B, this.parseResponse = Q, yZ1.set(this, void 0), $Q(this, yZ1, A, "f")
    }
    _thenUnwrap(A) {
        return new ym(_A(this, yZ1, "f"), this.responsePromise, async (B, Q) => fK0(A(await this.parseResponse(B, Q), Q), Q.response))
    }
    asResponse() {
        return this.responsePromise.then((A) => A.response)
    }
    async withResponse() {
        let [A, B] = await Promise.all([this.parse(), this.asResponse()]);
        return {
            data: A,
            response: B,
            request_id: B.headers.get("request-id")
        }
    }
    parse() {
        if (!this.parsedPromise) this.parsedPromise = this.responsePromise.then((A) => this.parseResponse(_A(this, yZ1, "f"), A));
        return this.parsedPromise
    }
    then(A, B) {
        return this.parse().then(A, B)
    } catch (A) {
        return this.parse().catch(A)
    } finally(A) {
        return this.parse().finally(A)
    }
}
yZ1 = new WeakMap;
var Ak1;
class a5B {
    constructor(A, B, Q, Z) {
        Ak1.set(this, void 0), $Q(this, Ak1, A, "f"), this.options = Z, this.response = B, this.body = Q
    }
    hasNextPage() {
        if (!this.getPaginatedItems().length) return !1;
        return this.nextPageRequestOptions() != null
    }
    async getNextPage() {
        let A = this.nextPageRequestOptions();
        if (!A) throw new P9("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
        return await _A(this, Ak1, "f").requestAPIList(this.constructor, A)
    }
    async * iterPages() {
        let A = this;
        yield A;
        while (A.hasNextPage()) A = await A.getNextPage(), yield A
    }
    async * [(Ak1 = new WeakMap, Symbol.asyncIterator)]() {
        for await (let A of this.iterPages()) for (let B of A.getPaginatedItems()) yield B
    }
}