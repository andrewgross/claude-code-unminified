/* chunk:551 bytes:[12894311, 12914270) size:19959 source:unpacked-cli.js */
class DD1 {
    constructor(A) {
        this._options = A, this._requestMessageId = 0, this._requestHandlers = new Map, this._requestHandlerAbortControllers = new Map, this._notificationHandlers = new Map, this._responseHandlers = new Map, this._progressHandlers = new Map, this._timeoutInfo = new Map, this.setNotificationHandler(Tk1, (B) => {
            let Q = this._requestHandlerAbortControllers.get(B.params.requestId);
            Q === null || Q === void 0 || Q.abort(B.params.reason)
        }), this.setNotificationHandler(jk1, (B) => {
            this._onprogress(B)
        }), this.setRequestHandler(Sk1, (B) => ({}))
    }
    _setupTimeout(A, B, Q, Z, D = !1) {
        this._timeoutInfo.set(A, {
            timeoutId: setTimeout(Z, B),
            startTime: Date.now(),
            timeout: B,
            maxTotalTimeout: Q,
            resetTimeoutOnProgress: D,
            onTimeout: Z
        })
    }
    _resetTimeout(A) {
        let B = this._timeoutInfo.get(A);
        if (!B) return !1;
        let Q = Date.now() - B.startTime;
        if (B.maxTotalTimeout && Q >= B.maxTotalTimeout) throw this._timeoutInfo.delete(A), new KX(CX.RequestTimeout, "Maximum total timeout exceeded", {
            maxTotalTimeout: B.maxTotalTimeout,
            totalElapsed: Q
        });
        return clearTimeout(B.timeoutId), B.timeoutId = setTimeout(B.onTimeout, B.timeout), !0
    }
    _cleanupTimeout(A) {
        let B = this._timeoutInfo.get(A);
        if (B) clearTimeout(B.timeoutId), this._timeoutInfo.delete(A)
    }
    async connect(A) {
        var B, Q, Z;
        this._transport = A;
        let D = (B = this.transport) === null || B === void 0 ? void 0 : B.onclose;
        this._transport.onclose = () => {
            D === null || D === void 0 || D(), this._onclose()
        };
        let G = (Q = this.transport) === null || Q === void 0 ? void 0 : Q.onerror;
        this._transport.onerror = (I) => {
            G === null || G === void 0 || G(I), this._onerror(I)
        };
        let F = (Z = this._transport) === null || Z === void 0 ? void 0 : Z.onmessage;
        this._transport.onmessage = (I, Y) => {
            if (F === null || F === void 0 || F(I, Y), eZ1(I) || L3B(I)) this._onresponse(I);
            else if (Ok1(I)) this._onrequest(I, Y);
            else if ($3B(I)) this._onnotification(I);
            else this._onerror(new Error(`Unknown message type: ${JSON.stringify(I)}`))
        }, await this._transport.start()
    }
    _onclose() {
        var A;
        let B = this._responseHandlers;
        this._responseHandlers = new Map, this._progressHandlers.clear(), this._transport = void 0, (A = this.onclose) === null || A === void 0 || A.call(this);
        let Q = new KX(CX.ConnectionClosed, "Connection closed");
        for (let Z of B.values()) Z(Q)
    }
    _onerror(A) {
        var B;
        (B = this.onerror) === null || B === void 0 || B.call(this, A)
    }
    _onnotification(A) {
        var B;
        let Q = (B = this._notificationHandlers.get(A.method)) !== null && B !== void 0 ? B : this.fallbackNotificationHandler;
        if (Q === void 0) return;
        Promise.resolve().then(() => Q(A)).catch((Z) => this._onerror(new Error(`Uncaught error in notification handler: ${Z}`)))
    }
    _onrequest(A, B) {
        var Q, Z, D, G;
        let F = (Q = this._requestHandlers.get(A.method)) !== null && Q !== void 0 ? Q : this.fallbackRequestHandler;
        if (F === void 0) {
            (Z = this._transport) === null || Z === void 0 || Z.send({
                jsonrpc: "2.0",
                id: A.id,
                error: {
                    code: CX.MethodNotFound,
                    message: "Method not found"
                }
            }).catch((W) => this._onerror(new Error(`Failed to send an error response: ${W}`)));
            return
        }
        let I = new AbortController;
        this._requestHandlerAbortControllers.set(A.id, I);
        let Y = {
            signal: I.signal,
            sessionId: (D = this._transport) === null || D === void 0 ? void 0 : D.sessionId,
            _meta: (G = A.params) === null || G === void 0 ? void 0 : G._meta,
            sendNotification: (W) => this.notification(W, {
                relatedRequestId: A.id
            }),
            sendRequest: (W, J, X) => this.request(W, J, {
                ...X,
                relatedRequestId: A.id
            }),
            authInfo: B === null || B === void 0 ? void 0 : B.authInfo,
            requestId: A.id,
            requestInfo: B === null || B === void 0 ? void 0 : B.requestInfo
        };
        Promise.resolve().then(() => F(A, Y)).then((W) => {
            var J;
            if (I.signal.aborted) return;
            return (J = this._transport) === null || J === void 0 ? void 0 : J.send({
                result: W,
                jsonrpc: "2.0",
                id: A.id
            })
        }, (W) => {
            var J, X;
            if (I.signal.aborted) return;
            return (J = this._transport) === null || J === void 0 ? void 0 : J.send({
                jsonrpc: "2.0",
                id: A.id,
                error: {
                    code: Number.isSafeInteger(W.code) ? W.code : CX.InternalError,
                    message: (X = W.message) !== null && X !== void 0 ? X : "Internal error"
                }
            })
        }).catch((W) => this._onerror(new Error(`Failed to send response: ${W}`))).finally(() => {
            this._requestHandlerAbortControllers.delete(A.id)
        })
    }
    _onprogress(A) {
        let {
            progressToken: B,
            ...Q
        } = A.params, Z = Number(B), D = this._progressHandlers.get(Z);
        if (!D) {
            this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(A)}`));
            return
        }
        let G = this._responseHandlers.get(Z),
            F = this._timeoutInfo.get(Z);
        if (F && G && F.resetTimeoutOnProgress) try {
            this._resetTimeout(Z)
        } catch (I) {
            G(I);
            return
        }
        D(Q)
    }
    _onresponse(A) {
        let B = Number(A.id),
            Q = this._responseHandlers.get(B);
        if (Q === void 0) {
            this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(A)}`));
            return
        }
        if (this._responseHandlers.delete(B), this._progressHandlers.delete(B), this._cleanupTimeout(B), eZ1(A)) Q(A);
        else {
            let Z = new KX(A.error.code, A.error.message, A.error.data);
            Q(Z)
        }
    }
    get transport() {
        return this._transport
    }
    async close() {
        var A;
        await ((A = this._transport) === null || A === void 0 ? void 0 : A.close())
    }
    request(A, B, Q) {
        let {
            relatedRequestId: Z,
            resumptionToken: D,
            onresumptiontoken: G
        } = Q !== null && Q !== void 0 ? Q : {};
        return new Promise((F, I) => {
            var Y, W, J, X, V, C;
            if (!this._transport) {
                I(new Error("Not connected"));
                return
            }
            if (((Y = this._options) === null || Y === void 0 ? void 0 : Y.enforceStrictCapabilities) === !0) this.assertCapabilityForMethod(A.method);
            (W = Q === null || Q === void 0 ? void 0 : Q.signal) === null || W === void 0 || W.throwIfAborted();
            let K = this._requestMessageId++,
                H = {
                    ...A,
                    jsonrpc: "2.0",
                    id: K
                };
            if (Q === null || Q === void 0 ? void 0 : Q.onprogress) this._progressHandlers.set(K, Q.onprogress), H.params = {
                ...A.params,
                _meta: {
                    ...((J = A.params) === null || J === void 0 ? void 0 : J._meta) || {},
                    progressToken: K
                }
            };
            let z = (N) => {
                var R;
                this._responseHandlers.delete(K), this._progressHandlers.delete(K), this._cleanupTimeout(K), (R = this._transport) === null || R === void 0 || R.send({
                    jsonrpc: "2.0",
                    method: "notifications/cancelled",
                    params: {
                        requestId: K,
                        reason: String(N)
                    }
                }, {
                    relatedRequestId: Z,
                    resumptionToken: D,
                    onresumptiontoken: G
                }).catch((O) => this._onerror(new Error(`Failed to send cancellation: ${O}`))), I(N)
            };
            this._responseHandlers.set(K, (N) => {
                var R;
                if ((R = Q === null || Q === void 0 ? void 0 : Q.signal) === null || R === void 0 ? void 0 : R.aborted) return;
                if (N instanceof Error) return I(N);
                try {
                    let O = B.parse(N.result);
                    F(O)
                } catch (O) {
                    I(O)
                }
            }), (X = Q === null || Q === void 0 ? void 0 : Q.signal) === null || X === void 0 || X.addEventListener("abort", () => {
                var N;
                z((N = Q === null || Q === void 0 ? void 0 : Q.signal) === null || N === void 0 ? void 0 : N.reason)
            });
            let $ = (V = Q === null || Q === void 0 ? void 0 : Q.timeout) !== null && V !== void 0 ? V : Cy6,
                L = () => z(new KX(CX.RequestTimeout, "Request timed out", {
                    timeout: $
                }));
            this._setupTimeout(K, $, Q === null || Q === void 0 ? void 0 : Q.maxTotalTimeout, L, (C = Q === null || Q === void 0 ? void 0 : Q.resetTimeoutOnProgress) !== null && C !== void 0 ? C : !1), this._transport.send(H, {
                relatedRequestId: Z,
                resumptionToken: D,
                onresumptiontoken: G
            }).catch((N) => {
                this._cleanupTimeout(K), I(N)
            })
        })
    }
    async notification(A, B) {
        if (!this._transport) throw new Error("Not connected");
        this.assertNotificationCapability(A.method);
        let Q = {
            ...A,
            jsonrpc: "2.0"
        };
        await this._transport.send(Q, B)
    }
    setRequestHandler(A, B) {
        let Q = A.shape.method.value;
        this.assertRequestHandlerCapability(Q), this._requestHandlers.set(Q, (Z, D) => {
            return Promise.resolve(B(A.parse(Z), D))
        })
    }
    removeRequestHandler(A) {
        this._requestHandlers.delete(A)
    }
    assertCanSetRequestHandler(A) {
        if (this._requestHandlers.has(A)) throw new Error(`A request handler for ${A} already exists, which would be overridden`)
    }
    setNotificationHandler(A, B) {
        this._notificationHandlers.set(A.shape.method.value, (Q) => Promise.resolve(B(A.parse(Q))))
    }
    removeNotificationHandler(A) {
        this._notificationHandlers.delete(A)
    }
}

