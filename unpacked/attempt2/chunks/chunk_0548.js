/* chunk:548 bytes:[12843239, 12861319) size:18080 source:unpacked-cli.js */
class aZ1 {
    constructor() {
        hE.add(this), this.messages = [], this.receivedMessages = [], dx.set(this, void 0), this.controller = new AbortController, cZ1.set(this, void 0), Vk1.set(this, () => {}), lZ1.set(this, () => {}), pZ1.set(this, void 0), Ck1.set(this, () => {}), iZ1.set(this, () => {}), aP.set(this, {}), nZ1.set(this, !1), Kk1.set(this, !1), Hk1.set(this, !1), xe.set(this, !1), zk1.set(this, void 0), Ek1.set(this, void 0), nK0.set(this, (A) => {
            if ($Q(this, Kk1, !0, "f"), lP(A)) A = new xF;
            if (A instanceof xF) return $Q(this, Hk1, !0, "f"), this._emit("abort", A);
            if (A instanceof P9) return this._emit("error", A);
            if (A instanceof Error) {
                let B = new P9(A.message);
                return B.cause = A, this._emit("error", B)
            }
            return this._emit("error", new P9(String(A)))
        }), $Q(this, cZ1, new Promise((A, B) => {
            $Q(this, Vk1, A, "f"), $Q(this, lZ1, B, "f")
        }), "f"), $Q(this, pZ1, new Promise((A, B) => {
            $Q(this, Ck1, A, "f"), $Q(this, iZ1, B, "f")
        }), "f"), _A(this, cZ1, "f").catch(() => {}), _A(this, pZ1, "f").catch(() => {})
    }
    get response() {
        return _A(this, zk1, "f")
    }
    get request_id() {
        return _A(this, Ek1, "f")
    }
    async withResponse() {
        let A = await _A(this, cZ1, "f");
        if (!A) throw new Error("Could not resolve a `Response` object");
        return {
            data: this,
            response: A,
            request_id: A.headers.get("request-id")
        }
    }
    static fromReadableStream(A) {
        let B = new aZ1;
        return B._run(() => B._fromReadableStream(A)), B
    }
    static createMessage(A, B, Q) {
        let Z = new aZ1;
        for (let D of B.messages) Z._addMessageParam(D);
        return Z._run(() => Z._createMessage(A, {
            ...B,
            stream: !0
        }, {
            ...Q,
            headers: {
                ...Q?.headers,
                "X-Stainless-Helper-Method": "stream"
            }
        })), Z
    }
    _run(A) {
        A().then(() => {
            this._emitFinal(), this._emit("end")
        }, _A(this, nK0, "f"))
    }
    _addMessageParam(A) {
        this.messages.push(A)
    }
    _addMessage(A, B = !0) {
        if (this.receivedMessages.push(A), B) this._emit("message", A)
    }
    async _createMessage(A, B, Q) {
        let Z = Q?.signal,
            D;
        if (Z) {
            if (Z.aborted) this.controller.abort();
            D = this.controller.abort.bind(this.controller), Z.addEventListener("abort", D)
        }
        try {
            _A(this, hE, "m", aK0).call(this);
            let {
                response: G,
                data: F
            } = await A.create({
                ...B,
                stream: !0
            }, {
                ...Q,
                signal: this.controller.signal
            }).withResponse();
            this._connected(G);
            for await (let I of F) _A(this, hE, "m", sK0).call(this, I);
            if (F.controller.signal?.aborted) throw new xF;
            _A(this, hE, "m", rK0).call(this)
        } finally {
            if (Z && D) Z.removeEventListener("abort", D)
        }
    }
    _connected(A) {
        if (this.ended) return;
        $Q(this, zk1, A, "f"), $Q(this, Ek1, A?.headers.get("request-id"), "f"), _A(this, Vk1, "f").call(this, A), this._emit("connect")
    }
    get ended() {
        return _A(this, nZ1, "f")
    }
    get errored() {
        return _A(this, Kk1, "f")
    }
    get aborted() {
        return _A(this, Hk1, "f")
    }
    abort() {
        this.controller.abort()
    }
    on(A, B) {
        return (_A(this, aP, "f")[A] || (_A(this, aP, "f")[A] = [])).push({
            listener: B
        }), this
    }
    off(A, B) {
        let Q = _A(this, aP, "f")[A];
        if (!Q) return this;
        let Z = Q.findIndex((D) => D.listener === B);
        if (Z >= 0) Q.splice(Z, 1);
        return this
    }
    once(A, B) {
        return (_A(this, aP, "f")[A] || (_A(this, aP, "f")[A] = [])).push({
            listener: B,
            once: !0
        }), this
    }
    emitted(A) {
        return new Promise((B, Q) => {
            if ($Q(this, xe, !0, "f"), A !== "error") this.once("error", Q);
            this.once(A, B)
        })
    }
    async done() {
        $Q(this, xe, !0, "f"), await _A(this, pZ1, "f")
    }
    get currentMessage() {
        return _A(this, dx, "f")
    }
    async finalMessage() {
        return await this.done(), _A(this, hE, "m", iK0).call(this)
    }
    async finalText() {
        return await this.done(), _A(this, hE, "m", I3B).call(this)
    }
    _emit(A, ...B) {
        if (_A(this, nZ1, "f")) return;
        if (A === "end") $Q(this, nZ1, !0, "f"), _A(this, Ck1, "f").call(this);
        let Q = _A(this, aP, "f")[A];
        if (Q) _A(this, aP, "f")[A] = Q.filter((Z) => !Z.once), Q.forEach(({
            listener: Z
        }) => Z(...B));
        if (A === "abort") {
            let Z = B[0];
            if (!_A(this, xe, "f") && !Q?.length) Promise.reject(Z);
            _A(this, lZ1, "f").call(this, Z), _A(this, iZ1, "f").call(this, Z), this._emit("end");
            return
        }
        if (A === "error") {
            let Z = B[0];
            if (!_A(this, xe, "f") && !Q?.length) Promise.reject(Z);
            _A(this, lZ1, "f").call(this, Z), _A(this, iZ1, "f").call(this, Z), this._emit("end")
        }
    }
    _emitFinal() {
        if (this.receivedMessages.at(-1)) this._emit("finalMessage", _A(this, hE, "m", iK0).call(this))
    }
    async _fromReadableStream(A, B) {
        let Q = B?.signal,
            Z;
        if (Q) {
            if (Q.aborted) this.controller.abort();
            Z = this.controller.abort.bind(this.controller), Q.addEventListener("abort", Z)
        }
        try {
            _A(this, hE, "m", aK0).call(this), this._connected(null);
            let D = XX.fromReadableStream(A, this.controller);
            for await (let G of D) _A(this, hE, "m", sK0).call(this, G);
            if (D.controller.signal?.aborted) throw new xF;
            _A(this, hE, "m", rK0).call(this)
        } finally {
            if (Q && Z) Q.removeEventListener("abort", Z)
        }
    } [(dx = new WeakMap, cZ1 = new WeakMap, Vk1 = new WeakMap, lZ1 = new WeakMap, pZ1 = new WeakMap, Ck1 = new WeakMap, iZ1 = new WeakMap, aP = new WeakMap, nZ1 = new WeakMap, Kk1 = new WeakMap, Hk1 = new WeakMap, xe = new WeakMap, zk1 = new WeakMap, Ek1 = new WeakMap, nK0 = new WeakMap, hE = new WeakSet, iK0 = function A() {
        if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
        return this.receivedMessages.at(-1)
    }, I3B = function A() {
        if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
        let B = this.receivedMessages.at(-1).content.filter((Q) => Q.type === "text").map((Q) => Q.text);
        if (B.length === 0) throw new P9("stream ended without producing a content block with type=text");
        return B.join(" ")
    }, aK0 = function A() {
        if (this.ended) return;
        $Q(this, dx, void 0, "f")
    }, sK0 = function A(B) {
        if (this.ended) return;
        let Q = _A(this, hE, "m", Y3B).call(this, B);
        switch (this._emit("streamEvent", B, Q), B.type) {
            case "content_block_delta": {
                let Z = Q.content.at(-1);
                switch (B.delta.type) {
                    case "text_delta": {
                        if (Z.type === "text") this._emit("text", B.delta.text, Z.text || "");
                        break
                    }
                    case "citations_delta": {
                        if (Z.type === "text") this._emit("citation", B.delta.citation, Z.citations ?? []);
                        break
                    }
                    case "input_json_delta": {
                        if (J3B(Z) && Z.input) this._emit("inputJson", B.delta.partial_json, Z.input);
                        break
                    }
                    case "thinking_delta": {
                        if (Z.type === "thinking") this._emit("thinking", B.delta.thinking, Z.thinking);
                        break
                    }
                    case "signature_delta": {
                        if (Z.type === "thinking") this._emit("signature", Z.signature);
                        break
                    }
                    default:
                        X3B(B.delta)
                }
                break
            }
            case "message_stop": {
                this._addMessageParam(Q), this._addMessage(Q, !0);
                break
            }
            case "content_block_stop": {
                this._emit("contentBlock", Q.content.at(-1));
                break
            }
            case "message_start": {
                $Q(this, dx, Q, "f");
                break
            }
            case "content_block_start":
            case "message_delta":
                break
        }
    }, rK0 = function A() {
        if (this.ended) throw new P9("stream has ended, this shouldn't happen");
        let B = _A(this, dx, "f");
        if (!B) throw new P9("request ended without sending any chunks");
        return $Q(this, dx, void 0, "f"), B
    }, Y3B = function A(B) {
        let Q = _A(this, dx, "f");
        if (B.type === "message_start") {
            if (Q) throw new P9(`Unexpected event order, got ${B.type} before receiving "message_stop"`);
            return B.message
        }
        if (!Q) throw new P9(`Unexpected event order, got ${B.type} before "message_start"`);
        switch (B.type) {
            case "message_stop":
                return Q;
            case "message_delta":
                if (Q.stop_reason = B.delta.stop_reason, Q.stop_sequence = B.delta.stop_sequence, Q.usage.output_tokens = B.usage.output_tokens, B.usage.input_tokens != null) Q.usage.input_tokens = B.usage.input_tokens;
                if (B.usage.cache_creation_input_tokens != null) Q.usage.cache_creation_input_tokens = B.usage.cache_creation_input_tokens;
                if (B.usage.cache_read_input_tokens != null) Q.usage.cache_read_input_tokens = B.usage.cache_read_input_tokens;
                if (B.usage.server_tool_use != null) Q.usage.server_tool_use = B.usage.server_tool_use;
                return Q;
            case "content_block_start":
                return Q.content.push({
                    ...B.content_block
                }), Q;
            case "content_block_delta": {
                let Z = Q.content.at(B.index);
                switch (B.delta.type) {
                    case "text_delta": {
                        if (Z?.type === "text") Q.content[B.index] = {
                            ...Z,
                            text: (Z.text || "") + B.delta.text
                        };
                        break
                    }
                    case "citations_delta": {
                        if (Z?.type === "text") Q.content[B.index] = {
                            ...Z,
                            citations: [...Z.citations ?? [], B.delta.citation]
                        };
                        break
                    }
                    case "input_json_delta": {
                        if (Z && J3B(Z)) {
                            let D = Z[W3B] || "";
                            D += B.delta.partial_json;
                            let G = {
                                ...Z
                            };
                            if (Object.defineProperty(G, W3B, {
                                    value: D,
                                    enumerable: !1,
                                    writable: !0
                                }), D) G.input = Zk1(D);
                            Q.content[B.index] = G
                        }
                        break
                    }
                    case "thinking_delta": {
                        if (Z?.type === "thinking") Q.content[B.index] = {
                            ...Z,
                            thinking: Z.thinking + B.delta.thinking
                        };
                        break
                    }
                    case "signature_delta": {
                        if (Z?.type === "thinking") Q.content[B.index] = {
                            ...Z,
                            signature: B.delta.signature
                        };
                        break
                    }
                    default:
                        X3B(B.delta)
                }
                return Q
            }
            case "content_block_stop":
                return Q
        }
    }, Symbol.asyncIterator)]() {
        let A = [],
            B = [],
            Q = !1;
        return this.on("streamEvent", (Z) => {
            let D = B.shift();
            if (D) D.resolve(Z);
            else A.push(Z)
        }), this.on("end", () => {
            Q = !0;
            for (let Z of B) Z.resolve(void 0);
            B.length = 0
        }), this.on("abort", (Z) => {
            Q = !0;
            for (let D of B) D.reject(Z);
            B.length = 0
        }), this.on("error", (Z) => {
            Q = !0;
            for (let D of B) D.reject(Z);
            B.length = 0
        }), {
            next: async () => {
                if (!A.length) {
                    if (Q) return {
                        value: void 0,
                        done: !0
                    };
                    return new Promise((D, G) => B.push({
                        resolve: D,
                        reject: G
                    })).then((D) => D ? {
                        value: D,
                        done: !1
                    } : {
                        value: void 0,
                        done: !0
                    })
                }
                return {
                    value: A.shift(),
                    done: !1
                }
            },
            return: async () => {
                return this.abort(), {
                    value: void 0,
                    done: !0
                }
            }
        }
    }
    toReadableStream() {
        return new XX(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream()
    }
}

function X3B(A) {}
class sZ1 extends vF {
    create(A, B) {
        return this._client.post("/v1/messages/batches", {
            body: A,
            ...B
        })
    }
    retrieve(A, B) {
        return this._client.get(VJ`/v1/messages/batches/${A}`, B)
    }
    list(A = {}, B) {
        return this._client.getAPIList("/v1/messages/batches", U$, {
            query: A,
            ...B
        })
    }
    delete(A, B) {
        return this._client.delete(VJ`/v1/messages/batches/${A}`, B)
    }
    cancel(A, B) {
        return this._client.post(VJ`/v1/messages/batches/${A}/cancel`, B)
    }
    async results(A, B) {
        let Q = await this.retrieve(A);
        if (!Q.results_url) throw new P9(`No batch \`results_url\`; Has it finished processing? ${Q.processing_status} - ${Q.id}`);
        return this._client.get(Q.results_url, {
            ...B,
            headers: F5([{
                Accept: "application/binary"
            }, B?.headers]),
            stream: !0,
            __binaryResponse: !0
        })._thenUnwrap((Z, D) => je.fromResponse(D.response, D.controller))
    }
}
class w$ extends vF {
    constructor() {
        super(...arguments);
        this.batches = new sZ1(this._client)
    }
    create(A, B) {
        if (A.model in V3B) console.warn(`The model '${A.model}' is deprecated and will reach end-of-life on ${V3B[A.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
        let Q = this._client._options.timeout;
        if (!A.stream && Q == null) {
            let Z = Xk1[A.model] ?? void 0;
            Q = this._client.calculateNonstreamingTimeout(A.max_tokens, Z)
        }
        return this._client.post("/v1/messages", {
            body: A,
            timeout: Q ?? 600000,
            ...B,
            stream: A.stream ?? !1
        })
    }
    stream(A, B) {
        return aZ1.createMessage(this, A, B)
    }
    countTokens(A, B) {
        return this._client.post("/v1/messages/count_tokens", {
            body: A,
            ...B
        })
    }
}
var V3B = {
    "claude-1.3": "November 6th, 2024",
    "claude-1.3-100k": "November 6th, 2024",
    "claude-instant-1.1": "November 6th, 2024",
    "claude-instant-1.1-100k": "November 6th, 2024",
    "claude-instant-1.2": "November 6th, 2024",
    "claude-3-sonnet-20240229": "July 21st, 2025",
    "claude-2.1": "July 21st, 2025",
    "claude-2.0": "July 21st, 2025"
};
w$.Batches = sZ1;
class ve extends vF {
    retrieve(A, B = {}, Q) {
        let {
            betas: Z
        } = B ?? {};
        return this._client.get(VJ`/v1/models/${A}`, {
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
        return this._client.getAPIList("/v1/models", U$, {
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
var rZ1 = (A) => {
    if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
    if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
    return
};
var tK0, eK0, Uk1, C3B;