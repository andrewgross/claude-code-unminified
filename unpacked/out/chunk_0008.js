/* chunk:8 bytes:[127764, 142099) size:14335 source:unpacked-cli.js */
var kJ1 = E((db0) => {
    Object.defineProperty(db0, "__esModule", {
        value: !0
    });
    var n21 = UA(),
        DZ9 = Pf(),
        GZ9 = xl(),
        mb0 = ZV();

    function FZ9(A, B) {
        let {
            fingerprint: Q,
            span: Z,
            breadcrumbs: D,
            sdkProcessingMetadata: G
        } = B;
        if (YZ9(A, B), Z) XZ9(A, Z);
        VZ9(A, Q), WZ9(A, D), JZ9(A, G)
    }

    function IZ9(A, B) {
        let {
            extra: Q,
            tags: Z,
            user: D,
            contexts: G,
            level: F,
            sdkProcessingMetadata: I,
            breadcrumbs: Y,
            fingerprint: W,
            eventProcessors: J,
            attachments: X,
            propagationContext: V,
            transactionName: C,
            span: K
        } = B;
        if (vl(A, "extra", Q), vl(A, "tags", Z), vl(A, "user", D), vl(A, "contexts", G), vl(A, "sdkProcessingMetadata", I), F) A.level = F;
        if (C) A.transactionName = C;
        if (K) A.span = K;
        if (Y.length) A.breadcrumbs = [...A.breadcrumbs, ...Y];
        if (W.length) A.fingerprint = [...A.fingerprint, ...W];
        if (J.length) A.eventProcessors = [...A.eventProcessors, ...J];
        if (X.length) A.attachments = [...A.attachments, ...X];
        A.propagationContext = {
            ...A.propagationContext,
            ...V
        }
    }

    function vl(A, B, Q) {
        if (Q && Object.keys(Q).length) {
            A[B] = {
                ...A[B]
            };
            for (let Z in Q)
                if (Object.prototype.hasOwnProperty.call(Q, Z)) A[B][Z] = Q[Z]
        }
    }

    function YZ9(A, B) {
        let {
            extra: Q,
            tags: Z,
            user: D,
            contexts: G,
            level: F,
            transactionName: I
        } = B, Y = n21.dropUndefinedKeys(Q);
        if (Y && Object.keys(Y).length) A.extra = {
            ...Y,
            ...A.extra
        };
        let W = n21.dropUndefinedKeys(Z);
        if (W && Object.keys(W).length) A.tags = {
            ...W,
            ...A.tags
        };
        let J = n21.dropUndefinedKeys(D);
        if (J && Object.keys(J).length) A.user = {
            ...J,
            ...A.user
        };
        let X = n21.dropUndefinedKeys(G);
        if (X && Object.keys(X).length) A.contexts = {
            ...X,
            ...A.contexts
        };
        if (F) A.level = F;
        if (I) A.transaction = I
    }

    function WZ9(A, B) {
        let Q = [...A.breadcrumbs || [], ...B];
        A.breadcrumbs = Q.length ? Q : void 0
    }

    function JZ9(A, B) {
        A.sdkProcessingMetadata = {
            ...A.sdkProcessingMetadata,
            ...B
        }
    }

    function XZ9(A, B) {
        A.contexts = {
            trace: mb0.spanToTraceContext(B),
            ...A.contexts
        };
        let Q = GZ9.getRootSpan(B);
        if (Q) {
            A.sdkProcessingMetadata = {
                dynamicSamplingContext: DZ9.getDynamicSamplingContextFromSpan(B),
                ...A.sdkProcessingMetadata
            };
            let Z = mb0.spanToJSON(Q).description;
            if (Z) A.tags = {
                transaction: Z,
                ...A.tags
            }
        }
    }

    function VZ9(A, B) {
        if (A.fingerprint = A.fingerprint ? n21.arrayify(A.fingerprint) : [], B) A.fingerprint = A.fingerprint.concat(B);
        if (A.fingerprint && !A.fingerprint.length) delete A.fingerprint
    }
    db0.applyScopeDataToEvent = FZ9;
    db0.mergeAndOverwriteScopeData = vl;
    db0.mergeScopeData = IZ9
});
var yJ1 = E((pb0) => {
    Object.defineProperty(pb0, "__esModule", {
        value: !0
    });
    var AN = UA(),
        cb0 = l21(),
        zZ9 = _l(),
        EZ9 = kJ1(),
        UZ9 = 100,
        xJ1;
    class bl {
        constructor() {
            this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = lb0()
        }
        static clone(A) {
            return A ? A.clone() : new bl
        }
        clone() {
            let A = new bl;
            return A._breadcrumbs = [...this._breadcrumbs], A._tags = {
                ...this._tags
            }, A._extra = {
                ...this._extra
            }, A._contexts = {
                ...this._contexts
            }, A._user = this._user, A._level = this._level, A._span = this._span, A._session = this._session, A._transactionName = this._transactionName, A._fingerprint = this._fingerprint, A._eventProcessors = [...this._eventProcessors], A._requestSession = this._requestSession, A._attachments = [...this._attachments], A._sdkProcessingMetadata = {
                ...this._sdkProcessingMetadata
            }, A._propagationContext = {
                ...this._propagationContext
            }, A._client = this._client, A
        }
        setClient(A) {
            this._client = A
        }
        getClient() {
            return this._client
        }
        addScopeListener(A) {
            this._scopeListeners.push(A)
        }
        addEventProcessor(A) {
            return this._eventProcessors.push(A), this
        }
        setUser(A) {
            if (this._user = A || {
                    email: void 0,
                    id: void 0,
                    ip_address: void 0,
                    segment: void 0,
                    username: void 0
                }, this._session) zZ9.updateSession(this._session, {
                user: A
            });
            return this._notifyScopeListeners(), this
        }
        getUser() {
            return this._user
        }
        getRequestSession() {
            return this._requestSession
        }
        setRequestSession(A) {
            return this._requestSession = A, this
        }
        setTags(A) {
            return this._tags = {
                ...this._tags,
                ...A
            }, this._notifyScopeListeners(), this
        }
        setTag(A, B) {
            return this._tags = {
                ...this._tags,
                [A]: B
            }, this._notifyScopeListeners(), this
        }
        setExtras(A) {
            return this._extra = {
                ...this._extra,
                ...A
            }, this._notifyScopeListeners(), this
        }
        setExtra(A, B) {
            return this._extra = {
                ...this._extra,
                [A]: B
            }, this._notifyScopeListeners(), this
        }
        setFingerprint(A) {
            return this._fingerprint = A, this._notifyScopeListeners(), this
        }
        setLevel(A) {
            return this._level = A, this._notifyScopeListeners(), this
        }
        setTransactionName(A) {
            return this._transactionName = A, this._notifyScopeListeners(), this
        }
        setContext(A, B) {
            if (B === null) delete this._contexts[A];
            else this._contexts[A] = B;
            return this._notifyScopeListeners(), this
        }
        setSpan(A) {
            return this._span = A, this._notifyScopeListeners(), this
        }
        getSpan() {
            return this._span
        }
        getTransaction() {
            let A = this._span;
            return A && A.transaction
        }
        setSession(A) {
            if (!A) delete this._session;
            else this._session = A;
            return this._notifyScopeListeners(), this
        }
        getSession() {
            return this._session
        }
        update(A) {
            if (!A) return this;
            let B = typeof A === "function" ? A(this) : A;
            if (B instanceof bl) {
                let Q = B.getScopeData();
                if (this._tags = {
                        ...this._tags,
                        ...Q.tags
                    }, this._extra = {
                        ...this._extra,
                        ...Q.extra
                    }, this._contexts = {
                        ...this._contexts,
                        ...Q.contexts
                    }, Q.user && Object.keys(Q.user).length) this._user = Q.user;
                if (Q.level) this._level = Q.level;
                if (Q.fingerprint.length) this._fingerprint = Q.fingerprint;
                if (B.getRequestSession()) this._requestSession = B.getRequestSession();
                if (Q.propagationContext) this._propagationContext = Q.propagationContext
            } else if (AN.isPlainObject(B)) {
                let Q = A;
                if (this._tags = {
                        ...this._tags,
                        ...Q.tags
                    }, this._extra = {
                        ...this._extra,
                        ...Q.extra
                    }, this._contexts = {
                        ...this._contexts,
                        ...Q.contexts
                    }, Q.user) this._user = Q.user;
                if (Q.level) this._level = Q.level;
                if (Q.fingerprint) this._fingerprint = Q.fingerprint;
                if (Q.requestSession) this._requestSession = Q.requestSession;
                if (Q.propagationContext) this._propagationContext = Q.propagationContext
            }
            return this
        }
        clear() {
            return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this._attachments = [], this._propagationContext = lb0(), this
        }
        addBreadcrumb(A, B) {
            let Q = typeof B === "number" ? B : UZ9;
            if (Q <= 0) return this;
            let Z = {
                    timestamp: AN.dateTimestampInSeconds(),
                    ...A
                },
                D = this._breadcrumbs;
            return D.push(Z), this._breadcrumbs = D.length > Q ? D.slice(-Q) : D, this._notifyScopeListeners(), this
        }
        getLastBreadcrumb() {
            return this._breadcrumbs[this._breadcrumbs.length - 1]
        }
        clearBreadcrumbs() {
            return this._breadcrumbs = [], this._notifyScopeListeners(), this
        }
        addAttachment(A) {
            return this._attachments.push(A), this
        }
        getAttachments() {
            return this.getScopeData().attachments
        }
        clearAttachments() {
            return this._attachments = [], this
        }
        getScopeData() {
            let {
                _breadcrumbs: A,
                _attachments: B,
                _contexts: Q,
                _tags: Z,
                _extra: D,
                _user: G,
                _level: F,
                _fingerprint: I,
                _eventProcessors: Y,
                _propagationContext: W,
                _sdkProcessingMetadata: J,
                _transactionName: X,
                _span: V
            } = this;
            return {
                breadcrumbs: A,
                attachments: B,
                contexts: Q,
                tags: Z,
                extra: D,
                user: G,
                level: F,
                fingerprint: I || [],
                eventProcessors: Y,
                propagationContext: W,
                sdkProcessingMetadata: J,
                transactionName: X,
                span: V
            }
        }
        applyToEvent(A, B = {}, Q = []) {
            EZ9.applyScopeDataToEvent(A, this.getScopeData());
            let Z = [...Q, ...cb0.getGlobalEventProcessors(), ...this._eventProcessors];
            return cb0.notifyEventProcessors(Z, A, B)
        }
        setSDKProcessingMetadata(A) {
            return this._sdkProcessingMetadata = {
                ...this._sdkProcessingMetadata,
                ...A
            }, this
        }
        setPropagationContext(A) {
            return this._propagationContext = A, this
        }
        getPropagationContext() {
            return this._propagationContext
        }
        captureException(A, B) {
            let Q = B && B.event_id ? B.event_id : AN.uuid4();
            if (!this._client) return AN.logger.warn("No client configured on scope - will not capture exception!"), Q;
            let Z = new Error("Sentry syntheticException");
            return this._client.captureException(A, {
                originalException: A,
                syntheticException: Z,
                ...B,
                event_id: Q
            }, this), Q
        }
        captureMessage(A, B, Q) {
            let Z = Q && Q.event_id ? Q.event_id : AN.uuid4();
            if (!this._client) return AN.logger.warn("No client configured on scope - will not capture message!"), Z;
            let D = new Error(A);
            return this._client.captureMessage(A, B, {
                originalException: A,
                syntheticException: D,
                ...Q,
                event_id: Z
            }, this), Z
        }
        captureEvent(A, B) {
            let Q = B && B.event_id ? B.event_id : AN.uuid4();
            if (!this._client) return AN.logger.warn("No client configured on scope - will not capture event!"), Q;
            return this._client.captureEvent(A, {
                ...B,
                event_id: Q
            }, this), Q
        }
        _notifyScopeListeners() {
            if (!this._notifyingListeners) this._notifyingListeners = !0, this._scopeListeners.forEach((A) => {
                A(this)
            }), this._notifyingListeners = !1
        }
    }

    function wZ9() {
        if (!xJ1) xJ1 = new bl;
        return xJ1
    }

    function $Z9(A) {
        xJ1 = A
    }

    function lb0() {
        return {
            traceId: AN.uuid4(),
            spanId: AN.uuid4().substring(16)
        }
    }
    pb0.Scope = bl;
    pb0.getGlobalScope = wZ9;
    pb0.setGlobalScope = $Z9
});
var vJ1 = E((ib0) => {
    Object.defineProperty(ib0, "__esModule", {
        value: !0
    });
    var MZ9 = "7.120.3";
    ib0.SDK_VERSION = MZ9
});