/* chunk:402 bytes:[9375194, 9379032) size:3838 source:unpacked-cli.js */
var FXB = E((DXB) => {
    Object.defineProperty(DXB, "__esModule", {
        value: !0
    });
    DXB.sdkStreamMixin = void 0;
    var Yc6 = QXB(),
        Wc6 = JE0(),
        EE0 = W1("stream"),
        Jc6 = W1("util"),
        ZXB = "The stream has already been transformed.",
        Xc6 = (A) => {
            var B, Q;
            if (!(A instanceof EE0.Readable)) {
                let G = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
                throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${G}`)
            }
            let Z = !1,
                D = async () => {
                    if (Z) throw new Error(ZXB);
                    return Z = !0, await Yc6.streamCollector(A)
                };
            return Object.assign(A, {
                transformToByteArray: D,
                transformToString: async (G) => {
                    let F = await D();
                    if (G === void 0 || Buffer.isEncoding(G)) return Wc6.fromArrayBuffer(F.buffer, F.byteOffset, F.byteLength).toString(G);
                    else return new Jc6.TextDecoder(G).decode(F)
                },
                transformToWebStream: () => {
                    if (Z) throw new Error(ZXB);
                    if (A.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
                    if (typeof EE0.Readable.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please make sure you are using Node.js >= 17.0.0, or polyfill is available.");
                    return Z = !0, EE0.Readable.toWeb(A)
                }
            })
        };
    DXB.sdkStreamMixin = Xc6
});
var CXB = E((rQ3, X_1) => {
    var {
        defineProperty: W_1,
        getOwnPropertyDescriptor: Vc6,
        getOwnPropertyNames: Cc6
    } = Object, Kc6 = Object.prototype.hasOwnProperty, $E0 = (A, B) => W_1(A, "name", {
        value: B,
        configurable: !0
    }), Hc6 = (A, B) => {
        for (var Q in B) W_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, UE0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Cc6(B))
                if (!Kc6.call(A, D) && D !== Q) W_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Vc6(B, D)) || Z.enumerable
                })
        }
        return A
    }, IXB = (A, B, Q) => (UE0(A, B, "default"), Q && UE0(Q, B, "default")), zc6 = (A) => UE0(W_1({}, "__esModule", {
        value: !0
    }), A), J_1 = {};
    Hc6(J_1, {
        Uint8ArrayBlobAdapter: () => wE0
    });
    X_1.exports = zc6(J_1);
    var YXB = IE0(),
        WXB = SJB();

    function JXB(A, B = "utf-8") {
        if (B === "base64") return YXB.toBase64(A);
        return WXB.toUtf8(A)
    }
    $E0(JXB, "transformToString");

    function XXB(A, B) {
        if (B === "base64") return wE0.mutate(YXB.fromBase64(A));
        return wE0.mutate(WXB.fromUtf8(A))
    }
    $E0(XXB, "transformFromString");
    var VXB = class A extends Uint8Array {
        static fromString(B, Q = "utf-8") {
            switch (typeof B) {
                case "string":
                    return XXB(B, Q);
                default:
                    throw new Error(`Unsupported conversion from ${typeof B} to Uint8ArrayBlobAdapter.`)
            }
        }
        static mutate(B) {
            return Object.setPrototypeOf(B, A.prototype), B
        }
        transformToString(B = "utf-8") {
            return JXB(this, B)
        }
    };
    $E0(VXB, "Uint8ArrayBlobAdapter");
    var wE0 = VXB;
    IXB(J_1, yJB(), X_1.exports);
    IXB(J_1, FXB(), X_1.exports)
});