/* chunk:500 bytes:[11929542, 11947711) size:18169 source:unpacked-cli.js */
var ys0 = l8.hasStandardBrowserEnv ? ((A, B) => (Q) => {
    return Q = new URL(Q, l8.origin), A.protocol === Q.protocol && A.host === Q.host && (B || A.port === Q.port)
})(new URL(l8.origin), l8.navigator && /(msie|trident)/i.test(l8.navigator.userAgent)) : () => !0;
var _s0 = l8.hasStandardBrowserEnv ? {
    write(A, B, Q, Z, D, G) {
        let F = [A + "=" + encodeURIComponent(B)];
        O0.isNumber(Q) && F.push("expires=" + new Date(Q).toGMTString()), O0.isString(Z) && F.push("path=" + Z), O0.isString(D) && F.push("domain=" + D), G === !0 && F.push("secure"), document.cookie = F.join("; ")
    },
    read(A) {
        let B = document.cookie.match(new RegExp("(^|;\\s*)(" + A + ")=([^;]*)"));
        return B ? decodeURIComponent(B[3]) : null
    },
    remove(A) {
        this.write(A, "", Date.now() - 86400000)
    }
} : {
    write() {},
    read() {
        return null
    },
    remove() {}
};
var xs0 = (A) => A instanceof uZ ? {
    ...A
} : A;

function Ww(A, B) {
    B = B || {};
    let Q = {};

    function Z(W, J, X, V) {
        if (O0.isPlainObject(W) && O0.isPlainObject(J)) return O0.merge.call({
            caseless: V
        }, W, J);
        else if (O0.isPlainObject(J)) return O0.merge({}, J);
        else if (O0.isArray(J)) return J.slice();
        return J
    }

    function D(W, J, X, V) {
        if (!O0.isUndefined(J)) return Z(W, J, X, V);
        else if (!O0.isUndefined(W)) return Z(void 0, W, X, V)
    }

    function G(W, J) {
        if (!O0.isUndefined(J)) return Z(void 0, J)
    }

    function F(W, J) {
        if (!O0.isUndefined(J)) return Z(void 0, J);
        else if (!O0.isUndefined(W)) return Z(void 0, W)
    }

    function I(W, J, X) {
        if (X in B) return Z(W, J);
        else if (X in A) return Z(void 0, W)
    }
    let Y = {
        url: G,
        method: G,
        data: G,
        baseURL: F,
        transformRequest: F,
        transformResponse: F,
        paramsSerializer: F,
        timeout: F,
        timeoutMessage: F,
        withCredentials: F,
        withXSRFToken: F,
        adapter: F,
        responseType: F,
        xsrfCookieName: F,
        xsrfHeaderName: F,
        onUploadProgress: F,
        onDownloadProgress: F,
        decompress: F,
        maxContentLength: F,
        maxBodyLength: F,
        beforeRedirect: F,
        transport: F,
        httpAgent: F,
        httpsAgent: F,
        cancelToken: F,
        socketPath: F,
        responseEncoding: F,
        validateStatus: I,
        headers: (W, J, X) => D(xs0(W), xs0(J), X, !0)
    };
    return O0.forEach(Object.keys(Object.assign({}, A, B)), function W(J) {
        let X = Y[J] || D,
            V = X(A[J], B[J], J);
        O0.isUndefined(V) && X !== I || (Q[J] = V)
    }), Q
}
var yV1 = (A) => {
    let B = Ww({}, A),
        {
            data: Q,
            withXSRFToken: Z,
            xsrfHeaderName: D,
            xsrfCookieName: G,
            headers: F,
            auth: I
        } = B;
    if (B.headers = F = uZ.from(F), B.url = tf(ef(B.baseURL, B.url, B.allowAbsoluteUrls), A.params, A.paramsSerializer), I) F.set("Authorization", "Basic " + btoa((I.username || "") + ":" + (I.password ? unescape(encodeURIComponent(I.password)) : "")));
    let Y;
    if (O0.isFormData(Q)) {
        if (l8.hasStandardBrowserEnv || l8.hasStandardBrowserWebWorkerEnv) F.setContentType(void 0);
        else if ((Y = F.getContentType()) !== !1) {
            let [W, ...J] = Y ? Y.split(";").map((X) => X.trim()).filter(Boolean) : [];
            F.setContentType([W || "multipart/form-data", ...J].join("; "))
        }
    }
    if (l8.hasStandardBrowserEnv) {
        if (Z && O0.isFunction(Z) && (Z = Z(B)), Z || Z !== !1 && ys0(B.url)) {
            let W = D && G && _s0.read(G);
            if (W) F.set(D, W)
        }
    }
    return B
};
var Ok9 = typeof XMLHttpRequest !== "undefined",
    vs0 = Ok9 && function(A) {
        return new Promise(function B(Q, Z) {
            let D = yV1(A),
                G = D.data,
                F = uZ.from(D.headers).normalize(),
                {
                    responseType: I,
                    onUploadProgress: Y,
                    onDownloadProgress: W
                } = D,
                J, X, V, C, K;

            function H() {
                C && C(), K && K(), D.cancelToken && D.cancelToken.unsubscribe(J), D.signal && D.signal.removeEventListener("abort", J)
            }
            let z = new XMLHttpRequest;
            z.open(D.method.toUpperCase(), D.url, !0), z.timeout = D.timeout;

            function $() {
                if (!z) return;
                let N = uZ.from("getAllResponseHeaders" in z && z.getAllResponseHeaders()),
                    O = {
                        data: !I || I === "text" || I === "json" ? z.responseText : z.response,
                        status: z.status,
                        statusText: z.statusText,
                        headers: N,
                        config: A,
                        request: z
                    };
                XN(function P(j) {
                    Q(j), H()
                }, function P(j) {
                    Z(j), H()
                }, O), z = null
            }
            if ("onloadend" in z) z.onloadend = $;
            else z.onreadystatechange = function N() {
                if (!z || z.readyState !== 4) return;
                if (z.status === 0 && !(z.responseURL && z.responseURL.indexOf("file:") === 0)) return;
                setTimeout($)
            };
            if (z.onabort = function N() {
                    if (!z) return;
                    Z(new c2("Request aborted", c2.ECONNABORTED, A, z)), z = null
                }, z.onerror = function N() {
                    Z(new c2("Network Error", c2.ERR_NETWORK, A, z)), z = null
                }, z.ontimeout = function N() {
                    let R = D.timeout ? "timeout of " + D.timeout + "ms exceeded" : "timeout exceeded",
                        O = D.transitional || Cp;
                    if (D.timeoutErrorMessage) R = D.timeoutErrorMessage;
                    Z(new c2(R, O.clarifyTimeoutError ? c2.ETIMEDOUT : c2.ECONNABORTED, A, z)), z = null
                }, G === void 0 && F.setContentType(null), "setRequestHeader" in z) O0.forEach(F.toJSON(), function N(R, O) {
                z.setRequestHeader(O, R)
            });
            if (!O0.isUndefined(D.withCredentials)) z.withCredentials = !!D.withCredentials;
            if (I && I !== "json") z.responseType = D.responseType;
            if (W)[V, K] = OO(W, !0), z.addEventListener("progress", V);
            if (Y && z.upload)[X, C] = OO(Y), z.upload.addEventListener("progress", X), z.upload.addEventListener("loadend", C);
            if (D.cancelToken || D.signal) {
                if (J = (N) => {
                        if (!z) return;
                        Z(!N || N.type ? new nC(null, A, z) : N), z.abort(), z = null
                    }, D.cancelToken && D.cancelToken.subscribe(J), D.signal) D.signal.aborted ? J() : D.signal.addEventListener("abort", J)
            }
            let L = iB1(D.url);
            if (L && l8.protocols.indexOf(L) === -1) {
                Z(new c2("Unsupported protocol " + L + ":", c2.ERR_BAD_REQUEST, A));
                return
            }
            z.send(G || null)
        })
    };
