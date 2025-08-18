/* chunk:224 bytes:[4863188, 4882604) size:19416 source:unpacked-cli.js */
var QA2 = E((wI4, C81) => {
    var CI4 = W1("path"),
        X60 = Z60(),
        KI4 = n02(),
        HI4 = s02(),
        t02 = o02(),
        PT = {};

    function V81(A, B) {
        return B.lockfilePath || `${A}.lock`
    }

    function V60(A, B, Q) {
        if (!B.realpath) return Q(null, CI4.resolve(A));
        B.fs.realpath(A, Q)
    }

    function J60(A, B, Q) {
        let Z = V81(A, B);
        B.fs.mkdir(Z, (D) => {
            if (!D) return t02.probe(Z, B.fs, (G, F, I) => {
                if (G) return B.fs.rmdir(Z, () => {}), Q(G);
                Q(null, F, I)
            });
            if (D.code !== "EEXIST") return Q(D);
            if (B.stale <= 0) return Q(Object.assign(new Error("Lock file is already being held"), {
                code: "ELOCKED",
                file: A
            }));
            B.fs.stat(Z, (G, F) => {
                if (G) {
                    if (G.code === "ENOENT") return J60(A, {
                        ...B,
                        stale: 0
                    }, Q);
                    return Q(G)
                }
                if (!e02(F, B)) return Q(Object.assign(new Error("Lock file is already being held"), {
                    code: "ELOCKED",
                    file: A
                }));
                AA2(A, B, (I) => {
                    if (I) return Q(I);
                    J60(A, {
                        ...B,
                        stale: 0
                    }, Q)
                })
            })
        })
    }

    function e02(A, B) {
        return A.mtime.getTime() < Date.now() - B.stale
    }

    function AA2(A, B, Q) {
        B.fs.rmdir(V81(A, B), (Z) => {
            if (Z && Z.code !== "ENOENT") return Q(Z);
            Q()
        })
    }

    function eq1(A, B) {
        let Q = PT[A];
        if (Q.updateTimeout) return;
        if (Q.updateDelay = Q.updateDelay || B.update, Q.updateTimeout = setTimeout(() => {
                Q.updateTimeout = null, B.fs.stat(Q.lockfilePath, (Z, D) => {
                    let G = Q.lastUpdate + B.stale < Date.now();
                    if (Z) {
                        if (Z.code === "ENOENT" || G) return W60(A, Q, Object.assign(Z, {
                            code: "ECOMPROMISED"
                        }));
                        return Q.updateDelay = 1000, eq1(A, B)
                    }
                    if (Q.mtime.getTime() !== D.mtime.getTime()) return W60(A, Q, Object.assign(new Error("Unable to update lock within the stale threshold"), {
                        code: "ECOMPROMISED"
                    }));
                    let I = t02.getMtime(Q.mtimePrecision);
                    B.fs.utimes(Q.lockfilePath, I, I, (Y) => {
                        let W = Q.lastUpdate + B.stale < Date.now();
                        if (Q.released) return;
                        if (Y) {
                            if (Y.code === "ENOENT" || W) return W60(A, Q, Object.assign(Y, {
                                code: "ECOMPROMISED"
                            }));
                            return Q.updateDelay = 1000, eq1(A, B)
                        }
                        Q.mtime = I, Q.lastUpdate = Date.now(), Q.updateDelay = null, eq1(A, B)
                    })
                })
            }, Q.updateDelay), Q.updateTimeout.unref) Q.updateTimeout.unref()
    }

    function W60(A, B, Q) {
        if (B.released = !0, B.updateTimeout) clearTimeout(B.updateTimeout);
        if (PT[A] === B) delete PT[A];
        B.options.onCompromised(Q)
    }

    function zI4(A, B, Q) {
        B = {
            stale: 1e4,
            update: null,
            realpath: !0,
            retries: 0,
            fs: X60,
            onCompromised: (Z) => {
                throw Z
            },
            ...B
        }, B.retries = B.retries || 0, B.retries = typeof B.retries === "number" ? {
            retries: B.retries
        } : B.retries, B.stale = Math.max(B.stale || 0, 2000), B.update = B.update == null ? B.stale / 2 : B.update || 0, B.update = Math.max(Math.min(B.update, B.stale / 2), 1000), V60(A, B, (Z, D) => {
            if (Z) return Q(Z);
            let G = KI4.operation(B.retries);
            G.attempt(() => {
                J60(D, B, (F, I, Y) => {
                    if (G.retry(F)) return;
                    if (F) return Q(G.mainError());
                    let W = PT[D] = {
                        lockfilePath: V81(D, B),
                        mtime: I,
                        mtimePrecision: Y,
                        options: B,
                        lastUpdate: Date.now()
                    };
                    eq1(D, B), Q(null, (J) => {
                        if (W.released) return J && J(Object.assign(new Error("Lock is already released"), {
                            code: "ERELEASED"
                        }));
                        BA2(D, {
                            ...B,
                            realpath: !1
                        }, J)
                    })
                })
            })
        })
    }

    function BA2(A, B, Q) {
        B = {
            fs: X60,
            realpath: !0,
            ...B
        }, V60(A, B, (Z, D) => {
            if (Z) return Q(Z);
            let G = PT[D];
            if (!G) return Q(Object.assign(new Error("Lock is not acquired/owned by you"), {
                code: "ENOTACQUIRED"
            }));
            G.updateTimeout && clearTimeout(G.updateTimeout), G.released = !0, delete PT[D], AA2(D, B, Q)
        })
    }

    function EI4(A, B, Q) {
        B = {
            stale: 1e4,
            realpath: !0,
            fs: X60,
            ...B
        }, B.stale = Math.max(B.stale || 0, 2000), V60(A, B, (Z, D) => {
            if (Z) return Q(Z);
            B.fs.stat(V81(D, B), (G, F) => {
                if (G) return G.code === "ENOENT" ? Q(null, !1) : Q(G);
                return Q(null, !e02(F, B))
            })
        })
    }

    function UI4() {
        return PT
    }
    HI4(() => {
        for (let A in PT) {
            let B = PT[A].options;
            try {
                B.fs.rmdirSync(V81(A, B))
            } catch (Q) {}
        }
    });
    wI4.lock = zI4;
    wI4.unlock = BA2;
    wI4.check = EI4;
    wI4.getLocks = UI4
});
var DA2 = E((Zw5, ZA2) => {
    var MI4 = Z60();

    function RI4(A) {
        let B = ["mkdir", "realpath", "stat", "rmdir", "utimes"],
            Q = {
                ...A
            };
        return B.forEach((Z) => {
            Q[Z] = (...D) => {
                let G = D.pop(),
                    F;
                try {
                    F = A[`${Z}Sync`](...D)
                } catch (I) {
                    return G(I)
                }
                G(null, F)
            }
        }), Q
    }

    function OI4(A) {
        return (...B) => new Promise((Q, Z) => {
            B.push((D, G) => {
                if (D) Z(D);
                else Q(G)
            }), A(...B)
        })
    }

    function TI4(A) {
        return (...B) => {
            let Q, Z;
            if (B.push((D, G) => {
                    Q = D, Z = G
                }), A(...B), Q) throw Q;
            return Z
        }
    }

    function PI4(A) {
        if (A = {
                ...A
            }, A.fs = RI4(A.fs || MI4), typeof A.retries === "number" && A.retries > 0 || A.retries && typeof A.retries.retries === "number" && A.retries.retries > 0) throw Object.assign(new Error("Cannot use retries with the sync api"), {
            code: "ESYNC"
        });
        return A
    }
    ZA2.exports = {
        toPromise: OI4,
        toSync: TI4,
        toSyncOptions: PI4
    }
});
var QN1 = E((Dw5, D_) => {
    var as = QA2(),
        {
            toPromise: AN1,
            toSync: BN1,
            toSyncOptions: C60
        } = DA2();
    async function GA2(A, B) {
        let Q = await AN1(as.lock)(A, B);
        return AN1(Q)
    }

    function SI4(A, B) {
        let Q = BN1(as.lock)(A, C60(B));
        return BN1(Q)
    }

    function jI4(A, B) {
        return AN1(as.unlock)(A, B)
    }

    function kI4(A, B) {
        return BN1(as.unlock)(A, C60(B))
    }

    function yI4(A, B) {
        return AN1(as.check)(A, B)
    }

    function _I4(A, B) {
        return BN1(as.check)(A, C60(B))
    }
    D_.exports = GA2;
    D_.exports.lock = GA2;
    D_.exports.unlock = jI4;
    D_.exports.lockSync = SI4;
    D_.exports.unlockSync = kI4;
    D_.exports.check = yI4;
    D_.exports.checkSync = _I4
});
var K60 = E((Gw5, KA2) => {
    var {
        defineProperty: ZN1,
        getOwnPropertyDescriptor: xI4,
        getOwnPropertyNames: vI4
    } = Object, bI4 = Object.prototype.hasOwnProperty, DN1 = (A, B) => ZN1(A, "name", {
        value: B,
        configurable: !0
    }), fI4 = (A, B) => {
        for (var Q in B) ZN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, hI4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of vI4(B))
                if (!bI4.call(A, D) && D !== Q) ZN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = xI4(B, D)) || Z.enumerable
                })
        }
        return A
    }, gI4 = (A) => hI4(ZN1({}, "__esModule", {
        value: !0
    }), A), FA2 = {};
    fI4(FA2, {
        AlgorithmId: () => JA2,
        EndpointURLScheme: () => WA2,
        FieldPosition: () => XA2,
        HttpApiKeyAuthLocation: () => YA2,
        HttpAuthLocation: () => IA2,
        IniSectionType: () => VA2,
        RequestHandlerProtocol: () => CA2,
        SMITHY_CONTEXT_KEY: () => lI4,
        getDefaultClientConfiguration: () => dI4,
        resolveDefaultRuntimeConfig: () => cI4
    });
    KA2.exports = gI4(FA2);
    var IA2 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(IA2 || {}),
        YA2 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(YA2 || {}),
        WA2 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(WA2 || {}),
        JA2 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(JA2 || {}),
        uI4 = DN1((A) => {
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
        mI4 = DN1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        dI4 = DN1((A) => {
            return uI4(A)
        }, "getDefaultClientConfiguration"),
        cI4 = DN1((A) => {
            return mI4(A)
        }, "resolveDefaultRuntimeConfig"),
        XA2 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(XA2 || {}),
        lI4 = "__smithy_context",
        VA2 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(VA2 || {}),
        CA2 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(CA2 || {})
});
var QX = E((Fw5, wA2) => {
    var {
        defineProperty: GN1,
        getOwnPropertyDescriptor: pI4,
        getOwnPropertyNames: iI4
    } = Object, nI4 = Object.prototype.hasOwnProperty, G_ = (A, B) => GN1(A, "name", {
        value: B,
        configurable: !0
    }), aI4 = (A, B) => {
        for (var Q in B) GN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, sI4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of iI4(B))
                if (!nI4.call(A, D) && D !== Q) GN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pI4(B, D)) || Z.enumerable
                })
        }
        return A
    }, rI4 = (A) => sI4(GN1({}, "__esModule", {
        value: !0
    }), A), HA2 = {};
    aI4(HA2, {
        Field: () => eI4,
        Fields: () => AY4,
        HttpRequest: () => BY4,
        HttpResponse: () => QY4,
        IHttpRequest: () => zA2.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => oI4,
        isValidHostname: () => UA2,
        resolveHttpHandlerRuntimeConfig: () => tI4
    });
    wA2.exports = rI4(HA2);
    var oI4 = G_((A) => {
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
        tI4 = G_((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        zA2 = K60(),
        eI4 = class {
            static {
                G_(this, "Field")
            }
            constructor({
                name: A,
                kind: B = zA2.FieldPosition.HEADER,
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
        AY4 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                G_(this, "Fields")
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
        BY4 = class A {
            static {
                G_(this, "HttpRequest")
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
                if (Q.query) Q.query = EA2(Q.query);
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

    function EA2(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    G_(EA2, "cloneQuery");
    var QY4 = class {
        static {
            G_(this, "HttpResponse")
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

    function UA2(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    G_(UA2, "isValidHostname")
});
var K81 = E((Jw5, MA2) => {
    var {
        defineProperty: IN1,
        getOwnPropertyDescriptor: ZY4,
        getOwnPropertyNames: DY4
    } = Object, GY4 = Object.prototype.hasOwnProperty, FN1 = (A, B) => IN1(A, "name", {
        value: B,
        configurable: !0
    }), FY4 = (A, B) => {
        for (var Q in B) IN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, IY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of DY4(B))
                if (!GY4.call(A, D) && D !== Q) IN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ZY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, YY4 = (A) => IY4(IN1({}, "__esModule", {
        value: !0
    }), A), $A2 = {};
    FY4($A2, {
        getHostHeaderPlugin: () => JY4,
        hostHeaderMiddleware: () => NA2,
        hostHeaderMiddlewareOptions: () => LA2,
        resolveHostHeaderConfig: () => qA2
    });
    MA2.exports = YY4($A2);
    var WY4 = QX();

    function qA2(A) {
        return A
    }
    FN1(qA2, "resolveHostHeaderConfig");
    var NA2 = FN1((A) => (B) => async (Q) => {
            if (!WY4.HttpRequest.isInstance(Q.request)) return B(Q);
            let {
                request: Z
            } = Q, {
                handlerProtocol: D = ""
            } = A.requestHandler.metadata || {};
            if (D.indexOf("h2") >= 0 && !Z.headers[":authority"]) delete Z.headers.host, Z.headers[":authority"] = Z.hostname + (Z.port ? ":" + Z.port : "");
            else if (!Z.headers.host) {
                let G = Z.hostname;
                if (Z.port != null) G += `:${Z.port}`;
                Z.headers.host = G
            }
            return B(Q)
        }, "hostHeaderMiddleware"),
        LA2 = {
            name: "hostHeaderMiddleware",
            step: "build",
            priority: "low",
            tags: ["HOST"],
            override: !0
        },
        JY4 = FN1((A) => ({
            applyToStack: FN1((B) => {
                B.add(NA2(A), LA2)
            }, "applyToStack")
        }), "getHostHeaderPlugin")
});