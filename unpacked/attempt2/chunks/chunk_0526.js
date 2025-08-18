/* chunk:526 bytes:[12406230, 12426088) size:19858 source:unpacked-cli.js */
var C02 = (A) => {
        let B = gq1(A).flat();
        if (!B.every((Q) => typeof Q === HF4)) throw new TypeError(`Non-string provided as watch path: ${B}`);
        return B.map(E02)
    },
    K02 = (A) => {
        let B = A.replace(zF4, n40),
            Q = !1;
        if (B.startsWith(CF4)) Q = !0;
        while (B.match(X02)) B = B.replace(X02, n40);
        if (Q) B = n40 + B;
        return B
    },
    E02 = (A) => K02(K6.normalize(K02(A))),
    H02 = (A = "") => (B) => {
        if (typeof B === "string") return E02(K6.isAbsolute(B) ? B : K6.join(A, B));
        else return B
    },
    NF4 = (A, B) => {
        if (K6.isAbsolute(A)) return A;
        return K6.join(B, A)
    },
    LF4 = Object.freeze(new Set);
class U02 {
    constructor(A, B) {
        this.path = A, this._removeWatcher = B, this.items = new Set
    }
    add(A) {
        let {
            items: B
        } = this;
        if (!B) return;
        if (A !== z02 && A !== KF4) B.add(A)
    }
    async remove(A) {
        let {
            items: B
        } = this;
        if (!B) return;
        if (B.delete(A), B.size > 0) return;
        let Q = this.path;
        try {
            await XF4(Q)
        } catch (Z) {
            if (this._removeWatcher) this._removeWatcher(K6.dirname(Q), K6.basename(Q))
        }
    }
    has(A) {
        let {
            items: B
        } = this;
        if (!B) return;
        return B.has(A)
    }
    getChildren() {
        let {
            items: A
        } = this;
        if (!A) return [];
        return [...A.values()]
    }
    dispose() {
        this.items.clear(), this.path = "", this._removeWatcher = fq1, this.items = LF4, Object.freeze(this)
    }
}
var MF4 = "stat",
    RF4 = "lstat";
