/* chunk:120 bytes:[2726406, 2746121) size:19715 source:unpacked-cli.js */
var u10 = E((T45, jLA) => {
    var {
        create: ELQ,
        defineProperty: fQ1,
        getOwnPropertyDescriptor: ULQ,
        getOwnPropertyNames: wLQ,
        getPrototypeOf: $LQ
    } = Object, qLQ = Object.prototype.hasOwnProperty, fE1 = (A, B) => fQ1(A, "name", {
        value: B,
        configurable: !0
    }), NLQ = (A, B) => {
        for (var Q in B) fQ1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, OLA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of wLQ(B))
                if (!qLQ.call(A, D) && D !== Q) fQ1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ULQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, Vn = (A, B, Q) => (Q = A != null ? ELQ($LQ(A)) : {}, OLA(B || !A || !A.__esModule ? fQ1(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), LLQ = (A) => OLA(fQ1({}, "__esModule", {
        value: !0
    }), A), TLA = {};
    NLQ(TLA, {
        credentialsTreatedAsExpired: () => SLA,
        credentialsWillNeedRefresh: () => PLA,
        defaultProvider: () => OLQ
    });
    jLA.exports = LLQ(TLA);
    var g10 = so1(),
        MLQ = I3(),
        uh = A9(),
        MLA = "AWS_EC2_METADATA_DISABLED",
        RLQ = fE1(async (A) => {
            let {
                ENV_CMDS_FULL_URI: B,
                ENV_CMDS_RELATIVE_URI: Q,
                fromContainerMetadata: Z,
                fromInstanceMetadata: D
            } = await Promise.resolve().then(() => Vn(TF()));
            if (process.env[Q] || process.env[B]) {
                A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
                let {
                    fromHttp: G
                } = await Promise.resolve().then(() => Vn(Vt1()));
                return uh.chain(G(A), Z(A))
            }
            if (process.env[MLA] && process.env[MLA] !== "false") return async () => {
                throw new uh.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
                    logger: A.logger
                })
            };
            return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), D(A)
        }, "remoteProvider"),
        RLA = !1,
        OLQ = fE1((A = {}) => uh.memoize(uh.chain(async () => {
            if (A.profile ?? process.env[MLQ.ENV_PROFILE]) {
                if (process.env[g10.ENV_KEY] && process.env[g10.ENV_SECRET]) {
                    if (!RLA)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), RLA = !0
                }
                throw new uh.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
                    logger: A.logger,
                    tryNextLink: !0
                })
            }
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), g10.fromEnv(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
            let {
                ssoStartUrl: B,
                ssoAccountId: Q,
                ssoRegion: Z,
                ssoRoleName: D,
                ssoSession: G
            } = A;
            if (!B && !Q && !Z && !D && !G) throw new uh.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
                logger: A.logger
            });
            let {
                fromSSO: F
            } = await Promise.resolve().then(() => Vn(le1()));
            return F(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
            let {
                fromIni: B
            } = await Promise.resolve().then(() => Vn(LLA()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
            let {
                fromProcess: B
            } = await Promise.resolve().then(() => Vn(y10()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
            let {
                fromTokenFile: B
            } = await Promise.resolve().then(() => Vn(b10()));
            return B(A)()
        }, async () => {
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await RLQ(A))()
        }, async () => {
            throw new uh.CredentialsProviderError("Could not load credentials from any providers", {
                tryNextLink: !1,
                logger: A.logger
            })
        }), SLA, PLA), "defaultProvider"),
        PLA = fE1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
        SLA = fE1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
});
var _LA = E((qV) => {
    var TLQ = qV && qV.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        PLQ = qV && qV.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        kLA = qV && qV.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) TLQ(B, A, Q)
            }
            return PLQ(B, A), B
        };
    Object.defineProperty(qV, "__esModule", {
        value: !0
    });
    qV.req = qV.json = qV.toBuffer = void 0;
    var SLQ = kLA(W1("http")),
        jLQ = kLA(W1("https"));
    async function yLA(A) {
        let B = 0,
            Q = [];
        for await (let Z of A) B += Z.length, Q.push(Z);
        return Buffer.concat(Q, B)
    }
    qV.toBuffer = yLA;
    async function kLQ(A) {
        let Q = (await yLA(A)).toString("utf8");
        try {
            return JSON.parse(Q)
        } catch (Z) {
            let D = Z;
            throw D.message += ` (input: ${Q})`, D
        }
    }
    qV.json = kLQ;

    function yLQ(A, B = {}) {
        let Z = ((typeof A === "string" ? A : A.href).startsWith("https:") ? jLQ : SLQ).request(A, B),
            D = new Promise((G, F) => {
                Z.once("response", G).once("error", F).end()
            });
        return Z.then = D.then.bind(D), Z
    }
    qV.req = yLQ
});
var hLA = E((eC) => {
    var vLA = eC && eC.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        _LQ = eC && eC.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        bLA = eC && eC.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) vLA(B, A, Q)
            }
            return _LQ(B, A), B
        },
        xLQ = eC && eC.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) vLA(B, A, Q)
        };
    Object.defineProperty(eC, "__esModule", {
        value: !0
    });
    eC.Agent = void 0;
    var vLQ = bLA(W1("net")),
        xLA = bLA(W1("http")),
        bLQ = W1("https");
    xLQ(_LA(), eC);
    var gN = Symbol("AgentBaseInternalState");
    class fLA extends xLA.Agent {
        constructor(A) {
            super(A);
            this[gN] = {}
        }
        isSecureEndpoint(A) {
            if (A) {
                if (typeof A.secureEndpoint === "boolean") return A.secureEndpoint;
                if (typeof A.protocol === "string") return A.protocol === "https:"
            }
            let {
                stack: B
            } = new Error;
            if (typeof B !== "string") return !1;
            return B.split(`
`).some((Q) => Q.indexOf("(https.js:") !== -1 || Q.indexOf("node:https:") !== -1)
        }
        incrementSockets(A) {
            if (this.maxSockets === 1 / 0 && this.maxTotalSockets === 1 / 0) return null;
            if (!this.sockets[A]) this.sockets[A] = [];
            let B = new vLQ.Socket({
                writable: !1
            });
            return this.sockets[A].push(B), this.totalSocketCount++, B
        }
        decrementSockets(A, B) {
            if (!this.sockets[A] || B === null) return;
            let Q = this.sockets[A],
                Z = Q.indexOf(B);
            if (Z !== -1) {
                if (Q.splice(Z, 1), this.totalSocketCount--, Q.length === 0) delete this.sockets[A]
            }
        }
        getName(A) {
            if (typeof A.secureEndpoint === "boolean" ? A.secureEndpoint : this.isSecureEndpoint(A)) return bLQ.Agent.prototype.getName.call(this, A);
            return super.getName(A)
        }
        createSocket(A, B, Q) {
            let Z = {
                    ...B,
                    secureEndpoint: this.isSecureEndpoint(B)
                },
                D = this.getName(Z),
                G = this.incrementSockets(D);
            Promise.resolve().then(() => this.connect(A, Z)).then((F) => {
                if (this.decrementSockets(D, G), F instanceof xLA.Agent) try {
                    return F.addRequest(A, Z)
                } catch (I) {
                    return Q(I)
                }
                this[gN].currentSocket = F, super.createSocket(A, B, Q)
            }, (F) => {
                this.decrementSockets(D, G), Q(F)
            })
        }
        createConnection() {
            let A = this[gN].currentSocket;
            if (this[gN].currentSocket = void 0, !A) throw new Error("No socket was returned in the `connect()` function");
            return A
        }
        get defaultPort() {
            return this[gN].defaultPort ?? (this.protocol === "https:" ? 443 : 80)
        }
        set defaultPort(A) {
            if (this[gN]) this[gN].defaultPort = A
        }
        get protocol() {
            return this[gN].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:")
        }
        set protocol(A) {
            if (this[gN]) this[gN].protocol = A
        }
    }
    eC.Agent = fLA
});
var gLA = E((Cn) => {
    var fLQ = Cn && Cn.__importDefault || function(A) {
        return A && A.__esModule ? A : {
            default: A
        }
    };
    Object.defineProperty(Cn, "__esModule", {
        value: !0
    });
    Cn.parseProxyResponse = void 0;
    var hLQ = fLQ(mB1()),
        hE1 = hLQ.default("https-proxy-agent:parse-proxy-response");

    function gLQ(A) {
        return new Promise((B, Q) => {
            let Z = 0,
                D = [];

            function G() {
                let J = A.read();
                if (J) W(J);
                else A.once("readable", G)
            }

            function F() {
                A.removeListener("end", I), A.removeListener("error", Y), A.removeListener("readable", G)
            }

            function I() {
                F(), hE1("onend"), Q(new Error("Proxy connection ended before receiving CONNECT response"))
            }

            function Y(J) {
                F(), hE1("onerror %o", J), Q(J)
            }

            function W(J) {
                D.push(J), Z += J.length;
                let X = Buffer.concat(D, Z),
                    V = X.indexOf(`\r
\r
`);
                if (V === -1) {
                    hE1("have not received end of HTTP headers yet..."), G();
                    return
                }
                let C = X.slice(0, V).toString("ascii").split(`\r
`),
                    K = C.shift();
                if (!K) return A.destroy(), Q(new Error("No header received from proxy CONNECT response"));
                let H = K.split(" "),
                    z = +H[1],
                    $ = H.slice(2).join(" "),
                    L = {};
                for (let N of C) {
                    if (!N) continue;
                    let R = N.indexOf(":");
                    if (R === -1) return A.destroy(), Q(new Error(`Invalid header from proxy CONNECT response: "${N}"`));
                    let O = N.slice(0, R).toLowerCase(),
                        P = N.slice(R + 1).trimStart(),
                        j = L[O];
                    if (typeof j === "string") L[O] = [j, P];
                    else if (Array.isArray(j)) j.push(P);
                    else L[O] = P
                }
                hE1("got proxy server response: %o %o", K, L), F(), B({
                    connect: {
                        statusCode: z,
                        statusText: $,
                        headers: L
                    },
                    buffered: X
                })
            }
            A.on("error", Y), A.on("end", I), G()
        })
    }
    Cn.parseProxyResponse = gLQ
});
var d10 = E(($z) => {
    var uLQ = $z && $z.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        mLQ = $z && $z.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        cLA = $z && $z.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) uLQ(B, A, Q)
            }
            return mLQ(B, A), B
        },
        lLA = $z && $z.__importDefault || function(A) {
            return A && A.__esModule ? A : {
                default: A
            }
        };
    Object.defineProperty($z, "__esModule", {
        value: !0
    });
    $z.HttpsProxyAgent = void 0;
    var gE1 = cLA(W1("net")),
        uLA = cLA(W1("tls")),
        dLQ = lLA(W1("assert")),
        cLQ = lLA(mB1()),
        lLQ = hLA(),
        pLQ = W1("url"),
        iLQ = gLA(),
        hQ1 = cLQ.default("https-proxy-agent"),
        mLA = (A) => {
            if (A.servername === void 0 && A.host && !gE1.isIP(A.host)) return {
                ...A,
                servername: A.host
            };
            return A
        };
    class m10 extends lLQ.Agent {
        constructor(A, B) {
            super(B);
            this.options = {
                path: void 0
            }, this.proxy = typeof A === "string" ? new pLQ.URL(A) : A, this.proxyHeaders = B?.headers ?? {}, hQ1("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
            let Q = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
                Z = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
            this.connectOpts = {
                ALPNProtocols: ["http/1.1"],
                ...B ? dLA(B, "headers") : null,
                host: Q,
                port: Z
            }
        }
        async connect(A, B) {
            let {
                proxy: Q
            } = this;
            if (!B.host) throw new TypeError('No "host" provided');
            let Z;
            if (Q.protocol === "https:") hQ1("Creating `tls.Socket`: %o", this.connectOpts), Z = uLA.connect(mLA(this.connectOpts));
            else hQ1("Creating `net.Socket`: %o", this.connectOpts), Z = gE1.connect(this.connectOpts);
            let D = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : {
                    ...this.proxyHeaders
                },
                G = gE1.isIPv6(B.host) ? `[${B.host}]` : B.host,
                F = `CONNECT ${G}:${B.port} HTTP/1.1\r
`;
            if (Q.username || Q.password) {
                let X = `${decodeURIComponent(Q.username)}:${decodeURIComponent(Q.password)}`;
                D["Proxy-Authorization"] = `Basic ${Buffer.from(X).toString("base64")}`
            }
            if (D.Host = `${G}:${B.port}`, !D["Proxy-Connection"]) D["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
            for (let X of Object.keys(D)) F += `${X}: ${D[X]}\r
`;
            let I = iLQ.parseProxyResponse(Z);
            Z.write(`${F}\r
`);
            let {
                connect: Y,
                buffered: W
            } = await I;
            if (A.emit("proxyConnect", Y), this.emit("proxyConnect", Y, A), Y.statusCode === 200) {
                if (A.once("socket", nLQ), B.secureEndpoint) return hQ1("Upgrading socket connection to TLS"), uLA.connect({
                    ...dLA(mLA(B), "host", "path", "port"),
                    socket: Z
                });
                return Z
            }
            Z.destroy();
            let J = new gE1.Socket({
                writable: !1
            });
            return J.readable = !0, A.once("socket", (X) => {
                hQ1("Replaying proxy buffer for failed request"), dLQ.default(X.listenerCount("data") > 0), X.push(W), X.push(null)
            }), J
        }
    }
    m10.protocols = ["http", "https"];
    $z.HttpsProxyAgent = m10;

    function nLQ(A) {
        A.resume()
    }

    function dLA(A, ...B) {
        let Q = {},
            Z;
        for (Z in A)
            if (!B.includes(Z)) Q[Z] = A[Z];
        return Q
    }
});