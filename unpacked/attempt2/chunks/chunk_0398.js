/* chunk:398 bytes:[9302542, 9321807) size:19265 source:unpacked-cli.js */
var iy1 = E((ez0) => {
    Object.defineProperty(ez0, "__esModule", {
        value: !0
    });
    ez0.AwsCrc32 = ez0.Crc32 = ez0.crc32 = void 0;
    var Cu6 = rz0(),
        Ku6 = oz0();

    function Hu6(A) {
        return new KWB().update(A).digest()
    }
    ez0.crc32 = Hu6;
    var KWB = function() {
        function A() {
            this.checksum = 4294967295
        }
        return A.prototype.update = function(B) {
            var Q, Z;
            try {
                for (var D = Cu6.__values(B), G = D.next(); !G.done; G = D.next()) {
                    var F = G.value;
                    this.checksum = this.checksum >>> 8 ^ Eu6[(this.checksum ^ F) & 255]
                }
            } catch (I) {
                Q = {
                    error: I
                }
            } finally {
                try {
                    if (G && !G.done && (Z = D.return)) Z.call(D)
                } finally {
                    if (Q) throw Q.error
                }
            }
            return this
        }, A.prototype.digest = function() {
            return (this.checksum ^ 4294967295) >>> 0
        }, A
    }();
    ez0.Crc32 = KWB;
    var zu6 = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
        Eu6 = Ku6.uint32ArrayFrom(zu6),
        Uu6 = CWB();
    Object.defineProperty(ez0, "AwsCrc32", {
        enumerable: !0,
        get: function() {
            return Uu6.AwsCrc32
        }
    })
});
var qWB = E((kQ3, $WB) => {
    var {
        defineProperty: ny1,
        getOwnPropertyDescriptor: Nu6,
        getOwnPropertyNames: Lu6
    } = Object, Mu6 = Object.prototype.hasOwnProperty, HWB = (A, B) => ny1(A, "name", {
        value: B,
        configurable: !0
    }), Ru6 = (A, B) => {
        for (var Q in B) ny1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ou6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Lu6(B))
                if (!Mu6.call(A, D) && D !== Q) ny1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Nu6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Tu6 = (A) => Ou6(ny1({}, "__esModule", {
        value: !0
    }), A), zWB = {};
    Ru6(zWB, {
        fromHex: () => UWB,
        toHex: () => wWB
    });
    $WB.exports = Tu6(zWB);
    var EWB = {},
        AE0 = {};
    for (let A = 0; A < 256; A++) {
        let B = A.toString(16).toLowerCase();
        if (B.length === 1) B = `0${B}`;
        EWB[A] = B, AE0[B] = A
    }

    function UWB(A) {
        if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
        let B = new Uint8Array(A.length / 2);
        for (let Q = 0; Q < A.length; Q += 2) {
            let Z = A.slice(Q, Q + 2).toLowerCase();
            if (Z in AE0) B[Q / 2] = AE0[Z];
            else throw new Error(`Cannot decode unrecognized sequence ${Z} as hexadecimal`)
        }
        return B
    }
    HWB(UWB, "fromHex");

    function wWB(A) {
        let B = "";
        for (let Q = 0; Q < A.byteLength; Q++) B += EWB[A[Q]];
        return B
    }
    HWB(wWB, "toHex")
});
var vWB = E((yQ3, xWB) => {
    var {
        defineProperty: sy1,
        getOwnPropertyDescriptor: Pu6,
        getOwnPropertyNames: Su6
    } = Object, ju6 = Object.prototype.hasOwnProperty, eP = (A, B) => sy1(A, "name", {
        value: B,
        configurable: !0
    }), ku6 = (A, B) => {
        for (var Q in B) sy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yu6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Su6(B))
                if (!ju6.call(A, D) && D !== Q) sy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Pu6(B, D)) || Z.enumerable
                })
        }
        return A
    }, _u6 = (A) => yu6(sy1({}, "__esModule", {
        value: !0
    }), A), LWB = {};
    ku6(LWB, {
        EventStreamCodec: () => iu6,
        HeaderMarshaller: () => OWB,
        Int64: () => ay1,
        MessageDecoderStream: () => nu6,
        MessageEncoderStream: () => au6,
        SmithyMessageDecoderStream: () => su6,
        SmithyMessageEncoderStream: () => ru6
    });
    xWB.exports = _u6(LWB);
    var xu6 = iy1(),
        hm = qWB(),
        MWB = class A {
            constructor(B) {
                if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
            }
            static fromNumber(B) {
                if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
                let Q = new Uint8Array(8);
                for (let Z = 7, D = Math.abs(Math.round(B)); Z > -1 && D > 0; Z--, D /= 256) Q[Z] = D;
                if (B < 0) BE0(Q);
                return new A(Q)
            }
            valueOf() {
                let B = this.bytes.slice(0),
                    Q = B[0] & 128;
                if (Q) BE0(B);
                return parseInt(hm.toHex(B), 16) * (Q ? -1 : 1)
            }
            toString() {
                return String(this.valueOf())
            }
        };
    eP(MWB, "Int64");
    var ay1 = MWB;

    function BE0(A) {
        for (let B = 0; B < 8; B++) A[B] ^= 255;
        for (let B = 7; B > -1; B--)
            if (A[B]++, A[B] !== 0) break
    }
    eP(BE0, "negate");
    var RWB = class A {
        constructor(B, Q) {
            this.toUtf8 = B, this.fromUtf8 = Q
        }
        format(B) {
            let Q = [];
            for (let G of Object.keys(B)) {
                let F = this.fromUtf8(G);
                Q.push(Uint8Array.from([F.byteLength]), F, this.formatHeaderValue(B[G]))
            }
            let Z = new Uint8Array(Q.reduce((G, F) => G + F.byteLength, 0)),
                D = 0;
            for (let G of Q) Z.set(G, D), D += G.byteLength;
            return Z
        }
        formatHeaderValue(B) {
            switch (B.type) {
                case "boolean":
                    return Uint8Array.from([B.value ? 0 : 1]);
                case "byte":
                    return Uint8Array.from([2, B.value]);
                case "short":
                    let Q = new DataView(new ArrayBuffer(3));
                    return Q.setUint8(0, 3), Q.setInt16(1, B.value, !1), new Uint8Array(Q.buffer);
                case "integer":
                    let Z = new DataView(new ArrayBuffer(5));
                    return Z.setUint8(0, 4), Z.setInt32(1, B.value, !1), new Uint8Array(Z.buffer);
                case "long":
                    let D = new Uint8Array(9);
                    return D[0] = 5, D.set(B.value.bytes, 1), D;
                case "binary":
                    let G = new DataView(new ArrayBuffer(3 + B.value.byteLength));
                    G.setUint8(0, 6), G.setUint16(1, B.value.byteLength, !1);
                    let F = new Uint8Array(G.buffer);
                    return F.set(B.value, 3), F;
                case "string":
                    let I = this.fromUtf8(B.value),
                        Y = new DataView(new ArrayBuffer(3 + I.byteLength));
                    Y.setUint8(0, 7), Y.setUint16(1, I.byteLength, !1);
                    let W = new Uint8Array(Y.buffer);
                    return W.set(I, 3), W;
                case "timestamp":
                    let J = new Uint8Array(9);
                    return J[0] = 8, J.set(ay1.fromNumber(B.value.valueOf()).bytes, 1), J;
                case "uuid":
                    if (!cu6.test(B.value)) throw new Error(`Invalid UUID received: ${B.value}`);
                    let X = new Uint8Array(17);
                    return X[0] = 9, X.set(hm.fromHex(B.value.replace(/\-/g, "")), 1), X
            }
        }
        parse(B) {
            let Q = {},
                Z = 0;
            while (Z < B.byteLength) {
                let D = B.getUint8(Z++),
                    G = this.toUtf8(new Uint8Array(B.buffer, B.byteOffset + Z, D));
                switch (Z += D, B.getUint8(Z++)) {
                    case 0:
                        Q[G] = {
                            type: NWB,
                            value: !0
                        };
                        break;
                    case 1:
                        Q[G] = {
                            type: NWB,
                            value: !1
                        };
                        break;
                    case 2:
                        Q[G] = {
                            type: vu6,
                            value: B.getInt8(Z++)
                        };
                        break;
                    case 3:
                        Q[G] = {
                            type: bu6,
                            value: B.getInt16(Z, !1)
                        }, Z += 2;
                        break;
                    case 4:
                        Q[G] = {
                            type: fu6,
                            value: B.getInt32(Z, !1)
                        }, Z += 4;
                        break;
                    case 5:
                        Q[G] = {
                            type: hu6,
                            value: new ay1(new Uint8Array(B.buffer, B.byteOffset + Z, 8))
                        }, Z += 8;
                        break;
                    case 6:
                        let F = B.getUint16(Z, !1);
                        Z += 2, Q[G] = {
                            type: gu6,
                            value: new Uint8Array(B.buffer, B.byteOffset + Z, F)
                        }, Z += F;
                        break;
                    case 7:
                        let I = B.getUint16(Z, !1);
                        Z += 2, Q[G] = {
                            type: uu6,
                            value: this.toUtf8(new Uint8Array(B.buffer, B.byteOffset + Z, I))
                        }, Z += I;
                        break;
                    case 8:
                        Q[G] = {
                            type: mu6,
                            value: new Date(new ay1(new Uint8Array(B.buffer, B.byteOffset + Z, 8)).valueOf())
                        }, Z += 8;
                        break;
                    case 9:
                        let Y = new Uint8Array(B.buffer, B.byteOffset + Z, 16);
                        Z += 16, Q[G] = {
                            type: du6,
                            value: `${hm.toHex(Y.subarray(0,4))}-${hm.toHex(Y.subarray(4,6))}-${hm.toHex(Y.subarray(6,8))}-${hm.toHex(Y.subarray(8,10))}-${hm.toHex(Y.subarray(10))}`
                        };
                        break;
                    default:
                        throw new Error("Unrecognized header type tag")
                }
            }
            return Q
        }
    };
    eP(RWB, "HeaderMarshaller");
    var OWB = RWB,
        NWB = "boolean",
        vu6 = "byte",
        bu6 = "short",
        fu6 = "integer",
        hu6 = "long",
        gu6 = "binary",
        uu6 = "string",
        mu6 = "timestamp",
        du6 = "uuid",
        cu6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        lu6 = iy1(),
        TWB = 4,
        tx = TWB * 2,
        gm = 4,
        pu6 = tx + gm * 2;

    function PWB({
        byteLength: A,
        byteOffset: B,
        buffer: Q
    }) {
        if (A < pu6) throw new Error("Provided message too short to accommodate event stream message overhead");
        let Z = new DataView(Q, B, A),
            D = Z.getUint32(0, !1);
        if (A !== D) throw new Error("Reported message length does not match received message length");
        let G = Z.getUint32(TWB, !1),
            F = Z.getUint32(tx, !1),
            I = Z.getUint32(A - gm, !1),
            Y = new lu6.Crc32().update(new Uint8Array(Q, B, tx));
        if (F !== Y.digest()) throw new Error(`The prelude checksum specified in the message (${F}) does not match the calculated CRC32 checksum (${Y.digest()})`);
        if (Y.update(new Uint8Array(Q, B + tx, A - (tx + gm))), I !== Y.digest()) throw new Error(`The message checksum (${Y.digest()}) did not match the expected value of ${I}`);
        return {
            headers: new DataView(Q, B + tx + gm, G),
            body: new Uint8Array(Q, B + tx + gm + G, D - G - (tx + gm + gm))
        }
    }
    eP(PWB, "splitMessage");
    var SWB = class A {
        constructor(B, Q) {
            this.headerMarshaller = new OWB(B, Q), this.messageBuffer = [], this.isEndOfStream = !1
        }
        feed(B) {
            this.messageBuffer.push(this.decode(B))
        }
        endOfStream() {
            this.isEndOfStream = !0
        }
        getMessage() {
            let B = this.messageBuffer.pop(),
                Q = this.isEndOfStream;
            return {
                getMessage() {
                    return B
                },
                isEndOfStream() {
                    return Q
                }
            }
        }
        getAvailableMessages() {
            let B = this.messageBuffer;
            this.messageBuffer = [];
            let Q = this.isEndOfStream;
            return {
                getMessages() {
                    return B
                },
                isEndOfStream() {
                    return Q
                }
            }
        }
        encode({
            headers: B,
            body: Q
        }) {
            let Z = this.headerMarshaller.format(B),
                D = Z.byteLength + Q.byteLength + 16,
                G = new Uint8Array(D),
                F = new DataView(G.buffer, G.byteOffset, G.byteLength),
                I = new xu6.Crc32;
            return F.setUint32(0, D, !1), F.setUint32(4, Z.byteLength, !1), F.setUint32(8, I.update(G.subarray(0, 8)).digest(), !1), G.set(Z, 12), G.set(Q, Z.byteLength + 12), F.setUint32(D - 4, I.update(G.subarray(8, D - 4)).digest(), !1), G
        }
        decode(B) {
            let {
                headers: Q,
                body: Z
            } = PWB(B);
            return {
                headers: this.headerMarshaller.parse(Q),
                body: Z
            }
        }
        formatHeaders(B) {
            return this.headerMarshaller.format(B)
        }
    };
    eP(SWB, "EventStreamCodec");
    var iu6 = SWB,
        jWB = class A {
            constructor(B) {
                this.options = B
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let B of this.options.inputStream) yield this.options.decoder.decode(B)
            }
        };
    eP(jWB, "MessageDecoderStream");
    var nu6 = jWB,
        kWB = class A {
            constructor(B) {
                this.options = B
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let B of this.options.messageStream) yield this.options.encoder.encode(B);
                if (this.options.includeEndFrame) yield new Uint8Array(0)
            }
        };
    eP(kWB, "MessageEncoderStream");
    var au6 = kWB,
        yWB = class A {
            constructor(B) {
                this.options = B
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let B of this.options.messageStream) {
                    let Q = await this.options.deserializer(B);
                    if (Q === void 0) continue;
                    yield Q
                }
            }
        };
    eP(yWB, "SmithyMessageDecoderStream");
    var su6 = yWB,
        _WB = class A {
            constructor(B) {
                this.options = B
            } [Symbol.asyncIterator]() {
                return this.asyncIterator()
            }
            async * asyncIterator() {
                for await (let B of this.options.inputStream) yield this.options.serializer(B)
            }
        };
    eP(_WB, "SmithyMessageEncoderStream");
    var ru6 = _WB
});