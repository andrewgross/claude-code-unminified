/* chunk:489 bytes:[11691859, 11715140) size:23281 source:unpacked-cli.js */
var IgB = E((Py3, FgB) => {
    var f2 = j4();
    Fb();
    t$();
    YI1();
    Ib();
    ud();
    YO0();
    EU();
    b8();
    Sh1();
    var L0 = f2.asn1,
        yX = FgB.exports = f2.pkcs7 = f2.pkcs7 || {};
    yX.messageFromPem = function(A) {
        var B = f2.pem.decode(A)[0];
        if (B.type !== "PKCS7") {
            var Q = new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');
            throw Q.headerType = B.type, Q
        }
        if (B.procType && B.procType.type === "ENCRYPTED") throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");
        var Z = L0.fromDer(B.body);
        return yX.messageFromAsn1(Z)
    };
    yX.messageToPem = function(A, B) {
        var Q = {
            type: "PKCS7",
            body: L0.toDer(A.toAsn1()).getBytes()
        };
        return f2.pem.encode(Q, {
            maxline: B
        })
    };
    yX.messageFromAsn1 = function(A) {
        var B = {},
            Q = [];
        if (!L0.validate(A, yX.asn1.contentInfoValidator, B, Q)) {
            var Z = new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");
            throw Z.errors = Q, Z
        }
        var D = L0.derToOid(B.contentType),
            G;
        switch (D) {
            case f2.pki.oids.envelopedData:
                G = yX.createEnvelopedData();
                break;
            case f2.pki.oids.encryptedData:
                G = yX.createEncryptedData();
                break;
            case f2.pki.oids.signedData:
                G = yX.createSignedData();
                break;
            default:
                throw new Error("Cannot read PKCS#7 message. ContentType with OID " + D + " is not (yet) supported.")
        }
        return G.fromAsn1(B.content.value[0]), G
    };
    yX.createSignedData = function() {
        var A = null;
        return A = {
            type: f2.pki.oids.signedData,
            version: 1,
            certificates: [],
            crls: [],
            signers: [],
            digestAlgorithmIdentifiers: [],
            contentInfo: null,
            signerInfos: [],
            fromAsn1: function(Z) {
                if (fO0(A, Z, yX.asn1.signedDataValidator), A.certificates = [], A.crls = [], A.digestAlgorithmIdentifiers = [], A.contentInfo = null, A.signerInfos = [], A.rawCapture.certificates) {
                    var D = A.rawCapture.certificates.value;
                    for (var G = 0; G < D.length; ++G) A.certificates.push(f2.pki.certificateFromAsn1(D[G]))
                }
            },
            toAsn1: function() {
                if (!A.contentInfo) A.sign();
                var Z = [];
                for (var D = 0; D < A.certificates.length; ++D) Z.push(f2.pki.certificateToAsn1(A.certificates[D]));
                var G = [],
                    F = L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, L0.integerToDer(A.version).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SET, !0, A.digestAlgorithmIdentifiers), A.contentInfo])]);
                if (Z.length > 0) F.value[0].value.push(L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, Z));
                if (G.length > 0) F.value[0].value.push(L0.create(L0.Class.CONTEXT_SPECIFIC, 1, !0, G));
                return F.value[0].value.push(L0.create(L0.Class.UNIVERSAL, L0.Type.SET, !0, A.signerInfos)), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.type).getBytes()), F])
            },
            addSigner: function(Z) {
                var {
                    issuer: D,
                    serialNumber: G
                } = Z;
                if (Z.certificate) {
                    var F = Z.certificate;
                    if (typeof F === "string") F = f2.pki.certificateFromPem(F);
                    D = F.issuer.attributes, G = F.serialNumber
                }
                var I = Z.key;
                if (!I) throw new Error("Could not add PKCS#7 signer; no private key specified.");
                if (typeof I === "string") I = f2.pki.privateKeyFromPem(I);
                var Y = Z.digestAlgorithm || f2.pki.oids.sha1;
                switch (Y) {
                    case f2.pki.oids.sha1:
                    case f2.pki.oids.sha256:
                    case f2.pki.oids.sha384:
                    case f2.pki.oids.sha512:
                    case f2.pki.oids.md5:
                        break;
                    default:
                        throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: " + Y)
                }
                var W = Z.authenticatedAttributes || [];
                if (W.length > 0) {
                    var J = !1,
                        X = !1;
                    for (var V = 0; V < W.length; ++V) {
                        var C = W[V];
                        if (!J && C.type === f2.pki.oids.contentType) {
                            if (J = !0, X) break;
                            continue
                        }
                        if (!X && C.type === f2.pki.oids.messageDigest) {
                            if (X = !0, J) break;
                            continue
                        }
                    }
                    if (!J || !X) throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.")
                }
                A.signers.push({
                    key: I,
                    version: 1,
                    issuer: D,
                    serialNumber: G,
                    digestAlgorithm: Y,
                    signatureAlgorithm: f2.pki.oids.rsaEncryption,
                    signature: null,
                    authenticatedAttributes: W,
                    unauthenticatedAttributes: []
                })
            },
            sign: function(Z) {
                if (Z = Z || {}, typeof A.content !== "object" || A.contentInfo === null) {
                    if (A.contentInfo = L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(f2.pki.oids.data).getBytes())]), "content" in A) {
                        var D;
                        if (A.content instanceof f2.util.ByteBuffer) D = A.content.bytes();
                        else if (typeof A.content === "string") D = f2.util.encodeUtf8(A.content);
                        if (Z.detached) A.detachedContent = L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, D);
                        else A.contentInfo.value.push(L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, D)]))
                    }
                }
                if (A.signers.length === 0) return;
                var G = B();
                Q(G)
            },
            verify: function() {
                throw new Error("PKCS#7 signature verification not yet implemented.")
            },
            addCertificate: function(Z) {
                if (typeof Z === "string") Z = f2.pki.certificateFromPem(Z);
                A.certificates.push(Z)
            },
            addCertificateRevokationList: function(Z) {
                throw new Error("PKCS#7 CRL support not yet implemented.")
            }
        }, A;

        function B() {
            var Z = {};
            for (var D = 0; D < A.signers.length; ++D) {
                var G = A.signers[D],
                    F = G.digestAlgorithm;
                if (!(F in Z)) Z[F] = f2.md[f2.pki.oids[F]].create();
                if (G.authenticatedAttributes.length === 0) G.md = Z[F];
                else G.md = f2.md[f2.pki.oids[F]].create()
            }
            A.digestAlgorithmIdentifiers = [];
            for (var F in Z) A.digestAlgorithmIdentifiers.push(L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(F).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.NULL, !1, "")]));
            return Z
        }

        function Q(Z) {
            var D;
            if (A.detachedContent) D = A.detachedContent;
            else D = A.contentInfo.value[1], D = D.value[0];
            if (!D) throw new Error("Could not sign PKCS#7 message; there is no content to sign.");
            var G = L0.derToOid(A.contentInfo.value[0].value),
                F = L0.toDer(D);
            F.getByte(), L0.getBerValueLength(F), F = F.getBytes();
            for (var I in Z) Z[I].start().update(F);
            var Y = new Date;
            for (var W = 0; W < A.signers.length; ++W) {
                var J = A.signers[W];
                if (J.authenticatedAttributes.length === 0) {
                    if (G !== f2.pki.oids.data) throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.")
                } else {
                    J.authenticatedAttributesAsn1 = L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, []);
                    var X = L0.create(L0.Class.UNIVERSAL, L0.Type.SET, !0, []);
                    for (var V = 0; V < J.authenticatedAttributes.length; ++V) {
                        var C = J.authenticatedAttributes[V];
                        if (C.type === f2.pki.oids.messageDigest) C.value = Z[J.digestAlgorithm].digest();
                        else if (C.type === f2.pki.oids.signingTime) {
                            if (!C.value) C.value = Y
                        }
                        X.value.push(bO0(C)), J.authenticatedAttributesAsn1.value.push(bO0(C))
                    }
                    F = L0.toDer(X).getBytes(), J.md.start().update(F)
                }
                J.signature = J.key.sign(J.md, "RSASSA-PKCS1-V1_5")
            }
            A.signerInfos = jq8(A.signers)
        }
    };
    yX.createEncryptedData = function() {
        var A = null;
        return A = {
            type: f2.pki.oids.encryptedData,
            version: 0,
            encryptedContent: {
                algorithm: f2.pki.oids["aes256-CBC"]
            },
            fromAsn1: function(B) {
                fO0(A, B, yX.asn1.encryptedDataValidator)
            },
            decrypt: function(B) {
                if (B !== void 0) A.encryptedContent.key = B;
                GgB(A)
            }
        }, A
    };
    yX.createEnvelopedData = function() {
        var A = null;
        return A = {
            type: f2.pki.oids.envelopedData,
            version: 0,
            recipients: [],
            encryptedContent: {
                algorithm: f2.pki.oids["aes256-CBC"]
            },
            fromAsn1: function(B) {
                var Q = fO0(A, B, yX.asn1.envelopedDataValidator);
                A.recipients = Tq8(Q.recipientInfos.value)
            },
            toAsn1: function() {
                return L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.type).getBytes()), L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, L0.integerToDer(A.version).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SET, !0, Pq8(A.recipients)), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, kq8(A.encryptedContent))])])])
            },
            findRecipient: function(B) {
                var Q = B.issuer.attributes;
                for (var Z = 0; Z < A.recipients.length; ++Z) {
                    var D = A.recipients[Z],
                        G = D.issuer;
                    if (D.serialNumber !== B.serialNumber) continue;
                    if (G.length !== Q.length) continue;
                    var F = !0;
                    for (var I = 0; I < Q.length; ++I)
                        if (G[I].type !== Q[I].type || G[I].value !== Q[I].value) {
                            F = !1;
                            break
                        } if (F) return D
                }
                return null
            },
            decrypt: function(B, Q) {
                if (A.encryptedContent.key === void 0 && B !== void 0 && Q !== void 0) switch (B.encryptedContent.algorithm) {
                    case f2.pki.oids.rsaEncryption:
                    case f2.pki.oids.desCBC:
                        var Z = Q.decrypt(B.encryptedContent.content);
                        A.encryptedContent.key = f2.util.createBuffer(Z);
                        break;
                    default:
                        throw new Error("Unsupported asymmetric cipher, OID " + B.encryptedContent.algorithm)
                }
                GgB(A)
            },
            addRecipient: function(B) {
                A.recipients.push({
                    version: 0,
                    issuer: B.issuer.attributes,
                    serialNumber: B.serialNumber,
                    encryptedContent: {
                        algorithm: f2.pki.oids.rsaEncryption,
                        key: B.publicKey
                    }
                })
            },
            encrypt: function(B, Q) {
                if (A.encryptedContent.content === void 0) {
                    Q = Q || A.encryptedContent.algorithm, B = B || A.encryptedContent.key;
                    var Z, D, G;
                    switch (Q) {
                        case f2.pki.oids["aes128-CBC"]:
                            Z = 16, D = 16, G = f2.aes.createEncryptionCipher;
                            break;
                        case f2.pki.oids["aes192-CBC"]:
                            Z = 24, D = 16, G = f2.aes.createEncryptionCipher;
                            break;
                        case f2.pki.oids["aes256-CBC"]:
                            Z = 32, D = 16, G = f2.aes.createEncryptionCipher;
                            break;
                        case f2.pki.oids["des-EDE3-CBC"]:
                            Z = 24, D = 8, G = f2.des.createEncryptionCipher;
                            break;
                        default:
                            throw new Error("Unsupported symmetric cipher, OID " + Q)
                    }
                    if (B === void 0) B = f2.util.createBuffer(f2.random.getBytes(Z));
                    else if (B.length() != Z) throw new Error("Symmetric key has wrong length; got " + B.length() + " bytes, expected " + Z + ".");
                    A.encryptedContent.algorithm = Q, A.encryptedContent.key = B, A.encryptedContent.parameter = f2.util.createBuffer(f2.random.getBytes(D));
                    var F = G(B);
                    if (F.start(A.encryptedContent.parameter.copy()), F.update(A.content), !F.finish()) throw new Error("Symmetric encryption failed.");
                    A.encryptedContent.content = F.output
                }
                for (var I = 0; I < A.recipients.length; ++I) {
                    var Y = A.recipients[I];
                    if (Y.encryptedContent.content !== void 0) continue;
                    switch (Y.encryptedContent.algorithm) {
                        case f2.pki.oids.rsaEncryption:
                            Y.encryptedContent.content = Y.encryptedContent.key.encrypt(A.encryptedContent.key.data);
                            break;
                        default:
                            throw new Error("Unsupported asymmetric cipher, OID " + Y.encryptedContent.algorithm)
                    }
                }
            }
        }, A
    };

    function Rq8(A) {
        var B = {},
            Q = [];
        if (!L0.validate(A, yX.asn1.recipientInfoValidator, B, Q)) {
            var Z = new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");
            throw Z.errors = Q, Z
        }
        return {
            version: B.version.charCodeAt(0),
            issuer: f2.pki.RDNAttributesAsArray(B.issuer),
            serialNumber: f2.util.createBuffer(B.serial).toHex(),
            encryptedContent: {
                algorithm: L0.derToOid(B.encAlgorithm),
                parameter: B.encParameter ? B.encParameter.value : void 0,
                content: B.encKey
            }
        }
    }

    function Oq8(A) {
        return L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, L0.integerToDer(A.version).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [f2.pki.distinguishedNameToAsn1({
            attributes: A.issuer
        }), L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, f2.util.hexToBytes(A.serialNumber))]), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.encryptedContent.algorithm).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.NULL, !1, "")]), L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, A.encryptedContent.content)])
    }

    function Tq8(A) {
        var B = [];
        for (var Q = 0; Q < A.length; ++Q) B.push(Rq8(A[Q]));
        return B
    }

    function Pq8(A) {
        var B = [];
        for (var Q = 0; Q < A.length; ++Q) B.push(Oq8(A[Q]));
        return B
    }

    function Sq8(A) {
        var B = L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, L0.integerToDer(A.version).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [f2.pki.distinguishedNameToAsn1({
            attributes: A.issuer
        }), L0.create(L0.Class.UNIVERSAL, L0.Type.INTEGER, !1, f2.util.hexToBytes(A.serialNumber))]), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.digestAlgorithm).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.NULL, !1, "")])]);
        if (A.authenticatedAttributesAsn1) B.value.push(A.authenticatedAttributesAsn1);
        if (B.value.push(L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.signatureAlgorithm).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.NULL, !1, "")])), B.value.push(L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, A.signature)), A.unauthenticatedAttributes.length > 0) {
            var Q = L0.create(L0.Class.CONTEXT_SPECIFIC, 1, !0, []);
            for (var Z = 0; Z < A.unauthenticatedAttributes.length; ++Z) {
                var D = A.unauthenticatedAttributes[Z];
                Q.values.push(bO0(D))
            }
            B.value.push(Q)
        }
        return B
    }

    function jq8(A) {
        var B = [];
        for (var Q = 0; Q < A.length; ++Q) B.push(Sq8(A[Q]));
        return B
    }

    function bO0(A) {
        var B;
        if (A.type === f2.pki.oids.contentType) B = L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.value).getBytes());
        else if (A.type === f2.pki.oids.messageDigest) B = L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, A.value.bytes());
        else if (A.type === f2.pki.oids.signingTime) {
            var Q = new Date("1950-01-01T00:00:00Z"),
                Z = new Date("2050-01-01T00:00:00Z"),
                D = A.value;
            if (typeof D === "string") {
                var G = Date.parse(D);
                if (!isNaN(G)) D = new Date(G);
                else if (D.length === 13) D = L0.utcTimeToDate(D);
                else D = L0.generalizedTimeToDate(D)
            }
            if (D >= Q && D < Z) B = L0.create(L0.Class.UNIVERSAL, L0.Type.UTCTIME, !1, L0.dateToUtcTime(D));
            else B = L0.create(L0.Class.UNIVERSAL, L0.Type.GENERALIZEDTIME, !1, L0.dateToGeneralizedTime(D))
        }
        return L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.type).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SET, !0, [B])])
    }

    function kq8(A) {
        return [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(f2.pki.oids.data).getBytes()), L0.create(L0.Class.UNIVERSAL, L0.Type.SEQUENCE, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OID, !1, L0.oidToDer(A.algorithm).getBytes()), !A.parameter ? void 0 : L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, A.parameter.getBytes())]), L0.create(L0.Class.CONTEXT_SPECIFIC, 0, !0, [L0.create(L0.Class.UNIVERSAL, L0.Type.OCTETSTRING, !1, A.content.getBytes())])]
    }

    function fO0(A, B, Q) {
        var Z = {},
            D = [];
        if (!L0.validate(B, Q, Z, D)) {
            var G = new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");
            throw G.errors = G, G
        }
        var F = L0.derToOid(Z.contentType);
        if (F !== f2.pki.oids.data) throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");
        if (Z.encryptedContent) {
            var I = "";
            if (f2.util.isArray(Z.encryptedContent))
                for (var Y = 0; Y < Z.encryptedContent.length; ++Y) {
                    if (Z.encryptedContent[Y].type !== L0.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");
                    I += Z.encryptedContent[Y].value
                } else I = Z.encryptedContent;
            A.encryptedContent = {
                algorithm: L0.derToOid(Z.encAlgorithm),
                parameter: f2.util.createBuffer(Z.encParameter.value),
                content: f2.util.createBuffer(I)
            }
        }
        if (Z.content) {
            var I = "";
            if (f2.util.isArray(Z.content))
                for (var Y = 0; Y < Z.content.length; ++Y) {
                    if (Z.content[Y].type !== L0.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");
                    I += Z.content[Y].value
                } else I = Z.content;
            A.content = f2.util.createBuffer(I)
        }
        return A.version = Z.version.charCodeAt(0), A.rawCapture = Z, Z
    }

    function GgB(A) {
        if (A.encryptedContent.key === void 0) throw new Error("Symmetric key not available.");
        if (A.content === void 0) {
            var B;
            switch (A.encryptedContent.algorithm) {
                case f2.pki.oids["aes128-CBC"]:
                case f2.pki.oids["aes192-CBC"]:
                case f2.pki.oids["aes256-CBC"]:
                    B = f2.aes.createDecryptionCipher(A.encryptedContent.key);
                    break;
                case f2.pki.oids.desCBC:
                case f2.pki.oids["des-EDE3-CBC"]:
                    B = f2.des.createDecryptionCipher(A.encryptedContent.key);
                    break;
                default:
                    throw new Error("Unsupported symmetric cipher, OID " + A.encryptedContent.algorithm)
            }
            if (B.start(A.encryptedContent.parameter), B.update(A.encryptedContent.content), !B.finish()) throw new Error("Symmetric decryption failed.");
            A.content = B.output
        }
    }
});