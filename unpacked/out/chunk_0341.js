/* chunk:341 bytes:[8086212, 8099387) size:13175 source:unpacked-cli.js */
var He2 = E((Ce2) => {
    Object.defineProperty(Ce2, "__esModule", {
        value: !0
    });
    Ce2.Http2SubchannelCall = void 0;
    var jP = W1("http2"),
        mE6 = W1("os"),
        X3 = b6(),
        kP = IJ(),
        dE6 = xX0(),
        cE6 = I7(),
        lE6 = b6(),
        pE6 = "subchannel_call";

    function iE6(A) {
        for (let [B, Q] of Object.entries(mE6.constants.errno))
            if (Q === A) return B;
        return "Unknown system error " + A
    }

    function vX0(A) {
        let B = `Received HTTP status code ${A}`,
            Q;
        switch (A) {
            case 400:
                Q = X3.Status.INTERNAL;
                break;
            case 401:
                Q = X3.Status.UNAUTHENTICATED;
                break;
            case 403:
                Q = X3.Status.PERMISSION_DENIED;
                break;
            case 404:
                Q = X3.Status.UNIMPLEMENTED;
                break;
            case 429:
            case 502:
            case 503:
            case 504:
                Q = X3.Status.UNAVAILABLE;
                break;
            default:
                Q = X3.Status.UNKNOWN
        }
        return {
            code: Q,
            details: B,
            metadata: new kP.Metadata
        }
    }
    class Ve2 {
        constructor(A, B, Q, Z, D) {
            var G;
            this.http2Stream = A, this.callEventTracker = B, this.listener = Q, this.transport = Z, this.callId = D, this.isReadFilterPending = !1, this.isPushPending = !1, this.canPush = !1, this.readsClosed = !1, this.statusOutput = !1, this.unpushedReadMessages = [], this.finalStatus = null, this.internalError = null, this.serverEndedCall = !1, this.connectionDropped = !1;
            let F = (G = Z.getOptions()["grpc.max_receive_message_length"]) !== null && G !== void 0 ? G : X3.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
            this.decoder = new dE6.StreamDecoder(F), A.on("response", (I, Y) => {
                let W = "";
                for (let J of Object.keys(I)) W += "\t\t" + J + ": " + I[J] + `
`;
                if (this.trace(`Received server headers:
` + W), this.httpStatusCode = I[":status"], Y & jP.constants.NGHTTP2_FLAG_END_STREAM) this.handleTrailers(I);
                else {
                    let J;
                    try {
                        J = kP.Metadata.fromHttp2Headers(I)
                    } catch (X) {
                        this.endCall({
                            code: X3.Status.UNKNOWN,
                            details: X.message,
                            metadata: new kP.Metadata
                        });
                        return
                    }
                    this.listener.onReceiveMetadata(J)
                }
            }), A.on("trailers", (I) => {
                this.handleTrailers(I)
            }), A.on("data", (I) => {
                if (this.statusOutput) return;
                this.trace("receive HTTP/2 data frame of length " + I.length);
                let Y;
                try {
                    Y = this.decoder.write(I)
                } catch (W) {
                    if (this.httpStatusCode !== void 0 && this.httpStatusCode !== 200) {
                        let J = vX0(this.httpStatusCode);
                        this.cancelWithStatus(J.code, J.details)
                    } else this.cancelWithStatus(X3.Status.RESOURCE_EXHAUSTED, W.message);
                    return
                }
                for (let W of Y) this.trace("parsed message of length " + W.length), this.callEventTracker.addMessageReceived(), this.tryPush(W)
            }), A.on("end", () => {
                this.readsClosed = !0, this.maybeOutputStatus()
            }), A.on("close", () => {
                this.serverEndedCall = !0, process.nextTick(() => {
                    var I;
                    if (this.trace("HTTP/2 stream closed with code " + A.rstCode), ((I = this.finalStatus) === null || I === void 0 ? void 0 : I.code) === X3.Status.OK) return;
                    let Y, W = "";
                    switch (A.rstCode) {
                        case jP.constants.NGHTTP2_NO_ERROR:
                            if (this.finalStatus !== null) return;
                            if (this.httpStatusCode && this.httpStatusCode !== 200) {
                                let J = vX0(this.httpStatusCode);
                                Y = J.code, W = J.details
                            } else Y = X3.Status.INTERNAL, W = `Received RST_STREAM with code ${A.rstCode} (Call ended without gRPC status)`;
                            break;
                        case jP.constants.NGHTTP2_REFUSED_STREAM:
                            Y = X3.Status.UNAVAILABLE, W = "Stream refused by server";
                            break;
                        case jP.constants.NGHTTP2_CANCEL:
                            if (this.connectionDropped) Y = X3.Status.UNAVAILABLE, W = "Connection dropped";
                            else Y = X3.Status.CANCELLED, W = "Call cancelled";
                            break;
                        case jP.constants.NGHTTP2_ENHANCE_YOUR_CALM:
                            Y = X3.Status.RESOURCE_EXHAUSTED, W = "Bandwidth exhausted or memory limit exceeded";
                            break;
                        case jP.constants.NGHTTP2_INADEQUATE_SECURITY:
                            Y = X3.Status.PERMISSION_DENIED, W = "Protocol not secure enough";
                            break;
                        case jP.constants.NGHTTP2_INTERNAL_ERROR:
                            if (Y = X3.Status.INTERNAL, this.internalError === null) W = `Received RST_STREAM with code ${A.rstCode} (Internal server error)`;
                            else if (this.internalError.code === "ECONNRESET" || this.internalError.code === "ETIMEDOUT") Y = X3.Status.UNAVAILABLE, W = this.internalError.message;
                            else W = `Received RST_STREAM with code ${A.rstCode} triggered by internal client error: ${this.internalError.message}`;
                            break;
                        default:
                            Y = X3.Status.INTERNAL, W = `Received RST_STREAM with code ${A.rstCode}`
                    }
                    this.endCall({
                        code: Y,
                        details: W,
                        metadata: new kP.Metadata,
                        rstCode: A.rstCode
                    })
                })
            }), A.on("error", (I) => {
                if (I.code !== "ERR_HTTP2_STREAM_ERROR") this.trace("Node error event: message=" + I.message + " code=" + I.code + " errno=" + iE6(I.errno) + " syscall=" + I.syscall), this.internalError = I;
                this.callEventTracker.onStreamEnd(!1)
            })
        }
        getDeadlineInfo() {
            return [`remote_addr=${this.getPeer()}`]
        }
        onDisconnect() {
            this.connectionDropped = !0, setImmediate(() => {
                this.endCall({
                    code: X3.Status.UNAVAILABLE,
                    details: "Connection dropped",
                    metadata: new kP.Metadata
                })
            })
        }
        outputStatus() {
            if (!this.statusOutput) this.statusOutput = !0, this.trace("ended with status: code=" + this.finalStatus.code + ' details="' + this.finalStatus.details + '"'), this.callEventTracker.onCallEnd(this.finalStatus), process.nextTick(() => {
                this.listener.onReceiveStatus(this.finalStatus)
            }), this.http2Stream.resume()
        }
        trace(A) {
            cE6.trace(lE6.LogVerbosity.DEBUG, pE6, "[" + this.callId + "] " + A)
        }
        endCall(A) {
            if (this.finalStatus === null || this.finalStatus.code === X3.Status.OK) this.finalStatus = A, this.maybeOutputStatus();
            this.destroyHttp2Stream()
        }
        maybeOutputStatus() {
            if (this.finalStatus !== null) {
                if (this.finalStatus.code !== X3.Status.OK || this.readsClosed && this.unpushedReadMessages.length === 0 && !this.isReadFilterPending && !this.isPushPending) this.outputStatus()
            }
        }
        push(A) {
            this.trace("pushing to reader message of length " + (A instanceof Buffer ? A.length : null)), this.canPush = !1, this.isPushPending = !0, process.nextTick(() => {
                if (this.isPushPending = !1, this.statusOutput) return;
                this.listener.onReceiveMessage(A), this.maybeOutputStatus()
            })
        }
        tryPush(A) {
            if (this.canPush) this.http2Stream.pause(), this.push(A);
            else this.trace("unpushedReadMessages.push message of length " + A.length), this.unpushedReadMessages.push(A)
        }
        handleTrailers(A) {
            this.serverEndedCall = !0, this.callEventTracker.onStreamEnd(!0);
            let B = "";
            for (let G of Object.keys(A)) B += "\t\t" + G + ": " + A[G] + `
`;
            this.trace(`Received server trailers:
` + B);
            let Q;
            try {
                Q = kP.Metadata.fromHttp2Headers(A)
            } catch (G) {
                Q = new kP.Metadata
            }
            let Z = Q.getMap(),
                D;
            if (typeof Z["grpc-status"] === "string") {
                let G = Number(Z["grpc-status"]);
                this.trace("received status code " + G + " from server"), Q.remove("grpc-status");
                let F = "";
                if (typeof Z["grpc-message"] === "string") {
                    try {
                        F = decodeURI(Z["grpc-message"])
                    } catch (I) {
                        F = Z["grpc-message"]
                    }
                    Q.remove("grpc-message"), this.trace('received status details string "' + F + '" from server')
                }
                D = {
                    code: G,
                    details: F,
                    metadata: Q
                }
            } else if (this.httpStatusCode) D = vX0(this.httpStatusCode), D.metadata = Q;
            else D = {
                code: X3.Status.UNKNOWN,
                details: "No status information received",
                metadata: Q
            };
            this.endCall(D)
        }
        destroyHttp2Stream() {
            var A;
            if (this.http2Stream.destroyed) return;
            if (this.serverEndedCall) this.http2Stream.end();
            else {
                let B;
                if (((A = this.finalStatus) === null || A === void 0 ? void 0 : A.code) === X3.Status.OK) B = jP.constants.NGHTTP2_NO_ERROR;
                else B = jP.constants.NGHTTP2_CANCEL;
                this.trace("close http2 stream with code " + B), this.http2Stream.close(B)
            }
        }
        cancelWithStatus(A, B) {
            this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), this.endCall({
                code: A,
                details: B,
                metadata: new kP.Metadata
            })
        }
        getStatus() {
            return this.finalStatus
        }
        getPeer() {
            return this.transport.getPeerName()
        }
        getCallNumber() {
            return this.callId
        }
        startRead() {
            if (this.finalStatus !== null && this.finalStatus.code !== X3.Status.OK) {
                this.readsClosed = !0, this.maybeOutputStatus();
                return
            }
            if (this.canPush = !0, this.unpushedReadMessages.length > 0) {
                let A = this.unpushedReadMessages.shift();
                this.push(A);
                return
            }
            this.http2Stream.resume()
        }
        sendMessageWithContext(A, B) {
            this.trace("write() called with message of length " + B.length);
            let Q = (Z) => {
                process.nextTick(() => {
                    var D;
                    let G = X3.Status.UNAVAILABLE;
                    if ((Z === null || Z === void 0 ? void 0 : Z.code) === "ERR_STREAM_WRITE_AFTER_END") G = X3.Status.INTERNAL;
                    if (Z) this.cancelWithStatus(G, `Write error: ${Z.message}`);
                    (D = A.callback) === null || D === void 0 || D.call(A)
                })
            };
            this.trace("sending data chunk of length " + B.length), this.callEventTracker.addMessageSent();
            try {
                this.http2Stream.write(B, Q)
            } catch (Z) {
                this.endCall({
                    code: X3.Status.UNAVAILABLE,
                    details: `Write failed with error ${Z.message}`,
                    metadata: new kP.Metadata
                })
            }
        }
        halfClose() {
            this.trace("end() called"), this.trace("calling end() on HTTP/2 stream"), this.http2Stream.end()
        }
    }
    Ce2.Http2SubchannelCall = Ve2
});
var bX0 = E((ze2) => {
    Object.defineProperty(ze2, "__esModule", {
        value: !0
    });
    ze2.getNextCallNumber = aE6;
    var nE6 = 0;

    function aE6() {
        return nE6++
    }
});