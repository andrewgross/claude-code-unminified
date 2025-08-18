/* chunk:556 bytes:[12989609, 13008245) size:18636 source:unpacked-cli.js */
async function wGB(A, B, Q, Z) {
    YGB().then(A);
    let D = H0().autoInstallIdeExtension ?? !0;
    if (process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL !== "true" && D) {
        let G = B ?? qz0();
        if (G) Nz0(G).then(async (F) => {
            Yb6(G).catch((I) => {
                return {
                    installed: !1,
                    error: I.message || "Installation failed",
                    installedVersion: null,
                    ideType: G
                }
            }).then((I) => {
                if (Z(I), I?.installed) YGB().then(A);
                if (!F && I?.installed === !0 && !zz0()) Q()
            })
        })
    }
}
var $GB = EA(async (A, B) => {
    if (process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE) return process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE;
    if (L9() !== "wsl" || !A) return "127.0.0.1";
    try {
        let Z = Ab6("ip route show | grep -i default", {
            encoding: "utf8"
        }).match(/default via (\d+\.\d+\.\d+\.\d+)/);
        if (Z) {
            let D = Z[1];
            if (await Uz0(D, B)) return D
        }
    } catch (Q) {}
    return "127.0.0.1"
});

function Cb6(A) {
    let B = A,
        Q = "",
        Z = 0,
        D = 10;
    while (B !== Q && Z < D) Q = B, B = B.normalize("NFKC"), B = B.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu, ""), B = B.replace(/[\u200B-\u200F]/g, "").replace(/[\u202A-\u202E]/g, "").replace(/[\u2066-\u2069]/g, "").replace(/[\uFEFF]/g, "").replace(/[\uE000-\uF8FF]/g, ""), Z++;
    if (Z >= D) throw new Error(`Unicode sanitization reached maximum iterations (${D}) for input: ${A.slice(0,100)}`);
    return B
}

function ne(A) {
    if (typeof A === "string") return Cb6(A);
    if (Array.isArray(A)) return A.map(ne);
    if (A !== null && typeof A === "object") {
        let B = {};
        for (let [Q, Z] of Object.entries(A)) B[ne(Q)] = ne(Z);
        return B
    }
    return A
}
var RYB = G1(wFB(), 1),
    OYB = G1(_G0(), 1),
    TYB = G1(vz0(), 1),
    PYB = G1(fz0(), 1),
    SYB = G1(MYB(), 1);
import eg6 from "assert";
var jYB = async (A, B) => {
    eg6(A.method, "Expected request method property to be set");
    let Q = OYB.fromNodeProviderChain({
            clientConfig: {
                requestHandler: new TYB.FetchHttpHandler({
                    requestInit: (W) => {
                        return {
                            ...W,
                            ...B.fetchOptions
                        }
                    }
                })
            }
        }),
        Z = await Au6(() => {
            if (B.awsAccessKey) process.env.AWS_ACCESS_KEY_ID = B.awsAccessKey;
            if (B.awsSecretKey) process.env.AWS_SECRET_ACCESS_KEY = B.awsSecretKey;
            if (B.awsSessionToken) process.env.AWS_SESSION_TOKEN = B.awsSessionToken
        }, () => Q()),
        D = new SYB.SignatureV4({
            service: "bedrock",
            region: B.regionName,
            credentials: Z,
            sha256: RYB.Sha256
        }),
        G = new URL(B.url),
        F = !A.headers ? {} : (Symbol.iterator in A.headers) ? Object.fromEntries(Array.from(A.headers).map((W) => [...W])) : {
            ...A.headers
        };
    delete F.connection, F.host = G.hostname;
    let I = new PYB.HttpRequest({
        method: A.method.toUpperCase(),
        protocol: G.protocol,
        path: G.pathname,
        headers: F,
        body: A.body
    });
    return (await D.sign(I)).headers
}, Au6 = async (A, B) => {
    let Q = {
        ...process.env
    };
    try {
        return A(), await B()
    } finally {
        process.env = Q
    }
};
var KEB = G1(aWB(), 1),
    Kx1 = G1(IE0(), 1),
    HEB = G1(vz0(), 1);
