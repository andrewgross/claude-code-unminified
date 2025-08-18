/* chunk:30 bytes:[726952, 746131) size:19179 source:unpacked-cli.js */
var gl0 = E((hl0) => {
    Object.defineProperty(hl0, "__esModule", {
        value: !0
    });
    var WN = UA(),
        ZN9 = fl0(),
        sf = NB1(),
        Zk = WN.GLOBAL_OBJ;
    class LB1 {
        static __initStatic() {
            this.id = "Offline"
        }
        constructor(A = {}) {
            this.name = LB1.id, this.maxStoredEvents = A.maxStoredEvents || 30, this.offlineEventStore = ZN9.createInstance({
                name: "sentry/offlineEventStore"
            })
        }
        setupOnce(A, B) {
            if (this.hub = B(), "addEventListener" in Zk) Zk.addEventListener("online", () => {
                this._sendEvents().catch(() => {
                    sf.DEBUG_BUILD && WN.logger.warn("could not send cached events")
                })
            });
            let Q = (Z) => {
                if (this.hub && this.hub.getIntegration(LB1)) {
                    if ("navigator" in Zk && "onLine" in Zk.navigator && !Zk.navigator.onLine) return sf.DEBUG_BUILD && WN.logger.log("Event dropped due to being a offline - caching instead"), this._cacheEvent(Z).then((D) => this._enforceMaxEvents()).catch((D) => {
                        sf.DEBUG_BUILD && WN.logger.warn("could not cache event while offline")
                    }), null
                }
                return Z
            };
            if (Q.id = this.name, A(Q), "navigator" in Zk && "onLine" in Zk.navigator && Zk.navigator.onLine) this._sendEvents().catch(() => {
                sf.DEBUG_BUILD && WN.logger.warn("could not send cached events")
            })
        }
        async _cacheEvent(A) {
            return this.offlineEventStore.setItem(WN.uuid4(), WN.normalize(A))
        }
        async _enforceMaxEvents() {
            let A = [];
            return this.offlineEventStore.iterate((B, Q, Z) => {
                A.push({
                    cacheKey: Q,
                    event: B
                })
            }).then(() => this._purgeEvents(A.sort((B, Q) => (Q.event.timestamp || 0) - (B.event.timestamp || 0)).slice(this.maxStoredEvents < A.length ? this.maxStoredEvents : A.length).map((B) => B.cacheKey))).catch((B) => {
                sf.DEBUG_BUILD && WN.logger.warn("could not enforce max events")
            })
        }
        async _purgeEvent(A) {
            return this.offlineEventStore.removeItem(A)
        }
        async _purgeEvents(A) {
            return Promise.all(A.map((B) => this._purgeEvent(B))).then()
        }
        async _sendEvents() {
            return this.offlineEventStore.iterate((A, B, Q) => {
                if (this.hub) this.hub.captureEvent(A), this._purgeEvent(B).catch((Z) => {
                    sf.DEBUG_BUILD && WN.logger.warn("could not purge event from cache")
                });
                else sf.DEBUG_BUILD && WN.logger.warn("no hub found - could not send cached event")
            })
        }
    }
    LB1.__initStatic();
    hl0.Offline = LB1
});
var pl0 = E((ll0) => {
    Object.defineProperty(ll0, "__esModule", {
        value: !0
    });
    var MB1 = xQ(),
        ml0 = UA(),
        GN9 = ml0.GLOBAL_OBJ,
        dl0 = "ReportingObserver",
        ul0 = new WeakMap,
        FN9 = (A = {}) => {
            let B = A.types || ["crash", "deprecation", "intervention"];

            function Q(Z) {
                if (!ul0.has(MB1.getClient())) return;
                for (let D of Z) MB1.withScope((G) => {
                    G.setExtra("url", D.url);
                    let F = `ReportingObserver [${D.type}]`,
                        I = "No details available";
                    if (D.body) {
                        let Y = {};
                        for (let W in D.body) Y[W] = D.body[W];
                        if (G.setExtra("body", Y), D.type === "crash") {
                            let W = D.body;
                            I = [W.crashId || "", W.reason || ""].join(" ").trim() || I
                        } else I = D.body.message || I
                    }
                    MB1.captureMessage(`${F}: ${I}`)
                })
            }
            return {
                name: dl0,
                setupOnce() {
                    if (!ml0.supportsReportingObserver()) return;
                    new GN9.ReportingObserver(Q, {
                        buffered: !0,
                        types: B
                    }).observe()
                },
                setup(Z) {
                    ul0.set(Z, !0)
                }
            }
        },
        cl0 = MB1.defineIntegration(FN9),
        IN9 = MB1.convertIntegrationFnToClass(dl0, cl0);
    ll0.ReportingObserver = IN9;
    ll0.reportingObserverIntegration = cl0
});
var ol0 = E((rl0) => {
    Object.defineProperty(rl0, "__esModule", {
        value: !0
    });
    var nl0 = xQ(),
        il0 = UA(),
        al0 = "RewriteFrames",
        JN9 = (A = {}) => {
            let B = A.root,
                Q = A.prefix || "app:///",
                Z = A.iteratee || ((F) => {
                    if (!F.filename) return F;
                    let I = /^[a-zA-Z]:\\/.test(F.filename) || F.filename.includes("\\") && !F.filename.includes("/"),
                        Y = /^\//.test(F.filename);
                    if (I || Y) {
                        let W = I ? F.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : F.filename,
                            J = B ? il0.relative(B, W) : il0.basename(W);
                        F.filename = `${Q}${J}`
                    }
                    return F
                });

            function D(F) {
                try {
                    return {
                        ...F,
                        exception: {
                            ...F.exception,
                            values: F.exception.values.map((I) => ({
                                ...I,
                                ...I.stacktrace && {
                                    stacktrace: G(I.stacktrace)
                                }
                            }))
                        }
                    }
                } catch (I) {
                    return F
                }
            }

            function G(F) {
                return {
                    ...F,
                    frames: F && F.frames && F.frames.map((I) => Z(I))
                }
            }
            return {
                name: al0,
                setupOnce() {},
                processEvent(F) {
                    let I = F;
                    if (F.exception && Array.isArray(F.exception.values)) I = D(I);
                    return I
                }
            }
        },
        sl0 = nl0.defineIntegration(JN9),
        XN9 = nl0.convertIntegrationFnToClass(al0, sl0);
    rl0.RewriteFrames = XN9;
    rl0.rewriteFramesIntegration = sl0
});
var Qp0 = E((Bp0) => {
    Object.defineProperty(Bp0, "__esModule", {
        value: !0
    });
    var tl0 = xQ(),
        el0 = "SessionTiming",
        KN9 = () => {
            let A = Date.now();
            return {
                name: el0,
                setupOnce() {},
                processEvent(B) {
                    let Q = Date.now();
                    return {
                        ...B,
                        extra: {
                            ...B.extra,
                            ["session:start"]: A,
                            ["session:duration"]: Q - A,
                            ["session:end"]: Q
                        }
                    }
                }
            }
        },
        Ap0 = tl0.defineIntegration(KN9),
        HN9 = tl0.convertIntegrationFnToClass(el0, Ap0);
    Bp0.SessionTiming = HN9;
    Bp0.sessionTimingIntegration = Ap0
});
var Gp0 = E((Dp0) => {
    Object.defineProperty(Dp0, "__esModule", {
        value: !0
    });
    var UN9 = xQ(),
        Zp0 = "Transaction",
        wN9 = () => {
            return {
                name: Zp0,
                setupOnce() {},
                processEvent(A) {
                    let B = qN9(A);
                    for (let Q = B.length - 1; Q >= 0; Q--) {
                        let Z = B[Q];
                        if (Z.in_app === !0) {
                            A.transaction = NN9(Z);
                            break
                        }
                    }
                    return A
                }
            }
        },
        $N9 = UN9.convertIntegrationFnToClass(Zp0, wN9);

    function qN9(A) {
        let B = A.exception && A.exception.values && A.exception.values[0];
        return B && B.stacktrace && B.stacktrace.frames || []
    }

    function NN9(A) {
        return A.module || A.function ? `${A.module||"?"}/${A.function||"?"}` : "<unknown>"
    }
    Dp0.Transaction = $N9
});
var Cp0 = E((Vp0) => {
    Object.defineProperty(Vp0, "__esModule", {
        value: !0
    });
    var RO = xQ(),
        JN = UA(),
        BV1 = NB1(),
        Fp0 = "HttpClient",
        MN9 = (A = {}) => {
            let B = {
                failedRequestStatusCodes: [
                    [500, 599]
                ],
                failedRequestTargets: [/.*/],
                ...A
            };
            return {
                name: Fp0,
                setupOnce() {},
                setup(Q) {
                    _N9(Q, B), xN9(Q, B)
                }
            }
        },
        Ip0 = RO.defineIntegration(MN9),
        RN9 = RO.convertIntegrationFnToClass(Fp0, Ip0);

    function ON9(A, B, Q, Z) {
        if (Wp0(A, Q.status, Q.url)) {
            let D = vN9(B, Z),
                G, F, I, Y;
            if (Xp0())[{
                headers: G,
                cookies: I
            }, {
                headers: F,
                cookies: Y
            }] = [{
                cookieHeader: "Cookie",
                obj: D
            }, {
                cookieHeader: "Set-Cookie",
                obj: Q
            }].map(({
                cookieHeader: J,
                obj: X
            }) => {
                let V = SN9(X.headers),
                    C;
                try {
                    let K = V[J] || V[J.toLowerCase()] || void 0;
                    if (K) C = Yp0(K)
                } catch (K) {
                    BV1.DEBUG_BUILD && JN.logger.log(`Could not extract cookies from header ${J}`)
                }
                return {
                    headers: V,
                    cookies: C
                }
            });
            let W = Jp0({
                url: D.url,
                method: D.method,
                status: Q.status,
                requestHeaders: G,
                responseHeaders: F,
                requestCookies: I,
                responseCookies: Y
            });
            RO.captureEvent(W)
        }
    }

    function TN9(A, B, Q, Z) {
        if (Wp0(A, B.status, B.responseURL)) {
            let D, G, F;
            if (Xp0()) {
                try {
                    let Y = B.getResponseHeader("Set-Cookie") || B.getResponseHeader("set-cookie") || void 0;
                    if (Y) G = Yp0(Y)
                } catch (Y) {
                    BV1.DEBUG_BUILD && JN.logger.log("Could not extract cookies from response headers")
                }
                try {
                    F = jN9(B)
                } catch (Y) {
                    BV1.DEBUG_BUILD && JN.logger.log("Could not extract headers from response")
                }
                D = Z
            }
            let I = Jp0({
                url: B.responseURL,
                method: Q,
                status: B.status,
                requestHeaders: D,
                responseHeaders: F,
                responseCookies: G
            });
            RO.captureEvent(I)
        }
    }

    function PN9(A) {
        if (A) {
            let B = A["Content-Length"] || A["content-length"];
            if (B) return parseInt(B, 10)
        }
        return
    }

    function Yp0(A) {
        return A.split("; ").reduce((B, Q) => {
            let [Z, D] = Q.split("=");
            return B[Z] = D, B
        }, {})
    }

    function SN9(A) {
        let B = {};
        return A.forEach((Q, Z) => {
            B[Z] = Q
        }), B
    }

    function jN9(A) {
        let B = A.getAllResponseHeaders();
        if (!B) return {};
        return B.split(`\r
`).reduce((Q, Z) => {
            let [D, G] = Z.split(": ");
            return Q[D] = G, Q
        }, {})
    }

    function kN9(A, B) {
        return A.some((Q) => {
            if (typeof Q === "string") return B.includes(Q);
            return Q.test(B)
        })
    }

    function yN9(A, B) {
        return A.some((Q) => {
            if (typeof Q === "number") return Q === B;
            return B >= Q[0] && B <= Q[1]
        })
    }

    function _N9(A, B) {
        if (!JN.supportsNativeFetch()) return;
        JN.addFetchInstrumentationHandler((Q) => {
            if (RO.getClient() !== A) return;
            let {
                response: Z,
                args: D
            } = Q, [G, F] = D;
            if (!Z) return;
            ON9(B, G, Z, F)
        })
    }

    function xN9(A, B) {
        if (!("XMLHttpRequest" in JN.GLOBAL_OBJ)) return;
        JN.addXhrInstrumentationHandler((Q) => {
            if (RO.getClient() !== A) return;
            let Z = Q.xhr,
                D = Z[JN.SENTRY_XHR_DATA_KEY];
            if (!D) return;
            let {
                method: G,
                request_headers: F
            } = D;
            try {
                TN9(B, Z, G, F)
            } catch (I) {
                BV1.DEBUG_BUILD && JN.logger.warn("Error while extracting response event form XHR response", I)
            }
        })
    }

    function Wp0(A, B, Q) {
        return yN9(A.failedRequestStatusCodes, B) && kN9(A.failedRequestTargets, Q) && !RO.isSentryRequestUrl(Q, RO.getClient())
    }

    function Jp0(A) {
        let B = `HTTP Client Error with status code: ${A.status}`,
            Q = {
                message: B,
                exception: {
                    values: [{
                        type: "Error",
                        value: B
                    }]
                },
                request: {
                    url: A.url,
                    method: A.method,
                    headers: A.requestHeaders,
                    cookies: A.requestCookies
                },
                contexts: {
                    response: {
                        status_code: A.status,
                        headers: A.responseHeaders,
                        cookies: A.responseCookies,
                        body_size: PN9(A.responseHeaders)
                    }
                }
            };
        return JN.addExceptionMechanism(Q, {
            type: "http.client",
            handled: !1
        }), Q
    }

    function vN9(A, B) {
        if (!B && A instanceof Request) return A;
        if (A instanceof Request && A.bodyUsed) return A;
        return new Request(A, B)
    }

    function Xp0() {
        let A = RO.getClient();
        return A ? Boolean(A.getOptions().sendDefaultPii) : !1
    }
    Vp0.HttpClient = RN9;
    Vp0.httpClientIntegration = Ip0
});
var wp0 = E((Up0) => {
    Object.defineProperty(Up0, "__esModule", {
        value: !0
    });
    var Kp0 = xQ(),
        el1 = UA(),
        tl1 = el1.GLOBAL_OBJ,
        hN9 = 7,
        Hp0 = "ContextLines",
        gN9 = (A = {}) => {
            let B = A.frameContextLines != null ? A.frameContextLines : hN9;
            return {
                name: Hp0,
                setupOnce() {},
                processEvent(Q) {
                    return mN9(Q, B)
                }
            }
        },
        zp0 = Kp0.defineIntegration(gN9),
        uN9 = Kp0.convertIntegrationFnToClass(Hp0, zp0);

    function mN9(A, B) {
        let Q = tl1.document,
            Z = tl1.location && el1.stripUrlQueryAndFragment(tl1.location.href);
        if (!Q || !Z) return A;
        let D = A.exception && A.exception.values;
        if (!D || !D.length) return A;
        let G = Q.documentElement.innerHTML;
        if (!G) return A;
        let F = ["<!DOCTYPE html>", "<html>", ...G.split(`
`), "</html>"];
        return D.forEach((I) => {
            let Y = I.stacktrace;
            if (Y && Y.frames) Y.frames = Y.frames.map((W) => Ep0(W, F, Z, B))
        }), A
    }

    function Ep0(A, B, Q, Z) {
        if (A.filename !== Q || !A.lineno || !B.length) return A;
        return el1.addContextToFrame(B, A, Z), A
    }
    Up0.ContextLines = uN9;
    Up0.applySourceContextToFrame = Ep0;
    Up0.contextLinesIntegration = zp0
});
var jp0 = E((Sp0) => {
    Object.defineProperty(Sp0, "__esModule", {
        value: !0
    });
    var $p0 = Kl0(),
        qp0 = wl0(),
        Np0 = jl0(),
        Lp0 = vl0(),
        pN9 = gl0(),
        Mp0 = pl0(),
        Rp0 = ol0(),
        Op0 = Qp0(),
        iN9 = Gp0(),
        Tp0 = Cp0(),
        Pp0 = wp0();
    Sp0.CaptureConsole = $p0.CaptureConsole;
    Sp0.captureConsoleIntegration = $p0.captureConsoleIntegration;
    Sp0.Debug = qp0.Debug;
    Sp0.debugIntegration = qp0.debugIntegration;
    Sp0.Dedupe = Np0.Dedupe;
    Sp0.dedupeIntegration = Np0.dedupeIntegration;
    Sp0.ExtraErrorData = Lp0.ExtraErrorData;
    Sp0.extraErrorDataIntegration = Lp0.extraErrorDataIntegration;
    Sp0.Offline = pN9.Offline;
    Sp0.ReportingObserver = Mp0.ReportingObserver;
    Sp0.reportingObserverIntegration = Mp0.reportingObserverIntegration;
    Sp0.RewriteFrames = Rp0.RewriteFrames;
    Sp0.rewriteFramesIntegration = Rp0.rewriteFramesIntegration;
    Sp0.SessionTiming = Op0.SessionTiming;
    Sp0.sessionTimingIntegration = Op0.sessionTimingIntegration;
    Sp0.Transaction = iN9.Transaction;
    Sp0.HttpClient = Tp0.HttpClient;
    Sp0.httpClientIntegration = Tp0.httpClientIntegration;
    Sp0.ContextLines = Pp0.ContextLines;
    Sp0.contextLinesIntegration = Pp0.contextLinesIntegration
});
var QV1 = E((kp0) => {
    Object.defineProperty(kp0, "__esModule", {
        value: !0
    });
    var CL9 = [
        ["january", "1"],
        ["february", "2"],
        ["march", "3"],
        ["april", "4"],
        ["may", "5"],
        ["june", "6"],
        ["july", "7"],
        ["august", "8"],
        ["september", "9"],
        ["october", "10"],
        ["november", "11"],
        ["december", "12"],
        ["jan", "1"],
        ["feb", "2"],
        ["mar", "3"],
        ["apr", "4"],
        ["may", "5"],
        ["jun", "6"],
        ["jul", "7"],
        ["aug", "8"],
        ["sep", "9"],
        ["oct", "10"],
        ["nov", "11"],
        ["dec", "12"],
        ["sunday", "0"],
        ["monday", "1"],
        ["tuesday", "2"],
        ["wednesday", "3"],
        ["thursday", "4"],
        ["friday", "5"],
        ["saturday", "6"],
        ["sun", "0"],
        ["mon", "1"],
        ["tue", "2"],
        ["wed", "3"],
        ["thu", "4"],
        ["fri", "5"],
        ["sat", "6"]
    ];

    function KL9(A) {
        return CL9.reduce((B, [Q, Z]) => B.replace(new RegExp(Q, "gi"), Z), A)
    }
    kp0.replaceCronNames = KL9
});