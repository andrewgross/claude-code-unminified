/* chunk:482 bytes:[11506421, 11566112) size:59691 source:unpacked-cli.js */
var Sh1 = E((Ey3, whB) => {
    var d9 = j4();
    Fb();
    t$();
    YI1();
    IR();
    ChB();
    Ib();
    ud();
    Oh1();
    XI1();
    b8();
    var L1 = d9.asn1,
        $2 = whB.exports = d9.pki = d9.pki || {},
        z8 = $2.oids,
        OD = {};
    OD.CN = z8.commonName;
    OD.commonName = "CN";
    OD.C = z8.countryName;
    OD.countryName = "C";
    OD.L = z8.localityName;
    OD.localityName = "L";
    OD.ST = z8.stateOrProvinceName;
    OD.stateOrProvinceName = "ST";
    OD.O = z8.organizationName;
    OD.organizationName = "O";
    OD.OU = z8.organizationalUnitName;
    OD.organizationalUnitName = "OU";
    OD.E = z8.emailAddress;
    OD.emailAddress = "E";
    var zhB = d9.pki.rsa.publicKeyValidator,
        q$8 = {
            name: "Certificate",
            tagClass: L1.Class.UNIVERSAL,
            type: L1.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "Certificate.TBSCertificate",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "tbsCertificate",
                value: [{
                    name: "Certificate.TBSCertificate.version",
                    tagClass: L1.Class.CONTEXT_SPECIFIC,
                    type: 0,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.version.integer",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.INTEGER,
                        constructed: !1,
                        capture: "certVersion"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.serialNumber",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.INTEGER,
                    constructed: !1,
                    capture: "certSerialNumber"
                }, {
                    name: "Certificate.TBSCertificate.signature",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.signature.algorithm",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.OID,
                        constructed: !1,
                        capture: "certinfoSignatureOid"
                    }, {
                        name: "Certificate.TBSCertificate.signature.parameters",
                        tagClass: L1.Class.UNIVERSAL,
                        optional: !0,
                        captureAsn1: "certinfoSignatureParams"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.issuer",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certIssuer"
                }, {
                    name: "Certificate.TBSCertificate.validity",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.validity.notBefore (utc)",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity1UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity2GeneralizedTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (utc)",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity3UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity4GeneralizedTime"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subject",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certSubject"
                }, zhB, {
                    name: "Certificate.TBSCertificate.issuerUniqueID",
                    tagClass: L1.Class.CONTEXT_SPECIFIC,
                    type: 1,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.issuerUniqueID.id",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certIssuerUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subjectUniqueID",
                    tagClass: L1.Class.CONTEXT_SPECIFIC,
                    type: 2,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.subjectUniqueID.id",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certSubjectUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.extensions",
                    tagClass: L1.Class.CONTEXT_SPECIFIC,
                    type: 3,
                    constructed: !0,
                    captureAsn1: "certExtensions",
                    optional: !0
                }]
            }, {
                name: "Certificate.signatureAlgorithm",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "Certificate.signatureAlgorithm.algorithm",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.OID,
                    constructed: !1,
                    capture: "certSignatureOid"
                }, {
                    name: "Certificate.TBSCertificate.signature.parameters",
                    tagClass: L1.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "certSignatureParams"
                }]
            }, {
                name: "Certificate.signatureValue",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "certSignature"
            }]
        },
        N$8 = {
            name: "rsapss",
            tagClass: L1.Class.UNIVERSAL,
            type: L1.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "rsapss.hashAlgorithm",
                tagClass: L1.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                value: [{
                    name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.OID,
                        constructed: !1,
                        capture: "hashOid"
                    }]
                }]
            }, {
                name: "rsapss.maskGenAlgorithm",
                tagClass: L1.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                value: [{
                    name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.OID,
                        constructed: !1,
                        capture: "maskGenOid"
                    }, {
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
                            tagClass: L1.Class.UNIVERSAL,
                            type: L1.Type.OID,
                            constructed: !1,
                            capture: "maskGenHashOid"
                        }]
                    }]
                }]
            }, {
                name: "rsapss.saltLength",
                tagClass: L1.Class.CONTEXT_SPECIFIC,
                type: 2,
                optional: !0,
                value: [{
                    name: "rsapss.saltLength.saltLength",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Class.INTEGER,
                    constructed: !1,
                    capture: "saltLength"
                }]
            }, {
                name: "rsapss.trailerField",
                tagClass: L1.Class.CONTEXT_SPECIFIC,
                type: 3,
                optional: !0,
                value: [{
                    name: "rsapss.trailer.trailer",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Class.INTEGER,
                    constructed: !1,
                    capture: "trailer"
                }]
            }]
        },
        L$8 = {
            name: "CertificationRequestInfo",
            tagClass: L1.Class.UNIVERSAL,
            type: L1.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "certificationRequestInfo",
            value: [{
                name: "CertificationRequestInfo.integer",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.INTEGER,
                constructed: !1,
                capture: "certificationRequestInfoVersion"
            }, {
                name: "CertificationRequestInfo.subject",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "certificationRequestInfoSubject"
            }, zhB, {
                name: "CertificationRequestInfo.attributes",
                tagClass: L1.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "certificationRequestInfoAttributes",
                value: [{
                    name: "CertificationRequestInfo.attributes",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "CertificationRequestInfo.attributes.type",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.OID,
                        constructed: !1
                    }, {
                        name: "CertificationRequestInfo.attributes.value",
                        tagClass: L1.Class.UNIVERSAL,
                        type: L1.Type.SET,
                        constructed: !0
                    }]
                }]
            }]
        },
        M$8 = {
            name: "CertificationRequest",
            tagClass: L1.Class.UNIVERSAL,
            type: L1.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "csr",
            value: [L$8, {
                name: "CertificationRequest.signatureAlgorithm",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "CertificationRequest.signatureAlgorithm.algorithm",
                    tagClass: L1.Class.UNIVERSAL,
                    type: L1.Type.OID,
                    constructed: !1,
                    capture: "csrSignatureOid"
                }, {
                    name: "CertificationRequest.signatureAlgorithm.parameters",
                    tagClass: L1.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "csrSignatureParams"
                }]
            }, {
                name: "CertificationRequest.signature",
                tagClass: L1.Class.UNIVERSAL,
                type: L1.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "csrSignature"
            }]
        };
    $2.RDNAttributesAsArray = function(A, B) {
        var Q = [],
            Z, D, G;
        for (var F = 0; F < A.value.length; ++F) {
            Z = A.value[F];
            for (var I = 0; I < Z.value.length; ++I) {
                if (G = {}, D = Z.value[I], G.type = L1.derToOid(D.value[0].value), G.value = D.value[1].value, G.valueTagClass = D.value[1].type, G.type in z8) {
                    if (G.name = z8[G.type], G.name in OD) G.shortName = OD[G.name]
                }
                if (B) B.update(G.type), B.update(G.value);
                Q.push(G)
            }
        }
        return Q
    };
    $2.CRIAttributesAsArray = function(A) {
        var B = [];
        for (var Q = 0; Q < A.length; ++Q) {
            var Z = A[Q],
                D = L1.derToOid(Z.value[0].value),
                G = Z.value[1].value;
            for (var F = 0; F < G.length; ++F) {
                var I = {};
                if (I.type = D, I.value = G[F].value, I.valueTagClass = G[F].type, I.type in z8) {
                    if (I.name = z8[I.type], I.name in OD) I.shortName = OD[I.name]
                }
                if (I.type === z8.extensionRequest) {
                    I.extensions = [];
                    for (var Y = 0; Y < I.value.length; ++Y) I.extensions.push($2.certificateExtensionFromAsn1(I.value[Y]))
                }
                B.push(I)
            }
        }
        return B
    };

    function Jb(A, B) {
        if (typeof B === "string") B = {
            shortName: B
        };
        var Q = null,
            Z;
        for (var D = 0; Q === null && D < A.attributes.length; ++D)
            if (Z = A.attributes[D], B.type && B.type === Z.type) Q = Z;
            else if (B.name && B.name === Z.name) Q = Z;
        else if (B.shortName && B.shortName === Z.shortName) Q = Z;
        return Q
    }
    var Th1 = function(A, B, Q) {
            var Z = {};
            if (A !== z8["RSASSA-PSS"]) return Z;
            if (Q) Z = {
                hash: {
                    algorithmOid: z8.sha1
                },
                mgf: {
                    algorithmOid: z8.mgf1,
                    hash: {
                        algorithmOid: z8.sha1
                    }
                },
                saltLength: 20
            };
            var D = {},
                G = [];
            if (!L1.validate(B, N$8, D, G)) {
                var F = new Error("Cannot read RSASSA-PSS parameter block.");
                throw F.errors = G, F
            }
            if (D.hashOid !== void 0) Z.hash = Z.hash || {}, Z.hash.algorithmOid = L1.derToOid(D.hashOid);
            if (D.maskGenOid !== void 0) Z.mgf = Z.mgf || {}, Z.mgf.algorithmOid = L1.derToOid(D.maskGenOid), Z.mgf.hash = Z.mgf.hash || {}, Z.mgf.hash.algorithmOid = L1.derToOid(D.maskGenHashOid);
            if (D.saltLength !== void 0) Z.saltLength = D.saltLength.charCodeAt(0);
            return Z
        },
        Ph1 = function(A) {
            switch (z8[A.signatureOid]) {
                case "sha1WithRSAEncryption":
                case "sha1WithRSASignature":
                    return d9.md.sha1.create();
                case "md5WithRSAEncryption":
                    return d9.md.md5.create();
                case "sha256WithRSAEncryption":
                    return d9.md.sha256.create();
                case "sha384WithRSAEncryption":
                    return d9.md.sha384.create();
                case "sha512WithRSAEncryption":
                    return d9.md.sha512.create();
                case "RSASSA-PSS":
                    return d9.md.sha256.create();
                default:
                    var B = new Error("Could not compute " + A.type + " digest. Unknown signature OID.");
                    throw B.signatureOid = A.signatureOid, B
            }
        },
        EhB = function(A) {
            var B = A.certificate,
                Q;
            switch (B.signatureOid) {
                case z8.sha1WithRSAEncryption:
                case z8.sha1WithRSASignature:
                    break;
                case z8["RSASSA-PSS"]:
                    var Z, D;
                    if (Z = z8[B.signatureParameters.mgf.hash.algorithmOid], Z === void 0 || d9.md[Z] === void 0) {
                        var G = new Error("Unsupported MGF hash function.");
                        throw G.oid = B.signatureParameters.mgf.hash.algorithmOid, G.name = Z, G
                    }
                    if (D = z8[B.signatureParameters.mgf.algorithmOid], D === void 0 || d9.mgf[D] === void 0) {
                        var G = new Error("Unsupported MGF function.");
                        throw G.oid = B.signatureParameters.mgf.algorithmOid, G.name = D, G
                    }
                    if (D = d9.mgf[D].create(d9.md[Z].create()), Z = z8[B.signatureParameters.hash.algorithmOid], Z === void 0 || d9.md[Z] === void 0) {
                        var G = new Error("Unsupported RSASSA-PSS hash function.");
                        throw G.oid = B.signatureParameters.hash.algorithmOid, G.name = Z, G
                    }
                    Q = d9.pss.create(d9.md[Z].create(), D, B.signatureParameters.saltLength);
                    break
            }
            return B.publicKey.verify(A.md.digest().getBytes(), A.signature, Q)
        };
    $2.certificateFromPem = function(A, B, Q) {
        var Z = d9.pem.decode(A)[0];
        if (Z.type !== "CERTIFICATE" && Z.type !== "X509 CERTIFICATE" && Z.type !== "TRUSTED CERTIFICATE") {
            var D = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
            throw D.headerType = Z.type, D
        }
        if (Z.procType && Z.procType.type === "ENCRYPTED") throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
        var G = L1.fromDer(Z.body, Q);
        return $2.certificateFromAsn1(G, B)
    };
    $2.certificateToPem = function(A, B) {
        var Q = {
            type: "CERTIFICATE",
            body: L1.toDer($2.certificateToAsn1(A)).getBytes()
        };
        return d9.pem.encode(Q, {
            maxline: B
        })
    };
    $2.publicKeyFromPem = function(A) {
        var B = d9.pem.decode(A)[0];
        if (B.type !== "PUBLIC KEY" && B.type !== "RSA PUBLIC KEY") {
            var Q = new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');
            throw Q.headerType = B.type, Q
        }
        if (B.procType && B.procType.type === "ENCRYPTED") throw new Error("Could not convert public key from PEM; PEM is encrypted.");
        var Z = L1.fromDer(B.body);
        return $2.publicKeyFromAsn1(Z)
    };
    $2.publicKeyToPem = function(A, B) {
        var Q = {
            type: "PUBLIC KEY",
            body: L1.toDer($2.publicKeyToAsn1(A)).getBytes()
        };
        return d9.pem.encode(Q, {
            maxline: B
        })
    };
    $2.publicKeyToRSAPublicKeyPem = function(A, B) {
        var Q = {
            type: "RSA PUBLIC KEY",
            body: L1.toDer($2.publicKeyToRSAPublicKey(A)).getBytes()
        };
        return d9.pem.encode(Q, {
            maxline: B
        })
    };
    $2.getPublicKeyFingerprint = function(A, B) {
        B = B || {};
        var Q = B.md || d9.md.sha1.create(),
            Z = B.type || "RSAPublicKey",
            D;
        switch (Z) {
            case "RSAPublicKey":
                D = L1.toDer($2.publicKeyToRSAPublicKey(A)).getBytes();
                break;
            case "SubjectPublicKeyInfo":
                D = L1.toDer($2.publicKeyToAsn1(A)).getBytes();
                break;
            default:
                throw new Error('Unknown fingerprint type "' + B.type + '".')
        }
        Q.start(), Q.update(D);
        var G = Q.digest();
        if (B.encoding === "hex") {
            var F = G.toHex();
            if (B.delimiter) return F.match(/.{2}/g).join(B.delimiter);
            return F
        } else if (B.encoding === "binary") return G.getBytes();
        else if (B.encoding) throw new Error('Unknown encoding "' + B.encoding + '".');
        return G
    };
    $2.certificationRequestFromPem = function(A, B, Q) {
        var Z = d9.pem.decode(A)[0];
        if (Z.type !== "CERTIFICATE REQUEST") {
            var D = new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');
            throw D.headerType = Z.type, D
        }
        if (Z.procType && Z.procType.type === "ENCRYPTED") throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
        var G = L1.fromDer(Z.body, Q);
        return $2.certificationRequestFromAsn1(G, B)
    };
    $2.certificationRequestToPem = function(A, B) {
        var Q = {
            type: "CERTIFICATE REQUEST",
            body: L1.toDer($2.certificationRequestToAsn1(A)).getBytes()
        };
        return d9.pem.encode(Q, {
            maxline: B
        })
    };
    $2.createCertificate = function() {
        var A = {};
        return A.version = 2, A.serialNumber = "00", A.signatureOid = null, A.signature = null, A.siginfo = {}, A.siginfo.algorithmOid = null, A.validity = {}, A.validity.notBefore = new Date, A.validity.notAfter = new Date, A.issuer = {}, A.issuer.getField = function(B) {
            return Jb(A.issuer, B)
        }, A.issuer.addField = function(B) {
            $U([B]), A.issuer.attributes.push(B)
        }, A.issuer.attributes = [], A.issuer.hash = null, A.subject = {}, A.subject.getField = function(B) {
            return Jb(A.subject, B)
        }, A.subject.addField = function(B) {
            $U([B]), A.subject.attributes.push(B)
        }, A.subject.attributes = [], A.subject.hash = null, A.extensions = [], A.publicKey = null, A.md = null, A.setSubject = function(B, Q) {
            if ($U(B), A.subject.attributes = B, delete A.subject.uniqueId, Q) A.subject.uniqueId = Q;
            A.subject.hash = null
        }, A.setIssuer = function(B, Q) {
            if ($U(B), A.issuer.attributes = B, delete A.issuer.uniqueId, Q) A.issuer.uniqueId = Q;
            A.issuer.hash = null
        }, A.setExtensions = function(B) {
            for (var Q = 0; Q < B.length; ++Q) UhB(B[Q], {
                cert: A
            });
            A.extensions = B
        }, A.getExtension = function(B) {
            if (typeof B === "string") B = {
                name: B
            };
            var Q = null,
                Z;
            for (var D = 0; Q === null && D < A.extensions.length; ++D)
                if (Z = A.extensions[D], B.id && Z.id === B.id) Q = Z;
                else if (B.name && Z.name === B.name) Q = Z;
            return Q
        }, A.sign = function(B, Q) {
            A.md = Q || d9.md.sha1.create();
            var Z = z8[A.md.algorithm + "WithRSAEncryption"];
            if (!Z) {
                var D = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
                throw D.algorithm = A.md.algorithm, D
            }
            A.signatureOid = A.siginfo.algorithmOid = Z, A.tbsCertificate = $2.getTBSCertificate(A);
            var G = L1.toDer(A.tbsCertificate);
            A.md.update(G.getBytes()), A.signature = B.sign(A.md)
        }, A.verify = function(B) {
            var Q = !1;
            if (!A.issued(B)) {
                var Z = B.issuer,
                    D = A.subject,
                    G = new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");
                throw G.expectedIssuer = D.attributes, G.actualIssuer = Z.attributes, G
            }
            var F = B.md;
            if (F === null) {
                F = Ph1({
                    signatureOid: B.signatureOid,
                    type: "certificate"
                });
                var I = B.tbsCertificate || $2.getTBSCertificate(B),
                    Y = L1.toDer(I);
                F.update(Y.getBytes())
            }
            if (F !== null) Q = EhB({
                certificate: A,
                md: F,
                signature: B.signature
            });
            return Q
        }, A.isIssuer = function(B) {
            var Q = !1,
                Z = A.issuer,
                D = B.subject;
            if (Z.hash && D.hash) Q = Z.hash === D.hash;
            else if (Z.attributes.length === D.attributes.length) {
                Q = !0;
                var G, F;
                for (var I = 0; Q && I < Z.attributes.length; ++I)
                    if (G = Z.attributes[I], F = D.attributes[I], G.type !== F.type || G.value !== F.value) Q = !1
            }
            return Q
        }, A.issued = function(B) {
            return B.isIssuer(A)
        }, A.generateSubjectKeyIdentifier = function() {
            return $2.getPublicKeyFingerprint(A.publicKey, {
                type: "RSAPublicKey"
            })
        }, A.verifySubjectKeyIdentifier = function() {
            var B = z8.subjectKeyIdentifier;
            for (var Q = 0; Q < A.extensions.length; ++Q) {
                var Z = A.extensions[Q];
                if (Z.id === B) {
                    var D = A.generateSubjectKeyIdentifier().getBytes();
                    return d9.util.hexToBytes(Z.subjectKeyIdentifier) === D
                }
            }
            return !1
        }, A
    };
    $2.certificateFromAsn1 = function(A, B) {
        var Q = {},
            Z = [];
        if (!L1.validate(A, q$8, Q, Z)) {
            var D = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
            throw D.errors = Z, D
        }
        var G = L1.derToOid(Q.publicKeyOid);
        if (G !== $2.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
        var F = $2.createCertificate();
        F.version = Q.certVersion ? Q.certVersion.charCodeAt(0) : 0;
        var I = d9.util.createBuffer(Q.certSerialNumber);
        F.serialNumber = I.toHex(), F.signatureOid = d9.asn1.derToOid(Q.certSignatureOid), F.signatureParameters = Th1(F.signatureOid, Q.certSignatureParams, !0), F.siginfo.algorithmOid = d9.asn1.derToOid(Q.certinfoSignatureOid), F.siginfo.parameters = Th1(F.siginfo.algorithmOid, Q.certinfoSignatureParams, !1), F.signature = Q.certSignature;
        var Y = [];
        if (Q.certValidity1UTCTime !== void 0) Y.push(L1.utcTimeToDate(Q.certValidity1UTCTime));
        if (Q.certValidity2GeneralizedTime !== void 0) Y.push(L1.generalizedTimeToDate(Q.certValidity2GeneralizedTime));
        if (Q.certValidity3UTCTime !== void 0) Y.push(L1.utcTimeToDate(Q.certValidity3UTCTime));
        if (Q.certValidity4GeneralizedTime !== void 0) Y.push(L1.generalizedTimeToDate(Q.certValidity4GeneralizedTime));
        if (Y.length > 2) throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
        if (Y.length < 2) throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
        if (F.validity.notBefore = Y[0], F.validity.notAfter = Y[1], F.tbsCertificate = Q.tbsCertificate, B) {
            F.md = Ph1({
                signatureOid: F.signatureOid,
                type: "certificate"
            });
            var W = L1.toDer(F.tbsCertificate);
            F.md.update(W.getBytes())
        }
        var J = d9.md.sha1.create(),
            X = L1.toDer(Q.certIssuer);
        if (J.update(X.getBytes()), F.issuer.getField = function(K) {
                return Jb(F.issuer, K)
            }, F.issuer.addField = function(K) {
                $U([K]), F.issuer.attributes.push(K)
            }, F.issuer.attributes = $2.RDNAttributesAsArray(Q.certIssuer), Q.certIssuerUniqueId) F.issuer.uniqueId = Q.certIssuerUniqueId;
        F.issuer.hash = J.digest().toHex();
        var V = d9.md.sha1.create(),
            C = L1.toDer(Q.certSubject);
        if (V.update(C.getBytes()), F.subject.getField = function(K) {
                return Jb(F.subject, K)
            }, F.subject.addField = function(K) {
                $U([K]), F.subject.attributes.push(K)
            }, F.subject.attributes = $2.RDNAttributesAsArray(Q.certSubject), Q.certSubjectUniqueId) F.subject.uniqueId = Q.certSubjectUniqueId;
        if (F.subject.hash = V.digest().toHex(), Q.certExtensions) F.extensions = $2.certificateExtensionsFromAsn1(Q.certExtensions);
        else F.extensions = [];
        return F.publicKey = $2.publicKeyFromAsn1(Q.subjectPublicKeyInfo), F
    };
    $2.certificateExtensionsFromAsn1 = function(A) {
        var B = [];
        for (var Q = 0; Q < A.value.length; ++Q) {
            var Z = A.value[Q];
            for (var D = 0; D < Z.value.length; ++D) B.push($2.certificateExtensionFromAsn1(Z.value[D]))
        }
        return B
    };
    $2.certificateExtensionFromAsn1 = function(A) {
        var B = {};
        if (B.id = L1.derToOid(A.value[0].value), B.critical = !1, A.value[1].type === L1.Type.BOOLEAN) B.critical = A.value[1].value.charCodeAt(0) !== 0, B.value = A.value[2].value;
        else B.value = A.value[1].value;
        if (B.id in z8) {
            if (B.name = z8[B.id], B.name === "keyUsage") {
                var Q = L1.fromDer(B.value),
                    Z = 0,
                    D = 0;
                if (Q.value.length > 1) Z = Q.value.charCodeAt(1), D = Q.value.length > 2 ? Q.value.charCodeAt(2) : 0;
                B.digitalSignature = (Z & 128) === 128, B.nonRepudiation = (Z & 64) === 64, B.keyEncipherment = (Z & 32) === 32, B.dataEncipherment = (Z & 16) === 16, B.keyAgreement = (Z & 8) === 8, B.keyCertSign = (Z & 4) === 4, B.cRLSign = (Z & 2) === 2, B.encipherOnly = (Z & 1) === 1, B.decipherOnly = (D & 128) === 128
            } else if (B.name === "basicConstraints") {
                var Q = L1.fromDer(B.value);
                if (Q.value.length > 0 && Q.value[0].type === L1.Type.BOOLEAN) B.cA = Q.value[0].value.charCodeAt(0) !== 0;
                else B.cA = !1;
                var G = null;
                if (Q.value.length > 0 && Q.value[0].type === L1.Type.INTEGER) G = Q.value[0].value;
                else if (Q.value.length > 1) G = Q.value[1].value;
                if (G !== null) B.pathLenConstraint = L1.derToInteger(G)
            } else if (B.name === "extKeyUsage") {
                var Q = L1.fromDer(B.value);
                for (var F = 0; F < Q.value.length; ++F) {
                    var I = L1.derToOid(Q.value[F].value);
                    if (I in z8) B[z8[I]] = !0;
                    else B[I] = !0
                }
            } else if (B.name === "nsCertType") {
                var Q = L1.fromDer(B.value),
                    Z = 0;
                if (Q.value.length > 1) Z = Q.value.charCodeAt(1);
                B.client = (Z & 128) === 128, B.server = (Z & 64) === 64, B.email = (Z & 32) === 32, B.objsign = (Z & 16) === 16, B.reserved = (Z & 8) === 8, B.sslCA = (Z & 4) === 4, B.emailCA = (Z & 2) === 2, B.objCA = (Z & 1) === 1
            } else if (B.name === "subjectAltName" || B.name === "issuerAltName") {
                B.altNames = [];
                var Y, Q = L1.fromDer(B.value);
                for (var W = 0; W < Q.value.length; ++W) {
                    Y = Q.value[W];
                    var J = {
                        type: Y.type,
                        value: Y.value
                    };
                    switch (B.altNames.push(J), Y.type) {
                        case 1:
                        case 2:
                        case 6:
                            break;
                        case 7:
                            J.ip = d9.util.bytesToIP(Y.value);
                            break;
                        case 8:
                            J.oid = L1.derToOid(Y.value);
                            break;
                        default:
                    }
                }
            } else if (B.name === "subjectKeyIdentifier") {
                var Q = L1.fromDer(B.value);
                B.subjectKeyIdentifier = d9.util.bytesToHex(Q.value)
            }
        }
        return B
    };
    $2.certificationRequestFromAsn1 = function(A, B) {
        var Q = {},
            Z = [];
        if (!L1.validate(A, M$8, Q, Z)) {
            var D = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
            throw D.errors = Z, D
        }
        var G = L1.derToOid(Q.publicKeyOid);
        if (G !== $2.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
        var F = $2.createCertificationRequest();
        if (F.version = Q.csrVersion ? Q.csrVersion.charCodeAt(0) : 0, F.signatureOid = d9.asn1.derToOid(Q.csrSignatureOid), F.signatureParameters = Th1(F.signatureOid, Q.csrSignatureParams, !0), F.siginfo.algorithmOid = d9.asn1.derToOid(Q.csrSignatureOid), F.siginfo.parameters = Th1(F.siginfo.algorithmOid, Q.csrSignatureParams, !1), F.signature = Q.csrSignature, F.certificationRequestInfo = Q.certificationRequestInfo, B) {
            F.md = Ph1({
                signatureOid: F.signatureOid,
                type: "certification request"
            });
            var I = L1.toDer(F.certificationRequestInfo);
            F.md.update(I.getBytes())
        }
        var Y = d9.md.sha1.create();
        return F.subject.getField = function(W) {
            return Jb(F.subject, W)
        }, F.subject.addField = function(W) {
            $U([W]), F.subject.attributes.push(W)
        }, F.subject.attributes = $2.RDNAttributesAsArray(Q.certificationRequestInfoSubject, Y), F.subject.hash = Y.digest().toHex(), F.publicKey = $2.publicKeyFromAsn1(Q.subjectPublicKeyInfo), F.getAttribute = function(W) {
            return Jb(F, W)
        }, F.addAttribute = function(W) {
            $U([W]), F.attributes.push(W)
        }, F.attributes = $2.CRIAttributesAsArray(Q.certificationRequestInfoAttributes || []), F
    };
    $2.createCertificationRequest = function() {
        var A = {};
        return A.version = 0, A.signatureOid = null, A.signature = null, A.siginfo = {}, A.siginfo.algorithmOid = null, A.subject = {}, A.subject.getField = function(B) {
            return Jb(A.subject, B)
        }, A.subject.addField = function(B) {
            $U([B]), A.subject.attributes.push(B)
        }, A.subject.attributes = [], A.subject.hash = null, A.publicKey = null, A.attributes = [], A.getAttribute = function(B) {
            return Jb(A, B)
        }, A.addAttribute = function(B) {
            $U([B]), A.attributes.push(B)
        }, A.md = null, A.setSubject = function(B) {
            $U(B), A.subject.attributes = B, A.subject.hash = null
        }, A.setAttributes = function(B) {
            $U(B), A.attributes = B
        }, A.sign = function(B, Q) {
            A.md = Q || d9.md.sha1.create();
            var Z = z8[A.md.algorithm + "WithRSAEncryption"];
            if (!Z) {
                var D = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
                throw D.algorithm = A.md.algorithm, D
            }
            A.signatureOid = A.siginfo.algorithmOid = Z, A.certificationRequestInfo = $2.getCertificationRequestInfo(A);
            var G = L1.toDer(A.certificationRequestInfo);
            A.md.update(G.getBytes()), A.signature = B.sign(A.md)
        }, A.verify = function() {
            var B = !1,
                Q = A.md;
            if (Q === null) {
                Q = Ph1({
                    signatureOid: A.signatureOid,
                    type: "certification request"
                });
                var Z = A.certificationRequestInfo || $2.getCertificationRequestInfo(A),
                    D = L1.toDer(Z);
                Q.update(D.getBytes())
            }
            if (Q !== null) B = EhB({
                certificate: A,
                md: Q,
                signature: A.signature
            });
            return B
        }, A
    };

    function DA1(A) {
        var B = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []),
            Q, Z, D = A.attributes;
        for (var G = 0; G < D.length; ++G) {
            Q = D[G];
            var F = Q.value,
                I = L1.Type.PRINTABLESTRING;
            if ("valueTagClass" in Q) {
                if (I = Q.valueTagClass, I === L1.Type.UTF8) F = d9.util.encodeUtf8(F)
            }
            Z = L1.create(L1.Class.UNIVERSAL, L1.Type.SET, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(Q.type).getBytes()), L1.create(L1.Class.UNIVERSAL, I, !1, F)])]), B.value.push(Z)
        }
        return B
    }

    function $U(A) {
        var B;
        for (var Q = 0; Q < A.length; ++Q) {
            if (B = A[Q], typeof B.name === "undefined") {
                if (B.type && B.type in $2.oids) B.name = $2.oids[B.type];
                else if (B.shortName && B.shortName in OD) B.name = $2.oids[OD[B.shortName]]
            }
            if (typeof B.type === "undefined")
                if (B.name && B.name in $2.oids) B.type = $2.oids[B.name];
                else {
                    var Z = new Error("Attribute type not specified.");
                    throw Z.attribute = B, Z
                } if (typeof B.shortName === "undefined") {
                if (B.name && B.name in OD) B.shortName = OD[B.name]
            }
            if (B.type === z8.extensionRequest) {
                if (B.valueConstructed = !0, B.valueTagClass = L1.Type.SEQUENCE, !B.value && B.extensions) {
                    B.value = [];
                    for (var D = 0; D < B.extensions.length; ++D) B.value.push($2.certificateExtensionToAsn1(UhB(B.extensions[D])))
                }
            }
            if (typeof B.value === "undefined") {
                var Z = new Error("Attribute value not specified.");
                throw Z.attribute = B, Z
            }
        }
    }

    function UhB(A, B) {
        if (B = B || {}, typeof A.name === "undefined") {
            if (A.id && A.id in $2.oids) A.name = $2.oids[A.id]
        }
        if (typeof A.id === "undefined")
            if (A.name && A.name in $2.oids) A.id = $2.oids[A.name];
            else {
                var Q = new Error("Extension ID not specified.");
                throw Q.extension = A, Q
            } if (typeof A.value !== "undefined") return A;
        if (A.name === "keyUsage") {
            var Z = 0,
                D = 0,
                G = 0;
            if (A.digitalSignature) D |= 128, Z = 7;
            if (A.nonRepudiation) D |= 64, Z = 6;
            if (A.keyEncipherment) D |= 32, Z = 5;
            if (A.dataEncipherment) D |= 16, Z = 4;
            if (A.keyAgreement) D |= 8, Z = 3;
            if (A.keyCertSign) D |= 4, Z = 2;
            if (A.cRLSign) D |= 2, Z = 1;
            if (A.encipherOnly) D |= 1, Z = 0;
            if (A.decipherOnly) G |= 128, Z = 7;
            var F = String.fromCharCode(Z);
            if (G !== 0) F += String.fromCharCode(D) + String.fromCharCode(G);
            else if (D !== 0) F += String.fromCharCode(D);
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, F)
        } else if (A.name === "basicConstraints") {
            if (A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []), A.cA) A.value.value.push(L1.create(L1.Class.UNIVERSAL, L1.Type.BOOLEAN, !1, String.fromCharCode(255)));
            if ("pathLenConstraint" in A) A.value.value.push(L1.create(L1.Class.UNIVERSAL, L1.Type.INTEGER, !1, L1.integerToDer(A.pathLenConstraint).getBytes()))
        } else if (A.name === "extKeyUsage") {
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
            var I = A.value.value;
            for (var Y in A) {
                if (A[Y] !== !0) continue;
                if (Y in z8) I.push(L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(z8[Y]).getBytes()));
                else if (Y.indexOf(".") !== -1) I.push(L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(Y).getBytes()))
            }
        } else if (A.name === "nsCertType") {
            var Z = 0,
                D = 0;
            if (A.client) D |= 128, Z = 7;
            if (A.server) D |= 64, Z = 6;
            if (A.email) D |= 32, Z = 5;
            if (A.objsign) D |= 16, Z = 4;
            if (A.reserved) D |= 8, Z = 3;
            if (A.sslCA) D |= 4, Z = 2;
            if (A.emailCA) D |= 2, Z = 1;
            if (A.objCA) D |= 1, Z = 0;
            var F = String.fromCharCode(Z);
            if (D !== 0) F += String.fromCharCode(D);
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, F)
        } else if (A.name === "subjectAltName" || A.name === "issuerAltName") {
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
            var W;
            for (var J = 0; J < A.altNames.length; ++J) {
                W = A.altNames[J];
                var F = W.value;
                if (W.type === 7 && W.ip) {
                    if (F = d9.util.bytesFromIP(W.ip), F === null) {
                        var Q = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                        throw Q.extension = A, Q
                    }
                } else if (W.type === 8)
                    if (W.oid) F = L1.oidToDer(L1.oidToDer(W.oid));
                    else F = L1.oidToDer(F);
                A.value.value.push(L1.create(L1.Class.CONTEXT_SPECIFIC, W.type, !1, F))
            }
        } else if (A.name === "nsComment" && B.cert) {
            if (!/^[\x00-\x7F]*$/.test(A.comment) || A.comment.length < 1 || A.comment.length > 128) throw new Error('Invalid "nsComment" content.');
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.IA5STRING, !1, A.comment)
        } else if (A.name === "subjectKeyIdentifier" && B.cert) {
            var X = B.cert.generateSubjectKeyIdentifier();
            A.subjectKeyIdentifier = X.toHex(), A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.OCTETSTRING, !1, X.getBytes())
        } else if (A.name === "authorityKeyIdentifier" && B.cert) {
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
            var I = A.value.value;
            if (A.keyIdentifier) {
                var V = A.keyIdentifier === !0 ? B.cert.generateSubjectKeyIdentifier().getBytes() : A.keyIdentifier;
                I.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !1, V))
            }
            if (A.authorityCertIssuer) {
                var C = [L1.create(L1.Class.CONTEXT_SPECIFIC, 4, !0, [DA1(A.authorityCertIssuer === !0 ? B.cert.issuer : A.authorityCertIssuer)])];
                I.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 1, !0, C))
            }
            if (A.serialNumber) {
                var K = d9.util.hexToBytes(A.serialNumber === !0 ? B.cert.serialNumber : A.serialNumber);
                I.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 2, !1, K))
            }
        } else if (A.name === "cRLDistributionPoints") {
            A.value = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
            var I = A.value.value,
                H = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []),
                z = L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !0, []),
                W;
            for (var J = 0; J < A.altNames.length; ++J) {
                W = A.altNames[J];
                var F = W.value;
                if (W.type === 7 && W.ip) {
                    if (F = d9.util.bytesFromIP(W.ip), F === null) {
                        var Q = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                        throw Q.extension = A, Q
                    }
                } else if (W.type === 8)
                    if (W.oid) F = L1.oidToDer(L1.oidToDer(W.oid));
                    else F = L1.oidToDer(F);
                z.value.push(L1.create(L1.Class.CONTEXT_SPECIFIC, W.type, !1, F))
            }
            H.value.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !0, [z])), I.push(H)
        }
        if (typeof A.value === "undefined") {
            var Q = new Error("Extension value not specified.");
            throw Q.extension = A, Q
        }
        return A
    }

    function JO0(A, B) {
        switch (A) {
            case z8["RSASSA-PSS"]:
                var Q = [];
                if (B.hash.algorithmOid !== void 0) Q.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(B.hash.algorithmOid).getBytes()), L1.create(L1.Class.UNIVERSAL, L1.Type.NULL, !1, "")])]));
                if (B.mgf.algorithmOid !== void 0) Q.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 1, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(B.mgf.algorithmOid).getBytes()), L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(B.mgf.hash.algorithmOid).getBytes()), L1.create(L1.Class.UNIVERSAL, L1.Type.NULL, !1, "")])])]));
                if (B.saltLength !== void 0) Q.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 2, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.INTEGER, !1, L1.integerToDer(B.saltLength).getBytes())]));
                return L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, Q);
            default:
                return L1.create(L1.Class.UNIVERSAL, L1.Type.NULL, !1, "")
        }
    }

    function R$8(A) {
        var B = L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !0, []);
        if (A.attributes.length === 0) return B;
        var Q = A.attributes;
        for (var Z = 0; Z < Q.length; ++Z) {
            var D = Q[Z],
                G = D.value,
                F = L1.Type.UTF8;
            if ("valueTagClass" in D) F = D.valueTagClass;
            if (F === L1.Type.UTF8) G = d9.util.encodeUtf8(G);
            var I = !1;
            if ("valueConstructed" in D) I = D.valueConstructed;
            var Y = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(D.type).getBytes()), L1.create(L1.Class.UNIVERSAL, L1.Type.SET, !0, [L1.create(L1.Class.UNIVERSAL, F, I, G)])]);
            B.value.push(Y)
        }
        return B
    }
    var O$8 = new Date("1950-01-01T00:00:00Z"),
        T$8 = new Date("2050-01-01T00:00:00Z");

    function HhB(A) {
        if (A >= O$8 && A < T$8) return L1.create(L1.Class.UNIVERSAL, L1.Type.UTCTIME, !1, L1.dateToUtcTime(A));
        else return L1.create(L1.Class.UNIVERSAL, L1.Type.GENERALIZEDTIME, !1, L1.dateToGeneralizedTime(A))
    }
    $2.getTBSCertificate = function(A) {
        var B = HhB(A.validity.notBefore),
            Q = HhB(A.validity.notAfter),
            Z = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.CONTEXT_SPECIFIC, 0, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.INTEGER, !1, L1.integerToDer(A.version).getBytes())]), L1.create(L1.Class.UNIVERSAL, L1.Type.INTEGER, !1, d9.util.hexToBytes(A.serialNumber)), L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(A.siginfo.algorithmOid).getBytes()), JO0(A.siginfo.algorithmOid, A.siginfo.parameters)]), DA1(A.issuer), L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [B, Q]), DA1(A.subject), $2.publicKeyToAsn1(A.publicKey)]);
        if (A.issuer.uniqueId) Z.value.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 1, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, String.fromCharCode(0) + A.issuer.uniqueId)]));
        if (A.subject.uniqueId) Z.value.push(L1.create(L1.Class.CONTEXT_SPECIFIC, 2, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, String.fromCharCode(0) + A.subject.uniqueId)]));
        if (A.extensions.length > 0) Z.value.push($2.certificateExtensionsToAsn1(A.extensions));
        return Z
    };
    $2.getCertificationRequestInfo = function(A) {
        var B = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.INTEGER, !1, L1.integerToDer(A.version).getBytes()), DA1(A.subject), $2.publicKeyToAsn1(A.publicKey), R$8(A)]);
        return B
    };
    $2.distinguishedNameToAsn1 = function(A) {
        return DA1(A)
    };
    $2.certificateToAsn1 = function(A) {
        var B = A.tbsCertificate || $2.getTBSCertificate(A);
        return L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [B, L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(A.signatureOid).getBytes()), JO0(A.signatureOid, A.signatureParameters)]), L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, String.fromCharCode(0) + A.signature)])
    };
    $2.certificateExtensionsToAsn1 = function(A) {
        var B = L1.create(L1.Class.CONTEXT_SPECIFIC, 3, !0, []),
            Q = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
        B.value.push(Q);
        for (var Z = 0; Z < A.length; ++Z) Q.value.push($2.certificateExtensionToAsn1(A[Z]));
        return B
    };
    $2.certificateExtensionToAsn1 = function(A) {
        var B = L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, []);
        if (B.value.push(L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(A.id).getBytes())), A.critical) B.value.push(L1.create(L1.Class.UNIVERSAL, L1.Type.BOOLEAN, !1, String.fromCharCode(255)));
        var Q = A.value;
        if (typeof A.value !== "string") Q = L1.toDer(Q).getBytes();
        return B.value.push(L1.create(L1.Class.UNIVERSAL, L1.Type.OCTETSTRING, !1, Q)), B
    };
    $2.certificationRequestToAsn1 = function(A) {
        var B = A.certificationRequestInfo || $2.getCertificationRequestInfo(A);
        return L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [B, L1.create(L1.Class.UNIVERSAL, L1.Type.SEQUENCE, !0, [L1.create(L1.Class.UNIVERSAL, L1.Type.OID, !1, L1.oidToDer(A.signatureOid).getBytes()), JO0(A.signatureOid, A.signatureParameters)]), L1.create(L1.Class.UNIVERSAL, L1.Type.BITSTRING, !1, String.fromCharCode(0) + A.signature)])
    };
    $2.createCaStore = function(A) {
        var B = {
            certs: {}
        };
        B.getIssuer = function(F) {
            var I = Q(F.issuer);
            return I
        }, B.addCertificate = function(F) {
            if (typeof F === "string") F = d9.pki.certificateFromPem(F);
            if (Z(F.subject), !B.hasCertificate(F))
                if (F.subject.hash in B.certs) {
                    var I = B.certs[F.subject.hash];
                    if (!d9.util.isArray(I)) I = [I];
                    I.push(F), B.certs[F.subject.hash] = I
                } else B.certs[F.subject.hash] = F
        }, B.hasCertificate = function(F) {
            if (typeof F === "string") F = d9.pki.certificateFromPem(F);
            var I = Q(F.subject);
            if (!I) return !1;
            if (!d9.util.isArray(I)) I = [I];
            var Y = L1.toDer($2.certificateToAsn1(F)).getBytes();
            for (var W = 0; W < I.length; ++W) {
                var J = L1.toDer($2.certificateToAsn1(I[W])).getBytes();
                if (Y === J) return !0
            }
            return !1
        }, B.listAllCertificates = function() {
            var F = [];
            for (var I in B.certs)
                if (B.certs.hasOwnProperty(I)) {
                    var Y = B.certs[I];
                    if (!d9.util.isArray(Y)) F.push(Y);
                    else
                        for (var W = 0; W < Y.length; ++W) F.push(Y[W])
                } return F
        }, B.removeCertificate = function(F) {
            var I;
            if (typeof F === "string") F = d9.pki.certificateFromPem(F);
            if (Z(F.subject), !B.hasCertificate(F)) return null;
            var Y = Q(F.subject);
            if (!d9.util.isArray(Y)) return I = B.certs[F.subject.hash], delete B.certs[F.subject.hash], I;
            var W = L1.toDer($2.certificateToAsn1(F)).getBytes();
            for (var J = 0; J < Y.length; ++J) {
                var X = L1.toDer($2.certificateToAsn1(Y[J])).getBytes();
                if (W === X) I = Y[J], Y.splice(J, 1)
            }
            if (Y.length === 0) delete B.certs[F.subject.hash];
            return I
        };

        function Q(F) {
            return Z(F), B.certs[F.hash] || null
        }

        function Z(F) {
            if (!F.hash) {
                var I = d9.md.sha1.create();
                F.attributes = $2.RDNAttributesAsArray(DA1(F), I), F.hash = I.digest().toHex()
            }
        }
        if (A)
            for (var D = 0; D < A.length; ++D) {
                var G = A[D];
                B.addCertificate(G)
            }
        return B
    };
    $2.certificateError = {
        bad_certificate: "forge.pki.BadCertificate",
        unsupported_certificate: "forge.pki.UnsupportedCertificate",
        certificate_revoked: "forge.pki.CertificateRevoked",
        certificate_expired: "forge.pki.CertificateExpired",
        certificate_unknown: "forge.pki.CertificateUnknown",
        unknown_ca: "forge.pki.UnknownCertificateAuthority"
    };
    $2.verifyCertificateChain = function(A, B, Q) {
        if (typeof Q === "function") Q = {
            verify: Q
        };
        Q = Q || {}, B = B.slice(0);
        var Z = B.slice(0),
            D = Q.validityCheckDate;
        if (typeof D === "undefined") D = new Date;
        var G = !0,
            F = null,
            I = 0;
        do {
            var Y = B.shift(),
                W = null,
                J = !1;
            if (D) {
                if (D < Y.validity.notBefore || D > Y.validity.notAfter) F = {
                    message: "Certificate is not valid yet or has expired.",
                    error: $2.certificateError.certificate_expired,
                    notBefore: Y.validity.notBefore,
                    notAfter: Y.validity.notAfter,
                    now: D
                }
            }
            if (F === null) {
                if (W = B[0] || A.getIssuer(Y), W === null) {
                    if (Y.isIssuer(Y)) J = !0, W = Y
                }
                if (W) {
                    var X = W;
                    if (!d9.util.isArray(X)) X = [X];
                    var V = !1;
                    while (!V && X.length > 0) {
                        W = X.shift();
                        try {
                            V = W.verify(Y)
                        } catch (O) {}
                    }
                    if (!V) F = {
                        message: "Certificate signature is invalid.",
                        error: $2.certificateError.bad_certificate
                    }
                }
                if (F === null && (!W || J) && !A.hasCertificate(Y)) F = {
                    message: "Certificate is not trusted.",
                    error: $2.certificateError.unknown_ca
                }
            }
            if (F === null && W && !Y.isIssuer(W)) F = {
                message: "Certificate issuer is invalid.",
                error: $2.certificateError.bad_certificate
            };
            if (F === null) {
                var C = {
                    keyUsage: !0,
                    basicConstraints: !0
                };
                for (var K = 0; F === null && K < Y.extensions.length; ++K) {
                    var H = Y.extensions[K];
                    if (H.critical && !(H.name in C)) F = {
                        message: "Certificate has an unsupported critical extension.",
                        error: $2.certificateError.unsupported_certificate
                    }
                }
            }
            if (F === null && (!G || B.length === 0 && (!W || J))) {
                var z = Y.getExtension("basicConstraints"),
                    $ = Y.getExtension("keyUsage");
                if ($ !== null) {
                    if (!$.keyCertSign || z === null) F = {
                        message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
                        error: $2.certificateError.bad_certificate
                    }
                }
                if (F === null && z !== null && !z.cA) F = {
                    message: "Certificate basicConstraints indicates the certificate is not a CA.",
                    error: $2.certificateError.bad_certificate
                };
                if (F === null && $ !== null && "pathLenConstraint" in z) {
                    var L = I - 1;
                    if (L > z.pathLenConstraint) F = {
                        message: "Certificate basicConstraints pathLenConstraint violated.",
                        error: $2.certificateError.bad_certificate
                    }
                }
            }
            var N = F === null ? !0 : F.error,
                R = Q.verify ? Q.verify(N, I, Z) : N;
            if (R === !0) F = null;
            else {
                if (N === !0) F = {
                    message: "The application rejected the certificate.",
                    error: $2.certificateError.bad_certificate
                };
                if (R || R === 0) {
                    if (typeof R === "object" && !d9.util.isArray(R)) {
                        if (R.message) F.message = R.message;
                        if (R.error) F.error = R.error
                    } else if (typeof R === "string") F.error = R
                }
                throw F
            }
            G = !1, ++I
        } while (B.length > 0);
        return !0
    }
});