var W7 = G1(fXB(), 1),
    Zv = G1(WEB(), 1),
    qt6 = async (A, B) => {
        let Q = W7.map({}),
            Z = A.body,
            D = W7.take(Z, {
                message: W7.expectString
            });
        Object.assign(Q, D);
        let G = new Zv.InternalServerException({
            $metadata: Vx1(A),
            ...Q
        });
        return W7.decorateServiceException(G, A.body)
    }, Nt6 = async (A, B) => {
        let Q = W7.map({}),
            Z = A.body,
            D = W7.take(Z, {
                message: W7.expectString,
                originalMessage: W7.expectString,
                originalStatusCode: W7.expectInt32
            });
        Object.assign(Q, D);
        let G = new Zv.ModelStreamErrorException({
            $metadata: Vx1(A),
            ...Q
        });
        return W7.decorateServiceException(G, A.body)
    }, Lt6 = async (A, B) => {
        let Q = W7.map({}),
            Z = A.body,
            D = W7.take(Z, {
                message: W7.expectString
            });
        Object.assign(Q, D);
        let G = new Zv.ThrottlingException({
            $metadata: Vx1(A),
            ...Q
        });
        return W7.decorateServiceException(G, A.body)
    }, Mt6 = async (A, B) => {
        let Q = W7.map({}),
            Z = A.body,
            D = W7.take(Z, {
                message: W7.expectString
            });
        Object.assign(Q, D);
        let G = new Zv.ValidationException({
            $metadata: Vx1(A),
            ...Q
        });
        return W7.decorateServiceException(G, A.body)
    }, JEB = (A, B) => {
        return B.eventStreamMarshaller.deserialize(A, async (Q) => {
            if (Q.chunk != null) return {
                chunk: await Tt6(Q.chunk, B)
            };
            if (Q.internalServerException != null) return {
                internalServerException: await Rt6(Q.internalServerException, B)
            };
            if (Q.modelStreamErrorException != null) return {
                modelStreamErrorException: await Ot6(Q.modelStreamErrorException, B)
            };
            if (Q.validationException != null) return {
                validationException: await St6(Q.validationException, B)
            };
            if (Q.throttlingException != null) return {
                throttlingException: await Pt6(Q.throttlingException, B)
            };
            return {
                $unknown: A
            }
        })
    }, Rt6 = async (A, B) => {
        let Q = {
            ...A,
            body: await bD1(A.body, B)
        };
        return qt6(Q, B)
    }, Ot6 = async (A, B) => {
        let Q = {
            ...A,
            body: await bD1(A.body, B)
        };
        return Nt6(Q, B)
    }, Tt6 = async (A, B) => {
        let Q = {},
            Z = await bD1(A.body, B);
        return Object.assign(Q, jt6(Z, B)), Q
    }, Pt6 = async (A, B) => {
        let Q = {
            ...A,
            body: await bD1(A.body, B)
        };
        return Lt6(Q, B)
    }, St6 = async (A, B) => {
        let Q = {
            ...A,
            body: await bD1(A.body, B)
        };
        return Mt6(Q, B)
    }, jt6 = (A, B) => {
        return W7.take(A, {
            bytes: B.base64Decoder
        })
    }, Vx1 = (A) => ({
        httpStatusCode: A.statusCode,
        requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"] ?? "",
        extendedRequestId: A.headers["x-amz-id-2"] ?? "",
        cfId: A.headers["x-amz-cf-id"] ?? ""
    }), kt6 = (A, B) => W7.collectBody(A, B).then((Q) => B.utf8Encoder(Q)), bD1 = (A, B) => kt6(A, B).then((Q) => {
        if (Q.length) return JSON.parse(Q);
        return {}
    });

function XEB(A) {
    if (A[Symbol.asyncIterator]) return A;
    let B = A.getReader();
    return {
        async next() {
            try {
                let Q = await B.read();
                if (Q?.done) B.releaseLock();
                return Q
            } catch (Q) {
                throw B.releaseLock(), Q
            }
        },
        async return () {
            let Q = B.cancel();
            return B.releaseLock(), await Q, {
                done: !0,
                value: void 0
            }
        },
        [Symbol.asyncIterator]() {
            return this
        }
    }
}
var jU0 = (A) => (jU0 = Array.isArray, jU0(A)),
    kU0 = jU0;

function Cx1(A) {
    return A != null && typeof A === "object" && !Array.isArray(A)
}
var VEB = (A) => {
    try {
        return JSON.parse(A)
    } catch (B) {
        return
    }
};
var yU0 = (A) => new TextDecoder("utf-8").decode(A),
    CEB = (A) => new TextEncoder().encode(A),
    yt6 = () => {
        let A = new KEB.EventStreamMarshaller({
            utf8Encoder: yU0,
            utf8Decoder: CEB
        });
        return {
            base64Decoder: Kx1.fromBase64,
            base64Encoder: Kx1.toBase64,
            utf8Decoder: CEB,
            utf8Encoder: yU0,
            eventStreamMarshaller: A,
            streamCollector: HEB.streamCollector
        }
    };
