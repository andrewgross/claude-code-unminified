/* chunk:339 bytes:[8059709, 8078161) size:18452 source:unpacked-cli.js */
var st2 = E((nt2) => {
    Object.defineProperty(nt2, "__esModule", {
        value: !0
    });
    nt2.Subchannel = void 0;
    var J3 = RE(),
        KE6 = t31(),
        TX0 = I7(),
        AS1 = b6(),
        HE6 = mV(),
        zE6 = OE(),
        CM = Hm(),
        EE6 = "subchannel",
        UE6 = 2147483647;
    class it2 {
        constructor(A, B, Q, Z, D) {
            var G;
            this.channelTarget = A, this.subchannelAddress = B, this.options = Q, this.connector = D, this.connectivityState = J3.ConnectivityState.IDLE, this.transport = null, this.continueConnecting = !1, this.stateListeners = new Set, this.refcount = 0, this.channelzEnabled = !0;
            let F = {
                initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
                maxDelay: Q["grpc.max_reconnect_backoff_ms"]
            };
            if (this.backoffTimeout = new KE6.BackoffTimeout(() => {
                    this.handleBackoffTimer()
                }, F), this.backoffTimeout.unref(), this.subchannelAddressString = zE6.subchannelAddressToString(B), this.keepaliveTime = (G = Q["grpc.keepalive_time_ms"]) !== null && G !== void 0 ? G : -1, Q["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.channelzTrace = new CM.ChannelzTraceStub, this.callTracker = new CM.ChannelzCallTrackerStub, this.childrenTracker = new CM.ChannelzChildrenTrackerStub, this.streamTracker = new CM.ChannelzCallTrackerStub;
            else this.channelzTrace = new CM.ChannelzTrace, this.callTracker = new CM.ChannelzCallTracker, this.childrenTracker = new CM.ChannelzChildrenTracker, this.streamTracker = new CM.ChannelzCallTracker;
            this.channelzRef = CM.registerChannelzSubchannel(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled), this.channelzTrace.addTrace("CT_INFO", "Subchannel created"), this.trace("Subchannel constructed with options " + JSON.stringify(Q, void 0, 2)), this.secureConnector = Z._createSecureConnector(A, Q)
        }
        getChannelzInfo() {
            return {
                state: this.connectivityState,
                trace: this.channelzTrace,
                callTracker: this.callTracker,
                children: this.childrenTracker.getChildLists(),
                target: this.subchannelAddressString
            }
        }
        trace(A) {
            TX0.trace(AS1.LogVerbosity.DEBUG, EE6, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        refTrace(A) {
            TX0.trace(AS1.LogVerbosity.DEBUG, "subchannel_refcount", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
        }
        handleBackoffTimer() {
            if (this.continueConnecting) this.transitionToState([J3.ConnectivityState.TRANSIENT_FAILURE], J3.ConnectivityState.CONNECTING);
            else this.transitionToState([J3.ConnectivityState.TRANSIENT_FAILURE], J3.ConnectivityState.IDLE)
        }
        startBackoff() {
            this.backoffTimeout.runOnce()
        }
        stopBackoff() {
            this.backoffTimeout.stop(), this.backoffTimeout.reset()
        }
        startConnectingInternal() {
            let A = this.options;
            if (A["grpc.keepalive_time_ms"]) {
                let B = Math.min(this.keepaliveTime, UE6);
                A = Object.assign(Object.assign({}, A), {
                    "grpc.keepalive_time_ms": B
                })
            }
            this.connector.connect(this.subchannelAddress, this.secureConnector, A).then((B) => {
                if (this.transitionToState([J3.ConnectivityState.CONNECTING], J3.ConnectivityState.READY)) {
                    if (this.transport = B, this.channelzEnabled) this.childrenTracker.refChild(B.getChannelzRef());
                    B.addDisconnectListener((Q) => {
                        if (this.transitionToState([J3.ConnectivityState.READY], J3.ConnectivityState.IDLE), Q && this.keepaliveTime > 0) this.keepaliveTime *= 2, TX0.log(AS1.LogVerbosity.ERROR, `Connection to ${HE6.uriToString(this.channelTarget)} at ${this.subchannelAddressString} rejected by server because of excess pings. Increasing ping interval to ${this.keepaliveTime} ms`)
                    })
                } else B.shutdown()
            }, (B) => {
                this.transitionToState([J3.ConnectivityState.CONNECTING], J3.ConnectivityState.TRANSIENT_FAILURE, `${B}`)
            })
        }
        transitionToState(A, B, Q) {
            var Z, D;
            if (A.indexOf(this.connectivityState) === -1) return !1;
            if (Q) this.trace(J3.ConnectivityState[this.connectivityState] + " -> " + J3.ConnectivityState[B] + ' with error "' + Q + '"');
            else this.trace(J3.ConnectivityState[this.connectivityState] + " -> " + J3.ConnectivityState[B]);
            if (this.channelzEnabled) this.channelzTrace.addTrace("CT_INFO", "Connectivity state change to " + J3.ConnectivityState[B]);
            let G = this.connectivityState;
            switch (this.connectivityState = B, B) {
                case J3.ConnectivityState.READY:
                    this.stopBackoff();
                    break;
                case J3.ConnectivityState.CONNECTING:
                    this.startBackoff(), this.startConnectingInternal(), this.continueConnecting = !1;
                    break;
                case J3.ConnectivityState.TRANSIENT_FAILURE:
                    if (this.channelzEnabled && this.transport) this.childrenTracker.unrefChild(this.transport.getChannelzRef());
                    if ((Z = this.transport) === null || Z === void 0 || Z.shutdown(), this.transport = null, !this.backoffTimeout.isRunning()) process.nextTick(() => {
                        this.handleBackoffTimer()
                    });
                    break;
                case J3.ConnectivityState.IDLE:
                    if (this.channelzEnabled && this.transport) this.childrenTracker.unrefChild(this.transport.getChannelzRef());
                    (D = this.transport) === null || D === void 0 || D.shutdown(), this.transport = null;
                    break;
                default:
                    throw new Error(`Invalid state: unknown ConnectivityState ${B}`)
            }
            for (let F of this.stateListeners) F(this, G, B, this.keepaliveTime, Q);
            return !0
        }
        ref() {
            this.refTrace("refcount " + this.refcount + " -> " + (this.refcount + 1)), this.refcount += 1
        }
        unref() {
            if (this.refTrace("refcount " + this.refcount + " -> " + (this.refcount - 1)), this.refcount -= 1, this.refcount === 0) this.channelzTrace.addTrace("CT_INFO", "Shutting down"), CM.unregisterChannelzRef(this.channelzRef), this.secureConnector.destroy(), process.nextTick(() => {
                this.transitionToState([J3.ConnectivityState.CONNECTING, J3.ConnectivityState.READY], J3.ConnectivityState.IDLE)
            })
        }
        unrefIfOneRef() {
            if (this.refcount === 1) return this.unref(), !0;
            return !1
        }
        createCall(A, B, Q, Z) {
            if (!this.transport) throw new Error("Cannot create call, subchannel not READY");
            let D;
            if (this.channelzEnabled) this.callTracker.addCallStarted(), this.streamTracker.addCallStarted(), D = {
                onCallEnd: (G) => {
                    if (G.code === AS1.Status.OK) this.callTracker.addCallSucceeded();
                    else this.callTracker.addCallFailed()
                }
            };
            else D = {};
            return this.transport.createCall(A, B, Q, Z, D)
        }
        startConnecting() {
            process.nextTick(() => {
                if (!this.transitionToState([J3.ConnectivityState.IDLE], J3.ConnectivityState.CONNECTING)) {
                    if (this.connectivityState === J3.ConnectivityState.TRANSIENT_FAILURE) this.continueConnecting = !0
                }
            })
        }
        getConnectivityState() {
            return this.connectivityState
        }
        addConnectivityStateListener(A) {
            this.stateListeners.add(A)
        }
        removeConnectivityStateListener(A) {
            this.stateListeners.delete(A)
        }
        resetBackoff() {
            process.nextTick(() => {
                this.backoffTimeout.reset(), this.transitionToState([J3.ConnectivityState.TRANSIENT_FAILURE], J3.ConnectivityState.CONNECTING)
            })
        }
        getAddress() {
            return this.subchannelAddressString
        }
        getChannelzRef() {
            return this.channelzRef
        }
        isHealthy() {
            return !0
        }
        addHealthStateWatcher(A) {}
        removeHealthStateWatcher(A) {}
        getRealSubchannel() {
            return this
        }
        realSubchannelEquals(A) {
            return A.getRealSubchannel() === this
        }
        throttleKeepalive(A) {
            if (A > this.keepaliveTime) this.keepaliveTime = A
        }
        getCallCredentials() {
            return this.secureConnector.getCallCredentials()
        }
    }
    nt2.Subchannel = it2
});
var tt2 = E((rt2) => {
    var PX0;
    Object.defineProperty(rt2, "__esModule", {
        value: !0
    });
    rt2.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = void 0;
    rt2.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = ((PX0 = process.env.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) !== null && PX0 !== void 0 ? PX0 : "false") === "true"
});
var yX0 = E((Ze2) => {
    Object.defineProperty(Ze2, "__esModule", {
        value: !0
    });
    Ze2.DEFAULT_PORT = void 0;
    Ze2.setup = RE6;
    var et2 = DM(),
        SX0 = W1("dns"),
        wE6 = LJ0(),
        jX0 = b6(),
        kX0 = IJ(),
        $E6 = I7(),
        qE6 = b6(),
        Ex = mV(),
        Ae2 = W1("net"),
        NE6 = t31(),
        Be2 = tt2(),
        LE6 = "dns_resolver";

    function KM(A) {
        $E6.trace(qE6.LogVerbosity.DEBUG, LE6, A)
    }
    Ze2.DEFAULT_PORT = 443;
    var ME6 = 30000;
    class Qe2 {
        constructor(A, B, Q) {
            var Z, D, G;
            if (this.target = A, this.listener = B, this.pendingLookupPromise = null, this.pendingTxtPromise = null, this.latestLookupResult = null, this.latestServiceConfig = null, this.latestServiceConfigError = null, this.continueResolving = !1, this.isNextResolutionTimerRunning = !1, this.isServiceConfigEnabled = !0, this.returnedIpResult = !1, this.alternativeResolver = new SX0.promises.Resolver, KM("Resolver constructed for target " + Ex.uriToString(A)), A.authority) this.alternativeResolver.setServers([A.authority]);
            let F = Ex.splitHostPort(A.path);
            if (F === null) this.ipResult = null, this.dnsHostname = null, this.port = null;
            else if (Ae2.isIPv4(F.host) || Ae2.isIPv6(F.host)) this.ipResult = [{
                addresses: [{
                    host: F.host,
                    port: (Z = F.port) !== null && Z !== void 0 ? Z : Ze2.DEFAULT_PORT
                }]
            }], this.dnsHostname = null, this.port = null;
            else this.ipResult = null, this.dnsHostname = F.host, this.port = (D = F.port) !== null && D !== void 0 ? D : Ze2.DEFAULT_PORT;
            if (this.percentage = Math.random() * 100, Q["grpc.service_config_disable_resolution"] === 1) this.isServiceConfigEnabled = !1;
            this.defaultResolutionError = {
                code: jX0.Status.UNAVAILABLE,
                details: `Name resolution failed for target ${Ex.uriToString(this.target)}`,
                metadata: new kX0.Metadata
            };
            let I = {
                initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
                maxDelay: Q["grpc.max_reconnect_backoff_ms"]
            };
            this.backoff = new NE6.BackoffTimeout(() => {
                if (this.continueResolving) this.startResolutionWithBackoff()
            }, I), this.backoff.unref(), this.minTimeBetweenResolutionsMs = (G = Q["grpc.dns_min_time_between_resolutions_ms"]) !== null && G !== void 0 ? G : ME6, this.nextResolutionTimer = setTimeout(() => {}, 0), clearTimeout(this.nextResolutionTimer)
        }
        startResolution() {
            if (this.ipResult !== null) {
                if (!this.returnedIpResult) KM("Returning IP address for target " + Ex.uriToString(this.target)), setImmediate(() => {
                    this.listener.onSuccessfulResolution(this.ipResult, null, null, null, {})
                }), this.returnedIpResult = !0;
                this.backoff.stop(), this.backoff.reset(), this.stopNextResolutionTimer();
                return
            }
            if (this.dnsHostname === null) KM("Failed to parse DNS address " + Ex.uriToString(this.target)), setImmediate(() => {
                this.listener.onError({
                    code: jX0.Status.UNAVAILABLE,
                    details: `Failed to parse DNS address ${Ex.uriToString(this.target)}`,
                    metadata: new kX0.Metadata
                })
            }), this.stopNextResolutionTimer();
            else {
                if (this.pendingLookupPromise !== null) return;
                KM("Looking up DNS hostname " + this.dnsHostname), this.latestLookupResult = null;
                let A = this.dnsHostname;
                if (this.pendingLookupPromise = this.lookup(A), this.pendingLookupPromise.then((B) => {
                        if (this.pendingLookupPromise === null) return;
                        this.pendingLookupPromise = null, this.backoff.reset(), this.backoff.stop(), this.latestLookupResult = B.map((Z) => ({
                            addresses: [Z]
                        }));
                        let Q = "[" + B.map((Z) => Z.host + ":" + Z.port).join(",") + "]";
                        if (KM("Resolved addresses for target " + Ex.uriToString(this.target) + ": " + Q), this.latestLookupResult.length === 0) {
                            this.listener.onError(this.defaultResolutionError);
                            return
                        }
                        this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {})
                    }, (B) => {
                        if (this.pendingLookupPromise === null) return;
                        KM("Resolution error for target " + Ex.uriToString(this.target) + ": " + B.message), this.pendingLookupPromise = null, this.stopNextResolutionTimer(), this.listener.onError(this.defaultResolutionError)
                    }), this.isServiceConfigEnabled && this.pendingTxtPromise === null) this.pendingTxtPromise = this.resolveTxt(A), this.pendingTxtPromise.then((B) => {
                    if (this.pendingTxtPromise === null) return;
                    this.pendingTxtPromise = null;
                    try {
                        this.latestServiceConfig = wE6.extractAndSelectServiceConfig(B, this.percentage)
                    } catch (Q) {
                        this.latestServiceConfigError = {
                            code: jX0.Status.UNAVAILABLE,
                            details: `Parsing service config failed with error ${Q.message}`,
                            metadata: new kX0.Metadata
                        }
                    }
                    if (this.latestLookupResult !== null) this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {})
                }, (B) => {})
            }
        }
        async lookup(A) {
            if (Be2.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) {
                KM("Using alternative DNS resolver.");
                let Q = await Promise.allSettled([this.alternativeResolver.resolve4(A), this.alternativeResolver.resolve6(A)]);
                if (Q.every((Z) => Z.status === "rejected")) throw new Error(Q[0].reason);
                return Q.reduce((Z, D) => {
                    return D.status === "fulfilled" ? [...Z, ...D.value] : Z
                }, []).map((Z) => ({
                    host: Z,
                    port: +this.port
                }))
            }
            return (await SX0.promises.lookup(A, {
                all: !0
            })).map((Q) => ({
                host: Q.address,
                port: +this.port
            }))
        }
        async resolveTxt(A) {
            if (Be2.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) return KM("Using alternative DNS resolver."), this.alternativeResolver.resolveTxt(A);
            return SX0.promises.resolveTxt(A)
        }
        startNextResolutionTimer() {
            var A, B;
            clearTimeout(this.nextResolutionTimer), this.nextResolutionTimer = setTimeout(() => {
                if (this.stopNextResolutionTimer(), this.continueResolving) this.startResolutionWithBackoff()
            }, this.minTimeBetweenResolutionsMs), (B = (A = this.nextResolutionTimer).unref) === null || B === void 0 || B.call(A), this.isNextResolutionTimerRunning = !0
        }
        stopNextResolutionTimer() {
            clearTimeout(this.nextResolutionTimer), this.isNextResolutionTimerRunning = !1
        }
        startResolutionWithBackoff() {
            if (this.pendingLookupPromise === null) this.continueResolving = !1, this.backoff.runOnce(), this.startNextResolutionTimer(), this.startResolution()
        }
        updateResolution() {
            if (this.pendingLookupPromise === null)
                if (this.isNextResolutionTimerRunning || this.backoff.isRunning()) {
                    if (this.isNextResolutionTimerRunning) KM('resolution update delayed by "min time between resolutions" rate limit');
                    else KM("resolution update delayed by backoff timer until " + this.backoff.getEndTime().toISOString());
                    this.continueResolving = !0
                } else this.startResolutionWithBackoff()
        }
        destroy() {
            this.continueResolving = !1, this.backoff.reset(), this.backoff.stop(), this.stopNextResolutionTimer(), this.pendingLookupPromise = null, this.pendingTxtPromise = null, this.latestLookupResult = null, this.latestServiceConfig = null, this.latestServiceConfigError = null, this.returnedIpResult = !1
        }
        static getDefaultAuthority(A) {
            return A.path
        }
    }

    function RE6() {
        et2.registerResolver("dns", Qe2), et2.registerDefaultScheme("dns")
    }
});