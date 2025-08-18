/* chunk:106 bytes:[2507456, 2512904) size:5448 source:unpacked-cli.js */
var VUA = E((MQ5, XUA) => {
    var {
        defineProperty: WE1,
        getOwnPropertyDescriptor: XzQ,
        getOwnPropertyNames: VzQ
    } = Object, CzQ = Object.prototype.hasOwnProperty, mk = (A, B) => WE1(A, "name", {
        value: B,
        configurable: !0
    }), KzQ = (A, B) => {
        for (var Q in B) WE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, HzQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of VzQ(B))
                if (!CzQ.call(A, D) && D !== Q) WE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = XzQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, zzQ = (A) => HzQ(WE1({}, "__esModule", {
        value: !0
    }), A), IUA = {};
    KzQ(IUA, {
        Field: () => wzQ,
        Fields: () => $zQ,
        HttpRequest: () => qzQ,
        HttpResponse: () => NzQ,
        IHttpRequest: () => YUA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => EzQ,
        isValidHostname: () => JUA,
        resolveHttpHandlerRuntimeConfig: () => UzQ
    });
    XUA.exports = zzQ(IUA);
    var EzQ = mk((A) => {
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
        UzQ = mk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        YUA = st1(),
        wzQ = class {
            static {
                mk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = YUA.FieldPosition.HEADER,
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
        $zQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                mk(this, "Fields")
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
        qzQ = class A {
            static {
                mk(this, "HttpRequest")
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
                if (Q.query) Q.query = WUA(Q.query);
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

    function WUA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    mk(WUA, "cloneQuery");
    var NzQ = class {
        static {
            mk(this, "HttpResponse")
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

    function JUA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    mk(JUA, "isValidHostname")
});