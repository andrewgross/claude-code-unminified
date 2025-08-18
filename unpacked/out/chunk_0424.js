/* chunk:424 bytes:[10125952, 10159372) size:33420 source:unpacked-cli.js */
var WwB = E((M$, YwB) => {
    Object.defineProperty(M$, "__esModule", {
        value: !0
    });

    function N11(A) {
        return A && typeof A === "object" && "default" in A ? A.default : A
    }
    var L$ = N11(W1("stream")),
        BwB = N11(W1("http")),
        kx1 = N11(W1("url")),
        QwB = N11(oUB()),
        HA8 = N11(W1("https")),
        lm = N11(W1("zlib")),
        zA8 = L$.Readable,
        DS = Symbol("buffer"),
        Zw0 = Symbol("type");
    class $11 {
        constructor() {
            this[Zw0] = "";
            let A = arguments[0],
                B = arguments[1],
                Q = [],
                Z = 0;
            if (A) {
                let G = A,
                    F = Number(G.length);
                for (let I = 0; I < F; I++) {
                    let Y = G[I],
                        W;
                    if (Y instanceof Buffer) W = Y;
                    else if (ArrayBuffer.isView(Y)) W = Buffer.from(Y.buffer, Y.byteOffset, Y.byteLength);
                    else if (Y instanceof ArrayBuffer) W = Buffer.from(Y);
                    else if (Y instanceof $11) W = Y[DS];
                    else W = Buffer.from(typeof Y === "string" ? Y : String(Y));
                    Z += W.length, Q.push(W)
                }
            }
            this[DS] = Buffer.concat(Q);
            let D = B && B.type !== void 0 && String(B.type).toLowerCase();
            if (D && !/[^\u0020-\u007E]/.test(D)) this[Zw0] = D
        }
        get size() {
            return this[DS].length
        }
        get type() {
            return this[Zw0]
        }
        text() {
            return Promise.resolve(this[DS].toString())
        }
        arrayBuffer() {
            let A = this[DS],
                B = A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength);
            return Promise.resolve(B)
        }
        stream() {
            let A = new zA8;
            return A._read = function() {}, A.push(this[DS]), A.push(null), A
        }
        toString() {
            return "[object Blob]"
        }
        slice() {
            let A = this.size,
                B = arguments[0],
                Q = arguments[1],
                Z, D;
            if (B === void 0) Z = 0;
            else if (B < 0) Z = Math.max(A + B, 0);
            else Z = Math.min(B, A);
            if (Q === void 0) D = A;
            else if (Q < 0) D = Math.max(A + Q, 0);
            else D = Math.min(Q, A);
            let G = Math.max(D - Z, 0),
                I = this[DS].slice(Z, Z + G),
                Y = new $11([], {
                    type: arguments[2]
                });
            return Y[DS] = I, Y
        }
    }
    Object.defineProperties($11.prototype, {
        size: {
            enumerable: !0
        },
        type: {
            enumerable: !0
        },
        slice: {
            enumerable: !0
        }
    });
    Object.defineProperty($11.prototype, Symbol.toStringTag, {
        value: "Blob",
        writable: !1,
        enumerable: !1,
        configurable: !0
    });

    function tY(A, B, Q) {
        if (Error.call(this, A), this.message = A, this.type = B, Q) this.code = this.errno = Q.code;
        Error.captureStackTrace(this, this.constructor)
    }
    tY.prototype = Object.create(Error.prototype);
    tY.prototype.constructor = tY;
    tY.prototype.name = "FetchError";
    var Iw0;
    try {
        Iw0 = (() => {
            throw new Error("Cannot require module " + "encoding");
        })().convert
    } catch (A) {}
    var FS = Symbol("Body internals"),
        tUB = L$.PassThrough;

    function TI(A) {
        var B = this,
            Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            Z = Q.size;
        let D = Z === void 0 ? 0 : Z;
        var G = Q.timeout;
        let F = G === void 0 ? 0 : G;
        if (A == null) A = null;
        else if (ZwB(A)) A = Buffer.from(A.toString());
        else if (mD1(A));
        else if (Buffer.isBuffer(A));
        else if (Object.prototype.toString.call(A) === "[object ArrayBuffer]") A = Buffer.from(A);
        else if (ArrayBuffer.isView(A)) A = Buffer.from(A.buffer, A.byteOffset, A.byteLength);
        else if (A instanceof L$);
        else A = Buffer.from(String(A));
        if (this[FS] = {
                body: A,
                disturbed: !1,
                error: null
            }, this.size = D, this.timeout = F, A instanceof L$) A.on("error", function(I) {
            let Y = I.name === "AbortError" ? I : new tY(`Invalid response body while trying to fetch ${B.url}: ${I.message}`, "system", I);
            B[FS].error = Y
        })
    }
    TI.prototype = {
        get body() {
            return this[FS].body
        },
        get bodyUsed() {
            return this[FS].disturbed
        },
        arrayBuffer() {
            return U11.call(this).then(function(A) {
                return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
            })
        },
        blob() {
            let A = this.headers && this.headers.get("content-type") || "";
            return U11.call(this).then(function(B) {
                return Object.assign(new $11([], {
                    type: A.toLowerCase()
                }), {
                    [DS]: B
                })
            })
        },
        json() {
            var A = this;
            return U11.call(this).then(function(B) {
                try {
                    return JSON.parse(B.toString())
                } catch (Q) {
                    return TI.Promise.reject(new tY(`invalid json response body at ${A.url} reason: ${Q.message}`, "invalid-json"))
                }
            })
        },
        text() {
            return U11.call(this).then(function(A) {
                return A.toString()
            })
        },
        buffer() {
            return U11.call(this)
        },
        textConverted() {
            var A = this;
            return U11.call(this).then(function(B) {
                return EA8(B, A.headers)
            })
        }
    };
    Object.defineProperties(TI.prototype, {
        body: {
            enumerable: !0
        },
        bodyUsed: {
            enumerable: !0
        },
        arrayBuffer: {
            enumerable: !0
        },
        blob: {
            enumerable: !0
        },
        json: {
            enumerable: !0
        },
        text: {
            enumerable: !0
        }
    });
    TI.mixIn = function(A) {
        for (let B of Object.getOwnPropertyNames(TI.prototype))
            if (!(B in A)) {
                let Q = Object.getOwnPropertyDescriptor(TI.prototype, B);
                Object.defineProperty(A, B, Q)
            }
    };

    function U11() {
        var A = this;
        if (this[FS].disturbed) return TI.Promise.reject(new TypeError(`body used already for: ${this.url}`));
        if (this[FS].disturbed = !0, this[FS].error) return TI.Promise.reject(this[FS].error);
        let B = this.body;
        if (B === null) return TI.Promise.resolve(Buffer.alloc(0));
        if (mD1(B)) B = B.stream();
        if (Buffer.isBuffer(B)) return TI.Promise.resolve(B);
        if (!(B instanceof L$)) return TI.Promise.resolve(Buffer.alloc(0));
        let Q = [],
            Z = 0,
            D = !1;
        return new TI.Promise(function(G, F) {
            let I;
            if (A.timeout) I = setTimeout(function() {
                D = !0, F(new tY(`Response timeout while trying to fetch ${A.url} (over ${A.timeout}ms)`, "body-timeout"))
            }, A.timeout);
            B.on("error", function(Y) {
                if (Y.name === "AbortError") D = !0, F(Y);
                else F(new tY(`Invalid response body while trying to fetch ${A.url}: ${Y.message}`, "system", Y))
            }), B.on("data", function(Y) {
                if (D || Y === null) return;
                if (A.size && Z + Y.length > A.size) {
                    D = !0, F(new tY(`content size at ${A.url} over limit: ${A.size}`, "max-size"));
                    return
                }
                Z += Y.length, Q.push(Y)
            }), B.on("end", function() {
                if (D) return;
                clearTimeout(I);
                try {
                    G(Buffer.concat(Q, Z))
                } catch (Y) {
                    F(new tY(`Could not create Buffer from response body for ${A.url}: ${Y.message}`, "system", Y))
                }
            })
        })
    }

    function EA8(A, B) {
        if (typeof Iw0 !== "function") throw new Error("The package `encoding` must be installed to use the textConverted() function");
        let Q = B.get("content-type"),
            Z = "utf-8",
            D, G;
        if (Q) D = /charset=([^;]*)/i.exec(Q);
        if (G = A.slice(0, 1024).toString(), !D && G) D = /<meta.+?charset=(['"])(.+?)\1/i.exec(G);
        if (!D && G) {
            if (D = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(G), !D) {
                if (D = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(G), D) D.pop()
            }
            if (D) D = /charset=(.*)/i.exec(D.pop())
        }
        if (!D && G) D = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(G);
        if (D) {
            if (Z = D.pop(), Z === "gb2312" || Z === "gbk") Z = "gb18030"
        }
        return Iw0(A, "UTF-8", Z).toString()
    }

    function ZwB(A) {
        if (typeof A !== "object" || typeof A.append !== "function" || typeof A.delete !== "function" || typeof A.get !== "function" || typeof A.getAll !== "function" || typeof A.has !== "function" || typeof A.set !== "function") return !1;
        return A.constructor.name === "URLSearchParams" || Object.prototype.toString.call(A) === "[object URLSearchParams]" || typeof A.sort === "function"
    }

    function mD1(A) {
        return typeof A === "object" && typeof A.arrayBuffer === "function" && typeof A.type === "string" && typeof A.stream === "function" && typeof A.constructor === "function" && typeof A.constructor.name === "string" && /^(Blob|File)$/.test(A.constructor.name) && /^(Blob|File)$/.test(A[Symbol.toStringTag])
    }

    function DwB(A) {
        let B, Q, Z = A.body;
        if (A.bodyUsed) throw new Error("cannot clone body after it is used");
        if (Z instanceof L$ && typeof Z.getBoundary !== "function") B = new tUB, Q = new tUB, Z.pipe(B), Z.pipe(Q), A[FS].body = B, Z = Q;
        return Z
    }

    function GwB(A) {
        if (A === null) return null;
        else if (typeof A === "string") return "text/plain;charset=UTF-8";
        else if (ZwB(A)) return "application/x-www-form-urlencoded;charset=UTF-8";
        else if (mD1(A)) return A.type || null;
        else if (Buffer.isBuffer(A)) return null;
        else if (Object.prototype.toString.call(A) === "[object ArrayBuffer]") return null;
        else if (ArrayBuffer.isView(A)) return null;
        else if (typeof A.getBoundary === "function") return `multipart/form-data;boundary=${A.getBoundary()}`;
        else if (A instanceof L$) return null;
        else return "text/plain;charset=UTF-8"
    }

    function FwB(A) {
        let B = A.body;
        if (B === null) return 0;
        else if (mD1(B)) return B.size;
        else if (Buffer.isBuffer(B)) return B.length;
        else if (B && typeof B.getLengthSync === "function") {
            if (B._lengthRetrievers && B._lengthRetrievers.length == 0 || B.hasKnownLength && B.hasKnownLength()) return B.getLengthSync();
            return null
        } else return null
    }

    function UA8(A, B) {
        let Q = B.body;
        if (Q === null) A.end();
        else if (mD1(Q)) Q.stream().pipe(A);
        else if (Buffer.isBuffer(Q)) A.write(Q), A.end();
        else Q.pipe(A)
    }
    TI.Promise = global.Promise;
    var IwB = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
        Yw0 = /[^\t\x20-\x7e\x80-\xff]/;

    function gD1(A) {
        if (A = `${A}`, IwB.test(A) || A === "") throw new TypeError(`${A} is not a legal HTTP header name`)
    }

    function eUB(A) {
        if (A = `${A}`, Yw0.test(A)) throw new TypeError(`${A} is not a legal HTTP header value`)
    }

    function w11(A, B) {
        B = B.toLowerCase();
        for (let Q in A)
            if (Q.toLowerCase() === B) return Q;
        return
    }
    var wG = Symbol("map");
    class iE {
        constructor() {
            let A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
            if (this[wG] = Object.create(null), A instanceof iE) {
                let B = A.raw(),
                    Q = Object.keys(B);
                for (let Z of Q)
                    for (let D of B[Z]) this.append(Z, D);
                return
            }
            if (A == null);
            else if (typeof A === "object") {
                let B = A[Symbol.iterator];
                if (B != null) {
                    if (typeof B !== "function") throw new TypeError("Header pairs must be iterable");
                    let Q = [];
                    for (let Z of A) {
                        if (typeof Z !== "object" || typeof Z[Symbol.iterator] !== "function") throw new TypeError("Each header pair must be iterable");
                        Q.push(Array.from(Z))
                    }
                    for (let Z of Q) {
                        if (Z.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
                        this.append(Z[0], Z[1])
                    }
                } else
                    for (let Q of Object.keys(A)) {
                        let Z = A[Q];
                        this.append(Q, Z)
                    }
            } else throw new TypeError("Provided initializer must be an object")
        }
        get(A) {
            A = `${A}`, gD1(A);
            let B = w11(this[wG], A);
            if (B === void 0) return null;
            return this[wG][B].join(", ")
        }
        forEach(A) {
            let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0,
                Q = Ww0(this),
                Z = 0;
            while (Z < Q.length) {
                var D = Q[Z];
                let G = D[0],
                    F = D[1];
                A.call(B, F, G, this), Q = Ww0(this), Z++
            }
        }
        set(A, B) {
            A = `${A}`, B = `${B}`, gD1(A), eUB(B);
            let Q = w11(this[wG], A);
            this[wG][Q !== void 0 ? Q : A] = [B]
        }
        append(A, B) {
            A = `${A}`, B = `${B}`, gD1(A), eUB(B);
            let Q = w11(this[wG], A);
            if (Q !== void 0) this[wG][Q].push(B);
            else this[wG][A] = [B]
        }
        has(A) {
            return A = `${A}`, gD1(A), w11(this[wG], A) !== void 0
        }
        delete(A) {
            A = `${A}`, gD1(A);
            let B = w11(this[wG], A);
            if (B !== void 0) delete this[wG][B]
        }
        raw() {
            return this[wG]
        }
        keys() {
            return Dw0(this, "key")
        }
        values() {
            return Dw0(this, "value")
        } [Symbol.iterator]() {
            return Dw0(this, "key+value")
        }
    }
    iE.prototype.entries = iE.prototype[Symbol.iterator];
    Object.defineProperty(iE.prototype, Symbol.toStringTag, {
        value: "Headers",
        writable: !1,
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperties(iE.prototype, {
        get: {
            enumerable: !0
        },
        forEach: {
            enumerable: !0
        },
        set: {
            enumerable: !0
        },
        append: {
            enumerable: !0
        },
        has: {
            enumerable: !0
        },
        delete: {
            enumerable: !0
        },
        keys: {
            enumerable: !0
        },
        values: {
            enumerable: !0
        },
        entries: {
            enumerable: !0
        }
    });

    function Ww0(A) {
        let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
        return Object.keys(A[wG]).sort().map(B === "key" ? function(Z) {
            return Z.toLowerCase()
        } : B === "value" ? function(Z) {
            return A[wG][Z].join(", ")
        } : function(Z) {
            return [Z.toLowerCase(), A[wG][Z].join(", ")]
        })
    }
    var Jw0 = Symbol("internal");

    function Dw0(A, B) {
        let Q = Object.create(Xw0);
        return Q[Jw0] = {
            target: A,
            kind: B,
            index: 0
        }, Q
    }
    var Xw0 = Object.setPrototypeOf({
        next() {
            if (!this || Object.getPrototypeOf(this) !== Xw0) throw new TypeError("Value of `this` is not a HeadersIterator");
            var A = this[Jw0];
            let {
                target: B,
                kind: Q,
                index: Z
            } = A, D = Ww0(B, Q), G = D.length;
            if (Z >= G) return {
                value: void 0,
                done: !0
            };
            return this[Jw0].index = Z + 1, {
                value: D[Z],
                done: !1
            }
        }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(Xw0, Symbol.toStringTag, {
        value: "HeadersIterator",
        writable: !1,
        enumerable: !1,
        configurable: !0
    });

    function wA8(A) {
        let B = Object.assign({
                __proto__: null
            }, A[wG]),
            Q = w11(A[wG], "Host");
        if (Q !== void 0) B[Q] = B[Q][0];
        return B
    }

    function $A8(A) {
        let B = new iE;
        for (let Q of Object.keys(A)) {
            if (IwB.test(Q)) continue;
            if (Array.isArray(A[Q]))
                for (let Z of A[Q]) {
                    if (Yw0.test(Z)) continue;
                    if (B[wG][Q] === void 0) B[wG][Q] = [Z];
                    else B[wG][Q].push(Z)
                } else if (!Yw0.test(A[Q])) B[wG][Q] = [A[Q]]
        }
        return B
    }
    var Iv = Symbol("Response internals"),
        qA8 = BwB.STATUS_CODES;
    class pE {
        constructor() {
            let A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null,
                B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            TI.call(this, A, B);
            let Q = B.status || 200,
                Z = new iE(B.headers);
            if (A != null && !Z.has("Content-Type")) {
                let D = GwB(A);
                if (D) Z.append("Content-Type", D)
            }
            this[Iv] = {
                url: B.url,
                status: Q,
                statusText: B.statusText || qA8[Q],
                headers: Z,
                counter: B.counter
            }
        }
        get url() {
            return this[Iv].url || ""
        }
        get status() {
            return this[Iv].status
        }
        get ok() {
            return this[Iv].status >= 200 && this[Iv].status < 300
        }
        get redirected() {
            return this[Iv].counter > 0
        }
        get statusText() {
            return this[Iv].statusText
        }
        get headers() {
            return this[Iv].headers
        }
        clone() {
            return new pE(DwB(this), {
                url: this.url,
                status: this.status,
                statusText: this.statusText,
                headers: this.headers,
                ok: this.ok,
                redirected: this.redirected
            })
        }
    }
    TI.mixIn(pE.prototype);
    Object.defineProperties(pE.prototype, {
        url: {
            enumerable: !0
        },
        status: {
            enumerable: !0
        },
        ok: {
            enumerable: !0
        },
        redirected: {
            enumerable: !0
        },
        statusText: {
            enumerable: !0
        },
        headers: {
            enumerable: !0
        },
        clone: {
            enumerable: !0
        }
    });
    Object.defineProperty(pE.prototype, Symbol.toStringTag, {
        value: "Response",
        writable: !1,
        enumerable: !1,
        configurable: !0
    });
    var GS = Symbol("Request internals"),
        NA8 = kx1.URL || QwB.URL,
        LA8 = kx1.parse,
        MA8 = kx1.format;

    function Gw0(A) {
        if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(A)) A = new NA8(A).toString();
        return LA8(A)
    }
    var RA8 = "destroy" in L$.Readable.prototype;

    function jx1(A) {
        return typeof A === "object" && typeof A[GS] === "object"
    }

    function OA8(A) {
        let B = A && typeof A === "object" && Object.getPrototypeOf(A);
        return !!(B && B.constructor.name === "AbortSignal")
    }
    class Wv {
        constructor(A) {
            let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                Q;
            if (!jx1(A)) {
                if (A && A.href) Q = Gw0(A.href);
                else Q = Gw0(`${A}`);
                A = {}
            } else Q = Gw0(A.url);
            let Z = B.method || A.method || "GET";
            if (Z = Z.toUpperCase(), (B.body != null || jx1(A) && A.body !== null) && (Z === "GET" || Z === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
            let D = B.body != null ? B.body : jx1(A) && A.body !== null ? DwB(A) : null;
            TI.call(this, D, {
                timeout: B.timeout || A.timeout || 0,
                size: B.size || A.size || 0
            });
            let G = new iE(B.headers || A.headers || {});
            if (D != null && !G.has("Content-Type")) {
                let I = GwB(D);
                if (I) G.append("Content-Type", I)
            }
            let F = jx1(A) ? A.signal : null;
            if ("signal" in B) F = B.signal;
            if (F != null && !OA8(F)) throw new TypeError("Expected signal to be an instanceof AbortSignal");
            this[GS] = {
                method: Z,
                redirect: B.redirect || A.redirect || "follow",
                headers: G,
                parsedURL: Q,
                signal: F
            }, this.follow = B.follow !== void 0 ? B.follow : A.follow !== void 0 ? A.follow : 20, this.compress = B.compress !== void 0 ? B.compress : A.compress !== void 0 ? A.compress : !0, this.counter = B.counter || A.counter || 0, this.agent = B.agent || A.agent
        }
        get method() {
            return this[GS].method
        }
        get url() {
            return MA8(this[GS].parsedURL)
        }
        get headers() {
            return this[GS].headers
        }
        get redirect() {
            return this[GS].redirect
        }
        get signal() {
            return this[GS].signal
        }
        clone() {
            return new Wv(this)
        }
    }
    TI.mixIn(Wv.prototype);
    Object.defineProperty(Wv.prototype, Symbol.toStringTag, {
        value: "Request",
        writable: !1,
        enumerable: !1,
        configurable: !0
    });
    Object.defineProperties(Wv.prototype, {
        method: {
            enumerable: !0
        },
        url: {
            enumerable: !0
        },
        headers: {
            enumerable: !0
        },
        redirect: {
            enumerable: !0
        },
        clone: {
            enumerable: !0
        },
        signal: {
            enumerable: !0
        }
    });

    function TA8(A) {
        let B = A[GS].parsedURL,
            Q = new iE(A[GS].headers);
        if (!Q.has("Accept")) Q.set("Accept", "*/*");
        if (!B.protocol || !B.hostname) throw new TypeError("Only absolute URLs are supported");
        if (!/^https?:$/.test(B.protocol)) throw new TypeError("Only HTTP(S) protocols are supported");
        if (A.signal && A.body instanceof L$.Readable && !RA8) throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
        let Z = null;
        if (A.body == null && /^(POST|PUT)$/i.test(A.method)) Z = "0";
        if (A.body != null) {
            let G = FwB(A);
            if (typeof G === "number") Z = String(G)
        }
        if (Z) Q.set("Content-Length", Z);
        if (!Q.has("User-Agent")) Q.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
        if (A.compress && !Q.has("Accept-Encoding")) Q.set("Accept-Encoding", "gzip,deflate");
        let D = A.agent;
        if (typeof D === "function") D = D(B);
        return Object.assign({}, B, {
            method: A.method,
            headers: wA8(Q),
            agent: D
        })
    }

    function q11(A) {
        Error.call(this, A), this.type = "aborted", this.message = A, Error.captureStackTrace(this, this.constructor)
    }
    q11.prototype = Object.create(Error.prototype);
    q11.prototype.constructor = q11;
    q11.prototype.name = "AbortError";
    var uD1 = kx1.URL || QwB.URL,
        AwB = L$.PassThrough,
        PA8 = function A(B, Q) {
            let Z = new uD1(Q).hostname,
                D = new uD1(B).hostname;
            return Z === D || Z[Z.length - D.length - 1] === "." && Z.endsWith(D)
        },
        SA8 = function A(B, Q) {
            let Z = new uD1(Q).protocol,
                D = new uD1(B).protocol;
            return Z === D
        };

    function Yv(A, B) {
        if (!Yv.Promise) throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
        return TI.Promise = Yv.Promise, new Yv.Promise(function(Q, Z) {
            let D = new Wv(A, B),
                G = TA8(D),
                F = (G.protocol === "https:" ? HA8 : BwB).request,
                I = D.signal,
                Y = null,
                W = function K() {
                    let H = new q11("The user aborted a request.");
                    if (Z(H), D.body && D.body instanceof L$.Readable) Fw0(D.body, H);
                    if (!Y || !Y.body) return;
                    Y.body.emit("error", H)
                };
            if (I && I.aborted) {
                W();
                return
            }
            let J = function K() {
                    W(), C()
                },
                X = F(G),
                V;
            if (I) I.addEventListener("abort", J);

            function C() {
                if (X.abort(), I) I.removeEventListener("abort", J);
                clearTimeout(V)
            }
            if (D.timeout) X.once("socket", function(K) {
                V = setTimeout(function() {
                    Z(new tY(`network timeout at: ${D.url}`, "request-timeout")), C()
                }, D.timeout)
            });
            if (X.on("error", function(K) {
                    if (Z(new tY(`request to ${D.url} failed, reason: ${K.message}`, "system", K)), Y && Y.body) Fw0(Y.body, K);
                    C()
                }), jA8(X, function(K) {
                    if (I && I.aborted) return;
                    if (Y && Y.body) Fw0(Y.body, K)
                }), parseInt(process.version.substring(1)) < 14) X.on("socket", function(K) {
                K.addListener("close", function(H) {
                    let z = K.listenerCount("data") > 0;
                    if (Y && z && !H && !(I && I.aborted)) {
                        let $ = new Error("Premature close");
                        $.code = "ERR_STREAM_PREMATURE_CLOSE", Y.body.emit("error", $)
                    }
                })
            });
            X.on("response", function(K) {
                clearTimeout(V);
                let H = $A8(K.headers);
                if (Yv.isRedirect(K.statusCode)) {
                    let R = H.get("Location"),
                        O = null;
                    try {
                        O = R === null ? null : new uD1(R, D.url).toString()
                    } catch (P) {
                        if (D.redirect !== "manual") {
                            Z(new tY(`uri requested responds with an invalid redirect URL: ${R}`, "invalid-redirect")), C();
                            return
                        }
                    }
                    switch (D.redirect) {
                        case "error":
                            Z(new tY(`uri requested responds with a redirect, redirect mode is set to error: ${D.url}`, "no-redirect")), C();
                            return;
                        case "manual":
                            if (O !== null) try {
                                H.set("Location", O)
                            } catch (j) {
                                Z(j)
                            }
                            break;
                        case "follow":
                            if (O === null) break;
                            if (D.counter >= D.follow) {
                                Z(new tY(`maximum redirect reached at: ${D.url}`, "max-redirect")), C();
                                return
                            }
                            let P = {
                                headers: new iE(D.headers),
                                follow: D.follow,
                                counter: D.counter + 1,
                                agent: D.agent,
                                compress: D.compress,
                                method: D.method,
                                body: D.body,
                                signal: D.signal,
                                timeout: D.timeout,
                                size: D.size
                            };
                            if (!PA8(D.url, O) || !SA8(D.url, O))
                                for (let j of ["authorization", "www-authenticate", "cookie", "cookie2"]) P.headers.delete(j);
                            if (K.statusCode !== 303 && D.body && FwB(D) === null) {
                                Z(new tY("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), C();
                                return
                            }
                            if (K.statusCode === 303 || (K.statusCode === 301 || K.statusCode === 302) && D.method === "POST") P.method = "GET", P.body = void 0, P.headers.delete("content-length");
                            Q(Yv(new Wv(O, P))), C();
                            return
                    }
                }
                K.once("end", function() {
                    if (I) I.removeEventListener("abort", J)
                });
                let z = K.pipe(new AwB),
                    $ = {
                        url: D.url,
                        status: K.statusCode,
                        statusText: K.statusMessage,
                        headers: H,
                        size: D.size,
                        timeout: D.timeout,
                        counter: D.counter
                    },
                    L = H.get("Content-Encoding");
                if (!D.compress || D.method === "HEAD" || L === null || K.statusCode === 204 || K.statusCode === 304) {
                    Y = new pE(z, $), Q(Y);
                    return
                }
                let N = {
                    flush: lm.Z_SYNC_FLUSH,
                    finishFlush: lm.Z_SYNC_FLUSH
                };
                if (L == "gzip" || L == "x-gzip") {
                    z = z.pipe(lm.createGunzip(N)), Y = new pE(z, $), Q(Y);
                    return
                }
                if (L == "deflate" || L == "x-deflate") {
                    let R = K.pipe(new AwB);
                    R.once("data", function(O) {
                        if ((O[0] & 15) === 8) z = z.pipe(lm.createInflate());
                        else z = z.pipe(lm.createInflateRaw());
                        Y = new pE(z, $), Q(Y)
                    }), R.on("end", function() {
                        if (!Y) Y = new pE(z, $), Q(Y)
                    });
                    return
                }
                if (L == "br" && typeof lm.createBrotliDecompress === "function") {
                    z = z.pipe(lm.createBrotliDecompress()), Y = new pE(z, $), Q(Y);
                    return
                }
                Y = new pE(z, $), Q(Y)
            }), UA8(X, D)
        })
    }

    function jA8(A, B) {
        let Q;
        A.on("socket", function(Z) {
            Q = Z
        }), A.on("response", function(Z) {
            let D = Z.headers;
            if (D["transfer-encoding"] === "chunked" && !D["content-length"]) Z.once("close", function(G) {
                if (Q && Q.listenerCount("data") > 0 && !G) {
                    let I = new Error("Premature close");
                    I.code = "ERR_STREAM_PREMATURE_CLOSE", B(I)
                }
            })
        })
    }

    function Fw0(A, B) {
        if (A.destroy) A.destroy(B);
        else A.emit("error", B), A.end()
    }
    Yv.isRedirect = function(A) {
        return A === 301 || A === 302 || A === 303 || A === 307 || A === 308
    };
    Yv.Promise = global.Promise;
    YwB.exports = M$ = Yv;
    Object.defineProperty(M$, "__esModule", {
        value: !0
    });
    M$.default = M$;
    M$.Headers = iE;
    M$.Request = Wv;
    M$.Response = pE;
    M$.FetchError = tY;
    M$.AbortError = q11
});