class Hx1 extends XX {
    static fromSSEResponse(A, B) {
        let Q = !1;
        async function* Z() {
            if (!A.body) throw B.abort(), new P9("Attempted to iterate over a response with no body");
            let G = XEB(A.body),
                F = JEB(G, yt6());
            for await (let I of F) if (I.chunk && I.chunk.bytes) yield {
                event: "chunk",
                data: yU0(I.chunk.bytes),
                raw: []
            };
            else if (I.internalServerException) yield {
                event: "error",
                data: "InternalServerException",
                raw: []
            };
            else if (I.modelStreamErrorException) yield {
                event: "error",
                data: "ModelStreamErrorException",
                raw: []
            };
            else if (I.validationException) yield {
                event: "error",
                data: "ValidationException",
                raw: []
            };
            else if (I.throttlingException) yield {
                event: "error",
                data: "ThrottlingException",
                raw: []
            }
        }
        async function* D() {
            if (Q) throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            Q = !0;
            let G = !1;
            try {
                for await (let F of Z()) {
                    if (F.event === "chunk") try {
                        yield JSON.parse(F.data)
                    } catch (I) {
                        throw console.error("Could not parse message into JSON:", F.data), console.error("From chunk:", F.raw), I
                    }
                    if (F.event === "error") {
                        let I = F.data,
                            Y = VEB(I),
                            W = Y ? void 0 : I;
                        throw D6.generate(void 0, Y, W, A.headers)
                    }
                }
                G = !0
            } catch (F) {
                if (_t6(F)) return;
                throw F
            } finally {
                if (!G) B.abort()
            }
        }
        return new Hx1(D, B)
    }
}

function _t6(A) {
    return typeof A === "object" && A !== null && (("name" in A) && A.name === "AbortError" || ("message" in A) && String(A.message).includes("FetchRequestCanceledException"))
}
var _U0 = (A) => {
    if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
    if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
    return
};
var zEB = Symbol.for("brand.privateNullableHeaders");

function* xt6(A) {
    if (!A) return;
    if (zEB in A) {
        let {
            values: Z,
            nulls: D
        } = A;
        yield* Z.entries();
        for (let G of D) yield [G, null];
        return
    }
    let B = !1,
        Q;
    if (A instanceof Headers) Q = A.entries();
    else if (kU0(A)) Q = A;
    else B = !0, Q = Object.entries(A ?? {});
    for (let Z of Q) {
        let D = Z[0];
        if (typeof D !== "string") throw new TypeError("expected header name to be a string");
        let G = kU0(Z[1]) ? Z[1] : [Z[1]],
            F = !1;
        for (let I of G) {
            if (I === void 0) continue;
            if (B && !F) F = !0, yield [D, null];
            yield [D, I]
        }
    }
}
var xU0 = (A) => {
    let B = new Headers,
        Q = new Set;
    for (let Z of A) {
        let D = new Set;
        for (let [G, F] of xt6(Z)) {
            let I = G.toLowerCase();
            if (!D.has(I)) B.delete(G), D.add(I);
            if (F === null) B.delete(G), Q.add(I);
            else B.append(G, F), Q.delete(I)
        }
    }
    return {
        [zEB]: !0,
        values: B,
        nulls: Q
    }
};

