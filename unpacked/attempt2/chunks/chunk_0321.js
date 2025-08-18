/* chunk:321 bytes:[7765223, 7781888) size:16665 source:unpacked-cli.js */
var LJ0 = E(($s2) => {
    Object.defineProperty($s2, "__esModule", {
        value: !0
    });
    $s2.validateRetryThrottling = Us2;
    $s2.validateServiceConfig = ws2;
    $s2.extractAndSelectServiceConfig = vV6;
    var OV6 = W1("os"),
        UP1 = b6(),
        wP1 = /^\d+(\.\d{1,9})?s$/,
        TV6 = "node";

    function PV6(A) {
        if ("service" in A && A.service !== "") {
            if (typeof A.service !== "string") throw new Error(`Invalid method config name: invalid service: expected type string, got ${typeof A.service}`);
            if ("method" in A && A.method !== "") {
                if (typeof A.method !== "string") throw new Error(`Invalid method config name: invalid method: expected type string, got ${typeof A.service}`);
                return {
                    service: A.service,
                    method: A.method
                }
            } else return {
                service: A.service
            }
        } else {
            if ("method" in A && A.method !== void 0) throw new Error("Invalid method config name: method set with empty or unset service");
            return {}
        }
    }

    function SV6(A) {
        if (!("maxAttempts" in A) || !Number.isInteger(A.maxAttempts) || A.maxAttempts < 2) throw new Error("Invalid method config retry policy: maxAttempts must be an integer at least 2");
        if (!("initialBackoff" in A) || typeof A.initialBackoff !== "string" || !wP1.test(A.initialBackoff)) throw new Error("Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer or decimal followed by s");
        if (!("maxBackoff" in A) || typeof A.maxBackoff !== "string" || !wP1.test(A.maxBackoff)) throw new Error("Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer or decimal followed by s");
        if (!("backoffMultiplier" in A) || typeof A.backoffMultiplier !== "number" || A.backoffMultiplier <= 0) throw new Error("Invalid method config retry policy: backoffMultiplier must be a number greater than 0");
        if (!(("retryableStatusCodes" in A) && Array.isArray(A.retryableStatusCodes))) throw new Error("Invalid method config retry policy: retryableStatusCodes is required");
        if (A.retryableStatusCodes.length === 0) throw new Error("Invalid method config retry policy: retryableStatusCodes must be non-empty");
        for (let B of A.retryableStatusCodes)
            if (typeof B === "number") {
                if (!Object.values(UP1.Status).includes(B)) throw new Error("Invalid method config retry policy: retryableStatusCodes value not in status code range")
            } else if (typeof B === "string") {
            if (!Object.values(UP1.Status).includes(B.toUpperCase())) throw new Error("Invalid method config retry policy: retryableStatusCodes value not a status code name")
        } else throw new Error("Invalid method config retry policy: retryableStatusCodes value must be a string or number");
        return {
            maxAttempts: A.maxAttempts,
            initialBackoff: A.initialBackoff,
            maxBackoff: A.maxBackoff,
            backoffMultiplier: A.backoffMultiplier,
            retryableStatusCodes: A.retryableStatusCodes
        }
    }

    function jV6(A) {
        if (!("maxAttempts" in A) || !Number.isInteger(A.maxAttempts) || A.maxAttempts < 2) throw new Error("Invalid method config hedging policy: maxAttempts must be an integer at least 2");
        if ("hedgingDelay" in A && (typeof A.hedgingDelay !== "string" || !wP1.test(A.hedgingDelay))) throw new Error("Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by s");
        if ("nonFatalStatusCodes" in A && Array.isArray(A.nonFatalStatusCodes))
            for (let Q of A.nonFatalStatusCodes)
                if (typeof Q === "number") {
                    if (!Object.values(UP1.Status).includes(Q)) throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not in status code range")
                } else if (typeof Q === "string") {
            if (!Object.values(UP1.Status).includes(Q.toUpperCase())) throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not a status code name")
        } else throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value must be a string or number");
        let B = {
            maxAttempts: A.maxAttempts
        };
        if (A.hedgingDelay) B.hedgingDelay = A.hedgingDelay;
        if (A.nonFatalStatusCodes) B.nonFatalStatusCodes = A.nonFatalStatusCodes;
        return B
    }

    function kV6(A) {
        var B;
        let Q = {
            name: []
        };
        if (!("name" in A) || !Array.isArray(A.name)) throw new Error("Invalid method config: invalid name array");
        for (let Z of A.name) Q.name.push(PV6(Z));
        if ("waitForReady" in A) {
            if (typeof A.waitForReady !== "boolean") throw new Error("Invalid method config: invalid waitForReady");
            Q.waitForReady = A.waitForReady
        }
        if ("timeout" in A)
            if (typeof A.timeout === "object") {
                if (!("seconds" in A.timeout) || typeof A.timeout.seconds !== "number") throw new Error("Invalid method config: invalid timeout.seconds");
                if (!("nanos" in A.timeout) || typeof A.timeout.nanos !== "number") throw new Error("Invalid method config: invalid timeout.nanos");
                Q.timeout = A.timeout
            } else if (typeof A.timeout === "string" && wP1.test(A.timeout)) {
            let Z = A.timeout.substring(0, A.timeout.length - 1).split(".");
            Q.timeout = {
                seconds: Z[0] | 0,
                nanos: ((B = Z[1]) !== null && B !== void 0 ? B : 0) | 0
            }
        } else throw new Error("Invalid method config: invalid timeout");
        if ("maxRequestBytes" in A) {
            if (typeof A.maxRequestBytes !== "number") throw new Error("Invalid method config: invalid maxRequestBytes");
            Q.maxRequestBytes = A.maxRequestBytes
        }
        if ("maxResponseBytes" in A) {
            if (typeof A.maxResponseBytes !== "number") throw new Error("Invalid method config: invalid maxRequestBytes");
            Q.maxResponseBytes = A.maxResponseBytes
        }
        if ("retryPolicy" in A)
            if ("hedgingPolicy" in A) throw new Error("Invalid method config: retryPolicy and hedgingPolicy cannot both be specified");
            else Q.retryPolicy = SV6(A.retryPolicy);
        else if ("hedgingPolicy" in A) Q.hedgingPolicy = jV6(A.hedgingPolicy);
        return Q
    }

    function Us2(A) {
        if (!("maxTokens" in A) || typeof A.maxTokens !== "number" || A.maxTokens <= 0 || A.maxTokens > 1000) throw new Error("Invalid retryThrottling: maxTokens must be a number in (0, 1000]");
        if (!("tokenRatio" in A) || typeof A.tokenRatio !== "number" || A.tokenRatio <= 0) throw new Error("Invalid retryThrottling: tokenRatio must be a number greater than 0");
        return {
            maxTokens: +A.maxTokens.toFixed(3),
            tokenRatio: +A.tokenRatio.toFixed(3)
        }
    }

    function yV6(A) {
        if (!(typeof A === "object" && A !== null)) throw new Error(`Invalid loadBalancingConfig: unexpected type ${typeof A}`);
        let B = Object.keys(A);
        if (B.length > 1) throw new Error(`Invalid loadBalancingConfig: unexpected multiple keys ${B}`);
        if (B.length === 0) throw new Error("Invalid loadBalancingConfig: load balancing policy name required");
        return {
            [B[0]]: A[B[0]]
        }
    }

    function ws2(A) {
        let B = {
            loadBalancingConfig: [],
            methodConfig: []
        };
        if ("loadBalancingPolicy" in A)
            if (typeof A.loadBalancingPolicy === "string") B.loadBalancingPolicy = A.loadBalancingPolicy;
            else throw new Error("Invalid service config: invalid loadBalancingPolicy");
        if ("loadBalancingConfig" in A)
            if (Array.isArray(A.loadBalancingConfig))
                for (let Z of A.loadBalancingConfig) B.loadBalancingConfig.push(yV6(Z));
            else throw new Error("Invalid service config: invalid loadBalancingConfig");
        if ("methodConfig" in A) {
            if (Array.isArray(A.methodConfig))
                for (let Z of A.methodConfig) B.methodConfig.push(kV6(Z))
        }
        if ("retryThrottling" in A) B.retryThrottling = Us2(A.retryThrottling);
        let Q = [];
        for (let Z of B.methodConfig)
            for (let D of Z.name) {
                for (let G of Q)
                    if (D.service === G.service && D.method === G.method) throw new Error(`Invalid service config: duplicate name ${D.service}/${D.method}`);
                Q.push(D)
            }
        return B
    }

    function _V6(A) {
        if (!("serviceConfig" in A)) throw new Error("Invalid service config choice: missing service config");
        let B = {
            serviceConfig: ws2(A.serviceConfig)
        };
        if ("clientLanguage" in A)
            if (Array.isArray(A.clientLanguage)) {
                B.clientLanguage = [];
                for (let Z of A.clientLanguage)
                    if (typeof Z === "string") B.clientLanguage.push(Z);
                    else throw new Error("Invalid service config choice: invalid clientLanguage")
            } else throw new Error("Invalid service config choice: invalid clientLanguage");
        if ("clientHostname" in A)
            if (Array.isArray(A.clientHostname)) {
                B.clientHostname = [];
                for (let Z of A.clientHostname)
                    if (typeof Z === "string") B.clientHostname.push(Z);
                    else throw new Error("Invalid service config choice: invalid clientHostname")
            } else throw new Error("Invalid service config choice: invalid clientHostname");
        if ("percentage" in A)
            if (typeof A.percentage === "number" && 0 <= A.percentage && A.percentage <= 100) B.percentage = A.percentage;
            else throw new Error("Invalid service config choice: invalid percentage");
        let Q = ["clientLanguage", "percentage", "clientHostname", "serviceConfig"];
        for (let Z in A)
            if (!Q.includes(Z)) throw new Error(`Invalid service config choice: unexpected field ${Z}`);
        return B
    }

    function xV6(A, B) {
        if (!Array.isArray(A)) throw new Error("Invalid service config list");
        for (let Q of A) {
            let Z = _V6(Q);
            if (typeof Z.percentage === "number" && B > Z.percentage) continue;
            if (Array.isArray(Z.clientHostname)) {
                let D = !1;
                for (let G of Z.clientHostname)
                    if (G === OV6.hostname()) D = !0;
                if (!D) continue
            }
            if (Array.isArray(Z.clientLanguage)) {
                let D = !1;
                for (let G of Z.clientLanguage)
                    if (G === TV6) D = !0;
                if (!D) continue
            }
            return Z.serviceConfig
        }
        throw new Error("No matching service config found")
    }

    function vV6(A, B) {
        for (let Q of A)
            if (Q.length > 0 && Q[0].startsWith("grpc_config=")) {
                let Z = Q.join("").substring(12),
                    D = JSON.parse(Z);
                return xV6(D, B)
            } return null
    }
});
var RE = E((Ns2) => {
    Object.defineProperty(Ns2, "__esModule", {
        value: !0
    });
    Ns2.ConnectivityState = void 0;
    var qs2;
    (function(A) {
        A[A.IDLE = 0] = "IDLE", A[A.CONNECTING = 1] = "CONNECTING", A[A.READY = 2] = "READY", A[A.TRANSIENT_FAILURE = 3] = "TRANSIENT_FAILURE", A[A.SHUTDOWN = 4] = "SHUTDOWN"
    })(qs2 || (Ns2.ConnectivityState = qs2 = {}))
});
var Wx = E((Os2) => {
    Object.defineProperty(Os2, "__esModule", {
        value: !0
    });
    Os2.QueuePicker = Os2.UnavailablePicker = Os2.PickResultType = void 0;
    var gV6 = IJ(),
        uV6 = b6(),
        $P1;
    (function(A) {
        A[A.COMPLETE = 0] = "COMPLETE", A[A.QUEUE = 1] = "QUEUE", A[A.TRANSIENT_FAILURE = 2] = "TRANSIENT_FAILURE", A[A.DROP = 3] = "DROP"
    })($P1 || (Os2.PickResultType = $P1 = {}));
    class Ms2 {
        constructor(A) {
            this.status = Object.assign({
                code: uV6.Status.UNAVAILABLE,
                details: "No connection established",
                metadata: new gV6.Metadata
            }, A)
        }
        pick(A) {
            return {
                pickResultType: $P1.TRANSIENT_FAILURE,
                subchannel: null,
                status: this.status,
                onCallStarted: null,
                onCallEnded: null
            }
        }
    }
    Os2.UnavailablePicker = Ms2;
    class Rs2 {
        constructor(A, B) {
            this.loadBalancer = A, this.childPicker = B, this.calledExitIdle = !1
        }
        pick(A) {
            if (!this.calledExitIdle) process.nextTick(() => {
                this.loadBalancer.exitIdle()
            }), this.calledExitIdle = !0;
            if (this.childPicker) return this.childPicker.pick(A);
            else return {
                pickResultType: $P1.QUEUE,
                subchannel: null,
                status: null,
                onCallStarted: null,
                onCallEnded: null
            }
        }
    }
    Os2.QueuePicker = Rs2
});
var t31 = E((Ps2) => {
    Object.defineProperty(Ps2, "__esModule", {
        value: !0
    });
    Ps2.BackoffTimeout = void 0;
    var cV6 = b6(),
        lV6 = I7(),
        pV6 = "backoff",
        iV6 = 1000,
        nV6 = 1.6,
        aV6 = 120000,
        sV6 = 0.2;

    function rV6(A, B) {
        return Math.random() * (B - A) + A
    }
    class qP1 {
        constructor(A, B) {
            if (this.callback = A, this.initialDelay = iV6, this.multiplier = nV6, this.maxDelay = aV6, this.jitter = sV6, this.running = !1, this.hasRef = !0, this.startTime = new Date, this.endTime = new Date, this.id = qP1.getNextId(), B) {
                if (B.initialDelay) this.initialDelay = B.initialDelay;
                if (B.multiplier) this.multiplier = B.multiplier;
                if (B.jitter) this.jitter = B.jitter;
                if (B.maxDelay) this.maxDelay = B.maxDelay
            }
            this.trace("constructed initialDelay=" + this.initialDelay + " multiplier=" + this.multiplier + " jitter=" + this.jitter + " maxDelay=" + this.maxDelay), this.nextDelay = this.initialDelay, this.timerId = setTimeout(() => {}, 0), clearTimeout(this.timerId)
        }
        static getNextId() {
            return this.nextId++
        }
        trace(A) {
            lV6.trace(cV6.LogVerbosity.DEBUG, pV6, "{" + this.id + "} " + A)
        }
        runTimer(A) {
            var B, Q;
            if (this.trace("runTimer(delay=" + A + ")"), this.endTime = this.startTime, this.endTime.setMilliseconds(this.endTime.getMilliseconds() + A), clearTimeout(this.timerId), this.timerId = setTimeout(() => {
                    this.trace("timer fired"), this.running = !1, this.callback()
                }, A), !this.hasRef)(Q = (B = this.timerId).unref) === null || Q === void 0 || Q.call(B)
        }
        runOnce() {
            this.trace("runOnce()"), this.running = !0, this.startTime = new Date, this.runTimer(this.nextDelay);
            let A = Math.min(this.nextDelay * this.multiplier, this.maxDelay),
                B = A * this.jitter;
            this.nextDelay = A + rV6(-B, B)
        }
        stop() {
            this.trace("stop()"), clearTimeout(this.timerId), this.running = !1
        }
        reset() {
            if (this.trace("reset() running=" + this.running), this.nextDelay = this.initialDelay, this.running) {
                let A = new Date,
                    B = this.startTime;
                if (B.setMilliseconds(B.getMilliseconds() + this.nextDelay), clearTimeout(this.timerId), A < B) this.runTimer(B.getTime() - A.getTime());
                else this.running = !1
            }
        }
        isRunning() {
            return this.running
        }
        ref() {
            var A, B;
            this.hasRef = !0, (B = (A = this.timerId).ref) === null || B === void 0 || B.call(A)
        }
        unref() {
            var A, B;
            this.hasRef = !1, (B = (A = this.timerId).unref) === null || B === void 0 || B.call(A)
        }
        getEndTime() {
            return this.endTime
        }
    }
    Ps2.BackoffTimeout = qP1;
    qP1.nextId = 0
});