class w02 {
    constructor(A, B, Q) {
        this.fsw = Q;
        let Z = A;
        this.path = A = A.replace(UF4, ""), this.watchPath = Z, this.fullWatchPath = K6.resolve(Z), this.dirParts = [], this.dirParts.forEach((D) => {
            if (D.length > 1) D.pop()
        }), this.followSymlinks = B, this.statMethod = B ? MF4 : RF4
    }
    entryPath(A) {
        return K6.join(this.watchPath, K6.relative(this.watchPath, A.fullPath))
    }
    filterPath(A) {
        let {
            stats: B
        } = A;
        if (B && B.isSymbolicLink()) return this.filterDir(A);
        let Q = this.entryPath(A);
        return this.fsw._isntIgnored(Q, B) && this.fsw._hasReadPermissions(B)
    }
    filterDir(A) {
        return this.fsw._isntIgnored(this.entryPath(A), A.stats)
    }
}
class s40 extends VF4 {
    constructor(A = {}) {
        super();
        this.closed = !1, this._closers = new Map, this._ignoredPaths = new Set, this._throttled = new Map, this._streams = new Set, this._symlinkPaths = new Map, this._watched = new Map, this._pendingWrites = new Map, this._pendingUnlinks = new Map, this._readyCount = 0, this._readyEmitted = !1;
        let B = A.awaitWriteFinish,
            Q = {
                stabilityThreshold: 2000,
                pollInterval: 100
            },
            Z = {
                persistent: !0,
                ignoreInitial: !1,
                ignorePermissionErrors: !1,
                interval: 100,
                binaryInterval: 300,
                followSymlinks: !0,
                usePolling: !1,
                atomic: !0,
                ...A,
                ignored: A.ignored ? gq1(A.ignored) : gq1([]),
                awaitWriteFinish: B === !0 ? Q : typeof B === "object" ? {
                    ...Q,
                    ...B
                } : !1
            };
        if (W02) Z.usePolling = !0;
        if (Z.atomic === void 0) Z.atomic = !Z.usePolling;
        let D = process.env.CHOKIDAR_USEPOLLING;
        if (D !== void 0) {
            let I = D.toLowerCase();
            if (I === "false" || I === "0") Z.usePolling = !1;
            else if (I === "true" || I === "1") Z.usePolling = !0;
            else Z.usePolling = !!I
        }
        let G = process.env.CHOKIDAR_INTERVAL;
        if (G) Z.interval = Number.parseInt(G, 10);
        let F = 0;
        this._emitReady = () => {
            if (F++, F >= this._readyCount) this._emitReady = fq1, this._readyEmitted = !0, process.nextTick(() => this.emit(P7.READY))
        }, this._emitRaw = (...I) => this.emit(P7.RAW, ...I), this._boundRemove = this._remove.bind(this), this.options = Z, this._nodeFsHandler = new i40(this), Object.freeze(Z)
    }
    _addIgnoredPath(A) {
        if (a40(A)) {
            for (let B of this._ignoredPaths)
                if (a40(B) && B.path === A.path && B.recursive === A.recursive) return
        }
        this._ignoredPaths.add(A)
    }
    _removeIgnoredPath(A) {
        if (this._ignoredPaths.delete(A), typeof A === "string") {
            for (let B of this._ignoredPaths)
                if (a40(B) && B.path === A) this._ignoredPaths.delete(B)
        }
    }
    add(A, B, Q) {
        let {
            cwd: Z
        } = this.options;
        this.closed = !1, this._closePromise = void 0;
        let D = C02(A);
        if (Z) D = D.map((G) => {
            return NF4(G, Z)
        });
        if (D.forEach((G) => {
                this._removeIgnoredPath(G)
            }), this._userIgnored = void 0, !this._readyCount) this._readyCount = 0;
        return this._readyCount += D.length, Promise.all(D.map(async (G) => {
            let F = await this._nodeFsHandler._addToNodeFs(G, !Q, void 0, 0, B);
            if (F) this._emitReady();
            return F
        })).then((G) => {
            if (this.closed) return;
            G.forEach((F) => {
                if (F) this.add(K6.dirname(F), K6.basename(B || F))
            })
        }), this
    }
    unwatch(A) {
        if (this.closed) return this;
        let B = C02(A),
            {
                cwd: Q
            } = this.options;
        return B.forEach((Z) => {
            if (!K6.isAbsolute(Z) && !this._closers.has(Z)) {
                if (Q) Z = K6.join(Q, Z);
                Z = K6.resolve(Z)
            }
            if (this._closePath(Z), this._addIgnoredPath(Z), this._watched.has(Z)) this._addIgnoredPath({
                path: Z,
                recursive: !0
            });
            this._userIgnored = void 0
        }), this
    }
    close() {
        if (this._closePromise) return this._closePromise;
        this.closed = !0, this.removeAllListeners();
        let A = [];
        return this._closers.forEach((B) => B.forEach((Q) => {
            let Z = Q();
            if (Z instanceof Promise) A.push(Z)
        })), this._streams.forEach((B) => B.destroy()), this._userIgnored = void 0, this._readyCount = 0, this._readyEmitted = !1, this._watched.forEach((B) => B.dispose()), this._closers.clear(), this._watched.clear(), this._streams.clear(), this._symlinkPaths.clear(), this._throttled.clear(), this._closePromise = A.length ? Promise.all(A).then(() => {
            return
        }) : Promise.resolve(), this._closePromise
    }
    getWatched() {
        let A = {};
        return this._watched.forEach((B, Q) => {
            let D = (this.options.cwd ? K6.relative(this.options.cwd, Q) : Q) || z02;
            A[D] = B.getChildren().sort()
        }), A
    }
    emitWithAll(A, B) {
        if (this.emit(A, ...B), A !== P7.ERROR) this.emit(P7.ALL, A, ...B)
    }
    async _emit(A, B, Q) {
        if (this.closed) return;
        let Z = this.options;
        if (p40) B = K6.normalize(B);
        if (Z.cwd) B = K6.relative(Z.cwd, B);
        let D = [B];
        if (Q != null) D.push(Q);
        let G = Z.awaitWriteFinish,
            F;
        if (G && (F = this._pendingWrites.get(B))) return F.lastChange = new Date, this;
        if (Z.atomic) {
            if (A === P7.UNLINK) return this._pendingUnlinks.set(B, [A, ...D]), setTimeout(() => {
                this._pendingUnlinks.forEach((I, Y) => {
                    this.emit(...I), this.emit(P7.ALL, ...I), this._pendingUnlinks.delete(Y)
                })
            }, typeof Z.atomic === "number" ? Z.atomic : 100), this;
            if (A === P7.ADD && this._pendingUnlinks.has(B)) A = P7.CHANGE, this._pendingUnlinks.delete(B)
        }
        if (G && (A === P7.ADD || A === P7.CHANGE) && this._readyEmitted) {
            let I = (Y, W) => {
                if (Y) A = P7.ERROR, D[0] = Y, this.emitWithAll(A, D);
                else if (W) {
                    if (D.length > 1) D[1] = W;
                    else D.push(W);
                    this.emitWithAll(A, D)
                }
            };
            return this._awaitWriteFinish(B, G.stabilityThreshold, A, I), this
        }
        if (A === P7.CHANGE) {
            if (!this._throttle(P7.CHANGE, B, 50)) return this
        }
        if (Z.alwaysStat && Q === void 0 && (A === P7.ADD || A === P7.ADD_DIR || A === P7.CHANGE)) {
            let I = Z.cwd ? K6.join(Z.cwd, B) : B,
                Y;
            try {
                Y = await JF4(I)
            } catch (W) {}
            if (!Y || this.closed) return;
            D.push(Y)
        }
        return this.emitWithAll(A, D), this
    }
    _handleError(A) {
        let B = A && A.code;
        if (A && B !== "ENOENT" && B !== "ENOTDIR" && (!this.options.ignorePermissionErrors || B !== "EPERM" && B !== "EACCES")) this.emit(P7.ERROR, A);
        return A || this.closed
    }
    _throttle(A, B, Q) {
        if (!this._throttled.has(A)) this._throttled.set(A, new Map);
        let Z = this._throttled.get(A);
        if (!Z) throw new Error("invalid throttle");
        let D = Z.get(B);
        if (D) return D.count++, !1;
        let G, F = () => {
            let Y = Z.get(B),
                W = Y ? Y.count : 0;
            if (Z.delete(B), clearTimeout(G), Y) clearTimeout(Y.timeoutObject);
            return W
        };
        G = setTimeout(F, Q);
        let I = {
            timeoutObject: G,
            clear: F,
            count: 0
        };
        return Z.set(B, I), I
    }
    _incrReadyCount() {
        return this._readyCount++
    }
    _awaitWriteFinish(A, B, Q, Z) {
        let D = this.options.awaitWriteFinish;
        if (typeof D !== "object") return;
        let G = D.pollInterval,
            F, I = A;
        if (this.options.cwd && !K6.isAbsolute(A)) I = K6.join(this.options.cwd, A);
        let Y = new Date,
            W = this._pendingWrites;

        function J(X) {
            WF4(I, (V, C) => {
                if (V || !W.has(A)) {
                    if (V && V.code !== "ENOENT") Z(V);
                    return
                }
                let K = Number(new Date);
                if (X && C.size !== X.size) W.get(A).lastChange = K;
                let H = W.get(A);
                if (K - H.lastChange >= B) W.delete(A), Z(void 0, C);
                else F = setTimeout(J, G, C)
            })
        }
        if (!W.has(A)) W.set(A, {
            lastChange: Y,
            cancelWait: () => {
                return W.delete(A), clearTimeout(F), Q
            }
        }), F = setTimeout(J, G)
    }
    _isIgnored(A, B) {
        if (this.options.atomic && EF4.test(A)) return !0;
        if (!this._userIgnored) {
            let {
                cwd: Q
            } = this.options, D = (this.options.ignored || []).map(H02(Q)), F = [...[...this._ignoredPaths].map(H02(Q)), ...D];
            this._userIgnored = qF4(F, void 0)
        }
        return this._userIgnored(A, B)
    }
    _isntIgnored(A, B) {
        return !this._isIgnored(A, B)
    }
    _getWatchHelpers(A) {
        return new w02(A, this.options.followSymlinks, this)
    }
    _getWatchedDir(A) {
        let B = K6.resolve(A);
        if (!this._watched.has(B)) this._watched.set(B, new U02(B, this._boundRemove));
        return this._watched.get(B)
    }
    _hasReadPermissions(A) {
        if (this.options.ignorePermissionErrors) return !0;
        return Boolean(Number(A.mode) & 256)
    }
    _remove(A, B, Q) {
        let Z = K6.join(A, B),
            D = K6.resolve(Z);
        if (Q = Q != null ? Q : this._watched.has(Z) || this._watched.has(D), !this._throttle("remove", Z, 100)) return;
        if (!Q && this._watched.size === 1) this.add(A, B, !0);
        this._getWatchedDir(Z).getChildren().forEach((X) => this._remove(Z, X));
        let I = this._getWatchedDir(A),
            Y = I.has(B);
        if (I.remove(B), this._symlinkPaths.has(D)) this._symlinkPaths.delete(D);
        let W = Z;
        if (this.options.cwd) W = K6.relative(this.options.cwd, Z);
        if (this.options.awaitWriteFinish && this._pendingWrites.has(W)) {
            if (this._pendingWrites.get(W).cancelWait() === P7.ADD) return
        }
        this._watched.delete(Z), this._watched.delete(D);
        let J = Q ? P7.UNLINK_DIR : P7.UNLINK;
        if (Y && !this._isIgnored(Z)) this._emit(J, Z);
        this._closePath(Z)
    }
    _closePath(A) {
        this._closeFile(A);
        let B = K6.dirname(A);
        this._getWatchedDir(B).remove(K6.basename(A))
    }
    _closeFile(A) {
        let B = this._closers.get(A);
        if (!B) return;
        B.forEach((Q) => Q()), this._closers.delete(A)
    }
    _addPathCloser(A, B) {
        if (!B) return;
        let Q = this._closers.get(A);
        if (!Q) Q = [], this._closers.set(A, Q);
        Q.push(B)
    }
    _readdirp(A, B) {
        if (this.closed) return;
        let Q = {
                type: P7.ALL,
                alwaysStat: !0,
                lstat: !0,
                ...B,
                depth: 0
            },
            Z = D02(A, Q);
        return this._streams.add(Z), Z.once(Y02, () => {
            Z = void 0
        }), Z.once(l40, () => {
            if (Z) this._streams.delete(Z), Z = void 0
        }), Z
    }
}

