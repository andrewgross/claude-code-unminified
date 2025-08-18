/* chunk:344 bytes:[8129800, 8149242) size:19442 source:unpacked-cli.js */
var se2 = E((ne2) => {
    Object.defineProperty(ne2, "__esModule", {
        value: !0
    });
    ne2.LoadBalancingCall = void 0;
    var le2 = RE(),
        YS1 = b6(),
        pe2 = L71(),
        WS1 = IJ(),
        M71 = Wx(),
        uU6 = mV(),
        mU6 = I7(),
        pX0 = IS1(),
        dU6 = W1("http2"),
        cU6 = "load_balancing_call";
    class ie2 {
        constructor(A, B, Q, Z, D, G, F) {
            var I, Y;
            this.channel = A, this.callConfig = B, this.methodName = Q, this.host = Z, this.credentials = D, this.deadline = G, this.callNumber = F, this.child = null, this.readPending = !1, this.pendingMessage = null, this.pendingHalfClose = !1, this.ended = !1, this.metadata = null, this.listener = null, this.onCallEnded = null, this.childStartTime = null;
            let W = this.methodName.split("/"),
                J = "";
            if (W.length >= 2) J = W[1];
            let X = (Y = (I = uU6.splitHostPort(this.host)) === null || I === void 0 ? void 0 : I.host) !== null && Y !== void 0 ? Y : "localhost";
            this.serviceUrl = `https://${X}/${J}`, this.startTime = new Date
        }
        getDeadlineInfo() {
            var A, B;
            let Q = [];
            if (this.childStartTime) {
                if (this.childStartTime > this.startTime) {
                    if ((A = this.metadata) === null || A === void 0 ? void 0 : A.getOptions().waitForReady) Q.push("wait_for_ready");
                    Q.push(`LB pick: ${pe2.formatDateDifference(this.startTime,this.childStartTime)}`)
                }
                return Q.push(...this.child.getDeadlineInfo()), Q
            } else {
                if ((B = this.metadata) === null || B === void 0 ? void 0 : B.getOptions().waitForReady) Q.push("wait_for_ready");
                Q.push("Waiting for LB pick")
            }
            return Q
        }
        trace(A) {
            mU6.trace(YS1.LogVerbosity.DEBUG, cU6, "[" + this.callNumber + "] " + A)
        }
        outputStatus(A, B) {
            var Q, Z;
            if (!this.ended) {
                this.ended = !0, this.trace("ended with status: code=" + A.code + ' details="' + A.details + '" start time=' + this.startTime.toISOString());
                let D = Object.assign(Object.assign({}, A), {
                    progress: B
                });
                (Q = this.listener) === null || Q === void 0 || Q.onReceiveStatus(D), (Z = this.onCallEnded) === null || Z === void 0 || Z.call(this, D.code)
            }
        }
        doPick() {
            var A, B;
            if (this.ended) return;
            if (!this.metadata) throw new Error("doPick called before start");
            this.trace("Pick called");
            let Q = this.metadata.clone(),
                Z = this.channel.doPick(Q, this.callConfig.pickInformation),
                D = Z.subchannel ? "(" + Z.subchannel.getChannelzRef().id + ") " + Z.subchannel.getAddress() : "" + Z.subchannel;
            switch (this.trace("Pick result: " + M71.PickResultType[Z.pickResultType] + " subchannel: " + D + " status: " + ((A = Z.status) === null || A === void 0 ? void 0 : A.code) + " " + ((B = Z.status) === null || B === void 0 ? void 0 : B.details)), Z.pickResultType) {
                case M71.PickResultType.COMPLETE:
                    this.credentials.compose(Z.subchannel.getCallCredentials()).generateMetadata({
                        method_name: this.methodName,
                        service_url: this.serviceUrl
                    }).then((Y) => {
                        var W;
                        if (this.ended) {
                            this.trace("Credentials metadata generation finished after call ended");
                            return
                        }
                        if (Q.merge(Y), Q.get("authorization").length > 1) this.outputStatus({
                            code: YS1.Status.INTERNAL,
                            details: '"authorization" metadata cannot have multiple values',
                            metadata: new WS1.Metadata
                        }, "PROCESSED");
                        if (Z.subchannel.getConnectivityState() !== le2.ConnectivityState.READY) {
                            this.trace("Picked subchannel " + D + " has state " + le2.ConnectivityState[Z.subchannel.getConnectivityState()] + " after getting credentials metadata. Retrying pick"), this.doPick();
                            return
                        }
                        if (this.deadline !== 1 / 0) Q.set("grpc-timeout", pe2.getDeadlineTimeoutString(this.deadline));
                        try {
                            this.child = Z.subchannel.getRealSubchannel().createCall(Q, this.host, this.methodName, {
                                onReceiveMetadata: (J) => {
                                    this.trace("Received metadata"), this.listener.onReceiveMetadata(J)
                                },
                                onReceiveMessage: (J) => {
                                    this.trace("Received message"), this.listener.onReceiveMessage(J)
                                },
                                onReceiveStatus: (J) => {
                                    if (this.trace("Received status"), J.rstCode === dU6.constants.NGHTTP2_REFUSED_STREAM) this.outputStatus(J, "REFUSED");
                                    else this.outputStatus(J, "PROCESSED")
                                }
                            }), this.childStartTime = new Date
                        } catch (J) {
                            this.trace("Failed to start call on picked subchannel " + D + " with error " + J.message), this.outputStatus({
                                code: YS1.Status.INTERNAL,
                                details: "Failed to start HTTP/2 stream with error " + J.message,
                                metadata: new WS1.Metadata
                            }, "NOT_STARTED");
                            return
                        }
                        if ((W = Z.onCallStarted) === null || W === void 0 || W.call(Z), this.onCallEnded = Z.onCallEnded, this.trace("Created child call [" + this.child.getCallNumber() + "]"), this.readPending) this.child.startRead();
                        if (this.pendingMessage) this.child.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
                        if (this.pendingHalfClose) this.child.halfClose()
                    }, (Y) => {
                        let {
                            code: W,
                            details: J
                        } = pX0.restrictControlPlaneStatusCode(typeof Y.code === "number" ? Y.code : YS1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${Y.message}`);
                        this.outputStatus({
                            code: W,
                            details: J,
                            metadata: new WS1.Metadata
                        }, "PROCESSED")
                    });
                    break;
                case M71.PickResultType.DROP:
                    let {
                        code: F, details: I
                    } = pX0.restrictControlPlaneStatusCode(Z.status.code, Z.status.details);
                    setImmediate(() => {
                        this.outputStatus({
                            code: F,
                            details: I,
                            metadata: Z.status.metadata
                        }, "DROP")
                    });
                    break;
                case M71.PickResultType.TRANSIENT_FAILURE:
                    if (this.metadata.getOptions().waitForReady) this.channel.queueCallForPick(this);
                    else {
                        let {
                            code: Y,
                            details: W
                        } = pX0.restrictControlPlaneStatusCode(Z.status.code, Z.status.details);
                        setImmediate(() => {
                            this.outputStatus({
                                code: Y,
                                details: W,
                                metadata: Z.status.metadata
                            }, "PROCESSED")
                        })
                    }
                    break;
                case M71.PickResultType.QUEUE:
                    this.channel.queueCallForPick(this)
            }
        }
        cancelWithStatus(A, B) {
            var Q;
            this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), (Q = this.child) === null || Q === void 0 || Q.cancelWithStatus(A, B), this.outputStatus({
                code: A,
                details: B,
                metadata: new WS1.Metadata
            }, "PROCESSED")
        }
        getPeer() {
            var A, B;
            return (B = (A = this.child) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : this.channel.getTarget()
        }
        start(A, B) {
            this.trace("start called"), this.listener = B, this.metadata = A, this.doPick()
        }
        sendMessageWithContext(A, B) {
            if (this.trace("write() called with message of length " + B.length), this.child) this.child.sendMessageWithContext(A, B);
            else this.pendingMessage = {
                context: A,
                message: B
            }
        }
        startRead() {
            if (this.trace("startRead called"), this.child) this.child.startRead();
            else this.readPending = !0
        }
        halfClose() {
            if (this.trace("halfClose called"), this.child) this.child.halfClose();
            else this.pendingHalfClose = !0
        }
        setCredentials(A) {
            throw new Error("Method not implemented.")
        }
        getCallNumber() {
            return this.callNumber
        }
    }
    ne2.LoadBalancingCall = ie2
});
var A1B = E((te2) => {
    Object.defineProperty(te2, "__esModule", {
        value: !0
    });
    te2.ResolvingCall = void 0;
    var lU6 = CP1(),
        zm = b6(),
        Em = L71(),
        re2 = IJ(),
        pU6 = I7(),
        iU6 = IS1(),
        nU6 = "resolving_call";
    class oe2 {
        constructor(A, B, Q, Z, D) {
            if (this.channel = A, this.method = B, this.filterStackFactory = Z, this.callNumber = D, this.child = null, this.readPending = !1, this.pendingMessage = null, this.pendingHalfClose = !1, this.ended = !1, this.readFilterPending = !1, this.writeFilterPending = !1, this.pendingChildStatus = null, this.metadata = null, this.listener = null, this.statusWatchers = [], this.deadlineTimer = setTimeout(() => {}, 0), this.filterStack = null, this.deadlineStartTime = null, this.configReceivedTime = null, this.childStartTime = null, this.credentials = lU6.CallCredentials.createEmpty(), this.deadline = Q.deadline, this.host = Q.host, Q.parentCall) {
                if (Q.flags & zm.Propagate.CANCELLATION) Q.parentCall.on("cancelled", () => {
                    this.cancelWithStatus(zm.Status.CANCELLED, "Cancelled by parent call")
                });
                if (Q.flags & zm.Propagate.DEADLINE) this.trace("Propagating deadline from parent: " + Q.parentCall.getDeadline()), this.deadline = Em.minDeadline(this.deadline, Q.parentCall.getDeadline())
            }
            this.trace("Created"), this.runDeadlineTimer()
        }
        trace(A) {
            pU6.trace(zm.LogVerbosity.DEBUG, nU6, "[" + this.callNumber + "] " + A)
        }
        runDeadlineTimer() {
            clearTimeout(this.deadlineTimer), this.deadlineStartTime = new Date, this.trace("Deadline: " + Em.deadlineToString(this.deadline));
            let A = Em.getRelativeTimeout(this.deadline);
            if (A !== 1 / 0) {
                this.trace("Deadline will be reached in " + A + "ms");
                let B = () => {
                    if (!this.deadlineStartTime) {
                        this.cancelWithStatus(zm.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
                        return
                    }
                    let Q = [],
                        Z = new Date;
                    if (Q.push(`Deadline exceeded after ${Em.formatDateDifference(this.deadlineStartTime,Z)}`), this.configReceivedTime) {
                        if (this.configReceivedTime > this.deadlineStartTime) Q.push(`name resolution: ${Em.formatDateDifference(this.deadlineStartTime,this.configReceivedTime)}`);
                        if (this.childStartTime) {
                            if (this.childStartTime > this.configReceivedTime) Q.push(`metadata filters: ${Em.formatDateDifference(this.configReceivedTime,this.childStartTime)}`)
                        } else Q.push("waiting for metadata filters")
                    } else Q.push("waiting for name resolution");
                    if (this.child) Q.push(...this.child.getDeadlineInfo());
                    this.cancelWithStatus(zm.Status.DEADLINE_EXCEEDED, Q.join(","))
                };
                if (A <= 0) process.nextTick(B);
                else this.deadlineTimer = setTimeout(B, A)
            }
        }
        outputStatus(A) {
            if (!this.ended) {
                if (this.ended = !0, !this.filterStack) this.filterStack = this.filterStackFactory.createFilter();
                clearTimeout(this.deadlineTimer);
                let B = this.filterStack.receiveTrailers(A);
                this.trace("ended with status: code=" + B.code + ' details="' + B.details + '"'), this.statusWatchers.forEach((Q) => Q(B)), process.nextTick(() => {
                    var Q;
                    (Q = this.listener) === null || Q === void 0 || Q.onReceiveStatus(B)
                })
            }
        }
        sendMessageOnChild(A, B) {
            if (!this.child) throw new Error("sendMessageonChild called with child not populated");
            let Q = this.child;
            this.writeFilterPending = !0, this.filterStack.sendMessage(Promise.resolve({
                message: B,
                flags: A.flags
            })).then((Z) => {
                if (this.writeFilterPending = !1, Q.sendMessageWithContext(A, Z.message), this.pendingHalfClose) Q.halfClose()
            }, (Z) => {
                this.cancelWithStatus(Z.code, Z.details)
            })
        }
        getConfig() {
            if (this.ended) return;
            if (!this.metadata || !this.listener) throw new Error("getConfig called before start");
            let A = this.channel.getConfig(this.method, this.metadata);
            if (A.type === "NONE") {
                this.channel.queueCallForConfig(this);
                return
            } else if (A.type === "ERROR") {
                if (this.metadata.getOptions().waitForReady) this.channel.queueCallForConfig(this);
                else this.outputStatus(A.error);
                return
            }
            this.configReceivedTime = new Date;
            let B = A.config;
            if (B.status !== zm.Status.OK) {
                let {
                    code: Q,
                    details: Z
                } = iU6.restrictControlPlaneStatusCode(B.status, "Failed to route call to method " + this.method);
                this.outputStatus({
                    code: Q,
                    details: Z,
                    metadata: new re2.Metadata
                });
                return
            }
            if (B.methodConfig.timeout) {
                let Q = new Date;
                Q.setSeconds(Q.getSeconds() + B.methodConfig.timeout.seconds), Q.setMilliseconds(Q.getMilliseconds() + B.methodConfig.timeout.nanos / 1e6), this.deadline = Em.minDeadline(this.deadline, Q), this.runDeadlineTimer()
            }
            this.filterStackFactory.push(B.dynamicFilterFactories), this.filterStack = this.filterStackFactory.createFilter(), this.filterStack.sendMetadata(Promise.resolve(this.metadata)).then((Q) => {
                if (this.child = this.channel.createRetryingCall(B, this.method, this.host, this.credentials, this.deadline), this.trace("Created child [" + this.child.getCallNumber() + "]"), this.childStartTime = new Date, this.child.start(Q, {
                        onReceiveMetadata: (Z) => {
                            this.trace("Received metadata"), this.listener.onReceiveMetadata(this.filterStack.receiveMetadata(Z))
                        },
                        onReceiveMessage: (Z) => {
                            this.trace("Received message"), this.readFilterPending = !0, this.filterStack.receiveMessage(Z).then((D) => {
                                if (this.trace("Finished filtering received message"), this.readFilterPending = !1, this.listener.onReceiveMessage(D), this.pendingChildStatus) this.outputStatus(this.pendingChildStatus)
                            }, (D) => {
                                this.cancelWithStatus(D.code, D.details)
                            })
                        },
                        onReceiveStatus: (Z) => {
                            if (this.trace("Received status"), this.readFilterPending) this.pendingChildStatus = Z;
                            else this.outputStatus(Z)
                        }
                    }), this.readPending) this.child.startRead();
                if (this.pendingMessage) this.sendMessageOnChild(this.pendingMessage.context, this.pendingMessage.message);
                else if (this.pendingHalfClose) this.child.halfClose()
            }, (Q) => {
                this.outputStatus(Q)
            })
        }
        reportResolverError(A) {
            var B;
            if ((B = this.metadata) === null || B === void 0 ? void 0 : B.getOptions().waitForReady) this.channel.queueCallForConfig(this);
            else this.outputStatus(A)
        }
        cancelWithStatus(A, B) {
            var Q;
            this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), (Q = this.child) === null || Q === void 0 || Q.cancelWithStatus(A, B), this.outputStatus({
                code: A,
                details: B,
                metadata: new re2.Metadata
            })
        }
        getPeer() {
            var A, B;
            return (B = (A = this.child) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : this.channel.getTarget()
        }
        start(A, B) {
            this.trace("start called"), this.metadata = A.clone(), this.listener = B, this.getConfig()
        }
        sendMessageWithContext(A, B) {
            if (this.trace("write() called with message of length " + B.length), this.child) this.sendMessageOnChild(A, B);
            else this.pendingMessage = {
                context: A,
                message: B
            }
        }
        startRead() {
            if (this.trace("startRead called"), this.child) this.child.startRead();
            else this.readPending = !0
        }
        halfClose() {
            if (this.trace("halfClose called"), this.child && !this.writeFilterPending) this.child.halfClose();
            else this.pendingHalfClose = !0
        }
        setCredentials(A) {
            this.credentials = A
        }
        addStatusWatcher(A) {
            this.statusWatchers.push(A)
        }
        getCallNumber() {
            return this.callNumber
        }
    }
    te2.ResolvingCall = oe2
});