/* chunk:348 bytes:[8203405, 8224795) size:21390 source:unpacked-cli.js */
var WV0 = E((c1B) => {
    Object.defineProperty(c1B, "__esModule", {
        value: !0
    });
    c1B.BaseServerInterceptingCall = c1B.ServerInterceptingCall = c1B.ResponderBuilder = c1B.ServerListenerBuilder = void 0;
    c1B.isInterceptingServerListener = jw6;
    c1B.getServerInterceptingCall = vw6;
    var FV0 = IJ(),
        cV = b6(),
        it = W1("http2"),
        k1B = WP1(),
        y1B = W1("zlib"),
        Sw6 = xX0(),
        b1B = I7(),
        f1B = "server_call";

    function Um(A) {
        b1B.trace(cV.LogVerbosity.DEBUG, f1B, A)
    }
    class h1B {
        constructor() {
            this.metadata = void 0, this.message = void 0, this.halfClose = void 0, this.cancel = void 0
        }
        withOnReceiveMetadata(A) {
            return this.metadata = A, this
        }
        withOnReceiveMessage(A) {
            return this.message = A, this
        }
        withOnReceiveHalfClose(A) {
            return this.halfClose = A, this
        }
        withOnCancel(A) {
            return this.cancel = A, this
        }
        build() {
            return {
                onReceiveMetadata: this.metadata,
                onReceiveMessage: this.message,
                onReceiveHalfClose: this.halfClose,
                onCancel: this.cancel
            }
        }
    }
    c1B.ServerListenerBuilder = h1B;

    function jw6(A) {
        return A.onReceiveMetadata !== void 0 && A.onReceiveMetadata.length === 1
    }
    class g1B {
        constructor(A, B) {
            this.listener = A, this.nextListener = B, this.cancelled = !1, this.processingMetadata = !1, this.hasPendingMessage = !1, this.pendingMessage = null, this.processingMessage = !1, this.hasPendingHalfClose = !1
        }
        processPendingMessage() {
            if (this.hasPendingMessage) this.nextListener.onReceiveMessage(this.pendingMessage), this.pendingMessage = null, this.hasPendingMessage = !1
        }
        processPendingHalfClose() {
            if (this.hasPendingHalfClose) this.nextListener.onReceiveHalfClose(), this.hasPendingHalfClose = !1
        }
        onReceiveMetadata(A) {
            if (this.cancelled) return;
            this.processingMetadata = !0, this.listener.onReceiveMetadata(A, (B) => {
                if (this.processingMetadata = !1, this.cancelled) return;
                this.nextListener.onReceiveMetadata(B), this.processPendingMessage(), this.processPendingHalfClose()
            })
        }
        onReceiveMessage(A) {
            if (this.cancelled) return;
            this.processingMessage = !0, this.listener.onReceiveMessage(A, (B) => {
                if (this.processingMessage = !1, this.cancelled) return;
                if (this.processingMetadata) this.pendingMessage = B, this.hasPendingMessage = !0;
                else this.nextListener.onReceiveMessage(B), this.processPendingHalfClose()
            })
        }
        onReceiveHalfClose() {
            if (this.cancelled) return;
            this.listener.onReceiveHalfClose(() => {
                if (this.cancelled) return;
                if (this.processingMetadata || this.processingMessage) this.hasPendingHalfClose = !0;
                else this.nextListener.onReceiveHalfClose()
            })
        }
        onCancel() {
            this.cancelled = !0, this.listener.onCancel(), this.nextListener.onCancel()
        }
    }
    class u1B {
        constructor() {
            this.start = void 0, this.metadata = void 0, this.message = void 0, this.status = void 0
        }
        withStart(A) {
            return this.start = A, this
        }
        withSendMetadata(A) {
            return this.metadata = A, this
        }
        withSendMessage(A) {
            return this.message = A, this
        }
        withSendStatus(A) {
            return this.status = A, this
        }
        build() {
            return {
                start: this.start,
                sendMetadata: this.metadata,
                sendMessage: this.message,
                sendStatus: this.status
            }
        }
    }
    c1B.ResponderBuilder = u1B;
    var zS1 = {
            onReceiveMetadata: (A, B) => {
                B(A)
            },
            onReceiveMessage: (A, B) => {
                B(A)
            },
            onReceiveHalfClose: (A) => {
                A()
            },
            onCancel: () => {}
        },
        ES1 = {
            start: (A) => {
                A()
            },
            sendMetadata: (A, B) => {
                B(A)
            },
            sendMessage: (A, B) => {
                B(A)
            },
            sendStatus: (A, B) => {
                B(A)
            }
        };
    class m1B {
        constructor(A, B) {
            var Q, Z, D, G;
            this.nextCall = A, this.processingMetadata = !1, this.sentMetadata = !1, this.processingMessage = !1, this.pendingMessage = null, this.pendingMessageCallback = null, this.pendingStatus = null, this.responder = {
                start: (Q = B === null || B === void 0 ? void 0 : B.start) !== null && Q !== void 0 ? Q : ES1.start,
                sendMetadata: (Z = B === null || B === void 0 ? void 0 : B.sendMetadata) !== null && Z !== void 0 ? Z : ES1.sendMetadata,
                sendMessage: (D = B === null || B === void 0 ? void 0 : B.sendMessage) !== null && D !== void 0 ? D : ES1.sendMessage,
                sendStatus: (G = B === null || B === void 0 ? void 0 : B.sendStatus) !== null && G !== void 0 ? G : ES1.sendStatus
            }
        }
        processPendingMessage() {
            if (this.pendingMessageCallback) this.nextCall.sendMessage(this.pendingMessage, this.pendingMessageCallback), this.pendingMessage = null, this.pendingMessageCallback = null
        }
        processPendingStatus() {
            if (this.pendingStatus) this.nextCall.sendStatus(this.pendingStatus), this.pendingStatus = null
        }
        start(A) {
            this.responder.start((B) => {
                var Q, Z, D, G;
                let F = {
                        onReceiveMetadata: (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) !== null && Q !== void 0 ? Q : zS1.onReceiveMetadata,
                        onReceiveMessage: (Z = B === null || B === void 0 ? void 0 : B.onReceiveMessage) !== null && Z !== void 0 ? Z : zS1.onReceiveMessage,
                        onReceiveHalfClose: (D = B === null || B === void 0 ? void 0 : B.onReceiveHalfClose) !== null && D !== void 0 ? D : zS1.onReceiveHalfClose,
                        onCancel: (G = B === null || B === void 0 ? void 0 : B.onCancel) !== null && G !== void 0 ? G : zS1.onCancel
                    },
                    I = new g1B(F, A);
                this.nextCall.start(I)
            })
        }
        sendMetadata(A) {
            this.processingMetadata = !0, this.sentMetadata = !0, this.responder.sendMetadata(A, (B) => {
                this.processingMetadata = !1, this.nextCall.sendMetadata(B), this.processPendingMessage(), this.processPendingStatus()
            })
        }
        sendMessage(A, B) {
            if (this.processingMessage = !0, !this.sentMetadata) this.sendMetadata(new FV0.Metadata);
            this.responder.sendMessage(A, (Q) => {
                if (this.processingMessage = !1, this.processingMetadata) this.pendingMessage = Q, this.pendingMessageCallback = B;
                else this.nextCall.sendMessage(Q, B)
            })
        }
        sendStatus(A) {
            this.responder.sendStatus(A, (B) => {
                if (this.processingMetadata || this.processingMessage) this.pendingStatus = B;
                else this.nextCall.sendStatus(B)
            })
        }
        startRead() {
            this.nextCall.startRead()
        }
        getPeer() {
            return this.nextCall.getPeer()
        }
        getDeadline() {
            return this.nextCall.getDeadline()
        }
        getHost() {
            return this.nextCall.getHost()
        }
    }
    c1B.ServerInterceptingCall = m1B;
    var d1B = "grpc-accept-encoding",
        IV0 = "grpc-encoding",
        _1B = "grpc-message",
        x1B = "grpc-status",
        GV0 = "grpc-timeout",
        kw6 = /(\d{1,8})\s*([HMSmun])/,
        yw6 = {
            H: 3600000,
            M: 60000,
            S: 1000,
            m: 1,
            u: 0.001,
            n: 0.000001
        },
        _w6 = {
            [d1B]: "identity,deflate,gzip",
            [IV0]: "identity"
        },
        v1B = {
            [it.constants.HTTP2_HEADER_STATUS]: it.constants.HTTP_STATUS_OK,
            [it.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
        },
        xw6 = {
            waitForTrailers: !0
        };
    class YV0 {
        constructor(A, B, Q, Z, D) {
            var G;
            if (this.stream = A, this.callEventTracker = Q, this.handler = Z, this.listener = null, this.deadlineTimer = null, this.deadline = 1 / 0, this.maxSendMessageSize = cV.DEFAULT_MAX_SEND_MESSAGE_LENGTH, this.maxReceiveMessageSize = cV.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH, this.cancelled = !1, this.metadataSent = !1, this.wantTrailers = !1, this.cancelNotified = !1, this.incomingEncoding = "identity", this.readQueue = [], this.isReadPending = !1, this.receivedHalfClose = !1, this.streamEnded = !1, this.stream.once("error", (W) => {}), this.stream.once("close", () => {
                    var W;
                    if (Um("Request to method " + ((W = this.handler) === null || W === void 0 ? void 0 : W.path) + " stream closed with rstCode " + this.stream.rstCode), this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!1), this.callEventTracker.onCallEnd({
                        code: cV.Status.CANCELLED,
                        details: "Stream closed before sending status",
                        metadata: null
                    });
                    this.notifyOnCancel()
                }), this.stream.on("data", (W) => {
                    this.handleDataFrame(W)
                }), this.stream.pause(), this.stream.on("end", () => {
                    this.handleEndEvent()
                }), "grpc.max_send_message_length" in D) this.maxSendMessageSize = D["grpc.max_send_message_length"];
            if ("grpc.max_receive_message_length" in D) this.maxReceiveMessageSize = D["grpc.max_receive_message_length"];
            this.host = (G = B[":authority"]) !== null && G !== void 0 ? G : B.host, this.decoder = new Sw6.StreamDecoder(this.maxReceiveMessageSize);
            let F = FV0.Metadata.fromHttp2Headers(B);
            if (b1B.isTracerEnabled(f1B)) Um("Request to " + this.handler.path + " received headers " + JSON.stringify(F.toJSON()));
            let I = F.get(GV0);
            if (I.length > 0) this.handleTimeoutHeader(I[0]);
            let Y = F.get(IV0);
            if (Y.length > 0) this.incomingEncoding = Y[0];
            F.remove(GV0), F.remove(IV0), F.remove(d1B), F.remove(it.constants.HTTP2_HEADER_ACCEPT_ENCODING), F.remove(it.constants.HTTP2_HEADER_TE), F.remove(it.constants.HTTP2_HEADER_CONTENT_TYPE), this.metadata = F
        }
        handleTimeoutHeader(A) {
            let B = A.toString().match(kw6);
            if (B === null) {
                let D = {
                    code: cV.Status.INTERNAL,
                    details: `Invalid ${GV0} value "${A}"`,
                    metadata: null
                };
                process.nextTick(() => {
                    this.sendStatus(D)
                });
                return
            }
            let Q = +B[1] * yw6[B[2]] | 0,
                Z = new Date;
            this.deadline = Z.setMilliseconds(Z.getMilliseconds() + Q), this.deadlineTimer = setTimeout(() => {
                let D = {
                    code: cV.Status.DEADLINE_EXCEEDED,
                    details: "Deadline exceeded",
                    metadata: null
                };
                this.sendStatus(D)
            }, Q)
        }
        checkCancelled() {
            if (!this.cancelled && (this.stream.destroyed || this.stream.closed)) this.notifyOnCancel(), this.cancelled = !0;
            return this.cancelled
        }
        notifyOnCancel() {
            if (this.cancelNotified) return;
            if (this.cancelNotified = !0, this.cancelled = !0, process.nextTick(() => {
                    var A;
                    (A = this.listener) === null || A === void 0 || A.onCancel()
                }), this.deadlineTimer) clearTimeout(this.deadlineTimer);
            this.stream.resume()
        }
        maybeSendMetadata() {
            if (!this.metadataSent) this.sendMetadata(new FV0.Metadata)
        }
        serializeMessage(A) {
            let B = this.handler.serialize(A),
                Q = B.byteLength,
                Z = Buffer.allocUnsafe(Q + 5);
            return Z.writeUInt8(0, 0), Z.writeUInt32BE(Q, 1), B.copy(Z, 5), Z
        }
        decompressMessage(A, B) {
            let Q = A.subarray(5);
            if (B === "identity") return Q;
            else if (B === "deflate" || B === "gzip") {
                let Z;
                if (B === "deflate") Z = y1B.createInflate();
                else Z = y1B.createGunzip();
                return new Promise((D, G) => {
                    let F = 0,
                        I = [];
                    Z.on("data", (Y) => {
                        if (I.push(Y), F += Y.byteLength, this.maxReceiveMessageSize !== -1 && F > this.maxReceiveMessageSize) Z.destroy(), G({
                            code: cV.Status.RESOURCE_EXHAUSTED,
                            details: `Received message that decompresses to a size larger than ${this.maxReceiveMessageSize}`
                        })
                    }), Z.on("end", () => {
                        D(Buffer.concat(I))
                    }), Z.write(Q), Z.end()
                })
            } else return Promise.reject({
                code: cV.Status.UNIMPLEMENTED,
                details: `Received message compressed with unsupported encoding "${B}"`
            })
        }
        async decompressAndMaybePush(A) {
            if (A.type !== "COMPRESSED") throw new Error(`Invalid queue entry type: ${A.type}`);
            let Q = A.compressedMessage.readUInt8(0) === 1 ? this.incomingEncoding : "identity",
                Z;
            try {
                Z = await this.decompressMessage(A.compressedMessage, Q)
            } catch (D) {
                this.sendStatus(D);
                return
            }
            try {
                A.parsedMessage = this.handler.deserialize(Z)
            } catch (D) {
                this.sendStatus({
                    code: cV.Status.INTERNAL,
                    details: `Error deserializing request: ${D.message}`
                });
                return
            }
            A.type = "READABLE", this.maybePushNextMessage()
        }
        maybePushNextMessage() {
            if (this.listener && this.isReadPending && this.readQueue.length > 0 && this.readQueue[0].type !== "COMPRESSED") {
                this.isReadPending = !1;
                let A = this.readQueue.shift();
                if (A.type === "READABLE") this.listener.onReceiveMessage(A.parsedMessage);
                else this.listener.onReceiveHalfClose()
            }
        }
        handleDataFrame(A) {
            var B;
            if (this.checkCancelled()) return;
            Um("Request to " + this.handler.path + " received data frame of size " + A.length);
            let Q;
            try {
                Q = this.decoder.write(A)
            } catch (Z) {
                this.sendStatus({
                    code: cV.Status.RESOURCE_EXHAUSTED,
                    details: Z.message
                });
                return
            }
            for (let Z of Q) {
                this.stream.pause();
                let D = {
                    type: "COMPRESSED",
                    compressedMessage: Z,
                    parsedMessage: null
                };
                this.readQueue.push(D), this.decompressAndMaybePush(D), (B = this.callEventTracker) === null || B === void 0 || B.addMessageReceived()
            }
        }
        handleEndEvent() {
            this.readQueue.push({
                type: "HALF_CLOSE",
                compressedMessage: null,
                parsedMessage: null
            }), this.receivedHalfClose = !0, this.maybePushNextMessage()
        }
        start(A) {
            if (Um("Request to " + this.handler.path + " start called"), this.checkCancelled()) return;
            this.listener = A, A.onReceiveMetadata(this.metadata)
        }
        sendMetadata(A) {
            if (this.checkCancelled()) return;
            if (this.metadataSent) return;
            this.metadataSent = !0;
            let B = A ? A.toHttp2Headers() : null,
                Q = Object.assign(Object.assign(Object.assign({}, v1B), _w6), B);
            this.stream.respond(Q, xw6)
        }
        sendMessage(A, B) {
            if (this.checkCancelled()) return;
            let Q;
            try {
                Q = this.serializeMessage(A)
            } catch (Z) {
                this.sendStatus({
                    code: cV.Status.INTERNAL,
                    details: `Error serializing response: ${k1B.getErrorMessage(Z)}`,
                    metadata: null
                });
                return
            }
            if (this.maxSendMessageSize !== -1 && Q.length - 5 > this.maxSendMessageSize) {
                this.sendStatus({
                    code: cV.Status.RESOURCE_EXHAUSTED,
                    details: `Sent message larger than max (${Q.length} vs. ${this.maxSendMessageSize})`,
                    metadata: null
                });
                return
            }
            this.maybeSendMetadata(), Um("Request to " + this.handler.path + " sent data frame of size " + Q.length), this.stream.write(Q, (Z) => {
                var D;
                if (Z) {
                    this.sendStatus({
                        code: cV.Status.INTERNAL,
                        details: `Error writing message: ${k1B.getErrorMessage(Z)}`,
                        metadata: null
                    });
                    return
                }(D = this.callEventTracker) === null || D === void 0 || D.addMessageSent(), B()
            })
        }
        sendStatus(A) {
            var B, Q;
            if (this.checkCancelled()) return;
            if (Um("Request to method " + ((B = this.handler) === null || B === void 0 ? void 0 : B.path) + " ended with status code: " + cV.Status[A.code] + " details: " + A.details), this.metadataSent)
                if (!this.wantTrailers) this.wantTrailers = !0, this.stream.once("wantTrailers", () => {
                    var Z;
                    if (this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!0), this.callEventTracker.onCallEnd(A);
                    let D = Object.assign({
                        [x1B]: A.code,
                        [_1B]: encodeURI(A.details)
                    }, (Z = A.metadata) === null || Z === void 0 ? void 0 : Z.toHttp2Headers());
                    this.stream.sendTrailers(D), this.notifyOnCancel()
                }), this.stream.end();
                else this.notifyOnCancel();
            else {
                if (this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!0), this.callEventTracker.onCallEnd(A);
                let Z = Object.assign(Object.assign({
                    [x1B]: A.code,
                    [_1B]: encodeURI(A.details)
                }, v1B), (Q = A.metadata) === null || Q === void 0 ? void 0 : Q.toHttp2Headers());
                this.stream.respond(Z, {
                    endStream: !0
                }), this.notifyOnCancel()
            }
        }
        startRead() {
            if (Um("Request to " + this.handler.path + " startRead called"), this.checkCancelled()) return;
            if (this.isReadPending = !0, this.readQueue.length === 0) {
                if (!this.receivedHalfClose) this.stream.resume()
            } else this.maybePushNextMessage()
        }
        getPeer() {
            var A;
            let B = (A = this.stream.session) === null || A === void 0 ? void 0 : A.socket;
            if (B === null || B === void 0 ? void 0 : B.remoteAddress)
                if (B.remotePort) return `${B.remoteAddress}:${B.remotePort}`;
                else return B.remoteAddress;
            else return "unknown"
        }
        getDeadline() {
            return this.deadline
        }
        getHost() {
            return this.host
        }
    }
    c1B.BaseServerInterceptingCall = YV0;

    function vw6(A, B, Q, Z, D, G) {
        let F = {
                path: D.path,
                requestStream: D.type === "clientStream" || D.type === "bidi",
                responseStream: D.type === "serverStream" || D.type === "bidi",
                requestDeserialize: D.deserialize,
                responseSerialize: D.serialize
            },
            I = new YV0(B, Q, Z, D, G);
        return A.reduce((Y, W) => {
            return W(F, Y)
        }, I)
    }
});