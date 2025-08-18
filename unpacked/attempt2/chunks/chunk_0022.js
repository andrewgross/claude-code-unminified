/* chunk:22 bytes:[365527, 378586) size:13059 source:unpacked-cli.js */
var Zd0 = E((Qd0) => {
    Object.defineProperty(Qd0, "__esModule", {
        value: !0
    });
    var Sz9 = UA();

    function jX1(...A) {
        Sz9.logger.log("[https-proxy-agent:parse-proxy-response]", ...A)
    }

    function jz9(A) {
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
                F(), jX1("onend"), Q(new Error("Proxy connection ended before receiving CONNECT response"))
            }

            function Y(J) {
                F(), jX1("onerror %o", J), Q(J)
            }

            function W(J) {
                D.push(J), Z += J.length;
                let X = Buffer.concat(D, Z),
                    V = X.indexOf(`\r
\r
`);
                if (V === -1) {
                    jX1("have not received end of HTTP headers yet..."), G();
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
                jX1("got proxy server response: %o %o", K, L), F(), B({
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
    Qd0.parseProxyResponse = jz9
});
var Id0 = E((Fd0) => {
    var {
        _nullishCoalesce: yz9,
        _optionalChain: _z9
    } = UA();
    Object.defineProperty(Fd0, "__esModule", {
        value: !0
    });
    var UB1 = W1("net"),
        Dd0 = W1("tls"),
        xz9 = W1("url"),
        vz9 = UA(),
        bz9 = Bd0(),
        fz9 = Zd0();

    function wB1(...A) {
        vz9.logger.log("[https-proxy-agent]", ...A)
    }
    class jl1 extends bz9.Agent {
        static __initStatic() {
            this.protocols = ["http", "https"]
        }
        constructor(A, B) {
            super(B);
            this.options = {}, this.proxy = typeof A === "string" ? new xz9.URL(A) : A, this.proxyHeaders = yz9(_z9([B, "optionalAccess", (D) => D.headers]), () => ({})), wB1("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
            let Q = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
                Z = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
            this.connectOpts = {
                ALPNProtocols: ["http/1.1"],
                ...B ? Gd0(B, "headers") : null,
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
            if (Q.protocol === "https:") {
                wB1("Creating `tls.Socket`: %o", this.connectOpts);
                let X = this.connectOpts.servername || this.connectOpts.host;
                Z = Dd0.connect({
                    ...this.connectOpts,
                    servername: X && UB1.isIP(X) ? void 0 : X
                })
            } else wB1("Creating `net.Socket`: %o", this.connectOpts), Z = UB1.connect(this.connectOpts);
            let D = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : {
                    ...this.proxyHeaders
                },
                G = UB1.isIPv6(B.host) ? `[${B.host}]` : B.host,
                F = `CONNECT ${G}:${B.port} HTTP/1.1\r
`;
            if (Q.username || Q.password) {
                let X = `${decodeURIComponent(Q.username)}:${decodeURIComponent(Q.password)}`;
                D["Proxy-Authorization"] = `Basic ${Buffer.from(X).toString("base64")}`
            }
            if (D.Host = `${G}:${B.port}`, !D["Proxy-Connection"]) D["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
            for (let X of Object.keys(D)) F += `${X}: ${D[X]}\r
`;
            let I = fz9.parseProxyResponse(Z);
            Z.write(`${F}\r
`);
            let {
                connect: Y,
                buffered: W
            } = await I;
            if (A.emit("proxyConnect", Y), this.emit("proxyConnect", Y, A), Y.statusCode === 200) {
                if (A.once("socket", hz9), B.secureEndpoint) {
                    wB1("Upgrading socket connection to TLS");
                    let X = B.servername || B.host;
                    return Dd0.connect({
                        ...Gd0(B, "host", "path", "port"),
                        socket: Z,
                        servername: UB1.isIP(X) ? void 0 : X
                    })
                }
                return Z
            }
            Z.destroy();
            let J = new UB1.Socket({
                writable: !1
            });
            return J.readable = !0, A.once("socket", (X) => {
                wB1("Replaying proxy buffer for failed request"), X.push(W), X.push(null)
            }), J
        }
    }
    jl1.__initStatic();

    function hz9(A) {
        A.resume()
    }

    function Gd0(A, ...B) {
        let Q = {},
            Z;
        for (Z in A)
            if (!B.includes(Z)) Q[Z] = A[Z];
        return Q
    }
    Fd0.HttpsProxyAgent = jl1
});
var yl1 = E((Jd0) => {
    var {
        _nullishCoalesce: kl1
    } = UA();
    Object.defineProperty(Jd0, "__esModule", {
        value: !0
    });
    var uz9 = W1("http"),
        mz9 = W1("https"),
        dz9 = W1("stream"),
        Wd0 = W1("url"),
        cz9 = W1("zlib"),
        Yd0 = xQ(),
        lz9 = UA(),
        pz9 = Id0(),
        iz9 = 32768;

    function nz9(A) {
        return new dz9.Readable({
            read() {
                this.push(A), this.push(null)
            }
        })
    }

    function az9(A) {
        let B;
        try {
            B = new Wd0.URL(A.url)
        } catch (Y) {
            return lz9.consoleSandbox(() => {
                console.warn("[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used.")
            }), Yd0.createTransport(A, () => Promise.resolve({}))
        }
        let Q = B.protocol === "https:",
            Z = sz9(B, A.proxy || (Q ? process.env.https_proxy : void 0) || process.env.http_proxy),
            D = Q ? mz9 : uz9,
            G = A.keepAlive === void 0 ? !1 : A.keepAlive,
            F = Z ? new pz9.HttpsProxyAgent(Z) : new D.Agent({
                keepAlive: G,
                maxSockets: 30,
                timeout: 2000
            }),
            I = rz9(A, kl1(A.httpModule, () => D), F);
        return Yd0.createTransport(A, I)
    }

    function sz9(A, B) {
        let {
            no_proxy: Q
        } = process.env;
        if (Q && Q.split(",").some((D) => A.host.endsWith(D) || A.hostname.endsWith(D))) return;
        else return B
    }

    function rz9(A, B, Q) {
        let {
            hostname: Z,
            pathname: D,
            port: G,
            protocol: F,
            search: I
        } = new Wd0.URL(A.url);
        return function Y(W) {
            return new Promise((J, X) => {
                let V = nz9(W.body),
                    C = {
                        ...A.headers
                    };
                if (W.body.length > iz9) C["content-encoding"] = "gzip", V = V.pipe(cz9.createGzip());
                let K = B.request({
                    method: "POST",
                    agent: Q,
                    headers: C,
                    hostname: Z,
                    path: `${D}${I}`,
                    port: G,
                    protocol: F,
                    ca: A.caCerts
                }, (H) => {
                    H.on("data", () => {}), H.on("end", () => {}), H.setEncoding("utf8");
                    let z = kl1(H.headers["retry-after"], () => null),
                        $ = kl1(H.headers["x-sentry-rate-limits"], () => null);
                    J({
                        statusCode: H.statusCode,
                        headers: {
                            "retry-after": z,
                            "x-sentry-rate-limits": Array.isArray($) ? $[0] : $
                        }
                    })
                });
                K.on("error", X), V.pipe(K)
            })
        }
    }
    Jd0.makeNodeTransport = az9
});
var gf = E((Xd0) => {
    Object.defineProperty(Xd0, "__esModule", {
        value: !0
    });
    var tz9 = UA(),
        ez9 = tz9.parseSemver(process.versions.node);
    Xd0.NODE_VERSION = ez9
});
var Hd0 = E((Kd0) => {
    var {
        _optionalChain: BE9
    } = UA();
    Object.defineProperty(Kd0, "__esModule", {
        value: !0
    });
    var Vd0 = W1("domain"),
        uf = xQ();

    function Cd0() {
        return Vd0.active
    }

    function QE9() {
        let A = Cd0();
        if (!A) return;
        return uf.ensureHubOnCarrier(A), uf.getHubFromCarrier(A)
    }

    function ZE9(A) {
        let B = {};
        return uf.ensureHubOnCarrier(B, A), uf.getHubFromCarrier(B)
    }

    function DE9(A, B) {
        let Q = Cd0();
        if (Q && BE9([B, "optionalAccess", (F) => F.reuseExisting])) return A();
        let Z = Vd0.create(),
            D = Q ? uf.getHubFromCarrier(Q) : void 0,
            G = ZE9(D);
        return uf.setHubOnCarrier(Z, G), Z.bind(() => {
            return A()
        })()
    }

    function GE9() {
        uf.setAsyncContextStrategy({
            getCurrentHub: QE9,
            runWithAsyncContext: DE9
        })
    }
    Kd0.setDomainAsyncContextStrategy = GE9
});
var Ed0 = E((zd0) => {
    var {
        _optionalChain: IE9
    } = UA();
    Object.defineProperty(zd0, "__esModule", {
        value: !0
    });
    var _l1 = xQ(),
        YE9 = W1("async_hooks"),
        kX1;

    function WE9() {
        if (!kX1) kX1 = new YE9.AsyncLocalStorage;

        function A() {
            return kX1.getStore()
        }

        function B(Z) {
            let D = {};
            return _l1.ensureHubOnCarrier(D, Z), _l1.getHubFromCarrier(D)
        }

        function Q(Z, D) {
            let G = A();
            if (G && IE9([D, "optionalAccess", (I) => I.reuseExisting])) return Z();
            let F = B(G);
            return kX1.run(F, () => {
                return Z()
            })
        }
        _l1.setAsyncContextStrategy({
            getCurrentHub: A,
            runWithAsyncContext: Q
        })
    }
    zd0.setHooksAsyncContextStrategy = WE9
});
var wd0 = E((Ud0) => {
    Object.defineProperty(Ud0, "__esModule", {
        value: !0
    });
    var XE9 = gf(),
        VE9 = Hd0(),
        CE9 = Ed0();

    function KE9() {
        if (XE9.NODE_VERSION.major >= 14) CE9.setHooksAsyncContextStrategy();
        else VE9.setDomainAsyncContextStrategy()
    }
    Ud0.setNodeAsyncContextStrategy = KE9
});
var _X1 = E((Ld0) => {
    Object.defineProperty(Ld0, "__esModule", {
        value: !0
    });
    var zE9 = W1("util"),
        yX1 = xQ(),
        $d0 = UA(),
        qd0 = "Console",
        EE9 = () => {
            return {
                name: qd0,
                setupOnce() {},
                setup(A) {
                    $d0.addConsoleInstrumentationHandler(({
                        args: B,
                        level: Q
                    }) => {
                        if (yX1.getClient() !== A) return;
                        yX1.addBreadcrumb({
                            category: "console",
                            level: $d0.severityLevelFromString(Q),
                            message: zE9.format.apply(void 0, B)
                        }, {
                            input: [...B],
                            level: Q
                        })
                    })
                }
            }
        },
        Nd0 = yX1.defineIntegration(EE9),
        UE9 = yX1.convertIntegrationFnToClass(qd0, Nd0);
    Ld0.Console = UE9;
    Ld0.consoleIntegration = Nd0
});