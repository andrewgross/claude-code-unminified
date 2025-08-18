/* chunk:142 bytes:[3187301, 3205761) size:18460 source:unpacked-cli.js */
var sn = E((c65, ujA) => {
    var {
        extractBody: B_Q,
        mixinBody: Q_Q,
        cloneBody: Z_Q,
        bodyUnusable: OjA
    } = Sn(), {
        Headers: vjA,
        fill: D_Q,
        HeadersList: nU1,
        setHeadersGuard: mA0,
        getHeadersGuard: G_Q,
        setHeadersList: bjA,
        getHeadersList: TjA
    } = Bg(), {
        FinalizationRegistry: F_Q
    } = RjA()(), pU1 = e4(), PjA = W1("node:util"), {
        isValidHTTPToken: I_Q,
        sameOrigin: SjA,
        environmentSettingsObject: lU1
    } = AK(), {
        forbiddenMethodsSet: Y_Q,
        corsSafeListedMethodsSet: W_Q,
        referrerPolicy: J_Q,
        requestRedirect: X_Q,
        requestMode: V_Q,
        requestCredentials: C_Q,
        requestCache: K_Q,
        requestDuplex: H_Q
    } = cQ1(), {
        kEnumerableProperty: nG,
        normalizedMethodRecordsBase: z_Q,
        normalizedMethodRecords: E_Q
    } = pU1, {
        kHeaders: GK,
        kSignal: iU1,
        kState: O7,
        kDispatcher: uA0
    } = sk(), {
        webidl: WQ
    } = NY(), {
        URLSerializer: U_Q
    } = NV(), {
        kConstruct: aU1
    } = VZ(), w_Q = W1("node:assert"), {
        getMaxListeners: jjA,
        setMaxListeners: kjA,
        getEventListeners: $_Q,
        defaultMaxListeners: yjA
    } = W1("node:events"), q_Q = Symbol("abortController"), fjA = new F_Q(({
        signal: A,
        abort: B
    }) => {
        A.removeEventListener("abort", B)
    }), sU1 = new WeakMap;

    function _jA(A) {
        return B;

        function B() {
            let Q = A.deref();
            if (Q !== void 0) {
                fjA.unregister(B), this.removeEventListener("abort", B), Q.abort(this.reason);
                let Z = sU1.get(Q.signal);
                if (Z !== void 0) {
                    if (Z.size !== 0) {
                        for (let D of Z) {
                            let G = D.deref();
                            if (G !== void 0) G.abort(this.reason)
                        }
                        Z.clear()
                    }
                    sU1.delete(Q.signal)
                }
            }
        }
    }
    var xjA = !1;
    class v3 {
        constructor(A, B = {}) {
            if (WQ.util.markAsUncloneable(this), A === aU1) return;
            let Q = "Request constructor";
            WQ.argumentLengthCheck(arguments, 1, Q), A = WQ.converters.RequestInfo(A, Q, "input"), B = WQ.converters.RequestInit(B, Q, "init");
            let Z = null,
                D = null,
                G = lU1.settingsObject.baseUrl,
                F = null;
            if (typeof A === "string") {
                this[uA0] = B.dispatcher;
                let z;
                try {
                    z = new URL(A, G)
                } catch ($) {
                    throw new TypeError("Failed to parse URL from " + A, {
                        cause: $
                    })
                }
                if (z.username || z.password) throw new TypeError("Request cannot be constructed from a URL that includes credentials: " + A);
                Z = rU1({
                    urlList: [z]
                }), D = "cors"
            } else this[uA0] = B.dispatcher || A[uA0], w_Q(A instanceof v3), Z = A[O7], F = A[iU1];
            let I = lU1.settingsObject.origin,
                Y = "client";
            if (Z.window?.constructor?.name === "EnvironmentSettingsObject" && SjA(Z.window, I)) Y = Z.window;
            if (B.window != null) throw new TypeError(`'window' option '${Y}' must be null`);
            if ("window" in B) Y = "no-window";
            Z = rU1({
                method: Z.method,
                headersList: Z.headersList,
                unsafeRequest: Z.unsafeRequest,
                client: lU1.settingsObject,
                window: Y,
                priority: Z.priority,
                origin: Z.origin,
                referrer: Z.referrer,
                referrerPolicy: Z.referrerPolicy,
                mode: Z.mode,
                credentials: Z.credentials,
                cache: Z.cache,
                redirect: Z.redirect,
                integrity: Z.integrity,
                keepalive: Z.keepalive,
                reloadNavigation: Z.reloadNavigation,
                historyNavigation: Z.historyNavigation,
                urlList: [...Z.urlList]
            });
            let W = Object.keys(B).length !== 0;
            if (W) {
                if (Z.mode === "navigate") Z.mode = "same-origin";
                Z.reloadNavigation = !1, Z.historyNavigation = !1, Z.origin = "client", Z.referrer = "client", Z.referrerPolicy = "", Z.url = Z.urlList[Z.urlList.length - 1], Z.urlList = [Z.url]
            }
            if (B.referrer !== void 0) {
                let z = B.referrer;
                if (z === "") Z.referrer = "no-referrer";
                else {
                    let $;
                    try {
                        $ = new URL(z, G)
                    } catch (L) {
                        throw new TypeError(`Referrer "${z}" is not a valid URL.`, {
                            cause: L
                        })
                    }
                    if ($.protocol === "about:" && $.hostname === "client" || I && !SjA($, lU1.settingsObject.baseUrl)) Z.referrer = "client";
                    else Z.referrer = $
                }
            }
            if (B.referrerPolicy !== void 0) Z.referrerPolicy = B.referrerPolicy;
            let J;
            if (B.mode !== void 0) J = B.mode;
            else J = D;
            if (J === "navigate") throw WQ.errors.exception({
                header: "Request constructor",
                message: "invalid request mode navigate."
            });
            if (J != null) Z.mode = J;
            if (B.credentials !== void 0) Z.credentials = B.credentials;
            if (B.cache !== void 0) Z.cache = B.cache;
            if (Z.cache === "only-if-cached" && Z.mode !== "same-origin") throw new TypeError("'only-if-cached' can be set only with 'same-origin' mode");
            if (B.redirect !== void 0) Z.redirect = B.redirect;
            if (B.integrity != null) Z.integrity = String(B.integrity);
            if (B.keepalive !== void 0) Z.keepalive = Boolean(B.keepalive);
            if (B.method !== void 0) {
                let z = B.method,
                    $ = E_Q[z];
                if ($ !== void 0) Z.method = $;
                else {
                    if (!I_Q(z)) throw new TypeError(`'${z}' is not a valid HTTP method.`);
                    let L = z.toUpperCase();
                    if (Y_Q.has(L)) throw new TypeError(`'${z}' HTTP method is unsupported.`);
                    z = z_Q[L] ?? z, Z.method = z
                }
                if (!xjA && Z.method === "patch") process.emitWarning("Using `patch` is highly likely to result in a `405 Method Not Allowed`. `PATCH` is much more likely to succeed.", {
                    code: "UNDICI-FETCH-patch"
                }), xjA = !0
            }
            if (B.signal !== void 0) F = B.signal;
            this[O7] = Z;
            let X = new AbortController;
            if (this[iU1] = X.signal, F != null) {
                if (!F || typeof F.aborted !== "boolean" || typeof F.addEventListener !== "function") throw new TypeError("Failed to construct 'Request': member signal is not of type AbortSignal.");
                if (F.aborted) X.abort(F.reason);
                else {
                    this[q_Q] = X;
                    let z = new WeakRef(X),
                        $ = _jA(z);
                    try {
                        if (typeof jjA === "function" && jjA(F) === yjA) kjA(1500, F);
                        else if ($_Q(F, "abort").length >= yjA) kjA(1500, F)
                    } catch {}
                    pU1.addAbortListener(F, $), fjA.register(X, {
                        signal: F,
                        abort: $
                    }, $)
                }
            }
            if (this[GK] = new vjA(aU1), bjA(this[GK], Z.headersList), mA0(this[GK], "request"), J === "no-cors") {
                if (!W_Q.has(Z.method)) throw new TypeError(`'${Z.method} is unsupported in no-cors mode.`);
                mA0(this[GK], "request-no-cors")
            }
            if (W) {
                let z = TjA(this[GK]),
                    $ = B.headers !== void 0 ? B.headers : new nU1(z);
                if (z.clear(), $ instanceof nU1) {
                    for (let {
                            name: L,
                            value: N
                        }
                        of $.rawValues()) z.append(L, N, !1);
                    z.cookies = $.cookies
                } else D_Q(this[GK], $)
            }
            let V = A instanceof v3 ? A[O7].body : null;
            if ((B.body != null || V != null) && (Z.method === "GET" || Z.method === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body.");
            let C = null;
            if (B.body != null) {
                let [z, $] = B_Q(B.body, Z.keepalive);
                if (C = z, $ && !TjA(this[GK]).contains("content-type", !0)) this[GK].append("content-type", $)
            }
            let K = C ?? V;
            if (K != null && K.source == null) {
                if (C != null && B.duplex == null) throw new TypeError("RequestInit: duplex option is required when sending a body.");
                if (Z.mode !== "same-origin" && Z.mode !== "cors") throw new TypeError('If request is made from ReadableStream, mode should be "same-origin" or "cors"');
                Z.useCORSPreflightFlag = !0
            }
            let H = K;
            if (C == null && V != null) {
                if (OjA(A)) throw new TypeError("Cannot construct a Request with a Request object that has already been used.");
                let z = new TransformStream;
                V.stream.pipeThrough(z), H = {
                    source: V.source,
                    length: V.length,
                    stream: z.readable
                }
            }
            this[O7].body = H
        }
        get method() {
            return WQ.brandCheck(this, v3), this[O7].method
        }
        get url() {
            return WQ.brandCheck(this, v3), U_Q(this[O7].url)
        }
        get headers() {
            return WQ.brandCheck(this, v3), this[GK]
        }
        get destination() {
            return WQ.brandCheck(this, v3), this[O7].destination
        }
        get referrer() {
            if (WQ.brandCheck(this, v3), this[O7].referrer === "no-referrer") return "";
            if (this[O7].referrer === "client") return "about:client";
            return this[O7].referrer.toString()
        }
        get referrerPolicy() {
            return WQ.brandCheck(this, v3), this[O7].referrerPolicy
        }
        get mode() {
            return WQ.brandCheck(this, v3), this[O7].mode
        }
        get credentials() {
            return this[O7].credentials
        }
        get cache() {
            return WQ.brandCheck(this, v3), this[O7].cache
        }
        get redirect() {
            return WQ.brandCheck(this, v3), this[O7].redirect
        }
        get integrity() {
            return WQ.brandCheck(this, v3), this[O7].integrity
        }
        get keepalive() {
            return WQ.brandCheck(this, v3), this[O7].keepalive
        }
        get isReloadNavigation() {
            return WQ.brandCheck(this, v3), this[O7].reloadNavigation
        }
        get isHistoryNavigation() {
            return WQ.brandCheck(this, v3), this[O7].historyNavigation
        }
        get signal() {
            return WQ.brandCheck(this, v3), this[iU1]
        }
        get body() {
            return WQ.brandCheck(this, v3), this[O7].body ? this[O7].body.stream : null
        }
        get bodyUsed() {
            return WQ.brandCheck(this, v3), !!this[O7].body && pU1.isDisturbed(this[O7].body.stream)
        }
        get duplex() {
            return WQ.brandCheck(this, v3), "half"
        }
        clone() {
            if (WQ.brandCheck(this, v3), OjA(this)) throw new TypeError("unusable");
            let A = hjA(this[O7]),
                B = new AbortController;
            if (this.signal.aborted) B.abort(this.signal.reason);
            else {
                let Q = sU1.get(this.signal);
                if (Q === void 0) Q = new Set, sU1.set(this.signal, Q);
                let Z = new WeakRef(B);
                Q.add(Z), pU1.addAbortListener(B.signal, _jA(Z))
            }
            return gjA(A, B.signal, G_Q(this[GK]))
        } [PjA.inspect.custom](A, B) {
            if (B.depth === null) B.depth = 2;
            B.colors ??= !0;
            let Q = {
                method: this.method,
                url: this.url,
                headers: this.headers,
                destination: this.destination,
                referrer: this.referrer,
                referrerPolicy: this.referrerPolicy,
                mode: this.mode,
                credentials: this.credentials,
                cache: this.cache,
                redirect: this.redirect,
                integrity: this.integrity,
                keepalive: this.keepalive,
                isReloadNavigation: this.isReloadNavigation,
                isHistoryNavigation: this.isHistoryNavigation,
                signal: this.signal
            };
            return `Request ${PjA.formatWithOptions(B,Q)}`
        }
    }
    Q_Q(v3);

    function rU1(A) {
        return {
            method: A.method ?? "GET",
            localURLsOnly: A.localURLsOnly ?? !1,
            unsafeRequest: A.unsafeRequest ?? !1,
            body: A.body ?? null,
            client: A.client ?? null,
            reservedClient: A.reservedClient ?? null,
            replacesClientId: A.replacesClientId ?? "",
            window: A.window ?? "client",
            keepalive: A.keepalive ?? !1,
            serviceWorkers: A.serviceWorkers ?? "all",
            initiator: A.initiator ?? "",
            destination: A.destination ?? "",
            priority: A.priority ?? null,
            origin: A.origin ?? "client",
            policyContainer: A.policyContainer ?? "client",
            referrer: A.referrer ?? "client",
            referrerPolicy: A.referrerPolicy ?? "",
            mode: A.mode ?? "no-cors",
            useCORSPreflightFlag: A.useCORSPreflightFlag ?? !1,
            credentials: A.credentials ?? "same-origin",
            useCredentials: A.useCredentials ?? !1,
            cache: A.cache ?? "default",
            redirect: A.redirect ?? "follow",
            integrity: A.integrity ?? "",
            cryptoGraphicsNonceMetadata: A.cryptoGraphicsNonceMetadata ?? "",
            parserMetadata: A.parserMetadata ?? "",
            reloadNavigation: A.reloadNavigation ?? !1,
            historyNavigation: A.historyNavigation ?? !1,
            userActivation: A.userActivation ?? !1,
            taintedOrigin: A.taintedOrigin ?? !1,
            redirectCount: A.redirectCount ?? 0,
            responseTainting: A.responseTainting ?? "basic",
            preventNoCacheCacheControlHeaderModification: A.preventNoCacheCacheControlHeaderModification ?? !1,
            done: A.done ?? !1,
            timingAllowFailed: A.timingAllowFailed ?? !1,
            urlList: A.urlList,
            url: A.urlList[0],
            headersList: A.headersList ? new nU1(A.headersList) : new nU1
        }
    }

    function hjA(A) {
        let B = rU1({
            ...A,
            body: null
        });
        if (A.body != null) B.body = Z_Q(B, A.body);
        return B
    }

    function gjA(A, B, Q) {
        let Z = new v3(aU1);
        return Z[O7] = A, Z[iU1] = B, Z[GK] = new vjA(aU1), bjA(Z[GK], A.headersList), mA0(Z[GK], Q), Z
    }
    Object.defineProperties(v3.prototype, {
        method: nG,
        url: nG,
        headers: nG,
        redirect: nG,
        clone: nG,
        signal: nG,
        duplex: nG,
        destination: nG,
        body: nG,
        bodyUsed: nG,
        isHistoryNavigation: nG,
        isReloadNavigation: nG,
        keepalive: nG,
        integrity: nG,
        cache: nG,
        credentials: nG,
        attribute: nG,
        referrerPolicy: nG,
        referrer: nG,
        mode: nG,
        [Symbol.toStringTag]: {
            value: "Request",
            configurable: !0
        }
    });
    WQ.converters.Request = WQ.interfaceConverter(v3);
    WQ.converters.RequestInfo = function(A, B, Q) {
        if (typeof A === "string") return WQ.converters.USVString(A, B, Q);
        if (A instanceof v3) return WQ.converters.Request(A, B, Q);
        return WQ.converters.USVString(A, B, Q)
    };
    WQ.converters.AbortSignal = WQ.interfaceConverter(AbortSignal);
    WQ.converters.RequestInit = WQ.dictionaryConverter([{
        key: "method",
        converter: WQ.converters.ByteString
    }, {
        key: "headers",
        converter: WQ.converters.HeadersInit
    }, {
        key: "body",
        converter: WQ.nullableConverter(WQ.converters.BodyInit)
    }, {
        key: "referrer",
        converter: WQ.converters.USVString
    }, {
        key: "referrerPolicy",
        converter: WQ.converters.DOMString,
        allowedValues: J_Q
    }, {
        key: "mode",
        converter: WQ.converters.DOMString,
        allowedValues: V_Q
    }, {
        key: "credentials",
        converter: WQ.converters.DOMString,
        allowedValues: C_Q
    }, {
        key: "cache",
        converter: WQ.converters.DOMString,
        allowedValues: K_Q
    }, {
        key: "redirect",
        converter: WQ.converters.DOMString,
        allowedValues: X_Q
    }, {
        key: "integrity",
        converter: WQ.converters.DOMString
    }, {
        key: "keepalive",
        converter: WQ.converters.boolean
    }, {
        key: "signal",
        converter: WQ.nullableConverter((A) => WQ.converters.AbortSignal(A, "RequestInit", "signal", {
            strict: !1
        }))
    }, {
        key: "window",
        converter: WQ.converters.any
    }, {
        key: "duplex",
        converter: WQ.converters.DOMString,
        allowedValues: H_Q
    }, {
        key: "dispatcher",
        converter: WQ.converters.any
    }]);
    ujA.exports = {
        Request: v3,
        makeRequest: rU1,
        fromInnerRequest: gjA,
        cloneRequest: hjA
    }
});