/* chunk:6 bytes:[90312, 109960) size:19648 source:unpacked-cli.js */
var sv0 = E((av0) => {
    Object.defineProperty(av0, "__esModule", {
        value: !0
    });

    function F49(A) {
        let B = [],
            Q = {};
        return {
            add(Z, D) {
                while (B.length >= A) {
                    let G = B.shift();
                    if (G !== void 0) delete Q[G]
                }
                if (Q[Z]) this.delete(Z);
                B.push(Z), Q[Z] = D
            },
            clear() {
                Q = {}, B = []
            },
            get(Z) {
                return Q[Z]
            },
            size() {
                return B.length
            },
            delete(Z) {
                if (!Q[Z]) return !1;
                delete Q[Z];
                for (let D = 0; D < B.length; D++)
                    if (B[D] === Z) {
                        B.splice(D, 1);
                        break
                    } return !0
            }
        }
    }
    av0.makeFifoCache = F49
});
var ev0 = E((tv0) => {
    Object.defineProperty(tv0, "__esModule", {
        value: !0
    });
    var Qc1 = iH(),
        rv0 = _21(),
        Y49 = f21(),
        W49 = nH();

    function Zc1(A, B) {
        return A(B.stack || "", 1)
    }

    function ov0(A, B) {
        let Q = {
                type: B.name || B.constructor.name,
                value: B.message
            },
            Z = Zc1(A, B);
        if (Z.length) Q.stacktrace = {
            frames: Z
        };
        return Q
    }

    function J49(A) {
        if ("name" in A && typeof A.name === "string") {
            let B = `'${A.name}' captured as exception`;
            if ("message" in A && typeof A.message === "string") B += ` with message '${A.message}'`;
            return B
        } else if ("message" in A && typeof A.message === "string") return A.message;
        else return `Object captured as exception with keys: ${W49.extractExceptionKeysForMessage(A)}`
    }

    function X49(A, B, Q, Z) {
        let D = typeof A === "function" ? A().getClient() : A,
            G = Q,
            I = Z && Z.data && Z.data.mechanism || {
                handled: !0,
                type: "generic"
            },
            Y;
        if (!Qc1.isError(Q)) {
            if (Qc1.isPlainObject(Q)) {
                let J = D && D.getOptions().normalizeDepth;
                Y = {
                    ["__serialized__"]: Y49.normalizeToSize(Q, J)
                };
                let X = J49(Q);
                G = Z && Z.syntheticException || new Error(X), G.message = X
            } else G = Z && Z.syntheticException || new Error(Q), G.message = Q;
            I.synthetic = !0
        }
        let W = {
            exception: {
                values: [ov0(B, G)]
            }
        };
        if (Y) W.extra = Y;
        return rv0.addExceptionTypeValue(W, void 0, void 0), rv0.addExceptionMechanism(W, I), {
            ...W,
            event_id: Z && Z.event_id
        }
    }

    function V49(A, B, Q = "info", Z, D) {
        let G = {
            event_id: Z && Z.event_id,
            level: Q
        };
        if (D && Z && Z.syntheticException) {
            let F = Zc1(A, Z.syntheticException);
            if (F.length) G.exception = {
                values: [{
                    value: B,
                    stacktrace: {
                        frames: F
                    }
                }]
            }
        }
        if (Qc1.isParameterizedString(B)) {
            let {
                __sentry_template_string__: F,
                __sentry_template_values__: I
            } = B;
            return G.logentry = {
                message: F,
                params: I
            }, G
        }
        return G.message = B, G
    }
    tv0.eventFromMessage = V49;
    tv0.eventFromUnknownInput = X49;
    tv0.exceptionFromError = ov0;
    tv0.parseStackFrames = Zc1
});
var Bb0 = E((Ab0) => {
    Object.defineProperty(Ab0, "__esModule", {
        value: !0
    });
    var E49 = nH(),
        U49 = IJ1();

    function w49(A, B, Q, Z) {
        let D = A(),
            G = !1,
            F = !0;
        return setInterval(() => {
            let I = D.getTimeMs();
            if (G === !1 && I > B + Q) {
                if (G = !0, F) Z()
            }
            if (I < B + Q) G = !1
        }, 20), {
            poll: () => {
                D.reset()
            },
            enabled: (I) => {
                F = I
            }
        }
    }

    function $49(A, B, Q) {
        let Z = B ? B.replace(/^file:\/\//, "") : void 0,
            D = A.location.columnNumber ? A.location.columnNumber + 1 : void 0,
            G = A.location.lineNumber ? A.location.lineNumber + 1 : void 0;
        return E49.dropUndefinedKeys({
            filename: Z,
            module: Q(Z),
            function: A.functionName || "?",
            colno: D,
            lineno: G,
            in_app: Z ? U49.filenameIsInApp(Z) : void 0
        })
    }
    Ab0.callFrameToStackFrame = $49;
    Ab0.watchdogTimer = w49
});
var Db0 = E((Zb0) => {
    Object.defineProperty(Zb0, "__esModule", {
        value: !0
    });
    class Qb0 {
        constructor(A) {
            this._maxSize = A, this._cache = new Map
        }
        get size() {
            return this._cache.size
        }
        get(A) {
            let B = this._cache.get(A);
            if (B === void 0) return;
            return this._cache.delete(A), this._cache.set(A, B), B
        }
        set(A, B) {
            if (this._cache.size >= this._maxSize) this._cache.delete(this._cache.keys().next().value);
            this._cache.set(A, B)
        }
        remove(A) {
            let B = this._cache.get(A);
            if (B) this._cache.delete(A);
            return B
        }
        clear() {
            this._cache.clear()
        }
        keys() {
            return Array.from(this._cache.keys())
        }
        values() {
            let A = [];
            return this._cache.forEach((B) => A.push(B)), A
        }
    }
    Zb0.LRUMap = Qb0
});
var Dc1 = E((Gb0) => {
    Object.defineProperty(Gb0, "__esModule", {
        value: !0
    });

    function M49(A, B) {
        return A != null ? A : B()
    }
    Gb0._nullishCoalesce = M49
});
var Ib0 = E((Fb0) => {
    Object.defineProperty(Fb0, "__esModule", {
        value: !0
    });
    var O49 = Dc1();
    async function T49(A, B) {
        return O49._nullishCoalesce(A, B)
    }
    Fb0._asyncNullishCoalesce = T49
});
var Gc1 = E((Yb0) => {
    Object.defineProperty(Yb0, "__esModule", {
        value: !0
    });
    async function S49(A) {
        let B = void 0,
            Q = A[0],
            Z = 1;
        while (Z < A.length) {
            let D = A[Z],
                G = A[Z + 1];
            if (Z += 2, (D === "optionalAccess" || D === "optionalCall") && Q == null) return;
            if (D === "access" || D === "optionalAccess") B = Q, Q = await G(Q);
            else if (D === "call" || D === "optionalCall") Q = await G((...F) => Q.call(B, ...F)), B = void 0
        }
        return Q
    }
    Yb0._asyncOptionalChain = S49
});
var Jb0 = E((Wb0) => {
    Object.defineProperty(Wb0, "__esModule", {
        value: !0
    });
    var k49 = Gc1();
    async function y49(A) {
        let B = await k49._asyncOptionalChain(A);
        return B == null ? !0 : B
    }
    Wb0._asyncOptionalChainDelete = y49
});
var Fc1 = E((Xb0) => {
    Object.defineProperty(Xb0, "__esModule", {
        value: !0
    });

    function x49(A) {
        let B = void 0,
            Q = A[0],
            Z = 1;
        while (Z < A.length) {
            let D = A[Z],
                G = A[Z + 1];
            if (Z += 2, (D === "optionalAccess" || D === "optionalCall") && Q == null) return;
            if (D === "access" || D === "optionalAccess") B = Q, Q = G(Q);
            else if (D === "call" || D === "optionalCall") Q = G((...F) => Q.call(B, ...F)), B = void 0
        }
        return Q
    }
    Xb0._optionalChain = x49
});
var Cb0 = E((Vb0) => {
    Object.defineProperty(Vb0, "__esModule", {
        value: !0
    });
    var b49 = Fc1();

    function f49(A) {
        let B = b49._optionalChain(A);
        return B == null ? !0 : B
    }
    Vb0._optionalChainDelete = f49
});
var Hb0 = E((Kb0) => {
    Object.defineProperty(Kb0, "__esModule", {
        value: !0
    });

    function g49(A) {
        return A.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
    }
    Kb0.escapeStringForRegex = g49
});
var UA = E((Vc1) => {
    Object.defineProperty(Vc1, "__esModule", {
        value: !0
    });
    var m49 = m_0(),
        MJ1 = Jd1(),
        Ic1 = Kd1(),
        d49 = Hd1(),
        Yc1 = vW(),
        c49 = dx0(),
        bW = iH(),
        l49 = nx0(),
        RJ1 = Bw(),
        p49 = cd1(),
        aj = _21(),
        Wc1 = dd1(),
        OJ1 = f21(),
        CO = nH(),
        Rf = Dv0(),
        i49 = Iv0(),
        Of = zv0(),
        Jc1 = $v0(),
        g21 = YJ1(),
        u21 = k21(),
        sj = Pd1(),
        Xc1 = id1(),
        m21 = rd1(),
        d21 = _v0(),
        zb0 = md1(),
        tq = Bc1(),
        n49 = hv0(),
        c21 = cv0(),
        kl = td1(),
        TJ1 = ad1(),
        a49 = nv0(),
        s49 = sv0(),
        PJ1 = ev0(),
        Eb0 = Bb0(),
        r49 = Db0(),
        o49 = Ib0(),
        t49 = Gc1(),
        e49 = Jb0(),
        A69 = Dc1(),
        B69 = Fc1(),
        Q69 = Cb0(),
        Z69 = $d1(),
        D69 = Rd1(),
        Ub0 = gd1(),
        G69 = jd1(),
        F69 = hd1(),
        I69 = _d1(),
        Y69 = bd1(),
        W69 = XO(),
        J69 = IJ1(),
        X69 = Hb0(),
        V69 = fd1();
    Vc1.applyAggregateErrorsToEvent = m49.applyAggregateErrorsToEvent;
    Vc1.getComponentName = MJ1.getComponentName;
    Vc1.getDomElement = MJ1.getDomElement;
    Vc1.getLocationHref = MJ1.getLocationHref;
    Vc1.htmlTreeAsString = MJ1.htmlTreeAsString;
    Vc1.dsnFromString = Ic1.dsnFromString;
    Vc1.dsnToString = Ic1.dsnToString;
    Vc1.makeDsn = Ic1.makeDsn;
    Vc1.SentryError = d49.SentryError;
    Vc1.GLOBAL_OBJ = Yc1.GLOBAL_OBJ;
    Vc1.getGlobalObject = Yc1.getGlobalObject;
    Vc1.getGlobalSingleton = Yc1.getGlobalSingleton;
    Vc1.addInstrumentationHandler = c49.addInstrumentationHandler;
    Vc1.isDOMError = bW.isDOMError;
    Vc1.isDOMException = bW.isDOMException;
    Vc1.isElement = bW.isElement;
    Vc1.isError = bW.isError;
    Vc1.isErrorEvent = bW.isErrorEvent;
    Vc1.isEvent = bW.isEvent;
    Vc1.isInstanceOf = bW.isInstanceOf;
    Vc1.isNaN = bW.isNaN;
    Vc1.isParameterizedString = bW.isParameterizedString;
    Vc1.isPlainObject = bW.isPlainObject;
    Vc1.isPrimitive = bW.isPrimitive;
    Vc1.isRegExp = bW.isRegExp;
    Vc1.isString = bW.isString;
    Vc1.isSyntheticEvent = bW.isSyntheticEvent;
    Vc1.isThenable = bW.isThenable;
    Vc1.isVueViewModel = bW.isVueViewModel;
    Vc1.isBrowser = l49.isBrowser;
    Vc1.CONSOLE_LEVELS = RJ1.CONSOLE_LEVELS;
    Vc1.consoleSandbox = RJ1.consoleSandbox;
    Vc1.logger = RJ1.logger;
    Vc1.originalConsoleMethods = RJ1.originalConsoleMethods;
    Vc1.memoBuilder = p49.memoBuilder;
    Vc1.addContextToFrame = aj.addContextToFrame;
    Vc1.addExceptionMechanism = aj.addExceptionMechanism;
    Vc1.addExceptionTypeValue = aj.addExceptionTypeValue;
    Vc1.arrayify = aj.arrayify;
    Vc1.checkOrSetAlreadyCaught = aj.checkOrSetAlreadyCaught;
    Vc1.getEventDescription = aj.getEventDescription;
    Vc1.parseSemver = aj.parseSemver;
    Vc1.uuid4 = aj.uuid4;
    Vc1.dynamicRequire = Wc1.dynamicRequire;
    Vc1.isNodeEnv = Wc1.isNodeEnv;
    Vc1.loadModule = Wc1.loadModule;
    Vc1.normalize = OJ1.normalize;
    Vc1.normalizeToSize = OJ1.normalizeToSize;
    Vc1.normalizeUrlToBase = OJ1.normalizeUrlToBase;
    Vc1.walk = OJ1.walk;
    Vc1.addNonEnumerableProperty = CO.addNonEnumerableProperty;
    Vc1.convertToPlainObject = CO.convertToPlainObject;
    Vc1.dropUndefinedKeys = CO.dropUndefinedKeys;
    Vc1.extractExceptionKeysForMessage = CO.extractExceptionKeysForMessage;
    Vc1.fill = CO.fill;
    Vc1.getOriginalFunction = CO.getOriginalFunction;
    Vc1.markFunctionWrapped = CO.markFunctionWrapped;
    Vc1.objectify = CO.objectify;
    Vc1.urlEncode = CO.urlEncode;
    Vc1.basename = Rf.basename;
    Vc1.dirname = Rf.dirname;
    Vc1.isAbsolute = Rf.isAbsolute;
    Vc1.join = Rf.join;
    Vc1.normalizePath = Rf.normalizePath;
    Vc1.relative = Rf.relative;
    Vc1.resolve = Rf.resolve;
    Vc1.makePromiseBuffer = i49.makePromiseBuffer;
    Vc1.DEFAULT_USER_INCLUDES = Of.DEFAULT_USER_INCLUDES;
    Vc1.addRequestDataToEvent = Of.addRequestDataToEvent;
    Vc1.addRequestDataToTransaction = Of.addRequestDataToTransaction;
    Vc1.extractPathForTransaction = Of.extractPathForTransaction;
    Vc1.extractRequestData = Of.extractRequestData;
    Vc1.winterCGHeadersToDict = Of.winterCGHeadersToDict;
    Vc1.winterCGRequestToRequestData = Of.winterCGRequestToRequestData;
    Vc1.severityFromString = Jc1.severityFromString;
    Vc1.severityLevelFromString = Jc1.severityLevelFromString;
    Vc1.validSeverityLevels = Jc1.validSeverityLevels;
    Vc1.createStackParser = g21.createStackParser;
    Vc1.getFunctionName = g21.getFunctionName;
    Vc1.nodeStackLineParser = g21.nodeStackLineParser;
    Vc1.stackParserFromStackParserOptions = g21.stackParserFromStackParserOptions;
    Vc1.stripSentryFramesAndReverse = g21.stripSentryFramesAndReverse;
    Vc1.isMatchingPattern = u21.isMatchingPattern;
    Vc1.safeJoin = u21.safeJoin;
    Vc1.snipLine = u21.snipLine;
    Vc1.stringMatchesSomePattern = u21.stringMatchesSomePattern;
    Vc1.truncate = u21.truncate;
    Vc1.isNativeFetch = sj.isNativeFetch;
    Vc1.supportsDOMError = sj.supportsDOMError;
    Vc1.supportsDOMException = sj.supportsDOMException;
    Vc1.supportsErrorEvent = sj.supportsErrorEvent;
    Vc1.supportsFetch = sj.supportsFetch;
    Vc1.supportsNativeFetch = sj.supportsNativeFetch;
    Vc1.supportsReferrerPolicy = sj.supportsReferrerPolicy;
    Vc1.supportsReportingObserver = sj.supportsReportingObserver;
    Vc1.SyncPromise = Xc1.SyncPromise;
    Vc1.rejectedSyncPromise = Xc1.rejectedSyncPromise;
    Vc1.resolvedSyncPromise = Xc1.resolvedSyncPromise;
    Object.defineProperty(Vc1, "_browserPerformanceTimeOriginMode", {
        enumerable: !0,
        get: () => m21._browserPerformanceTimeOriginMode
    });
    Vc1.browserPerformanceTimeOrigin = m21.browserPerformanceTimeOrigin;
    Vc1.dateTimestampInSeconds = m21.dateTimestampInSeconds;
    Vc1.timestampInSeconds = m21.timestampInSeconds;
    Vc1.timestampWithMs = m21.timestampWithMs;
    Vc1.TRACEPARENT_REGEXP = d21.TRACEPARENT_REGEXP;
    Vc1.extractTraceparentData = d21.extractTraceparentData;
    Vc1.generateSentryTraceHeader = d21.generateSentryTraceHeader;
    Vc1.propagationContextFromHeaders = d21.propagationContextFromHeaders;
    Vc1.tracingContextFromHeaders = d21.tracingContextFromHeaders;
    Vc1.getSDKSource = zb0.getSDKSource;
    Vc1.isBrowserBundle = zb0.isBrowserBundle;
    Vc1.addItemToEnvelope = tq.addItemToEnvelope;
    Vc1.createAttachmentEnvelopeItem = tq.createAttachmentEnvelopeItem;
    Vc1.createEnvelope = tq.createEnvelope;
    Vc1.createEventEnvelopeHeaders = tq.createEventEnvelopeHeaders;
    Vc1.envelopeContainsItemType = tq.envelopeContainsItemType;
    Vc1.envelopeItemTypeToDataCategory = tq.envelopeItemTypeToDataCategory;
    Vc1.forEachEnvelopeItem = tq.forEachEnvelopeItem;
    Vc1.getSdkMetadataForEnvelopeHeader = tq.getSdkMetadataForEnvelopeHeader;
    Vc1.parseEnvelope = tq.parseEnvelope;
    Vc1.serializeEnvelope = tq.serializeEnvelope;
    Vc1.createClientReportEnvelope = n49.createClientReportEnvelope;
    Vc1.DEFAULT_RETRY_AFTER = c21.DEFAULT_RETRY_AFTER;
    Vc1.disabledUntil = c21.disabledUntil;
    Vc1.isRateLimited = c21.isRateLimited;
    Vc1.parseRetryAfterHeader = c21.parseRetryAfterHeader;
    Vc1.updateRateLimits = c21.updateRateLimits;
    Vc1.BAGGAGE_HEADER_NAME = kl.BAGGAGE_HEADER_NAME;
    Vc1.MAX_BAGGAGE_STRING_LENGTH = kl.MAX_BAGGAGE_STRING_LENGTH;
    Vc1.SENTRY_BAGGAGE_KEY_PREFIX = kl.SENTRY_BAGGAGE_KEY_PREFIX;
    Vc1.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = kl.SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
    Vc1.baggageHeaderToDynamicSamplingContext = kl.baggageHeaderToDynamicSamplingContext;
    Vc1.dynamicSamplingContextToSentryBaggageHeader = kl.dynamicSamplingContextToSentryBaggageHeader;
    Vc1.getNumberOfUrlSegments = TJ1.getNumberOfUrlSegments;
    Vc1.getSanitizedUrlString = TJ1.getSanitizedUrlString;
    Vc1.parseUrl = TJ1.parseUrl;
    Vc1.stripUrlQueryAndFragment = TJ1.stripUrlQueryAndFragment;
    Vc1.addOrUpdateIntegration = a49.addOrUpdateIntegration;
    Vc1.makeFifoCache = s49.makeFifoCache;
    Vc1.eventFromMessage = PJ1.eventFromMessage;
    Vc1.eventFromUnknownInput = PJ1.eventFromUnknownInput;
    Vc1.exceptionFromError = PJ1.exceptionFromError;
    Vc1.parseStackFrames = PJ1.parseStackFrames;
    Vc1.callFrameToStackFrame = Eb0.callFrameToStackFrame;
    Vc1.watchdogTimer = Eb0.watchdogTimer;
    Vc1.LRUMap = r49.LRUMap;
    Vc1._asyncNullishCoalesce = o49._asyncNullishCoalesce;
    Vc1._asyncOptionalChain = t49._asyncOptionalChain;
    Vc1._asyncOptionalChainDelete = e49._asyncOptionalChainDelete;
    Vc1._nullishCoalesce = A69._nullishCoalesce;
    Vc1._optionalChain = B69._optionalChain;
    Vc1._optionalChainDelete = Q69._optionalChainDelete;
    Vc1.addConsoleInstrumentationHandler = Z69.addConsoleInstrumentationHandler;
    Vc1.addClickKeypressInstrumentationHandler = D69.addClickKeypressInstrumentationHandler;
    Vc1.SENTRY_XHR_DATA_KEY = Ub0.SENTRY_XHR_DATA_KEY;
    Vc1.addXhrInstrumentationHandler = Ub0.addXhrInstrumentationHandler;
    Vc1.addFetchInstrumentationHandler = G69.addFetchInstrumentationHandler;
    Vc1.addHistoryInstrumentationHandler = F69.addHistoryInstrumentationHandler;
    Vc1.addGlobalErrorInstrumentationHandler = I69.addGlobalErrorInstrumentationHandler;
    Vc1.addGlobalUnhandledRejectionInstrumentationHandler = Y69.addGlobalUnhandledRejectionInstrumentationHandler;
    Vc1.resetInstrumentationHandlers = W69.resetInstrumentationHandlers;
    Vc1.filenameIsInApp = J69.filenameIsInApp;
    Vc1.escapeStringForRegex = X69.escapeStringForRegex;
    Vc1.supportsHistory = V69.supportsHistory
});
var vG = E((wb0) => {
    Object.defineProperty(wb0, "__esModule", {
        value: !0
    });
    var C39 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
    wb0.DEBUG_BUILD = C39
});
var yl = E(($b0) => {
    Object.defineProperty($b0, "__esModule", {
        value: !0
    });
    var H39 = "production";
    $b0.DEFAULT_ENVIRONMENT = H39
});
var l21 = E((Nb0) => {
    Object.defineProperty(Nb0, "__esModule", {
        value: !0
    });
    var SJ1 = UA(),
        E39 = vG();

    function qb0() {
        return SJ1.getGlobalSingleton("globalEventProcessors", () => [])
    }

    function U39(A) {
        qb0().push(A)
    }

    function Cc1(A, B, Q, Z = 0) {
        return new SJ1.SyncPromise((D, G) => {
            let F = A[Z];
            if (B === null || typeof F !== "function") D(B);
            else {
                let I = F({
                    ...B
                }, Q);
                if (E39.DEBUG_BUILD && F.id && I === null && SJ1.logger.log(`Event processor "${F.id}" dropped event`), SJ1.isThenable(I)) I.then((Y) => Cc1(A, Y, Q, Z + 1).then(D)).then(null, G);
                else Cc1(A, I, Q, Z + 1).then(D).then(null, G)
            }
        })
    }
    Nb0.addGlobalEventProcessor = U39;
    Nb0.getGlobalEventProcessors = qb0;
    Nb0.notifyEventProcessors = Cc1
});