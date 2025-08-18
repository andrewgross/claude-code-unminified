/* chunk:525 bytes:[12386600, 12406229) size:19629 source:unpacked-cli.js */
class Z02 extends fG4 {
    constructor(A = {}) {
        super({
            objectMode: !0,
            autoDestroy: !0,
            highWaterMark: A.highWaterMark
        });
        let B = {
                ...u40,
                ...A
            },
            {
                root: Q,
                type: Z
            } = B;
        this._fileFilter = B02(B.fileFilter), this._directoryFilter = B02(B.directoryFilter);
        let D = B.lstat ? o12 : xG4;
        if (pG4) this._stat = (G) => D(G, {
            bigint: !0
        });
        else this._stat = D;
        this._maxDepth = B.depth ?? u40.depth, this._wantsDir = Z ? dG4.has(Z) : !1, this._wantsFile = Z ? cG4.has(Z) : !1, this._wantsEverything = Z === UK.EVERYTHING_TYPE, this._root = t12(Q), this._isDirent = !B.alwaysStat, this._statsProp = this._isDirent ? "dirent" : "stats", this._rdOptions = {
            encoding: "utf8",
            withFileTypes: this._isDirent
        }, this.parents = [this._exploreDir(Q, 1)], this.reading = !1, this.parent = void 0
    }
    async _read(A) {
        if (this.reading) return;
        this.reading = !0;
        try {
            while (!this.destroyed && A > 0) {
                let B = this.parent,
                    Q = B && B.files;
                if (Q && Q.length > 0) {
                    let {
                        path: Z,
                        depth: D
                    } = B, G = Q.splice(0, A).map((I) => this._formatEntry(I, Z)), F = await Promise.all(G);
                    for (let I of F) {
                        if (!I) continue;
                        if (this.destroyed) return;
                        let Y = await this._getEntryType(I);
                        if (Y === "directory" && this._directoryFilter(I)) {
                            if (D <= this._maxDepth) this.parents.push(this._exploreDir(I.fullPath, D + 1));
                            if (this._wantsDir) this.push(I), A--
                        } else if ((Y === "file" || this._includeAsFile(I)) && this._fileFilter(I)) {
                            if (this._wantsFile) this.push(I), A--
                        }
                    }
                } else {
                    let Z = this.parents.pop();
                    if (!Z) {
                        this.push(null);
                        break
                    }
                    if (this.parent = await Z, this.destroyed) return
                }
            }
        } catch (B) {
            this.destroy(B)
        } finally {
            this.reading = !1
        }
    }
    async _exploreDir(A, B) {
        let Q;
        try {
            Q = await vG4(A, this._rdOptions)
        } catch (Z) {
            this._onError(Z)
        }
        return {
            files: Q,
            depth: B,
            path: A
        }
    }
    async _formatEntry(A, B) {
        let Q, Z = this._isDirent ? A.name : A;
        try {
            let D = t12(gG4(B, Z));
            Q = {
                path: hG4(this._root, D),
                fullPath: D,
                basename: Z
            }, Q[this._statsProp] = this._isDirent ? A : await this._stat(D)
        } catch (D) {
            this._onError(D);
            return
        }
        return Q
    }
    _onError(A) {
        if (lG4(A) && !this.destroyed) this.emit("warn", A);
        else this.destroy(A)
    }
    async _getEntryType(A) {
        if (!A && this._statsProp in A) return "";
        let B = A[this._statsProp];
        if (B.isFile()) return "file";
        if (B.isDirectory()) return "directory";
        if (B && B.isSymbolicLink()) {
            let Q = A.fullPath;
            try {
                let Z = await bG4(Q),
                    D = await o12(Z);
                if (D.isFile()) return "file";
                if (D.isDirectory()) {
                    let G = Z.length;
                    if (Q.startsWith(Z) && Q.substr(G, 1) === uG4) {
                        let F = new Error(`Circular symlink detected: "${Q}" points to "${Z}"`);
                        return F.code = Q02, this._onError(F)
                    }
                    return "directory"
                }
            } catch (Z) {
                return this._onError(Z), ""
            }
        }
    }
    _includeAsFile(A) {
        let B = A && A[this._statsProp];
        return B && this._wantsEverything && !B.isDirectory()
    }
}

