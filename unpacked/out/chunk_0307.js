/* chunk:307 bytes:[7150547, 7170031) size:19484 source:unpacked-cli.js */
var pg2 = E((eL) => {
    Object.defineProperty(eL, "__esModule", {
        value: !0
    });
    eL.unrefTimer = eL.SDK_INFO = eL.otperformance = eL._globalThis = eL.getStringListFromEnv = eL.getNumberFromEnv = eL.getBooleanFromEnv = eL.getStringFromEnv = void 0;
    var MT1 = pk2();
    Object.defineProperty(eL, "getStringFromEnv", {
        enumerable: !0,
        get: function() {
            return MT1.getStringFromEnv
        }
    });
    Object.defineProperty(eL, "getBooleanFromEnv", {
        enumerable: !0,
        get: function() {
            return MT1.getBooleanFromEnv
        }
    });
    Object.defineProperty(eL, "getNumberFromEnv", {
        enumerable: !0,
        get: function() {
            return MT1.getNumberFromEnv
        }
    });
    Object.defineProperty(eL, "getStringListFromEnv", {
        enumerable: !0,
        get: function() {
            return MT1.getStringListFromEnv
        }
    });
    var AZ6 = ak2();
    Object.defineProperty(eL, "_globalThis", {
        enumerable: !0,
        get: function() {
            return AZ6._globalThis
        }
    });
    var BZ6 = ok2();
    Object.defineProperty(eL, "otperformance", {
        enumerable: !0,
        get: function() {
            return BZ6.otperformance
        }
    });
    var QZ6 = mg2();
    Object.defineProperty(eL, "SDK_INFO", {
        enumerable: !0,
        get: function() {
            return QZ6.SDK_INFO
        }
    });
    var ZZ6 = lg2();
    Object.defineProperty(eL, "unrefTimer", {
        enumerable: !0,
        get: function() {
            return ZZ6.unrefTimer
        }
    })
});
var kY0 = E((AM) => {
    Object.defineProperty(AM, "__esModule", {
        value: !0
    });
    AM.getStringListFromEnv = AM.getNumberFromEnv = AM.getStringFromEnv = AM.getBooleanFromEnv = AM.unrefTimer = AM.otperformance = AM._globalThis = AM.SDK_INFO = void 0;
    var t_ = pg2();
    Object.defineProperty(AM, "SDK_INFO", {
        enumerable: !0,
        get: function() {
            return t_.SDK_INFO
        }
    });
    Object.defineProperty(AM, "_globalThis", {
        enumerable: !0,
        get: function() {
            return t_._globalThis
        }
    });
    Object.defineProperty(AM, "otperformance", {
        enumerable: !0,
        get: function() {
            return t_.otperformance
        }
    });
    Object.defineProperty(AM, "unrefTimer", {
        enumerable: !0,
        get: function() {
            return t_.unrefTimer
        }
    });
    Object.defineProperty(AM, "getBooleanFromEnv", {
        enumerable: !0,
        get: function() {
            return t_.getBooleanFromEnv
        }
    });
    Object.defineProperty(AM, "getStringFromEnv", {
        enumerable: !0,
        get: function() {
            return t_.getStringFromEnv
        }
    });
    Object.defineProperty(AM, "getNumberFromEnv", {
        enumerable: !0,
        get: function() {
            return t_.getNumberFromEnv
        }
    });
    Object.defineProperty(AM, "getStringListFromEnv", {
        enumerable: !0,
        get: function() {
            return t_.getStringListFromEnv
        }
    })
});
var og2 = E((sg2) => {
    Object.defineProperty(sg2, "__esModule", {
        value: !0
    });
    sg2.addHrTimes = sg2.isTimeInput = sg2.isTimeInputHrTime = sg2.hrTimeToMicroseconds = sg2.hrTimeToMilliseconds = sg2.hrTimeToNanoseconds = sg2.hrTimeToTimeStamp = sg2.hrTimeDuration = sg2.timeInputToHrTime = sg2.hrTime = sg2.getTimeOrigin = sg2.millisToHrTime = void 0;
    var yY0 = kY0(),
        ig2 = 9,
        FZ6 = 6,
        IZ6 = Math.pow(10, FZ6),
        RT1 = Math.pow(10, ig2);

    function P31(A) {
        let B = A / 1000,
            Q = Math.trunc(B),
            Z = Math.round(A % 1000 * IZ6);
        return [Q, Z]
    }
    sg2.millisToHrTime = P31;

    function _Y0() {
        let A = yY0.otperformance.timeOrigin;
        if (typeof A !== "number") {
            let B = yY0.otperformance;
            A = B.timing && B.timing.fetchStart
        }
        return A
    }
    sg2.getTimeOrigin = _Y0;

    function ng2(A) {
        let B = P31(_Y0()),
            Q = P31(typeof A === "number" ? A : yY0.otperformance.now());
        return ag2(B, Q)
    }
    sg2.hrTime = ng2;

    function YZ6(A) {
        if (xY0(A)) return A;
        else if (typeof A === "number")
            if (A < _Y0()) return ng2(A);
            else return P31(A);
        else if (A instanceof Date) return P31(A.getTime());
        else throw TypeError("Invalid input type")
    }
    sg2.timeInputToHrTime = YZ6;

    function WZ6(A, B) {
        let Q = B[0] - A[0],
            Z = B[1] - A[1];
        if (Z < 0) Q -= 1, Z += RT1;
        return [Q, Z]
    }
    sg2.hrTimeDuration = WZ6;

    function JZ6(A) {
        let B = ig2,
            Q = `${"0".repeat(B)}${A[1]}Z`,
            Z = Q.substring(Q.length - B - 1);
        return new Date(A[0] * 1000).toISOString().replace("000Z", Z)
    }
    sg2.hrTimeToTimeStamp = JZ6;

    function XZ6(A) {
        return A[0] * RT1 + A[1]
    }
    sg2.hrTimeToNanoseconds = XZ6;

    function VZ6(A) {
        return A[0] * 1000 + A[1] / 1e6
    }
    sg2.hrTimeToMilliseconds = VZ6;

    function CZ6(A) {
        return A[0] * 1e6 + A[1] / 1000
    }
    sg2.hrTimeToMicroseconds = CZ6;

    function xY0(A) {
        return Array.isArray(A) && A.length === 2 && typeof A[0] === "number" && typeof A[1] === "number"
    }
    sg2.isTimeInputHrTime = xY0;

    function KZ6(A) {
        return xY0(A) || typeof A === "number" || A instanceof Date
    }
    sg2.isTimeInput = KZ6;

    function ag2(A, B) {
        let Q = [A[0] + B[0], A[1] + B[1]];
        if (Q[1] >= RT1) Q[1] -= RT1, Q[0] += 1;
        return Q
    }
    sg2.addHrTimes = ag2
});
var eg2 = E((tg2) => {
    Object.defineProperty(tg2, "__esModule", {
        value: !0
    });
    tg2.ExportResultCode = void 0;
    var OZ6;
    (function(A) {
        A[A.SUCCESS = 0] = "SUCCESS", A[A.FAILED = 1] = "FAILED"
    })(OZ6 = tg2.ExportResultCode || (tg2.ExportResultCode = {}))
});
var Du2 = E((Qu2) => {
    Object.defineProperty(Qu2, "__esModule", {
        value: !0
    });
    Qu2.CompositePropagator = void 0;
    var Au2 = XQ();
    class Bu2 {
        _propagators;
        _fields;
        constructor(A = {}) {
            this._propagators = A.propagators ?? [], this._fields = Array.from(new Set(this._propagators.map((B) => typeof B.fields === "function" ? B.fields() : []).reduce((B, Q) => B.concat(Q), [])))
        }
        inject(A, B, Q) {
            for (let Z of this._propagators) try {
                Z.inject(A, B, Q)
            } catch (D) {
                Au2.diag.warn(`Failed to inject with ${Z.constructor.name}. Err: ${D.message}`)
            }
        }
        extract(A, B, Q) {
            return this._propagators.reduce((Z, D) => {
                try {
                    return D.extract(Z, B, Q)
                } catch (G) {
                    Au2.diag.warn(`Failed to extract with ${D.constructor.name}. Err: ${G.message}`)
                }
                return Z
            }, A)
        }
        fields() {
            return this._fields.slice()
        }
    }
    Qu2.CompositePropagator = Bu2
});
var Iu2 = E((Gu2) => {
    Object.defineProperty(Gu2, "__esModule", {
        value: !0
    });
    Gu2.validateValue = Gu2.validateKey = void 0;
    var bY0 = "[_0-9a-z-*/]",
        TZ6 = `[a-z]${bY0}{0,255}`,
        PZ6 = `[a-z0-9]${bY0}{0,240}@[a-z]${bY0}{0,13}`,
        SZ6 = new RegExp(`^(?:${TZ6}|${PZ6})$`),
        jZ6 = /^[ -~]{0,255}[!-~]$/,
        kZ6 = /,|=/;

    function yZ6(A) {
        return SZ6.test(A)
    }
    Gu2.validateKey = yZ6;

    function _Z6(A) {
        return jZ6.test(A) && !kZ6.test(A)
    }
    Gu2.validateValue = _Z6
});
var hY0 = E((Vu2) => {
    Object.defineProperty(Vu2, "__esModule", {
        value: !0
    });
    Vu2.TraceState = void 0;
    var Yu2 = Iu2(),
        Wu2 = 32,
        vZ6 = 512,
        Ju2 = ",",
        Xu2 = "=";
    class fY0 {
        _internalState = new Map;
        constructor(A) {
            if (A) this._parse(A)
        }
        set(A, B) {
            let Q = this._clone();
            if (Q._internalState.has(A)) Q._internalState.delete(A);
            return Q._internalState.set(A, B), Q
        }
        unset(A) {
            let B = this._clone();
            return B._internalState.delete(A), B
        }
        get(A) {
            return this._internalState.get(A)
        }
        serialize() {
            return this._keys().reduce((A, B) => {
                return A.push(B + Xu2 + this.get(B)), A
            }, []).join(Ju2)
        }
        _parse(A) {
            if (A.length > vZ6) return;
            if (this._internalState = A.split(Ju2).reverse().reduce((B, Q) => {
                    let Z = Q.trim(),
                        D = Z.indexOf(Xu2);
                    if (D !== -1) {
                        let G = Z.slice(0, D),
                            F = Z.slice(D + 1, Q.length);
                        if (Yu2.validateKey(G) && Yu2.validateValue(F)) B.set(G, F)
                    }
                    return B
                }, new Map), this._internalState.size > Wu2) this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, Wu2))
        }
        _keys() {
            return Array.from(this._internalState.keys()).reverse()
        }
        _clone() {
            let A = new fY0;
            return A._internalState = new Map(this._internalState), A
        }
    }
    Vu2.TraceState = fY0
});
var Uu2 = E((zu2) => {
    Object.defineProperty(zu2, "__esModule", {
        value: !0
    });
    zu2.W3CTraceContextPropagator = zu2.parseTraceParent = zu2.TRACE_STATE_HEADER = zu2.TRACE_PARENT_HEADER = void 0;
    var OT1 = XQ(),
        bZ6 = O31(),
        fZ6 = hY0();
    zu2.TRACE_PARENT_HEADER = "traceparent";
    zu2.TRACE_STATE_HEADER = "tracestate";
    var hZ6 = "00",
        gZ6 = "(?!ff)[\\da-f]{2}",
        uZ6 = "(?![0]{32})[\\da-f]{32}",
        mZ6 = "(?![0]{16})[\\da-f]{16}",
        dZ6 = "[\\da-f]{2}",
        cZ6 = new RegExp(`^\\s?(${gZ6})-(${uZ6})-(${mZ6})-(${dZ6})(-.*)?\\s?$`);

    function Ku2(A) {
        let B = cZ6.exec(A);
        if (!B) return null;
        if (B[1] === "00" && B[5]) return null;
        return {
            traceId: B[2],
            spanId: B[3],
            traceFlags: parseInt(B[4], 16)
        }
    }
    zu2.parseTraceParent = Ku2;
    class Hu2 {
        inject(A, B, Q) {
            let Z = OT1.trace.getSpanContext(A);
            if (!Z || bZ6.isTracingSuppressed(A) || !OT1.isSpanContextValid(Z)) return;
            let D = `${hZ6}-${Z.traceId}-${Z.spanId}-0${Number(Z.traceFlags||OT1.TraceFlags.NONE).toString(16)}`;
            if (Q.set(B, zu2.TRACE_PARENT_HEADER, D), Z.traceState) Q.set(B, zu2.TRACE_STATE_HEADER, Z.traceState.serialize())
        }
        extract(A, B, Q) {
            let Z = Q.get(B, zu2.TRACE_PARENT_HEADER);
            if (!Z) return A;
            let D = Array.isArray(Z) ? Z[0] : Z;
            if (typeof D !== "string") return A;
            let G = Ku2(D);
            if (!G) return A;
            G.isRemote = !0;
            let F = Q.get(B, zu2.TRACE_STATE_HEADER);
            if (F) {
                let I = Array.isArray(F) ? F.join(",") : F;
                G.traceState = new fZ6.TraceState(typeof I === "string" ? I : void 0)
            }
            return OT1.trace.setSpanContext(A, G)
        }
        fields() {
            return [zu2.TRACE_PARENT_HEADER, zu2.TRACE_STATE_HEADER]
        }
    }
    zu2.W3CTraceContextPropagator = Hu2
});
var Nu2 = E(($u2) => {
    Object.defineProperty($u2, "__esModule", {
        value: !0
    });
    $u2.getRPCMetadata = $u2.deleteRPCMetadata = $u2.setRPCMetadata = $u2.RPCType = void 0;
    var pZ6 = XQ(),
        gY0 = pZ6.createContextKey("OpenTelemetry SDK Context Key RPC_METADATA"),
        iZ6;
    (function(A) {
        A.HTTP = "http"
    })(iZ6 = $u2.RPCType || ($u2.RPCType = {}));

    function nZ6(A, B) {
        return A.setValue(gY0, B)
    }
    $u2.setRPCMetadata = nZ6;

    function aZ6(A) {
        return A.deleteValue(gY0)
    }
    $u2.deleteRPCMetadata = aZ6;

    function sZ6(A) {
        return A.getValue(gY0)
    }
    $u2.getRPCMetadata = sZ6
});
var Su2 = E((Tu2) => {
    Object.defineProperty(Tu2, "__esModule", {
        value: !0
    });
    Tu2.isPlainObject = void 0;
    var tZ6 = "[object Object]",
        eZ6 = "[object Null]",
        AD6 = "[object Undefined]",
        BD6 = Function.prototype,
        Lu2 = BD6.toString,
        QD6 = Lu2.call(Object),
        ZD6 = Object.getPrototypeOf,
        Mu2 = Object.prototype,
        Ru2 = Mu2.hasOwnProperty,
        nu = Symbol ? Symbol.toStringTag : void 0,
        Ou2 = Mu2.toString;

    function DD6(A) {
        if (!GD6(A) || FD6(A) !== tZ6) return !1;
        let B = ZD6(A);
        if (B === null) return !0;
        let Q = Ru2.call(B, "constructor") && B.constructor;
        return typeof Q == "function" && Q instanceof Q && Lu2.call(Q) === QD6
    }
    Tu2.isPlainObject = DD6;

    function GD6(A) {
        return A != null && typeof A == "object"
    }

    function FD6(A) {
        if (A == null) return A === void 0 ? AD6 : eZ6;
        return nu && nu in Object(A) ? ID6(A) : YD6(A)
    }

    function ID6(A) {
        let B = Ru2.call(A, nu),
            Q = A[nu],
            Z = !1;
        try {
            A[nu] = void 0, Z = !0
        } catch (G) {}
        let D = Ou2.call(A);
        if (Z)
            if (B) A[nu] = Q;
            else delete A[nu];
        return D
    }

    function YD6(A) {
        return Ou2.call(A)
    }
});
var bu2 = E((xu2) => {
    Object.defineProperty(xu2, "__esModule", {
        value: !0
    });
    xu2.merge = void 0;
    var ju2 = Su2(),
        WD6 = 20;

    function JD6(...A) {
        let B = A.shift(),
            Q = new WeakMap;
        while (A.length > 0) B = yu2(B, A.shift(), 0, Q);
        return B
    }
    xu2.merge = JD6;

    function uY0(A) {
        if (jT1(A)) return A.slice();
        return A
    }

    function yu2(A, B, Q = 0, Z) {
        let D;
        if (Q > WD6) return;
        if (Q++, ST1(A) || ST1(B) || _u2(B)) D = uY0(B);
        else if (jT1(A)) {
            if (D = A.slice(), jT1(B))
                for (let G = 0, F = B.length; G < F; G++) D.push(uY0(B[G]));
            else if (S31(B)) {
                let G = Object.keys(B);
                for (let F = 0, I = G.length; F < I; F++) {
                    let Y = G[F];
                    D[Y] = uY0(B[Y])
                }
            }
        } else if (S31(A))
            if (S31(B)) {
                if (!XD6(A, B)) return B;
                D = Object.assign({}, A);
                let G = Object.keys(B);
                for (let F = 0, I = G.length; F < I; F++) {
                    let Y = G[F],
                        W = B[Y];
                    if (ST1(W))
                        if (typeof W === "undefined") delete D[Y];
                        else D[Y] = W;
                    else {
                        let J = D[Y],
                            X = W;
                        if (ku2(A, Y, Z) || ku2(B, Y, Z)) delete D[Y];
                        else {
                            if (S31(J) && S31(X)) {
                                let V = Z.get(J) || [],
                                    C = Z.get(X) || [];
                                V.push({
                                    obj: A,
                                    key: Y
                                }), C.push({
                                    obj: B,
                                    key: Y
                                }), Z.set(J, V), Z.set(X, C)
                            }
                            D[Y] = yu2(D[Y], W, Q, Z)
                        }
                    }
                }
            } else D = B;
        return D
    }

    function ku2(A, B, Q) {
        let Z = Q.get(A[B]) || [];
        for (let D = 0, G = Z.length; D < G; D++) {
            let F = Z[D];
            if (F.key === B && F.obj === A) return !0
        }
        return !1
    }

    function jT1(A) {
        return Array.isArray(A)
    }

    function _u2(A) {
        return typeof A === "function"
    }

    function S31(A) {
        return !ST1(A) && !jT1(A) && !_u2(A) && typeof A === "object"
    }

    function ST1(A) {
        return typeof A === "string" || typeof A === "number" || typeof A === "boolean" || typeof A === "undefined" || A instanceof Date || A instanceof RegExp || A === null
    }

    function XD6(A, B) {
        if (!ju2.isPlainObject(A) || !ju2.isPlainObject(B)) return !1;
        return !0
    }
});
var gu2 = E((fu2) => {
    Object.defineProperty(fu2, "__esModule", {
        value: !0
    });
    fu2.callWithTimeout = fu2.TimeoutError = void 0;
    class kT1 extends Error {
        constructor(A) {
            super(A);
            Object.setPrototypeOf(this, kT1.prototype)
        }
    }
    fu2.TimeoutError = kT1;

    function VD6(A, B) {
        let Q, Z = new Promise(function D(G, F) {
            Q = setTimeout(function I() {
                F(new kT1("Operation timed out."))
            }, B)
        });
        return Promise.race([A, Z]).then((D) => {
            return clearTimeout(Q), D
        }, (D) => {
            throw clearTimeout(Q), D
        })
    }
    fu2.callWithTimeout = VD6
});
var cu2 = E((mu2) => {
    Object.defineProperty(mu2, "__esModule", {
        value: !0
    });
    mu2.isUrlIgnored = mu2.urlMatches = void 0;

    function uu2(A, B) {
        if (typeof B === "string") return A === B;
        else return !!A.match(B)
    }
    mu2.urlMatches = uu2;

    function KD6(A, B) {
        if (!B) return !1;
        for (let Q of B)
            if (uu2(A, Q)) return !0;
        return !1
    }
    mu2.isUrlIgnored = KD6
});
var nu2 = E((pu2) => {
    Object.defineProperty(pu2, "__esModule", {
        value: !0
    });
    pu2.Deferred = void 0;
    class lu2 {
        _promise;
        _resolve;
        _reject;
        constructor() {
            this._promise = new Promise((A, B) => {
                this._resolve = A, this._reject = B
            })
        }
        get promise() {
            return this._promise
        }
        resolve(A) {
            this._resolve(A)
        }
        reject(A) {
            this._reject(A)
        }
    }
    pu2.Deferred = lu2
});
var ou2 = E((su2) => {
    Object.defineProperty(su2, "__esModule", {
        value: !0
    });
    su2.BindOnceFuture = void 0;
    var zD6 = nu2();
    class au2 {
        _callback;
        _that;
        _isCalled = !1;
        _deferred = new zD6.Deferred;
        constructor(A, B) {
            this._callback = A, this._that = B
        }
        get isCalled() {
            return this._isCalled
        }
        get promise() {
            return this._deferred.promise
        }
        call(...A) {
            if (!this._isCalled) {
                this._isCalled = !0;
                try {
                    Promise.resolve(this._callback.call(this._that, ...A)).then((B) => this._deferred.resolve(B), (B) => this._deferred.reject(B))
                } catch (B) {
                    this._deferred.reject(B)
                }
            }
            return this._deferred.promise
        }
    }
    su2.BindOnceFuture = au2
});