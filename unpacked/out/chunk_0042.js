/* chunk:42 bytes:[1151078, 1168788) size:17710 source:unpacked-cli.js */
var Qt0 = E((At0) => {
    Object.defineProperty(At0, "__esModule", {
        value: !0
    });
    At0._makeTypedGet = At0._mergeOverride = At0._makeLayer = At0._makeExperiment = At0._makeDynamicConfig = At0._makeFeatureGate = void 0;
    var Wx9 = uW(),
        Jx9 = dV1(),
        Xx9 = "default";

    function ei1(A, B, Q, Z) {
        var D;
        return {
            name: A,
            details: B,
            ruleID: (D = Q === null || Q === void 0 ? void 0 : Q.rule_id) !== null && D !== void 0 ? D : Xx9,
            __evaluation: Q,
            value: Z
        }
    }

    function Vx9(A, B, Q) {
        return ei1(A, B, Q, (Q === null || Q === void 0 ? void 0 : Q.value) === !0)
    }
    At0._makeFeatureGate = Vx9;

    function eo0(A, B, Q) {
        var Z;
        let D = (Z = Q === null || Q === void 0 ? void 0 : Q.value) !== null && Z !== void 0 ? Z : {};
        return Object.assign(Object.assign({}, ei1(A, B, Q, D)), {
            get: JC1(A, Q === null || Q === void 0 ? void 0 : Q.value)
        })
    }
    At0._makeDynamicConfig = eo0;

    function Cx9(A, B, Q) {
        var Z;
        let D = eo0(A, B, Q);
        return Object.assign(Object.assign({}, D), {
            groupName: (Z = Q === null || Q === void 0 ? void 0 : Q.group_name) !== null && Z !== void 0 ? Z : null
        })
    }
    At0._makeExperiment = Cx9;

    function Kx9(A, B, Q, Z) {
        var D, G;
        return Object.assign(Object.assign({}, ei1(A, B, Q, void 0)), {
            get: JC1(A, Q === null || Q === void 0 ? void 0 : Q.value, Z),
            groupName: (D = Q === null || Q === void 0 ? void 0 : Q.group_name) !== null && D !== void 0 ? D : null,
            __value: (G = Q === null || Q === void 0 ? void 0 : Q.value) !== null && G !== void 0 ? G : {}
        })
    }
    At0._makeLayer = Kx9;

    function Hx9(A, B, Q, Z) {
        return Object.assign(Object.assign(Object.assign({}, A), B), {
            get: JC1(A.name, Q, Z)
        })
    }
    At0._mergeOverride = Hx9;

    function JC1(A, B, Q) {
        return (Z, D) => {
            var G;
            let F = (G = B === null || B === void 0 ? void 0 : B[Z]) !== null && G !== void 0 ? G : null;
            if (F == null) return D !== null && D !== void 0 ? D : null;
            if (D != null && !Jx9._isTypeMatch(F, D)) return Wx9.Log.warn(`Parameter type mismatch. '${A}.${Z}' was found to be type '${typeof F}' but fallback/return type is '${typeof D}'. See https://docs.statsig.com/client/javascript-sdk/#typed-getters`), D !== null && D !== void 0 ? D : null;
            return Q === null || Q === void 0 || Q(Z), F
        }
    }
    At0._makeTypedGet = JC1
});
var Dt0 = E((Zt0) => {
    Object.defineProperty(Zt0, "__esModule", {
        value: !0
    })
});
var It0 = E((Gt0) => {
    Object.defineProperty(Gt0, "__esModule", {
        value: !0
    });
    Gt0.UPDATE_DETAIL_ERROR_MESSAGES = Gt0.createUpdateDetails = void 0;
    var qx9 = (A, B, Q, Z, D, G) => {
        return {
            duration: Q,
            source: B,
            success: A,
            error: Z,
            sourceUrl: D,
            warnings: G
        }
    };
    Gt0.createUpdateDetails = qx9;
    Gt0.UPDATE_DETAIL_ERROR_MESSAGES = {
        NO_NETWORK_DATA: "No data was returned from the network. This may be due to a network timeout if a timeout value was specified in the options or ad blocker error."
    }
});
var Xk = E((p9) => {
    var Lx9 = p9 && p9.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        g4 = p9 && p9.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) Lx9(B, A, Q)
        };
    Object.defineProperty(p9, "__esModule", {
        value: !0
    });
    p9.Storage = p9.Log = p9.EventLogger = p9.Diagnostics = void 0;
    Fh();
    var Mx9 = mV1();
    Object.defineProperty(p9, "Diagnostics", {
        enumerable: !0,
        get: function() {
            return Mx9.Diagnostics
        }
    });
    var Rx9 = gi1();
    Object.defineProperty(p9, "EventLogger", {
        enumerable: !0,
        get: function() {
            return Rx9.EventLogger
        }
    });
    var Yt0 = uW();
    Object.defineProperty(p9, "Log", {
        enumerable: !0,
        get: function() {
            return Yt0.Log
        }
    });
    var Ox9 = Z91(),
        Tx9 = TO();
    Object.defineProperty(p9, "Storage", {
        enumerable: !0,
        get: function() {
            return Tx9.Storage
        }
    });
    g4(Fh(), p9);
    g4(tB1(), p9);
    g4(kr0(), p9);
    g4(ar0(), p9);
    g4(mV1(), p9);
    g4(rr0(), p9);
    g4(li1(), p9);
    g4(Do0(), p9);
    g4(Fo0(), p9);
    g4(Op(), p9);
    g4(Yo0(), p9);
    g4(uW(), p9);
    g4(pi1(), p9);
    g4(eB1(), p9);
    g4(go0(), p9);
    g4(mo0(), p9);
    g4(co0(), p9);
    g4(Ih(), p9);
    g4(FC1(), p9);
    g4(YC1(), p9);
    g4(QC1(), p9);
    g4(po0(), p9);
    g4(ri1(), p9);
    g4(ao0(), p9);
    g4(ki1(), p9);
    g4(Z91(), p9);
    g4(ro0(), p9);
    g4(to0(), p9);
    g4(Qt0(), p9);
    g4(Dt0(), p9);
    g4(mi1(), p9);
    g4(TO(), p9);
    g4(di1(), p9);
    g4(dV1(), p9);
    g4(xi1(), p9);
    g4(AC1(), p9);
    g4(tV1(), p9);
    g4(It0(), p9);
    g4(ai1(), p9);
    __STATSIG__ = Object.assign(Object.assign({}, __STATSIG__ !== null && __STATSIG__ !== void 0 ? __STATSIG__ : {}), {
        Log: Yt0.Log,
        SDK_VERSION: Ox9.SDK_VERSION
    })
});
var Xt0 = E((Jt0) => {
    Object.defineProperty(Jt0, "__esModule", {
        value: !0
    });
    var Jh = Xk();
    class Wt0 {
        constructor(A) {
            this._sdkKey = A, this._rawValues = null, this._values = null, this._source = "Uninitialized", this._lcut = 0, this._receivedAt = 0, this._bootstrapMetadata = null, this._warnings = new Set
        }
        reset() {
            this._values = null, this._rawValues = null, this._source = "Loading", this._lcut = 0, this._receivedAt = 0, this._bootstrapMetadata = null
        }
        finalize() {
            if (this._values) return;
            this._source = "NoValues"
        }
        getValues() {
            return this._rawValues ? Jh._typedJsonParse(this._rawValues, "has_updates", "EvaluationStoreValues") : null
        }
        setValues(A, B) {
            var Q;
            if (!A) return !1;
            let Z = Jh._typedJsonParse(A.data, "has_updates", "EvaluationResponse");
            if (Z == null) return !1;
            if (this._source = A.source, (Z === null || Z === void 0 ? void 0 : Z.has_updates) !== !0) return !0;
            if (this._rawValues = A.data, this._lcut = Z.time, this._receivedAt = A.receivedAt, this._values = Z, this._bootstrapMetadata = this._extractBootstrapMetadata(A.source, Z), A.source && Z.user) this._setWarningState(B, Z);
            return Jh.SDKFlags.setFlags(this._sdkKey, (Q = Z.sdk_flags) !== null && Q !== void 0 ? Q : {}), !0
        }
        getWarnings() {
            if (this._warnings.size === 0) return;
            return Array.from(this._warnings)
        }
        getGate(A) {
            var B;
            return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.feature_gates, A)
        }
        getConfig(A) {
            var B;
            return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.dynamic_configs, A)
        }
        getLayer(A) {
            var B;
            return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.layer_configs, A)
        }
        getParamStore(A) {
            var B;
            return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.param_stores, A)
        }
        getSource() {
            return this._source
        }
        getExposureMapping() {
            var A;
            return (A = this._values) === null || A === void 0 ? void 0 : A.exposures
        }
        _extractBootstrapMetadata(A, B) {
            if (A !== "Bootstrap") return null;
            let Q = {};
            if (B.user) Q.user = B.user;
            if (B.sdkInfo) Q.generatorSDKInfo = B.sdkInfo;
            return Q.lcut = B.time, Q
        }
        _getDetailedStoreResult(A, B) {
            let Q = null;
            if (A) Q = A[B] ? A[B] : A[Jh._DJB2(B)];
            return {
                result: Q,
                details: this._getDetails(Q == null)
            }
        }
        _setWarningState(A, B) {
            var Q;
            let Z = Jh.StableID.get(this._sdkKey);
            if (((Q = A.customIDs) === null || Q === void 0 ? void 0 : Q.stableID) !== Z) {
                this._warnings.add("StableIDMismatch");
                return
            }
            if ("user" in B) {
                let D = B.user;
                if (Jh._getFullUserHash(A) !== Jh._getFullUserHash(D)) this._warnings.add("PartialUserMatch")
            }
        }
        getCurrentSourceDetails() {
            if (this._source === "Uninitialized" || this._source === "NoValues") return {
                reason: this._source
            };
            let A = {
                reason: this._source,
                lcut: this._lcut,
                receivedAt: this._receivedAt
            };
            if (this._warnings.size > 0) A.warnings = Array.from(this._warnings);
            return A
        }
        _getDetails(A) {
            var B, Q;
            let Z = this.getCurrentSourceDetails(),
                D = Z.reason,
                G = (B = Z.warnings) !== null && B !== void 0 ? B : [];
            if (this._source === "Bootstrap" && G.length > 0) D = D + G[0];
            if (D !== "Uninitialized" && D !== "NoValues") D = `${D}:${A?"Unrecognized":"Recognized"}`;
            let F = this._source === "Bootstrap" ? (Q = this._bootstrapMetadata) !== null && Q !== void 0 ? Q : void 0 : void 0;
            if (F) Z.bootstrapMetadata = F;
            return Object.assign(Object.assign({}, Z), {
                reason: D
            })
        }
    }
    Jt0.default = Wt0
});
var Ht0 = E((Ct0) => {
    Object.defineProperty(Ct0, "__esModule", {
        value: !0
    });
    Ct0._resolveDeltasResponse = void 0;
    var Vt0 = Xk(),
        Sx9 = 2;

    function jx9(A, B) {
        let Q = Vt0._typedJsonParse(B, "checksum", "DeltasEvaluationResponse");
        if (!Q) return {
            hadBadDeltaChecksum: !0
        };
        let Z = kx9(A, Q),
            D = yx9(Z),
            G = Vt0._DJB2Object({
                feature_gates: D.feature_gates,
                dynamic_configs: D.dynamic_configs,
                layer_configs: D.layer_configs
            }, Sx9);
        if (G !== Q.checksumV2) return {
            hadBadDeltaChecksum: !0,
            badChecksum: G,
            badMergedConfigs: D,
            badFullResponse: Q.deltas_full_response
        };
        return JSON.stringify(D)
    }
    Ct0._resolveDeltasResponse = jx9;

    function kx9(A, B) {
        return Object.assign(Object.assign(Object.assign({}, A), B), {
            feature_gates: Object.assign(Object.assign({}, A.feature_gates), B.feature_gates),
            layer_configs: Object.assign(Object.assign({}, A.layer_configs), B.layer_configs),
            dynamic_configs: Object.assign(Object.assign({}, A.dynamic_configs), B.dynamic_configs)
        })
    }

    function yx9(A) {
        let B = A;
        return An1(A.deleted_gates, B.feature_gates), delete B.deleted_gates, An1(A.deleted_configs, B.dynamic_configs), delete B.deleted_configs, An1(A.deleted_layers, B.layer_configs), delete B.deleted_layers, B
    }

    function An1(A, B) {
        A === null || A === void 0 || A.forEach((Q) => {
            delete B[Q]
        })
    }
});
var Bn1 = E((D91) => {
    var zt0 = D91 && D91.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(D91, "__esModule", {
        value: !0
    });
    var XC1 = Xk(),
        _x9 = Ht0();
    class Et0 extends XC1.NetworkCore {
        constructor(A, B) {
            super(A, B);
            let Q = A === null || A === void 0 ? void 0 : A.networkConfig;
            this._initializeUrlConfig = new XC1.UrlConfiguration(XC1.Endpoint._initialize, Q === null || Q === void 0 ? void 0 : Q.initializeUrl, Q === null || Q === void 0 ? void 0 : Q.api, Q === null || Q === void 0 ? void 0 : Q.initializeFallbackUrls)
        }
        fetchEvaluations(A, B, Q, Z, D) {
            return zt0(this, void 0, void 0, function*() {
                let G = B ? XC1._typedJsonParse(B, "has_updates", "InitializeResponse") : null,
                    F = {
                        user: Z,
                        hash: "djb2",
                        deltasResponseRequested: !1,
                        full_checksum: null
                    };
                if (G === null || G === void 0 ? void 0 : G.has_updates) F = Object.assign(Object.assign({}, F), {
                    sinceTime: D ? G.time : 0,
                    previousDerivedFields: "derived_fields" in G && D ? G.derived_fields : {},
                    deltasResponseRequested: !0,
                    full_checksum: G.full_checksum
                });
                return this._fetchEvaluations(A, G, F, Q)
            })
        }
        _fetchEvaluations(A, B, Q, Z) {
            var D, G;
            return zt0(this, void 0, void 0, function*() {
                let F = yield this.post({
                    sdkKey: A,
                    urlConfig: this._initializeUrlConfig,
                    data: Q,
                    retries: 2,
                    isStatsigEncodable: !0,
                    priority: Z
                });
                if ((F === null || F === void 0 ? void 0 : F.code) === 204) return '{"has_updates": false}';
                if ((F === null || F === void 0 ? void 0 : F.code) !== 200) return (D = F === null || F === void 0 ? void 0 : F.body) !== null && D !== void 0 ? D : null;
                if ((B === null || B === void 0 ? void 0 : B.has_updates) !== !0 || ((G = F.body) === null || G === void 0 ? void 0 : G.includes('"is_delta":true')) !== !0 || Q.deltasResponseRequested !== !0) return F.body;
                let I = _x9._resolveDeltasResponse(B, F.body);
                if (typeof I === "string") return I;
                return this._fetchEvaluations(A, B, Object.assign(Object.assign(Object.assign({}, Q), I), {
                    deltasResponseRequested: !1
                }), Z)
            })
        }
    }
    D91.default = Et0
});
var qt0 = E((wt0) => {
    Object.defineProperty(wt0, "__esModule", {
        value: !0
    });
    wt0._makeParamStoreGetter = void 0;
    var Ut0 = Xk(),
        VC1 = {
            disableExposureLog: !0
        };

    function CC1(A) {
        return A == null || A.disableExposureLog === !1
    }

    function Qn1(A, B) {
        return B != null && !Ut0._isTypeMatch(A, B)
    }

    function xx9(A, B) {
        return A.value
    }

    function vx9(A, B, Q) {
        if (A.getFeatureGate(B.gate_name, CC1(Q) ? void 0 : VC1).value) return B.pass_value;
        return B.fail_value
    }

    function bx9(A, B, Q, Z) {
        let G = A.getDynamicConfig(B.config_name, VC1).get(B.param_name);
        if (Qn1(G, Q)) return Q;
        if (CC1(Z)) A.getDynamicConfig(B.config_name);
        return G
    }

    function fx9(A, B, Q, Z) {
        let G = A.getExperiment(B.experiment_name, VC1).get(B.param_name);
        if (Qn1(G, Q)) return Q;
        if (CC1(Z)) A.getExperiment(B.experiment_name);
        return G
    }

    function hx9(A, B, Q, Z) {
        let G = A.getLayer(B.layer_name, VC1).get(B.param_name);
        if (Qn1(G, Q)) return Q;
        if (CC1(Z)) A.getLayer(B.layer_name).get(B.param_name);
        return G
    }

    function gx9(A, B, Q) {
        return (Z, D) => {
            if (B == null) return D;
            let G = B[Z];
            if (G == null || D != null && Ut0._typeOf(D) !== G.param_type) return D;
            switch (G.ref_type) {
                case "static":
                    return xx9(G, Q);
                case "gate":
                    return vx9(A, G, Q);
                case "dynamic_config":
                    return bx9(A, G, D, Q);
                case "experiment":
                    return fx9(A, G, D, Q);
                case "layer":
                    return hx9(A, G, D, Q);
                default:
                    return D
            }
        }
    }
    wt0._makeParamStoreGetter = gx9
});