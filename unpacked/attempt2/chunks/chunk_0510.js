/* chunk:510 bytes:[12110328, 12130182) size:19854 source:unpacked-cli.js */
class OxA {
    store = new Map;
    add(A, B) {
        if (!A.canReaddir()) return;
        let Q = this.store.get(A);
        if (Q) {
            if (!Q.find((Z) => Z.globString() === B.globString())) Q.push(B)
        } else this.store.set(A, [B])
    }
    get(A) {
        let B = this.store.get(A);
        if (!B) throw new Error("attempting to walk unknown path");
        return B
    }
    entries() {
        return this.keys().map((A) => [A, this.store.get(A)])
    }
    keys() {
        return [...this.store.keys()].filter((A) => A.canReaddir())
    }
}
class G61 {
    hasWalkedCache;
    matches = new RxA;
    subwalks = new OxA;
    patterns;
    follow;
    dot;
    opts;
    constructor(A, B) {
        this.opts = A, this.follow = !!A.follow, this.dot = !!A.dot, this.hasWalkedCache = B ? B.copy() : new b20
    }
    processPatterns(A, B) {
        this.patterns = B;
        let Q = B.map((Z) => [A, Z]);
        for (let [Z, D] of Q) {
            this.hasWalkedCache.storeWalked(Z, D);
            let G = D.root(),
                F = D.isAbsolute() && this.opts.absolute !== !1;
            if (G) {
                Z = Z.resolve(G === "/" && this.opts.root !== void 0 ? this.opts.root : G);
                let J = D.rest();
                if (!J) {
                    this.matches.add(Z, !0, !1);
                    continue
                } else D = J
            }
            if (Z.isENOENT()) continue;
            let I, Y, W = !1;
            while (typeof(I = D.pattern()) === "string" && (Y = D.rest())) Z = Z.resolve(I), D = Y, W = !0;
            if (I = D.pattern(), Y = D.rest(), W) {
                if (this.hasWalkedCache.hasWalked(Z, D)) continue;
                this.hasWalkedCache.storeWalked(Z, D)
            }
            if (typeof I === "string") {
                let J = I === ".." || I === "" || I === ".";
                this.matches.add(Z.resolve(I), F, J);
                continue
            } else if (I === OY) {
                if (!Z.isSymbolicLink() || this.follow || D.checkFollowGlobstar()) this.subwalks.add(Z, D);
                let J = Y?.pattern(),
                    X = Y?.rest();
                if (!Y || (J === "" || J === ".") && !X) this.matches.add(Z, F, J === "" || J === ".");
                else if (J === "..") {
                    let V = Z.parent || Z;
                    if (!X) this.matches.add(V, F, !0);
                    else if (!this.hasWalkedCache.hasWalked(V, X)) this.subwalks.add(V, X)
                }
            } else if (I instanceof RegExp) this.subwalks.add(Z, D)
        }
        return this
    }
    subwalkTargets() {
        return this.subwalks.keys()
    }
    child() {
        return new G61(this.opts, this.hasWalkedCache)
    }
    filterEntries(A, B) {
        let Q = this.subwalks.get(A),
            Z = this.child();
        for (let D of B)
            for (let G of Q) {
                let F = G.isAbsolute(),
                    I = G.pattern(),
                    Y = G.rest();
                if (I === OY) Z.testGlobstar(D, G, Y, F);
                else if (I instanceof RegExp) Z.testRegExp(D, I, Y, F);
                else Z.testString(D, I, Y, F)
            }
        return Z
    }
    testGlobstar(A, B, Q, Z) {
        if (this.dot || !A.name.startsWith(".")) {
            if (!B.hasMore()) this.matches.add(A, Z, !1);
            if (A.canReaddir()) {
                if (this.follow || !A.isSymbolicLink()) this.subwalks.add(A, B);
                else if (A.isSymbolicLink()) {
                    if (Q && B.checkFollowGlobstar()) this.subwalks.add(A, Q);
                    else if (B.markFollowGlobstar()) this.subwalks.add(A, B)
                }
            }
        }
        if (Q) {
            let D = Q.pattern();
            if (typeof D === "string" && D !== ".." && D !== "" && D !== ".") this.testString(A, D, Q.rest(), Z);
            else if (D === "..") {
                let G = A.parent || A;
                this.subwalks.add(G, Q)
            } else if (D instanceof RegExp) this.testRegExp(A, D, Q.rest(), Z)
        }
    }
    testRegExp(A, B, Q, Z) {
        if (!B.test(A.name)) return;
        if (!Q) this.matches.add(A, Z, !1);
        else this.subwalks.add(A, Q)
    }
    testString(A, B, Q, Z) {
        if (!A.isNamed(B)) return;
        if (!Q) this.matches.add(A, Z, !1);
        else this.subwalks.add(A, Q)
    }
}
var QuQ = (A, B) => typeof A === "string" ? new D61([A], B) : Array.isArray(A) ? new D61(A, B) : A;
class f20 {
    path;
    patterns;
    opts;
    seen = new Set;
    paused = !1;
    aborted = !1;
    #A = [];
    #B;
    #Q;
    signal;
    maxDepth;
    includeChildMatches;
    constructor(A, B, Q) {
        if (this.patterns = A, this.path = B, this.opts = Q, this.#Q = !Q.posix && Q.platform === "win32" ? "\\" : "/", this.includeChildMatches = Q.includeChildMatches !== !1, Q.ignore || !this.includeChildMatches) {
            if (this.#B = QuQ(Q.ignore ?? [], Q), !this.includeChildMatches && typeof this.#B.add !== "function") throw new Error("cannot ignore child matches, ignore lacks add() method.")
        }
        if (this.maxDepth = Q.maxDepth || 1 / 0, Q.signal) this.signal = Q.signal, this.signal.addEventListener("abort", () => {
            this.#A.length = 0
        })
    }
    #Z(A) {
        return this.seen.has(A) || !!this.#B?.ignored?.(A)
    }
    #D(A) {
        return !!this.#B?.childrenIgnored?.(A)
    }
    pause() {
        this.paused = !0
    }
    resume() {
        if (this.signal?.aborted) return;
        this.paused = !1;
        let A = void 0;
        while (!this.paused && (A = this.#A.shift())) A()
    }
    onResume(A) {
        if (this.signal?.aborted) return;
        if (!this.paused) A();
        else this.#A.push(A)
    }
    async matchCheck(A, B) {
        if (B && this.opts.nodir) return;
        let Q;
        if (this.opts.realpath) {
            if (Q = A.realpathCached() || await A.realpath(), !Q) return;
            A = Q
        }
        let D = A.isUnknown() || this.opts.stat ? await A.lstat() : A;
        if (this.opts.follow && this.opts.nodir && D?.isSymbolicLink()) {
            let G = await D.realpath();
            if (G && (G.isUnknown() || this.opts.stat)) await G.lstat()
        }
        return this.matchCheckTest(D, B)
    }
    matchCheckTest(A, B) {
        return A && (this.maxDepth === 1 / 0 || A.depth() <= this.maxDepth) && (!B || A.canReaddir()) && (!this.opts.nodir || !A.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !A.isSymbolicLink() || !A.realpathCached()?.isDirectory()) && !this.#Z(A) ? A : void 0
    }
    matchCheckSync(A, B) {
        if (B && this.opts.nodir) return;
        let Q;
        if (this.opts.realpath) {
            if (Q = A.realpathCached() || A.realpathSync(), !Q) return;
            A = Q
        }
        let D = A.isUnknown() || this.opts.stat ? A.lstatSync() : A;
        if (this.opts.follow && this.opts.nodir && D?.isSymbolicLink()) {
            let G = D.realpathSync();
            if (G && (G?.isUnknown() || this.opts.stat)) G.lstatSync()
        }
        return this.matchCheckTest(D, B)
    }
    matchFinish(A, B) {
        if (this.#Z(A)) return;
        if (!this.includeChildMatches && this.#B?.add) {
            let D = `${A.relativePosix()}/**`;
            this.#B.add(D)
        }
        let Q = this.opts.absolute === void 0 ? B : this.opts.absolute;
        this.seen.add(A);
        let Z = this.opts.mark && A.isDirectory() ? this.#Q : "";
        if (this.opts.withFileTypes) this.matchEmit(A);
        else if (Q) {
            let D = this.opts.posix ? A.fullpathPosix() : A.fullpath();
            this.matchEmit(D + Z)
        } else {
            let D = this.opts.posix ? A.relativePosix() : A.relative(),
                G = this.opts.dotRelative && !D.startsWith(".." + this.#Q) ? "." + this.#Q : "";
            this.matchEmit(!D ? "." + Z : G + D + Z)
        }
    }
    async match(A, B, Q) {
        let Z = await this.matchCheck(A, Q);
        if (Z) this.matchFinish(Z, B)
    }
    matchSync(A, B, Q) {
        let Z = this.matchCheckSync(A, Q);
        if (Z) this.matchFinish(Z, B)
    }
    walkCB(A, B, Q) {
        if (this.signal?.aborted) Q();
        this.walkCB2(A, B, new G61(this.opts), Q)
    }
    walkCB2(A, B, Q, Z) {
        if (this.#D(A)) return Z();
        if (this.signal?.aborted) Z();
        if (this.paused) {
            this.onResume(() => this.walkCB2(A, B, Q, Z));
            return
        }
        Q.processPatterns(A, B);
        let D = 1,
            G = () => {
                if (--D === 0) Z()
            };
        for (let [F, I, Y] of Q.matches.entries()) {
            if (this.#Z(F)) continue;
            D++, this.match(F, I, Y).then(() => G())
        }
        for (let F of Q.subwalkTargets()) {
            if (this.maxDepth !== 1 / 0 && F.depth() >= this.maxDepth) continue;
            D++;
            let I = F.readdirCached();
            if (F.calledReaddir()) this.walkCB3(F, I, Q, G);
            else F.readdirCB((Y, W) => this.walkCB3(F, W, Q, G), !0)
        }
        G()
    }
    walkCB3(A, B, Q, Z) {
        Q = Q.filterEntries(A, B);
        let D = 1,
            G = () => {
                if (--D === 0) Z()
            };
        for (let [F, I, Y] of Q.matches.entries()) {
            if (this.#Z(F)) continue;
            D++, this.match(F, I, Y).then(() => G())
        }
        for (let [F, I] of Q.subwalks.entries()) D++, this.walkCB2(F, I, Q.child(), G);
        G()
    }
    walkCBSync(A, B, Q) {
        if (this.signal?.aborted) Q();
        this.walkCB2Sync(A, B, new G61(this.opts), Q)
    }
    walkCB2Sync(A, B, Q, Z) {
        if (this.#D(A)) return Z();
        if (this.signal?.aborted) Z();
        if (this.paused) {
            this.onResume(() => this.walkCB2Sync(A, B, Q, Z));
            return
        }
        Q.processPatterns(A, B);
        let D = 1,
            G = () => {
                if (--D === 0) Z()
            };
        for (let [F, I, Y] of Q.matches.entries()) {
            if (this.#Z(F)) continue;
            this.matchSync(F, I, Y)
        }
        for (let F of Q.subwalkTargets()) {
            if (this.maxDepth !== 1 / 0 && F.depth() >= this.maxDepth) continue;
            D++;
            let I = F.readdirSync();
            this.walkCB3Sync(F, I, Q, G)
        }
        G()
    }
    walkCB3Sync(A, B, Q, Z) {
        Q = Q.filterEntries(A, B);
        let D = 1,
            G = () => {
                if (--D === 0) Z()
            };
        for (let [F, I, Y] of Q.matches.entries()) {
            if (this.#Z(F)) continue;
            this.matchSync(F, I, Y)
        }
        for (let [F, I] of Q.subwalks.entries()) D++, this.walkCB2Sync(F, I, Q.child(), G);
        G()
    }
}
class rw1 extends f20 {
    matches = new Set;
    constructor(A, B, Q) {
        super(A, B, Q)
    }
    matchEmit(A) {
        this.matches.add(A)
    }
    async walk() {
        if (this.signal?.aborted) throw this.signal.reason;
        if (this.path.isUnknown()) await this.path.lstat();
        return await new Promise((A, B) => {
            this.walkCB(this.path, this.patterns, () => {
                if (this.signal?.aborted) B(this.signal.reason);
                else A(this.matches)
            })
        }), this.matches
    }
    walkSync() {
        if (this.signal?.aborted) throw this.signal.reason;
        if (this.path.isUnknown()) this.path.lstatSync();
        return this.walkCBSync(this.path, this.patterns, () => {
            if (this.signal?.aborted) throw this.signal.reason
        }), this.matches
    }
}
class ow1 extends f20 {
    results;
    constructor(A, B, Q) {
        super(A, B, Q);
        this.results = new zg({
            signal: this.signal,
            objectMode: !0
        }), this.results.on("drain", () => this.resume()), this.results.on("resume", () => this.resume())
    }
    matchEmit(A) {
        if (this.results.write(A), !this.results.flowing) this.pause()
    }
    stream() {
        let A = this.path;
        if (A.isUnknown()) A.lstat().then(() => {
            this.walkCB(A, this.patterns, () => this.results.end())
        });
        else this.walkCB(A, this.patterns, () => this.results.end());
        return this.results
    }
    streamSync() {
        if (this.path.isUnknown()) this.path.lstatSync();
        return this.walkCBSync(this.path, this.patterns, () => this.results.end()), this.results
    }
}
var DuQ = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class DL {
    absolute;
    cwd;
    root;
    dot;
    dotRelative;
    follow;
    ignore;
    magicalBraces;
    mark;
    matchBase;
    maxDepth;
    nobrace;
    nocase;
    nodir;
    noext;
    noglobstar;
    pattern;
    platform;
    realpath;
    scurry;
    stat;
    signal;
    windowsPathsNoEscape;
    withFileTypes;
    includeChildMatches;
    opts;
    patterns;
    constructor(A, B) {
        if (!B) throw new TypeError("glob options required");
        if (this.withFileTypes = !!B.withFileTypes, this.signal = B.signal, this.follow = !!B.follow, this.dot = !!B.dot, this.dotRelative = !!B.dotRelative, this.nodir = !!B.nodir, this.mark = !!B.mark, !B.cwd) this.cwd = "";
        else if (B.cwd instanceof URL || B.cwd.startsWith("file://")) B.cwd = ZuQ(B.cwd);
        if (this.cwd = B.cwd || "", this.root = B.root, this.magicalBraces = !!B.magicalBraces, this.nobrace = !!B.nobrace, this.noext = !!B.noext, this.realpath = !!B.realpath, this.absolute = B.absolute, this.includeChildMatches = B.includeChildMatches !== !1, this.noglobstar = !!B.noglobstar, this.matchBase = !!B.matchBase, this.maxDepth = typeof B.maxDepth === "number" ? B.maxDepth : 1 / 0, this.stat = !!B.stat, this.ignore = B.ignore, this.withFileTypes && this.absolute !== void 0) throw new Error("cannot set absolute and withFileTypes:true");
        if (typeof A === "string") A = [A];
        if (this.windowsPathsNoEscape = !!B.windowsPathsNoEscape || B.allowWindowsEscape === !1, this.windowsPathsNoEscape) A = A.map((I) => I.replace(/\\/g, "/"));
        if (this.matchBase) {
            if (B.noglobstar) throw new TypeError("base matching requires globstar");
            A = A.map((I) => I.includes("/") ? I : `./**/${I}`)
        }
        if (this.pattern = A, this.platform = B.platform || DuQ, this.opts = {
                ...B,
                platform: this.platform
            }, B.scurry) {
            if (this.scurry = B.scurry, B.nocase !== void 0 && B.nocase !== B.scurry.nocase) throw new Error("nocase option contradicts provided scurry option")
        } else {
            let I = B.platform === "win32" ? Q61 : B.platform === "darwin" ? sw1 : B.platform ? Z61 : MxA;
            this.scurry = new I(this.cwd, {
                nocase: B.nocase,
                fs: B.fs
            })
        }
        this.nocase = this.scurry.nocase;
        let Q = this.platform === "darwin" || this.platform === "win32",
            Z = {
                ...B,
                dot: this.dot,
                matchBase: this.matchBase,
                nobrace: this.nobrace,
                nocase: this.nocase,
                nocaseMagicOnly: Q,
                nocomment: !0,
                noext: this.noext,
                nonegate: !0,
                optimizationLevel: 2,
                platform: this.platform,
                windowsPathsNoEscape: this.windowsPathsNoEscape,
                debug: !!this.opts.debug
            },
            D = this.pattern.map((I) => new jz(I, Z)),
            [G, F] = D.reduce((I, Y) => {
                return I[0].push(...Y.set), I[1].push(...Y.globParts), I
            }, [
                [],
                []
            ]);
        this.patterns = G.map((I, Y) => {
            let W = F[Y];
            if (!W) throw new Error("invalid pattern object");
            return new $a(I, W, 0, this.platform)
        })
    }
    async walk() {
        return [...await new rw1(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
        }).walk()]
    }
    walkSync() {
        return [...new rw1(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
        }).walkSync()]
    }
    stream() {
        return new ow1(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
        }).stream()
    }
    streamSync() {
        return new ow1(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
        }).streamSync()
    }
    iterateSync() {
        return this.streamSync()[Symbol.iterator]()
    } [Symbol.iterator]() {
        return this.iterateSync()
    }
    iterate() {
        return this.stream()[Symbol.asyncIterator]()
    } [Symbol.asyncIterator]() {
        return this.iterate()
    }
}
var h20 = (A, B = {}) => {
    if (!Array.isArray(A)) A = [A];
    for (let Q of A)
        if (new jz(Q, B).hasMagic()) return !0;
    return !1
};

function ew1(A, B = {}) {
    return new DL(A, B).streamSync()
}

function PxA(A, B = {}) {
    return new DL(A, B).stream()
}

function SxA(A, B = {}) {
    return new DL(A, B).walkSync()
}
async function TxA(A, B = {}) {
    return new DL(A, B).walk()
}

function A$1(A, B = {}) {
    return new DL(A, B).iterateSync()
}

function jxA(A, B = {}) {
    return new DL(A, B).iterate()
}
var GuQ = ew1,
    FuQ = Object.assign(PxA, {
        sync: ew1
    }),
    IuQ = A$1,
    YuQ = Object.assign(jxA, {
        sync: A$1
    }),
    WuQ = Object.assign(SxA, {
        stream: ew1,
        iterate: A$1
    }),
    tw1 = Object.assign(TxA, {
        glob: TxA,
        globSync: SxA,
        sync: WuQ,
        globStream: PxA,
        stream: FuQ,
        globStreamSync: ew1,
        streamSync: GuQ,
        globIterate: jxA,
        iterate: YuQ,
        globIterateSync: A$1,
        iterateSync: IuQ,
        Glob: DL,
        hasMagic: h20,
        escape: Ea,
        unescape: _w
    });
tw1.glob = tw1;
var UlA = G1(VQ0(), 1);
import {
    fileURLToPath as ZQ4
} from "node:url";
import * as Qs from "node:path";
import {
    execFile as DQ4
} from "child_process";

function vz() {
    return typeof Bun !== "undefined" && !!Bun?.embeddedFiles && Array.isArray(Bun?.embeddedFiles) && (Bun?.embeddedFiles?.length ?? 0) > 0
}
var GQ4 = ZQ4(import.meta.url),
    FQ4 = Qs.join(GQ4, "../"),
    x$1 = EA(() => {
        let {
            cmd: A
        } = UlA.findActualExecutable("rg", []);
        if (A !== "rg" && !process.env.USE_BUILTIN_RIPGREP) return A;
        else {
            let B = Qs.resolve(FQ4, "vendor", "ripgrep");
            if (process.platform === "win32") return Qs.resolve(B, "x64-win32", "rg.exe");
            return Qs.resolve(B, `${process.arch}-${process.platform}`, "rg")
        }
    });

function CQ0() {
    return {
        rgPath: vz() ? process.execPath : x$1(),
        rgArgs: vz() ? ["--ripgrep"] : []
    }
}