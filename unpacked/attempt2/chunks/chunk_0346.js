/* chunk:346 bytes:[8168813, 8188698) size:19885 source:unpacked-cli.js */
var XS1 = E((Y1B) => {
    Object.defineProperty(Y1B, "__esModule", {
        value: !0
    });
    Y1B.BaseSubchannelWrapper = void 0;
    class I1B {
        constructor(A) {
            this.child = A, this.healthy = !0, this.healthListeners = new Set, A.addHealthStateWatcher((B) => {
                if (this.healthy) this.updateHealthListeners()
            })
        }
        updateHealthListeners() {
            for (let A of this.healthListeners) A(this.isHealthy())
        }
        getConnectivityState() {
            return this.child.getConnectivityState()
        }
        addConnectivityStateListener(A) {
            this.child.addConnectivityStateListener(A)
        }
        removeConnectivityStateListener(A) {
            this.child.removeConnectivityStateListener(A)
        }
        startConnecting() {
            this.child.startConnecting()
        }
        getAddress() {
            return this.child.getAddress()
        }
        throttleKeepalive(A) {
            this.child.throttleKeepalive(A)
        }
        ref() {
            this.child.ref()
        }
        unref() {
            this.child.unref()
        }
        getChannelzRef() {
            return this.child.getChannelzRef()
        }
        isHealthy() {
            return this.healthy && this.child.isHealthy()
        }
        addHealthStateWatcher(A) {
            this.healthListeners.add(A)
        }
        removeHealthStateWatcher(A) {
            this.healthListeners.delete(A)
        }
        setHealthy(A) {
            if (A !== this.healthy) {
                if (this.healthy = A, this.child.isHealthy()) this.updateHealthListeners()
            }
        }
        getRealSubchannel() {
            return this.child.getRealSubchannel()
        }
        realSubchannelEquals(A) {
            return this.getRealSubchannel() === A.getRealSubchannel()
        }
        getCallCredentials() {
            return this.child.getCallCredentials()
        }
    }
    Y1B.BaseSubchannelWrapper = I1B
});
var rX0 = E((H1B) => {
    Object.defineProperty(H1B, "__esModule", {
        value: !0
    });
    H1B.InternalChannel = H1B.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = void 0;
    var Bw6 = r31(),
        Qw6 = fs2(),
        Zw6 = Me2(),
        sX0 = Wx(),
        Dw6 = IJ(),
        Ux = b6(),
        Gw6 = mX0(),
        Fw6 = me2(),
        J1B = DM(),
        VS1 = I7(),
        Iw6 = _X0(),
        CS1 = mV(),
        kE = RE(),
        R71 = Hm(),
        Yw6 = se2(),
        Ww6 = L71(),
        Jw6 = A1B(),
        nX0 = bX0(),
        Xw6 = IS1(),
        aX0 = F1B(),
        Vw6 = XS1(),
        Cw6 = 2147483647,
        Kw6 = 1000,
        Hw6 = 1800000,
        KS1 = new Map,
        zw6 = 16777216,
        Ew6 = 1048576;
    class X1B extends Vw6.BaseSubchannelWrapper {
        constructor(A, B) {
            super(A);
            this.channel = B, this.refCount = 0, this.subchannelStateListener = (Q, Z, D, G) => {
                B.throttleKeepalive(G)
            }
        }
        ref() {
            if (this.refCount === 0) this.child.addConnectivityStateListener(this.subchannelStateListener), this.channel.addWrappedSubchannel(this);
            this.child.ref(), this.refCount += 1
        }
        unref() {
            if (this.child.unref(), this.refCount -= 1, this.refCount <= 0) this.child.removeConnectivityStateListener(this.subchannelStateListener), this.channel.removeWrappedSubchannel(this)
        }
    }
    class V1B {
        pick(A) {
            return {
                pickResultType: sX0.PickResultType.DROP,
                status: {
                    code: Ux.Status.UNAVAILABLE,
                    details: "Channel closed before call started",
                    metadata: new Dw6.Metadata
                },
                subchannel: null,
                onCallStarted: null,
                onCallEnded: null
            }
        }
    }
    H1B.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = "grpc.internal.no_subchannel";
    class C1B {
        constructor(A) {
            this.target = A, this.trace = new R71.ChannelzTrace, this.callTracker = new R71.ChannelzCallTracker, this.childrenTracker = new R71.ChannelzChildrenTracker, this.state = kE.ConnectivityState.IDLE
        }
        getChannelzInfoCallback() {
            return () => {
                return {
                    target: this.target,
                    state: this.state,
                    trace: this.trace,
                    callTracker: this.callTracker,
                    children: this.childrenTracker.getChildLists()
                }
            }
        }
    }
    class K1B {
        constructor(A, B, Q) {
            var Z, D, G, F, I, Y;
            if (this.credentials = B, this.options = Q, this.connectivityState = kE.ConnectivityState.IDLE, this.currentPicker = new sX0.UnavailablePicker, this.configSelectionQueue = [], this.pickQueue = [], this.connectivityStateWatchers = [], this.callRefTimer = null, this.configSelector = null, this.currentResolutionError = null, this.wrappedSubchannels = new Set, this.callCount = 0, this.idleTimer = null, this.channelzEnabled = !0, this.randomChannelId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), typeof A !== "string") throw new TypeError("Channel target must be a string");
            if (!(B instanceof Bw6.ChannelCredentials)) throw new TypeError("Channel credentials must be a ChannelCredentials object");
            if (Q) {
                if (typeof Q !== "object") throw new TypeError("Channel options must be an object")
            }
            this.channelzInfoTracker = new C1B(A);
            let W = CS1.parseUri(A);
            if (W === null) throw new Error(`Could not parse target name "${A}"`);
            let J = J1B.mapUriDefaultScheme(W);
            if (J === null) throw new Error(`Could not find a default scheme for target name "${A}"`);
            if (this.options["grpc.enable_channelz"] === 0) this.channelzEnabled = !1;
            if (this.channelzRef = R71.registerChannelzChannel(A, this.channelzInfoTracker.getChannelzInfoCallback(), this.channelzEnabled), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Channel created");
            if (this.options["grpc.default_authority"]) this.defaultAuthority = this.options["grpc.default_authority"];
            else this.defaultAuthority = J1B.getDefaultAuthority(J);
            let X = Iw6.mapProxyName(J, Q);
            this.target = X.target, this.options = Object.assign({}, this.options, X.extraOptions), this.subchannelPool = Zw6.getSubchannelPool(((Z = Q["grpc.use_local_subchannel_pool"]) !== null && Z !== void 0 ? Z : 0) === 0), this.retryBufferTracker = new aX0.MessageBufferTracker((D = Q["grpc.retry_buffer_size"]) !== null && D !== void 0 ? D : zw6, (G = Q["grpc.per_rpc_retry_buffer_size"]) !== null && G !== void 0 ? G : Ew6), this.keepaliveTime = (F = Q["grpc.keepalive_time_ms"]) !== null && F !== void 0 ? F : -1, this.idleTimeoutMs = Math.max((I = Q["grpc.client_idle_timeout_ms"]) !== null && I !== void 0 ? I : Hw6, Kw6);
            let V = {
                createSubchannel: (K, H) => {
                    let z = {};
                    for (let [N, R] of Object.entries(H))
                        if (!N.startsWith(H1B.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX)) z[N] = R;
                    let $ = this.subchannelPool.getOrCreateSubchannel(this.target, K, z, this.credentials);
                    if ($.throttleKeepalive(this.keepaliveTime), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Created subchannel or used existing subchannel", $.getChannelzRef());
                    return new X1B($, this)
                },
                updateState: (K, H) => {
                    this.currentPicker = H;
                    let z = this.pickQueue.slice();
                    if (this.pickQueue = [], z.length > 0) this.callRefTimerUnref();
                    for (let $ of z) $.doPick();
                    this.updateState(K)
                },
                requestReresolution: () => {
                    throw new Error("Resolving load balancer should never call requestReresolution")
                },
                addChannelzChild: (K) => {
                    if (this.channelzEnabled) this.channelzInfoTracker.childrenTracker.refChild(K)
                },
                removeChannelzChild: (K) => {
                    if (this.channelzEnabled) this.channelzInfoTracker.childrenTracker.unrefChild(K)
                }
            };
            this.resolvingLoadBalancer = new Qw6.ResolvingLoadBalancer(this.target, V, Q, (K, H) => {
                var z;
                if (K.retryThrottling) KS1.set(this.getTarget(), new aX0.RetryThrottler(K.retryThrottling.maxTokens, K.retryThrottling.tokenRatio, KS1.get(this.getTarget())));
                else KS1.delete(this.getTarget());
                if (this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Address resolution succeeded");
                (z = this.configSelector) === null || z === void 0 || z.unref(), this.configSelector = H, this.currentResolutionError = null, process.nextTick(() => {
                    let $ = this.configSelectionQueue;
                    if (this.configSelectionQueue = [], $.length > 0) this.callRefTimerUnref();
                    for (let L of $) L.getConfig()
                })
            }, (K) => {
                if (this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_WARNING", "Address resolution failed with code " + K.code + ' and details "' + K.details + '"');
                if (this.configSelectionQueue.length > 0) this.trace("Name resolution failed with calls queued for config selection");
                if (this.configSelector === null) this.currentResolutionError = Object.assign(Object.assign({}, Xw6.restrictControlPlaneStatusCode(K.code, K.details)), {
                    metadata: K.metadata
                });
                let H = this.configSelectionQueue;
                if (this.configSelectionQueue = [], H.length > 0) this.callRefTimerUnref();
                for (let z of H) z.reportResolverError(K)
            }), this.filterStackFactory = new Gw6.FilterStackFactory([new Fw6.CompressionFilterFactory(this, this.options)]), this.trace("Channel constructed with options " + JSON.stringify(Q, void 0, 2));
            let C = new Error;
            if (VS1.isTracerEnabled("channel_stacktrace")) VS1.trace(Ux.LogVerbosity.DEBUG, "channel_stacktrace", "(" + this.channelzRef.id + `) Channel constructed 
` + ((Y = C.stack) === null || Y === void 0 ? void 0 : Y.substring(C.stack.indexOf(`
`) + 1)));
            this.lastActivityTimestamp = new Date
        }
        trace(A, B) {
            VS1.trace(B !== null && B !== void 0 ? B : Ux.LogVerbosity.DEBUG, "channel", "(" + this.channelzRef.id + ") " + CS1.uriToString(this.target) + " " + A)
        }
        callRefTimerRef() {
            var A, B, Q, Z;
            if (!this.callRefTimer) this.callRefTimer = setInterval(() => {}, Cw6);
            if (!((B = (A = this.callRefTimer).hasRef) === null || B === void 0 ? void 0 : B.call(A))) this.trace("callRefTimer.ref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length), (Z = (Q = this.callRefTimer).ref) === null || Z === void 0 || Z.call(Q)
        }
        callRefTimerUnref() {
            var A, B, Q;
            if (!((A = this.callRefTimer) === null || A === void 0 ? void 0 : A.hasRef) || this.callRefTimer.hasRef()) this.trace("callRefTimer.unref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length), (Q = (B = this.callRefTimer) === null || B === void 0 ? void 0 : B.unref) === null || Q === void 0 || Q.call(B)
        }
        removeConnectivityStateWatcher(A) {
            let B = this.connectivityStateWatchers.findIndex((Q) => Q === A);
            if (B >= 0) this.connectivityStateWatchers.splice(B, 1)
        }
        updateState(A) {
            if (VS1.trace(Ux.LogVerbosity.DEBUG, "connectivity_state", "(" + this.channelzRef.id + ") " + CS1.uriToString(this.target) + " " + kE.ConnectivityState[this.connectivityState] + " -> " + kE.ConnectivityState[A]), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Connectivity state change to " + kE.ConnectivityState[A]);
            this.connectivityState = A, this.channelzInfoTracker.state = A;
            let B = this.connectivityStateWatchers.slice();
            for (let Q of B)
                if (A !== Q.currentState) {
                    if (Q.timer) clearTimeout(Q.timer);
                    this.removeConnectivityStateWatcher(Q), Q.callback()
                } if (A !== kE.ConnectivityState.TRANSIENT_FAILURE) this.currentResolutionError = null
        }
        throttleKeepalive(A) {
            if (A > this.keepaliveTime) {
                this.keepaliveTime = A;
                for (let B of this.wrappedSubchannels) B.throttleKeepalive(A)
            }
        }
        addWrappedSubchannel(A) {
            this.wrappedSubchannels.add(A)
        }
        removeWrappedSubchannel(A) {
            this.wrappedSubchannels.delete(A)
        }
        doPick(A, B) {
            return this.currentPicker.pick({
                metadata: A,
                extraPickInfo: B
            })
        }
        queueCallForPick(A) {
            this.pickQueue.push(A), this.callRefTimerRef()
        }
        getConfig(A, B) {
            if (this.connectivityState !== kE.ConnectivityState.SHUTDOWN) this.resolvingLoadBalancer.exitIdle();
            if (this.configSelector) return {
                type: "SUCCESS",
                config: this.configSelector.invoke(A, B, this.randomChannelId)
            };
            else if (this.currentResolutionError) return {
                type: "ERROR",
                error: this.currentResolutionError
            };
            else return {
                type: "NONE"
            }
        }
        queueCallForConfig(A) {
            this.configSelectionQueue.push(A), this.callRefTimerRef()
        }
        enterIdle() {
            if (this.resolvingLoadBalancer.destroy(), this.updateState(kE.ConnectivityState.IDLE), this.currentPicker = new sX0.QueuePicker(this.resolvingLoadBalancer), this.idleTimer) clearTimeout(this.idleTimer), this.idleTimer = null;
            if (this.callRefTimer) clearInterval(this.callRefTimer), this.callRefTimer = null
        }
        startIdleTimeout(A) {
            var B, Q;
            this.idleTimer = setTimeout(() => {
                if (this.callCount > 0) {
                    this.startIdleTimeout(this.idleTimeoutMs);
                    return
                }
                let D = new Date().valueOf() - this.lastActivityTimestamp.valueOf();
                if (D >= this.idleTimeoutMs) this.trace("Idle timer triggered after " + this.idleTimeoutMs + "ms of inactivity"), this.enterIdle();
                else this.startIdleTimeout(this.idleTimeoutMs - D)
            }, A), (Q = (B = this.idleTimer).unref) === null || Q === void 0 || Q.call(B)
        }
        maybeStartIdleTimer() {
            if (this.connectivityState !== kE.ConnectivityState.SHUTDOWN && !this.idleTimer) this.startIdleTimeout(this.idleTimeoutMs)
        }
        onCallStart() {
            if (this.channelzEnabled) this.channelzInfoTracker.callTracker.addCallStarted();
            this.callCount += 1
        }
        onCallEnd(A) {
            if (this.channelzEnabled)
                if (A.code === Ux.Status.OK) this.channelzInfoTracker.callTracker.addCallSucceeded();
                else this.channelzInfoTracker.callTracker.addCallFailed();
            this.callCount -= 1, this.lastActivityTimestamp = new Date, this.maybeStartIdleTimer()
        }
        createLoadBalancingCall(A, B, Q, Z, D) {
            let G = nX0.getNextCallNumber();
            return this.trace("createLoadBalancingCall [" + G + '] method="' + B + '"'), new Yw6.LoadBalancingCall(this, A, B, Q, Z, D, G)
        }
        createRetryingCall(A, B, Q, Z, D) {
            let G = nX0.getNextCallNumber();
            return this.trace("createRetryingCall [" + G + '] method="' + B + '"'), new aX0.RetryingCall(this, A, B, Q, Z, D, G, this.retryBufferTracker, KS1.get(this.getTarget()))
        }
        createResolvingCall(A, B, Q, Z, D) {
            let G = nX0.getNextCallNumber();
            this.trace("createResolvingCall [" + G + '] method="' + A + '", deadline=' + Ww6.deadlineToString(B));
            let F = {
                    deadline: B,
                    flags: D !== null && D !== void 0 ? D : Ux.Propagate.DEFAULTS,
                    host: Q !== null && Q !== void 0 ? Q : this.defaultAuthority,
                    parentCall: Z
                },
                I = new Jw6.ResolvingCall(this, A, F, this.filterStackFactory.clone(), G);
            return this.onCallStart(), I.addStatusWatcher((Y) => {
                this.onCallEnd(Y)
            }), I
        }
        close() {
            var A;
            this.resolvingLoadBalancer.destroy(), this.updateState(kE.ConnectivityState.SHUTDOWN), this.currentPicker = new V1B;
            for (let B of this.configSelectionQueue) B.cancelWithStatus(Ux.Status.UNAVAILABLE, "Channel closed before call started");
            this.configSelectionQueue = [];
            for (let B of this.pickQueue) B.cancelWithStatus(Ux.Status.UNAVAILABLE, "Channel closed before call started");
            if (this.pickQueue = [], this.callRefTimer) clearInterval(this.callRefTimer);
            if (this.idleTimer) clearTimeout(this.idleTimer);
            if (this.channelzEnabled) R71.unregisterChannelzRef(this.channelzRef);
            this.subchannelPool.unrefUnusedSubchannels(), (A = this.configSelector) === null || A === void 0 || A.unref(), this.configSelector = null
        }
        getTarget() {
            return CS1.uriToString(this.target)
        }
        getConnectivityState(A) {
            let B = this.connectivityState;
            if (A) this.resolvingLoadBalancer.exitIdle(), this.lastActivityTimestamp = new Date, this.maybeStartIdleTimer();
            return B
        }
        watchConnectivityState(A, B, Q) {
            if (this.connectivityState === kE.ConnectivityState.SHUTDOWN) throw new Error("Channel has been shut down");
            let Z = null;
            if (B !== 1 / 0) {
                let G = B instanceof Date ? B : new Date(B),
                    F = new Date;
                if (B === -1 / 0 || G <= F) {
                    process.nextTick(Q, new Error("Deadline passed without connectivity state change"));
                    return
                }
                Z = setTimeout(() => {
                    this.removeConnectivityStateWatcher(D), Q(new Error("Deadline passed without connectivity state change"))
                }, G.getTime() - F.getTime())
            }
            let D = {
                currentState: A,
                callback: Q,
                timer: Z
            };
            this.connectivityStateWatchers.push(D)
        }
        getChannelzRef() {
            return this.channelzRef
        }
        createCall(A, B, Q, Z, D) {
            if (typeof A !== "string") throw new TypeError("Channel#createCall: method must be a string");
            if (!(typeof B === "number" || B instanceof Date)) throw new TypeError("Channel#createCall: deadline must be a number or Date");
            if (this.connectivityState === kE.ConnectivityState.SHUTDOWN) throw new Error("Channel has been shut down");
            return this.createResolvingCall(A, B, Q, Z, D)
        }
        getOptions() {
            return this.options
        }
    }
    H1B.InternalChannel = K1B
});