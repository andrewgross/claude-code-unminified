/* chunk:483 bytes:[11566113, 11585579) size:19466 source:unpacked-cli.js */
var VO0 = E((Uy3, qhB) => {
    var K7 = j4();
    t$();
    o01();
    Ib();
    YO0();
    IO0();
    EU();
    XI1();
    BA1();
    b8();
    Sh1();
    var {
        asn1: E0,
        pki: $6
    } = K7, CI1 = qhB.exports = K7.pkcs12 = K7.pkcs12 || {}, $hB = {
        name: "ContentInfo",
        tagClass: E0.Class.UNIVERSAL,
        type: E0.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "ContentInfo.contentType",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.OID,
            constructed: !1,
            capture: "contentType"
        }, {
            name: "ContentInfo.content",
            tagClass: E0.Class.CONTEXT_SPECIFIC,
            constructed: !0,
            captureAsn1: "content"
        }]
    }, P$8 = {
        name: "PFX",
        tagClass: E0.Class.UNIVERSAL,
        type: E0.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "PFX.version",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.INTEGER,
            constructed: !1,
            capture: "version"
        }, $hB, {
            name: "PFX.macData",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.SEQUENCE,
            constructed: !0,
            optional: !0,
            captureAsn1: "mac",
            value: [{
                name: "PFX.macData.mac",
                tagClass: E0.Class.UNIVERSAL,
                type: E0.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PFX.macData.mac.digestAlgorithm",
                    tagClass: E0.Class.UNIVERSAL,
                    type: E0.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PFX.macData.mac.digestAlgorithm.algorithm",
                        tagClass: E0.Class.UNIVERSAL,
                        type: E0.Type.OID,
                        constructed: !1,
                        capture: "macAlgorithm"
                    }, {
                        name: "PFX.macData.mac.digestAlgorithm.parameters",
                        tagClass: E0.Class.UNIVERSAL,
                        captureAsn1: "macAlgorithmParameters"
                    }]
                }, {
                    name: "PFX.macData.mac.digest",
                    tagClass: E0.Class.UNIVERSAL,
                    type: E0.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "macDigest"
                }]
            }, {
                name: "PFX.macData.macSalt",
                tagClass: E0.Class.UNIVERSAL,
                type: E0.Type.OCTETSTRING,
                constructed: !1,
                capture: "macSalt"
            }, {
                name: "PFX.macData.iterations",
                tagClass: E0.Class.UNIVERSAL,
                type: E0.Type.INTEGER,
                constructed: !1,
                optional: !0,
                capture: "macIterations"
            }]
        }]
    }, S$8 = {
        name: "SafeBag",
        tagClass: E0.Class.UNIVERSAL,
        type: E0.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "SafeBag.bagId",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.OID,
            constructed: !1,
            capture: "bagId"
        }, {
            name: "SafeBag.bagValue",
            tagClass: E0.Class.CONTEXT_SPECIFIC,
            constructed: !0,
            captureAsn1: "bagValue"
        }, {
            name: "SafeBag.bagAttributes",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.SET,
            constructed: !0,
            optional: !0,
            capture: "bagAttributes"
        }]
    }, j$8 = {
        name: "Attribute",
        tagClass: E0.Class.UNIVERSAL,
        type: E0.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "Attribute.attrId",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.OID,
            constructed: !1,
            capture: "oid"
        }, {
            name: "Attribute.attrValues",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.SET,
            constructed: !0,
            capture: "values"
        }]
    }, k$8 = {
        name: "CertBag",
        tagClass: E0.Class.UNIVERSAL,
        type: E0.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "CertBag.certId",
            tagClass: E0.Class.UNIVERSAL,
            type: E0.Type.OID,
            constructed: !1,
            capture: "certId"
        }, {
            name: "CertBag.certValue",
            tagClass: E0.Class.CONTEXT_SPECIFIC,
            constructed: !0,
            value: [{
                name: "CertBag.certValue[0]",
                tagClass: E0.Class.UNIVERSAL,
                type: E0.Class.OCTETSTRING,
                constructed: !1,
                capture: "cert"
            }]
        }]
    };

    function VI1(A, B, Q, Z) {
        var D = [];
        for (var G = 0; G < A.length; G++)
            for (var F = 0; F < A[G].safeBags.length; F++) {
                var I = A[G].safeBags[F];
                if (Z !== void 0 && I.type !== Z) continue;
                if (B === null) {
                    D.push(I);
                    continue
                }
                if (I.attributes[B] !== void 0 && I.attributes[B].indexOf(Q) >= 0) D.push(I)
            }
        return D
    }
    CI1.pkcs12FromAsn1 = function(A, B, Q) {
        if (typeof B === "string") Q = B, B = !0;
        else if (B === void 0) B = !0;
        var Z = {},
            D = [];
        if (!E0.validate(A, P$8, Z, D)) {
            var G = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");
            throw G.errors = G, G
        }
        var F = {
            version: Z.version.charCodeAt(0),
            safeContents: [],
            getBags: function(z) {
                var $ = {},
                    L;
                if ("localKeyId" in z) L = z.localKeyId;
                else if ("localKeyIdHex" in z) L = K7.util.hexToBytes(z.localKeyIdHex);
                if (L === void 0 && !("friendlyName" in z) && "bagType" in z) $[z.bagType] = VI1(F.safeContents, null, null, z.bagType);
                if (L !== void 0) $.localKeyId = VI1(F.safeContents, "localKeyId", L, z.bagType);
                if ("friendlyName" in z) $.friendlyName = VI1(F.safeContents, "friendlyName", z.friendlyName, z.bagType);
                return $
            },
            getBagsByFriendlyName: function(z, $) {
                return VI1(F.safeContents, "friendlyName", z, $)
            },
            getBagsByLocalKeyId: function(z, $) {
                return VI1(F.safeContents, "localKeyId", z, $)
            }
        };
        if (Z.version.charCodeAt(0) !== 3) {
            var G = new Error("PKCS#12 PFX of version other than 3 not supported.");
            throw G.version = Z.version.charCodeAt(0), G
        }
        if (E0.derToOid(Z.contentType) !== $6.oids.data) {
            var G = new Error("Only PKCS#12 PFX in password integrity mode supported.");
            throw G.oid = E0.derToOid(Z.contentType), G
        }
        var I = Z.content.value[0];
        if (I.tagClass !== E0.Class.UNIVERSAL || I.type !== E0.Type.OCTETSTRING) throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
        if (I = XO0(I), Z.mac) {
            var Y = null,
                W = 0,
                J = E0.derToOid(Z.macAlgorithm);
            switch (J) {
                case $6.oids.sha1:
                    Y = K7.md.sha1.create(), W = 20;
                    break;
                case $6.oids.sha256:
                    Y = K7.md.sha256.create(), W = 32;
                    break;
                case $6.oids.sha384:
                    Y = K7.md.sha384.create(), W = 48;
                    break;
                case $6.oids.sha512:
                    Y = K7.md.sha512.create(), W = 64;
                    break;
                case $6.oids.md5:
                    Y = K7.md.md5.create(), W = 16;
                    break
            }
            if (Y === null) throw new Error("PKCS#12 uses unsupported MAC algorithm: " + J);
            var X = new K7.util.ByteBuffer(Z.macSalt),
                V = "macIterations" in Z ? parseInt(K7.util.bytesToHex(Z.macIterations), 16) : 1,
                C = CI1.generateKey(Q, X, 3, V, W, Y),
                K = K7.hmac.create();
            K.start(Y, C), K.update(I.value);
            var H = K.getMac();
            if (H.getBytes() !== Z.macDigest) throw new Error("PKCS#12 MAC could not be verified. Invalid password?")
        }
        return y$8(F, I.value, B, Q), F
    };

    function XO0(A) {
        if (A.composed || A.constructed) {
            var B = K7.util.createBuffer();
            for (var Q = 0; Q < A.value.length; ++Q) B.putBytes(A.value[Q].value);
            A.composed = A.constructed = !1, A.value = B.getBytes()
        }
        return A
    }

    function y$8(A, B, Q, Z) {
        if (B = E0.fromDer(B, Q), B.tagClass !== E0.Class.UNIVERSAL || B.type !== E0.Type.SEQUENCE || B.constructed !== !0) throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
        for (var D = 0; D < B.value.length; D++) {
            var G = B.value[D],
                F = {},
                I = [];
            if (!E0.validate(G, $hB, F, I)) {
                var Y = new Error("Cannot read ContentInfo.");
                throw Y.errors = I, Y
            }
            var W = {
                    encrypted: !1
                },
                J = null,
                X = F.content.value[0];
            switch (E0.derToOid(F.contentType)) {
                case $6.oids.data:
                    if (X.tagClass !== E0.Class.UNIVERSAL || X.type !== E0.Type.OCTETSTRING) throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
                    J = XO0(X).value;
                    break;
                case $6.oids.encryptedData:
                    J = _$8(X, Z), W.encrypted = !0;
                    break;
                default:
                    var Y = new Error("Unsupported PKCS#12 contentType.");
                    throw Y.contentType = E0.derToOid(F.contentType), Y
            }
            W.safeBags = x$8(J, Q, Z), A.safeContents.push(W)
        }
    }

    function _$8(A, B) {
        var Q = {},
            Z = [];
        if (!E0.validate(A, K7.pkcs7.asn1.encryptedDataValidator, Q, Z)) {
            var D = new Error("Cannot read EncryptedContentInfo.");
            throw D.errors = Z, D
        }
        var G = E0.derToOid(Q.contentType);
        if (G !== $6.oids.data) {
            var D = new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.");
            throw D.oid = G, D
        }
        G = E0.derToOid(Q.encAlgorithm);
        var F = $6.pbe.getCipher(G, Q.encParameter, B),
            I = XO0(Q.encryptedContentAsn1),
            Y = K7.util.createBuffer(I.value);
        if (F.update(Y), !F.finish()) throw new Error("Failed to decrypt PKCS#12 SafeContents.");
        return F.output.getBytes()
    }

    function x$8(A, B, Q) {
        if (!B && A.length === 0) return [];
        if (A = E0.fromDer(A, B), A.tagClass !== E0.Class.UNIVERSAL || A.type !== E0.Type.SEQUENCE || A.constructed !== !0) throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");
        var Z = [];
        for (var D = 0; D < A.value.length; D++) {
            var G = A.value[D],
                F = {},
                I = [];
            if (!E0.validate(G, S$8, F, I)) {
                var Y = new Error("Cannot read SafeBag.");
                throw Y.errors = I, Y
            }
            var W = {
                type: E0.derToOid(F.bagId),
                attributes: v$8(F.bagAttributes)
            };
            Z.push(W);
            var J, X, V = F.bagValue.value[0];
            switch (W.type) {
                case $6.oids.pkcs8ShroudedKeyBag:
                    if (V = $6.decryptPrivateKeyInfo(V, Q), V === null) throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");
                case $6.oids.keyBag:
                    try {
                        W.key = $6.privateKeyFromAsn1(V)
                    } catch (K) {
                        W.key = null, W.asn1 = V
                    }
                    continue;
                case $6.oids.certBag:
                    J = k$8, X = function() {
                        if (E0.derToOid(F.certId) !== $6.oids.x509Certificate) {
                            var K = new Error("Unsupported certificate type, only X.509 supported.");
                            throw K.oid = E0.derToOid(F.certId), K
                        }
                        var H = E0.fromDer(F.cert, B);
                        try {
                            W.cert = $6.certificateFromAsn1(H, !0)
                        } catch (z) {
                            W.cert = null, W.asn1 = H
                        }
                    };
                    break;
                default:
                    var Y = new Error("Unsupported PKCS#12 SafeBag type.");
                    throw Y.oid = W.type, Y
            }
            if (J !== void 0 && !E0.validate(V, J, F, I)) {
                var Y = new Error("Cannot read PKCS#12 " + J.name);
                throw Y.errors = I, Y
            }
            X()
        }
        return Z
    }

    function v$8(A) {
        var B = {};
        if (A !== void 0)
            for (var Q = 0; Q < A.length; ++Q) {
                var Z = {},
                    D = [];
                if (!E0.validate(A[Q], j$8, Z, D)) {
                    var G = new Error("Cannot read PKCS#12 BagAttribute.");
                    throw G.errors = D, G
                }
                var F = E0.derToOid(Z.oid);
                if ($6.oids[F] === void 0) continue;
                B[$6.oids[F]] = [];
                for (var I = 0; I < Z.values.length; ++I) B[$6.oids[F]].push(Z.values[I].value)
            }
        return B
    }
    CI1.toPkcs12Asn1 = function(A, B, Q, Z) {
        if (Z = Z || {}, Z.saltSize = Z.saltSize || 8, Z.count = Z.count || 2048, Z.algorithm = Z.algorithm || Z.encAlgorithm || "aes128", !("useMac" in Z)) Z.useMac = !0;
        if (!("localKeyId" in Z)) Z.localKeyId = null;
        if (!("generateLocalKeyId" in Z)) Z.generateLocalKeyId = !0;
        var D = Z.localKeyId,
            G;
        if (D !== null) D = K7.util.hexToBytes(D);
        else if (Z.generateLocalKeyId)
            if (B) {
                var F = K7.util.isArray(B) ? B[0] : B;
                if (typeof F === "string") F = $6.certificateFromPem(F);
                var I = K7.md.sha1.create();
                I.update(E0.toDer($6.certificateToAsn1(F)).getBytes()), D = I.digest().getBytes()
            } else D = K7.random.getBytes(20);
        var Y = [];
        if (D !== null) Y.push(E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.localKeyId).getBytes()), E0.create(E0.Class.UNIVERSAL, E0.Type.SET, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, D)])]));
        if ("friendlyName" in Z) Y.push(E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.friendlyName).getBytes()), E0.create(E0.Class.UNIVERSAL, E0.Type.SET, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.BMPSTRING, !1, Z.friendlyName)])]));
        if (Y.length > 0) G = E0.create(E0.Class.UNIVERSAL, E0.Type.SET, !0, Y);
        var W = [],
            J = [];
        if (B !== null)
            if (K7.util.isArray(B)) J = B;
            else J = [B];
        var X = [];
        for (var V = 0; V < J.length; ++V) {
            if (B = J[V], typeof B === "string") B = $6.certificateFromPem(B);
            var C = V === 0 ? G : void 0,
                K = $6.certificateToAsn1(B),
                H = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.certBag).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.x509Certificate).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, E0.toDer(K).getBytes())])])]), C]);
            X.push(H)
        }
        if (X.length > 0) {
            var z = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, X),
                $ = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.data).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, E0.toDer(z).getBytes())])]);
            W.push($)
        }
        var L = null;
        if (A !== null) {
            var N = $6.wrapRsaPrivateKey($6.privateKeyToAsn1(A));
            if (Q === null) L = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.keyBag).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [N]), G]);
            else L = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.pkcs8ShroudedKeyBag).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [$6.encryptPrivateKeyInfo(N, Q, Z)]), G]);
            var R = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [L]),
                O = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.data).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, E0.toDer(R).getBytes())])]);
            W.push(O)
        }
        var P = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, W),
            j;
        if (Z.useMac) {
            var I = K7.md.sha1.create(),
                f = new K7.util.ByteBuffer(K7.random.getBytes(Z.saltSize)),
                k = Z.count,
                A = CI1.generateKey(Q, f, 3, k, 20),
                c = K7.hmac.create();
            c.start(I, A), c.update(E0.toDer(P).getBytes());
            var u = c.getMac();
            j = E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.sha1).getBytes()), E0.create(E0.Class.UNIVERSAL, E0.Type.NULL, !1, "")]), E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, u.getBytes())]), E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, f.getBytes()), E0.create(E0.Class.UNIVERSAL, E0.Type.INTEGER, !1, E0.integerToDer(k).getBytes())])
        }
        return E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.INTEGER, !1, E0.integerToDer(3).getBytes()), E0.create(E0.Class.UNIVERSAL, E0.Type.SEQUENCE, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OID, !1, E0.oidToDer($6.oids.data).getBytes()), E0.create(E0.Class.CONTEXT_SPECIFIC, 0, !0, [E0.create(E0.Class.UNIVERSAL, E0.Type.OCTETSTRING, !1, E0.toDer(P).getBytes())])]), j])
    };
    CI1.generateKey = K7.pbe.generatePkcs12Key
});