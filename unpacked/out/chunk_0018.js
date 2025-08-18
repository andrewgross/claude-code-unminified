/* chunk:18 bytes:[292022, 307322) size:15300 source:unpacked-cli.js */
var Lu0 = E((Nu0) => {
    Object.defineProperty(Nu0, "__esModule", {
        value: !0
    });
    var xV9 = () => {
        return `v3-${Date.now()}-${Math.floor(Math.random()*8999999999999)+1000000000000}`
    };
    Nu0.generateUniqueID = xV9
});
var WB1 = E((Mu0) => {
    Object.defineProperty(Mu0, "__esModule", {
        value: !0
    });
    var YB1 = dC(),
        bV9 = () => {
            let A = YB1.WINDOW.performance.timing,
                B = YB1.WINDOW.performance.navigation.type,
                Q = {
                    entryType: "navigation",
                    startTime: 0,
                    type: B == 2 ? "back_forward" : B === 1 ? "reload" : "navigate"
                };
            for (let Z in A)
                if (Z !== "navigationStart" && Z !== "toJSON") Q[Z] = Math.max(A[Z] - A.navigationStart, 0);
            return Q
        },
        fV9 = () => {
            if (YB1.WINDOW.__WEB_VITALS_POLYFILL__) return YB1.WINDOW.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || bV9());
            else return YB1.WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
        };
    Mu0.getNavigationEntry = fV9
});
var $X1 = E((Ru0) => {
    Object.defineProperty(Ru0, "__esModule", {
        value: !0
    });
    var gV9 = WB1(),
        uV9 = () => {
            let A = gV9.getNavigationEntry();
            return A && A.activationStart || 0
        };
    Ru0.getActivationStart = uV9
});
var al = E((Tu0) => {
    Object.defineProperty(Tu0, "__esModule", {
        value: !0
    });
    var Ou0 = dC(),
        dV9 = Lu0(),
        cV9 = $X1(),
        lV9 = WB1(),
        pV9 = (A, B) => {
            let Q = lV9.getNavigationEntry(),
                Z = "navigate";
            if (Q)
                if (Ou0.WINDOW.document && Ou0.WINDOW.document.prerendering || cV9.getActivationStart() > 0) Z = "prerender";
                else Z = Q.type.replace(/_/g, "-");
            return {
                name: A,
                value: typeof B === "undefined" ? -1 : B,
                rating: "good",
                delta: 0,
                entries: [],
                id: dV9.generateUniqueID(),
                navigationType: Z
            }
        };
    Tu0.initMetric = pV9
});
var vf = E((Pu0) => {
    Object.defineProperty(Pu0, "__esModule", {
        value: !0
    });
    var nV9 = (A, B, Q) => {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(A)) {
                let Z = new PerformanceObserver((D) => {
                    B(D.getEntries())
                });
                return Z.observe(Object.assign({
                    type: A,
                    buffered: !0
                }, Q || {})), Z
            }
        } catch (Z) {}
        return
    };
    Pu0.observe = nV9
});
var sl = E((ju0) => {
    Object.defineProperty(ju0, "__esModule", {
        value: !0
    });
    var Su0 = dC(),
        sV9 = (A, B) => {
            let Q = (Z) => {
                if (Z.type === "pagehide" || Su0.WINDOW.document.visibilityState === "hidden") {
                    if (A(Z), B) removeEventListener("visibilitychange", Q, !0), removeEventListener("pagehide", Q, !0)
                }
            };
            if (Su0.WINDOW.document) addEventListener("visibilitychange", Q, !0), addEventListener("pagehide", Q, !0)
        };
    ju0.onHidden = sV9
});
var yu0 = E((ku0) => {
    Object.defineProperty(ku0, "__esModule", {
        value: !0
    });
    var oV9 = nl(),
        tV9 = al(),
        eV9 = vf(),
        AC9 = sl(),
        BC9 = (A, B = {}) => {
            let Q = tV9.initMetric("CLS", 0),
                Z, D = 0,
                G = [],
                F = (Y) => {
                    Y.forEach((W) => {
                        if (!W.hadRecentInput) {
                            let J = G[0],
                                X = G[G.length - 1];
                            if (D && G.length !== 0 && W.startTime - X.startTime < 1000 && W.startTime - J.startTime < 5000) D += W.value, G.push(W);
                            else D = W.value, G = [W];
                            if (D > Q.value) {
                                if (Q.value = D, Q.entries = G, Z) Z()
                            }
                        }
                    })
                },
                I = eV9.observe("layout-shift", F);
            if (I) {
                Z = oV9.bindReporter(A, Q, B.reportAllChanges);
                let Y = () => {
                    F(I.takeRecords()), Z(!0)
                };
                return AC9.onHidden(Y), Y
            }
            return
        };
    ku0.onCLS = BC9
});
var LX1 = E((_u0) => {
    Object.defineProperty(_u0, "__esModule", {
        value: !0
    });
    var qX1 = dC(),
        ZC9 = sl(),
        NX1 = -1,
        DC9 = () => {
            if (qX1.WINDOW.document && qX1.WINDOW.document.visibilityState) NX1 = qX1.WINDOW.document.visibilityState === "hidden" && !qX1.WINDOW.document.prerendering ? 0 : 1 / 0
        },
        GC9 = () => {
            ZC9.onHidden(({
                timeStamp: A
            }) => {
                NX1 = A
            }, !0)
        },
        FC9 = () => {
            if (NX1 < 0) DC9(), GC9();
            return {
                get firstHiddenTime() {
                    return NX1
                }
            }
        };
    _u0.getVisibilityWatcher = FC9
});
var vu0 = E((xu0) => {
    Object.defineProperty(xu0, "__esModule", {
        value: !0
    });
    var YC9 = nl(),
        WC9 = LX1(),
        JC9 = al(),
        XC9 = vf(),
        VC9 = sl(),
        CC9 = (A) => {
            let B = WC9.getVisibilityWatcher(),
                Q = JC9.initMetric("FID"),
                Z, D = (I) => {
                    if (I.startTime < B.firstHiddenTime) Q.value = I.processingStart - I.startTime, Q.entries.push(I), Z(!0)
                },
                G = (I) => {
                    I.forEach(D)
                },
                F = XC9.observe("first-input", G);
            if (Z = YC9.bindReporter(A, Q), F) VC9.onHidden(() => {
                G(F.takeRecords()), F.disconnect()
            }, !0)
        };
    xu0.onFID = CC9
});
var hu0 = E((fu0) => {
    Object.defineProperty(fu0, "__esModule", {
        value: !0
    });
    var HC9 = vf(),
        bu0 = 0,
        Hl1 = 1 / 0,
        MX1 = 0,
        zC9 = (A) => {
            A.forEach((B) => {
                if (B.interactionId) Hl1 = Math.min(Hl1, B.interactionId), MX1 = Math.max(MX1, B.interactionId), bu0 = MX1 ? (MX1 - Hl1) / 7 + 1 : 0
            })
        },
        zl1, EC9 = () => {
            return zl1 ? bu0 : performance.interactionCount || 0
        },
        UC9 = () => {
            if ("interactionCount" in performance || zl1) return;
            zl1 = HC9.observe("event", zC9, {
                type: "event",
                buffered: !0,
                durationThreshold: 0
            })
        };
    fu0.getInteractionCount = EC9;
    fu0.initInteractionCountPolyfill = UC9
});
var lu0 = E((cu0) => {
    Object.defineProperty(cu0, "__esModule", {
        value: !0
    });
    var qC9 = nl(),
        NC9 = al(),
        LC9 = vf(),
        MC9 = sl(),
        mu0 = hu0(),
        du0 = () => {
            return mu0.getInteractionCount()
        },
        gu0 = 10,
        UO = [],
        El1 = {},
        uu0 = (A) => {
            let B = UO[UO.length - 1],
                Q = El1[A.interactionId];
            if (Q || UO.length < gu0 || A.duration > B.latency) {
                if (Q) Q.entries.push(A), Q.latency = Math.max(Q.latency, A.duration);
                else {
                    let Z = {
                        id: A.interactionId,
                        latency: A.duration,
                        entries: [A]
                    };
                    El1[Z.id] = Z, UO.push(Z)
                }
                UO.sort((Z, D) => D.latency - Z.latency), UO.splice(gu0).forEach((Z) => {
                    delete El1[Z.id]
                })
            }
        },
        RC9 = () => {
            let A = Math.min(UO.length - 1, Math.floor(du0() / 50));
            return UO[A]
        },
        OC9 = (A, B) => {
            B = B || {}, mu0.initInteractionCountPolyfill();
            let Q = NC9.initMetric("INP"),
                Z, D = (F) => {
                    F.forEach((Y) => {
                        if (Y.interactionId) uu0(Y);
                        if (Y.entryType === "first-input") {
                            if (!UO.some((J) => {
                                    return J.entries.some((X) => {
                                        return Y.duration === X.duration && Y.startTime === X.startTime
                                    })
                                })) uu0(Y)
                        }
                    });
                    let I = RC9();
                    if (I && I.latency !== Q.value) Q.value = I.latency, Q.entries = I.entries, Z()
                },
                G = LC9.observe("event", D, {
                    durationThreshold: B.durationThreshold || 40
                });
            if (Z = qC9.bindReporter(A, Q, B.reportAllChanges), G) G.observe({
                type: "first-input",
                buffered: !0
            }), MC9.onHidden(() => {
                if (D(G.takeRecords()), Q.value < 0 && du0() > 0) Q.value = 0, Q.entries = [];
                Z(!0)
            })
        };
    cu0.onINP = OC9
});
var nu0 = E((iu0) => {
    Object.defineProperty(iu0, "__esModule", {
        value: !0
    });
    var PC9 = dC(),
        SC9 = nl(),
        jC9 = $X1(),
        kC9 = LX1(),
        yC9 = al(),
        _C9 = vf(),
        xC9 = sl(),
        pu0 = {},
        vC9 = (A) => {
            let B = kC9.getVisibilityWatcher(),
                Q = yC9.initMetric("LCP"),
                Z, D = (F) => {
                    let I = F[F.length - 1];
                    if (I) {
                        let Y = Math.max(I.startTime - jC9.getActivationStart(), 0);
                        if (Y < B.firstHiddenTime) Q.value = Y, Q.entries = [I], Z()
                    }
                },
                G = _C9.observe("largest-contentful-paint", D);
            if (G) {
                Z = SC9.bindReporter(A, Q);
                let F = () => {
                    if (!pu0[Q.id]) D(G.takeRecords()), G.disconnect(), pu0[Q.id] = !0, Z(!0)
                };
                return ["keydown", "click"].forEach((I) => {
                    if (PC9.WINDOW.document) addEventListener(I, F, {
                        once: !0,
                        capture: !0
                    })
                }), xC9.onHidden(F, !0), F
            }
            return
        };
    iu0.onLCP = vC9
});
var su0 = E((au0) => {
    Object.defineProperty(au0, "__esModule", {
        value: !0
    });
    var Ul1 = dC(),
        fC9 = nl(),
        hC9 = $X1(),
        gC9 = WB1(),
        uC9 = al(),
        wl1 = (A) => {
            if (!Ul1.WINDOW.document) return;
            if (Ul1.WINDOW.document.prerendering) addEventListener("prerenderingchange", () => wl1(A), !0);
            else if (Ul1.WINDOW.document.readyState !== "complete") addEventListener("load", () => wl1(A), !0);
            else setTimeout(A, 0)
        },
        mC9 = (A, B) => {
            B = B || {};
            let Q = uC9.initMetric("TTFB"),
                Z = fC9.bindReporter(A, Q, B.reportAllChanges);
            wl1(() => {
                let D = gC9.getNavigationEntry();
                if (D) {
                    if (Q.value = Math.max(D.responseStart - hC9.getActivationStart(), 0), Q.value < 0 || Q.value > performance.now()) return;
                    Q.entries = [D], Z(!0)
                }
            })
        };
    au0.onTTFB = mC9
});
var ol = E((Dm0) => {
    Object.defineProperty(Dm0, "__esModule", {
        value: !0
    });
    var ru0 = UA(),
        cC9 = FV(),
        lC9 = yu0(),
        pC9 = vu0(),
        iC9 = lu0(),
        nC9 = nu0(),
        aC9 = vf(),
        sC9 = su0(),
        JB1 = {},
        RX1 = {},
        ou0, tu0, eu0, Am0, Bm0;

    function rC9(A, B = !1) {
        return XB1("cls", A, QK9, ou0, B)
    }

    function oC9(A, B = !1) {
        return XB1("lcp", A, DK9, eu0, B)
    }

    function tC9(A) {
        return XB1("ttfb", A, GK9, Am0)
    }

    function eC9(A) {
        return XB1("fid", A, ZK9, tu0)
    }

    function AK9(A) {
        return XB1("inp", A, FK9, Bm0)
    }

    function BK9(A, B) {
        if (Qm0(A, B), !RX1[A]) IK9(A), RX1[A] = !0;
        return Zm0(A, B)
    }

    function rl(A, B) {
        let Q = JB1[A];
        if (!Q || !Q.length) return;
        for (let Z of Q) try {
            Z(B)
        } catch (D) {
            cC9.DEBUG_BUILD && ru0.logger.error(`Error while triggering instrumentation handler.
Type: ${A}
Name: ${ru0.getFunctionName(Z)}
Error:`, D)
        }
    }

    function QK9() {
        return lC9.onCLS((A) => {
            rl("cls", {
                metric: A
            }), ou0 = A
        }, {
            reportAllChanges: !0
        })
    }

    function ZK9() {
        return pC9.onFID((A) => {
            rl("fid", {
                metric: A
            }), tu0 = A
        })
    }

    function DK9() {
        return nC9.onLCP((A) => {
            rl("lcp", {
                metric: A
            }), eu0 = A
        })
    }

    function GK9() {
        return sC9.onTTFB((A) => {
            rl("ttfb", {
                metric: A
            }), Am0 = A
        })
    }

    function FK9() {
        return iC9.onINP((A) => {
            rl("inp", {
                metric: A
            }), Bm0 = A
        })
    }

    function XB1(A, B, Q, Z, D = !1) {
        Qm0(A, B);
        let G;
        if (!RX1[A]) G = Q(), RX1[A] = !0;
        if (Z) B({
            metric: Z
        });
        return Zm0(A, B, D ? G : void 0)
    }

    function IK9(A) {
        let B = {};
        if (A === "event") B.durationThreshold = 0;
        aC9.observe(A, (Q) => {
            rl(A, {
                entries: Q
            })
        }, B)
    }

    function Qm0(A, B) {
        JB1[A] = JB1[A] || [], JB1[A].push(B)
    }

    function Zm0(A, B, Q) {
        return () => {
            if (Q) Q();
            let Z = JB1[A];
            if (!Z) return;
            let D = Z.indexOf(B);
            if (D !== -1) Z.splice(D, 1)
        }
    }
    Dm0.addClsInstrumentationHandler = rC9;
    Dm0.addFidInstrumentationHandler = eC9;
    Dm0.addInpInstrumentationHandler = AK9;
    Dm0.addLcpInstrumentationHandler = oC9;
    Dm0.addPerformanceInstrumentationHandler = BK9;
    Dm0.addTtfbInstrumentationHandler = tC9
});
var Fm0 = E((Gm0) => {
    Object.defineProperty(Gm0, "__esModule", {
        value: !0
    });

    function KK9(A) {
        return typeof A === "number" && isFinite(A)
    }

    function HK9(A, {
        startTimestamp: B,
        ...Q
    }) {
        if (B && A.startTimestamp > B) A.startTimestamp = B;
        return A.startChild({
            startTimestamp: B,
            ...Q
        })
    }
    Gm0._startChild = HK9;
    Gm0.isMeasurementValue = KK9
});