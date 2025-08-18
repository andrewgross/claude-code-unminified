/* chunk:345 bytes:[8149243, 8168812) size:19569 source:unpacked-cli.js */
var F1B = E((D1B) => {
    Object.defineProperty(D1B, "__esModule", {
        value: !0
    });
    D1B.RetryingCall = D1B.MessageBufferTracker = D1B.RetryThrottler = void 0;
    var JS1 = b6(),
        aU6 = L71(),
        sU6 = IJ(),
        rU6 = I7(),
        oU6 = "retrying_call";
    class B1B {
        constructor(A, B, Q) {
            if (this.maxTokens = A, this.tokenRatio = B, Q) this.tokens = Q.tokens * (A / Q.maxTokens);
            else this.tokens = A
        }
        addCallSucceeded() {
            this.tokens = Math.min(this.tokens + this.tokenRatio, this.maxTokens)
        }
        addCallFailed() {
            this.tokens = Math.max(this.tokens - 1, 0)
        }
        canRetryCall() {
            return this.tokens > this.maxTokens / 2
        }
    }
    D1B.RetryThrottler = B1B;
    class Q1B {
        constructor(A, B) {
            this.totalLimit = A, this.limitPerCall = B, this.totalAllocated = 0, this.allocatedPerCall = new Map
        }
        allocate(A, B) {
            var Q;
            let Z = (Q = this.allocatedPerCall.get(B)) !== null && Q !== void 0 ? Q : 0;
            if (this.limitPerCall - Z < A || this.totalLimit - this.totalAllocated < A) return !1;
            return this.allocatedPerCall.set(B, Z + A), this.totalAllocated += A, !0
        }
        free(A, B) {
            var Q;
            if (this.totalAllocated < A) throw new Error(`Invalid buffer allocation state: call ${B} freed ${A} > total allocated ${this.totalAllocated}`);
            this.totalAllocated -= A;
            let Z = (Q = this.allocatedPerCall.get(B)) !== null && Q !== void 0 ? Q : 0;
            if (Z < A) throw new Error(`Invalid buffer allocation state: call ${B} freed ${A} > allocated for call ${Z}`);
            this.allocatedPerCall.set(B, Z - A)
        }
        freeAll(A) {
            var B;
            let Q = (B = this.allocatedPerCall.get(A)) !== null && B !== void 0 ? B : 0;
            if (this.totalAllocated < Q) throw new Error(`Invalid buffer allocation state: call ${A} allocated ${Q} > total allocated ${this.totalAllocated}`);
            this.totalAllocated -= Q, this.allocatedPerCall.delete(A)
        }
    }
    D1B.MessageBufferTracker = Q1B;
    var iX0 = "grpc-previous-rpc-attempts",
        tU6 = 5;
    class Z1B {
        constructor(A, B, Q, Z, D, G, F, I, Y) {
            var W;
            this.channel = A, this.callConfig = B, this.methodName = Q, this.host = Z, this.credentials = D, this.deadline = G, this.callNumber = F, this.bufferTracker = I, this.retryThrottler = Y, this.listener = null, this.initialMetadata = null, this.underlyingCalls = [], this.writeBuffer = [], this.writeBufferOffset = 0, this.readStarted = !1, this.transparentRetryUsed = !1, this.attempts = 0, this.hedgingTimer = null, this.committedCallIndex = null, this.initialRetryBackoffSec = 0, this.nextRetryBackoffSec = 0;
            let J = (W = A.getOptions()["grpc-node.retry_max_attempts_limit"]) !== null && W !== void 0 ? W : tU6;
            if (A.getOptions()["grpc.enable_retries"] === 0) this.state = "NO_RETRY", this.maxAttempts = 1;
            else if (B.methodConfig.retryPolicy) {
                this.state = "RETRY";
                let X = B.methodConfig.retryPolicy;
                this.nextRetryBackoffSec = this.initialRetryBackoffSec = Number(X.initialBackoff.substring(0, X.initialBackoff.length - 1)), this.maxAttempts = Math.min(X.maxAttempts, J)
            } else if (B.methodConfig.hedgingPolicy) this.state = "HEDGING", this.maxAttempts = Math.min(B.methodConfig.hedgingPolicy.maxAttempts, J);
            else this.state = "TRANSPARENT_ONLY", this.maxAttempts = 1;
            this.startTime = new Date
        }
        getDeadlineInfo() {
            if (this.underlyingCalls.length === 0) return [];
            let A = [],
                B = this.underlyingCalls[this.underlyingCalls.length - 1];
            if (this.underlyingCalls.length > 1) A.push(`previous attempts: ${this.underlyingCalls.length-1}`);
            if (B.startTime > this.startTime) A.push(`time to current attempt start: ${aU6.formatDateDifference(this.startTime,B.startTime)}`);
            return A.push(...B.call.getDeadlineInfo()), A
        }
        getCallNumber() {
            return this.callNumber
        }
        trace(A) {
            rU6.trace(JS1.LogVerbosity.DEBUG, oU6, "[" + this.callNumber + "] " + A)
        }
        reportStatus(A) {
            this.trace("ended with status: code=" + A.code + ' details="' + A.details + '" start time=' + this.startTime.toISOString()), this.bufferTracker.freeAll(this.callNumber), this.writeBufferOffset = this.writeBufferOffset + this.writeBuffer.length, this.writeBuffer = [], process.nextTick(() => {
                var B;
                (B = this.listener) === null || B === void 0 || B.onReceiveStatus({
                    code: A.code,
                    details: A.details,
                    metadata: A.metadata
                })
            })
        }
        cancelWithStatus(A, B) {
            this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), this.reportStatus({
                code: A,
                details: B,
                metadata: new sU6.Metadata
            });
            for (let {
                    call: Q
                }
                of this.underlyingCalls) Q.cancelWithStatus(A, B)
        }
        getPeer() {
            if (this.committedCallIndex !== null) return this.underlyingCalls[this.committedCallIndex].call.getPeer();
            else return "unknown"
        }
        getBufferEntry(A) {
            var B;
            return (B = this.writeBuffer[A - this.writeBufferOffset]) !== null && B !== void 0 ? B : {
                entryType: "FREED",
                allocated: !1
            }
        }
        getNextBufferIndex() {
            return this.writeBufferOffset + this.writeBuffer.length
        }
        clearSentMessages() {
            if (this.state !== "COMMITTED") return;
            let A;
            if (this.underlyingCalls[this.committedCallIndex].state === "COMPLETED") A = this.getNextBufferIndex();
            else A = this.underlyingCalls[this.committedCallIndex].nextMessageToSend;
            for (let B = this.writeBufferOffset; B < A; B++) {
                let Q = this.getBufferEntry(B);
                if (Q.allocated) this.bufferTracker.free(Q.message.message.length, this.callNumber)
            }
            this.writeBuffer = this.writeBuffer.slice(A - this.writeBufferOffset), this.writeBufferOffset = A
        }
        commitCall(A) {
            var B, Q;
            if (this.state === "COMMITTED") return;
            this.trace("Committing call [" + this.underlyingCalls[A].call.getCallNumber() + "] at index " + A), this.state = "COMMITTED", (Q = (B = this.callConfig).onCommitted) === null || Q === void 0 || Q.call(B), this.committedCallIndex = A;
            for (let Z = 0; Z < this.underlyingCalls.length; Z++) {
                if (Z === A) continue;
                if (this.underlyingCalls[Z].state === "COMPLETED") continue;
                this.underlyingCalls[Z].state = "COMPLETED", this.underlyingCalls[Z].call.cancelWithStatus(JS1.Status.CANCELLED, "Discarded in favor of other hedged attempt")
            }
            this.clearSentMessages()
        }
        commitCallWithMostMessages() {
            if (this.state === "COMMITTED") return;
            let A = -1,
                B = -1;
            for (let [Q, Z] of this.underlyingCalls.entries())
                if (Z.state === "ACTIVE" && Z.nextMessageToSend > A) A = Z.nextMessageToSend, B = Q;
            if (B === -1) this.state = "TRANSPARENT_ONLY";
            else this.commitCall(B)
        }
        isStatusCodeInList(A, B) {
            return A.some((Q) => {
                var Z;
                return Q === B || Q.toString().toLowerCase() === ((Z = JS1.Status[B]) === null || Z === void 0 ? void 0 : Z.toLowerCase())
            })
        }
        getNextRetryBackoffMs() {
            var A;
            let B = (A = this.callConfig) === null || A === void 0 ? void 0 : A.methodConfig.retryPolicy;
            if (!B) return 0;
            let Q = Math.random() * this.nextRetryBackoffSec * 1000,
                Z = Number(B.maxBackoff.substring(0, B.maxBackoff.length - 1));
            return this.nextRetryBackoffSec = Math.min(this.nextRetryBackoffSec * B.backoffMultiplier, Z), Q
        }
        maybeRetryCall(A, B) {
            if (this.state !== "RETRY") {
                B(!1);
                return
            }
            if (this.attempts >= this.maxAttempts) {
                B(!1);
                return
            }
            let Q;
            if (A === null) Q = this.getNextRetryBackoffMs();
            else if (A < 0) {
                this.state = "TRANSPARENT_ONLY", B(!1);
                return
            } else Q = A, this.nextRetryBackoffSec = this.initialRetryBackoffSec;
            setTimeout(() => {
                var Z, D;
                if (this.state !== "RETRY") {
                    B(!1);
                    return
                }
                if ((D = (Z = this.retryThrottler) === null || Z === void 0 ? void 0 : Z.canRetryCall()) !== null && D !== void 0 ? D : !0) B(!0), this.attempts += 1, this.startNewAttempt();
                else this.trace("Retry attempt denied by throttling policy"), B(!1)
            }, Q)
        }
        countActiveCalls() {
            let A = 0;
            for (let B of this.underlyingCalls)
                if ((B === null || B === void 0 ? void 0 : B.state) === "ACTIVE") A += 1;
            return A
        }
        handleProcessedStatus(A, B, Q) {
            var Z, D, G;
            switch (this.state) {
                case "COMMITTED":
                case "NO_RETRY":
                case "TRANSPARENT_ONLY":
                    this.commitCall(B), this.reportStatus(A);
                    break;
                case "HEDGING":
                    if (this.isStatusCodeInList((Z = this.callConfig.methodConfig.hedgingPolicy.nonFatalStatusCodes) !== null && Z !== void 0 ? Z : [], A.code)) {
                        (D = this.retryThrottler) === null || D === void 0 || D.addCallFailed();
                        let F;
                        if (Q === null) F = 0;
                        else if (Q < 0) {
                            this.state = "TRANSPARENT_ONLY", this.commitCall(B), this.reportStatus(A);
                            return
                        } else F = Q;
                        setTimeout(() => {
                            if (this.maybeStartHedgingAttempt(), this.countActiveCalls() === 0) this.commitCall(B), this.reportStatus(A)
                        }, F)
                    } else this.commitCall(B), this.reportStatus(A);
                    break;
                case "RETRY":
                    if (this.isStatusCodeInList(this.callConfig.methodConfig.retryPolicy.retryableStatusCodes, A.code))(G = this.retryThrottler) === null || G === void 0 || G.addCallFailed(), this.maybeRetryCall(Q, (F) => {
                        if (!F) this.commitCall(B), this.reportStatus(A)
                    });
                    else this.commitCall(B), this.reportStatus(A);
                    break
            }
        }
        getPushback(A) {
            let B = A.get("grpc-retry-pushback-ms");
            if (B.length === 0) return null;
            try {
                return parseInt(B[0])
            } catch (Q) {
                return -1
            }
        }
        handleChildStatus(A, B) {
            var Q;
            if (this.underlyingCalls[B].state === "COMPLETED") return;
            if (this.trace("state=" + this.state + " handling status with progress " + A.progress + " from child [" + this.underlyingCalls[B].call.getCallNumber() + "] in state " + this.underlyingCalls[B].state), this.underlyingCalls[B].state = "COMPLETED", A.code === JS1.Status.OK) {
                (Q = this.retryThrottler) === null || Q === void 0 || Q.addCallSucceeded(), this.commitCall(B), this.reportStatus(A);
                return
            }
            if (this.state === "NO_RETRY") {
                this.commitCall(B), this.reportStatus(A);
                return
            }
            if (this.state === "COMMITTED") {
                this.reportStatus(A);
                return
            }
            let Z = this.getPushback(A.metadata);
            switch (A.progress) {
                case "NOT_STARTED":
                    this.startNewAttempt();
                    break;
                case "REFUSED":
                    if (this.transparentRetryUsed) this.handleProcessedStatus(A, B, Z);
                    else this.transparentRetryUsed = !0, this.startNewAttempt();
                    break;
                case "DROP":
                    this.commitCall(B), this.reportStatus(A);
                    break;
                case "PROCESSED":
                    this.handleProcessedStatus(A, B, Z);
                    break
            }
        }
        maybeStartHedgingAttempt() {
            if (this.state !== "HEDGING") return;
            if (!this.callConfig.methodConfig.hedgingPolicy) return;
            if (this.attempts >= this.maxAttempts) return;
            this.attempts += 1, this.startNewAttempt(), this.maybeStartHedgingTimer()
        }
        maybeStartHedgingTimer() {
            var A, B, Q;
            if (this.hedgingTimer) clearTimeout(this.hedgingTimer);
            if (this.state !== "HEDGING") return;
            if (!this.callConfig.methodConfig.hedgingPolicy) return;
            let Z = this.callConfig.methodConfig.hedgingPolicy;
            if (this.attempts >= this.maxAttempts) return;
            let D = (A = Z.hedgingDelay) !== null && A !== void 0 ? A : "0s",
                G = Number(D.substring(0, D.length - 1));
            this.hedgingTimer = setTimeout(() => {
                this.maybeStartHedgingAttempt()
            }, G * 1000), (Q = (B = this.hedgingTimer).unref) === null || Q === void 0 || Q.call(B)
        }
        startNewAttempt() {
            let A = this.channel.createLoadBalancingCall(this.callConfig, this.methodName, this.host, this.credentials, this.deadline);
            this.trace("Created child call [" + A.getCallNumber() + "] for attempt " + this.attempts);
            let B = this.underlyingCalls.length;
            this.underlyingCalls.push({
                state: "ACTIVE",
                call: A,
                nextMessageToSend: 0,
                startTime: new Date
            });
            let Q = this.attempts - 1,
                Z = this.initialMetadata.clone();
            if (Q > 0) Z.set(iX0, `${Q}`);
            let D = !1;
            if (A.start(Z, {
                    onReceiveMetadata: (G) => {
                        if (this.trace("Received metadata from child [" + A.getCallNumber() + "]"), this.commitCall(B), D = !0, Q > 0) G.set(iX0, `${Q}`);
                        if (this.underlyingCalls[B].state === "ACTIVE") this.listener.onReceiveMetadata(G)
                    },
                    onReceiveMessage: (G) => {
                        if (this.trace("Received message from child [" + A.getCallNumber() + "]"), this.commitCall(B), this.underlyingCalls[B].state === "ACTIVE") this.listener.onReceiveMessage(G)
                    },
                    onReceiveStatus: (G) => {
                        if (this.trace("Received status from child [" + A.getCallNumber() + "]"), !D && Q > 0) G.metadata.set(iX0, `${Q}`);
                        this.handleChildStatus(G, B)
                    }
                }), this.sendNextChildMessage(B), this.readStarted) A.startRead()
        }
        start(A, B) {
            this.trace("start called"), this.listener = B, this.initialMetadata = A, this.attempts += 1, this.startNewAttempt(), this.maybeStartHedgingTimer()
        }
        handleChildWriteCompleted(A) {
            var B, Q;
            let Z = this.underlyingCalls[A],
                D = Z.nextMessageToSend;
            (Q = (B = this.getBufferEntry(D)).callback) === null || Q === void 0 || Q.call(B), this.clearSentMessages(), Z.nextMessageToSend += 1, this.sendNextChildMessage(A)
        }
        sendNextChildMessage(A) {
            let B = this.underlyingCalls[A];
            if (B.state === "COMPLETED") return;
            if (this.getBufferEntry(B.nextMessageToSend)) {
                let Q = this.getBufferEntry(B.nextMessageToSend);
                switch (Q.entryType) {
                    case "MESSAGE":
                        B.call.sendMessageWithContext({
                            callback: (Z) => {
                                this.handleChildWriteCompleted(A)
                            }
                        }, Q.message.message);
                        break;
                    case "HALF_CLOSE":
                        B.nextMessageToSend += 1, B.call.halfClose();
                        break;
                    case "FREED":
                        break
                }
            }
        }
        sendMessageWithContext(A, B) {
            var Q;
            this.trace("write() called with message of length " + B.length);
            let Z = {
                    message: B,
                    flags: A.flags
                },
                D = this.getNextBufferIndex(),
                G = {
                    entryType: "MESSAGE",
                    message: Z,
                    allocated: this.bufferTracker.allocate(B.length, this.callNumber)
                };
            if (this.writeBuffer.push(G), G.allocated) {
                (Q = A.callback) === null || Q === void 0 || Q.call(A);
                for (let [F, I] of this.underlyingCalls.entries())
                    if (I.state === "ACTIVE" && I.nextMessageToSend === D) I.call.sendMessageWithContext({
                        callback: (Y) => {
                            this.handleChildWriteCompleted(F)
                        }
                    }, B)
            } else {
                if (this.commitCallWithMostMessages(), this.committedCallIndex === null) return;
                let F = this.underlyingCalls[this.committedCallIndex];
                if (G.callback = A.callback, F.state === "ACTIVE" && F.nextMessageToSend === D) F.call.sendMessageWithContext({
                    callback: (I) => {
                        this.handleChildWriteCompleted(this.committedCallIndex)
                    }
                }, B)
            }
        }
        startRead() {
            this.trace("startRead called"), this.readStarted = !0;
            for (let A of this.underlyingCalls)
                if ((A === null || A === void 0 ? void 0 : A.state) === "ACTIVE") A.call.startRead()
        }
        halfClose() {
            this.trace("halfClose called");
            let A = this.getNextBufferIndex();
            this.writeBuffer.push({
                entryType: "HALF_CLOSE",
                allocated: !1
            });
            for (let B of this.underlyingCalls)
                if ((B === null || B === void 0 ? void 0 : B.state) === "ACTIVE" && B.nextMessageToSend === A) B.nextMessageToSend += 1, B.call.halfClose()
        }
        setCredentials(A) {
            throw new Error("Method not implemented.")
        }
        getMethod() {
            return this.methodName
        }
        getHost() {
            return this.host
        }
    }
    D1B.RetryingCall = Z1B
});