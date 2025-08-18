/* chunk:72 bytes:[1696565, 1707004) size:10439 source:unpacked-cli.js */
var aD = E((VA5, k5A) => {
    var {
        defineProperty: XH1,
        getOwnPropertyDescriptor: se9,
        getOwnPropertyNames: re9
    } = Object, oe9 = Object.prototype.hasOwnProperty, Hw = (A, B) => XH1(A, "name", {
        value: B,
        configurable: !0
    }), te9 = (A, B) => {
        for (var Q in B) XH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ee9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of re9(B))
                if (!oe9.call(A, D) && D !== Q) XH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = se9(B, D)) || Z.enumerable
                })
        }
        return A
    }, A1Q = (A) => ee9(XH1({}, "__esModule", {
        value: !0
    }), A), M5A = {};
    te9(M5A, {
        AdaptiveRetryStrategy: () => F1Q,
        ConfiguredRetryStrategy: () => I1Q,
        DEFAULT_MAX_ATTEMPTS: () => Hs1,
        DEFAULT_RETRY_DELAY_BASE: () => f91,
        DEFAULT_RETRY_MODE: () => B1Q,
        DefaultRateLimiter: () => O5A,
        INITIAL_RETRY_TOKENS: () => zs1,
        INVOCATION_ID_HEADER: () => Z1Q,
        MAXIMUM_RETRY_DELAY: () => Es1,
        NO_RETRY_INCREMENT: () => j5A,
        REQUEST_HEADER: () => D1Q,
        RETRY_COST: () => P5A,
        RETRY_MODES: () => R5A,
        StandardRetryStrategy: () => Us1,
        THROTTLING_RETRY_DELAY_BASE: () => T5A,
        TIMEOUT_RETRY_COST: () => S5A
    });
    k5A.exports = A1Q(M5A);
    var R5A = ((A) => {
            return A.STANDARD = "standard", A.ADAPTIVE = "adaptive", A
        })(R5A || {}),
        Hs1 = 3,
        B1Q = "standard",
        Q1Q = Ks1(),
        O5A = class A {
            constructor(B) {
                this.currentCapacity = 0, this.enabled = !1, this.lastMaxRate = 0, this.measuredTxRate = 0, this.requestCount = 0, this.lastTimestamp = 0, this.timeWindow = 0, this.beta = B?.beta ?? 0.7, this.minCapacity = B?.minCapacity ?? 1, this.minFillRate = B?.minFillRate ?? 0.5, this.scaleConstant = B?.scaleConstant ?? 0.4, this.smooth = B?.smooth ?? 0.8;
                let Q = this.getCurrentTimeInSeconds();
                this.lastThrottleTime = Q, this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity
            }
            static {
                Hw(this, "DefaultRateLimiter")
            }
            static {
                this.setTimeoutFn = setTimeout
            }
            getCurrentTimeInSeconds() {
                return Date.now() / 1000
            }
            async getSendToken() {
                return this.acquireTokenBucket(1)
            }
            async acquireTokenBucket(B) {
                if (!this.enabled) return;
                if (this.refillTokenBucket(), B > this.currentCapacity) {
                    let Q = (B - this.currentCapacity) / this.fillRate * 1000;
                    await new Promise((Z) => A.setTimeoutFn(Z, Q))
                }
                this.currentCapacity = this.currentCapacity - B
            }
            refillTokenBucket() {
                let B = this.getCurrentTimeInSeconds();
                if (!this.lastTimestamp) {
                    this.lastTimestamp = B;
                    return
                }
                let Q = (B - this.lastTimestamp) * this.fillRate;
                this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + Q), this.lastTimestamp = B
            }
            updateClientSendingRate(B) {
                let Q;
                if (this.updateMeasuredRate(), Q1Q.isThrottlingError(B)) {
                    let D = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
                    this.lastMaxRate = D, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), Q = this.cubicThrottle(D), this.enableTokenBucket()
                } else this.calculateTimeWindow(), Q = this.cubicSuccess(this.getCurrentTimeInSeconds());
                let Z = Math.min(Q, 2 * this.measuredTxRate);
                this.updateTokenBucketRate(Z)
            }
            calculateTimeWindow() {
                this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 0.3333333333333333))
            }
            cubicThrottle(B) {
                return this.getPrecise(B * this.beta)
            }
            cubicSuccess(B) {
                return this.getPrecise(this.scaleConstant * Math.pow(B - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate)
            }
            enableTokenBucket() {
                this.enabled = !0
            }
            updateTokenBucketRate(B) {
                this.refillTokenBucket(), this.fillRate = Math.max(B, this.minFillRate), this.maxCapacity = Math.max(B, this.minCapacity), this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity)
            }
            updateMeasuredRate() {
                let B = this.getCurrentTimeInSeconds(),
                    Q = Math.floor(B * 2) / 2;
                if (this.requestCount++, Q > this.lastTxRateBucket) {
                    let Z = this.requestCount / (Q - this.lastTxRateBucket);
                    this.measuredTxRate = this.getPrecise(Z * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = Q
                }
            }
            getPrecise(B) {
                return parseFloat(B.toFixed(8))
            }
        },
        f91 = 100,
        Es1 = 20000,
        T5A = 500,
        zs1 = 500,
        P5A = 5,
        S5A = 10,
        j5A = 1,
        Z1Q = "amz-sdk-invocation-id",
        D1Q = "amz-sdk-request",
        G1Q = Hw(() => {
            let A = f91;
            return {
                computeNextBackoffDelay: Hw((Z) => {
                    return Math.floor(Math.min(Es1, Math.random() * 2 ** Z * A))
                }, "computeNextBackoffDelay"),
                setDelayBase: Hw((Z) => {
                    A = Z
                }, "setDelayBase")
            }
        }, "getDefaultRetryBackoffStrategy"),
        L5A = Hw(({
            retryDelay: A,
            retryCount: B,
            retryCost: Q
        }) => {
            return {
                getRetryCount: Hw(() => B, "getRetryCount"),
                getRetryDelay: Hw(() => Math.min(Es1, A), "getRetryDelay"),
                getRetryCost: Hw(() => Q, "getRetryCost")
            }
        }, "createDefaultRetryToken"),
        Us1 = class {
            constructor(A) {
                this.maxAttempts = A, this.mode = "standard", this.capacity = zs1, this.retryBackoffStrategy = G1Q(), this.maxAttemptsProvider = typeof A === "function" ? A : async () => A
            }
            static {
                Hw(this, "StandardRetryStrategy")
            }
            async acquireInitialRetryToken(A) {
                return L5A({
                    retryDelay: f91,
                    retryCount: 0
                })
            }
            async refreshRetryTokenForRetry(A, B) {
                let Q = await this.getMaxAttempts();
                if (this.shouldRetry(A, B, Q)) {
                    let Z = B.errorType;
                    this.retryBackoffStrategy.setDelayBase(Z === "THROTTLING" ? T5A : f91);
                    let D = this.retryBackoffStrategy.computeNextBackoffDelay(A.getRetryCount()),
                        G = B.retryAfterHint ? Math.max(B.retryAfterHint.getTime() - Date.now() || 0, D) : D,
                        F = this.getCapacityCost(Z);
                    return this.capacity -= F, L5A({
                        retryDelay: G,
                        retryCount: A.getRetryCount() + 1,
                        retryCost: F
                    })
                }
                throw new Error("No retry token available")
            }
            recordSuccess(A) {
                this.capacity = Math.max(zs1, this.capacity + (A.getRetryCost() ?? j5A))
            }
            getCapacity() {
                return this.capacity
            }
            async getMaxAttempts() {
                try {
                    return await this.maxAttemptsProvider()
                } catch (A) {
                    return console.warn(`Max attempts provider could not resolve. Using default of ${Hs1}`), Hs1
                }
            }
            shouldRetry(A, B, Q) {
                return A.getRetryCount() + 1 < Q && this.capacity >= this.getCapacityCost(B.errorType) && this.isRetryableError(B.errorType)
            }
            getCapacityCost(A) {
                return A === "TRANSIENT" ? S5A : P5A
            }
            isRetryableError(A) {
                return A === "THROTTLING" || A === "TRANSIENT"
            }
        },
        F1Q = class {
            constructor(A, B) {
                this.maxAttemptsProvider = A, this.mode = "adaptive";
                let {
                    rateLimiter: Q
                } = B ?? {};
                this.rateLimiter = Q ?? new O5A, this.standardRetryStrategy = new Us1(A)
            }
            static {
                Hw(this, "AdaptiveRetryStrategy")
            }
            async acquireInitialRetryToken(A) {
                return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(A)
            }
            async refreshRetryTokenForRetry(A, B) {
                return this.rateLimiter.updateClientSendingRate(B), this.standardRetryStrategy.refreshRetryTokenForRetry(A, B)
            }
            recordSuccess(A) {
                this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(A)
            }
        },
        I1Q = class extends Us1 {
            static {
                Hw(this, "ConfiguredRetryStrategy")
            }
            constructor(A, B = f91) {
                super(typeof A === "function" ? A : async () => A);
                if (typeof B === "number") this.computeNextBackoffDelay = () => B;
                else this.computeNextBackoffDelay = B
            }
            async refreshRetryTokenForRetry(A, B) {
                let Q = await super.refreshRetryTokenForRetry(A, B);
                return Q.getRetryDelay = () => this.computeNextBackoffDelay(Q.getRetryCount()), Q
            }
        }
});