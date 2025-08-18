/* chunk:343 bytes:[8117759, 8129799) size:12040 source:unpacked-cli.js */
var mX0 = E((Re2) => {
    Object.defineProperty(Re2, "__esModule", {
        value: !0
    });
    Re2.FilterStackFactory = Re2.FilterStack = void 0;
    class gX0 {
        constructor(A) {
            this.filters = A
        }
        sendMetadata(A) {
            let B = A;
            for (let Q = 0; Q < this.filters.length; Q++) B = this.filters[Q].sendMetadata(B);
            return B
        }
        receiveMetadata(A) {
            let B = A;
            for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveMetadata(B);
            return B
        }
        sendMessage(A) {
            let B = A;
            for (let Q = 0; Q < this.filters.length; Q++) B = this.filters[Q].sendMessage(B);
            return B
        }
        receiveMessage(A) {
            let B = A;
            for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveMessage(B);
            return B
        }
        receiveTrailers(A) {
            let B = A;
            for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveTrailers(B);
            return B
        }
        push(A) {
            this.filters.unshift(...A)
        }
        getFilters() {
            return this.filters
        }
    }
    Re2.FilterStack = gX0;
    class uX0 {
        constructor(A) {
            this.factories = A
        }
        push(A) {
            this.factories.unshift(...A)
        }
        clone() {
            return new uX0([...this.factories])
        }
        createFilter() {
            return new gX0(this.factories.map((A) => A.createFilter()))
        }
    }
    Re2.FilterStackFactory = uX0
});
var dX0 = E((Pe2) => {
    Object.defineProperty(Pe2, "__esModule", {
        value: !0
    });
    Pe2.CompressionAlgorithms = void 0;
    var Te2;
    (function(A) {
        A[A.identity = 0] = "identity", A[A.deflate = 1] = "deflate", A[A.gzip = 2] = "gzip"
    })(Te2 || (Pe2.CompressionAlgorithms = Te2 = {}))
});
var cX0 = E((ke2) => {
    Object.defineProperty(ke2, "__esModule", {
        value: !0
    });
    ke2.BaseFilter = void 0;
    class je2 {
        async sendMetadata(A) {
            return A
        }
        receiveMetadata(A) {
            return A
        }
        async sendMessage(A) {
            return A
        }
        async receiveMessage(A) {
            return A
        }
        receiveTrailers(A) {
            return A
        }
    }
    ke2.BaseFilter = je2
});
var me2 = E((ge2) => {
    Object.defineProperty(ge2, "__esModule", {
        value: !0
    });
    ge2.CompressionFilterFactory = ge2.CompressionFilter = void 0;
    var FS1 = W1("zlib"),
        xe2 = dX0(),
        ct = b6(),
        qU6 = cX0(),
        NU6 = I7(),
        LU6 = (A) => {
            return typeof A === "number" && typeof xe2.CompressionAlgorithms[A] === "string"
        };
    class N71 {
        async writeMessage(A, B) {
            let Q = A;
            if (B) Q = await this.compressMessage(Q);
            let Z = Buffer.allocUnsafe(Q.length + 5);
            return Z.writeUInt8(B ? 1 : 0, 0), Z.writeUInt32BE(Q.length, 1), Q.copy(Z, 5), Z
        }
        async readMessage(A) {
            let B = A.readUInt8(0) === 1,
                Q = A.slice(5);
            if (B) Q = await this.decompressMessage(Q);
            return Q
        }
    }
    class lt extends N71 {
        async compressMessage(A) {
            return A
        }
        async writeMessage(A, B) {
            let Q = Buffer.allocUnsafe(A.length + 5);
            return Q.writeUInt8(0, 0), Q.writeUInt32BE(A.length, 1), A.copy(Q, 5), Q
        }
        decompressMessage(A) {
            return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'))
        }
    }
    class ve2 extends N71 {
        constructor(A) {
            super();
            this.maxRecvMessageLength = A
        }
        compressMessage(A) {
            return new Promise((B, Q) => {
                FS1.deflate(A, (Z, D) => {
                    if (Z) Q(Z);
                    else B(D)
                })
            })
        }
        decompressMessage(A) {
            return new Promise((B, Q) => {
                let Z = 0,
                    D = [],
                    G = FS1.createInflate();
                G.on("data", (F) => {
                    if (D.push(F), Z += F.byteLength, this.maxRecvMessageLength !== -1 && Z > this.maxRecvMessageLength) G.destroy(), Q({
                        code: ct.Status.RESOURCE_EXHAUSTED,
                        details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
                    })
                }), G.on("end", () => {
                    B(Buffer.concat(D))
                }), G.write(A), G.end()
            })
        }
    }
    class be2 extends N71 {
        constructor(A) {
            super();
            this.maxRecvMessageLength = A
        }
        compressMessage(A) {
            return new Promise((B, Q) => {
                FS1.gzip(A, (Z, D) => {
                    if (Z) Q(Z);
                    else B(D)
                })
            })
        }
        decompressMessage(A) {
            return new Promise((B, Q) => {
                let Z = 0,
                    D = [],
                    G = FS1.createGunzip();
                G.on("data", (F) => {
                    if (D.push(F), Z += F.byteLength, this.maxRecvMessageLength !== -1 && Z > this.maxRecvMessageLength) G.destroy(), Q({
                        code: ct.Status.RESOURCE_EXHAUSTED,
                        details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
                    })
                }), G.on("end", () => {
                    B(Buffer.concat(D))
                }), G.write(A), G.end()
            })
        }
    }
    class fe2 extends N71 {
        constructor(A) {
            super();
            this.compressionName = A
        }
        compressMessage(A) {
            return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`))
        }
        decompressMessage(A) {
            return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`))
        }
    }

    function _e2(A, B) {
        switch (A) {
            case "identity":
                return new lt;
            case "deflate":
                return new ve2(B);
            case "gzip":
                return new be2(B);
            default:
                return new fe2(A)
        }
    }
    class lX0 extends qU6.BaseFilter {
        constructor(A, B) {
            var Q, Z, D;
            super();
            this.sharedFilterConfig = B, this.sendCompression = new lt, this.receiveCompression = new lt, this.currentCompressionAlgorithm = "identity";
            let G = A["grpc.default_compression_algorithm"];
            if (this.maxReceiveMessageLength = (Q = A["grpc.max_receive_message_length"]) !== null && Q !== void 0 ? Q : ct.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH, this.maxSendMessageLength = (Z = A["grpc.max_send_message_length"]) !== null && Z !== void 0 ? Z : ct.DEFAULT_MAX_SEND_MESSAGE_LENGTH, G !== void 0)
                if (LU6(G)) {
                    let F = xe2.CompressionAlgorithms[G],
                        I = (D = B.serverSupportedEncodingHeader) === null || D === void 0 ? void 0 : D.split(",");
                    if (!I || I.includes(F)) this.currentCompressionAlgorithm = F, this.sendCompression = _e2(this.currentCompressionAlgorithm, -1)
                } else NU6.log(ct.LogVerbosity.ERROR, `Invalid value provided for grpc.default_compression_algorithm option: ${G}`)
        }
        async sendMetadata(A) {
            let B = await A;
            if (B.set("grpc-accept-encoding", "identity,deflate,gzip"), B.set("accept-encoding", "identity"), this.currentCompressionAlgorithm === "identity") B.remove("grpc-encoding");
            else B.set("grpc-encoding", this.currentCompressionAlgorithm);
            return B
        }
        receiveMetadata(A) {
            let B = A.get("grpc-encoding");
            if (B.length > 0) {
                let Z = B[0];
                if (typeof Z === "string") this.receiveCompression = _e2(Z, this.maxReceiveMessageLength)
            }
            A.remove("grpc-encoding");
            let Q = A.get("grpc-accept-encoding")[0];
            if (Q) {
                if (this.sharedFilterConfig.serverSupportedEncodingHeader = Q, !Q.split(",").includes(this.currentCompressionAlgorithm)) this.sendCompression = new lt, this.currentCompressionAlgorithm = "identity"
            }
            return A.remove("grpc-accept-encoding"), A
        }
        async sendMessage(A) {
            var B;
            let Q = await A;
            if (this.maxSendMessageLength !== -1 && Q.message.length > this.maxSendMessageLength) throw {
                code: ct.Status.RESOURCE_EXHAUSTED,
                details: `Attempted to send message with a size larger than ${this.maxSendMessageLength}`
            };
            let Z;
            if (this.sendCompression instanceof lt) Z = !1;
            else Z = (((B = Q.flags) !== null && B !== void 0 ? B : 0) & 2) === 0;
            return {
                message: await this.sendCompression.writeMessage(Q.message, Z),
                flags: Q.flags
            }
        }
        async receiveMessage(A) {
            return this.receiveCompression.readMessage(await A)
        }
    }
    ge2.CompressionFilter = lX0;
    class he2 {
        constructor(A, B) {
            this.options = B, this.sharedFilterConfig = {}
        }
        createFilter() {
            return new lX0(this.options, this.sharedFilterConfig)
        }
    }
    ge2.CompressionFilterFactory = he2
});
var L71 = E((de2) => {
    Object.defineProperty(de2, "__esModule", {
        value: !0
    });
    de2.minDeadline = RU6;
    de2.getDeadlineTimeoutString = TU6;
    de2.getRelativeTimeout = SU6;
    de2.deadlineToString = jU6;
    de2.formatDateDifference = kU6;

    function RU6(...A) {
        let B = 1 / 0;
        for (let Q of A) {
            let Z = Q instanceof Date ? Q.getTime() : Q;
            if (Z < B) B = Z
        }
        return B
    }
    var OU6 = [
        ["m", 1],
        ["S", 1000],
        ["M", 60000],
        ["H", 3600000]
    ];

    function TU6(A) {
        let B = new Date().getTime();
        if (A instanceof Date) A = A.getTime();
        let Q = Math.max(A - B, 0);
        for (let [Z, D] of OU6) {
            let G = Q / D;
            if (G < 1e8) return String(Math.ceil(G)) + Z
        }
        throw new Error("Deadline is too far in the future")
    }
    var PU6 = 2147483647;

    function SU6(A) {
        let B = A instanceof Date ? A.getTime() : A,
            Q = new Date().getTime(),
            Z = B - Q;
        if (Z < 0) return 0;
        else if (Z > PU6) return 1 / 0;
        else return Z
    }

    function jU6(A) {
        if (A instanceof Date) return A.toISOString();
        else {
            let B = new Date(A);
            if (Number.isNaN(B.getTime())) return "" + A;
            else return B.toISOString()
        }
    }

    function kU6(A, B) {
        return ((B.getTime() - A.getTime()) / 1000).toFixed(3) + "s"
    }
});
var IS1 = E((ce2) => {
    Object.defineProperty(ce2, "__esModule", {
        value: !0
    });
    ce2.restrictControlPlaneStatusCode = hU6;
    var zM = b6(),
        fU6 = [zM.Status.OK, zM.Status.INVALID_ARGUMENT, zM.Status.NOT_FOUND, zM.Status.ALREADY_EXISTS, zM.Status.FAILED_PRECONDITION, zM.Status.ABORTED, zM.Status.OUT_OF_RANGE, zM.Status.DATA_LOSS];

    function hU6(A, B) {
        if (fU6.includes(A)) return {
            code: zM.Status.INTERNAL,
            details: `Invalid status from control plane: ${A} ${zM.Status[A]} ${B}`
        };
        else return {
            code: A,
            details: B
        }
    }
});