/* chunk:547 bytes:[12825303, 12843238) size:17935 source:unpacked-cli.js */
class dZ1 {
    constructor() {
        fE.add(this), this.messages = [], this.receivedMessages = [], ux.set(this, void 0), this.controller = new AbortController, fZ1.set(this, void 0), Dk1.set(this, () => {}), hZ1.set(this, () => {}), gZ1.set(this, void 0), Gk1.set(this, () => {}), uZ1.set(this, () => {}), nP.set(this, {}), mZ1.set(this, !1), Fk1.set(this, !1), Ik1.set(this, !1), ye.set(this, !1), Yk1.set(this, void 0), Wk1.set(this, void 0), Jk1.set(this, (A) => {
            if ($Q(this, Fk1, !0, "f"), lP(A)) A = new xF;
            if (A instanceof xF) return $Q(this, Ik1, !0, "f"), this._emit("abort", A);
            if (A instanceof P9) return this._emit("error", A);
            if (A instanceof Error) {
                let B = new P9(A.message);
                return B.cause = A, this._emit("error", B)
            }
            return this._emit("error", new P9(String(A)))
        }), $Q(this, fZ1, new Promise((A, B) => {
            $Q(this, Dk1, A, "f"), $Q(this, hZ1, B, "f")
        }), "f"), $Q(this, gZ1, new Promise((A, B) => {
            $Q(this, Gk1, A, "f"), $Q(this, uZ1, B, "f")
        }), "f"), _A(this, fZ1, "f").catch(() => {}), _A(this, gZ1, "f").catch(() => {})
    }
    get response() {
        return _A(this, Yk1, "f")
    }
    get request_id() {
        return _A(this, Wk1, "f")
    }
    async withResponse() {
        let A = await _A(this, fZ1, "f");
        if (!A) throw new Error("Could not resolve a `Response` object");
        return {
            data: this,
            response: A,
            request_id: A.headers.get("request-id")
        }
    }
    static fromReadableStream(A) {
        let B = new dZ1;
        return B._run(() => B._fromReadableStream(A)), B
    }
    static createMessage(A, B, Q) {
        let Z = new dZ1;
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
        }, _A(this, Jk1, "f"))
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
            _A(this, fE, "m", cK0).call(this);
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
            for await (let I of F) _A(this, fE, "m", lK0).call(this, I);
            if (F.controller.signal?.aborted) throw new xF;
            _A(this, fE, "m", pK0).call(this)
        } finally {
            if (Z && D) Z.removeEventListener("abort", D)
        }
    }
    _connected(A) {
        if (this.ended) return;
        $Q(this, Yk1, A, "f"), $Q(this, Wk1, A?.headers.get("request-id"), "f"), _A(this, Dk1, "f").call(this, A), this._emit("connect")
    }
    get ended() {
        return _A(this, mZ1, "f")
    }
    get errored() {
        return _A(this, Fk1, "f")
    }
    get aborted() {
        return _A(this, Ik1, "f")
    }
    abort() {
        this.controller.abort()
    }
    on(A, B) {
        return (_A(this, nP, "f")[A] || (_A(this, nP, "f")[A] = [])).push({
            listener: B
        }), this
    }
    off(A, B) {
        let Q = _A(this, nP, "f")[A];
        if (!Q) return this;
        let Z = Q.findIndex((D) => D.listener === B);
        if (Z >= 0) Q.splice(Z, 1);
        return this
    }
    once(A, B) {
        return (_A(this, nP, "f")[A] || (_A(this, nP, "f")[A] = [])).push({
            listener: B,
            once: !0
        }), this
    }
    emitted(A) {
        return new Promise((B, Q) => {
            if ($Q(this, ye, !0, "f"), A !== "error") this.once("error", Q);
            this.once(A, B)
        })
    }
    async done() {
        $Q(this, ye, !0, "f"), await _A(this, gZ1, "f")
    }
    get currentMessage() {
        return _A(this, ux, "f")
    }
    async finalMessage() {
        return await this.done(), _A(this, fE, "m", dK0).call(this)
    }
    async finalText() {
        return await this.done(), _A(this, fE, "m", B3B).call(this)
    }
    _emit(A, ...B) {
        if (_A(this, mZ1, "f")) return;
        if (A === "end") $Q(this, mZ1, !0, "f"), _A(this, Gk1, "f").call(this);
        let Q = _A(this, nP, "f")[A];
        if (Q) _A(this, nP, "f")[A] = Q.filter((Z) => !Z.once), Q.forEach(({
            listener: Z
        }) => Z(...B));
        if (A === "abort") {
            let Z = B[0];
            if (!_A(this, ye, "f") && !Q?.length) Promise.reject(Z);
            _A(this, hZ1, "f").call(this, Z), _A(this, uZ1, "f").call(this, Z), this._emit("end");
            return
        }
        if (A === "error") {
            let Z = B[0];
            if (!_A(this, ye, "f") && !Q?.length) Promise.reject(Z);
            _A(this, hZ1, "f").call(this, Z), _A(this, uZ1, "f").call(this, Z), this._emit("end")
        }
    }
    _emitFinal() {
        if (this.receivedMessages.at(-1)) this._emit("finalMessage", _A(this, fE, "m", dK0).call(this))
    }
    async _fromReadableStream(A, B) {
        let Q = B?.signal,
            Z;
        if (Q) {
            if (Q.aborted) this.controller.abort();
            Z = this.controller.abort.bind(this.controller), Q.addEventListener("abort", Z)
        }
        try {
            _A(this, fE, "m", cK0).call(this), this._connected(null);
            let D = XX.fromReadableStream(A, this.controller);
            for await (let G of D) _A(this, fE, "m", lK0).call(this, G);
            if (D.controller.signal?.aborted) throw new xF;
            _A(this, fE, "m", pK0).call(this)
        } finally {
            if (Q && Z) Q.removeEventListener("abort", Z)
        }
    } [(ux = new WeakMap, fZ1 = new WeakMap, Dk1 = new WeakMap, hZ1 = new WeakMap, gZ1 = new WeakMap, Gk1 = new WeakMap, uZ1 = new WeakMap, nP = new WeakMap, mZ1 = new WeakMap, Fk1 = new WeakMap, Ik1 = new WeakMap, ye = new WeakMap, Yk1 = new WeakMap, Wk1 = new WeakMap, Jk1 = new WeakMap, fE = new WeakSet, dK0 = function A() {
        if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
        return this.receivedMessages.at(-1)
    }, B3B = function A() {
        if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
        let B = this.receivedMessages.at(-1).content.filter((Q) => Q.type === "text").map((Q) => Q.text);
        if (B.length === 0) throw new P9("stream ended without producing a content block with type=text");
        return B.join(" ")
    }, cK0 = function A() {
        if (this.ended) return;
        $Q(this, ux, void 0, "f")
    }, lK0 = function A(B) {
        if (this.ended) return;
        let Q = _A(this, fE, "m", Q3B).call(this, B);
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
                        if (D3B(Z) && Z.input) this._emit("inputJson", B.delta.partial_json, Z.input);
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
                        G3B(B.delta)
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
                $Q(this, ux, Q, "f");
                break
            }
            case "content_block_start":
            case "message_delta":
                break
        }
    }, pK0 = function A() {
        if (this.ended) throw new P9("stream has ended, this shouldn't happen");
        let B = _A(this, ux, "f");
        if (!B) throw new P9("request ended without sending any chunks");
        return $Q(this, ux, void 0, "f"), B
    }, Q3B = function A(B) {
        let Q = _A(this, ux, "f");
        if (B.type === "message_start") {
            if (Q) throw new P9(`Unexpected event order, got ${B.type} before receiving "message_stop"`);
            return B.message
        }
        if (!Q) throw new P9(`Unexpected event order, got ${B.type} before "message_start"`);
        switch (B.type) {
            case "message_stop":
                return Q;
            case "message_delta":
                if (Q.container = B.delta.container, Q.stop_reason = B.delta.stop_reason, Q.stop_sequence = B.delta.stop_sequence, Q.usage.output_tokens = B.usage.output_tokens, B.usage.input_tokens != null) Q.usage.input_tokens = B.usage.input_tokens;
                if (B.usage.cache_creation_input_tokens != null) Q.usage.cache_creation_input_tokens = B.usage.cache_creation_input_tokens;
                if (B.usage.cache_read_input_tokens != null) Q.usage.cache_read_input_tokens = B.usage.cache_read_input_tokens;
                if (B.usage.server_tool_use != null) Q.usage.server_tool_use = B.usage.server_tool_use;
                return Q;
            case "content_block_start":
                return Q.content.push(B.content_block), Q;
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
                        if (Z && D3B(Z)) {
                            let D = Z[Z3B] || "";
                            D += B.delta.partial_json;
                            let G = {
                                ...Z
                            };
                            if (Object.defineProperty(G, Z3B, {
                                    value: D,
                                    enumerable: !1,
                                    writable: !0
                                }), D) try {
                                G.input = Zk1(D)
                            } catch (F) {
                                let I = new P9(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${F}. JSON: ${D}`);
                                _A(this, Jk1, "f").call(this, I)
                            }
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
                        G3B(B.delta)
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

function G3B(A) {}
var Xk1 = {
    "claude-opus-4-20250514": 8192,
    "claude-opus-4-0": 8192,
    "claude-4-opus-20250514": 8192,
    "anthropic.claude-opus-4-20250514-v1:0": 8192,
    "claude-opus-4@20250514": 8192
};
var F3B = {
    "claude-1.3": "November 6th, 2024",
    "claude-1.3-100k": "November 6th, 2024",
    "claude-instant-1.1": "November 6th, 2024",
    "claude-instant-1.1-100k": "November 6th, 2024",
    "claude-instant-1.2": "November 6th, 2024",
    "claude-3-sonnet-20240229": "July 21st, 2025",
    "claude-2.1": "July 21st, 2025",
    "claude-2.0": "July 21st, 2025"
};
class _e extends vF {
    constructor() {
        super(...arguments);
        this.batches = new bZ1(this._client)
    }
    create(A, B) {
        let {
            betas: Q,
            ...Z
        } = A;
        if (Z.model in F3B) console.warn(`The model '${Z.model}' is deprecated and will reach end-of-life on ${F3B[Z.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
        let D = this._client._options.timeout;
        if (!Z.stream && D == null) {
            let G = Xk1[Z.model] ?? void 0;
            D = this._client.calculateNonstreamingTimeout(Z.max_tokens, G)
        }
        return this._client.post("/v1/messages?beta=true", {
            body: Z,
            timeout: D ?? 600000,
            ...B,
            headers: F5([{
                ...Q?.toString() != null ? {
                    "anthropic-beta": Q?.toString()
                } : void 0
            }, B?.headers]),
            stream: A.stream ?? !1
        })
    }
    stream(A, B) {
        return dZ1.createMessage(this, A, B)
    }
    countTokens(A, B) {
        let {
            betas: Q,
            ...Z
        } = A;
        return this._client.post("/v1/messages/count_tokens?beta=true", {
            body: Z,
            ...B,
            headers: F5([{
                "anthropic-beta": [...Q ?? [], "token-counting-2024-11-01"].toString()
            }, B?.headers])
        })
    }
}
_e.Batches = bZ1;
class iK extends vF {
    constructor() {
        super(...arguments);
        this.models = new vZ1(this._client), this.messages = new _e(this._client), this.files = new xZ1(this._client)
    }
}
iK.Models = vZ1;
iK.Messages = _e;
iK.Files = xZ1;
class mx extends vF {
    create(A, B) {
        let {
            betas: Q,
            ...Z
        } = A;
        return this._client.post("/v1/complete", {
            body: Z,
            timeout: this._client._options.timeout ?? 600000,
            ...B,
            headers: F5([{
                ...Q?.toString() != null ? {
                    "anthropic-beta": Q?.toString()
                } : void 0
            }, B?.headers]),
            stream: A.stream ?? !1
        })
    }
}
var hE, dx, cZ1, Vk1, lZ1, pZ1, Ck1, iZ1, aP, nZ1, Kk1, Hk1, xe, zk1, Ek1, iK0, I3B, nK0, aK0, sK0, rK0, Y3B, W3B = "__json_buf";

function J3B(A) {
    return A.type === "tool_use" || A.type === "server_tool_use"
}