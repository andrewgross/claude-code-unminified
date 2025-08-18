/* chunk:507 bytes:[12061540, 12076352) size:14812 source:unpacked-cli.js */
class zg extends S20 {
    [VI] = !1;
    [s41] = !1;
    [sJ] = [];
    [CI] = [];
    [rW];
    [xw];
    [QL];
    [Ua];
    [XT] = !1;
    [wy] = !1;
    [gw1] = !1;
    [uw1] = !1;
    [a41] = null;
    [KI] = 0;
    [BG] = !1;
    [r41];
    [cw1] = !1;
    [Hg] = 0;
    [YK] = !1;
    writable = !0;
    readable = !0;
    constructor(...A) {
        let B = A[0] || {};
        super();
        if (B.objectMode && typeof B.encoding === "string") throw new TypeError("Encoding and objectMode may not be used together");
        if (vgQ(B)) this[rW] = !0, this[xw] = null;
        else if (bgQ(B)) this[xw] = B.encoding, this[rW] = !1;
        else this[rW] = !1, this[xw] = null;
        if (this[QL] = !!B.async, this[Ua] = this[xw] ? new TgQ(this[xw]) : null, B && B.debugExposeBuffer === !0) Object.defineProperty(this, "buffer", {
            get: () => this[CI]
        });
        if (B && B.debugExposePipes === !0) Object.defineProperty(this, "pipes", {
            get: () => this[sJ]
        });
        let {
            signal: Q
        } = B;
        if (Q)
            if (this[r41] = Q, Q.aborted) this[P20]();
            else Q.addEventListener("abort", () => this[P20]())
    }
    get bufferLength() {
        return this[KI]
    }
    get encoding() {
        return this[xw]
    }
    set encoding(A) {
        throw new Error("Encoding must be set at instantiation time")
    }
    setEncoding(A) {
        throw new Error("Encoding must be set at instantiation time")
    }
    get objectMode() {
        return this[rW]
    }
    set objectMode(A) {
        throw new Error("objectMode must be set at instantiation time")
    }
    get["async"]() {
        return this[QL]
    }
    set["async"](A) {
        this[QL] = this[QL] || !!A
    } [P20]() {
        this[cw1] = !0, this.emit("abort", this[r41]?.reason), this.destroy(this[r41]?.reason)
    }
    get aborted() {
        return this[cw1]
    }
    set aborted(A) {}
    write(A, B, Q) {
        if (this[cw1]) return !1;
        if (this[XT]) throw new Error("write after end");
        if (this[BG]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), {
            code: "ERR_STREAM_DESTROYED"
        })), !0;
        if (typeof B === "function") Q = B, B = "utf8";
        if (!B) B = "utf8";
        let Z = this[QL] ? o41 : kgQ;
        if (!this[rW] && !Buffer.isBuffer(A)) {
            if (xgQ(A)) A = Buffer.from(A.buffer, A.byteOffset, A.byteLength);
            else if (_gQ(A)) A = Buffer.from(A);
            else if (typeof A !== "string") throw new Error("Non-contiguous data written to non-objectMode stream")
        }
        if (this[rW]) {
            if (this[VI] && this[KI] !== 0) this[mw1](!0);
            if (this[VI]) this.emit("data", A);
            else this[M20](A);
            if (this[KI] !== 0) this.emit("readable");
            if (Q) Z(Q);
            return this[VI]
        }
        if (!A.length) {
            if (this[KI] !== 0) this.emit("readable");
            if (Q) Z(Q);
            return this[VI]
        }
        if (typeof A === "string" && !(B === this[xw] && !this[Ua]?.lastNeed)) A = Buffer.from(A, B);
        if (Buffer.isBuffer(A) && this[xw]) A = this[Ua].write(A);
        if (this[VI] && this[KI] !== 0) this[mw1](!0);
        if (this[VI]) this.emit("data", A);
        else this[M20](A);
        if (this[KI] !== 0) this.emit("readable");
        if (Q) Z(Q);
        return this[VI]
    }
    read(A) {
        if (this[BG]) return null;
        if (this[YK] = !1, this[KI] === 0 || A === 0 || A && A > this[KI]) return this[VT](), null;
        if (this[rW]) A = null;
        if (this[CI].length > 1 && !this[rW]) this[CI] = [this[xw] ? this[CI].join("") : Buffer.concat(this[CI], this[KI])];
        let B = this[FxA](A || null, this[CI][0]);
        return this[VT](), B
    } [FxA](A, B) {
        if (this[rW]) this[dw1]();
        else {
            let Q = B;
            if (A === Q.length || A === null) this[dw1]();
            else if (typeof Q === "string") this[CI][0] = Q.slice(A), B = Q.slice(0, A), this[KI] -= A;
            else this[CI][0] = Q.subarray(A), B = Q.subarray(0, A), this[KI] -= A
        }
        if (this.emit("data", B), !this[CI].length && !this[XT]) this.emit("drain");
        return B
    }
    end(A, B, Q) {
        if (typeof A === "function") Q = A, A = void 0;
        if (typeof B === "function") Q = B, B = "utf8";
        if (A !== void 0) this.write(A, B);
        if (Q) this.once("end", Q);
        if (this[XT] = !0, this.writable = !1, this[VI] || !this[s41]) this[VT]();
        return this
    } [wa]() {
        if (this[BG]) return;
        if (!this[Hg] && !this[sJ].length) this[YK] = !0;
        if (this[s41] = !1, this[VI] = !0, this.emit("resume"), this[CI].length) this[mw1]();
        else if (this[XT]) this[VT]();
        else this.emit("drain")
    }
    resume() {
        return this[wa]()
    }
    pause() {
        this[VI] = !1, this[s41] = !0, this[YK] = !1
    }
    get destroyed() {
        return this[BG]
    }
    get flowing() {
        return this[VI]
    }
    get paused() {
        return this[s41]
    } [M20](A) {
        if (this[rW]) this[KI] += 1;
        else this[KI] += A.length;
        this[CI].push(A)
    } [dw1]() {
        if (this[rW]) this[KI] -= 1;
        else this[KI] -= this[CI][0].length;
        return this[CI].shift()
    } [mw1](A = !1) {
        do; while (this[IxA](this[dw1]()) && this[CI].length);
        if (!A && !this[CI].length && !this[XT]) this.emit("drain")
    } [IxA](A) {
        return this.emit("data", A), this[VI]
    }
    pipe(A, B) {
        if (this[BG]) return A;
        this[YK] = !1;
        let Q = this[wy];
        if (B = B || {}, A === GxA.stdout || A === GxA.stderr) B.end = !1;
        else B.end = B.end !== !1;
        if (B.proxyErrors = !!B.proxyErrors, Q) {
            if (B.end) A.end()
        } else if (this[sJ].push(!B.proxyErrors ? new j20(this, A, B) : new JxA(this, A, B)), this[QL]) o41(() => this[wa]());
        else this[wa]();
        return A
    }
    unpipe(A) {
        let B = this[sJ].find((Q) => Q.dest === A);
        if (B) {
            if (this[sJ].length === 1) {
                if (this[VI] && this[Hg] === 0) this[VI] = !1;
                this[sJ] = []
            } else this[sJ].splice(this[sJ].indexOf(B), 1);
            B.unpipe()
        }
    }
    addListener(A, B) {
        return this.on(A, B)
    }
    on(A, B) {
        let Q = super.on(A, B);
        if (A === "data") {
            if (this[YK] = !1, this[Hg]++, !this[sJ].length && !this[VI]) this[wa]()
        } else if (A === "readable" && this[KI] !== 0) super.emit("readable");
        else if (ygQ(A) && this[wy]) super.emit(A), this.removeAllListeners(A);
        else if (A === "error" && this[a41]) {
            let Z = B;
            if (this[QL]) o41(() => Z.call(this, this[a41]));
            else Z.call(this, this[a41])
        }
        return Q
    }
    removeListener(A, B) {
        return this.off(A, B)
    }
    off(A, B) {
        let Q = super.off(A, B);
        if (A === "data") {
            if (this[Hg] = this.listeners("data").length, this[Hg] === 0 && !this[YK] && !this[sJ].length) this[VI] = !1
        }
        return Q
    }
    removeAllListeners(A) {
        let B = super.removeAllListeners(A);
        if (A === "data" || A === void 0) {
            if (this[Hg] = 0, !this[YK] && !this[sJ].length) this[VI] = !1
        }
        return B
    }
    get emittedEnd() {
        return this[wy]
    } [VT]() {
        if (!this[gw1] && !this[wy] && !this[BG] && this[CI].length === 0 && this[XT]) {
            if (this[gw1] = !0, this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[uw1]) this.emit("close");
            this[gw1] = !1
        }
    }
    emit(A, ...B) {
        let Q = B[0];
        if (A !== "error" && A !== "close" && A !== BG && this[BG]) return !1;
        else if (A === "data") return !this[rW] && !Q ? !1 : this[QL] ? (o41(() => this[O20](Q)), !0) : this[O20](Q);
        else if (A === "end") return this[YxA]();
        else if (A === "close") {
            if (this[uw1] = !0, !this[wy] && !this[BG]) return !1;
            let D = super.emit("close");
            return this.removeAllListeners("close"), D
        } else if (A === "error") {
            this[a41] = Q, super.emit(R20, Q);
            let D = !this[r41] || this.listeners("error").length ? super.emit("error", Q) : !1;
            return this[VT](), D
        } else if (A === "resume") {
            let D = super.emit("resume");
            return this[VT](), D
        } else if (A === "finish" || A === "prefinish") {
            let D = super.emit(A);
            return this.removeAllListeners(A), D
        }
        let Z = super.emit(A, ...B);
        return this[VT](), Z
    } [O20](A) {
        for (let Q of this[sJ])
            if (Q.dest.write(A) === !1) this.pause();
        let B = this[YK] ? !1 : super.emit("data", A);
        return this[VT](), B
    } [YxA]() {
        if (this[wy]) return !1;
        return this[wy] = !0, this.readable = !1, this[QL] ? (o41(() => this[T20]()), !0) : this[T20]()
    } [T20]() {
        if (this[Ua]) {
            let B = this[Ua].end();
            if (B) {
                for (let Q of this[sJ]) Q.dest.write(B);
                if (!this[YK]) super.emit("data", B)
            }
        }
        for (let B of this[sJ]) B.end();
        let A = super.emit("end");
        return this.removeAllListeners("end"), A
    }
    async collect() {
        let A = Object.assign([], {
            dataLength: 0
        });
        if (!this[rW]) A.dataLength = 0;
        let B = this.promise();
        return this.on("data", (Q) => {
            if (A.push(Q), !this[rW]) A.dataLength += Q.length
        }), await B, A
    }
    async concat() {
        if (this[rW]) throw new Error("cannot concat in objectMode");
        let A = await this.collect();
        return this[xw] ? A.join("") : Buffer.concat(A, A.dataLength)
    }
    async promise() {
        return new Promise((A, B) => {
            this.on(BG, () => B(new Error("stream destroyed"))), this.on("error", (Q) => B(Q)), this.on("end", () => A())
        })
    } [Symbol.asyncIterator]() {
        this[YK] = !1;
        let A = !1,
            B = async () => {
                return this.pause(), A = !0, {
                    value: void 0,
                    done: !0
                }
            };
        return {
            next: () => {
                if (A) return B();
                let Z = this.read();
                if (Z !== null) return Promise.resolve({
                    done: !1,
                    value: Z
                });
                if (this[XT]) return B();
                let D, G, F = (J) => {
                        this.off("data", I), this.off("end", Y), this.off(BG, W), B(), G(J)
                    },
                    I = (J) => {
                        this.off("error", F), this.off("end", Y), this.off(BG, W), this.pause(), D({
                            value: J,
                            done: !!this[XT]
                        })
                    },
                    Y = () => {
                        this.off("error", F), this.off("data", I), this.off(BG, W), B(), D({
                            done: !0,
                            value: void 0
                        })
                    },
                    W = () => F(new Error("stream destroyed"));
                return new Promise((J, X) => {
                    G = X, D = J, this.once(BG, W), this.once("error", F), this.once("end", Y), this.once("data", I)
                })
            },
            throw: B,
            return: B,
            [Symbol.asyncIterator]() {
                return this
            }
        }
    } [Symbol.iterator]() {
        this[YK] = !1;
        let A = !1,
            B = () => {
                return this.pause(), this.off(R20, B), this.off(BG, B), this.off("end", B), A = !0, {
                    done: !0,
                    value: void 0
                }
            },
            Q = () => {
                if (A) return B();
                let Z = this.read();
                return Z === null ? B() : {
                    done: !1,
                    value: Z
                }
            };
        return this.once("end", B), this.once(R20, B), this.once(BG, B), {
            next: Q,
            throw: B,
            return: B,
            [Symbol.iterator]() {
                return this
            }
        }
    }
    destroy(A) {
        if (this[BG]) {
            if (A) this.emit("error", A);
            else this.emit(BG);
            return this
        }
        this[BG] = !0, this[YK] = !0, this[CI].length = 0, this[KI] = 0;
        let B = this;
        if (typeof B.close === "function" && !this[uw1]) B.close();
        if (A) this.emit("error", A);
        else this.emit(BG);
        return this
    }
    static get isStream() {
        return PgQ
    }
}
var pgQ = cgQ.native,
    e41 = {
        lstatSync: ggQ,
        readdir: ugQ,
        readdirSync: mgQ,
        readlinkSync: dgQ,
        realpathSync: pgQ,
        promises: {
            lstat: igQ,
            readdir: ngQ,
            readlink: agQ,
            realpath: sgQ
        }
    },
    HxA = (A) => !A || A === e41 || A === lgQ ? e41 : {
        ...e41,
        ...A,
        promises: {
            ...e41.promises,
            ...A.promises || {}
        }
    },
    zxA = /^\\\\\?\\([a-z]:)\\?$/i,
    rgQ = (A) => A.replace(/\//g, "\\").replace(zxA, "$1\\"),
    ogQ = /[\\\/]/,
    yz = 0,
    ExA = 1,
    UxA = 2,
    ZL = 4,
    wxA = 6,
    $xA = 8,
    Eg = 10,
    qxA = 12,
    kz = 15,
    t41 = ~kz,
    k20 = 16,
    XxA = 32,
    A61 = 64,
    vw = 128,
    lw1 = 256,
    iw1 = 512,
    VxA = A61 | vw | iw1,
    tgQ = 1023,
    y20 = (A) => A.isFile() ? $xA : A.isDirectory() ? ZL : A.isSymbolicLink() ? Eg : A.isCharacterDevice() ? UxA : A.isBlockDevice() ? wxA : A.isSocket() ? qxA : A.isFIFO() ? ExA : yz,
    CxA = new Map,
    B61 = (A) => {
        let B = CxA.get(A);
        if (B) return B;
        let Q = A.normalize("NFKD");
        return CxA.set(A, Q), Q
    },
    KxA = new Map,
    pw1 = (A) => {
        let B = KxA.get(A);
        if (B) return B;
        let Q = B61(A.toLowerCase());
        return KxA.set(A, Q), Q
    };
class x20 extends jw {
    constructor() {
        super({
            max: 256
        })
    }
}
class NxA extends jw {
    constructor(A = 16384) {
        super({
            maxSize: A,
            sizeCalculation: (B) => B.length + 1
        })
    }
}
var LxA = Symbol("PathScurry setAsCwd");