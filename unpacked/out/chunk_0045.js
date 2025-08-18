/* chunk:45 bytes:[1206918, 1226578) size:19660 source:unpacked-cli.js */
var E5 = E((pt8, ge0) => {
    var {
        defineProperty: PC1,
        getOwnPropertyDescriptor: Ob9,
        getOwnPropertyNames: Tb9
    } = Object, Pb9 = Object.prototype.hasOwnProperty, fe0 = (A, B) => PC1(A, "name", {
        value: B,
        configurable: !0
    }), Sb9 = (A, B) => {
        for (var Q in B) PC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, jb9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Tb9(B))
                if (!Pb9.call(A, D) && D !== Q) PC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ob9(B, D)) || Z.enumerable
                })
        }
        return A
    }, kb9 = (A) => jb9(PC1({}, "__esModule", {
        value: !0
    }), A), he0 = {};
    Sb9(he0, {
        getSmithyContext: () => yb9,
        normalizeProvider: () => _b9
    });
    ge0.exports = kb9(he0);
    var be0 = ve0(),
        yb9 = fe0((A) => A[be0.SMITHY_CONTEXT_KEY] || (A[be0.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
        _b9 = fe0((A) => {
            if (typeof A === "function") return A;
            let B = Promise.resolve(A);
            return () => B
        }, "normalizeProvider")
});
var se0 = E((it8, ae0) => {
    var {
        defineProperty: SC1,
        getOwnPropertyDescriptor: xb9,
        getOwnPropertyNames: vb9
    } = Object, bb9 = Object.prototype.hasOwnProperty, jC1 = (A, B) => SC1(A, "name", {
        value: B,
        configurable: !0
    }), fb9 = (A, B) => {
        for (var Q in B) SC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, hb9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of vb9(B))
                if (!bb9.call(A, D) && D !== Q) SC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = xb9(B, D)) || Z.enumerable
                })
        }
        return A
    }, gb9 = (A) => hb9(SC1({}, "__esModule", {
        value: !0
    }), A), ue0 = {};
    fb9(ue0, {
        AlgorithmId: () => le0,
        EndpointURLScheme: () => ce0,
        FieldPosition: () => pe0,
        HttpApiKeyAuthLocation: () => de0,
        HttpAuthLocation: () => me0,
        IniSectionType: () => ie0,
        RequestHandlerProtocol: () => ne0,
        SMITHY_CONTEXT_KEY: () => lb9,
        getDefaultClientConfiguration: () => db9,
        resolveDefaultRuntimeConfig: () => cb9
    });
    ae0.exports = gb9(ue0);
    var me0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(me0 || {}),
        de0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(de0 || {}),
        ce0 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(ce0 || {}),
        le0 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(le0 || {}),
        ub9 = jC1((A) => {
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
        mb9 = jC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        db9 = jC1((A) => {
            return ub9(A)
        }, "getDefaultClientConfiguration"),
        cb9 = jC1((A) => {
            return mb9(A)
        }, "resolveDefaultRuntimeConfig"),
        pe0 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(pe0 || {}),
        lb9 = "__smithy_context",
        ie0 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(ie0 || {}),
        ne0 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(ne0 || {})
});
var B1A = E((nt8, A1A) => {
    var {
        defineProperty: kC1,
        getOwnPropertyDescriptor: pb9,
        getOwnPropertyNames: ib9
    } = Object, nb9 = Object.prototype.hasOwnProperty, Ck = (A, B) => kC1(A, "name", {
        value: B,
        configurable: !0
    }), ab9 = (A, B) => {
        for (var Q in B) kC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, sb9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ib9(B))
                if (!nb9.call(A, D) && D !== Q) kC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pb9(B, D)) || Z.enumerable
                })
        }
        return A
    }, rb9 = (A) => sb9(kC1({}, "__esModule", {
        value: !0
    }), A), re0 = {};
    ab9(re0, {
        Field: () => eb9,
        Fields: () => Af9,
        HttpRequest: () => Bf9,
        HttpResponse: () => Qf9,
        IHttpRequest: () => oe0.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => ob9,
        isValidHostname: () => ee0,
        resolveHttpHandlerRuntimeConfig: () => tb9
    });
    A1A.exports = rb9(re0);
    var ob9 = Ck((A) => {
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
        tb9 = Ck((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        oe0 = se0(),
        eb9 = class {
            static {
                Ck(this, "Field")
            }
            constructor({
                name: A,
                kind: B = oe0.FieldPosition.HEADER,
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
        Af9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Ck(this, "Fields")
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
        Bf9 = class A {
            static {
                Ck(this, "HttpRequest")
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
                if (Q.query) Q.query = te0(Q.query);
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

    function te0(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Ck(te0, "cloneQuery");
    var Qf9 = class {
        static {
            Ck(this, "HttpResponse")
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

    function ee0(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Ck(ee0, "isValidHostname")
});
var y3 = E((ot8, Y1A) => {
    var {
        defineProperty: yC1,
        getOwnPropertyDescriptor: Zf9,
        getOwnPropertyNames: Df9
    } = Object, Gf9 = Object.prototype.hasOwnProperty, _C1 = (A, B) => yC1(A, "name", {
        value: B,
        configurable: !0
    }), Ff9 = (A, B) => {
        for (var Q in B) yC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, If9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Df9(B))
                if (!Gf9.call(A, D) && D !== Q) yC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Zf9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Yf9 = (A) => If9(yC1({}, "__esModule", {
        value: !0
    }), A), Q1A = {};
    Ff9(Q1A, {
        deserializerMiddleware: () => Z1A,
        deserializerMiddlewareOption: () => G1A,
        getSerdePlugin: () => I1A,
        serializerMiddleware: () => D1A,
        serializerMiddlewareOption: () => F1A
    });
    Y1A.exports = Yf9(Q1A);
    var Wf9 = B1A(),
        Z1A = _C1((A, B) => (Q, Z) => async (D) => {
            let {
                response: G
            } = await Q(D);
            try {
                let F = await B(G, A);
                return {
                    response: G,
                    output: F
                }
            } catch (F) {
                if (Object.defineProperty(F, "$response", {
                        value: G
                    }), !("$metadata" in F)) {
                    try {
                        F.message += `
  Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`
                    } catch (Y) {
                        if (!Z.logger || Z.logger?.constructor?.name === "NoOpLogger") console.warn("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.");
                        else Z.logger?.warn?.("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.")
                    }
                    if (typeof F.$responseBodyText !== "undefined") {
                        if (F.$response) F.$response.body = F.$responseBodyText
                    }
                    try {
                        if (Wf9.HttpResponse.isInstance(G)) {
                            let {
                                headers: Y = {}
                            } = G, W = Object.entries(Y);
                            F.$metadata = {
                                httpStatusCode: G.statusCode,
                                requestId: Vn1(/^x-[\w-]+-request-?id$/, W),
                                extendedRequestId: Vn1(/^x-[\w-]+-id-2$/, W),
                                cfId: Vn1(/^x-[\w-]+-cf-id$/, W)
                            }
                        }
                    } catch (Y) {}
                }
                throw F
            }
        }, "deserializerMiddleware"),
        Vn1 = _C1((A, B) => {
            return (B.find(([Q]) => {
                return Q.match(A)
            }) || [void 0, void 0])[1]
        }, "findHeader"),
        D1A = _C1((A, B) => (Q, Z) => async (D) => {
            let G = A,
                F = Z.endpointV2?.url && G.urlParser ? async () => G.urlParser(Z.endpointV2.url): G.endpoint;
            if (!F) throw new Error("No valid endpoint provider available.");
            let I = await B(D.input, {
                ...A,
                endpoint: F
            });
            return Q({
                ...D,
                request: I
            })
        }, "serializerMiddleware"),
        G1A = {
            name: "deserializerMiddleware",
            step: "deserialize",
            tags: ["DESERIALIZER"],
            override: !0
        },
        F1A = {
            name: "serializerMiddleware",
            step: "serialize",
            tags: ["SERIALIZER"],
            override: !0
        };

    function I1A(A, B, Q) {
        return {
            applyToStack: (Z) => {
                Z.add(Z1A(A, Q), G1A), Z.add(D1A(A, B), F1A)
            }
        }
    }
    _C1(I1A, "getSerdePlugin")
});
var zh = E((tt8, C1A) => {
    var {
        defineProperty: xC1,
        getOwnPropertyDescriptor: Jf9,
        getOwnPropertyNames: Xf9
    } = Object, Vf9 = Object.prototype.hasOwnProperty, Kk = (A, B) => xC1(A, "name", {
        value: B,
        configurable: !0
    }), Cf9 = (A, B) => {
        for (var Q in B) xC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Kf9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xf9(B))
                if (!Vf9.call(A, D) && D !== Q) xC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Jf9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hf9 = (A) => Kf9(xC1({}, "__esModule", {
        value: !0
    }), A), W1A = {};
    Cf9(W1A, {
        Field: () => Uf9,
        Fields: () => wf9,
        HttpRequest: () => $f9,
        HttpResponse: () => qf9,
        IHttpRequest: () => J1A.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => zf9,
        isValidHostname: () => V1A,
        resolveHttpHandlerRuntimeConfig: () => Ef9
    });
    C1A.exports = Hf9(W1A);
    var zf9 = Kk((A) => {
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
        Ef9 = Kk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        J1A = Xn1(),
        Uf9 = class {
            static {
                Kk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = J1A.FieldPosition.HEADER,
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
        wf9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Kk(this, "Fields")
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
        $f9 = class A {
            static {
                Kk(this, "HttpRequest")
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
                if (Q.query) Q.query = X1A(Q.query);
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

    function X1A(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Kk(X1A, "cloneQuery");
    var qf9 = class {
        static {
            Kk(this, "HttpResponse")
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

    function V1A(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Kk(V1A, "isValidHostname")
});