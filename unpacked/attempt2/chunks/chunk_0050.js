/* chunk:50 bytes:[1300210, 1309025) size:8815 source:unpacked-cli.js */
var Uk = E((he8, xAA) => {
    var {
        defineProperty: tC1,
        getOwnPropertyDescriptor: vu9,
        getOwnPropertyNames: bu9
    } = Object, fu9 = Object.prototype.hasOwnProperty, SAA = (A, B) => tC1(A, "name", {
        value: B,
        configurable: !0
    }), hu9 = (A, B) => {
        for (var Q in B) tC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, gu9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bu9(B))
                if (!fu9.call(A, D) && D !== Q) tC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vu9(B, D)) || Z.enumerable
                })
        }
        return A
    }, uu9 = (A) => gu9(tC1({}, "__esModule", {
        value: !0
    }), A), jAA = {};
    hu9(jAA, {
        fromHex: () => yAA,
        toHex: () => _AA
    });
    xAA.exports = uu9(jAA);
    var kAA = {},
        Tn1 = {};
    for (let A = 0; A < 256; A++) {
        let B = A.toString(16).toLowerCase();
        if (B.length === 1) B = `0${B}`;
        kAA[A] = B, Tn1[B] = A
    }

    function yAA(A) {
        if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
        let B = new Uint8Array(A.length / 2);
        for (let Q = 0; Q < A.length; Q += 2) {
            let Z = A.slice(Q, Q + 2).toLowerCase();
            if (Z in Tn1) B[Q / 2] = Tn1[Z];
            else throw new Error(`Cannot decode unrecognized sequence ${Z} as hexadecimal`)
        }
        return B
    }
    SAA(yAA, "fromHex");

    function _AA(A) {
        let B = "";
        for (let Q = 0; Q < A.byteLength; Q++) B += kAA[A[Q]];
        return B
    }
    SAA(_AA, "toHex")
});
var uAA = E((hAA) => {
    Object.defineProperty(hAA, "__esModule", {
        value: !0
    });
    hAA.sdkStreamMixin = void 0;
    var mu9 = PAA(),
        du9 = up(),
        cu9 = Uk(),
        lu9 = lB(),
        vAA = Hk(),
        bAA = "The stream has already been transformed.",
        pu9 = (A) => {
            var B, Q;
            if (!fAA(A) && !vAA.isReadableStream(A)) {
                let F = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
                throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${F}`)
            }
            let Z = !1,
                D = async () => {
                    if (Z) throw new Error(bAA);
                    return Z = !0, await mu9.streamCollector(A)
                }, G = (F) => {
                    if (typeof F.stream !== "function") throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);
                    return F.stream()
                };
            return Object.assign(A, {
                transformToByteArray: D,
                transformToString: async (F) => {
                    let I = await D();
                    if (F === "base64") return du9.toBase64(I);
                    else if (F === "hex") return cu9.toHex(I);
                    else if (F === void 0 || F === "utf8" || F === "utf-8") return lu9.toUtf8(I);
                    else if (typeof TextDecoder === "function") return new TextDecoder(F).decode(I);
                    else throw new Error("TextDecoder is not available, please make sure polyfill is provided.")
                },
                transformToWebStream: () => {
                    if (Z) throw new Error(bAA);
                    if (Z = !0, fAA(A)) return G(A);
                    else if (vAA.isReadableStream(A)) return A;
                    else throw new Error(`Cannot transform payload to web stream, got ${A}`)
                }
            })
        };
    hAA.sdkStreamMixin = pu9;
    var fAA = (A) => typeof Blob === "function" && A instanceof Blob
});
var lAA = E((dAA) => {
    Object.defineProperty(dAA, "__esModule", {
        value: !0
    });
    dAA.sdkStreamMixin = void 0;
    var iu9 = x3(),
        nu9 = GZ(),
        Pn1 = W1("stream"),
        au9 = uAA(),
        mAA = "The stream has already been transformed.",
        su9 = (A) => {
            var B, Q;
            if (!(A instanceof Pn1.Readable)) try {
                return au9.sdkStreamMixin(A)
            } catch (G) {
                let F = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
                throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${F}`)
            }
            let Z = !1,
                D = async () => {
                    if (Z) throw new Error(mAA);
                    return Z = !0, await iu9.streamCollector(A)
                };
            return Object.assign(A, {
                transformToByteArray: D,
                transformToString: async (G) => {
                    let F = await D();
                    if (G === void 0 || Buffer.isEncoding(G)) return nu9.fromArrayBuffer(F.buffer, F.byteOffset, F.byteLength).toString(G);
                    else return new TextDecoder(G).decode(F)
                },
                transformToWebStream: () => {
                    if (Z) throw new Error(mAA);
                    if (A.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
                    if (typeof Pn1.Readable.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
                    return Z = !0, Pn1.Readable.toWeb(A)
                }
            })
        };
    dAA.sdkStreamMixin = su9
});
var iAA = E((pAA) => {
    Object.defineProperty(pAA, "__esModule", {
        value: !0
    });
    pAA.splitStream = ru9;
    async function ru9(A) {
        if (typeof A.stream === "function") A = A.stream();
        return A.tee()
    }
});
var rAA = E((sAA) => {
    Object.defineProperty(sAA, "__esModule", {
        value: !0
    });
    sAA.splitStream = eu9;
    var nAA = W1("stream"),
        tu9 = iAA(),
        aAA = Hk();
    async function eu9(A) {
        if (aAA.isReadableStream(A) || aAA.isBlob(A)) return tu9.splitStream(A);
        let B = new nAA.PassThrough,
            Q = new nAA.PassThrough;
        return A.pipe(B), A.pipe(Q), [B, Q]
    }
});
var $k = E((ce8, UN) => {
    var {
        defineProperty: eC1,
        getOwnPropertyDescriptor: Bm9,
        getOwnPropertyNames: Qm9
    } = Object, Zm9 = Object.prototype.hasOwnProperty, kn1 = (A, B) => eC1(A, "name", {
        value: B,
        configurable: !0
    }), Dm9 = (A, B) => {
        for (var Q in B) eC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Sn1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Qm9(B))
                if (!Zm9.call(A, D) && D !== Q) eC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Bm9(B, D)) || Z.enumerable
                })
        }
        return A
    }, wk = (A, B, Q) => (Sn1(A, B, "default"), Q && Sn1(Q, B, "default")), Gm9 = (A) => Sn1(eC1({}, "__esModule", {
        value: !0
    }), A), EN = {};
    Dm9(EN, {
        Uint8ArrayBlobAdapter: () => jn1
    });
    UN.exports = Gm9(EN);
    var oAA = up(),
        tAA = lB();

    function eAA(A, B = "utf-8") {
        if (B === "base64") return oAA.toBase64(A);
        return tAA.toUtf8(A)
    }
    kn1(eAA, "transformToString");

    function A2A(A, B) {
        if (B === "base64") return jn1.mutate(oAA.fromBase64(A));
        return jn1.mutate(tAA.fromUtf8(A))
    }
    kn1(A2A, "transformFromString");
    var jn1 = class A extends Uint8Array {
        static {
            kn1(this, "Uint8ArrayBlobAdapter")
        }
        static fromString(B, Q = "utf-8") {
            switch (typeof B) {
                case "string":
                    return A2A(B, Q);
                default:
                    throw new Error(`Unsupported conversion from ${typeof B} to Uint8ArrayBlobAdapter.`)
            }
        }
        static mutate(B) {
            return Object.setPrototypeOf(B, A.prototype), B
        }
        transformToString(B = "utf-8") {
            return eAA(this, B)
        }
    };
    wk(EN, En1(), UN.exports);
    wk(EN, p1A(), UN.exports);
    wk(EN, Z0A(), UN.exports);
    wk(EN, F0A(), UN.exports);
    wk(EN, V0A(), UN.exports);
    wk(EN, lAA(), UN.exports);
    wk(EN, rAA(), UN.exports);
    wk(EN, Hk(), UN.exports)
});