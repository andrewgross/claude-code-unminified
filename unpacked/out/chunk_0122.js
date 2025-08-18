/* chunk:122 bytes:[2760143, 2774878) size:14735 source:unpacked-cli.js */
var e4 = E((b45, xMA) => {
    var gQ1 = W1("node:assert"),
        {
            kDestroyed: $MA,
            kBodyUsed: Hn,
            kListeners: i10,
            kBody: wMA
        } = VZ(),
        {
            IncomingMessage: sLQ
        } = W1("node:http"),
        cE1 = W1("node:stream"),
        rLQ = W1("node:net"),
        {
            Blob: oLQ
        } = W1("node:buffer"),
        tLQ = W1("node:util"),
        {
            stringify: eLQ
        } = W1("node:querystring"),
        {
            EventEmitter: AMQ
        } = W1("node:events"),
        {
            InvalidArgumentError: JI
        } = $5(),
        {
            headerNameLowerCasedRecord: BMQ
        } = mE1(),
        {
            tree: qMA
        } = UMA(),
        [QMQ, ZMQ] = process.versions.node.split(".").map((A) => Number(A));
    class n10 {
        constructor(A) {
            this[wMA] = A, this[Hn] = !1
        }
        async * [Symbol.asyncIterator]() {
            gQ1(!this[Hn], "disturbed"), this[Hn] = !0, yield* this[wMA]
        }
    }

    function DMQ(A) {
        if (lE1(A)) {
            if (OMA(A) === 0) A.on("data", function() {
                gQ1(!1)
            });
            if (typeof A.readableDidRead !== "boolean") A[Hn] = !1, AMQ.prototype.on.call(A, "data", function() {
                this[Hn] = !0
            });
            return A
        } else if (A && typeof A.pipeTo === "function") return new n10(A);
        else if (A && typeof A !== "string" && !ArrayBuffer.isView(A) && RMA(A)) return new n10(A);
        else return A
    }

    function GMQ() {}

    function lE1(A) {
        return A && typeof A === "object" && typeof A.pipe === "function" && typeof A.on === "function"
    }

    function NMA(A) {
        if (A === null) return !1;
        else if (A instanceof oLQ) return !0;
        else if (typeof A !== "object") return !1;
        else {
            let B = A[Symbol.toStringTag];
            return (B === "Blob" || B === "File") && (("stream" in A) && typeof A.stream === "function" || ("arrayBuffer" in A) && typeof A.arrayBuffer === "function")
        }
    }

    function FMQ(A, B) {
        if (A.includes("?") || A.includes("#")) throw new Error('Query params cannot be passed when url already contains "?" or "#".');
        let Q = eLQ(B);
        if (Q) A += "?" + Q;
        return A
    }

    function LMA(A) {
        let B = parseInt(A, 10);
        return B === Number(A) && B >= 0 && B <= 65535
    }

    function dE1(A) {
        return A != null && A[0] === "h" && A[1] === "t" && A[2] === "t" && A[3] === "p" && (A[4] === ":" || A[4] === "s" && A[5] === ":")
    }

    function MMA(A) {
        if (typeof A === "string") {
            if (A = new URL(A), !dE1(A.origin || A.protocol)) throw new JI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
            return A
        }
        if (!A || typeof A !== "object") throw new JI("Invalid URL: The URL argument must be a non-null object.");
        if (!(A instanceof URL)) {
            if (A.port != null && A.port !== "" && LMA(A.port) === !1) throw new JI("Invalid URL: port must be a valid integer or a string representation of an integer.");
            if (A.path != null && typeof A.path !== "string") throw new JI("Invalid URL path: the path must be a string or null/undefined.");
            if (A.pathname != null && typeof A.pathname !== "string") throw new JI("Invalid URL pathname: the pathname must be a string or null/undefined.");
            if (A.hostname != null && typeof A.hostname !== "string") throw new JI("Invalid URL hostname: the hostname must be a string or null/undefined.");
            if (A.origin != null && typeof A.origin !== "string") throw new JI("Invalid URL origin: the origin must be a string or null/undefined.");
            if (!dE1(A.origin || A.protocol)) throw new JI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
            let B = A.port != null ? A.port : A.protocol === "https:" ? 443 : 80,
                Q = A.origin != null ? A.origin : `${A.protocol||""}//${A.hostname||""}:${B}`,
                Z = A.path != null ? A.path : `${A.pathname||""}${A.search||""}`;
            if (Q[Q.length - 1] === "/") Q = Q.slice(0, Q.length - 1);
            if (Z && Z[0] !== "/") Z = `/${Z}`;
            return new URL(`${Q}${Z}`)
        }
        if (!dE1(A.origin || A.protocol)) throw new JI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
        return A
    }

    function IMQ(A) {
        if (A = MMA(A), A.pathname !== "/" || A.search || A.hash) throw new JI("invalid url");
        return A
    }

    function YMQ(A) {
        if (A[0] === "[") {
            let Q = A.indexOf("]");
            return gQ1(Q !== -1), A.substring(1, Q)
        }
        let B = A.indexOf(":");
        if (B === -1) return A;
        return A.substring(0, B)
    }

    function WMQ(A) {
        if (!A) return null;
        gQ1(typeof A === "string");
        let B = YMQ(A);
        if (rLQ.isIP(B)) return "";
        return B
    }

    function JMQ(A) {
        return JSON.parse(JSON.stringify(A))
    }

    function XMQ(A) {
        return A != null && typeof A[Symbol.asyncIterator] === "function"
    }

    function RMA(A) {
        return A != null && (typeof A[Symbol.iterator] === "function" || typeof A[Symbol.asyncIterator] === "function")
    }

    function OMA(A) {
        if (A == null) return 0;
        else if (lE1(A)) {
            let B = A._readableState;
            return B && B.objectMode === !1 && B.ended === !0 && Number.isFinite(B.length) ? B.length : null
        } else if (NMA(A)) return A.size != null ? A.size : null;
        else if (SMA(A)) return A.byteLength;
        return null
    }

    function TMA(A) {
        return A && !!(A.destroyed || A[$MA] || cE1.isDestroyed?.(A))
    }

    function VMQ(A, B) {
        if (A == null || !lE1(A) || TMA(A)) return;
        if (typeof A.destroy === "function") {
            if (Object.getPrototypeOf(A).constructor === sLQ) A.socket = null;
            A.destroy(B)
        } else if (B) queueMicrotask(() => {
            A.emit("error", B)
        });
        if (A.destroyed !== !0) A[$MA] = !0
    }
    var CMQ = /timeout=(\d+)/;

    function KMQ(A) {
        let B = A.toString().match(CMQ);
        return B ? parseInt(B[1], 10) * 1000 : null
    }

    function PMA(A) {
        return typeof A === "string" ? BMQ[A] ?? A.toLowerCase() : qMA.lookup(A) ?? A.toString("latin1").toLowerCase()
    }

    function HMQ(A) {
        return qMA.lookup(A) ?? A.toString("latin1").toLowerCase()
    }

    function zMQ(A, B) {
        if (B === void 0) B = {};
        for (let Q = 0; Q < A.length; Q += 2) {
            let Z = PMA(A[Q]),
                D = B[Z];
            if (D) {
                if (typeof D === "string") D = [D], B[Z] = D;
                D.push(A[Q + 1].toString("utf8"))
            } else {
                let G = A[Q + 1];
                if (typeof G === "string") B[Z] = G;
                else B[Z] = Array.isArray(G) ? G.map((F) => F.toString("utf8")) : G.toString("utf8")
            }
        }
        if ("content-length" in B && "content-disposition" in B) B["content-disposition"] = Buffer.from(B["content-disposition"]).toString("latin1");
        return B
    }

    function EMQ(A) {
        let B = A.length,
            Q = new Array(B),
            Z = !1,
            D = -1,
            G, F, I = 0;
        for (let Y = 0; Y < A.length; Y += 2) {
            if (G = A[Y], F = A[Y + 1], typeof G !== "string" && (G = G.toString()), typeof F !== "string" && (F = F.toString("utf8")), I = G.length, I === 14 && G[7] === "-" && (G === "content-length" || G.toLowerCase() === "content-length")) Z = !0;
            else if (I === 19 && G[7] === "-" && (G === "content-disposition" || G.toLowerCase() === "content-disposition")) D = Y + 1;
            Q[Y] = G, Q[Y + 1] = F
        }
        if (Z && D !== -1) Q[D] = Buffer.from(Q[D]).toString("latin1");
        return Q
    }

    function SMA(A) {
        return A instanceof Uint8Array || Buffer.isBuffer(A)
    }

    function UMQ(A, B, Q) {
        if (!A || typeof A !== "object") throw new JI("handler must be an object");
        if (typeof A.onConnect !== "function") throw new JI("invalid onConnect method");
        if (typeof A.onError !== "function") throw new JI("invalid onError method");
        if (typeof A.onBodySent !== "function" && A.onBodySent !== void 0) throw new JI("invalid onBodySent method");
        if (Q || B === "CONNECT") {
            if (typeof A.onUpgrade !== "function") throw new JI("invalid onUpgrade method")
        } else {
            if (typeof A.onHeaders !== "function") throw new JI("invalid onHeaders method");
            if (typeof A.onData !== "function") throw new JI("invalid onData method");
            if (typeof A.onComplete !== "function") throw new JI("invalid onComplete method")
        }
    }

    function wMQ(A) {
        return !!(A && (cE1.isDisturbed(A) || A[Hn]))
    }

    function $MQ(A) {
        return !!(A && cE1.isErrored(A))
    }

    function qMQ(A) {
        return !!(A && cE1.isReadable(A))
    }

    function NMQ(A) {
        return {
            localAddress: A.localAddress,
            localPort: A.localPort,
            remoteAddress: A.remoteAddress,
            remotePort: A.remotePort,
            remoteFamily: A.remoteFamily,
            timeout: A.timeout,
            bytesWritten: A.bytesWritten,
            bytesRead: A.bytesRead
        }
    }

    function LMQ(A) {
        let B;
        return new ReadableStream({
            async start() {
                B = A[Symbol.asyncIterator]()
            },
            async pull(Q) {
                let {
                    done: Z,
                    value: D
                } = await B.next();
                if (Z) queueMicrotask(() => {
                    Q.close(), Q.byobRequest?.respond(0)
                });
                else {
                    let G = Buffer.isBuffer(D) ? D : Buffer.from(D);
                    if (G.byteLength) Q.enqueue(new Uint8Array(G))
                }
                return Q.desiredSize > 0
            },
            async cancel(Q) {
                await B.return()
            },
            type: "bytes"
        })
    }

    function MMQ(A) {
        return A && typeof A === "object" && typeof A.append === "function" && typeof A.delete === "function" && typeof A.get === "function" && typeof A.getAll === "function" && typeof A.has === "function" && typeof A.set === "function" && A[Symbol.toStringTag] === "FormData"
    }

    function RMQ(A, B) {
        if ("addEventListener" in A) return A.addEventListener("abort", B, {
            once: !0
        }), () => A.removeEventListener("abort", B);
        return A.addListener("abort", B), () => A.removeListener("abort", B)
    }
    var OMQ = typeof String.prototype.toWellFormed === "function",
        TMQ = typeof String.prototype.isWellFormed === "function";

    function jMA(A) {
        return OMQ ? `${A}`.toWellFormed() : tLQ.toUSVString(A)
    }

    function PMQ(A) {
        return TMQ ? `${A}`.isWellFormed() : jMA(A) === `${A}`
    }

    function kMA(A) {
        switch (A) {
            case 34:
            case 40:
            case 41:
            case 44:
            case 47:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 91:
            case 92:
            case 93:
            case 123:
            case 125:
                return !1;
            default:
                return A >= 33 && A <= 126
        }
    }

    function SMQ(A) {
        if (A.length === 0) return !1;
        for (let B = 0; B < A.length; ++B)
            if (!kMA(A.charCodeAt(B))) return !1;
        return !0
    }
    var jMQ = /[^\t\x20-\x7e\x80-\xff]/;

    function kMQ(A) {
        return !jMQ.test(A)
    }

    function yMQ(A) {
        if (A == null || A === "") return {
            start: 0,
            end: null,
            size: null
        };
        let B = A ? A.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
        return B ? {
            start: parseInt(B[1]),
            end: B[2] ? parseInt(B[2]) : null,
            size: B[3] ? parseInt(B[3]) : null
        } : null
    }

    function _MQ(A, B, Q) {
        return (A[i10] ??= []).push([B, Q]), A.on(B, Q), A
    }

    function xMQ(A) {
        for (let [B, Q] of A[i10] ?? []) A.removeListener(B, Q);
        A[i10] = null
    }

    function vMQ(A, B, Q) {
        try {
            B.onError(Q), gQ1(B.aborted)
        } catch (Z) {
            A.emit("error", Z)
        }
    }
    var yMA = Object.create(null);
    yMA.enumerable = !0;
    var a10 = {
            delete: "DELETE",
            DELETE: "DELETE",
            get: "GET",
            GET: "GET",
            head: "HEAD",
            HEAD: "HEAD",
            options: "OPTIONS",
            OPTIONS: "OPTIONS",
            post: "POST",
            POST: "POST",
            put: "PUT",
            PUT: "PUT"
        },
        _MA = {
            ...a10,
            patch: "patch",
            PATCH: "PATCH"
        };
    Object.setPrototypeOf(a10, null);
    Object.setPrototypeOf(_MA, null);
    xMA.exports = {
        kEnumerableProperty: yMA,
        nop: GMQ,
        isDisturbed: wMQ,
        isErrored: $MQ,
        isReadable: qMQ,
        toUSVString: jMA,
        isUSVString: PMQ,
        isBlobLike: NMA,
        parseOrigin: IMQ,
        parseURL: MMA,
        getServerName: WMQ,
        isStream: lE1,
        isIterable: RMA,
        isAsyncIterable: XMQ,
        isDestroyed: TMA,
        headerNameToString: PMA,
        bufferToLowerCasedHeaderName: HMQ,
        addListener: _MQ,
        removeAllListeners: xMQ,
        errorRequest: vMQ,
        parseRawHeaders: EMQ,
        parseHeaders: zMQ,
        parseKeepAliveTimeout: KMQ,
        destroy: VMQ,
        bodyLength: OMA,
        deepClone: JMQ,
        ReadableStreamFrom: LMQ,
        isBuffer: SMA,
        validateHandler: UMQ,
        getSocketInfo: NMQ,
        isFormDataLike: MMQ,
        buildURL: FMQ,
        addAbortListener: RMQ,
        isValidHTTPToken: SMQ,
        isValidHeaderValue: kMQ,
        isTokenCharCode: kMA,
        parseRangeHeader: yMQ,
        normalizedMethodRecordsBase: a10,
        normalizedMethodRecords: _MA,
        isValidPort: LMA,
        isHttpOrHttpsPrefixed: dE1,
        nodeMajor: QMQ,
        nodeMinor: ZMQ,
        safeHTTPMethods: ["GET", "HEAD", "OPTIONS", "TRACE"],
        wrapRequestBody: DMQ
    }
});