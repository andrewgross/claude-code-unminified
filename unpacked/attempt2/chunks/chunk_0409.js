/* chunk:409 bytes:[9484995, 9503973) size:18978 source:unpacked-cli.js */
var lE0 = E((L43, eCB) => {
    var {
        defineProperty: y_1,
        getOwnPropertyDescriptor: Vi6,
        getOwnPropertyNames: Ci6
    } = Object, Ki6 = Object.prototype.hasOwnProperty, AS = (A, B) => y_1(A, "name", {
        value: B,
        configurable: !0
    }), Hi6 = (A, B) => {
        for (var Q in B) y_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, zi6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ci6(B))
                if (!Ki6.call(A, D) && D !== Q) y_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Vi6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ei6 = (A) => zi6(y_1({}, "__esModule", {
        value: !0
    }), A), sCB = {};
    Hi6(sCB, {
        EventStreamCodec: () => ji6,
        HeaderMarshaller: () => rCB,
        Int64: () => k_1,
        MessageDecoderStream: () => ki6,
        MessageEncoderStream: () => yi6,
        SmithyMessageDecoderStream: () => _i6,
        SmithyMessageEncoderStream: () => xi6
    });
    eCB.exports = Ei6(sCB);
    var Ui6 = j_1(),
        mm = Uk(),
        k_1 = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static {
                AS(this, "Int64")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) cE0(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) cE0(B);
                return parseInt(mm.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };

    function cE0(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    AS(cE0, "negate");
    var rCB = class {
            constructor(A, B) {
                this.toUtf8 = A, this.fromUtf8 = B
            }
            static {
                AS(this, "HeaderMarshaller")
            }
            format(A) {
                let B = [];
                for (let D of Object.keys(A)) {
                    let G = this.fromUtf8(D);
                    B.push(Uint8Array.from([G.byteLength]), G, this.formatHeaderValue(A[D]))
                }
                let Q = new Uint8Array(B.reduce((D, G) => D + G.byteLength, 0)),
                    Z = 0;
                for (let D of B) Q.set(D, Z), Z += D.byteLength;
                return Q
            }
            formatHeaderValue(A) {
                switch (A.type) {
                    case "boolean":
                        return Uint8Array.from([A.value ? 0 : 1]);
                    case "byte":
                        return Uint8Array.from([2, A.value]);
                    case "short":
                        let B = new DataView(new ArrayBuffer(3));
                        return B.setUint8(0, 3), B.setInt16(1, A.value, !1), new Uint8Array(B.buffer);
                    case "integer":
                        let Q = new DataView(new ArrayBuffer(5));
                        return Q.setUint8(0, 4), Q.setInt32(1, A.value, !1), new Uint8Array(Q.buffer);
                    case "long":
                        let Z = new Uint8Array(9);
                        return Z[0] = 5, Z.set(A.value.bytes, 1), Z;
                    case "binary":
                        let D = new DataView(new ArrayBuffer(3 + A.value.byteLength));
                        D.setUint8(0, 6), D.setUint16(1, A.value.byteLength, !1);
                        let G = new Uint8Array(D.buffer);
                        return G.set(A.value, 3), G;
                    case "string":
                        let F = this.fromUtf8(A.value),
                            I = new DataView(new ArrayBuffer(3 + F.byteLength));
                        I.setUint8(0, 7), I.setUint16(1, F.byteLength, !1);
                        let Y = new Uint8Array(I.buffer);
                        return Y.set(F, 3), Y;
                    case "timestamp":
                        let W = new Uint8Array(9);
                        return W[0] = 8, W.set(k_1.fromNumber(A.value.valueOf()).bytes, 1), W;
                    case "uuid":
                        if (!Ti6.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
                        let J = new Uint8Array(17);
                        return J[0] = 9, J.set(mm.fromHex(A.value.replace(/\-/g, "")), 1), J
                }
            }
            parse(A) {
                let B = {},
                    Q = 0;
                while (Q < A.byteLength) {
                    let Z = A.getUint8(Q++),
                        D = this.toUtf8(new Uint8Array(A.buffer, A.byteOffset + Q, Z));
                    switch (Q += Z, A.getUint8(Q++)) {
                        case 0:
                            B[D] = {
                                type: aCB,
                                value: !0
                            };
                            break;
                        case 1:
                            B[D] = {
                                type: aCB,
                                value: !1
                            };
                            break;
                        case 2:
                            B[D] = {
                                type: wi6,
                                value: A.getInt8(Q++)
                            };
                            break;
                        case 3:
                            B[D] = {
                                type: $i6,
                                value: A.getInt16(Q, !1)
                            }, Q += 2;
                            break;
                        case 4:
                            B[D] = {
                                type: qi6,
                                value: A.getInt32(Q, !1)
                            }, Q += 4;
                            break;
                        case 5:
                            B[D] = {
                                type: Ni6,
                                value: new k_1(new Uint8Array(A.buffer, A.byteOffset + Q, 8))
                            }, Q += 8;
                            break;
                        case 6:
                            let G = A.getUint16(Q, !1);
                            Q += 2, B[D] = {
                                type: Li6,
                                value: new Uint8Array(A.buffer, A.byteOffset + Q, G)
                            }, Q += G;
                            break;
                        case 7:
                            let F = A.getUint16(Q, !1);
                            Q += 2, B[D] = {
                                type: Mi6,
                                value: this.toUtf8(new Uint8Array(A.buffer, A.byteOffset + Q, F))
                            }, Q += F;
                            break;
                        case 8:
                            B[D] = {
                                type: Ri6,
                                value: new Date(new k_1(new Uint8Array(A.buffer, A.byteOffset + Q, 8)).valueOf())
                            }, Q += 8;
                            break;
                        case 9:
                            let I = new Uint8Array(A.buffer, A.byteOffset + Q, 16);
                            Q += 16, B[D] = {
                                type: Oi6,
                                value: `${mm.toHex(I.subarray(0,4))}-${mm.toHex(I.subarray(4,6))}-${mm.toHex(I.subarray(6,8))}-${mm.toHex(I.subarray(8,10))}-${mm.toHex(I.subarray(10))}`
                            };
                            break;
                        default:
                            throw new Error("Unrecognized header type tag")
                    }
                }
                return B
            }
        },
        aCB = "boolean",
        wi6 = "byte",
        $i6 = "short",
        qi6 = "integer",
        Ni6 = "long",
        Li6 = "binary",
        Mi6 = "string",
        Ri6 = "timestamp",
        Oi6 = "uuid",
        Ti6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        Pi6 = j_1(),
        oCB = 4,
        Bv = oCB * 2,
        dm = 4,
        Si6 = Bv + dm * 2;

    function tCB({
        byteLength: A,
        byteOffset: B,
        buffer: Q
    }) {
        if (A < Si6) throw new Error("Provided message too short to accommodate event stream message overhead");
        let Z = new DataView(Q, B, A),
            D = Z.getUint32(0, !1);
        if (A !== D) throw new Error("Reported message length does not match received message length");
        let G = Z.getUint32(oCB, !1),
            F = Z.getUint32(Bv, !1),
            I = Z.getUint32(A - dm, !1),
            Y = new Pi6.Crc32().update(new Uint8Array(Q, B, Bv));
        if (F !== Y.digest()) throw new Error(`The prelude checksum specified in the message (${F}) does not match the calculated CRC32 checksum (${Y.digest()})`);
        if (Y.update(new Uint8Array(Q, B + Bv, A - (Bv + dm))), I !== Y.digest()) throw new Error(`The message checksum (${Y.digest()}) did not match the expected value of ${I}`);
        return {
            headers: new DataView(Q, B + Bv + dm, G),
            body: new Uint8Array(Q, B + Bv + dm + G, D - G - (Bv + dm + dm))
        }
    }
    AS(tCB, "splitMessage");
    var ji6 = class {
            static {
                AS(this, "EventStreamCodec")
            }
            constructor(A, B) {
                this.headerMarshaller = new rCB(A, B), this.messageBuffer = [], this.isEndOfStream = !1
            }
            feed(A) {
                this.messageBuffer.push(this.decode(A))
            }
            endOfStream() {
                this.isEndOfStream = !0
            }
            getMessage() {
                let A = this.messageBuffer.pop(),
                    B = this.isEndOfStream;
                return {
                    getMessage() {
                        return A
                    },
                    isEndOfStream() {
                        return B
                    }
                }
            }
            getAvailableMessages() {
                let A = this.messageBuffer;
                this.messageBuffer = [];
                let B = this.isEndOfStream;
                return {
                    getMessages() {
                        return A
                    },
                    isEndOfStream() {
                        return B
                    }
                }
            }
            encode({
                headers: A,
                body: B
            }) {
                let Q = this.headerMarshaller.format(A),
                    Z = Q.byteLength + B.byteLength + 16,
                    D = new Uint8Array(Z),
                    G = new DataView(D.buffer, D.byteOffset, D.byteLength),
                    F = new Ui6.Crc32;
                return G.setUint32(0, Z, !1), G.setUint32(4, Q.byteLength, !1), G.setUint32(8, F.update(D.subarray(0, 8)).digest(), !1), D.set(Q, 12), D.set(B, Q.byteLength + 12), G.setUint32(Z - 4, F.update(D.subarray(8, Z - 4)).digest(), !1), D
            }
            decode(A) {
                let {
                    headers: B,
                    body: Q
                } = tCB(A);
                return {
                    headers: this.headerMarshaller.parse(B),
                    body: Q
                }
            }
            formatHeaders(A) {
                return this.headerMarshaller.format(A)
            }
        },
        ki6 = class {
            constructor(A) {
                this.options = A
            }
            static {
                AS(this, "MessageDecoderStream")
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let A of this.options.inputStream) yield this.options.decoder.decode(A)
            }
        },
        yi6 = class {
            constructor(A) {
                this.options = A
            }
            static {
                AS(this, "MessageEncoderStream")
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let A of this.options.messageStream) yield this.options.encoder.encode(A);
                if (this.options.includeEndFrame) yield new Uint8Array(0)
            }
        },
        _i6 = class {
            constructor(A) {
                this.options = A
            }
            static {
                AS(this, "SmithyMessageDecoderStream")
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let A of this.options.messageStream) {
                    let B = await this.options.deserializer(A);
                    if (B === void 0) continue;
                    yield B
                }
            }
        },
        xi6 = class {
            constructor(A) {
                this.options = A
            }
            static {
                AS(this, "SmithyMessageEncoderStream")
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let A of this.options.inputStream) yield this.options.serializer(A)
            }
        }
});
var ZKB = E((j43, QKB) => {
    var {
        defineProperty: x_1,
        getOwnPropertyDescriptor: vi6,
        getOwnPropertyNames: bi6
    } = Object, fi6 = Object.prototype.hasOwnProperty, v_1 = (A, B) => x_1(A, "name", {
        value: B,
        configurable: !0
    }), hi6 = (A, B) => {
        for (var Q in B) x_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, gi6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bi6(B))
                if (!fi6.call(A, D) && D !== Q) x_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vi6(B, D)) || Z.enumerable
                })
        }
        return A
    }, ui6 = (A) => gi6(x_1({}, "__esModule", {
        value: !0
    }), A), AKB = {};
    hi6(AKB, {
        eventStreamPayloadHandlerProvider: () => li6
    });
    QKB.exports = ui6(AKB);
    var mi6 = lE0(),
        __1 = W1("stream"),
        di6 = class extends __1.Transform {
            static {
                v_1(this, "EventSigningStream")
            }
            priorSignature;
            messageSigner;
            eventStreamCodec;
            systemClockOffsetProvider;
            constructor(A) {
                super({
                    autoDestroy: !0,
                    readableObjectMode: !0,
                    writableObjectMode: !0,
                    ...A
                });
                this.priorSignature = A.priorSignature, this.eventStreamCodec = A.eventStreamCodec, this.messageSigner = A.messageSigner, this.systemClockOffsetProvider = A.systemClockOffsetProvider
            }
            async _transform(A, B, Q) {
                try {
                    let Z = new Date(Date.now() + await this.systemClockOffsetProvider()),
                        D = {
                            ":date": {
                                type: "timestamp",
                                value: Z
                            }
                        },
                        G = await this.messageSigner.sign({
                            message: {
                                body: A,
                                headers: D
                            },
                            priorSignature: this.priorSignature
                        }, {
                            signingDate: Z
                        });
                    this.priorSignature = G.signature;
                    let F = this.eventStreamCodec.encode({
                        headers: {
                            ...D,
                            ":chunk-signature": {
                                type: "binary",
                                value: BKB(G.signature)
                            }
                        },
                        body: A
                    });
                    return this.push(F), Q()
                } catch (Z) {
                    Q(Z)
                }
            }
        };

    function BKB(A) {
        let B = Buffer.from(A, "hex");
        return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }
    v_1(BKB, "getSignatureBinary");
    var ci6 = class {
            static {
                v_1(this, "EventStreamPayloadHandler")
            }
            messageSigner;
            eventStreamCodec;
            systemClockOffsetProvider;
            constructor(A) {
                this.messageSigner = A.messageSigner, this.eventStreamCodec = new mi6.EventStreamCodec(A.utf8Encoder, A.utf8Decoder), this.systemClockOffsetProvider = async () => A.systemClockOffset ?? 0
            }
            async handle(A, B, Q = {}) {
                let Z = B.request,
                    {
                        body: D,
                        query: G
                    } = Z;
                if (!(D instanceof __1.Readable)) throw new Error("Eventstream payload must be a Readable stream.");
                let F = D;
                Z.body = new __1.PassThrough({
                    objectMode: !0
                });
                let Y = Z.headers?.authorization?.match(/Signature=([\w]+)$/)?.[1] ?? G?.["X-Amz-Signature"] ?? "",
                    W = new di6({
                        priorSignature: Y,
                        eventStreamCodec: this.eventStreamCodec,
                        messageSigner: await this.messageSigner(),
                        systemClockOffsetProvider: this.systemClockOffsetProvider
                    });
                __1.pipeline(F, W, Z.body, (X) => {
                    if (X) throw X
                });
                let J;
                try {
                    J = await A(B)
                } catch (X) {
                    throw Z.body.end(), X
                }
                return J
            }
        },
        li6 = v_1((A) => new ci6(A), "eventStreamPayloadHandlerProvider")
});