function D02(A, B = {}) {
    let Q = B.entryType || B.type;
    if (Q === "both") Q = UK.FILE_DIR_TYPE;
    if (Q) B.type = Q;
    if (!A) throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
    else if (typeof A !== "string") throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
    else if (Q && !e12.includes(Q)) throw new Error(`readdirp: Invalid type passed. Use one of ${e12.join(", ")}`);
    return B.root = A, new Z02(B)
}
import {
    watchFile as iG4,
    unwatchFile as G02,
    watch as nG4
} from "fs";
import {
    open as aG4,
    stat as I02,
    lstat as sG4,
    realpath as m40
} from "fs/promises";
import * as HZ from "path";
import {
    type as rG4
} from "os";
var oG4 = "data",
    l40 = "end",
    Y02 = "close",
    fq1 = () => {};
var hq1 = process.platform,
    p40 = hq1 === "win32",
    tG4 = hq1 === "darwin",
    eG4 = hq1 === "linux",
    AF4 = hq1 === "freebsd",
    W02 = rG4() === "OS400",
    P7 = {
        ALL: "all",
        READY: "ready",
        ADD: "add",
        CHANGE: "change",
        ADD_DIR: "addDir",
        UNLINK: "unlink",
        UNLINK_DIR: "unlinkDir",
        RAW: "raw",
        ERROR: "error"
    },
    sw = P7,
    BF4 = "watch",
    QF4 = {
        lstat: sG4,
        stat: I02
    },
    ug = "listeners",
    xq1 = "errHandlers",
    cs = "rawEmitters",
    ZF4 = [ug, xq1, cs],
    DF4 = new Set(["3dm", "3ds", "3g2", "3gp", "7z", "a", "aac", "adp", "afdesign", "afphoto", "afpub", "ai", "aif", "aiff", "alz", "ape", "apk", "appimage", "ar", "arj", "asf", "au", "avi", "bak", "baml", "bh", "bin", "bk", "bmp", "btif", "bz2", "bzip2", "cab", "caf", "cgm", "class", "cmx", "cpio", "cr2", "cur", "dat", "dcm", "deb", "dex", "djvu", "dll", "dmg", "dng", "doc", "docm", "docx", "dot", "dotm", "dra", "DS_Store", "dsk", "dts", "dtshd", "dvb", "dwg", "dxf", "ecelp4800", "ecelp7470", "ecelp9600", "egg", "eol", "eot", "epub", "exe", "f4v", "fbs", "fh", "fla", "flac", "flatpak", "fli", "flv", "fpx", "fst", "fvt", "g3", "gh", "gif", "graffle", "gz", "gzip", "h261", "h263", "h264", "icns", "ico", "ief", "img", "ipa", "iso", "jar", "jpeg", "jpg", "jpgv", "jpm", "jxr", "key", "ktx", "lha", "lib", "lvp", "lz", "lzh", "lzma", "lzo", "m3u", "m4a", "m4v", "mar", "mdi", "mht", "mid", "midi", "mj2", "mka", "mkv", "mmr", "mng", "mobi", "mov", "movie", "mp3", "mp4", "mp4a", "mpeg", "mpg", "mpga", "mxu", "nef", "npx", "numbers", "nupkg", "o", "odp", "ods", "odt", "oga", "ogg", "ogv", "otf", "ott", "pages", "pbm", "pcx", "pdb", "pdf", "pea", "pgm", "pic", "png", "pnm", "pot", "potm", "potx", "ppa", "ppam", "ppm", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx", "psd", "pya", "pyc", "pyo", "pyv", "qt", "rar", "ras", "raw", "resources", "rgb", "rip", "rlc", "rmf", "rmvb", "rpm", "rtf", "rz", "s3m", "s7z", "scpt", "sgi", "shar", "snap", "sil", "sketch", "slk", "smv", "snk", "so", "stl", "suo", "sub", "swf", "tar", "tbz", "tbz2", "tga", "tgz", "thmx", "tif", "tiff", "tlz", "ttc", "ttf", "txz", "udf", "uvh", "uvi", "uvm", "uvp", "uvs", "uvu", "viv", "vob", "war", "wav", "wax", "wbmp", "wdp", "weba", "webm", "webp", "whl", "wim", "wm", "wma", "wmv", "wmx", "woff", "woff2", "wrm", "wvx", "xbm", "xif", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsx", "xlt", "xltm", "xltx", "xm", "xmind", "xpi", "xpm", "xwd", "xz", "z", "zip", "zipx"]),
    GF4 = (A) => DF4.has(HZ.extname(A).slice(1).toLowerCase()),
    c40 = (A, B) => {
        if (A instanceof Set) A.forEach(B);
        else B(A)
    },
    e61 = (A, B, Q) => {
        let Z = A[B];
        if (!(Z instanceof Set)) A[B] = Z = new Set([Z]);
        Z.add(Q)
    },
    FF4 = (A) => (B) => {
        let Q = A[B];
        if (Q instanceof Set) Q.clear();
        else delete A[B]
    },
    A81 = (A, B, Q) => {
        let Z = A[B];
        if (Z instanceof Set) Z.delete(Q);
        else if (Z === Q) delete A[B]
    },
    J02 = (A) => A instanceof Set ? A.size === 0 : !A,
    vq1 = new Map;

