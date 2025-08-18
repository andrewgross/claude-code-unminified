/* chunk:479 bytes:[11439995, 11471655) size:31660 source:unpacked-cli.js */
var XI1 = E((Xy3, ZhB) => {
    var m9 = j4();
    t$();
    JI1();
    Ib();
    QO0();
    DO0();
    EU();
    b8();
    if (typeof r6 === "undefined") r6 = m9.jsbn.BigInteger;
    var r6, GO0 = m9.util.isNodejs ? W1("crypto") : null,
        l0 = m9.asn1,
        wU = m9.util;
    m9.pki = m9.pki || {};
    ZhB.exports = m9.pki.rsa = m9.rsa = m9.rsa || {};
    var Q4 = m9.pki,
        G$8 = [6, 4, 2, 4, 2, 4, 6, 2],
        F$8 = {
            name: "PrivateKeyInfo",
            tagClass: l0.Class.UNIVERSAL,
            type: l0.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PrivateKeyInfo.version",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "PrivateKeyInfo.privateKeyAlgorithm",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: l0.Class.UNIVERSAL,
                    type: l0.Type.OID,
                    constructed: !1,
                    capture: "privateKeyOid"
                }]
            }, {
                name: "PrivateKeyInfo",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.OCTETSTRING,
                constructed: !1,
                capture: "privateKey"
            }]
        },
        I$8 = {
            name: "RSAPrivateKey",
            tagClass: l0.Class.UNIVERSAL,
            type: l0.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPrivateKey.version",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "RSAPrivateKey.modulus",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyModulus"
            }, {
                name: "RSAPrivateKey.publicExponent",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPublicExponent"
            }, {
                name: "RSAPrivateKey.privateExponent",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrivateExponent"
            }, {
                name: "RSAPrivateKey.prime1",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime1"
            }, {
                name: "RSAPrivateKey.prime2",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime2"
            }, {
                name: "RSAPrivateKey.exponent1",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent1"
            }, {
                name: "RSAPrivateKey.exponent2",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent2"
            }, {
                name: "RSAPrivateKey.coefficient",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyCoefficient"
            }]
        },
        Y$8 = {
            name: "RSAPublicKey",
            tagClass: l0.Class.UNIVERSAL,
            type: l0.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPublicKey.modulus",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyModulus"
            }, {
                name: "RSAPublicKey.exponent",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyExponent"
            }]
        },
        W$8 = m9.pki.rsa.publicKeyValidator = {
            name: "SubjectPublicKeyInfo",
            tagClass: l0.Class.UNIVERSAL,
            type: l0.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "subjectPublicKeyInfo",
            value: [{
                name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: l0.Class.UNIVERSAL,
                    type: l0.Type.OID,
                    constructed: !1,
                    capture: "publicKeyOid"
                }]
            }, {
                name: "SubjectPublicKeyInfo.subjectPublicKey",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.BITSTRING,
                constructed: !1,
                value: [{
                    name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
                    tagClass: l0.Class.UNIVERSAL,
                    type: l0.Type.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    captureAsn1: "rsaPublicKey"
                }]
            }]
        },
        J$8 = {
            name: "DigestInfo",
            tagClass: l0.Class.UNIVERSAL,
            type: l0.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "DigestInfo.DigestAlgorithm",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
                    tagClass: l0.Class.UNIVERSAL,
                    type: l0.Type.OID,
                    constructed: !1,
                    capture: "algorithmIdentifier"
                }, {
                    name: "DigestInfo.DigestAlgorithm.parameters",
                    tagClass: l0.Class.UNIVERSAL,
                    type: l0.Type.NULL,
                    capture: "parameters",
                    optional: !0,
                    constructed: !1
                }]
            }, {
                name: "DigestInfo.digest",
                tagClass: l0.Class.UNIVERSAL,
                type: l0.Type.OCTETSTRING,
                constructed: !1,
                capture: "digest"
            }]
        },
        X$8 = function(A) {
            var B;
            if (A.algorithm in Q4.oids) B = Q4.oids[A.algorithm];
            else {
                var Q = new Error("Unknown message digest algorithm.");
                throw Q.algorithm = A.algorithm, Q
            }
            var Z = l0.oidToDer(B).getBytes(),
                D = l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, []),
                G = l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, []);
            G.value.push(l0.create(l0.Class.UNIVERSAL, l0.Type.OID, !1, Z)), G.value.push(l0.create(l0.Class.UNIVERSAL, l0.Type.NULL, !1, ""));
            var F = l0.create(l0.Class.UNIVERSAL, l0.Type.OCTETSTRING, !1, A.digest().getBytes());
            return D.value.push(G), D.value.push(F), l0.toDer(D).getBytes()
        },
        BhB = function(A, B, Q) {
            if (Q) return A.modPow(B.e, B.n);
            if (!B.p || !B.q) return A.modPow(B.d, B.n);
            if (!B.dP) B.dP = B.d.mod(B.p.subtract(r6.ONE));
            if (!B.dQ) B.dQ = B.d.mod(B.q.subtract(r6.ONE));
            if (!B.qInv) B.qInv = B.q.modInverse(B.p);
            var Z;
            do Z = new r6(m9.util.bytesToHex(m9.random.getBytes(B.n.bitLength() / 8)), 16); while (Z.compareTo(B.n) >= 0 || !Z.gcd(B.n).equals(r6.ONE));
            A = A.multiply(Z.modPow(B.e, B.n)).mod(B.n);
            var D = A.mod(B.p).modPow(B.dP, B.p),
                G = A.mod(B.q).modPow(B.dQ, B.q);
            while (D.compareTo(G) < 0) D = D.add(B.p);
            var F = D.subtract(G).multiply(B.qInv).mod(B.p).multiply(B.q).add(G);
            return F = F.multiply(Z.modInverse(B.n)).mod(B.n), F
        };
    Q4.rsa.encrypt = function(A, B, Q) {
        var Z = Q,
            D, G = Math.ceil(B.n.bitLength() / 8);
        if (Q !== !1 && Q !== !0) Z = Q === 2, D = QhB(A, B, Q);
        else D = m9.util.createBuffer(), D.putBytes(A);
        var F = new r6(D.toHex(), 16),
            I = BhB(F, B, Z),
            Y = I.toString(16),
            W = m9.util.createBuffer(),
            J = G - Math.ceil(Y.length / 2);
        while (J > 0) W.putByte(0), --J;
        return W.putBytes(m9.util.hexToBytes(Y)), W.getBytes()
    };
    Q4.rsa.decrypt = function(A, B, Q, Z) {
        var D = Math.ceil(B.n.bitLength() / 8);
        if (A.length !== D) {
            var G = new Error("Encrypted message length is invalid.");
            throw G.length = A.length, G.expected = D, G
        }
        var F = new r6(m9.util.createBuffer(A).toHex(), 16);
        if (F.compareTo(B.n) >= 0) throw new Error("Encrypted message is invalid.");
        var I = BhB(F, B, Q),
            Y = I.toString(16),
            W = m9.util.createBuffer(),
            J = D - Math.ceil(Y.length / 2);
        while (J > 0) W.putByte(0), --J;
        if (W.putBytes(m9.util.hexToBytes(Y)), Z !== !1) return Mh1(W.getBytes(), B, Q);
        return W.getBytes()
    };
    Q4.rsa.createKeyPairGenerationState = function(A, B, Q) {
        if (typeof A === "string") A = parseInt(A, 10);
        A = A || 2048, Q = Q || {};
        var Z = Q.prng || m9.random,
            D = {
                nextBytes: function(I) {
                    var Y = Z.getBytesSync(I.length);
                    for (var W = 0; W < I.length; ++W) I[W] = Y.charCodeAt(W)
                }
            },
            G = Q.algorithm || "PRIMEINC",
            F;
        if (G === "PRIMEINC") F = {
            algorithm: G,
            state: 0,
            bits: A,
            rng: D,
            eInt: B || 65537,
            e: new r6(null),
            p: null,
            q: null,
            qBits: A >> 1,
            pBits: A - (A >> 1),
            pqState: 0,
            num: null,
            keys: null
        }, F.e.fromInt(F.eInt);
        else throw new Error("Invalid key generation algorithm: " + G);
        return F
    };
    Q4.rsa.stepKeyPairGenerationState = function(A, B) {
        if (!("algorithm" in A)) A.algorithm = "PRIMEINC";
        var Q = new r6(null);
        Q.fromInt(30);
        var Z = 0,
            D = function(X, V) {
                return X | V
            },
            G = +new Date,
            F, I = 0;
        while (A.keys === null && (B <= 0 || I < B)) {
            if (A.state === 0) {
                var Y = A.p === null ? A.pBits : A.qBits,
                    W = Y - 1;
                if (A.pqState === 0) {
                    if (A.num = new r6(Y, A.rng), !A.num.testBit(W)) A.num.bitwiseTo(r6.ONE.shiftLeft(W), D, A.num);
                    A.num.dAddOffset(31 - A.num.mod(Q).byteValue(), 0), Z = 0, ++A.pqState
                } else if (A.pqState === 1)
                    if (A.num.bitLength() > Y) A.pqState = 0;
                    else if (A.num.isProbablePrime(C$8(A.num.bitLength()))) ++A.pqState;
                else A.num.dAddOffset(G$8[Z++ % 8], 0);
                else if (A.pqState === 2) A.pqState = A.num.subtract(r6.ONE).gcd(A.e).compareTo(r6.ONE) === 0 ? 3 : 0;
                else if (A.pqState === 3) {
                    if (A.pqState = 0, A.p === null) A.p = A.num;
                    else A.q = A.num;
                    if (A.p !== null && A.q !== null) ++A.state;
                    A.num = null
                }
            } else if (A.state === 1) {
                if (A.p.compareTo(A.q) < 0) A.num = A.p, A.p = A.q, A.q = A.num;
                ++A.state
            } else if (A.state === 2) A.p1 = A.p.subtract(r6.ONE), A.q1 = A.q.subtract(r6.ONE), A.phi = A.p1.multiply(A.q1), ++A.state;
            else if (A.state === 3)
                if (A.phi.gcd(A.e).compareTo(r6.ONE) === 0) ++A.state;
                else A.p = null, A.q = null, A.state = 0;
            else if (A.state === 4)
                if (A.n = A.p.multiply(A.q), A.n.bitLength() === A.bits) ++A.state;
                else A.q = null, A.state = 0;
            else if (A.state === 5) {
                var J = A.e.modInverse(A.phi);
                A.keys = {
                    privateKey: Q4.rsa.setPrivateKey(A.n, A.e, J, A.p, A.q, J.mod(A.p1), J.mod(A.q1), A.q.modInverse(A.p)),
                    publicKey: Q4.rsa.setPublicKey(A.n, A.e)
                }
            }
            F = +new Date, I += F - G, G = F
        }
        return A.keys !== null
    };
    Q4.rsa.generateKeyPair = function(A, B, Q, Z) {
        if (arguments.length === 1) {
            if (typeof A === "object") Q = A, A = void 0;
            else if (typeof A === "function") Z = A, A = void 0
        } else if (arguments.length === 2)
            if (typeof A === "number") {
                if (typeof B === "function") Z = B, B = void 0;
                else if (typeof B !== "number") Q = B, B = void 0
            } else Q = A, Z = B, A = void 0, B = void 0;
        else if (arguments.length === 3)
            if (typeof B === "number") {
                if (typeof Q === "function") Z = Q, Q = void 0
            } else Z = Q, Q = B, B = void 0;
        if (Q = Q || {}, A === void 0) A = Q.bits || 2048;
        if (B === void 0) B = Q.e || 65537;
        if (!m9.options.usePureJavaScript && !Q.prng && A >= 256 && A <= 16384 && (B === 65537 || B === 3)) {
            if (Z) {
                if (ofB("generateKeyPair")) return GO0.generateKeyPair("rsa", {
                    modulusLength: A,
                    publicExponent: B,
                    publicKeyEncoding: {
                        type: "spki",
                        format: "pem"
                    },
                    privateKeyEncoding: {
                        type: "pkcs8",
                        format: "pem"
                    }
                }, function(I, Y, W) {
                    if (I) return Z(I);
                    Z(null, {
                        privateKey: Q4.privateKeyFromPem(W),
                        publicKey: Q4.publicKeyFromPem(Y)
                    })
                });
                if (tfB("generateKey") && tfB("exportKey")) return wU.globalScope.crypto.subtle.generateKey({
                    name: "RSASSA-PKCS1-v1_5",
                    modulusLength: A,
                    publicExponent: AhB(B),
                    hash: {
                        name: "SHA-256"
                    }
                }, !0, ["sign", "verify"]).then(function(I) {
                    return wU.globalScope.crypto.subtle.exportKey("pkcs8", I.privateKey)
                }).then(void 0, function(I) {
                    Z(I)
                }).then(function(I) {
                    if (I) {
                        var Y = Q4.privateKeyFromAsn1(l0.fromDer(m9.util.createBuffer(I)));
                        Z(null, {
                            privateKey: Y,
                            publicKey: Q4.setRsaPublicKey(Y.n, Y.e)
                        })
                    }
                });
                if (efB("generateKey") && efB("exportKey")) {
                    var D = wU.globalScope.msCrypto.subtle.generateKey({
                        name: "RSASSA-PKCS1-v1_5",
                        modulusLength: A,
                        publicExponent: AhB(B),
                        hash: {
                            name: "SHA-256"
                        }
                    }, !0, ["sign", "verify"]);
                    D.oncomplete = function(I) {
                        var Y = I.target.result,
                            W = wU.globalScope.msCrypto.subtle.exportKey("pkcs8", Y.privateKey);
                        W.oncomplete = function(J) {
                            var X = J.target.result,
                                V = Q4.privateKeyFromAsn1(l0.fromDer(m9.util.createBuffer(X)));
                            Z(null, {
                                privateKey: V,
                                publicKey: Q4.setRsaPublicKey(V.n, V.e)
                            })
                        }, W.onerror = function(J) {
                            Z(J)
                        }
                    }, D.onerror = function(I) {
                        Z(I)
                    };
                    return
                }
            } else if (ofB("generateKeyPairSync")) {
                var G = GO0.generateKeyPairSync("rsa", {
                    modulusLength: A,
                    publicExponent: B,
                    publicKeyEncoding: {
                        type: "spki",
                        format: "pem"
                    },
                    privateKeyEncoding: {
                        type: "pkcs8",
                        format: "pem"
                    }
                });
                return {
                    privateKey: Q4.privateKeyFromPem(G.privateKey),
                    publicKey: Q4.publicKeyFromPem(G.publicKey)
                }
            }
        }
        var F = Q4.rsa.createKeyPairGenerationState(A, B, Q);
        if (!Z) return Q4.rsa.stepKeyPairGenerationState(F, 0), F.keys;
        V$8(F, Q, Z)
    };
    Q4.setRsaPublicKey = Q4.rsa.setPublicKey = function(A, B) {
        var Q = {
            n: A,
            e: B
        };
        return Q.encrypt = function(Z, D, G) {
            if (typeof D === "string") D = D.toUpperCase();
            else if (D === void 0) D = "RSAES-PKCS1-V1_5";
            if (D === "RSAES-PKCS1-V1_5") D = {
                encode: function(I, Y, W) {
                    return QhB(I, Y, 2).getBytes()
                }
            };
            else if (D === "RSA-OAEP" || D === "RSAES-OAEP") D = {
                encode: function(I, Y) {
                    return m9.pkcs1.encode_rsa_oaep(Y, I, G)
                }
            };
            else if (["RAW", "NONE", "NULL", null].indexOf(D) !== -1) D = {
                encode: function(I) {
                    return I
                }
            };
            else if (typeof D === "string") throw new Error('Unsupported encryption scheme: "' + D + '".');
            var F = D.encode(Z, Q, !0);
            return Q4.rsa.encrypt(F, Q, !0)
        }, Q.verify = function(Z, D, G, F) {
            if (typeof G === "string") G = G.toUpperCase();
            else if (G === void 0) G = "RSASSA-PKCS1-V1_5";
            if (F === void 0) F = {
                _parseAllDigestBytes: !0
            };
            if (!("_parseAllDigestBytes" in F)) F._parseAllDigestBytes = !0;
            if (G === "RSASSA-PKCS1-V1_5") G = {
                verify: function(Y, W) {
                    W = Mh1(W, Q, !0);
                    var J = l0.fromDer(W, {
                            parseAllBytes: F._parseAllDigestBytes
                        }),
                        X = {},
                        V = [];
                    if (!l0.validate(J, J$8, X, V)) {
                        var C = new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value.");
                        throw C.errors = V, C
                    }
                    var K = l0.derToOid(X.algorithmIdentifier);
                    if (!(K === m9.oids.md2 || K === m9.oids.md5 || K === m9.oids.sha1 || K === m9.oids.sha224 || K === m9.oids.sha256 || K === m9.oids.sha384 || K === m9.oids.sha512 || K === m9.oids["sha512-224"] || K === m9.oids["sha512-256"])) {
                        var C = new Error("Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier.");
                        throw C.oid = K, C
                    }
                    if (K === m9.oids.md2 || K === m9.oids.md5) {
                        if (!("parameters" in X)) throw new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters.")
                    }
                    return Y === X.digest
                }
            };
            else if (G === "NONE" || G === "NULL" || G === null) G = {
                verify: function(Y, W) {
                    return W = Mh1(W, Q, !0), Y === W
                }
            };
            var I = Q4.rsa.decrypt(D, Q, !0, !1);
            return G.verify(Z, I, Q.n.bitLength())
        }, Q
    };
    Q4.setRsaPrivateKey = Q4.rsa.setPrivateKey = function(A, B, Q, Z, D, G, F, I) {
        var Y = {
            n: A,
            e: B,
            d: Q,
            p: Z,
            q: D,
            dP: G,
            dQ: F,
            qInv: I
        };
        return Y.decrypt = function(W, J, X) {
            if (typeof J === "string") J = J.toUpperCase();
            else if (J === void 0) J = "RSAES-PKCS1-V1_5";
            var V = Q4.rsa.decrypt(W, Y, !1, !1);
            if (J === "RSAES-PKCS1-V1_5") J = {
                decode: Mh1
            };
            else if (J === "RSA-OAEP" || J === "RSAES-OAEP") J = {
                decode: function(C, K) {
                    return m9.pkcs1.decode_rsa_oaep(K, C, X)
                }
            };
            else if (["RAW", "NONE", "NULL", null].indexOf(J) !== -1) J = {
                decode: function(C) {
                    return C
                }
            };
            else throw new Error('Unsupported encryption scheme: "' + J + '".');
            return J.decode(V, Y, !1)
        }, Y.sign = function(W, J) {
            var X = !1;
            if (typeof J === "string") J = J.toUpperCase();
            if (J === void 0 || J === "RSASSA-PKCS1-V1_5") J = {
                encode: X$8
            }, X = 1;
            else if (J === "NONE" || J === "NULL" || J === null) J = {
                encode: function() {
                    return W
                }
            }, X = 1;
            var V = J.encode(W, Y.n.bitLength());
            return Q4.rsa.encrypt(V, Y, X)
        }, Y
    };
    Q4.wrapRsaPrivateKey = function(A) {
        return l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, l0.integerToDer(0).getBytes()), l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.OID, !1, l0.oidToDer(Q4.oids.rsaEncryption).getBytes()), l0.create(l0.Class.UNIVERSAL, l0.Type.NULL, !1, "")]), l0.create(l0.Class.UNIVERSAL, l0.Type.OCTETSTRING, !1, l0.toDer(A).getBytes())])
    };
    Q4.privateKeyFromAsn1 = function(A) {
        var B = {},
            Q = [];
        if (l0.validate(A, F$8, B, Q)) A = l0.fromDer(m9.util.createBuffer(B.privateKey));
        if (B = {}, Q = [], !l0.validate(A, I$8, B, Q)) {
            var Z = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
            throw Z.errors = Q, Z
        }
        var D, G, F, I, Y, W, J, X;
        return D = m9.util.createBuffer(B.privateKeyModulus).toHex(), G = m9.util.createBuffer(B.privateKeyPublicExponent).toHex(), F = m9.util.createBuffer(B.privateKeyPrivateExponent).toHex(), I = m9.util.createBuffer(B.privateKeyPrime1).toHex(), Y = m9.util.createBuffer(B.privateKeyPrime2).toHex(), W = m9.util.createBuffer(B.privateKeyExponent1).toHex(), J = m9.util.createBuffer(B.privateKeyExponent2).toHex(), X = m9.util.createBuffer(B.privateKeyCoefficient).toHex(), Q4.setRsaPrivateKey(new r6(D, 16), new r6(G, 16), new r6(F, 16), new r6(I, 16), new r6(Y, 16), new r6(W, 16), new r6(J, 16), new r6(X, 16))
    };
    Q4.privateKeyToAsn1 = Q4.privateKeyToRSAPrivateKey = function(A) {
        return l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, l0.integerToDer(0).getBytes()), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.n)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.e)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.d)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.p)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.q)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.dP)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.dQ)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.qInv))])
    };
    Q4.publicKeyFromAsn1 = function(A) {
        var B = {},
            Q = [];
        if (l0.validate(A, W$8, B, Q)) {
            var Z = l0.derToOid(B.publicKeyOid);
            if (Z !== Q4.oids.rsaEncryption) {
                var D = new Error("Cannot read public key. Unknown OID.");
                throw D.oid = Z, D
            }
            A = B.rsaPublicKey
        }
        if (Q = [], !l0.validate(A, Y$8, B, Q)) {
            var D = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
            throw D.errors = Q, D
        }
        var G = m9.util.createBuffer(B.publicKeyModulus).toHex(),
            F = m9.util.createBuffer(B.publicKeyExponent).toHex();
        return Q4.setRsaPublicKey(new r6(G, 16), new r6(F, 16))
    };
    Q4.publicKeyToAsn1 = Q4.publicKeyToSubjectPublicKeyInfo = function(A) {
        return l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.OID, !1, l0.oidToDer(Q4.oids.rsaEncryption).getBytes()), l0.create(l0.Class.UNIVERSAL, l0.Type.NULL, !1, "")]), l0.create(l0.Class.UNIVERSAL, l0.Type.BITSTRING, !1, [Q4.publicKeyToRSAPublicKey(A)])])
    };
    Q4.publicKeyToRSAPublicKey = function(A) {
        return l0.create(l0.Class.UNIVERSAL, l0.Type.SEQUENCE, !0, [l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.n)), l0.create(l0.Class.UNIVERSAL, l0.Type.INTEGER, !1, KR(A.e))])
    };

    function QhB(A, B, Q) {
        var Z = m9.util.createBuffer(),
            D = Math.ceil(B.n.bitLength() / 8);
        if (A.length > D - 11) {
            var G = new Error("Message is too long for PKCS#1 v1.5 padding.");
            throw G.length = A.length, G.max = D - 11, G
        }
        Z.putByte(0), Z.putByte(Q);
        var F = D - 3 - A.length,
            I;
        if (Q === 0 || Q === 1) {
            I = Q === 0 ? 0 : 255;
            for (var Y = 0; Y < F; ++Y) Z.putByte(I)
        } else
            while (F > 0) {
                var W = 0,
                    J = m9.random.getBytes(F);
                for (var Y = 0; Y < F; ++Y)
                    if (I = J.charCodeAt(Y), I === 0) ++W;
                    else Z.putByte(I);
                F = W
            }
        return Z.putByte(0), Z.putBytes(A), Z
    }

    function Mh1(A, B, Q, Z) {
        var D = Math.ceil(B.n.bitLength() / 8),
            G = m9.util.createBuffer(A),
            F = G.getByte(),
            I = G.getByte();
        if (F !== 0 || Q && I !== 0 && I !== 1 || !Q && I != 2 || Q && I === 0 && typeof Z === "undefined") throw new Error("Encryption block is invalid.");
        var Y = 0;
        if (I === 0) {
            Y = D - 3 - Z;
            for (var W = 0; W < Y; ++W)
                if (G.getByte() !== 0) throw new Error("Encryption block is invalid.")
        } else if (I === 1) {
            Y = 0;
            while (G.length() > 1) {
                if (G.getByte() !== 255) {
                    --G.read;
                    break
                }++Y
            }
        } else if (I === 2) {
            Y = 0;
            while (G.length() > 1) {
                if (G.getByte() === 0) {
                    --G.read;
                    break
                }++Y
            }
        }
        var J = G.getByte();
        if (J !== 0 || Y !== D - 3 - G.length()) throw new Error("Encryption block is invalid.");
        return G.getBytes()
    }

    function V$8(A, B, Q) {
        if (typeof B === "function") Q = B, B = {};
        B = B || {};
        var Z = {
            algorithm: {
                name: B.algorithm || "PRIMEINC",
                options: {
                    workers: B.workers || 2,
                    workLoad: B.workLoad || 100,
                    workerScript: B.workerScript
                }
            }
        };
        if ("prng" in B) Z.prng = B.prng;
        D();

        function D() {
            G(A.pBits, function(I, Y) {
                if (I) return Q(I);
                if (A.p = Y, A.q !== null) return F(I, A.q);
                G(A.qBits, F)
            })
        }

        function G(I, Y) {
            m9.prime.generateProbablePrime(I, Z, Y)
        }

        function F(I, Y) {
            if (I) return Q(I);
            if (A.q = Y, A.p.compareTo(A.q) < 0) {
                var W = A.p;
                A.p = A.q, A.q = W
            }
            if (A.p.subtract(r6.ONE).gcd(A.e).compareTo(r6.ONE) !== 0) {
                A.p = null, D();
                return
            }
            if (A.q.subtract(r6.ONE).gcd(A.e).compareTo(r6.ONE) !== 0) {
                A.q = null, G(A.qBits, F);
                return
            }
            if (A.p1 = A.p.subtract(r6.ONE), A.q1 = A.q.subtract(r6.ONE), A.phi = A.p1.multiply(A.q1), A.phi.gcd(A.e).compareTo(r6.ONE) !== 0) {
                A.p = A.q = null, D();
                return
            }
            if (A.n = A.p.multiply(A.q), A.n.bitLength() !== A.bits) {
                A.q = null, G(A.qBits, F);
                return
            }
            var J = A.e.modInverse(A.phi);
            A.keys = {
                privateKey: Q4.rsa.setPrivateKey(A.n, A.e, J, A.p, A.q, J.mod(A.p1), J.mod(A.q1), A.q.modInverse(A.p)),
                publicKey: Q4.rsa.setPublicKey(A.n, A.e)
            }, Q(null, A.keys)
        }
    }

    function KR(A) {
        var B = A.toString(16);
        if (B[0] >= "8") B = "00" + B;
        var Q = m9.util.hexToBytes(B);
        if (Q.length > 1 && (Q.charCodeAt(0) === 0 && (Q.charCodeAt(1) & 128) === 0 || Q.charCodeAt(0) === 255 && (Q.charCodeAt(1) & 128) === 128)) return Q.substr(1);
        return Q
    }

    function C$8(A) {
        if (A <= 100) return 27;
        if (A <= 150) return 18;
        if (A <= 200) return 15;
        if (A <= 250) return 12;
        if (A <= 300) return 9;
        if (A <= 350) return 8;
        if (A <= 400) return 7;
        if (A <= 500) return 6;
        if (A <= 600) return 5;
        if (A <= 800) return 4;
        if (A <= 1250) return 3;
        return 2
    }

    function ofB(A) {
        return m9.util.isNodejs && typeof GO0[A] === "function"
    }

    function tfB(A) {
        return typeof wU.globalScope !== "undefined" && typeof wU.globalScope.crypto === "object" && typeof wU.globalScope.crypto.subtle === "object" && typeof wU.globalScope.crypto.subtle[A] === "function"
    }

    function efB(A) {
        return typeof wU.globalScope !== "undefined" && typeof wU.globalScope.msCrypto === "object" && typeof wU.globalScope.msCrypto.subtle === "object" && typeof wU.globalScope.msCrypto.subtle[A] === "function"
    }

    function AhB(A) {
        var B = m9.util.hexToBytes(A.toString(16)),
            Q = new Uint8Array(B.length);
        for (var Z = 0; Z < B.length; ++Z) Q[Z] = B.charCodeAt(Z);
        return Q
    }
});