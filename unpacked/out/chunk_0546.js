/* chunk:546 bytes:[12805352, 12825302) size:19950 source:unpacked-cli.js */
class Bk1 extends ym {
    constructor(A, B, Q) {
        super(A, B, async (Z, D) => new Q(Z, D.response, await ej1(Z, D), D.options))
    }
    async * [Symbol.asyncIterator]() {
        let A = await this;
        for await (let B of A) yield B
    }
}
class U$ extends a5B {
    constructor(A, B, Q, Z) {
        super(A, B, Q, Z);
        this.data = Q.data || [], this.has_more = Q.has_more || !1, this.first_id = Q.first_id || null, this.last_id = Q.last_id || null
    }
    getPaginatedItems() {
        return this.data ?? []
    }
    hasNextPage() {
        if (this.has_more === !1) return !1;
        return super.hasNextPage()
    }
    nextPageRequestOptions() {
        if (this.options.query?.before_id) {
            let B = this.first_id;
            if (!B) return null;
            return {
                ...this.options,
                query: {
                    ..._K0(this.options.query),
                    before_id: B
                }
            }
        }
        let A = this.last_id;
        if (!A) return null;
        return {
            ...this.options,
            query: {
                ..._K0(this.options.query),
                after_id: A
            }
        }
    }
}
var gK0 = () => {
    if (typeof File === "undefined") {
        let {
            process: A
        } = globalThis, B = typeof A?.versions?.node === "string" && parseInt(A.versions.node.split(".")) < 20;
        throw new Error("`File` is not defined as a global, which is required for file uploads." + (B ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""))
    }
};

function _m(A, B, Q) {
    return gK0(), new File(A, B ?? "unknown_file", Q)
}

function _Z1(A) {
    return (typeof A === "object" && A !== null && (("name" in A) && A.name && String(A.name) || ("url" in A) && A.url && String(A.url) || ("filename" in A) && A.filename && String(A.filename) || ("path" in A) && A.path && String(A.path)) || "").split(/[\\/]/).pop() || void 0
}
var uK0 = (A) => A != null && typeof A === "object" && typeof A[Symbol.asyncIterator] === "function";
var r5B = async (A, B) => {
    return {
        ...A,
        body: await Xk6(A.body, B)
    }
}, s5B = new WeakMap;

function Jk6(A) {
    let B = typeof A === "function" ? A : A.fetch,
        Q = s5B.get(B);
    if (Q) return Q;
    let Z = (async () => {
        try {
            let D = "Response" in B ? B.Response : (await B("data:,")).constructor,
                G = new FormData;
            if (G.toString() === await new D(G).text()) return !1;
            return !0
        } catch {
            return !0
        }
    })();
    return s5B.set(B, Z), Z
}
var Xk6 = async (A, B) => {
    if (!await Jk6(B)) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
    let Q = new FormData;
    return await Promise.all(Object.entries(A || {}).map(([Z, D]) => hK0(Q, Z, D))), Q
}, Vk6 = (A) => A instanceof Blob && ("name" in A);
var hK0 = async (A, B, Q) => {
    if (Q === void 0) return;
    if (Q == null) throw new TypeError(`Received null for "${B}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof Q === "string" || typeof Q === "number" || typeof Q === "boolean") A.append(B, String(Q));
    else if (Q instanceof Response) {
        let Z = {},
            D = Q.headers.get("Content-Type");
        if (D) Z = {
            type: D
        };
        A.append(B, _m([await Q.blob()], _Z1(Q), Z))
    } else if (uK0(Q)) A.append(B, _m([await new Response(rj1(Q)).blob()], _Z1(Q)));
    else if (Vk6(Q)) A.append(B, _m([Q], _Z1(Q), {
        type: Q.type
    }));
    else if (Array.isArray(Q)) await Promise.all(Q.map((Z) => hK0(A, B + "[]", Z)));
    else if (typeof Q === "object") await Promise.all(Object.entries(Q).map(([Z, D]) => hK0(A, `${B}[${Z}]`, D)));
    else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${Q} instead`)
};
var o5B = (A) => A != null && typeof A === "object" && typeof A.size === "number" && typeof A.type === "string" && typeof A.text === "function" && typeof A.slice === "function" && typeof A.arrayBuffer === "function",
    Ck6 = (A) => A != null && typeof A === "object" && typeof A.name === "string" && typeof A.lastModified === "number" && o5B(A),
    Kk6 = (A) => A != null && typeof A === "object" && typeof A.url === "string" && typeof A.blob === "function";
