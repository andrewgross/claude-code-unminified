/* chunk:399 bytes:[9321808, 9335379) size:13571 source:unpacked-cli.js */
var dWB = E((_Q3, mWB) => {
    var {
        defineProperty: ry1,
        getOwnPropertyDescriptor: ou6,
        getOwnPropertyNames: tu6
    } = Object, eu6 = Object.prototype.hasOwnProperty, ee = (A, B) => ry1(A, "name", {
        value: B,
        configurable: !0
    }), Am6 = (A, B) => {
        for (var Q in B) ry1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Bm6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of tu6(B))
                if (!eu6.call(A, D) && D !== Q) ry1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ou6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Qm6 = (A) => Bm6(ry1({}, "__esModule", {
        value: !0
    }), A), bWB = {};
    Am6(bWB, {
        EventStreamMarshaller: () => uWB,
        eventStreamSerdeProvider: () => Zm6
    });
    mWB.exports = Qm6(bWB);
    var wD1 = vWB();

    function fWB(A) {
        let B = 0,
            Q = 0,
            Z = null,
            D = null,
            G = ee((I) => {
                if (typeof I !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + I);
                B = I, Q = 4, Z = new Uint8Array(I), new DataView(Z.buffer).setUint32(0, I, !1)
            }, "allocateMessage"),
            F = ee(async function*() {
                let I = A[Symbol.asyncIterator]();
                while (!0) {
                    let {
                        value: Y,
                        done: W
                    } = await I.next();
                    if (W) {
                        if (!B) return;
                        else if (B === Q) yield Z;
                        else throw new Error("Truncated event message received.");
                        return
                    }
                    let J = Y.length,
                        X = 0;
                    while (X < J) {
                        if (!Z) {
                            let C = J - X;
                            if (!D) D = new Uint8Array(4);
                            let K = Math.min(4 - Q, C);
                            if (D.set(Y.slice(X, X + K), Q), Q += K, X += K, Q < 4) break;
                            G(new DataView(D.buffer).getUint32(0, !1)), D = null
                        }
                        let V = Math.min(B - Q, J - X);
                        if (Z.set(Y.slice(X, X + V), Q), Q += V, X += V, B && B === Q) yield Z, Z = null, B = 0, Q = 0
                    }
                }
            }, "iterator");
        return {
            [Symbol.asyncIterator]: F
        }
    }
    ee(fWB, "getChunkedStream");

    function hWB(A, B) {
        return async function(Q) {
            let {
                value: Z
            } = Q.headers[":message-type"];
            if (Z === "error") {
                let D = new Error(Q.headers[":error-message"].value || "UnknownError");
                throw D.name = Q.headers[":error-code"].value, D
            } else if (Z === "exception") {
                let D = Q.headers[":exception-type"].value,
                    G = {
                        [D]: Q
                    },
                    F = await A(G);
                if (F.$unknown) {
                    let I = new Error(B(Q.body));
                    throw I.name = D, I
                }
                throw F[D]
            } else if (Z === "event") {
                let D = {
                        [Q.headers[":event-type"].value]: Q
                    },
                    G = await A(D);
                if (G.$unknown) return;
                return G
            } else throw Error(`Unrecognizable event type: ${Q.headers[":event-type"].value}`)
        }
    }
    ee(hWB, "getMessageUnmarshaller");
    var gWB = class A {
        constructor({
            utf8Encoder: B,
            utf8Decoder: Q
        }) {
            this.eventStreamCodec = new wD1.EventStreamCodec(B, Q), this.utfEncoder = B
        }
        deserialize(B, Q) {
            let Z = fWB(B);
            return new wD1.SmithyMessageDecoderStream({
                messageStream: new wD1.MessageDecoderStream({
                    inputStream: Z,
                    decoder: this.eventStreamCodec
                }),
                deserializer: hWB(Q, this.utfEncoder)
            })
        }
        serialize(B, Q) {
            return new wD1.MessageEncoderStream({
                messageStream: new wD1.SmithyMessageEncoderStream({
                    inputStream: B,
                    serializer: Q
                }),
                encoder: this.eventStreamCodec,
                includeEndFrame: !0
            })
        }
    };
    ee(gWB, "EventStreamMarshaller");
    var uWB = gWB,
        Zm6 = ee((A) => new uWB(A), "eventStreamSerdeProvider")
});
var aWB = E((xQ3, nWB) => {
    var {
        defineProperty: oy1,
        getOwnPropertyDescriptor: Dm6,
        getOwnPropertyNames: Gm6
    } = Object, Fm6 = Object.prototype.hasOwnProperty, QE0 = (A, B) => oy1(A, "name", {
        value: B,
        configurable: !0
    }), Im6 = (A, B) => {
        for (var Q in B) oy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ym6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Gm6(B))
                if (!Fm6.call(A, D) && D !== Q) oy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Dm6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Wm6 = (A) => Ym6(oy1({}, "__esModule", {
        value: !0
    }), A), cWB = {};
    Im6(cWB, {
        EventStreamMarshaller: () => iWB,
        eventStreamSerdeProvider: () => Vm6
    });
    nWB.exports = Wm6(cWB);
    var Jm6 = dWB(),
        Xm6 = W1("stream");
    async function* lWB(A) {
        let B = !1,
            Q = !1,
            Z = new Array;
        A.on("error", (D) => {
            if (!B) B = !0;
            if (D) throw D
        }), A.on("data", (D) => {
            Z.push(D)
        }), A.on("end", () => {
            B = !0
        });
        while (!Q) {
            let D = await new Promise((G) => setTimeout(() => G(Z.shift()), 0));
            if (D) yield D;
            Q = B && Z.length === 0
        }
    }
    QE0(lWB, "readabletoIterable");
    var pWB = class A {
        constructor({
            utf8Encoder: B,
            utf8Decoder: Q
        }) {
            this.universalMarshaller = new Jm6.EventStreamMarshaller({
                utf8Decoder: Q,
                utf8Encoder: B
            })
        }
        deserialize(B, Q) {
            let Z = typeof B[Symbol.asyncIterator] === "function" ? B : lWB(B);
            return this.universalMarshaller.deserialize(Z, Q)
        }
        serialize(B, Q) {
            return Xm6.Readable.from(this.universalMarshaller.serialize(B, Q))
        }
    };
    QE0(pWB, "EventStreamMarshaller");
    var iWB = pWB,
        Vm6 = QE0((A) => new iWB(A), "eventStreamSerdeProvider")
});
var oWB = E((vQ3, rWB) => {
    var {
        defineProperty: ty1,
        getOwnPropertyDescriptor: Cm6,
        getOwnPropertyNames: Km6
    } = Object, Hm6 = Object.prototype.hasOwnProperty, zm6 = (A, B) => ty1(A, "name", {
        value: B,
        configurable: !0
    }), Em6 = (A, B) => {
        for (var Q in B) ty1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Um6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Km6(B))
                if (!Hm6.call(A, D) && D !== Q) ty1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Cm6(B, D)) || Z.enumerable
                })
        }
        return A
    }, wm6 = (A) => Um6(ty1({}, "__esModule", {
        value: !0
    }), A), sWB = {};
    Em6(sWB, {
        isArrayBuffer: () => $m6
    });
    rWB.exports = wm6(sWB);
    var $m6 = zm6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var A_1 = E((bQ3, AJB) => {
    var {
        defineProperty: ey1,
        getOwnPropertyDescriptor: qm6,
        getOwnPropertyNames: Nm6
    } = Object, Lm6 = Object.prototype.hasOwnProperty, tWB = (A, B) => ey1(A, "name", {
        value: B,
        configurable: !0
    }), Mm6 = (A, B) => {
        for (var Q in B) ey1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Rm6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Nm6(B))
                if (!Lm6.call(A, D) && D !== Q) ey1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qm6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Om6 = (A) => Rm6(ey1({}, "__esModule", {
        value: !0
    }), A), eWB = {};
    Mm6(eWB, {
        fromArrayBuffer: () => Pm6,
        fromString: () => Sm6
    });
    AJB.exports = Om6(eWB);
    var Tm6 = oWB(),
        ZE0 = W1("buffer"),
        Pm6 = tWB((A, B = 0, Q = A.byteLength - B) => {
            if (!Tm6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
            return ZE0.Buffer.from(A, B, Q)
        }, "fromArrayBuffer"),
        Sm6 = tWB((A, B) => {
            if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
            return B ? ZE0.Buffer.from(A, B) : ZE0.Buffer.from(A)
        }, "fromString")
});
var ZJB = E((BJB) => {
    Object.defineProperty(BJB, "__esModule", {
        value: !0
    });
    BJB.fromBase64 = void 0;
    var jm6 = A_1(),
        km6 = /^[A-Za-z0-9+/]*={0,2}$/,
        ym6 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!km6.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = jm6.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    BJB.fromBase64 = ym6
});
var YJB = E((hQ3, IJB) => {
    var {
        defineProperty: B_1,
        getOwnPropertyDescriptor: _m6,
        getOwnPropertyNames: xm6
    } = Object, vm6 = Object.prototype.hasOwnProperty, DE0 = (A, B) => B_1(A, "name", {
        value: B,
        configurable: !0
    }), bm6 = (A, B) => {
        for (var Q in B) B_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, fm6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of xm6(B))
                if (!vm6.call(A, D) && D !== Q) B_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = _m6(B, D)) || Z.enumerable
                })
        }
        return A
    }, hm6 = (A) => fm6(B_1({}, "__esModule", {
        value: !0
    }), A), DJB = {};
    bm6(DJB, {
        fromUtf8: () => FJB,
        toUint8Array: () => gm6,
        toUtf8: () => um6
    });
    IJB.exports = hm6(DJB);
    var GJB = A_1(),
        FJB = DE0((A) => {
            let B = GJB.fromString(A, "utf8");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
        }, "fromUtf8"),
        gm6 = DE0((A) => {
            if (typeof A === "string") return FJB(A);
            if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            return new Uint8Array(A)
        }, "toUint8Array"),
        um6 = DE0((A) => {
            if (typeof A === "string") return A;
            if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
            return GJB.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
        }, "toUtf8")
});
var XJB = E((WJB) => {
    Object.defineProperty(WJB, "__esModule", {
        value: !0
    });
    WJB.toBase64 = void 0;
    var mm6 = A_1(),
        dm6 = YJB(),
        cm6 = (A) => {
            let B;
            if (typeof A === "string") B = dm6.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return mm6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    WJB.toBase64 = cm6
});
var IE0 = E((uQ3, Q_1) => {
    var {
        defineProperty: VJB,
        getOwnPropertyDescriptor: lm6,
        getOwnPropertyNames: pm6
    } = Object, im6 = Object.prototype.hasOwnProperty, GE0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of pm6(B))
                if (!im6.call(A, D) && D !== Q) VJB(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = lm6(B, D)) || Z.enumerable
                })
        }
        return A
    }, CJB = (A, B, Q) => (GE0(A, B, "default"), Q && GE0(Q, B, "default")), nm6 = (A) => GE0(VJB({}, "__esModule", {
        value: !0
    }), A), FE0 = {};
    Q_1.exports = nm6(FE0);
    CJB(FE0, ZJB(), Q_1.exports);
    CJB(FE0, XJB(), Q_1.exports)
});