function _k1(A, B) {
    return Object.entries(B).reduce((Q, [Z, D]) => {
        if (D && typeof D === "object") Q[Z] = Q[Z] ? {
            ...Q[Z],
            ...D
        } : D;
        else Q[Z] = D;
        return Q
    }, {
        ...A
    })
}
var yZB = G1(cH0(), 1);
class lH0 extends DD1 {
    constructor(A, B) {
        var Q;
        super(B);
        this._clientInfo = A, this._cachedToolOutputValidators = new Map, this._capabilities = (Q = B === null || B === void 0 ? void 0 : B.capabilities) !== null && Q !== void 0 ? Q : {}, this._ajv = new yZB.default
    }
    registerCapabilities(A) {
        if (this.transport) throw new Error("Cannot register capabilities after connecting to transport");
        this._capabilities = _k1(this._capabilities, A)
    }
    assertCapability(A, B) {
        var Q;
        if (!((Q = this._serverCapabilities) === null || Q === void 0 ? void 0 : Q[A])) throw new Error(`Server does not support ${A} (required for ${B})`)
    }
    async connect(A, B) {
        if (await super.connect(A), A.sessionId !== void 0) return;
        try {
            let Q = await this.request({
                method: "initialize",
                params: {
                    protocolVersion: cx,
                    capabilities: this._capabilities,
                    clientInfo: this._clientInfo
                }
            }, FH0, B);
            if (Q === void 0) throw new Error(`Server sent invalid initialize result: ${Q}`);
            if (!Lk1.includes(Q.protocolVersion)) throw new Error(`Server's protocol version is not supported: ${Q.protocolVersion}`);
            if (this._serverCapabilities = Q.capabilities, this._serverVersion = Q.serverInfo, A.setProtocolVersion) A.setProtocolVersion(Q.protocolVersion);
            this._instructions = Q.instructions, await this.notification({
                method: "notifications/initialized"
            })
        } catch (Q) {
            throw this.close(), Q
        }
    }
    getServerCapabilities() {
        return this._serverCapabilities
    }
    getServerVersion() {
        return this._serverVersion
    }
    getInstructions() {
        return this._instructions
    }
    assertCapabilityForMethod(A) {
        var B, Q, Z, D, G;
        switch (A) {
            case "logging/setLevel":
                if (!((B = this._serverCapabilities) === null || B === void 0 ? void 0 : B.logging)) throw new Error(`Server does not support logging (required for ${A})`);
                break;
            case "prompts/get":
            case "prompts/list":
                if (!((Q = this._serverCapabilities) === null || Q === void 0 ? void 0 : Q.prompts)) throw new Error(`Server does not support prompts (required for ${A})`);
                break;
            case "resources/list":
            case "resources/templates/list":
            case "resources/read":
            case "resources/subscribe":
            case "resources/unsubscribe":
                if (!((Z = this._serverCapabilities) === null || Z === void 0 ? void 0 : Z.resources)) throw new Error(`Server does not support resources (required for ${A})`);
                if (A === "resources/subscribe" && !this._serverCapabilities.resources.subscribe) throw new Error(`Server does not support resource subscriptions (required for ${A})`);
                break;
            case "tools/call":
            case "tools/list":
                if (!((D = this._serverCapabilities) === null || D === void 0 ? void 0 : D.tools)) throw new Error(`Server does not support tools (required for ${A})`);
                break;
            case "completion/complete":
                if (!((G = this._serverCapabilities) === null || G === void 0 ? void 0 : G.completions)) throw new Error(`Server does not support completions (required for ${A})`);
                break;
            case "initialize":
                break;
            case "ping":
                break
        }
    }
    assertNotificationCapability(A) {
        var B;
        switch (A) {
            case "notifications/roots/list_changed":
                if (!((B = this._capabilities.roots) === null || B === void 0 ? void 0 : B.listChanged)) throw new Error(`Client does not support roots list changed notifications (required for ${A})`);
                break;
            case "notifications/initialized":
                break;
            case "notifications/cancelled":
                break;
            case "notifications/progress":
                break
        }
    }
    assertRequestHandlerCapability(A) {
        switch (A) {
            case "sampling/createMessage":
                if (!this._capabilities.sampling) throw new Error(`Client does not support sampling capability (required for ${A})`);
                break;
            case "elicitation/create":
                if (!this._capabilities.elicitation) throw new Error(`Client does not support elicitation capability (required for ${A})`);
                break;
            case "roots/list":
                if (!this._capabilities.roots) throw new Error(`Client does not support roots capability (required for ${A})`);
                break;
            case "ping":
                break
        }
    }
    async ping(A) {
        return this.request({
            method: "ping"
        }, rP, A)
    }
    async complete(A, B) {
        return this.request({
            method: "completion/complete",
            params: A
        }, zH0, B)
    }
    async setLoggingLevel(A, B) {
        return this.request({
            method: "logging/setLevel",
            params: {
                level: A
            }
        }, rP, B)
    }
    async getPrompt(A, B) {
        return this.request({
            method: "prompts/get",
            params: A
        }, XH0, B)
    }
    async listPrompts(A, B) {
        return this.request({
            method: "prompts/list",
            params: A
        }, QD1, B)
    }
    async listResources(A, B) {
        return this.request({
            method: "resources/list",
            params: A
        }, xm, B)
    }
    async listResourceTemplates(A, B) {
        return this.request({
            method: "resources/templates/list",
            params: A
        }, IH0, B)
    }
    async readResource(A, B) {
        return this.request({
            method: "resources/read",
            params: A
        }, BD1, B)
    }
    async subscribeResource(A, B) {
        return this.request({
            method: "resources/subscribe",
            params: A
        }, rP, B)
    }
    async unsubscribeResource(A, B) {
        return this.request({
            method: "resources/unsubscribe",
            params: A
        }, rP, B)
    }
    async callTool(A, B = fe, Q) {
        let Z = await this.request({
                method: "tools/call",
                params: A
            }, B, Q),
            D = this.getToolOutputValidator(A.name);
        if (D) {
            if (!Z.structuredContent && !Z.isError) throw new KX(CX.InvalidRequest, `Tool ${A.name} has an output schema but did not return structured content`);
            if (Z.structuredContent) try {
                if (!D(Z.structuredContent)) throw new KX(CX.InvalidParams, `Structured content does not match the tool's output schema: ${this._ajv.errorsText(D.errors)}`)
            } catch (G) {
                if (G instanceof KX) throw G;
                throw new KX(CX.InvalidParams, `Failed to validate structured content: ${G instanceof Error?G.message:String(G)}`)
            }
        }
        return Z
    }
    cacheToolOutputSchemas(A) {
        this._cachedToolOutputValidators.clear();
        for (let B of A)
            if (B.outputSchema) try {
                let Q = this._ajv.compile(B.outputSchema);
                this._cachedToolOutputValidators.set(B.name, Q)
            } catch (Q) {}
    }
    getToolOutputValidator(A) {
        return this._cachedToolOutputValidators.get(A)
    }
    async listTools(A, B) {
        let Q = await this.request({
            method: "tools/list",
            params: A
        }, ZD1, B);
        return this.cacheToolOutputSchemas(Q.tools), Q
    }
    async sendRootsListChanged() {
        return this.notification({
            method: "notifications/roots/list_changed"
        })
    }
}
var _ZB = G1(_m1(), 1);
import ek1 from "node:process";
import {
    PassThrough as n_6
} from "node:stream";
class FD1 {
    append(A) {
        this._buffer = this._buffer ? Buffer.concat([this._buffer, A]) : A
    }
    readMessage() {
        if (!this._buffer) return null;
        let A = this._buffer.indexOf(`
`);
        if (A === -1) return null;
        let B = this._buffer.toString("utf8", 0, A).replace(/\r$/, "");
        return this._buffer = this._buffer.subarray(A + 1), i_6(B)
    }
    clear() {
        this._buffer = void 0
    }
}