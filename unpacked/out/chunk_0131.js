/* chunk:131 bytes:[2998919, 3007733) size:8814 source:unpacked-cli.js */
var Sn = E((Q65, ROA) => {
    var sQ1 = e4(),
        {
            ReadableStreamFrom: $TQ,
            isBlobLike: UOA,
            isReadableStreamLike: qTQ,
            readableStreamClose: NTQ,
            createDeferredPromise: LTQ,
            fullyReadBody: MTQ,
            extractMimeType: RTQ,
            utf8DecodeBytes: qOA
        } = AK(),
        {
            FormData: wOA
        } = aQ1(),
        {
            kState: Pn
        } = sk(),
        {
            webidl: OTQ
        } = NY(),
        {
            Blob: TTQ
        } = W1("node:buffer"),
        L00 = W1("node:assert"),
        {
            isErrored: NOA,
            isDisturbed: PTQ
        } = W1("node:stream"),
        {
            isArrayBuffer: STQ
        } = W1("node:util/types"),
        {
            serializeAMimeType: jTQ
        } = NV(),
        {
            multipartFormDataParser: kTQ
        } = EOA(),
        M00;
    try {
        let A = W1("node:crypto");
        M00 = (B) => A.randomInt(0, B)
    } catch {
        M00 = (A) => Math.floor(Math.random(A))
    }
    var FU1 = new TextEncoder;

    function yTQ() {}
    var R00 = globalThis.FinalizationRegistry && process.version.indexOf("v18") !== 0,
        O00;
    if (R00) O00 = new FinalizationRegistry((A) => {
        let B = A.deref();
        if (B && !B.locked && !PTQ(B) && !NOA(B)) B.cancel("Response object has been garbage collected").catch(yTQ)
    });

    function LOA(A, B = !1) {
        let Q = null;
        if (A instanceof ReadableStream) Q = A;
        else if (UOA(A)) Q = A.stream();
        else Q = new ReadableStream({
            async pull(Y) {
                let W = typeof D === "string" ? FU1.encode(D) : D;
                if (W.byteLength) Y.enqueue(W);
                queueMicrotask(() => NTQ(Y))
            },
            start() {},
            type: "bytes"
        });
        L00(qTQ(Q));
        let Z = null,
            D = null,
            G = null,
            F = null;
        if (typeof A === "string") D = A, F = "text/plain;charset=UTF-8";
        else if (A instanceof URLSearchParams) D = A.toString(), F = "application/x-www-form-urlencoded;charset=UTF-8";
        else if (STQ(A)) D = new Uint8Array(A.slice());
        else if (ArrayBuffer.isView(A)) D = new Uint8Array(A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength));
        else if (sQ1.isFormDataLike(A)) {
            let Y = `----formdata-undici-0${`${M00(100000000000)}`.padStart(11,"0")}`,
                W = `--${Y}\r
Content-Disposition: form-data`; /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
            let J = (z) => z.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"),
                X = (z) => z.replace(/\r?\n|\r/g, `\r
`),
                V = [],
                C = new Uint8Array([13, 10]);
            G = 0;
            let K = !1;
            for (let [z, $] of A)
                if (typeof $ === "string") {
                    let L = FU1.encode(W + `; name="${J(X(z))}"\r
\r
${X($)}\r
`);
                    V.push(L), G += L.byteLength
                } else {
                    let L = FU1.encode(`${W}; name="${J(X(z))}"` + ($.name ? `; filename="${J($.name)}"` : "") + `\r
Content-Type: ${$.type||"application/octet-stream"}\r
\r
`);
                    if (V.push(L, $, C), typeof $.size === "number") G += L.byteLength + $.size + C.byteLength;
                    else K = !0
                } let H = FU1.encode(`--${Y}--`);
            if (V.push(H), G += H.byteLength, K) G = null;
            D = A, Z = async function*() {
                for (let z of V)
                    if (z.stream) yield* z.stream();
                    else yield z
            }, F = `multipart/form-data; boundary=${Y}`
        } else if (UOA(A)) {
            if (D = A, G = A.size, A.type) F = A.type
        } else if (typeof A[Symbol.asyncIterator] === "function") {
            if (B) throw new TypeError("keepalive");
            if (sQ1.isDisturbed(A) || A.locked) throw new TypeError("Response body object should not be disturbed or locked");
            Q = A instanceof ReadableStream ? A : $TQ(A)
        }
        if (typeof D === "string" || sQ1.isBuffer(D)) G = Buffer.byteLength(D);
        if (Z != null) {
            let Y;
            Q = new ReadableStream({
                async start() {
                    Y = Z(A)[Symbol.asyncIterator]()
                },
                async pull(W) {
                    let {
                        value: J,
                        done: X
                    } = await Y.next();
                    if (X) queueMicrotask(() => {
                        W.close(), W.byobRequest?.respond(0)
                    });
                    else if (!NOA(Q)) {
                        let V = new Uint8Array(J);
                        if (V.byteLength) W.enqueue(V)
                    }
                    return W.desiredSize > 0
                },
                async cancel(W) {
                    await Y.return()
                },
                type: "bytes"
            })
        }
        return [{
            stream: Q,
            source: D,
            length: G
        }, F]
    }

    function _TQ(A, B = !1) {
        if (A instanceof ReadableStream) L00(!sQ1.isDisturbed(A), "The body has already been consumed."), L00(!A.locked, "The stream is locked.");
        return LOA(A, B)
    }

    function xTQ(A, B) {
        let [Q, Z] = B.stream.tee();
        if (R00) O00.register(A, new WeakRef(Q));
        return B.stream = Q, {
            stream: Z,
            length: B.length,
            source: B.source
        }
    }

    function vTQ(A) {
        if (A.aborted) throw new DOMException("The operation was aborted.", "AbortError")
    }

    function bTQ(A) {
        return {
            blob() {
                return Tn(this, (Q) => {
                    let Z = $OA(this);
                    if (Z === null) Z = "";
                    else if (Z) Z = jTQ(Z);
                    return new TTQ([Q], {
                        type: Z
                    })
                }, A)
            },
            arrayBuffer() {
                return Tn(this, (Q) => {
                    return new Uint8Array(Q).buffer
                }, A)
            },
            text() {
                return Tn(this, qOA, A)
            },
            json() {
                return Tn(this, hTQ, A)
            },
            formData() {
                return Tn(this, (Q) => {
                    let Z = $OA(this);
                    if (Z !== null) switch (Z.essence) {
                        case "multipart/form-data": {
                            let D = kTQ(Q, Z);
                            if (D === "failure") throw new TypeError("Failed to parse body as FormData.");
                            let G = new wOA;
                            return G[Pn] = D, G
                        }
                        case "application/x-www-form-urlencoded": {
                            let D = new URLSearchParams(Q.toString()),
                                G = new wOA;
                            for (let [F, I] of D) G.append(F, I);
                            return G
                        }
                    }
                    throw new TypeError('Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".')
                }, A)
            },
            bytes() {
                return Tn(this, (Q) => {
                    return new Uint8Array(Q)
                }, A)
            }
        }
    }

    function fTQ(A) {
        Object.assign(A.prototype, bTQ(A))
    }
    async function Tn(A, B, Q) {
        if (OTQ.brandCheck(A, Q), MOA(A)) throw new TypeError("Body is unusable: Body has already been read");
        vTQ(A[Pn]);
        let Z = LTQ(),
            D = (F) => Z.reject(F),
            G = (F) => {
                try {
                    Z.resolve(B(F))
                } catch (I) {
                    D(I)
                }
            };
        if (A[Pn].body == null) return G(Buffer.allocUnsafe(0)), Z.promise;
        return await MTQ(A[Pn].body, G, D), Z.promise
    }

    function MOA(A) {
        let B = A[Pn].body;
        return B != null && (B.stream.locked || sQ1.isDisturbed(B.stream))
    }

    function hTQ(A) {
        return JSON.parse(qOA(A))
    }

    function $OA(A) {
        let B = A[Pn].headersList,
            Q = RTQ(B);
        if (Q === "failure") return null;
        return Q
    }
    ROA.exports = {
        extractBody: LOA,
        safelyExtractBody: _TQ,
        cloneBody: xTQ,
        mixinBody: fTQ,
        streamRegistry: O00,
        hasFinalizationRegistry: R00,
        bodyUnusable: MOA
    }
});