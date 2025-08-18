/* chunk:19 bytes:[307323, 326860) size:19537 source:unpacked-cli.js */
var Nl1 = E((Xm0) => {
    Object.defineProperty(Xm0, "__esModule", {
        value: !0
    });
    var wO = xQ(),
        k3 = UA(),
        cC = FV(),
        bf = ol(),
        $O = dC(),
        UK9 = LX1(),
        qO = Fm0(),
        wK9 = WB1(),
        $K9 = 2147483647;

    function OF(A) {
        return A / 1000
    }

    function ql1() {
        return $O.WINDOW && $O.WINDOW.addEventListener && $O.WINDOW.performance
    }
    var Im0 = 0,
        FD = {},
        ZN, VB1;

    function qK9() {
        let A = ql1();
        if (A && k3.browserPerformanceTimeOrigin) {
            if (A.mark) $O.WINDOW.performance.mark("sentry-tracing-init");
            let B = TK9(),
                Q = RK9(),
                Z = OK9(),
                D = PK9();
            return () => {
                B(), Q(), Z(), D()
            }
        }
        return () => {
            return
        }
    }

    function NK9() {
        bf.addPerformanceInstrumentationHandler("longtask", ({
            entries: A
        }) => {
            for (let B of A) {
                let Q = wO.getActiveTransaction();
                if (!Q) return;
                let Z = OF(k3.browserPerformanceTimeOrigin + B.startTime),
                    D = OF(B.duration);
                Q.startChild({
                    description: "Main UI thread blocked",
                    op: "ui.long-task",
                    origin: "auto.ui.browser.metrics",
                    startTimestamp: Z,
                    endTimestamp: Z + D
                })
            }
        })
    }

    function LK9() {
        bf.addPerformanceInstrumentationHandler("event", ({
            entries: A
        }) => {
            for (let B of A) {
                let Q = wO.getActiveTransaction();
                if (!Q) return;
                if (B.name === "click") {
                    let Z = OF(k3.browserPerformanceTimeOrigin + B.startTime),
                        D = OF(B.duration),
                        G = {
                            description: k3.htmlTreeAsString(B.target),
                            op: `ui.interaction.${B.name}`,
                            origin: "auto.ui.browser.metrics",
                            startTimestamp: Z,
                            endTimestamp: Z + D
                        },
                        F = k3.getComponentName(B.target);
                    if (F) G.attributes = {
                        "ui.component_name": F
                    };
                    Q.startChild(G)
                }
            }
        })
    }

    function MK9(A, B) {
        if (ql1() && k3.browserPerformanceTimeOrigin) {
            let Z = SK9(A, B);
            return () => {
                Z()
            }
        }
        return () => {
            return
        }
    }

    function RK9() {
        return bf.addClsInstrumentationHandler(({
            metric: A
        }) => {
            let B = A.entries[A.entries.length - 1];
            if (!B) return;
            cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding CLS"), FD.cls = {
                value: A.value,
                unit: ""
            }, VB1 = B
        }, !0)
    }

    function OK9() {
        return bf.addLcpInstrumentationHandler(({
            metric: A
        }) => {
            let B = A.entries[A.entries.length - 1];
            if (!B) return;
            cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding LCP"), FD.lcp = {
                value: A.value,
                unit: "millisecond"
            }, ZN = B
        }, !0)
    }

    function TK9() {
        return bf.addFidInstrumentationHandler(({
            metric: A
        }) => {
            let B = A.entries[A.entries.length - 1];
            if (!B) return;
            let Q = OF(k3.browserPerformanceTimeOrigin),
                Z = OF(B.startTime);
            cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding FID"), FD.fid = {
                value: A.value,
                unit: "millisecond"
            }, FD["mark.fid"] = {
                value: Q + Z,
                unit: "second"
            }
        })
    }

    function PK9() {
        return bf.addTtfbInstrumentationHandler(({
            metric: A
        }) => {
            if (!A.entries[A.entries.length - 1]) return;
            cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding TTFB"), FD.ttfb = {
                value: A.value,
                unit: "millisecond"
            }
        })
    }
    var Ym0 = {
        click: "click",
        pointerdown: "click",
        pointerup: "click",
        mousedown: "click",
        mouseup: "click",
        touchstart: "click",
        touchend: "click",
        mouseover: "hover",
        mouseout: "hover",
        mouseenter: "hover",
        mouseleave: "hover",
        pointerover: "hover",
        pointerout: "hover",
        pointerenter: "hover",
        pointerleave: "hover",
        dragstart: "drag",
        dragend: "drag",
        drag: "drag",
        dragenter: "drag",
        dragleave: "drag",
        dragover: "drag",
        drop: "drag",
        keydown: "press",
        keyup: "press",
        keypress: "press",
        input: "press"
    };

    function SK9(A, B) {
        return bf.addInpInstrumentationHandler(({
            metric: Q
        }) => {
            if (Q.value === void 0) return;
            let Z = Q.entries.find((N) => N.duration === Q.value && Ym0[N.name] !== void 0),
                D = wO.getClient();
            if (!Z || !D) return;
            let G = Ym0[Z.name],
                F = D.getOptions(),
                I = OF(k3.browserPerformanceTimeOrigin + Z.startTime),
                Y = OF(Q.value),
                W = Z.interactionId !== void 0 ? A[Z.interactionId] : void 0;
            if (W === void 0) return;
            let {
                routeName: J,
                parentContext: X,
                activeTransaction: V,
                user: C,
                replayId: K
            } = W, H = C !== void 0 ? C.email || C.id || C.ip_address : void 0, z = V !== void 0 ? V.getProfileId() : void 0, $ = new wO.Span({
                startTimestamp: I,
                endTimestamp: I + Y,
                op: `ui.interaction.${G}`,
                name: k3.htmlTreeAsString(Z.target),
                attributes: {
                    release: F.release,
                    environment: F.environment,
                    transaction: J,
                    ...H !== void 0 && H !== "" ? {
                        user: H
                    } : {},
                    ...z !== void 0 ? {
                        profile_id: z
                    } : {},
                    ...K !== void 0 ? {
                        replay_id: K
                    } : {}
                },
                exclusiveTime: Q.value,
                measurements: {
                    inp: {
                        value: Q.value,
                        unit: "millisecond"
                    }
                }
            }), L = bK9(X, F, B);
            if (!L) return;
            if (Math.random() < L) {
                let N = $ ? wO.createSpanEnvelope([$], D.getDsn()) : void 0,
                    R = D && D.getTransport();
                if (R && N) R.send(N).then(null, (O) => {
                    cC.DEBUG_BUILD && k3.logger.error("Error while sending interaction:", O)
                });
                return
            }
        })
    }

    function jK9(A) {
        let B = ql1();
        if (!B || !$O.WINDOW.performance.getEntries || !k3.browserPerformanceTimeOrigin) return;
        cC.DEBUG_BUILD && k3.logger.log("[Tracing] Adding & adjusting spans using Performance API");
        let Q = OF(k3.browserPerformanceTimeOrigin),
            Z = B.getEntries(),
            {
                op: D,
                start_timestamp: G
            } = wO.spanToJSON(A);
        if (Z.slice(Im0).forEach((F) => {
                let I = OF(F.startTime),
                    Y = OF(F.duration);
                if (A.op === "navigation" && G && Q + I < G) return;
                switch (F.entryType) {
                    case "navigation": {
                        kK9(A, F, Q);
                        break
                    }
                    case "mark":
                    case "paint":
                    case "measure": {
                        Wm0(A, F, I, Y, Q);
                        let W = UK9.getVisibilityWatcher(),
                            J = F.startTime < W.firstHiddenTime;
                        if (F.name === "first-paint" && J) cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding FP"), FD.fp = {
                            value: F.startTime,
                            unit: "millisecond"
                        };
                        if (F.name === "first-contentful-paint" && J) cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding FCP"), FD.fcp = {
                            value: F.startTime,
                            unit: "millisecond"
                        };
                        break
                    }
                    case "resource": {
                        Jm0(A, F, F.name, I, Y, Q);
                        break
                    }
                }
            }), Im0 = Math.max(Z.length - 1, 0), _K9(A), D === "pageload") {
            vK9(FD), ["fcp", "fp", "lcp"].forEach((I) => {
                if (!FD[I] || !G || Q >= G) return;
                let Y = FD[I].value,
                    W = Q + OF(Y),
                    J = Math.abs((W - G) * 1000),
                    X = J - Y;
                cC.DEBUG_BUILD && k3.logger.log(`[Measurements] Normalized ${I} from ${Y} to ${J} (${X})`), FD[I].value = J
            });
            let F = FD["mark.fid"];
            if (F && FD.fid) qO._startChild(A, {
                description: "first input delay",
                endTimestamp: F.value + OF(FD.fid.value),
                op: "ui.action",
                origin: "auto.ui.browser.metrics",
                startTimestamp: F.value
            }), delete FD["mark.fid"];
            if (!("fcp" in FD)) delete FD.cls;
            Object.keys(FD).forEach((I) => {
                wO.setMeasurement(I, FD[I].value, FD[I].unit)
            }), xK9(A)
        }
        ZN = void 0, VB1 = void 0, FD = {}
    }

    function Wm0(A, B, Q, Z, D) {
        let G = D + Q,
            F = G + Z;
        return qO._startChild(A, {
            description: B.name,
            endTimestamp: F,
            op: B.entryType,
            origin: "auto.resource.browser.metrics",
            startTimestamp: G
        }), G
    }

    function kK9(A, B, Q) {
        ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((Z) => {
            OX1(A, B, Z, Q)
        }), OX1(A, B, "secureConnection", Q, "TLS/SSL", "connectEnd"), OX1(A, B, "fetch", Q, "cache", "domainLookupStart"), OX1(A, B, "domainLookup", Q, "DNS"), yK9(A, B, Q)
    }

    function OX1(A, B, Q, Z, D, G) {
        let F = G ? B[G] : B[`${Q}End`],
            I = B[`${Q}Start`];
        if (!I || !F) return;
        qO._startChild(A, {
            op: "browser",
            origin: "auto.browser.browser.metrics",
            description: D || Q,
            startTimestamp: Z + OF(I),
            endTimestamp: Z + OF(F)
        })
    }

    function yK9(A, B, Q) {
        if (B.responseEnd) qO._startChild(A, {
            op: "browser",
            origin: "auto.browser.browser.metrics",
            description: "request",
            startTimestamp: Q + OF(B.requestStart),
            endTimestamp: Q + OF(B.responseEnd)
        }), qO._startChild(A, {
            op: "browser",
            origin: "auto.browser.browser.metrics",
            description: "response",
            startTimestamp: Q + OF(B.responseStart),
            endTimestamp: Q + OF(B.responseEnd)
        })
    }

    function Jm0(A, B, Q, Z, D, G) {
        if (B.initiatorType === "xmlhttprequest" || B.initiatorType === "fetch") return;
        let F = k3.parseUrl(Q),
            I = {};
        if ($l1(I, B, "transferSize", "http.response_transfer_size"), $l1(I, B, "encodedBodySize", "http.response_content_length"), $l1(I, B, "decodedBodySize", "http.decoded_response_content_length"), "renderBlockingStatus" in B) I["resource.render_blocking_status"] = B.renderBlockingStatus;
        if (F.protocol) I["url.scheme"] = F.protocol.split(":").pop();
        if (F.host) I["server.address"] = F.host;
        I["url.same_origin"] = Q.includes($O.WINDOW.location.origin);
        let Y = G + Z,
            W = Y + D;
        qO._startChild(A, {
            description: Q.replace($O.WINDOW.location.origin, ""),
            endTimestamp: W,
            op: B.initiatorType ? `resource.${B.initiatorType}` : "resource.other",
            origin: "auto.resource.browser.metrics",
            startTimestamp: Y,
            data: I
        })
    }

    function _K9(A) {
        let B = $O.WINDOW.navigator;
        if (!B) return;
        let Q = B.connection;
        if (Q) {
            if (Q.effectiveType) A.setTag("effectiveConnectionType", Q.effectiveType);
            if (Q.type) A.setTag("connectionType", Q.type);
            if (qO.isMeasurementValue(Q.rtt)) FD["connection.rtt"] = {
                value: Q.rtt,
                unit: "millisecond"
            }
        }
        if (qO.isMeasurementValue(B.deviceMemory)) A.setTag("deviceMemory", `${B.deviceMemory} GB`);
        if (qO.isMeasurementValue(B.hardwareConcurrency)) A.setTag("hardwareConcurrency", String(B.hardwareConcurrency))
    }

    function xK9(A) {
        if (ZN) {
            if (cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding LCP Data"), ZN.element) A.setTag("lcp.element", k3.htmlTreeAsString(ZN.element));
            if (ZN.id) A.setTag("lcp.id", ZN.id);
            if (ZN.url) A.setTag("lcp.url", ZN.url.trim().slice(0, 200));
            A.setTag("lcp.size", ZN.size)
        }
        if (VB1 && VB1.sources) cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding CLS Data"), VB1.sources.forEach((B, Q) => A.setTag(`cls.source.${Q+1}`, k3.htmlTreeAsString(B.node)))
    }

    function $l1(A, B, Q, Z) {
        let D = B[Q];
        if (D != null && D < $K9) A[Z] = D
    }

    function vK9(A) {
        let B = wK9.getNavigationEntry();
        if (!B) return;
        let {
            responseStart: Q,
            requestStart: Z
        } = B;
        if (Z <= Q) cC.DEBUG_BUILD && k3.logger.log("[Measurements] Adding TTFB Request Time"), A["ttfb.requestTime"] = {
            value: Q - Z,
            unit: "millisecond"
        }
    }

    function bK9(A, B, Q) {
        if (!wO.hasTracingEnabled(B)) return !1;
        let Z;
        if (A !== void 0 && typeof B.tracesSampler === "function") Z = B.tracesSampler({
            transactionContext: A,
            name: A.name,
            parentSampled: A.parentSampled,
            attributes: {
                ...A.data,
                ...A.attributes
            },
            location: $O.WINDOW.location
        });
        else if (A !== void 0 && A.sampled !== void 0) Z = A.sampled;
        else if (typeof B.tracesSampleRate !== "undefined") Z = B.tracesSampleRate;
        else Z = 1;
        if (!wO.isValidSampleRate(Z)) return cC.DEBUG_BUILD && k3.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate."), !1;
        if (Z === !0) return Q;
        else if (Z === !1) return 0;
        return Z * Q
    }
    Xm0._addMeasureSpans = Wm0;
    Xm0._addResourceSpans = Jm0;
    Xm0.addPerformanceEntries = jK9;
    Xm0.startTrackingINP = MK9;
    Xm0.startTrackingInteractions = LK9;
    Xm0.startTrackingLongTasks = NK9;
    Xm0.startTrackingWebVitals = qK9
});
var Ll1 = E((Cm0) => {
    Object.defineProperty(Cm0, "__esModule", {
        value: !0
    });
    var DN = xQ(),
        ff = UA();

    function lK9(A, B, Q, Z, D = "auto.http.browser") {
        if (!DN.hasTracingEnabled() || !A.fetchData) return;
        let G = B(A.fetchData.url);
        if (A.endTimestamp && G) {
            let C = A.fetchData.__span;
            if (!C) return;
            let K = Z[C];
            if (K) iK9(K, A), delete Z[C];
            return
        }
        let F = DN.getCurrentScope(),
            I = DN.getClient(),
            {
                method: Y,
                url: W
            } = A.fetchData,
            J = pK9(W),
            X = J ? ff.parseUrl(J).host : void 0,
            V = G ? DN.startInactiveSpan({
                name: `${Y} ${W}`,
                onlyIfParent: !0,
                attributes: {
                    url: W,
                    type: "fetch",
                    "http.method": Y,
                    "http.url": J,
                    "server.address": X,
                    [DN.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: D
                },
                op: "http.client"
            }) : void 0;
        if (V) A.fetchData.__span = V.spanContext().spanId, Z[V.spanContext().spanId] = V;
        if (Q(A.fetchData.url) && I) {
            let C = A.args[0];
            A.args[1] = A.args[1] || {};
            let K = A.args[1];
            K.headers = Vm0(C, I, F, K, V)
        }
        return V
    }

    function Vm0(A, B, Q, Z, D) {
        let G = D || Q.getSpan(),
            F = DN.getIsolationScope(),
            {
                traceId: I,
                spanId: Y,
                sampled: W,
                dsc: J
            } = {
                ...F.getPropagationContext(),
                ...Q.getPropagationContext()
            },
            X = G ? DN.spanToTraceHeader(G) : ff.generateSentryTraceHeader(I, Y, W),
            V = ff.dynamicSamplingContextToSentryBaggageHeader(J || (G ? DN.getDynamicSamplingContextFromSpan(G) : DN.getDynamicSamplingContextFromClient(I, B, Q))),
            C = Z.headers || (typeof Request !== "undefined" && ff.isInstanceOf(A, Request) ? A.headers : void 0);
        if (!C) return {
            "sentry-trace": X,
            baggage: V
        };
        else if (typeof Headers !== "undefined" && ff.isInstanceOf(C, Headers)) {
            let K = new Headers(C);
            if (K.append("sentry-trace", X), V) K.append(ff.BAGGAGE_HEADER_NAME, V);
            return K
        } else if (Array.isArray(C)) {
            let K = [...C, ["sentry-trace", X]];
            if (V) K.push([ff.BAGGAGE_HEADER_NAME, V]);
            return K
        } else {
            let K = "baggage" in C ? C.baggage : void 0,
                H = [];
            if (Array.isArray(K)) H.push(...K);
            else if (K) H.push(K);
            if (V) H.push(V);
            return {
                ...C,
                "sentry-trace": X,
                baggage: H.length > 0 ? H.join(",") : void 0
            }
        }
    }

    function pK9(A) {
        try {
            return new URL(A).href
        } catch (B) {
            return
        }
    }

    function iK9(A, B) {
        if (B.response) {
            DN.setHttpStatus(A, B.response.status);
            let Q = B.response && B.response.headers && B.response.headers.get("content-length");
            if (Q) {
                let Z = parseInt(Q);
                if (Z > 0) A.setAttribute("http.response_content_length", Z)
            }
        } else if (B.error) A.setStatus("internal_error");
        A.end()
    }
    Cm0.addTracingHeadersToFetchRequest = Vm0;
    Cm0.instrumentFetchRequest = lK9
});