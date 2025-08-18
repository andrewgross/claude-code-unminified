/* chunk:499 bytes:[11909719, 11929541) size:19822 source:unpacked-cli.js */
import Dk9 from "util";
import {
    Readable as Gk9
} from "stream";
var {
    asyncIterator: Hs0
} = Symbol, Zk9 = async function*(A) {
    if (A.stream) yield* A.stream();
    else if (A.arrayBuffer) yield await A.arrayBuffer();
    else if (A[Hs0]) yield* A[Hs0]();
    else yield A
}, kV1 = Zk9;
var Fk9 = l8.ALPHABET.ALPHA_DIGIT + "-_",
    nB1 = typeof TextEncoder === "function" ? new TextEncoder : new Dk9.TextEncoder,
    Fk = `\r
`,
    Ik9 = nB1.encode(Fk),
    Yk9 = 2;
class zs0 {
    constructor(A, B) {
        let {
            escapeName: Q
        } = this.constructor, Z = O0.isString(B), D = `Content-Disposition: form-data; name="${Q(A)}"${!Z&&B.name?`; filename="${Q(B.name)}"`:""}${Fk}`;
        if (Z) B = nB1.encode(String(B).replace(/\r?\n|\r\n?/g, Fk));
        else D += `Content-Type: ${B.type||"application/octet-stream"}${Fk}`;
        this.headers = nB1.encode(D + Fk), this.contentLength = Z ? B.byteLength : B.size, this.size = this.headers.byteLength + this.contentLength + Yk9, this.name = A, this.value = B
    }
    async * encode() {
        yield this.headers;
        let {
            value: A
        } = this;
        if (O0.isTypedArray(A)) yield A;
        else yield* kV1(A);
        yield Ik9
    }
    static escapeName(A) {
        return String(A).replace(/[\r\n"]/g, (B) => ({
            "\r": "%0D",
            "\n": "%0A",
            '"': "%22"
        })[B])
    }
}
var Wk9 = (A, B, Q) => {
        let {
            tag: Z = "form-data-boundary",
            size: D = 25,
            boundary: G = Z + "-" + l8.generateString(D, Fk9)
        } = Q || {};
        if (!O0.isFormData(A)) throw TypeError("FormData instance required");
        if (G.length < 1 || G.length > 70) throw Error("boundary must be 10-70 characters long");
        let F = nB1.encode("--" + G + Fk),
            I = nB1.encode("--" + G + "--" + Fk + Fk),
            Y = I.byteLength,
            W = Array.from(A.entries()).map(([X, V]) => {
                let C = new zs0(X, V);
                return Y += C.size, C
            });
        Y += F.byteLength * W.length, Y = O0.toFiniteNumber(Y);
        let J = {
            "Content-Type": `multipart/form-data; boundary=${G}`
        };
        if (Number.isFinite(Y)) J["Content-Length"] = Y;
        return B && B(J), Gk9.from(async function*() {
            for (let X of W) yield F, yield* X.encode();
            yield I
        }())
    },
    Es0 = Wk9;
import Jk9 from "stream";
class Us0 extends Jk9.Transform {
    __transform(A, B, Q) {
        this.push(A), Q()
    }
    _transform(A, B, Q) {
        if (A.length !== 0) {
            if (this._transform = this.__transform, A[0] !== 120) {
                let Z = Buffer.alloc(2);
                Z[0] = 120, Z[1] = 156, this.push(Z, B)
            }
        }
        this.__transform(A, B, Q)
    }
}
var ws0 = Us0;
var Xk9 = (A, B) => {
        return O0.isAsyncFn(A) ? function(...Q) {
            let Z = Q.pop();
            A.apply(this, Q).then((D) => {
                try {
                    B ? Z(null, ...B(D)) : Z(null, D)
                } catch (G) {
                    Z(G)
                }
            }, Z)
        } : A
    },
    $s0 = Xk9;