function F02(A, B, Q, Z, D) {
    let G = (F, I) => {
        if (Q(A), D(F, I, {
                watchedPath: A
            }), I && A !== I) bq1(HZ.resolve(A, I), ug, HZ.join(A, I))
    };
    try {
        return nG4(A, {
            persistent: B.persistent
        }, G)
    } catch (F) {
        Z(F);
        return
    }
}
var bq1 = (A, B, Q, Z, D) => {
        let G = vq1.get(A);
        if (!G) return;
        c40(G[B], (F) => {
            F(Q, Z, D)
        })
    },
    IF4 = (A, B, Q, Z) => {
        let {
            listener: D,
            errHandler: G,
            rawEmitter: F
        } = Z, I = vq1.get(B), Y;
        if (!Q.persistent) {
            if (Y = F02(A, Q, D, G, F), !Y) return;
            return Y.close.bind(Y)
        }
        if (I) e61(I, ug, D), e61(I, xq1, G), e61(I, cs, F);
        else {
            if (Y = F02(A, Q, bq1.bind(null, B, ug), G, bq1.bind(null, B, cs)), !Y) return;
            Y.on(sw.ERROR, async (W) => {
                let J = bq1.bind(null, B, xq1);
                if (I) I.watcherUnusable = !0;
                if (p40 && W.code === "EPERM") try {
                    await (await aG4(A, "r")).close(), J(W)
                } catch (X) {} else J(W)
            }), I = {
                listeners: D,
                errHandlers: G,
                rawEmitters: F,
                watcher: Y
            }, vq1.set(B, I)
        }
        return () => {
            if (A81(I, ug, D), A81(I, xq1, G), A81(I, cs, F), J02(I.listeners)) I.watcher.close(), vq1.delete(B), ZF4.forEach(FF4(I)), I.watcher = void 0, Object.freeze(I)
        }
    },
    d40 = new Map,
    YF4 = (A, B, Q, Z) => {
        let {
            listener: D,
            rawEmitter: G
        } = Z, F = d40.get(B), I = F && F.options;
        if (I && (I.persistent < Q.persistent || I.interval > Q.interval)) G02(B), F = void 0;
        if (F) e61(F, ug, D), e61(F, cs, G);
        else F = {
            listeners: D,
            rawEmitters: G,
            options: Q,
            watcher: iG4(B, Q, (Y, W) => {
                c40(F.rawEmitters, (X) => {
                    X(sw.CHANGE, B, {
                        curr: Y,
                        prev: W
                    })
                });
                let J = Y.mtimeMs;
                if (Y.size !== W.size || J > W.mtimeMs || J === 0) c40(F.listeners, (X) => X(A, Y))
            })
        }, d40.set(B, F);
        return () => {
            if (A81(F, ug, D), A81(F, cs, G), J02(F.listeners)) d40.delete(B), G02(B), F.options = F.watcher = void 0, Object.freeze(F)
        }
    };