async function Qk1(A, B, Q) {
    if (gK0(), A = await A, B || (B = _Z1(A)), Ck6(A)) {
        if (A instanceof File && B == null && Q == null) return A;
        return _m([await A.arrayBuffer()], B ?? A.name, {
            type: A.type,
            lastModified: A.lastModified,
            ...Q
        })
    }
    if (Kk6(A)) {
        let D = await A.blob();
        return B || (B = new URL(A.url).pathname.split(/[\\/]/).pop()), _m(await mK0(D), B, Q)
    }
    let Z = await mK0(A);
    if (!Q?.type) {
        let D = Z.find((G) => typeof G === "object" && ("type" in G) && G.type);
        if (typeof D === "string") Q = {
            ...Q,
            type: D
        }
    }
    return _m(Z, B, Q)
}
async function mK0(A) {
    let B = [];
    if (typeof A === "string" || ArrayBuffer.isView(A) || A instanceof ArrayBuffer) B.push(A);
    else if (o5B(A)) B.push(A instanceof Blob ? A : await A.arrayBuffer());
    else if (uK0(A))
        for await (let Q of A) B.push(...await mK0(Q));
    else {
        let Q = A?.constructor?.name;
        throw new Error(`Unexpected data type: ${typeof A}${Q?`; constructor: ${Q}`:""}${Hk6(A)}`)
    }
    return B
}

function Hk6(A) {
    if (typeof A !== "object" || A === null) return "";
    return `; props: [${Object.getOwnPropertyNames(A).map((Q)=>`"${Q}"`).join(", ")}]`
}
class vF {
    constructor(A) {
        this._client = A
    }
}
var t5B = Symbol.for("brand.privateNullableHeaders");

function* Ek6(A) {
    if (!A) return;
    if (t5B in A) {
        let {
            values: Z,
            nulls: D
        } = A;
        yield* Z.entries();
        for (let G of D) yield [G, null];
        return
    }
    let B = !1,
        Q;
    if (A instanceof Headers) Q = A.entries();
    else if (yK0(A)) Q = A;
    else B = !0, Q = Object.entries(A ?? {});
    for (let Z of Q) {
        let D = Z[0];
        if (typeof D !== "string") throw new TypeError("expected header name to be a string");
        let G = yK0(Z[1]) ? Z[1] : [Z[1]],
            F = !1;
        for (let I of G) {
            if (I === void 0) continue;
            if (B && !F) F = !0, yield [D, null];
            yield [D, I]
        }
    }
}
var F5 = (A) => {
    let B = new Headers,
        Q = new Set;
    for (let Z of A) {
        let D = new Set;
        for (let [G, F] of Ek6(Z)) {
            let I = G.toLowerCase();
            if (!D.has(I)) B.delete(G), D.add(I);
            if (F === null) B.delete(G), Q.add(I);
            else B.append(G, F), Q.delete(I)
        }
    }
    return {
        [t5B]: !0,
        values: B,
        nulls: Q
    }
};

