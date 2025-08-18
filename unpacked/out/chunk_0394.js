/* chunk:394 bytes:[9228544, 9245945) size:17401 source:unpacked-cli.js */
var vFB = E((t93, xFB) => {
    var {
        defineProperty: Ny1,
        getOwnPropertyDescriptor: eb6,
        getOwnPropertyNames: Af6
    } = Object, Bf6 = Object.prototype.hasOwnProperty, sx = (A, B) => Ny1(A, "name", {
        value: B,
        configurable: !0
    }), Qf6 = (A, B) => {
        for (var Q in B) Ny1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Zf6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Af6(B))
                if (!Bf6.call(A, D) && D !== Q) Ny1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = eb6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Df6 = (A) => Zf6(Ny1({}, "__esModule", {
        value: !0
    }), A), jFB = {};
    Qf6(jFB, {
        Field: () => If6,
        Fields: () => Yf6,
        HttpRequest: () => Wf6,
        HttpResponse: () => Jf6,
        IHttpRequest: () => kFB.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Gf6,
        isValidHostname: () => _FB,
        resolveHttpHandlerRuntimeConfig: () => Ff6
    });
    xFB.exports = Df6(jFB);
    var Gf6 = sx((A) => {
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
        Ff6 = sx((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        kFB = SFB(),
        If6 = class {
            static {
                sx(this, "Field")
            }
            constructor({
                name: A,
                kind: B = kFB.FieldPosition.HEADER,
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
        Yf6 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                sx(this, "Fields")
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
        Wf6 = class A {
            static {
                sx(this, "HttpRequest")
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
                if (Q.query) Q.query = yFB(Q.query);
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

    function yFB(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    sx(yFB, "cloneQuery");
    var Jf6 = class {
        static {
            sx(this, "HttpResponse")
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

    function _FB(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    sx(_FB, "isValidHostname")
});
var gFB = E((QQ3, hFB) => {
    var {
        defineProperty: Ly1,
        getOwnPropertyDescriptor: Xf6,
        getOwnPropertyNames: Vf6
    } = Object, Cf6 = Object.prototype.hasOwnProperty, jz0 = (A, B) => Ly1(A, "name", {
        value: B,
        configurable: !0
    }), Kf6 = (A, B) => {
        for (var Q in B) Ly1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Hf6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Vf6(B))
                if (!Cf6.call(A, D) && D !== Q) Ly1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Xf6(B, D)) || Z.enumerable
                })
        }
        return A
    }, zf6 = (A) => Hf6(Ly1({}, "__esModule", {
        value: !0
    }), A), bFB = {};
    Kf6(bFB, {
        escapeUri: () => fFB,
        escapeUriPath: () => Uf6
    });
    hFB.exports = zf6(bFB);
    var fFB = jz0((A) => encodeURIComponent(A).replace(/[!'()*]/g, Ef6), "escapeUri"),
        Ef6 = jz0((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        Uf6 = jz0((A) => A.split("/").map(fFB).join("/"), "escapeUriPath")
});
var cFB = E((ZQ3, dFB) => {
    var {
        defineProperty: My1,
        getOwnPropertyDescriptor: wf6,
        getOwnPropertyNames: $f6
    } = Object, qf6 = Object.prototype.hasOwnProperty, Nf6 = (A, B) => My1(A, "name", {
        value: B,
        configurable: !0
    }), Lf6 = (A, B) => {
        for (var Q in B) My1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Mf6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of $f6(B))
                if (!qf6.call(A, D) && D !== Q) My1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = wf6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Rf6 = (A) => Mf6(My1({}, "__esModule", {
        value: !0
    }), A), uFB = {};
    Lf6(uFB, {
        buildQueryString: () => mFB
    });
    dFB.exports = Rf6(uFB);
    var kz0 = gFB();

    function mFB(A) {
        let B = [];
        for (let Q of Object.keys(A).sort()) {
            let Z = A[Q];
            if (Q = kz0.escapeUri(Q), Array.isArray(Z))
                for (let D = 0, G = Z.length; D < G; D++) B.push(`${Q}=${kz0.escapeUri(Z[D])}`);
            else {
                let D = Q;
                if (Z || typeof Z === "string") D += `=${kz0.escapeUri(Z)}`;
                B.push(D)
            }
        }
        return B.join("&")
    }
    Nf6(mFB, "buildQueryString")
});
var iFB = E((lFB) => {
    Object.defineProperty(lFB, "__esModule", {
        value: !0
    });
    lFB.fromBase64 = void 0;
    var Of6 = GZ(),
        Tf6 = /^[A-Za-z0-9+/]*={0,2}$/,
        Pf6 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!Tf6.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = Of6.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    lFB.fromBase64 = Pf6
});
var sFB = E((nFB) => {
    Object.defineProperty(nFB, "__esModule", {
        value: !0
    });
    nFB.toBase64 = void 0;
    var Sf6 = GZ(),
        jf6 = lB(),
        kf6 = (A) => {
            let B;
            if (typeof A === "string") B = jf6.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return Sf6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    nFB.toBase64 = kf6
});
var tFB = E((FQ3, Ry1) => {
    var {
        defineProperty: rFB,
        getOwnPropertyDescriptor: yf6,
        getOwnPropertyNames: _f6
    } = Object, xf6 = Object.prototype.hasOwnProperty, yz0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of _f6(B))
                if (!xf6.call(A, D) && D !== Q) rFB(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = yf6(B, D)) || Z.enumerable
                })
        }
        return A
    }, oFB = (A, B, Q) => (yz0(A, B, "default"), Q && yz0(Q, B, "default")), vf6 = (A) => yz0(rFB({}, "__esModule", {
        value: !0
    }), A), _z0 = {};
    Ry1.exports = vf6(_z0);
    oFB(_z0, iFB(), Ry1.exports);
    oFB(_z0, sFB(), Ry1.exports)
});
var vz0 = E((IQ3, GIB) => {
    var {
        defineProperty: Ty1,
        getOwnPropertyDescriptor: bf6,
        getOwnPropertyNames: ff6
    } = Object, hf6 = Object.prototype.hasOwnProperty, yM = (A, B) => Ty1(A, "name", {
        value: B,
        configurable: !0
    }), gf6 = (A, B) => {
        for (var Q in B) Ty1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, uf6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ff6(B))
                if (!hf6.call(A, D) && D !== Q) Ty1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = bf6(B, D)) || Z.enumerable
                })
        }
        return A
    }, mf6 = (A) => uf6(Ty1({}, "__esModule", {
        value: !0
    }), A), AIB = {};
    gf6(AIB, {
        FetchHttpHandler: () => cf6,
        keepAliveSupport: () => Oy1,
        streamCollector: () => pf6
    });
    GIB.exports = mf6(AIB);
    var eFB = vFB(),
        df6 = cFB();

    function xz0(A, B) {
        return new Request(A, B)
    }
    yM(xz0, "createRequest");

    function BIB(A = 0) {
        return new Promise((B, Q) => {
            if (A) setTimeout(() => {
                let Z = new Error(`Request did not complete within ${A} ms`);
                Z.name = "TimeoutError", Q(Z)
            }, A)
        })
    }
    yM(BIB, "requestTimeout");
    var Oy1 = {
            supported: void 0
        },
        cf6 = class A {
            static {
                yM(this, "FetchHttpHandler")
            }
            static create(B) {
                if (typeof B?.handle === "function") return B;
                return new A(B)
            }
            constructor(B) {
                if (typeof B === "function") this.configProvider = B().then((Q) => Q || {});
                else this.config = B ?? {}, this.configProvider = Promise.resolve(this.config);
                if (Oy1.supported === void 0) Oy1.supported = Boolean(typeof Request !== "undefined" && "keepalive" in xz0("https://[::1]"))
            }
            destroy() {}
            async handle(B, {
                abortSignal: Q
            } = {}) {
                if (!this.config) this.config = await this.configProvider;
                let Z = this.config.requestTimeout,
                    D = this.config.keepAlive === !0,
                    G = this.config.credentials;
                if (Q?.aborted) {
                    let $ = new Error("Request aborted");
                    return $.name = "AbortError", Promise.reject($)
                }
                let F = B.path,
                    I = df6.buildQueryString(B.query || {});
                if (I) F += `?${I}`;
                if (B.fragment) F += `#${B.fragment}`;
                let Y = "";
                if (B.username != null || B.password != null) {
                    let $ = B.username ?? "",
                        L = B.password ?? "";
                    Y = `${$}:${L}@`
                }
                let {
                    port: W,
                    method: J
                } = B, X = `${B.protocol}//${Y}${B.hostname}${W?`:${W}`:""}${F}`, V = J === "GET" || J === "HEAD" ? void 0 : B.body, C = {
                    body: V,
                    headers: new Headers(B.headers),
                    method: J,
                    credentials: G
                };
                if (this.config?.cache) C.cache = this.config.cache;
                if (V) C.duplex = "half";
                if (typeof AbortController !== "undefined") C.signal = Q;
                if (Oy1.supported) C.keepalive = D;
                if (typeof this.config.requestInit === "function") Object.assign(C, this.config.requestInit(B));
                let K = yM(() => {}, "removeSignalEventListener"),
                    H = xz0(X, C),
                    z = [fetch(H).then(($) => {
                        let L = $.headers,
                            N = {};
                        for (let O of L.entries()) N[O[0]] = O[1];
                        if ($.body == null) return $.blob().then((O) => ({
                            response: new eFB.HttpResponse({
                                headers: N,
                                reason: $.statusText,
                                statusCode: $.status,
                                body: O
                            })
                        }));
                        return {
                            response: new eFB.HttpResponse({
                                headers: N,
                                reason: $.statusText,
                                statusCode: $.status,
                                body: $.body
                            })
                        }
                    }), BIB(Z)];
                if (Q) z.push(new Promise(($, L) => {
                    let N = yM(() => {
                        let R = new Error("Request aborted");
                        R.name = "AbortError", L(R)
                    }, "onAbort");
                    if (typeof Q.addEventListener === "function") {
                        let R = Q;
                        R.addEventListener("abort", N, {
                            once: !0
                        }), K = yM(() => R.removeEventListener("abort", N), "removeSignalEventListener")
                    } else Q.onabort = N
                }));
                return Promise.race(z).finally(K)
            }
            updateHttpClientConfig(B, Q) {
                this.config = void 0, this.configProvider = this.configProvider.then((Z) => {
                    return Z[B] = Q, Z
                })
            }
            httpHandlerConfigs() {
                return this.config ?? {}
            }
        },
        lf6 = tFB(),
        pf6 = yM(async (A) => {
            if (typeof Blob === "function" && A instanceof Blob || A.constructor?.name === "Blob") {
                if (Blob.prototype.arrayBuffer !== void 0) return new Uint8Array(await A.arrayBuffer());
                return QIB(A)
            }
            return ZIB(A)
        }, "streamCollector");
    async function QIB(A) {
        let B = await DIB(A),
            Q = lf6.fromBase64(B);
        return new Uint8Array(Q)
    }
    yM(QIB, "collectBlob");
    async function ZIB(A) {
        let B = [],
            Q = A.getReader(),
            Z = !1,
            D = 0;
        while (!Z) {
            let {
                done: I,
                value: Y
            } = await Q.read();
            if (Y) B.push(Y), D += Y.length;
            Z = I
        }
        let G = new Uint8Array(D),
            F = 0;
        for (let I of B) G.set(I, F), F += I.length;
        return G
    }
    yM(ZIB, "collectStream");

    function DIB(A) {
        return new Promise((B, Q) => {
            let Z = new FileReader;
            Z.onloadend = () => {
                if (Z.readyState !== 2) return Q(new Error("Reader aborted too early"));
                let D = Z.result ?? "",
                    G = D.indexOf(","),
                    F = G > -1 ? G + 1 : D.length;
                B(D.substring(F))
            }, Z.onabort = () => Q(new Error("Read aborted")), Z.onerror = () => Q(Z.error), Z.readAsDataURL(A)
        })
    }
    yM(DIB, "readToBase64")
});