/* chunk:498 bytes:[11889639, 11909718) size:20079 source:unpacked-cli.js */
function bS9(A, B, Q) {
    if (!O0.isObject(A)) throw new TypeError("target must be an object");
    B = B || new(NV1 || FormData), Q = O0.toFlatObject(Q, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, function K(H, z) {
        return !O0.isUndefined(z[H])
    });
    let Z = Q.metaTokens,
        D = Q.visitor || J,
        G = Q.dots,
        F = Q.indexes,
        Y = (Q.Blob || typeof Blob !== "undefined" && Blob) && O0.isSpecCompliantForm(B);
    if (!O0.isFunction(D)) throw new TypeError("visitor must be a function");

    function W(K) {
        if (K === null) return "";
        if (O0.isDate(K)) return K.toISOString();
        if (!Y && O0.isBlob(K)) throw new c2("Blob is not supported. Use a Buffer instead.");
        if (O0.isArrayBuffer(K) || O0.isTypedArray(K)) return Y && typeof Blob === "function" ? new Blob([K]) : Buffer.from(K);
        return K
    }

    function J(K, H, z) {
        let $ = K;
        if (K && !z && typeof K === "object") {
            if (O0.endsWith(H, "{}")) H = Z ? H : H.slice(0, -2), K = JSON.stringify(K);
            else if (O0.isArray(K) && xS9(K) || (O0.isFileList(K) || O0.endsWith(H, "[]")) && ($ = O0.toArray(K))) return H = xa0(H), $.forEach(function L(N, R) {
                !(O0.isUndefined(N) || N === null) && B.append(F === !0 ? _a0([H], R, G) : F === null ? H : H + "[]", W(N))
            }), !1
        }
        if (hp1(K)) return !0;
        return B.append(_a0(z, H, G), W(K)), !1
    }
    let X = [],
        V = Object.assign(vS9, {
            defaultVisitor: J,
            convertValue: W,
            isVisitable: hp1
        });

    function C(K, H) {
        if (O0.isUndefined(K)) return;
        if (X.indexOf(K) !== -1) throw Error("Circular reference detected in " + H.join("."));
        X.push(K), O0.forEach(K, function z($, L) {
            if ((!(O0.isUndefined($) || $ === null) && D.call(B, $, O0.isString(L) ? L.trim() : L, H, V)) === !0) C($, H ? H.concat(L) : [L])
        }), X.pop()
    }
    if (!O0.isObject(A)) throw new TypeError("data must be an object");
    return C(A), B
}
var Gk = bS9;

function va0(A) {
    let B = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\x00"
    };
    return encodeURIComponent(A).replace(/[!'()~]|%20|%00/g, function Q(Z) {
        return B[Z]
    })
}

function ba0(A, B) {
    this._pairs = [], A && Gk(A, this, B)
}
var fa0 = ba0.prototype;
fa0.append = function A(B, Q) {
    this._pairs.push([B, Q])
};
fa0.toString = function A(B) {
    let Q = B ? function(Z) {
        return B.call(this, Z, va0)
    } : va0;
    return this._pairs.map(function Z(D) {
        return Q(D[0]) + "=" + Q(D[1])
    }, "").join("&")
};
var ha0 = ba0;

