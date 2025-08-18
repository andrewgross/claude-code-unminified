/* chunk:481 bytes:[11493620, 11506420) size:12800 source:unpacked-cli.js */
var YO0 = E((Cy3, JhB) => {
    var QA1 = j4();
    t$();
    b8();
    var AB = QA1.asn1,
        ZA1 = JhB.exports = QA1.pkcs7asn1 = QA1.pkcs7asn1 || {};
    QA1.pkcs7 = QA1.pkcs7 || {};
    QA1.pkcs7.asn1 = ZA1;
    var YhB = {
        name: "ContentInfo",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "ContentInfo.ContentType",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.OID,
            constructed: !1,
            capture: "contentType"
        }, {
            name: "ContentInfo.content",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 0,
            constructed: !0,
            optional: !0,
            captureAsn1: "content"
        }]
    };
    ZA1.contentInfoValidator = YhB;
    var WhB = {
        name: "EncryptedContentInfo",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "EncryptedContentInfo.contentType",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.OID,
            constructed: !1,
            capture: "contentType"
        }, {
            name: "EncryptedContentInfo.contentEncryptionAlgorithm",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.OID,
                constructed: !1,
                capture: "encAlgorithm"
            }, {
                name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
                tagClass: AB.Class.UNIVERSAL,
                captureAsn1: "encParameter"
            }]
        }, {
            name: "EncryptedContentInfo.encryptedContent",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 0,
            capture: "encryptedContent",
            captureAsn1: "encryptedContentAsn1"
        }]
    };
    ZA1.envelopedDataValidator = {
        name: "EnvelopedData",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "EnvelopedData.Version",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.INTEGER,
            constructed: !1,
            capture: "version"
        }, {
            name: "EnvelopedData.RecipientInfos",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SET,
            constructed: !0,
            captureAsn1: "recipientInfos"
        }].concat(WhB)
    };
    ZA1.encryptedDataValidator = {
        name: "EncryptedData",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "EncryptedData.Version",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.INTEGER,
            constructed: !1,
            capture: "version"
        }].concat(WhB)
    };
    var U$8 = {
        name: "SignerInfo",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "SignerInfo.version",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.INTEGER,
            constructed: !1
        }, {
            name: "SignerInfo.issuerAndSerialNumber",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignerInfo.issuerAndSerialNumber.issuer",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "issuer"
            }, {
                name: "SignerInfo.issuerAndSerialNumber.serialNumber",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.INTEGER,
                constructed: !1,
                capture: "serial"
            }]
        }, {
            name: "SignerInfo.digestAlgorithm",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignerInfo.digestAlgorithm.algorithm",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.OID,
                constructed: !1,
                capture: "digestAlgorithm"
            }, {
                name: "SignerInfo.digestAlgorithm.parameter",
                tagClass: AB.Class.UNIVERSAL,
                constructed: !1,
                captureAsn1: "digestParameter",
                optional: !0
            }]
        }, {
            name: "SignerInfo.authenticatedAttributes",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 0,
            constructed: !0,
            optional: !0,
            capture: "authenticatedAttributes"
        }, {
            name: "SignerInfo.digestEncryptionAlgorithm",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            capture: "signatureAlgorithm"
        }, {
            name: "SignerInfo.encryptedDigest",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.OCTETSTRING,
            constructed: !1,
            capture: "signature"
        }, {
            name: "SignerInfo.unauthenticatedAttributes",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 1,
            constructed: !0,
            optional: !0,
            capture: "unauthenticatedAttributes"
        }]
    };
    ZA1.signedDataValidator = {
        name: "SignedData",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "SignedData.Version",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.INTEGER,
            constructed: !1,
            capture: "version"
        }, {
            name: "SignedData.DigestAlgorithms",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SET,
            constructed: !0,
            captureAsn1: "digestAlgorithms"
        }, YhB, {
            name: "SignedData.Certificates",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 0,
            optional: !0,
            captureAsn1: "certificates"
        }, {
            name: "SignedData.CertificateRevocationLists",
            tagClass: AB.Class.CONTEXT_SPECIFIC,
            type: 1,
            optional: !0,
            captureAsn1: "crls"
        }, {
            name: "SignedData.SignerInfos",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SET,
            capture: "signerInfos",
            optional: !0,
            value: [U$8]
        }]
    };
    ZA1.recipientInfoValidator = {
        name: "RecipientInfo",
        tagClass: AB.Class.UNIVERSAL,
        type: AB.Type.SEQUENCE,
        constructed: !0,
        value: [{
            name: "RecipientInfo.version",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.INTEGER,
            constructed: !1,
            capture: "version"
        }, {
            name: "RecipientInfo.issuerAndSerial",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RecipientInfo.issuerAndSerial.issuer",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "issuer"
            }, {
                name: "RecipientInfo.issuerAndSerial.serialNumber",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.INTEGER,
                constructed: !1,
                capture: "serial"
            }]
        }, {
            name: "RecipientInfo.keyEncryptionAlgorithm",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
                tagClass: AB.Class.UNIVERSAL,
                type: AB.Type.OID,
                constructed: !1,
                capture: "encAlgorithm"
            }, {
                name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
                tagClass: AB.Class.UNIVERSAL,
                constructed: !1,
                captureAsn1: "encParameter",
                optional: !0
            }]
        }, {
            name: "RecipientInfo.encryptedKey",
            tagClass: AB.Class.UNIVERSAL,
            type: AB.Type.OCTETSTRING,
            constructed: !1,
            capture: "encKey"
        }]
    }
});
var WO0 = E((Ky3, XhB) => {
    var ld = j4();
    b8();
    ld.mgf = ld.mgf || {};
    var w$8 = XhB.exports = ld.mgf.mgf1 = ld.mgf1 = ld.mgf1 || {};
    w$8.create = function(A) {
        var B = {
            generate: function(Q, Z) {
                var D = new ld.util.ByteBuffer,
                    G = Math.ceil(Z / A.digestLength);
                for (var F = 0; F < G; F++) {
                    var I = new ld.util.ByteBuffer;
                    I.putInt32(F), A.start(), A.update(Q + I.getBytes()), D.putBuffer(A.digest())
                }
                return D.truncate(D.length() - Z), D.getBytes()
            }
        };
        return B
    }
});
var ChB = E((Hy3, VhB) => {
    var Rh1 = j4();
    WO0();
    VhB.exports = Rh1.mgf = Rh1.mgf || {};
    Rh1.mgf.mgf1 = Rh1.mgf1
});
var Oh1 = E((zy3, KhB) => {
    var pd = j4();
    EU();
    b8();
    var $$8 = KhB.exports = pd.pss = pd.pss || {};
    $$8.create = function(A) {
        if (arguments.length === 3) A = {
            md: arguments[0],
            mgf: arguments[1],
            saltLength: arguments[2]
        };
        var {
            md: B,
            mgf: Q
        } = A, Z = B.digestLength, D = A.salt || null;
        if (typeof D === "string") D = pd.util.createBuffer(D);
        var G;
        if ("saltLength" in A) G = A.saltLength;
        else if (D !== null) G = D.length();
        else throw new Error("Salt length not specified or specific salt not given.");
        if (D !== null && D.length() !== G) throw new Error("Given salt length does not match length of given salt.");
        var F = A.prng || pd.random,
            I = {};
        return I.encode = function(Y, W) {
            var J, X = W - 1,
                V = Math.ceil(X / 8),
                C = Y.digest().getBytes();
            if (V < Z + G + 2) throw new Error("Message is too long to encrypt.");
            var K;
            if (D === null) K = F.getBytesSync(G);
            else K = D.bytes();
            var H = new pd.util.ByteBuffer;
            H.fillWithByte(0, 8), H.putBytes(C), H.putBytes(K), B.start(), B.update(H.getBytes());
            var z = B.digest().getBytes(),
                $ = new pd.util.ByteBuffer;
            $.fillWithByte(0, V - G - Z - 2), $.putByte(1), $.putBytes(K);
            var L = $.getBytes(),
                N = V - Z - 1,
                R = Q.generate(z, N),
                O = "";
            for (J = 0; J < N; J++) O += String.fromCharCode(L.charCodeAt(J) ^ R.charCodeAt(J));
            var P = 65280 >> 8 * V - X & 255;
            return O = String.fromCharCode(O.charCodeAt(0) & ~P) + O.substr(1), O + z + String.fromCharCode(188)
        }, I.verify = function(Y, W, J) {
            var X, V = J - 1,
                C = Math.ceil(V / 8);
            if (W = W.substr(-C), C < Z + G + 2) throw new Error("Inconsistent parameters to PSS signature verification.");
            if (W.charCodeAt(C - 1) !== 188) throw new Error("Encoded message does not end in 0xBC.");
            var K = C - Z - 1,
                H = W.substr(0, K),
                z = W.substr(K, Z),
                $ = 65280 >> 8 * C - V & 255;
            if ((H.charCodeAt(0) & $) !== 0) throw new Error("Bits beyond keysize not zero as expected.");
            var L = Q.generate(z, K),
                N = "";
            for (X = 0; X < K; X++) N += String.fromCharCode(H.charCodeAt(X) ^ L.charCodeAt(X));
            N = String.fromCharCode(N.charCodeAt(0) & ~$) + N.substr(1);
            var R = C - Z - G - 2;
            for (X = 0; X < R; X++)
                if (N.charCodeAt(X) !== 0) throw new Error("Leftmost octets not zero as expected");
            if (N.charCodeAt(R) !== 1) throw new Error("Inconsistent PSS signature, 0x01 marker not found");
            var O = N.substr(-G),
                P = new pd.util.ByteBuffer;
            P.fillWithByte(0, 8), P.putBytes(Y), P.putBytes(O), B.start(), B.update(P.getBytes());
            var j = B.digest().getBytes();
            return z === j
        }, I
    }
});