function Vk9(A, B) {
    A = A || 10;
    let Q = new Array(A),
        Z = new Array(A),
        D = 0,
        G = 0,
        F;
    return B = B !== void 0 ? B : 1000,
        function I(Y) {
            let W = Date.now(),
                J = Z[G];
            if (!F) F = W;
            Q[D] = Y, Z[D] = W;
            let X = G,
                V = 0;
            while (X !== D) V += Q[X++], X = X % A;
            if (D = (D + 1) % A, D === G) G = (G + 1) % A;
            if (W - F < B) return;
            let C = J && W - J;
            return C ? Math.round(V * 1000 / C) : void 0
        }
}
var qs0 = Vk9;

function Ck9(A, B) {
    let Q = 0,
        Z = 1000 / B,
        D, G, F = (W, J = Date.now()) => {
            if (Q = J, D = null, G) clearTimeout(G), G = null;
            A.apply(null, W)
        };
    return [(...W) => {
        let J = Date.now(),
            X = J - Q;
        if (X >= Z) F(W, J);
        else if (D = W, !G) G = setTimeout(() => {
            G = null, F(D)
        }, Z - X)
    }, () => D && F(D)]
}
var Ns0 = Ck9;
var OO = (A, B, Q = 3) => {
        let Z = 0,
            D = qs0(50, 250);
        return Ns0((G) => {
            let F = G.loaded,
                I = G.lengthComputable ? G.total : void 0,
                Y = F - Z,
                W = D(Y),
                J = F <= I;
            Z = F;
            let X = {
                loaded: F,
                total: I,
                progress: I ? F / I : void 0,
                bytes: Y,
                rate: W ? W : void 0,
                estimated: W && I && J ? (I - F) / W : void 0,
                event: G,
                lengthComputable: I != null,
                [B ? "download" : "upload"]: !0
            };
            A(X)
        }, Q)
    },
    wp = (A, B) => {
        let Q = A != null;
        return [(Z) => B[0]({
            lengthComputable: Q,
            total: A,
            loaded: Z
        }), B[1]]
    },
    $p = (A) => (...B) => O0.asap(() => A(...B));
var Ls0 = {
        flush: Ik.constants.Z_SYNC_FLUSH,
        finishFlush: Ik.constants.Z_SYNC_FLUSH
    },
    Uk9 = {
        flush: Ik.constants.BROTLI_OPERATION_FLUSH,
        finishFlush: Ik.constants.BROTLI_OPERATION_FLUSH
    },
    Ms0 = O0.isFunction(Ik.createBrotliDecompress),
    {
        http: wk9,
        https: $k9
    } = Ss0.default,
    qk9 = /https:?/,
    Rs0 = l8.protocols.map((A) => {
        return A + ":"
    }),
    Os0 = (A, [B, Q]) => {
        return A.on("end", Q).on("error", Q), B
    };

function Nk9(A, B) {
    if (A.beforeRedirects.proxy) A.beforeRedirects.proxy(A);
    if (A.beforeRedirects.config) A.beforeRedirects.config(A, B)
}

