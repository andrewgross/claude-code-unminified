/* chunk:509 bytes:[12090839, 12110327) size:19488 source:unpacked-cli.js */
class v20 {
    root;
    rootPath;
    roots;
    cwd;
    #A;
    #B;
    #Q;
    nocase;
    #Z;
    constructor(A = process.cwd(), B, Q, {
        nocase: Z,
        childrenCacheSize: D = 16384,
        fs: G = e41
    } = {}) {
        if (this.#Z = HxA(G), A instanceof URL || A.startsWith("file://")) A = hgQ(A);
        let F = B.resolve(A);
        this.roots = Object.create(null), this.rootPath = this.parseRootPath(F), this.#A = new x20, this.#B = new x20, this.#Q = new NxA(D);
        let I = F.substring(this.rootPath.length).split(Q);
        if (I.length === 1 && !I[0]) I.pop();
        if (Z === void 0) throw new TypeError("must provide nocase setting to PathScurryBase ctor");
        this.nocase = Z, this.root = this.newRoot(this.#Z), this.roots[this.rootPath] = this.root;
        let Y = this.root,
            W = I.length - 1,
            J = B.sep,
            X = this.rootPath,
            V = !1;
        for (let C of I) {
            let K = W--;
            Y = Y.child(C, {
                relative: new Array(K).fill("..").join(J),
                relativePosix: new Array(K).fill("..").join("/"),
                fullpath: X += (V ? "" : J) + C
            }), V = !0
        }
        this.cwd = Y
    }
    depth(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.depth()
    }
    childrenCache() {
        return this.#Q
    }
    resolve(...A) {
        let B = "";
        for (let D = A.length - 1; D >= 0; D--) {
            let G = A[D];
            if (!G || G === ".") continue;
            if (B = B ? `${G}/${B}` : G, this.isAbsolute(G)) break
        }
        let Q = this.#A.get(B);
        if (Q !== void 0) return Q;
        let Z = this.cwd.resolve(B).fullpath();
        return this.#A.set(B, Z), Z
    }
    resolvePosix(...A) {
        let B = "";
        for (let D = A.length - 1; D >= 0; D--) {
            let G = A[D];
            if (!G || G === ".") continue;
            if (B = B ? `${G}/${B}` : G, this.isAbsolute(G)) break
        }
        let Q = this.#B.get(B);
        if (Q !== void 0) return Q;
        let Z = this.cwd.resolve(B).fullpathPosix();
        return this.#B.set(B, Z), Z
    }
    relative(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.relative()
    }
    relativePosix(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.relativePosix()
    }
    basename(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.name
    }
    dirname(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return (A.parent || A).fullpath()
    }
    async readdir(A = this.cwd, B = {
        withFileTypes: !0
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q
        } = B;
        if (!A.canReaddir()) return [];
        else {
            let Z = await A.readdir();
            return Q ? Z : Z.map((D) => D.name)
        }
    }
    readdirSync(A = this.cwd, B = {
        withFileTypes: !0
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0
        } = B;
        if (!A.canReaddir()) return [];
        else if (Q) return A.readdirSync();
        else return A.readdirSync().map((Z) => Z.name)
    }
    async lstat(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.lstat()
    }
    lstatSync(A = this.cwd) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        return A.lstatSync()
    }
    async readlink(A = this.cwd, {
        withFileTypes: B
    } = {
        withFileTypes: !1
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A.withFileTypes, A = this.cwd;
        let Q = await A.readlink();
        return B ? Q : Q?.fullpath()
    }
    readlinkSync(A = this.cwd, {
        withFileTypes: B
    } = {
        withFileTypes: !1
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A.withFileTypes, A = this.cwd;
        let Q = A.readlinkSync();
        return B ? Q : Q?.fullpath()
    }
    async realpath(A = this.cwd, {
        withFileTypes: B
    } = {
        withFileTypes: !1
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A.withFileTypes, A = this.cwd;
        let Q = await A.realpath();
        return B ? Q : Q?.fullpath()
    }
    realpathSync(A = this.cwd, {
        withFileTypes: B
    } = {
        withFileTypes: !1
    }) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A.withFileTypes, A = this.cwd;
        let Q = A.realpathSync();
        return B ? Q : Q?.fullpath()
    }
    async walk(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0,
            follow: Z = !1,
            filter: D,
            walkFilter: G
        } = B, F = [];
        if (!D || D(A)) F.push(Q ? A : A.fullpath());
        let I = new Set,
            Y = (J, X) => {
                I.add(J), J.readdirCB((V, C) => {
                    if (V) return X(V);
                    let K = C.length;
                    if (!K) return X();
                    let H = () => {
                        if (--K === 0) X()
                    };
                    for (let z of C) {
                        if (!D || D(z)) F.push(Q ? z : z.fullpath());
                        if (Z && z.isSymbolicLink()) z.realpath().then(($) => $?.isUnknown() ? $.lstat() : $).then(($) => $?.shouldWalk(I, G) ? Y($, H) : H());
                        else if (z.shouldWalk(I, G)) Y(z, H);
                        else H()
                    }
                }, !0)
            },
            W = A;
        return new Promise((J, X) => {
            Y(W, (V) => {
                if (V) return X(V);
                J(F)
            })
        })
    }
    walkSync(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0,
            follow: Z = !1,
            filter: D,
            walkFilter: G
        } = B, F = [];
        if (!D || D(A)) F.push(Q ? A : A.fullpath());
        let I = new Set([A]);
        for (let Y of I) {
            let W = Y.readdirSync();
            for (let J of W) {
                if (!D || D(J)) F.push(Q ? J : J.fullpath());
                let X = J;
                if (J.isSymbolicLink()) {
                    if (!(Z && (X = J.realpathSync()))) continue;
                    if (X.isUnknown()) X.lstatSync()
                }
                if (X.shouldWalk(I, G)) I.add(X)
            }
        }
        return F
    } [Symbol.asyncIterator]() {
        return this.iterate()
    }
    iterate(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        return this.stream(A, B)[Symbol.asyncIterator]()
    } [Symbol.iterator]() {
        return this.iterateSync()
    }* iterateSync(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0,
            follow: Z = !1,
            filter: D,
            walkFilter: G
        } = B;
        if (!D || D(A)) yield Q ? A : A.fullpath();
        let F = new Set([A]);
        for (let I of F) {
            let Y = I.readdirSync();
            for (let W of Y) {
                if (!D || D(W)) yield Q ? W : W.fullpath();
                let J = W;
                if (W.isSymbolicLink()) {
                    if (!(Z && (J = W.realpathSync()))) continue;
                    if (J.isUnknown()) J.lstatSync()
                }
                if (J.shouldWalk(F, G)) F.add(J)
            }
        }
    }
    stream(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0,
            follow: Z = !1,
            filter: D,
            walkFilter: G
        } = B, F = new zg({
            objectMode: !0
        });
        if (!D || D(A)) F.write(Q ? A : A.fullpath());
        let I = new Set,
            Y = [A],
            W = 0,
            J = () => {
                let X = !1;
                while (!X) {
                    let V = Y.shift();
                    if (!V) {
                        if (W === 0) F.end();
                        return
                    }
                    W++, I.add(V);
                    let C = (H, z, $ = !1) => {
                            if (H) return F.emit("error", H);
                            if (Z && !$) {
                                let L = [];
                                for (let N of z)
                                    if (N.isSymbolicLink()) L.push(N.realpath().then((R) => R?.isUnknown() ? R.lstat() : R));
                                if (L.length) {
                                    Promise.all(L).then(() => C(null, z, !0));
                                    return
                                }
                            }
                            for (let L of z)
                                if (L && (!D || D(L))) {
                                    if (!F.write(Q ? L : L.fullpath())) X = !0
                                } W--;
                            for (let L of z) {
                                let N = L.realpathCached() || L;
                                if (N.shouldWalk(I, G)) Y.push(N)
                            }
                            if (X && !F.flowing) F.once("drain", J);
                            else if (!K) J()
                        },
                        K = !0;
                    V.readdirCB(C, !0), K = !1
                }
            };
        return J(), F
    }
    streamSync(A = this.cwd, B = {}) {
        if (typeof A === "string") A = this.cwd.resolve(A);
        else if (!(A instanceof rJ)) B = A, A = this.cwd;
        let {
            withFileTypes: Q = !0,
            follow: Z = !1,
            filter: D,
            walkFilter: G
        } = B, F = new zg({
            objectMode: !0
        }), I = new Set;
        if (!D || D(A)) F.write(Q ? A : A.fullpath());
        let Y = [A],
            W = 0,
            J = () => {
                let X = !1;
                while (!X) {
                    let V = Y.shift();
                    if (!V) {
                        if (W === 0) F.end();
                        return
                    }
                    W++, I.add(V);
                    let C = V.readdirSync();
                    for (let K of C)
                        if (!D || D(K)) {
                            if (!F.write(Q ? K : K.fullpath())) X = !0
                        } W--;
                    for (let K of C) {
                        let H = K;
                        if (K.isSymbolicLink()) {
                            if (!(Z && (H = K.realpathSync()))) continue;
                            if (H.isUnknown()) H.lstatSync()
                        }
                        if (H.shouldWalk(I, G)) Y.push(H)
                    }
                }
                if (X && !F.flowing) F.once("drain", J)
            };
        return J(), F
    }
    chdir(A = this.cwd) {
        let B = this.cwd;
        this.cwd = typeof A === "string" ? this.cwd.resolve(A) : A, this.cwd[LxA](B)
    }
}
class Q61 extends v20 {
    sep = "\\";
    constructor(A = process.cwd(), B = {}) {
        let {
            nocase: Q = !0
        } = B;
        super(A, _20, "\\", {
            ...B,
            nocase: Q
        });
        this.nocase = Q;
        for (let Z = this.cwd; Z; Z = Z.parent) Z.nocase = this.nocase
    }
    parseRootPath(A) {
        return _20.parse(A).root.toUpperCase()
    }
    newRoot(A) {
        return new nw1(this.rootPath, ZL, void 0, this.roots, this.nocase, this.childrenCache(), {
            fs: A
        })
    }
    isAbsolute(A) {
        return A.startsWith("/") || A.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(A)
    }
}
class Z61 extends v20 {
    sep = "/";
    constructor(A = process.cwd(), B = {}) {
        let {
            nocase: Q = !1
        } = B;
        super(A, fgQ, "/", {
            ...B,
            nocase: Q
        });
        this.nocase = Q
    }
    parseRootPath(A) {
        return "/"
    }
    newRoot(A) {
        return new aw1(this.rootPath, ZL, void 0, this.roots, this.nocase, this.childrenCache(), {
            fs: A
        })
    }
    isAbsolute(A) {
        return A.startsWith("/")
    }
}
class sw1 extends Z61 {
    constructor(A = process.cwd(), B = {}) {
        let {
            nocase: Q = !0
        } = B;
        super(A, {
            ...B,
            nocase: Q
        })
    }
}
var E35 = process.platform === "win32" ? nw1 : aw1,
    MxA = process.platform === "win32" ? Q61 : process.platform === "darwin" ? sw1 : Z61;