function UEB(A) {
    return A.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent)
}
var EEB = Object.freeze(Object.create(null)),
    vt6 = (A = UEB) => function B(Q, ...Z) {
        if (Q.length === 1) return Q[0];
        let D = !1,
            G = [],
            F = Q.reduce((J, X, V) => {
                if (/[?#]/.test(X)) D = !0;
                let C = Z[V],
                    K = (D ? encodeURIComponent : A)("" + C);
                if (V !== Z.length && (C == null || typeof C === "object" && C.toString === Object.getPrototypeOf(Object.getPrototypeOf(C.hasOwnProperty ?? EEB) ?? EEB)?.toString)) K = C + "", G.push({
                    start: J.length + X.length,
                    length: K.length,
                    error: `Value of type ${Object.prototype.toString.call(C).slice(8,-1)} is not a valid path parameter`
                });
                return J + X + (V === Z.length ? "" : K)
            }, ""),
            I = F.split(/[?#]/, 1)[0],
            Y = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
            W;
        while ((W = Y.exec(I)) !== null) G.push({
            start: W.index,
            length: W[0].length,
            error: `Value "${W[0]}" can't be safely passed as a path parameter`
        });
        if (G.sort((J, X) => J.start - X.start), G.length > 0) {
            let J = 0,
                X = G.reduce((V, C) => {
                    let K = " ".repeat(C.start - J),
                        H = "^".repeat(C.length);
                    return J = C.start + C.length, V + K + H
                }, "");
            throw new P9(`Path parameters result in path with invalid segments:
${G.map((V)=>V.error).join(`
`)}
${F}
${X}`)
        }
        return F
    },
    vU0 = vt6(UEB);
var bt6 = "bedrock-2023-05-31",
    ft6 = new Set(["/v1/complete", "/v1/messages", "/v1/messages?beta=true"]);
class zx1 extends H3 {
    constructor({
        awsRegion: A = _U0("AWS_REGION") ?? "us-east-1",
        baseURL: B = _U0("ANTHROPIC_BEDROCK_BASE_URL") ?? `https://bedrock-runtime.${A}.amazonaws.com`,
        awsSecretKey: Q = null,
        awsAccessKey: Z = null,
        awsSessionToken: D = null,
        ...G
    } = {}) {
        super({
            baseURL: B,
            ...G
        });
        this.skipAuth = !1, this.messages = ht6(this), this.completions = new mx(this), this.beta = gt6(this), this.awsSecretKey = Q, this.awsAccessKey = Z, this.awsRegion = A, this.awsSessionToken = D, this.skipAuth = G.skipAuth ?? !1
    }
    validateHeaders() {}
    async prepareRequest(A, {
        url: B,
        options: Q
    }) {
        if (this.skipAuth) return;
        let Z = this.awsRegion;
        if (!Z) throw new Error("Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present");
        let D = await jYB(A, {
            url: B,
            regionName: Z,
            awsAccessKey: this.awsAccessKey,
            awsSecretKey: this.awsSecretKey,
            awsSessionToken: this.awsSessionToken,
            fetchOptions: this.fetchOptions
        });
        A.headers = xU0([D, A.headers]).values
    }
    buildRequest(A) {
        if (A.__streamClass = Hx1, Cx1(A.body)) A.body = {
            ...A.body
        };
        if (Cx1(A.body)) {
            if (!A.body.anthropic_version) A.body.anthropic_version = bt6;
            if (A.headers && !A.body.anthropic_beta) {
                let B = xU0([A.headers]).values.get("anthropic-beta");
                if (B != null) A.body.anthropic_beta = B.split(",")
            }
        }
        if (ft6.has(A.path) && A.method === "post") {
            if (!Cx1(A.body)) throw new Error("Expected request body to be an object for post /v1/messages");
            let B = A.body.model;
            A.body.model = void 0;
            let Q = A.body.stream;
            if (A.body.stream = void 0, Q) A.path = vU0`/model/${B}/invoke-with-response-stream`;
            else A.path = vU0`/model/${B}/invoke`
        }
        return super.buildRequest(A)
    }
}

function ht6(A) {
    let B = new w$(A);
    return delete B.batches, delete B.countTokens, B
}

function gt6(A) {
    let B = new iK(A);
    return delete B.promptCaching, delete B.messages.batches, delete B.messages.countTokens, B
}
var MLB = G1(qLB(), 1);
var Gv1 = (A) => {
    if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
    if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
    return
};
var h$0 = (A) => (h$0 = Array.isArray, h$0(A)),
    g$0 = h$0;

function Fv1(A) {
    return A != null && typeof A === "object" && !Array.isArray(A)
}
var NLB = Symbol.for("brand.privateNullableHeaders");

function* z48(A) {
    if (!A) return;
    if (NLB in A) {
        let {
            values: Z,
            nulls: D
        } = A;
        yield* Z.entries();
        for (let G of D) yield [G, null];
        return
    }
    let B = !1,
        Q;
    if (A instanceof Headers) Q = A.entries();
    else if (g$0(A)) Q = A;
    else B = !0, Q = Object.entries(A ?? {});
    for (let Z of Q) {
        let D = Z[0];
        if (typeof D !== "string") throw new TypeError("expected header name to be a string");
        let G = g$0(Z[1]) ? Z[1] : [Z[1]],
            F = !1;
        for (let I of G) {
            if (I === void 0) continue;
            if (B && !F) F = !0, yield [D, null];
            yield [D, I]
        }
    }
}
var LLB = (A) => {
    let B = new Headers,
        Q = new Set;
    for (let Z of A) {
        let D = new Set;
        for (let [G, F] of z48(Z)) {
            let I = G.toLowerCase();
            if (!D.has(I)) B.delete(G), D.add(I);
            if (F === null) B.delete(G), Q.add(I);
            else B.append(G, F), Q.delete(I)
        }
    }
    return {
        [NLB]: !0,
        values: B,
        nulls: Q
    }
};
var E48 = "vertex-2023-10-16",
    U48 = new Set(["/v1/messages", "/v1/messages?beta=true"]);