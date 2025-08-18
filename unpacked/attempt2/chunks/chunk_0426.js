/* chunk:426 bytes:[10170764, 10184645) size:13881 source:unpacked-cli.js */
var vwB = E((HJ) => {
    var gA8 = HJ && HJ.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        uA8 = HJ && HJ.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        mA8 = HJ && HJ.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) gA8(B, A, Q)
            }
            return uA8(B, A), B
        },
        im = HJ && HJ.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        dA8 = HJ && HJ.__classPrivateFieldSet || function(A, B, Q, Z, D) {
            if (Z === "m") throw new TypeError("Private method is not writable");
            if (Z === "a" && !D) throw new TypeError("Private accessor was defined without a setter");
            if (typeof B === "function" ? A !== B || !D : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return Z === "a" ? D.call(A, Q) : D ? D.value = Q : B.set(A, Q), Q
        },
        xx1 = HJ && HJ.__importDefault || function(A) {
            return A && A.__esModule ? A : {
                default: A
            }
        },
        L11, pm, RwB, kwB, ywB, _wB, yx1, OwB;
    Object.defineProperty(HJ, "__esModule", {
        value: !0
    });
    HJ.Gaxios = void 0;
    var cA8 = xx1(bU0()),
        lA8 = W1("https"),
        pA8 = xx1(WwB()),
        iA8 = xx1(W1("querystring")),
        nA8 = xx1(XwB()),
        TwB = W1("url"),
        _x1 = Kw0(),
        aA8 = qwB(),
        PwB = W1("stream"),
        sA8 = b91(),
        SwB = Hw0(),
        rA8 = tA8() ? window.fetch : pA8.default;

    function oA8() {
        return typeof window !== "undefined" && !!window
    }

    function tA8() {
        return oA8() && !!window.fetch
    }

    function eA8() {
        return typeof Buffer !== "undefined"
    }

    function jwB(A, B) {
        return !!xwB(A, B)
    }

    function xwB(A, B) {
        B = B.toLowerCase();
        for (let Q of Object.keys((A === null || A === void 0 ? void 0 : A.headers) || {}))
            if (B === Q.toLowerCase()) return A.headers[Q];
        return
    }
    class zw0 {
        constructor(A) {
            L11.add(this), this.agentCache = new Map, this.defaults = A || {}, this.interceptors = {
                request: new SwB.GaxiosInterceptorManager,
                response: new SwB.GaxiosInterceptorManager
            }
        }
        async request(A = {}) {
            return A = await im(this, L11, "m", _wB).call(this, A), A = await im(this, L11, "m", kwB).call(this, A), im(this, L11, "m", ywB).call(this, this._request(A))
        }
        async _defaultAdapter(A) {
            let Q = await (A.fetchImplementation || rA8)(A.url, A),
                Z = await this.getResponseData(A, Q);
            return this.translateResponse(A, Q, Z)
        }
        async _request(A = {}) {
            var B;
            try {
                let Q;
                if (A.adapter) Q = await A.adapter(A, this._defaultAdapter.bind(this));
                else Q = await this._defaultAdapter(A);
                if (!A.validateStatus(Q.status)) {
                    if (A.responseType === "stream") {
                        let Z = "";
                        await new Promise((D) => {
                            (Q === null || Q === void 0 ? void 0 : Q.data).on("data", (G) => {
                                Z += G
                            }), (Q === null || Q === void 0 ? void 0 : Q.data).on("end", D)
                        }), Q.data = Z
                    }
                    throw new _x1.GaxiosError(`Request failed with status code ${Q.status}`, A, Q)
                }
                return Q
            } catch (Q) {
                let Z = Q instanceof _x1.GaxiosError ? Q : new _x1.GaxiosError(Q.message, A, void 0, Q),
                    {
                        shouldRetry: D,
                        config: G
                    } = await aA8.getRetryConfig(Z);
                if (D && G) return Z.config.retryConfig.currentRetryAttempt = G.retryConfig.currentRetryAttempt, A.retryConfig = (B = Z.config) === null || B === void 0 ? void 0 : B.retryConfig, this._request(A);
                throw Z
            }
        }
        async getResponseData(A, B) {
            switch (A.responseType) {
                case "stream":
                    return B.body;
                case "json": {
                    let Q = await B.text();
                    try {
                        Q = JSON.parse(Q)
                    } catch (Z) {}
                    return Q
                }
                case "arraybuffer":
                    return B.arrayBuffer();
                case "blob":
                    return B.blob();
                case "text":
                    return B.text();
                default:
                    return this.getResponseDataFromContentType(B)
            }
        }
        validateStatus(A) {
            return A >= 200 && A < 300
        }
        paramsSerializer(A) {
            return iA8.default.stringify(A)
        }
        translateResponse(A, B, Q) {
            let Z = {};
            return B.headers.forEach((D, G) => {
                Z[G] = D
            }), {
                config: A,
                data: Q,
                headers: Z,
                status: B.status,
                statusText: B.statusText,
                request: {
                    responseURL: B.url
                }
            }
        }
        async getResponseDataFromContentType(A) {
            let B = A.headers.get("Content-Type");
            if (B === null) return A.text();
            if (B = B.toLowerCase(), B.includes("application/json")) {
                let Q = await A.text();
                try {
                    Q = JSON.parse(Q)
                } catch (Z) {}
                return Q
            } else if (B.match(/^text\//)) return A.text();
            else return A.blob()
        }
        async * getMultipartRequest(A, B) {
            let Q = `--${B}--`;
            for (let Z of A) {
                let D = Z.headers["Content-Type"] || "application/octet-stream";
                if (yield `--${B}\r
Content-Type: ${D}\r
\r
`, typeof Z.content === "string") yield Z.content;
                else yield* Z.content;
                yield `\r
`
            }
            yield Q
        }
    }
    HJ.Gaxios = zw0;
    pm = zw0, L11 = new WeakSet, RwB = function A(B, Q = []) {
        var Z, D;
        let G = new TwB.URL(B),
            F = [...Q],
            I = ((D = (Z = process.env.NO_PROXY) !== null && Z !== void 0 ? Z : process.env.no_proxy) === null || D === void 0 ? void 0 : D.split(",")) || [];
        for (let Y of I) F.push(Y.trim());
        for (let Y of F)
            if (Y instanceof RegExp) {
                if (Y.test(G.toString())) return !1
            } else if (Y instanceof TwB.URL) {
            if (Y.origin === G.origin) return !1
        } else if (Y.startsWith("*.") || Y.startsWith(".")) {
            let W = Y.replace(/^\*\./, ".");
            if (G.hostname.endsWith(W)) return !1
        } else if (Y === G.origin || Y === G.hostname || Y === G.href) return !1;
        return !0
    }, kwB = async function A(B) {
        let Q = Promise.resolve(B);
        for (let Z of this.interceptors.request.values())
            if (Z) Q = Q.then(Z.resolved, Z.rejected);
        return Q
    }, ywB = async function A(B) {
        let Q = Promise.resolve(B);
        for (let Z of this.interceptors.response.values())
            if (Z) Q = Q.then(Z.resolved, Z.rejected);
        return Q
    }, _wB = async function A(B) {
        var Q, Z, D, G;
        let F = cA8.default(!0, {}, this.defaults, B);
        if (!F.url) throw new Error("URL is required.");
        let I = F.baseUrl || F.baseURL;
        if (I) F.url = I.toString() + F.url;
        if (F.paramsSerializer = F.paramsSerializer || this.paramsSerializer, F.params && Object.keys(F.params).length > 0) {
            let J = F.paramsSerializer(F.params);
            if (J.startsWith("?")) J = J.slice(1);
            let X = F.url.toString().includes("?") ? "&" : "?";
            F.url = F.url + X + J
        }
        if (typeof B.maxContentLength === "number") F.size = B.maxContentLength;
        if (typeof B.maxRedirects === "number") F.follow = B.maxRedirects;
        if (F.headers = F.headers || {}, F.multipart === void 0 && F.data) {
            let J = typeof FormData === "undefined" ? !1 : (F === null || F === void 0 ? void 0 : F.data) instanceof FormData;
            if (nA8.default.readable(F.data)) F.body = F.data;
            else if (eA8() && Buffer.isBuffer(F.data)) {
                if (F.body = F.data, !jwB(F, "Content-Type")) F.headers["Content-Type"] = "application/json"
            } else if (typeof F.data === "object") {
                if (!J)
                    if (xwB(F, "content-type") === "application/x-www-form-urlencoded") F.body = F.paramsSerializer(F.data);
                    else {
                        if (!jwB(F, "Content-Type")) F.headers["Content-Type"] = "application/json";
                        F.body = JSON.stringify(F.data)
                    }
            } else F.body = F.data
        } else if (F.multipart && F.multipart.length > 0) {
            let J = sA8.v4();
            F.headers["Content-Type"] = `multipart/related; boundary=${J}`;
            let X = new PwB.PassThrough;
            F.body = X, PwB.pipeline(this.getMultipartRequest(F.multipart, J), X, () => {})
        }
        if (F.validateStatus = F.validateStatus || this.validateStatus, F.responseType = F.responseType || "unknown", !F.headers.Accept && F.responseType === "json") F.headers.Accept = "application/json";
        F.method = F.method || "GET";
        let Y = F.proxy || ((Q = process === null || process === void 0 ? void 0 : process.env) === null || Q === void 0 ? void 0 : Q.HTTPS_PROXY) || ((Z = process === null || process === void 0 ? void 0 : process.env) === null || Z === void 0 ? void 0 : Z.https_proxy) || ((D = process === null || process === void 0 ? void 0 : process.env) === null || D === void 0 ? void 0 : D.HTTP_PROXY) || ((G = process === null || process === void 0 ? void 0 : process.env) === null || G === void 0 ? void 0 : G.http_proxy),
            W = im(this, L11, "m", RwB).call(this, F.url, F.noProxy);
        if (F.agent);
        else if (Y && W) {
            let J = await im(pm, pm, "m", OwB).call(pm);
            if (this.agentCache.has(Y)) F.agent = this.agentCache.get(Y);
            else F.agent = new J(Y, {
                cert: F.cert,
                key: F.key
            }), this.agentCache.set(Y, F.agent)
        } else if (F.cert && F.key)
            if (this.agentCache.has(F.key)) F.agent = this.agentCache.get(F.key);
            else F.agent = new lA8.Agent({
                cert: F.cert,
                key: F.key
            }), this.agentCache.set(F.key, F.agent);
        if (typeof F.errorRedactor !== "function" && F.errorRedactor !== !1) F.errorRedactor = _x1.defaultErrorRedactor;
        return F
    }, OwB = async function A() {
        return dA8(this, pm, im(this, pm, "f", yx1) || (await Promise.resolve().then(() => mA8(d10()))).HttpsProxyAgent, "f", yx1), im(this, pm, "f", yx1)
    };
    yx1 = {
        value: void 0
    }
});
var R$ = E((UX) => {
    var A28 = UX && UX.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        B28 = UX && UX.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) A28(B, A, Q)
        };
    Object.defineProperty(UX, "__esModule", {
        value: !0
    });
    UX.instance = UX.Gaxios = UX.GaxiosError = void 0;
    UX.request = Z28;
    var bwB = vwB();
    Object.defineProperty(UX, "Gaxios", {
        enumerable: !0,
        get: function() {
            return bwB.Gaxios
        }
    });
    var Q28 = Kw0();
    Object.defineProperty(UX, "GaxiosError", {
        enumerable: !0,
        get: function() {
            return Q28.GaxiosError
        }
    });
    B28(Hw0(), UX);
    UX.instance = new bwB.Gaxios;
    async function Z28(A) {
        return UX.instance.request(A)
    }
});