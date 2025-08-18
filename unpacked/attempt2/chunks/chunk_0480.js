/* chunk:480 bytes:[11471656, 11493619) size:21963 source:unpacked-cli.js */
var IO0 = E((Vy3, IhB) => {
    var WB = j4();
    Fb();
    t$();
    YI1();
    IR();
    Ib();
    wh1();
    ud();
    EU();
    oR0();
    XI1();
    b8();
    if (typeof FO0 === "undefined") FO0 = WB.jsbn.BigInteger;
    var FO0, YA = WB.asn1,
        M4 = WB.pki = WB.pki || {};
    IhB.exports = M4.pbe = WB.pbe = WB.pbe || {};
    var cd = M4.oids,
        K$8 = {
            name: "EncryptedPrivateKeyInfo",
            tagClass: YA.Class.UNIVERSAL,
            type: YA.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.OID,
                    constructed: !1,
                    capture: "encryptionOid"
                }, {
                    name: "AlgorithmIdentifier.parameters",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "encryptionParams"
                }]
            }, {
                name: "EncryptedPrivateKeyInfo.encryptedData",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.OCTETSTRING,
                constructed: !1,
                capture: "encryptedData"
            }]
        },
        H$8 = {
            name: "PBES2Algorithms",
            tagClass: YA.Class.UNIVERSAL,
            type: YA.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PBES2Algorithms.keyDerivationFunc",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.keyDerivationFunc.oid",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.OID,
                    constructed: !1,
                    capture: "kdfOid"
                }, {
                    name: "PBES2Algorithms.params",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PBES2Algorithms.params.salt",
                        tagClass: YA.Class.UNIVERSAL,
                        type: YA.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "kdfSalt"
                    }, {
                        name: "PBES2Algorithms.params.iterationCount",
                        tagClass: YA.Class.UNIVERSAL,
                        type: YA.Type.INTEGER,
                        constructed: !1,
                        capture: "kdfIterationCount"
                    }, {
                        name: "PBES2Algorithms.params.keyLength",
                        tagClass: YA.Class.UNIVERSAL,
                        type: YA.Type.INTEGER,
                        constructed: !1,
                        optional: !0,
                        capture: "keyLength"
                    }, {
                        name: "PBES2Algorithms.params.prf",
                        tagClass: YA.Class.UNIVERSAL,
                        type: YA.Type.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "PBES2Algorithms.params.prf.algorithm",
                            tagClass: YA.Class.UNIVERSAL,
                            type: YA.Type.OID,
                            constructed: !1,
                            capture: "prfOid"
                        }]
                    }]
                }]
            }, {
                name: "PBES2Algorithms.encryptionScheme",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.encryptionScheme.oid",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.OID,
                    constructed: !1,
                    capture: "encOid"
                }, {
                    name: "PBES2Algorithms.encryptionScheme.iv",
                    tagClass: YA.Class.UNIVERSAL,
                    type: YA.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "encIv"
                }]
            }]
        },
        z$8 = {
            name: "pkcs-12PbeParams",
            tagClass: YA.Class.UNIVERSAL,
            type: YA.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "pkcs-12PbeParams.salt",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.OCTETSTRING,
                constructed: !1,
                capture: "salt"
            }, {
                name: "pkcs-12PbeParams.iterations",
                tagClass: YA.Class.UNIVERSAL,
                type: YA.Type.INTEGER,
                constructed: !1,
                capture: "iterations"
            }]
        };
    M4.encryptPrivateKeyInfo = function(A, B, Q) {
        Q = Q || {}, Q.saltSize = Q.saltSize || 8, Q.count = Q.count || 2048, Q.algorithm = Q.algorithm || "aes128", Q.prfAlgorithm = Q.prfAlgorithm || "sha1";
        var Z = WB.random.getBytesSync(Q.saltSize),
            D = Q.count,
            G = YA.integerToDer(D),
            F, I, Y;
        if (Q.algorithm.indexOf("aes") === 0 || Q.algorithm === "des") {
            var W, J, X;
            switch (Q.algorithm) {
                case "aes128":
                    F = 16, W = 16, J = cd["aes128-CBC"], X = WB.aes.createEncryptionCipher;
                    break;
                case "aes192":
                    F = 24, W = 16, J = cd["aes192-CBC"], X = WB.aes.createEncryptionCipher;
                    break;
                case "aes256":
                    F = 32, W = 16, J = cd["aes256-CBC"], X = WB.aes.createEncryptionCipher;
                    break;
                case "des":
                    F = 8, W = 8, J = cd.desCBC, X = WB.des.createEncryptionCipher;
                    break;
                default:
                    var V = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
                    throw V.algorithm = Q.algorithm, V
            }
            var C = "hmacWith" + Q.prfAlgorithm.toUpperCase(),
                K = FhB(C),
                H = WB.pkcs5.pbkdf2(B, Z, D, F, K),
                z = WB.random.getBytesSync(W),
                $ = X(H);
            $.start(z), $.update(YA.toDer(A)), $.finish(), Y = $.output.getBytes();
            var L = E$8(Z, G, F, C);
            I = YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OID, !1, YA.oidToDer(cd.pkcs5PBES2).getBytes()), YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OID, !1, YA.oidToDer(cd.pkcs5PBKDF2).getBytes()), L]), YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OID, !1, YA.oidToDer(J).getBytes()), YA.create(YA.Class.UNIVERSAL, YA.Type.OCTETSTRING, !1, z)])])])
        } else if (Q.algorithm === "3des") {
            F = 24;
            var N = new WB.util.ByteBuffer(Z),
                H = M4.pbe.generatePkcs12Key(B, N, 1, D, F),
                z = M4.pbe.generatePkcs12Key(B, N, 2, D, F),
                $ = WB.des.createEncryptionCipher(H);
            $.start(z), $.update(YA.toDer(A)), $.finish(), Y = $.output.getBytes(), I = YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OID, !1, YA.oidToDer(cd["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()), YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OCTETSTRING, !1, Z), YA.create(YA.Class.UNIVERSAL, YA.Type.INTEGER, !1, G.getBytes())])])
        } else {
            var V = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
            throw V.algorithm = Q.algorithm, V
        }
        var R = YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [I, YA.create(YA.Class.UNIVERSAL, YA.Type.OCTETSTRING, !1, Y)]);
        return R
    };
    M4.decryptPrivateKeyInfo = function(A, B) {
        var Q = null,
            Z = {},
            D = [];
        if (!YA.validate(A, K$8, Z, D)) {
            var G = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
            throw G.errors = D, G
        }
        var F = YA.derToOid(Z.encryptionOid),
            I = M4.pbe.getCipher(F, Z.encryptionParams, B),
            Y = WB.util.createBuffer(Z.encryptedData);
        if (I.update(Y), I.finish()) Q = YA.fromDer(I.output);
        return Q
    };
    M4.encryptedPrivateKeyToPem = function(A, B) {
        var Q = {
            type: "ENCRYPTED PRIVATE KEY",
            body: YA.toDer(A).getBytes()
        };
        return WB.pem.encode(Q, {
            maxline: B
        })
    };
    M4.encryptedPrivateKeyFromPem = function(A) {
        var B = WB.pem.decode(A)[0];
        if (B.type !== "ENCRYPTED PRIVATE KEY") {
            var Q = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
            throw Q.headerType = B.type, Q
        }
        if (B.procType && B.procType.type === "ENCRYPTED") throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
        return YA.fromDer(B.body)
    };
    M4.encryptRsaPrivateKey = function(A, B, Q) {
        if (Q = Q || {}, !Q.legacy) {
            var Z = M4.wrapRsaPrivateKey(M4.privateKeyToAsn1(A));
            return Z = M4.encryptPrivateKeyInfo(Z, B, Q), M4.encryptedPrivateKeyToPem(Z)
        }
        var D, G, F, I;
        switch (Q.algorithm) {
            case "aes128":
                D = "AES-128-CBC", F = 16, G = WB.random.getBytesSync(16), I = WB.aes.createEncryptionCipher;
                break;
            case "aes192":
                D = "AES-192-CBC", F = 24, G = WB.random.getBytesSync(16), I = WB.aes.createEncryptionCipher;
                break;
            case "aes256":
                D = "AES-256-CBC", F = 32, G = WB.random.getBytesSync(16), I = WB.aes.createEncryptionCipher;
                break;
            case "3des":
                D = "DES-EDE3-CBC", F = 24, G = WB.random.getBytesSync(8), I = WB.des.createEncryptionCipher;
                break;
            case "des":
                D = "DES-CBC", F = 8, G = WB.random.getBytesSync(8), I = WB.des.createEncryptionCipher;
                break;
            default:
                var Y = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + Q.algorithm + '".');
                throw Y.algorithm = Q.algorithm, Y
        }
        var W = WB.pbe.opensslDeriveBytes(B, G.substr(0, 8), F),
            J = I(W);
        J.start(G), J.update(YA.toDer(M4.privateKeyToAsn1(A))), J.finish();
        var X = {
            type: "RSA PRIVATE KEY",
            procType: {
                version: "4",
                type: "ENCRYPTED"
            },
            dekInfo: {
                algorithm: D,
                parameters: WB.util.bytesToHex(G).toUpperCase()
            },
            body: J.output.getBytes()
        };
        return WB.pem.encode(X)
    };
    M4.decryptRsaPrivateKey = function(A, B) {
        var Q = null,
            Z = WB.pem.decode(A)[0];
        if (Z.type !== "ENCRYPTED PRIVATE KEY" && Z.type !== "PRIVATE KEY" && Z.type !== "RSA PRIVATE KEY") {
            var D = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
            throw D.headerType = D, D
        }
        if (Z.procType && Z.procType.type === "ENCRYPTED") {
            var G, F;
            switch (Z.dekInfo.algorithm) {
                case "DES-CBC":
                    G = 8, F = WB.des.createDecryptionCipher;
                    break;
                case "DES-EDE3-CBC":
                    G = 24, F = WB.des.createDecryptionCipher;
                    break;
                case "AES-128-CBC":
                    G = 16, F = WB.aes.createDecryptionCipher;
                    break;
                case "AES-192-CBC":
                    G = 24, F = WB.aes.createDecryptionCipher;
                    break;
                case "AES-256-CBC":
                    G = 32, F = WB.aes.createDecryptionCipher;
                    break;
                case "RC2-40-CBC":
                    G = 5, F = function(X) {
                        return WB.rc2.createDecryptionCipher(X, 40)
                    };
                    break;
                case "RC2-64-CBC":
                    G = 8, F = function(X) {
                        return WB.rc2.createDecryptionCipher(X, 64)
                    };
                    break;
                case "RC2-128-CBC":
                    G = 16, F = function(X) {
                        return WB.rc2.createDecryptionCipher(X, 128)
                    };
                    break;
                default:
                    var D = new Error('Could not decrypt private key; unsupported encryption algorithm "' + Z.dekInfo.algorithm + '".');
                    throw D.algorithm = Z.dekInfo.algorithm, D
            }
            var I = WB.util.hexToBytes(Z.dekInfo.parameters),
                Y = WB.pbe.opensslDeriveBytes(B, I.substr(0, 8), G),
                W = F(Y);
            if (W.start(I), W.update(WB.util.createBuffer(Z.body)), W.finish()) Q = W.output.getBytes();
            else return Q
        } else Q = Z.body;
        if (Z.type === "ENCRYPTED PRIVATE KEY") Q = M4.decryptPrivateKeyInfo(YA.fromDer(Q), B);
        else Q = YA.fromDer(Q);
        if (Q !== null) Q = M4.privateKeyFromAsn1(Q);
        return Q
    };
    M4.pbe.generatePkcs12Key = function(A, B, Q, Z, D, G) {
        var F, I;
        if (typeof G === "undefined" || G === null) {
            if (!("sha1" in WB.md)) throw new Error('"sha1" hash algorithm unavailable.');
            G = WB.md.sha1.create()
        }
        var {
            digestLength: Y,
            blockLength: W
        } = G, J = new WB.util.ByteBuffer, X = new WB.util.ByteBuffer;
        if (A !== null && A !== void 0) {
            for (I = 0; I < A.length; I++) X.putInt16(A.charCodeAt(I));
            X.putInt16(0)
        }
        var V = X.length(),
            C = B.length(),
            K = new WB.util.ByteBuffer;
        K.fillWithByte(Q, W);
        var H = W * Math.ceil(C / W),
            z = new WB.util.ByteBuffer;
        for (I = 0; I < H; I++) z.putByte(B.at(I % C));
        var $ = W * Math.ceil(V / W),
            L = new WB.util.ByteBuffer;
        for (I = 0; I < $; I++) L.putByte(X.at(I % V));
        var N = z;
        N.putBuffer(L);
        var R = Math.ceil(D / Y);
        for (var O = 1; O <= R; O++) {
            var P = new WB.util.ByteBuffer;
            P.putBytes(K.bytes()), P.putBytes(N.bytes());
            for (var j = 0; j < Z; j++) G.start(), G.update(P.getBytes()), P = G.digest();
            var f = new WB.util.ByteBuffer;
            for (I = 0; I < W; I++) f.putByte(P.at(I % Y));
            var k = Math.ceil(C / W) + Math.ceil(V / W),
                c = new WB.util.ByteBuffer;
            for (F = 0; F < k; F++) {
                var u = new WB.util.ByteBuffer(N.getBytes(W)),
                    a = 511;
                for (I = f.length() - 1; I >= 0; I--) a = a >> 8, a += f.at(I) + u.at(I), u.setAt(I, a & 255);
                c.putBuffer(u)
            }
            N = c, J.putBuffer(P)
        }
        return J.truncate(J.length() - D), J
    };
    M4.pbe.getCipher = function(A, B, Q) {
        switch (A) {
            case M4.oids.pkcs5PBES2:
                return M4.pbe.getCipherForPBES2(A, B, Q);
            case M4.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
            case M4.oids["pbewithSHAAnd40BitRC2-CBC"]:
                return M4.pbe.getCipherForPKCS12PBE(A, B, Q);
            default:
                var Z = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
                throw Z.oid = A, Z.supportedOids = ["pkcs5PBES2", "pbeWithSHAAnd3-KeyTripleDES-CBC", "pbewithSHAAnd40BitRC2-CBC"], Z
        }
    };
    M4.pbe.getCipherForPBES2 = function(A, B, Q) {
        var Z = {},
            D = [];
        if (!YA.validate(B, H$8, Z, D)) {
            var G = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
            throw G.errors = D, G
        }
        if (A = YA.derToOid(Z.kdfOid), A !== M4.oids.pkcs5PBKDF2) {
            var G = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
            throw G.oid = A, G.supportedOids = ["pkcs5PBKDF2"], G
        }
        if (A = YA.derToOid(Z.encOid), A !== M4.oids["aes128-CBC"] && A !== M4.oids["aes192-CBC"] && A !== M4.oids["aes256-CBC"] && A !== M4.oids["des-EDE3-CBC"] && A !== M4.oids.desCBC) {
            var G = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
            throw G.oid = A, G.supportedOids = ["aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"], G
        }
        var F = Z.kdfSalt,
            I = WB.util.createBuffer(Z.kdfIterationCount);
        I = I.getInt(I.length() << 3);
        var Y, W;
        switch (M4.oids[A]) {
            case "aes128-CBC":
                Y = 16, W = WB.aes.createDecryptionCipher;
                break;
            case "aes192-CBC":
                Y = 24, W = WB.aes.createDecryptionCipher;
                break;
            case "aes256-CBC":
                Y = 32, W = WB.aes.createDecryptionCipher;
                break;
            case "des-EDE3-CBC":
                Y = 24, W = WB.des.createDecryptionCipher;
                break;
            case "desCBC":
                Y = 8, W = WB.des.createDecryptionCipher;
                break
        }
        var J = GhB(Z.prfOid),
            X = WB.pkcs5.pbkdf2(Q, F, I, Y, J),
            V = Z.encIv,
            C = W(X);
        return C.start(V), C
    };
    M4.pbe.getCipherForPKCS12PBE = function(A, B, Q) {
        var Z = {},
            D = [];
        if (!YA.validate(B, z$8, Z, D)) {
            var G = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
            throw G.errors = D, G
        }
        var F = WB.util.createBuffer(Z.salt),
            I = WB.util.createBuffer(Z.iterations);
        I = I.getInt(I.length() << 3);
        var Y, W, J;
        switch (A) {
            case M4.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                Y = 24, W = 8, J = WB.des.startDecrypting;
                break;
            case M4.oids["pbewithSHAAnd40BitRC2-CBC"]:
                Y = 5, W = 8, J = function(H, z) {
                    var $ = WB.rc2.createDecryptionCipher(H, 40);
                    return $.start(z, null), $
                };
                break;
            default:
                var G = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
                throw G.oid = A, G
        }
        var X = GhB(Z.prfOid),
            V = M4.pbe.generatePkcs12Key(Q, F, 1, I, Y, X);
        X.start();
        var C = M4.pbe.generatePkcs12Key(Q, F, 2, I, W, X);
        return J(V, C)
    };
    M4.pbe.opensslDeriveBytes = function(A, B, Q, Z) {
        if (typeof Z === "undefined" || Z === null) {
            if (!("md5" in WB.md)) throw new Error('"md5" hash algorithm unavailable.');
            Z = WB.md.md5.create()
        }
        if (B === null) B = "";
        var D = [DhB(Z, A + B)];
        for (var G = 16, F = 1; G < Q; ++F, G += 16) D.push(DhB(Z, D[F - 1] + A + B));
        return D.join("").substr(0, Q)
    };

    function DhB(A, B) {
        return A.start().update(B).digest().getBytes()
    }

    function GhB(A) {
        var B;
        if (!A) B = "hmacWithSHA1";
        else if (B = M4.oids[YA.derToOid(A)], !B) {
            var Q = new Error("Unsupported PRF OID.");
            throw Q.oid = A, Q.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], Q
        }
        return FhB(B)
    }

    function FhB(A) {
        var B = WB.md;
        switch (A) {
            case "hmacWithSHA224":
                B = WB.md.sha512;
            case "hmacWithSHA1":
            case "hmacWithSHA256":
            case "hmacWithSHA384":
            case "hmacWithSHA512":
                A = A.substr(8).toLowerCase();
                break;
            default:
                var Q = new Error("Unsupported PRF algorithm.");
                throw Q.algorithm = A, Q.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], Q
        }
        if (!B || !(A in B)) throw new Error("Unknown hash algorithm: " + A);
        return B[A].create()
    }

    function E$8(A, B, Q, Z) {
        var D = YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OCTETSTRING, !1, A), YA.create(YA.Class.UNIVERSAL, YA.Type.INTEGER, !1, B.getBytes())]);
        if (Z !== "hmacWithSHA1") D.value.push(YA.create(YA.Class.UNIVERSAL, YA.Type.INTEGER, !1, WB.util.hexToBytes(Q.toString(16))), YA.create(YA.Class.UNIVERSAL, YA.Type.SEQUENCE, !0, [YA.create(YA.Class.UNIVERSAL, YA.Type.OID, !1, YA.oidToDer(M4.oids[Z]).getBytes()), YA.create(YA.Class.UNIVERSAL, YA.Type.NULL, !1, "")]));
        return D
    }
});