/* chunk:24 bytes:[394100, 413986) size:19886 source:unpacked-cli.js */
var fX1 = E((nd0) => {
    var {
        _optionalChain: el
    } = UA();
    Object.defineProperty(nd0, "__esModule", {
        value: !0
    });
    var gW = xQ(),
        pC = UA(),
        fl1 = $B1(),
        YU9 = gf(),
        qB1 = cd0(),
        WU9 = (A = {}) => {
            let {
                breadcrumbs: B,
                tracing: Q,
                shouldCreateSpanForRequest: Z
            } = A, D = {
                breadcrumbs: B,
                tracing: Q === !1 ? !1 : pC.dropUndefinedKeys({
                    enableIfHasTracingEnabled: Q === !0 ? void 0 : !0,
                    shouldCreateSpanForRequest: Z
                })
            };
            return new df(D)
        },
        JU9 = gW.defineIntegration(WU9);
    class df {
        static __initStatic() {
            this.id = "Http"
        }
        __init() {
            this.name = df.id
        }
        constructor(A = {}) {
            df.prototype.__init.call(this), this._breadcrumbs = typeof A.breadcrumbs === "undefined" ? !0 : A.breadcrumbs, this._tracing = !A.tracing ? void 0 : A.tracing === !0 ? {} : A.tracing
        }
        setupOnce(A, B) {
            let Q = el([B, "call", (Y) => Y(), "access", (Y) => Y.getClient, "call", (Y) => Y(), "optionalAccess", (Y) => Y.getOptions, "call", (Y) => Y()]),
                Z = pd0(this._tracing, Q);
            if (!this._breadcrumbs && !Z) return;
            if (Q && Q.instrumenter !== "sentry") {
                fl1.DEBUG_BUILD && pC.logger.log("HTTP Integration is skipped because of instrumenter configuration.");
                return
            }
            let D = id0(Z, this._tracing, Q),
                G = el([Q, "optionalAccess", (Y) => Y.tracePropagationTargets]) || el([this, "access", (Y) => Y._tracing, "optionalAccess", (Y) => Y.tracePropagationTargets]),
                F = W1("http"),
                I = ld0(F, this._breadcrumbs, D, G);
            if (pC.fill(F, "get", I), pC.fill(F, "request", I), YU9.NODE_VERSION.major > 8) {
                let Y = W1("https"),
                    W = ld0(Y, this._breadcrumbs, D, G);
                pC.fill(Y, "get", W), pC.fill(Y, "request", W)
            }
        }
    }
    df.__initStatic();

    function ld0(A, B, Q, Z) {
        let D = new pC.LRUMap(100),
            G = new pC.LRUMap(100),
            F = (W) => {
                if (Q === void 0) return !0;
                let J = D.get(W);
                if (J !== void 0) return J;
                let X = Q(W);
                return D.set(W, X), X
            },
            I = (W) => {
                if (Z === void 0) return !0;
                let J = G.get(W);
                if (J !== void 0) return J;
                let X = pC.stringMatchesSomePattern(W, Z);
                return G.set(W, X), X
            };

        function Y(W, J, X, V) {
            if (!gW.getCurrentHub().getIntegration(df)) return;
            gW.addBreadcrumb({
                category: "http",
                data: {
                    status_code: V && V.statusCode,
                    ...J
                },
                type: "http"
            }, {
                event: W,
                request: X,
                response: V
            })
        }
        return function W(J) {
            return function X(...V) {
                let C = qB1.normalizeRequestArgs(A, V),
                    K = C[0],
                    H = qB1.extractRawUrl(K),
                    z = qB1.extractUrl(K),
                    $ = gW.getClient();
                if (gW.isSentryRequestUrl(z, $)) return J.apply(A, C);
                let L = gW.getCurrentScope(),
                    N = gW.getIsolationScope(),
                    R = gW.getActiveSpan(),
                    O = VU9(z, K),
                    P = F(H) ? el([R, "optionalAccess", (j) => j.startChild, "call", (j) => j({
                        op: "http.client",
                        origin: "auto.http.node.http",
                        description: `${O["http.method"]} ${O.url}`,
                        data: O
                    })]) : void 0;
                if ($ && I(H)) {
                    let {
                        traceId: j,
                        spanId: f,
                        sampled: k,
                        dsc: c
                    } = {
                        ...N.getPropagationContext(),
                        ...L.getPropagationContext()
                    }, u = P ? gW.spanToTraceHeader(P) : pC.generateSentryTraceHeader(j, f, k), a = pC.dynamicSamplingContextToSentryBaggageHeader(c || (P ? gW.getDynamicSamplingContextFromSpan(P) : gW.getDynamicSamplingContextFromClient(j, $, L)));
                    XU9(K, z, u, a)
                } else fl1.DEBUG_BUILD && pC.logger.log(`[Tracing] Not adding sentry-trace header to outgoing request (${z}) due to mismatching tracePropagationTargets option.`);
                return J.apply(A, C).once("response", function(j) {
                    let f = this;
                    if (B) Y("response", O, f, j);
                    if (P) {
                        if (j.statusCode) gW.setHttpStatus(P, j.statusCode);
                        P.updateName(qB1.cleanSpanDescription(gW.spanToJSON(P).description || "", K, f) || ""), P.end()
                    }
                }).once("error", function() {
                    let j = this;
                    if (B) Y("error", O, j);
                    if (P) gW.setHttpStatus(P, 500), P.updateName(qB1.cleanSpanDescription(gW.spanToJSON(P).description || "", K, j) || ""), P.end()
                })
            }
        }
    }

    function XU9(A, B, Q, Z) {
        if ((A.headers || {})["sentry-trace"]) return;
        fl1.DEBUG_BUILD && pC.logger.log(`[Tracing] Adding sentry-trace header ${Q} to outgoing request to "${B}": `), A.headers = {
            ...A.headers,
            "sentry-trace": Q,
            ...Z && Z.length > 0 && {
                baggage: CU9(A, Z)
            }
        }
    }

    function VU9(A, B) {
        let Q = B.method || "GET",
            Z = {
                url: A,
                "http.method": Q
            };
        if (B.hash) Z["http.fragment"] = B.hash.substring(1);
        if (B.search) Z["http.query"] = B.search.substring(1);
        return Z
    }

    function CU9(A, B) {
        if (!A.headers || !A.headers.baggage) return B;
        else if (!B) return A.headers.baggage;
        else if (Array.isArray(A.headers.baggage)) return [...A.headers.baggage, B];
        return [A.headers.baggage, B]
    }

    function pd0(A, B) {
        return A === void 0 ? !1 : A.enableIfHasTracingEnabled ? gW.hasTracingEnabled(B) : !0
    }

    function id0(A, B, Q) {
        return A ? el([B, "optionalAccess", (D) => D.shouldCreateSpanForRequest]) || el([Q, "optionalAccess", (D) => D.shouldCreateSpanForRequest]) : () => !1
    }
    nd0.Http = df;
    nd0._getShouldCreateSpanForRequest = id0;
    nd0._shouldCreateSpans = pd0;
    nd0.httpIntegration = JU9
});
var rd0 = E((sd0) => {
    Object.defineProperty(sd0, "__esModule", {
        value: !0
    });

    function UU9(A, B, Q) {
        let Z = 0,
            D = 5,
            G = 0;
        return setInterval(() => {
            if (G === 0) {
                if (Z > A) {
                    if (D *= 2, Q(D), D > 86400) D = 86400;
                    G = D
                }
            } else if (G -= 1, G === 0) B();
            Z = 0
        }, 1000).unref(), () => {
            Z += 1
        }
    }

    function hl1(A) {
        return A !== void 0 && (A.length === 0 || A === "?" || A === "<anonymous>")
    }

    function wU9(A, B) {
        return A === B || hl1(A) && hl1(B)
    }

    function ad0(A) {
        if (A === void 0) return;
        return A.slice(-10).reduce((B, Q) => `${B},${Q.function},${Q.lineno},${Q.colno}`, "")
    }

    function $U9(A, B) {
        if (B === void 0) return;
        return ad0(A(B, 1))
    }
    sd0.createRateLimiter = UU9;
    sd0.functionNamesMatch = wU9;
    sd0.hashFrames = ad0;
    sd0.hashFromStack = $U9;
    sd0.isAnonymous = hl1
});
var Bc0 = E((Ac0) => {
    var {
        _optionalChain: ID
    } = UA();
    Object.defineProperty(Ac0, "__esModule", {
        value: !0
    });
    var gl1 = xQ(),
        hX1 = UA(),
        OU9 = gf(),
        gX1 = rd0();

    function ul1(A) {
        let B = [],
            Q = !1;

        function Z(F) {
            if (B = [], Q) return;
            Q = !0, A(F)
        }
        B.push(Z);

        function D(F) {
            B.push(F)
        }

        function G(F) {
            let I = B.pop() || Z;
            try {
                I(F)
            } catch (Y) {
                Z(F)
            }
        }
        return {
            add: D,
            next: G
        }
    }
    class od0 {
        constructor() {
            let {
                Session: A
            } = W1("inspector");
            this._session = new A
        }
        configureAndConnect(A, B) {
            this._session.connect(), this._session.on("Debugger.paused", (Q) => {
                A(Q, () => {
                    this._session.post("Debugger.resume")
                })
            }), this._session.post("Debugger.enable"), this._session.post("Debugger.setPauseOnExceptions", {
                state: B ? "all" : "uncaught"
            })
        }
        setPauseOnExceptions(A) {
            this._session.post("Debugger.setPauseOnExceptions", {
                state: A ? "all" : "uncaught"
            })
        }
        getLocalVariables(A, B) {
            this._getProperties(A, (Q) => {
                let {
                    add: Z,
                    next: D
                } = ul1(B);
                for (let G of Q)
                    if (ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.objectId]) && ID([G, "optionalAccess", (F) => F.value, "access", (F) => F.className]) === "Array") {
                        let F = G.value.objectId;
                        Z((I) => this._unrollArray(F, G.name, I, D))
                    } else if (ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.objectId]) && ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.className]) === "Object") {
                    let F = G.value.objectId;
                    Z((I) => this._unrollObject(F, G.name, I, D))
                } else if (ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.value]) != null || ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.description]) != null) Z((F) => this._unrollOther(G, F, D));
                D({})
            })
        }
        _getProperties(A, B) {
            this._session.post("Runtime.getProperties", {
                objectId: A,
                ownProperties: !0
            }, (Q, Z) => {
                if (Q) B([]);
                else B(Z.result)
            })
        }
        _unrollArray(A, B, Q, Z) {
            this._getProperties(A, (D) => {
                Q[B] = D.filter((G) => G.name !== "length" && !isNaN(parseInt(G.name, 10))).sort((G, F) => parseInt(G.name, 10) - parseInt(F.name, 10)).map((G) => ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.value])), Z(Q)
            })
        }
        _unrollObject(A, B, Q, Z) {
            this._getProperties(A, (D) => {
                Q[B] = D.map((G) => [G.name, ID([G, "optionalAccess", (F) => F.value, "optionalAccess", (F) => F.value])]).reduce((G, [F, I]) => {
                    return G[F] = I, G
                }, {}), Z(Q)
            })
        }
        _unrollOther(A, B, Q) {
            if (ID([A, "optionalAccess", (Z) => Z.value, "optionalAccess", (Z) => Z.value]) != null) B[A.name] = A.value.value;
            else if (ID([A, "optionalAccess", (Z) => Z.value, "optionalAccess", (Z) => Z.description]) != null && ID([A, "optionalAccess", (Z) => Z.value, "optionalAccess", (Z) => Z.type]) !== "function") B[A.name] = `<${A.value.description}>`;
            Q(B)
        }
    }

    function TU9() {
        try {
            return new od0
        } catch (A) {
            return
        }
    }
    var td0 = "LocalVariables",
        PU9 = (A = {}, B = TU9()) => {
            let Q = new hX1.LRUMap(20),
                Z, D = !1;

            function G(Y, {
                params: {
                    reason: W,
                    data: J,
                    callFrames: X
                }
            }, V) {
                if (W !== "exception" && W !== "promiseRejection") {
                    V();
                    return
                }
                ID([Z, "optionalCall", (z) => z()]);
                let C = gX1.hashFromStack(Y, ID([J, "optionalAccess", (z) => z.description]));
                if (C == null) {
                    V();
                    return
                }
                let {
                    add: K,
                    next: H
                } = ul1((z) => {
                    Q.set(C, z), V()
                });
                for (let z = 0; z < Math.min(X.length, 5); z++) {
                    let {
                        scopeChain: $,
                        functionName: L,
                        this: N
                    } = X[z], R = $.find((P) => P.type === "local"), O = N.className === "global" || !N.className ? L : `${N.className}.${L}`;
                    if (ID([R, "optionalAccess", (P) => P.object, "access", (P) => P.objectId]) === void 0) K((P) => {
                        P[z] = {
                            function: O
                        }, H(P)
                    });
                    else {
                        let P = R.object.objectId;
                        K((j) => ID([B, "optionalAccess", (f) => f.getLocalVariables, "call", (f) => f(P, (k) => {
                            j[z] = {
                                function: O,
                                vars: k
                            }, H(j)
                        })]))
                    }
                }
                H([])
            }

            function F(Y) {
                let W = gX1.hashFrames(ID([Y, "optionalAccess", (V) => V.stacktrace, "optionalAccess", (V) => V.frames]));
                if (W === void 0) return;
                let J = Q.remove(W);
                if (J === void 0) return;
                let X = (ID([Y, "access", (V) => V.stacktrace, "optionalAccess", (V) => V.frames]) || []).filter((V) => V.function !== "new Promise");
                for (let V = 0; V < X.length; V++) {
                    let C = X.length - V - 1;
                    if (!X[C] || !J[V]) break;
                    if (J[V].vars === void 0 || X[C].in_app === !1 || !gX1.functionNamesMatch(X[C].function, J[V].function)) continue;
                    X[C].vars = J[V].vars
                }
            }

            function I(Y) {
                for (let W of ID([Y, "optionalAccess", (J) => J.exception, "optionalAccess", (J) => J.values]) || []) F(W);
                return Y
            }
            return {
                name: td0,
                setupOnce() {
                    let Y = gl1.getClient(),
                        W = ID([Y, "optionalAccess", (J) => J.getOptions, "call", (J) => J()]);
                    if (B && ID([W, "optionalAccess", (J) => J.includeLocalVariables])) {
                        if (OU9.NODE_VERSION.major < 18) {
                            hX1.logger.log("The `LocalVariables` integration is only supported on Node >= v18.");
                            return
                        }
                        let X = A.captureAllExceptions !== !1;
                        if (B.configureAndConnect((V, C) => G(W.stackParser, V, C), X), X) {
                            let V = A.maxExceptionsPerSecond || 50;
                            Z = gX1.createRateLimiter(V, () => {
                                hX1.logger.log("Local variables rate-limit lifted."), ID([B, "optionalAccess", (C) => C.setPauseOnExceptions, "call", (C) => C(!0)])
                            }, (C) => {
                                hX1.logger.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${C} seconds.`), ID([B, "optionalAccess", (K) => K.setPauseOnExceptions, "call", (K) => K(!1)])
                            })
                        }
                        D = !0
                    }
                },
                processEvent(Y) {
                    if (D) return I(Y);
                    return Y
                },
                _getCachedFramesCount() {
                    return Q.size
                },
                _getFirstCachedFrame() {
                    return Q.values()[0]
                }
            }
        },
        ed0 = gl1.defineIntegration(PU9),
        SU9 = gl1.convertIntegrationFnToClass(td0, ed0);
    Ac0.LocalVariablesSync = SU9;
    Ac0.createCallbackList = ul1;
    Ac0.localVariablesSyncIntegration = ed0
});
var uX1 = E((Zc0) => {
    Object.defineProperty(Zc0, "__esModule", {
        value: !0
    });
    var Qc0 = Bc0(),
        _U9 = Qc0.LocalVariablesSync,
        xU9 = Qc0.localVariablesSyncIntegration;
    Zc0.LocalVariables = _U9;
    Zc0.localVariablesIntegration = xU9
});
var mX1 = E((Wc0) => {
    Object.defineProperty(Wc0, "__esModule", {
        value: !0
    });
    var Dc0 = W1("fs"),
        Gc0 = W1("path"),
        Fc0 = xQ(),
        ml1, Ic0 = "Modules";

    function fU9() {
        try {
            return W1.cache ? Object.keys(W1.cache) : []
        } catch (A) {
            return []
        }
    }

    function hU9() {
        let A = W1.main && W1.main.paths || [],
            B = fU9(),
            Q = {},
            Z = {};
        return B.forEach((D) => {
            let G = D,
                F = () => {
                    let I = G;
                    if (G = Gc0.dirname(I), !G || I === G || Z[I]) return;
                    if (A.indexOf(G) < 0) return F();
                    let Y = Gc0.join(I, "package.json");
                    if (Z[I] = !0, !Dc0.existsSync(Y)) return F();
                    try {
                        let W = JSON.parse(Dc0.readFileSync(Y, "utf8"));
                        Q[W.name] = W.version
                    } catch (W) {}
                };
            F()
        }), Q
    }

    function gU9() {
        if (!ml1) ml1 = hU9();
        return ml1
    }
    var uU9 = () => {
            return {
                name: Ic0,
                setupOnce() {},
                processEvent(A) {
                    return A.modules = {
                        ...A.modules,
                        ...gU9()
                    }, A
                }
            }
        },
        Yc0 = Fc0.defineIntegration(uU9),
        mU9 = Fc0.convertIntegrationFnToClass(Ic0, Yc0);
    Wc0.Modules = mU9;
    Wc0.modulesIntegration = Yc0
});
var cl1 = E((Jc0) => {
    Object.defineProperty(Jc0, "__esModule", {
        value: !0
    });
    var lU9 = xQ(),
        dX1 = UA(),
        dl1 = $B1(),
        pU9 = 2000;

    function iU9(A) {
        dX1.consoleSandbox(() => {
            console.error(A)
        });
        let B = lU9.getClient();
        if (B === void 0) dl1.DEBUG_BUILD && dX1.logger.warn("No NodeClient was defined, we are exiting the process now."), global.process.exit(1);
        let Q = B.getOptions(),
            Z = Q && Q.shutdownTimeout && Q.shutdownTimeout > 0 && Q.shutdownTimeout || pU9;
        B.close(Z).then((D) => {
            if (!D) dl1.DEBUG_BUILD && dX1.logger.warn("We reached the timeout for emptying the request buffer, still exiting now!");
            global.process.exit(1)
        }, (D) => {
            dl1.DEBUG_BUILD && dX1.logger.error(D)
        })
    }
    Jc0.logAndExitProcess = iU9
});