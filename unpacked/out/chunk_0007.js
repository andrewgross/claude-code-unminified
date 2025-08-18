/* chunk:7 bytes:[109961, 127763) size:17802 source:unpacked-cli.js */
var _l = E((Lb0) => {
    Object.defineProperty(Lb0, "__esModule", {
        value: !0
    });
    var p21 = UA();

    function N39(A) {
        let B = p21.timestampInSeconds(),
            Q = {
                sid: p21.uuid4(),
                init: !0,
                timestamp: B,
                started: B,
                duration: 0,
                status: "ok",
                errors: 0,
                ignoreDuration: !1,
                toJSON: () => M39(Q)
            };
        if (A) Kc1(Q, A);
        return Q
    }

    function Kc1(A, B = {}) {
        if (B.user) {
            if (!A.ipAddress && B.user.ip_address) A.ipAddress = B.user.ip_address;
            if (!A.did && !B.did) A.did = B.user.id || B.user.email || B.user.username
        }
        if (A.timestamp = B.timestamp || p21.timestampInSeconds(), B.abnormal_mechanism) A.abnormal_mechanism = B.abnormal_mechanism;
        if (B.ignoreDuration) A.ignoreDuration = B.ignoreDuration;
        if (B.sid) A.sid = B.sid.length === 32 ? B.sid : p21.uuid4();
        if (B.init !== void 0) A.init = B.init;
        if (!A.did && B.did) A.did = `${B.did}`;
        if (typeof B.started === "number") A.started = B.started;
        if (A.ignoreDuration) A.duration = void 0;
        else if (typeof B.duration === "number") A.duration = B.duration;
        else {
            let Q = A.timestamp - A.started;
            A.duration = Q >= 0 ? Q : 0
        }
        if (B.release) A.release = B.release;
        if (B.environment) A.environment = B.environment;
        if (!A.ipAddress && B.ipAddress) A.ipAddress = B.ipAddress;
        if (!A.userAgent && B.userAgent) A.userAgent = B.userAgent;
        if (typeof B.errors === "number") A.errors = B.errors;
        if (B.status) A.status = B.status
    }

    function L39(A, B) {
        let Q = {};
        if (B) Q = {
            status: B
        };
        else if (A.status === "ok") Q = {
            status: "exited"
        };
        Kc1(A, Q)
    }

    function M39(A) {
        return p21.dropUndefinedKeys({
            sid: `${A.sid}`,
            init: A.init,
            started: new Date(A.started * 1000).toISOString(),
            timestamp: new Date(A.timestamp * 1000).toISOString(),
            status: A.status,
            errors: A.errors,
            did: typeof A.did === "number" || typeof A.did === "string" ? `${A.did}` : void 0,
            duration: A.duration,
            abnormal_mechanism: A.abnormal_mechanism,
            attrs: {
                release: A.release,
                environment: A.environment,
                ip_address: A.ipAddress,
                user_agent: A.userAgent
            }
        })
    }
    Lb0.closeSession = L39;
    Lb0.makeSession = N39;
    Lb0.updateSession = Kc1
});
var ZV = E((Pb0) => {
    Object.defineProperty(Pb0, "__esModule", {
        value: !0
    });
    var Hc1 = UA(),
        P39 = 0,
        Rb0 = 1;

    function S39(A) {
        let {
            spanId: B,
            traceId: Q
        } = A.spanContext(), {
            data: Z,
            op: D,
            parent_span_id: G,
            status: F,
            tags: I,
            origin: Y
        } = Ob0(A);
        return Hc1.dropUndefinedKeys({
            data: Z,
            op: D,
            parent_span_id: G,
            span_id: B,
            status: F,
            tags: I,
            trace_id: Q,
            origin: Y
        })
    }

    function j39(A) {
        let {
            traceId: B,
            spanId: Q
        } = A.spanContext(), Z = Tb0(A);
        return Hc1.generateSentryTraceHeader(B, Q, Z)
    }

    function k39(A) {
        if (typeof A === "number") return Mb0(A);
        if (Array.isArray(A)) return A[0] + A[1] / 1e9;
        if (A instanceof Date) return Mb0(A.getTime());
        return Hc1.timestampInSeconds()
    }

    function Mb0(A) {
        return A > 9999999999 ? A / 1000 : A
    }

    function Ob0(A) {
        if (y39(A)) return A.getSpanJSON();
        if (typeof A.toJSON === "function") return A.toJSON();
        return {}
    }

    function y39(A) {
        return typeof A.getSpanJSON === "function"
    }

    function Tb0(A) {
        let {
            traceFlags: B
        } = A.spanContext();
        return Boolean(B & Rb0)
    }
    Pb0.TRACE_FLAG_NONE = P39;
    Pb0.TRACE_FLAG_SAMPLED = Rb0;
    Pb0.spanIsSampled = Tb0;
    Pb0.spanTimeInputToSeconds = k39;
    Pb0.spanToJSON = Ob0;
    Pb0.spanToTraceContext = S39;
    Pb0.spanToTraceHeader = j39
});
var jJ1 = E((_b0) => {
    Object.defineProperty(_b0, "__esModule", {
        value: !0
    });
    var mC = UA(),
        u39 = yl(),
        Sb0 = l21(),
        Ec1 = yJ1(),
        zc1 = kJ1(),
        m39 = ZV();

    function d39(A, B, Q, Z, D, G) {
        let {
            normalizeDepth: F = 3,
            normalizeMaxBreadth: I = 1000
        } = A, Y = {
            ...B,
            event_id: B.event_id || Q.event_id || mC.uuid4(),
            timestamp: B.timestamp || mC.dateTimestampInSeconds()
        }, W = Q.integrations || A.integrations.map((z) => z.name);
        if (c39(Y, A), l39(Y, W), B.type === void 0) kb0(Y, A.stackParser);
        let J = i39(Z, Q.captureContext);
        if (Q.mechanism) mC.addExceptionMechanism(Y, Q.mechanism);
        let X = D && D.getEventProcessors ? D.getEventProcessors() : [],
            V = Ec1.getGlobalScope().getScopeData();
        if (G) {
            let z = G.getScopeData();
            zc1.mergeScopeData(V, z)
        }
        if (J) {
            let z = J.getScopeData();
            zc1.mergeScopeData(V, z)
        }
        let C = [...Q.attachments || [], ...V.attachments];
        if (C.length) Q.attachments = C;
        zc1.applyScopeDataToEvent(Y, V);
        let K = [...X, ...Sb0.getGlobalEventProcessors(), ...V.eventProcessors];
        return Sb0.notifyEventProcessors(K, Y, Q).then((z) => {
            if (z) yb0(z);
            if (typeof F === "number" && F > 0) return p39(z, F, I);
            return z
        })
    }

    function c39(A, B) {
        let {
            environment: Q,
            release: Z,
            dist: D,
            maxValueLength: G = 250
        } = B;
        if (!("environment" in A)) A.environment = "environment" in B ? Q : u39.DEFAULT_ENVIRONMENT;
        if (A.release === void 0 && Z !== void 0) A.release = Z;
        if (A.dist === void 0 && D !== void 0) A.dist = D;
        if (A.message) A.message = mC.truncate(A.message, G);
        let F = A.exception && A.exception.values && A.exception.values[0];
        if (F && F.value) F.value = mC.truncate(F.value, G);
        let I = A.request;
        if (I && I.url) I.url = mC.truncate(I.url, G)
    }
    var jb0 = new WeakMap;

    function kb0(A, B) {
        let Q = mC.GLOBAL_OBJ._sentryDebugIds;
        if (!Q) return;
        let Z, D = jb0.get(B);
        if (D) Z = D;
        else Z = new Map, jb0.set(B, Z);
        let G = Object.keys(Q).reduce((F, I) => {
            let Y, W = Z.get(I);
            if (W) Y = W;
            else Y = B(I), Z.set(I, Y);
            for (let J = Y.length - 1; J >= 0; J--) {
                let X = Y[J];
                if (X.filename) {
                    F[X.filename] = Q[I];
                    break
                }
            }
            return F
        }, {});
        try {
            A.exception.values.forEach((F) => {
                F.stacktrace.frames.forEach((I) => {
                    if (I.filename) I.debug_id = G[I.filename]
                })
            })
        } catch (F) {}
    }

    function yb0(A) {
        let B = {};
        try {
            A.exception.values.forEach((Z) => {
                Z.stacktrace.frames.forEach((D) => {
                    if (D.debug_id) {
                        if (D.abs_path) B[D.abs_path] = D.debug_id;
                        else if (D.filename) B[D.filename] = D.debug_id;
                        delete D.debug_id
                    }
                })
            })
        } catch (Z) {}
        if (Object.keys(B).length === 0) return;
        A.debug_meta = A.debug_meta || {}, A.debug_meta.images = A.debug_meta.images || [];
        let Q = A.debug_meta.images;
        Object.keys(B).forEach((Z) => {
            Q.push({
                type: "sourcemap",
                code_file: Z,
                debug_id: B[Z]
            })
        })
    }

    function l39(A, B) {
        if (B.length > 0) A.sdk = A.sdk || {}, A.sdk.integrations = [...A.sdk.integrations || [], ...B]
    }

    function p39(A, B, Q) {
        if (!A) return null;
        let Z = {
            ...A,
            ...A.breadcrumbs && {
                breadcrumbs: A.breadcrumbs.map((D) => ({
                    ...D,
                    ...D.data && {
                        data: mC.normalize(D.data, B, Q)
                    }
                }))
            },
            ...A.user && {
                user: mC.normalize(A.user, B, Q)
            },
            ...A.contexts && {
                contexts: mC.normalize(A.contexts, B, Q)
            },
            ...A.extra && {
                extra: mC.normalize(A.extra, B, Q)
            }
        };
        if (A.contexts && A.contexts.trace && Z.contexts) {
            if (Z.contexts.trace = A.contexts.trace, A.contexts.trace.data) Z.contexts.trace.data = mC.normalize(A.contexts.trace.data, B, Q)
        }
        if (A.spans) Z.spans = A.spans.map((D) => {
            let G = m39.spanToJSON(D).data;
            if (G) D.data = mC.normalize(G, B, Q);
            return D
        });
        return Z
    }

    function i39(A, B) {
        if (!B) return A;
        let Q = A ? A.clone() : new Ec1.Scope;
        return Q.update(B), Q
    }

    function n39(A) {
        if (!A) return;
        if (a39(A)) return {
            captureContext: A
        };
        if (r39(A)) return {
            captureContext: A
        };
        return A
    }

    function a39(A) {
        return A instanceof Ec1.Scope || typeof A === "function"
    }
    var s39 = ["user", "level", "extra", "contexts", "tags", "fingerprint", "requestSession", "propagationContext"];

    function r39(A) {
        return Object.keys(A).some((B) => s39.includes(B))
    }
    _b0.applyDebugIds = kb0;
    _b0.applyDebugMeta = yb0;
    _b0.parseEventHintOrCaptureContext = n39;
    _b0.prepareEvent = d39
});
var sH = E((bb0) => {
    Object.defineProperty(bb0, "__esModule", {
        value: !0
    });
    var KO = UA(),
        B79 = yl(),
        _J1 = vG(),
        dD = eq(),
        Uc1 = _l(),
        Q79 = jJ1();

    function Z79(A, B) {
        return dD.getCurrentHub().captureException(A, Q79.parseEventHintOrCaptureContext(B))
    }

    function D79(A, B) {
        let Q = typeof B === "string" ? B : void 0,
            Z = typeof B !== "string" ? {
                captureContext: B
            } : void 0;
        return dD.getCurrentHub().captureMessage(A, Q, Z)
    }

    function G79(A, B) {
        return dD.getCurrentHub().captureEvent(A, B)
    }

    function F79(A) {
        dD.getCurrentHub().configureScope(A)
    }

    function I79(A, B) {
        dD.getCurrentHub().addBreadcrumb(A, B)
    }

    function Y79(A, B) {
        dD.getCurrentHub().setContext(A, B)
    }

    function W79(A) {
        dD.getCurrentHub().setExtras(A)
    }

    function J79(A, B) {
        dD.getCurrentHub().setExtra(A, B)
    }

    function X79(A) {
        dD.getCurrentHub().setTags(A)
    }

    function V79(A, B) {
        dD.getCurrentHub().setTag(A, B)
    }

    function C79(A) {
        dD.getCurrentHub().setUser(A)
    }

    function xb0(...A) {
        let B = dD.getCurrentHub();
        if (A.length === 2) {
            let [Q, Z] = A;
            if (!Q) return B.withScope(Z);
            return B.withScope(() => {
                return B.getStackTop().scope = Q, Z(Q)
            })
        }
        return B.withScope(A[0])
    }

    function K79(A) {
        return dD.runWithAsyncContext(() => {
            return A(dD.getIsolationScope())
        })
    }

    function H79(A, B) {
        return xb0((Q) => {
            return Q.setSpan(A), B(Q)
        })
    }

    function z79(A, B) {
        return dD.getCurrentHub().startTransaction({
            ...A
        }, B)
    }

    function wc1(A, B) {
        let Q = i21(),
            Z = Tf();
        if (!Z) _J1.DEBUG_BUILD && KO.logger.warn("Cannot capture check-in. No client defined.");
        else if (!Z.captureCheckIn) _J1.DEBUG_BUILD && KO.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
        else return Z.captureCheckIn(A, B, Q);
        return KO.uuid4()
    }

    function E79(A, B, Q) {
        let Z = wc1({
                monitorSlug: A,
                status: "in_progress"
            }, Q),
            D = KO.timestampInSeconds();

        function G(I) {
            wc1({
                monitorSlug: A,
                status: I,
                checkInId: Z,
                duration: KO.timestampInSeconds() - D
            })
        }
        let F;
        try {
            F = B()
        } catch (I) {
            throw G("error"), I
        }
        if (KO.isThenable(F)) Promise.resolve(F).then(() => {
            G("ok")
        }, () => {
            G("error")
        });
        else G("ok");
        return F
    }
    async function U79(A) {
        let B = Tf();
        if (B) return B.flush(A);
        return _J1.DEBUG_BUILD && KO.logger.warn("Cannot flush events. No client defined."), Promise.resolve(!1)
    }
    async function w79(A) {
        let B = Tf();
        if (B) return B.close(A);
        return _J1.DEBUG_BUILD && KO.logger.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(!1)
    }

    function $79() {
        return dD.getCurrentHub().lastEventId()
    }

    function Tf() {
        return dD.getCurrentHub().getClient()
    }

    function q79() {
        return !!Tf()
    }

    function i21() {
        return dD.getCurrentHub().getScope()
    }

    function N79(A) {
        let B = Tf(),
            Q = dD.getIsolationScope(),
            Z = i21(),
            {
                release: D,
                environment: G = B79.DEFAULT_ENVIRONMENT
            } = B && B.getOptions() || {},
            {
                userAgent: F
            } = KO.GLOBAL_OBJ.navigator || {},
            I = Uc1.makeSession({
                release: D,
                environment: G,
                user: Z.getUser() || Q.getUser(),
                ...F && {
                    userAgent: F
                },
                ...A
            }),
            Y = Q.getSession();
        if (Y && Y.status === "ok") Uc1.updateSession(Y, {
            status: "exited"
        });
        return $c1(), Q.setSession(I), Z.setSession(I), I
    }

    function $c1() {
        let A = dD.getIsolationScope(),
            B = i21(),
            Q = B.getSession() || A.getSession();
        if (Q) Uc1.closeSession(Q);
        vb0(), A.setSession(), B.setSession()
    }

    function vb0() {
        let A = dD.getIsolationScope(),
            B = i21(),
            Q = Tf(),
            Z = B.getSession() || A.getSession();
        if (Z && Q && Q.captureSession) Q.captureSession(Z)
    }

    function L79(A = !1) {
        if (A) {
            $c1();
            return
        }
        vb0()
    }
    bb0.addBreadcrumb = I79;
    bb0.captureCheckIn = wc1;
    bb0.captureEvent = G79;
    bb0.captureException = Z79;
    bb0.captureMessage = D79;
    bb0.captureSession = L79;
    bb0.close = w79;
    bb0.configureScope = F79;
    bb0.endSession = $c1;
    bb0.flush = U79;
    bb0.getClient = Tf;
    bb0.getCurrentScope = i21;
    bb0.isInitialized = q79;
    bb0.lastEventId = $79;
    bb0.setContext = Y79;
    bb0.setExtra = J79;
    bb0.setExtras = W79;
    bb0.setTag = V79;
    bb0.setTags = X79;
    bb0.setUser = C79;
    bb0.startSession = N79;
    bb0.startTransaction = z79;
    bb0.withActiveSpan = H79;
    bb0.withIsolationScope = K79;
    bb0.withMonitor = E79;
    bb0.withScope = xb0
});
var xl = E((fb0) => {
    Object.defineProperty(fb0, "__esModule", {
        value: !0
    });

    function r79(A) {
        return A.transaction
    }
    fb0.getRootSpan = r79
});
var Pf = E((ub0) => {
    Object.defineProperty(ub0, "__esModule", {
        value: !0
    });
    var t79 = UA(),
        e79 = yl(),
        hb0 = sH(),
        AZ9 = xl(),
        qc1 = ZV();

    function gb0(A, B, Q) {
        let Z = B.getOptions(),
            {
                publicKey: D
            } = B.getDsn() || {},
            {
                segment: G
            } = Q && Q.getUser() || {},
            F = t79.dropUndefinedKeys({
                environment: Z.environment || e79.DEFAULT_ENVIRONMENT,
                release: Z.release,
                user_segment: G,
                public_key: D,
                trace_id: A
            });
        return B.emit && B.emit("createDsc", F), F
    }

    function BZ9(A) {
        let B = hb0.getClient();
        if (!B) return {};
        let Q = gb0(qc1.spanToJSON(A).trace_id || "", B, hb0.getCurrentScope()),
            Z = AZ9.getRootSpan(A);
        if (!Z) return Q;
        let D = Z && Z._frozenDynamicSamplingContext;
        if (D) return D;
        let {
            sampleRate: G,
            source: F
        } = Z.metadata;
        if (G != null) Q.sample_rate = `${G}`;
        let I = qc1.spanToJSON(Z);
        if (F && F !== "url") Q.transaction = I.description;
        return Q.sampled = String(qc1.spanIsSampled(Z)), B.emit && B.emit("createDsc", Q), Q
    }
    ub0.getDynamicSamplingContextFromClient = gb0;
    ub0.getDynamicSamplingContextFromSpan = BZ9
});