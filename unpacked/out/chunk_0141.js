/* chunk:141 bytes:[3175845, 3187300) size:11455 source:unpacked-cli.js */
var L41 = E((m65, wjA) => {
    var {
        Headers: HjA,
        HeadersList: JjA,
        fill: _yQ,
        getHeadersGuard: xyQ,
        setHeadersGuard: zjA,
        setHeadersList: EjA
    } = Bg(), {
        extractBody: XjA,
        cloneBody: vyQ,
        mixinBody: byQ,
        hasFinalizationRegistry: fyQ,
        streamRegistry: hyQ,
        bodyUnusable: gyQ
    } = Sn(), fA0 = e4(), VjA = W1("node:util"), {
        kEnumerableProperty: DK
    } = fA0, {
        isValidReasonPhrase: uyQ,
        isCancelled: myQ,
        isAborted: dyQ,
        isBlobLike: cyQ,
        serializeJavascriptValueToJSONString: lyQ,
        isErrorLike: pyQ,
        isomorphicEncode: iyQ,
        environmentSettingsObject: nyQ
    } = AK(), {
        redirectStatusSet: ayQ,
        nullBodyStatus: syQ
    } = cQ1(), {
        kState: KD,
        kHeaders: DT
    } = sk(), {
        webidl: w4
    } = NY(), {
        FormData: ryQ
    } = aQ1(), {
        URLSerializer: CjA
    } = NV(), {
        kConstruct: dU1
    } = VZ(), hA0 = W1("node:assert"), {
        types: oyQ
    } = W1("node:util"), tyQ = new TextEncoder("utf-8");
    class aW {
        static error() {
            return N41(cU1(), "immutable")
        }
        static json(A, B = {}) {
            if (w4.argumentLengthCheck(arguments, 1, "Response.json"), B !== null) B = w4.converters.ResponseInit(B);
            let Q = tyQ.encode(lyQ(A)),
                Z = XjA(Q),
                D = N41(an({}), "response");
            return KjA(D, B, {
                body: Z[0],
                type: "application/json"
            }), D
        }
        static redirect(A, B = 302) {
            w4.argumentLengthCheck(arguments, 1, "Response.redirect"), A = w4.converters.USVString(A), B = w4.converters["unsigned short"](B);
            let Q;
            try {
                Q = new URL(A, nyQ.settingsObject.baseUrl)
            } catch (G) {
                throw new TypeError(`Failed to parse URL from ${A}`, {
                    cause: G
                })
            }
            if (!ayQ.has(B)) throw new RangeError(`Invalid status code ${B}`);
            let Z = N41(an({}), "immutable");
            Z[KD].status = B;
            let D = iyQ(CjA(Q));
            return Z[KD].headersList.append("location", D, !0), Z
        }
        constructor(A = null, B = {}) {
            if (w4.util.markAsUncloneable(this), A === dU1) return;
            if (A !== null) A = w4.converters.BodyInit(A);
            B = w4.converters.ResponseInit(B), this[KD] = an({}), this[DT] = new HjA(dU1), zjA(this[DT], "response"), EjA(this[DT], this[KD].headersList);
            let Q = null;
            if (A != null) {
                let [Z, D] = XjA(A);
                Q = {
                    body: Z,
                    type: D
                }
            }
            KjA(this, B, Q)
        }
        get type() {
            return w4.brandCheck(this, aW), this[KD].type
        }
        get url() {
            w4.brandCheck(this, aW);
            let A = this[KD].urlList,
                B = A[A.length - 1] ?? null;
            if (B === null) return "";
            return CjA(B, !0)
        }
        get redirected() {
            return w4.brandCheck(this, aW), this[KD].urlList.length > 1
        }
        get status() {
            return w4.brandCheck(this, aW), this[KD].status
        }
        get ok() {
            return w4.brandCheck(this, aW), this[KD].status >= 200 && this[KD].status <= 299
        }
        get statusText() {
            return w4.brandCheck(this, aW), this[KD].statusText
        }
        get headers() {
            return w4.brandCheck(this, aW), this[DT]
        }
        get body() {
            return w4.brandCheck(this, aW), this[KD].body ? this[KD].body.stream : null
        }
        get bodyUsed() {
            return w4.brandCheck(this, aW), !!this[KD].body && fA0.isDisturbed(this[KD].body.stream)
        }
        clone() {
            if (w4.brandCheck(this, aW), gyQ(this)) throw w4.errors.exception({
                header: "Response.clone",
                message: "Body has already been consumed."
            });
            let A = gA0(this[KD]);
            return N41(A, xyQ(this[DT]))
        } [VjA.inspect.custom](A, B) {
            if (B.depth === null) B.depth = 2;
            B.colors ??= !0;
            let Q = {
                status: this.status,
                statusText: this.statusText,
                headers: this.headers,
                body: this.body,
                bodyUsed: this.bodyUsed,
                ok: this.ok,
                redirected: this.redirected,
                type: this.type,
                url: this.url
            };
            return `Response ${VjA.formatWithOptions(B,Q)}`
        }
    }
    byQ(aW);
    Object.defineProperties(aW.prototype, {
        type: DK,
        url: DK,
        status: DK,
        ok: DK,
        redirected: DK,
        statusText: DK,
        headers: DK,
        clone: DK,
        body: DK,
        bodyUsed: DK,
        [Symbol.toStringTag]: {
            value: "Response",
            configurable: !0
        }
    });
    Object.defineProperties(aW, {
        json: DK,
        redirect: DK,
        error: DK
    });

    function gA0(A) {
        if (A.internalResponse) return UjA(gA0(A.internalResponse), A.type);
        let B = an({
            ...A,
            body: null
        });
        if (A.body != null) B.body = vyQ(B, A.body);
        return B
    }

    function an(A) {
        return {
            aborted: !1,
            rangeRequested: !1,
            timingAllowPassed: !1,
            requestIncludesCredentials: !1,
            type: "default",
            status: 200,
            timingInfo: null,
            cacheState: "",
            statusText: "",
            ...A,
            headersList: A?.headersList ? new JjA(A?.headersList) : new JjA,
            urlList: A?.urlList ? [...A.urlList] : []
        }
    }

    function cU1(A) {
        let B = pyQ(A);
        return an({
            type: "error",
            status: 0,
            error: B ? A : new Error(A ? String(A) : A),
            aborted: A && A.name === "AbortError"
        })
    }

    function eyQ(A) {
        return A.type === "error" && A.status === 0
    }

    function mU1(A, B) {
        return B = {
            internalResponse: A,
            ...B
        }, new Proxy(A, {
            get(Q, Z) {
                return Z in B ? B[Z] : Q[Z]
            },
            set(Q, Z, D) {
                return hA0(!(Z in B)), Q[Z] = D, !0
            }
        })
    }

    function UjA(A, B) {
        if (B === "basic") return mU1(A, {
            type: "basic",
            headersList: A.headersList
        });
        else if (B === "cors") return mU1(A, {
            type: "cors",
            headersList: A.headersList
        });
        else if (B === "opaque") return mU1(A, {
            type: "opaque",
            urlList: Object.freeze([]),
            status: 0,
            statusText: "",
            body: null
        });
        else if (B === "opaqueredirect") return mU1(A, {
            type: "opaqueredirect",
            status: 0,
            statusText: "",
            headersList: [],
            body: null
        });
        else hA0(!1)
    }

    function A_Q(A, B = null) {
        return hA0(myQ(A)), dyQ(A) ? cU1(Object.assign(new DOMException("The operation was aborted.", "AbortError"), {
            cause: B
        })) : cU1(Object.assign(new DOMException("Request was cancelled."), {
            cause: B
        }))
    }

    function KjA(A, B, Q) {
        if (B.status !== null && (B.status < 200 || B.status > 599)) throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
        if ("statusText" in B && B.statusText != null) {
            if (!uyQ(String(B.statusText))) throw new TypeError("Invalid statusText")
        }
        if ("status" in B && B.status != null) A[KD].status = B.status;
        if ("statusText" in B && B.statusText != null) A[KD].statusText = B.statusText;
        if ("headers" in B && B.headers != null) _yQ(A[DT], B.headers);
        if (Q) {
            if (syQ.includes(A.status)) throw w4.errors.exception({
                header: "Response constructor",
                message: `Invalid response status code ${A.status}`
            });
            if (A[KD].body = Q.body, Q.type != null && !A[KD].headersList.contains("content-type", !0)) A[KD].headersList.append("content-type", Q.type, !0)
        }
    }

    function N41(A, B) {
        let Q = new aW(dU1);
        if (Q[KD] = A, Q[DT] = new HjA(dU1), EjA(Q[DT], A.headersList), zjA(Q[DT], B), fyQ && A.body?.stream) hyQ.register(Q, new WeakRef(A.body.stream));
        return Q
    }
    w4.converters.ReadableStream = w4.interfaceConverter(ReadableStream);
    w4.converters.FormData = w4.interfaceConverter(ryQ);
    w4.converters.URLSearchParams = w4.interfaceConverter(URLSearchParams);
    w4.converters.XMLHttpRequestBodyInit = function(A, B, Q) {
        if (typeof A === "string") return w4.converters.USVString(A, B, Q);
        if (cyQ(A)) return w4.converters.Blob(A, B, Q, {
            strict: !1
        });
        if (ArrayBuffer.isView(A) || oyQ.isArrayBuffer(A)) return w4.converters.BufferSource(A, B, Q);
        if (fA0.isFormDataLike(A)) return w4.converters.FormData(A, B, Q, {
            strict: !1
        });
        if (A instanceof URLSearchParams) return w4.converters.URLSearchParams(A, B, Q);
        return w4.converters.DOMString(A, B, Q)
    };
    w4.converters.BodyInit = function(A, B, Q) {
        if (A instanceof ReadableStream) return w4.converters.ReadableStream(A, B, Q);
        if (A?.[Symbol.asyncIterator]) return A;
        return w4.converters.XMLHttpRequestBodyInit(A, B, Q)
    };
    w4.converters.ResponseInit = w4.dictionaryConverter([{
        key: "status",
        converter: w4.converters["unsigned short"],
        defaultValue: () => 200
    }, {
        key: "statusText",
        converter: w4.converters.ByteString,
        defaultValue: () => ""
    }, {
        key: "headers",
        converter: w4.converters.HeadersInit
    }]);
    wjA.exports = {
        isNetworkError: eyQ,
        makeNetworkError: cU1,
        makeResponse: an,
        makeAppropriateNetworkError: A_Q,
        filterResponse: UjA,
        Response: aW,
        cloneResponse: gA0,
        fromInnerResponse: N41
    }
});
var RjA = E((d65, MjA) => {
    var {
        kConnected: $jA,
        kSize: qjA
    } = VZ();
    class NjA {
        constructor(A) {
            this.value = A
        }
        deref() {
            return this.value[$jA] === 0 && this.value[qjA] === 0 ? void 0 : this.value
        }
    }
    class LjA {
        constructor(A) {
            this.finalizer = A
        }
        register(A, B) {
            if (A.on) A.on("disconnect", () => {
                if (A[$jA] === 0 && A[qjA] === 0) this.finalizer(B)
            })
        }
        unregister(A) {}
    }
    MjA.exports = function() {
        if (process.env.NODE_V8_COVERAGE && process.version.startsWith("v18")) return process._rawDebug("Using compatibility WeakRef and FinalizationRegistry"), {
            WeakRef: NjA,
            FinalizationRegistry: LjA
        };
        return {
            WeakRef,
            FinalizationRegistry
        }
    }
});