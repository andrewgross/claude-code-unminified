/* chunk:40 bytes:[1113777, 1132456) size:18679 source:unpacked-cli.js */
var FC1 = E((tr0) => {
    Object.defineProperty(tr0, "__esModule", {
        value: !0
    });
    tr0.SDKType = void 0;
    var or0 = {},
        kp;
    tr0.SDKType = {
        _get: (A) => {
            var B;
            return ((B = or0[A]) !== null && B !== void 0 ? B : "js-mono") + (kp !== null && kp !== void 0 ? kp : "")
        },
        _setClientType(A, B) {
            or0[A] = B
        },
        _setBindingType(A) {
            if (!kp || kp === "-react") kp = "-" + A
        }
    }
});
var li1 = E((PO) => {
    var G_9 = PO && PO.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(PO, "__esModule", {
        value: !0
    });
    PO.ErrorBoundary = PO.EXCEPTION_ENDPOINT = void 0;
    var F_9 = uW(),
        I_9 = FC1(),
        Y_9 = Z91();
    PO.EXCEPTION_ENDPOINT = "https://statsigapi.net/v1/sdk_exception";
    var Bo0 = "[Statsig] UnknownError";
    class Qo0 {
        constructor(A, B, Q, Z) {
            this._sdkKey = A, this._options = B, this._emitter = Q, this._lastSeenError = Z, this._seen = new Set
        }
        wrap(A) {
            try {
                let B = A;
                J_9(B).forEach((Q) => {
                    let Z = B[Q];
                    if ("$EB" in Z) return;
                    B[Q] = (...D) => {
                        return this._capture(Q, () => Z.apply(A, D))
                    }, B[Q].$EB = !0
                })
            } catch (B) {
                this._onError("eb:wrap", B)
            }
        }
        logError(A, B) {
            this._onError(A, B)
        }
        getLastSeenErrorAndReset() {
            let A = this._lastSeenError;
            return this._lastSeenError = void 0, A !== null && A !== void 0 ? A : null
        }
        attachErrorIfNoneExists(A) {
            if (this._lastSeenError) return;
            this._lastSeenError = Ao0(A)
        }
        _capture(A, B) {
            try {
                let Q = B();
                if (Q && Q instanceof Promise) return Q.catch((Z) => this._onError(A, Z));
                return Q
            } catch (Q) {
                return this._onError(A, Q), null
            }
        }
        _onError(A, B) {
            try {
                F_9.Log.warn(`Caught error in ${A}`, {
                    error: B
                }), (() => G_9(this, void 0, void 0, function*() {
                    var Z, D, G, F, I, Y, W;
                    let J = B ? B : Error(Bo0),
                        X = J instanceof Error,
                        V = X ? J.name : "No Name",
                        C = Ao0(J);
                    if (this._lastSeenError = C, this._seen.has(V)) return;
                    if (this._seen.add(V), (D = (Z = this._options) === null || Z === void 0 ? void 0 : Z.networkConfig) === null || D === void 0 ? void 0 : D.preventAllNetworkTraffic) {
                        (G = this._emitter) === null || G === void 0 || G.call(this, {
                            name: "error",
                            error: B,
                            tag: A
                        });
                        return
                    }
                    let K = I_9.SDKType._get(this._sdkKey),
                        H = Y_9.StatsigMetadataProvider.get(),
                        z = X ? J.stack : W_9(J),
                        $ = JSON.stringify(Object.assign({
                            tag: A,
                            exception: V,
                            info: z
                        }, Object.assign(Object.assign({}, H), {
                            sdkType: K
                        })));
                    yield((Y = (I = (F = this._options) === null || F === void 0 ? void 0 : F.networkConfig) === null || I === void 0 ? void 0 : I.networkOverrideFunc) !== null && Y !== void 0 ? Y : fetch)(PO.EXCEPTION_ENDPOINT, {
                        method: "POST",
                        headers: {
                            "STATSIG-API-KEY": this._sdkKey,
                            "STATSIG-SDK-TYPE": String(K),
                            "STATSIG-SDK-VERSION": String(H.sdkVersion),
                            "Content-Type": "application/json"
                        },
                        body: $
                    }), (W = this._emitter) === null || W === void 0 || W.call(this, {
                        name: "error",
                        error: B,
                        tag: A
                    })
                }))().then(() => {}).catch(() => {})
            } catch (Q) {}
        }
    }
    PO.ErrorBoundary = Qo0;

    function Ao0(A) {
        if (A instanceof Error) return A;
        else if (typeof A === "string") return new Error(A);
        else return new Error("An unknown error occurred.")
    }

    function W_9(A) {
        try {
            return JSON.stringify(A)
        } catch (B) {
            return Bo0
        }
    }

    function J_9(A) {
        let B = new Set,
            Q = Object.getPrototypeOf(A);
        while (Q && Q !== Object.prototype) Object.getOwnPropertyNames(Q).filter((Z) => typeof(Q === null || Q === void 0 ? void 0 : Q[Z]) === "function").forEach((Z) => B.add(Z)), Q = Object.getPrototypeOf(Q);
        return Array.from(B)
    }
});
var Do0 = E((Zo0) => {
    Object.defineProperty(Zo0, "__esModule", {
        value: !0
    })
});
var Fo0 = E((Go0) => {
    Object.defineProperty(Go0, "__esModule", {
        value: !0
    })
});
var Yo0 = E((Io0) => {
    Object.defineProperty(Io0, "__esModule", {
        value: !0
    })
});
var pi1 = E((Wo0) => {
    Object.defineProperty(Wo0, "__esModule", {
        value: !0
    });
    Wo0.createMemoKey = Wo0.MemoPrefix = void 0;
    Wo0.MemoPrefix = {
        _gate: "g",
        _dynamicConfig: "c",
        _experiment: "e",
        _layer: "l",
        _paramStore: "p"
    };
    var X_9 = new Set([]),
        V_9 = new Set(["userPersistedValues"]);

    function C_9(A, B, Q) {
        let Z = `${A}|${B}`;
        if (!Q) return Z;
        for (let D of Object.keys(Q)) {
            if (V_9.has(D)) return;
            if (X_9.has(D)) Z += `|${D}=true`;
            else Z += `|${D}=${Q[D]}`
        }
        return Z
    }
    Wo0.createMemoKey = C_9
});
var Xo0 = E((yp) => {
    var H_9 = yp && yp.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(yp, "__esModule", {
        value: !0
    });
    yp._fetchTxtRecords = void 0;
    var z_9 = new Uint8Array([0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 13, 102, 101, 97, 116, 117, 114, 101, 97, 115, 115, 101, 116, 115, 3, 111, 114, 103, 0, 0, 16, 0, 1]),
        E_9 = "https://cloudflare-dns.com/dns-query",
        U_9 = ["i", "e", "d"],
        w_9 = 200;

    function $_9(A) {
        return H_9(this, void 0, void 0, function*() {
            let B = yield A(E_9, {
                method: "POST",
                headers: {
                    "Content-Type": "application/dns-message",
                    Accept: "application/dns-message"
                },
                body: z_9
            });
            if (!B.ok) {
                let D = new Error("Failed to fetch TXT records from DNS");
                throw D.name = "DnsTxtFetchError", D
            }
            let Q = yield B.arrayBuffer(), Z = new Uint8Array(Q);
            return q_9(Z)
        })
    }
    yp._fetchTxtRecords = $_9;

    function q_9(A) {
        let B = A.findIndex((Z, D) => D < w_9 && String.fromCharCode(Z) === "=" && U_9.includes(String.fromCharCode(A[D - 1])));
        if (B === -1) {
            let Z = new Error("Failed to parse TXT records from DNS");
            throw Z.name = "DnsTxtParseError", Z
        }
        let Q = "";
        for (let Z = B - 1; Z < A.length; Z++) Q += String.fromCharCode(A[Z]);
        return Q.split(",")
    }
});
var Uo0 = E((Jk) => {
    var Vo0 = Jk && Jk.__awaiter || function(A, B, Q, Z) {
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
    Object.defineProperty(Jk, "__esModule", {
        value: !0
    });
    Jk._isDomainFailure = Jk.NetworkFallbackResolver = void 0;
    var N_9 = Xo0(),
        L_9 = Op(),
        M_9 = uW(),
        ni1 = TO(),
        Co0 = 604800000,
        R_9 = 14400000;
    class Ho0 {
        constructor(A) {
            var B;
            this._fallbackInfo = null, this._errorBoundary = null, this._dnsQueryCooldowns = {}, this._networkOverrideFunc = (B = A.networkConfig) === null || B === void 0 ? void 0 : B.networkOverrideFunc
        }
        setErrorBoundary(A) {
            this._errorBoundary = A
        }
        tryBumpExpiryTime(A, B) {
            var Q;
            let Z = (Q = this._fallbackInfo) === null || Q === void 0 ? void 0 : Q[B.endpoint];
            if (!Z) return;
            Z.expiryTime = Date.now() + Co0, ii1(A, Object.assign(Object.assign({}, this._fallbackInfo), {
                [B.endpoint]: Z
            }))
        }
        getActiveFallbackUrl(A, B) {
            var Q, Z;
            let D = this._fallbackInfo;
            if (D == null) D = (Q = O_9(A)) !== null && Q !== void 0 ? Q : {}, this._fallbackInfo = D;
            let G = D[B.endpoint];
            if (!G || Date.now() > ((Z = G.expiryTime) !== null && Z !== void 0 ? Z : 0)) return delete D[B.endpoint], this._fallbackInfo = D, ii1(A, this._fallbackInfo), null;
            if (G.url) return G.url;
            return null
        }
        getFallbackFromProvided(A) {
            let B = Ko0(A);
            if (B) return A.replace(B, "");
            return null
        }
        tryFetchUpdatedFallbackInfo(A, B, Q, Z) {
            var D, G;
            return Vo0(this, void 0, void 0, function*() {
                try {
                    if (!zo0(Q, Z)) return !1;
                    let I = B.customUrl == null && B.fallbackUrls == null ? yield this._tryFetchFallbackUrlsFromNetwork(B): B.fallbackUrls, Y = this._pickNewFallbackUrl((D = this._fallbackInfo) === null || D === void 0 ? void 0 : D[B.endpoint], I);
                    if (!Y) return !1;
                    return this._updateFallbackInfoWithNewUrl(A, B.endpoint, Y), !0
                } catch (F) {
                    return (G = this._errorBoundary) === null || G === void 0 || G.logError("tryFetchUpdatedFallbackInfo", F), !1
                }
            })
        }
        _updateFallbackInfoWithNewUrl(A, B, Q) {
            var Z, D, G;
            let F = {
                    url: Q,
                    expiryTime: Date.now() + Co0,
                    previous: []
                },
                I = (Z = this._fallbackInfo) === null || Z === void 0 ? void 0 : Z[B];
            if (I) F.previous.push(...I.previous);
            if (F.previous.length > 10) F.previous = [];
            let Y = (G = (D = this._fallbackInfo) === null || D === void 0 ? void 0 : D[B]) === null || G === void 0 ? void 0 : G.url;
            if (Y != null) F.previous.push(Y);
            this._fallbackInfo = Object.assign(Object.assign({}, this._fallbackInfo), {
                [B]: F
            }), ii1(A, this._fallbackInfo)
        }
        _tryFetchFallbackUrlsFromNetwork(A) {
            var B;
            return Vo0(this, void 0, void 0, function*() {
                let Q = this._dnsQueryCooldowns[A.endpoint];
                if (Q && Date.now() < Q) return null;
                this._dnsQueryCooldowns[A.endpoint] = Date.now() + R_9;
                let Z = [],
                    D = yield N_9._fetchTxtRecords((B = this._networkOverrideFunc) !== null && B !== void 0 ? B : fetch), G = Ko0(A.defaultUrl);
                for (let F of D) {
                    if (!F.startsWith(A.endpointDnsKey + "=")) continue;
                    let I = F.split("=");
                    if (I.length > 1) {
                        let Y = I[1];
                        if (Y.endsWith("/")) Y = Y.slice(0, -1);
                        Z.push(`https://${Y}${G}`)
                    }
                }
                return Z
            })
        }
        _pickNewFallbackUrl(A, B) {
            var Q;
            if (B == null) return null;
            let Z = new Set((Q = A === null || A === void 0 ? void 0 : A.previous) !== null && Q !== void 0 ? Q : []),
                D = A === null || A === void 0 ? void 0 : A.url,
                G = null;
            for (let F of B) {
                let I = F.endsWith("/") ? F.slice(0, -1) : F;
                if (!Z.has(F) && I !== D) {
                    G = I;
                    break
                }
            }
            return G
        }
    }
    Jk.NetworkFallbackResolver = Ho0;

    function zo0(A, B) {
        var Q;
        let Z = (Q = A === null || A === void 0 ? void 0 : A.toLowerCase()) !== null && Q !== void 0 ? Q : "";
        return B || Z.includes("uncaught exception") || Z.includes("failed to fetch") || Z.includes("networkerror when attempting to fetch resource")
    }
    Jk._isDomainFailure = zo0;

    function Eo0(A) {
        return `statsig.network_fallback.${L_9._DJB2(A)}`
    }

    function ii1(A, B) {
        let Q = Eo0(A);
        if (!B || Object.keys(B).length === 0) {
            ni1.Storage.removeItem(Q);
            return
        }
        ni1.Storage.setItem(Q, JSON.stringify(B))
    }

    function O_9(A) {
        let B = Eo0(A),
            Q = ni1.Storage.getItem(B);
        if (!Q) return null;
        try {
            return JSON.parse(Q)
        } catch (Z) {
            return M_9.Log.error("Failed to parse FallbackInfo"), null
        }
    }

    function Ko0(A) {
        try {
            return new URL(A).pathname
        } catch (B) {
            return null
        }
    }
});
var ai1 = E(($o0) => {
    Object.defineProperty($o0, "__esModule", {
        value: !0
    });
    $o0.SDKFlags = void 0;
    var wo0 = {};
    $o0.SDKFlags = {
        setFlags: (A, B) => {
            wo0[A] = B
        },
        get: (A, B) => {
            var Q, Z;
            return (Z = (Q = wo0[A]) === null || Q === void 0 ? void 0 : Q[B]) !== null && Z !== void 0 ? Z : !1
        }
    }
});
var YC1 = E((Po0) => {
    Object.defineProperty(Po0, "__esModule", {
        value: !0
    });
    Po0.StatsigSession = Po0.SessionID = void 0;
    var T_9 = tB1(),
        P_9 = uW(),
        Lo0 = TO(),
        Mo0 = AC1(),
        Ro0 = 1800000,
        Oo0 = 14400000,
        IC1 = {};
    Po0.SessionID = {
        get: (A) => {
            return Po0.StatsigSession.get(A).data.sessionID
        }
    };
    Po0.StatsigSession = {
        get: (A) => {
            if (IC1[A] == null) IC1[A] = S_9(A);
            let B = IC1[A];
            return k_9(B)
        },
        overrideInitialSessionID: (A, B) => {
            IC1[B] = j_9(A, B)
        }
    };

    function S_9(A) {
        let B = v_9(A),
            Q = Date.now();
        if (!B) B = {
            sessionID: Mo0.getUUID(),
            startTime: Q,
            lastUpdate: Q
        };
        return {
            data: B,
            sdkKey: A
        }
    }

    function j_9(A, B) {
        let Q = Date.now();
        return {
            data: {
                sessionID: A,
                startTime: Q,
                lastUpdate: Q
            },
            sdkKey: B
        }
    }

    function k_9(A) {
        let B = Date.now(),
            Q = A.data;
        if (y_9(Q) || __9(Q)) Q.sessionID = Mo0.getUUID(), Q.startTime = B;
        Q.lastUpdate = B, x_9(Q, A.sdkKey), clearTimeout(A.idleTimeoutID), clearTimeout(A.ageTimeoutID);
        let Z = B - Q.startTime,
            D = A.sdkKey;
        return A.idleTimeoutID = No0(D, Ro0), A.ageTimeoutID = No0(D, Oo0 - Z), A
    }

    function No0(A, B) {
        return setTimeout(() => {
            let Q = __STATSIG__ === null || __STATSIG__ === void 0 ? void 0 : __STATSIG__.instance(A);
            if (Q) Q.$emt({
                name: "session_expired"
            })
        }, B)
    }

    function y_9({
        lastUpdate: A
    }) {
        return Date.now() - A > Ro0
    }

    function __9({
        startTime: A
    }) {
        return Date.now() - A > Oo0
    }

    function To0(A) {
        return `statsig.session_id.${T_9._getStorageKey(A)}`
    }

    function x_9(A, B) {
        let Q = To0(B);
        try {
            Lo0._setObjectInStorage(Q, A)
        } catch (Z) {
            P_9.Log.warn("Failed to save SessionID")
        }
    }

    function v_9(A) {
        let B = To0(A);
        return Lo0._getObjectFromStorage(B)
    }
});
var ri1 = E((So0) => {
    Object.defineProperty(So0, "__esModule", {
        value: !0
    });
    So0.ErrorTag = void 0;
    So0.ErrorTag = {
        NetworkError: "NetworkError"
    }
});