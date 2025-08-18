/* chunk:425 bytes:[10159373, 10170763) size:11390 source:unpacked-cli.js */
var XwB = E((F83, JwB) => {
    var mM = (A) => A !== null && typeof A === "object" && typeof A.pipe === "function";
    mM.writable = (A) => mM(A) && A.writable !== !1 && typeof A._write === "function" && typeof A._writableState === "object";
    mM.readable = (A) => mM(A) && A.readable !== !1 && typeof A._read === "function" && typeof A._readableState === "object";
    mM.duplex = (A) => mM.writable(A) && mM.readable(A);
    mM.transform = (A) => mM.duplex(A) && typeof A._transform === "function";
    JwB.exports = mM
});
var VwB = E((I83, kA8) => {
    kA8.exports = {
        name: "gaxios",
        version: "6.7.1",
        description: "A simple common HTTP client specifically for Google APIs and services.",
        main: "build/src/index.js",
        types: "build/src/index.d.ts",
        files: ["build/src"],
        scripts: {
            lint: "gts check",
            test: "c8 mocha build/test",
            "presystem-test": "npm run compile",
            "system-test": "mocha build/system-test --timeout 80000",
            compile: "tsc -p .",
            fix: "gts fix",
            prepare: "npm run compile",
            pretest: "npm run compile",
            webpack: "webpack",
            "prebrowser-test": "npm run compile",
            "browser-test": "node build/browser-test/browser-test-runner.js",
            docs: "compodoc src/",
            "docs-test": "linkinator docs",
            "predocs-test": "npm run docs",
            "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
            prelint: "cd samples; npm link ../; npm install",
            clean: "gts clean",
            precompile: "gts clean"
        },
        repository: "googleapis/gaxios",
        keywords: ["google"],
        engines: {
            node: ">=14"
        },
        author: "Google, LLC",
        license: "Apache-2.0",
        devDependencies: {
            "@babel/plugin-proposal-private-methods": "^7.18.6",
            "@compodoc/compodoc": "1.1.19",
            "@types/cors": "^2.8.6",
            "@types/express": "^4.16.1",
            "@types/extend": "^3.0.1",
            "@types/mocha": "^9.0.0",
            "@types/multiparty": "0.0.36",
            "@types/mv": "^2.1.0",
            "@types/ncp": "^2.0.1",
            "@types/node": "^20.0.0",
            "@types/node-fetch": "^2.5.7",
            "@types/sinon": "^17.0.0",
            "@types/tmp": "0.2.6",
            "@types/uuid": "^10.0.0",
            "abort-controller": "^3.0.0",
            assert: "^2.0.0",
            browserify: "^17.0.0",
            c8: "^8.0.0",
            cheerio: "1.0.0-rc.10",
            cors: "^2.8.5",
            execa: "^5.0.0",
            express: "^4.16.4",
            "form-data": "^4.0.0",
            gts: "^5.0.0",
            "is-docker": "^2.0.0",
            karma: "^6.0.0",
            "karma-chrome-launcher": "^3.0.0",
            "karma-coverage": "^2.0.0",
            "karma-firefox-launcher": "^2.0.0",
            "karma-mocha": "^2.0.0",
            "karma-remap-coverage": "^0.1.5",
            "karma-sourcemap-loader": "^0.4.0",
            "karma-webpack": "5.0.0",
            linkinator: "^3.0.0",
            mocha: "^8.0.0",
            multiparty: "^4.2.1",
            mv: "^2.1.1",
            ncp: "^2.0.0",
            nock: "^13.0.0",
            "null-loader": "^4.0.0",
            puppeteer: "^19.0.0",
            sinon: "^18.0.0",
            "stream-browserify": "^3.0.0",
            tmp: "0.2.3",
            "ts-loader": "^8.0.0",
            typescript: "^5.1.6",
            webpack: "^5.35.0",
            "webpack-cli": "^4.0.0"
        },
        dependencies: {
            extend: "^3.0.2",
            "https-proxy-agent": "^7.0.1",
            "is-stream": "^2.0.0",
            "node-fetch": "^2.6.9",
            uuid: "^9.0.1"
        }
    }
});
var HwB = E((CwB) => {
    Object.defineProperty(CwB, "__esModule", {
        value: !0
    });
    CwB.pkg = void 0;
    CwB.pkg = VwB()
});
var Kw0 = E((nE) => {
    var yA8 = nE && nE.__importDefault || function(A) {
            return A && A.__esModule ? A : {
                default: A
            }
        },
        zwB;
    Object.defineProperty(nE, "__esModule", {
        value: !0
    });
    nE.GaxiosError = nE.GAXIOS_ERROR_SYMBOL = void 0;
    nE.defaultErrorRedactor = UwB;
    var _A8 = W1("url"),
        Vw0 = HwB(),
        EwB = yA8(bU0());
    nE.GAXIOS_ERROR_SYMBOL = Symbol.for(`${Vw0.pkg.name}-gaxios-error`);
    class Cw0 extends Error {
        static[(zwB = nE.GAXIOS_ERROR_SYMBOL, Symbol.hasInstance)](A) {
            if (A && typeof A === "object" && nE.GAXIOS_ERROR_SYMBOL in A && A[nE.GAXIOS_ERROR_SYMBOL] === Vw0.pkg.version) return !0;
            return Function.prototype[Symbol.hasInstance].call(Cw0, A)
        }
        constructor(A, B, Q, Z) {
            var D;
            super(A);
            if (this.config = B, this.response = Q, this.error = Z, this[zwB] = Vw0.pkg.version, this.config = EwB.default(!0, {}, B), this.response) this.response.config = EwB.default(!0, {}, this.response.config);
            if (this.response) {
                try {
                    this.response.data = xA8(this.config.responseType, (D = this.response) === null || D === void 0 ? void 0 : D.data)
                } catch (G) {}
                this.status = this.response.status
            }
            if (Z && "code" in Z && Z.code) this.code = Z.code;
            if (B.errorRedactor) B.errorRedactor({
                config: this.config,
                response: this.response
            })
        }
    }
    nE.GaxiosError = Cw0;

    function xA8(A, B) {
        switch (A) {
            case "stream":
                return B;
            case "json":
                return JSON.parse(JSON.stringify(B));
            case "arraybuffer":
                return JSON.parse(Buffer.from(B).toString("utf8"));
            case "blob":
                return JSON.parse(B.text());
            default:
                return B
        }
    }

    function UwB(A) {
        function Q(G) {
            if (!G) return;
            for (let F of Object.keys(G)) {
                if (/^authentication$/i.test(F)) G[F] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
                if (/^authorization$/i.test(F)) G[F] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
                if (/secret/i.test(F)) G[F] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
            }
        }

        function Z(G, F) {
            if (typeof G === "object" && G !== null && typeof G[F] === "string") {
                let I = G[F];
                if (/grant_type=/i.test(I) || /assertion=/i.test(I) || /secret/i.test(I)) G[F] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
            }
        }

        function D(G) {
            if (typeof G === "object" && G !== null) {
                if ("grant_type" in G) G.grant_type = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
                if ("assertion" in G) G.assertion = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
                if ("client_secret" in G) G.client_secret = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
            }
        }
        if (A.config) {
            Q(A.config.headers), Z(A.config, "data"), D(A.config.data), Z(A.config, "body"), D(A.config.body);
            try {
                let G = new _A8.URL("", A.config.url);
                if (G.searchParams.has("token")) G.searchParams.set("token", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
                if (G.searchParams.has("client_secret")) G.searchParams.set("client_secret", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
                A.config.url = G.toString()
            } catch (G) {}
        }
        if (A.response) UwB({
            config: A.response.config
        }), Q(A.response.headers), Z(A.response, "data"), D(A.response.data);
        return A
    }
});
var qwB = E(($wB) => {
    Object.defineProperty($wB, "__esModule", {
        value: !0
    });
    $wB.getRetryConfig = vA8;
    async function vA8(A) {
        let B = wwB(A);
        if (!A || !A.config || !B && !A.config.retry) return {
            shouldRetry: !1
        };
        B = B || {}, B.currentRetryAttempt = B.currentRetryAttempt || 0, B.retry = B.retry === void 0 || B.retry === null ? 3 : B.retry, B.httpMethodsToRetry = B.httpMethodsToRetry || ["GET", "HEAD", "PUT", "OPTIONS", "DELETE"], B.noResponseRetries = B.noResponseRetries === void 0 || B.noResponseRetries === null ? 2 : B.noResponseRetries, B.retryDelayMultiplier = B.retryDelayMultiplier ? B.retryDelayMultiplier : 2, B.timeOfFirstRequest = B.timeOfFirstRequest ? B.timeOfFirstRequest : Date.now(), B.totalTimeout = B.totalTimeout ? B.totalTimeout : Number.MAX_SAFE_INTEGER, B.maxRetryDelay = B.maxRetryDelay ? B.maxRetryDelay : Number.MAX_SAFE_INTEGER;
        let Q = [
            [100, 199],
            [408, 408],
            [429, 429],
            [500, 599]
        ];
        if (B.statusCodesToRetry = B.statusCodesToRetry || Q, A.config.retryConfig = B, !await (B.shouldRetry || bA8)(A)) return {
            shouldRetry: !1,
            config: A.config
        };
        let D = fA8(B);
        A.config.retryConfig.currentRetryAttempt += 1;
        let G = B.retryBackoff ? B.retryBackoff(A, D) : new Promise((F) => {
            setTimeout(F, D)
        });
        if (B.onRetryAttempt) B.onRetryAttempt(A);
        return await G, {
            shouldRetry: !0,
            config: A.config
        }
    }

    function bA8(A) {
        var B;
        let Q = wwB(A);
        if (A.name === "AbortError" || ((B = A.error) === null || B === void 0 ? void 0 : B.name) === "AbortError") return !1;
        if (!Q || Q.retry === 0) return !1;
        if (!A.response && (Q.currentRetryAttempt || 0) >= Q.noResponseRetries) return !1;
        if (!A.config.method || Q.httpMethodsToRetry.indexOf(A.config.method.toUpperCase()) < 0) return !1;
        if (A.response && A.response.status) {
            let Z = !1;
            for (let [D, G] of Q.statusCodesToRetry) {
                let F = A.response.status;
                if (F >= D && F <= G) {
                    Z = !0;
                    break
                }
            }
            if (!Z) return !1
        }
        if (Q.currentRetryAttempt = Q.currentRetryAttempt || 0, Q.currentRetryAttempt >= Q.retry) return !1;
        return !0
    }

    function wwB(A) {
        if (A && A.config && A.config.retryConfig) return A.config.retryConfig;
        return
    }

    function fA8(A) {
        var B;
        let Z = (A.currentRetryAttempt ? 0 : (B = A.retryDelay) !== null && B !== void 0 ? B : 100) + (Math.pow(A.retryDelayMultiplier, A.currentRetryAttempt) - 1) / 2 * 1000,
            D = A.totalTimeout - (Date.now() - A.timeOfFirstRequest);
        return Math.min(Z, D, A.maxRetryDelay)
    }
});
var Hw0 = E((LwB) => {
    Object.defineProperty(LwB, "__esModule", {
        value: !0
    });
    LwB.GaxiosInterceptorManager = void 0;
    class NwB extends Set {}
    LwB.GaxiosInterceptorManager = NwB
});