function fS9(A) {
    return encodeURIComponent(A).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function tf(A, B, Q) {
    if (!B) return A;
    let Z = Q && Q.encode || fS9;
    if (O0.isFunction(Q)) Q = {
        serialize: Q
    };
    let D = Q && Q.serialize,
        G;
    if (D) G = D(B, Q);
    else G = O0.isURLSearchParams(B) ? B.toString() : new ha0(B, Q).toString(Z);
    if (G) {
        let F = A.indexOf("#");
        if (F !== -1) A = A.slice(0, F);
        A += (A.indexOf("?") === -1 ? "?" : "&") + G
    }
    return A
}
class ga0 {
    constructor() {
        this.handlers = []
    }
    use(A, B, Q) {
        return this.handlers.push({
            fulfilled: A,
            rejected: B,
            synchronous: Q ? Q.synchronous : !1,
            runWhen: Q ? Q.runWhen : null
        }), this.handlers.length - 1
    }
    eject(A) {
        if (this.handlers[A]) this.handlers[A] = null
    }
    clear() {
        if (this.handlers) this.handlers = []
    }
    forEach(A) {
        O0.forEach(this.handlers, function B(Q) {
            if (Q !== null) A(Q)
        })
    }
}
var gp1 = ga0;
var Cp = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
};
import gS9 from "crypto";
import hS9 from "url";
var ua0 = hS9.URLSearchParams;
var up1 = "abcdefghijklmnopqrstuvwxyz",
    ma0 = "0123456789",
    da0 = {
        DIGIT: ma0,
        ALPHA: up1,
        ALPHA_DIGIT: up1 + up1.toUpperCase() + ma0
    },
    uS9 = (A = 16, B = da0.ALPHA_DIGIT) => {
        let Q = "",
            {
                length: Z
            } = B,
            D = new Uint32Array(A);
        gS9.randomFillSync(D);
        for (let G = 0; G < A; G++) Q += B[D[G] % Z];
        return Q
    },
    ca0 = {
        isNode: !0,
        classes: {
            URLSearchParams: ua0,
            FormData: NV1,
            Blob: typeof Blob !== "undefined" && Blob || null
        },
        ALPHABET: da0,
        generateString: uS9,
        protocols: ["http", "https", "file", "data"]
    };
var cp1 = {};
bj(cp1, {
    origin: () => cS9,
    navigator: () => mp1,
    hasStandardBrowserWebWorkerEnv: () => dS9,
    hasStandardBrowserEnv: () => mS9,
    hasBrowserEnv: () => dp1
});
var dp1 = typeof window !== "undefined" && typeof document !== "undefined",
    mp1 = typeof navigator === "object" && navigator || void 0,
    mS9 = dp1 && (!mp1 || ["ReactNative", "NativeScript", "NS"].indexOf(mp1.product) < 0),
    dS9 = (() => {
        return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function"
    })(),
    cS9 = dp1 && window.location.href || "http://localhost";
var l8 = {
    ...cp1,
    ...ca0
};

function lp1(A, B) {
    return Gk(A, new l8.classes.URLSearchParams, Object.assign({
        visitor: function(Q, Z, D, G) {
            if (l8.isNode && O0.isBuffer(Q)) return this.append(Z, Q.toString("base64")), !1;
            return G.defaultVisitor.apply(this, arguments)
        }
    }, B))
}

function lS9(A) {
    return O0.matchAll(/\w+|\[(\w*)]/g, A).map((B) => {
        return B[0] === "[]" ? "" : B[1] || B[0]
    })
}

function pS9(A) {
    let B = {},
        Q = Object.keys(A),
        Z, D = Q.length,
        G;
    for (Z = 0; Z < D; Z++) G = Q[Z], B[G] = A[G];
    return B
}

function iS9(A) {
    function B(Q, Z, D, G) {
        let F = Q[G++];
        if (F === "__proto__") return !0;
        let I = Number.isFinite(+F),
            Y = G >= Q.length;
        if (F = !F && O0.isArray(D) ? D.length : F, Y) {
            if (O0.hasOwnProp(D, F)) D[F] = [D[F], Z];
            else D[F] = Z;
            return !I
        }
        if (!D[F] || !O0.isObject(D[F])) D[F] = [];
        if (B(Q, Z, D[F], G) && O0.isArray(D[F])) D[F] = pS9(D[F]);
        return !I
    }
    if (O0.isFormData(A) && O0.isFunction(A.entries)) {
        let Q = {};
        return O0.forEachEntry(A, (Z, D) => {
            B(lS9(Z), D, Q, 0)
        }), Q
    }
    return null
}
var LV1 = iS9;

