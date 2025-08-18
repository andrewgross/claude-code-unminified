/* chunk:49 bytes:[1281535, 1300209) size:18674 source:unpacked-cli.js */
var FAA = E((je8, GAA) => {
    var {
        defineProperty: pC1,
        getOwnPropertyDescriptor: mg9,
        getOwnPropertyNames: dg9
    } = Object, cg9 = Object.prototype.hasOwnProperty, iC1 = (A, B) => pC1(A, "name", {
        value: B,
        configurable: !0
    }), lg9 = (A, B) => {
        for (var Q in B) pC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, pg9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dg9(B))
                if (!cg9.call(A, D) && D !== Q) pC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mg9(B, D)) || Z.enumerable
                })
        }
        return A
    }, ig9 = (A) => pg9(pC1({}, "__esModule", {
        value: !0
    }), A), o0A = {};
    lg9(o0A, {
        AlgorithmId: () => BAA,
        EndpointURLScheme: () => AAA,
        FieldPosition: () => QAA,
        HttpApiKeyAuthLocation: () => e0A,
        HttpAuthLocation: () => t0A,
        IniSectionType: () => ZAA,
        RequestHandlerProtocol: () => DAA,
        SMITHY_CONTEXT_KEY: () => og9,
        getDefaultClientConfiguration: () => sg9,
        resolveDefaultRuntimeConfig: () => rg9
    });
    GAA.exports = ig9(o0A);
    var t0A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(t0A || {}),
        e0A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(e0A || {}),
        AAA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(AAA || {}),
        BAA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(BAA || {}),
        ng9 = iC1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        ag9 = iC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        sg9 = iC1((A) => {
            return ng9(A)
        }, "getDefaultClientConfiguration"),
        rg9 = iC1((A) => {
            return ag9(A)
        }, "resolveDefaultRuntimeConfig"),
        QAA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(QAA || {}),
        og9 = "__smithy_context",
        ZAA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(ZAA || {}),
        DAA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(DAA || {})
});
var VAA = E((ke8, XAA) => {
    var {
        defineProperty: nC1,
        getOwnPropertyDescriptor: tg9,
        getOwnPropertyNames: eg9
    } = Object, Au9 = Object.prototype.hasOwnProperty, Ek = (A, B) => nC1(A, "name", {
        value: B,
        configurable: !0
    }), Bu9 = (A, B) => {
        for (var Q in B) nC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Qu9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eg9(B))
                if (!Au9.call(A, D) && D !== Q) nC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tg9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Zu9 = (A) => Qu9(nC1({}, "__esModule", {
        value: !0
    }), A), IAA = {};
    Bu9(IAA, {
        Field: () => Fu9,
        Fields: () => Iu9,
        HttpRequest: () => Yu9,
        HttpResponse: () => Wu9,
        IHttpRequest: () => YAA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Du9,
        isValidHostname: () => JAA,
        resolveHttpHandlerRuntimeConfig: () => Gu9
    });
    XAA.exports = Zu9(IAA);
    var Du9 = Ek((A) => {
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
        Gu9 = Ek((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        YAA = FAA(),
        Fu9 = class {
            static {
                Ek(this, "Field")
            }
            constructor({
                name: A,
                kind: B = YAA.FieldPosition.HEADER,
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
        Iu9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Ek(this, "Fields")
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
        Yu9 = class A {
            static {
                Ek(this, "HttpRequest")
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
                if (Q.query) Q.query = WAA(Q.query);
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

    function WAA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Ek(WAA, "cloneQuery");
    var Wu9 = class {
        static {
            Ek(this, "HttpResponse")
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

    function JAA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Ek(JAA, "isValidHostname")
});
var zAA = E((ve8, HAA) => {
    var {
        defineProperty: aC1,
        getOwnPropertyDescriptor: Ju9,
        getOwnPropertyNames: Xu9
    } = Object, Vu9 = Object.prototype.hasOwnProperty, Mn1 = (A, B) => aC1(A, "name", {
        value: B,
        configurable: !0
    }), Cu9 = (A, B) => {
        for (var Q in B) aC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ku9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xu9(B))
                if (!Vu9.call(A, D) && D !== Q) aC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ju9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hu9 = (A) => Ku9(aC1({}, "__esModule", {
        value: !0
    }), A), CAA = {};
    Cu9(CAA, {
        escapeUri: () => KAA,
        escapeUriPath: () => Eu9
    });
    HAA.exports = Hu9(CAA);
    var KAA = Mn1((A) => encodeURIComponent(A).replace(/[!'()*]/g, zu9), "escapeUri"),
        zu9 = Mn1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        Eu9 = Mn1((A) => A.split("/").map(KAA).join("/"), "escapeUriPath")
});
var $AA = E((be8, wAA) => {
    var {
        defineProperty: sC1,
        getOwnPropertyDescriptor: Uu9,
        getOwnPropertyNames: wu9
    } = Object, $u9 = Object.prototype.hasOwnProperty, qu9 = (A, B) => sC1(A, "name", {
        value: B,
        configurable: !0
    }), Nu9 = (A, B) => {
        for (var Q in B) sC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Lu9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of wu9(B))
                if (!$u9.call(A, D) && D !== Q) sC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Uu9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Mu9 = (A) => Lu9(sC1({}, "__esModule", {
        value: !0
    }), A), EAA = {};
    Nu9(EAA, {
        buildQueryString: () => UAA
    });
    wAA.exports = Mu9(EAA);
    var Rn1 = zAA();

    function UAA(A) {
        let B = [];
        for (let Q of Object.keys(A).sort()) {
            let Z = A[Q];
            if (Q = Rn1.escapeUri(Q), Array.isArray(Z))
                for (let D = 0, G = Z.length; D < G; D++) B.push(`${Q}=${Rn1.escapeUri(Z[D])}`);
            else {
                let D = Q;
                if (Z || typeof Z === "string") D += `=${Rn1.escapeUri(Z)}`;
                B.push(D)
            }
        }
        return B.join("&")
    }
    qu9(UAA, "buildQueryString")
});
var PAA = E((fe8, TAA) => {
    var {
        defineProperty: oC1,
        getOwnPropertyDescriptor: Ru9,
        getOwnPropertyNames: Ou9
    } = Object, Tu9 = Object.prototype.hasOwnProperty, zN = (A, B) => oC1(A, "name", {
        value: B,
        configurable: !0
    }), Pu9 = (A, B) => {
        for (var Q in B) oC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Su9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ou9(B))
                if (!Tu9.call(A, D) && D !== Q) oC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ru9(B, D)) || Z.enumerable
                })
        }
        return A
    }, ju9 = (A) => Su9(oC1({}, "__esModule", {
        value: !0
    }), A), NAA = {};
    Pu9(NAA, {
        FetchHttpHandler: () => yu9,
        keepAliveSupport: () => rC1,
        streamCollector: () => xu9
    });
    TAA.exports = ju9(NAA);
    var qAA = VAA(),
        ku9 = $AA();

    function On1(A, B) {
        return new Request(A, B)
    }
    zN(On1, "createRequest");

    function LAA(A = 0) {
        return new Promise((B, Q) => {
            if (A) setTimeout(() => {
                let Z = new Error(`Request did not complete within ${A} ms`);
                Z.name = "TimeoutError", Q(Z)
            }, A)
        })
    }
    zN(LAA, "requestTimeout");
    var rC1 = {
            supported: void 0
        },
        yu9 = class A {
            static {
                zN(this, "FetchHttpHandler")
            }
            static create(B) {
                if (typeof B?.handle === "function") return B;
                return new A(B)
            }
            constructor(B) {
                if (typeof B === "function") this.configProvider = B().then((Q) => Q || {});
                else this.config = B ?? {}, this.configProvider = Promise.resolve(this.config);
                if (rC1.supported === void 0) rC1.supported = Boolean(typeof Request !== "undefined" && "keepalive" in On1("https://[::1]"))
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
                    I = ku9.buildQueryString(B.query || {});
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
                if (rC1.supported) C.keepalive = D;
                if (typeof this.config.requestInit === "function") Object.assign(C, this.config.requestInit(B));
                let K = zN(() => {}, "removeSignalEventListener"),
                    H = On1(X, C),
                    z = [fetch(H).then(($) => {
                        let L = $.headers,
                            N = {};
                        for (let O of L.entries()) N[O[0]] = O[1];
                        if ($.body == null) return $.blob().then((O) => ({
                            response: new qAA.HttpResponse({
                                headers: N,
                                reason: $.statusText,
                                statusCode: $.status,
                                body: O
                            })
                        }));
                        return {
                            response: new qAA.HttpResponse({
                                headers: N,
                                reason: $.statusText,
                                statusCode: $.status,
                                body: $.body
                            })
                        }
                    }), LAA(Z)];
                if (Q) z.push(new Promise(($, L) => {
                    let N = zN(() => {
                        let R = new Error("Request aborted");
                        R.name = "AbortError", L(R)
                    }, "onAbort");
                    if (typeof Q.addEventListener === "function") {
                        let R = Q;
                        R.addEventListener("abort", N, {
                            once: !0
                        }), K = zN(() => R.removeEventListener("abort", N), "removeSignalEventListener")
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
        _u9 = up(),
        xu9 = zN(async (A) => {
            if (typeof Blob === "function" && A instanceof Blob || A.constructor?.name === "Blob") {
                if (Blob.prototype.arrayBuffer !== void 0) return new Uint8Array(await A.arrayBuffer());
                return MAA(A)
            }
            return RAA(A)
        }, "streamCollector");
    async function MAA(A) {
        let B = await OAA(A),
            Q = _u9.fromBase64(B);
        return new Uint8Array(Q)
    }
    zN(MAA, "collectBlob");
    async function RAA(A) {
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
    zN(RAA, "collectStream");

    function OAA(A) {
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
    zN(OAA, "readToBase64")
});