class i40 {
    constructor(A) {
        this.fsw = A, this._boundHandleError = (B) => A._handleError(B)
    }
    _watchWithNodeFs(A, B) {
        let Q = this.fsw.options,
            Z = HZ.dirname(A),
            D = HZ.basename(A);
        this.fsw._getWatchedDir(Z).add(D);
        let F = HZ.resolve(A),
            I = {
                persistent: Q.persistent
            };
        if (!B) B = fq1;
        let Y;
        if (Q.usePolling) {
            let W = Q.interval !== Q.binaryInterval;
            I.interval = W && GF4(D) ? Q.binaryInterval : Q.interval, Y = YF4(A, F, I, {
                listener: B,
                rawEmitter: this.fsw._emitRaw
            })
        } else Y = IF4(A, F, I, {
            listener: B,
            errHandler: this._boundHandleError,
            rawEmitter: this.fsw._emitRaw
        });
        return Y
    }
    _handleFile(A, B, Q) {
        if (this.fsw.closed) return;
        let Z = HZ.dirname(A),
            D = HZ.basename(A),
            G = this.fsw._getWatchedDir(Z),
            F = B;
        if (G.has(D)) return;
        let I = async (W, J) => {
            if (!this.fsw._throttle(BF4, A, 5)) return;
            if (!J || J.mtimeMs === 0) try {
                let X = await I02(A);
                if (this.fsw.closed) return;
                let {
                    atimeMs: V,
                    mtimeMs: C
                } = X;
                if (!V || V <= C || C !== F.mtimeMs) this.fsw._emit(sw.CHANGE, A, X);
                if ((tG4 || eG4 || AF4) && F.ino !== X.ino) {
                    this.fsw._closeFile(W), F = X;
                    let K = this._watchWithNodeFs(A, I);
                    if (K) this.fsw._addPathCloser(W, K)
                } else F = X
            } catch (X) {
                this.fsw._remove(Z, D)
            } else if (G.has(D)) {
                let {
                    atimeMs: X,
                    mtimeMs: V
                } = J;
                if (!X || X <= V || V !== F.mtimeMs) this.fsw._emit(sw.CHANGE, A, J);
                F = J
            }
        }, Y = this._watchWithNodeFs(A, I);
        if (!(Q && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(A)) {
            if (!this.fsw._throttle(sw.ADD, A, 0)) return;
            this.fsw._emit(sw.ADD, A, B)
        }
        return Y
    }
    async _handleSymlink(A, B, Q, Z) {
        if (this.fsw.closed) return;
        let D = A.fullPath,
            G = this.fsw._getWatchedDir(B);
        if (!this.fsw.options.followSymlinks) {
            this.fsw._incrReadyCount();
            let F;
            try {
                F = await m40(Q)
            } catch (I) {
                return this.fsw._emitReady(), !0
            }
            if (this.fsw.closed) return;
            if (G.has(Z)) {
                if (this.fsw._symlinkPaths.get(D) !== F) this.fsw._symlinkPaths.set(D, F), this.fsw._emit(sw.CHANGE, Q, A.stats)
            } else G.add(Z), this.fsw._symlinkPaths.set(D, F), this.fsw._emit(sw.ADD, Q, A.stats);
            return this.fsw._emitReady(), !0
        }
        if (this.fsw._symlinkPaths.has(D)) return !0;
        this.fsw._symlinkPaths.set(D, !0)
    }
    _handleRead(A, B, Q, Z, D, G, F) {
        if (A = HZ.join(A, ""), F = this.fsw._throttle("readdir", A, 1000), !F) return;
        let I = this.fsw._getWatchedDir(Q.path),
            Y = new Set,
            W = this.fsw._readdirp(A, {
                fileFilter: (J) => Q.filterPath(J),
                directoryFilter: (J) => Q.filterDir(J)
            });
        if (!W) return;
        return W.on(oG4, async (J) => {
            if (this.fsw.closed) {
                W = void 0;
                return
            }
            let X = J.path,
                V = HZ.join(A, X);
            if (Y.add(X), J.stats.isSymbolicLink() && await this._handleSymlink(J, A, V, X)) return;
            if (this.fsw.closed) {
                W = void 0;
                return
            }
            if (X === Z || !Z && !I.has(X)) this.fsw._incrReadyCount(), V = HZ.join(D, HZ.relative(D, V)), this._addToNodeFs(V, B, Q, G + 1)
        }).on(sw.ERROR, this._boundHandleError), new Promise((J, X) => {
            if (!W) return X();
            W.once(l40, () => {
                if (this.fsw.closed) {
                    W = void 0;
                    return
                }
                let V = F ? F.clear() : !1;
                if (J(void 0), I.getChildren().filter((C) => {
                        return C !== A && !Y.has(C)
                    }).forEach((C) => {
                        this.fsw._remove(A, C)
                    }), W = void 0, V) this._handleRead(A, !1, Q, Z, D, G, F)
            })
        })
    }
    async _handleDir(A, B, Q, Z, D, G, F) {
        let I = this.fsw._getWatchedDir(HZ.dirname(A)),
            Y = I.has(HZ.basename(A));
        if (!(Q && this.fsw.options.ignoreInitial) && !D && !Y) this.fsw._emit(sw.ADD_DIR, A, B);
        I.add(HZ.basename(A)), this.fsw._getWatchedDir(A);
        let W, J, X = this.fsw.options.depth;
        if ((X == null || Z <= X) && !this.fsw._symlinkPaths.has(F)) {
            if (!D) {
                if (await this._handleRead(A, Q, G, D, A, Z, W), this.fsw.closed) return
            }
            J = this._watchWithNodeFs(A, (V, C) => {
                if (C && C.mtimeMs === 0) return;
                this._handleRead(V, !1, G, D, A, Z, W)
            })
        }
        return J
    }
    async _addToNodeFs(A, B, Q, Z, D) {
        let G = this.fsw._emitReady;
        if (this.fsw._isIgnored(A) || this.fsw.closed) return G(), !1;
        let F = this.fsw._getWatchHelpers(A);
        if (Q) F.filterPath = (I) => Q.filterPath(I), F.filterDir = (I) => Q.filterDir(I);
        try {
            let I = await QF4[F.statMethod](F.watchPath);
            if (this.fsw.closed) return;
            if (this.fsw._isIgnored(F.watchPath, I)) return G(), !1;
            let Y = this.fsw.options.followSymlinks,
                W;
            if (I.isDirectory()) {
                let J = HZ.resolve(A),
                    X = Y ? await m40(A) : A;
                if (this.fsw.closed) return;
                if (W = await this._handleDir(F.watchPath, I, B, Z, D, F, X), this.fsw.closed) return;
                if (J !== X && X !== void 0) this.fsw._symlinkPaths.set(J, X)
            } else if (I.isSymbolicLink()) {
                let J = Y ? await m40(A) : A;
                if (this.fsw.closed) return;
                let X = HZ.dirname(F.watchPath);
                if (this.fsw._getWatchedDir(X).add(F.watchPath), this.fsw._emit(sw.ADD, F.watchPath, I), W = await this._handleDir(X, I, B, Z, A, F, J), this.fsw.closed) return;
                if (J !== void 0) this.fsw._symlinkPaths.set(HZ.resolve(A), J)
            } else W = this._handleFile(F.watchPath, I, B);
            if (G(), W) this.fsw._addPathCloser(A, W);
            return !1
        } catch (I) {
            if (this.fsw._handleError(I)) return G(), A
        }
    }
} /*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) */
var n40 = "/",
    CF4 = "//",
    z02 = ".",
    KF4 = "..",
    HF4 = "string",
    zF4 = /\\/g,
    X02 = /\/\//,
    EF4 = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/,
    UF4 = /^\.[/\\]/;

function gq1(A) {
    return Array.isArray(A) ? A : [A]
}
var a40 = (A) => typeof A === "object" && A !== null && !(A instanceof RegExp);

function wF4(A) {
    if (typeof A === "function") return A;
    if (typeof A === "string") return (B) => A === B;
    if (A instanceof RegExp) return (B) => A.test(B);
    if (typeof A === "object" && A !== null) return (B) => {
        if (A.path === B) return !0;
        if (A.recursive) {
            let Q = K6.relative(A.path, B);
            if (!Q) return !1;
            return !Q.startsWith("..") && !K6.isAbsolute(Q)
        }
        return !1
    };
    return () => !1
}

function $F4(A) {
    if (typeof A !== "string") throw new Error("string expected");
    A = K6.normalize(A), A = A.replace(/\\/g, "/");
    let B = !1;
    if (A.startsWith("//")) B = !0;
    let Q = /\/\//;
    while (A.match(Q)) A = A.replace(Q, "/");
    if (B) A = "/" + A;
    return A
}

function V02(A, B, Q) {
    let Z = $F4(B);
    for (let D = 0; D < A.length; D++) {
        let G = A[D];
        if (G(Z, Q)) return !0
    }
    return !1
}

function qF4(A, B) {
    if (A == null) throw new TypeError("anymatch: specify first argument");
    let Z = gq1(A).map((D) => wF4(D));
    if (B == null) return (D, G) => {
        return V02(Z, D, G)
    };
    return V02(Z, B)
}