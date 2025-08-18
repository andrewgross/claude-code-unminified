/* chunk:301 bytes:[7038491, 7058196) size:19705 source:unpacked-cli.js */
var XY0 = E((Zj2) => {
    Object.defineProperty(Zj2, "__esModule", {
        value: !0
    });
    Zj2.ProxyLoggerProvider = void 0;
    var w16 = ET1(),
        $16 = JY0();
    class Qj2 {
        getLogger(A, B, Q) {
            var Z;
            return (Z = this.getDelegateLogger(A, B, Q)) !== null && Z !== void 0 ? Z : new $16.ProxyLogger(this, A, B, Q)
        }
        getDelegate() {
            var A;
            return (A = this._delegate) !== null && A !== void 0 ? A : w16.NOOP_LOGGER_PROVIDER
        }
        setDelegate(A) {
            this._delegate = A
        }
        getDelegateLogger(A, B, Q) {
            var Z;
            return (Z = this._delegate) === null || Z === void 0 ? void 0 : Z.getLogger(A, B, Q)
        }
    }
    Zj2.ProxyLoggerProvider = Qj2
});
var Ij2 = E((Gj2) => {
    Object.defineProperty(Gj2, "__esModule", {
        value: !0
    });
    Gj2._globalThis = void 0;
    Gj2._globalThis = typeof globalThis === "object" ? globalThis : global
});
var Yj2 = E((VY0) => {
    Object.defineProperty(VY0, "__esModule", {
        value: !0
    });
    VY0._globalThis = void 0;
    var q16 = Ij2();
    Object.defineProperty(VY0, "_globalThis", {
        enumerable: !0,
        get: function() {
            return q16._globalThis
        }
    })
});
var Wj2 = E((CY0) => {
    Object.defineProperty(CY0, "__esModule", {
        value: !0
    });
    CY0._globalThis = void 0;
    var L16 = Yj2();
    Object.defineProperty(CY0, "_globalThis", {
        enumerable: !0,
        get: function() {
            return L16._globalThis
        }
    })
});
var Vj2 = E((Jj2) => {
    Object.defineProperty(Jj2, "__esModule", {
        value: !0
    });
    Jj2.API_BACKWARDS_COMPATIBILITY_VERSION = Jj2.makeGetter = Jj2._global = Jj2.GLOBAL_LOGS_API_KEY = void 0;
    var R16 = Wj2();
    Jj2.GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
    Jj2._global = R16._globalThis;

    function O16(A, B, Q) {
        return (Z) => Z === A ? B : Q
    }
    Jj2.makeGetter = O16;
    Jj2.API_BACKWARDS_COMPATIBILITY_VERSION = 1
});
var zj2 = E((Kj2) => {
    Object.defineProperty(Kj2, "__esModule", {
        value: !0
    });
    Kj2.LogsAPI = void 0;
    var wE = Vj2(),
        j16 = ET1(),
        Cj2 = XY0();
    class KY0 {
        constructor() {
            this._proxyLoggerProvider = new Cj2.ProxyLoggerProvider
        }
        static getInstance() {
            if (!this._instance) this._instance = new KY0;
            return this._instance
        }
        setGlobalLoggerProvider(A) {
            if (wE._global[wE.GLOBAL_LOGS_API_KEY]) return this.getLoggerProvider();
            return wE._global[wE.GLOBAL_LOGS_API_KEY] = wE.makeGetter(wE.API_BACKWARDS_COMPATIBILITY_VERSION, A, j16.NOOP_LOGGER_PROVIDER), this._proxyLoggerProvider.setDelegate(A), A
        }
        getLoggerProvider() {
            var A, B;
            return (B = (A = wE._global[wE.GLOBAL_LOGS_API_KEY]) === null || A === void 0 ? void 0 : A.call(wE._global, wE.API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && B !== void 0 ? B : this._proxyLoggerProvider
        }
        getLogger(A, B, Q) {
            return this.getLoggerProvider().getLogger(A, B, Q)
        }
        disable() {
            delete wE._global[wE.GLOBAL_LOGS_API_KEY], this._proxyLoggerProvider = new Cj2.ProxyLoggerProvider
        }
    }
    Kj2.LogsAPI = KY0
});
var HY0 = E(($P) => {
    Object.defineProperty($P, "__esModule", {
        value: !0
    });
    $P.logs = $P.ProxyLoggerProvider = $P.ProxyLogger = $P.NoopLoggerProvider = $P.NOOP_LOGGER_PROVIDER = $P.NoopLogger = $P.NOOP_LOGGER = $P.SeverityNumber = void 0;
    var k16 = aS2();
    Object.defineProperty($P, "SeverityNumber", {
        enumerable: !0,
        get: function() {
            return k16.SeverityNumber
        }
    });
    var Ej2 = zT1();
    Object.defineProperty($P, "NOOP_LOGGER", {
        enumerable: !0,
        get: function() {
            return Ej2.NOOP_LOGGER
        }
    });
    Object.defineProperty($P, "NoopLogger", {
        enumerable: !0,
        get: function() {
            return Ej2.NoopLogger
        }
    });
    var Uj2 = ET1();
    Object.defineProperty($P, "NOOP_LOGGER_PROVIDER", {
        enumerable: !0,
        get: function() {
            return Uj2.NOOP_LOGGER_PROVIDER
        }
    });
    Object.defineProperty($P, "NoopLoggerProvider", {
        enumerable: !0,
        get: function() {
            return Uj2.NoopLoggerProvider
        }
    });
    var y16 = JY0();
    Object.defineProperty($P, "ProxyLogger", {
        enumerable: !0,
        get: function() {
            return y16.ProxyLogger
        }
    });
    var _16 = XY0();
    Object.defineProperty($P, "ProxyLoggerProvider", {
        enumerable: !0,
        get: function() {
            return _16.ProxyLoggerProvider
        }
    });
    var x16 = zj2();
    $P.logs = x16.LogsAPI.getInstance()
});
var UT1 = E(($j2) => {
    Object.defineProperty($j2, "__esModule", {
        value: !0
    });
    $j2.AggregationTemporality = void 0;
    var v16;
    (function(A) {
        A[A.DELTA = 0] = "DELTA", A[A.CUMULATIVE = 1] = "CUMULATIVE"
    })(v16 = $j2.AggregationTemporality || ($j2.AggregationTemporality = {}))
});
var o_ = E((Nj2) => {
    Object.defineProperty(Nj2, "__esModule", {
        value: !0
    });
    Nj2.DataPointType = Nj2.InstrumentType = void 0;
    var b16;
    (function(A) {
        A.COUNTER = "COUNTER", A.GAUGE = "GAUGE", A.HISTOGRAM = "HISTOGRAM", A.UP_DOWN_COUNTER = "UP_DOWN_COUNTER", A.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER", A.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE", A.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER"
    })(b16 = Nj2.InstrumentType || (Nj2.InstrumentType = {}));
    var f16;
    (function(A) {
        A[A.HISTOGRAM = 0] = "HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 1] = "EXPONENTIAL_HISTOGRAM", A[A.GAUGE = 2] = "GAUGE", A[A.SUM = 3] = "SUM"
    })(f16 = Nj2.DataPointType || (Nj2.DataPointType = {}))
});
var Z$ = E((Lj2) => {
    Object.defineProperty(Lj2, "__esModule", {
        value: !0
    });
    Lj2.equalsCaseInsensitive = Lj2.binarySearchUB = Lj2.setEquals = Lj2.FlatMap = Lj2.isPromiseAllSettledRejectionResult = Lj2.PromiseAllSettled = Lj2.callWithTimeout = Lj2.TimeoutError = Lj2.instrumentationScopeId = Lj2.hashAttributes = Lj2.isNotNullish = void 0;

    function h16(A) {
        return A !== void 0 && A !== null
    }
    Lj2.isNotNullish = h16;

    function g16(A) {
        let B = Object.keys(A);
        if (B.length === 0) return "";
        return B = B.sort(), JSON.stringify(B.map((Q) => [Q, A[Q]]))
    }
    Lj2.hashAttributes = g16;

    function u16(A) {
        return `${A.name}:${A.version??""}:${A.schemaUrl??""}`
    }
    Lj2.instrumentationScopeId = u16;
    class wT1 extends Error {
        constructor(A) {
            super(A);
            Object.setPrototypeOf(this, wT1.prototype)
        }
    }
    Lj2.TimeoutError = wT1;

    function m16(A, B) {
        let Q, Z = new Promise(function D(G, F) {
            Q = setTimeout(function I() {
                F(new wT1("Operation timed out."))
            }, B)
        });
        return Promise.race([A, Z]).then((D) => {
            return clearTimeout(Q), D
        }, (D) => {
            throw clearTimeout(Q), D
        })
    }
    Lj2.callWithTimeout = m16;
    async function d16(A) {
        return Promise.all(A.map(async (B) => {
            try {
                return {
                    status: "fulfilled",
                    value: await B
                }
            } catch (Q) {
                return {
                    status: "rejected",
                    reason: Q
                }
            }
        }))
    }
    Lj2.PromiseAllSettled = d16;

    function c16(A) {
        return A.status === "rejected"
    }
    Lj2.isPromiseAllSettledRejectionResult = c16;

    function l16(A, B) {
        let Q = [];
        return A.forEach((Z) => {
            Q.push(...B(Z))
        }), Q
    }
    Lj2.FlatMap = l16;

    function p16(A, B) {
        if (A.size !== B.size) return !1;
        for (let Q of A)
            if (!B.has(Q)) return !1;
        return !0
    }
    Lj2.setEquals = p16;

    function i16(A, B) {
        let Q = 0,
            Z = A.length - 1,
            D = A.length;
        while (Z >= Q) {
            let G = Q + Math.trunc((Z - Q) / 2);
            if (A[G] < B) Q = G + 1;
            else D = G, Z = G - 1
        }
        return D
    }
    Lj2.binarySearchUB = i16;

    function n16(A, B) {
        return A.toLowerCase() === B.toLowerCase()
    }
    Lj2.equalsCaseInsensitive = n16
});
var Wt = E((Rj2) => {
    Object.defineProperty(Rj2, "__esModule", {
        value: !0
    });
    Rj2.AggregatorKind = void 0;
    var D06;
    (function(A) {
        A[A.DROP = 0] = "DROP", A[A.SUM = 1] = "SUM", A[A.LAST_VALUE = 2] = "LAST_VALUE", A[A.HISTOGRAM = 3] = "HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 4] = "EXPONENTIAL_HISTOGRAM"
    })(D06 = Rj2.AggregatorKind || (Rj2.AggregatorKind = {}))
});
var Sj2 = E((Tj2) => {
    Object.defineProperty(Tj2, "__esModule", {
        value: !0
    });
    Tj2.DropAggregator = void 0;
    var G06 = Wt();
    class Oj2 {
        kind = G06.AggregatorKind.DROP;
        createAccumulation() {
            return
        }
        merge(A, B) {
            return
        }
        diff(A, B) {
            return
        }
        toMetricData(A, B, Q, Z) {
            return
        }
    }
    Tj2.DropAggregator = Oj2
});
var _j2 = E((kj2) => {
    Object.defineProperty(kj2, "__esModule", {
        value: !0
    });
    kj2.HistogramAggregator = kj2.HistogramAccumulation = void 0;
    var F06 = Wt(),
        L31 = o_(),
        I06 = Z$();

    function Y06(A) {
        let B = A.map(() => 0);
        return B.push(0), {
            buckets: {
                boundaries: A,
                counts: B
            },
            sum: 0,
            count: 0,
            hasMinMax: !1,
            min: 1 / 0,
            max: -1 / 0
        }
    }
    class M31 {
        startTime;
        _boundaries;
        _recordMinMax;
        _current;
        constructor(A, B, Q = !0, Z = Y06(B)) {
            this.startTime = A, this._boundaries = B, this._recordMinMax = Q, this._current = Z
        }
        record(A) {
            if (Number.isNaN(A)) return;
            if (this._current.count += 1, this._current.sum += A, this._recordMinMax) this._current.min = Math.min(A, this._current.min), this._current.max = Math.max(A, this._current.max), this._current.hasMinMax = !0;
            let B = I06.binarySearchUB(this._boundaries, A);
            this._current.buckets.counts[B] += 1
        }
        setStartTime(A) {
            this.startTime = A
        }
        toPointValue() {
            return this._current
        }
    }
    kj2.HistogramAccumulation = M31;
    class jj2 {
        _boundaries;
        _recordMinMax;
        kind = F06.AggregatorKind.HISTOGRAM;
        constructor(A, B) {
            this._boundaries = A, this._recordMinMax = B
        }
        createAccumulation(A) {
            return new M31(A, this._boundaries, this._recordMinMax)
        }
        merge(A, B) {
            let Q = A.toPointValue(),
                Z = B.toPointValue(),
                D = Q.buckets.counts,
                G = Z.buckets.counts,
                F = new Array(D.length);
            for (let W = 0; W < D.length; W++) F[W] = D[W] + G[W];
            let I = 1 / 0,
                Y = -1 / 0;
            if (this._recordMinMax) {
                if (Q.hasMinMax && Z.hasMinMax) I = Math.min(Q.min, Z.min), Y = Math.max(Q.max, Z.max);
                else if (Q.hasMinMax) I = Q.min, Y = Q.max;
                else if (Z.hasMinMax) I = Z.min, Y = Z.max
            }
            return new M31(A.startTime, Q.buckets.boundaries, this._recordMinMax, {
                buckets: {
                    boundaries: Q.buckets.boundaries,
                    counts: F
                },
                count: Q.count + Z.count,
                sum: Q.sum + Z.sum,
                hasMinMax: this._recordMinMax && (Q.hasMinMax || Z.hasMinMax),
                min: I,
                max: Y
            })
        }
        diff(A, B) {
            let Q = A.toPointValue(),
                Z = B.toPointValue(),
                D = Q.buckets.counts,
                G = Z.buckets.counts,
                F = new Array(D.length);
            for (let I = 0; I < D.length; I++) F[I] = G[I] - D[I];
            return new M31(B.startTime, Q.buckets.boundaries, this._recordMinMax, {
                buckets: {
                    boundaries: Q.buckets.boundaries,
                    counts: F
                },
                count: Z.count - Q.count,
                sum: Z.sum - Q.sum,
                hasMinMax: !1,
                min: 1 / 0,
                max: -1 / 0
            })
        }
        toMetricData(A, B, Q, Z) {
            return {
                descriptor: A,
                aggregationTemporality: B,
                dataPointType: L31.DataPointType.HISTOGRAM,
                dataPoints: Q.map(([D, G]) => {
                    let F = G.toPointValue(),
                        I = A.type === L31.InstrumentType.GAUGE || A.type === L31.InstrumentType.UP_DOWN_COUNTER || A.type === L31.InstrumentType.OBSERVABLE_GAUGE || A.type === L31.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
                    return {
                        attributes: D,
                        startTime: G.startTime,
                        endTime: Z,
                        value: {
                            min: F.hasMinMax ? F.min : void 0,
                            max: F.hasMinMax ? F.max : void 0,
                            sum: !I ? F.sum : void 0,
                            buckets: F.buckets,
                            count: F.count
                        }
                    }
                })
            }
        }
    }
    kj2.HistogramAggregator = jj2
});
var bj2 = E((xj2) => {
    Object.defineProperty(xj2, "__esModule", {
        value: !0
    });
    xj2.Buckets = void 0;
    class wY0 {
        backing;
        indexBase;
        indexStart;
        indexEnd;
        constructor(A = new $Y0, B = 0, Q = 0, Z = 0) {
            this.backing = A, this.indexBase = B, this.indexStart = Q, this.indexEnd = Z
        }
        get offset() {
            return this.indexStart
        }
        get length() {
            if (this.backing.length === 0) return 0;
            if (this.indexEnd === this.indexStart && this.at(0) === 0) return 0;
            return this.indexEnd - this.indexStart + 1
        }
        counts() {
            return Array.from({
                length: this.length
            }, (A, B) => this.at(B))
        }
        at(A) {
            let B = this.indexBase - this.indexStart;
            if (A < B) A += this.backing.length;
            return A -= B, this.backing.countAt(A)
        }
        incrementBucket(A, B) {
            this.backing.increment(A, B)
        }
        decrementBucket(A, B) {
            this.backing.decrement(A, B)
        }
        trim() {
            for (let A = 0; A < this.length; A++)
                if (this.at(A) !== 0) {
                    this.indexStart += A;
                    break
                } else if (A === this.length - 1) {
                this.indexStart = this.indexEnd = this.indexBase = 0;
                return
            }
            for (let A = this.length - 1; A >= 0; A--)
                if (this.at(A) !== 0) {
                    this.indexEnd -= this.length - A - 1;
                    break
                } this._rotate()
        }
        downscale(A) {
            this._rotate();
            let B = 1 + this.indexEnd - this.indexStart,
                Q = 1 << A,
                Z = 0,
                D = 0;
            for (let G = this.indexStart; G <= this.indexEnd;) {
                let F = G % Q;
                if (F < 0) F += Q;
                for (let I = F; I < Q && Z < B; I++) this._relocateBucket(D, Z), Z++, G++;
                D++
            }
            this.indexStart >>= A, this.indexEnd >>= A, this.indexBase = this.indexStart
        }
        clone() {
            return new wY0(this.backing.clone(), this.indexBase, this.indexStart, this.indexEnd)
        }
        _rotate() {
            let A = this.indexBase - this.indexStart;
            if (A === 0) return;
            else if (A > 0) this.backing.reverse(0, this.backing.length), this.backing.reverse(0, A), this.backing.reverse(A, this.backing.length);
            else this.backing.reverse(0, this.backing.length), this.backing.reverse(0, this.backing.length + A);
            this.indexBase = this.indexStart
        }
        _relocateBucket(A, B) {
            if (A === B) return;
            this.incrementBucket(A, this.backing.emptyBucket(B))
        }
    }
    xj2.Buckets = wY0;
    class $Y0 {
        _counts;
        constructor(A = [0]) {
            this._counts = A
        }
        get length() {
            return this._counts.length
        }
        countAt(A) {
            return this._counts[A]
        }
        growTo(A, B, Q) {
            let Z = new Array(A).fill(0);
            Z.splice(Q, this._counts.length - B, ...this._counts.slice(B)), Z.splice(0, B, ...this._counts.slice(0, B)), this._counts = Z
        }
        reverse(A, B) {
            let Q = Math.floor((A + B) / 2) - A;
            for (let Z = 0; Z < Q; Z++) {
                let D = this._counts[A + Z];
                this._counts[A + Z] = this._counts[B - Z - 1], this._counts[B - Z - 1] = D
            }
        }
        emptyBucket(A) {
            let B = this._counts[A];
            return this._counts[A] = 0, B
        }
        increment(A, B) {
            this._counts[A] += B
        }
        decrement(A, B) {
            if (this._counts[A] >= B) this._counts[A] -= B;
            else this._counts[A] = 0
        }
        clone() {
            return new $Y0([...this._counts])
        }
    }
});
var NY0 = E((fj2) => {
    Object.defineProperty(fj2, "__esModule", {
        value: !0
    });
    fj2.getSignificand = fj2.getNormalBase2 = fj2.MIN_VALUE = fj2.MAX_NORMAL_EXPONENT = fj2.MIN_NORMAL_EXPONENT = fj2.SIGNIFICAND_WIDTH = void 0;
    fj2.SIGNIFICAND_WIDTH = 52;
    var J06 = 2146435072,
        X06 = 1048575,
        qY0 = 1023;
    fj2.MIN_NORMAL_EXPONENT = -qY0 + 1;
    fj2.MAX_NORMAL_EXPONENT = qY0;
    fj2.MIN_VALUE = Math.pow(2, -1022);

    function V06(A) {
        let B = new DataView(new ArrayBuffer(8));
        return B.setFloat64(0, A), ((B.getUint32(0) & J06) >> 20) - qY0
    }
    fj2.getNormalBase2 = V06;

    function C06(A) {
        let B = new DataView(new ArrayBuffer(8));
        B.setFloat64(0, A);
        let Q = B.getUint32(0),
            Z = B.getUint32(4);
        return (Q & X06) * Math.pow(2, 32) + Z
    }
    fj2.getSignificand = C06
});
var $T1 = E((gj2) => {
    Object.defineProperty(gj2, "__esModule", {
        value: !0
    });
    gj2.nextGreaterSquare = gj2.ldexp = void 0;

    function w06(A, B) {
        if (A === 0 || A === Number.POSITIVE_INFINITY || A === Number.NEGATIVE_INFINITY || Number.isNaN(A)) return A;
        return A * Math.pow(2, B)
    }
    gj2.ldexp = w06;

    function $06(A) {
        return A--, A |= A >> 1, A |= A >> 2, A |= A >> 4, A |= A >> 8, A |= A >> 16, A++, A
    }
    gj2.nextGreaterSquare = $06
});
var qT1 = E((dj2) => {
    Object.defineProperty(dj2, "__esModule", {
        value: !0
    });
    dj2.MappingError = void 0;
    class mj2 extends Error {}
    dj2.MappingError = mj2
});