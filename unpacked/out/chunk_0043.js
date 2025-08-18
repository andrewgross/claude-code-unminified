/* chunk:43 bytes:[1168789, 1187658) size:18869 source:unpacked-cli.js */
var Lt0 = E((bp) => {
    var ux9 = bp && bp.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(bp, "__esModule", {
        value: !0
    });
    bp.StatsigEvaluationsDataAdapter = void 0;
    var Xh = Xk(),
        mx9 = Bn1();
    class Nt0 extends Xh.DataAdapterCore {
        constructor() {
            super("EvaluationsDataAdapter", "evaluations");
            this._network = null, this._options = null
        }
        attach(A, B) {
            super.attach(A, B), this._network = new mx9.default(B !== null && B !== void 0 ? B : {})
        }
        getDataAsync(A, B, Q) {
            return this._getDataAsyncImpl(A, Xh._normalizeUser(B, this._options), Q)
        }
        prefetchData(A, B) {
            return this._prefetchDataImpl(A, B)
        }
        setData(A) {
            let B = Xh._typedJsonParse(A, "has_updates", "data");
            if (B && "user" in B) super.setData(A, B.user);
            else Xh.Log.error("StatsigUser not found. You may be using an older server SDK version. Please upgrade your SDK or use setDataLegacy.")
        }
        setDataLegacy(A, B) {
            super.setData(A, B)
        }
        _fetchFromNetwork(A, B, Q, Z) {
            var D;
            return ux9(this, void 0, void 0, function*() {
                let G = yield(D = this._network) === null || D === void 0 ? void 0 : D.fetchEvaluations(this._getSdkKey(), A, Q === null || Q === void 0 ? void 0 : Q.priority, B, Z);
                return G !== null && G !== void 0 ? G : null
            })
        }
        _getCacheKey(A) {
            var B;
            let Q = Xh._getStorageKey(this._getSdkKey(), A, (B = this._options) === null || B === void 0 ? void 0 : B.customUserCacheKeyFunc);
            return `${Xh.DataAdapterCachePrefix}.${this._cacheSuffix}.${Q}`
        }
        _isCachedResultValidFor204(A, B) {
            return A.fullUserHash != null && A.fullUserHash === Xh._getFullUserHash(B)
        }
    }
    bp.StatsigEvaluationsDataAdapter = Nt0
});
var Rt0 = E((G91) => {
    var Zn1 = G91 && G91.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(G91, "__esModule", {
        value: !0
    });
    var r4 = Xk(),
        dx9 = Xt0(),
        cx9 = Bn1(),
        Mt0 = qt0(),
        lx9 = Lt0();
    class KC1 extends r4.StatsigClientBase {
        static instance(A) {
            let B = r4._getStatsigGlobal().instance(A);
            if (B instanceof KC1) return B;
            return r4.Log.warn(r4._isServerEnv() ? "StatsigClient.instance is not supported in server environments" : "Unable to find StatsigClient instance"), new KC1(A !== null && A !== void 0 ? A : "", {})
        }
        constructor(A, B, Q = null) {
            var Z, D;
            r4.SDKType._setClientType(A, "javascript-client");
            let G = new cx9.default(Q, (I) => {
                this.$emt(I)
            });
            super(A, (Z = Q === null || Q === void 0 ? void 0 : Q.dataAdapter) !== null && Z !== void 0 ? Z : new lx9.StatsigEvaluationsDataAdapter, G, Q);
            this.getFeatureGate = this._memoize(r4.MemoPrefix._gate, this._getFeatureGateImpl.bind(this)), this.getDynamicConfig = this._memoize(r4.MemoPrefix._dynamicConfig, this._getDynamicConfigImpl.bind(this)), this.getExperiment = this._memoize(r4.MemoPrefix._experiment, this._getExperimentImpl.bind(this)), this.getLayer = this._memoize(r4.MemoPrefix._layer, this._getLayerImpl.bind(this)), this.getParameterStore = this._memoize(r4.MemoPrefix._paramStore, this._getParameterStoreImpl.bind(this)), this._store = new dx9.default(A), this._network = G, this._user = this._configureUser(B, Q);
            let F = (D = Q === null || Q === void 0 ? void 0 : Q.plugins) !== null && D !== void 0 ? D : [];
            for (let I of F) I.bind(this)
        }
        initializeSync(A) {
            var B;
            if (this.loadingStatus !== "Uninitialized") return r4.createUpdateDetails(!0, this._store.getSource(), -1, null, null, ["MultipleInitializations", ...(B = this._store.getWarnings()) !== null && B !== void 0 ? B : []]);
            return this._logger.start(), this.updateUserSync(this._user, A)
        }
        initializeAsync(A) {
            return Zn1(this, void 0, void 0, function*() {
                if (this._initializePromise) return this._initializePromise;
                return this._initializePromise = this._initializeAsyncImpl(A), this._initializePromise
            })
        }
        updateUserSync(A, B) {
            var Q;
            let Z = performance.now(),
                D = [...(Q = this._store.getWarnings()) !== null && Q !== void 0 ? Q : []];
            this._resetForUser(A);
            let G = this.dataAdapter.getDataSync(this._user);
            if (G == null) D.push("NoCachedValues");
            this._store.setValues(G, this._user), this._finalizeUpdate(G);
            let F = B === null || B === void 0 ? void 0 : B.disableBackgroundCacheRefresh;
            if (F === !0 || F == null && (G === null || G === void 0 ? void 0 : G.source) === "Bootstrap") return r4.createUpdateDetails(!0, this._store.getSource(), performance.now() - Z, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), D);
            return this._runPostUpdate(G !== null && G !== void 0 ? G : null, this._user), r4.createUpdateDetails(!0, this._store.getSource(), performance.now() - Z, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), D)
        }
        updateUserAsync(A, B) {
            return Zn1(this, void 0, void 0, function*() {
                this._resetForUser(A);
                let Q = this._user;
                r4.Diagnostics._markInitOverallStart(this._sdkKey);
                let Z = this.dataAdapter.getDataSync(Q);
                if (this._store.setValues(Z, this._user), this._setStatus("Loading", Z), Z = yield this.dataAdapter.getDataAsync(Z, Q, B), Q !== this._user) return r4.createUpdateDetails(!1, this._store.getSource(), -1, new Error("User changed during update"), this._network.getLastUsedInitUrlAndReset());
                let D = !1;
                if (Z != null) r4.Diagnostics._markInitProcessStart(this._sdkKey), D = this._store.setValues(Z, this._user), r4.Diagnostics._markInitProcessEnd(this._sdkKey, {
                    success: D
                });
                if (this._finalizeUpdate(Z), !D) this._errorBoundary.attachErrorIfNoneExists(r4.UPDATE_DETAIL_ERROR_MESSAGES.NO_NETWORK_DATA), this.$emt({
                    name: "initialization_failure"
                });
                r4.Diagnostics._markInitOverallEnd(this._sdkKey, D, this._store.getCurrentSourceDetails());
                let G = r4.Diagnostics._enqueueDiagnosticsEvent(this._user, this._logger, this._sdkKey, this._options);
                return r4.createUpdateDetails(D, this._store.getSource(), G, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), this._store.getWarnings())
            })
        }
        getContext() {
            return {
                sdkKey: this._sdkKey,
                options: this._options,
                values: this._store.getValues(),
                user: JSON.parse(JSON.stringify(this._user)),
                errorBoundary: this._errorBoundary,
                session: r4.StatsigSession.get(this._sdkKey),
                stableID: r4.StableID.get(this._sdkKey)
            }
        }
        checkGate(A, B) {
            return this.getFeatureGate(A, B).value
        }
        logEvent(A, B, Q) {
            let Z = typeof A === "string" ? {
                eventName: A,
                value: B,
                metadata: Q
            } : A;
            this._logger.enqueue(Object.assign(Object.assign({}, Z), {
                user: this._user,
                time: Date.now()
            }))
        }
        _primeReadyRipcord() {
            this.$on("error", () => {
                this.loadingStatus === "Loading" && this._finalizeUpdate(null)
            })
        }
        _initializeAsyncImpl(A) {
            return Zn1(this, void 0, void 0, function*() {
                if (!r4.Storage.isReady()) yield r4.Storage.isReadyResolver();
                return this._logger.start(), this.updateUserAsync(this._user, A)
            })
        }
        _finalizeUpdate(A) {
            this._store.finalize(), this._setStatus("Ready", A)
        }
        _runPostUpdate(A, B) {
            this.dataAdapter.getDataAsync(A, B, {
                priority: "low"
            }).catch((Q) => {
                r4.Log.error("An error occurred after update.", Q)
            })
        }
        _resetForUser(A) {
            this._logger.reset(), this._store.reset(), this._user = this._configureUser(A, this._options)
        }
        _configureUser(A, B) {
            var Q;
            let Z = r4._normalizeUser(A, B),
                D = (Q = Z.customIDs) === null || Q === void 0 ? void 0 : Q.stableID;
            if (D) r4.StableID.setOverride(D, this._sdkKey);
            return Z
        }
        _getFeatureGateImpl(A, B) {
            var Q, Z;
            let {
                result: D,
                details: G
            } = this._store.getGate(A), F = r4._makeFeatureGate(A, G, D), I = (Z = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getGateOverride) === null || Z === void 0 ? void 0 : Z.call(Q, F, this._user, B), Y = I !== null && I !== void 0 ? I : F;
            return this._enqueueExposure(A, r4._createGateExposure(this._user, Y, this._store.getExposureMapping()), B), this.$emt({
                name: "gate_evaluation",
                gate: Y
            }), Y
        }
        _getDynamicConfigImpl(A, B) {
            var Q, Z;
            let {
                result: D,
                details: G
            } = this._store.getConfig(A), F = r4._makeDynamicConfig(A, G, D), I = (Z = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getDynamicConfigOverride) === null || Z === void 0 ? void 0 : Z.call(Q, F, this._user, B), Y = I !== null && I !== void 0 ? I : F;
            return this._enqueueExposure(A, r4._createConfigExposure(this._user, Y, this._store.getExposureMapping()), B), this.$emt({
                name: "dynamic_config_evaluation",
                dynamicConfig: Y
            }), Y
        }
        _getExperimentImpl(A, B) {
            var Q, Z, D, G;
            let {
                result: F,
                details: I
            } = this._store.getConfig(A), Y = r4._makeExperiment(A, I, F);
            if (Y.__evaluation != null) Y.__evaluation.secondary_exposures = r4._mapExposures((Z = (Q = Y.__evaluation) === null || Q === void 0 ? void 0 : Q.secondary_exposures) !== null && Z !== void 0 ? Z : [], this._store.getExposureMapping());
            let W = (G = (D = this.overrideAdapter) === null || D === void 0 ? void 0 : D.getExperimentOverride) === null || G === void 0 ? void 0 : G.call(D, Y, this._user, B),
                J = W !== null && W !== void 0 ? W : Y;
            return this._enqueueExposure(A, r4._createConfigExposure(this._user, J, this._store.getExposureMapping()), B), this.$emt({
                name: "experiment_evaluation",
                experiment: J
            }), J
        }
        _getLayerImpl(A, B) {
            var Q, Z, D;
            let {
                result: G,
                details: F
            } = this._store.getLayer(A), I = r4._makeLayer(A, F, G), Y = (Z = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getLayerOverride) === null || Z === void 0 ? void 0 : Z.call(Q, I, this._user, B);
            if (B === null || B === void 0 ? void 0 : B.disableExposureLog) this._logger.incrementNonExposureCount(A);
            let W = r4._mergeOverride(I, Y, (D = Y === null || Y === void 0 ? void 0 : Y.__value) !== null && D !== void 0 ? D : I.__value, (J) => {
                if (B === null || B === void 0 ? void 0 : B.disableExposureLog) return;
                this._enqueueExposure(A, r4._createLayerParameterExposure(this._user, W, J, this._store.getExposureMapping()), B)
            });
            return this.$emt({
                name: "layer_evaluation",
                layer: W
            }), W
        }
        _getParameterStoreImpl(A, B) {
            var Q, Z;
            let {
                result: D,
                details: G
            } = this._store.getParamStore(A);
            this._logger.incrementNonExposureCount(A);
            let F = {
                    name: A,
                    details: G,
                    __configuration: D,
                    get: Mt0._makeParamStoreGetter(this, D, B)
                },
                I = (Z = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getParamStoreOverride) === null || Z === void 0 ? void 0 : Z.call(Q, F, B);
            if (I != null) F.__configuration = I.config, F.details = I.details, F.get = Mt0._makeParamStoreGetter(this, I.config, B);
            return F
        }
    }
    G91.default = KC1
});
var Tt0 = E((KN) => {
    var px9 = KN && KN.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        ix9 = KN && KN.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) px9(B, A, Q)
        };
    Object.defineProperty(KN, "__esModule", {
        value: !0
    });
    KN.StatsigClient = void 0;
    var Ot0 = Rt0();
    KN.StatsigClient = Ot0.default;
    ix9(Xk(), KN);
    __STATSIG__ = Object.assign(Object.assign({}, __STATSIG__ !== null && __STATSIG__ !== void 0 ? __STATSIG__ : {}), {
        StatsigClient: Ot0.default
    });
    KN.default = __STATSIG__
});
var Yn1 = E((vt8, tt0) => {
    var {
        defineProperty: zC1,
        getOwnPropertyDescriptor: Jv9,
        getOwnPropertyNames: Xv9
    } = Object, Vv9 = Object.prototype.hasOwnProperty, EC1 = (A, B) => zC1(A, "name", {
        value: B,
        configurable: !0
    }), Cv9 = (A, B) => {
        for (var Q in B) zC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Kv9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xv9(B))
                if (!Vv9.call(A, D) && D !== Q) zC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Jv9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hv9 = (A) => Kv9(zC1({}, "__esModule", {
        value: !0
    }), A), lt0 = {};
    Cv9(lt0, {
        AlgorithmId: () => at0,
        EndpointURLScheme: () => nt0,
        FieldPosition: () => st0,
        HttpApiKeyAuthLocation: () => it0,
        HttpAuthLocation: () => pt0,
        IniSectionType: () => rt0,
        RequestHandlerProtocol: () => ot0,
        SMITHY_CONTEXT_KEY: () => $v9,
        getDefaultClientConfiguration: () => Uv9,
        resolveDefaultRuntimeConfig: () => wv9
    });
    tt0.exports = Hv9(lt0);
    var pt0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(pt0 || {}),
        it0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(it0 || {}),
        nt0 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(nt0 || {}),
        at0 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(at0 || {}),
        zv9 = EC1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        Ev9 = EC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Uv9 = EC1((A) => {
            return zv9(A)
        }, "getDefaultClientConfiguration"),
        wv9 = EC1((A) => {
            return Ev9(A)
        }, "resolveDefaultRuntimeConfig"),
        st0 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(st0 || {}),
        $v9 = "__smithy_context",
        rt0 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(rt0 || {}),
        ot0 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(ot0 || {})
});