var Tk9 = (A, B) => {
        let {
            length: Q
        } = A = A ? A.filter(Boolean) : [];
        if (B || Q) {
            let Z = new AbortController,
                D, G = function(W) {
                    if (!D) {
                        D = !0, I();
                        let J = W instanceof Error ? W : this.reason;
                        Z.abort(J instanceof c2 ? J : new nC(J instanceof Error ? J.message : J))
                    }
                },
                F = B && setTimeout(() => {
                    F = null, G(new c2(`timeout ${B} of ms exceeded`, c2.ETIMEDOUT))
                }, B),
                I = () => {
                    if (A) F && clearTimeout(F), F = null, A.forEach((W) => {
                        W.unsubscribe ? W.unsubscribe(G) : W.removeEventListener("abort", G)
                    }), A = null
                };
            A.forEach((W) => W.addEventListener("abort", G));
            let {
                signal: Y
            } = Z;
            return Y.unsubscribe = () => O0.asap(I), Y
        }
    },
    bs0 = Tk9;
var Pk9 = function*(A, B) {
        let Q = A.byteLength;
        if (!B || Q < B) {
            yield A;
            return
        }
        let Z = 0,
            D;
        while (Z < Q) D = Z + B, yield A.slice(Z, D), Z = D
    },
    Sk9 = async function*(A, B) {
        for await (let Q of jk9(A)) yield* Pk9(Q, B)
    }, jk9 = async function*(A) {
        if (A[Symbol.asyncIterator]) {
            yield* A;
            return
        }
        let B = A.getReader();
        try {
            for (;;) {
                let {
                    done: Q,
                    value: Z
                } = await B.read();
                if (Q) break;
                yield Z
            }
        } finally {
            await B.cancel()
        }
    }, Ci1 = (A, B, Q, Z) => {
        let D = Sk9(A, B),
            G = 0,
            F, I = (Y) => {
                if (!F) F = !0, Z && Z(Y)
            };
        return new ReadableStream({
            async pull(Y) {
                try {
                    let {
                        done: W,
                        value: J
                    } = await D.next();
                    if (W) {
                        I(), Y.close();
                        return
                    }
                    let X = J.byteLength;
                    if (Q) {
                        let V = G += X;
                        Q(V)
                    }
                    Y.enqueue(new Uint8Array(J))
                } catch (W) {
                    throw I(W), W
                }
            },
            cancel(Y) {
                return I(Y), D.return()
            }
        }, {
            highWaterMark: 2
        })
    };