function A3B(A) {
    return A.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent)
}
var e5B = Object.freeze(Object.create(null)),
    Uk6 = (A = A3B) => function B(Q, ...Z) {
        if (Q.length === 1) return Q[0];
        let D = !1,
            G = [],
            F = Q.reduce((J, X, V) => {
                if (/[?#]/.test(X)) D = !0;
                let C = Z[V],
                    K = (D ? encodeURIComponent : A)("" + C);
                if (V !== Z.length && (C == null || typeof C === "object" && C.toString === Object.getPrototypeOf(Object.getPrototypeOf(C.hasOwnProperty ?? e5B) ?? e5B)?.toString)) K = C + "", G.push({
                    start: J.length + X.length,
                    length: K.length,
                    error: `Value of type ${Object.prototype.toString.call(C).slice(8,-1)} is not a valid path parameter`
                });
                return J + X + (V === Z.length ? "" : K)
            }, ""),
            I = F.split(/[?#]/, 1)[0],
            Y = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
            W;
        while ((W = Y.exec(I)) !== null) G.push({
            start: W.index,
            length: W[0].length,
            error: `Value "${W[0]}" can't be safely passed as a path parameter`
        });
        if (G.sort((J, X) => J.start - X.start), G.length > 0) {
            let J = 0,
                X = G.reduce((V, C) => {
                    let K = " ".repeat(C.start - J),
                        H = "^".repeat(C.length);
                    return J = C.start + C.length, V + K + H
                }, "");
            throw new P9(`Path parameters result in path with invalid segments:
${G.map((V)=>V.error).join(`
`)}
${F}
${X}`)
        }
        return F
    },
    VJ = Uk6(A3B);
class xZ1 extends vF {
    list(A = {}, B) {
        let {
            betas: Q,
            ...Z
        } = A ?? {};
        return this._client.getAPIList("/v1/files", U$, {
            query: Z,
            ...B,
            headers: F5([{
                "anthropic-beta": [...Q ?? [], "files-api-2025-04-14"].toString()
            }, B?.headers])
        })
    }
    delete(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.delete(VJ`/v1/files/${A}`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "files-api-2025-04-14"].toString()
            }, Q?.headers])
        })
    }
    download(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.get(VJ`/v1/files/${A}/content`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "files-api-2025-04-14"].toString(),
                Accept: "application/binary"
            }, Q?.headers]),
            __binaryResponse: !0
        })
    }
    retrieveMetadata(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.get(VJ`/v1/files/${A}`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "files-api-2025-04-14"].toString()
            }, Q?.headers])
        })
    }
    upload(A, B) {
        let {
            betas: Q,
            ...Z
        } = A;
        return this._client.post("/v1/files", r5B({
            body: Z,
            ...B,
            headers: F5([{
                "anthropic-beta": [...Q ?? [], "files-api-2025-04-14"].toString()
            }, B?.headers])
        }, this._client))
    }
}
class vZ1 extends vF {
    retrieve(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.get(VJ`/v1/models/${A}?beta=true`, {
            ...Q,
            headers: F5([{
                ...Z?.toString() != null ? {
                    "anthropic-beta": Z?.toString()
                } : void 0
            }, Q?.headers])
        })
    }
    list(A = {}, B) {
        let {
            betas: Q,
            ...Z
        } = A ?? {};
        return this._client.getAPIList("/v1/models?beta=true", U$, {
            query: Z,
            ...B,
            headers: F5([{
                ...Q?.toString() != null ? {
                    "anthropic-beta": Q?.toString()
                } : void 0
            }, B?.headers])
        })
    }
}
class je {
    constructor(A, B) {
        this.iterator = A, this.controller = B
    }
    async * decoder() {
        let A = new gx;
        for await (let B of this.iterator) for (let Q of A.decode(B)) yield JSON.parse(Q);
        for (let B of A.flush()) yield JSON.parse(B)
    } [Symbol.asyncIterator]() {
        return this.decoder()
    }
    static fromResponse(A, B) {
        if (!A.body) {
            if (B.abort(), typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") throw new P9("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
            throw new P9("Attempted to iterate over a response with no body")
        }
        return new je(SZ1(A.body), B)
    }
}
class bZ1 extends vF {
    create(A, B) {
        let {
            betas: Q,
            ...Z
        } = A;
        return this._client.post("/v1/messages/batches?beta=true", {
            body: Z,
            ...B,
            headers: F5([{
                "anthropic-beta": [...Q ?? [], "message-batches-2024-09-24"].toString()
            }, B?.headers])
        })
    }
    retrieve(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.get(VJ`/v1/messages/batches/${A}?beta=true`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "message-batches-2024-09-24"].toString()
            }, Q?.headers])
        })
    }
    list(A = {}, B) {
        let {
            betas: Q,
            ...Z
        } = A ?? {};
        return this._client.getAPIList("/v1/messages/batches?beta=true", U$, {
            query: Z,
            ...B,
            headers: F5([{
                "anthropic-beta": [...Q ?? [], "message-batches-2024-09-24"].toString()
            }, B?.headers])
        })
    }
    delete(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.delete(VJ`/v1/messages/batches/${A}?beta=true`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "message-batches-2024-09-24"].toString()
            }, Q?.headers])
        })
    }
    cancel(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.post(VJ`/v1/messages/batches/${A}/cancel?beta=true`, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...Z ?? [], "message-batches-2024-09-24"].toString()
            }, Q?.headers])
        })
    }
    async results(A, B = {}, Q) {
        let Z = await this.retrieve(A);
        if (!Z.results_url) throw new P9(`No batch \`results_url\`; Has it finished processing? ${Z.processing_status} - ${Z.id}`);
        let {
            betas: D
        } = B ?? {};
        return this._client.get(Z.results_url, {
            ...Q,
            headers: F5([{
                "anthropic-beta": [...D ?? [], "message-batches-2024-09-24"].toString(),
                Accept: "application/binary"
            }, Q?.headers]),
            stream: !0,
            __binaryResponse: !0
        })._thenUnwrap((G, F) => je.fromResponse(F.response, F.controller))
    }
}
var Nk6 = (A) => {
        let B = 0,
            Q = [];
        while (B < A.length) {
            let Z = A[B];
            if (Z === "\\") {
                B++;
                continue
            }
            if (Z === "{") {
                Q.push({
                    type: "brace",
                    value: "{"
                }), B++;
                continue
            }
            if (Z === "}") {
                Q.push({
                    type: "brace",
                    value: "}"
                }), B++;
                continue
            }
            if (Z === "[") {
                Q.push({
                    type: "paren",
                    value: "["
                }), B++;
                continue
            }
            if (Z === "]") {
                Q.push({
                    type: "paren",
                    value: "]"
                }), B++;
                continue
            }
            if (Z === ":") {
                Q.push({
                    type: "separator",
                    value: ":"
                }), B++;
                continue
            }
            if (Z === ",") {
                Q.push({
                    type: "delimiter",
                    value: ","
                }), B++;
                continue
            }
            if (Z === '"') {
                let I = "",
                    Y = !1;
                Z = A[++B];
                while (Z !== '"') {
                    if (B === A.length) {
                        Y = !0;
                        break
                    }
                    if (Z === "\\") {
                        if (B++, B === A.length) {
                            Y = !0;
                            break
                        }
                        I += Z + A[B], Z = A[++B]
                    } else I += Z, Z = A[++B]
                }
                if (Z = A[++B], !Y) Q.push({
                    type: "string",
                    value: I
                });
                continue
            }
            if (Z && /\s/.test(Z)) {
                B++;
                continue
            }
            let G = /[0-9]/;
            if (Z && G.test(Z) || Z === "-" || Z === ".") {
                let I = "";
                if (Z === "-") I += Z, Z = A[++B];
                while (Z && G.test(Z) || Z === ".") I += Z, Z = A[++B];
                Q.push({
                    type: "number",
                    value: I
                });
                continue
            }
            let F = /[a-z]/i;
            if (Z && F.test(Z)) {
                let I = "";
                while (Z && F.test(Z)) {
                    if (B === A.length) break;
                    I += Z, Z = A[++B]
                }
                if (I == "true" || I == "false" || I === "null") Q.push({
                    type: "name",
                    value: I
                });
                else {
                    B++;
                    continue
                }
                continue
            }
            B++
        }
        return Q
    },
    ke = (A) => {
        if (A.length === 0) return A;
        let B = A[A.length - 1];
        switch (B.type) {
            case "separator":
                return A = A.slice(0, A.length - 1), ke(A);
                break;
            case "number":
                let Q = B.value[B.value.length - 1];
                if (Q === "." || Q === "-") return A = A.slice(0, A.length - 1), ke(A);
            case "string":
                let Z = A[A.length - 2];
                if (Z?.type === "delimiter") return A = A.slice(0, A.length - 1), ke(A);
                else if (Z?.type === "brace" && Z.value === "{") return A = A.slice(0, A.length - 1), ke(A);
                break;
            case "delimiter":
                return A = A.slice(0, A.length - 1), ke(A);
                break
        }
        return A
    },
    Lk6 = (A) => {
        let B = [];
        if (A.map((Q) => {
                if (Q.type === "brace")
                    if (Q.value === "{") B.push("}");
                    else B.splice(B.lastIndexOf("}"), 1);
                if (Q.type === "paren")
                    if (Q.value === "[") B.push("]");
                    else B.splice(B.lastIndexOf("]"), 1)
            }), B.length > 0) B.reverse().map((Q) => {
            if (Q === "}") A.push({
                type: "brace",
                value: "}"
            });
            else if (Q === "]") A.push({
                type: "paren",
                value: "]"
            })
        });
        return A
    },
    Mk6 = (A) => {
        let B = "";
        return A.map((Q) => {
            switch (Q.type) {
                case "string":
                    B += '"' + Q.value + '"';
                    break;
                default:
                    B += Q.value;
                    break
            }
        }), B
    },
    Zk1 = (A) => JSON.parse(Mk6(Lk6(ke(Nk6(A)))));
var fE, ux, fZ1, Dk1, hZ1, gZ1, Gk1, uZ1, nP, mZ1, Fk1, Ik1, ye, Yk1, Wk1, dK0, B3B, Jk1, cK0, lK0, pK0, Q3B, Z3B = "__json_buf";

function D3B(A) {
    return A.type === "tool_use" || A.type === "server_tool_use" || A.type === "mcp_tool_use"
}