function js0(A, B, Q) {
    let Z = B;
    if (!Z && Z !== !1) {
        let D = Ps0.default.getProxyForUrl(Q);
        if (D) Z = new URL(D)
    }
    if (Z) {
        if (Z.username) Z.auth = (Z.username || "") + ":" + (Z.password || "");
        if (Z.auth) {
            if (Z.auth.username || Z.auth.password) Z.auth = (Z.auth.username || "") + ":" + (Z.auth.password || "");
            let G = Buffer.from(Z.auth, "utf8").toString("base64");
            A.headers["Proxy-Authorization"] = "Basic " + G
        }
        A.headers.host = A.hostname + (A.port ? ":" + A.port : "");
        let D = Z.hostname || Z.host;
        if (A.hostname = D, A.host = D, A.port = Z.port, A.path = Q, Z.protocol) A.protocol = Z.protocol.includes(":") ? Z.protocol : `${Z.protocol}:`
    }
    A.beforeRedirects.proxy = function D(G) {
        js0(G, B, G.href)
    }
}
var Lk9 = typeof process !== "undefined" && O0.kindOf(process) === "process",
    Mk9 = (A) => {
        return new Promise((B, Q) => {
            let Z, D, G = (Y, W) => {
                    if (D) return;
                    D = !0, Z && Z(Y, W)
                },
                F = (Y) => {
                    G(Y), B(Y)
                },
                I = (Y) => {
                    G(Y, !0), Q(Y)
                };
            A(F, I, (Y) => Z = Y).catch(I)
        })
    },
    Rk9 = ({
        address: A,
        family: B
    }) => {
        if (!O0.isString(A)) throw TypeError("address must be a string");
        return {
            address: A,
            family: B || (A.indexOf(".") < 0 ? 6 : 4)
        }
    },
    Ts0 = (A, B) => Rk9(O0.isObject(A) ? A : {
        address: A,
        family: B
    }),
    ks0 = Lk9 && function A(B) {
        return Mk9(async function Q(Z, D, G) {
            let {
                data: F,
                lookup: I,
                family: Y
            } = B, {
                responseType: W,
                responseEncoding: J
            } = B, X = B.method.toUpperCase(), V, C = !1, K;
            if (I) {
                let C1 = $s0(I, (_1) => O0.isArray(_1) ? _1 : [_1]);
                I = (_1, F0, W0) => {
                    C1(_1, F0, (g1, w1, Q1) => {
                        if (g1) return W0(g1);
                        let k1 = O0.isArray(w1) ? w1.map((H1) => Ts0(H1)) : [Ts0(w1, Q1)];
                        F0.all ? W0(g1, k1) : W0(g1, k1[0].address, k1[0].family)
                    })
                }
            }
            let H = new Ek9,
                z = () => {
                    if (B.cancelToken) B.cancelToken.unsubscribe($);
                    if (B.signal) B.signal.removeEventListener("abort", $);
                    H.removeAllListeners()
                };
            G((C1, _1) => {
                if (V = !0, _1) C = !0, z()
            });

            function $(C1) {
                H.emit("abort", !C1 || C1.type ? new nC(null, B, K) : C1)
            }
            if (H.once("abort", D), B.cancelToken || B.signal) {
                if (B.cancelToken && B.cancelToken.subscribe($), B.signal) B.signal.aborted ? $() : B.signal.addEventListener("abort", $)
            }
            let L = ef(B.baseURL, B.url, B.allowAbsoluteUrls),
                N = new URL(L, l8.hasBrowserEnv ? l8.origin : void 0),
                R = N.protocol || Rs0[0];
            if (R === "data:") {
                let C1;
                if (X !== "GET") return XN(Z, D, {
                    status: 405,
                    statusText: "method not allowed",
                    headers: {},
                    config: B
                });
                try {
                    C1 = Ji1(B.url, W === "blob", {
                        Blob: B.env && B.env.Blob
                    })
                } catch (_1) {
                    throw c2.from(_1, c2.ERR_BAD_REQUEST, B)
                }
                if (W === "text") {
                    if (C1 = C1.toString(J), !J || J === "utf8") C1 = O0.stripBOM(C1)
                } else if (W === "stream") C1 = qp.Readable.from(C1);
                return XN(Z, D, {
                    data: C1,
                    status: 200,
                    statusText: "OK",
                    headers: new uZ,
                    config: B
                })
            }
            if (Rs0.indexOf(R) === -1) return D(new c2("Unsupported protocol " + R, c2.ERR_BAD_REQUEST, B));
            let O = uZ.from(B.headers).normalize();
            O.set("User-Agent", "axios/" + Dh, !1);
            let {
                onUploadProgress: P,
                onDownloadProgress: j
            } = B, f = B.maxRate, k = void 0, c = void 0;
            if (O0.isSpecCompliantForm(F)) {
                let C1 = O.getContentType(/boundary=([-_\w\d]{10,70})/i);
                F = Es0(F, (_1) => {
                    O.set(_1)
                }, {
                    tag: `axios-${Dh}-boundary`,
                    boundary: C1 && C1[1] || void 0
                })
            } else if (O0.isFormData(F) && O0.isFunction(F.getHeaders)) {
                if (O.set(F.getHeaders()), !O.hasContentLength()) try {
                    let C1 = await zk9.promisify(F.getLength).call(F);
                    Number.isFinite(C1) && C1 >= 0 && O.setContentLength(C1)
                } catch (C1) {}
            } else if (O0.isBlob(F) || O0.isFile(F)) F.size && O.setContentType(F.type || "application/octet-stream"), O.setContentLength(F.size || 0), F = qp.Readable.from(kV1(F));
            else if (F && !O0.isStream(F)) {
                if (Buffer.isBuffer(F));
                else if (O0.isArrayBuffer(F)) F = Buffer.from(new Uint8Array(F));
                else if (O0.isString(F)) F = Buffer.from(F, "utf-8");
                else return D(new c2("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", c2.ERR_BAD_REQUEST, B));
                if (O.setContentLength(F.length, !1), B.maxBodyLength > -1 && F.length > B.maxBodyLength) return D(new c2("Request body larger than maxBodyLength limit", c2.ERR_BAD_REQUEST, B))
            }
            let u = O0.toFiniteNumber(O.getContentLength());
            if (O0.isArray(f)) k = f[0], c = f[1];
            else k = c = f;
            if (F && (P || k)) {
                if (!O0.isStream(F)) F = qp.Readable.from(F, {
                    objectMode: !1
                });
                F = qp.pipeline([F, new Vi1({
                    maxRate: O0.toFiniteNumber(k)
                })], O0.noop), P && F.on("progress", Os0(F, wp(u, OO($p(P), !1, 3))))
            }
            let a = void 0;
            if (B.auth) {
                let C1 = B.auth.username || "",
                    _1 = B.auth.password || "";
                a = C1 + ":" + _1
            }
            if (!a && N.username) {
                let {
                    username: C1,
                    password: _1
                } = N;
                a = C1 + ":" + _1
            }
            a && O.delete("authorization");
            let l;
            try {
                l = tf(N.pathname + N.search, B.params, B.paramsSerializer).replace(/^\?/, "")
            } catch (C1) {
                let _1 = new Error(C1.message);
                return _1.config = B, _1.url = B.url, _1.exists = !0, D(_1)
            }
            O.set("Accept-Encoding", "gzip, compress, deflate" + (Ms0 ? ", br" : ""), !1);
            let y = {
                path: l,
                method: X,
                headers: O.toJSON(),
                agents: {
                    http: B.httpAgent,
                    https: B.httpsAgent
                },
                auth: a,
                protocol: R,
                family: Y,
                beforeRedirect: Nk9,
                beforeRedirects: {}
            };
            if (!O0.isUndefined(I) && (y.lookup = I), B.socketPath) y.socketPath = B.socketPath;
            else y.hostname = N.hostname.startsWith("[") ? N.hostname.slice(1, -1) : N.hostname, y.port = N.port, js0(y, B.proxy, R + "//" + N.hostname + (N.port ? ":" + N.port : "") + y.path);
            let t, E1 = qk9.test(y.protocol);
            if (y.agent = E1 ? B.httpsAgent : B.httpAgent, B.transport) t = B.transport;
            else if (B.maxRedirects === 0) t = E1 ? Hk9 : Kk9;
            else {
                if (B.maxRedirects) y.maxRedirects = B.maxRedirects;
                if (B.beforeRedirect) y.beforeRedirects.config = B.beforeRedirect;
                t = E1 ? $k9 : wk9
            }
            if (B.maxBodyLength > -1) y.maxBodyLength = B.maxBodyLength;
            else y.maxBodyLength = 1 / 0;
            if (B.insecureHTTPParser) y.insecureHTTPParser = B.insecureHTTPParser;
            if (K = t.request(y, function C1(_1) {
                    if (K.destroyed) return;
                    let F0 = [_1],
                        W0 = +_1.headers["content-length"];
                    if (j || c) {
                        let H1 = new Vi1({
                            maxRate: O0.toFiniteNumber(c)
                        });
                        j && H1.on("progress", Os0(H1, wp(W0, OO($p(j), !0, 3)))), F0.push(H1)
                    }
                    let g1 = _1,
                        w1 = _1.req || K;
                    if (B.decompress !== !1 && _1.headers["content-encoding"]) {
                        if (X === "HEAD" || _1.statusCode === 204) delete _1.headers["content-encoding"];
                        switch ((_1.headers["content-encoding"] || "").toLowerCase()) {
                            case "gzip":
                            case "x-gzip":
                            case "compress":
                            case "x-compress":
                                F0.push(Ik.createUnzip(Ls0)), delete _1.headers["content-encoding"];
                                break;
                            case "deflate":
                                F0.push(new ws0), F0.push(Ik.createUnzip(Ls0)), delete _1.headers["content-encoding"];
                                break;
                            case "br":
                                if (Ms0) F0.push(Ik.createBrotliDecompress(Uk9)), delete _1.headers["content-encoding"]
                        }
                    }
                    g1 = F0.length > 1 ? qp.pipeline(F0, O0.noop) : F0[0];
                    let Q1 = qp.finished(g1, () => {
                            Q1(), z()
                        }),
                        k1 = {
                            status: _1.statusCode,
                            statusText: _1.statusMessage,
                            headers: new uZ(_1.headers),
                            config: B,
                            request: w1
                        };
                    if (W === "stream") k1.data = g1, XN(Z, D, k1);
                    else {
                        let H1 = [],
                            A0 = 0;
                        g1.on("data", function V0(o1) {
                            if (H1.push(o1), A0 += o1.length, B.maxContentLength > -1 && A0 > B.maxContentLength) C = !0, g1.destroy(), D(new c2("maxContentLength size of " + B.maxContentLength + " exceeded", c2.ERR_BAD_RESPONSE, B, w1))
                        }), g1.on("aborted", function V0() {
                            if (C) return;
                            let o1 = new c2("stream has been aborted", c2.ERR_BAD_RESPONSE, B, w1);
                            g1.destroy(o1), D(o1)
                        }), g1.on("error", function V0(o1) {
                            if (K.destroyed) return;
                            D(c2.from(o1, null, B, w1))
                        }), g1.on("end", function V0() {
                            try {
                                let o1 = H1.length === 1 ? H1[0] : Buffer.concat(H1);
                                if (W !== "arraybuffer") {
                                    if (o1 = o1.toString(J), !J || J === "utf8") o1 = O0.stripBOM(o1)
                                }
                                k1.data = o1
                            } catch (o1) {
                                return D(c2.from(o1, null, B, k1.request, k1))
                            }
                            XN(Z, D, k1)
                        })
                    }
                    H.once("abort", (H1) => {
                        if (!g1.destroyed) g1.emit("error", H1), g1.destroy()
                    })
                }), H.once("abort", (C1) => {
                    D(C1), K.destroy(C1)
                }), K.on("error", function C1(_1) {
                    D(c2.from(_1, null, B, K))
                }), K.on("socket", function C1(_1) {
                    _1.setKeepAlive(!0, 60000)
                }), B.timeout) {
                let C1 = parseInt(B.timeout, 10);
                if (Number.isNaN(C1)) {
                    D(new c2("error trying to parse `config.timeout` to int", c2.ERR_BAD_OPTION_VALUE, B, K));
                    return
                }
                K.setTimeout(C1, function _1() {
                    if (V) return;
                    let F0 = B.timeout ? "timeout of " + B.timeout + "ms exceeded" : "timeout exceeded",
                        W0 = B.transitional || Cp;
                    if (B.timeoutErrorMessage) F0 = B.timeoutErrorMessage;
                    D(new c2(F0, W0.clarifyTimeoutError ? c2.ETIMEDOUT : c2.ECONNABORTED, B, K)), $()
                })
            }
            if (O0.isStream(F)) {
                let C1 = !1,
                    _1 = !1;
                F.on("end", () => {
                    C1 = !0
                }), F.once("error", (F0) => {
                    _1 = !0, K.destroy(F0)
                }), F.on("close", () => {
                    if (!C1 && !_1) $(new nC("Request stream has been aborted", B, K))
                }), F.pipe(K)
            } else K.end(F)
        })
    };