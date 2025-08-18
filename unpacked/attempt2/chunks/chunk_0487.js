/* chunk:487 bytes:[11665291, 11686248) size:20957 source:unpacked-cli.js */
var rhB = E((My3, shB) => {
    var CW = j4();
    JI1();
    EU();
    LO0();
    b8();
    var chB = hhB(),
        Vq8 = chB.publicKeyValidator,
        Cq8 = chB.privateKeyValidator;
    if (typeof OO0 === "undefined") OO0 = CW.jsbn.BigInteger;
    var OO0, TO0 = CW.util.ByteBuffer,
        zC = typeof Buffer === "undefined" ? Uint8Array : Buffer;
    CW.pki = CW.pki || {};
    shB.exports = CW.pki.ed25519 = CW.ed25519 = CW.ed25519 || {};
    var q6 = CW.ed25519;
    q6.constants = {};
    q6.constants.PUBLIC_KEY_BYTE_LENGTH = 32;
    q6.constants.PRIVATE_KEY_BYTE_LENGTH = 64;
    q6.constants.SEED_BYTE_LENGTH = 32;
    q6.constants.SIGN_BYTE_LENGTH = 64;
    q6.constants.HASH_BYTE_LENGTH = 64;
    q6.generateKeyPair = function(A) {
        A = A || {};
        var B = A.seed;
        if (B === void 0) B = CW.random.getBytesSync(q6.constants.SEED_BYTE_LENGTH);
        else if (typeof B === "string") {
            if (B.length !== q6.constants.SEED_BYTE_LENGTH) throw new TypeError('"seed" must be ' + q6.constants.SEED_BYTE_LENGTH + " bytes in length.")
        } else if (!(B instanceof Uint8Array)) throw new TypeError('"seed" must be a node.js Buffer, Uint8Array, or a binary string.');
        B = mS({
            message: B,
            encoding: "binary"
        });
        var Q = new zC(q6.constants.PUBLIC_KEY_BYTE_LENGTH),
            Z = new zC(q6.constants.PRIVATE_KEY_BYTE_LENGTH);
        for (var D = 0; D < 32; ++D) Z[D] = B[D];
        return Eq8(Q, Z), {
            publicKey: Q,
            privateKey: Z
        }
    };
    q6.privateKeyFromAsn1 = function(A) {
        var B = {},
            Q = [],
            Z = CW.asn1.validate(A, Cq8, B, Q);
        if (!Z) {
            var D = new Error("Invalid Key.");
            throw D.errors = Q, D
        }
        var G = CW.asn1.derToOid(B.privateKeyOid),
            F = CW.oids.EdDSA25519;
        if (G !== F) throw new Error('Invalid OID "' + G + '"; OID must be "' + F + '".');
        var I = B.privateKey,
            Y = mS({
                message: CW.asn1.fromDer(I).value,
                encoding: "binary"
            });
        return {
            privateKeyBytes: Y
        }
    };
    q6.publicKeyFromAsn1 = function(A) {
        var B = {},
            Q = [],
            Z = CW.asn1.validate(A, Vq8, B, Q);
        if (!Z) {
            var D = new Error("Invalid Key.");
            throw D.errors = Q, D
        }
        var G = CW.asn1.derToOid(B.publicKeyOid),
            F = CW.oids.EdDSA25519;
        if (G !== F) throw new Error('Invalid OID "' + G + '"; OID must be "' + F + '".');
        var I = B.ed25519PublicKey;
        if (I.length !== q6.constants.PUBLIC_KEY_BYTE_LENGTH) throw new Error("Key length is invalid.");
        return mS({
            message: I,
            encoding: "binary"
        })
    };
    q6.publicKeyFromPrivateKey = function(A) {
        A = A || {};
        var B = mS({
            message: A.privateKey,
            encoding: "binary"
        });
        if (B.length !== q6.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + q6.constants.PRIVATE_KEY_BYTE_LENGTH);
        var Q = new zC(q6.constants.PUBLIC_KEY_BYTE_LENGTH);
        for (var Z = 0; Z < Q.length; ++Z) Q[Z] = B[32 + Z];
        return Q
    };
    q6.sign = function(A) {
        A = A || {};
        var B = mS(A),
            Q = mS({
                message: A.privateKey,
                encoding: "binary"
            });
        if (Q.length === q6.constants.SEED_BYTE_LENGTH) {
            var Z = q6.generateKeyPair({
                seed: Q
            });
            Q = Z.privateKey
        } else if (Q.length !== q6.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + q6.constants.SEED_BYTE_LENGTH + " or " + q6.constants.PRIVATE_KEY_BYTE_LENGTH);
        var D = new zC(q6.constants.SIGN_BYTE_LENGTH + B.length);
        Uq8(D, B, B.length, Q);
        var G = new zC(q6.constants.SIGN_BYTE_LENGTH);
        for (var F = 0; F < G.length; ++F) G[F] = D[F];
        return G
    };
    q6.verify = function(A) {
        A = A || {};
        var B = mS(A);
        if (A.signature === void 0) throw new TypeError('"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.');
        var Q = mS({
            message: A.signature,
            encoding: "binary"
        });
        if (Q.length !== q6.constants.SIGN_BYTE_LENGTH) throw new TypeError('"options.signature" must have a byte length of ' + q6.constants.SIGN_BYTE_LENGTH);
        var Z = mS({
            message: A.publicKey,
            encoding: "binary"
        });
        if (Z.length !== q6.constants.PUBLIC_KEY_BYTE_LENGTH) throw new TypeError('"options.publicKey" must have a byte length of ' + q6.constants.PUBLIC_KEY_BYTE_LENGTH);
        var D = new zC(q6.constants.SIGN_BYTE_LENGTH + B.length),
            G = new zC(q6.constants.SIGN_BYTE_LENGTH + B.length),
            F;
        for (F = 0; F < q6.constants.SIGN_BYTE_LENGTH; ++F) D[F] = Q[F];
        for (F = 0; F < B.length; ++F) D[F + q6.constants.SIGN_BYTE_LENGTH] = B[F];
        return wq8(G, D, D.length, Z) >= 0
    };

    function mS(A) {
        var B = A.message;
        if (B instanceof Uint8Array || B instanceof zC) return B;
        var Q = A.encoding;
        if (B === void 0)
            if (A.md) B = A.md.digest().getBytes(), Q = "binary";
            else throw new TypeError('"options.message" or "options.md" not specified.');
        if (typeof B === "string" && !Q) throw new TypeError('"options.encoding" must be "binary" or "utf8".');
        if (typeof B === "string") {
            if (typeof Buffer !== "undefined") return Buffer.from(B, Q);
            B = new TO0(B, Q)
        } else if (!(B instanceof TO0)) throw new TypeError('"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.');
        var Z = new zC(B.length());
        for (var D = 0; D < Z.length; ++D) Z[D] = B.at(D);
        return Z
    }
    var PO0 = CQ(),
        _h1 = CQ([1]),
        Kq8 = CQ([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
        Hq8 = CQ([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
        ghB = CQ([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
        uhB = CQ([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
        MO0 = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]),
        zq8 = CQ([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

    function zI1(A, B) {
        var Q = CW.md.sha512.create(),
            Z = new TO0(A);
        Q.update(Z.getBytes(B), "binary");
        var D = Q.digest().getBytes();
        if (typeof Buffer !== "undefined") return Buffer.from(D, "binary");
        var G = new zC(q6.constants.HASH_BYTE_LENGTH);
        for (var F = 0; F < 64; ++F) G[F] = D.charCodeAt(F);
        return G
    }

    function Eq8(A, B) {
        var Q = [CQ(), CQ(), CQ(), CQ()],
            Z, D = zI1(B, 32);
        D[0] &= 248, D[31] &= 127, D[31] |= 64, yO0(Q, D), kO0(A, Q);
        for (Z = 0; Z < 32; ++Z) B[Z + 32] = A[Z];
        return 0
    }

    function Uq8(A, B, Q, Z) {
        var D, G, F = new Float64Array(64),
            I = [CQ(), CQ(), CQ(), CQ()],
            Y = zI1(Z, 32);
        Y[0] &= 248, Y[31] &= 127, Y[31] |= 64;
        var W = Q + 64;
        for (D = 0; D < Q; ++D) A[64 + D] = B[D];
        for (D = 0; D < 32; ++D) A[32 + D] = Y[32 + D];
        var J = zI1(A.subarray(32), Q + 32);
        SO0(J), yO0(I, J), kO0(A, I);
        for (D = 32; D < 64; ++D) A[D] = Z[D];
        var X = zI1(A, Q + 64);
        SO0(X);
        for (D = 32; D < 64; ++D) F[D] = 0;
        for (D = 0; D < 32; ++D) F[D] = J[D];
        for (D = 0; D < 32; ++D)
            for (G = 0; G < 32; G++) F[D + G] += X[D] * Y[G];
        return lhB(A.subarray(32), F), W
    }

    function wq8(A, B, Q, Z) {
        var D, G, F = new zC(32),
            I = [CQ(), CQ(), CQ(), CQ()],
            Y = [CQ(), CQ(), CQ(), CQ()];
        if (G = -1, Q < 64) return -1;
        if ($q8(Y, Z)) return -1;
        for (D = 0; D < Q; ++D) A[D] = B[D];
        for (D = 0; D < 32; ++D) A[D + 32] = Z[D];
        var W = zI1(A, Q);
        if (SO0(W), nhB(I, Y, W), yO0(Y, B.subarray(32)), jO0(I, Y), kO0(F, I), Q -= 64, phB(B, 0, F, 0)) {
            for (D = 0; D < Q; ++D) A[D] = 0;
            return -1
        }
        for (D = 0; D < Q; ++D) A[D] = B[D + 64];
        return G = Q, G
    }

    function lhB(A, B) {
        var Q, Z, D, G;
        for (Z = 63; Z >= 32; --Z) {
            Q = 0;
            for (D = Z - 32, G = Z - 12; D < G; ++D) B[D] += Q - 16 * B[Z] * MO0[D - (Z - 32)], Q = B[D] + 128 >> 8, B[D] -= Q * 256;
            B[D] += Q, B[Z] = 0
        }
        Q = 0;
        for (D = 0; D < 32; ++D) B[D] += Q - (B[31] >> 4) * MO0[D], Q = B[D] >> 8, B[D] &= 255;
        for (D = 0; D < 32; ++D) B[D] -= Q * MO0[D];
        for (Z = 0; Z < 32; ++Z) B[Z + 1] += B[Z] >> 8, A[Z] = B[Z] & 255
    }

    function SO0(A) {
        var B = new Float64Array(64);
        for (var Q = 0; Q < 64; ++Q) B[Q] = A[Q], A[Q] = 0;
        lhB(A, B)
    }

    function jO0(A, B) {
        var Q = CQ(),
            Z = CQ(),
            D = CQ(),
            G = CQ(),
            F = CQ(),
            I = CQ(),
            Y = CQ(),
            W = CQ(),
            J = CQ();
        IA1(Q, A[1], A[0]), IA1(J, B[1], B[0]), l3(Q, Q, J), FA1(Z, A[0], A[1]), FA1(J, B[0], B[1]), l3(Z, Z, J), l3(D, A[3], B[3]), l3(D, D, Hq8), l3(G, A[2], B[2]), FA1(G, G, G), IA1(F, Z, Q), IA1(I, G, D), FA1(Y, G, D), FA1(W, Z, Q), l3(A[0], F, I), l3(A[1], W, Y), l3(A[2], Y, I), l3(A[3], F, W)
    }

    function mhB(A, B, Q) {
        for (var Z = 0; Z < 4; ++Z) ahB(A[Z], B[Z], Q)
    }

    function kO0(A, B) {
        var Q = CQ(),
            Z = CQ(),
            D = CQ();
        Mq8(D, B[2]), l3(Q, B[0], D), l3(Z, B[1], D), xh1(A, Z), A[31] ^= ihB(Q) << 7
    }

    function xh1(A, B) {
        var Q, Z, D, G = CQ(),
            F = CQ();
        for (Q = 0; Q < 16; ++Q) F[Q] = B[Q];
        RO0(F), RO0(F), RO0(F);
        for (Z = 0; Z < 2; ++Z) {
            G[0] = F[0] - 65517;
            for (Q = 1; Q < 15; ++Q) G[Q] = F[Q] - 65535 - (G[Q - 1] >> 16 & 1), G[Q - 1] &= 65535;
            G[15] = F[15] - 32767 - (G[14] >> 16 & 1), D = G[15] >> 16 & 1, G[14] &= 65535, ahB(F, G, 1 - D)
        }
        for (Q = 0; Q < 16; Q++) A[2 * Q] = F[Q] & 255, A[2 * Q + 1] = F[Q] >> 8
    }

    function $q8(A, B) {
        var Q = CQ(),
            Z = CQ(),
            D = CQ(),
            G = CQ(),
            F = CQ(),
            I = CQ(),
            Y = CQ();
        if (Kb(A[2], _h1), qq8(A[1], B), nd(D, A[1]), l3(G, D, Kq8), IA1(D, D, A[2]), FA1(G, A[2], G), nd(F, G), nd(I, F), l3(Y, I, F), l3(Q, Y, D), l3(Q, Q, G), Nq8(Q, Q), l3(Q, Q, D), l3(Q, Q, G), l3(Q, Q, G), l3(A[0], Q, G), nd(Z, A[0]), l3(Z, Z, G), dhB(Z, D)) l3(A[0], A[0], zq8);
        if (nd(Z, A[0]), l3(Z, Z, G), dhB(Z, D)) return -1;
        if (ihB(A[0]) === B[31] >> 7) IA1(A[0], PO0, A[0]);
        return l3(A[3], A[0], A[1]), 0
    }

    function qq8(A, B) {
        var Q;
        for (Q = 0; Q < 16; ++Q) A[Q] = B[2 * Q] + (B[2 * Q + 1] << 8);
        A[15] &= 32767
    }

    function Nq8(A, B) {
        var Q = CQ(),
            Z;
        for (Z = 0; Z < 16; ++Z) Q[Z] = B[Z];
        for (Z = 250; Z >= 0; --Z)
            if (nd(Q, Q), Z !== 1) l3(Q, Q, B);
        for (Z = 0; Z < 16; ++Z) A[Z] = Q[Z]
    }

    function dhB(A, B) {
        var Q = new zC(32),
            Z = new zC(32);
        return xh1(Q, A), xh1(Z, B), phB(Q, 0, Z, 0)
    }

    function phB(A, B, Q, Z) {
        return Lq8(A, B, Q, Z, 32)
    }

    function Lq8(A, B, Q, Z, D) {
        var G, F = 0;
        for (G = 0; G < D; ++G) F |= A[B + G] ^ Q[Z + G];
        return (1 & F - 1 >>> 8) - 1
    }

    function ihB(A) {
        var B = new zC(32);
        return xh1(B, A), B[0] & 1
    }

    function nhB(A, B, Q) {
        var Z, D;
        Kb(A[0], PO0), Kb(A[1], _h1), Kb(A[2], _h1), Kb(A[3], PO0);
        for (D = 255; D >= 0; --D) Z = Q[D / 8 | 0] >> (D & 7) & 1, mhB(A, B, Z), jO0(B, A), jO0(A, A), mhB(A, B, Z)
    }

    function yO0(A, B) {
        var Q = [CQ(), CQ(), CQ(), CQ()];
        Kb(Q[0], ghB), Kb(Q[1], uhB), Kb(Q[2], _h1), l3(Q[3], ghB, uhB), nhB(A, Q, B)
    }

    function Kb(A, B) {
        var Q;
        for (Q = 0; Q < 16; Q++) A[Q] = B[Q] | 0
    }

    function Mq8(A, B) {
        var Q = CQ(),
            Z;
        for (Z = 0; Z < 16; ++Z) Q[Z] = B[Z];
        for (Z = 253; Z >= 0; --Z)
            if (nd(Q, Q), Z !== 2 && Z !== 4) l3(Q, Q, B);
        for (Z = 0; Z < 16; ++Z) A[Z] = Q[Z]
    }

    function RO0(A) {
        var B, Q, Z = 1;
        for (B = 0; B < 16; ++B) Q = A[B] + Z + 65535, Z = Math.floor(Q / 65536), A[B] = Q - Z * 65536;
        A[0] += Z - 1 + 37 * (Z - 1)
    }

    function ahB(A, B, Q) {
        var Z, D = ~(Q - 1);
        for (var G = 0; G < 16; ++G) Z = D & (A[G] ^ B[G]), A[G] ^= Z, B[G] ^= Z
    }

    function CQ(A) {
        var B, Q = new Float64Array(16);
        if (A)
            for (B = 0; B < A.length; ++B) Q[B] = A[B];
        return Q
    }

    function FA1(A, B, Q) {
        for (var Z = 0; Z < 16; ++Z) A[Z] = B[Z] + Q[Z]
    }

    function IA1(A, B, Q) {
        for (var Z = 0; Z < 16; ++Z) A[Z] = B[Z] - Q[Z]
    }

    function nd(A, B) {
        l3(A, B, B)
    }

    function l3(A, B, Q) {
        var Z, D, G = 0,
            F = 0,
            I = 0,
            Y = 0,
            W = 0,
            J = 0,
            X = 0,
            V = 0,
            C = 0,
            K = 0,
            H = 0,
            z = 0,
            $ = 0,
            L = 0,
            N = 0,
            R = 0,
            O = 0,
            P = 0,
            j = 0,
            f = 0,
            k = 0,
            c = 0,
            u = 0,
            a = 0,
            l = 0,
            y = 0,
            t = 0,
            E1 = 0,
            C1 = 0,
            _1 = 0,
            F0 = 0,
            W0 = Q[0],
            g1 = Q[1],
            w1 = Q[2],
            Q1 = Q[3],
            k1 = Q[4],
            H1 = Q[5],
            A0 = Q[6],
            V0 = Q[7],
            o1 = Q[8],
            e = Q[9],
            Z1 = Q[10],
            I1 = Q[11],
            U1 = Q[12],
            O1 = Q[13],
            B1 = Q[14],
            x1 = Q[15];
        Z = B[0], G += Z * W0, F += Z * g1, I += Z * w1, Y += Z * Q1, W += Z * k1, J += Z * H1, X += Z * A0, V += Z * V0, C += Z * o1, K += Z * e, H += Z * Z1, z += Z * I1, $ += Z * U1, L += Z * O1, N += Z * B1, R += Z * x1, Z = B[1], F += Z * W0, I += Z * g1, Y += Z * w1, W += Z * Q1, J += Z * k1, X += Z * H1, V += Z * A0, C += Z * V0, K += Z * o1, H += Z * e, z += Z * Z1, $ += Z * I1, L += Z * U1, N += Z * O1, R += Z * B1, O += Z * x1, Z = B[2], I += Z * W0, Y += Z * g1, W += Z * w1, J += Z * Q1, X += Z * k1, V += Z * H1, C += Z * A0, K += Z * V0, H += Z * o1, z += Z * e, $ += Z * Z1, L += Z * I1, N += Z * U1, R += Z * O1, O += Z * B1, P += Z * x1, Z = B[3], Y += Z * W0, W += Z * g1, J += Z * w1, X += Z * Q1, V += Z * k1, C += Z * H1, K += Z * A0, H += Z * V0, z += Z * o1, $ += Z * e, L += Z * Z1, N += Z * I1, R += Z * U1, O += Z * O1, P += Z * B1, j += Z * x1, Z = B[4], W += Z * W0, J += Z * g1, X += Z * w1, V += Z * Q1, C += Z * k1, K += Z * H1, H += Z * A0, z += Z * V0, $ += Z * o1, L += Z * e, N += Z * Z1, R += Z * I1, O += Z * U1, P += Z * O1, j += Z * B1, f += Z * x1, Z = B[5], J += Z * W0, X += Z * g1, V += Z * w1, C += Z * Q1, K += Z * k1, H += Z * H1, z += Z * A0, $ += Z * V0, L += Z * o1, N += Z * e, R += Z * Z1, O += Z * I1, P += Z * U1, j += Z * O1, f += Z * B1, k += Z * x1, Z = B[6], X += Z * W0, V += Z * g1, C += Z * w1, K += Z * Q1, H += Z * k1, z += Z * H1, $ += Z * A0, L += Z * V0, N += Z * o1, R += Z * e, O += Z * Z1, P += Z * I1, j += Z * U1, f += Z * O1, k += Z * B1, c += Z * x1, Z = B[7], V += Z * W0, C += Z * g1, K += Z * w1, H += Z * Q1, z += Z * k1, $ += Z * H1, L += Z * A0, N += Z * V0, R += Z * o1, O += Z * e, P += Z * Z1, j += Z * I1, f += Z * U1, k += Z * O1, c += Z * B1, u += Z * x1, Z = B[8], C += Z * W0, K += Z * g1, H += Z * w1, z += Z * Q1, $ += Z * k1, L += Z * H1, N += Z * A0, R += Z * V0, O += Z * o1, P += Z * e, j += Z * Z1, f += Z * I1, k += Z * U1, c += Z * O1, u += Z * B1, a += Z * x1, Z = B[9], K += Z * W0, H += Z * g1, z += Z * w1, $ += Z * Q1, L += Z * k1, N += Z * H1, R += Z * A0, O += Z * V0, P += Z * o1, j += Z * e, f += Z * Z1, k += Z * I1, c += Z * U1, u += Z * O1, a += Z * B1, l += Z * x1, Z = B[10], H += Z * W0, z += Z * g1, $ += Z * w1, L += Z * Q1, N += Z * k1, R += Z * H1, O += Z * A0, P += Z * V0, j += Z * o1, f += Z * e, k += Z * Z1, c += Z * I1, u += Z * U1, a += Z * O1, l += Z * B1, y += Z * x1, Z = B[11], z += Z * W0, $ += Z * g1, L += Z * w1, N += Z * Q1, R += Z * k1, O += Z * H1, P += Z * A0, j += Z * V0, f += Z * o1, k += Z * e, c += Z * Z1, u += Z * I1, a += Z * U1, l += Z * O1, y += Z * B1, t += Z * x1, Z = B[12], $ += Z * W0, L += Z * g1, N += Z * w1, R += Z * Q1, O += Z * k1, P += Z * H1, j += Z * A0, f += Z * V0, k += Z * o1, c += Z * e, u += Z * Z1, a += Z * I1, l += Z * U1, y += Z * O1, t += Z * B1, E1 += Z * x1, Z = B[13], L += Z * W0, N += Z * g1, R += Z * w1, O += Z * Q1, P += Z * k1, j += Z * H1, f += Z * A0, k += Z * V0, c += Z * o1, u += Z * e, a += Z * Z1, l += Z * I1, y += Z * U1, t += Z * O1, E1 += Z * B1, C1 += Z * x1, Z = B[14], N += Z * W0, R += Z * g1, O += Z * w1, P += Z * Q1, j += Z * k1, f += Z * H1, k += Z * A0, c += Z * V0, u += Z * o1, a += Z * e, l += Z * Z1, y += Z * I1, t += Z * U1, E1 += Z * O1, C1 += Z * B1, _1 += Z * x1, Z = B[15], R += Z * W0, O += Z * g1, P += Z * w1, j += Z * Q1, f += Z * k1, k += Z * H1, c += Z * A0, u += Z * V0, a += Z * o1, l += Z * e, y += Z * Z1, t += Z * I1, E1 += Z * U1, C1 += Z * O1, _1 += Z * B1, F0 += Z * x1, G += 38 * O, F += 38 * P, I += 38 * j, Y += 38 * f, W += 38 * k, J += 38 * c, X += 38 * u, V += 38 * a, C += 38 * l, K += 38 * y, H += 38 * t, z += 38 * E1, $ += 38 * C1, L += 38 * _1, N += 38 * F0, D = 1, Z = G + D + 65535, D = Math.floor(Z / 65536), G = Z - D * 65536, Z = F + D + 65535, D = Math.floor(Z / 65536), F = Z - D * 65536, Z = I + D + 65535, D = Math.floor(Z / 65536), I = Z - D * 65536, Z = Y + D + 65535, D = Math.floor(Z / 65536), Y = Z - D * 65536, Z = W + D + 65535, D = Math.floor(Z / 65536), W = Z - D * 65536, Z = J + D + 65535, D = Math.floor(Z / 65536), J = Z - D * 65536, Z = X + D + 65535, D = Math.floor(Z / 65536), X = Z - D * 65536, Z = V + D + 65535, D = Math.floor(Z / 65536), V = Z - D * 65536, Z = C + D + 65535, D = Math.floor(Z / 65536), C = Z - D * 65536, Z = K + D + 65535, D = Math.floor(Z / 65536), K = Z - D * 65536, Z = H + D + 65535, D = Math.floor(Z / 65536), H = Z - D * 65536, Z = z + D + 65535, D = Math.floor(Z / 65536), z = Z - D * 65536, Z = $ + D + 65535, D = Math.floor(Z / 65536), $ = Z - D * 65536, Z = L + D + 65535, D = Math.floor(Z / 65536), L = Z - D * 65536, Z = N + D + 65535, D = Math.floor(Z / 65536), N = Z - D * 65536, Z = R + D + 65535, D = Math.floor(Z / 65536), R = Z - D * 65536, G += D - 1 + 37 * (D - 1), D = 1, Z = G + D + 65535, D = Math.floor(Z / 65536), G = Z - D * 65536, Z = F + D + 65535, D = Math.floor(Z / 65536), F = Z - D * 65536, Z = I + D + 65535, D = Math.floor(Z / 65536), I = Z - D * 65536, Z = Y + D + 65535, D = Math.floor(Z / 65536), Y = Z - D * 65536, Z = W + D + 65535, D = Math.floor(Z / 65536), W = Z - D * 65536, Z = J + D + 65535, D = Math.floor(Z / 65536), J = Z - D * 65536, Z = X + D + 65535, D = Math.floor(Z / 65536), X = Z - D * 65536, Z = V + D + 65535, D = Math.floor(Z / 65536), V = Z - D * 65536, Z = C + D + 65535, D = Math.floor(Z / 65536), C = Z - D * 65536, Z = K + D + 65535, D = Math.floor(Z / 65536), K = Z - D * 65536, Z = H + D + 65535, D = Math.floor(Z / 65536), H = Z - D * 65536, Z = z + D + 65535, D = Math.floor(Z / 65536), z = Z - D * 65536, Z = $ + D + 65535, D = Math.floor(Z / 65536), $ = Z - D * 65536, Z = L + D + 65535, D = Math.floor(Z / 65536), L = Z - D * 65536, Z = N + D + 65535, D = Math.floor(Z / 65536), N = Z - D * 65536, Z = R + D + 65535, D = Math.floor(Z / 65536), R = Z - D * 65536, G += D - 1 + 37 * (D - 1), A[0] = G, A[1] = F, A[2] = I, A[3] = Y, A[4] = W, A[5] = J, A[6] = X, A[7] = V, A[8] = C, A[9] = K, A[10] = H, A[11] = z, A[12] = $, A[13] = L, A[14] = N, A[15] = R
    }
});