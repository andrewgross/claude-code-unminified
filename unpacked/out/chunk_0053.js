/* chunk:53 bytes:[1346293, 1348259) size:1966 source:unpacked-cli.js */
var E2A = E((H2A) => {
    Object.defineProperty(H2A, "__esModule", {
        value: !0
    });
    H2A.fromBase64 = void 0;
    var zd9 = GZ(),
        Ed9 = /^[A-Za-z0-9+/]*={0,2}$/,
        Ud9 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!Ed9.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = zd9.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    H2A.fromBase64 = Ud9
});
var $2A = E((U2A) => {
    Object.defineProperty(U2A, "__esModule", {
        value: !0
    });
    U2A.toBase64 = void 0;
    var wd9 = GZ(),
        $d9 = lB(),
        qd9 = (A) => {
            let B;
            if (typeof A === "string") B = $d9.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return wd9.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    U2A.toBase64 = qd9
});
var an1 = E((Q15, ZK1) => {
    var {
        defineProperty: q2A,
        getOwnPropertyDescriptor: Nd9,
        getOwnPropertyNames: Ld9
    } = Object, Md9 = Object.prototype.hasOwnProperty, in1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ld9(B))
                if (!Md9.call(A, D) && D !== Q) q2A(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Nd9(B, D)) || Z.enumerable
                })
        }
        return A
    }, N2A = (A, B, Q) => (in1(A, B, "default"), Q && in1(Q, B, "default")), Rd9 = (A) => in1(q2A({}, "__esModule", {
        value: !0
    }), A), nn1 = {};
    ZK1.exports = Rd9(nn1);
    N2A(nn1, E2A(), ZK1.exports);
    N2A(nn1, $2A(), ZK1.exports)
});