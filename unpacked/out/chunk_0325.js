/* chunk:325 bytes:[7833074, 7847729) size:14655 source:unpacked-cli.js */
var kJ0 = E((Or2) => {
    Object.defineProperty(Or2, "__esModule", {
        value: !0
    });
    Or2.Client = void 0;
    var GM = Jr2(),
        aC6 = yJ0(),
        sC6 = RE(),
        Jx = b6(),
        Tt = IJ(),
        RP1 = SJ0(),
        Y$ = Symbol(),
        Pt = Symbol(),
        St = Symbol(),
        MP = Symbol();

    function jJ0(A) {
        return typeof A === "function"
    }

    function jt(A) {
        var B;
        return ((B = A.stack) === null || B === void 0 ? void 0 : B.split(`
`).slice(1).join(`
`)) || "no stack trace available"
    }
    class Rr2 {
        constructor(A, B, Q = {}) {
            var Z, D;
            if (Q = Object.assign({}, Q), this[Pt] = (Z = Q.interceptors) !== null && Z !== void 0 ? Z : [], delete Q.interceptors, this[St] = (D = Q.interceptor_providers) !== null && D !== void 0 ? D : [], delete Q.interceptor_providers, this[Pt].length > 0 && this[St].length > 0) throw new Error("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
            if (this[MP] = Q.callInvocationTransformer, delete Q.callInvocationTransformer, Q.channelOverride) this[Y$] = Q.channelOverride;
            else if (Q.channelFactoryOverride) {
                let G = Q.channelFactoryOverride;
                delete Q.channelFactoryOverride, this[Y$] = G(A, B, Q)
            } else this[Y$] = new aC6.ChannelImplementation(A, B, Q)
        }
        close() {
            this[Y$].close()
        }
        getChannel() {
            return this[Y$]
        }
        waitForReady(A, B) {
            let Q = (Z) => {
                if (Z) {
                    B(new Error("Failed to connect before the deadline"));
                    return
                }
                let D;
                try {
                    D = this[Y$].getConnectivityState(!0)
                } catch (G) {
                    B(new Error("The channel has been closed"));
                    return
                }
                if (D === sC6.ConnectivityState.READY) B();
                else try {
                    this[Y$].watchConnectivityState(D, A, Q)
                } catch (G) {
                    B(new Error("The channel has been closed"))
                }
            };
            setImmediate(Q)
        }
        checkOptionalUnaryResponseArguments(A, B, Q) {
            if (jJ0(A)) return {
                metadata: new Tt.Metadata,
                options: {},
                callback: A
            };
            else if (jJ0(B))
                if (A instanceof Tt.Metadata) return {
                    metadata: A,
                    options: {},
                    callback: B
                };
                else return {
                    metadata: new Tt.Metadata,
                    options: A,
                    callback: B
                };
            else {
                if (!(A instanceof Tt.Metadata && B instanceof Object && jJ0(Q))) throw new Error("Incorrect arguments passed");
                return {
                    metadata: A,
                    options: B,
                    callback: Q
                }
            }
        }
        makeUnaryRequest(A, B, Q, Z, D, G, F) {
            var I, Y;
            let W = this.checkOptionalUnaryResponseArguments(D, G, F),
                J = {
                    path: A,
                    requestStream: !1,
                    responseStream: !1,
                    requestSerialize: B,
                    responseDeserialize: Q
                },
                X = {
                    argument: Z,
                    metadata: W.metadata,
                    call: new GM.ClientUnaryCallImpl,
                    channel: this[Y$],
                    methodDefinition: J,
                    callOptions: W.options,
                    callback: W.callback
                };
            if (this[MP]) X = this[MP](X);
            let V = X.call,
                C = {
                    clientInterceptors: this[Pt],
                    clientInterceptorProviders: this[St],
                    callInterceptors: (I = X.callOptions.interceptors) !== null && I !== void 0 ? I : [],
                    callInterceptorProviders: (Y = X.callOptions.interceptor_providers) !== null && Y !== void 0 ? Y : []
                },
                K = RP1.getInterceptingCall(C, X.methodDefinition, X.callOptions, X.channel);
            V.call = K;
            let H = null,
                z = !1,
                $ = new Error;
            return K.start(X.metadata, {
                onReceiveMetadata: (L) => {
                    V.emit("metadata", L)
                },
                onReceiveMessage(L) {
                    if (H !== null) K.cancelWithStatus(Jx.Status.UNIMPLEMENTED, "Too many responses received");
                    H = L
                },
                onReceiveStatus(L) {
                    if (z) return;
                    if (z = !0, L.code === Jx.Status.OK)
                        if (H === null) {
                            let N = jt($);
                            X.callback(GM.callErrorFromStatus({
                                code: Jx.Status.UNIMPLEMENTED,
                                details: "No message received",
                                metadata: L.metadata
                            }, N))
                        } else X.callback(null, H);
                    else {
                        let N = jt($);
                        X.callback(GM.callErrorFromStatus(L, N))
                    }
                    $ = null, V.emit("status", L)
                }
            }), K.sendMessage(Z), K.halfClose(), V
        }
        makeClientStreamRequest(A, B, Q, Z, D, G) {
            var F, I;
            let Y = this.checkOptionalUnaryResponseArguments(Z, D, G),
                W = {
                    path: A,
                    requestStream: !0,
                    responseStream: !1,
                    requestSerialize: B,
                    responseDeserialize: Q
                },
                J = {
                    metadata: Y.metadata,
                    call: new GM.ClientWritableStreamImpl(B),
                    channel: this[Y$],
                    methodDefinition: W,
                    callOptions: Y.options,
                    callback: Y.callback
                };
            if (this[MP]) J = this[MP](J);
            let X = J.call,
                V = {
                    clientInterceptors: this[Pt],
                    clientInterceptorProviders: this[St],
                    callInterceptors: (F = J.callOptions.interceptors) !== null && F !== void 0 ? F : [],
                    callInterceptorProviders: (I = J.callOptions.interceptor_providers) !== null && I !== void 0 ? I : []
                },
                C = RP1.getInterceptingCall(V, J.methodDefinition, J.callOptions, J.channel);
            X.call = C;
            let K = null,
                H = !1,
                z = new Error;
            return C.start(J.metadata, {
                onReceiveMetadata: ($) => {
                    X.emit("metadata", $)
                },
                onReceiveMessage($) {
                    if (K !== null) C.cancelWithStatus(Jx.Status.UNIMPLEMENTED, "Too many responses received");
                    K = $, C.startRead()
                },
                onReceiveStatus($) {
                    if (H) return;
                    if (H = !0, $.code === Jx.Status.OK)
                        if (K === null) {
                            let L = jt(z);
                            J.callback(GM.callErrorFromStatus({
                                code: Jx.Status.UNIMPLEMENTED,
                                details: "No message received",
                                metadata: $.metadata
                            }, L))
                        } else J.callback(null, K);
                    else {
                        let L = jt(z);
                        J.callback(GM.callErrorFromStatus($, L))
                    }
                    z = null, X.emit("status", $)
                }
            }), X
        }
        checkMetadataAndOptions(A, B) {
            let Q, Z;
            if (A instanceof Tt.Metadata)
                if (Q = A, B) Z = B;
                else Z = {};
            else {
                if (A) Z = A;
                else Z = {};
                Q = new Tt.Metadata
            }
            return {
                metadata: Q,
                options: Z
            }
        }
        makeServerStreamRequest(A, B, Q, Z, D, G) {
            var F, I;
            let Y = this.checkMetadataAndOptions(D, G),
                W = {
                    path: A,
                    requestStream: !1,
                    responseStream: !0,
                    requestSerialize: B,
                    responseDeserialize: Q
                },
                J = {
                    argument: Z,
                    metadata: Y.metadata,
                    call: new GM.ClientReadableStreamImpl(Q),
                    channel: this[Y$],
                    methodDefinition: W,
                    callOptions: Y.options
                };
            if (this[MP]) J = this[MP](J);
            let X = J.call,
                V = {
                    clientInterceptors: this[Pt],
                    clientInterceptorProviders: this[St],
                    callInterceptors: (F = J.callOptions.interceptors) !== null && F !== void 0 ? F : [],
                    callInterceptorProviders: (I = J.callOptions.interceptor_providers) !== null && I !== void 0 ? I : []
                },
                C = RP1.getInterceptingCall(V, J.methodDefinition, J.callOptions, J.channel);
            X.call = C;
            let K = !1,
                H = new Error;
            return C.start(J.metadata, {
                onReceiveMetadata(z) {
                    X.emit("metadata", z)
                },
                onReceiveMessage(z) {
                    X.push(z)
                },
                onReceiveStatus(z) {
                    if (K) return;
                    if (K = !0, X.push(null), z.code !== Jx.Status.OK) {
                        let $ = jt(H);
                        X.emit("error", GM.callErrorFromStatus(z, $))
                    }
                    H = null, X.emit("status", z)
                }
            }), C.sendMessage(Z), C.halfClose(), X
        }
        makeBidiStreamRequest(A, B, Q, Z, D) {
            var G, F;
            let I = this.checkMetadataAndOptions(Z, D),
                Y = {
                    path: A,
                    requestStream: !0,
                    responseStream: !0,
                    requestSerialize: B,
                    responseDeserialize: Q
                },
                W = {
                    metadata: I.metadata,
                    call: new GM.ClientDuplexStreamImpl(B, Q),
                    channel: this[Y$],
                    methodDefinition: Y,
                    callOptions: I.options
                };
            if (this[MP]) W = this[MP](W);
            let J = W.call,
                X = {
                    clientInterceptors: this[Pt],
                    clientInterceptorProviders: this[St],
                    callInterceptors: (G = W.callOptions.interceptors) !== null && G !== void 0 ? G : [],
                    callInterceptorProviders: (F = W.callOptions.interceptor_providers) !== null && F !== void 0 ? F : []
                },
                V = RP1.getInterceptingCall(X, W.methodDefinition, W.callOptions, W.channel);
            J.call = V;
            let C = !1,
                K = new Error;
            return V.start(W.metadata, {
                onReceiveMetadata(H) {
                    J.emit("metadata", H)
                },
                onReceiveMessage(H) {
                    J.push(H)
                },
                onReceiveStatus(H) {
                    if (C) return;
                    if (C = !0, J.push(null), H.code !== Jx.Status.OK) {
                        let z = jt(K);
                        J.emit("error", GM.callErrorFromStatus(H, z))
                    }
                    K = null, J.emit("status", H)
                }
            }), J
        }
    }
    Or2.Client = Rr2
});
var xJ0 = E((Sr2) => {
    Object.defineProperty(Sr2, "__esModule", {
        value: !0
    });
    Sr2.makeClientConstructor = Pr2;
    Sr2.loadPackageDefinition = eC6;
    var G71 = kJ0(),
        rC6 = {
            unary: G71.Client.prototype.makeUnaryRequest,
            server_stream: G71.Client.prototype.makeServerStreamRequest,
            client_stream: G71.Client.prototype.makeClientStreamRequest,
            bidi: G71.Client.prototype.makeBidiStreamRequest
        };

    function _J0(A) {
        return ["__proto__", "prototype", "constructor"].includes(A)
    }

    function Pr2(A, B, Q) {
        if (!Q) Q = {};
        class Z extends G71.Client {}
        return Object.keys(A).forEach((D) => {
            if (_J0(D)) return;
            let G = A[D],
                F;
            if (typeof D === "string" && D.charAt(0) === "$") throw new Error("Method names cannot start with $");
            if (G.requestStream)
                if (G.responseStream) F = "bidi";
                else F = "client_stream";
            else if (G.responseStream) F = "server_stream";
            else F = "unary";
            let {
                requestSerialize: I,
                responseDeserialize: Y
            } = G, W = oC6(rC6[F], G.path, I, Y);
            if (Z.prototype[D] = W, Object.assign(Z.prototype[D], G), G.originalName && !_J0(G.originalName)) Z.prototype[G.originalName] = Z.prototype[D]
        }), Z.service = A, Z.serviceName = B, Z
    }

    function oC6(A, B, Q, Z) {
        return function(...D) {
            return A.call(this, B, Q, Z, ...D)
        }
    }

    function tC6(A) {
        return "format" in A
    }

    function eC6(A) {
        let B = {};
        for (let Q in A)
            if (Object.prototype.hasOwnProperty.call(A, Q)) {
                let Z = A[Q],
                    D = Q.split(".");
                if (D.some((I) => _J0(I))) continue;
                let G = D[D.length - 1],
                    F = B;
                for (let I of D.slice(0, -1)) {
                    if (!F[I]) F[I] = {};
                    F = F[I]
                }
                if (tC6(Z)) F[G] = Z;
                else F[G] = Pr2(Z, G, {})
            } return B
    }
});