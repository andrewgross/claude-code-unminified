/* chunk:143 bytes:[3205762, 3235460) size:29698 source:unpacked-cli.js */
var R41 = E((l65, BkA) => {
    var {
        makeNetworkError: i5,
        makeAppropriateNetworkError: oU1,
        filterResponse: dA0,
        makeResponse: tU1,
        fromInnerResponse: N_Q
    } = L41(), {
        HeadersList: mjA
    } = Bg(), {
        Request: L_Q,
        cloneRequest: M_Q
    } = sn(), Fy = W1("node:zlib"), {
        bytesMatch: R_Q,
        makePolicyContainer: O_Q,
        clonePolicyContainer: T_Q,
        requestBadPort: P_Q,
        TAOCheck: S_Q,
        appendRequestOriginHeader: j_Q,
        responseLocationURL: k_Q,
        requestCurrentURL: tN,
        setRequestReferrerPolicyOnRedirect: y_Q,
        tryUpgradeRequestToAPotentiallyTrustworthyURL: __Q,
        createOpaqueTimingInfo: nA0,
        appendFetchMetadata: x_Q,
        corsCheck: v_Q,
        crossOriginResourcePolicyCheck: b_Q,
        determineRequestsReferrer: f_Q,
        coarsenedSharedCurrentTime: M41,
        createDeferredPromise: h_Q,
        isBlobLike: g_Q,
        sameOrigin: iA0,
        isCancelled: Qg,
        isAborted: djA,
        isErrorLike: u_Q,
        fullyReadBody: m_Q,
        readableStreamClose: d_Q,
        isomorphicEncode: eU1,
        urlIsLocal: c_Q,
        urlIsHttpHttpsScheme: aA0,
        urlHasHttpsScheme: l_Q,
        clampAndCoarsenConnectionTimingInfo: p_Q,
        simpleRangeHeaderValue: i_Q,
        buildContentRange: n_Q,
        createInflate: a_Q,
        extractMimeType: s_Q
    } = AK(), {
        kState: ijA,
        kDispatcher: r_Q
    } = sk(), Zg = W1("node:assert"), {
        safelyExtractBody: sA0,
        extractBody: cjA
    } = Sn(), {
        redirectStatusSet: njA,
        nullBodyStatus: ajA,
        safeMethodsSet: o_Q,
        requestBodyHeader: t_Q,
        subresourceSet: e_Q
    } = cQ1(), AxQ = W1("node:events"), {
        Readable: BxQ,
        pipeline: QxQ,
        finished: ZxQ
    } = W1("node:stream"), {
        addAbortListener: DxQ,
        isErrored: GxQ,
        isReadable: Aw1,
        bufferToLowerCasedHeaderName: ljA
    } = e4(), {
        dataURLProcessor: FxQ,
        serializeAMimeType: IxQ,
        minimizeSupportedMimeType: YxQ
    } = NV(), {
        getGlobalDispatcher: WxQ
    } = fU1(), {
        webidl: JxQ
    } = NY(), {
        STATUS_CODES: XxQ
    } = W1("node:http"), VxQ = ["GET", "HEAD"], CxQ = typeof __UNDICI_IS_NODE__ !== "undefined" || typeof esbuildDetection !== "undefined" ? "node" : "undici", cA0;
    class rA0 extends AxQ {
        constructor(A) {
            super();
            this.dispatcher = A, this.connection = null, this.dump = !1, this.state = "ongoing"
        }
        terminate(A) {
            if (this.state !== "ongoing") return;
            this.state = "terminated", this.connection?.destroy(A), this.emit("terminated", A)
        }
        abort(A) {
            if (this.state !== "ongoing") return;
            if (this.state = "aborted", !A) A = new DOMException("The operation was aborted.", "AbortError");
            this.serializedAbortReason = A, this.connection?.destroy(A), this.emit("terminated", A)
        }
    }

    function KxQ(A) {
        sjA(A, "fetch")
    }

    function HxQ(A, B = void 0) {
        JxQ.argumentLengthCheck(arguments, 1, "globalThis.fetch");
        let Q = h_Q(),
            Z;
        try {
            Z = new L_Q(A, B)
        } catch (J) {
            return Q.reject(J), Q.promise
        }
        let D = Z[ijA];
        if (Z.signal.aborted) return lA0(Q, D, null, Z.signal.reason), Q.promise;
        if (D.client.globalObject?.constructor?.name === "ServiceWorkerGlobalScope") D.serviceWorkers = "none";
        let F = null,
            I = !1,
            Y = null;
        return DxQ(Z.signal, () => {
            I = !0, Zg(Y != null), Y.abort(Z.signal.reason);
            let J = F?.deref();
            lA0(Q, D, J, Z.signal.reason)
        }), Y = ojA({
            request: D,
            processResponseEndOfBody: KxQ,
            processResponse: (J) => {
                if (I) return;
                if (J.aborted) {
                    lA0(Q, D, F, Y.serializedAbortReason);
                    return
                }
                if (J.type === "error") {
                    Q.reject(new TypeError("fetch failed", {
                        cause: J.error
                    }));
                    return
                }
                F = new WeakRef(N_Q(J, "immutable")), Q.resolve(F.deref()), Q = null
            },
            dispatcher: Z[r_Q]
        }), Q.promise
    }

    function sjA(A, B = "other") {
        if (A.type === "error" && A.aborted) return;
        if (!A.urlList?.length) return;
        let Q = A.urlList[0],
            Z = A.timingInfo,
            D = A.cacheState;
        if (!aA0(Q)) return;
        if (Z === null) return;
        if (!A.timingAllowPassed) Z = nA0({
            startTime: Z.startTime
        }), D = "";
        Z.endTime = M41(), A.timingInfo = Z, rjA(Z, Q.href, B, globalThis, D)
    }
    var rjA = performance.markResourceTiming;

    function lA0(A, B, Q, Z) {
        if (A) A.reject(Z);
        if (B.body != null && Aw1(B.body?.stream)) B.body.stream.cancel(Z).catch((G) => {
            if (G.code === "ERR_INVALID_STATE") return;
            throw G
        });
        if (Q == null) return;
        let D = Q[ijA];
        if (D.body != null && Aw1(D.body?.stream)) D.body.stream.cancel(Z).catch((G) => {
            if (G.code === "ERR_INVALID_STATE") return;
            throw G
        })
    }

    function ojA({
        request: A,
        processRequestBodyChunkLength: B,
        processRequestEndOfBody: Q,
        processResponse: Z,
        processResponseEndOfBody: D,
        processResponseConsumeBody: G,
        useParallelQueue: F = !1,
        dispatcher: I = WxQ()
    }) {
        Zg(I);
        let Y = null,
            W = !1;
        if (A.client != null) Y = A.client.globalObject, W = A.client.crossOriginIsolatedCapability;
        let J = M41(W),
            X = nA0({
                startTime: J
            }),
            V = {
                controller: new rA0(I),
                request: A,
                timingInfo: X,
                processRequestBodyChunkLength: B,
                processRequestEndOfBody: Q,
                processResponse: Z,
                processResponseConsumeBody: G,
                processResponseEndOfBody: D,
                taskDestination: Y,
                crossOriginIsolatedCapability: W
            };
        if (Zg(!A.body || A.body.stream), A.window === "client") A.window = A.client?.globalObject?.constructor?.name === "Window" ? A.client : "no-window";
        if (A.origin === "client") A.origin = A.client.origin;
        if (A.policyContainer === "client")
            if (A.client != null) A.policyContainer = T_Q(A.client.policyContainer);
            else A.policyContainer = O_Q();
        if (!A.headersList.contains("accept", !0)) A.headersList.append("accept", "*/*", !0);
        if (!A.headersList.contains("accept-language", !0)) A.headersList.append("accept-language", "*", !0);
        if (A.priority === null);
        if (e_Q.has(A.destination));
        return tjA(V).catch((C) => {
            V.controller.terminate(C)
        }), V.controller
    }
    async function tjA(A, B = !1) {
        let Q = A.request,
            Z = null;
        if (Q.localURLsOnly && !c_Q(tN(Q))) Z = i5("local URLs only");
        if (__Q(Q), P_Q(Q) === "blocked") Z = i5("bad port");
        if (Q.referrerPolicy === "") Q.referrerPolicy = Q.policyContainer.referrerPolicy;
        if (Q.referrer !== "no-referrer") Q.referrer = f_Q(Q);
        if (Z === null) Z = await (async () => {
            let G = tN(Q);
            if (iA0(G, Q.url) && Q.responseTainting === "basic" || G.protocol === "data:" || (Q.mode === "navigate" || Q.mode === "websocket")) return Q.responseTainting = "basic", await pjA(A);
            if (Q.mode === "same-origin") return i5('request mode cannot be "same-origin"');
            if (Q.mode === "no-cors") {
                if (Q.redirect !== "follow") return i5('redirect mode cannot be "follow" for "no-cors" request');
                return Q.responseTainting = "opaque", await pjA(A)
            }
            if (!aA0(tN(Q))) return i5("URL scheme must be a HTTP(S) scheme");
            return Q.responseTainting = "cors", await ejA(A)
        })();
        if (B) return Z;
        if (Z.status !== 0 && !Z.internalResponse) {
            if (Q.responseTainting === "cors");
            if (Q.responseTainting === "basic") Z = dA0(Z, "basic");
            else if (Q.responseTainting === "cors") Z = dA0(Z, "cors");
            else if (Q.responseTainting === "opaque") Z = dA0(Z, "opaque");
            else Zg(!1)
        }
        let D = Z.status === 0 ? Z : Z.internalResponse;
        if (D.urlList.length === 0) D.urlList.push(...Q.urlList);
        if (!Q.timingAllowFailed) Z.timingAllowPassed = !0;
        if (Z.type === "opaque" && D.status === 206 && D.rangeRequested && !Q.headers.contains("range", !0)) Z = D = i5();
        if (Z.status !== 0 && (Q.method === "HEAD" || Q.method === "CONNECT" || ajA.includes(D.status))) D.body = null, A.controller.dump = !0;
        if (Q.integrity) {
            let G = (I) => pA0(A, i5(I));
            if (Q.responseTainting === "opaque" || Z.body == null) {
                G(Z.error);
                return
            }
            let F = (I) => {
                if (!R_Q(I, Q.integrity)) {
                    G("integrity mismatch");
                    return
                }
                Z.body = sA0(I)[0], pA0(A, Z)
            };
            await m_Q(Z.body, F, G)
        } else pA0(A, Z)
    }

    function pjA(A) {
        if (Qg(A) && A.request.redirectCount === 0) return Promise.resolve(oU1(A));
        let {
            request: B
        } = A, {
            protocol: Q
        } = tN(B);
        switch (Q) {
            case "about:":
                return Promise.resolve(i5("about scheme is not supported"));
            case "blob:": {
                if (!cA0) cA0 = W1("node:buffer").resolveObjectURL;
                let Z = tN(B);
                if (Z.search.length !== 0) return Promise.resolve(i5("NetworkError when attempting to fetch resource."));
                let D = cA0(Z.toString());
                if (B.method !== "GET" || !g_Q(D)) return Promise.resolve(i5("invalid method"));
                let G = tU1(),
                    F = D.size,
                    I = eU1(`${F}`),
                    Y = D.type;
                if (!B.headersList.contains("range", !0)) {
                    let W = cjA(D);
                    G.statusText = "OK", G.body = W[0], G.headersList.set("content-length", I, !0), G.headersList.set("content-type", Y, !0)
                } else {
                    G.rangeRequested = !0;
                    let W = B.headersList.get("range", !0),
                        J = i_Q(W, !0);
                    if (J === "failure") return Promise.resolve(i5("failed to fetch the data URL"));
                    let {
                        rangeStartValue: X,
                        rangeEndValue: V
                    } = J;
                    if (X === null) X = F - V, V = X + V - 1;
                    else {
                        if (X >= F) return Promise.resolve(i5("Range start is greater than the blob's size."));
                        if (V === null || V >= F) V = F - 1
                    }
                    let C = D.slice(X, V, Y),
                        K = cjA(C);
                    G.body = K[0];
                    let H = eU1(`${C.size}`),
                        z = n_Q(X, V, F);
                    G.status = 206, G.statusText = "Partial Content", G.headersList.set("content-length", H, !0), G.headersList.set("content-type", Y, !0), G.headersList.set("content-range", z, !0)
                }
                return Promise.resolve(G)
            }
            case "data:": {
                let Z = tN(B),
                    D = FxQ(Z);
                if (D === "failure") return Promise.resolve(i5("failed to fetch the data URL"));
                let G = IxQ(D.mimeType);
                return Promise.resolve(tU1({
                    statusText: "OK",
                    headersList: [
                        ["content-type", {
                            name: "Content-Type",
                            value: G
                        }]
                    ],
                    body: sA0(D.body)[0]
                }))
            }
            case "file:":
                return Promise.resolve(i5("not implemented... yet..."));
            case "http:":
            case "https:":
                return ejA(A).catch((Z) => i5(Z));
            default:
                return Promise.resolve(i5("unknown scheme"))
        }
    }

    function zxQ(A, B) {
        if (A.request.done = !0, A.processResponseDone != null) queueMicrotask(() => A.processResponseDone(B))
    }

    function pA0(A, B) {
        let Q = A.timingInfo,
            Z = () => {
                let G = Date.now();
                if (A.request.destination === "document") A.controller.fullTimingInfo = Q;
                A.controller.reportTimingSteps = () => {
                    if (A.request.url.protocol !== "https:") return;
                    Q.endTime = G;
                    let {
                        cacheState: I,
                        bodyInfo: Y
                    } = B;
                    if (!B.timingAllowPassed) Q = nA0(Q), I = "";
                    let W = 0;
                    if (A.request.mode !== "navigator" || !B.hasCrossOriginRedirects) {
                        W = B.status;
                        let J = s_Q(B.headersList);
                        if (J !== "failure") Y.contentType = YxQ(J)
                    }
                    if (A.request.initiatorType != null) rjA(Q, A.request.url.href, A.request.initiatorType, globalThis, I, Y, W)
                };
                let F = () => {
                    if (A.request.done = !0, A.processResponseEndOfBody != null) queueMicrotask(() => A.processResponseEndOfBody(B));
                    if (A.request.initiatorType != null) A.controller.reportTimingSteps()
                };
                queueMicrotask(() => F())
            };
        if (A.processResponse != null) queueMicrotask(() => {
            A.processResponse(B), A.processResponse = null
        });
        let D = B.type === "error" ? B : B.internalResponse ?? B;
        if (D.body == null) Z();
        else ZxQ(D.body.stream, () => {
            Z()
        })
    }
    async function ejA(A) {
        let B = A.request,
            Q = null,
            Z = null,
            D = A.timingInfo;
        if (B.serviceWorkers === "all");
        if (Q === null) {
            if (B.redirect === "follow") B.serviceWorkers = "none";
            if (Z = Q = await AkA(A), B.responseTainting === "cors" && v_Q(B, Q) === "failure") return i5("cors failure");
            if (S_Q(B, Q) === "failure") B.timingAllowFailed = !0
        }
        if ((B.responseTainting === "opaque" || Q.type === "opaque") && b_Q(B.origin, B.client, B.destination, Z) === "blocked") return i5("blocked");
        if (njA.has(Z.status)) {
            if (B.redirect !== "manual") A.controller.connection.destroy(void 0, !1);
            if (B.redirect === "error") Q = i5("unexpected redirect");
            else if (B.redirect === "manual") Q = Z;
            else if (B.redirect === "follow") Q = await ExQ(A, Q);
            else Zg(!1)
        }
        return Q.timingInfo = D, Q
    }

    function ExQ(A, B) {
        let Q = A.request,
            Z = B.internalResponse ? B.internalResponse : B,
            D;
        try {
            if (D = k_Q(Z, tN(Q).hash), D == null) return B
        } catch (F) {
            return Promise.resolve(i5(F))
        }
        if (!aA0(D)) return Promise.resolve(i5("URL scheme must be a HTTP(S) scheme"));
        if (Q.redirectCount === 20) return Promise.resolve(i5("redirect count exceeded"));
        if (Q.redirectCount += 1, Q.mode === "cors" && (D.username || D.password) && !iA0(Q, D)) return Promise.resolve(i5('cross origin not allowed for request mode "cors"'));
        if (Q.responseTainting === "cors" && (D.username || D.password)) return Promise.resolve(i5('URL cannot contain credentials for request mode "cors"'));
        if (Z.status !== 303 && Q.body != null && Q.body.source == null) return Promise.resolve(i5());
        if ([301, 302].includes(Z.status) && Q.method === "POST" || Z.status === 303 && !VxQ.includes(Q.method)) {
            Q.method = "GET", Q.body = null;
            for (let F of t_Q) Q.headersList.delete(F)
        }
        if (!iA0(tN(Q), D)) Q.headersList.delete("authorization", !0), Q.headersList.delete("proxy-authorization", !0), Q.headersList.delete("cookie", !0), Q.headersList.delete("host", !0);
        if (Q.body != null) Zg(Q.body.source != null), Q.body = sA0(Q.body.source)[0];
        let G = A.timingInfo;
        if (G.redirectEndTime = G.postRedirectStartTime = M41(A.crossOriginIsolatedCapability), G.redirectStartTime === 0) G.redirectStartTime = G.startTime;
        return Q.urlList.push(D), y_Q(Q, Z), tjA(A, !0)
    }
    async function AkA(A, B = !1, Q = !1) {
        let Z = A.request,
            D = null,
            G = null,
            F = null,
            I = null,
            Y = !1;
        if (Z.window === "no-window" && Z.redirect === "error") D = A, G = Z;
        else G = M_Q(Z), D = {
            ...A
        }, D.request = G;
        let W = Z.credentials === "include" || Z.credentials === "same-origin" && Z.responseTainting === "basic",
            J = G.body ? G.body.length : null,
            X = null;
        if (G.body == null && ["POST", "PUT"].includes(G.method)) X = "0";
        if (J != null) X = eU1(`${J}`);
        if (X != null) G.headersList.append("content-length", X, !0);
        if (J != null && G.keepalive);
        if (G.referrer instanceof URL) G.headersList.append("referer", eU1(G.referrer.href), !0);
        if (j_Q(G), x_Q(G), !G.headersList.contains("user-agent", !0)) G.headersList.append("user-agent", CxQ);
        if (G.cache === "default" && (G.headersList.contains("if-modified-since", !0) || G.headersList.contains("if-none-match", !0) || G.headersList.contains("if-unmodified-since", !0) || G.headersList.contains("if-match", !0) || G.headersList.contains("if-range", !0))) G.cache = "no-store";
        if (G.cache === "no-cache" && !G.preventNoCacheCacheControlHeaderModification && !G.headersList.contains("cache-control", !0)) G.headersList.append("cache-control", "max-age=0", !0);
        if (G.cache === "no-store" || G.cache === "reload") {
            if (!G.headersList.contains("pragma", !0)) G.headersList.append("pragma", "no-cache", !0);
            if (!G.headersList.contains("cache-control", !0)) G.headersList.append("cache-control", "no-cache", !0)
        }
        if (G.headersList.contains("range", !0)) G.headersList.append("accept-encoding", "identity", !0);
        if (!G.headersList.contains("accept-encoding", !0))
            if (l_Q(tN(G))) G.headersList.append("accept-encoding", "br, gzip, deflate", !0);
            else G.headersList.append("accept-encoding", "gzip, deflate", !0);
        if (G.headersList.delete("host", !0), I == null) G.cache = "no-store";
        if (G.cache !== "no-store" && G.cache !== "reload");
        if (F == null) {
            if (G.cache === "only-if-cached") return i5("only if cached");
            let V = await UxQ(D, W, Q);
            if (!o_Q.has(G.method) && V.status >= 200 && V.status <= 399);
            if (Y && V.status === 304);
            if (F == null) F = V
        }
        if (F.urlList = [...G.urlList], G.headersList.contains("range", !0)) F.rangeRequested = !0;
        if (F.requestIncludesCredentials = W, F.status === 407) {
            if (Z.window === "no-window") return i5();
            if (Qg(A)) return oU1(A);
            return i5("proxy authentication required")
        }
        if (F.status === 421 && !Q && (Z.body == null || Z.body.source != null)) {
            if (Qg(A)) return oU1(A);
            A.controller.connection.destroy(), F = await AkA(A, B, !0)
        }
        return F
    }
    async function UxQ(A, B = !1, Q = !1) {
        Zg(!A.controller.connection || A.controller.connection.destroyed), A.controller.connection = {
            abort: null,
            destroyed: !1,
            destroy(K, H = !0) {
                if (!this.destroyed) {
                    if (this.destroyed = !0, H) this.abort?.(K ?? new DOMException("The operation was aborted.", "AbortError"))
                }
            }
        };
        let Z = A.request,
            D = null,
            G = A.timingInfo;
        if (!0) Z.cache = "no-store";
        let I = Q ? "yes" : "no";
        if (Z.mode === "websocket");
        let Y = null;
        if (Z.body == null && A.processRequestEndOfBody) queueMicrotask(() => A.processRequestEndOfBody());
        else if (Z.body != null) {
            let K = async function*($) {
                if (Qg(A)) return;
                yield $, A.processRequestBodyChunkLength?.($.byteLength)
            }, H = () => {
                if (Qg(A)) return;
                if (A.processRequestEndOfBody) A.processRequestEndOfBody()
            }, z = ($) => {
                if (Qg(A)) return;
                if ($.name === "AbortError") A.controller.abort();
                else A.controller.terminate($)
            };
            Y = async function*() {
                try {
                    for await (let $ of Z.body.stream) yield* K($);
                    H()
                } catch ($) {
                    z($)
                }
            }()
        }
        try {
            let {
                body: K,
                status: H,
                statusText: z,
                headersList: $,
                socket: L
            } = await C({
                body: Y
            });
            if (L) D = tU1({
                status: H,
                statusText: z,
                headersList: $,
                socket: L
            });
            else {
                let N = K[Symbol.asyncIterator]();
                A.controller.next = () => N.next(), D = tU1({
                    status: H,
                    statusText: z,
                    headersList: $
                })
            }
        } catch (K) {
            if (K.name === "AbortError") return A.controller.connection.destroy(), oU1(A, K);
            return i5(K)
        }
        let W = async () => {
            await A.controller.resume()
        }, J = (K) => {
            if (!Qg(A)) A.controller.abort(K)
        }, X = new ReadableStream({
            async start(K) {
                A.controller.controller = K
            },
            async pull(K) {
                await W(K)
            },
            async cancel(K) {
                await J(K)
            },
            type: "bytes"
        });
        D.body = {
            stream: X,
            source: null,
            length: null
        }, A.controller.onAborted = V, A.controller.on("terminated", V), A.controller.resume = async () => {
            while (!0) {
                let K, H;
                try {
                    let {
                        done: $,
                        value: L
                    } = await A.controller.next();
                    if (djA(A)) break;
                    K = $ ? void 0 : L
                } catch ($) {
                    if (A.controller.ended && !G.encodedBodySize) K = void 0;
                    else K = $, H = !0
                }
                if (K === void 0) {
                    d_Q(A.controller.controller), zxQ(A, D);
                    return
                }
                if (G.decodedBodySize += K?.byteLength ?? 0, H) {
                    A.controller.terminate(K);
                    return
                }
                let z = new Uint8Array(K);
                if (z.byteLength) A.controller.controller.enqueue(z);
                if (GxQ(X)) {
                    A.controller.terminate();
                    return
                }
                if (A.controller.controller.desiredSize <= 0) return
            }
        };

        function V(K) {
            if (djA(A)) {
                if (D.aborted = !0, Aw1(X)) A.controller.controller.error(A.controller.serializedAbortReason)
            } else if (Aw1(X)) A.controller.controller.error(new TypeError("terminated", {
                cause: u_Q(K) ? K : void 0
            }));
            A.controller.connection.destroy()
        }
        return D;

        function C({
            body: K
        }) {
            let H = tN(Z),
                z = A.controller.dispatcher;
            return new Promise(($, L) => z.dispatch({
                path: H.pathname + H.search,
                origin: H.origin,
                method: Z.method,
                body: z.isMockActive ? Z.body && (Z.body.source || Z.body.stream) : K,
                headers: Z.headersList.entries,
                maxRedirections: 0,
                upgrade: Z.mode === "websocket" ? "websocket" : void 0
            }, {
                body: null,
                abort: null,
                onConnect(N) {
                    let {
                        connection: R
                    } = A.controller;
                    if (G.finalConnectionTimingInfo = p_Q(void 0, G.postRedirectStartTime, A.crossOriginIsolatedCapability), R.destroyed) N(new DOMException("The operation was aborted.", "AbortError"));
                    else A.controller.on("terminated", N), this.abort = R.abort = N;
                    G.finalNetworkRequestStartTime = M41(A.crossOriginIsolatedCapability)
                },
                onResponseStarted() {
                    G.finalNetworkResponseStartTime = M41(A.crossOriginIsolatedCapability)
                },
                onHeaders(N, R, O, P) {
                    if (N < 200) return;
                    let j = [],
                        f = "",
                        k = new mjA;
                    for (let y = 0; y < R.length; y += 2) k.append(ljA(R[y]), R[y + 1].toString("latin1"), !0);
                    let c = k.get("content-encoding", !0);
                    if (c) j = c.toLowerCase().split(",").map((y) => y.trim());
                    f = k.get("location", !0), this.body = new BxQ({
                        read: O
                    });
                    let u = [],
                        a = f && Z.redirect === "follow" && njA.has(N);
                    if (j.length !== 0 && Z.method !== "HEAD" && Z.method !== "CONNECT" && !ajA.includes(N) && !a)
                        for (let y = j.length - 1; y >= 0; --y) {
                            let t = j[y];
                            if (t === "x-gzip" || t === "gzip") u.push(Fy.createGunzip({
                                flush: Fy.constants.Z_SYNC_FLUSH,
                                finishFlush: Fy.constants.Z_SYNC_FLUSH
                            }));
                            else if (t === "deflate") u.push(a_Q({
                                flush: Fy.constants.Z_SYNC_FLUSH,
                                finishFlush: Fy.constants.Z_SYNC_FLUSH
                            }));
                            else if (t === "br") u.push(Fy.createBrotliDecompress({
                                flush: Fy.constants.BROTLI_OPERATION_FLUSH,
                                finishFlush: Fy.constants.BROTLI_OPERATION_FLUSH
                            }));
                            else {
                                u.length = 0;
                                break
                            }
                        }
                    let l = this.onError.bind(this);
                    return $({
                        status: N,
                        statusText: P,
                        headersList: k,
                        body: u.length ? QxQ(this.body, ...u, (y) => {
                            if (y) this.onError(y)
                        }).on("error", l) : this.body.on("error", l)
                    }), !0
                },
                onData(N) {
                    if (A.controller.dump) return;
                    let R = N;
                    return G.encodedBodySize += R.byteLength, this.body.push(R)
                },
                onComplete() {
                    if (this.abort) A.controller.off("terminated", this.abort);
                    if (A.controller.onAborted) A.controller.off("terminated", A.controller.onAborted);
                    A.controller.ended = !0, this.body.push(null)
                },
                onError(N) {
                    if (this.abort) A.controller.off("terminated", this.abort);
                    this.body?.destroy(N), A.controller.terminate(N), L(N)
                },
                onUpgrade(N, R, O) {
                    if (N !== 101) return;
                    let P = new mjA;
                    for (let j = 0; j < R.length; j += 2) P.append(ljA(R[j]), R[j + 1].toString("latin1"), !0);
                    return $({
                        status: N,
                        statusText: XxQ[N],
                        headersList: P,
                        socket: O
                    }), !0
                }
            }))
        }
    }
    BkA.exports = {
        fetch: HxQ,
        Fetch: rA0,
        fetching: ojA,
        finalizeAndReportTiming: sjA
    }
});