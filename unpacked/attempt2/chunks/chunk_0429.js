/* chunk:429 bytes:[10243605, 10262399) size:18794 source:unpacked-cli.js */
var Y$B = E((U3) => {
    var K28 = U3 && U3.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        H28 = U3 && U3.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        Z$B = U3 && U3.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) K28(B, A, Q)
            }
            return H28(B, A), B
        };
    Object.defineProperty(U3, "__esModule", {
        value: !0
    });
    U3.env = U3.DebugLogBackendBase = U3.placeholder = U3.AdhocDebugLogger = U3.LogSeverity = void 0;
    U3.getNodeBackend = ww0;
    U3.getDebugBackend = E28;
    U3.getStructuredBackend = U28;
    U3.setBackend = w28;
    U3.log = I$B;
    var z28 = W1("node:events"),
        dD1 = Z$B(W1("node:process")),
        D$B = Z$B(W1("node:util")),
        sK = Q$B(),
        O$;
    (function(A) {
        A.DEFAULT = "DEFAULT", A.DEBUG = "DEBUG", A.INFO = "INFO", A.WARNING = "WARNING", A.ERROR = "ERROR"
    })(O$ || (U3.LogSeverity = O$ = {}));
    class gx1 extends z28.EventEmitter {
        constructor(A, B) {
            super();
            this.namespace = A, this.upstream = B, this.func = Object.assign(this.invoke.bind(this), {
                instance: this,
                on: (Q, Z) => this.on(Q, Z)
            }), this.func.debug = (...Q) => this.invokeSeverity(O$.DEBUG, ...Q), this.func.info = (...Q) => this.invokeSeverity(O$.INFO, ...Q), this.func.warn = (...Q) => this.invokeSeverity(O$.WARNING, ...Q), this.func.error = (...Q) => this.invokeSeverity(O$.ERROR, ...Q), this.func.sublog = (Q) => I$B(Q, this.func)
        }
        invoke(A, ...B) {
            if (this.upstream) this.upstream(A, ...B);
            this.emit("log", A, B)
        }
        invokeSeverity(A, ...B) {
            this.invoke({
                severity: A
            }, ...B)
        }
    }
    U3.AdhocDebugLogger = gx1;
    U3.placeholder = new gx1("", () => {}).func;
    class cD1 {
        constructor() {
            var A;
            this.cached = new Map, this.filters = [], this.filtersSet = !1;
            let B = (A = dD1.env[U3.env.nodeEnables]) !== null && A !== void 0 ? A : "*";
            if (B === "all") B = "*";
            this.filters = B.split(",")
        }
        log(A, B, ...Q) {
            try {
                if (!this.filtersSet) this.setFilters(), this.filtersSet = !0;
                let Z = this.cached.get(A);
                if (!Z) Z = this.makeLogger(A), this.cached.set(A, Z);
                Z(B, ...Q)
            } catch (Z) {
                console.error(Z)
            }
        }
    }
    U3.DebugLogBackendBase = cD1;
    class qw0 extends cD1 {
        constructor() {
            super(...arguments);
            this.enabledRegexp = /.*/g
        }
        isEnabled(A) {
            return this.enabledRegexp.test(A)
        }
        makeLogger(A) {
            if (!this.enabledRegexp.test(A)) return () => {};
            return (B, ...Q) => {
                var Z;
                let D = `${sK.Colours.green}${A}${sK.Colours.reset}`,
                    G = `${sK.Colours.yellow}${dD1.pid}${sK.Colours.reset}`,
                    F;
                switch (B.severity) {
                    case O$.ERROR:
                        F = `${sK.Colours.red}${B.severity}${sK.Colours.reset}`;
                        break;
                    case O$.INFO:
                        F = `${sK.Colours.magenta}${B.severity}${sK.Colours.reset}`;
                        break;
                    case O$.WARNING:
                        F = `${sK.Colours.yellow}${B.severity}${sK.Colours.reset}`;
                        break;
                    default:
                        F = (Z = B.severity) !== null && Z !== void 0 ? Z : O$.DEFAULT;
                        break
                }
                let I = D$B.formatWithOptions({
                        colors: sK.Colours.enabled
                    }, ...Q),
                    Y = Object.assign({}, B);
                delete Y.severity;
                let W = Object.getOwnPropertyNames(Y).length ? JSON.stringify(Y) : "",
                    J = W ? `${sK.Colours.grey}${W}${sK.Colours.reset}` : "";
                console.error("%s [%s|%s] %s%s", G, D, F, I, W ? ` ${J}` : "")
            }
        }
        setFilters() {
            let B = this.filters.join(",").replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^");
            this.enabledRegexp = new RegExp(`^${B}$`, "i")
        }
    }

    function ww0() {
        return new qw0
    }
    class G$B extends cD1 {
        constructor(A) {
            super();
            this.debugPkg = A
        }
        makeLogger(A) {
            let B = this.debugPkg(A);
            return (Q, ...Z) => {
                B(Z[0], ...Z.slice(1))
            }
        }
        setFilters() {
            var A;
            let B = (A = dD1.env.NODE_DEBUG) !== null && A !== void 0 ? A : "";
            dD1.env.NODE_DEBUG = `${B}${B?",":""}${this.filters.join(",")}`
        }
    }

    function E28(A) {
        return new G$B(A)
    }
    class F$B extends cD1 {
        constructor(A) {
            var B;
            super();
            this.upstream = (B = A) !== null && B !== void 0 ? B : new qw0
        }
        makeLogger(A) {
            let B = this.upstream.makeLogger(A);
            return (Q, ...Z) => {
                var D;
                let G = (D = Q.severity) !== null && D !== void 0 ? D : O$.INFO,
                    F = Object.assign({
                        severity: G,
                        message: D$B.format(...Z)
                    }, Q),
                    I = JSON.stringify(F);
                B(Q, I)
            }
        }
        setFilters() {
            this.upstream.setFilters()
        }
    }

    function U28(A) {
        return new F$B(A)
    }
    U3.env = {
        nodeEnables: "GOOGLE_SDK_NODE_LOGGING"
    };
    var $w0 = new Map,
        aE = void 0;

    function w28(A) {
        aE = A, $w0.clear()
    }

    function I$B(A, B) {
        if (!dD1.env[U3.env.nodeEnables]) return U3.placeholder;
        if (!A) return U3.placeholder;
        if (B) A = `${B.instance.namespace}:${A}`;
        let Z = $w0.get(A);
        if (Z) return Z.func;
        if (aE === null) return U3.placeholder;
        else if (aE === void 0) aE = ww0();
        let D = (() => {
            let G = void 0;
            return new gx1(A, (I, ...Y) => {
                if (G !== aE) {
                    if (aE === null) return;
                    else if (aE === void 0) aE = ww0();
                    G = aE
                }
                aE === null || aE === void 0 || aE.log(A, I, ...Y)
            })
        })();
        return $w0.set(A, D), D.func
    }
});
var W$B = E((nm) => {
    var $28 = nm && nm.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        q28 = nm && nm.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) $28(B, A, Q)
        };
    Object.defineProperty(nm, "__esModule", {
        value: !0
    });
    q28(Y$B(), nm)
});
var pD1 = E((qQ) => {
    var N28 = qQ && qQ.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        L28 = qQ && qQ.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) N28(B, A, Q)
        };
    Object.defineProperty(qQ, "__esModule", {
        value: !0
    });
    qQ.gcpResidencyCache = qQ.METADATA_SERVER_DETECTION = qQ.HEADERS = qQ.HEADER_VALUE = qQ.HEADER_NAME = qQ.SECONDARY_HOST_ADDRESS = qQ.HOST_ADDRESS = qQ.BASE_PATH = void 0;
    qQ.instance = S28;
    qQ.project = j28;
    qQ.universe = k28;
    qQ.bulk = y28;
    qQ.isAvailable = x28;
    qQ.resetIsAvailableCache = v28;
    qQ.getGCPResidency = Mw0;
    qQ.setGCPResidency = X$B;
    qQ.requestTimeout = V$B;
    var Nw0 = R$(),
        M28 = iwB(),
        R28 = Uw0(),
        O28 = W$B();
    qQ.BASE_PATH = "/computeMetadata/v1";
    qQ.HOST_ADDRESS = "http://169.254.169.254";
    qQ.SECONDARY_HOST_ADDRESS = "http://metadata.google.internal.";
    qQ.HEADER_NAME = "Metadata-Flavor";
    qQ.HEADER_VALUE = "Google";
    qQ.HEADERS = Object.freeze({
        [qQ.HEADER_NAME]: qQ.HEADER_VALUE
    });
    var J$B = O28.log("gcp metadata");
    qQ.METADATA_SERVER_DETECTION = Object.freeze({
        "assume-present": "don't try to ping the metadata server, but assume it's present",
        none: "don't try to ping the metadata server, but don't try to use it either",
        "bios-only": "treat the result of a BIOS probe as canonical (don't fall back to pinging)",
        "ping-only": "skip the BIOS probe, and go straight to pinging"
    });

    function Lw0(A) {
        if (!A) A = process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST || qQ.HOST_ADDRESS;
        if (!/^https?:\/\//.test(A)) A = `http://${A}`;
        return new URL(qQ.BASE_PATH, A).href
    }

    function T28(A) {
        Object.keys(A).forEach((B) => {
            switch (B) {
                case "params":
                case "property":
                case "headers":
                    break;
                case "qs":
                    throw new Error("'qs' is not a valid configuration option. Please use 'params' instead.");
                default:
                    throw new Error(`'${B}' is not a valid configuration option.`)
            }
        })
    }
    async function lD1(A, B = {}, Q = 3, Z = !1) {
        let D = "",
            G = {},
            F = {};
        if (typeof A === "object") {
            let J = A;
            D = J.metadataKey, G = J.params || G, F = J.headers || F, Q = J.noResponseRetries || Q, Z = J.fastFail || Z
        } else D = A;
        if (typeof B === "string") D += `/${B}`;
        else {
            if (T28(B), B.property) D += `/${B.property}`;
            F = B.headers || F, G = B.params || G
        }
        let I = Z ? P28 : Nw0.request,
            Y = {
                url: `${Lw0()}/${D}`,
                headers: {
                    ...qQ.HEADERS,
                    ...F
                },
                retryConfig: {
                    noResponseRetries: Q
                },
                params: G,
                responseType: "text",
                timeout: V$B()
            };
        J$B.info("instance request %j", Y);
        let W = await I(Y);
        if (J$B.info("instance metadata is %s", W.data), W.headers[qQ.HEADER_NAME.toLowerCase()] !== qQ.HEADER_VALUE) throw new Error(`Invalid response from metadata service: incorrect ${qQ.HEADER_NAME} header. Expected '${qQ.HEADER_VALUE}', got ${W.headers[qQ.HEADER_NAME.toLowerCase()]?`'${W.headers[qQ.HEADER_NAME.toLowerCase()]}'`:"no header"}`);
        if (typeof W.data === "string") try {
            return M28.parse(W.data)
        } catch (J) {}
        return W.data
    }
    async function P28(A) {
        var B;
        let Q = {
                ...A,
                url: (B = A.url) === null || B === void 0 ? void 0 : B.toString().replace(Lw0(), Lw0(qQ.SECONDARY_HOST_ADDRESS))
            },
            Z = !1,
            D = Nw0.request(A).then((F) => {
                return Z = !0, F
            }).catch((F) => {
                if (Z) return G;
                else throw Z = !0, F
            }),
            G = Nw0.request(Q).then((F) => {
                return Z = !0, F
            }).catch((F) => {
                if (Z) return D;
                else throw Z = !0, F
            });
        return Promise.race([D, G])
    }

    function S28(A) {
        return lD1("instance", A)
    }

    function j28(A) {
        return lD1("project", A)
    }

    function k28(A) {
        return lD1("universe", A)
    }
    async function y28(A) {
        let B = {};
        return await Promise.all(A.map((Q) => {
            return (async () => {
                let Z = await lD1(Q),
                    D = Q.metadataKey;
                B[D] = Z
            })()
        })), B
    }

    function _28() {
        return process.env.DETECT_GCP_RETRIES ? Number(process.env.DETECT_GCP_RETRIES) : 0
    }
    var ux1;
    async function x28() {
        if (process.env.METADATA_SERVER_DETECTION) {
            let A = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
            if (!(A in qQ.METADATA_SERVER_DETECTION)) throw new RangeError(`Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${A}\`, but it should be \`${Object.keys(qQ.METADATA_SERVER_DETECTION).join("`, `")}\`, or unset`);
            switch (A) {
                case "assume-present":
                    return !0;
                case "none":
                    return !1;
                case "bios-only":
                    return Mw0();
                case "ping-only":
            }
        }
        try {
            if (ux1 === void 0) ux1 = lD1("instance", void 0, _28(), !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST));
            return await ux1, !0
        } catch (A) {
            let B = A;
            if (process.env.DEBUG_AUTH) console.info(B);
            if (B.type === "request-timeout") return !1;
            if (B.response && B.response.status === 404) return !1;
            else {
                if (!(B.response && B.response.status === 404) && (!B.code || !["EHOSTDOWN", "EHOSTUNREACH", "ENETUNREACH", "ENOENT", "ENOTFOUND", "ECONNREFUSED"].includes(B.code))) {
                    let Q = "UNKNOWN";
                    if (B.code) Q = B.code;
                    process.emitWarning(`received unexpected error = ${B.message} code = ${Q}`, "MetadataLookupWarning")
                }
                return !1
            }
        }
    }

    function v28() {
        ux1 = void 0
    }
    qQ.gcpResidencyCache = null;

    function Mw0() {
        if (qQ.gcpResidencyCache === null) X$B();
        return qQ.gcpResidencyCache
    }

    function X$B(A = null) {
        qQ.gcpResidencyCache = A !== null ? A : R28.detectGCPResidency()
    }

    function V$B() {
        return Mw0() ? 0 : 3000
    }
    L28(Uw0(), qQ)
});
var H$B = E((C$B) => {
    Object.defineProperty(C$B, "__esModule", {
        value: !0
    });
    C$B.BrowserCrypto = void 0;
    var M11 = TC0(),
        b28 = R11();
    class mx1 {
        constructor() {
            if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) throw new Error("SubtleCrypto not found. Make sure it's an https:// website.")
        }
        async sha256DigestBase64(A) {
            let B = new TextEncoder().encode(A),
                Q = await window.crypto.subtle.digest("SHA-256", B);
            return M11.fromByteArray(new Uint8Array(Q))
        }
        randomBytesBase64(A) {
            let B = new Uint8Array(A);
            return window.crypto.getRandomValues(B), M11.fromByteArray(B)
        }
        static padBase64(A) {
            while (A.length % 4 !== 0) A += "=";
            return A
        }
        async verify(A, B, Q) {
            let Z = {
                    name: "RSASSA-PKCS1-v1_5",
                    hash: {
                        name: "SHA-256"
                    }
                },
                D = new TextEncoder().encode(B),
                G = M11.toByteArray(mx1.padBase64(Q)),
                F = await window.crypto.subtle.importKey("jwk", A, Z, !0, ["verify"]);
            return await window.crypto.subtle.verify(Z, F, G, D)
        }
        async sign(A, B) {
            let Q = {
                    name: "RSASSA-PKCS1-v1_5",
                    hash: {
                        name: "SHA-256"
                    }
                },
                Z = new TextEncoder().encode(B),
                D = await window.crypto.subtle.importKey("jwk", A, Q, !0, ["sign"]),
                G = await window.crypto.subtle.sign(Q, D, Z);
            return M11.fromByteArray(new Uint8Array(G))
        }
        decodeBase64StringUtf8(A) {
            let B = M11.toByteArray(mx1.padBase64(A));
            return new TextDecoder().decode(B)
        }
        encodeBase64StringUtf8(A) {
            let B = new TextEncoder().encode(A);
            return M11.fromByteArray(B)
        }
        async sha256DigestHex(A) {
            let B = new TextEncoder().encode(A),
                Q = await window.crypto.subtle.digest("SHA-256", B);
            return b28.fromArrayBufferToHex(Q)
        }
        async signWithHmacSha256(A, B) {
            let Q = typeof A === "string" ? A : String.fromCharCode(...new Uint16Array(A)),
                Z = new TextEncoder,
                D = await window.crypto.subtle.importKey("raw", Z.encode(Q), {
                    name: "HMAC",
                    hash: {
                        name: "SHA-256"
                    }
                }, !1, ["sign"]);
            return window.crypto.subtle.sign("HMAC", D, Z.encode(B))
        }
    }
    C$B.BrowserCrypto = mx1
});