function OF4(A, B = {}) {
    let Q = new s40(B);
    return Q.add(A), Q
}
var $02 = {
    watch: OF4,
    FSWatcher: s40
};
import * as N02 from "path";
var TF4 = 1000,
    PF4 = 500,
    SF4 = 5000,
    ls = null,
    q02 = !1,
    L02 = !1,
    uq1 = new Map,
    B81 = new Set;

function jF4() {
    if (q02 || L02) return;
    q02 = !0;
    let A = xF4();
    if (A.length === 0) return;
    n1(`Watching for changes in setting files ${A.join(", ")}...`), ls = $02.watch(A, {
        persistent: !0,
        ignoreInitial: !0,
        awaitWriteFinish: {
            stabilityThreshold: TF4,
            pollInterval: PF4
        },
        ignored: (B) => B.split(N02.sep).some((Q) => Q === ".git"),
        ignorePermissionErrors: !0,
        usePolling: !1,
        atomic: !0
    }), ls.on("change", vF4), ls.on("unlink", bF4)
}

function kF4() {
    if (L02 = !0, ls) ls.close(), ls = null;
    uq1.clear(), B81.clear()
}

function yF4(A) {
    return B81.add(A), () => {
        B81.delete(A)
    }
}

function _F4(A) {
    let B = RT(A);
    if (B) uq1.set(B, Date.now())
}