function nS9(A, B, Q) {
    if (O0.isString(A)) try {
        return (B || JSON.parse)(A), O0.trim(A)
    } catch (Z) {
        if (Z.name !== "SyntaxError") throw Z
    }
    return (Q || JSON.stringify)(A)
}
var pp1 = {
    transitional: Cp,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function A(B, Q) {
        let Z = Q.getContentType() || "",
            D = Z.indexOf("application/json") > -1,
            G = O0.isObject(B);
        if (G && O0.isHTMLForm(B)) B = new FormData(B);
        if (O0.isFormData(B)) return D ? JSON.stringify(LV1(B)) : B;
        if (O0.isArrayBuffer(B) || O0.isBuffer(B) || O0.isStream(B) || O0.isFile(B) || O0.isBlob(B) || O0.isReadableStream(B)) return B;
        if (O0.isArrayBufferView(B)) return B.buffer;
        if (O0.isURLSearchParams(B)) return Q.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), B.toString();
        let I;
        if (G) {
            if (Z.indexOf("application/x-www-form-urlencoded") > -1) return lp1(B, this.formSerializer).toString();
            if ((I = O0.isFileList(B)) || Z.indexOf("multipart/form-data") > -1) {
                let Y = this.env && this.env.FormData;
                return Gk(I ? {
                    "files[]": B
                } : B, Y && new Y, this.formSerializer)
            }
        }
        if (G || D) return Q.setContentType("application/json", !1), nS9(B);
        return B
    }],
    transformResponse: [function A(B) {
        let Q = this.transitional || pp1.transitional,
            Z = Q && Q.forcedJSONParsing,
            D = this.responseType === "json";
        if (O0.isResponse(B) || O0.isReadableStream(B)) return B;
        if (B && O0.isString(B) && (Z && !this.responseType || D)) {
            let F = !(Q && Q.silentJSONParsing) && D;
            try {
                return JSON.parse(B)
            } catch (I) {
                if (F) {
                    if (I.name === "SyntaxError") throw c2.from(I, c2.ERR_BAD_RESPONSE, this, null, this.response);
                    throw I
                }
            }
        }
        return B
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: l8.classes.FormData,
        Blob: l8.classes.Blob
    },
    validateStatus: function A(B) {
        return B >= 200 && B < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
O0.forEach(["delete", "get", "head", "post", "put", "patch"], (A) => {
    pp1.headers[A] = {}
});
var Kp = pp1;
var aS9 = O0.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    la0 = (A) => {
        let B = {},
            Q, Z, D;
        return A && A.split(`
`).forEach(function G(F) {
            if (D = F.indexOf(":"), Q = F.substring(0, D).trim().toLowerCase(), Z = F.substring(D + 1).trim(), !Q || B[Q] && aS9[Q]) return;
            if (Q === "set-cookie")
                if (B[Q]) B[Q].push(Z);
                else B[Q] = [Z];
            else B[Q] = B[Q] ? B[Q] + ", " + Z : Z
        }), B
    };
var pa0 = Symbol("internals");

function bB1(A) {
    return A && String(A).trim().toLowerCase()
}

function MV1(A) {
    if (A === !1 || A == null) return A;
    return O0.isArray(A) ? A.map(MV1) : String(A)
}

function sS9(A) {
    let B = Object.create(null),
        Q = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
        Z;
    while (Z = Q.exec(A)) B[Z[1]] = Z[2];
    return B
}
var rS9 = (A) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(A.trim());

function ip1(A, B, Q, Z, D) {
    if (O0.isFunction(Z)) return Z.call(this, B, Q);
    if (D) B = Q;
    if (!O0.isString(B)) return;
    if (O0.isString(Z)) return B.indexOf(Z) !== -1;
    if (O0.isRegExp(Z)) return Z.test(B)
}

function oS9(A) {
    return A.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (B, Q, Z) => {
        return Q.toUpperCase() + Z
    })
}

function tS9(A, B) {
    let Q = O0.toCamelCase(" " + B);
    ["get", "set", "has"].forEach((Z) => {
        Object.defineProperty(A, Z + Q, {
            value: function(D, G, F) {
                return this[Z].call(this, B, D, G, F)
            },
            configurable: !0
        })
    })
}
class fB1 {
    constructor(A) {
        A && this.set(A)
    }
    set(A, B, Q) {
        let Z = this;

        function D(F, I, Y) {
            let W = bB1(I);
            if (!W) throw new Error("header name must be a non-empty string");
            let J = O0.findKey(Z, W);
            if (!J || Z[J] === void 0 || Y === !0 || Y === void 0 && Z[J] !== !1) Z[J || I] = MV1(F)
        }
        let G = (F, I) => O0.forEach(F, (Y, W) => D(Y, W, I));
        if (O0.isPlainObject(A) || A instanceof this.constructor) G(A, B);
        else if (O0.isString(A) && (A = A.trim()) && !rS9(A)) G(la0(A), B);
        else if (O0.isHeaders(A))
            for (let [F, I] of A.entries()) D(I, F, Q);
        else A != null && D(B, A, Q);
        return this
    }
    get(A, B) {
        if (A = bB1(A), A) {
            let Q = O0.findKey(this, A);
            if (Q) {
                let Z = this[Q];
                if (!B) return Z;
                if (B === !0) return sS9(Z);
                if (O0.isFunction(B)) return B.call(this, Z, Q);
                if (O0.isRegExp(B)) return B.exec(Z);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(A, B) {
        if (A = bB1(A), A) {
            let Q = O0.findKey(this, A);
            return !!(Q && this[Q] !== void 0 && (!B || ip1(this, this[Q], Q, B)))
        }
        return !1
    }
    delete(A, B) {
        let Q = this,
            Z = !1;

        function D(G) {
            if (G = bB1(G), G) {
                let F = O0.findKey(Q, G);
                if (F && (!B || ip1(Q, Q[F], F, B))) delete Q[F], Z = !0
            }
        }
        if (O0.isArray(A)) A.forEach(D);
        else D(A);
        return Z
    }
    clear(A) {
        let B = Object.keys(this),
            Q = B.length,
            Z = !1;
        while (Q--) {
            let D = B[Q];
            if (!A || ip1(this, this[D], D, A, !0)) delete this[D], Z = !0
        }
        return Z
    }
    normalize(A) {
        let B = this,
            Q = {};
        return O0.forEach(this, (Z, D) => {
            let G = O0.findKey(Q, D);
            if (G) {
                B[G] = MV1(Z), delete B[D];
                return
            }
            let F = A ? oS9(D) : String(D).trim();
            if (F !== D) delete B[D];
            B[F] = MV1(Z), Q[F] = !0
        }), this
    }
    concat(...A) {
        return this.constructor.concat(this, ...A)
    }
    toJSON(A) {
        let B = Object.create(null);
        return O0.forEach(this, (Q, Z) => {
            Q != null && Q !== !1 && (B[Z] = A && O0.isArray(Q) ? Q.join(", ") : Q)
        }), B
    } [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([A, B]) => A + ": " + B).join(`
`)
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(A) {
        return A instanceof this ? A : new this(A)
    }
    static concat(A, ...B) {
        let Q = new this(A);
        return B.forEach((Z) => Q.set(Z)), Q
    }
    static accessor(A) {
        let Q = (this[pa0] = this[pa0] = {
                accessors: {}
            }).accessors,
            Z = this.prototype;

        function D(G) {
            let F = bB1(G);
            if (!Q[F]) tS9(Z, G), Q[F] = !0
        }
        return O0.isArray(A) ? A.forEach(D) : D(A), this
    }
}
fB1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
O0.reduceDescriptors(fB1.prototype, ({
    value: A
}, B) => {
    let Q = B[0].toUpperCase() + B.slice(1);
    return {
        get: () => A,
        set(Z) {
            this[Q] = Z
        }
    }
});
O0.freezeMethods(fB1);
var uZ = fB1;

function hB1(A, B) {
    let Q = this || Kp,
        Z = B || Q,
        D = uZ.from(Z.headers),
        G = Z.data;
    return O0.forEach(A, function F(I) {
        G = I.call(Q, G, D.normalize(), B ? B.status : void 0)
    }), D.normalize(), G
}

function gB1(A) {
    return !!(A && A.__CANCEL__)
}

function ia0(A, B, Q) {
    c2.call(this, A == null ? "canceled" : A, c2.ERR_CANCELED, B, Q), this.name = "CanceledError"
}
O0.inherits(ia0, c2, {
    __CANCEL__: !0
});
var nC = ia0;

function XN(A, B, Q) {
    let Z = Q.config.validateStatus;
    if (!Q.status || !Z || Z(Q.status)) A(Q);
    else B(new c2("Request failed with status code " + Q.status, [c2.ERR_BAD_REQUEST, c2.ERR_BAD_RESPONSE][Math.floor(Q.status / 100) - 4], Q.config, Q.request, Q))
}

function np1(A) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(A)
}

function ap1(A, B) {
    return B ? A.replace(/\/?\/$/, "") + "/" + B.replace(/^\/+/, "") : A
}

function ef(A, B, Q) {
    let Z = !np1(B);
    if (A && (Z || Q == !1)) return ap1(A, B);
    return B
}
var Ps0 = G1(na0(), 1),
    Ss0 = G1(Cs0(), 1);
import Kk9 from "http";
import Hk9 from "https";
import zk9 from "util";
import Ik from "zlib";
var Dh = "1.8.4";

function iB1(A) {
    let B = /^([-+\w]{1,25})(:?\/\/|:)/.exec(A);
    return B && B[1] || ""
}
var Bk9 = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;

function Ji1(A, B, Q) {
    let Z = Q && Q.Blob || l8.classes.Blob,
        D = iB1(A);
    if (B === void 0 && Z) B = !0;
    if (D === "data") {
        A = D.length ? A.slice(D.length + 1) : A;
        let G = Bk9.exec(A);
        if (!G) throw new c2("Invalid URL", c2.ERR_INVALID_URL);
        let F = G[1],
            I = G[2],
            Y = G[3],
            W = Buffer.from(decodeURIComponent(Y), I ? "base64" : "utf8");
        if (B) {
            if (!Z) throw new c2("Blob is not supported", c2.ERR_NOT_SUPPORT);
            return new Z([W], {
                type: F
            })
        }
        return W
    }
    throw new c2("Unsupported protocol " + D, c2.ERR_NOT_SUPPORT)
}
import qp from "stream";
import Qk9 from "stream";
var Xi1 = Symbol("internals");
class Ks0 extends Qk9.Transform {
    constructor(A) {
        A = O0.toFlatObject(A, {
            maxRate: 0,
            chunkSize: 65536,
            minChunkSize: 100,
            timeWindow: 500,
            ticksRate: 2,
            samplesCount: 15
        }, null, (Q, Z) => {
            return !O0.isUndefined(Z[Q])
        });
        super({
            readableHighWaterMark: A.chunkSize
        });
        let B = this[Xi1] = {
            timeWindow: A.timeWindow,
            chunkSize: A.chunkSize,
            maxRate: A.maxRate,
            minChunkSize: A.minChunkSize,
            bytesSeen: 0,
            isCaptured: !1,
            notifiedBytesLoaded: 0,
            ts: Date.now(),
            bytes: 0,
            onReadCallback: null
        };
        this.on("newListener", (Q) => {
            if (Q === "progress") {
                if (!B.isCaptured) B.isCaptured = !0
            }
        })
    }
    _read(A) {
        let B = this[Xi1];
        if (B.onReadCallback) B.onReadCallback();
        return super._read(A)
    }
    _transform(A, B, Q) {
        let Z = this[Xi1],
            D = Z.maxRate,
            G = this.readableHighWaterMark,
            F = Z.timeWindow,
            I = 1000 / F,
            Y = D / I,
            W = Z.minChunkSize !== !1 ? Math.max(Z.minChunkSize, Y * 0.01) : 0,
            J = (V, C) => {
                let K = Buffer.byteLength(V);
                if (Z.bytesSeen += K, Z.bytes += K, Z.isCaptured && this.emit("progress", Z.bytesSeen), this.push(V)) process.nextTick(C);
                else Z.onReadCallback = () => {
                    Z.onReadCallback = null, process.nextTick(C)
                }
            },
            X = (V, C) => {
                let K = Buffer.byteLength(V),
                    H = null,
                    z = G,
                    $, L = 0;
                if (D) {
                    let N = Date.now();
                    if (!Z.ts || (L = N - Z.ts) >= F) Z.ts = N, $ = Y - Z.bytes, Z.bytes = $ < 0 ? -$ : 0, L = 0;
                    $ = Y - Z.bytes
                }
                if (D) {
                    if ($ <= 0) return setTimeout(() => {
                        C(null, V)
                    }, F - L);
                    if ($ < z) z = $
                }
                if (z && K > z && K - z > W) H = V.subarray(z), V = V.subarray(0, z);
                J(V, H ? () => {
                    process.nextTick(C, null, H)
                } : C)
            };
        X(A, function V(C, K) {
            if (C) return Q(C);
            if (K) X(K, V);
            else Q(null)
        })
    }
}
var Vi1 = Ks0;
import {
    EventEmitter as Ek9
} from "events";