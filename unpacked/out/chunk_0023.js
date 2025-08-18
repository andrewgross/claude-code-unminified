/* chunk:23 bytes:[378587, 394099) size:15512 source:unpacked-cli.js */
var xX1 = E((_d0) => {
    var {
        _optionalChain: mf
    } = UA();
    Object.defineProperty(_d0, "__esModule", {
        value: !0
    });
    var qE9 = W1("child_process"),
        Rd0 = W1("fs"),
        oH = W1("os"),
        NE9 = W1("path"),
        Od0 = W1("util"),
        Td0 = xQ(),
        Pd0 = Od0.promisify(Rd0.readFile),
        Sd0 = Od0.promisify(Rd0.readdir),
        jd0 = "Context",
        LE9 = (A = {}) => {
            let B, Q = {
                app: !0,
                os: !0,
                device: !0,
                culture: !0,
                cloudResource: !0,
                ...A
            };
            async function Z(G) {
                if (B === void 0) B = D();
                let F = RE9(await B);
                return G.contexts = {
                    ...G.contexts,
                    app: {
                        ...F.app,
                        ...mf([G, "access", (I) => I.contexts, "optionalAccess", (I) => I.app])
                    },
                    os: {
                        ...F.os,
                        ...mf([G, "access", (I) => I.contexts, "optionalAccess", (I) => I.os])
                    },
                    device: {
                        ...F.device,
                        ...mf([G, "access", (I) => I.contexts, "optionalAccess", (I) => I.device])
                    },
                    culture: {
                        ...F.culture,
                        ...mf([G, "access", (I) => I.contexts, "optionalAccess", (I) => I.culture])
                    },
                    cloud_resource: {
                        ...F.cloud_resource,
                        ...mf([G, "access", (I) => I.contexts, "optionalAccess", (I) => I.cloud_resource])
                    }
                }, G
            }
            async function D() {
                let G = {};
                if (Q.os) G.os = await OE9();
                if (Q.app) G.app = PE9();
                if (Q.device) G.device = yd0(Q.device);
                if (Q.culture) {
                    let F = TE9();
                    if (F) G.culture = F
                }
                if (Q.cloudResource) G.cloud_resource = xE9();
                return G
            }
            return {
                name: jd0,
                setupOnce() {},
                processEvent(G) {
                    return Z(G)
                }
            }
        },
        kd0 = Td0.defineIntegration(LE9),
        ME9 = Td0.convertIntegrationFnToClass(jd0, kd0);

    function RE9(A) {
        if (mf([A, "optionalAccess", (B) => B.app, "optionalAccess", (B) => B.app_memory])) A.app.app_memory = process.memoryUsage().rss;
        if (mf([A, "optionalAccess", (B) => B.device, "optionalAccess", (B) => B.free_memory])) A.device.free_memory = oH.freemem();
        return A
    }
    async function OE9() {
        let A = oH.platform();
        switch (A) {
            case "darwin":
                return yE9();
            case "linux":
                return _E9();
            default:
                return {
                    name: SE9[A] || A, version: oH.release()
                }
        }
    }

    function TE9() {
        try {
            if (typeof process.versions.icu !== "string") return;
            let A = new Date(900000000);
            if (new Intl.DateTimeFormat("es", {
                    month: "long"
                }).format(A) === "enero") {
                let Q = Intl.DateTimeFormat().resolvedOptions();
                return {
                    locale: Q.locale,
                    timezone: Q.timeZone
                }
            }
        } catch (A) {}
        return
    }

    function PE9() {
        let A = process.memoryUsage().rss;
        return {
            app_start_time: new Date(Date.now() - process.uptime() * 1000).toISOString(),
            app_memory: A
        }
    }

    function yd0(A) {
        let B = {},
            Q;
        try {
            Q = oH.uptime && oH.uptime()
        } catch (Z) {}
        if (typeof Q === "number") B.boot_time = new Date(Date.now() - Q * 1000).toISOString();
        if (B.arch = oH.arch(), A === !0 || A.memory) B.memory_size = oH.totalmem(), B.free_memory = oH.freemem();
        if (A === !0 || A.cpu) {
            let Z = oH.cpus();
            if (Z && Z.length) {
                let D = Z[0];
                B.processor_count = Z.length, B.cpu_description = D.model, B.processor_frequency = D.speed
            }
        }
        return B
    }
    var SE9 = {
            aix: "IBM AIX",
            freebsd: "FreeBSD",
            openbsd: "OpenBSD",
            sunos: "SunOS",
            win32: "Windows"
        },
        jE9 = [{
            name: "fedora-release",
            distros: ["Fedora"]
        }, {
            name: "redhat-release",
            distros: ["Red Hat Linux", "Centos"]
        }, {
            name: "redhat_version",
            distros: ["Red Hat Linux"]
        }, {
            name: "SuSE-release",
            distros: ["SUSE Linux"]
        }, {
            name: "lsb-release",
            distros: ["Ubuntu Linux", "Arch Linux"]
        }, {
            name: "debian_version",
            distros: ["Debian"]
        }, {
            name: "debian_release",
            distros: ["Debian"]
        }, {
            name: "arch-release",
            distros: ["Arch Linux"]
        }, {
            name: "gentoo-release",
            distros: ["Gentoo Linux"]
        }, {
            name: "novell-release",
            distros: ["SUSE Linux"]
        }, {
            name: "alpine-release",
            distros: ["Alpine Linux"]
        }],
        kE9 = {
            alpine: (A) => A,
            arch: (A) => IN(/distrib_release=(.*)/, A),
            centos: (A) => IN(/release ([^ ]+)/, A),
            debian: (A) => A,
            fedora: (A) => IN(/release (..)/, A),
            mint: (A) => IN(/distrib_release=(.*)/, A),
            red: (A) => IN(/release ([^ ]+)/, A),
            suse: (A) => IN(/VERSION = (.*)\n/, A),
            ubuntu: (A) => IN(/distrib_release=(.*)/, A)
        };

    function IN(A, B) {
        let Q = A.exec(B);
        return Q ? Q[1] : void 0
    }
    async function yE9() {
        let A = {
            kernel_version: oH.release(),
            name: "Mac OS X",
            version: `10.${Number(oH.release().split(".")[0])-4}`
        };
        try {
            let B = await new Promise((Q, Z) => {
                qE9.execFile("/usr/bin/sw_vers", (D, G) => {
                    if (D) {
                        Z(D);
                        return
                    }
                    Q(G)
                })
            });
            A.name = IN(/^ProductName:\s+(.*)$/m, B), A.version = IN(/^ProductVersion:\s+(.*)$/m, B), A.build = IN(/^BuildVersion:\s+(.*)$/m, B)
        } catch (B) {}
        return A
    }

    function Md0(A) {
        return A.split(" ")[0].toLowerCase()
    }
    async function _E9() {
        let A = {
            kernel_version: oH.release(),
            name: "Linux"
        };
        try {
            let B = await Sd0("/etc"),
                Q = jE9.find((I) => B.includes(I.name));
            if (!Q) return A;
            let Z = NE9.join("/etc", Q.name),
                D = (await Pd0(Z, {
                    encoding: "utf-8"
                })).toLowerCase(),
                {
                    distros: G
                } = Q;
            A.name = G.find((I) => D.indexOf(Md0(I)) >= 0) || G[0];
            let F = Md0(A.name);
            A.version = kE9[F](D)
        } catch (B) {}
        return A
    }

    function xE9() {
        if (process.env.VERCEL) return {
            "cloud.provider": "vercel",
            "cloud.region": process.env.VERCEL_REGION
        };
        else if (process.env.AWS_REGION) return {
            "cloud.provider": "aws",
            "cloud.region": process.env.AWS_REGION,
            "cloud.platform": process.env.AWS_EXECUTION_ENV
        };
        else if (process.env.GCP_PROJECT) return {
            "cloud.provider": "gcp"
        };
        else if (process.env.ALIYUN_REGION_ID) return {
            "cloud.provider": "alibaba_cloud",
            "cloud.region": process.env.ALIYUN_REGION_ID
        };
        else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) return {
            "cloud.provider": "azure",
            "cloud.region": process.env.REGION_NAME
        };
        else if (process.env.IBM_CLOUD_REGION) return {
            "cloud.provider": "ibm_cloud",
            "cloud.region": process.env.IBM_CLOUD_REGION
        };
        else if (process.env.TENCENTCLOUD_REGION) return {
            "cloud.provider": "tencent_cloud",
            "cloud.region": process.env.TENCENTCLOUD_REGION,
            "cloud.account.id": process.env.TENCENTCLOUD_APPID,
            "cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
        };
        else if (process.env.NETLIFY) return {
            "cloud.provider": "netlify"
        };
        else if (process.env.FLY_REGION) return {
            "cloud.provider": "fly.io",
            "cloud.region": process.env.FLY_REGION
        };
        else if (process.env.DYNO) return {
            "cloud.provider": "heroku"
        };
        else return
    }
    _d0.Context = ME9;
    _d0.getDeviceContext = yd0;
    _d0.nodeContextIntegration = kd0;
    _d0.readDirAsync = Sd0;
    _d0.readFileAsync = Pd0
});
var bX1 = E((hd0) => {
    var {
        _optionalChain: xl1
    } = UA();
    Object.defineProperty(hd0, "__esModule", {
        value: !0
    });
    var uE9 = W1("fs"),
        xd0 = xQ(),
        vd0 = UA(),
        vX1 = new vd0.LRUMap(100),
        mE9 = 7,
        bd0 = "ContextLines";

    function dE9(A) {
        return new Promise((B, Q) => {
            uE9.readFile(A, "utf8", (Z, D) => {
                if (Z) Q(Z);
                else B(D)
            })
        })
    }
    var cE9 = (A = {}) => {
            let B = A.frameContextLines !== void 0 ? A.frameContextLines : mE9;
            return {
                name: bd0,
                setupOnce() {},
                processEvent(Q) {
                    return pE9(Q, B)
                }
            }
        },
        fd0 = xd0.defineIntegration(cE9),
        lE9 = xd0.convertIntegrationFnToClass(bd0, fd0);
    async function pE9(A, B) {
        let Q = {},
            Z = [];
        if (B > 0 && xl1([A, "access", (D) => D.exception, "optionalAccess", (D) => D.values]))
            for (let D of A.exception.values) {
                if (!xl1([D, "access", (G) => G.stacktrace, "optionalAccess", (G) => G.frames])) continue;
                for (let G = D.stacktrace.frames.length - 1; G >= 0; G--) {
                    let F = D.stacktrace.frames[G];
                    if (F.filename && !Q[F.filename] && !vX1.get(F.filename)) Z.push(nE9(F.filename)), Q[F.filename] = 1
                }
            }
        if (Z.length > 0) await Promise.all(Z);
        if (B > 0 && xl1([A, "access", (D) => D.exception, "optionalAccess", (D) => D.values])) {
            for (let D of A.exception.values)
                if (D.stacktrace && D.stacktrace.frames) await iE9(D.stacktrace.frames, B)
        }
        return A
    }

    function iE9(A, B) {
        for (let Q of A)
            if (Q.filename && Q.context_line === void 0) {
                let Z = vX1.get(Q.filename);
                if (Z) try {
                    vd0.addContextToFrame(Z, Q, B)
                } catch (D) {}
            }
    }
    async function nE9(A) {
        let B = vX1.get(A);
        if (B === null) return null;
        if (B !== void 0) return B;
        let Q = null;
        try {
            Q = (await dE9(A)).split(`
`)
        } catch (Z) {}
        return vX1.set(A, Q), Q
    }
    hd0.ContextLines = lE9;
    hd0.contextLinesIntegration = fd0
});
var $B1 = E((gd0) => {
    Object.defineProperty(gd0, "__esModule", {
        value: !0
    });
    var rE9 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
    gd0.DEBUG_BUILD = rE9
});
var cd0 = E((dd0) => {
    var {
        _optionalChain: YN
    } = UA();
    Object.defineProperty(dd0, "__esModule", {
        value: !0
    });
    var vl1 = W1("url"),
        tE9 = gf();

    function eE9(A) {
        let {
            protocol: B,
            hostname: Q,
            port: Z
        } = md0(A), D = A.path ? A.path : "/";
        return `${B}//${Q}${Z}${D}`
    }

    function ud0(A) {
        let {
            protocol: B,
            hostname: Q,
            port: Z
        } = md0(A), D = A.pathname || "/", G = A.auth ? AU9(A.auth) : "";
        return `${B}//${G}${Q}${Z}${D}`
    }

    function AU9(A) {
        let [B, Q] = A.split(":");
        return `${B?"[Filtered]":""}:${Q?"[Filtered]":""}@`
    }

    function BU9(A, B, Q) {
        if (!A) return A;
        let [Z, D] = A.split(" ");
        if (B.host && !B.protocol) B.protocol = YN([Q, "optionalAccess", (G) => G.agent, "optionalAccess", (G) => G.protocol]), D = ud0(B);
        if (YN([D, "optionalAccess", (G) => G.startsWith, "call", (G) => G("///")])) D = D.slice(2);
        return `${Z} ${D}`
    }

    function bl1(A) {
        let B = {
            protocol: A.protocol,
            hostname: typeof A.hostname === "string" && A.hostname.startsWith("[") ? A.hostname.slice(1, -1) : A.hostname,
            hash: A.hash,
            search: A.search,
            pathname: A.pathname,
            path: `${A.pathname||""}${A.search||""}`,
            href: A.href
        };
        if (A.port !== "") B.port = Number(A.port);
        if (A.username || A.password) B.auth = `${A.username}:${A.password}`;
        return B
    }

    function QU9(A, B) {
        let Q, Z;
        if (typeof B[B.length - 1] === "function") Q = B.pop();
        if (typeof B[0] === "string") Z = bl1(new vl1.URL(B[0]));
        else if (B[0] instanceof vl1.URL) Z = bl1(B[0]);
        else {
            Z = B[0];
            try {
                let D = new vl1.URL(Z.path || "", `${Z.protocol||"http:"}//${Z.hostname}`);
                Z = {
                    pathname: D.pathname,
                    search: D.search,
                    hash: D.hash,
                    ...Z
                }
            } catch (D) {}
        }
        if (B.length === 2) Z = {
            ...Z,
            ...B[1]
        };
        if (Z.protocol === void 0)
            if (tE9.NODE_VERSION.major > 8) Z.protocol = YN([YN([A, "optionalAccess", (D) => D.globalAgent]), "optionalAccess", (D) => D.protocol]) || YN([Z.agent, "optionalAccess", (D) => D.protocol]) || YN([Z._defaultAgent, "optionalAccess", (D) => D.protocol]);
            else Z.protocol = YN([Z.agent, "optionalAccess", (D) => D.protocol]) || YN([Z._defaultAgent, "optionalAccess", (D) => D.protocol]) || YN([YN([A, "optionalAccess", (D) => D.globalAgent]), "optionalAccess", (D) => D.protocol]);
        if (Q) return [Z, Q];
        else return [Z]
    }

    function md0(A) {
        let B = A.protocol || "",
            Q = A.hostname || A.host || "",
            Z = !A.port || A.port === 80 || A.port === 443 || /^(.*):(\d+)$/.test(Q) ? "" : `:${A.port}`;
        return {
            protocol: B,
            hostname: Q,
            port: Z
        }
    }
    dd0.cleanSpanDescription = BU9;
    dd0.extractRawUrl = eE9;
    dd0.extractUrl = ud0;
    dd0.normalizeRequestArgs = QU9;
    dd0.urlToOptions = bl1
});