var xV1 = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function",
    hs0 = xV1 && typeof ReadableStream === "function",
    kk9 = xV1 && (typeof TextEncoder === "function" ? ((A) => (B) => A.encode(B))(new TextEncoder) : async (A) => new Uint8Array(await new Response(A).arrayBuffer())),
    gs0 = (A, ...B) => {
        try {
            return !!A(...B)
        } catch (Q) {
            return !1
        }
    },
    yk9 = hs0 && gs0(() => {
        let A = !1,
            B = new Request(l8.origin, {
                body: new ReadableStream,
                method: "POST",
                get duplex() {
                    return A = !0, "half"
                }
            }).headers.has("Content-Type");
        return A && !B
    }),
    fs0 = 65536,
    Ki1 = hs0 && gs0(() => O0.isReadableStream(new Response("").body)),
    _V1 = {
        stream: Ki1 && ((A) => A.body)
    };
xV1 && ((A) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((B) => {
        !_V1[B] && (_V1[B] = O0.isFunction(A[B]) ? (Q) => Q[B]() : (Q, Z) => {
            throw new c2(`Response type '${B}' is not supported`, c2.ERR_NOT_SUPPORT, Z)
        })
    })
})(new Response);
var _k9 = async (A) => {
    if (A == null) return 0;
    if (O0.isBlob(A)) return A.size;
    if (O0.isSpecCompliantForm(A)) return (await new Request(l8.origin, {
        method: "POST",
        body: A
    }).arrayBuffer()).byteLength;
    if (O0.isArrayBufferView(A) || O0.isArrayBuffer(A)) return A.byteLength;
    if (O0.isURLSearchParams(A)) A = A + "";
    if (O0.isString(A)) return (await kk9(A)).byteLength
}, xk9 = async (A, B) => {
    let Q = O0.toFiniteNumber(A.getContentLength());
    return Q == null ? _k9(B) : Q
}, us0 = xV1 && (async (A) => {
    let {
        url: B,
        method: Q,
        data: Z,
        signal: D,
        cancelToken: G,
        timeout: F,
        onDownloadProgress: I,
        onUploadProgress: Y,
        responseType: W,
        headers: J,
        withCredentials: X = "same-origin",
        fetchOptions: V
    } = yV1(A);
    W = W ? (W + "").toLowerCase() : "text";
    let C = bs0([D, G && G.toAbortSignal()], F),
        K, H = C && C.unsubscribe && (() => {
            C.unsubscribe()
        }),
        z;
    try {
        if (Y && yk9 && Q !== "get" && Q !== "head" && (z = await xk9(J, Z)) !== 0) {
            let O = new Request(B, {
                    method: "POST",
                    body: Z,
                    duplex: "half"
                }),
                P;
            if (O0.isFormData(Z) && (P = O.headers.get("content-type"))) J.setContentType(P);
            if (O.body) {
                let [j, f] = wp(z, OO($p(Y)));
                Z = Ci1(O.body, fs0, j, f)
            }
        }
        if (!O0.isString(X)) X = X ? "include" : "omit";
        let $ = "credentials" in Request.prototype;
        K = new Request(B, {
            ...V,
            signal: C,
            method: Q.toUpperCase(),
            headers: J.normalize().toJSON(),
            body: Z,
            duplex: "half",
            credentials: $ ? X : void 0
        });
        let L = await fetch(K),
            N = Ki1 && (W === "stream" || W === "response");
        if (Ki1 && (I || N && H)) {
            let O = {};
            ["status", "statusText", "headers"].forEach((k) => {
                O[k] = L[k]
            });
            let P = O0.toFiniteNumber(L.headers.get("content-length")),
                [j, f] = I && wp(P, OO($p(I), !0)) || [];
            L = new Response(Ci1(L.body, fs0, j, () => {
                f && f(), H && H()
            }), O)
        }
        W = W || "text";
        let R = await _V1[O0.findKey(_V1, W) || "text"](L, A);
        return !N && H && H(), await new Promise((O, P) => {
            XN(O, P, {
                data: R,
                headers: uZ.from(L.headers),
                status: L.status,
                statusText: L.statusText,
                config: A,
                request: K
            })
        })
    } catch ($) {
        if (H && H(), $ && $.name === "TypeError" && /fetch/i.test($.message)) throw Object.assign(new c2("Network Error", c2.ERR_NETWORK, A, K), {
            cause: $.cause || $
        });
        throw c2.from($, $ && $.code, A, K)
    }
});
var Hi1 = {
    http: ks0,
    xhr: vs0,
    fetch: us0
};
O0.forEach(Hi1, (A, B) => {
    if (A) {
        try {
            Object.defineProperty(A, "name", {
                value: B
            })
        } catch (Q) {}
        Object.defineProperty(A, "adapterName", {
            value: B
        })
    }
});
var ms0 = (A) => `- ${A}`,
    vk9 = (A) => O0.isFunction(A) || A === null || A === !1,
    vV1 = {
        getAdapter: (A) => {
            A = O0.isArray(A) ? A : [A];
            let {
                length: B
            } = A, Q, Z, D = {};
            for (let G = 0; G < B; G++) {
                Q = A[G];
                let F;
                if (Z = Q, !vk9(Q)) {
                    if (Z = Hi1[(F = String(Q)).toLowerCase()], Z === void 0) throw new c2(`Unknown adapter '${F}'`)
                }
                if (Z) break;
                D[F || "#" + G] = Z
            }
            if (!Z) {
                let G = Object.entries(D).map(([I, Y]) => `adapter ${I} ` + (Y === !1 ? "is not supported by the environment" : "is not available in the build")),
                    F = B ? G.length > 1 ? `since :
` + G.map(ms0).join(`
`) : " " + ms0(G[0]) : "as no adapter specified";
                throw new c2("There is no suitable adapter to dispatch the request " + F, "ERR_NOT_SUPPORT")
            }
            return Z
        },
        adapters: Hi1
    };

