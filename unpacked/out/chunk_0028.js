/* chunk:28 bytes:[642162, 648347) size:6185 source:unpacked-cli.js */
var wl0 = E((Ul0) => {
    Object.defineProperty(Ul0, "__esModule", {
        value: !0
    });
    var Hl0 = xQ(),
        xq9 = UA(),
        zl0 = "Debug",
        vq9 = (A = {}) => {
            let B = {
                debugger: !1,
                stringify: !1,
                ...A
            };
            return {
                name: zl0,
                setupOnce() {},
                setup(Q) {
                    if (!Q.on) return;
                    Q.on("beforeSendEvent", (Z, D) => {
                        if (B.debugger) debugger;
                        xq9.consoleSandbox(() => {
                            if (B.stringify) {
                                if (console.log(JSON.stringify(Z, null, 2)), D && Object.keys(D).length) console.log(JSON.stringify(D, null, 2))
                            } else if (console.log(Z), D && Object.keys(D).length) console.log(D)
                        })
                    })
                }
            }
        },
        El0 = Hl0.defineIntegration(vq9),
        bq9 = Hl0.convertIntegrationFnToClass(zl0, El0);
    Ul0.Debug = bq9;
    Ul0.debugIntegration = El0
});
var NB1 = E(($l0) => {
    Object.defineProperty($l0, "__esModule", {
        value: !0
    });
    var gq9 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
    $l0.DEBUG_BUILD = gq9
});
var jl0 = E((Sl0) => {
    Object.defineProperty(Sl0, "__esModule", {
        value: !0
    });
    var Ll0 = xQ(),
        mq9 = UA(),
        dq9 = NB1(),
        Ml0 = "Dedupe",
        cq9 = () => {
            let A;
            return {
                name: Ml0,
                setupOnce() {},
                processEvent(B) {
                    if (B.type) return B;
                    try {
                        if (Ol0(B, A)) return dq9.DEBUG_BUILD && mq9.logger.warn("Event dropped due to being a duplicate of previously captured event."), null
                    } catch (Q) {}
                    return A = B
                }
            }
        },
        Rl0 = Ll0.defineIntegration(cq9),
        lq9 = Ll0.convertIntegrationFnToClass(Ml0, Rl0);

    function Ol0(A, B) {
        if (!B) return !1;
        if (pq9(A, B)) return !0;
        if (iq9(A, B)) return !0;
        return !1
    }

    function pq9(A, B) {
        let Q = A.message,
            Z = B.message;
        if (!Q && !Z) return !1;
        if (Q && !Z || !Q && Z) return !1;
        if (Q !== Z) return !1;
        if (!Pl0(A, B)) return !1;
        if (!Tl0(A, B)) return !1;
        return !0
    }

    function iq9(A, B) {
        let Q = ql0(B),
            Z = ql0(A);
        if (!Q || !Z) return !1;
        if (Q.type !== Z.type || Q.value !== Z.value) return !1;
        if (!Pl0(A, B)) return !1;
        if (!Tl0(A, B)) return !1;
        return !0
    }

    function Tl0(A, B) {
        let Q = Nl0(A),
            Z = Nl0(B);
        if (!Q && !Z) return !0;
        if (Q && !Z || !Q && Z) return !1;
        if (Q = Q, Z = Z, Z.length !== Q.length) return !1;
        for (let D = 0; D < Z.length; D++) {
            let G = Z[D],
                F = Q[D];
            if (G.filename !== F.filename || G.lineno !== F.lineno || G.colno !== F.colno || G.function !== F.function) return !1
        }
        return !0
    }

    function Pl0(A, B) {
        let Q = A.fingerprint,
            Z = B.fingerprint;
        if (!Q && !Z) return !0;
        if (Q && !Z || !Q && Z) return !1;
        Q = Q, Z = Z;
        try {
            return Q.join("") === Z.join("")
        } catch (D) {
            return !1
        }
    }

    function ql0(A) {
        return A.exception && A.exception.values && A.exception.values[0]
    }

    function Nl0(A) {
        let B = A.exception;
        if (B) try {
            return B.values[0].stacktrace.frames
        } catch (Q) {
            return
        }
        return
    }
    Sl0.Dedupe = lq9;
    Sl0._shouldDropEvent = Ol0;
    Sl0.dedupeIntegration = Rl0
});
var vl0 = E((xl0) => {
    Object.defineProperty(xl0, "__esModule", {
        value: !0
    });
    var kl0 = xQ(),
        Qk = UA(),
        rq9 = NB1(),
        yl0 = "ExtraErrorData",
        oq9 = (A = {}) => {
            let B = A.depth || 3,
                Q = A.captureErrorCause || !1;
            return {
                name: yl0,
                setupOnce() {},
                processEvent(Z, D) {
                    return eq9(Z, D, B, Q)
                }
            }
        },
        _l0 = kl0.defineIntegration(oq9),
        tq9 = kl0.convertIntegrationFnToClass(yl0, _l0);

    function eq9(A, B = {}, Q, Z) {
        if (!B.originalException || !Qk.isError(B.originalException)) return A;
        let D = B.originalException.name || B.originalException.constructor.name,
            G = AN9(B.originalException, Z);
        if (G) {
            let F = {
                    ...A.contexts
                },
                I = Qk.normalize(G, Q);
            if (Qk.isPlainObject(I)) Qk.addNonEnumerableProperty(I, "__sentry_skip_normalization__", !0), F[D] = I;
            return {
                ...A,
                contexts: F
            }
        }
        return A
    }

    function AN9(A, B) {
        try {
            let Q = ["name", "message", "stack", "line", "column", "fileName", "lineNumber", "columnNumber", "toJSON"],
                Z = {};
            for (let D of Object.keys(A)) {
                if (Q.indexOf(D) !== -1) continue;
                let G = A[D];
                Z[D] = Qk.isError(G) ? G.toString() : G
            }
            if (B && A.cause !== void 0) Z.cause = Qk.isError(A.cause) ? A.cause.toString() : A.cause;
            if (typeof A.toJSON === "function") {
                let D = A.toJSON();
                for (let G of Object.keys(D)) {
                    let F = D[G];
                    Z[G] = Qk.isError(F) ? F.toString() : F
                }
            }
            return Z
        } catch (Q) {
            rq9.DEBUG_BUILD && Qk.logger.error("Unable to extract extra data from the Error object:", Q)
        }
        return null
    }
    xl0.ExtraErrorData = tq9;
    xl0.extraErrorDataIntegration = _l0
});