/* chunk:95 bytes:[2309249, 2314697) size:5448 source:unpacked-cli.js */
var uCA = E((k95, gCA) => {
    var {
        defineProperty: Rz1,
        getOwnPropertyDescriptor: WJQ,
        getOwnPropertyNames: JJQ
    } = Object, XJQ = Object.prototype.hasOwnProperty, hk = (A, B) => Rz1(A, "name", {
        value: B,
        configurable: !0
    }), VJQ = (A, B) => {
        for (var Q in B) Rz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, CJQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of JJQ(B))
                if (!XJQ.call(A, D) && D !== Q) Rz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = WJQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, KJQ = (A) => CJQ(Rz1({}, "__esModule", {
        value: !0
    }), A), vCA = {};
    VJQ(vCA, {
        Field: () => EJQ,
        Fields: () => UJQ,
        HttpRequest: () => wJQ,
        HttpResponse: () => $JQ,
        IHttpRequest: () => bCA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => HJQ,
        isValidHostname: () => hCA,
        resolveHttpHandlerRuntimeConfig: () => zJQ
    });
    gCA.exports = KJQ(vCA);
    var HJQ = hk((A) => {
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
        zJQ = hk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        bCA = xCA(),
        EJQ = class {
            static {
                hk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = bCA.FieldPosition.HEADER,
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
        UJQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                hk(this, "Fields")
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
        wJQ = class A {
            static {
                hk(this, "HttpRequest")
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
                if (Q.query) Q.query = fCA(Q.query);
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

    function fCA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    hk(fCA, "cloneQuery");
    var $JQ = class {
        static {
            hk(this, "HttpResponse")
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

    function hCA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    hk(hCA, "isValidHostname")
});