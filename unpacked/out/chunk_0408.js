/* chunk:408 bytes:[9472735, 9484994) size:12259 source:unpacked-cli.js */
var $CB = E((J43, wCB) => {
    var {
        defineProperty: T_1,
        getOwnPropertyDescriptor: $p6,
        getOwnPropertyNames: qp6
    } = Object, Np6 = Object.prototype.hasOwnProperty, Lp6 = (A, B) => T_1(A, "name", {
        value: B,
        configurable: !0
    }), Mp6 = (A, B) => {
        for (var Q in B) T_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Rp6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qp6(B))
                if (!Np6.call(A, D) && D !== Q) T_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $p6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Op6 = (A) => Rp6(T_1({}, "__esModule", {
        value: !0
    }), A), UCB = {};
    Mp6(UCB, {
        isArrayBuffer: () => Tp6
    });
    wCB.exports = Op6(UCB);
    var Tp6 = Lp6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var MCB = E((X43, LCB) => {
    var {
        defineProperty: P_1,
        getOwnPropertyDescriptor: Pp6,
        getOwnPropertyNames: Sp6
    } = Object, jp6 = Object.prototype.hasOwnProperty, qCB = (A, B) => P_1(A, "name", {
        value: B,
        configurable: !0
    }), kp6 = (A, B) => {
        for (var Q in B) P_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yp6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Sp6(B))
                if (!jp6.call(A, D) && D !== Q) P_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Pp6(B, D)) || Z.enumerable
                })
        }
        return A
    }, _p6 = (A) => yp6(P_1({}, "__esModule", {
        value: !0
    }), A), NCB = {};
    kp6(NCB, {
        fromArrayBuffer: () => vp6,
        fromString: () => bp6
    });
    LCB.exports = _p6(NCB);
    var xp6 = $CB(),
        hE0 = W1("buffer"),
        vp6 = qCB((A, B = 0, Q = A.byteLength - B) => {
            if (!xp6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
            return hE0.Buffer.from(A, B, Q)
        }, "fromArrayBuffer"),
        bp6 = qCB((A, B) => {
            if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
            return B ? hE0.Buffer.from(A, B) : hE0.Buffer.from(A)
        }, "fromString")
});
var SCB = E((V43, PCB) => {
    var {
        defineProperty: S_1,
        getOwnPropertyDescriptor: fp6,
        getOwnPropertyNames: hp6
    } = Object, gp6 = Object.prototype.hasOwnProperty, gE0 = (A, B) => S_1(A, "name", {
        value: B,
        configurable: !0
    }), up6 = (A, B) => {
        for (var Q in B) S_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, mp6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of hp6(B))
                if (!gp6.call(A, D) && D !== Q) S_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = fp6(B, D)) || Z.enumerable
                })
        }
        return A
    }, dp6 = (A) => mp6(S_1({}, "__esModule", {
        value: !0
    }), A), RCB = {};
    up6(RCB, {
        fromUtf8: () => TCB,
        toUint8Array: () => cp6,
        toUtf8: () => lp6
    });
    PCB.exports = dp6(RCB);
    var OCB = MCB(),
        TCB = gE0((A) => {
            let B = OCB.fromString(A, "utf8");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
        }, "fromUtf8"),
        cp6 = gE0((A) => {
            if (typeof A === "string") return TCB(A);
            if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            return new Uint8Array(A)
        }, "toUint8Array"),
        lp6 = gE0((A) => {
            if (typeof A === "string") return A;
            if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
            return OCB.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
        }, "toUtf8")
});
var yCB = E((jCB) => {
    Object.defineProperty(jCB, "__esModule", {
        value: !0
    });
    jCB.convertToBuffer = void 0;
    var pp6 = SCB(),
        ip6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
            return Buffer.from(A, "utf8")
        } : pp6.fromUtf8;

    function np6(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return ip6(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A)
    }
    jCB.convertToBuffer = np6
});
var vCB = E((_CB) => {
    Object.defineProperty(_CB, "__esModule", {
        value: !0
    });
    _CB.isEmptyData = void 0;

    function ap6(A) {
        if (typeof A === "string") return A.length === 0;
        return A.byteLength === 0
    }
    _CB.isEmptyData = ap6
});
var hCB = E((bCB) => {
    Object.defineProperty(bCB, "__esModule", {
        value: !0
    });
    bCB.numToUint8 = void 0;

    function sp6(A) {
        return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
    }
    bCB.numToUint8 = sp6
});
var mCB = E((gCB) => {
    Object.defineProperty(gCB, "__esModule", {
        value: !0
    });
    gCB.uint32ArrayFrom = void 0;

    function rp6(A) {
        if (!Uint32Array.from) {
            var B = new Uint32Array(A.length),
                Q = 0;
            while (Q < A.length) B[Q] = A[Q], Q += 1;
            return B
        }
        return Uint32Array.from(A)
    }
    gCB.uint32ArrayFrom = rp6
});
var uE0 = E((G11) => {
    Object.defineProperty(G11, "__esModule", {
        value: !0
    });
    G11.uint32ArrayFrom = G11.numToUint8 = G11.isEmptyData = G11.convertToBuffer = void 0;
    var op6 = yCB();
    Object.defineProperty(G11, "convertToBuffer", {
        enumerable: !0,
        get: function() {
            return op6.convertToBuffer
        }
    });
    var tp6 = vCB();
    Object.defineProperty(G11, "isEmptyData", {
        enumerable: !0,
        get: function() {
            return tp6.isEmptyData
        }
    });
    var ep6 = hCB();
    Object.defineProperty(G11, "numToUint8", {
        enumerable: !0,
        get: function() {
            return ep6.numToUint8
        }
    });
    var Ai6 = mCB();
    Object.defineProperty(G11, "uint32ArrayFrom", {
        enumerable: !0,
        get: function() {
            return Ai6.uint32ArrayFrom
        }
    })
});
var iCB = E((lCB) => {
    Object.defineProperty(lCB, "__esModule", {
        value: !0
    });
    lCB.AwsCrc32 = void 0;
    var dCB = fE0(),
        mE0 = uE0(),
        cCB = j_1(),
        Qi6 = function() {
            function A() {
                this.crc32 = new cCB.Crc32
            }
            return A.prototype.update = function(B) {
                if (mE0.isEmptyData(B)) return;
                this.crc32.update(mE0.convertToBuffer(B))
            }, A.prototype.digest = function() {
                return dCB.__awaiter(this, void 0, void 0, function() {
                    return dCB.__generator(this, function(B) {
                        return [2, mE0.numToUint8(this.crc32.digest())]
                    })
                })
            }, A.prototype.reset = function() {
                this.crc32 = new cCB.Crc32
            }, A
        }();
    lCB.AwsCrc32 = Qi6
});
var j_1 = E((dE0) => {
    Object.defineProperty(dE0, "__esModule", {
        value: !0
    });
    dE0.AwsCrc32 = dE0.Crc32 = dE0.crc32 = void 0;
    var Zi6 = fE0(),
        Di6 = uE0();

    function Gi6(A) {
        return new nCB().update(A).digest()
    }
    dE0.crc32 = Gi6;
    var nCB = function() {
        function A() {
            this.checksum = 4294967295
        }
        return A.prototype.update = function(B) {
            var Q, Z;
            try {
                for (var D = Zi6.__values(B), G = D.next(); !G.done; G = D.next()) {
                    var F = G.value;
                    this.checksum = this.checksum >>> 8 ^ Ii6[(this.checksum ^ F) & 255]
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
    dE0.Crc32 = nCB;
    var Fi6 = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
        Ii6 = Di6.uint32ArrayFrom(Fi6),
        Yi6 = iCB();
    Object.defineProperty(dE0, "AwsCrc32", {
        enumerable: !0,
        get: function() {
            return Yi6.AwsCrc32
        }
    })
});