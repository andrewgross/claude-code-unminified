/* chunk:506 bytes:[12043819, 12061539) size:17720 source:unpacked-cli.js */
class jz {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    regexp;
    constructor(A, B = {}) {
        if (i41(A), B = B || {}, this.options = B, this.pattern = A, this.platform = B.platform || ZxA, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!B.windowsPathsNoEscape || B.allowWindowsEscape === !1, this.windowsPathsNoEscape) this.pattern = this.pattern.replace(/\\/g, "/");
        this.preserveMultipleSlashes = !!B.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!B.nonegate, this.comment = !1, this.empty = !1, this.partial = !!B.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = B.windowsNoMagicRoot !== void 0 ? B.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make()
    }
    hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) return !0;
        for (let A of this.set)
            for (let B of A)
                if (typeof B !== "string") return !0;
        return !1
    }
    debug(...A) {}
    make() {
        let A = this.pattern,
            B = this.options;
        if (!B.nocomment && A.charAt(0) === "#") {
            this.comment = !0;
            return
        }
        if (!A) {
            this.empty = !0;
            return
        }
        if (this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], B.debug) this.debug = (...D) => console.error(...D);
        this.debug(this.pattern, this.globSet);
        let Q = this.globSet.map((D) => this.slashSplit(D));
        this.globParts = this.preprocess(Q), this.debug(this.pattern, this.globParts);
        let Z = this.globParts.map((D, G, F) => {
            if (this.isWindows && this.windowsNoMagicRoot) {
                let I = D[0] === "" && D[1] === "" && (D[2] === "?" || !e_A.test(D[2])) && !e_A.test(D[3]),
                    Y = /^[a-z]:/i.test(D[0]);
                if (I) return [...D.slice(0, 4), ...D.slice(4).map((W) => this.parse(W))];
                else if (Y) return [D[0], ...D.slice(1).map((W) => this.parse(W))]
            }
            return D.map((I) => this.parse(I))
        });
        if (this.debug(this.pattern, Z), this.set = Z.filter((D) => D.indexOf(!1) === -1), this.isWindows)
            for (let D = 0; D < this.set.length; D++) {
                let G = this.set[D];
                if (G[0] === "" && G[1] === "" && this.globParts[D][2] === "?" && typeof G[3] === "string" && /^[a-z]:$/i.test(G[3])) G[2] = "?"
            }
        this.debug(this.pattern, this.set)
    }
    preprocess(A) {
        if (this.options.noglobstar) {
            for (let Q = 0; Q < A.length; Q++)
                for (let Z = 0; Z < A[Q].length; Z++)
                    if (A[Q][Z] === "**") A[Q][Z] = "*"
        }
        let {
            optimizationLevel: B = 1
        } = this.options;
        if (B >= 2) A = this.firstPhasePreProcess(A), A = this.secondPhasePreProcess(A);
        else if (B >= 1) A = this.levelOneOptimize(A);
        else A = this.adjascentGlobstarOptimize(A);
        return A
    }
    adjascentGlobstarOptimize(A) {
        return A.map((B) => {
            let Q = -1;
            while ((Q = B.indexOf("**", Q + 1)) !== -1) {
                let Z = Q;
                while (B[Z + 1] === "**") Z++;
                if (Z !== Q) B.splice(Q, Z - Q)
            }
            return B
        })
    }
    levelOneOptimize(A) {
        return A.map((B) => {
            return B = B.reduce((Q, Z) => {
                let D = Q[Q.length - 1];
                if (Z === "**" && D === "**") return Q;
                if (Z === "..") {
                    if (D && D !== ".." && D !== "." && D !== "**") return Q.pop(), Q
                }
                return Q.push(Z), Q
            }, []), B.length === 0 ? [""] : B
        })
    }
    levelTwoFileOptimize(A) {
        if (!Array.isArray(A)) A = this.slashSplit(A);
        let B = !1;
        do {
            if (B = !1, !this.preserveMultipleSlashes) {
                for (let Z = 1; Z < A.length - 1; Z++) {
                    let D = A[Z];
                    if (Z === 1 && D === "" && A[0] === "") continue;
                    if (D === "." || D === "") B = !0, A.splice(Z, 1), Z--
                }
                if (A[0] === "." && A.length === 2 && (A[1] === "." || A[1] === "")) B = !0, A.pop()
            }
            let Q = 0;
            while ((Q = A.indexOf("..", Q + 1)) !== -1) {
                let Z = A[Q - 1];
                if (Z && Z !== "." && Z !== ".." && Z !== "**") B = !0, A.splice(Q - 1, 2), Q -= 2
            }
        } while (B);
        return A.length === 0 ? [""] : A
    }
    firstPhasePreProcess(A) {
        let B = !1;
        do {
            B = !1;
            for (let Q of A) {
                let Z = -1;
                while ((Z = Q.indexOf("**", Z + 1)) !== -1) {
                    let G = Z;
                    while (Q[G + 1] === "**") G++;
                    if (G > Z) Q.splice(Z + 1, G - Z);
                    let F = Q[Z + 1],
                        I = Q[Z + 2],
                        Y = Q[Z + 3];
                    if (F !== "..") continue;
                    if (!I || I === "." || I === ".." || !Y || Y === "." || Y === "..") continue;
                    B = !0, Q.splice(Z, 1);
                    let W = Q.slice(0);
                    W[Z] = "**", A.push(W), Z--
                }
                if (!this.preserveMultipleSlashes) {
                    for (let G = 1; G < Q.length - 1; G++) {
                        let F = Q[G];
                        if (G === 1 && F === "" && Q[0] === "") continue;
                        if (F === "." || F === "") B = !0, Q.splice(G, 1), G--
                    }
                    if (Q[0] === "." && Q.length === 2 && (Q[1] === "." || Q[1] === "")) B = !0, Q.pop()
                }
                let D = 0;
                while ((D = Q.indexOf("..", D + 1)) !== -1) {
                    let G = Q[D - 1];
                    if (G && G !== "." && G !== ".." && G !== "**") {
                        B = !0;
                        let I = D === 1 && Q[D + 1] === "**" ? ["."] : [];
                        if (Q.splice(D - 1, 2, ...I), Q.length === 0) Q.push("");
                        D -= 2
                    }
                }
            }
        } while (B);
        return A
    }
    secondPhasePreProcess(A) {
        for (let B = 0; B < A.length - 1; B++)
            for (let Q = B + 1; Q < A.length; Q++) {
                let Z = this.partsMatch(A[B], A[Q], !this.preserveMultipleSlashes);
                if (Z) {
                    A[B] = [], A[Q] = Z;
                    break
                }
            }
        return A.filter((B) => B.length)
    }
    partsMatch(A, B, Q = !1) {
        let Z = 0,
            D = 0,
            G = [],
            F = "";
        while (Z < A.length && D < B.length)
            if (A[Z] === B[D]) G.push(F === "b" ? B[D] : A[Z]), Z++, D++;
            else if (Q && A[Z] === "**" && B[D] === A[Z + 1]) G.push(A[Z]), Z++;
        else if (Q && B[D] === "**" && A[Z] === B[D + 1]) G.push(B[D]), D++;
        else if (A[Z] === "*" && B[D] && (this.options.dot || !B[D].startsWith(".")) && B[D] !== "**") {
            if (F === "b") return !1;
            F = "a", G.push(A[Z]), Z++, D++
        } else if (B[D] === "*" && A[Z] && (this.options.dot || !A[Z].startsWith(".")) && A[Z] !== "**") {
            if (F === "a") return !1;
            F = "b", G.push(B[D]), Z++, D++
        } else return !1;
        return A.length === B.length && G
    }
    parseNegate() {
        if (this.nonegate) return;
        let A = this.pattern,
            B = !1,
            Q = 0;
        for (let Z = 0; Z < A.length && A.charAt(Z) === "!"; Z++) B = !B, Q++;
        if (Q) this.pattern = A.slice(Q);
        this.negate = B
    }
    matchOne(A, B, Q = !1) {
        let Z = this.options;
        if (this.isWindows) {
            let K = typeof A[0] === "string" && /^[a-z]:$/i.test(A[0]),
                H = !K && A[0] === "" && A[1] === "" && A[2] === "?" && /^[a-z]:$/i.test(A[3]),
                z = typeof B[0] === "string" && /^[a-z]:$/i.test(B[0]),
                $ = !z && B[0] === "" && B[1] === "" && B[2] === "?" && typeof B[3] === "string" && /^[a-z]:$/i.test(B[3]),
                L = H ? 3 : K ? 0 : void 0,
                N = $ ? 3 : z ? 0 : void 0;
            if (typeof L === "number" && typeof N === "number") {
                let [R, O] = [A[L], B[N]];
                if (R.toLowerCase() === O.toLowerCase()) {
                    if (B[N] = R, N > L) B = B.slice(N);
                    else if (L > N) A = A.slice(L)
                }
            }
        }
        let {
            optimizationLevel: D = 1
        } = this.options;
        if (D >= 2) A = this.levelTwoFileOptimize(A);
        this.debug("matchOne", this, {
            file: A,
            pattern: B
        }), this.debug("matchOne", A.length, B.length);
        for (var G = 0, F = 0, I = A.length, Y = B.length; G < I && F < Y; G++, F++) {
            this.debug("matchOne loop");
            var W = B[F],
                J = A[G];
            if (this.debug(B, W, J), W === !1) return !1;
            if (W === OY) {
                this.debug("GLOBSTAR", [B, W, J]);
                var X = G,
                    V = F + 1;
                if (V === Y) {
                    this.debug("** at the end");
                    for (; G < I; G++)
                        if (A[G] === "." || A[G] === ".." || !Z.dot && A[G].charAt(0) === ".") return !1;
                    return !0
                }
                while (X < I) {
                    var C = A[X];
                    if (this.debug(`
globstar while`, A, X, B, V, C), this.matchOne(A.slice(X), B.slice(V), Q)) return this.debug("globstar found match!", X, I, C), !0;
                    else {
                        if (C === "." || C === ".." || !Z.dot && C.charAt(0) === ".") {
                            this.debug("dot detected!", A, X, B, V);
                            break
                        }
                        this.debug("globstar swallow a segment, and continue"), X++
                    }
                }
                if (Q) {
                    if (this.debug(`
>>> no match, partial?`, A, X, B, V), X === I) return !0
                }
                return !1
            }
            let K;
            if (typeof W === "string") K = J === W, this.debug("string match", W, J, K);
            else K = W.test(J), this.debug("pattern match", W, J, K);
            if (!K) return !1
        }
        if (G === I && F === Y) return !0;
        else if (G === I) return Q;
        else if (F === Y) return G === I - 1 && A[G] === "";
        else throw new Error("wtf?")
    }
    braceExpand() {
        return DxA(this.pattern, this.options)
    }
    parse(A) {
        i41(A);
        let B = this.options;
        if (A === "**") return OY;
        if (A === "") return "";
        let Q, Z = null;
        if (Q = A.match(WgQ)) Z = B.dot ? XgQ : JgQ;
        else if (Q = A.match(ehQ)) Z = (B.nocase ? B.dot ? ZgQ : QgQ : B.dot ? BgQ : AgQ)(Q[1]);
        else if (Q = A.match(VgQ)) Z = (B.nocase ? B.dot ? KgQ : CgQ : B.dot ? HgQ : zgQ)(Q);
        else if (Q = A.match(DgQ)) Z = B.dot ? FgQ : GgQ;
        else if (Q = A.match(IgQ)) Z = YgQ;
        let D = RY.fromGlob(A, this.options).toMMPattern();
        if (Z && typeof D === "object") Reflect.defineProperty(D, "test", {
            value: Z
        });
        return D
    }
    makeRe() {
        if (this.regexp || this.regexp === !1) return this.regexp;
        let A = this.set;
        if (!A.length) return this.regexp = !1, this.regexp;
        let B = this.options,
            Q = B.noglobstar ? wgQ : B.dot ? $gQ : qgQ,
            Z = new Set(B.nocase ? ["i"] : []),
            D = A.map((I) => {
                let Y = I.map((W) => {
                    if (W instanceof RegExp)
                        for (let J of W.flags.split("")) Z.add(J);
                    return typeof W === "string" ? OgQ(W) : W === OY ? OY : W._src
                });
                return Y.forEach((W, J) => {
                    let X = Y[J + 1],
                        V = Y[J - 1];
                    if (W !== OY || V === OY) return;
                    if (V === void 0)
                        if (X !== void 0 && X !== OY) Y[J + 1] = "(?:\\/|" + Q + "\\/)?" + X;
                        else Y[J] = Q;
                    else if (X === void 0) Y[J - 1] = V + "(?:\\/|" + Q + ")?";
                    else if (X !== OY) Y[J - 1] = V + "(?:\\/|\\/" + Q + "\\/)" + X, Y[J + 1] = OY
                }), Y.filter((W) => W !== OY).join("/")
            }).join("|"),
            [G, F] = A.length > 1 ? ["(?:", ")"] : ["", ""];
        if (D = "^" + G + D + F + "$", this.negate) D = "^(?!" + D + ").+$";
        try {
            this.regexp = new RegExp(D, [...Z].join(""))
        } catch (I) {
            this.regexp = !1
        }
        return this.regexp
    }
    slashSplit(A) {
        if (this.preserveMultipleSlashes) return A.split("/");
        else if (this.isWindows && /^\/\/[^\/]+/.test(A)) return ["", ...A.split(/\/+/)];
        else return A.split(/\/+/)
    }
    match(A, B = this.partial) {
        if (this.debug("match", A, this.pattern), this.comment) return !1;
        if (this.empty) return A === "";
        if (A === "/" && B) return !0;
        let Q = this.options;
        if (this.isWindows) A = A.split("\\").join("/");
        let Z = this.slashSplit(A);
        this.debug(this.pattern, "split", Z);
        let D = this.set;
        this.debug(this.pattern, "set", D);
        let G = Z[Z.length - 1];
        if (!G)
            for (let F = Z.length - 2; !G && F >= 0; F--) G = Z[F];
        for (let F = 0; F < D.length; F++) {
            let I = D[F],
                Y = Z;
            if (Q.matchBase && I.length === 1) Y = [G];
            if (this.matchOne(Y, I, B)) {
                if (Q.flipNegate) return !0;
                return !this.negate
            }
        }
        if (Q.flipNegate) return !1;
        return this.negate
    }
    static defaults(A) {
        return aJ.defaults(A).Minimatch
    }
}
aJ.AST = RY;
aJ.Minimatch = jz;
aJ.escape = Ea;
aJ.unescape = _w;
import {
    fileURLToPath as ZuQ
} from "node:url";
import {
    posix as fgQ,
    win32 as _20
} from "node:path";
import {
    fileURLToPath as hgQ
} from "node:url";
import {
    lstatSync as ggQ,
    readdir as ugQ,
    readdirSync as mgQ,
    readlinkSync as dgQ,
    realpathSync as cgQ
} from "fs";
import * as lgQ from "node:fs";
import {
    lstat as igQ,
    readdir as ngQ,
    readlink as agQ,
    realpath as sgQ
} from "node:fs/promises";
import {
    EventEmitter as S20
} from "node:events";
import WxA from "node:stream";
import {
    StringDecoder as TgQ
} from "node:string_decoder";
var GxA = typeof process === "object" && process ? process : {
        stdout: null,
        stderr: null
    },
    PgQ = (A) => !!A && typeof A === "object" && (A instanceof zg || A instanceof WxA || SgQ(A) || jgQ(A)),
    SgQ = (A) => !!A && typeof A === "object" && A instanceof S20 && typeof A.pipe === "function" && A.pipe !== WxA.Writable.prototype.pipe,
    jgQ = (A) => !!A && typeof A === "object" && A instanceof S20 && typeof A.write === "function" && typeof A.end === "function",
    XT = Symbol("EOF"),
    VT = Symbol("maybeEmitEnd"),
    wy = Symbol("emittedEnd"),
    gw1 = Symbol("emittingEnd"),
    a41 = Symbol("emittedError"),
    uw1 = Symbol("closed"),
    FxA = Symbol("read"),
    mw1 = Symbol("flush"),
    IxA = Symbol("flushChunk"),
    xw = Symbol("encoding"),
    Ua = Symbol("decoder"),
    VI = Symbol("flowing"),
    s41 = Symbol("paused"),
    wa = Symbol("resume"),
    CI = Symbol("buffer"),
    sJ = Symbol("pipes"),
    KI = Symbol("bufferLength"),
    M20 = Symbol("bufferPush"),
    dw1 = Symbol("bufferShift"),
    rW = Symbol("objectMode"),
    BG = Symbol("destroyed"),
    R20 = Symbol("error"),
    O20 = Symbol("emitData"),
    YxA = Symbol("emitEnd"),
    T20 = Symbol("emitEnd2"),
    QL = Symbol("async"),
    P20 = Symbol("abort"),
    cw1 = Symbol("aborted"),
    r41 = Symbol("signal"),
    Hg = Symbol("dataListeners"),
    YK = Symbol("discarded"),
    o41 = (A) => Promise.resolve().then(A),
    kgQ = (A) => A(),
    ygQ = (A) => A === "end" || A === "finish" || A === "prefinish",
    _gQ = (A) => A instanceof ArrayBuffer || !!A && typeof A === "object" && A.constructor && A.constructor.name === "ArrayBuffer" && A.byteLength >= 0,
    xgQ = (A) => !Buffer.isBuffer(A) && ArrayBuffer.isView(A);
class j20 {
    src;
    dest;
    opts;
    ondrain;
    constructor(A, B, Q) {
        this.src = A, this.dest = B, this.opts = Q, this.ondrain = () => A[wa](), this.dest.on("drain", this.ondrain)
    }
    unpipe() {
        this.dest.removeListener("drain", this.ondrain)
    }
    proxyErrors(A) {}
    end() {
        if (this.unpipe(), this.opts.end) this.dest.end()
    }
}
class JxA extends j20 {
    unpipe() {
        this.src.removeListener("error", this.proxyErrors), super.unpipe()
    }
    constructor(A, B, Q) {
        super(A, B, Q);
        this.proxyErrors = (Z) => B.emit("error", Z), A.on("error", this.proxyErrors)
    }
}
var vgQ = (A) => !!A.objectMode,
    bgQ = (A) => !A.objectMode && !!A.encoding && A.encoding !== "buffer";