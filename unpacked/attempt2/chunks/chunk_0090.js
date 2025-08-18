/* chunk:90 bytes:[2217206, 2227184) size:9978 source:unpacked-cli.js */
var yXA = E((jXA) => {
    Object.defineProperty(jXA, "__esModule", {
        value: !0
    });
    jXA.checkUrl = void 0;
    var wFQ = A9(),
        $FQ = "169.254.170.2",
        qFQ = "169.254.170.23",
        NFQ = "[fd00:ec2::23]",
        LFQ = (A, B) => {
            if (A.protocol === "https:") return;
            if (A.hostname === $FQ || A.hostname === qFQ || A.hostname === NFQ) return;
            if (A.hostname.includes("[")) {
                if (A.hostname === "[::1]" || A.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") return
            } else {
                if (A.hostname === "localhost") return;
                let Q = A.hostname.split("."),
                    Z = (D) => {
                        let G = parseInt(D, 10);
                        return 0 <= G && G <= 255
                    };
                if (Q[0] === "127" && Z(Q[1]) && Z(Q[2]) && Z(Q[3]) && Q.length === 4) return
            }
            throw new wFQ.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
                logger: B
            })
        };
    jXA.checkUrl = LFQ
});
var oo1 = E((B95, mXA) => {
    var {
        defineProperty: Gz1,
        getOwnPropertyDescriptor: MFQ,
        getOwnPropertyNames: RFQ
    } = Object, OFQ = Object.prototype.hasOwnProperty, Fz1 = (A, B) => Gz1(A, "name", {
        value: B,
        configurable: !0
    }), TFQ = (A, B) => {
        for (var Q in B) Gz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, PFQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of RFQ(B))
                if (!OFQ.call(A, D) && D !== Q) Gz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = MFQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, SFQ = (A) => PFQ(Gz1({}, "__esModule", {
        value: !0
    }), A), _XA = {};
    TFQ(_XA, {
        AlgorithmId: () => fXA,
        EndpointURLScheme: () => bXA,
        FieldPosition: () => hXA,
        HttpApiKeyAuthLocation: () => vXA,
        HttpAuthLocation: () => xXA,
        IniSectionType: () => gXA,
        RequestHandlerProtocol: () => uXA,
        SMITHY_CONTEXT_KEY: () => xFQ,
        getDefaultClientConfiguration: () => yFQ,
        resolveDefaultRuntimeConfig: () => _FQ
    });
    mXA.exports = SFQ(_XA);
    var xXA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(xXA || {}),
        vXA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(vXA || {}),
        bXA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(bXA || {}),
        fXA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(fXA || {}),
        jFQ = Fz1((A) => {
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
        kFQ = Fz1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        yFQ = Fz1((A) => {
            return jFQ(A)
        }, "getDefaultClientConfiguration"),
        _FQ = Fz1((A) => {
            return kFQ(A)
        }, "resolveDefaultRuntimeConfig"),
        hXA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(hXA || {}),
        xFQ = "__smithy_context",
        gXA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(gXA || {}),
        uXA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(uXA || {})
});
var nXA = E((Q95, iXA) => {
    var {
        defineProperty: Iz1,
        getOwnPropertyDescriptor: vFQ,
        getOwnPropertyNames: bFQ
    } = Object, fFQ = Object.prototype.hasOwnProperty, vk = (A, B) => Iz1(A, "name", {
        value: B,
        configurable: !0
    }), hFQ = (A, B) => {
        for (var Q in B) Iz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, gFQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bFQ(B))
                if (!fFQ.call(A, D) && D !== Q) Iz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vFQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, uFQ = (A) => gFQ(Iz1({}, "__esModule", {
        value: !0
    }), A), dXA = {};
    hFQ(dXA, {
        Field: () => cFQ,
        Fields: () => lFQ,
        HttpRequest: () => pFQ,
        HttpResponse: () => iFQ,
        IHttpRequest: () => cXA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => mFQ,
        isValidHostname: () => pXA,
        resolveHttpHandlerRuntimeConfig: () => dFQ
    });
    iXA.exports = uFQ(dXA);
    var mFQ = vk((A) => {
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
        dFQ = vk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        cXA = oo1(),
        cFQ = class {
            static {
                vk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = cXA.FieldPosition.HEADER,
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
        lFQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                vk(this, "Fields")
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
        pFQ = class A {
            static {
                vk(this, "HttpRequest")
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
                if (Q.query) Q.query = lXA(Q.query);
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

    function lXA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    vk(lXA, "cloneQuery");
    var iFQ = class {
        static {
            vk(this, "HttpResponse")
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

    function pXA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    vk(pXA, "isValidHostname")
});