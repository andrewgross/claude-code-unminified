/* chunk:269 bytes:[5768262, 5773709) size:5447 source:unpacked-cli.js */
var SK = E((QM5, _C2) => {
    var {
        defineProperty: UM1,
        getOwnPropertyDescriptor: tx4,
        getOwnPropertyNames: ex4
    } = Object, Av4 = Object.prototype.hasOwnProperty, R_ = (A, B) => UM1(A, "name", {
        value: B,
        configurable: !0
    }), Bv4 = (A, B) => {
        for (var Q in B) UM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Qv4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ex4(B))
                if (!Av4.call(A, D) && D !== Q) UM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tx4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Zv4 = (A) => Qv4(UM1({}, "__esModule", {
        value: !0
    }), A), SC2 = {};
    Bv4(SC2, {
        Field: () => Fv4,
        Fields: () => Iv4,
        HttpRequest: () => Yv4,
        HttpResponse: () => Wv4,
        IHttpRequest: () => jC2.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Dv4,
        isValidHostname: () => yC2,
        resolveHttpHandlerRuntimeConfig: () => Gv4
    });
    _C2.exports = Zv4(SC2);
    var Dv4 = R_((A) => {
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
        Gv4 = R_((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        jC2 = _Z0(),
        Fv4 = class {
            static {
                R_(this, "Field")
            }
            constructor({
                name: A,
                kind: B = jC2.FieldPosition.HEADER,
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
        Iv4 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                R_(this, "Fields")
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
        Yv4 = class A {
            static {
                R_(this, "HttpRequest")
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
                if (Q.query) Q.query = kC2(Q.query);
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

    function kC2(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    R_(kC2, "cloneQuery");
    var Wv4 = class {
        static {
            R_(this, "HttpResponse")
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

    function yC2(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    R_(yC2, "isValidHostname")
});