/* chunk:508 bytes:[12076353, 12090838) size:14485 source:unpacked-cli.js */
class rJ {
    name;
    root;
    roots;
    parent;
    nocase;
    isCWD = !1;
    #A;
    #B;
    get dev() {
        return this.#B
    }
    #Q;
    get mode() {
        return this.#Q
    }
    #Z;
    get nlink() {
        return this.#Z
    }
    #D;
    get uid() {
        return this.#D
    }
    #Y;
    get gid() {
        return this.#Y
    }
    #G;
    get rdev() {
        return this.#G
    }
    #J;
    get blksize() {
        return this.#J
    }
    #W;
    get ino() {
        return this.#W
    }
    #X;
    get size() {
        return this.#X
    }
    #I;
    get blocks() {
        return this.#I
    }
    #E;
    get atimeMs() {
        return this.#E
    }
    #U;
    get mtimeMs() {
        return this.#U
    }
    #K;
    get ctimeMs() {
        return this.#K
    }
    #C;
    get birthtimeMs() {
        return this.#C
    }
    #L;
    get atime() {
        return this.#L
    }
    #z;
    get mtime() {
        return this.#z
    }
    #M;
    get ctime() {
        return this.#M
    }
    #R;
    get birthtime() {
        return this.#R
    }
    #$;
    #q;
    #N;
    #H;
    #S;
    #O;
    #F;
    #y;
    #w;
    #j;
    get parentPath() {
        return (this.parent || this).fullpath()
    }
    get path() {
        return this.parentPath
    }
    constructor(A, B = yz, Q, Z, D, G, F) {
        if (this.name = A, this.#$ = D ? pw1(A) : B61(A), this.#F = B & tgQ, this.nocase = D, this.roots = Z, this.root = Q || this, this.#y = G, this.#N = F.fullpath, this.#S = F.relative, this.#O = F.relativePosix, this.parent = F.parent, this.parent) this.#A = this.parent.#A;
        else this.#A = HxA(F.fs)
    }
    depth() {
        if (this.#q !== void 0) return this.#q;
        if (!this.parent) return this.#q = 0;
        return this.#q = this.parent.depth() + 1
    }
    childrenCache() {
        return this.#y
    }
    resolve(A) {
        if (!A) return this;
        let B = this.getRootString(A),
            Z = A.substring(B.length).split(this.splitSep);
        return B ? this.getRoot(B).#_(Z) : this.#_(Z)
    }
    #_(A) {
        let B = this;
        for (let Q of A) B = B.child(Q);
        return B
    }
    children() {
        let A = this.#y.get(this);
        if (A) return A;
        let B = Object.assign([], {
            provisional: 0
        });
        return this.#y.set(this, B), this.#F &= ~k20, B
    }
    child(A, B) {
        if (A === "" || A === ".") return this;
        if (A === "..") return this.parent || this;
        let Q = this.children(),
            Z = this.nocase ? pw1(A) : B61(A);
        for (let I of Q)
            if (I.#$ === Z) return I;
        let D = this.parent ? this.sep : "",
            G = this.#N ? this.#N + D + A : void 0,
            F = this.newChild(A, yz, {
                ...B,
                parent: this,
                fullpath: G
            });
        if (!this.canReaddir()) F.#F |= vw;
        return Q.push(F), F
    }
    relative() {
        if (this.isCWD) return "";
        if (this.#S !== void 0) return this.#S;
        let A = this.name,
            B = this.parent;
        if (!B) return this.#S = this.name;
        let Q = B.relative();
        return Q + (!Q || !B.parent ? "" : this.sep) + A
    }
    relativePosix() {
        if (this.sep === "/") return this.relative();
        if (this.isCWD) return "";
        if (this.#O !== void 0) return this.#O;
        let A = this.name,
            B = this.parent;
        if (!B) return this.#O = this.fullpathPosix();
        let Q = B.relativePosix();
        return Q + (!Q || !B.parent ? "" : "/") + A
    }
    fullpath() {
        if (this.#N !== void 0) return this.#N;
        let A = this.name,
            B = this.parent;
        if (!B) return this.#N = this.name;
        let Z = B.fullpath() + (!B.parent ? "" : this.sep) + A;
        return this.#N = Z
    }
    fullpathPosix() {
        if (this.#H !== void 0) return this.#H;
        if (this.sep === "/") return this.#H = this.fullpath();
        if (!this.parent) {
            let Z = this.fullpath().replace(/\\/g, "/");
            if (/^[a-z]:\//i.test(Z)) return this.#H = `//?/${Z}`;
            else return this.#H = Z
        }
        let A = this.parent,
            B = A.fullpathPosix(),
            Q = B + (!B || !A.parent ? "" : "/") + this.name;
        return this.#H = Q
    }
    isUnknown() {
        return (this.#F & kz) === yz
    }
    isType(A) {
        return this[`is${A}`]()
    }
    getType() {
        return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : this.isSocket() ? "Socket" : "Unknown"
    }
    isFile() {
        return (this.#F & kz) === $xA
    }
    isDirectory() {
        return (this.#F & kz) === ZL
    }
    isCharacterDevice() {
        return (this.#F & kz) === UxA
    }
    isBlockDevice() {
        return (this.#F & kz) === wxA
    }
    isFIFO() {
        return (this.#F & kz) === ExA
    }
    isSocket() {
        return (this.#F & kz) === qxA
    }
    isSymbolicLink() {
        return (this.#F & Eg) === Eg
    }
    lstatCached() {
        return this.#F & XxA ? this : void 0
    }
    readlinkCached() {
        return this.#w
    }
    realpathCached() {
        return this.#j
    }
    readdirCached() {
        let A = this.children();
        return A.slice(0, A.provisional)
    }
    canReadlink() {
        if (this.#w) return !0;
        if (!this.parent) return !1;
        let A = this.#F & kz;
        return !(A !== yz && A !== Eg || this.#F & lw1 || this.#F & vw)
    }
    calledReaddir() {
        return !!(this.#F & k20)
    }
    isENOENT() {
        return !!(this.#F & vw)
    }
    isNamed(A) {
        return !this.nocase ? this.#$ === B61(A) : this.#$ === pw1(A)
    }
    async readlink() {
        let A = this.#w;
        if (A) return A;
        if (!this.canReadlink()) return;
        if (!this.parent) return;
        try {
            let B = await this.#A.promises.readlink(this.fullpath()),
                Q = (await this.parent.realpath())?.resolve(B);
            if (Q) return this.#w = Q
        } catch (B) {
            this.#V(B.code);
            return
        }
    }
    readlinkSync() {
        let A = this.#w;
        if (A) return A;
        if (!this.canReadlink()) return;
        if (!this.parent) return;
        try {
            let B = this.#A.readlinkSync(this.fullpath()),
                Q = this.parent.realpathSync()?.resolve(B);
            if (Q) return this.#w = Q
        } catch (B) {
            this.#V(B.code);
            return
        }
    }
    #x(A) {
        this.#F |= k20;
        for (let B = A.provisional; B < A.length; B++) {
            let Q = A[B];
            if (Q) Q.#v()
        }
    }
    #v() {
        if (this.#F & vw) return;
        this.#F = (this.#F | vw) & t41, this.#T()
    }
    #T() {
        let A = this.children();
        A.provisional = 0;
        for (let B of A) B.#v()
    }
    #P() {
        this.#F |= iw1, this.#b()
    }
    #b() {
        if (this.#F & A61) return;
        let A = this.#F;
        if ((A & kz) === ZL) A &= t41;
        this.#F = A | A61, this.#T()
    }
    #f(A = "") {
        if (A === "ENOTDIR" || A === "EPERM") this.#b();
        else if (A === "ENOENT") this.#v();
        else this.children().provisional = 0
    }
    #h(A = "") {
        if (A === "ENOTDIR") this.parent.#b();
        else if (A === "ENOENT") this.#v()
    }
    #V(A = "") {
        let B = this.#F;
        if (B |= lw1, A === "ENOENT") B |= vw;
        if (A === "EINVAL" || A === "UNKNOWN") B &= t41;
        if (this.#F = B, A === "ENOTDIR" && this.parent) this.parent.#b()
    }
    #g(A, B) {
        return this.#k(A, B) || this.#u(A, B)
    }
    #u(A, B) {
        let Q = y20(A),
            Z = this.newChild(A.name, Q, {
                parent: this
            }),
            D = Z.#F & kz;
        if (D !== ZL && D !== Eg && D !== yz) Z.#F |= A61;
        return B.unshift(Z), B.provisional++, Z
    }
    #k(A, B) {
        for (let Q = B.provisional; Q < B.length; Q++) {
            let Z = B[Q];
            if ((this.nocase ? pw1(A.name) : B61(A.name)) !== Z.#$) continue;
            return this.#m(A, Z, Q, B)
        }
    }
    #m(A, B, Q, Z) {
        let D = B.name;
        if (B.#F = B.#F & t41 | y20(A), D !== A.name) B.name = A.name;
        if (Q !== Z.provisional) {
            if (Q === Z.length - 1) Z.pop();
            else Z.splice(Q, 1);
            Z.unshift(B)
        }
        return Z.provisional++, B
    }
    async lstat() {
        if ((this.#F & vw) === 0) try {
            return this.#p(await this.#A.promises.lstat(this.fullpath())), this
        } catch (A) {
            this.#h(A.code)
        }
    }
    lstatSync() {
        if ((this.#F & vw) === 0) try {
            return this.#p(this.#A.lstatSync(this.fullpath())), this
        } catch (A) {
            this.#h(A.code)
        }
    }
    #p(A) {
        let {
            atime: B,
            atimeMs: Q,
            birthtime: Z,
            birthtimeMs: D,
            blksize: G,
            blocks: F,
            ctime: I,
            ctimeMs: Y,
            dev: W,
            gid: J,
            ino: X,
            mode: V,
            mtime: C,
            mtimeMs: K,
            nlink: H,
            rdev: z,
            size: $,
            uid: L
        } = A;
        this.#L = B, this.#E = Q, this.#R = Z, this.#C = D, this.#J = G, this.#I = F, this.#M = I, this.#K = Y, this.#B = W, this.#Y = J, this.#W = X, this.#Q = V, this.#z = C, this.#U = K, this.#Z = H, this.#G = z, this.#X = $, this.#D = L;
        let N = y20(A);
        if (this.#F = this.#F & t41 | N | XxA, N !== yz && N !== ZL && N !== Eg) this.#F |= A61
    }
    #c = [];
    #l = !1;
    #i(A) {
        this.#l = !1;
        let B = this.#c.slice();
        this.#c.length = 0, B.forEach((Q) => Q(null, A))
    }
    readdirCB(A, B = !1) {
        if (!this.canReaddir()) {
            if (B) A(null, []);
            else queueMicrotask(() => A(null, []));
            return
        }
        let Q = this.children();
        if (this.calledReaddir()) {
            let D = Q.slice(0, Q.provisional);
            if (B) A(null, D);
            else queueMicrotask(() => A(null, D));
            return
        }
        if (this.#c.push(A), this.#l) return;
        this.#l = !0;
        let Z = this.fullpath();
        this.#A.readdir(Z, {
            withFileTypes: !0
        }, (D, G) => {
            if (D) this.#f(D.code), Q.provisional = 0;
            else {
                for (let F of G) this.#g(F, Q);
                this.#x(Q)
            }
            this.#i(Q.slice(0, Q.provisional));
            return
        })
    }
    #d;
    async readdir() {
        if (!this.canReaddir()) return [];
        let A = this.children();
        if (this.calledReaddir()) return A.slice(0, A.provisional);
        let B = this.fullpath();
        if (this.#d) await this.#d;
        else {
            let Q = () => {};
            this.#d = new Promise((Z) => Q = Z);
            try {
                for (let Z of await this.#A.promises.readdir(B, {
                        withFileTypes: !0
                    })) this.#g(Z, A);
                this.#x(A)
            } catch (Z) {
                this.#f(Z.code), A.provisional = 0
            }
            this.#d = void 0, Q()
        }
        return A.slice(0, A.provisional)
    }
    readdirSync() {
        if (!this.canReaddir()) return [];
        let A = this.children();
        if (this.calledReaddir()) return A.slice(0, A.provisional);
        let B = this.fullpath();
        try {
            for (let Q of this.#A.readdirSync(B, {
                    withFileTypes: !0
                })) this.#g(Q, A);
            this.#x(A)
        } catch (Q) {
            this.#f(Q.code), A.provisional = 0
        }
        return A.slice(0, A.provisional)
    }
    canReaddir() {
        if (this.#F & VxA) return !1;
        let A = kz & this.#F;
        if (!(A === yz || A === ZL || A === Eg)) return !1;
        return !0
    }
    shouldWalk(A, B) {
        return (this.#F & ZL) === ZL && !(this.#F & VxA) && !A.has(this) && (!B || B(this))
    }
    async realpath() {
        if (this.#j) return this.#j;
        if ((iw1 | lw1 | vw) & this.#F) return;
        try {
            let A = await this.#A.promises.realpath(this.fullpath());
            return this.#j = this.resolve(A)
        } catch (A) {
            this.#P()
        }
    }
    realpathSync() {
        if (this.#j) return this.#j;
        if ((iw1 | lw1 | vw) & this.#F) return;
        try {
            let A = this.#A.realpathSync(this.fullpath());
            return this.#j = this.resolve(A)
        } catch (A) {
            this.#P()
        }
    } [LxA](A) {
        if (A === this) return;
        A.isCWD = !1, this.isCWD = !0;
        let B = new Set([]),
            Q = [],
            Z = this;
        while (Z && Z.parent) B.add(Z), Z.#S = Q.join(this.sep), Z.#O = Q.join("/"), Z = Z.parent, Q.push("..");
        Z = A;
        while (Z && Z.parent && !B.has(Z)) Z.#S = void 0, Z.#O = void 0, Z = Z.parent
    }
}
class nw1 extends rJ {
    sep = "\\";
    splitSep = ogQ;
    constructor(A, B = yz, Q, Z, D, G, F) {
        super(A, B, Q, Z, D, G, F)
    }
    newChild(A, B = yz, Q = {}) {
        return new nw1(A, B, this.root, this.roots, this.nocase, this.childrenCache(), Q)
    }
    getRootString(A) {
        return _20.parse(A).root
    }
    getRoot(A) {
        if (A = rgQ(A.toUpperCase()), A === this.root.name) return this.root;
        for (let [B, Q] of Object.entries(this.roots))
            if (this.sameRoot(A, B)) return this.roots[A] = Q;
        return this.roots[A] = new Q61(A, this).root
    }
    sameRoot(A, B = this.root.name) {
        return A = A.toUpperCase().replace(/\//g, "\\").replace(zxA, "$1\\"), A === B
    }
}
class aw1 extends rJ {
    splitSep = "/";
    sep = "/";
    constructor(A, B = yz, Q, Z, D, G, F) {
        super(A, B, Q, Z, D, G, F)
    }
    getRootString(A) {
        return A.startsWith("/") ? "/" : ""
    }
    getRoot(A) {
        return this.root
    }
    newChild(A, B = yz, Q = {}) {
        return new aw1(A, B, this.root, this.roots, this.nocase, this.childrenCache(), Q)
    }
}