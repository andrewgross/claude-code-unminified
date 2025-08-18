/* chunk:71 bytes:[1676661, 1696564) size:19903 source:unpacked-cli.js */
var R8A = E((p05, M8A) => {
    var {
        defineProperty: IH1,
        getOwnPropertyDescriptor: Yt9,
        getOwnPropertyNames: Wt9
    } = Object, Jt9 = Object.prototype.hasOwnProperty, Pk = (A, B) => IH1(A, "name", {
        value: B,
        configurable: !0
    }), Xt9 = (A, B) => {
        for (var Q in B) IH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Vt9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Wt9(B))
                if (!Jt9.call(A, D) && D !== Q) IH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Yt9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ct9 = (A) => Vt9(IH1({}, "__esModule", {
        value: !0
    }), A), $8A = {};
    Xt9($8A, {
        Field: () => zt9,
        Fields: () => Et9,
        HttpRequest: () => Ut9,
        HttpResponse: () => wt9,
        IHttpRequest: () => q8A.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Kt9,
        isValidHostname: () => L8A,
        resolveHttpHandlerRuntimeConfig: () => Ht9
    });
    M8A.exports = Ct9($8A);
    var Kt9 = Pk((A) => {
            return {
                setHttpHandler(B) {
                    A.httpHandler = B
                },
                httpHandler() {
                    return A.httpHandler
                },
                updateHttpClientConfig(B, Q) {
                    A.httpHandler?.updateHttpClientConfig(B, Q)
                },
                httpHandlerConfigs() {
                    return A.httpHandler.httpHandlerConfigs()
                }
            }
        }, "getHttpHandlerExtensionConfiguration"),
        Ht9 = Pk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        q8A = Fs1(),
        zt9 = class {
            static {
                Pk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = q8A.FieldPosition.HEADER,
                values: Q = []
            }) {
                this.name = A, this.kind = B, this.values = Q
            }
            add(A) {
                this.values.push(A)
            }
            set(A) {
                this.values = A
            }
            remove(A) {
                this.values = this.values.filter((B) => B !== A)
            }
            toString() {
                return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
            }
            get() {
                return this.values
            }
        },
        Et9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Pk(this, "Fields")
            }
            setField(A) {
                this.entries[A.name.toLowerCase()] = A
            }
            getField(A) {
                return this.entries[A.toLowerCase()]
            }
            removeField(A) {
                delete this.entries[A.toLowerCase()]
            }
            getByType(A) {
                return Object.values(this.entries).filter((B) => B.kind === A)
            }
        },
        Ut9 = class A {
            static {
                Pk(this, "HttpRequest")
            }
            constructor(B) {
                this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
            }
            static clone(B) {
                let Q = new A({
                    ...B,
                    headers: {
                        ...B.headers
                    }
                });
                if (Q.query) Q.query = N8A(Q.query);
                return Q
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
            }
            clone() {
                return A.clone(this)
            }
        };

    function N8A(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Pk(N8A, "cloneQuery");
    var wt9 = class {
        static {
            Pk(this, "HttpResponse")
        }
        constructor(A) {
            this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
        }
        static isInstance(A) {
            if (!A) return !1;
            let B = A;
            return typeof B.statusCode === "number" && typeof B.headers === "object"
        }
    };

    function L8A(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Pk(L8A, "isValidHostname")
});
var Is1 = E((O8A) => {
    Object.defineProperty(O8A, "__esModule", {
        value: !0
    });
    O8A.default = Nt9;
    var $t9 = qt9(W1("crypto"));

    function qt9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var WH1 = new Uint8Array(256),
        YH1 = WH1.length;

    function Nt9() {
        if (YH1 > WH1.length - 16) $t9.default.randomFillSync(WH1), YH1 = 0;
        return WH1.slice(YH1, YH1 += 16)
    }
});
var S8A = E((T8A) => {
    Object.defineProperty(T8A, "__esModule", {
        value: !0
    });
    T8A.default = void 0;
    var Mt9 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    T8A.default = Mt9
});
var x91 = E((j8A) => {
    Object.defineProperty(j8A, "__esModule", {
        value: !0
    });
    j8A.default = void 0;
    var Rt9 = Ot9(S8A());

    function Ot9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function Tt9(A) {
        return typeof A === "string" && Rt9.default.test(A)
    }
    var Pt9 = Tt9;
    j8A.default = Pt9
});
var v91 = E((_8A) => {
    Object.defineProperty(_8A, "__esModule", {
        value: !0
    });
    _8A.default = void 0;
    _8A.unsafeStringify = y8A;
    var St9 = jt9(x91());

    function jt9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var HY = [];
    for (let A = 0; A < 256; ++A) HY.push((A + 256).toString(16).slice(1));

    function y8A(A, B = 0) {
        return HY[A[B + 0]] + HY[A[B + 1]] + HY[A[B + 2]] + HY[A[B + 3]] + "-" + HY[A[B + 4]] + HY[A[B + 5]] + "-" + HY[A[B + 6]] + HY[A[B + 7]] + "-" + HY[A[B + 8]] + HY[A[B + 9]] + "-" + HY[A[B + 10]] + HY[A[B + 11]] + HY[A[B + 12]] + HY[A[B + 13]] + HY[A[B + 14]] + HY[A[B + 15]]
    }

    function kt9(A, B = 0) {
        let Q = y8A(A, B);
        if (!St9.default(Q)) throw TypeError("Stringified UUID is invalid");
        return Q
    }
    var yt9 = kt9;
    _8A.default = yt9
});
var h8A = E((b8A) => {
    Object.defineProperty(b8A, "__esModule", {
        value: !0
    });
    b8A.default = void 0;
    var xt9 = bt9(Is1()),
        vt9 = v91();

    function bt9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var v8A, Ys1, Ws1 = 0,
        Js1 = 0;

    function ft9(A, B, Q) {
        let Z = B && Q || 0,
            D = B || new Array(16);
        A = A || {};
        let G = A.node || v8A,
            F = A.clockseq !== void 0 ? A.clockseq : Ys1;
        if (G == null || F == null) {
            let V = A.random || (A.rng || xt9.default)();
            if (G == null) G = v8A = [V[0] | 1, V[1], V[2], V[3], V[4], V[5]];
            if (F == null) F = Ys1 = (V[6] << 8 | V[7]) & 16383
        }
        let I = A.msecs !== void 0 ? A.msecs : Date.now(),
            Y = A.nsecs !== void 0 ? A.nsecs : Js1 + 1,
            W = I - Ws1 + (Y - Js1) / 1e4;
        if (W < 0 && A.clockseq === void 0) F = F + 1 & 16383;
        if ((W < 0 || I > Ws1) && A.nsecs === void 0) Y = 0;
        if (Y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        Ws1 = I, Js1 = Y, Ys1 = F, I += 12219292800000;
        let J = ((I & 268435455) * 1e4 + Y) % 4294967296;
        D[Z++] = J >>> 24 & 255, D[Z++] = J >>> 16 & 255, D[Z++] = J >>> 8 & 255, D[Z++] = J & 255;
        let X = I / 4294967296 * 1e4 & 268435455;
        D[Z++] = X >>> 8 & 255, D[Z++] = X & 255, D[Z++] = X >>> 24 & 15 | 16, D[Z++] = X >>> 16 & 255, D[Z++] = F >>> 8 | 128, D[Z++] = F & 255;
        for (let V = 0; V < 6; ++V) D[Z + V] = G[V];
        return B || vt9.unsafeStringify(D)
    }
    var ht9 = ft9;
    b8A.default = ht9
});
var Xs1 = E((g8A) => {
    Object.defineProperty(g8A, "__esModule", {
        value: !0
    });
    g8A.default = void 0;
    var gt9 = ut9(x91());

    function ut9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function mt9(A) {
        if (!gt9.default(A)) throw TypeError("Invalid UUID");
        let B, Q = new Uint8Array(16);
        return Q[0] = (B = parseInt(A.slice(0, 8), 16)) >>> 24, Q[1] = B >>> 16 & 255, Q[2] = B >>> 8 & 255, Q[3] = B & 255, Q[4] = (B = parseInt(A.slice(9, 13), 16)) >>> 8, Q[5] = B & 255, Q[6] = (B = parseInt(A.slice(14, 18), 16)) >>> 8, Q[7] = B & 255, Q[8] = (B = parseInt(A.slice(19, 23), 16)) >>> 8, Q[9] = B & 255, Q[10] = (B = parseInt(A.slice(24, 36), 16)) / 1099511627776 & 255, Q[11] = B / 4294967296 & 255, Q[12] = B >>> 24 & 255, Q[13] = B >>> 16 & 255, Q[14] = B >>> 8 & 255, Q[15] = B & 255, Q
    }
    var dt9 = mt9;
    g8A.default = dt9
});
var Vs1 = E((c8A) => {
    Object.defineProperty(c8A, "__esModule", {
        value: !0
    });
    c8A.URL = c8A.DNS = void 0;
    c8A.default = nt9;
    var ct9 = v91(),
        lt9 = pt9(Xs1());

    function pt9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function it9(A) {
        A = unescape(encodeURIComponent(A));
        let B = [];
        for (let Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
        return B
    }
    var m8A = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    c8A.DNS = m8A;
    var d8A = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    c8A.URL = d8A;

    function nt9(A, B, Q) {
        function Z(D, G, F, I) {
            var Y;
            if (typeof D === "string") D = it9(D);
            if (typeof G === "string") G = lt9.default(G);
            if (((Y = G) === null || Y === void 0 ? void 0 : Y.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
            let W = new Uint8Array(16 + D.length);
            if (W.set(G), W.set(D, G.length), W = Q(W), W[6] = W[6] & 15 | B, W[8] = W[8] & 63 | 128, F) {
                I = I || 0;
                for (let J = 0; J < 16; ++J) F[I + J] = W[J];
                return F
            }
            return ct9.unsafeStringify(W)
        }
        try {
            Z.name = A
        } catch (D) {}
        return Z.DNS = m8A, Z.URL = d8A, Z
    }
});
var n8A = E((p8A) => {
    Object.defineProperty(p8A, "__esModule", {
        value: !0
    });
    p8A.default = void 0;
    var rt9 = ot9(W1("crypto"));

    function ot9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function tt9(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return rt9.default.createHash("md5").update(A).digest()
    }
    var et9 = tt9;
    p8A.default = et9
});
var o8A = E((s8A) => {
    Object.defineProperty(s8A, "__esModule", {
        value: !0
    });
    s8A.default = void 0;
    var Ae9 = a8A(Vs1()),
        Be9 = a8A(n8A());

    function a8A(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var Qe9 = Ae9.default("v3", 48, Be9.default),
        Ze9 = Qe9;
    s8A.default = Ze9
});
var A5A = E((t8A) => {
    Object.defineProperty(t8A, "__esModule", {
        value: !0
    });
    t8A.default = void 0;
    var De9 = Ge9(W1("crypto"));

    function Ge9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var Fe9 = {
        randomUUID: De9.default.randomUUID
    };
    t8A.default = Fe9
});
var G5A = E((Z5A) => {
    Object.defineProperty(Z5A, "__esModule", {
        value: !0
    });
    Z5A.default = void 0;
    var B5A = Q5A(A5A()),
        Ie9 = Q5A(Is1()),
        Ye9 = v91();

    function Q5A(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function We9(A, B, Q) {
        if (B5A.default.randomUUID && !B && !A) return B5A.default.randomUUID();
        A = A || {};
        let Z = A.random || (A.rng || Ie9.default)();
        if (Z[6] = Z[6] & 15 | 64, Z[8] = Z[8] & 63 | 128, B) {
            Q = Q || 0;
            for (let D = 0; D < 16; ++D) B[Q + D] = Z[D];
            return B
        }
        return Ye9.unsafeStringify(Z)
    }
    var Je9 = We9;
    Z5A.default = Je9
});
var Y5A = E((F5A) => {
    Object.defineProperty(F5A, "__esModule", {
        value: !0
    });
    F5A.default = void 0;
    var Xe9 = Ve9(W1("crypto"));

    function Ve9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function Ce9(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return Xe9.default.createHash("sha1").update(A).digest()
    }
    var Ke9 = Ce9;
    F5A.default = Ke9
});
var V5A = E((J5A) => {
    Object.defineProperty(J5A, "__esModule", {
        value: !0
    });
    J5A.default = void 0;
    var He9 = W5A(Vs1()),
        ze9 = W5A(Y5A());

    function W5A(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
    var Ee9 = He9.default("v5", 80, ze9.default),
        Ue9 = Ee9;
    J5A.default = Ue9
});
var H5A = E((C5A) => {
    Object.defineProperty(C5A, "__esModule", {
        value: !0
    });
    C5A.default = void 0;
    var we9 = "00000000-0000-0000-0000-000000000000";
    C5A.default = we9
});
var U5A = E((z5A) => {
    Object.defineProperty(z5A, "__esModule", {
        value: !0
    });
    z5A.default = void 0;
    var $e9 = qe9(x91());

    function qe9(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }

    function Ne9(A) {
        if (!$e9.default(A)) throw TypeError("Invalid UUID");
        return parseInt(A.slice(14, 15), 16)
    }
    var Le9 = Ne9;
    z5A.default = Le9
});
var b91 = E((Kw) => {
    Object.defineProperty(Kw, "__esModule", {
        value: !0
    });
    Object.defineProperty(Kw, "NIL", {
        enumerable: !0,
        get: function() {
            return Pe9.default
        }
    });
    Object.defineProperty(Kw, "parse", {
        enumerable: !0,
        get: function() {
            return ye9.default
        }
    });
    Object.defineProperty(Kw, "stringify", {
        enumerable: !0,
        get: function() {
            return ke9.default
        }
    });
    Object.defineProperty(Kw, "v1", {
        enumerable: !0,
        get: function() {
            return Me9.default
        }
    });
    Object.defineProperty(Kw, "v3", {
        enumerable: !0,
        get: function() {
            return Re9.default
        }
    });
    Object.defineProperty(Kw, "v4", {
        enumerable: !0,
        get: function() {
            return Oe9.default
        }
    });
    Object.defineProperty(Kw, "v5", {
        enumerable: !0,
        get: function() {
            return Te9.default
        }
    });
    Object.defineProperty(Kw, "validate", {
        enumerable: !0,
        get: function() {
            return je9.default
        }
    });
    Object.defineProperty(Kw, "version", {
        enumerable: !0,
        get: function() {
            return Se9.default
        }
    });
    var Me9 = xO(h8A()),
        Re9 = xO(o8A()),
        Oe9 = xO(G5A()),
        Te9 = xO(V5A()),
        Pe9 = xO(H5A()),
        Se9 = xO(U5A()),
        je9 = xO(x91()),
        ke9 = xO(v91()),
        ye9 = xO(Xs1());

    function xO(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    }
});
var Ks1 = E((XA5, N5A) => {
    var {
        defineProperty: JH1,
        getOwnPropertyDescriptor: _e9,
        getOwnPropertyNames: xe9
    } = Object, ve9 = Object.prototype.hasOwnProperty, Th = (A, B) => JH1(A, "name", {
        value: B,
        configurable: !0
    }), be9 = (A, B) => {
        for (var Q in B) JH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, fe9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of xe9(B))
                if (!ve9.call(A, D) && D !== Q) JH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = _e9(B, D)) || Z.enumerable
                })
        }
        return A
    }, he9 = (A) => fe9(JH1({}, "__esModule", {
        value: !0
    }), A), w5A = {};
    be9(w5A, {
        isBrowserNetworkError: () => q5A,
        isClockSkewCorrectedError: () => $5A,
        isClockSkewError: () => ie9,
        isRetryableByTrait: () => pe9,
        isServerError: () => ae9,
        isThrottlingError: () => ne9,
        isTransientError: () => Cs1
    });
    N5A.exports = he9(w5A);
    var ge9 = ["AuthFailure", "InvalidSignatureException", "RequestExpired", "RequestInTheFuture", "RequestTimeTooSkewed", "SignatureDoesNotMatch"],
        ue9 = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"],
        me9 = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"],
        de9 = [500, 502, 503, 504],
        ce9 = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"],
        le9 = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"],
        pe9 = Th((A) => A.$retryable !== void 0, "isRetryableByTrait"),
        ie9 = Th((A) => ge9.includes(A.name), "isClockSkewError"),
        $5A = Th((A) => A.$metadata?.clockSkewCorrected, "isClockSkewCorrectedError"),
        q5A = Th((A) => {
            let B = new Set(["Failed to fetch", "NetworkError when attempting to fetch resource", "The Internet connection appears to be offline", "Load failed", "Network request failed"]);
            if (!(A && A instanceof TypeError)) return !1;
            return B.has(A.message)
        }, "isBrowserNetworkError"),
        ne9 = Th((A) => A.$metadata?.httpStatusCode === 429 || ue9.includes(A.name) || A.$retryable?.throttling == !0, "isThrottlingError"),
        Cs1 = Th((A, B = 0) => $5A(A) || me9.includes(A.name) || ce9.includes(A?.code || "") || le9.includes(A?.code || "") || de9.includes(A.$metadata?.httpStatusCode || 0) || q5A(A) || A.cause !== void 0 && B <= 10 && Cs1(A.cause, B + 1), "isTransientError"),
        ae9 = Th((A) => {
            if (A.$metadata?.httpStatusCode !== void 0) {
                let B = A.$metadata.httpStatusCode;
                if (500 <= B && B <= 599 && !Cs1(A)) return !0;
                return !1
            }
            return !1
        }, "isServerError")
});