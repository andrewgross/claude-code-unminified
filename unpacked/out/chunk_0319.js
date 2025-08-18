/* chunk:319 bytes:[7731688, 7750403) size:18715 source:unpacked-cli.js */
var b6 = E((na2) => {
    Object.defineProperty(na2, "__esModule", {
        value: !0
    });
    na2.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = na2.DEFAULT_MAX_SEND_MESSAGE_LENGTH = na2.Propagate = na2.LogVerbosity = na2.Status = void 0;
    var la2;
    (function(A) {
        A[A.OK = 0] = "OK", A[A.CANCELLED = 1] = "CANCELLED", A[A.UNKNOWN = 2] = "UNKNOWN", A[A.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", A[A.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", A[A.NOT_FOUND = 5] = "NOT_FOUND", A[A.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", A[A.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", A[A.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", A[A.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", A[A.ABORTED = 10] = "ABORTED", A[A.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", A[A.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", A[A.INTERNAL = 13] = "INTERNAL", A[A.UNAVAILABLE = 14] = "UNAVAILABLE", A[A.DATA_LOSS = 15] = "DATA_LOSS", A[A.UNAUTHENTICATED = 16] = "UNAUTHENTICATED"
    })(la2 || (na2.Status = la2 = {}));
    var pa2;
    (function(A) {
        A[A.DEBUG = 0] = "DEBUG", A[A.INFO = 1] = "INFO", A[A.ERROR = 2] = "ERROR", A[A.NONE = 3] = "NONE"
    })(pa2 || (na2.LogVerbosity = pa2 = {}));
    var ia2;
    (function(A) {
        A[A.DEADLINE = 1] = "DEADLINE", A[A.CENSUS_STATS_CONTEXT = 2] = "CENSUS_STATS_CONTEXT", A[A.CENSUS_TRACING_CONTEXT = 4] = "CENSUS_TRACING_CONTEXT", A[A.CANCELLATION = 8] = "CANCELLATION", A[A.DEFAULTS = 65535] = "DEFAULTS"
    })(ia2 || (na2.Propagate = ia2 = {}));
    na2.DEFAULT_MAX_SEND_MESSAGE_LENGTH = -1;
    na2.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = 4194304
});
var FJ0 = E((Pl5, FX6) => {
    FX6.exports = {
        name: "@grpc/grpc-js",
        version: "1.13.1",
        description: "gRPC Library for Node - pure JS implementation",
        homepage: "https://grpc.io/",
        repository: "https://github.com/grpc/grpc-node/tree/master/packages/grpc-js",
        main: "build/src/index.js",
        engines: {
            node: ">=12.10.0"
        },
        keywords: [],
        author: {
            name: "Google Inc."
        },
        types: "build/src/index.d.ts",
        license: "Apache-2.0",
        devDependencies: {
            "@grpc/proto-loader": "file:../proto-loader",
            "@types/gulp": "^4.0.17",
            "@types/gulp-mocha": "0.0.37",
            "@types/lodash": "^4.14.202",
            "@types/mocha": "^10.0.6",
            "@types/ncp": "^2.0.8",
            "@types/node": ">=20.11.20",
            "@types/pify": "^5.0.4",
            "@types/semver": "^7.5.8",
            "@typescript-eslint/eslint-plugin": "^7.1.0",
            "@typescript-eslint/parser": "^7.1.0",
            "@typescript-eslint/typescript-estree": "^7.1.0",
            "clang-format": "^1.8.0",
            eslint: "^8.42.0",
            "eslint-config-prettier": "^8.8.0",
            "eslint-plugin-node": "^11.1.0",
            "eslint-plugin-prettier": "^4.2.1",
            execa: "^2.0.3",
            gulp: "^4.0.2",
            "gulp-mocha": "^6.0.0",
            lodash: "^4.17.21",
            madge: "^5.0.1",
            "mocha-jenkins-reporter": "^0.4.1",
            ncp: "^2.0.0",
            pify: "^4.0.1",
            prettier: "^2.8.8",
            rimraf: "^3.0.2",
            semver: "^7.6.0",
            "ts-node": "^10.9.2",
            typescript: "^5.3.3"
        },
        contributors: [{
            name: "Google Inc."
        }],
        scripts: {
            build: "npm run compile",
            clean: "rimraf ./build",
            compile: "tsc -p .",
            format: 'clang-format -i -style="{Language: JavaScript, BasedOnStyle: Google, ColumnLimit: 80}" src/*.ts test/*.ts',
            lint: "eslint src/*.ts test/*.ts",
            prepare: "npm run generate-types && npm run compile",
            test: "gulp test",
            check: "npm run lint",
            fix: "eslint --fix src/*.ts test/*.ts",
            pretest: "npm run generate-types && npm run generate-test-types && npm run compile",
            posttest: "npm run check && madge -c ./build/src",
            "generate-types": "proto-loader-gen-types --keepCase --longs String --enums String --defaults --oneofs --includeComments --includeDirs proto/ --include-dirs test/fixtures/ -O src/generated/ --grpcLib ../index channelz.proto",
            "generate-test-types": "proto-loader-gen-types --keepCase --longs String --enums String --defaults --oneofs --includeComments --include-dirs test/fixtures/ -O test/generated/ --grpcLib ../../src/index test_service.proto"
        },
        dependencies: {
            "@grpc/proto-loader": "^0.7.13",
            "@js-sdsl/ordered-map": "^4.4.2"
        },
        files: ["src/**/*.ts", "build/src/**/*.{js,d.ts,js.map}", "proto/*.proto", "LICENSE", "deps/envoy-api/envoy/api/v2/**/*.proto", "deps/envoy-api/envoy/config/**/*.proto", "deps/envoy-api/envoy/service/**/*.proto", "deps/envoy-api/envoy/type/**/*.proto", "deps/udpa/udpa/**/*.proto", "deps/googleapis/google/api/*.proto", "deps/googleapis/google/rpc/*.proto", "deps/protoc-gen-validate/validate/**/*.proto"]
    }
});
var I7 = E((oa2) => {
    var IJ0, YJ0, WJ0, JJ0;
    Object.defineProperty(oa2, "__esModule", {
        value: !0
    });
    oa2.log = oa2.setLoggerVerbosity = oa2.setLogger = oa2.getLogger = void 0;
    oa2.trace = EX6;
    oa2.isTracerEnabled = ra2;
    var Ix = b6(),
        IX6 = W1("process"),
        YX6 = FJ0().version,
        WX6 = {
            error: (A, ...B) => {
                console.error("E " + A, ...B)
            },
            info: (A, ...B) => {
                console.error("I " + A, ...B)
            },
            debug: (A, ...B) => {
                console.error("D " + A, ...B)
            }
        },
        Ym = WX6,
        Lt = Ix.LogVerbosity.ERROR,
        JX6 = (YJ0 = (IJ0 = process.env.GRPC_NODE_VERBOSITY) !== null && IJ0 !== void 0 ? IJ0 : process.env.GRPC_VERBOSITY) !== null && YJ0 !== void 0 ? YJ0 : "";
    switch (JX6.toUpperCase()) {
        case "DEBUG":
            Lt = Ix.LogVerbosity.DEBUG;
            break;
        case "INFO":
            Lt = Ix.LogVerbosity.INFO;
            break;
        case "ERROR":
            Lt = Ix.LogVerbosity.ERROR;
            break;
        case "NONE":
            Lt = Ix.LogVerbosity.NONE;
            break;
        default:
    }
    var XX6 = () => {
        return Ym
    };
    oa2.getLogger = XX6;
    var VX6 = (A) => {
        Ym = A
    };
    oa2.setLogger = VX6;
    var CX6 = (A) => {
        Lt = A
    };
    oa2.setLoggerVerbosity = CX6;
    var KX6 = (A, ...B) => {
        let Q;
        if (A >= Lt) {
            switch (A) {
                case Ix.LogVerbosity.DEBUG:
                    Q = Ym.debug;
                    break;
                case Ix.LogVerbosity.INFO:
                    Q = Ym.info;
                    break;
                case Ix.LogVerbosity.ERROR:
                    Q = Ym.error;
                    break
            }
            if (!Q) Q = Ym.error;
            if (Q) Q.bind(Ym)(...B)
        }
    };
    oa2.log = KX6;
    var HX6 = (JJ0 = (WJ0 = process.env.GRPC_NODE_TRACE) !== null && WJ0 !== void 0 ? WJ0 : process.env.GRPC_TRACE) !== null && JJ0 !== void 0 ? JJ0 : "",
        XJ0 = new Set,
        sa2 = new Set;
    for (let A of HX6.split(","))
        if (A.startsWith("-")) sa2.add(A.substring(1));
        else XJ0.add(A);
    var zX6 = XJ0.has("all");

    function EX6(A, B, Q) {
        if (ra2(B)) oa2.log(A, new Date().toISOString() + " | v" + YX6 + " " + IX6.pid + " | " + B + " | " + Q)
    }

    function ra2(A) {
        return !sa2.has(A) && (zX6 || XJ0.has(A))
    }
});
var WP1 = E((ta2) => {
    Object.defineProperty(ta2, "__esModule", {
        value: !0
    });
    ta2.getErrorMessage = LX6;
    ta2.getErrorCode = MX6;

    function LX6(A) {
        if (A instanceof Error) return A.message;
        else return String(A)
    }

    function MX6(A) {
        if (typeof A === "object" && A !== null && "code" in A && typeof A.code === "number") return A.code;
        else return null
    }
});
var IJ = E((Bs2) => {
    Object.defineProperty(Bs2, "__esModule", {
        value: !0
    });
    Bs2.Metadata = void 0;
    var TX6 = I7(),
        PX6 = b6(),
        SX6 = WP1(),
        jX6 = /^[0-9a-z_.-]+$/,
        kX6 = /^[ -~]*$/;

    function yX6(A) {
        return jX6.test(A)
    }

    function _X6(A) {
        return kX6.test(A)
    }

    function As2(A) {
        return A.endsWith("-bin")
    }

    function xX6(A) {
        return !A.startsWith("grpc-")
    }

    function JP1(A) {
        return A.toLowerCase()
    }

    function ea2(A, B) {
        if (!yX6(A)) throw new Error('Metadata key "' + A + '" contains illegal characters');
        if (B !== null && B !== void 0)
            if (As2(A)) {
                if (!Buffer.isBuffer(B)) throw new Error("keys that end with '-bin' must have Buffer values")
            } else {
                if (Buffer.isBuffer(B)) throw new Error("keys that don't end with '-bin' must have String values");
                if (!_X6(B)) throw new Error('Metadata string value "' + B + '" contains illegal characters')
            }
    }
    class XP1 {
        constructor(A = {}) {
            this.internalRepr = new Map, this.options = A
        }
        set(A, B) {
            A = JP1(A), ea2(A, B), this.internalRepr.set(A, [B])
        }
        add(A, B) {
            A = JP1(A), ea2(A, B);
            let Q = this.internalRepr.get(A);
            if (Q === void 0) this.internalRepr.set(A, [B]);
            else Q.push(B)
        }
        remove(A) {
            A = JP1(A), this.internalRepr.delete(A)
        }
        get(A) {
            return A = JP1(A), this.internalRepr.get(A) || []
        }
        getMap() {
            let A = {};
            for (let [B, Q] of this.internalRepr)
                if (Q.length > 0) {
                    let Z = Q[0];
                    A[B] = Buffer.isBuffer(Z) ? Buffer.from(Z) : Z
                } return A
        }
        clone() {
            let A = new XP1(this.options),
                B = A.internalRepr;
            for (let [Q, Z] of this.internalRepr) {
                let D = Z.map((G) => {
                    if (Buffer.isBuffer(G)) return Buffer.from(G);
                    else return G
                });
                B.set(Q, D)
            }
            return A
        }
        merge(A) {
            for (let [B, Q] of A.internalRepr) {
                let Z = (this.internalRepr.get(B) || []).concat(Q);
                this.internalRepr.set(B, Z)
            }
        }
        setOptions(A) {
            this.options = A
        }
        getOptions() {
            return this.options
        }
        toHttp2Headers() {
            let A = {};
            for (let [B, Q] of this.internalRepr) A[B] = Q.map(vX6);
            return A
        }
        toJSON() {
            let A = {};
            for (let [B, Q] of this.internalRepr) A[B] = Q;
            return A
        }
        static fromHttp2Headers(A) {
            let B = new XP1;
            for (let Q of Object.keys(A)) {
                if (Q.charAt(0) === ":") continue;
                let Z = A[Q];
                try {
                    if (As2(Q)) {
                        if (Array.isArray(Z)) Z.forEach((D) => {
                            B.add(Q, Buffer.from(D, "base64"))
                        });
                        else if (Z !== void 0)
                            if (xX6(Q)) Z.split(",").forEach((D) => {
                                B.add(Q, Buffer.from(D.trim(), "base64"))
                            });
                            else B.add(Q, Buffer.from(Z, "base64"))
                    } else if (Array.isArray(Z)) Z.forEach((D) => {
                        B.add(Q, D)
                    });
                    else if (Z !== void 0) B.add(Q, Z)
                } catch (D) {
                    let G = `Failed to add metadata entry ${Q}: ${Z}. ${SX6.getErrorMessage(D)}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
                    TX6.log(PX6.LogVerbosity.ERROR, G)
                }
            }
            return B
        }
    }
    Bs2.Metadata = XP1;
    var vX6 = (A) => {
        return Buffer.isBuffer(A) ? A.toString("base64") : A
    }
});
var CP1 = E((Zs2) => {
    Object.defineProperty(Zs2, "__esModule", {
        value: !0
    });
    Zs2.CallCredentials = void 0;
    var CJ0 = IJ();

    function bX6(A) {
        return "getRequestHeaders" in A && typeof A.getRequestHeaders === "function"
    }
    class Mt {
        static createFromMetadataGenerator(A) {
            return new KJ0(A)
        }
        static createFromGoogleCredential(A) {
            return Mt.createFromMetadataGenerator((B, Q) => {
                let Z;
                if (bX6(A)) Z = A.getRequestHeaders(B.service_url);
                else Z = new Promise((D, G) => {
                    A.getRequestMetadata(B.service_url, (F, I) => {
                        if (F) {
                            G(F);
                            return
                        }
                        if (!I) {
                            G(new Error("Headers not set by metadata plugin"));
                            return
                        }
                        D(I)
                    })
                });
                Z.then((D) => {
                    let G = new CJ0.Metadata;
                    for (let F of Object.keys(D)) G.add(F, D[F]);
                    Q(null, G)
                }, (D) => {
                    Q(D)
                })
            })
        }
        static createEmpty() {
            return new HJ0
        }
    }
    Zs2.CallCredentials = Mt;
    class VP1 extends Mt {
        constructor(A) {
            super();
            this.creds = A
        }
        async generateMetadata(A) {
            let B = new CJ0.Metadata,
                Q = await Promise.all(this.creds.map((Z) => Z.generateMetadata(A)));
            for (let Z of Q) B.merge(Z);
            return B
        }
        compose(A) {
            return new VP1(this.creds.concat([A]))
        }
        _equals(A) {
            if (this === A) return !0;
            if (A instanceof VP1) return this.creds.every((B, Q) => B._equals(A.creds[Q]));
            else return !1
        }
    }
    class KJ0 extends Mt {
        constructor(A) {
            super();
            this.metadataGenerator = A
        }
        generateMetadata(A) {
            return new Promise((B, Q) => {
                this.metadataGenerator(A, (Z, D) => {
                    if (D !== void 0) B(D);
                    else Q(Z)
                })
            })
        }
        compose(A) {
            return new VP1([this, A])
        }
        _equals(A) {
            if (this === A) return !0;
            if (A instanceof KJ0) return this.metadataGenerator === A.metadataGenerator;
            else return !1
        }
    }
    class HJ0 extends Mt {
        generateMetadata(A) {
            return Promise.resolve(new CJ0.Metadata)
        }
        compose(A) {
            return A
        }
        _equals(A) {
            return A instanceof HJ0
        }
    }
});
var EJ0 = E((Fs2) => {
    Object.defineProperty(Fs2, "__esModule", {
        value: !0
    });
    Fs2.CIPHER_SUITES = void 0;
    Fs2.getDefaultRootsData = hX6;
    var fX6 = W1("fs");
    Fs2.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
    var Gs2 = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH,
        zJ0 = null;

    function hX6() {
        if (Gs2) {
            if (zJ0 === null) zJ0 = fX6.readFileSync(Gs2);
            return zJ0
        }
        return null
    }
});
var mV = E((Ws2) => {
    Object.defineProperty(Ws2, "__esModule", {
        value: !0
    });
    Ws2.parseUri = mX6;
    Ws2.splitHostPort = dX6;
    Ws2.combineHostPort = cX6;
    Ws2.uriToString = lX6;
    var uX6 = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;

    function mX6(A) {
        let B = uX6.exec(A);
        if (B === null) return null;
        return {
            scheme: B[1],
            authority: B[2],
            path: B[3]
        }
    }
    var Ys2 = /^\d+$/;

    function dX6(A) {
        if (A.startsWith("[")) {
            let B = A.indexOf("]");
            if (B === -1) return null;
            let Q = A.substring(1, B);
            if (Q.indexOf(":") === -1) return null;
            if (A.length > B + 1)
                if (A[B + 1] === ":") {
                    let Z = A.substring(B + 2);
                    if (Ys2.test(Z)) return {
                        host: Q,
                        port: +Z
                    };
                    else return null
                } else return null;
            else return {
                host: Q
            }
        } else {
            let B = A.split(":");
            if (B.length === 2)
                if (Ys2.test(B[1])) return {
                    host: B[0],
                    port: +B[1]
                };
                else return null;
            else return {
                host: A
            }
        }
    }

    function cX6(A) {
        if (A.port === void 0) return A.host;
        else if (A.host.includes(":")) return `[${A.host}]:${A.port}`;
        else return `${A.host}:${A.port}`
    }

    function lX6(A) {
        let B = "";
        if (A.scheme !== void 0) B += A.scheme + ":";
        if (A.authority !== void 0) B += "//" + A.authority + "/";
        return B += A.path, B
    }
});
var DM = E((Js2) => {
    Object.defineProperty(Js2, "__esModule", {
        value: !0
    });
    Js2.registerResolver = sX6;
    Js2.registerDefaultScheme = rX6;
    Js2.createResolver = oX6;
    Js2.getDefaultAuthority = tX6;
    Js2.mapUriDefaultScheme = eX6;
    var wJ0 = mV(),
        Rt = {},
        UJ0 = null;

    function sX6(A, B) {
        Rt[A] = B
    }

    function rX6(A) {
        UJ0 = A
    }

    function oX6(A, B, Q) {
        if (A.scheme !== void 0 && A.scheme in Rt) return new Rt[A.scheme](A, B, Q);
        else throw new Error(`No resolver could be created for target ${wJ0.uriToString(A)}`)
    }

    function tX6(A) {
        if (A.scheme !== void 0 && A.scheme in Rt) return Rt[A.scheme].getDefaultAuthority(A);
        else throw new Error(`Invalid target ${wJ0.uriToString(A)}`)
    }

    function eX6(A) {
        if (A.scheme === void 0 || !(A.scheme in Rt))
            if (UJ0 !== null) return {
                scheme: UJ0,
                authority: void 0,
                path: wJ0.uriToString(A)
            };
            else return null;
        return A
    }
});