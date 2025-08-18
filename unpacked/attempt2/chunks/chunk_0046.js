/* chunk:46 bytes:[1226579, 1246291) size:19712 source:unpacked-cli.js */
var z1A = E((Qe8, H1A) => {
    var {
        defineProperty: vC1,
        getOwnPropertyDescriptor: Nf9,
        getOwnPropertyNames: Lf9
    } = Object, Mf9 = Object.prototype.hasOwnProperty, Rf9 = (A, B) => vC1(A, "name", {
        value: B,
        configurable: !0
    }), Of9 = (A, B) => {
        for (var Q in B) vC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Tf9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Lf9(B))
                if (!Mf9.call(A, D) && D !== Q) vC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Nf9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Pf9 = (A) => Tf9(vC1({}, "__esModule", {
        value: !0
    }), A), K1A = {};
    Of9(K1A, {
        isArrayBuffer: () => Sf9
    });
    H1A.exports = Pf9(K1A);
    var Sf9 = Rf9((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var GZ = E((Ze8, w1A) => {
    var {
        defineProperty: bC1,
        getOwnPropertyDescriptor: jf9,
        getOwnPropertyNames: kf9
    } = Object, yf9 = Object.prototype.hasOwnProperty, E1A = (A, B) => bC1(A, "name", {
        value: B,
        configurable: !0
    }), _f9 = (A, B) => {
        for (var Q in B) bC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, xf9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of kf9(B))
                if (!yf9.call(A, D) && D !== Q) bC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = jf9(B, D)) || Z.enumerable
                })
        }
        return A
    }, vf9 = (A) => xf9(bC1({}, "__esModule", {
        value: !0
    }), A), U1A = {};
    _f9(U1A, {
        fromArrayBuffer: () => ff9,
        fromString: () => hf9
    });
    w1A.exports = vf9(U1A);
    var bf9 = z1A(),
        Cn1 = W1("buffer"),
        ff9 = E1A((A, B = 0, Q = A.byteLength - B) => {
            if (!bf9.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
            return Cn1.Buffer.from(A, B, Q)
        }, "fromArrayBuffer"),
        hf9 = E1A((A, B) => {
            if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
            return B ? Cn1.Buffer.from(A, B) : Cn1.Buffer.from(A)
        }, "fromString")
});
var N1A = E(($1A) => {
    Object.defineProperty($1A, "__esModule", {
        value: !0
    });
    $1A.fromBase64 = void 0;
    var gf9 = GZ(),
        uf9 = /^[A-Za-z0-9+/]*={0,2}$/,
        mf9 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!uf9.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = gf9.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    $1A.fromBase64 = mf9
});
var lB = E((Ge8, O1A) => {
    var {
        defineProperty: fC1,
        getOwnPropertyDescriptor: df9,
        getOwnPropertyNames: cf9
    } = Object, lf9 = Object.prototype.hasOwnProperty, Kn1 = (A, B) => fC1(A, "name", {
        value: B,
        configurable: !0
    }), pf9 = (A, B) => {
        for (var Q in B) fC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, if9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cf9(B))
                if (!lf9.call(A, D) && D !== Q) fC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = df9(B, D)) || Z.enumerable
                })
        }
        return A
    }, nf9 = (A) => if9(fC1({}, "__esModule", {
        value: !0
    }), A), L1A = {};
    pf9(L1A, {
        fromUtf8: () => R1A,
        toUint8Array: () => af9,
        toUtf8: () => sf9
    });
    O1A.exports = nf9(L1A);
    var M1A = GZ(),
        R1A = Kn1((A) => {
            let B = M1A.fromString(A, "utf8");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
        }, "fromUtf8"),
        af9 = Kn1((A) => {
            if (typeof A === "string") return R1A(A);
            if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            return new Uint8Array(A)
        }, "toUint8Array"),
        sf9 = Kn1((A) => {
            if (typeof A === "string") return A;
            if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
            return M1A.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
        }, "toUtf8")
});
var S1A = E((T1A) => {
    Object.defineProperty(T1A, "__esModule", {
        value: !0
    });
    T1A.toBase64 = void 0;
    var rf9 = GZ(),
        of9 = lB(),
        tf9 = (A) => {
            let B;
            if (typeof A === "string") B = of9.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return rf9.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    T1A.toBase64 = tf9
});
var up = E((Ie8, hC1) => {
    var {
        defineProperty: j1A,
        getOwnPropertyDescriptor: ef9,
        getOwnPropertyNames: Ah9
    } = Object, Bh9 = Object.prototype.hasOwnProperty, Hn1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ah9(B))
                if (!Bh9.call(A, D) && D !== Q) j1A(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ef9(B, D)) || Z.enumerable
                })
        }
        return A
    }, k1A = (A, B, Q) => (Hn1(A, B, "default"), Q && Hn1(Q, B, "default")), Qh9 = (A) => Hn1(j1A({}, "__esModule", {
        value: !0
    }), A), zn1 = {};
    hC1.exports = Qh9(zn1);
    k1A(zn1, N1A(), hC1.exports);
    k1A(zn1, S1A(), hC1.exports)
});
var En1 = E((_1A) => {
    Object.defineProperty(_1A, "__esModule", {
        value: !0
    });
    _1A.ChecksumStream = void 0;
    var Zh9 = up(),
        Dh9 = W1("stream");
    class y1A extends Dh9.Duplex {
        constructor({
            expectedChecksum: A,
            checksum: B,
            source: Q,
            checksumSourceLocation: Z,
            base64Encoder: D
        }) {
            var G, F;
            super();
            if (typeof Q.pipe === "function") this.source = Q;
            else throw new Error(`@smithy/util-stream: unsupported source type ${(F=(G=Q===null||Q===void 0?void 0:Q.constructor)===null||G===void 0?void 0:G.name)!==null&&F!==void 0?F:Q} in ChecksumStream.`);
            this.base64Encoder = D !== null && D !== void 0 ? D : Zh9.toBase64, this.expectedChecksum = A, this.checksum = B, this.checksumSourceLocation = Z, this.source.pipe(this)
        }
        _read(A) {}
        _write(A, B, Q) {
            try {
                this.checksum.update(A), this.push(A)
            } catch (Z) {
                return Q(Z)
            }
            return Q()
        }
        async _final(A) {
            try {
                let B = await this.checksum.digest(),
                    Q = this.base64Encoder(B);
                if (this.expectedChecksum !== Q) return A(new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${Q}" in response header "${this.checksumSourceLocation}".`))
            } catch (B) {
                return A(B)
            }
            return this.push(null), A()
        }
    }
    _1A.ChecksumStream = y1A
});
var Hk = E((v1A) => {
    Object.defineProperty(v1A, "__esModule", {
        value: !0
    });
    v1A.isBlob = v1A.isReadableStream = void 0;
    var Gh9 = (A) => {
        var B;
        return typeof ReadableStream === "function" && (((B = A === null || A === void 0 ? void 0 : A.constructor) === null || B === void 0 ? void 0 : B.name) === ReadableStream.name || A instanceof ReadableStream)
    };
    v1A.isReadableStream = Gh9;
    var Fh9 = (A) => {
        var B;
        return typeof Blob === "function" && (((B = A === null || A === void 0 ? void 0 : A.constructor) === null || B === void 0 ? void 0 : B.name) === Blob.name || A instanceof Blob)
    };
    v1A.isBlob = Fh9
});
var u1A = E((h1A) => {
    Object.defineProperty(h1A, "__esModule", {
        value: !0
    });
    h1A.ChecksumStream = void 0;
    var Yh9 = typeof ReadableStream === "function" ? ReadableStream : function() {};
    class f1A extends Yh9 {}
    h1A.ChecksumStream = f1A
});
var c1A = E((m1A) => {
    Object.defineProperty(m1A, "__esModule", {
        value: !0
    });
    m1A.createChecksumStream = void 0;
    var Wh9 = up(),
        Jh9 = Hk(),
        Xh9 = u1A(),
        Vh9 = ({
            expectedChecksum: A,
            checksum: B,
            source: Q,
            checksumSourceLocation: Z,
            base64Encoder: D
        }) => {
            var G, F;
            if (!Jh9.isReadableStream(Q)) throw new Error(`@smithy/util-stream: unsupported source type ${(F=(G=Q===null||Q===void 0?void 0:Q.constructor)===null||G===void 0?void 0:G.name)!==null&&F!==void 0?F:Q} in ChecksumStream.`);
            let I = D !== null && D !== void 0 ? D : Wh9.toBase64;
            if (typeof TransformStream !== "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
            let Y = new TransformStream({
                start() {},
                async transform(J, X) {
                    B.update(J), X.enqueue(J)
                },
                async flush(J) {
                    let X = await B.digest(),
                        V = I(X);
                    if (A !== V) {
                        let C = new Error(`Checksum mismatch: expected "${A}" but received "${V}" in response header "${Z}".`);
                        J.error(C)
                    } else J.terminate()
                }
            });
            Q.pipeThrough(Y);
            let W = Y.readable;
            return Object.setPrototypeOf(W, Xh9.ChecksumStream.prototype), W
        };
    m1A.createChecksumStream = Vh9
});
var p1A = E((l1A) => {
    Object.defineProperty(l1A, "__esModule", {
        value: !0
    });
    l1A.createChecksumStream = zh9;
    var Ch9 = Hk(),
        Kh9 = En1(),
        Hh9 = c1A();

    function zh9(A) {
        if (typeof ReadableStream === "function" && Ch9.isReadableStream(A.source)) return Hh9.createChecksumStream(A);
        return new Kh9.ChecksumStream(A)
    }
});
var Un1 = E((n1A) => {
    Object.defineProperty(n1A, "__esModule", {
        value: !0
    });
    n1A.ByteArrayCollector = void 0;
    class i1A {
        constructor(A) {
            this.allocByteArray = A, this.byteLength = 0, this.byteArrays = []
        }
        push(A) {
            this.byteArrays.push(A), this.byteLength += A.byteLength
        }
        flush() {
            if (this.byteArrays.length === 1) {
                let Q = this.byteArrays[0];
                return this.reset(), Q
            }
            let A = this.allocByteArray(this.byteLength),
                B = 0;
            for (let Q = 0; Q < this.byteArrays.length; ++Q) {
                let Z = this.byteArrays[Q];
                A.set(Z, B), B += Z.byteLength
            }
            return this.reset(), A
        }
        reset() {
            this.byteArrays = [], this.byteLength = 0
        }
    }
    n1A.ByteArrayCollector = i1A
});
var A0A = E((t1A) => {
    Object.defineProperty(t1A, "__esModule", {
        value: !0
    });
    t1A.createBufferedReadable = void 0;
    t1A.createBufferedReadableStream = s1A;
    t1A.merge = r1A;
    t1A.flush = gC1;
    t1A.sizeOf = mp;
    t1A.modeOf = o1A;
    var Uh9 = Un1();

    function s1A(A, B, Q) {
        let Z = A.getReader(),
            D = !1,
            G = 0,
            F = ["", new Uh9.ByteArrayCollector((W) => new Uint8Array(W))],
            I = -1,
            Y = async (W) => {
                let {
                    value: J,
                    done: X
                } = await Z.read(), V = J;
                if (X) {
                    if (I !== -1) {
                        let C = gC1(F, I);
                        if (mp(C) > 0) W.enqueue(C)
                    }
                    W.close()
                } else {
                    let C = o1A(V, !1);
                    if (I !== C) {
                        if (I >= 0) W.enqueue(gC1(F, I));
                        I = C
                    }
                    if (I === -1) {
                        W.enqueue(V);
                        return
                    }
                    let K = mp(V);
                    G += K;
                    let H = mp(F[I]);
                    if (K >= B && H === 0) W.enqueue(V);
                    else {
                        let z = r1A(F, I, V);
                        if (!D && G > B * 2) D = !0, Q === null || Q === void 0 || Q.warn(`@smithy/util-stream - stream chunk size ${K} is below threshold of ${B}, automatically buffering.`);
                        if (z >= B) W.enqueue(gC1(F, I));
                        else await Y(W)
                    }
                }
            };
        return new ReadableStream({
            pull: Y
        })
    }
    t1A.createBufferedReadable = s1A;

    function r1A(A, B, Q) {
        switch (B) {
            case 0:
                return A[0] += Q, mp(A[0]);
            case 1:
            case 2:
                return A[B].push(Q), mp(A[B])
        }
    }

    function gC1(A, B) {
        switch (B) {
            case 0:
                let Q = A[0];
                return A[0] = "", Q;
            case 1:
            case 2:
                return A[B].flush()
        }
        throw new Error(`@smithy/util-stream - invalid index ${B} given to flush()`)
    }

    function mp(A) {
        var B, Q;
        return (Q = (B = A === null || A === void 0 ? void 0 : A.byteLength) !== null && B !== void 0 ? B : A === null || A === void 0 ? void 0 : A.length) !== null && Q !== void 0 ? Q : 0
    }

    function o1A(A, B = !0) {
        if (B && typeof Buffer !== "undefined" && A instanceof Buffer) return 2;
        if (A instanceof Uint8Array) return 1;
        if (typeof A === "string") return 0;
        return -1
    }
});
var Z0A = E((Q0A) => {
    Object.defineProperty(Q0A, "__esModule", {
        value: !0
    });
    Q0A.createBufferedReadable = Oh9;
    var Mh9 = W1("node:stream"),
        B0A = Un1(),
        kO = A0A(),
        Rh9 = Hk();

    function Oh9(A, B, Q) {
        if (Rh9.isReadableStream(A)) return kO.createBufferedReadableStream(A, B, Q);
        let Z = new Mh9.Readable({
                read() {}
            }),
            D = !1,
            G = 0,
            F = ["", new B0A.ByteArrayCollector((Y) => new Uint8Array(Y)), new B0A.ByteArrayCollector((Y) => Buffer.from(new Uint8Array(Y)))],
            I = -1;
        return A.on("data", (Y) => {
            let W = kO.modeOf(Y, !0);
            if (I !== W) {
                if (I >= 0) Z.push(kO.flush(F, I));
                I = W
            }
            if (I === -1) {
                Z.push(Y);
                return
            }
            let J = kO.sizeOf(Y);
            G += J;
            let X = kO.sizeOf(F[I]);
            if (J >= B && X === 0) Z.push(Y);
            else {
                let V = kO.merge(F, I, Y);
                if (!D && G > B * 2) D = !0, Q === null || Q === void 0 || Q.warn(`@smithy/util-stream - stream chunk size ${J} is below threshold of ${B}, automatically buffering.`);
                if (V >= B) Z.push(kO.flush(F, I))
            }
        }), A.on("end", () => {
            if (I !== -1) {
                let Y = kO.flush(F, I);
                if (kO.sizeOf(Y) > 0) Z.push(Y)
            }
            Z.push(null)
        }), Z
    }
});
var F0A = E((D0A) => {
    Object.defineProperty(D0A, "__esModule", {
        value: !0
    });
    D0A.getAwsChunkedEncodingStream = void 0;
    var Ph9 = W1("stream"),
        Sh9 = (A, B) => {
            let {
                base64Encoder: Q,
                bodyLengthChecker: Z,
                checksumAlgorithmFn: D,
                checksumLocationName: G,
                streamHasher: F
            } = B, I = Q !== void 0 && D !== void 0 && G !== void 0 && F !== void 0, Y = I ? F(D, A) : void 0, W = new Ph9.Readable({
                read: () => {}
            });
            return A.on("data", (J) => {
                let X = Z(J) || 0;
                W.push(`${X.toString(16)}\r
`), W.push(J), W.push(`\r
`)
            }), A.on("end", async () => {
                if (W.push(`0\r
`), I) {
                    let J = Q(await Y);
                    W.push(`${G}:${J}\r
`), W.push(`\r
`)
                }
                W.push(null)
            }), W
        };
    D0A.getAwsChunkedEncodingStream = Sh9
});
var Y0A = E((I0A) => {
    Object.defineProperty(I0A, "__esModule", {
        value: !0
    });
    I0A.headStream = jh9;
    async function jh9(A, B) {
        var Q;
        let Z = 0,
            D = [],
            G = A.getReader(),
            F = !1;
        while (!F) {
            let {
                done: W,
                value: J
            } = await G.read();
            if (J) D.push(J), Z += (Q = J === null || J === void 0 ? void 0 : J.byteLength) !== null && Q !== void 0 ? Q : 0;
            if (Z >= B) break;
            F = W
        }
        G.releaseLock();
        let I = new Uint8Array(Math.min(B, Z)),
            Y = 0;
        for (let W of D) {
            if (W.byteLength > I.byteLength - Y) {
                I.set(W.subarray(0, I.byteLength - Y), Y);
                break
            } else I.set(W, Y);
            Y += W.length
        }
        return I
    }
});
var V0A = E((J0A) => {
    Object.defineProperty(J0A, "__esModule", {
        value: !0
    });
    J0A.headStream = void 0;
    var yh9 = W1("stream"),
        _h9 = Y0A(),
        xh9 = Hk(),
        vh9 = (A, B) => {
            if (xh9.isReadableStream(A)) return _h9.headStream(A, B);
            return new Promise((Q, Z) => {
                let D = new W0A;
                D.limit = B, A.pipe(D), A.on("error", (G) => {
                    D.end(), Z(G)
                }), D.on("error", Z), D.on("finish", function() {
                    let G = new Uint8Array(Buffer.concat(this.buffers));
                    Q(G)
                })
            })
        };
    J0A.headStream = vh9;
    class W0A extends yh9.Writable {
        constructor() {
            super(...arguments);
            this.buffers = [], this.limit = 1 / 0, this.bytesBuffered = 0
        }
        _write(A, B, Q) {
            var Z;
            if (this.buffers.push(A), this.bytesBuffered += (Z = A.byteLength) !== null && Z !== void 0 ? Z : 0, this.bytesBuffered >= this.limit) {
                let D = this.bytesBuffered - this.limit,
                    G = this.buffers[this.buffers.length - 1];
                this.buffers[this.buffers.length - 1] = G.subarray(0, G.byteLength - D), this.emit("finish")
            }
            Q()
        }
    }
});