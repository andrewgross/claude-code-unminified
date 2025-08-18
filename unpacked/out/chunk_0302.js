/* chunk:302 bytes:[7058197, 7077042) size:18845 source:unpacked-cli.js */
var aj2 = E((ij2) => {
    Object.defineProperty(ij2, "__esModule", {
        value: !0
    });
    ij2.ExponentMapping = void 0;
    var Jt = NY0(),
        N06 = $T1(),
        lj2 = qT1();
    class pj2 {
        _shift;
        constructor(A) {
            this._shift = -A
        }
        mapToIndex(A) {
            if (A < Jt.MIN_VALUE) return this._minNormalLowerBoundaryIndex();
            let B = Jt.getNormalBase2(A),
                Q = this._rightShift(Jt.getSignificand(A) - 1, Jt.SIGNIFICAND_WIDTH);
            return B + Q >> this._shift
        }
        lowerBoundary(A) {
            let B = this._minNormalLowerBoundaryIndex();
            if (A < B) throw new lj2.MappingError(`underflow: ${A} is < minimum lower boundary: ${B}`);
            let Q = this._maxNormalLowerBoundaryIndex();
            if (A > Q) throw new lj2.MappingError(`overflow: ${A} is > maximum lower boundary: ${Q}`);
            return N06.ldexp(1, A << this._shift)
        }
        get scale() {
            if (this._shift === 0) return 0;
            return -this._shift
        }
        _minNormalLowerBoundaryIndex() {
            let A = Jt.MIN_NORMAL_EXPONENT >> this._shift;
            if (this._shift < 2) A--;
            return A
        }
        _maxNormalLowerBoundaryIndex() {
            return Jt.MAX_NORMAL_EXPONENT >> this._shift
        }
        _rightShift(A, B) {
            return Math.floor(A * Math.pow(2, -B))
        }
    }
    ij2.ExponentMapping = pj2
});
var Ak2 = E((tj2) => {
    Object.defineProperty(tj2, "__esModule", {
        value: !0
    });
    tj2.LogarithmMapping = void 0;
    var Xt = NY0(),
        sj2 = $T1(),
        rj2 = qT1();
    class oj2 {
        _scale;
        _scaleFactor;
        _inverseFactor;
        constructor(A) {
            this._scale = A, this._scaleFactor = sj2.ldexp(Math.LOG2E, A), this._inverseFactor = sj2.ldexp(Math.LN2, -A)
        }
        mapToIndex(A) {
            if (A <= Xt.MIN_VALUE) return this._minNormalLowerBoundaryIndex() - 1;
            if (Xt.getSignificand(A) === 0) return (Xt.getNormalBase2(A) << this._scale) - 1;
            let B = Math.floor(Math.log(A) * this._scaleFactor),
                Q = this._maxNormalLowerBoundaryIndex();
            if (B >= Q) return Q;
            return B
        }
        lowerBoundary(A) {
            let B = this._maxNormalLowerBoundaryIndex();
            if (A >= B) {
                if (A === B) return 2 * Math.exp((A - (1 << this._scale)) / this._scaleFactor);
                throw new rj2.MappingError(`overflow: ${A} is > maximum lower boundary: ${B}`)
            }
            let Q = this._minNormalLowerBoundaryIndex();
            if (A <= Q) {
                if (A === Q) return Xt.MIN_VALUE;
                else if (A === Q - 1) return Math.exp((A + (1 << this._scale)) / this._scaleFactor) / 2;
                throw new rj2.MappingError(`overflow: ${A} is < minimum lower boundary: ${Q}`)
            }
            return Math.exp(A * this._inverseFactor)
        }
        get scale() {
            return this._scale
        }
        _minNormalLowerBoundaryIndex() {
            return Xt.MIN_NORMAL_EXPONENT << this._scale
        }
        _maxNormalLowerBoundaryIndex() {
            return (Xt.MAX_NORMAL_EXPONENT + 1 << this._scale) - 1
        }
    }
    tj2.LogarithmMapping = oj2
});
var Gk2 = E((Zk2) => {
    Object.defineProperty(Zk2, "__esModule", {
        value: !0
    });
    Zk2.getMapping = void 0;
    var L06 = aj2(),
        M06 = Ak2(),
        R06 = qT1(),
        Bk2 = -10,
        Qk2 = 20,
        O06 = Array.from({
            length: 31
        }, (A, B) => {
            if (B > 10) return new M06.LogarithmMapping(B - 10);
            return new L06.ExponentMapping(B - 10)
        });

    function T06(A) {
        if (A > Qk2 || A < Bk2) throw new R06.MappingError(`expected scale >= ${Bk2} && <= ${Qk2}, got: ${A}`);
        return O06[A + 10]
    }
    Zk2.getMapping = T06
});
var Xk2 = E((Wk2) => {
    Object.defineProperty(Wk2, "__esModule", {
        value: !0
    });
    Wk2.ExponentialHistogramAggregator = Wk2.ExponentialHistogramAccumulation = void 0;
    var P06 = Wt(),
        R31 = o_(),
        S06 = XQ(),
        Fk2 = bj2(),
        Ik2 = Gk2(),
        j06 = $T1();
    class Vt {
        low;
        high;
        static combine(A, B) {
            return new Vt(Math.min(A.low, B.low), Math.max(A.high, B.high))
        }
        constructor(A, B) {
            this.low = A, this.high = B
        }
    }
    var k06 = 20,
        y06 = 160,
        LY0 = 2;
    class NT1 {
        startTime;
        _maxSize;
        _recordMinMax;
        _sum;
        _count;
        _zeroCount;
        _min;
        _max;
        _positive;
        _negative;
        _mapping;
        constructor(A = A, B = y06, Q = !0, Z = 0, D = 0, G = 0, F = Number.POSITIVE_INFINITY, I = Number.NEGATIVE_INFINITY, Y = new Fk2.Buckets, W = new Fk2.Buckets, J = Ik2.getMapping(k06)) {
            if (this.startTime = A, this._maxSize = B, this._recordMinMax = Q, this._sum = Z, this._count = D, this._zeroCount = G, this._min = F, this._max = I, this._positive = Y, this._negative = W, this._mapping = J, this._maxSize < LY0) S06.diag.warn(`Exponential Histogram Max Size set to ${this._maxSize},                 changing to the minimum size of: ${LY0}`), this._maxSize = LY0
        }
        record(A) {
            this.updateByIncrement(A, 1)
        }
        setStartTime(A) {
            this.startTime = A
        }
        toPointValue() {
            return {
                hasMinMax: this._recordMinMax,
                min: this.min,
                max: this.max,
                sum: this.sum,
                positive: {
                    offset: this.positive.offset,
                    bucketCounts: this.positive.counts()
                },
                negative: {
                    offset: this.negative.offset,
                    bucketCounts: this.negative.counts()
                },
                count: this.count,
                scale: this.scale,
                zeroCount: this.zeroCount
            }
        }
        get sum() {
            return this._sum
        }
        get min() {
            return this._min
        }
        get max() {
            return this._max
        }
        get count() {
            return this._count
        }
        get zeroCount() {
            return this._zeroCount
        }
        get scale() {
            if (this._count === this._zeroCount) return 0;
            return this._mapping.scale
        }
        get positive() {
            return this._positive
        }
        get negative() {
            return this._negative
        }
        updateByIncrement(A, B) {
            if (Number.isNaN(A)) return;
            if (A > this._max) this._max = A;
            if (A < this._min) this._min = A;
            if (this._count += B, A === 0) {
                this._zeroCount += B;
                return
            }
            if (this._sum += A * B, A > 0) this._updateBuckets(this._positive, A, B);
            else this._updateBuckets(this._negative, -A, B)
        }
        merge(A) {
            if (this._count === 0) this._min = A.min, this._max = A.max;
            else if (A.count !== 0) {
                if (A.min < this.min) this._min = A.min;
                if (A.max > this.max) this._max = A.max
            }
            this.startTime = A.startTime, this._sum += A.sum, this._count += A.count, this._zeroCount += A.zeroCount;
            let B = this._minScale(A);
            this._downscale(this.scale - B), this._mergeBuckets(this.positive, A, A.positive, B), this._mergeBuckets(this.negative, A, A.negative, B)
        }
        diff(A) {
            this._min = 1 / 0, this._max = -1 / 0, this._sum -= A.sum, this._count -= A.count, this._zeroCount -= A.zeroCount;
            let B = this._minScale(A);
            this._downscale(this.scale - B), this._diffBuckets(this.positive, A, A.positive, B), this._diffBuckets(this.negative, A, A.negative, B)
        }
        clone() {
            return new NT1(this.startTime, this._maxSize, this._recordMinMax, this._sum, this._count, this._zeroCount, this._min, this._max, this.positive.clone(), this.negative.clone(), this._mapping)
        }
        _updateBuckets(A, B, Q) {
            let Z = this._mapping.mapToIndex(B),
                D = !1,
                G = 0,
                F = 0;
            if (A.length === 0) A.indexStart = Z, A.indexEnd = A.indexStart, A.indexBase = A.indexStart;
            else if (Z < A.indexStart && A.indexEnd - Z >= this._maxSize) D = !0, F = Z, G = A.indexEnd;
            else if (Z > A.indexEnd && Z - A.indexStart >= this._maxSize) D = !0, F = A.indexStart, G = Z;
            if (D) {
                let I = this._changeScale(G, F);
                this._downscale(I), Z = this._mapping.mapToIndex(B)
            }
            this._incrementIndexBy(A, Z, Q)
        }
        _incrementIndexBy(A, B, Q) {
            if (Q === 0) return;
            if (A.length === 0) A.indexStart = A.indexEnd = A.indexBase = B;
            if (B < A.indexStart) {
                let D = A.indexEnd - B;
                if (D >= A.backing.length) this._grow(A, D + 1);
                A.indexStart = B
            } else if (B > A.indexEnd) {
                let D = B - A.indexStart;
                if (D >= A.backing.length) this._grow(A, D + 1);
                A.indexEnd = B
            }
            let Z = B - A.indexBase;
            if (Z < 0) Z += A.backing.length;
            A.incrementBucket(Z, Q)
        }
        _grow(A, B) {
            let Q = A.backing.length,
                Z = A.indexBase - A.indexStart,
                D = Q - Z,
                G = j06.nextGreaterSquare(B);
            if (G > this._maxSize) G = this._maxSize;
            let F = G - Z;
            A.backing.growTo(G, D, F)
        }
        _changeScale(A, B) {
            let Q = 0;
            while (A - B >= this._maxSize) A >>= 1, B >>= 1, Q++;
            return Q
        }
        _downscale(A) {
            if (A === 0) return;
            if (A < 0) throw new Error(`impossible change of scale: ${this.scale}`);
            let B = this._mapping.scale - A;
            this._positive.downscale(A), this._negative.downscale(A), this._mapping = Ik2.getMapping(B)
        }
        _minScale(A) {
            let B = Math.min(this.scale, A.scale),
                Q = Vt.combine(this._highLowAtScale(this.positive, this.scale, B), this._highLowAtScale(A.positive, A.scale, B)),
                Z = Vt.combine(this._highLowAtScale(this.negative, this.scale, B), this._highLowAtScale(A.negative, A.scale, B));
            return Math.min(B - this._changeScale(Q.high, Q.low), B - this._changeScale(Z.high, Z.low))
        }
        _highLowAtScale(A, B, Q) {
            if (A.length === 0) return new Vt(0, -1);
            let Z = B - Q;
            return new Vt(A.indexStart >> Z, A.indexEnd >> Z)
        }
        _mergeBuckets(A, B, Q, Z) {
            let D = Q.offset,
                G = B.scale - Z;
            for (let F = 0; F < Q.length; F++) this._incrementIndexBy(A, D + F >> G, Q.at(F))
        }
        _diffBuckets(A, B, Q, Z) {
            let D = Q.offset,
                G = B.scale - Z;
            for (let F = 0; F < Q.length; F++) {
                let Y = (D + F >> G) - A.indexBase;
                if (Y < 0) Y += A.backing.length;
                A.decrementBucket(Y, Q.at(F))
            }
            A.trim()
        }
    }
    Wk2.ExponentialHistogramAccumulation = NT1;
    class Yk2 {
        _maxSize;
        _recordMinMax;
        kind = P06.AggregatorKind.EXPONENTIAL_HISTOGRAM;
        constructor(A, B) {
            this._maxSize = A, this._recordMinMax = B
        }
        createAccumulation(A) {
            return new NT1(A, this._maxSize, this._recordMinMax)
        }
        merge(A, B) {
            let Q = B.clone();
            return Q.merge(A), Q
        }
        diff(A, B) {
            let Q = B.clone();
            return Q.diff(A), Q
        }
        toMetricData(A, B, Q, Z) {
            return {
                descriptor: A,
                aggregationTemporality: B,
                dataPointType: R31.DataPointType.EXPONENTIAL_HISTOGRAM,
                dataPoints: Q.map(([D, G]) => {
                    let F = G.toPointValue(),
                        I = A.type === R31.InstrumentType.GAUGE || A.type === R31.InstrumentType.UP_DOWN_COUNTER || A.type === R31.InstrumentType.OBSERVABLE_GAUGE || A.type === R31.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
                    return {
                        attributes: D,
                        startTime: G.startTime,
                        endTime: Z,
                        value: {
                            min: F.hasMinMax ? F.min : void 0,
                            max: F.hasMinMax ? F.max : void 0,
                            sum: !I ? F.sum : void 0,
                            positive: {
                                offset: F.positive.offset,
                                bucketCounts: F.positive.bucketCounts
                            },
                            negative: {
                                offset: F.negative.offset,
                                bucketCounts: F.negative.bucketCounts
                            },
                            count: F.count,
                            scale: F.scale,
                            zeroCount: F.zeroCount
                        }
                    }
                })
            }
        }
    }
    Wk2.ExponentialHistogramAggregator = Yk2
});
var O31 = E((Vk2) => {
    Object.defineProperty(Vk2, "__esModule", {
        value: !0
    });
    Vk2.isTracingSuppressed = Vk2.unsuppressTracing = Vk2.suppressTracing = void 0;
    var x06 = XQ(),
        MY0 = x06.createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");

    function v06(A) {
        return A.setValue(MY0, !0)
    }
    Vk2.suppressTracing = v06;

    function b06(A) {
        return A.deleteValue(MY0)
    }
    Vk2.unsuppressTracing = b06;

    function f06(A) {
        return A.getValue(MY0) === !0
    }
    Vk2.isTracingSuppressed = f06
});
var RY0 = E((Kk2) => {
    Object.defineProperty(Kk2, "__esModule", {
        value: !0
    });
    Kk2.BAGGAGE_MAX_TOTAL_LENGTH = Kk2.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = Kk2.BAGGAGE_MAX_NAME_VALUE_PAIRS = Kk2.BAGGAGE_HEADER = Kk2.BAGGAGE_ITEMS_SEPARATOR = Kk2.BAGGAGE_PROPERTIES_SEPARATOR = Kk2.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    Kk2.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    Kk2.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    Kk2.BAGGAGE_ITEMS_SEPARATOR = ",";
    Kk2.BAGGAGE_HEADER = "baggage";
    Kk2.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    Kk2.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    Kk2.BAGGAGE_MAX_TOTAL_LENGTH = 8192
});
var OY0 = E((Ek2) => {
    Object.defineProperty(Ek2, "__esModule", {
        value: !0
    });
    Ek2.parseKeyPairsIntoRecord = Ek2.parsePairKeyValue = Ek2.getKeyPairs = Ek2.serializeKeyPairs = void 0;
    var i06 = XQ(),
        du = RY0();

    function n06(A) {
        return A.reduce((B, Q) => {
            let Z = `${B}${B!==""?du.BAGGAGE_ITEMS_SEPARATOR:""}${Q}`;
            return Z.length > du.BAGGAGE_MAX_TOTAL_LENGTH ? B : Z
        }, "")
    }
    Ek2.serializeKeyPairs = n06;

    function a06(A) {
        return A.getAllEntries().map(([B, Q]) => {
            let Z = `${encodeURIComponent(B)}=${encodeURIComponent(Q.value)}`;
            if (Q.metadata !== void 0) Z += du.BAGGAGE_PROPERTIES_SEPARATOR + Q.metadata.toString();
            return Z
        })
    }
    Ek2.getKeyPairs = a06;

    function zk2(A) {
        let B = A.split(du.BAGGAGE_PROPERTIES_SEPARATOR);
        if (B.length <= 0) return;
        let Q = B.shift();
        if (!Q) return;
        let Z = Q.indexOf(du.BAGGAGE_KEY_PAIR_SEPARATOR);
        if (Z <= 0) return;
        let D = decodeURIComponent(Q.substring(0, Z).trim()),
            G = decodeURIComponent(Q.substring(Z + 1).trim()),
            F;
        if (B.length > 0) F = i06.baggageEntryMetadataFromString(B.join(du.BAGGAGE_PROPERTIES_SEPARATOR));
        return {
            key: D,
            value: G,
            metadata: F
        }
    }
    Ek2.parsePairKeyValue = zk2;

    function s06(A) {
        if (typeof A !== "string" || A.length === 0) return {};
        return A.split(du.BAGGAGE_ITEMS_SEPARATOR).map((B) => {
            return zk2(B)
        }).filter((B) => B !== void 0 && B.value.length > 0).reduce((B, Q) => {
            return B[Q.key] = Q.value, B
        }, {})
    }
    Ek2.parseKeyPairsIntoRecord = s06
});
var Nk2 = E(($k2) => {
    Object.defineProperty($k2, "__esModule", {
        value: !0
    });
    $k2.W3CBaggagePropagator = void 0;
    var TY0 = XQ(),
        e06 = O31(),
        cu = RY0(),
        PY0 = OY0();
    class wk2 {
        inject(A, B, Q) {
            let Z = TY0.propagation.getBaggage(A);
            if (!Z || e06.isTracingSuppressed(A)) return;
            let D = PY0.getKeyPairs(Z).filter((F) => {
                    return F.length <= cu.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS
                }).slice(0, cu.BAGGAGE_MAX_NAME_VALUE_PAIRS),
                G = PY0.serializeKeyPairs(D);
            if (G.length > 0) Q.set(B, cu.BAGGAGE_HEADER, G)
        }
        extract(A, B, Q) {
            let Z = Q.get(B, cu.BAGGAGE_HEADER),
                D = Array.isArray(Z) ? Z.join(cu.BAGGAGE_ITEMS_SEPARATOR) : Z;
            if (!D) return A;
            let G = {};
            if (D.length === 0) return A;
            if (D.split(cu.BAGGAGE_ITEMS_SEPARATOR).forEach((I) => {
                    let Y = PY0.parsePairKeyValue(I);
                    if (Y) {
                        let W = {
                            value: Y.value
                        };
                        if (Y.metadata) W.metadata = Y.metadata;
                        G[Y.key] = W
                    }
                }), Object.entries(G).length === 0) return A;
            return TY0.propagation.setBaggage(A, TY0.propagation.createBaggage(G))
        }
        fields() {
            return [cu.BAGGAGE_HEADER]
        }
    }
    $k2.W3CBaggagePropagator = wk2
});
var Ok2 = E((Mk2) => {
    Object.defineProperty(Mk2, "__esModule", {
        value: !0
    });
    Mk2.AnchoredClock = void 0;
    class Lk2 {
        _monotonicClock;
        _epochMillis;
        _performanceMillis;
        constructor(A, B) {
            this._monotonicClock = B, this._epochMillis = A.now(), this._performanceMillis = B.now()
        }
        now() {
            let A = this._monotonicClock.now() - this._performanceMillis;
            return this._epochMillis + A
        }
    }
    Mk2.AnchoredClock = Lk2
});