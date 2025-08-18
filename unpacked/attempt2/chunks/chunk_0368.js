/* chunk:368 bytes:[8622998, 8642996) size:19998 source:unpacked-cli.js */
var Cj1 = E((jr5, i4B) => {
    var y4B = W1("child_process"),
        {
            isLinux: Ce,
            getReport: _4B
        } = T4B(),
        {
            LDD_PATH: Vj1,
            readFile: x4B,
            readFileSync: v4B
        } = j4B(),
        LM, MM, kx = "",
        b4B = () => {
            if (!kx) return new Promise((A) => {
                y4B.exec("getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true", (B, Q) => {
                    kx = B ? " " : Q, A(kx)
                })
            });
            return kx
        },
        f4B = () => {
            if (!kx) try {
                kx = y4B.execSync("getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true", {
                    encoding: "utf8"
                })
            } catch (A) {
                kx = " "
            }
            return kx
        },
        yx = "glibc",
        h4B = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,
        Ve = "musl",
        FO6 = (A) => A.includes("libc.musl-") || A.includes("ld-musl-"),
        g4B = () => {
            let A = _4B();
            if (A.header && A.header.glibcVersionRuntime) return yx;
            if (Array.isArray(A.sharedObjects)) {
                if (A.sharedObjects.some(FO6)) return Ve
            }
            return null
        },
        u4B = (A) => {
            let [B, Q] = A.split(/[\r\n]+/);
            if (B && B.includes(yx)) return yx;
            if (Q && Q.includes(Ve)) return Ve;
            return null
        },
        m4B = (A) => {
            if (A.includes("musl")) return Ve;
            if (A.includes("GNU C Library")) return yx;
            return null
        },
        IO6 = async () => {
            if (LM !== void 0) return LM;
            LM = null;
            try {
                let A = await x4B(Vj1);
                LM = m4B(A)
            } catch (A) {}
            return LM
        }, YO6 = () => {
            if (LM !== void 0) return LM;
            LM = null;
            try {
                let A = v4B(Vj1);
                LM = m4B(A)
            } catch (A) {}
            return LM
        }, d4B = async () => {
            let A = null;
            if (Ce()) {
                if (A = await IO6(), !A) A = g4B();
                if (!A) {
                    let B = await b4B();
                    A = u4B(B)
                }
            }
            return A
        }, c4B = () => {
            let A = null;
            if (Ce()) {
                if (A = YO6(), !A) A = g4B();
                if (!A) {
                    let B = f4B();
                    A = u4B(B)
                }
            }
            return A
        }, WO6 = async () => Ce() && await d4B() !== yx, JO6 = () => Ce() && c4B() !== yx, XO6 = async () => {
            if (MM !== void 0) return MM;
            MM = null;
            try {
                let B = (await x4B(Vj1)).match(h4B);
                if (B) MM = B[1]
            } catch (A) {}
            return MM
        }, VO6 = () => {
            if (MM !== void 0) return MM;
            MM = null;
            try {
                let B = v4B(Vj1).match(h4B);
                if (B) MM = B[1]
            } catch (A) {}
            return MM
        }, l4B = () => {
            let A = _4B();
            if (A.header && A.header.glibcVersionRuntime) return A.header.glibcVersionRuntime;
            return null
        }, k4B = (A) => A.trim().split(/\s+/)[1], p4B = (A) => {
            let [B, Q, Z] = A.split(/[\r\n]+/);
            if (B && B.includes(yx)) return k4B(B);
            if (Q && Z && Q.includes(Ve)) return k4B(Z);
            return null
        }, CO6 = async () => {
            let A = null;
            if (Ce()) {
                if (A = await XO6(), !A) A = l4B();
                if (!A) {
                    let B = await b4B();
                    A = p4B(B)
                }
            }
            return A
        }, KO6 = () => {
            let A = null;
            if (Ce()) {
                if (A = VO6(), !A) A = l4B();
                if (!A) {
                    let B = f4B();
                    A = p4B(B)
                }
            }
            return A
        };
    i4B.exports = {
        GLIBC: yx,
        MUSL: Ve,
        family: d4B,
        familySync: c4B,
        isNonGlibcLinux: WO6,
        isNonGlibcLinuxSync: JO6,
        version: CO6,
        versionSync: KO6
    }
});
var o71 = E((kr5, n4B) => {
    var HO6 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...A) => console.error("SEMVER", ...A) : () => {};
    n4B.exports = HO6
});
var t71 = E((yr5, a4B) => {
    var zO6 = Number.MAX_SAFE_INTEGER || 9007199254740991,
        EO6 = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    a4B.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: 16,
        MAX_SAFE_BUILD_LENGTH: 250,
        MAX_SAFE_INTEGER: zO6,
        RELEASE_TYPES: EO6,
        SEMVER_SPEC_VERSION: "2.0.0",
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    }
});
var Ke = E((RM, s4B) => {
    var {
        MAX_SAFE_COMPONENT_LENGTH: uC0,
        MAX_SAFE_BUILD_LENGTH: UO6,
        MAX_LENGTH: wO6
    } = t71(), $O6 = o71();
    RM = s4B.exports = {};
    var qO6 = RM.re = [],
        NO6 = RM.safeRe = [],
        zB = RM.src = [],
        LO6 = RM.safeSrc = [],
        EB = RM.t = {},
        MO6 = 0,
        mC0 = "[a-zA-Z0-9-]",
        RO6 = [
            ["\\s", 1],
            ["\\d", wO6],
            [mC0, UO6]
        ],
        OO6 = (A) => {
            for (let [B, Q] of RO6) A = A.split(`${B}*`).join(`${B}{0,${Q}}`).split(`${B}+`).join(`${B}{1,${Q}}`);
            return A
        },
        eQ = (A, B, Q) => {
            let Z = OO6(B),
                D = MO6++;
            $O6(A, D, B), EB[A] = D, zB[D] = B, LO6[D] = Z, qO6[D] = new RegExp(B, Q ? "g" : void 0), NO6[D] = new RegExp(Z, Q ? "g" : void 0)
        };
    eQ("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    eQ("NUMERICIDENTIFIERLOOSE", "\\d+");
    eQ("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${mC0}*`);
    eQ("MAINVERSION", `(${zB[EB.NUMERICIDENTIFIER]})\\.(${zB[EB.NUMERICIDENTIFIER]})\\.(${zB[EB.NUMERICIDENTIFIER]})`);
    eQ("MAINVERSIONLOOSE", `(${zB[EB.NUMERICIDENTIFIERLOOSE]})\\.(${zB[EB.NUMERICIDENTIFIERLOOSE]})\\.(${zB[EB.NUMERICIDENTIFIERLOOSE]})`);
    eQ("PRERELEASEIDENTIFIER", `(?:${zB[EB.NUMERICIDENTIFIER]}|${zB[EB.NONNUMERICIDENTIFIER]})`);
    eQ("PRERELEASEIDENTIFIERLOOSE", `(?:${zB[EB.NUMERICIDENTIFIERLOOSE]}|${zB[EB.NONNUMERICIDENTIFIER]})`);
    eQ("PRERELEASE", `(?:-(${zB[EB.PRERELEASEIDENTIFIER]}(?:\\.${zB[EB.PRERELEASEIDENTIFIER]})*))`);
    eQ("PRERELEASELOOSE", `(?:-?(${zB[EB.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${zB[EB.PRERELEASEIDENTIFIERLOOSE]})*))`);
    eQ("BUILDIDENTIFIER", `${mC0}+`);
    eQ("BUILD", `(?:\\+(${zB[EB.BUILDIDENTIFIER]}(?:\\.${zB[EB.BUILDIDENTIFIER]})*))`);
    eQ("FULLPLAIN", `v?${zB[EB.MAINVERSION]}${zB[EB.PRERELEASE]}?${zB[EB.BUILD]}?`);
    eQ("FULL", `^${zB[EB.FULLPLAIN]}$`);
    eQ("LOOSEPLAIN", `[v=\\s]*${zB[EB.MAINVERSIONLOOSE]}${zB[EB.PRERELEASELOOSE]}?${zB[EB.BUILD]}?`);
    eQ("LOOSE", `^${zB[EB.LOOSEPLAIN]}$`);
    eQ("GTLT", "((?:<|>)?=?)");
    eQ("XRANGEIDENTIFIERLOOSE", `${zB[EB.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    eQ("XRANGEIDENTIFIER", `${zB[EB.NUMERICIDENTIFIER]}|x|X|\\*`);
    eQ("XRANGEPLAIN", `[v=\\s]*(${zB[EB.XRANGEIDENTIFIER]})(?:\\.(${zB[EB.XRANGEIDENTIFIER]})(?:\\.(${zB[EB.XRANGEIDENTIFIER]})(?:${zB[EB.PRERELEASE]})?${zB[EB.BUILD]}?)?)?`);
    eQ("XRANGEPLAINLOOSE", `[v=\\s]*(${zB[EB.XRANGEIDENTIFIERLOOSE]})(?:\\.(${zB[EB.XRANGEIDENTIFIERLOOSE]})(?:\\.(${zB[EB.XRANGEIDENTIFIERLOOSE]})(?:${zB[EB.PRERELEASELOOSE]})?${zB[EB.BUILD]}?)?)?`);
    eQ("XRANGE", `^${zB[EB.GTLT]}\\s*${zB[EB.XRANGEPLAIN]}$`);
    eQ("XRANGELOOSE", `^${zB[EB.GTLT]}\\s*${zB[EB.XRANGEPLAINLOOSE]}$`);
    eQ("COERCEPLAIN", `(^|[^\\d])(\\d{1,${uC0}})(?:\\.(\\d{1,${uC0}}))?(?:\\.(\\d{1,${uC0}}))?`);
    eQ("COERCE", `${zB[EB.COERCEPLAIN]}(?:$|[^\\d])`);
    eQ("COERCEFULL", zB[EB.COERCEPLAIN] + `(?:${zB[EB.PRERELEASE]})?(?:${zB[EB.BUILD]})?(?:$|[^\\d])`);
    eQ("COERCERTL", zB[EB.COERCE], !0);
    eQ("COERCERTLFULL", zB[EB.COERCEFULL], !0);
    eQ("LONETILDE", "(?:~>?)");
    eQ("TILDETRIM", `(\\s*)${zB[EB.LONETILDE]}\\s+`, !0);
    RM.tildeTrimReplace = "$1~";
    eQ("TILDE", `^${zB[EB.LONETILDE]}${zB[EB.XRANGEPLAIN]}$`);
    eQ("TILDELOOSE", `^${zB[EB.LONETILDE]}${zB[EB.XRANGEPLAINLOOSE]}$`);
    eQ("LONECARET", "(?:\\^)");
    eQ("CARETTRIM", `(\\s*)${zB[EB.LONECARET]}\\s+`, !0);
    RM.caretTrimReplace = "$1^";
    eQ("CARET", `^${zB[EB.LONECARET]}${zB[EB.XRANGEPLAIN]}$`);
    eQ("CARETLOOSE", `^${zB[EB.LONECARET]}${zB[EB.XRANGEPLAINLOOSE]}$`);
    eQ("COMPARATORLOOSE", `^${zB[EB.GTLT]}\\s*(${zB[EB.LOOSEPLAIN]})$|^$`);
    eQ("COMPARATOR", `^${zB[EB.GTLT]}\\s*(${zB[EB.FULLPLAIN]})$|^$`);
    eQ("COMPARATORTRIM", `(\\s*)${zB[EB.GTLT]}\\s*(${zB[EB.LOOSEPLAIN]}|${zB[EB.XRANGEPLAIN]})`, !0);
    RM.comparatorTrimReplace = "$1$2$3";
    eQ("HYPHENRANGE", `^\\s*(${zB[EB.XRANGEPLAIN]})\\s+-\\s+(${zB[EB.XRANGEPLAIN]})\\s*$`);
    eQ("HYPHENRANGELOOSE", `^\\s*(${zB[EB.XRANGEPLAINLOOSE]})\\s+-\\s+(${zB[EB.XRANGEPLAINLOOSE]})\\s*$`);
    eQ("STAR", "(<|>)?=?\\s*\\*");
    eQ("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    eQ("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$")
});
var Kj1 = E((_r5, r4B) => {
    var TO6 = Object.freeze({
            loose: !0
        }),
        PO6 = Object.freeze({}),
        SO6 = (A) => {
            if (!A) return PO6;
            if (typeof A !== "object") return TO6;
            return A
        };
    r4B.exports = SO6
});
var dC0 = E((xr5, e4B) => {
    var o4B = /^[0-9]+$/,
        t4B = (A, B) => {
            let Q = o4B.test(A),
                Z = o4B.test(B);
            if (Q && Z) A = +A, B = +B;
            return A === B ? 0 : Q && !Z ? -1 : Z && !Q ? 1 : A < B ? -1 : 1
        },
        jO6 = (A, B) => t4B(B, A);
    e4B.exports = {
        compareIdentifiers: t4B,
        rcompareIdentifiers: jO6
    }
});
var JJ = E((vr5, Z6B) => {
    var Hj1 = o71(),
        {
            MAX_LENGTH: A6B,
            MAX_SAFE_INTEGER: zj1
        } = t71(),
        {
            safeRe: B6B,
            safeSrc: Q6B,
            t: Ej1
        } = Ke(),
        kO6 = Kj1(),
        {
            compareIdentifiers: He
        } = dC0();
    class H$ {
        constructor(A, B) {
            if (B = kO6(B), A instanceof H$)
                if (A.loose === !!B.loose && A.includePrerelease === !!B.includePrerelease) return A;
                else A = A.version;
            else if (typeof A !== "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof A}".`);
            if (A.length > A6B) throw new TypeError(`version is longer than ${A6B} characters`);
            Hj1("SemVer", A, B), this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease;
            let Q = A.trim().match(B.loose ? B6B[Ej1.LOOSE] : B6B[Ej1.FULL]);
            if (!Q) throw new TypeError(`Invalid Version: ${A}`);
            if (this.raw = A, this.major = +Q[1], this.minor = +Q[2], this.patch = +Q[3], this.major > zj1 || this.major < 0) throw new TypeError("Invalid major version");
            if (this.minor > zj1 || this.minor < 0) throw new TypeError("Invalid minor version");
            if (this.patch > zj1 || this.patch < 0) throw new TypeError("Invalid patch version");
            if (!Q[4]) this.prerelease = [];
            else this.prerelease = Q[4].split(".").map((Z) => {
                if (/^[0-9]+$/.test(Z)) {
                    let D = +Z;
                    if (D >= 0 && D < zj1) return D
                }
                return Z
            });
            this.build = Q[5] ? Q[5].split(".") : [], this.format()
        }
        format() {
            if (this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
            return this.version
        }
        toString() {
            return this.version
        }
        compare(A) {
            if (Hj1("SemVer.compare", this.version, this.options, A), !(A instanceof H$)) {
                if (typeof A === "string" && A === this.version) return 0;
                A = new H$(A, this.options)
            }
            if (A.version === this.version) return 0;
            return this.compareMain(A) || this.comparePre(A)
        }
        compareMain(A) {
            if (!(A instanceof H$)) A = new H$(A, this.options);
            return He(this.major, A.major) || He(this.minor, A.minor) || He(this.patch, A.patch)
        }
        comparePre(A) {
            if (!(A instanceof H$)) A = new H$(A, this.options);
            if (this.prerelease.length && !A.prerelease.length) return -1;
            else if (!this.prerelease.length && A.prerelease.length) return 1;
            else if (!this.prerelease.length && !A.prerelease.length) return 0;
            let B = 0;
            do {
                let Q = this.prerelease[B],
                    Z = A.prerelease[B];
                if (Hj1("prerelease compare", B, Q, Z), Q === void 0 && Z === void 0) return 0;
                else if (Z === void 0) return 1;
                else if (Q === void 0) return -1;
                else if (Q === Z) continue;
                else return He(Q, Z)
            } while (++B)
        }
        compareBuild(A) {
            if (!(A instanceof H$)) A = new H$(A, this.options);
            let B = 0;
            do {
                let Q = this.build[B],
                    Z = A.build[B];
                if (Hj1("build compare", B, Q, Z), Q === void 0 && Z === void 0) return 0;
                else if (Z === void 0) return 1;
                else if (Q === void 0) return -1;
                else if (Q === Z) continue;
                else return He(Q, Z)
            } while (++B)
        }
        inc(A, B, Q) {
            if (A.startsWith("pre")) {
                if (!B && Q === !1) throw new Error("invalid increment argument: identifier is empty");
                if (B) {
                    let Z = new RegExp(`^${this.options.loose?Q6B[Ej1.PRERELEASELOOSE]:Q6B[Ej1.PRERELEASE]}$`),
                        D = `-${B}`.match(Z);
                    if (!D || D[1] !== B) throw new Error(`invalid identifier: ${B}`)
                }
            }
            switch (A) {
                case "premajor":
                    this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", B, Q);
                    break;
                case "preminor":
                    this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", B, Q);
                    break;
                case "prepatch":
                    this.prerelease.length = 0, this.inc("patch", B, Q), this.inc("pre", B, Q);
                    break;
                case "prerelease":
                    if (this.prerelease.length === 0) this.inc("patch", B, Q);
                    this.inc("pre", B, Q);
                    break;
                case "release":
                    if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
                    this.prerelease.length = 0;
                    break;
                case "major":
                    if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
                    this.minor = 0, this.patch = 0, this.prerelease = [];
                    break;
                case "minor":
                    if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
                    this.patch = 0, this.prerelease = [];
                    break;
                case "patch":
                    if (this.prerelease.length === 0) this.patch++;
                    this.prerelease = [];
                    break;
                case "pre": {
                    let Z = Number(Q) ? 1 : 0;
                    if (this.prerelease.length === 0) this.prerelease = [Z];
                    else {
                        let D = this.prerelease.length;
                        while (--D >= 0)
                            if (typeof this.prerelease[D] === "number") this.prerelease[D]++, D = -2;
                        if (D === -1) {
                            if (B === this.prerelease.join(".") && Q === !1) throw new Error("invalid increment argument: identifier already exists");
                            this.prerelease.push(Z)
                        }
                    }
                    if (B) {
                        let D = [B, Z];
                        if (Q === !1) D = [B];
                        if (He(this.prerelease[0], B) === 0) {
                            if (isNaN(this.prerelease[1])) this.prerelease = D
                        } else this.prerelease = D
                    }
                    break
                }
                default:
                    throw new Error(`invalid increment argument: ${A}`)
            }
            if (this.raw = this.format(), this.build.length) this.raw += `+${this.build.join(".")}`;
            return this
        }
    }
    Z6B.exports = H$
});
var Tm = E((br5, G6B) => {
    var D6B = JJ(),
        yO6 = (A, B, Q = !1) => {
            if (A instanceof D6B) return A;
            try {
                return new D6B(A, B)
            } catch (Z) {
                if (!Q) return null;
                throw Z
            }
        };
    G6B.exports = yO6
});
var cC0 = E((fr5, F6B) => {
    var _O6 = JJ(),
        xO6 = Tm(),
        {
            safeRe: Uj1,
            t: wj1
        } = Ke(),
        vO6 = (A, B) => {
            if (A instanceof _O6) return A;
            if (typeof A === "number") A = String(A);
            if (typeof A !== "string") return null;
            B = B || {};
            let Q = null;
            if (!B.rtl) Q = A.match(B.includePrerelease ? Uj1[wj1.COERCEFULL] : Uj1[wj1.COERCE]);
            else {
                let Y = B.includePrerelease ? Uj1[wj1.COERCERTLFULL] : Uj1[wj1.COERCERTL],
                    W;
                while ((W = Y.exec(A)) && (!Q || Q.index + Q[0].length !== A.length)) {
                    if (!Q || W.index + W[0].length !== Q.index + Q[0].length) Q = W;
                    Y.lastIndex = W.index + W[1].length + W[2].length
                }
                Y.lastIndex = -1
            }
            if (Q === null) return null;
            let Z = Q[2],
                D = Q[3] || "0",
                G = Q[4] || "0",
                F = B.includePrerelease && Q[5] ? `-${Q[5]}` : "",
                I = B.includePrerelease && Q[6] ? `+${Q[6]}` : "";
            return xO6(`${Z}.${D}.${G}${F}${I}`, B)
        };
    F6B.exports = vO6
});
var xE = E((hr5, Y6B) => {
    var I6B = JJ(),
        bO6 = (A, B, Q) => new I6B(A, Q).compare(new I6B(B, Q));
    Y6B.exports = bO6
});
var e71 = E((gr5, W6B) => {
    var fO6 = xE(),
        hO6 = (A, B, Q) => fO6(A, B, Q) >= 0;
    W6B.exports = hO6
});
var V6B = E((ur5, X6B) => {
    class J6B {
        constructor() {
            this.max = 1000, this.map = new Map
        }
        get(A) {
            let B = this.map.get(A);
            if (B === void 0) return;
            else return this.map.delete(A), this.map.set(A, B), B
        }
        delete(A) {
            return this.map.delete(A)
        }
        set(A, B) {
            if (!this.delete(A) && B !== void 0) {
                if (this.map.size >= this.max) {
                    let Z = this.map.keys().next().value;
                    this.delete(Z)
                }
                this.map.set(A, B)
            }
            return this
        }
    }
    X6B.exports = J6B
});
var lC0 = E((mr5, C6B) => {
    var gO6 = xE(),
        uO6 = (A, B, Q) => gO6(A, B, Q) === 0;
    C6B.exports = uO6
});