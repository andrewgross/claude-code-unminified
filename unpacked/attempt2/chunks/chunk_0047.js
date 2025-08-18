/* chunk:47 bytes:[1246292, 1257618) size:11326 source:unpacked-cli.js */
var N0A = E((we8, q0A) => {
    var {
        defineProperty: uC1,
        getOwnPropertyDescriptor: bh9,
        getOwnPropertyNames: fh9
    } = Object, hh9 = Object.prototype.hasOwnProperty, mC1 = (A, B) => uC1(A, "name", {
        value: B,
        configurable: !0
    }), gh9 = (A, B) => {
        for (var Q in B) uC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, uh9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of fh9(B))
                if (!hh9.call(A, D) && D !== Q) uC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = bh9(B, D)) || Z.enumerable
                })
        }
        return A
    }, mh9 = (A) => uh9(uC1({}, "__esModule", {
        value: !0
    }), A), C0A = {};
    gh9(C0A, {
        AlgorithmId: () => E0A,
        EndpointURLScheme: () => z0A,
        FieldPosition: () => U0A,
        HttpApiKeyAuthLocation: () => H0A,
        HttpAuthLocation: () => K0A,
        IniSectionType: () => w0A,
        RequestHandlerProtocol: () => $0A,
        SMITHY_CONTEXT_KEY: () => ih9,
        getDefaultClientConfiguration: () => lh9,
        resolveDefaultRuntimeConfig: () => ph9
    });
    q0A.exports = mh9(C0A);
    var K0A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(K0A || {}),
        H0A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(H0A || {}),
        z0A = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(z0A || {}),
        E0A = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(E0A || {}),
        dh9 = mC1((A) => {
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
        ch9 = mC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        lh9 = mC1((A) => {
            return dh9(A)
        }, "getDefaultClientConfiguration"),
        ph9 = mC1((A) => {
            return ch9(A)
        }, "resolveDefaultRuntimeConfig"),
        U0A = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(U0A || {}),
        ih9 = "__smithy_context",
        w0A = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(w0A || {}),
        $0A = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })($0A || {})
});
var P0A = E(($e8, T0A) => {
    var {
        defineProperty: dC1,
        getOwnPropertyDescriptor: nh9,
        getOwnPropertyNames: ah9
    } = Object, sh9 = Object.prototype.hasOwnProperty, zk = (A, B) => dC1(A, "name", {
        value: B,
        configurable: !0
    }), rh9 = (A, B) => {
        for (var Q in B) dC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, oh9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ah9(B))
                if (!sh9.call(A, D) && D !== Q) dC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = nh9(B, D)) || Z.enumerable
                })
        }
        return A
    }, th9 = (A) => oh9(dC1({}, "__esModule", {
        value: !0
    }), A), L0A = {};
    rh9(L0A, {
        Field: () => Bg9,
        Fields: () => Qg9,
        HttpRequest: () => Zg9,
        HttpResponse: () => Dg9,
        IHttpRequest: () => M0A.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => eh9,
        isValidHostname: () => O0A,
        resolveHttpHandlerRuntimeConfig: () => Ag9
    });
    T0A.exports = th9(L0A);
    var eh9 = zk((A) => {
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
        Ag9 = zk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        M0A = N0A(),
        Bg9 = class {
            static {
                zk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = M0A.FieldPosition.HEADER,
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
        Qg9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                zk(this, "Fields")
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
        Zg9 = class A {
            static {
                zk(this, "HttpRequest")
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
                if (Q.query) Q.query = R0A(Q.query);
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

    function R0A(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    zk(R0A, "cloneQuery");
    var Dg9 = class {
        static {
            zk(this, "HttpResponse")
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

    function O0A(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    zk(O0A, "isValidHostname")
});
var y0A = E((Me8, k0A) => {
    var {
        defineProperty: cC1,
        getOwnPropertyDescriptor: Gg9,
        getOwnPropertyNames: Fg9
    } = Object, Ig9 = Object.prototype.hasOwnProperty, wn1 = (A, B) => cC1(A, "name", {
        value: B,
        configurable: !0
    }), Yg9 = (A, B) => {
        for (var Q in B) cC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Wg9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Fg9(B))
                if (!Ig9.call(A, D) && D !== Q) cC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Gg9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Jg9 = (A) => Wg9(cC1({}, "__esModule", {
        value: !0
    }), A), S0A = {};
    Yg9(S0A, {
        escapeUri: () => j0A,
        escapeUriPath: () => Vg9
    });
    k0A.exports = Jg9(S0A);
    var j0A = wn1((A) => encodeURIComponent(A).replace(/[!'()*]/g, Xg9), "escapeUri"),
        Xg9 = wn1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        Vg9 = wn1((A) => A.split("/").map(j0A).join("/"), "escapeUriPath")
});
var b0A = E((Re8, v0A) => {
    var {
        defineProperty: lC1,
        getOwnPropertyDescriptor: Cg9,
        getOwnPropertyNames: Kg9
    } = Object, Hg9 = Object.prototype.hasOwnProperty, zg9 = (A, B) => lC1(A, "name", {
        value: B,
        configurable: !0
    }), Eg9 = (A, B) => {
        for (var Q in B) lC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ug9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Kg9(B))
                if (!Hg9.call(A, D) && D !== Q) lC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Cg9(B, D)) || Z.enumerable
                })
        }
        return A
    }, wg9 = (A) => Ug9(lC1({}, "__esModule", {
        value: !0
    }), A), _0A = {};
    Eg9(_0A, {
        buildQueryString: () => x0A
    });
    v0A.exports = wg9(_0A);
    var $n1 = y0A();

    function x0A(A) {
        let B = [];
        for (let Q of Object.keys(A).sort()) {
            let Z = A[Q];
            if (Q = $n1.escapeUri(Q), Array.isArray(Z))
                for (let D = 0, G = Z.length; D < G; D++) B.push(`${Q}=${$n1.escapeUri(Z[D])}`);
            else {
                let D = Q;
                if (Z || typeof Z === "string") D += `=${$n1.escapeUri(Z)}`;
                B.push(D)
            }
        }
        return B.join("&")
    }
    zg9(x0A, "buildQueryString")
});