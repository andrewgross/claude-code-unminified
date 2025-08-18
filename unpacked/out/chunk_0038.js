/* chunk:38 bytes:[1075975, 1093826) size:17851 source:unpacked-cli.js */
var uW = E((ns0) => {
    Object.defineProperty(ns0, "__esModule", {
        value: !0
    });
    ns0.Log = ns0.LogLevel = void 0;
    var fk9 = " DEBUG ",
        hk9 = "  INFO ",
        gk9 = "  WARN ",
        uk9 = " ERROR ";

    function hV1(A) {
        return A.unshift("[Statsig]"), A
    }
    ns0.LogLevel = {
        None: 0,
        Error: 1,
        Warn: 2,
        Info: 3,
        Debug: 4
    };
    class Gh {
        static info(...A) {
            if (Gh.level >= ns0.LogLevel.Info) console.info(hk9, ...hV1(A))
        }
        static debug(...A) {
            if (Gh.level >= ns0.LogLevel.Debug) console.debug(fk9, ...hV1(A))
        }
        static warn(...A) {
            if (Gh.level >= ns0.LogLevel.Warn) console.warn(gk9, ...hV1(A))
        }
        static error(...A) {
            if (Gh.level >= ns0.LogLevel.Error) console.error(uk9, ...hV1(A))
        }
    }
    ns0.Log = Gh;
    Gh.level = ns0.LogLevel.Warn
});
var Fh = E((ts0) => {
    var qi1, Ni1, Li1;
    Object.defineProperty(ts0, "__esModule", {
        value: !0
    });
    ts0._getInstance = ts0._getStatsigGlobalFlag = ts0._getStatsigGlobal = void 0;
    var mk9 = uW(),
        dk9 = () => {
            return __STATSIG__ ? __STATSIG__ : gV1
        };
    ts0._getStatsigGlobal = dk9;
    var ck9 = (A) => {
        return ts0._getStatsigGlobal()[A]
    };
    ts0._getStatsigGlobalFlag = ck9;
    var lk9 = (A) => {
        let B = ts0._getStatsigGlobal();
        if (!A) {
            if (B.instances && Object.keys(B.instances).length > 1) mk9.Log.warn("Call made to Statsig global instance without an SDK key but there is more than one client instance. If you are using mulitple clients, please specify the SDK key.");
            return B.firstInstance
        }
        return B.instances && B.instances[A]
    };
    ts0._getInstance = lk9;
    var Lp = "__STATSIG__",
        ss0 = typeof window !== "undefined" ? window : {},
        rs0 = typeof global !== "undefined" ? global : {},
        os0 = typeof globalThis !== "undefined" ? globalThis : {},
        gV1 = (Li1 = (Ni1 = (qi1 = ss0[Lp]) !== null && qi1 !== void 0 ? qi1 : rs0[Lp]) !== null && Ni1 !== void 0 ? Ni1 : os0[Lp]) !== null && Li1 !== void 0 ? Li1 : {
            instance: ts0._getInstance
        };
    ss0[Lp] = gV1;
    rs0[Lp] = gV1;
    os0[Lp] = gV1
});
var mV1 = E((es0) => {
    Object.defineProperty(es0, "__esModule", {
        value: !0
    });
    es0.Diagnostics = void 0;
    var uV1 = new Map,
        Oi1 = "start",
        Ti1 = "end",
        ik9 = "statsig::diagnostics";
    es0.Diagnostics = {
        _getMarkers: (A) => {
            return uV1.get(A)
        },
        _markInitOverallStart: (A) => {
            Rp(A, Mp({}, Oi1, "overall"))
        },
        _markInitOverallEnd: (A, B, Q) => {
            Rp(A, Mp({
                success: B,
                error: B ? void 0 : {
                    name: "InitializeError",
                    message: "Failed to initialize"
                },
                evaluationDetails: Q
            }, Ti1, "overall"))
        },
        _markInitNetworkReqStart: (A, B) => {
            Rp(A, Mp(B, Oi1, "initialize", "network_request"))
        },
        _markInitNetworkReqEnd: (A, B) => {
            Rp(A, Mp(B, Ti1, "initialize", "network_request"))
        },
        _markInitProcessStart: (A) => {
            Rp(A, Mp({}, Oi1, "initialize", "process"))
        },
        _markInitProcessEnd: (A, B) => {
            Rp(A, Mp(B, Ti1, "initialize", "process"))
        },
        _clearMarkers: (A) => {
            uV1.delete(A)
        },
        _formatError(A) {
            if (!(A && typeof A === "object")) return;
            return {
                code: Pi1(A, "code"),
                name: Pi1(A, "name"),
                message: Pi1(A, "message")
            }
        },
        _getDiagnosticsData(A, B, Q, Z) {
            var D;
            return {
                success: (A === null || A === void 0 ? void 0 : A.ok) === !0,
                statusCode: A === null || A === void 0 ? void 0 : A.status,
                sdkRegion: (D = A === null || A === void 0 ? void 0 : A.headers) === null || D === void 0 ? void 0 : D.get("x-statsig-region"),
                isDelta: Q.includes('"is_delta":true') === !0 ? !0 : void 0,
                attempt: B,
                error: es0.Diagnostics._formatError(Z)
            }
        },
        _enqueueDiagnosticsEvent(A, B, Q, Z) {
            let D = es0.Diagnostics._getMarkers(Q);
            if (D == null || D.length <= 0) return -1;
            let G = D[D.length - 1].timestamp - D[0].timestamp;
            es0.Diagnostics._clearMarkers(Q);
            let F = nk9(A, {
                context: "initialize",
                markers: D.slice(),
                statsigOptions: Z
            });
            return B.enqueue(F), G
        }
    };

    function Mp(A, B, Q, Z) {
        return Object.assign({
            key: Q,
            action: B,
            step: Z,
            timestamp: Date.now()
        }, A)
    }

    function nk9(A, B) {
        return {
            eventName: ik9,
            user: A,
            value: null,
            metadata: B,
            time: Date.now()
        }
    }

    function Rp(A, B) {
        var Q;
        let Z = (Q = uV1.get(A)) !== null && Q !== void 0 ? Q : [];
        Z.push(B), uV1.set(A, Z)
    }

    function Pi1(A, B) {
        if (B in A) return A[B];
        return
    }
});
var dV1 = E((Ar0) => {
    Object.defineProperty(Ar0, "__esModule", {
        value: !0
    });
    Ar0._isTypeMatch = Ar0._typeOf = void 0;

    function ak9(A) {
        return Array.isArray(A) ? "array" : typeof A
    }
    Ar0._typeOf = ak9;

    function sk9(A, B) {
        let Q = (Z) => Array.isArray(Z) ? "array" : typeof Z;
        return Q(A) === Q(B)
    }
    Ar0._isTypeMatch = sk9
});
var Op = E((Qr0) => {
    Object.defineProperty(Qr0, "__esModule", {
        value: !0
    });
    Qr0._getSortedObject = Qr0._DJB2Object = Qr0._DJB2 = void 0;
    var ok9 = dV1(),
        tk9 = (A) => {
            let B = 0;
            for (let Q = 0; Q < A.length; Q++) {
                let Z = A.charCodeAt(Q);
                B = (B << 5) - B + Z, B = B & B
            }
            return String(B >>> 0)
        };
    Qr0._DJB2 = tk9;
    var ek9 = (A, B) => {
        return Qr0._DJB2(JSON.stringify(Qr0._getSortedObject(A, B)))
    };
    Qr0._DJB2Object = ek9;
    var Ay9 = (A, B) => {
        if (A == null) return null;
        let Q = Object.keys(A).sort(),
            Z = {};
        return Q.forEach((D) => {
            let G = A[D];
            if (B === 0 || ok9._typeOf(G) !== "object") {
                Z[D] = G;
                return
            }
            Z[D] = Qr0._getSortedObject(G, B != null ? B - 1 : B)
        }), Z
    };
    Qr0._getSortedObject = Ay9
});
var tB1 = E((Fr0) => {
    Object.defineProperty(Fr0, "__esModule", {
        value: !0
    });
    Fr0._getStorageKey = Fr0._getUserStorageKey = void 0;
    var Dr0 = Op();

    function Gr0(A, B, Q) {
        var Z;
        if (Q) return Q(A, B);
        let D = B && B.customIDs ? B.customIDs : {},
            G = [`uid:${(Z=B===null||B===void 0?void 0:B.userID)!==null&&Z!==void 0?Z:""}`, `cids:${Object.keys(D).sort((F,I)=>F.localeCompare(I)).map((F)=>`${F}-${D[F]}`).join(",")}`, `k:${A}`];
        return Dr0._DJB2(G.join("|"))
    }
    Fr0._getUserStorageKey = Gr0;

    function Qy9(A, B, Q) {
        if (B) return Gr0(A, B, Q);
        return Dr0._DJB2(`k:${A}`)
    }
    Fr0._getStorageKey = Qy9
});
var eB1 = E((Yr0) => {
    Object.defineProperty(Yr0, "__esModule", {
        value: !0
    });
    Yr0.NetworkParam = Yr0.NetworkDefault = Yr0.Endpoint = void 0;
    Yr0.Endpoint = {
        _initialize: "initialize",
        _rgstr: "rgstr",
        _download_config_specs: "download_config_specs"
    };
    Yr0.NetworkDefault = {
        [Yr0.Endpoint._rgstr]: "https://prodregistryv2.org/v1",
        [Yr0.Endpoint._initialize]: "https://featureassets.org/v1",
        [Yr0.Endpoint._download_config_specs]: "https://api.statsigcdn.com/v1"
    };
    Yr0.NetworkParam = {
        EventCount: "ec",
        SdkKey: "k",
        SdkType: "st",
        SdkVersion: "sv",
        Time: "t",
        SessionID: "sid",
        StatsigEncoded: "se",
        IsGzipped: "gz"
    }
});
var Ih = E((Jr0) => {
    Object.defineProperty(Jr0, "__esModule", {
        value: !0
    });
    Jr0._getCurrentPageUrlSafe = Jr0._addDocumentEventListenerSafe = Jr0._addWindowEventListenerSafe = Jr0._isServerEnv = Jr0._getDocumentSafe = Jr0._getWindowSafe = void 0;
    var Gy9 = () => {
        return typeof window !== "undefined" ? window : null
    };
    Jr0._getWindowSafe = Gy9;
    var Fy9 = () => {
        var A;
        let B = Jr0._getWindowSafe();
        return (A = B === null || B === void 0 ? void 0 : B.document) !== null && A !== void 0 ? A : null
    };
    Jr0._getDocumentSafe = Fy9;
    var Iy9 = () => {
        if (Jr0._getDocumentSafe() !== null) return !1;
        let A = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
        return typeof EdgeRuntime === "string" || A
    };
    Jr0._isServerEnv = Iy9;
    var Yy9 = (A, B) => {
        let Q = Jr0._getWindowSafe();
        if (typeof(Q === null || Q === void 0 ? void 0 : Q.addEventListener) === "function") Q.addEventListener(A, B)
    };
    Jr0._addWindowEventListenerSafe = Yy9;
    var Wy9 = (A, B) => {
        let Q = Jr0._getDocumentSafe();
        if (typeof(Q === null || Q === void 0 ? void 0 : Q.addEventListener) === "function") Q.addEventListener(A, B)
    };
    Jr0._addDocumentEventListenerSafe = Wy9;
    var Jy9 = () => {
        var A;
        try {
            return (A = Jr0._getWindowSafe()) === null || A === void 0 ? void 0 : A.location.href.split(/[?#]/)[0]
        } catch (B) {
            return
        }
    };
    Jr0._getCurrentPageUrlSafe = Jy9
});
var ki1 = E((Hr0) => {
    Object.defineProperty(Hr0, "__esModule", {
        value: !0
    });
    Hr0._createLayerParameterExposure = Hr0._createConfigExposure = Hr0._mapExposures = Hr0._createGateExposure = Hr0._isExposureEvent = void 0;
    var Vr0 = "statsig::config_exposure",
        Cr0 = "statsig::gate_exposure",
        Kr0 = "statsig::layer_exposure",
        ji1 = (A, B, Q, Z, D) => {
            if (Q.bootstrapMetadata) Z.bootstrapMetadata = Q.bootstrapMetadata;
            return {
                eventName: A,
                user: B,
                value: null,
                metadata: Uy9(Q, Z),
                secondaryExposures: D,
                time: Date.now()
            }
        },
        Ky9 = ({
            eventName: A
        }) => {
            return A === Cr0 || A === Vr0 || A === Kr0
        };
    Hr0._isExposureEvent = Ky9;
    var Hy9 = (A, B, Q) => {
        var Z, D, G;
        let F = {
            gate: B.name,
            gateValue: String(B.value),
            ruleID: B.ruleID
        };
        if (((Z = B.__evaluation) === null || Z === void 0 ? void 0 : Z.version) != null) F.configVersion = B.__evaluation.version;
        return ji1(Cr0, A, B.details, F, iV1((G = (D = B.__evaluation) === null || D === void 0 ? void 0 : D.secondary_exposures) !== null && G !== void 0 ? G : [], Q))
    };
    Hr0._createGateExposure = Hy9;

    function iV1(A, B) {
        return A.map((Q) => {
            if (typeof Q === "string") return (B !== null && B !== void 0 ? B : {})[Q];
            return Q
        }).filter((Q) => Q != null)
    }
    Hr0._mapExposures = iV1;
    var zy9 = (A, B, Q) => {
        var Z, D, G, F;
        let I = {
            config: B.name,
            ruleID: B.ruleID
        };
        if (((Z = B.__evaluation) === null || Z === void 0 ? void 0 : Z.version) != null) I.configVersion = B.__evaluation.version;
        if (((D = B.__evaluation) === null || D === void 0 ? void 0 : D.passed) != null) I.rulePassed = String(B.__evaluation.passed);
        return ji1(Vr0, A, B.details, I, iV1((F = (G = B.__evaluation) === null || G === void 0 ? void 0 : G.secondary_exposures) !== null && F !== void 0 ? F : [], Q))
    };
    Hr0._createConfigExposure = zy9;
    var Ey9 = (A, B, Q, Z) => {
        var D, G, F, I;
        let Y = B.__evaluation,
            W = ((D = Y === null || Y === void 0 ? void 0 : Y.explicit_parameters) === null || D === void 0 ? void 0 : D.includes(Q)) === !0,
            J = "",
            X = (G = Y === null || Y === void 0 ? void 0 : Y.undelegated_secondary_exposures) !== null && G !== void 0 ? G : [];
        if (W) J = (F = Y.allocated_experiment_name) !== null && F !== void 0 ? F : "", X = Y.secondary_exposures;
        let V = {
            config: B.name,
            parameterName: Q,
            ruleID: B.ruleID,
            allocatedExperiment: J,
            isExplicitParameter: String(W)
        };
        if (((I = B.__evaluation) === null || I === void 0 ? void 0 : I.version) != null) V.configVersion = B.__evaluation.version;
        return ji1(Kr0, A, B.details, V, iV1(X, Z))
    };
    Hr0._createLayerParameterExposure = Ey9;
    var Uy9 = (A, B) => {
        if (B.reason = A.reason, A.lcut) B.lcut = String(A.lcut);
        if (A.receivedAt) B.receivedAt = String(A.receivedAt);
        return B
    }
});
var TO = E((Er0) => {
    Object.defineProperty(Er0, "__esModule", {
        value: !0
    });
    Er0._setObjectInStorage = Er0._getObjectFromStorage = Er0.Storage = void 0;
    var Ly9 = uW(),
        My9 = Ih(),
        A91 = {},
        _i1 = {
            isReady: () => !0,
            isReadyResolver: () => null,
            getProviderName: () => "InMemory",
            getItem: (A) => A91[A] ? A91[A] : null,
            setItem: (A, B) => {
                A91[A] = B
            },
            removeItem: (A) => {
                delete A91[A]
            },
            getAllKeys: () => Object.keys(A91)
        },
        nV1 = null;
    try {
        let A = My9._getWindowSafe();
        if (A && A.localStorage && typeof A.localStorage.getItem === "function") nV1 = {
            isReady: () => !0,
            isReadyResolver: () => null,
            getProviderName: () => "LocalStorage",
            getItem: (B) => A.localStorage.getItem(B),
            setItem: (B, Q) => A.localStorage.setItem(B, Q),
            removeItem: (B) => A.localStorage.removeItem(B),
            getAllKeys: () => Object.keys(A.localStorage)
        }
    } catch (A) {
        Ly9.Log.warn("Failed to setup localStorageProvider.")
    }
    var yi1 = nV1 !== null && nV1 !== void 0 ? nV1 : _i1,
        CN = yi1;

    function Ry9(A) {
        try {
            return A()
        } catch (B) {
            if (B instanceof Error && B.name === "SecurityError") return Er0.Storage._setProvider(_i1), null;
            throw B
        }
    }
    Er0.Storage = {
        isReady: () => CN.isReady(),
        isReadyResolver: () => CN.isReadyResolver(),
        getProviderName: () => CN.getProviderName(),
        getItem: (A) => Ry9(() => CN.getItem(A)),
        setItem: (A, B) => CN.setItem(A, B),
        removeItem: (A) => CN.removeItem(A),
        getAllKeys: () => CN.getAllKeys(),
        _setProvider: (A) => {
            yi1 = A, CN = A
        },
        _setDisabled: (A) => {
            if (A) CN = _i1;
            else CN = yi1
        }
    };

    function Oy9(A) {
        let B = Er0.Storage.getItem(A);
        return JSON.parse(B !== null && B !== void 0 ? B : "null")
    }
    Er0._getObjectFromStorage = Oy9;

    function Ty9(A, B) {
        Er0.Storage.setItem(A, JSON.stringify(B))
    }
    Er0._setObjectInStorage = Ty9
});
var xi1 = E(($r0) => {
    Object.defineProperty($r0, "__esModule", {
        value: !0
    });
    $r0.UrlConfiguration = void 0;
    var sV1 = eB1(),
        Sy9 = {
            [sV1.Endpoint._initialize]: "i",
            [sV1.Endpoint._rgstr]: "e",
            [sV1.Endpoint._download_config_specs]: "d"
        };
    class wr0 {
        constructor(A, B, Q, Z) {
            if (this.customUrl = null, this.fallbackUrls = null, this.endpoint = A, this.endpointDnsKey = Sy9[A], B) this.customUrl = B;
            if (!B && Q) this.customUrl = Q.endsWith("/") ? `${Q}${A}` : `${Q}/${A}`;
            if (Z) this.fallbackUrls = Z;
            let D = sV1.NetworkDefault[A];
            this.defaultUrl = `${D}/${A}`
        }
        getUrl() {
            var A;
            return (A = this.customUrl) !== null && A !== void 0 ? A : this.defaultUrl
        }
    }
    $r0.UrlConfiguration = wr0
});
var tV1 = E((Lr0) => {
    Object.defineProperty(Lr0, "__esModule", {
        value: !0
    });
    Lr0._notifyVisibilityChanged = Lr0._subscribeToVisiblityChanged = Lr0._isUnloading = Lr0._isCurrentlyVisible = void 0;
    var rV1 = Ih(),
        oV1 = "foreground",
        bi1 = "background",
        Nr0 = [],
        vi1 = oV1,
        fi1 = !1,
        jy9 = () => {
            return vi1 === oV1
        };
    Lr0._isCurrentlyVisible = jy9;
    var ky9 = () => fi1;
    Lr0._isUnloading = ky9;
    var yy9 = (A) => {
        Nr0.unshift(A)
    };
    Lr0._subscribeToVisiblityChanged = yy9;
    var _y9 = (A) => {
        if (A === vi1) return;
        vi1 = A, Nr0.forEach((B) => B(A))
    };
    Lr0._notifyVisibilityChanged = _y9;
    rV1._addWindowEventListenerSafe("focus", () => {
        fi1 = !1, Lr0._notifyVisibilityChanged(oV1)
    });
    rV1._addWindowEventListenerSafe("blur", () => Lr0._notifyVisibilityChanged(bi1));
    rV1._addWindowEventListenerSafe("beforeunload", () => {
        fi1 = !0, Lr0._notifyVisibilityChanged(bi1)
    });
    rV1._addDocumentEventListenerSafe("visibilitychange", () => {
        Lr0._notifyVisibilityChanged(document.visibilityState === "visible" ? oV1 : bi1)
    })
});