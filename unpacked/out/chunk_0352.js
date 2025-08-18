/* chunk:352 bytes:[8310087, 8327149) size:17062 source:unpacked-cli.js */
var l0B = E((d0B) => {
    var RV0;
    Object.defineProperty(d0B, "__esModule", {
        value: !0
    });
    d0B.OutlierDetectionLoadBalancer = d0B.OutlierDetectionLoadBalancingConfig = void 0;
    d0B.setup = Fq6;
    var r$6 = RE(),
        f0B = b6(),
        $m = CV0(),
        h0B = EV0(),
        o$6 = Wm(),
        t$6 = NP1(),
        e$6 = Wx(),
        OV0 = OE(),
        Aq6 = XS1(),
        Bq6 = I7(),
        Qq6 = "outlier_detection";

    function NI(A) {
        Bq6.trace(f0B.LogVerbosity.DEBUG, Qq6, A)
    }
    var SV0 = "outlier_detection",
        Zq6 = ((RV0 = process.env.GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION) !== null && RV0 !== void 0 ? RV0 : "true") === "true",
        Dq6 = {
            stdev_factor: 1900,
            enforcement_percentage: 100,
            minimum_hosts: 5,
            request_volume: 100
        },
        Gq6 = {
            threshold: 85,
            enforcement_percentage: 100,
            minimum_hosts: 5,
            request_volume: 50
        };

    function ot(A, B, Q, Z) {
        if (B in A && A[B] !== void 0 && typeof A[B] !== Q) {
            let D = Z ? `${Z}.${B}` : B;
            throw new Error(`outlier detection config ${D} parse error: expected ${Q}, got ${typeof A[B]}`)
        }
    }

    function TV0(A, B, Q) {
        let Z = Q ? `${Q}.${B}` : B;
        if (B in A && A[B] !== void 0) {
            if (!$m.isDuration(A[B])) throw new Error(`outlier detection config ${Z} parse error: expected Duration, got ${typeof A[B]}`);
            if (!(A[B].seconds >= 0 && A[B].seconds <= 315576000000 && A[B].nanos >= 0 && A[B].nanos <= 999999999)) throw new Error(`outlier detection config ${Z} parse error: values out of range for non-negative Duaration`)
        }
    }

    function MS1(A, B, Q) {
        let Z = Q ? `${Q}.${B}` : B;
        if (ot(A, B, "number", Q), B in A && A[B] !== void 0 && !(A[B] >= 0 && A[B] <= 100)) throw new Error(`outlier detection config ${Z} parse error: value out of range for percentage (0-100)`)
    }
    class S71 {
        constructor(A, B, Q, Z, D, G, F) {
            if (this.childPolicy = F, F.getLoadBalancerName() === "pick_first") throw new Error("outlier_detection LB policy cannot have a pick_first child policy");
            this.intervalMs = A !== null && A !== void 0 ? A : 1e4, this.baseEjectionTimeMs = B !== null && B !== void 0 ? B : 30000, this.maxEjectionTimeMs = Q !== null && Q !== void 0 ? Q : 300000, this.maxEjectionPercent = Z !== null && Z !== void 0 ? Z : 10, this.successRateEjection = D ? Object.assign(Object.assign({}, Dq6), D) : null, this.failurePercentageEjection = G ? Object.assign(Object.assign({}, Gq6), G) : null
        }
        getLoadBalancerName() {
            return SV0
        }
        toJsonObject() {
            var A, B;
            return {
                outlier_detection: {
                    interval: $m.msToDuration(this.intervalMs),
                    base_ejection_time: $m.msToDuration(this.baseEjectionTimeMs),
                    max_ejection_time: $m.msToDuration(this.maxEjectionTimeMs),
                    max_ejection_percent: this.maxEjectionPercent,
                    success_rate_ejection: (A = this.successRateEjection) !== null && A !== void 0 ? A : void 0,
                    failure_percentage_ejection: (B = this.failurePercentageEjection) !== null && B !== void 0 ? B : void 0,
                    child_policy: [this.childPolicy.toJsonObject()]
                }
            }
        }
        getIntervalMs() {
            return this.intervalMs
        }
        getBaseEjectionTimeMs() {
            return this.baseEjectionTimeMs
        }
        getMaxEjectionTimeMs() {
            return this.maxEjectionTimeMs
        }
        getMaxEjectionPercent() {
            return this.maxEjectionPercent
        }
        getSuccessRateEjectionConfig() {
            return this.successRateEjection
        }
        getFailurePercentageEjectionConfig() {
            return this.failurePercentageEjection
        }
        getChildPolicy() {
            return this.childPolicy
        }
        static createFromJson(A) {
            var B;
            if (TV0(A, "interval"), TV0(A, "base_ejection_time"), TV0(A, "max_ejection_time"), MS1(A, "max_ejection_percent"), "success_rate_ejection" in A && A.success_rate_ejection !== void 0) {
                if (typeof A.success_rate_ejection !== "object") throw new Error("outlier detection config success_rate_ejection must be an object");
                ot(A.success_rate_ejection, "stdev_factor", "number", "success_rate_ejection"), MS1(A.success_rate_ejection, "enforcement_percentage", "success_rate_ejection"), ot(A.success_rate_ejection, "minimum_hosts", "number", "success_rate_ejection"), ot(A.success_rate_ejection, "request_volume", "number", "success_rate_ejection")
            }
            if ("failure_percentage_ejection" in A && A.failure_percentage_ejection !== void 0) {
                if (typeof A.failure_percentage_ejection !== "object") throw new Error("outlier detection config failure_percentage_ejection must be an object");
                MS1(A.failure_percentage_ejection, "threshold", "failure_percentage_ejection"), MS1(A.failure_percentage_ejection, "enforcement_percentage", "failure_percentage_ejection"), ot(A.failure_percentage_ejection, "minimum_hosts", "number", "failure_percentage_ejection"), ot(A.failure_percentage_ejection, "request_volume", "number", "failure_percentage_ejection")
            }
            if (!("child_policy" in A) || !Array.isArray(A.child_policy)) throw new Error("outlier detection config child_policy must be an array");
            let Q = o$6.selectLbConfigFromList(A.child_policy);
            if (!Q) throw new Error("outlier detection config child_policy: no valid recognized policy found");
            return new S71(A.interval ? $m.durationToMs(A.interval) : null, A.base_ejection_time ? $m.durationToMs(A.base_ejection_time) : null, A.max_ejection_time ? $m.durationToMs(A.max_ejection_time) : null, (B = A.max_ejection_percent) !== null && B !== void 0 ? B : null, A.success_rate_ejection, A.failure_percentage_ejection, Q)
        }
    }
    d0B.OutlierDetectionLoadBalancingConfig = S71;
    class g0B extends Aq6.BaseSubchannelWrapper {
        constructor(A, B) {
            super(A);
            this.mapEntry = B, this.refCount = 0
        }
        ref() {
            this.child.ref(), this.refCount += 1
        }
        unref() {
            if (this.child.unref(), this.refCount -= 1, this.refCount <= 0) {
                if (this.mapEntry) {
                    let A = this.mapEntry.subchannelWrappers.indexOf(this);
                    if (A >= 0) this.mapEntry.subchannelWrappers.splice(A, 1)
                }
            }
        }
        eject() {
            this.setHealthy(!1)
        }
        uneject() {
            this.setHealthy(!0)
        }
        getMapEntry() {
            return this.mapEntry
        }
        getWrappedSubchannel() {
            return this.child
        }
    }

    function PV0() {
        return {
            success: 0,
            failure: 0
        }
    }
    class u0B {
        constructor() {
            this.activeBucket = PV0(), this.inactiveBucket = PV0()
        }
        addSuccess() {
            this.activeBucket.success += 1
        }
        addFailure() {
            this.activeBucket.failure += 1
        }
        switchBuckets() {
            this.inactiveBucket = this.activeBucket, this.activeBucket = PV0()
        }
        getLastSuccesses() {
            return this.inactiveBucket.success
        }
        getLastFailures() {
            return this.inactiveBucket.failure
        }
    }
    class m0B {
        constructor(A, B) {
            this.wrappedPicker = A, this.countCalls = B
        }
        pick(A) {
            let B = this.wrappedPicker.pick(A);
            if (B.pickResultType === e$6.PickResultType.COMPLETE) {
                let Q = B.subchannel,
                    Z = Q.getMapEntry();
                if (Z) {
                    let D = B.onCallEnded;
                    if (this.countCalls) D = (G) => {
                        var F;
                        if (G === f0B.Status.OK) Z.counter.addSuccess();
                        else Z.counter.addFailure();
                        (F = B.onCallEnded) === null || F === void 0 || F.call(B, G)
                    };
                    return Object.assign(Object.assign({}, B), {
                        subchannel: Q.getWrappedSubchannel(),
                        onCallEnded: D
                    })
                } else return Object.assign(Object.assign({}, B), {
                    subchannel: Q.getWrappedSubchannel()
                })
            } else return B
        }
    }
    class jV0 {
        constructor(A) {
            this.entryMap = new OV0.EndpointMap, this.latestConfig = null, this.timerStartTime = null, this.childBalancer = new t$6.ChildLoadBalancerHandler(h0B.createChildChannelControlHelper(A, {
                createSubchannel: (B, Q) => {
                    let Z = A.createSubchannel(B, Q),
                        D = this.entryMap.getForSubchannelAddress(B),
                        G = new g0B(Z, D);
                    if ((D === null || D === void 0 ? void 0 : D.currentEjectionTimestamp) !== null) G.eject();
                    return D === null || D === void 0 || D.subchannelWrappers.push(G), G
                },
                updateState: (B, Q, Z) => {
                    if (B === r$6.ConnectivityState.READY) A.updateState(B, new m0B(Q, this.isCountingEnabled()), Z);
                    else A.updateState(B, Q, Z)
                }
            })), this.ejectionTimer = setInterval(() => {}, 0), clearInterval(this.ejectionTimer)
        }
        isCountingEnabled() {
            return this.latestConfig !== null && (this.latestConfig.getSuccessRateEjectionConfig() !== null || this.latestConfig.getFailurePercentageEjectionConfig() !== null)
        }
        getCurrentEjectionPercent() {
            let A = 0;
            for (let B of this.entryMap.values())
                if (B.currentEjectionTimestamp !== null) A += 1;
            return A * 100 / this.entryMap.size
        }
        runSuccessRateCheck(A) {
            if (!this.latestConfig) return;
            let B = this.latestConfig.getSuccessRateEjectionConfig();
            if (!B) return;
            NI("Running success rate check");
            let Q = B.request_volume,
                Z = 0,
                D = [];
            for (let [J, X] of this.entryMap.entries()) {
                let V = X.counter.getLastSuccesses(),
                    C = X.counter.getLastFailures();
                if (NI("Stats for " + OV0.endpointToString(J) + ": successes=" + V + " failures=" + C + " targetRequestVolume=" + Q), V + C >= Q) Z += 1, D.push(V / (V + C))
            }
            if (NI("Found " + Z + " success rate candidates; currentEjectionPercent=" + this.getCurrentEjectionPercent() + " successRates=[" + D + "]"), Z < B.minimum_hosts) return;
            let G = D.reduce((J, X) => J + X) / D.length,
                F = 0;
            for (let J of D) {
                let X = J - G;
                F += X * X
            }
            let I = F / D.length,
                Y = Math.sqrt(I),
                W = G - Y * (B.stdev_factor / 1000);
            NI("stdev=" + Y + " ejectionThreshold=" + W);
            for (let [J, X] of this.entryMap.entries()) {
                if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) break;
                let V = X.counter.getLastSuccesses(),
                    C = X.counter.getLastFailures();
                if (V + C < Q) continue;
                let K = V / (V + C);
                if (NI("Checking candidate " + J + " successRate=" + K), K < W) {
                    let H = Math.random() * 100;
                    if (NI("Candidate " + J + " randomNumber=" + H + " enforcement_percentage=" + B.enforcement_percentage), H < B.enforcement_percentage) NI("Ejecting candidate " + J), this.eject(X, A)
                }
            }
        }
        runFailurePercentageCheck(A) {
            if (!this.latestConfig) return;
            let B = this.latestConfig.getFailurePercentageEjectionConfig();
            if (!B) return;
            NI("Running failure percentage check. threshold=" + B.threshold + " request volume threshold=" + B.request_volume);
            let Q = 0;
            for (let Z of this.entryMap.values()) {
                let D = Z.counter.getLastSuccesses(),
                    G = Z.counter.getLastFailures();
                if (D + G >= B.request_volume) Q += 1
            }
            if (Q < B.minimum_hosts) return;
            for (let [Z, D] of this.entryMap.entries()) {
                if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) break;
                let G = D.counter.getLastSuccesses(),
                    F = D.counter.getLastFailures();
                if (NI("Candidate successes=" + G + " failures=" + F), G + F < B.request_volume) continue;
                if (F * 100 / (F + G) > B.threshold) {
                    let Y = Math.random() * 100;
                    if (NI("Candidate " + Z + " randomNumber=" + Y + " enforcement_percentage=" + B.enforcement_percentage), Y < B.enforcement_percentage) NI("Ejecting candidate " + Z), this.eject(D, A)
                }
            }
        }
        eject(A, B) {
            A.currentEjectionTimestamp = new Date, A.ejectionTimeMultiplier += 1;
            for (let Q of A.subchannelWrappers) Q.eject()
        }
        uneject(A) {
            A.currentEjectionTimestamp = null;
            for (let B of A.subchannelWrappers) B.uneject()
        }
        switchAllBuckets() {
            for (let A of this.entryMap.values()) A.counter.switchBuckets()
        }
        startTimer(A) {
            var B, Q;
            this.ejectionTimer = setTimeout(() => this.runChecks(), A), (Q = (B = this.ejectionTimer).unref) === null || Q === void 0 || Q.call(B)
        }
        runChecks() {
            let A = new Date;
            if (NI("Ejection timer running"), this.switchAllBuckets(), !this.latestConfig) return;
            this.timerStartTime = A, this.startTimer(this.latestConfig.getIntervalMs()), this.runSuccessRateCheck(A), this.runFailurePercentageCheck(A);
            for (let [B, Q] of this.entryMap.entries())
                if (Q.currentEjectionTimestamp === null) {
                    if (Q.ejectionTimeMultiplier > 0) Q.ejectionTimeMultiplier -= 1
                } else {
                    let Z = this.latestConfig.getBaseEjectionTimeMs(),
                        D = this.latestConfig.getMaxEjectionTimeMs(),
                        G = new Date(Q.currentEjectionTimestamp.getTime());
                    if (G.setMilliseconds(G.getMilliseconds() + Math.min(Z * Q.ejectionTimeMultiplier, Math.max(Z, D))), G < new Date) NI("Unejecting " + B), this.uneject(Q)
                }
        }
        updateAddressList(A, B, Q) {
            if (!(B instanceof S71)) return;
            NI("Received update with config: " + JSON.stringify(B.toJsonObject(), void 0, 2));
            for (let D of A)
                if (!this.entryMap.has(D)) NI("Adding map entry for " + OV0.endpointToString(D)), this.entryMap.set(D, {
                    counter: new u0B,
                    currentEjectionTimestamp: null,
                    ejectionTimeMultiplier: 0,
                    subchannelWrappers: []
                });
            this.entryMap.deleteMissing(A);
            let Z = B.getChildPolicy();
            if (this.childBalancer.updateAddressList(A, Z, Q), B.getSuccessRateEjectionConfig() || B.getFailurePercentageEjectionConfig())
                if (this.timerStartTime) {
                    NI("Previous timer existed. Replacing timer"), clearTimeout(this.ejectionTimer);
                    let D = B.getIntervalMs() - (new Date().getTime() - this.timerStartTime.getTime());
                    this.startTimer(D)
                } else NI("Starting new timer"), this.timerStartTime = new Date, this.startTimer(B.getIntervalMs()), this.switchAllBuckets();
            else {
                NI("Counting disabled. Cancelling timer."), this.timerStartTime = null, clearTimeout(this.ejectionTimer);
                for (let D of this.entryMap.values()) this.uneject(D), D.ejectionTimeMultiplier = 0
            }
            this.latestConfig = B
        }
        exitIdle() {
            this.childBalancer.exitIdle()
        }
        resetBackoff() {
            this.childBalancer.resetBackoff()
        }
        destroy() {
            clearTimeout(this.ejectionTimer), this.childBalancer.destroy()
        }
        getTypeName() {
            return SV0
        }
    }
    d0B.OutlierDetectionLoadBalancer = jV0;

    function Fq6() {
        if (Zq6) h0B.registerLoadBalancerType(SV0, jV0, S71)
    }
});