function xF4() {
    let A = j1();
    return uw.map((B) => {
        let Q = RT(B);
        if (!Q) return;
        try {
            if (!A.statSync(Q).isFile()) return
        } catch {
            return
        }
        return Q
    }).filter((B) => B !== void 0)
}

function vF4(A) {
    let B = M02(A);
    if (!B) return;
    let Q = uq1.get(A);
    if (Q && Date.now() - Q < SF4) {
        uq1.delete(A);
        return
    }
    n1(`Detected change to ${A}`), B81.forEach((Z) => Z(B))
}

function bF4(A) {
    let B = M02(A);
    if (!B) return;
    n1(`Detected deletion of ${A}`), B81.forEach((Q) => Q(B))
}

function M02(A) {
    return uw.find((B) => RT(B) === A)
}
var mq1 = {
    initialize: jF4,
    dispose: kF4,
    subscribe: yF4,
    markInternalWrite: _F4
};
var Z81 = null;

function mg() {
    switch (L9()) {
        case "macos":
            return "/Library/Application Support/ClaudeCode";
        case "windows":
            return "C:\\ProgramData\\ClaudeCode";
        default:
            return "/etc/claude-code"
    }
}

function fF4() {
    return D81(mg(), "managed-settings.json")
}

function hF4(A) {
    if (A.length === 0) return "unknown";
    let B = A[0];
    if (!B) return "unknown";
    if (B.path.length > 0) return B.path.join(".");
    return "unknown"
}

