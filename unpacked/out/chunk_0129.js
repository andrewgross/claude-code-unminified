/* chunk:129 bytes:[2964293, 2986106) size:21813 source:unpacked-cli.js */
var AK = E((o45, DOA) => {
    var {
        Transform: AOQ
    } = W1("node:stream"), dRA = W1("node:zlib"), {
        redirectStatusSet: BOQ,
        referrerPolicySet: QOQ,
        badPortsSet: ZOQ
    } = cQ1(), {
        getGlobalOrigin: cRA
    } = H00(), {
        collectASequenceOfCodePoints: ch,
        collectAnHTTPQuotedString: DOQ,
        removeChars: GOQ,
        parseMIMEType: FOQ
    } = NV(), {
        performance: IOQ
    } = W1("node:perf_hooks"), {
        isBlobLike: YOQ,
        ReadableStreamFrom: WOQ,
        isValidHTTPToken: lRA,
        normalizedMethodRecordsBase: JOQ
    } = e4(), lh = W1("node:assert"), {
        isUint8Array: XOQ
    } = W1("node:util/types"), {
        webidl: pQ1
    } = NY(), pRA = [], BU1;
    try {
        BU1 = W1("node:crypto");
        let A = ["sha256", "sha384", "sha512"];
        pRA = BU1.getHashes().filter((B) => A.includes(B))
    } catch {}

    function iRA(A) {
        let B = A.urlList,
            Q = B.length;
        return Q === 0 ? null : B[Q - 1].toString()
    }

    function VOQ(A, B) {
        if (!BOQ.has(A.status)) return null;
        let Q = A.headersList.get("location", !0);
        if (Q !== null && aRA(Q)) {
            if (!nRA(Q)) Q = COQ(Q);
            Q = new URL(Q, iRA(A))
        }
        if (Q && !Q.hash) Q.hash = B;
        return Q
    }

    function nRA(A) {
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (Q > 126 || Q < 32) return !1
        }
        return !0
    }

    function COQ(A) {
        return Buffer.from(A, "binary").toString("utf8")
    }

    function nQ1(A) {
        return A.urlList[A.urlList.length - 1]
    }

    function KOQ(A) {
        let B = nQ1(A);
        if (eRA(B) && ZOQ.has(B.port)) return "blocked";
        return "allowed"
    }

    function HOQ(A) {
        return A instanceof Error || (A?.constructor?.name === "Error" || A?.constructor?.name === "DOMException")
    }

    function zOQ(A) {
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (!(Q === 9 || Q >= 32 && Q <= 126 || Q >= 128 && Q <= 255)) return !1
        }
        return !0
    }
    var EOQ = lRA;

    function aRA(A) {
        return (A[0] === "\t" || A[0] === " " || A[A.length - 1] === "\t" || A[A.length - 1] === " " || A.includes(`
`) || A.includes("\r") || A.includes("\x00")) === !1
    }

    function UOQ(A, B) {
        let {
            headersList: Q
        } = B, Z = (Q.get("referrer-policy", !0) ?? "").split(","), D = "";
        if (Z.length > 0)
            for (let G = Z.length; G !== 0; G--) {
                let F = Z[G - 1].trim();
                if (QOQ.has(F)) {
                    D = F;
                    break
                }
            }
        if (D !== "") A.referrerPolicy = D
    }

    function wOQ() {
        return "allowed"
    }

    function $OQ() {
        return "success"
    }

    function qOQ() {
        return "success"
    }

    function NOQ(A) {
        let B = null;
        B = A.mode, A.headersList.set("sec-fetch-mode", B, !0)
    }

    function LOQ(A) {
        let B = A.origin;
        if (B === "client" || B === void 0) return;
        if (A.responseTainting === "cors" || A.mode === "websocket") A.headersList.append("origin", B, !0);
        else if (A.method !== "GET" && A.method !== "HEAD") {
            switch (A.referrerPolicy) {
                case "no-referrer":
                    B = null;
                    break;
                case "no-referrer-when-downgrade":
                case "strict-origin":
                case "strict-origin-when-cross-origin":
                    if (A.origin && w00(A.origin) && !w00(nQ1(A))) B = null;
                    break;
                case "same-origin":
                    if (!QU1(A, nQ1(A))) B = null;
                    break;
                default:
            }
            A.headersList.append("origin", B, !0)
        }
    }

    function Mn(A, B) {
        return A
    }

    function MOQ(A, B, Q) {
        if (!A?.startTime || A.startTime < B) return {
            domainLookupStartTime: B,
            domainLookupEndTime: B,
            connectionStartTime: B,
            connectionEndTime: B,
            secureConnectionStartTime: B,
            ALPNNegotiatedProtocol: A?.ALPNNegotiatedProtocol
        };
        return {
            domainLookupStartTime: Mn(A.domainLookupStartTime, Q),
            domainLookupEndTime: Mn(A.domainLookupEndTime, Q),
            connectionStartTime: Mn(A.connectionStartTime, Q),
            connectionEndTime: Mn(A.connectionEndTime, Q),
            secureConnectionStartTime: Mn(A.secureConnectionStartTime, Q),
            ALPNNegotiatedProtocol: A.ALPNNegotiatedProtocol
        }
    }

    function ROQ(A) {
        return Mn(IOQ.now(), A)
    }

    function OOQ(A) {
        return {
            startTime: A.startTime ?? 0,
            redirectStartTime: 0,
            redirectEndTime: 0,
            postRedirectStartTime: A.startTime ?? 0,
            finalServiceWorkerStartTime: 0,
            finalNetworkResponseStartTime: 0,
            finalNetworkRequestStartTime: 0,
            endTime: 0,
            encodedBodySize: 0,
            decodedBodySize: 0,
            finalConnectionTimingInfo: null
        }
    }

    function sRA() {
        return {
            referrerPolicy: "strict-origin-when-cross-origin"
        }
    }

    function TOQ(A) {
        return {
            referrerPolicy: A.referrerPolicy
        }
    }

    function POQ(A) {
        let B = A.referrerPolicy;
        lh(B);
        let Q = null;
        if (A.referrer === "client") {
            let I = cRA();
            if (!I || I.origin === "null") return "no-referrer";
            Q = new URL(I)
        } else if (A.referrer instanceof URL) Q = A.referrer;
        let Z = U00(Q),
            D = U00(Q, !0);
        if (Z.toString().length > 4096) Z = D;
        let G = QU1(A, Z),
            F = iQ1(Z) && !iQ1(A.url);
        switch (B) {
            case "origin":
                return D != null ? D : U00(Q, !0);
            case "unsafe-url":
                return Z;
            case "same-origin":
                return G ? D : "no-referrer";
            case "origin-when-cross-origin":
                return G ? Z : D;
            case "strict-origin-when-cross-origin": {
                let I = nQ1(A);
                if (QU1(Z, I)) return Z;
                if (iQ1(Z) && !iQ1(I)) return "no-referrer";
                return D
            }
            case "strict-origin":
            case "no-referrer-when-downgrade":
            default:
                return F ? "no-referrer" : D
        }
    }

    function U00(A, B) {
        if (lh(A instanceof URL), A = new URL(A), A.protocol === "file:" || A.protocol === "about:" || A.protocol === "blank:") return "no-referrer";
        if (A.username = "", A.password = "", A.hash = "", B) A.pathname = "", A.search = "";
        return A
    }

    function iQ1(A) {
        if (!(A instanceof URL)) return !1;
        if (A.href === "about:blank" || A.href === "about:srcdoc") return !0;
        if (A.protocol === "data:") return !0;
        if (A.protocol === "file:") return !0;
        return B(A.origin);

        function B(Q) {
            if (Q == null || Q === "null") return !1;
            let Z = new URL(Q);
            if (Z.protocol === "https:" || Z.protocol === "wss:") return !0;
            if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(Z.hostname) || (Z.hostname === "localhost" || Z.hostname.includes("localhost.")) || Z.hostname.endsWith(".localhost")) return !0;
            return !1
        }
    }

    function SOQ(A, B) {
        if (BU1 === void 0) return !0;
        let Q = rRA(B);
        if (Q === "no metadata") return !0;
        if (Q.length === 0) return !0;
        let Z = kOQ(Q),
            D = yOQ(Q, Z);
        for (let G of D) {
            let {
                algo: F,
                hash: I
            } = G, Y = BU1.createHash(F).update(A).digest("base64");
            if (Y[Y.length - 1] === "=")
                if (Y[Y.length - 2] === "=") Y = Y.slice(0, -2);
                else Y = Y.slice(0, -1);
            if (_OQ(Y, I)) return !0
        }
        return !1
    }
    var jOQ = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;

    function rRA(A) {
        let B = [],
            Q = !0;
        for (let Z of A.split(" ")) {
            Q = !1;
            let D = jOQ.exec(Z);
            if (D === null || D.groups === void 0 || D.groups.algo === void 0) continue;
            let G = D.groups.algo.toLowerCase();
            if (pRA.includes(G)) B.push(D.groups)
        }
        if (Q === !0) return "no metadata";
        return B
    }

    function kOQ(A) {
        let B = A[0].algo;
        if (B[3] === "5") return B;
        for (let Q = 1; Q < A.length; ++Q) {
            let Z = A[Q];
            if (Z.algo[3] === "5") {
                B = "sha512";
                break
            } else if (B[3] === "3") continue;
            else if (Z.algo[3] === "3") B = "sha384"
        }
        return B
    }

    function yOQ(A, B) {
        if (A.length === 1) return A;
        let Q = 0;
        for (let Z = 0; Z < A.length; ++Z)
            if (A[Z].algo === B) A[Q++] = A[Z];
        return A.length = Q, A
    }

    function _OQ(A, B) {
        if (A.length !== B.length) return !1;
        for (let Q = 0; Q < A.length; ++Q)
            if (A[Q] !== B[Q]) {
                if (A[Q] === "+" && B[Q] === "-" || A[Q] === "/" && B[Q] === "_") continue;
                return !1
            } return !0
    }

    function xOQ(A) {}

    function QU1(A, B) {
        if (A.origin === B.origin && A.origin === "null") return !0;
        if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) return !0;
        return !1
    }

    function vOQ() {
        let A, B;
        return {
            promise: new Promise((Z, D) => {
                A = Z, B = D
            }),
            resolve: A,
            reject: B
        }
    }

    function bOQ(A) {
        return A.controller.state === "aborted"
    }

    function fOQ(A) {
        return A.controller.state === "aborted" || A.controller.state === "terminated"
    }

    function hOQ(A) {
        return JOQ[A.toLowerCase()] ?? A
    }

    function gOQ(A) {
        let B = JSON.stringify(A);
        if (B === void 0) throw new TypeError("Value is not JSON serializable");
        return lh(typeof B === "string"), B
    }
    var uOQ = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

    function oRA(A, B, Q = 0, Z = 1) {
        class D {
            #A;
            #B;
            #Q;
            constructor(G, F) {
                this.#A = G, this.#B = F, this.#Q = 0
            }
            next() {
                if (typeof this !== "object" || this === null || !(#A in this)) throw new TypeError(`'next' called on an object that does not implement interface ${A} Iterator.`);
                let G = this.#Q,
                    F = this.#A[B],
                    I = F.length;
                if (G >= I) return {
                    value: void 0,
                    done: !0
                };
                let {
                    [Q]: Y, [Z]: W
                } = F[G];
                this.#Q = G + 1;
                let J;
                switch (this.#B) {
                    case "key":
                        J = Y;
                        break;
                    case "value":
                        J = W;
                        break;
                    case "key+value":
                        J = [Y, W];
                        break
                }
                return {
                    value: J,
                    done: !1
                }
            }
        }
        return delete D.prototype.constructor, Object.setPrototypeOf(D.prototype, uOQ), Object.defineProperties(D.prototype, {
                [Symbol.toStringTag]: {
                    writable: !1,
                    enumerable: !1,
                    configurable: !0,
                    value: `${A} Iterator`
                },
                next: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }
            }),
            function(G, F) {
                return new D(G, F)
            }
    }

    function mOQ(A, B, Q, Z = 0, D = 1) {
        let G = oRA(A, Q, Z, D),
            F = {
                keys: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value: function I() {
                        return pQ1.brandCheck(this, B), G(this, "key")
                    }
                },
                values: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value: function I() {
                        return pQ1.brandCheck(this, B), G(this, "value")
                    }
                },
                entries: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value: function I() {
                        return pQ1.brandCheck(this, B), G(this, "key+value")
                    }
                },
                forEach: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value: function I(Y, W = globalThis) {
                        if (pQ1.brandCheck(this, B), pQ1.argumentLengthCheck(arguments, 1, `${A}.forEach`), typeof Y !== "function") throw new TypeError(`Failed to execute 'forEach' on '${A}': parameter 1 is not of type 'Function'.`);
                        for (let {
                                0: J,
                                1: X
                            }
                            of G(this, "key+value")) Y.call(W, X, J, this)
                    }
                }
            };
        return Object.defineProperties(B.prototype, {
            ...F,
            [Symbol.iterator]: {
                writable: !0,
                enumerable: !1,
                configurable: !0,
                value: F.entries.value
            }
        })
    }
    async function dOQ(A, B, Q) {
        let Z = B,
            D = Q,
            G;
        try {
            G = A.stream.getReader()
        } catch (F) {
            D(F);
            return
        }
        try {
            Z(await tRA(G))
        } catch (F) {
            D(F)
        }
    }

    function cOQ(A) {
        return A instanceof ReadableStream || A[Symbol.toStringTag] === "ReadableStream" && typeof A.tee === "function"
    }

    function lOQ(A) {
        try {
            A.close(), A.byobRequest?.respond(0)
        } catch (B) {
            if (!B.message.includes("Controller is already closed") && !B.message.includes("ReadableStream is already closed")) throw B
        }
    }
    var pOQ = /[^\x00-\xFF]/;

    function AU1(A) {
        return lh(!pOQ.test(A)), A
    }
    async function tRA(A) {
        let B = [],
            Q = 0;
        while (!0) {
            let {
                done: Z,
                value: D
            } = await A.read();
            if (Z) return Buffer.concat(B, Q);
            if (!XOQ(D)) throw new TypeError("Received non-Uint8Array chunk");
            B.push(D), Q += D.length
        }
    }

    function iOQ(A) {
        lh("protocol" in A);
        let B = A.protocol;
        return B === "about:" || B === "blob:" || B === "data:"
    }

    function w00(A) {
        return typeof A === "string" && A[5] === ":" && A[0] === "h" && A[1] === "t" && A[2] === "t" && A[3] === "p" && A[4] === "s" || A.protocol === "https:"
    }

    function eRA(A) {
        lh("protocol" in A);
        let B = A.protocol;
        return B === "http:" || B === "https:"
    }

    function nOQ(A, B) {
        let Q = A;
        if (!Q.startsWith("bytes")) return "failure";
        let Z = {
            position: 5
        };
        if (B) ch((Y) => Y === "\t" || Y === " ", Q, Z);
        if (Q.charCodeAt(Z.position) !== 61) return "failure";
        if (Z.position++, B) ch((Y) => Y === "\t" || Y === " ", Q, Z);
        let D = ch((Y) => {
                let W = Y.charCodeAt(0);
                return W >= 48 && W <= 57
            }, Q, Z),
            G = D.length ? Number(D) : null;
        if (B) ch((Y) => Y === "\t" || Y === " ", Q, Z);
        if (Q.charCodeAt(Z.position) !== 45) return "failure";
        if (Z.position++, B) ch((Y) => Y === "\t" || Y === " ", Q, Z);
        let F = ch((Y) => {
                let W = Y.charCodeAt(0);
                return W >= 48 && W <= 57
            }, Q, Z),
            I = F.length ? Number(F) : null;
        if (Z.position < Q.length) return "failure";
        if (I === null && G === null) return "failure";
        if (G > I) return "failure";
        return {
            rangeStartValue: G,
            rangeEndValue: I
        }
    }

    function aOQ(A, B, Q) {
        let Z = "bytes ";
        return Z += AU1(`${A}`), Z += "-", Z += AU1(`${B}`), Z += "/", Z += AU1(`${Q}`), Z
    }
    class AOA extends AOQ {
        #A;
        constructor(A) {
            super();
            this.#A = A
        }
        _transform(A, B, Q) {
            if (!this._inflateStream) {
                if (A.length === 0) {
                    Q();
                    return
                }
                this._inflateStream = (A[0] & 15) === 8 ? dRA.createInflate(this.#A) : dRA.createInflateRaw(this.#A), this._inflateStream.on("data", this.push.bind(this)), this._inflateStream.on("end", () => this.push(null)), this._inflateStream.on("error", (Z) => this.destroy(Z))
            }
            this._inflateStream.write(A, B, Q)
        }
        _final(A) {
            if (this._inflateStream) this._inflateStream.end(), this._inflateStream = null;
            A()
        }
    }

    function sOQ(A) {
        return new AOA(A)
    }

    function rOQ(A) {
        let B = null,
            Q = null,
            Z = null,
            D = BOA("content-type", A);
        if (D === null) return "failure";
        for (let G of D) {
            let F = FOQ(G);
            if (F === "failure" || F.essence === "*/*") continue;
            if (Z = F, Z.essence !== Q) {
                if (B = null, Z.parameters.has("charset")) B = Z.parameters.get("charset");
                Q = Z.essence
            } else if (!Z.parameters.has("charset") && B !== null) Z.parameters.set("charset", B)
        }
        if (Z == null) return "failure";
        return Z
    }

    function oOQ(A) {
        let B = A,
            Q = {
                position: 0
            },
            Z = [],
            D = "";
        while (Q.position < B.length) {
            if (D += ch((G) => G !== '"' && G !== ",", B, Q), Q.position < B.length)
                if (B.charCodeAt(Q.position) === 34) {
                    if (D += DOQ(B, Q), Q.position < B.length) continue
                } else lh(B.charCodeAt(Q.position) === 44), Q.position++;
            D = GOQ(D, !0, !0, (G) => G === 9 || G === 32), Z.push(D), D = ""
        }
        return Z
    }

    function BOA(A, B) {
        let Q = B.get(A, !0);
        if (Q === null) return null;
        return oOQ(Q)
    }
    var tOQ = new TextDecoder;

    function eOQ(A) {
        if (A.length === 0) return "";
        if (A[0] === 239 && A[1] === 187 && A[2] === 191) A = A.subarray(3);
        return tOQ.decode(A)
    }
    class QOA {
        get baseUrl() {
            return cRA()
        }
        get origin() {
            return this.baseUrl?.origin
        }
        policyContainer = sRA()
    }
    class ZOA {
        settingsObject = new QOA
    }
    var ATQ = new ZOA;
    DOA.exports = {
        isAborted: bOQ,
        isCancelled: fOQ,
        isValidEncodedURL: nRA,
        createDeferredPromise: vOQ,
        ReadableStreamFrom: WOQ,
        tryUpgradeRequestToAPotentiallyTrustworthyURL: xOQ,
        clampAndCoarsenConnectionTimingInfo: MOQ,
        coarsenedSharedCurrentTime: ROQ,
        determineRequestsReferrer: POQ,
        makePolicyContainer: sRA,
        clonePolicyContainer: TOQ,
        appendFetchMetadata: NOQ,
        appendRequestOriginHeader: LOQ,
        TAOCheck: qOQ,
        corsCheck: $OQ,
        crossOriginResourcePolicyCheck: wOQ,
        createOpaqueTimingInfo: OOQ,
        setRequestReferrerPolicyOnRedirect: UOQ,
        isValidHTTPToken: lRA,
        requestBadPort: KOQ,
        requestCurrentURL: nQ1,
        responseURL: iRA,
        responseLocationURL: VOQ,
        isBlobLike: YOQ,
        isURLPotentiallyTrustworthy: iQ1,
        isValidReasonPhrase: zOQ,
        sameOrigin: QU1,
        normalizeMethod: hOQ,
        serializeJavascriptValueToJSONString: gOQ,
        iteratorMixin: mOQ,
        createIterator: oRA,
        isValidHeaderName: EOQ,
        isValidHeaderValue: aRA,
        isErrorLike: HOQ,
        fullyReadBody: dOQ,
        bytesMatch: SOQ,
        isReadableStreamLike: cOQ,
        readableStreamClose: lOQ,
        isomorphicEncode: AU1,
        urlIsLocal: iOQ,
        urlHasHttpsScheme: w00,
        urlIsHttpHttpsScheme: eRA,
        readAllBytes: tRA,
        simpleRangeHeaderValue: nOQ,
        buildContentRange: aOQ,
        parseMetadata: rRA,
        createInflate: sOQ,
        extractMimeType: rOQ,
        getDecodeSplit: BOA,
        utf8DecodeBytes: eOQ,
        environmentSettingsObject: ATQ
    }
});