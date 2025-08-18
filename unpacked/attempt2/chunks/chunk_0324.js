/* chunk:324 bytes:[7816492, 7833073) size:16581 source:unpacked-cli.js */
var Jr2 = E((Yr2) => {
    Object.defineProperty(Yr2, "__esModule", {
        value: !0
    });
    Yr2.ClientDuplexStreamImpl = Yr2.ClientWritableStreamImpl = Yr2.ClientReadableStreamImpl = Yr2.ClientUnaryCallImpl = void 0;
    Yr2.callErrorFromStatus = _C6;
    var yC6 = W1("events"),
        OJ0 = W1("stream"),
        Q71 = b6();

    function _C6(A, B) {
        let Q = `${A.code} ${Q71.Status[A.code]}: ${A.details}`,
            D = `${new Error(Q).stack}
for call at
${B}`;
        return Object.assign(new Error(Q), A, {
            stack: D
        })
    }
    class Dr2 extends yC6.EventEmitter {
        constructor() {
            super()
        }
        cancel() {
            var A;
            (A = this.call) === null || A === void 0 || A.cancelWithStatus(Q71.Status.CANCELLED, "Cancelled on client")
        }
        getPeer() {
            var A, B;
            return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
        }
    }
    Yr2.ClientUnaryCallImpl = Dr2;
    class Gr2 extends OJ0.Readable {
        constructor(A) {
            super({
                objectMode: !0
            });
            this.deserialize = A
        }
        cancel() {
            var A;
            (A = this.call) === null || A === void 0 || A.cancelWithStatus(Q71.Status.CANCELLED, "Cancelled on client")
        }
        getPeer() {
            var A, B;
            return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
        }
        _read(A) {
            var B;
            (B = this.call) === null || B === void 0 || B.startRead()
        }
    }
    Yr2.ClientReadableStreamImpl = Gr2;
    class Fr2 extends OJ0.Writable {
        constructor(A) {
            super({
                objectMode: !0
            });
            this.serialize = A
        }
        cancel() {
            var A;
            (A = this.call) === null || A === void 0 || A.cancelWithStatus(Q71.Status.CANCELLED, "Cancelled on client")
        }
        getPeer() {
            var A, B;
            return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
        }
        _write(A, B, Q) {
            var Z;
            let D = {
                    callback: Q
                },
                G = Number(B);
            if (!Number.isNaN(G)) D.flags = G;
            (Z = this.call) === null || Z === void 0 || Z.sendMessageWithContext(D, A)
        }
        _final(A) {
            var B;
            (B = this.call) === null || B === void 0 || B.halfClose(), A()
        }
    }
    Yr2.ClientWritableStreamImpl = Fr2;
    class Ir2 extends OJ0.Duplex {
        constructor(A, B) {
            super({
                objectMode: !0
            });
            this.serialize = A, this.deserialize = B
        }
        cancel() {
            var A;
            (A = this.call) === null || A === void 0 || A.cancelWithStatus(Q71.Status.CANCELLED, "Cancelled on client")
        }
        getPeer() {
            var A, B;
            return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
        }
        _read(A) {
            var B;
            (B = this.call) === null || B === void 0 || B.startRead()
        }
        _write(A, B, Q) {
            var Z;
            let D = {
                    callback: Q
                },
                G = Number(B);
            if (!Number.isNaN(G)) D.flags = G;
            (Z = this.call) === null || Z === void 0 || Z.sendMessageWithContext(D, A)
        }
        _final(A) {
            var B;
            (B = this.call) === null || B === void 0 || B.halfClose(), A()
        }
    }
    Yr2.ClientDuplexStreamImpl = Ir2
});
var Kr2 = E((Vr2) => {
    Object.defineProperty(Vr2, "__esModule", {
        value: !0
    });
    Vr2.InterceptingListenerImpl = void 0;
    Vr2.isInterceptingListener = hC6;

    function hC6(A) {
        return A.onReceiveMetadata !== void 0 && A.onReceiveMetadata.length === 1
    }
    class Xr2 {
        constructor(A, B) {
            this.listener = A, this.nextListener = B, this.processingMetadata = !1, this.hasPendingMessage = !1, this.processingMessage = !1, this.pendingStatus = null
        }
        processPendingMessage() {
            if (this.hasPendingMessage) this.nextListener.onReceiveMessage(this.pendingMessage), this.pendingMessage = null, this.hasPendingMessage = !1
        }
        processPendingStatus() {
            if (this.pendingStatus) this.nextListener.onReceiveStatus(this.pendingStatus)
        }
        onReceiveMetadata(A) {
            this.processingMetadata = !0, this.listener.onReceiveMetadata(A, (B) => {
                this.processingMetadata = !1, this.nextListener.onReceiveMetadata(B), this.processPendingMessage(), this.processPendingStatus()
            })
        }
        onReceiveMessage(A) {
            this.processingMessage = !0, this.listener.onReceiveMessage(A, (B) => {
                if (this.processingMessage = !1, this.processingMetadata) this.pendingMessage = B, this.hasPendingMessage = !0;
                else this.nextListener.onReceiveMessage(B), this.processPendingStatus()
            })
        }
        onReceiveStatus(A) {
            this.listener.onReceiveStatus(A, (B) => {
                if (this.processingMetadata || this.processingMessage) this.pendingStatus = B;
                else this.nextListener.onReceiveStatus(B)
            })
        }
    }
    Vr2.InterceptingListenerImpl = Xr2
});
var SJ0 = E((Lr2) => {
    Object.defineProperty(Lr2, "__esModule", {
        value: !0
    });
    Lr2.InterceptingCall = Lr2.RequesterBuilder = Lr2.ListenerBuilder = Lr2.InterceptorConfigurationError = void 0;
    Lr2.getInterceptingCall = cC6;
    var uC6 = IJ(),
        Hr2 = Kr2(),
        zr2 = b6(),
        Er2 = WP1();
    class D71 extends Error {
        constructor(A) {
            super(A);
            this.name = "InterceptorConfigurationError", Error.captureStackTrace(this, D71)
        }
    }
    Lr2.InterceptorConfigurationError = D71;
    class Ur2 {
        constructor() {
            this.metadata = void 0, this.message = void 0, this.status = void 0
        }
        withOnReceiveMetadata(A) {
            return this.metadata = A, this
        }
        withOnReceiveMessage(A) {
            return this.message = A, this
        }
        withOnReceiveStatus(A) {
            return this.status = A, this
        }
        build() {
            return {
                onReceiveMetadata: this.metadata,
                onReceiveMessage: this.message,
                onReceiveStatus: this.status
            }
        }
    }
    Lr2.ListenerBuilder = Ur2;
    class wr2 {
        constructor() {
            this.start = void 0, this.message = void 0, this.halfClose = void 0, this.cancel = void 0
        }
        withStart(A) {
            return this.start = A, this
        }
        withSendMessage(A) {
            return this.message = A, this
        }
        withHalfClose(A) {
            return this.halfClose = A, this
        }
        withCancel(A) {
            return this.cancel = A, this
        }
        build() {
            return {
                start: this.start,
                sendMessage: this.message,
                halfClose: this.halfClose,
                cancel: this.cancel
            }
        }
    }
    Lr2.RequesterBuilder = wr2;
    var TJ0 = {
            onReceiveMetadata: (A, B) => {
                B(A)
            },
            onReceiveMessage: (A, B) => {
                B(A)
            },
            onReceiveStatus: (A, B) => {
                B(A)
            }
        },
        Z71 = {
            start: (A, B, Q) => {
                Q(A, B)
            },
            sendMessage: (A, B) => {
                B(A)
            },
            halfClose: (A) => {
                A()
            },
            cancel: (A) => {
                A()
            }
        };
    class $r2 {
        constructor(A, B) {
            var Q, Z, D, G;
            if (this.nextCall = A, this.processingMetadata = !1, this.pendingMessageContext = null, this.processingMessage = !1, this.pendingHalfClose = !1, B) this.requester = {
                start: (Q = B.start) !== null && Q !== void 0 ? Q : Z71.start,
                sendMessage: (Z = B.sendMessage) !== null && Z !== void 0 ? Z : Z71.sendMessage,
                halfClose: (D = B.halfClose) !== null && D !== void 0 ? D : Z71.halfClose,
                cancel: (G = B.cancel) !== null && G !== void 0 ? G : Z71.cancel
            };
            else this.requester = Z71
        }
        cancelWithStatus(A, B) {
            this.requester.cancel(() => {
                this.nextCall.cancelWithStatus(A, B)
            })
        }
        getPeer() {
            return this.nextCall.getPeer()
        }
        processPendingMessage() {
            if (this.pendingMessageContext) this.nextCall.sendMessageWithContext(this.pendingMessageContext, this.pendingMessage), this.pendingMessageContext = null, this.pendingMessage = null
        }
        processPendingHalfClose() {
            if (this.pendingHalfClose) this.nextCall.halfClose()
        }
        start(A, B) {
            var Q, Z, D, G, F, I;
            let Y = {
                onReceiveMetadata: (Z = (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && Z !== void 0 ? Z : (W) => {},
                onReceiveMessage: (G = (D = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || D === void 0 ? void 0 : D.bind(B)) !== null && G !== void 0 ? G : (W) => {},
                onReceiveStatus: (I = (F = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || F === void 0 ? void 0 : F.bind(B)) !== null && I !== void 0 ? I : (W) => {}
            };
            this.processingMetadata = !0, this.requester.start(A, Y, (W, J) => {
                var X, V, C;
                this.processingMetadata = !1;
                let K;
                if (Hr2.isInterceptingListener(J)) K = J;
                else {
                    let H = {
                        onReceiveMetadata: (X = J.onReceiveMetadata) !== null && X !== void 0 ? X : TJ0.onReceiveMetadata,
                        onReceiveMessage: (V = J.onReceiveMessage) !== null && V !== void 0 ? V : TJ0.onReceiveMessage,
                        onReceiveStatus: (C = J.onReceiveStatus) !== null && C !== void 0 ? C : TJ0.onReceiveStatus
                    };
                    K = new Hr2.InterceptingListenerImpl(H, Y)
                }
                this.nextCall.start(W, K), this.processPendingMessage(), this.processPendingHalfClose()
            })
        }
        sendMessageWithContext(A, B) {
            this.processingMessage = !0, this.requester.sendMessage(B, (Q) => {
                if (this.processingMessage = !1, this.processingMetadata) this.pendingMessageContext = A, this.pendingMessage = B;
                else this.nextCall.sendMessageWithContext(A, Q), this.processPendingHalfClose()
            })
        }
        sendMessage(A) {
            this.sendMessageWithContext({}, A)
        }
        startRead() {
            this.nextCall.startRead()
        }
        halfClose() {
            this.requester.halfClose(() => {
                if (this.processingMetadata || this.processingMessage) this.pendingHalfClose = !0;
                else this.nextCall.halfClose()
            })
        }
    }
    Lr2.InterceptingCall = $r2;

    function mC6(A, B, Q) {
        var Z, D;
        let G = (Z = Q.deadline) !== null && Z !== void 0 ? Z : 1 / 0,
            F = Q.host,
            I = (D = Q.parent) !== null && D !== void 0 ? D : null,
            Y = Q.propagate_flags,
            W = Q.credentials,
            J = A.createCall(B, G, F, I, Y);
        if (W) J.setCredentials(W);
        return J
    }
    class PJ0 {
        constructor(A, B) {
            this.call = A, this.methodDefinition = B
        }
        cancelWithStatus(A, B) {
            this.call.cancelWithStatus(A, B)
        }
        getPeer() {
            return this.call.getPeer()
        }
        sendMessageWithContext(A, B) {
            let Q;
            try {
                Q = this.methodDefinition.requestSerialize(B)
            } catch (Z) {
                this.call.cancelWithStatus(zr2.Status.INTERNAL, `Request message serialization failure: ${Er2.getErrorMessage(Z)}`);
                return
            }
            this.call.sendMessageWithContext(A, Q)
        }
        sendMessage(A) {
            this.sendMessageWithContext({}, A)
        }
        start(A, B) {
            let Q = null;
            this.call.start(A, {
                onReceiveMetadata: (Z) => {
                    var D;
                    (D = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || D === void 0 || D.call(B, Z)
                },
                onReceiveMessage: (Z) => {
                    var D;
                    let G;
                    try {
                        G = this.methodDefinition.responseDeserialize(Z)
                    } catch (F) {
                        Q = {
                            code: zr2.Status.INTERNAL,
                            details: `Response message parsing error: ${Er2.getErrorMessage(F)}`,
                            metadata: new uC6.Metadata
                        }, this.call.cancelWithStatus(Q.code, Q.details);
                        return
                    }(D = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || D === void 0 || D.call(B, G)
                },
                onReceiveStatus: (Z) => {
                    var D, G;
                    if (Q)(D = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || D === void 0 || D.call(B, Q);
                    else(G = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || G === void 0 || G.call(B, Z)
                }
            })
        }
        startRead() {
            this.call.startRead()
        }
        halfClose() {
            this.call.halfClose()
        }
    }
    class qr2 extends PJ0 {
        constructor(A, B) {
            super(A, B)
        }
        start(A, B) {
            var Q, Z;
            let D = !1,
                G = {
                    onReceiveMetadata: (Z = (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && Z !== void 0 ? Z : (F) => {},
                    onReceiveMessage: (F) => {
                        var I;
                        D = !0, (I = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || I === void 0 || I.call(B, F)
                    },
                    onReceiveStatus: (F) => {
                        var I, Y;
                        if (!D)(I = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || I === void 0 || I.call(B, null);
                        (Y = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || Y === void 0 || Y.call(B, F)
                    }
                };
            super.start(A, G), this.call.startRead()
        }
    }
    class Nr2 extends PJ0 {}

    function dC6(A, B, Q) {
        let Z = mC6(A, Q.path, B);
        if (Q.responseStream) return new Nr2(Z, Q);
        else return new qr2(Z, Q)
    }

    function cC6(A, B, Q, Z) {
        if (A.clientInterceptors.length > 0 && A.clientInterceptorProviders.length > 0) throw new D71("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
        if (A.callInterceptors.length > 0 && A.callInterceptorProviders.length > 0) throw new D71("Both interceptors and interceptor_providers were passed as call options. Only one of these is allowed.");
        let D = [];
        if (A.callInterceptors.length > 0 || A.callInterceptorProviders.length > 0) D = [].concat(A.callInterceptors, A.callInterceptorProviders.map((I) => I(B))).filter((I) => I);
        else D = [].concat(A.clientInterceptors, A.clientInterceptorProviders.map((I) => I(B))).filter((I) => I);
        let G = Object.assign({}, Q, {
            method_definition: B
        });
        return D.reduceRight((I, Y) => {
            return (W) => Y(W, I)
        }, (I) => dC6(Z, I, B))(G)
    }
});