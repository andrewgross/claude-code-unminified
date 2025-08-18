/* chunk:430 bytes:[10262400, 10280257) size:17857 source:unpacked-cli.js */
var w$B = E((E$B) => {
    Object.defineProperty(E$B, "__esModule", {
        value: !0
    });
    E$B.NodeCrypto = void 0;
    var O11 = W1("crypto");
    class z$B {
        async sha256DigestBase64(A) {
            return O11.createHash("sha256").update(A).digest("base64")
        }
        randomBytesBase64(A) {
            return O11.randomBytes(A).toString("base64")
        }
        async verify(A, B, Q) {
            let Z = O11.createVerify("RSA-SHA256");
            return Z.update(B), Z.end(), Z.verify(A, Q, "base64")
        }
        async sign(A, B) {
            let Q = O11.createSign("RSA-SHA256");
            return Q.update(B), Q.end(), Q.sign(A, "base64")
        }
        decodeBase64StringUtf8(A) {
            return Buffer.from(A, "base64").toString("utf-8")
        }
        encodeBase64StringUtf8(A) {
            return Buffer.from(A, "utf-8").toString("base64")
        }
        async sha256DigestHex(A) {
            return O11.createHash("sha256").update(A).digest("hex")
        }
        async signWithHmacSha256(A, B) {
            let Q = typeof A === "string" ? A : h28(A);
            return f28(O11.createHmac("sha256", Q).update(B).digest())
        }
    }
    E$B.NodeCrypto = z$B;

    function f28(A) {
        return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
    }

    function h28(A) {
        return Buffer.from(A)
    }
});
var R11 = E((q$B) => {
    Object.defineProperty(q$B, "__esModule", {
        value: !0
    });
    q$B.createCrypto = m28;
    q$B.hasBrowserCrypto = $$B;
    q$B.fromArrayBufferToHex = d28;
    var g28 = H$B(),
        u28 = w$B();

    function m28() {
        if ($$B()) return new g28.BrowserCrypto;
        return new u28.NodeCrypto
    }

    function $$B() {
        return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined"
    }

    function d28(A) {
        return Array.from(new Uint8Array(A)).map((Q) => {
            return Q.toString(16).padStart(2, "0")
        }).join("")
    }
});
var L$B = E((N$B) => {
    Object.defineProperty(N$B, "__esModule", {
        value: !0
    });
    N$B.validate = i28;

    function i28(A) {
        let B = [{
            invalid: "uri",
            expected: "url"
        }, {
            invalid: "json",
            expected: "data"
        }, {
            invalid: "qs",
            expected: "params"
        }];
        for (let Q of B)
            if (A[Q.invalid]) {
                let Z = `'${Q.invalid}' is not a valid configuration option. Please use '${Q.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
                throw new Error(Z)
            }
    }
});
var Rw0 = E((O83, a28) => {
    a28.exports = {
        name: "google-auth-library",
        version: "9.15.1",
        author: "Google Inc.",
        description: "Google APIs Authentication Client Library for Node.js",
        engines: {
            node: ">=14"
        },
        main: "./build/src/index.js",
        types: "./build/src/index.d.ts",
        repository: "googleapis/google-auth-library-nodejs.git",
        keywords: ["google", "api", "google apis", "client", "client library"],
        dependencies: {
            "base64-js": "^1.3.0",
            "ecdsa-sig-formatter": "^1.0.11",
            gaxios: "^6.1.1",
            "gcp-metadata": "^6.1.0",
            gtoken: "^7.0.0",
            jws: "^4.0.0"
        },
        devDependencies: {
            "@types/base64-js": "^1.2.5",
            "@types/chai": "^4.1.7",
            "@types/jws": "^3.1.0",
            "@types/mocha": "^9.0.0",
            "@types/mv": "^2.1.0",
            "@types/ncp": "^2.0.1",
            "@types/node": "^20.4.2",
            "@types/sinon": "^17.0.0",
            "assert-rejects": "^1.0.0",
            c8: "^8.0.0",
            chai: "^4.2.0",
            cheerio: "1.0.0-rc.12",
            codecov: "^3.0.2",
            "engine.io": "6.6.2",
            gts: "^5.0.0",
            "is-docker": "^2.0.0",
            jsdoc: "^4.0.0",
            "jsdoc-fresh": "^3.0.0",
            "jsdoc-region-tag": "^3.0.0",
            karma: "^6.0.0",
            "karma-chrome-launcher": "^3.0.0",
            "karma-coverage": "^2.0.0",
            "karma-firefox-launcher": "^2.0.0",
            "karma-mocha": "^2.0.0",
            "karma-sourcemap-loader": "^0.4.0",
            "karma-webpack": "5.0.0",
            keypair: "^1.0.4",
            linkinator: "^4.0.0",
            mocha: "^9.2.2",
            mv: "^2.1.1",
            ncp: "^2.0.0",
            nock: "^13.0.0",
            "null-loader": "^4.0.0",
            pdfmake: "0.2.12",
            puppeteer: "^21.0.0",
            sinon: "^18.0.0",
            "ts-loader": "^8.0.0",
            typescript: "^5.1.6",
            webpack: "^5.21.2",
            "webpack-cli": "^4.0.0"
        },
        files: ["build/src", "!build/src/**/*.map"],
        scripts: {
            test: "c8 mocha build/test",
            clean: "gts clean",
            prepare: "npm run compile",
            lint: "gts check",
            compile: "tsc -p .",
            fix: "gts fix",
            pretest: "npm run compile -- --sourceMap",
            docs: "jsdoc -c .jsdoc.json",
            "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../",
            "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
            "system-test": "mocha build/system-test --timeout 60000",
            "presystem-test": "npm run compile -- --sourceMap",
            webpack: "webpack",
            "browser-test": "karma start",
            "docs-test": "linkinator docs",
            "predocs-test": "npm run docs",
            prelint: "cd samples; npm link ../; npm install",
            precompile: "gts clean"
        },
        license: "Apache-2.0"
    }
});
var nD1 = E((R$B) => {
    Object.defineProperty(R$B, "__esModule", {
        value: !0
    });
    R$B.DefaultTransporter = void 0;
    var s28 = R$(),
        r28 = L$B(),
        o28 = Rw0(),
        M$B = "google-api-nodejs-client";
    class iD1 {
        constructor() {
            this.instance = new s28.Gaxios
        }
        configure(A = {}) {
            if (A.headers = A.headers || {}, typeof window === "undefined") {
                let B = A.headers["User-Agent"];
                if (!B) A.headers["User-Agent"] = iD1.USER_AGENT;
                else if (!B.includes(`${M$B}/`)) A.headers["User-Agent"] = `${B} ${iD1.USER_AGENT}`;
                if (!A.headers["x-goog-api-client"]) {
                    let Q = process.version.replace(/^v/, "");
                    A.headers["x-goog-api-client"] = `gl-node/${Q}`
                }
            }
            return A
        }
        request(A) {
            return A = this.configure(A), r28.validate(A), this.instance.request(A).catch((B) => {
                throw this.processError(B)
            })
        }
        get defaults() {
            return this.instance.defaults
        }
        set defaults(A) {
            this.instance.defaults = A
        }
        processError(A) {
            let B = A.response,
                Q = A,
                Z = B ? B.data : null;
            if (B && Z && Z.error && B.status !== 200)
                if (typeof Z.error === "string") Q.message = Z.error, Q.status = B.status;
                else if (Array.isArray(Z.error.errors)) Q.message = Z.error.errors.map((D) => D.message).join(`
`), Q.code = Z.error.code, Q.errors = Z.error.errors;
            else Q.message = Z.error.message, Q.code = Z.error.code;
            else if (B && B.status >= 400) Q.message = Z, Q.status = B.status;
            return Q
        }
    }
    R$B.DefaultTransporter = iD1;
    iD1.USER_AGENT = `${M$B}/${o28.version}`
});
var T11 = E((Ow0, P$B) => {
    /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
    var dx1 = W1("buffer"),
        dM = dx1.Buffer;

    function T$B(A, B) {
        for (var Q in A) B[Q] = A[Q]
    }
    if (dM.from && dM.alloc && dM.allocUnsafe && dM.allocUnsafeSlow) P$B.exports = dx1;
    else T$B(dx1, Ow0), Ow0.Buffer = am;

    function am(A, B, Q) {
        return dM(A, B, Q)
    }
    am.prototype = Object.create(dM.prototype);
    T$B(dM, am);
    am.from = function(A, B, Q) {
        if (typeof A === "number") throw new TypeError("Argument must not be a number");
        return dM(A, B, Q)
    };
    am.alloc = function(A, B, Q) {
        if (typeof A !== "number") throw new TypeError("Argument must be a number");
        var Z = dM(A);
        if (B !== void 0)
            if (typeof Q === "string") Z.fill(B, Q);
            else Z.fill(B);
        else Z.fill(0);
        return Z
    };
    am.allocUnsafe = function(A) {
        if (typeof A !== "number") throw new TypeError("Argument must be a number");
        return dM(A)
    };
    am.allocUnsafeSlow = function(A) {
        if (typeof A !== "number") throw new TypeError("Argument must be a number");
        return dx1.SlowBuffer(A)
    }
});
var j$B = E((P83, S$B) => {
    function Tw0(A) {
        var B = (A / 8 | 0) + (A % 8 === 0 ? 0 : 1);
        return B
    }
    var t28 = {
        ES256: Tw0(256),
        ES384: Tw0(384),
        ES512: Tw0(521)
    };

    function e28(A) {
        var B = t28[A];
        if (B) return B;
        throw new Error('Unknown algorithm "' + A + '"')
    }
    S$B.exports = e28
});
var Pw0 = E((S83, b$B) => {
    var cx1 = T11().Buffer,
        y$B = j$B(),
        lx1 = 128,
        _$B = 0,
        AB8 = 32,
        BB8 = 16,
        QB8 = 2,
        x$B = BB8 | AB8 | _$B << 6,
        px1 = QB8 | _$B << 6;

    function ZB8(A) {
        return A.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }

    function v$B(A) {
        if (cx1.isBuffer(A)) return A;
        else if (typeof A === "string") return cx1.from(A, "base64");
        throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
    }

    function DB8(A, B) {
        A = v$B(A);
        var Q = y$B(B),
            Z = Q + 1,
            D = A.length,
            G = 0;
        if (A[G++] !== x$B) throw new Error('Could not find expected "seq"');
        var F = A[G++];
        if (F === (lx1 | 1)) F = A[G++];
        if (D - G < F) throw new Error('"seq" specified length of "' + F + '", only "' + (D - G) + '" remaining');
        if (A[G++] !== px1) throw new Error('Could not find expected "int" for "r"');
        var I = A[G++];
        if (D - G - 2 < I) throw new Error('"r" specified length of "' + I + '", only "' + (D - G - 2) + '" available');
        if (Z < I) throw new Error('"r" specified length of "' + I + '", max of "' + Z + '" is acceptable');
        var Y = G;
        if (G += I, A[G++] !== px1) throw new Error('Could not find expected "int" for "s"');
        var W = A[G++];
        if (D - G !== W) throw new Error('"s" specified length of "' + W + '", expected "' + (D - G) + '"');
        if (Z < W) throw new Error('"s" specified length of "' + W + '", max of "' + Z + '" is acceptable');
        var J = G;
        if (G += W, G !== D) throw new Error('Expected to consume entire buffer, but "' + (D - G) + '" bytes remain');
        var X = Q - I,
            V = Q - W,
            C = cx1.allocUnsafe(X + I + V + W);
        for (G = 0; G < X; ++G) C[G] = 0;
        A.copy(C, G, Y + Math.max(-X, 0), Y + I), G = Q;
        for (var K = G; G < K + V; ++G) C[G] = 0;
        return A.copy(C, G, J + Math.max(-V, 0), J + W), C = C.toString("base64"), C = ZB8(C), C
    }

    function k$B(A, B, Q) {
        var Z = 0;
        while (B + Z < Q && A[B + Z] === 0) ++Z;
        var D = A[B + Z] >= lx1;
        if (D) --Z;
        return Z
    }

    function GB8(A, B) {
        A = v$B(A);
        var Q = y$B(B),
            Z = A.length;
        if (Z !== Q * 2) throw new TypeError('"' + B + '" signatures must be "' + Q * 2 + '" bytes, saw "' + Z + '"');
        var D = k$B(A, 0, Q),
            G = k$B(A, Q, A.length),
            F = Q - D,
            I = Q - G,
            Y = 2 + F + 1 + 1 + I,
            W = Y < lx1,
            J = cx1.allocUnsafe((W ? 2 : 3) + Y),
            X = 0;
        if (J[X++] = x$B, W) J[X++] = Y;
        else J[X++] = lx1 | 1, J[X++] = Y & 255;
        if (J[X++] = px1, J[X++] = F, D < 0) J[X++] = 0, X += A.copy(J, X, 0, Q);
        else X += A.copy(J, X, D, Q);
        if (J[X++] = px1, J[X++] = I, G < 0) J[X++] = 0, A.copy(J, X, Q);
        else A.copy(J, X, Q + G);
        return J
    }
    b$B.exports = {
        derToJose: DB8,
        joseToDer: GB8
    }
});
var Xv = E((Jv) => {
    var T$ = Jv && Jv.__classPrivateFieldGet || function(A, B, Q, Z) {
            if (Q === "a" && !Z) throw new TypeError("Private accessor was defined without a getter");
            if (typeof B === "function" ? A !== B || !Z : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return Q === "m" ? Z : Q === "a" ? Z.call(A) : Z ? Z.value : B.get(A)
        },
        P11, IS, Sw0, jw0;
    Object.defineProperty(Jv, "__esModule", {
        value: !0
    });
    Jv.LRUCache = void 0;
    Jv.snakeToCamel = f$B;
    Jv.originalOrCamelOptions = FB8;

    function f$B(A) {
        return A.replace(/([_][^_])/g, (B) => B.slice(1).toUpperCase())
    }

    function FB8(A) {
        function B(Q) {
            var Z;
            let D = A || {};
            return (Z = D[Q]) !== null && Z !== void 0 ? Z : D[f$B(Q)]
        }
        return {
            get: B
        }
    }
    class h$B {
        constructor(A) {
            P11.add(this), IS.set(this, new Map), this.capacity = A.capacity, this.maxAge = A.maxAge
        }
        set(A, B) {
            T$(this, P11, "m", Sw0).call(this, A, B), T$(this, P11, "m", jw0).call(this)
        }
        get(A) {
            let B = T$(this, IS, "f").get(A);
            if (!B) return;
            return T$(this, P11, "m", Sw0).call(this, A, B.value), T$(this, P11, "m", jw0).call(this), B.value
        }
    }
    Jv.LRUCache = h$B;
    IS = new WeakMap, P11 = new WeakSet, Sw0 = function A(B, Q) {
        T$(this, IS, "f").delete(B), T$(this, IS, "f").set(B, {
            value: Q,
            lastAccessed: Date.now()
        })
    }, jw0 = function A() {
        let B = this.maxAge ? Date.now() - this.maxAge : 0,
            Q = T$(this, IS, "f").entries().next();
        while (!Q.done && (T$(this, IS, "f").size > this.capacity || Q.value[1].lastAccessed < B)) T$(this, IS, "f").delete(Q.value[0]), Q = T$(this, IS, "f").entries().next()
    }
});
var cM = E((d$B) => {
    Object.defineProperty(d$B, "__esModule", {
        value: !0
    });
    d$B.AuthClient = d$B.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = d$B.DEFAULT_UNIVERSE = void 0;
    var IB8 = W1("events"),
        g$B = R$(),
        u$B = nD1(),
        YB8 = Xv();
    d$B.DEFAULT_UNIVERSE = "googleapis.com";
    d$B.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 300000;
    class m$B extends IB8.EventEmitter {
        constructor(A = {}) {
            var B, Q, Z, D, G;
            super();
            this.credentials = {}, this.eagerRefreshThresholdMillis = d$B.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS, this.forceRefreshOnFailure = !1, this.universeDomain = d$B.DEFAULT_UNIVERSE;
            let F = YB8.originalOrCamelOptions(A);
            if (this.apiKey = A.apiKey, this.projectId = (B = F.get("project_id")) !== null && B !== void 0 ? B : null, this.quotaProjectId = F.get("quota_project_id"), this.credentials = (Q = F.get("credentials")) !== null && Q !== void 0 ? Q : {}, this.universeDomain = (Z = F.get("universe_domain")) !== null && Z !== void 0 ? Z : d$B.DEFAULT_UNIVERSE, this.transporter = (D = A.transporter) !== null && D !== void 0 ? D : new u$B.DefaultTransporter, A.transporterOptions) this.transporter.defaults = A.transporterOptions;
            if (A.eagerRefreshThresholdMillis) this.eagerRefreshThresholdMillis = A.eagerRefreshThresholdMillis;
            this.forceRefreshOnFailure = (G = A.forceRefreshOnFailure) !== null && G !== void 0 ? G : !1
        }
        get gaxios() {
            if (this.transporter instanceof g$B.Gaxios) return this.transporter;
            else if (this.transporter instanceof u$B.DefaultTransporter) return this.transporter.instance;
            else if ("instance" in this.transporter && this.transporter.instance instanceof g$B.Gaxios) return this.transporter.instance;
            return null
        }
        setCredentials(A) {
            this.credentials = A
        }
        addSharedMetadataHeaders(A) {
            if (!A["x-goog-user-project"] && this.quotaProjectId) A["x-goog-user-project"] = this.quotaProjectId;
            return A
        }
        static get RETRY_CONFIG() {
            return {
                retry: !0,
                retryConfig: {
                    httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
                }
            }
        }
    }
    d$B.AuthClient = m$B
});
var yw0 = E((i$B) => {
    Object.defineProperty(i$B, "__esModule", {
        value: !0
    });
    i$B.LoginTicket = void 0;
    class p$B {
        constructor(A, B) {
            this.envelope = A, this.payload = B
        }
        getEnvelope() {
            return this.envelope
        }
        getPayload() {
            return this.payload
        }
        getUserId() {
            let A = this.getPayload();
            if (A && A.sub) return A.sub;
            return null
        }
        getAttributes() {
            return {
                envelope: this.getEnvelope(),
                payload: this.getPayload()
            }
        }
    }
    i$B.LoginTicket = p$B
});