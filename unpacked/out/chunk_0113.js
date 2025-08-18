/* chunk:113 bytes:[2610369, 2615817) size:5448 source:unpacked-cli.js */
var PE1 = E((tQ5, _$A) => {
    var {
        defineProperty: TE1,
        getOwnPropertyDescriptor: VwQ,
        getOwnPropertyNames: CwQ
    } = Object, KwQ = Object.prototype.hasOwnProperty, ck = (A, B) => TE1(A, "name", {
        value: B,
        configurable: !0
    }), HwQ = (A, B) => {
        for (var Q in B) TE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, zwQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of CwQ(B))
                if (!KwQ.call(A, D) && D !== Q) TE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = VwQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, EwQ = (A) => zwQ(TE1({}, "__esModule", {
        value: !0
    }), A), S$A = {};
    HwQ(S$A, {
        Field: () => $wQ,
        Fields: () => qwQ,
        HttpRequest: () => NwQ,
        HttpResponse: () => LwQ,
        IHttpRequest: () => j$A.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => UwQ,
        isValidHostname: () => y$A,
        resolveHttpHandlerRuntimeConfig: () => wwQ
    });
    _$A.exports = EwQ(S$A);
    var UwQ = ck((A) => {
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
        wwQ = ck((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        j$A = He1(),
        $wQ = class {
            static {
                ck(this, "Field")
            }
            constructor({
                name: A,
                kind: B = j$A.FieldPosition.HEADER,
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
        qwQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                ck(this, "Fields")
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
        NwQ = class A {
            static {
                ck(this, "HttpRequest")
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
                if (Q.query) Q.query = k$A(Q.query);
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

    function k$A(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    ck(k$A, "cloneQuery");
    var LwQ = class {
        static {
            ck(this, "HttpResponse")
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

    function y$A(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    ck(y$A, "isValidHostname")
});