var egQ = (A) => A.length >= 1,
    AuQ = (A) => A.length >= 1;
class $a {
    #A;
    #B;
    #Q;
    length;
    #Z;
    #D;
    #Y;
    #G;
    #J;
    #W;
    #X = !0;
    constructor(A, B, Q, Z) {
        if (!egQ(A)) throw new TypeError("empty pattern list");
        if (!AuQ(B)) throw new TypeError("empty glob list");
        if (B.length !== A.length) throw new TypeError("mismatched pattern list and glob list lengths");
        if (this.length = A.length, Q < 0 || Q >= this.length) throw new TypeError("index out of range");
        if (this.#A = A, this.#B = B, this.#Q = Q, this.#Z = Z, this.#Q === 0) {
            if (this.isUNC()) {
                let [D, G, F, I, ...Y] = this.#A, [W, J, X, V, ...C] = this.#B;
                if (Y[0] === "") Y.shift(), C.shift();
                let K = [D, G, F, I, ""].join("/"),
                    H = [W, J, X, V, ""].join("/");
                this.#A = [K, ...Y], this.#B = [H, ...C], this.length = this.#A.length
            } else if (this.isDrive() || this.isAbsolute()) {
                let [D, ...G] = this.#A, [F, ...I] = this.#B;
                if (G[0] === "") G.shift(), I.shift();
                let Y = D + "/",
                    W = F + "/";
                this.#A = [Y, ...G], this.#B = [W, ...I], this.length = this.#A.length
            }
        }
    }
    pattern() {
        return this.#A[this.#Q]
    }
    isString() {
        return typeof this.#A[this.#Q] === "string"
    }
    isGlobstar() {
        return this.#A[this.#Q] === OY
    }
    isRegExp() {
        return this.#A[this.#Q] instanceof RegExp
    }
    globString() {
        return this.#Y = this.#Y || (this.#Q === 0 ? this.isAbsolute() ? this.#B[0] + this.#B.slice(1).join("/") : this.#B.join("/") : this.#B.slice(this.#Q).join("/"))
    }
    hasMore() {
        return this.length > this.#Q + 1
    }
    rest() {
        if (this.#D !== void 0) return this.#D;
        if (!this.hasMore()) return this.#D = null;
        return this.#D = new $a(this.#A, this.#B, this.#Q + 1, this.#Z), this.#D.#W = this.#W, this.#D.#J = this.#J, this.#D.#G = this.#G, this.#D
    }
    isUNC() {
        let A = this.#A;
        return this.#J !== void 0 ? this.#J : this.#J = this.#Z === "win32" && this.#Q === 0 && A[0] === "" && A[1] === "" && typeof A[2] === "string" && !!A[2] && typeof A[3] === "string" && !!A[3]
    }
    isDrive() {
        let A = this.#A;
        return this.#G !== void 0 ? this.#G : this.#G = this.#Z === "win32" && this.#Q === 0 && this.length > 1 && typeof A[0] === "string" && /^[a-z]:$/i.test(A[0])
    }
    isAbsolute() {
        let A = this.#A;
        return this.#W !== void 0 ? this.#W : this.#W = A[0] === "" && A.length > 1 || this.isDrive() || this.isUNC()
    }
    root() {
        let A = this.#A[0];
        return typeof A === "string" && this.isAbsolute() && this.#Q === 0 ? A : ""
    }
    checkFollowGlobstar() {
        return !(this.#Q === 0 || !this.isGlobstar() || !this.#X)
    }
    markFollowGlobstar() {
        if (this.#Q === 0 || !this.isGlobstar() || !this.#X) return !1;
        return this.#X = !1, !0
    }
}
var BuQ = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class D61 {
    relative;
    relativeChildren;
    absolute;
    absoluteChildren;
    platform;
    mmopts;
    constructor(A, {
        nobrace: B,
        nocase: Q,
        noext: Z,
        noglobstar: D,
        platform: G = BuQ
    }) {
        this.relative = [], this.absolute = [], this.relativeChildren = [], this.absoluteChildren = [], this.platform = G, this.mmopts = {
            dot: !0,
            nobrace: B,
            nocase: Q,
            noext: Z,
            noglobstar: D,
            optimizationLevel: 2,
            platform: G,
            nocomment: !0,
            nonegate: !0
        };
        for (let F of A) this.add(F)
    }
    add(A) {
        let B = new jz(A, this.mmopts);
        for (let Q = 0; Q < B.set.length; Q++) {
            let Z = B.set[Q],
                D = B.globParts[Q];
            if (!Z || !D) throw new Error("invalid pattern object");
            while (Z[0] === "." && D[0] === ".") Z.shift(), D.shift();
            let G = new $a(Z, D, 0, this.platform),
                F = new jz(G.globString(), this.mmopts),
                I = D[D.length - 1] === "**",
                Y = G.isAbsolute();
            if (Y) this.absolute.push(F);
            else this.relative.push(F);
            if (I)
                if (Y) this.absoluteChildren.push(F);
                else this.relativeChildren.push(F)
        }
    }
    ignored(A) {
        let B = A.fullpath(),
            Q = `${B}/`,
            Z = A.relative() || ".",
            D = `${Z}/`;
        for (let G of this.relative)
            if (G.match(Z) || G.match(D)) return !0;
        for (let G of this.absolute)
            if (G.match(B) || G.match(Q)) return !0;
        return !1
    }
    childrenIgnored(A) {
        let B = A.fullpath() + "/",
            Q = (A.relative() || ".") + "/";
        for (let Z of this.relativeChildren)
            if (Z.match(Q)) return !0;
        for (let Z of this.absoluteChildren)
            if (Z.match(B)) return !0;
        return !1
    }
}
class b20 {
    store;
    constructor(A = new Map) {
        this.store = A
    }
    copy() {
        return new b20(new Map(this.store))
    }
    hasWalked(A, B) {
        return this.store.get(A.fullpath())?.has(B.globString())
    }
    storeWalked(A, B) {
        let Q = A.fullpath(),
            Z = this.store.get(Q);
        if (Z) Z.add(B.globString());
        else this.store.set(Q, new Set([B.globString()]))
    }
}
class RxA {
    store = new Map;
    add(A, B, Q) {
        let Z = (B ? 2 : 0) | (Q ? 1 : 0),
            D = this.store.get(A);
        this.store.set(A, D === void 0 ? Z : Z & D)
    }
    entries() {
        return [...this.store.entries()].map(([A, B]) => [A, !!(B & 2), !!(B & 1)])
    }
}