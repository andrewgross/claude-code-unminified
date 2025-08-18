/* chunk:5 bytes:[71160, 90311) size:19151 source:unpacked-cli.js */
var zv0 = E((Hv0) => {
    Object.defineProperty(Hv0, "__esModule", {
        value: !0
    });
    var O99 = Wv0(),
        T99 = rq(),
        Xv0 = iH(),
        P99 = Bw(),
        S99 = f21(),
        j99 = ad1(),
        k99 = {
            ip: !1,
            request: !0,
            transaction: !0,
            user: !0
        },
        y99 = ["cookies", "data", "headers", "method", "query_string", "url"],
        Vv0 = ["id", "username", "email"];

    function _99(A, B, Q) {
        if (!A) return;
        if (!A.metadata.source || A.metadata.source === "url") {
            let [Z, D] = LJ1(B, {
                path: !0,
                method: !0
            });
            A.updateName(Z), A.setMetadata({
                source: D
            })
        }
        if (A.setAttribute("url", B.originalUrl || B.url), B.baseUrl) A.setAttribute("baseUrl", B.baseUrl);
        A.setData("query", Cv0(B, Q))
    }

    function LJ1(A, B = {}) {
        let Q = A.method && A.method.toUpperCase(),
            Z = "",
            D = "url";
        if (B.customRoute || A.route) Z = B.customRoute || `${A.baseUrl||""}${A.route&&A.route.path}`, D = "route";
        else if (A.originalUrl || A.url) Z = j99.stripUrlQueryAndFragment(A.originalUrl || A.url || "");
        let G = "";
        if (B.method && Q) G += Q;
        if (B.method && B.path) G += " ";
        if (B.path && Z) G += Z;
        return [G, D]
    }

    function x99(A, B) {
        switch (B) {
            case "path":
                return LJ1(A, {
                    path: !0
                })[0];
            case "handler":
                return A.route && A.route.stack && A.route.stack[0] && A.route.stack[0].name || "<anonymous>";
            case "methodPath":
            default: {
                let Q = A._reconstructedRoute ? A._reconstructedRoute : void 0;
                return LJ1(A, {
                    path: !0,
                    method: !0,
                    customRoute: Q
                })[0]
            }
        }
    }

    function v99(A, B) {
        let Q = {};
        return (Array.isArray(B) ? B : Vv0).forEach((D) => {
            if (A && D in A) Q[D] = A[D]
        }), Q
    }

    function sd1(A, B) {
        let {
            include: Q = y99,
            deps: Z
        } = B || {}, D = {}, G = A.headers || {}, F = A.method, I = G.host || A.hostname || A.host || "<no host>", Y = A.protocol === "https" || A.socket && A.socket.encrypted ? "https" : "http", W = A.originalUrl || A.url || "", J = W.startsWith(Y) ? W : `${Y}://${I}${W}`;
        return Q.forEach((X) => {
            switch (X) {
                case "headers": {
                    if (D.headers = G, !Q.includes("cookies")) delete D.headers.cookie;
                    break
                }
                case "method": {
                    D.method = F;
                    break
                }
                case "url": {
                    D.url = J;
                    break
                }
                case "cookies": {
                    D.cookies = A.cookies || G.cookie && O99.parseCookie(G.cookie) || {};
                    break
                }
                case "query_string": {
                    D.query_string = Cv0(A, Z);
                    break
                }
                case "data": {
                    if (F === "GET" || F === "HEAD") break;
                    if (A.body !== void 0) D.data = Xv0.isString(A.body) ? A.body : JSON.stringify(S99.normalize(A.body));
                    break
                }
                default:
                    if ({}.hasOwnProperty.call(A, X)) D[X] = A[X]
            }
        }), D
    }

    function b99(A, B, Q) {
        let Z = {
            ...k99,
            ...Q && Q.include
        };
        if (Z.request) {
            let D = Array.isArray(Z.request) ? sd1(B, {
                include: Z.request,
                deps: Q && Q.deps
            }) : sd1(B, {
                deps: Q && Q.deps
            });
            A.request = {
                ...A.request,
                ...D
            }
        }
        if (Z.user) {
            let D = B.user && Xv0.isPlainObject(B.user) ? v99(B.user, Z.user) : {};
            if (Object.keys(D).length) A.user = {
                ...A.user,
                ...D
            }
        }
        if (Z.ip) {
            let D = B.ip || B.socket && B.socket.remoteAddress;
            if (D) A.user = {
                ...A.user,
                ip_address: D
            }
        }
        if (Z.transaction && !A.transaction) A.transaction = x99(B, Z.transaction);
        return A
    }

    function Cv0(A, B) {
        let Q = A.originalUrl || A.url || "";
        if (!Q) return;
        if (Q.startsWith("/")) Q = `http://dogs.are.great${Q}`;
        try {
            return A.query || typeof URL !== "undefined" && new URL(Q).search.slice(1) || B && B.url && B.url.parse(Q).query || void 0
        } catch (Z) {
            return
        }
    }

    function Kv0(A) {
        let B = {};
        try {
            A.forEach((Q, Z) => {
                if (typeof Q === "string") B[Z] = Q
            })
        } catch (Q) {
            T99.DEBUG_BUILD && P99.logger.warn("Sentry failed extracting headers from a request object. If you see this, please file an issue.")
        }
        return B
    }

    function f99(A) {
        let B = Kv0(A.headers);
        return {
            method: A.method,
            url: A.url,
            headers: B
        }
    }
    Hv0.DEFAULT_USER_INCLUDES = Vv0;
    Hv0.addRequestDataToEvent = b99;
    Hv0.addRequestDataToTransaction = _99;
    Hv0.extractPathForTransaction = LJ1;
    Hv0.extractRequestData = sd1;
    Hv0.winterCGHeadersToDict = Kv0;
    Hv0.winterCGRequestToRequestData = f99
});
var $v0 = E((wv0) => {
    Object.defineProperty(wv0, "__esModule", {
        value: !0
    });
    var Ev0 = ["fatal", "error", "warning", "log", "info", "debug"];

    function p99(A) {
        return Uv0(A)
    }

    function Uv0(A) {
        return A === "warn" ? "warning" : Ev0.includes(A) ? A : "log"
    }
    wv0.severityFromString = p99;
    wv0.severityLevelFromString = Uv0;
    wv0.validSeverityLevels = Ev0
});
var rd1 = E((Rv0) => {
    Object.defineProperty(Rv0, "__esModule", {
        value: !0
    });
    var qv0 = vW(),
        Nv0 = 1000;

    function Lv0() {
        return Date.now() / Nv0
    }

    function s99() {
        let {
            performance: A
        } = qv0.GLOBAL_OBJ;
        if (!A || !A.now) return Lv0;
        let B = Date.now() - A.now(),
            Q = A.timeOrigin == null ? B : A.timeOrigin;
        return () => {
            return (Q + A.now()) / Nv0
        }
    }
    var Mv0 = s99(),
        r99 = Mv0;
    Rv0._browserPerformanceTimeOriginMode = void 0;
    var o99 = (() => {
        let {
            performance: A
        } = qv0.GLOBAL_OBJ;
        if (!A || !A.now) {
            Rv0._browserPerformanceTimeOriginMode = "none";
            return
        }
        let B = 3600000,
            Q = A.now(),
            Z = Date.now(),
            D = A.timeOrigin ? Math.abs(A.timeOrigin + Q - Z) : B,
            G = D < B,
            F = A.timing && A.timing.navigationStart,
            Y = typeof F === "number" ? Math.abs(F + Q - Z) : B,
            W = Y < B;
        if (G || W)
            if (D <= Y) return Rv0._browserPerformanceTimeOriginMode = "timeOrigin", A.timeOrigin;
            else return Rv0._browserPerformanceTimeOriginMode = "navigationStart", F;
        return Rv0._browserPerformanceTimeOriginMode = "dateNow", Z
    })();
    Rv0.browserPerformanceTimeOrigin = o99;
    Rv0.dateTimestampInSeconds = Lv0;
    Rv0.timestampInSeconds = Mv0;
    Rv0.timestampWithMs = r99
});
var td1 = E((Sv0) => {
    Object.defineProperty(Sv0, "__esModule", {
        value: !0
    });
    var QQ9 = rq(),
        ZQ9 = iH(),
        DQ9 = Bw(),
        GQ9 = "baggage",
        od1 = "sentry-",
        Tv0 = /^sentry-/,
        Pv0 = 8192;

    function FQ9(A) {
        if (!ZQ9.isString(A) && !Array.isArray(A)) return;
        let B = {};
        if (Array.isArray(A)) B = A.reduce((Z, D) => {
            let G = Ov0(D);
            for (let F of Object.keys(G)) Z[F] = G[F];
            return Z
        }, {});
        else {
            if (!A) return;
            B = Ov0(A)
        }
        let Q = Object.entries(B).reduce((Z, [D, G]) => {
            if (D.match(Tv0)) {
                let F = D.slice(od1.length);
                Z[F] = G
            }
            return Z
        }, {});
        if (Object.keys(Q).length > 0) return Q;
        else return
    }

    function IQ9(A) {
        if (!A) return;
        let B = Object.entries(A).reduce((Q, [Z, D]) => {
            if (D) Q[`${od1}${Z}`] = D;
            return Q
        }, {});
        return YQ9(B)
    }

    function Ov0(A) {
        return A.split(",").map((B) => B.split("=").map((Q) => decodeURIComponent(Q.trim()))).reduce((B, [Q, Z]) => {
            return B[Q] = Z, B
        }, {})
    }

    function YQ9(A) {
        if (Object.keys(A).length === 0) return;
        return Object.entries(A).reduce((B, [Q, Z], D) => {
            let G = `${encodeURIComponent(Q)}=${encodeURIComponent(Z)}`,
                F = D === 0 ? G : `${B},${G}`;
            if (F.length > Pv0) return QQ9.DEBUG_BUILD && DQ9.logger.warn(`Not adding key: ${Q} with val: ${Z} to baggage header due to exceeding baggage size limits.`), B;
            else return F
        }, "")
    }
    Sv0.BAGGAGE_HEADER_NAME = GQ9;
    Sv0.MAX_BAGGAGE_STRING_LENGTH = Pv0;
    Sv0.SENTRY_BAGGAGE_KEY_PREFIX = od1;
    Sv0.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = Tv0;
    Sv0.baggageHeaderToDynamicSamplingContext = FQ9;
    Sv0.dynamicSamplingContextToSentryBaggageHeader = IQ9
});
var _v0 = E((yv0) => {
    Object.defineProperty(yv0, "__esModule", {
        value: !0
    });
    var jv0 = td1(),
        aH = _21(),
        kv0 = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

    function ed1(A) {
        if (!A) return;
        let B = A.match(kv0);
        if (!B) return;
        let Q;
        if (B[3] === "1") Q = !0;
        else if (B[3] === "0") Q = !1;
        return {
            traceId: B[1],
            parentSampled: Q,
            parentSpanId: B[2]
        }
    }

    function HQ9(A, B) {
        let Q = ed1(A),
            Z = jv0.baggageHeaderToDynamicSamplingContext(B),
            {
                traceId: D,
                parentSpanId: G,
                parentSampled: F
            } = Q || {};
        if (!Q) return {
            traceparentData: Q,
            dynamicSamplingContext: void 0,
            propagationContext: {
                traceId: D || aH.uuid4(),
                spanId: aH.uuid4().substring(16)
            }
        };
        else return {
            traceparentData: Q,
            dynamicSamplingContext: Z || {},
            propagationContext: {
                traceId: D || aH.uuid4(),
                parentSpanId: G || aH.uuid4().substring(16),
                spanId: aH.uuid4().substring(16),
                sampled: F,
                dsc: Z || {}
            }
        }
    }

    function zQ9(A, B) {
        let Q = ed1(A),
            Z = jv0.baggageHeaderToDynamicSamplingContext(B),
            {
                traceId: D,
                parentSpanId: G,
                parentSampled: F
            } = Q || {};
        if (!Q) return {
            traceId: D || aH.uuid4(),
            spanId: aH.uuid4().substring(16)
        };
        else return {
            traceId: D || aH.uuid4(),
            parentSpanId: G || aH.uuid4().substring(16),
            spanId: aH.uuid4().substring(16),
            sampled: F,
            dsc: Z || {}
        }
    }

    function EQ9(A = aH.uuid4(), B = aH.uuid4().substring(16), Q) {
        let Z = "";
        if (Q !== void 0) Z = Q ? "-1" : "-0";
        return `${A}-${B}${Z}`
    }
    yv0.TRACEPARENT_REGEXP = kv0;
    yv0.extractTraceparentData = ed1;
    yv0.generateSentryTraceHeader = EQ9;
    yv0.propagationContextFromHeaders = zQ9;
    yv0.tracingContextFromHeaders = HQ9
});
var Bc1 = E((bv0) => {
    Object.defineProperty(bv0, "__esModule", {
        value: !0
    });
    var LQ9 = Kd1(),
        MQ9 = f21(),
        xv0 = nH();

    function RQ9(A, B = []) {
        return [A, B]
    }

    function OQ9(A, B) {
        let [Q, Z] = A;
        return [Q, [...Z, B]]
    }

    function vv0(A, B) {
        let Q = A[1];
        for (let Z of Q) {
            let D = Z[0].type;
            if (B(Z, D)) return !0
        }
        return !1
    }

    function TQ9(A, B) {
        return vv0(A, (Q, Z) => B.includes(Z))
    }

    function Ac1(A, B) {
        return (B || new TextEncoder).encode(A)
    }

    function PQ9(A, B) {
        let [Q, Z] = A, D = JSON.stringify(Q);

        function G(F) {
            if (typeof D === "string") D = typeof F === "string" ? D + F : [Ac1(D, B), F];
            else D.push(typeof F === "string" ? Ac1(F, B) : F)
        }
        for (let F of Z) {
            let [I, Y] = F;
            if (G(`
${JSON.stringify(I)}
`), typeof Y === "string" || Y instanceof Uint8Array) G(Y);
            else {
                let W;
                try {
                    W = JSON.stringify(Y)
                } catch (J) {
                    W = JSON.stringify(MQ9.normalize(Y))
                }
                G(W)
            }
        }
        return typeof D === "string" ? D : SQ9(D)
    }

    function SQ9(A) {
        let B = A.reduce((D, G) => D + G.length, 0),
            Q = new Uint8Array(B),
            Z = 0;
        for (let D of A) Q.set(D, Z), Z += D.length;
        return Q
    }

    function jQ9(A, B, Q) {
        let Z = typeof A === "string" ? B.encode(A) : A;

        function D(Y) {
            let W = Z.subarray(0, Y);
            return Z = Z.subarray(Y + 1), W
        }

        function G() {
            let Y = Z.indexOf(10);
            if (Y < 0) Y = Z.length;
            return JSON.parse(Q.decode(D(Y)))
        }
        let F = G(),
            I = [];
        while (Z.length) {
            let Y = G(),
                W = typeof Y.length === "number" ? Y.length : void 0;
            I.push([Y, W ? D(W) : G()])
        }
        return [F, I]
    }

    function kQ9(A, B) {
        let Q = typeof A.data === "string" ? Ac1(A.data, B) : A.data;
        return [xv0.dropUndefinedKeys({
            type: "attachment",
            length: Q.length,
            filename: A.filename,
            content_type: A.contentType,
            attachment_type: A.attachmentType
        }), Q]
    }
    var yQ9 = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
        profile: "profile",
        replay_event: "replay",
        replay_recording: "replay",
        check_in: "monitor",
        feedback: "feedback",
        span: "span",
        statsd: "metric_bucket"
    };

    function _Q9(A) {
        return yQ9[A]
    }

    function xQ9(A) {
        if (!A || !A.sdk) return;
        let {
            name: B,
            version: Q
        } = A.sdk;
        return {
            name: B,
            version: Q
        }
    }

    function vQ9(A, B, Q, Z) {
        let D = A.sdkProcessingMetadata && A.sdkProcessingMetadata.dynamicSamplingContext;
        return {
            event_id: A.event_id,
            sent_at: new Date().toISOString(),
            ...B && {
                sdk: B
            },
            ...!!Q && Z && {
                dsn: LQ9.dsnToString(Z)
            },
            ...D && {
                trace: xv0.dropUndefinedKeys({
                    ...D
                })
            }
        }
    }
    bv0.addItemToEnvelope = OQ9;
    bv0.createAttachmentEnvelopeItem = kQ9;
    bv0.createEnvelope = RQ9;
    bv0.createEventEnvelopeHeaders = vQ9;
    bv0.envelopeContainsItemType = TQ9;
    bv0.envelopeItemTypeToDataCategory = _Q9;
    bv0.forEachEnvelopeItem = vv0;
    bv0.getSdkMetadataForEnvelopeHeader = xQ9;
    bv0.parseEnvelope = jQ9;
    bv0.serializeEnvelope = PQ9
});
var hv0 = E((fv0) => {
    Object.defineProperty(fv0, "__esModule", {
        value: !0
    });
    var iQ9 = Bc1(),
        nQ9 = rd1();

    function aQ9(A, B, Q) {
        let Z = [{
            type: "client_report"
        }, {
            timestamp: Q || nQ9.dateTimestampInSeconds(),
            discarded_events: A
        }];
        return iQ9.createEnvelope(B ? {
            dsn: B
        } : {}, [Z])
    }
    fv0.createClientReportEnvelope = aQ9
});
var cv0 = E((dv0) => {
    Object.defineProperty(dv0, "__esModule", {
        value: !0
    });
    var gv0 = 60000;

    function uv0(A, B = Date.now()) {
        let Q = parseInt(`${A}`, 10);
        if (!isNaN(Q)) return Q * 1000;
        let Z = Date.parse(`${A}`);
        if (!isNaN(Z)) return Z - B;
        return gv0
    }

    function mv0(A, B) {
        return A[B] || A.all || 0
    }

    function rQ9(A, B, Q = Date.now()) {
        return mv0(A, B) > Q
    }

    function oQ9(A, {
        statusCode: B,
        headers: Q
    }, Z = Date.now()) {
        let D = {
                ...A
            },
            G = Q && Q["x-sentry-rate-limits"],
            F = Q && Q["retry-after"];
        if (G)
            for (let I of G.trim().split(",")) {
                let [Y, W, , , J] = I.split(":", 5), X = parseInt(Y, 10), V = (!isNaN(X) ? X : 60) * 1000;
                if (!W) D.all = Z + V;
                else
                    for (let C of W.split(";"))
                        if (C === "metric_bucket") {
                            if (!J || J.split(";").includes("custom")) D[C] = Z + V
                        } else D[C] = Z + V
            } else if (F) D.all = Z + uv0(F, Z);
            else if (B === 429) D.all = Z + 60000;
        return D
    }
    dv0.DEFAULT_RETRY_AFTER = gv0;
    dv0.disabledUntil = mv0;
    dv0.isRateLimited = rQ9;
    dv0.parseRetryAfterHeader = uv0;
    dv0.updateRateLimits = oQ9
});
var nv0 = E((iv0) => {
    Object.defineProperty(iv0, "__esModule", {
        value: !0
    });

    function lv0(A, B, Q) {
        let Z = B.match(/([a-z_]+)\.(.*)/i);
        if (Z === null) A[B] = Q;
        else {
            let D = A[Z[1]];
            lv0(D, Z[2], Q)
        }
    }

    function Z49(A, B, Q = {}) {
        return Array.isArray(B) ? pv0(A, B, Q) : D49(A, B, Q)
    }

    function pv0(A, B, Q) {
        let Z = B.find((D) => D.name === A.name);
        if (Z) {
            for (let [D, G] of Object.entries(Q)) lv0(Z, D, G);
            return B
        }
        return [...B, A]
    }

    function D49(A, B, Q) {
        return (D) => {
            let G = B(D);
            if (A.allowExclusionByUser) {
                if (!G.find((I) => I.name === A.name)) return G
            }
            return pv0(A, G, Q)
        }
    }
    iv0.addOrUpdateIntegration = Z49
});