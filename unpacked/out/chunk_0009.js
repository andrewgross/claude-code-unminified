/* chunk:9 bytes:[142100, 156200) size:14100 source:unpacked-cli.js */
var eq = E((ob0) => {
    Object.defineProperty(ob0, "__esModule", {
        value: !0
    });
    var dJ = UA(),
        OZ9 = yl(),
        Nc1 = vG(),
        nb0 = yJ1(),
        Lc1 = _l(),
        TZ9 = vJ1(),
        bJ1 = parseFloat(TZ9.SDK_VERSION),
        PZ9 = 100;
    class s21 {
        constructor(A, B, Q, Z = bJ1) {
            this._version = Z;
            let D;
            if (!B) D = new nb0.Scope, D.setClient(A);
            else D = B;
            let G;
            if (!Q) G = new nb0.Scope, G.setClient(A);
            else G = Q;
            if (this._stack = [{
                    scope: D
                }], A) this.bindClient(A);
            this._isolationScope = G
        }
        isOlderThan(A) {
            return this._version < A
        }
        bindClient(A) {
            let B = this.getStackTop();
            if (B.client = A, B.scope.setClient(A), A && A.setupIntegrations) A.setupIntegrations()
        }
        pushScope() {
            let A = this.getScope().clone();
            return this.getStack().push({
                client: this.getClient(),
                scope: A
            }), A
        }
        popScope() {
            if (this.getStack().length <= 1) return !1;
            return !!this.getStack().pop()
        }
        withScope(A) {
            let B = this.pushScope(),
                Q;
            try {
                Q = A(B)
            } catch (Z) {
                throw this.popScope(), Z
            }
            if (dJ.isThenable(Q)) return Q.then((Z) => {
                return this.popScope(), Z
            }, (Z) => {
                throw this.popScope(), Z
            });
            return this.popScope(), Q
        }
        getClient() {
            return this.getStackTop().client
        }
        getScope() {
            return this.getStackTop().scope
        }
        getIsolationScope() {
            return this._isolationScope
        }
        getStack() {
            return this._stack
        }
        getStackTop() {
            return this._stack[this._stack.length - 1]
        }
        captureException(A, B) {
            let Q = this._lastEventId = B && B.event_id ? B.event_id : dJ.uuid4(),
                Z = new Error("Sentry syntheticException");
            return this.getScope().captureException(A, {
                originalException: A,
                syntheticException: Z,
                ...B,
                event_id: Q
            }), Q
        }
        captureMessage(A, B, Q) {
            let Z = this._lastEventId = Q && Q.event_id ? Q.event_id : dJ.uuid4(),
                D = new Error(A);
            return this.getScope().captureMessage(A, B, {
                originalException: A,
                syntheticException: D,
                ...Q,
                event_id: Z
            }), Z
        }
        captureEvent(A, B) {
            let Q = B && B.event_id ? B.event_id : dJ.uuid4();
            if (!A.type) this._lastEventId = Q;
            return this.getScope().captureEvent(A, {
                ...B,
                event_id: Q
            }), Q
        }
        lastEventId() {
            return this._lastEventId
        }
        addBreadcrumb(A, B) {
            let {
                scope: Q,
                client: Z
            } = this.getStackTop();
            if (!Z) return;
            let {
                beforeBreadcrumb: D = null,
                maxBreadcrumbs: G = PZ9
            } = Z.getOptions && Z.getOptions() || {};
            if (G <= 0) return;
            let I = {
                    timestamp: dJ.dateTimestampInSeconds(),
                    ...A
                },
                Y = D ? dJ.consoleSandbox(() => D(I, B)) : I;
            if (Y === null) return;
            if (Z.emit) Z.emit("beforeAddBreadcrumb", Y, B);
            Q.addBreadcrumb(Y, G)
        }
        setUser(A) {
            this.getScope().setUser(A), this.getIsolationScope().setUser(A)
        }
        setTags(A) {
            this.getScope().setTags(A), this.getIsolationScope().setTags(A)
        }
        setExtras(A) {
            this.getScope().setExtras(A), this.getIsolationScope().setExtras(A)
        }
        setTag(A, B) {
            this.getScope().setTag(A, B), this.getIsolationScope().setTag(A, B)
        }
        setExtra(A, B) {
            this.getScope().setExtra(A, B), this.getIsolationScope().setExtra(A, B)
        }
        setContext(A, B) {
            this.getScope().setContext(A, B), this.getIsolationScope().setContext(A, B)
        }
        configureScope(A) {
            let {
                scope: B,
                client: Q
            } = this.getStackTop();
            if (Q) A(B)
        }
        run(A) {
            let B = Mc1(this);
            try {
                A(this)
            } finally {
                Mc1(B)
            }
        }
        getIntegration(A) {
            let B = this.getClient();
            if (!B) return null;
            try {
                return B.getIntegration(A)
            } catch (Q) {
                return Nc1.DEBUG_BUILD && dJ.logger.warn(`Cannot retrieve integration ${A.id} from the current Hub`), null
            }
        }
        startTransaction(A, B) {
            let Q = this._callExtensionMethod("startTransaction", A, B);
            if (Nc1.DEBUG_BUILD && !Q)
                if (!this.getClient()) dJ.logger.warn("Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'");
                else dJ.logger.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
            return Q
        }
        traceHeaders() {
            return this._callExtensionMethod("traceHeaders")
        }
        captureSession(A = !1) {
            if (A) return this.endSession();
            this._sendSessionUpdate()
        }
        endSession() {
            let B = this.getStackTop().scope,
                Q = B.getSession();
            if (Q) Lc1.closeSession(Q);
            this._sendSessionUpdate(), B.setSession()
        }
        startSession(A) {
            let {
                scope: B,
                client: Q
            } = this.getStackTop(), {
                release: Z,
                environment: D = OZ9.DEFAULT_ENVIRONMENT
            } = Q && Q.getOptions() || {}, {
                userAgent: G
            } = dJ.GLOBAL_OBJ.navigator || {}, F = Lc1.makeSession({
                release: Z,
                environment: D,
                user: B.getUser(),
                ...G && {
                    userAgent: G
                },
                ...A
            }), I = B.getSession && B.getSession();
            if (I && I.status === "ok") Lc1.updateSession(I, {
                status: "exited"
            });
            return this.endSession(), B.setSession(F), F
        }
        shouldSendDefaultPii() {
            let A = this.getClient(),
                B = A && A.getOptions();
            return Boolean(B && B.sendDefaultPii)
        }
        _sendSessionUpdate() {
            let {
                scope: A,
                client: B
            } = this.getStackTop(), Q = A.getSession();
            if (Q && B && B.captureSession) B.captureSession(Q)
        }
        _callExtensionMethod(A, ...B) {
            let Z = Sf().__SENTRY__;
            if (Z && Z.extensions && typeof Z.extensions[A] === "function") return Z.extensions[A].apply(this, B);
            Nc1.DEBUG_BUILD && dJ.logger.warn(`Extension method ${A} couldn't be found, doing nothing.`)
        }
    }

    function Sf() {
        return dJ.GLOBAL_OBJ.__SENTRY__ = dJ.GLOBAL_OBJ.__SENTRY__ || {
            extensions: {},
            hub: void 0
        }, dJ.GLOBAL_OBJ
    }

    function Mc1(A) {
        let B = Sf(),
            Q = a21(B);
        return fJ1(B, A), Q
    }

    function ab0() {
        let A = Sf();
        if (A.__SENTRY__ && A.__SENTRY__.acs) {
            let B = A.__SENTRY__.acs.getCurrentHub();
            if (B) return B
        }
        return sb0(A)
    }

    function SZ9() {
        return ab0().getIsolationScope()
    }

    function sb0(A = Sf()) {
        if (!rb0(A) || a21(A).isOlderThan(bJ1)) fJ1(A, new s21);
        return a21(A)
    }

    function jZ9(A, B = sb0()) {
        if (!rb0(A) || a21(A).isOlderThan(bJ1)) {
            let Q = B.getClient(),
                Z = B.getScope(),
                D = B.getIsolationScope();
            fJ1(A, new s21(Q, Z.clone(), D.clone()))
        }
    }

    function kZ9(A) {
        let B = Sf();
        B.__SENTRY__ = B.__SENTRY__ || {}, B.__SENTRY__.acs = A
    }

    function yZ9(A, B = {}) {
        let Q = Sf();
        if (Q.__SENTRY__ && Q.__SENTRY__.acs) return Q.__SENTRY__.acs.runWithAsyncContext(A, B);
        return A()
    }

    function rb0(A) {
        return !!(A && A.__SENTRY__ && A.__SENTRY__.hub)
    }

    function a21(A) {
        return dJ.getGlobalSingleton("hub", () => new s21, A)
    }

    function fJ1(A, B) {
        if (!A) return !1;
        let Q = A.__SENTRY__ = A.__SENTRY__ || {};
        return Q.hub = B, !0
    }
    ob0.API_VERSION = bJ1;
    ob0.Hub = s21;
    ob0.ensureHubOnCarrier = jZ9;
    ob0.getCurrentHub = ab0;
    ob0.getHubFromCarrier = a21;
    ob0.getIsolationScope = SZ9;
    ob0.getMainCarrier = Sf;
    ob0.makeMain = Mc1;
    ob0.runWithAsyncContext = yZ9;
    ob0.setAsyncContextStrategy = kZ9;
    ob0.setHubOnCarrier = fJ1
});
var hJ1 = E((eb0) => {
    Object.defineProperty(eb0, "__esModule", {
        value: !0
    });
    var tb0 = UA(),
        lZ9 = eq();

    function pZ9(A) {
        return (A || lZ9.getCurrentHub()).getScope().getTransaction()
    }
    var iZ9 = tb0.extractTraceparentData;
    eb0.stripUrlQueryAndFragment = tb0.stripUrlQueryAndFragment;
    eb0.extractTraceparentData = iZ9;
    eb0.getActiveTransaction = pZ9
});
var gJ1 = E((Bf0) => {
    Object.defineProperty(Bf0, "__esModule", {
        value: !0
    });
    var Rc1 = UA(),
        rZ9 = vG(),
        oZ9 = hJ1(),
        Af0 = !1;

    function tZ9() {
        if (Af0) return;
        Af0 = !0, Rc1.addGlobalErrorInstrumentationHandler(Oc1), Rc1.addGlobalUnhandledRejectionInstrumentationHandler(Oc1)
    }

    function Oc1() {
        let A = oZ9.getActiveTransaction();
        if (A) rZ9.DEBUG_BUILD && Rc1.logger.log("[Tracing] Transaction: internal_error -> Global error occured"), A.setStatus("internal_error")
    }
    Oc1.tag = "sentry_tracingErrorCallback";
    Bf0.registerErrorInstrumentation = tZ9
});
var fl = E((Qf0) => {
    Object.defineProperty(Qf0, "__esModule", {
        value: !0
    });
    Qf0.SpanStatus = void 0;
    (function(A) {
        A.Ok = "ok";
        let Q = "deadline_exceeded";
        A.DeadlineExceeded = Q;
        let Z = "unauthenticated";
        A.Unauthenticated = Z;
        let D = "permission_denied";
        A.PermissionDenied = D;
        let G = "not_found";
        A.NotFound = G;
        let F = "resource_exhausted";
        A.ResourceExhausted = F;
        let I = "invalid_argument";
        A.InvalidArgument = I;
        let Y = "unimplemented";
        A.Unimplemented = Y;
        let W = "unavailable";
        A.Unavailable = W;
        let J = "internal_error";
        A.InternalError = J;
        let X = "unknown_error";
        A.UnknownError = X;
        let V = "cancelled";
        A.Cancelled = V;
        let C = "already_exists";
        A.AlreadyExists = C;
        let K = "failed_precondition";
        A.FailedPrecondition = K;
        let H = "aborted";
        A.Aborted = H;
        let z = "out_of_range";
        A.OutOfRange = z;
        let $ = "data_loss";
        A.DataLoss = $
    })(Qf0.SpanStatus || (Qf0.SpanStatus = {}));

    function Pc1(A) {
        if (A < 400 && A >= 100) return "ok";
        if (A >= 400 && A < 500) switch (A) {
            case 401:
                return "unauthenticated";
            case 403:
                return "permission_denied";
            case 404:
                return "not_found";
            case 409:
                return "already_exists";
            case 413:
                return "failed_precondition";
            case 429:
                return "resource_exhausted";
            default:
                return "invalid_argument"
        }
        if (A >= 500 && A < 600) switch (A) {
            case 501:
                return "unimplemented";
            case 503:
                return "unavailable";
            case 504:
                return "deadline_exceeded";
            default:
                return "internal_error"
        }
        return "unknown_error"
    }
    var AD9 = Pc1;

    function BD9(A, B) {
        A.setTag("http.status_code", String(B)), A.setData("http.response.status_code", B);
        let Q = Pc1(B);
        if (Q !== "unknown_error") A.setStatus(Q)
    }
    Qf0.getSpanStatusFromHttpCode = Pc1;
    Qf0.setHttpStatus = BD9;
    Qf0.spanStatusfromHttpCode = AD9
});
var Sc1 = E((Zf0) => {
    Object.defineProperty(Zf0, "__esModule", {
        value: !0
    });
    var GD9 = UA();

    function FD9(A, B, Q = () => {}) {
        let Z;
        try {
            Z = A()
        } catch (D) {
            throw B(D), Q(), D
        }
        return ID9(Z, B, Q)
    }

    function ID9(A, B, Q) {
        if (GD9.isThenable(A)) return A.then((Z) => {
            return Q(), Z
        }, (Z) => {
            throw B(Z), Q(), Z
        });
        return Q(), A
    }
    Zf0.handleCallbackErrors = FD9
});
var uJ1 = E((Df0) => {
    Object.defineProperty(Df0, "__esModule", {
        value: !0
    });
    var WD9 = sH();

    function JD9(A) {
        if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) return !1;
        let B = WD9.getClient(),
            Q = A || B && B.getOptions();
        return !!Q && (Q.enableTracing || ("tracesSampleRate" in Q) || ("tracesSampler" in Q))
    }
    Df0.hasTracingEnabled = JD9
});