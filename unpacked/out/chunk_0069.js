/* chunk:69 bytes:[1638705, 1657090) size:18385 source:unpacked-cli.js */
var W6A = E((T05, Y6A) => {
    var {
        defineProperty: nK1,
        getOwnPropertyDescriptor: ds9,
        getOwnPropertyNames: cs9
    } = Object, ls9 = Object.prototype.hasOwnProperty, Tk = (A, B) => nK1(A, "name", {
        value: B,
        configurable: !0
    }), ps9 = (A, B) => {
        for (var Q in B) nK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, is9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cs9(B))
                if (!ls9.call(A, D) && D !== Q) nK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ds9(B, D)) || Z.enumerable
                })
        }
        return A
    }, ns9 = (A) => is9(nK1({}, "__esModule", {
        value: !0
    }), A), D6A = {};
    ps9(D6A, {
        Field: () => rs9,
        Fields: () => os9,
        HttpRequest: () => ts9,
        HttpResponse: () => es9,
        IHttpRequest: () => G6A.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => as9,
        isValidHostname: () => I6A,
        resolveHttpHandlerRuntimeConfig: () => ss9
    });
    Y6A.exports = ns9(D6A);
    var as9 = Tk((A) => {
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
        ss9 = Tk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        G6A = Z6A(),
        rs9 = class {
            static {
                Tk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = G6A.FieldPosition.HEADER,
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
        os9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Tk(this, "Fields")
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
        ts9 = class A {
            static {
                Tk(this, "HttpRequest")
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
                if (Q.query) Q.query = F6A(Q.query);
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

    function F6A(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Tk(F6A, "cloneQuery");
    var es9 = class {
        static {
            Tk(this, "HttpResponse")
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

    function I6A(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Tk(I6A, "isValidHostname")
});
var hG = E((k05, K6A) => {
    var {
        defineProperty: aK1,
        getOwnPropertyDescriptor: Ar9,
        getOwnPropertyNames: Br9
    } = Object, Qr9 = Object.prototype.hasOwnProperty, X6A = (A, B) => aK1(A, "name", {
        value: B,
        configurable: !0
    }), Zr9 = (A, B) => {
        for (var Q in B) aK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Dr9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Br9(B))
                if (!Qr9.call(A, D) && D !== Q) aK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ar9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Gr9 = (A) => Dr9(aK1({}, "__esModule", {
        value: !0
    }), A), V6A = {};
    Zr9(V6A, {
        contentLengthMiddleware: () => sa1,
        contentLengthMiddlewareOptions: () => C6A,
        getContentLengthPlugin: () => Ir9
    });
    K6A.exports = Gr9(V6A);
    var Fr9 = W6A(),
        J6A = "content-length";

    function sa1(A) {
        return (B) => async (Q) => {
            let Z = Q.request;
            if (Fr9.HttpRequest.isInstance(Z)) {
                let {
                    body: D,
                    headers: G
                } = Z;
                if (D && Object.keys(G).map((F) => F.toLowerCase()).indexOf(J6A) === -1) try {
                    let F = A(D);
                    Z.headers = {
                        ...Z.headers,
                        [J6A]: String(F)
                    }
                } catch (F) {}
            }
            return B({
                ...Q,
                request: Z
            })
        }
    }
    X6A(sa1, "contentLengthMiddleware");
    var C6A = {
            step: "build",
            tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
            name: "contentLengthMiddleware",
            override: !0
        },
        Ir9 = X6A((A) => ({
            applyToStack: (B) => {
                B.add(sa1(A.bodyLengthChecker), C6A)
            }
        }), "getContentLengthPlugin")
});
var Qi = E((H6A) => {
    Object.defineProperty(H6A, "__esModule", {
        value: !0
    });
    H6A.getHomeDir = void 0;
    var Yr9 = W1("os"),
        Wr9 = W1("path"),
        ra1 = {},
        Jr9 = () => {
            if (process && process.geteuid) return `${process.geteuid()}`;
            return "DEFAULT"
        },
        Xr9 = () => {
            let {
                HOME: A,
                USERPROFILE: B,
                HOMEPATH: Q,
                HOMEDRIVE: Z = `C:${Wr9.sep}`
            } = process.env;
            if (A) return A;
            if (B) return B;
            if (Q) return `${Z}${Q}`;
            let D = Jr9();
            if (!ra1[D]) ra1[D] = Yr9.homedir();
            return ra1[D]
        };
    H6A.getHomeDir = Xr9
});
var oa1 = E((E6A) => {
    Object.defineProperty(E6A, "__esModule", {
        value: !0
    });
    E6A.getSSOTokenFilepath = void 0;
    var Vr9 = W1("crypto"),
        Cr9 = W1("path"),
        Kr9 = Qi(),
        Hr9 = (A) => {
            let Q = Vr9.createHash("sha1").update(A).digest("hex");
            return Cr9.join(Kr9.getHomeDir(), ".aws", "sso", "cache", `${Q}.json`)
        };
    E6A.getSSOTokenFilepath = Hr9
});
var q6A = E((w6A) => {
    Object.defineProperty(w6A, "__esModule", {
        value: !0
    });
    w6A.getSSOTokenFromFile = void 0;
    var zr9 = W1("fs"),
        Er9 = oa1(),
        {
            readFile: Ur9
        } = zr9.promises,
        wr9 = async (A) => {
            let B = Er9.getSSOTokenFilepath(A),
                Q = await Ur9(B, "utf8");
            return JSON.parse(Q)
        };
    w6A.getSSOTokenFromFile = wr9
});
var k6A = E((v05, j6A) => {
    var {
        defineProperty: sK1,
        getOwnPropertyDescriptor: $r9,
        getOwnPropertyNames: qr9
    } = Object, Nr9 = Object.prototype.hasOwnProperty, rK1 = (A, B) => sK1(A, "name", {
        value: B,
        configurable: !0
    }), Lr9 = (A, B) => {
        for (var Q in B) sK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Mr9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qr9(B))
                if (!Nr9.call(A, D) && D !== Q) sK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $r9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Rr9 = (A) => Mr9(sK1({}, "__esModule", {
        value: !0
    }), A), N6A = {};
    Lr9(N6A, {
        AlgorithmId: () => O6A,
        EndpointURLScheme: () => R6A,
        FieldPosition: () => T6A,
        HttpApiKeyAuthLocation: () => M6A,
        HttpAuthLocation: () => L6A,
        IniSectionType: () => P6A,
        RequestHandlerProtocol: () => S6A,
        SMITHY_CONTEXT_KEY: () => jr9,
        getDefaultClientConfiguration: () => Pr9,
        resolveDefaultRuntimeConfig: () => Sr9
    });
    j6A.exports = Rr9(N6A);
    var L6A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(L6A || {}),
        M6A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(M6A || {}),
        R6A = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(R6A || {}),
        O6A = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(O6A || {}),
        Or9 = rK1((A) => {
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
        Tr9 = rK1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Pr9 = rK1((A) => {
            return Or9(A)
        }, "getDefaultClientConfiguration"),
        Sr9 = rK1((A) => {
            return Tr9(A)
        }, "resolveDefaultRuntimeConfig"),
        T6A = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(T6A || {}),
        jr9 = "__smithy_context",
        P6A = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(P6A || {}),
        S6A = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(S6A || {})
});
var ea1 = E((y6A) => {
    Object.defineProperty(y6A, "__esModule", {
        value: !0
    });
    y6A.slurpFile = void 0;
    var kr9 = W1("fs"),
        {
            readFile: yr9
        } = kr9.promises,
        ta1 = {},
        _r9 = (A, B) => {
            if (!ta1[A] || (B === null || B === void 0 ? void 0 : B.ignoreCache)) ta1[A] = yr9(A, "utf8");
            return ta1[A]
        };
    y6A.slurpFile = _r9
});
var I3 = E((f05, y91) => {
    var {
        defineProperty: eK1,
        getOwnPropertyDescriptor: xr9,
        getOwnPropertyNames: vr9
    } = Object, br9 = Object.prototype.hasOwnProperty, Qz = (A, B) => eK1(A, "name", {
        value: B,
        configurable: !0
    }), fr9 = (A, B) => {
        for (var Q in B) eK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, As1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of vr9(B))
                if (!br9.call(A, D) && D !== Q) eK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = xr9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Qs1 = (A, B, Q) => (As1(A, B, "default"), Q && As1(Q, B, "default")), hr9 = (A) => As1(eK1({}, "__esModule", {
        value: !0
    }), A), k91 = {};
    fr9(k91, {
        CONFIG_PREFIX_SEPARATOR: () => Oh,
        DEFAULT_PROFILE: () => f6A,
        ENV_PROFILE: () => b6A,
        getProfileName: () => gr9,
        loadSharedConfigFiles: () => g6A,
        loadSsoSessionData: () => tr9,
        parseKnownFiles: () => Ao9
    });
    y91.exports = hr9(k91);
    Qs1(k91, Qi(), y91.exports);
    var b6A = "AWS_PROFILE",
        f6A = "default",
        gr9 = Qz((A) => A.profile || process.env[b6A] || f6A, "getProfileName");
    Qs1(k91, oa1(), y91.exports);
    Qs1(k91, q6A(), y91.exports);
    var oK1 = k6A(),
        ur9 = Qz((A) => Object.entries(A).filter(([B]) => {
            let Q = B.indexOf(Oh);
            if (Q === -1) return !1;
            return Object.values(oK1.IniSectionType).includes(B.substring(0, Q))
        }).reduce((B, [Q, Z]) => {
            let D = Q.indexOf(Oh),
                G = Q.substring(0, D) === oK1.IniSectionType.PROFILE ? Q.substring(D + 1) : Q;
            return B[G] = Z, B
        }, {
            ...A.default && {
                default: A.default
            }
        }), "getConfigData"),
        tK1 = W1("path"),
        mr9 = Qi(),
        dr9 = "AWS_CONFIG_FILE",
        h6A = Qz(() => process.env[dr9] || tK1.join(mr9.getHomeDir(), ".aws", "config"), "getConfigFilepath"),
        cr9 = Qi(),
        lr9 = "AWS_SHARED_CREDENTIALS_FILE",
        pr9 = Qz(() => process.env[lr9] || tK1.join(cr9.getHomeDir(), ".aws", "credentials"), "getCredentialsFilepath"),
        ir9 = Qi(),
        nr9 = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/,
        ar9 = ["__proto__", "profile __proto__"],
        Bs1 = Qz((A) => {
            let B = {},
                Q, Z;
            for (let D of A.split(/\r?\n/)) {
                let G = D.split(/(^|\s)[;#]/)[0].trim();
                if (G[0] === "[" && G[G.length - 1] === "]") {
                    Q = void 0, Z = void 0;
                    let I = G.substring(1, G.length - 1),
                        Y = nr9.exec(I);
                    if (Y) {
                        let [, W, , J] = Y;
                        if (Object.values(oK1.IniSectionType).includes(W)) Q = [W, J].join(Oh)
                    } else Q = I;
                    if (ar9.includes(I)) throw new Error(`Found invalid profile name "${I}"`)
                } else if (Q) {
                    let I = G.indexOf("=");
                    if (![0, -1].includes(I)) {
                        let [Y, W] = [G.substring(0, I).trim(), G.substring(I + 1).trim()];
                        if (W === "") Z = Y;
                        else {
                            if (Z && D.trimStart() === D) Z = void 0;
                            B[Q] = B[Q] || {};
                            let J = Z ? [Z, Y].join(Oh) : Y;
                            B[Q][J] = W
                        }
                    }
                }
            }
            return B
        }, "parseIni"),
        x6A = ea1(),
        v6A = Qz(() => ({}), "swallowError"),
        Oh = ".",
        g6A = Qz(async (A = {}) => {
            let {
                filepath: B = pr9(),
                configFilepath: Q = h6A()
            } = A, Z = ir9.getHomeDir(), D = "~/", G = B;
            if (B.startsWith("~/")) G = tK1.join(Z, B.slice(2));
            let F = Q;
            if (Q.startsWith("~/")) F = tK1.join(Z, Q.slice(2));
            let I = await Promise.all([x6A.slurpFile(F, {
                ignoreCache: A.ignoreCache
            }).then(Bs1).then(ur9).catch(v6A), x6A.slurpFile(G, {
                ignoreCache: A.ignoreCache
            }).then(Bs1).catch(v6A)]);
            return {
                configFile: I[0],
                credentialsFile: I[1]
            }
        }, "loadSharedConfigFiles"),
        sr9 = Qz((A) => Object.entries(A).filter(([B]) => B.startsWith(oK1.IniSectionType.SSO_SESSION + Oh)).reduce((B, [Q, Z]) => ({
            ...B,
            [Q.substring(Q.indexOf(Oh) + 1)]: Z
        }), {}), "getSsoSessionData"),
        rr9 = ea1(),
        or9 = Qz(() => ({}), "swallowError"),
        tr9 = Qz(async (A = {}) => rr9.slurpFile(A.configFilepath ?? h6A()).then(Bs1).then(sr9).catch(or9), "loadSsoSessionData"),
        er9 = Qz((...A) => {
            let B = {};
            for (let Q of A)
                for (let [Z, D] of Object.entries(Q))
                    if (B[Z] !== void 0) Object.assign(B[Z], D);
                    else B[Z] = D;
            return B
        }, "mergeConfigFiles"),
        Ao9 = Qz(async (A) => {
            let B = await g6A(A);
            return er9(B.configFile, B.credentialsFile)
        }, "parseKnownFiles")
});