function gF4(A, B) {
    let Q = new Error("Invalid settings"),
        Z = hF4(B.issues);
    O02.withScope((D) => {
        if (A) D.setTag("settings_source", i61(A));
        D.setTag("invalid_key", Z), D.setContext("validation_error", {
            errorMessage: B.message,
            issues: B.issues
        }), R1(Q)
    }), n1(`Invalid settings in ${A||"unknown"} source - key: ${Z}, error: ${B.message}`)
}

function uF4(A, B) {
    if (typeof A === "object" && A && "code" in A && A.code === "ENOENT") n1(`Broken symlink or missing file encountered for settings.json at path: ${B}`);
    else R1(A instanceof Error ? A : new Error(String(A)))
}

function T02(A, B) {
    let Q = j1();
    if (!Q.existsSync(A)) return {
        settings: null,
        errors: []
    };
    try {
        let {
            resolvedPath: Z
        } = XV(Q, A), D = AX(Z);
        if (D.trim() === "") return {
            settings: {},
            errors: []
        };
        let G = T7(D),
            F = us.safeParse(G);
        if (!F.success) return gF4(B, F.error), {
            settings: null,
            errors: v40(F.error, A)
        };
        return {
            settings: F.data,
            errors: []
        }
    } catch (Z) {
        return uF4(Z, A), {
            settings: null,
            errors: []
        }
    }
}

function Rq1(A) {
    switch (A) {
        case "userSettings":
            return Q81(e9());
        case "policySettings":
        case "projectSettings":
        case "localSettings":
            return Q81(_9());
        case "flagSettings": {
            let B = Lm1();
            return B ? R02(Q81(B)) : Q81(_9())
        }
    }
}

function RT(A) {
    switch (A) {
        case "userSettings":
            return D81(Rq1(A), "settings.json");
        case "projectSettings":
        case "localSettings":
            return D81(Rq1(A), G81(A));
        case "policySettings":
            return fF4();
        case "flagSettings":
            return Lm1()
    }
}

function G81(A) {
    switch (A) {
        case "projectSettings":
            return D81(".claude", "settings.json");
        case "localSettings":
            return D81(".claude", "settings.local.json")
    }
}

function _Y(A) {
    let B = RT(A);
    if (!B) return null;
    let {
        settings: Q
    } = T02(B, A);
    return Q
}

function y6(A, B) {
    if (A === "policySettings" || A === "flagSettings") return {
        error: null
    };
    let Q = RT(A);
    if (!Q) return {
        error: null
    };
    try {
        let Z = R02(Q);
        if (!j1().existsSync(Z)) j1().mkdirSync(Z);
        let D = _Y(A);
        if (!D && j1().existsSync(Q)) {
            let F = AX(Q),
                I = T7(F);
            if (I === null) return {
                error: new Error(`Invalid JSON syntax in settings file at ${Q}`)
            };
            if (I && typeof I === "object") D = I, n1(`Using raw settings from ${Q} due to validation failure`)
        }
        let G = _W1(D || {}, B, (F, I, Y, W) => {
            if (I === void 0 && W && typeof Y === "string") {
                delete W[Y];
                return
            }
            if (Array.isArray(I)) return I;
            return
        });
        if (mq1.markInternalWrite(A), wL(Q, JSON.stringify(G, null, 2)), F81(), A === "localSettings") ms(G81("localSettings"), _9())
    } catch (Z) {
        let D = new Error(`Failed to read raw settings from ${Q}: ${Z}`);
        return R1(D), {
            error: D
        }
    }
    return {
        error: null
    }
}

function mF4(A, B) {
    let Q = [...A, ...B];
    return Array.from(new Set(Q))
}

function F81() {
    Z81 = null
}