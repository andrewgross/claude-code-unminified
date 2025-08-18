/* chunk:41 bytes:[1132457, 1151077) size:18620 source:unpacked-cli.js */
var go0 = E((xp) => {
    var _p = xp && xp.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(xp, "__esModule", {
        value: !0
    });
    xp.NetworkCore = void 0;
    Fh();
    var ko0 = Fh(),
        oi1 = mV1(),
        Wh = uW(),
        Jw = eB1(),
        f_9 = Uo0(),
        h_9 = ai1(),
        xo0 = FC1(),
        g_9 = Ih(),
        vo0 = YC1(),
        u_9 = QC1(),
        m_9 = ri1(),
        bo0 = Z91(),
        d_9 = tV1(),
        c_9 = 1e4,
        l_9 = 500,
        p_9 = 30000,
        i_9 = 1000,
        fo0 = 50,
        n_9 = fo0 / i_9,
        a_9 = new Set([408, 500, 502, 503, 504, 522, 524, 599]);
    class ho0 {
        constructor(A, B) {
            if (this._emitter = B, this._errorBoundary = null, this._timeout = c_9, this._netConfig = {}, this._options = {}, this._leakyBucket = {}, this._lastUsedInitUrl = null, A) this._options = A;
            if (this._options.networkConfig) this._netConfig = this._options.networkConfig;
            if (this._netConfig.networkTimeoutMs) this._timeout = this._netConfig.networkTimeoutMs;
            this._fallbackResolver = new f_9.NetworkFallbackResolver(this._options)
        }
        setErrorBoundary(A) {
            this._errorBoundary = A, this._errorBoundary.wrap(this), this._errorBoundary.wrap(this._fallbackResolver), this._fallbackResolver.setErrorBoundary(A)
        }
        isBeaconSupported() {
            return typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function"
        }
        getLastUsedInitUrlAndReset() {
            let A = this._lastUsedInitUrl;
            return this._lastUsedInitUrl = null, A
        }
        beacon(A) {
            return _p(this, void 0, void 0, function*() {
                if (!yo0(A)) return !1;
                let B = this._getInternalRequestArgs("POST", A);
                yield this._tryToCompressBody(B);
                let Q = yield this._getPopulatedURL(B), Z = navigator;
                return Z.sendBeacon.bind(Z)(Q, B.body)
            })
        }
        post(A) {
            return _p(this, void 0, void 0, function*() {
                let B = this._getInternalRequestArgs("POST", A);
                return this._tryEncodeBody(B), yield this._tryToCompressBody(B), this._sendRequest(B)
            })
        }
        get(A) {
            let B = this._getInternalRequestArgs("GET", A);
            return this._sendRequest(B)
        }
        _sendRequest(A) {
            var B, Q, Z, D;
            return _p(this, void 0, void 0, function*() {
                if (!yo0(A)) return null;
                if (this._netConfig.preventAllNetworkTraffic) return null;
                let {
                    method: G,
                    body: F,
                    retries: I,
                    attempt: Y
                } = A, W = A.urlConfig.endpoint;
                if (this._isRateLimited(W)) return Wh.Log.warn(`Request to ${W} was blocked because you are making requests too frequently.`), null;
                let J = Y !== null && Y !== void 0 ? Y : 1,
                    X = typeof AbortController !== "undefined" ? new AbortController : null,
                    V = setTimeout(() => {
                        X === null || X === void 0 || X.abort(`Timeout of ${this._timeout}ms expired.`)
                    }, this._timeout),
                    C = yield this._getPopulatedURL(A), K = null, H = d_9._isUnloading();
                try {
                    let z = {
                        method: G,
                        body: F,
                        headers: Object.assign({}, A.headers),
                        signal: X === null || X === void 0 ? void 0 : X.signal,
                        priority: A.priority,
                        keepalive: H
                    };
                    t_9(A, J);
                    let $ = this._leakyBucket[W];
                    if ($) $.lastRequestTime = Date.now(), this._leakyBucket[W] = $;
                    if (K = yield((B = this._netConfig.networkOverrideFunc) !== null && B !== void 0 ? B : fetch)(C, z), clearTimeout(V), !K.ok) {
                        let R = yield K.text().catch(() => "No Text"), O = new Error(`NetworkError: ${C} ${R}`);
                        throw O.name = "NetworkError", O
                    }
                    let N = yield K.text();
                    return _o0(A, K, J, N), this._fallbackResolver.tryBumpExpiryTime(A.sdkKey, A.urlConfig), {
                        body: N,
                        code: K.status
                    }
                } catch (z) {
                    let $ = r_9(X, z),
                        L = o_9(X);
                    if (_o0(A, K, J, "", z), yield this._fallbackResolver.tryFetchUpdatedFallbackInfo(A.sdkKey, A.urlConfig, $, L)) A.fallbackUrl = this._fallbackResolver.getActiveFallbackUrl(A.sdkKey, A.urlConfig);
                    if (!I || J > I || !a_9.has((Q = K === null || K === void 0 ? void 0 : K.status) !== null && Q !== void 0 ? Q : 500)) {
                        (Z = this._emitter) === null || Z === void 0 || Z.call(this, {
                            name: "error",
                            error: z,
                            tag: m_9.ErrorTag.NetworkError,
                            requestArgs: A
                        });
                        let R = `A networking error occurred during ${G} request to ${C}.`;
                        return Wh.Log.error(R, $, z), (D = this._errorBoundary) === null || D === void 0 || D.attachErrorIfNoneExists(R), null
                    }
                    return yield e_9(J), this._sendRequest(Object.assign(Object.assign({}, A), {
                        retries: I,
                        attempt: J + 1
                    }))
                }
            })
        }
        _isRateLimited(A) {
            var B;
            let Q = Date.now(),
                Z = (B = this._leakyBucket[A]) !== null && B !== void 0 ? B : {
                    count: 0,
                    lastRequestTime: Q
                },
                D = Q - Z.lastRequestTime,
                G = Math.floor(D * n_9);
            if (Z.count = Math.max(0, Z.count - G), Z.count >= fo0) return !0;
            return Z.count += 1, Z.lastRequestTime = Q, this._leakyBucket[A] = Z, !1
        }
        _getPopulatedURL(A) {
            var B;
            return _p(this, void 0, void 0, function*() {
                let Q = (B = A.fallbackUrl) !== null && B !== void 0 ? B : A.urlConfig.getUrl();
                if (A.urlConfig.endpoint === Jw.Endpoint._initialize || A.urlConfig.endpoint === Jw.Endpoint._download_config_specs) this._lastUsedInitUrl = Q;
                let Z = Object.assign({
                        [Jw.NetworkParam.SdkKey]: A.sdkKey,
                        [Jw.NetworkParam.SdkType]: xo0.SDKType._get(A.sdkKey),
                        [Jw.NetworkParam.SdkVersion]: bo0.SDK_VERSION,
                        [Jw.NetworkParam.Time]: String(Date.now()),
                        [Jw.NetworkParam.SessionID]: vo0.SessionID.get(A.sdkKey)
                    }, A.params),
                    D = Object.keys(Z).map((G) => {
                        return `${encodeURIComponent(G)}=${encodeURIComponent(Z[G])}`
                    }).join("&");
                return `${Q}${D?`?${D}`:""}`
            })
        }
        _tryEncodeBody(A) {
            var B;
            let Q = g_9._getWindowSafe(),
                Z = A.body;
            if (!A.isStatsigEncodable || this._options.disableStatsigEncoding || typeof Z !== "string" || ko0._getStatsigGlobalFlag("no-encode") != null || !(Q === null || Q === void 0 ? void 0 : Q.btoa)) return;
            try {
                A.body = Q.btoa(Z).split("").reverse().join(""), A.params = Object.assign(Object.assign({}, (B = A.params) !== null && B !== void 0 ? B : {}), {
                    [Jw.NetworkParam.StatsigEncoded]: "1"
                })
            } catch (D) {
                Wh.Log.warn(`Request encoding failed for ${A.urlConfig.getUrl()}`, D)
            }
        }
        _tryToCompressBody(A) {
            var B;
            return _p(this, void 0, void 0, function*() {
                let Q = A.body;
                if (!A.isCompressable || this._options.disableCompression || typeof Q !== "string" || h_9.SDKFlags.get(A.sdkKey, "enable_log_event_compression") !== !0 || ko0._getStatsigGlobalFlag("no-compress") != null || typeof CompressionStream === "undefined" || typeof TextEncoder === "undefined") return;
                try {
                    let Z = new TextEncoder().encode(Q),
                        D = new CompressionStream("gzip"),
                        G = D.writable.getWriter();
                    G.write(Z).catch(Wh.Log.error), G.close().catch(Wh.Log.error);
                    let F = D.readable.getReader(),
                        I = [],
                        Y;
                    while (!(Y = yield F.read()).done) I.push(Y.value);
                    let W = I.reduce((V, C) => V + C.length, 0),
                        J = new Uint8Array(W),
                        X = 0;
                    for (let V of I) J.set(V, X), X += V.length;
                    A.body = J, A.params = Object.assign(Object.assign({}, (B = A.params) !== null && B !== void 0 ? B : {}), {
                        [Jw.NetworkParam.IsGzipped]: "1"
                    })
                } catch (Z) {
                    Wh.Log.warn(`Request compression failed for ${A.urlConfig.getUrl()}`, Z)
                }
            })
        }
        _getInternalRequestArgs(A, B) {
            let Q = this._fallbackResolver.getActiveFallbackUrl(B.sdkKey, B.urlConfig),
                Z = Object.assign(Object.assign({}, B), {
                    method: A,
                    fallbackUrl: Q
                });
            if ("data" in B) s_9(Z, B.data);
            return Z
        }
    }
    xp.NetworkCore = ho0;
    var yo0 = (A) => {
            if (!A.sdkKey) return Wh.Log.warn("Unable to make request without an SDK key"), !1;
            return !0
        },
        s_9 = (A, B) => {
            let {
                sdkKey: Q,
                fallbackUrl: Z
            } = A, D = u_9.StableID.get(Q), G = vo0.SessionID.get(Q), F = xo0.SDKType._get(Q);
            A.body = JSON.stringify(Object.assign(Object.assign({}, B), {
                statsigMetadata: Object.assign(Object.assign({}, bo0.StatsigMetadataProvider.get()), {
                    stableID: D,
                    sessionID: G,
                    sdkType: F,
                    fallbackUrl: Z
                })
            }))
        };

    function r_9(A, B) {
        if ((A === null || A === void 0 ? void 0 : A.signal.aborted) && typeof A.signal.reason === "string") return A.signal.reason;
        if (typeof B === "string") return B;
        if (B instanceof Error) return `${B.name}: ${B.message}`;
        return "Unknown Error"
    }

    function o_9(A) {
        return (A === null || A === void 0 ? void 0 : A.signal.aborted) && typeof A.signal.reason === "string" && A.signal.reason.includes("Timeout") || !1
    }

    function t_9(A, B) {
        if (A.urlConfig.endpoint !== Jw.Endpoint._initialize) return;
        oi1.Diagnostics._markInitNetworkReqStart(A.sdkKey, {
            attempt: B
        })
    }

    function _o0(A, B, Q, Z, D) {
        if (A.urlConfig.endpoint !== Jw.Endpoint._initialize) return;
        oi1.Diagnostics._markInitNetworkReqEnd(A.sdkKey, oi1.Diagnostics._getDiagnosticsData(B, Q, Z, D))
    }

    function e_9(A) {
        return _p(this, void 0, void 0, function*() {
            yield new Promise((B) => setTimeout(B, Math.min(l_9 * (A * A), p_9)))
        })
    }
});
var mo0 = E((uo0) => {
    Object.defineProperty(uo0, "__esModule", {
        value: !0
    })
});
var co0 = E((do0) => {
    Object.defineProperty(do0, "__esModule", {
        value: !0
    })
});
var po0 = E((vp) => {
    var Ax9 = vp && vp.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(vp, "__esModule", {
        value: !0
    });
    vp.StatsigClientBase = void 0;
    Fh();
    var Bx9 = Fh(),
        Qx9 = li1(),
        Zx9 = gi1(),
        ti1 = uW(),
        Dx9 = pi1(),
        Gx9 = Ih(),
        Fx9 = YC1(),
        WC1 = TO(),
        Ix9 = 3000;
    class lo0 {
        constructor(A, B, Q, Z) {
            var D;
            this.loadingStatus = "Uninitialized", this._initializePromise = null, this._listeners = {};
            let G = this.$emt.bind(this);
            (Z === null || Z === void 0 ? void 0 : Z.logLevel) != null && (ti1.Log.level = Z.logLevel), (Z === null || Z === void 0 ? void 0 : Z.disableStorage) && WC1.Storage._setDisabled(!0), (Z === null || Z === void 0 ? void 0 : Z.initialSessionID) && Fx9.StatsigSession.overrideInitialSessionID(Z.initialSessionID, A), (Z === null || Z === void 0 ? void 0 : Z.storageProvider) && WC1.Storage._setProvider(Z.storageProvider), this._sdkKey = A, this._options = Z !== null && Z !== void 0 ? Z : {}, this._memoCache = {}, this.overrideAdapter = (D = Z === null || Z === void 0 ? void 0 : Z.overrideAdapter) !== null && D !== void 0 ? D : null, this._logger = new Zx9.EventLogger(A, G, Q, Z), this._errorBoundary = new Qx9.ErrorBoundary(A, Z, G), this._errorBoundary.wrap(this), this._errorBoundary.wrap(B), this._errorBoundary.wrap(this._logger), Q.setErrorBoundary(this._errorBoundary), this.dataAdapter = B, this.dataAdapter.attach(A, Z), this.storageProvider = WC1.Storage, this._primeReadyRipcord(), Yx9(A, this)
        }
        updateRuntimeOptions(A) {
            if (A.disableLogging != null) this._options.disableLogging = A.disableLogging, this._logger.setLoggingDisabled(A.disableLogging);
            if (A.disableStorage != null) this._options.disableStorage = A.disableStorage, WC1.Storage._setDisabled(A.disableStorage)
        }
        flush() {
            return this._logger.flush()
        }
        shutdown() {
            return Ax9(this, void 0, void 0, function*() {
                this.$emt({
                    name: "pre_shutdown"
                }), this._setStatus("Uninitialized", null), this._initializePromise = null, yield this._logger.stop()
            })
        }
        on(A, B) {
            if (!this._listeners[A]) this._listeners[A] = [];
            this._listeners[A].push(B)
        }
        off(A, B) {
            if (this._listeners[A]) {
                let Q = this._listeners[A].indexOf(B);
                if (Q !== -1) this._listeners[A].splice(Q, 1)
            }
        }
        $on(A, B) {
            B.__isInternal = !0, this.on(A, B)
        }
        $emt(A) {
            var B;
            let Q = (Z) => {
                try {
                    Z(A)
                } catch (D) {
                    if (Z.__isInternal === !0) {
                        this._errorBoundary.logError(`__emit:${A.name}`, D);
                        return
                    }
                    ti1.Log.error("An error occurred in a StatsigClientEvent listener. This is not an issue with Statsig.", A)
                }
            };
            if (this._listeners[A.name]) this._listeners[A.name].forEach((Z) => Q(Z));
            (B = this._listeners["*"]) === null || B === void 0 || B.forEach(Q)
        }
        _setStatus(A, B) {
            this.loadingStatus = A, this._memoCache = {}, this.$emt({
                name: "values_updated",
                status: A,
                values: B
            })
        }
        _enqueueExposure(A, B, Q) {
            if ((Q === null || Q === void 0 ? void 0 : Q.disableExposureLog) === !0) {
                this._logger.incrementNonExposureCount(A);
                return
            }
            this._logger.enqueue(B)
        }
        _memoize(A, B) {
            return (Q, Z) => {
                if (this._options.disableEvaluationMemoization) return B(Q, Z);
                let D = Dx9.createMemoKey(A, Q, Z);
                if (!D) return B(Q, Z);
                if (!(D in this._memoCache)) {
                    if (Object.keys(this._memoCache).length >= Ix9) this._memoCache = {};
                    this._memoCache[D] = B(Q, Z)
                }
                return this._memoCache[D]
            }
        }
    }
    vp.StatsigClientBase = lo0;

    function Yx9(A, B) {
        var Q;
        if (Gx9._isServerEnv()) return;
        let Z = Bx9._getStatsigGlobal(),
            D = (Q = Z.instances) !== null && Q !== void 0 ? Q : {},
            G = B;
        if (D[A] != null) ti1.Log.warn("Creating multiple Statsig clients with the same SDK key can lead to unexpected behavior. Multi-instance support requires different SDK keys.");
        if (D[A] = G, !Z.firstInstance) Z.firstInstance = G;
        Z.instances = D, __STATSIG__ = Z
    }
});
var ao0 = E((io0) => {
    Object.defineProperty(io0, "__esModule", {
        value: !0
    });
    io0.DataAdapterCachePrefix = void 0;
    io0.DataAdapterCachePrefix = "statsig.cached"
});
var ro0 = E((so0) => {
    Object.defineProperty(so0, "__esModule", {
        value: !0
    })
});
var to0 = E((oo0) => {
    Object.defineProperty(oo0, "__esModule", {
        value: !0
    })
});