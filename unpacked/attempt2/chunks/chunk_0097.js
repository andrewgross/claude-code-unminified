/* chunk:97 bytes:[2335712, 2346675) size:10963 source:unpacked-cli.js */
var zt1 = E((b95, MKA) => {
    var {
        defineProperty: Sz1,
        getOwnPropertyDescriptor: qJQ,
        getOwnPropertyNames: NJQ
    } = Object, LJQ = Object.prototype.hasOwnProperty, jz1 = (A, B) => Sz1(A, "name", {
        value: B,
        configurable: !0
    }), MJQ = (A, B) => {
        for (var Q in B) Sz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, RJQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of NJQ(B))
                if (!LJQ.call(A, D) && D !== Q) Sz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qJQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, OJQ = (A) => RJQ(Sz1({}, "__esModule", {
        value: !0
    }), A), zKA = {};
    MJQ(zKA, {
        AlgorithmId: () => $KA,
        EndpointURLScheme: () => wKA,
        FieldPosition: () => qKA,
        HttpApiKeyAuthLocation: () => UKA,
        HttpAuthLocation: () => EKA,
        IniSectionType: () => NKA,
        RequestHandlerProtocol: () => LKA,
        SMITHY_CONTEXT_KEY: () => kJQ,
        getDefaultClientConfiguration: () => SJQ,
        resolveDefaultRuntimeConfig: () => jJQ
    });
    MKA.exports = OJQ(zKA);
    var EKA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(EKA || {}),
        UKA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(UKA || {}),
        wKA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(wKA || {}),
        $KA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })($KA || {}),
        TJQ = jz1((A) => {
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
        PJQ = jz1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        SJQ = jz1((A) => {
            return TJQ(A)
        }, "getDefaultClientConfiguration"),
        jJQ = jz1((A) => {
            return PJQ(A)
        }, "resolveDefaultRuntimeConfig"),
        qKA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(qKA || {}),
        kJQ = "__smithy_context",
        NKA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(NKA || {}),
        LKA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(LKA || {})
});
var YQ1 = E((f95, SKA) => {
    var {
        defineProperty: kz1,
        getOwnPropertyDescriptor: yJQ,
        getOwnPropertyNames: _JQ
    } = Object, xJQ = Object.prototype.hasOwnProperty, gk = (A, B) => kz1(A, "name", {
        value: B,
        configurable: !0
    }), vJQ = (A, B) => {
        for (var Q in B) kz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, bJQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of _JQ(B))
                if (!xJQ.call(A, D) && D !== Q) kz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = yJQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, fJQ = (A) => bJQ(kz1({}, "__esModule", {
        value: !0
    }), A), RKA = {};
    vJQ(RKA, {
        Field: () => uJQ,
        Fields: () => mJQ,
        HttpRequest: () => dJQ,
        HttpResponse: () => cJQ,
        IHttpRequest: () => OKA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => hJQ,
        isValidHostname: () => PKA,
        resolveHttpHandlerRuntimeConfig: () => gJQ
    });
    SKA.exports = fJQ(RKA);
    var hJQ = gk((A) => {
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
        gJQ = gk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        OKA = zt1(),
        uJQ = class {
            static {
                gk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = OKA.FieldPosition.HEADER,
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
        mJQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                gk(this, "Fields")
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
        dJQ = class A {
            static {
                gk(this, "HttpRequest")
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
                if (Q.query) Q.query = TKA(Q.query);
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

    function TKA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    gk(TKA, "cloneQuery");
    var cJQ = class {
        static {
            gk(this, "HttpResponse")
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

    function PKA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    gk(PKA, "isValidHostname")
});
var yKA = E((m95, kKA) => {
    var {
        defineProperty: yz1,
        getOwnPropertyDescriptor: lJQ,
        getOwnPropertyNames: pJQ
    } = Object, iJQ = Object.prototype.hasOwnProperty, nJQ = (A, B) => yz1(A, "name", {
        value: B,
        configurable: !0
    }), aJQ = (A, B) => {
        for (var Q in B) yz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, sJQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of pJQ(B))
                if (!iJQ.call(A, D) && D !== Q) yz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = lJQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, rJQ = (A) => sJQ(yz1({}, "__esModule", {
        value: !0
    }), A), jKA = {};
    aJQ(jKA, {
        isArrayBuffer: () => oJQ
    });
    kKA.exports = rJQ(jKA);
    var oJQ = nJQ((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var bKA = E((d95, vKA) => {
    var {
        defineProperty: _z1,
        getOwnPropertyDescriptor: tJQ,
        getOwnPropertyNames: eJQ
    } = Object, AXQ = Object.prototype.hasOwnProperty, Et1 = (A, B) => _z1(A, "name", {
        value: B,
        configurable: !0
    }), BXQ = (A, B) => {
        for (var Q in B) _z1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, QXQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eJQ(B))
                if (!AXQ.call(A, D) && D !== Q) _z1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tJQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, ZXQ = (A) => QXQ(_z1({}, "__esModule", {
        value: !0
    }), A), _KA = {};
    BXQ(_KA, {
        escapeUri: () => xKA,
        escapeUriPath: () => GXQ
    });
    vKA.exports = ZXQ(_KA);
    var xKA = Et1((A) => encodeURIComponent(A).replace(/[!'()*]/g, DXQ), "escapeUri"),
        DXQ = Et1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        GXQ = Et1((A) => A.split("/").map(xKA).join("/"), "escapeUriPath")
});