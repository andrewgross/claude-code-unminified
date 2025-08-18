/* chunk:350 bytes:[8276968, 8295236) size:18268 source:unpacked-cli.js */
var B0B = E((e1B) => {
    Object.defineProperty(e1B, "__esModule", {
        value: !0
    });
    e1B.StatusBuilder = void 0;
    class t1B {
        constructor() {
            this.code = null, this.details = null, this.metadata = null
        }
        withCode(A) {
            return this.code = A, this
        }
        withDetails(A) {
            return this.details = A, this
        }
        withMetadata(A) {
            return this.metadata = A, this
        }
        build() {
            let A = {};
            if (this.code !== null) A.code = this.code;
            if (this.details !== null) A.details = this.details;
            if (this.metadata !== null) A.metadata = this.metadata;
            return A
        }
    }
    e1B.StatusBuilder = t1B
});
var CV0 = E((Q0B) => {
    Object.defineProperty(Q0B, "__esModule", {
        value: !0
    });
    Q0B.msToDuration = A$6;
    Q0B.durationToMs = B$6;
    Q0B.isDuration = Q$6;
    Q0B.parseDuration = D$6;

    function A$6(A) {
        return {
            seconds: A / 1000 | 0,
            nanos: A % 1000 * 1e6 | 0
        }
    }

    function B$6(A) {
        return A.seconds * 1000 + A.nanos / 1e6 | 0
    }

    function Q$6(A) {
        return typeof A.seconds === "number" && typeof A.nanos === "number"
    }
    var Z$6 = /^(\d+)(?:\.(\d+))?s$/;

    function D$6(A) {
        let B = A.match(Z$6);
        if (!B) return null;
        return {
            seconds: Number.parseInt(B[1], 10),
            nanos: B[2] ? Number.parseInt(B[2].padEnd(9, "0"), 10) : 0
        }
    }
});
var wS1 = E((J0B) => {
    Object.defineProperty(J0B, "__esModule", {
        value: !0
    });
    J0B.LeafLoadBalancer = J0B.PickFirstLoadBalancer = J0B.PickFirstLoadBalancingConfig = void 0;
    J0B.shuffled = I0B;
    J0B.setup = H$6;
    var KV0 = Wm(),
        ZF = RE(),
        wm = Wx(),
        Z0B = OE(),
        W$6 = I7(),
        J$6 = b6(),
        D0B = OE(),
        G0B = W1("net"),
        X$6 = "pick_first";

    function O71(A) {
        W$6.trace(J$6.LogVerbosity.DEBUG, X$6, A)
    }
    var T71 = "pick_first",
        V$6 = 250;
    class rt {
        constructor(A) {
            this.shuffleAddressList = A
        }
        getLoadBalancerName() {
            return T71
        }
        toJsonObject() {
            return {
                [T71]: {
                    shuffleAddressList: this.shuffleAddressList
                }
            }
        }
        getShuffleAddressList() {
            return this.shuffleAddressList
        }
        static createFromJson(A) {
            if ("shuffleAddressList" in A && typeof A.shuffleAddressList !== "boolean") throw new Error("pick_first config field shuffleAddressList must be a boolean if provided");
            return new rt(A.shuffleAddressList === !0)
        }
    }
    J0B.PickFirstLoadBalancingConfig = rt;
    class F0B {
        constructor(A) {
            this.subchannel = A
        }
        pick(A) {
            return {
                pickResultType: wm.PickResultType.COMPLETE,
                subchannel: this.subchannel,
                status: null,
                onCallStarted: null,
                onCallEnded: null
            }
        }
    }

    function I0B(A) {
        let B = A.slice();
        for (let Q = B.length - 1; Q > 1; Q--) {
            let Z = Math.floor(Math.random() * (Q + 1)),
                D = B[Q];
            B[Q] = B[Z], B[Z] = D
        }
        return B
    }

    function C$6(A) {
        if (A.length === 0) return [];
        let B = [],
            Q = [],
            Z = [],
            D = D0B.isTcpSubchannelAddress(A[0]) && G0B.isIPv6(A[0].host);
        for (let I of A)
            if (D0B.isTcpSubchannelAddress(I) && G0B.isIPv6(I.host)) Q.push(I);
            else Z.push(I);
        let G = D ? Q : Z,
            F = D ? Z : Q;
        for (let I = 0; I < Math.max(G.length, F.length); I++) {
            if (I < G.length) B.push(G[I]);
            if (I < F.length) B.push(F[I])
        }
        return B
    }
    var Y0B = "grpc-node.internal.pick-first.report_health_status";
    class US1 {
        constructor(A) {
            this.channelControlHelper = A, this.children = [], this.currentState = ZF.ConnectivityState.IDLE, this.currentSubchannelIndex = 0, this.currentPick = null, this.subchannelStateListener = (B, Q, Z, D, G) => {
                this.onSubchannelStateUpdate(B, Q, Z, G)
            }, this.pickedSubchannelHealthListener = () => this.calculateAndReportNewState(), this.stickyTransientFailureMode = !1, this.reportHealthStatus = !1, this.lastError = null, this.latestAddressList = null, this.latestOptions = {}, this.connectionDelayTimeout = setTimeout(() => {}, 0), clearTimeout(this.connectionDelayTimeout)
        }
        allChildrenHaveReportedTF() {
            return this.children.every((A) => A.hasReportedTransientFailure)
        }
        resetChildrenReportedTF() {
            this.children.every((A) => A.hasReportedTransientFailure = !1)
        }
        calculateAndReportNewState() {
            var A;
            if (this.currentPick)
                if (this.reportHealthStatus && !this.currentPick.isHealthy()) {
                    let B = `Picked subchannel ${this.currentPick.getAddress()} is unhealthy`;
                    this.updateState(ZF.ConnectivityState.TRANSIENT_FAILURE, new wm.UnavailablePicker({
                        details: B
                    }), B)
                } else this.updateState(ZF.ConnectivityState.READY, new F0B(this.currentPick), null);
            else if (((A = this.latestAddressList) === null || A === void 0 ? void 0 : A.length) === 0) {
                let B = `No connection established. Last error: ${this.lastError}`;
                this.updateState(ZF.ConnectivityState.TRANSIENT_FAILURE, new wm.UnavailablePicker({
                    details: B
                }), B)
            } else if (this.children.length === 0) this.updateState(ZF.ConnectivityState.IDLE, new wm.QueuePicker(this), null);
            else if (this.stickyTransientFailureMode) {
                let B = `No connection established. Last error: ${this.lastError}`;
                this.updateState(ZF.ConnectivityState.TRANSIENT_FAILURE, new wm.UnavailablePicker({
                    details: B
                }), B)
            } else this.updateState(ZF.ConnectivityState.CONNECTING, new wm.QueuePicker(this), null)
        }
        requestReresolution() {
            this.channelControlHelper.requestReresolution()
        }
        maybeEnterStickyTransientFailureMode() {
            if (!this.allChildrenHaveReportedTF()) return;
            if (this.requestReresolution(), this.resetChildrenReportedTF(), this.stickyTransientFailureMode) {
                this.calculateAndReportNewState();
                return
            }
            this.stickyTransientFailureMode = !0;
            for (let {
                    subchannel: A
                }
                of this.children) A.startConnecting();
            this.calculateAndReportNewState()
        }
        removeCurrentPick() {
            if (this.currentPick !== null) this.currentPick.removeConnectivityStateListener(this.subchannelStateListener), this.channelControlHelper.removeChannelzChild(this.currentPick.getChannelzRef()), this.currentPick.removeHealthStateWatcher(this.pickedSubchannelHealthListener), this.currentPick.unref(), this.currentPick = null
        }
        onSubchannelStateUpdate(A, B, Q, Z) {
            var D;
            if ((D = this.currentPick) === null || D === void 0 ? void 0 : D.realSubchannelEquals(A)) {
                if (Q !== ZF.ConnectivityState.READY) this.removeCurrentPick(), this.calculateAndReportNewState();
                return
            }
            for (let [G, F] of this.children.entries())
                if (A.realSubchannelEquals(F.subchannel)) {
                    if (Q === ZF.ConnectivityState.READY) this.pickSubchannel(F.subchannel);
                    if (Q === ZF.ConnectivityState.TRANSIENT_FAILURE) {
                        if (F.hasReportedTransientFailure = !0, Z) this.lastError = Z;
                        if (this.maybeEnterStickyTransientFailureMode(), G === this.currentSubchannelIndex) this.startNextSubchannelConnecting(G + 1)
                    }
                    F.subchannel.startConnecting();
                    return
                }
        }
        startNextSubchannelConnecting(A) {
            clearTimeout(this.connectionDelayTimeout);
            for (let [B, Q] of this.children.entries())
                if (B >= A) {
                    let Z = Q.subchannel.getConnectivityState();
                    if (Z === ZF.ConnectivityState.IDLE || Z === ZF.ConnectivityState.CONNECTING) {
                        this.startConnecting(B);
                        return
                    }
                } this.maybeEnterStickyTransientFailureMode()
        }
        startConnecting(A) {
            var B, Q;
            if (clearTimeout(this.connectionDelayTimeout), this.currentSubchannelIndex = A, this.children[A].subchannel.getConnectivityState() === ZF.ConnectivityState.IDLE) O71("Start connecting to subchannel with address " + this.children[A].subchannel.getAddress()), process.nextTick(() => {
                var Z;
                (Z = this.children[A]) === null || Z === void 0 || Z.subchannel.startConnecting()
            });
            this.connectionDelayTimeout = setTimeout(() => {
                this.startNextSubchannelConnecting(A + 1)
            }, V$6), (Q = (B = this.connectionDelayTimeout).unref) === null || Q === void 0 || Q.call(B)
        }
        pickSubchannel(A) {
            O71("Pick subchannel with address " + A.getAddress()), this.stickyTransientFailureMode = !1, A.ref(), this.channelControlHelper.addChannelzChild(A.getChannelzRef()), this.removeCurrentPick(), this.resetSubchannelList(), A.addConnectivityStateListener(this.subchannelStateListener), A.addHealthStateWatcher(this.pickedSubchannelHealthListener), this.currentPick = A, clearTimeout(this.connectionDelayTimeout), this.calculateAndReportNewState()
        }
        updateState(A, B, Q) {
            O71(ZF.ConnectivityState[this.currentState] + " -> " + ZF.ConnectivityState[A]), this.currentState = A, this.channelControlHelper.updateState(A, B, Q)
        }
        resetSubchannelList() {
            for (let A of this.children) A.subchannel.removeConnectivityStateListener(this.subchannelStateListener), A.subchannel.unref(), this.channelControlHelper.removeChannelzChild(A.subchannel.getChannelzRef());
            this.currentSubchannelIndex = 0, this.children = []
        }
        connectToAddressList(A, B) {
            O71("connectToAddressList([" + A.map((Z) => Z0B.subchannelAddressToString(Z)) + "])");
            let Q = A.map((Z) => ({
                subchannel: this.channelControlHelper.createSubchannel(Z, B),
                hasReportedTransientFailure: !1
            }));
            for (let {
                    subchannel: Z
                }
                of Q)
                if (Z.getConnectivityState() === ZF.ConnectivityState.READY) {
                    this.pickSubchannel(Z);
                    return
                } for (let {
                    subchannel: Z
                }
                of Q) Z.ref(), this.channelControlHelper.addChannelzChild(Z.getChannelzRef());
            this.resetSubchannelList(), this.children = Q;
            for (let {
                    subchannel: Z
                }
                of this.children) Z.addConnectivityStateListener(this.subchannelStateListener);
            for (let Z of this.children)
                if (Z.subchannel.getConnectivityState() === ZF.ConnectivityState.TRANSIENT_FAILURE) Z.hasReportedTransientFailure = !0;
            this.startNextSubchannelConnecting(0), this.calculateAndReportNewState()
        }
        updateAddressList(A, B, Q) {
            if (!(B instanceof rt)) return;
            if (this.reportHealthStatus = Q[Y0B], B.getShuffleAddressList()) A = I0B(A);
            let Z = [].concat(...A.map((G) => G.addresses));
            if (O71("updateAddressList([" + Z.map((G) => Z0B.subchannelAddressToString(G)) + "])"), Z.length === 0) this.lastError = "No addresses resolved";
            let D = C$6(Z);
            this.latestAddressList = D, this.latestOptions = Q, this.connectToAddressList(D, Q)
        }
        exitIdle() {
            if (this.currentState === ZF.ConnectivityState.IDLE && this.latestAddressList) this.connectToAddressList(this.latestAddressList, this.latestOptions)
        }
        resetBackoff() {}
        destroy() {
            this.resetSubchannelList(), this.removeCurrentPick()
        }
        getTypeName() {
            return T71
        }
    }
    J0B.PickFirstLoadBalancer = US1;
    var K$6 = new rt(!1);
    class W0B {
        constructor(A, B, Q) {
            this.endpoint = A, this.options = Q, this.latestState = ZF.ConnectivityState.IDLE;
            let Z = KV0.createChildChannelControlHelper(B, {
                updateState: (D, G, F) => {
                    this.latestState = D, this.latestPicker = G, B.updateState(D, G, F)
                }
            });
            this.pickFirstBalancer = new US1(Z), this.latestPicker = new wm.QueuePicker(this.pickFirstBalancer)
        }
        startConnecting() {
            this.pickFirstBalancer.updateAddressList([this.endpoint], K$6, Object.assign(Object.assign({}, this.options), {
                [Y0B]: !0
            }))
        }
        updateEndpoint(A, B) {
            if (this.options = B, this.endpoint = A, this.latestState !== ZF.ConnectivityState.IDLE) this.startConnecting()
        }
        getConnectivityState() {
            return this.latestState
        }
        getPicker() {
            return this.latestPicker
        }
        getEndpoint() {
            return this.endpoint
        }
        exitIdle() {
            this.pickFirstBalancer.exitIdle()
        }
        destroy() {
            this.pickFirstBalancer.destroy()
        }
    }
    J0B.LeafLoadBalancer = W0B;

    function H$6() {
        KV0.registerLoadBalancerType(T71, US1, rt), KV0.registerDefaultLoadBalancerType(T71)
    }
});
var H0B = E((C0B) => {
    Object.defineProperty(C0B, "__esModule", {
        value: !0
    });
    C0B.FileWatcherCertificateProvider = void 0;
    var $$6 = W1("fs"),
        q$6 = I7(),
        N$6 = b6(),
        L$6 = W1("util"),
        M$6 = "certificate_provider";

    function $S1(A) {
        q$6.trace(N$6.LogVerbosity.DEBUG, M$6, A)
    }
    var HV0 = L$6.promisify($$6.readFile);
    class V0B {
        constructor(A) {
            if (this.config = A, this.refreshTimer = null, this.fileResultPromise = null, this.latestCaUpdate = void 0, this.caListeners = new Set, this.latestIdentityUpdate = void 0, this.identityListeners = new Set, this.lastUpdateTime = null, A.certificateFile === void 0 !== (A.privateKeyFile === void 0)) throw new Error("certificateFile and privateKeyFile must be set or unset together");
            if (A.certificateFile === void 0 && A.caCertificateFile === void 0) throw new Error("At least one of certificateFile and caCertificateFile must be set");
            $S1("File watcher constructed with config " + JSON.stringify(A))
        }
        updateCertificates() {
            if (this.fileResultPromise) return;
            this.fileResultPromise = Promise.allSettled([this.config.certificateFile ? HV0(this.config.certificateFile) : Promise.reject(), this.config.privateKeyFile ? HV0(this.config.privateKeyFile) : Promise.reject(), this.config.caCertificateFile ? HV0(this.config.caCertificateFile) : Promise.reject()]), this.fileResultPromise.then(([A, B, Q]) => {
                if (!this.refreshTimer) return;
                if ($S1("File watcher read certificates certificate " + A.status + ", privateKey " + B.status + ", CA certificate " + Q.status), this.lastUpdateTime = new Date, this.fileResultPromise = null, A.status === "fulfilled" && B.status === "fulfilled") this.latestIdentityUpdate = {
                    certificate: A.value,
                    privateKey: B.value
                };
                else this.latestIdentityUpdate = null;
                if (Q.status === "fulfilled") this.latestCaUpdate = {
                    caCertificate: Q.value
                };
                else this.latestCaUpdate = null;
                for (let Z of this.identityListeners) Z(this.latestIdentityUpdate);
                for (let Z of this.caListeners) Z(this.latestCaUpdate)
            }), $S1("File watcher initiated certificate update")
        }
        maybeStartWatchingFiles() {
            if (!this.refreshTimer) {
                let A = this.lastUpdateTime ? new Date().getTime() - this.lastUpdateTime.getTime() : 1 / 0;
                if (A > this.config.refreshIntervalMs) this.updateCertificates();
                if (A > this.config.refreshIntervalMs * 2) this.latestCaUpdate = void 0, this.latestIdentityUpdate = void 0;
                this.refreshTimer = setInterval(() => this.updateCertificates(), this.config.refreshIntervalMs), $S1("File watcher started watching")
            }
        }
        maybeStopWatchingFiles() {
            if (this.caListeners.size === 0 && this.identityListeners.size === 0) {
                if (this.fileResultPromise = null, this.refreshTimer) clearInterval(this.refreshTimer), this.refreshTimer = null
            }
        }
        addCaCertificateListener(A) {
            if (this.caListeners.add(A), this.maybeStartWatchingFiles(), this.latestCaUpdate !== void 0) process.nextTick(A, this.latestCaUpdate)
        }
        removeCaCertificateListener(A) {
            this.caListeners.delete(A), this.maybeStopWatchingFiles()
        }
        addIdentityCertificateListener(A) {
            if (this.identityListeners.add(A), this.maybeStartWatchingFiles(), this.latestIdentityUpdate !== void 0) process.nextTick(A, this.latestIdentityUpdate)
        }
        removeIdentityCertificateListener(A) {
            this.identityListeners.delete(A), this.maybeStopWatchingFiles()
        }
    }
    C0B.FileWatcherCertificateProvider = V0B
});