function zi1(A) {
    if (A.cancelToken) A.cancelToken.throwIfRequested();
    if (A.signal && A.signal.aborted) throw new nC(null, A)
}

function bV1(A) {
    if (zi1(A), A.headers = uZ.from(A.headers), A.data = hB1.call(A, A.transformRequest), ["post", "put", "patch"].indexOf(A.method) !== -1) A.headers.setContentType("application/x-www-form-urlencoded", !1);
    return vV1.getAdapter(A.adapter || Kp.adapter)(A).then(function Q(Z) {
        return zi1(A), Z.data = hB1.call(A, A.transformResponse, Z), Z.headers = uZ.from(Z.headers), Z
    }, function Q(Z) {
        if (!gB1(Z)) {
            if (zi1(A), Z && Z.response) Z.response.data = hB1.call(A, A.transformResponse, Z.response), Z.response.headers = uZ.from(Z.response.headers)
        }
        return Promise.reject(Z)
    })
}
var fV1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((A, B) => {
    fV1[A] = function Q(Z) {
        return typeof Z === A || "a" + (B < 1 ? "n " : " ") + A
    }
});
var ds0 = {};
fV1.transitional = function A(B, Q, Z) {
    function D(G, F) {
        return "[Axios v" + Dh + "] Transitional option '" + G + "'" + F + (Z ? ". " + Z : "")
    }
    return (G, F, I) => {
        if (B === !1) throw new c2(D(F, " has been removed" + (Q ? " in " + Q : "")), c2.ERR_DEPRECATED);
        if (Q && !ds0[F]) ds0[F] = !0, console.warn(D(F, " has been deprecated since v" + Q + " and will be removed in the near future"));
        return B ? B(G, F, I) : !0
    }
};
fV1.spelling = function A(B) {
    return (Q, Z) => {
        return console.warn(`${Z} is likely a misspelling of ${B}`), !0
    }
};

function bk9(A, B, Q) {
    if (typeof A !== "object") throw new c2("options must be an object", c2.ERR_BAD_OPTION_VALUE);
    let Z = Object.keys(A),
        D = Z.length;
    while (D-- > 0) {
        let G = Z[D],
            F = B[G];
        if (F) {
            let I = A[G],
                Y = I === void 0 || F(I, G, A);
            if (Y !== !0) throw new c2("option " + G + " must be " + Y, c2.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (Q !== !0) throw new c2("Unknown option " + G, c2.ERR_BAD_OPTION)
    }
}
var aB1 = {
    assertOptions: bk9,
    validators: fV1
};
var VN = aB1.validators;