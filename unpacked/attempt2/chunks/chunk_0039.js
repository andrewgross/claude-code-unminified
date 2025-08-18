/* chunk:39 bytes:[1093827, 1113776) size:19949 source:unpacked-cli.js */
var gi1 = E((jp) => {
    var Pp = jp && jp.__awaiter || function(A, B, Q, Z) {
        function D(G) {
            return G instanceof Q ? G : new Q(function(F) {
                F(G)
            })
        }
        return new(Q || (Q = Promise))(function(G, F) {
            function I(J) {
                try {
                    W(Z.next(J))
                } catch (X) {
                    F(X)
                }
            }

            function Y(J) {
                try {
                    W(Z.throw(J))
                } catch (X) {
                    F(X)
                }
            }

            function W(J) {
                J.done ? G(J.value) : D(J.value).then(I, Y)
            }
            W((Z = Z.apply(A, B || [])).next())
        })
    };
    Object.defineProperty(jp, "__esModule", {
        value: !0
    });
    jp.EventLogger = void 0;
    var fy9 = tB1(),
        hy9 = Op(),
        B91 = uW(),
        Mr0 = eB1(),
        hi1 = Ih(),
        gy9 = ki1(),
        Sp = TO(),
        uy9 = xi1(),
        Rr0 = tV1(),
        my9 = 100,
        dy9 = 1e4,
        cy9 = 1000,
        ly9 = 600000,
        py9 = 500,
        Or0 = 200,
        Q91 = {},
        eV1 = {
            Startup: "startup",
            GainedFocus: "gained_focus"
        };
    class Yh {
        static _safeFlushAndForget(A) {
            var B;
            (B = Q91[A]) === null || B === void 0 || B.flush().catch(() => {})
        }
        static _safeRetryFailedLogs(A) {
            var B;
            (B = Q91[A]) === null || B === void 0 || B._retryFailedLogs(eV1.GainedFocus)
        }
        constructor(A, B, Q, Z) {
            var D;
            this._sdkKey = A, this._emitter = B, this._network = Q, this._options = Z, this._queue = [], this._lastExposureTimeMap = {}, this._nonExposedChecks = {}, this._hasRunQuickFlush = !1, this._creationTime = Date.now(), this._isLoggingDisabled = (Z === null || Z === void 0 ? void 0 : Z.disableLogging) === !0, this._maxQueueSize = (D = Z === null || Z === void 0 ? void 0 : Z.loggingBufferMaxSize) !== null && D !== void 0 ? D : my9;
            let G = Z === null || Z === void 0 ? void 0 : Z.networkConfig;
            this._logEventUrlConfig = new uy9.UrlConfiguration(Mr0.Endpoint._rgstr, G === null || G === void 0 ? void 0 : G.logEventUrl, G === null || G === void 0 ? void 0 : G.api, G === null || G === void 0 ? void 0 : G.logEventFallbackUrls)
        }
        setLoggingDisabled(A) {
            this._isLoggingDisabled = A
        }
        enqueue(A) {
            if (!this._shouldLogEvent(A)) return;
            if (this._normalizeAndAppendEvent(A), this._quickFlushIfNeeded(), this._queue.length > this._maxQueueSize) Yh._safeFlushAndForget(this._sdkKey)
        }
        incrementNonExposureCount(A) {
            var B;
            let Q = (B = this._nonExposedChecks[A]) !== null && B !== void 0 ? B : 0;
            this._nonExposedChecks[A] = Q + 1
        }
        reset() {
            this._lastExposureTimeMap = {}
        }
        start() {
            if (hi1._isServerEnv()) return;
            Q91[this._sdkKey] = this, Rr0._subscribeToVisiblityChanged((A) => {
                if (A === "background") Yh._safeFlushAndForget(this._sdkKey);
                else if (A === "foreground") Yh._safeRetryFailedLogs(this._sdkKey)
            }), this._retryFailedLogs(eV1.Startup), this._startBackgroundFlushInterval()
        }
        stop() {
            return Pp(this, void 0, void 0, function*() {
                if (this._flushIntervalId) clearInterval(this._flushIntervalId), this._flushIntervalId = null;
                delete Q91[this._sdkKey], yield this.flush()
            })
        }
        flush() {
            return Pp(this, void 0, void 0, function*() {
                if (this._appendAndResetNonExposedChecks(), this._queue.length === 0) return;
                let A = this._queue;
                this._queue = [], yield this._sendEvents(A)
            })
        }
        _quickFlushIfNeeded() {
            if (this._hasRunQuickFlush) return;
            if (this._hasRunQuickFlush = !0, Date.now() - this._creationTime > Or0) return;
            setTimeout(() => Yh._safeFlushAndForget(this._sdkKey), Or0)
        }
        _shouldLogEvent(A) {
            if (hi1._isServerEnv()) return !1;
            if (!gy9._isExposureEvent(A)) return !0;
            let B = A.user ? A.user : {
                    statsigEnvironment: void 0
                },
                Q = fy9._getUserStorageKey(this._sdkKey, B),
                Z = A.metadata ? A.metadata : {},
                D = [A.eventName, Q, Z.gate, Z.config, Z.ruleID, Z.allocatedExperiment, Z.parameterName, String(Z.isExplicitParameter), Z.reason].join("|"),
                G = this._lastExposureTimeMap[D],
                F = Date.now();
            if (G && F - G < ly9) return !1;
            if (Object.keys(this._lastExposureTimeMap).length > cy9) this._lastExposureTimeMap = {};
            return this._lastExposureTimeMap[D] = F, !0
        }
        _sendEvents(A) {
            var B, Q;
            return Pp(this, void 0, void 0, function*() {
                if (this._isLoggingDisabled) return this._saveFailedLogsToStorage(A), !1;
                try {
                    let D = Rr0._isUnloading() && this._network.isBeaconSupported() && ((Q = (B = this._options) === null || B === void 0 ? void 0 : B.networkConfig) === null || Q === void 0 ? void 0 : Q.networkOverrideFunc) == null;
                    if (this._emitter({
                            name: "pre_logs_flushed",
                            events: A
                        }), (D ? yield this._sendEventsViaBeacon(A): yield this._sendEventsViaPost(A)).success) return this._emitter({
                        name: "logs_flushed",
                        events: A
                    }), !0;
                    else return B91.Log.warn("Failed to flush events."), this._saveFailedLogsToStorage(A), !1
                } catch (Z) {
                    return B91.Log.warn("Failed to flush events."), !1
                }
            })
        }
        _sendEventsViaPost(A) {
            var B;
            return Pp(this, void 0, void 0, function*() {
                let Q = yield this._network.post(this._getRequestData(A)), Z = (B = Q === null || Q === void 0 ? void 0 : Q.code) !== null && B !== void 0 ? B : -1;
                return {
                    success: Z >= 200 && Z < 300
                }
            })
        }
        _sendEventsViaBeacon(A) {
            return Pp(this, void 0, void 0, function*() {
                return {
                    success: yield this._network.beacon(this._getRequestData(A))
                }
            })
        }
        _getRequestData(A) {
            return {
                sdkKey: this._sdkKey,
                data: {
                    events: A
                },
                urlConfig: this._logEventUrlConfig,
                retries: 3,
                isCompressable: !0,
                params: {
                    [Mr0.NetworkParam.EventCount]: String(A.length)
                }
            }
        }
        _saveFailedLogsToStorage(A) {
            while (A.length > py9) A.shift();
            let B = this._getStorageKey();
            try {
                Sp._setObjectInStorage(B, A)
            } catch (Q) {
                B91.Log.warn("Unable to save failed logs to storage")
            }
        }
        _retryFailedLogs(A) {
            let B = this._getStorageKey();
            (() => Pp(this, void 0, void 0, function*() {
                if (!Sp.Storage.isReady()) yield Sp.Storage.isReadyResolver();
                let Q = Sp._getObjectFromStorage(B);
                if (!Q) return;
                if (A === eV1.Startup) Sp.Storage.removeItem(B);
                if ((yield this._sendEvents(Q)) && A === eV1.GainedFocus) Sp.Storage.removeItem(B)
            }))().catch(() => {
                B91.Log.warn("Failed to flush stored logs")
            })
        }
        _getStorageKey() {
            return `statsig.failed_logs.${hy9._DJB2(this._sdkKey)}`
        }
        _normalizeAndAppendEvent(A) {
            if (A.user) A.user = Object.assign({}, A.user), delete A.user.privateAttributes;
            let B = {},
                Q = this._getCurrentPageUrl();
            if (Q) B.statsigMetadata = {
                currentPage: Q
            };
            let Z = Object.assign(Object.assign({}, A), B);
            B91.Log.debug("Enqueued Event:", Z), this._queue.push(Z)
        }
        _appendAndResetNonExposedChecks() {
            if (Object.keys(this._nonExposedChecks).length === 0) return;
            this._normalizeAndAppendEvent({
                eventName: "statsig::non_exposed_checks",
                user: null,
                time: Date.now(),
                metadata: {
                    checks: Object.assign({}, this._nonExposedChecks)
                }
            }), this._nonExposedChecks = {}
        }
        _getCurrentPageUrl() {
            var A;
            if (((A = this._options) === null || A === void 0 ? void 0 : A.includeCurrentPageUrlWithEvents) === !1) return;
            return hi1._getCurrentPageUrlSafe()
        }
        _startBackgroundFlushInterval() {
            var A, B;
            let Q = (B = (A = this._options) === null || A === void 0 ? void 0 : A.loggingIntervalMs) !== null && B !== void 0 ? B : dy9,
                Z = setInterval(() => {
                    let D = Q91[this._sdkKey];
                    if (!D || D._flushIntervalId !== Z) clearInterval(Z);
                    else Yh._safeFlushAndForget(this._sdkKey)
                }, Q);
            this._flushIntervalId = Z
        }
    }
    jp.EventLogger = Yh
});
var Z91 = E((Tr0) => {
    Object.defineProperty(Tr0, "__esModule", {
        value: !0
    });
    Tr0.StatsigMetadataProvider = Tr0.SDK_VERSION = void 0;
    Tr0.SDK_VERSION = "3.12.1";
    var ui1 = {
        sdkVersion: Tr0.SDK_VERSION,
        sdkType: "js-mono"
    };
    Tr0.StatsigMetadataProvider = {
        get: () => ui1,
        add: (A) => {
            ui1 = Object.assign(Object.assign({}, ui1), A)
        }
    }
});
var kr0 = E((jr0) => {
    Object.defineProperty(jr0, "__esModule", {
        value: !0
    })
});
var AC1 = E((yr0) => {
    Object.defineProperty(yr0, "__esModule", {
        value: !0
    });
    yr0.getUUID = void 0;

    function iy9() {
        if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
        let A = new Date().getTime(),
            B = typeof performance !== "undefined" && performance.now && performance.now() * 1000 || 0;
        return `xxxxxxxx-xxxx-4xxx-${"89ab"[Math.floor(Math.random()*4)]}xxx-xxxxxxxxxxxx`.replace(/[xy]/g, (Z) => {
            let D = Math.random() * 16;
            if (A > 0) D = (A + D) % 16 | 0, A = Math.floor(A / 16);
            else D = (B + D) % 16 | 0, B = Math.floor(B / 16);
            return (Z === "x" ? D : D & 7 | 8).toString(16)
        })
    }
    yr0.getUUID = iy9
});
var QC1 = E((fr0) => {
    Object.defineProperty(fr0, "__esModule", {
        value: !0
    });
    fr0.StableID = void 0;
    var ny9 = tB1(),
        ay9 = uW(),
        vr0 = TO(),
        sy9 = AC1(),
        BC1 = {};
    fr0.StableID = {
        get: (A) => {
            if (BC1[A] == null) {
                let B = ry9(A);
                if (B == null) B = sy9.getUUID(), xr0(B, A);
                BC1[A] = B
            }
            return BC1[A]
        },
        setOverride: (A, B) => {
            BC1[B] = A, xr0(A, B)
        }
    };

    function br0(A) {
        return `statsig.stable_id.${ny9._getStorageKey(A)}`
    }

    function xr0(A, B) {
        let Q = br0(B);
        try {
            vr0._setObjectInStorage(Q, A)
        } catch (Z) {
            ay9.Log.warn("Failed to save StableID")
        }
    }

    function ry9(A) {
        let B = br0(A);
        return vr0._getObjectFromStorage(B)
    }
});
var mi1 = E((gr0) => {
    Object.defineProperty(gr0, "__esModule", {
        value: !0
    });
    gr0._getFullUserHash = gr0._normalizeUser = void 0;
    var oy9 = Op(),
        ty9 = uW();

    function ey9(A, B, Q) {
        try {
            let Z = JSON.parse(JSON.stringify(A));
            if (B != null && B.environment != null) Z.statsigEnvironment = B.environment;
            else if (Q != null) Z.statsigEnvironment = {
                tier: Q
            };
            return Z
        } catch (Z) {
            return ty9.Log.error("Failed to JSON.stringify user"), {
                statsigEnvironment: void 0
            }
        }
    }
    gr0._normalizeUser = ey9;

    function A_9(A) {
        return A ? oy9._DJB2Object(A) : null
    }
    gr0._getFullUserHash = A_9
});
var di1 = E((mr0) => {
    Object.defineProperty(mr0, "__esModule", {
        value: !0
    });
    mr0._typedJsonParse = void 0;
    var Q_9 = uW();

    function Z_9(A, B, Q) {
        try {
            let Z = JSON.parse(A);
            if (Z && typeof Z === "object" && B in Z) return Z
        } catch (Z) {}
        return Q_9.Log.error(`Failed to parse ${Q}`), null
    }
    mr0._typedJsonParse = Z_9
});
var ar0 = E((Wk) => {
    var ci1 = Wk && Wk.__awaiter || function(A, B, Q, Z) {
        function D(G) {
            return G instanceof Q ? G : new Q(function(F) {
                F(G)
            })
        }
        return new(Q || (Q = Promise))(function(G, F) {
            function I(J) {
                try {
                    W(Z.next(J))
                } catch (X) {
                    F(X)
                }
            }

            function Y(J) {
                try {
                    W(Z.throw(J))
                } catch (X) {
                    F(X)
                }
            }

            function W(J) {
                J.done ? G(J.value) : D(J.value).then(I, Y)
            }
            W((Z = Z.apply(A, B || [])).next())
        })
    };
    Object.defineProperty(Wk, "__esModule", {
        value: !0
    });
    Wk._makeDataAdapterResult = Wk.DataAdapterCore = void 0;
    var ZC1 = uW(),
        D_9 = QC1(),
        DC1 = mi1(),
        Yk = TO(),
        cr0 = di1(),
        lr0 = 10;
    class pr0 {
        constructor(A, B) {
            this._adapterName = A, this._cacheSuffix = B, this._options = null, this._sdkKey = null, this._lastModifiedStoreKey = `statsig.last_modified_time.${B}`, this._inMemoryCache = new ir0
        }
        attach(A, B) {
            this._sdkKey = A, this._options = B
        }
        getDataSync(A) {
            let B = A && DC1._normalizeUser(A, this._options),
                Q = this._getCacheKey(B),
                Z = this._inMemoryCache.get(Q, B);
            if (Z) return Z;
            let D = this._loadFromCache(Q);
            if (D) return this._inMemoryCache.add(Q, D), this._inMemoryCache.get(Q, B);
            return null
        }
        setData(A, B) {
            let Q = B && DC1._normalizeUser(B, this._options),
                Z = this._getCacheKey(Q);
            this._inMemoryCache.add(Z, GC1("Bootstrap", A, null, Q))
        }
        _getDataAsyncImpl(A, B, Q) {
            return ci1(this, void 0, void 0, function*() {
                if (!Yk.Storage.isReady()) yield Yk.Storage.isReadyResolver();
                let Z = A !== null && A !== void 0 ? A : this.getDataSync(B),
                    D = [this._fetchAndPrepFromNetwork(Z, B, Q)];
                if (Q === null || Q === void 0 ? void 0 : Q.timeoutMs) D.push(new Promise((G) => setTimeout(G, Q.timeoutMs)).then(() => {
                    return ZC1.Log.debug("Fetching latest value timed out"), null
                }));
                return yield Promise.race(D)
            })
        }
        _prefetchDataImpl(A, B) {
            return ci1(this, void 0, void 0, function*() {
                let Q = A && DC1._normalizeUser(A, this._options),
                    Z = this._getCacheKey(Q),
                    D = yield this._getDataAsyncImpl(null, Q, B);
                if (D) this._inMemoryCache.add(Z, Object.assign(Object.assign({}, D), {
                    source: "Prefetch"
                }))
            })
        }
        _fetchAndPrepFromNetwork(A, B, Q) {
            var Z;
            return ci1(this, void 0, void 0, function*() {
                let D = (Z = A === null || A === void 0 ? void 0 : A.data) !== null && Z !== void 0 ? Z : null,
                    G = A != null && this._isCachedResultValidFor204(A, B),
                    F = yield this._fetchFromNetwork(D, B, Q, G);
                if (!F) return ZC1.Log.debug("No response returned for latest value"), null;
                let I = cr0._typedJsonParse(F, "has_updates", "Response"),
                    Y = this._getSdkKey(),
                    W = D_9.StableID.get(Y),
                    J = null;
                if ((I === null || I === void 0 ? void 0 : I.has_updates) === !0) J = GC1("Network", F, W, B);
                else if (D && (I === null || I === void 0 ? void 0 : I.has_updates) === !1) J = GC1("NetworkNotModified", D, W, B);
                else return null;
                let X = this._getCacheKey(B);
                return this._inMemoryCache.add(X, J), this._writeToCache(X, J), J
            })
        }
        _getSdkKey() {
            if (this._sdkKey != null) return this._sdkKey;
            return ZC1.Log.error(`${this._adapterName} is not attached to a Client`), ""
        }
        _loadFromCache(A) {
            var B;
            let Q = (B = Yk.Storage.getItem) === null || B === void 0 ? void 0 : B.call(Yk.Storage, A);
            if (Q == null) return null;
            let Z = cr0._typedJsonParse(Q, "source", "Cached Result");
            return Z ? Object.assign(Object.assign({}, Z), {
                source: "Cache"
            }) : null
        }
        _writeToCache(A, B) {
            Yk.Storage.setItem(A, JSON.stringify(B)), this._runLocalStorageCacheEviction(A)
        }
        _runLocalStorageCacheEviction(A) {
            var B;
            let Q = (B = Yk._getObjectFromStorage(this._lastModifiedStoreKey)) !== null && B !== void 0 ? B : {};
            Q[A] = Date.now();
            let Z = nr0(Q, lr0);
            if (Z) delete Q[Z], Yk.Storage.removeItem(Z);
            Yk._setObjectInStorage(this._lastModifiedStoreKey, Q)
        }
    }
    Wk.DataAdapterCore = pr0;

    function GC1(A, B, Q, Z) {
        return {
            source: A,
            data: B,
            receivedAt: Date.now(),
            stableID: Q,
            fullUserHash: DC1._getFullUserHash(Z)
        }
    }
    Wk._makeDataAdapterResult = GC1;
    class ir0 {
        constructor() {
            this._data = {}
        }
        get(A, B) {
            var Q;
            let Z = this._data[A],
                D = Z === null || Z === void 0 ? void 0 : Z.stableID,
                G = (Q = B === null || B === void 0 ? void 0 : B.customIDs) === null || Q === void 0 ? void 0 : Q.stableID;
            if (G && D && G !== D) return ZC1.Log.warn("'StatsigUser.customIDs.stableID' mismatch"), null;
            return Z
        }
        add(A, B) {
            let Q = nr0(this._data, lr0 - 1);
            if (Q) delete this._data[Q];
            this._data[A] = B
        }
        merge(A) {
            this._data = Object.assign(Object.assign({}, this._data), A)
        }
    }

    function nr0(A, B) {
        let Q = Object.keys(A);
        if (Q.length <= B) return null;
        return Q.reduce((Z, D) => {
            let G = A[Z],
                F = A[D];
            if (typeof G === "object" && typeof F === "object") return F.receivedAt < G.receivedAt ? D : Z;
            return F < G ? D : Z
        })
    }
});
var rr0 = E((sr0) => {
    Object.defineProperty(sr0, "__esModule", {
        value: !0
    })
});