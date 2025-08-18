/* chunk:485 bytes:[11587091, 11648328) size:61237 source:unpacked-cli.js */
var $O0 = E(($y3, jhB) => {
    var vA = j4();
    t$();
    o01();
    Hh1();
    ud();
    KO0();
    EU();
    BA1();
    b8();
    var yh1 = function(A, B, Q, Z) {
            var D = vA.util.createBuffer(),
                G = A.length >> 1,
                F = G + (A.length & 1),
                I = A.substr(0, F),
                Y = A.substr(G, F),
                W = vA.util.createBuffer(),
                J = vA.hmac.create();
            Q = B + Q;
            var X = Math.ceil(Z / 16),
                V = Math.ceil(Z / 20);
            J.start("MD5", I);
            var C = vA.util.createBuffer();
            W.putBytes(Q);
            for (var K = 0; K < X; ++K) J.start(null, null), J.update(W.getBytes()), W.putBuffer(J.digest()), J.start(null, null), J.update(W.bytes() + Q), C.putBuffer(J.digest());
            J.start("SHA1", Y);
            var H = vA.util.createBuffer();
            W.clear(), W.putBytes(Q);
            for (var K = 0; K < V; ++K) J.start(null, null), J.update(W.getBytes()), W.putBuffer(J.digest()), J.start(null, null), J.update(W.bytes() + Q), H.putBuffer(J.digest());
            return D.putBytes(vA.util.xorBytes(C.getBytes(), H.getBytes(), Z)), D
        },
        b$8 = function(A, B, Q) {
            var Z = vA.hmac.create();
            Z.start("SHA1", A);
            var D = vA.util.createBuffer();
            return D.putInt32(B[0]), D.putInt32(B[1]), D.putByte(Q.type), D.putByte(Q.version.major), D.putByte(Q.version.minor), D.putInt16(Q.length), D.putBytes(Q.fragment.bytes()), Z.update(D.getBytes()), Z.digest().getBytes()
        },
        f$8 = function(A, B, Q) {
            var Z = !1;
            try {
                var D = A.deflate(B.fragment.getBytes());
                B.fragment = vA.util.createBuffer(D), B.length = D.length, Z = !0
            } catch (G) {}
            return Z
        },
        h$8 = function(A, B, Q) {
            var Z = !1;
            try {
                var D = A.inflate(B.fragment.getBytes());
                B.fragment = vA.util.createBuffer(D), B.length = D.length, Z = !0
            } catch (G) {}
            return Z
        },
        YH = function(A, B) {
            var Q = 0;
            switch (B) {
                case 1:
                    Q = A.getByte();
                    break;
                case 2:
                    Q = A.getInt16();
                    break;
                case 3:
                    Q = A.getInt24();
                    break;
                case 4:
                    Q = A.getInt32();
                    break
            }
            return vA.util.createBuffer(A.getBytes(Q))
        },
        qU = function(A, B, Q) {
            A.putInt(Q.length(), B << 3), A.putBuffer(Q)
        },
        T1 = {};
    T1.Versions = {
        TLS_1_0: {
            major: 3,
            minor: 1
        },
        TLS_1_1: {
            major: 3,
            minor: 2
        },
        TLS_1_2: {
            major: 3,
            minor: 3
        }
    };
    T1.SupportedVersions = [T1.Versions.TLS_1_1, T1.Versions.TLS_1_0];
    T1.Version = T1.SupportedVersions[0];
    T1.MaxFragment = 15360;
    T1.ConnectionEnd = {
        server: 0,
        client: 1
    };
    T1.PRFAlgorithm = {
        tls_prf_sha256: 0
    };
    T1.BulkCipherAlgorithm = {
        none: null,
        rc4: 0,
        des3: 1,
        aes: 2
    };
    T1.CipherType = {
        stream: 0,
        block: 1,
        aead: 2
    };
    T1.MACAlgorithm = {
        none: null,
        hmac_md5: 0,
        hmac_sha1: 1,
        hmac_sha256: 2,
        hmac_sha384: 3,
        hmac_sha512: 4
    };
    T1.CompressionMethod = {
        none: 0,
        deflate: 1
    };
    T1.ContentType = {
        change_cipher_spec: 20,
        alert: 21,
        handshake: 22,
        application_data: 23,
        heartbeat: 24
    };
    T1.HandshakeType = {
        hello_request: 0,
        client_hello: 1,
        server_hello: 2,
        certificate: 11,
        server_key_exchange: 12,
        certificate_request: 13,
        server_hello_done: 14,
        certificate_verify: 15,
        client_key_exchange: 16,
        finished: 20
    };
    T1.Alert = {};
    T1.Alert.Level = {
        warning: 1,
        fatal: 2
    };
    T1.Alert.Description = {
        close_notify: 0,
        unexpected_message: 10,
        bad_record_mac: 20,
        decryption_failed: 21,
        record_overflow: 22,
        decompression_failure: 30,
        handshake_failure: 40,
        bad_certificate: 42,
        unsupported_certificate: 43,
        certificate_revoked: 44,
        certificate_expired: 45,
        certificate_unknown: 46,
        illegal_parameter: 47,
        unknown_ca: 48,
        access_denied: 49,
        decode_error: 50,
        decrypt_error: 51,
        export_restriction: 60,
        protocol_version: 70,
        insufficient_security: 71,
        internal_error: 80,
        user_canceled: 90,
        no_renegotiation: 100
    };
    T1.HeartbeatMessageType = {
        heartbeat_request: 1,
        heartbeat_response: 2
    };
    T1.CipherSuites = {};
    T1.getCipherSuite = function(A) {
        var B = null;
        for (var Q in T1.CipherSuites) {
            var Z = T1.CipherSuites[Q];
            if (Z.id[0] === A.charCodeAt(0) && Z.id[1] === A.charCodeAt(1)) {
                B = Z;
                break
            }
        }
        return B
    };
    T1.handleUnexpected = function(A, B) {
        var Q = !A.open && A.entity === T1.ConnectionEnd.client;
        if (!Q) A.error(A, {
            message: "Unexpected message. Received TLS record out of order.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.unexpected_message
            }
        })
    };
    T1.handleHelloRequest = function(A, B, Q) {
        if (!A.handshaking && A.handshakes > 0) T1.queue(A, T1.createAlert(A, {
            level: T1.Alert.Level.warning,
            description: T1.Alert.Description.no_renegotiation
        })), T1.flush(A);
        A.process()
    };
    T1.parseHelloMessage = function(A, B, Q) {
        var Z = null,
            D = A.entity === T1.ConnectionEnd.client;
        if (Q < 38) A.error(A, {
            message: D ? "Invalid ServerHello message. Message too short." : "Invalid ClientHello message. Message too short.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        else {
            var G = B.fragment,
                F = G.length();
            if (Z = {
                    version: {
                        major: G.getByte(),
                        minor: G.getByte()
                    },
                    random: vA.util.createBuffer(G.getBytes(32)),
                    session_id: YH(G, 1),
                    extensions: []
                }, D) Z.cipher_suite = G.getBytes(2), Z.compression_method = G.getByte();
            else Z.cipher_suites = YH(G, 2), Z.compression_methods = YH(G, 1);
            if (F = Q - (F - G.length()), F > 0) {
                var I = YH(G, 2);
                while (I.length() > 0) Z.extensions.push({
                    type: [I.getByte(), I.getByte()],
                    data: YH(I, 2)
                });
                if (!D)
                    for (var Y = 0; Y < Z.extensions.length; ++Y) {
                        var W = Z.extensions[Y];
                        if (W.type[0] === 0 && W.type[1] === 0) {
                            var J = YH(W.data, 2);
                            while (J.length() > 0) {
                                var X = J.getByte();
                                if (X !== 0) break;
                                A.session.extensions.server_name.serverNameList.push(YH(J, 2).getBytes())
                            }
                        }
                    }
            }
            if (A.session.version) {
                if (Z.version.major !== A.session.version.major || Z.version.minor !== A.session.version.minor) return A.error(A, {
                    message: "TLS version change is disallowed during renegotiation.",
                    send: !0,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.protocol_version
                    }
                })
            }
            if (D) A.session.cipherSuite = T1.getCipherSuite(Z.cipher_suite);
            else {
                var V = vA.util.createBuffer(Z.cipher_suites.bytes());
                while (V.length() > 0)
                    if (A.session.cipherSuite = T1.getCipherSuite(V.getBytes(2)), A.session.cipherSuite !== null) break
            }
            if (A.session.cipherSuite === null) return A.error(A, {
                message: "No cipher suites in common.",
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.handshake_failure
                },
                cipherSuite: vA.util.bytesToHex(Z.cipher_suite)
            });
            if (D) A.session.compressionMethod = Z.compression_method;
            else A.session.compressionMethod = T1.CompressionMethod.none
        }
        return Z
    };
    T1.createSecurityParameters = function(A, B) {
        var Q = A.entity === T1.ConnectionEnd.client,
            Z = B.random.bytes(),
            D = Q ? A.session.sp.client_random : Z,
            G = Q ? Z : T1.createRandom().getBytes();
        A.session.sp = {
            entity: A.entity,
            prf_algorithm: T1.PRFAlgorithm.tls_prf_sha256,
            bulk_cipher_algorithm: null,
            cipher_type: null,
            enc_key_length: null,
            block_length: null,
            fixed_iv_length: null,
            record_iv_length: null,
            mac_algorithm: null,
            mac_length: null,
            mac_key_length: null,
            compression_algorithm: A.session.compressionMethod,
            pre_master_secret: null,
            master_secret: null,
            client_random: D,
            server_random: G
        }
    };
    T1.handleServerHello = function(A, B, Q) {
        var Z = T1.parseHelloMessage(A, B, Q);
        if (A.fail) return;
        if (Z.version.minor <= A.version.minor) A.version.minor = Z.version.minor;
        else return A.error(A, {
            message: "Incompatible TLS version.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.protocol_version
            }
        });
        A.session.version = A.version;
        var D = Z.session_id.bytes();
        if (D.length > 0 && D === A.session.id) A.expect = RhB, A.session.resuming = !0, A.session.sp.server_random = Z.random.bytes();
        else A.expect = u$8, A.session.resuming = !1, T1.createSecurityParameters(A, Z);
        A.session.id = D, A.process()
    };
    T1.handleClientHello = function(A, B, Q) {
        var Z = T1.parseHelloMessage(A, B, Q);
        if (A.fail) return;
        var D = Z.session_id.bytes(),
            G = null;
        if (A.sessionCache) {
            if (G = A.sessionCache.getSession(D), G === null) D = "";
            else if (G.version.major !== Z.version.major || G.version.minor > Z.version.minor) G = null, D = ""
        }
        if (D.length === 0) D = vA.random.getBytes(32);
        if (A.session.id = D, A.session.clientHelloVersion = Z.version, A.session.sp = {}, G) A.version = A.session.version = G.version, A.session.sp = G.sp;
        else {
            var F;
            for (var I = 1; I < T1.SupportedVersions.length; ++I)
                if (F = T1.SupportedVersions[I], F.minor <= Z.version.minor) break;
            A.version = {
                major: F.major,
                minor: F.minor
            }, A.session.version = A.version
        }
        if (G !== null) A.expect = UO0, A.session.resuming = !0, A.session.sp.client_random = Z.random.bytes();
        else A.expect = A.verifyClient !== !1 ? n$8 : EO0, A.session.resuming = !1, T1.createSecurityParameters(A, Z);
        if (A.open = !0, T1.queue(A, T1.createRecord(A, {
                type: T1.ContentType.handshake,
                data: T1.createServerHello(A)
            })), A.session.resuming) T1.queue(A, T1.createRecord(A, {
            type: T1.ContentType.change_cipher_spec,
            data: T1.createChangeCipherSpec()
        })), A.state.pending = T1.createConnectionState(A), A.state.current.write = A.state.pending.write, T1.queue(A, T1.createRecord(A, {
            type: T1.ContentType.handshake,
            data: T1.createFinished(A)
        }));
        else if (T1.queue(A, T1.createRecord(A, {
                type: T1.ContentType.handshake,
                data: T1.createCertificate(A)
            })), !A.fail) {
            if (T1.queue(A, T1.createRecord(A, {
                    type: T1.ContentType.handshake,
                    data: T1.createServerKeyExchange(A)
                })), A.verifyClient !== !1) T1.queue(A, T1.createRecord(A, {
                type: T1.ContentType.handshake,
                data: T1.createCertificateRequest(A)
            }));
            T1.queue(A, T1.createRecord(A, {
                type: T1.ContentType.handshake,
                data: T1.createServerHelloDone(A)
            }))
        }
        T1.flush(A), A.process()
    };
    T1.handleCertificate = function(A, B, Q) {
        if (Q < 3) return A.error(A, {
            message: "Invalid Certificate message. Message too short.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        var Z = B.fragment,
            D = {
                certificate_list: YH(Z, 3)
            },
            G, F, I = [];
        try {
            while (D.certificate_list.length() > 0) G = YH(D.certificate_list, 3), F = vA.asn1.fromDer(G), G = vA.pki.certificateFromAsn1(F, !0), I.push(G)
        } catch (W) {
            return A.error(A, {
                message: "Could not parse certificate list.",
                cause: W,
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.bad_certificate
                }
            })
        }
        var Y = A.entity === T1.ConnectionEnd.client;
        if ((Y || A.verifyClient === !0) && I.length === 0) A.error(A, {
            message: Y ? "No server certificate provided." : "No client certificate provided.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        else if (I.length === 0) A.expect = Y ? LhB : EO0;
        else {
            if (Y) A.session.serverCertificate = I[0];
            else A.session.clientCertificate = I[0];
            if (T1.verifyCertificateChain(A, I)) A.expect = Y ? LhB : EO0
        }
        A.process()
    };
    T1.handleServerKeyExchange = function(A, B, Q) {
        if (Q > 0) return A.error(A, {
            message: "Invalid key parameters. Only RSA is supported.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.unsupported_certificate
            }
        });
        A.expect = m$8, A.process()
    };
    T1.handleClientKeyExchange = function(A, B, Q) {
        if (Q < 48) return A.error(A, {
            message: "Invalid key parameters. Only RSA is supported.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.unsupported_certificate
            }
        });
        var Z = B.fragment,
            D = {
                enc_pre_master_secret: YH(Z, 2).getBytes()
            },
            G = null;
        if (A.getPrivateKey) try {
            G = A.getPrivateKey(A, A.session.serverCertificate), G = vA.pki.privateKeyFromPem(G)
        } catch (Y) {
            A.error(A, {
                message: "Could not get private key.",
                cause: Y,
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.internal_error
                }
            })
        }
        if (G === null) return A.error(A, {
            message: "No private key set.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.internal_error
            }
        });
        try {
            var F = A.session.sp;
            F.pre_master_secret = G.decrypt(D.enc_pre_master_secret);
            var I = A.session.clientHelloVersion;
            if (I.major !== F.pre_master_secret.charCodeAt(0) || I.minor !== F.pre_master_secret.charCodeAt(1)) throw new Error("TLS version rollback attack detected.")
        } catch (Y) {
            F.pre_master_secret = vA.random.getBytes(48)
        }
        if (A.expect = UO0, A.session.clientCertificate !== null) A.expect = a$8;
        A.process()
    };
    T1.handleCertificateRequest = function(A, B, Q) {
        if (Q < 3) return A.error(A, {
            message: "Invalid CertificateRequest. Message too short.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        var Z = B.fragment,
            D = {
                certificate_types: YH(Z, 1),
                certificate_authorities: YH(Z, 2)
            };
        A.session.certificateRequest = D, A.expect = d$8, A.process()
    };
    T1.handleCertificateVerify = function(A, B, Q) {
        if (Q < 2) return A.error(A, {
            message: "Invalid CertificateVerify. Message too short.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        var Z = B.fragment;
        Z.read -= 4;
        var D = Z.bytes();
        Z.read += 4;
        var G = {
                signature: YH(Z, 2).getBytes()
            },
            F = vA.util.createBuffer();
        F.putBuffer(A.session.md5.digest()), F.putBuffer(A.session.sha1.digest()), F = F.getBytes();
        try {
            var I = A.session.clientCertificate;
            if (!I.publicKey.verify(F, G.signature, "NONE")) throw new Error("CertificateVerify signature does not match.");
            A.session.md5.update(D), A.session.sha1.update(D)
        } catch (Y) {
            return A.error(A, {
                message: "Bad signature in CertificateVerify.",
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.handshake_failure
                }
            })
        }
        A.expect = UO0, A.process()
    };
    T1.handleServerHelloDone = function(A, B, Q) {
        if (Q > 0) return A.error(A, {
            message: "Invalid ServerHelloDone message. Invalid length.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.record_overflow
            }
        });
        if (A.serverCertificate === null) {
            var Z = {
                    message: "No server certificate provided. Not enough security.",
                    send: !0,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.insufficient_security
                    }
                },
                D = 0,
                G = A.verify(A, Z.alert.description, D, []);
            if (G !== !0) {
                if (G || G === 0) {
                    if (typeof G === "object" && !vA.util.isArray(G)) {
                        if (G.message) Z.message = G.message;
                        if (G.alert) Z.alert.description = G.alert
                    } else if (typeof G === "number") Z.alert.description = G
                }
                return A.error(A, Z)
            }
        }
        if (A.session.certificateRequest !== null) B = T1.createRecord(A, {
            type: T1.ContentType.handshake,
            data: T1.createCertificate(A)
        }), T1.queue(A, B);
        B = T1.createRecord(A, {
            type: T1.ContentType.handshake,
            data: T1.createClientKeyExchange(A)
        }), T1.queue(A, B), A.expect = p$8;
        var F = function(I, Y) {
            if (I.session.certificateRequest !== null && I.session.clientCertificate !== null) T1.queue(I, T1.createRecord(I, {
                type: T1.ContentType.handshake,
                data: T1.createCertificateVerify(I, Y)
            }));
            T1.queue(I, T1.createRecord(I, {
                type: T1.ContentType.change_cipher_spec,
                data: T1.createChangeCipherSpec()
            })), I.state.pending = T1.createConnectionState(I), I.state.current.write = I.state.pending.write, T1.queue(I, T1.createRecord(I, {
                type: T1.ContentType.handshake,
                data: T1.createFinished(I)
            })), I.expect = RhB, T1.flush(I), I.process()
        };
        if (A.session.certificateRequest === null || A.session.clientCertificate === null) return F(A, null);
        T1.getClientSignature(A, F)
    };
    T1.handleChangeCipherSpec = function(A, B) {
        if (B.fragment.getByte() !== 1) return A.error(A, {
            message: "Invalid ChangeCipherSpec message received.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.illegal_parameter
            }
        });
        var Q = A.entity === T1.ConnectionEnd.client;
        if (A.session.resuming && Q || !A.session.resuming && !Q) A.state.pending = T1.createConnectionState(A);
        if (A.state.current.read = A.state.pending.read, !A.session.resuming && Q || A.session.resuming && !Q) A.state.pending = null;
        A.expect = Q ? c$8 : s$8, A.process()
    };
    T1.handleFinished = function(A, B, Q) {
        var Z = B.fragment;
        Z.read -= 4;
        var D = Z.bytes();
        Z.read += 4;
        var G = B.fragment.getBytes();
        Z = vA.util.createBuffer(), Z.putBuffer(A.session.md5.digest()), Z.putBuffer(A.session.sha1.digest());
        var F = A.entity === T1.ConnectionEnd.client,
            I = F ? "server finished" : "client finished",
            Y = A.session.sp,
            W = 12,
            J = yh1;
        if (Z = J(Y.master_secret, I, Z.getBytes(), W), Z.getBytes() !== G) return A.error(A, {
            message: "Invalid verify_data in Finished message.",
            send: !0,
            alert: {
                level: T1.Alert.Level.fatal,
                description: T1.Alert.Description.decrypt_error
            }
        });
        if (A.session.md5.update(D), A.session.sha1.update(D), A.session.resuming && F || !A.session.resuming && !F) T1.queue(A, T1.createRecord(A, {
            type: T1.ContentType.change_cipher_spec,
            data: T1.createChangeCipherSpec()
        })), A.state.current.write = A.state.pending.write, A.state.pending = null, T1.queue(A, T1.createRecord(A, {
            type: T1.ContentType.handshake,
            data: T1.createFinished(A)
        }));
        A.expect = F ? l$8 : r$8, A.handshaking = !1, ++A.handshakes, A.peerCertificate = F ? A.session.serverCertificate : A.session.clientCertificate, T1.flush(A), A.isConnected = !0, A.connected(A), A.process()
    };
    T1.handleAlert = function(A, B) {
        var Q = B.fragment,
            Z = {
                level: Q.getByte(),
                description: Q.getByte()
            },
            D;
        switch (Z.description) {
            case T1.Alert.Description.close_notify:
                D = "Connection closed.";
                break;
            case T1.Alert.Description.unexpected_message:
                D = "Unexpected message.";
                break;
            case T1.Alert.Description.bad_record_mac:
                D = "Bad record MAC.";
                break;
            case T1.Alert.Description.decryption_failed:
                D = "Decryption failed.";
                break;
            case T1.Alert.Description.record_overflow:
                D = "Record overflow.";
                break;
            case T1.Alert.Description.decompression_failure:
                D = "Decompression failed.";
                break;
            case T1.Alert.Description.handshake_failure:
                D = "Handshake failure.";
                break;
            case T1.Alert.Description.bad_certificate:
                D = "Bad certificate.";
                break;
            case T1.Alert.Description.unsupported_certificate:
                D = "Unsupported certificate.";
                break;
            case T1.Alert.Description.certificate_revoked:
                D = "Certificate revoked.";
                break;
            case T1.Alert.Description.certificate_expired:
                D = "Certificate expired.";
                break;
            case T1.Alert.Description.certificate_unknown:
                D = "Certificate unknown.";
                break;
            case T1.Alert.Description.illegal_parameter:
                D = "Illegal parameter.";
                break;
            case T1.Alert.Description.unknown_ca:
                D = "Unknown certificate authority.";
                break;
            case T1.Alert.Description.access_denied:
                D = "Access denied.";
                break;
            case T1.Alert.Description.decode_error:
                D = "Decode error.";
                break;
            case T1.Alert.Description.decrypt_error:
                D = "Decrypt error.";
                break;
            case T1.Alert.Description.export_restriction:
                D = "Export restriction.";
                break;
            case T1.Alert.Description.protocol_version:
                D = "Unsupported protocol version.";
                break;
            case T1.Alert.Description.insufficient_security:
                D = "Insufficient security.";
                break;
            case T1.Alert.Description.internal_error:
                D = "Internal error.";
                break;
            case T1.Alert.Description.user_canceled:
                D = "User canceled.";
                break;
            case T1.Alert.Description.no_renegotiation:
                D = "Renegotiation not supported.";
                break;
            default:
                D = "Unknown error.";
                break
        }
        if (Z.description === T1.Alert.Description.close_notify) return A.close();
        A.error(A, {
            message: D,
            send: !1,
            origin: A.entity === T1.ConnectionEnd.client ? "server" : "client",
            alert: Z
        }), A.process()
    };
    T1.handleHandshake = function(A, B) {
        var Q = B.fragment,
            Z = Q.getByte(),
            D = Q.getInt24();
        if (D > Q.length()) return A.fragmented = B, B.fragment = vA.util.createBuffer(), Q.read -= 4, A.process();
        A.fragmented = null, Q.read -= 4;
        var G = Q.bytes(D + 4);
        if (Q.read += 4, Z in kh1[A.entity][A.expect]) {
            if (A.entity === T1.ConnectionEnd.server && !A.open && !A.fail) A.handshaking = !0, A.session = {
                version: null,
                extensions: {
                    server_name: {
                        serverNameList: []
                    }
                },
                cipherSuite: null,
                compressionMethod: null,
                serverCertificate: null,
                clientCertificate: null,
                md5: vA.md.md5.create(),
                sha1: vA.md.sha1.create()
            };
            if (Z !== T1.HandshakeType.hello_request && Z !== T1.HandshakeType.certificate_verify && Z !== T1.HandshakeType.finished) A.session.md5.update(G), A.session.sha1.update(G);
            kh1[A.entity][A.expect][Z](A, B, D)
        } else T1.handleUnexpected(A, B)
    };
    T1.handleApplicationData = function(A, B) {
        A.data.putBuffer(B.fragment), A.dataReady(A), A.process()
    };
    T1.handleHeartbeat = function(A, B) {
        var Q = B.fragment,
            Z = Q.getByte(),
            D = Q.getInt16(),
            G = Q.getBytes(D);
        if (Z === T1.HeartbeatMessageType.heartbeat_request) {
            if (A.handshaking || D > G.length) return A.process();
            T1.queue(A, T1.createRecord(A, {
                type: T1.ContentType.heartbeat,
                data: T1.createHeartbeat(T1.HeartbeatMessageType.heartbeat_response, G)
            })), T1.flush(A)
        } else if (Z === T1.HeartbeatMessageType.heartbeat_response) {
            if (G !== A.expectedHeartbeatPayload) return A.process();
            if (A.heartbeatReceived) A.heartbeatReceived(A, vA.util.createBuffer(G))
        }
        A.process()
    };
    var g$8 = 0,
        u$8 = 1,
        LhB = 2,
        m$8 = 3,
        d$8 = 4,
        RhB = 5,
        c$8 = 6,
        l$8 = 7,
        p$8 = 8,
        i$8 = 0,
        n$8 = 1,
        EO0 = 2,
        a$8 = 3,
        UO0 = 4,
        s$8 = 5,
        r$8 = 6,
        M1 = T1.handleUnexpected,
        OhB = T1.handleChangeCipherSpec,
        XW = T1.handleAlert,
        kX = T1.handleHandshake,
        ThB = T1.handleApplicationData,
        VW = T1.handleHeartbeat,
        wO0 = [];
    wO0[T1.ConnectionEnd.client] = [
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [OhB, XW, M1, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, ThB, VW],
        [M1, XW, kX, M1, VW]
    ];
    wO0[T1.ConnectionEnd.server] = [
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, M1, VW],
        [OhB, XW, M1, M1, VW],
        [M1, XW, kX, M1, VW],
        [M1, XW, kX, ThB, VW],
        [M1, XW, kX, M1, VW]
    ];
    var {
        handleHelloRequest: Vb,
        handleServerHello: o$8,
        handleCertificate: PhB,
        handleServerKeyExchange: MhB,
        handleCertificateRequest: HO0,
        handleServerHelloDone: jh1,
        handleFinished: ShB
    } = T1, kh1 = [];
    kh1[T1.ConnectionEnd.client] = [
        [M1, M1, o$8, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, PhB, MhB, HO0, jh1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, MhB, HO0, jh1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, HO0, jh1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, jh1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, ShB],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [Vb, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1]
    ];
    var {
        handleClientHello: t$8,
        handleClientKeyExchange: e$8,
        handleCertificateVerify: Aq8
    } = T1;
    kh1[T1.ConnectionEnd.server] = [
        [M1, t$8, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, PhB, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, e$8, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, Aq8, M1, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, ShB],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1],
        [M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1, M1]
    ];
    T1.generateKeys = function(A, B) {
        var Q = yh1,
            Z = B.client_random + B.server_random;
        if (!A.session.resuming) B.master_secret = Q(B.pre_master_secret, "master secret", Z, 48).bytes(), B.pre_master_secret = null;
        Z = B.server_random + B.client_random;
        var D = 2 * B.mac_key_length + 2 * B.enc_key_length,
            G = A.version.major === T1.Versions.TLS_1_0.major && A.version.minor === T1.Versions.TLS_1_0.minor;
        if (G) D += 2 * B.fixed_iv_length;
        var F = Q(B.master_secret, "key expansion", Z, D),
            I = {
                client_write_MAC_key: F.getBytes(B.mac_key_length),
                server_write_MAC_key: F.getBytes(B.mac_key_length),
                client_write_key: F.getBytes(B.enc_key_length),
                server_write_key: F.getBytes(B.enc_key_length)
            };
        if (G) I.client_write_IV = F.getBytes(B.fixed_iv_length), I.server_write_IV = F.getBytes(B.fixed_iv_length);
        return I
    };
    T1.createConnectionState = function(A) {
        var B = A.entity === T1.ConnectionEnd.client,
            Q = function() {
                var G = {
                    sequenceNumber: [0, 0],
                    macKey: null,
                    macLength: 0,
                    macFunction: null,
                    cipherState: null,
                    cipherFunction: function(F) {
                        return !0
                    },
                    compressionState: null,
                    compressFunction: function(F) {
                        return !0
                    },
                    updateSequenceNumber: function() {
                        if (G.sequenceNumber[1] === 4294967295) G.sequenceNumber[1] = 0, ++G.sequenceNumber[0];
                        else ++G.sequenceNumber[1]
                    }
                };
                return G
            },
            Z = {
                read: Q(),
                write: Q()
            };
        if (Z.read.update = function(G, F) {
                if (!Z.read.cipherFunction(F, Z.read)) G.error(G, {
                    message: "Could not decrypt record or bad MAC.",
                    send: !0,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.bad_record_mac
                    }
                });
                else if (!Z.read.compressFunction(G, F, Z.read)) G.error(G, {
                    message: "Could not decompress record.",
                    send: !0,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.decompression_failure
                    }
                });
                return !G.fail
            }, Z.write.update = function(G, F) {
                if (!Z.write.compressFunction(G, F, Z.write)) G.error(G, {
                    message: "Could not compress record.",
                    send: !1,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.internal_error
                    }
                });
                else if (!Z.write.cipherFunction(F, Z.write)) G.error(G, {
                    message: "Could not encrypt record.",
                    send: !1,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.internal_error
                    }
                });
                return !G.fail
            }, A.session) {
            var D = A.session.sp;
            switch (A.session.cipherSuite.initSecurityParameters(D), D.keys = T1.generateKeys(A, D), Z.read.macKey = B ? D.keys.server_write_MAC_key : D.keys.client_write_MAC_key, Z.write.macKey = B ? D.keys.client_write_MAC_key : D.keys.server_write_MAC_key, A.session.cipherSuite.initConnectionState(Z, A, D), D.compression_algorithm) {
                case T1.CompressionMethod.none:
                    break;
                case T1.CompressionMethod.deflate:
                    Z.read.compressFunction = h$8, Z.write.compressFunction = f$8;
                    break;
                default:
                    throw new Error("Unsupported compression algorithm.")
            }
        }
        return Z
    };
    T1.createRandom = function() {
        var A = new Date,
            B = +A + A.getTimezoneOffset() * 60000,
            Q = vA.util.createBuffer();
        return Q.putInt32(B), Q.putBytes(vA.random.getBytes(28)), Q
    };
    T1.createRecord = function(A, B) {
        if (!B.data) return null;
        var Q = {
            type: B.type,
            version: {
                major: A.version.major,
                minor: A.version.minor
            },
            length: B.data.length(),
            fragment: B.data
        };
        return Q
    };
    T1.createAlert = function(A, B) {
        var Q = vA.util.createBuffer();
        return Q.putByte(B.level), Q.putByte(B.description), T1.createRecord(A, {
            type: T1.ContentType.alert,
            data: Q
        })
    };
    T1.createClientHello = function(A) {
        A.session.clientHelloVersion = {
            major: A.version.major,
            minor: A.version.minor
        };
        var B = vA.util.createBuffer();
        for (var Q = 0; Q < A.cipherSuites.length; ++Q) {
            var Z = A.cipherSuites[Q];
            B.putByte(Z.id[0]), B.putByte(Z.id[1])
        }
        var D = B.length(),
            G = vA.util.createBuffer();
        G.putByte(T1.CompressionMethod.none);
        var F = G.length(),
            I = vA.util.createBuffer();
        if (A.virtualHost) {
            var Y = vA.util.createBuffer();
            Y.putByte(0), Y.putByte(0);
            var W = vA.util.createBuffer();
            W.putByte(0), qU(W, 2, vA.util.createBuffer(A.virtualHost));
            var J = vA.util.createBuffer();
            qU(J, 2, W), qU(Y, 2, J), I.putBuffer(Y)
        }
        var X = I.length();
        if (X > 0) X += 2;
        var V = A.session.id,
            C = V.length + 1 + 2 + 4 + 28 + 2 + D + 1 + F + X,
            K = vA.util.createBuffer();
        if (K.putByte(T1.HandshakeType.client_hello), K.putInt24(C), K.putByte(A.version.major), K.putByte(A.version.minor), K.putBytes(A.session.sp.client_random), qU(K, 1, vA.util.createBuffer(V)), qU(K, 2, B), qU(K, 1, G), X > 0) qU(K, 2, I);
        return K
    };
    T1.createServerHello = function(A) {
        var B = A.session.id,
            Q = B.length + 1 + 2 + 4 + 28 + 2 + 1,
            Z = vA.util.createBuffer();
        return Z.putByte(T1.HandshakeType.server_hello), Z.putInt24(Q), Z.putByte(A.version.major), Z.putByte(A.version.minor), Z.putBytes(A.session.sp.server_random), qU(Z, 1, vA.util.createBuffer(B)), Z.putByte(A.session.cipherSuite.id[0]), Z.putByte(A.session.cipherSuite.id[1]), Z.putByte(A.session.compressionMethod), Z
    };
    T1.createCertificate = function(A) {
        var B = A.entity === T1.ConnectionEnd.client,
            Q = null;
        if (A.getCertificate) {
            var Z;
            if (B) Z = A.session.certificateRequest;
            else Z = A.session.extensions.server_name.serverNameList;
            Q = A.getCertificate(A, Z)
        }
        var D = vA.util.createBuffer();
        if (Q !== null) try {
            if (!vA.util.isArray(Q)) Q = [Q];
            var G = null;
            for (var F = 0; F < Q.length; ++F) {
                var I = vA.pem.decode(Q[F])[0];
                if (I.type !== "CERTIFICATE" && I.type !== "X509 CERTIFICATE" && I.type !== "TRUSTED CERTIFICATE") {
                    var Y = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                    throw Y.headerType = I.type, Y
                }
                if (I.procType && I.procType.type === "ENCRYPTED") throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
                var W = vA.util.createBuffer(I.body);
                if (G === null) G = vA.asn1.fromDer(W.bytes(), !1);
                var J = vA.util.createBuffer();
                qU(J, 3, W), D.putBuffer(J)
            }
            if (Q = vA.pki.certificateFromAsn1(G), B) A.session.clientCertificate = Q;
            else A.session.serverCertificate = Q
        } catch (C) {
            return A.error(A, {
                message: "Could not send certificate list.",
                cause: C,
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.bad_certificate
                }
            })
        }
        var X = 3 + D.length(),
            V = vA.util.createBuffer();
        return V.putByte(T1.HandshakeType.certificate), V.putInt24(X), qU(V, 3, D), V
    };
    T1.createClientKeyExchange = function(A) {
        var B = vA.util.createBuffer();
        B.putByte(A.session.clientHelloVersion.major), B.putByte(A.session.clientHelloVersion.minor), B.putBytes(vA.random.getBytes(46));
        var Q = A.session.sp;
        Q.pre_master_secret = B.getBytes();
        var Z = A.session.serverCertificate.publicKey;
        B = Z.encrypt(Q.pre_master_secret);
        var D = B.length + 2,
            G = vA.util.createBuffer();
        return G.putByte(T1.HandshakeType.client_key_exchange), G.putInt24(D), G.putInt16(B.length), G.putBytes(B), G
    };
    T1.createServerKeyExchange = function(A) {
        var B = 0,
            Q = vA.util.createBuffer();
        if (B > 0) Q.putByte(T1.HandshakeType.server_key_exchange), Q.putInt24(B);
        return Q
    };
    T1.getClientSignature = function(A, B) {
        var Q = vA.util.createBuffer();
        Q.putBuffer(A.session.md5.digest()), Q.putBuffer(A.session.sha1.digest()), Q = Q.getBytes(), A.getSignature = A.getSignature || function(Z, D, G) {
            var F = null;
            if (Z.getPrivateKey) try {
                F = Z.getPrivateKey(Z, Z.session.clientCertificate), F = vA.pki.privateKeyFromPem(F)
            } catch (I) {
                Z.error(Z, {
                    message: "Could not get private key.",
                    cause: I,
                    send: !0,
                    alert: {
                        level: T1.Alert.Level.fatal,
                        description: T1.Alert.Description.internal_error
                    }
                })
            }
            if (F === null) Z.error(Z, {
                message: "No private key set.",
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: T1.Alert.Description.internal_error
                }
            });
            else D = F.sign(D, null);
            G(Z, D)
        }, A.getSignature(A, Q, B)
    };
    T1.createCertificateVerify = function(A, B) {
        var Q = B.length + 2,
            Z = vA.util.createBuffer();
        return Z.putByte(T1.HandshakeType.certificate_verify), Z.putInt24(Q), Z.putInt16(B.length), Z.putBytes(B), Z
    };
    T1.createCertificateRequest = function(A) {
        var B = vA.util.createBuffer();
        B.putByte(1);
        var Q = vA.util.createBuffer();
        for (var Z in A.caStore.certs) {
            var D = A.caStore.certs[Z],
                G = vA.pki.distinguishedNameToAsn1(D.subject),
                F = vA.asn1.toDer(G);
            Q.putInt16(F.length()), Q.putBuffer(F)
        }
        var I = 1 + B.length() + 2 + Q.length(),
            Y = vA.util.createBuffer();
        return Y.putByte(T1.HandshakeType.certificate_request), Y.putInt24(I), qU(Y, 1, B), qU(Y, 2, Q), Y
    };
    T1.createServerHelloDone = function(A) {
        var B = vA.util.createBuffer();
        return B.putByte(T1.HandshakeType.server_hello_done), B.putInt24(0), B
    };
    T1.createChangeCipherSpec = function() {
        var A = vA.util.createBuffer();
        return A.putByte(1), A
    };
    T1.createFinished = function(A) {
        var B = vA.util.createBuffer();
        B.putBuffer(A.session.md5.digest()), B.putBuffer(A.session.sha1.digest());
        var Q = A.entity === T1.ConnectionEnd.client,
            Z = A.session.sp,
            D = 12,
            G = yh1,
            F = Q ? "client finished" : "server finished";
        B = G(Z.master_secret, F, B.getBytes(), D);
        var I = vA.util.createBuffer();
        return I.putByte(T1.HandshakeType.finished), I.putInt24(B.length()), I.putBuffer(B), I
    };
    T1.createHeartbeat = function(A, B, Q) {
        if (typeof Q === "undefined") Q = B.length;
        var Z = vA.util.createBuffer();
        Z.putByte(A), Z.putInt16(Q), Z.putBytes(B);
        var D = Z.length(),
            G = Math.max(16, D - Q - 3);
        return Z.putBytes(vA.random.getBytes(G)), Z
    };
    T1.queue = function(A, B) {
        if (!B) return;
        if (B.fragment.length() === 0) {
            if (B.type === T1.ContentType.handshake || B.type === T1.ContentType.alert || B.type === T1.ContentType.change_cipher_spec) return
        }
        if (B.type === T1.ContentType.handshake) {
            var Q = B.fragment.bytes();
            A.session.md5.update(Q), A.session.sha1.update(Q), Q = null
        }
        var Z;
        if (B.fragment.length() <= T1.MaxFragment) Z = [B];
        else {
            Z = [];
            var D = B.fragment.bytes();
            while (D.length > T1.MaxFragment) Z.push(T1.createRecord(A, {
                type: B.type,
                data: vA.util.createBuffer(D.slice(0, T1.MaxFragment))
            })), D = D.slice(T1.MaxFragment);
            if (D.length > 0) Z.push(T1.createRecord(A, {
                type: B.type,
                data: vA.util.createBuffer(D)
            }))
        }
        for (var G = 0; G < Z.length && !A.fail; ++G) {
            var F = Z[G],
                I = A.state.current.write;
            if (I.update(A, F)) A.records.push(F)
        }
    };
    T1.flush = function(A) {
        for (var B = 0; B < A.records.length; ++B) {
            var Q = A.records[B];
            A.tlsData.putByte(Q.type), A.tlsData.putByte(Q.version.major), A.tlsData.putByte(Q.version.minor), A.tlsData.putInt16(Q.fragment.length()), A.tlsData.putBuffer(A.records[B].fragment)
        }
        return A.records = [], A.tlsDataReady(A)
    };
    var zO0 = function(A) {
            switch (A) {
                case !0:
                    return !0;
                case vA.pki.certificateError.bad_certificate:
                    return T1.Alert.Description.bad_certificate;
                case vA.pki.certificateError.unsupported_certificate:
                    return T1.Alert.Description.unsupported_certificate;
                case vA.pki.certificateError.certificate_revoked:
                    return T1.Alert.Description.certificate_revoked;
                case vA.pki.certificateError.certificate_expired:
                    return T1.Alert.Description.certificate_expired;
                case vA.pki.certificateError.certificate_unknown:
                    return T1.Alert.Description.certificate_unknown;
                case vA.pki.certificateError.unknown_ca:
                    return T1.Alert.Description.unknown_ca;
                default:
                    return T1.Alert.Description.bad_certificate
            }
        },
        Bq8 = function(A) {
            switch (A) {
                case !0:
                    return !0;
                case T1.Alert.Description.bad_certificate:
                    return vA.pki.certificateError.bad_certificate;
                case T1.Alert.Description.unsupported_certificate:
                    return vA.pki.certificateError.unsupported_certificate;
                case T1.Alert.Description.certificate_revoked:
                    return vA.pki.certificateError.certificate_revoked;
                case T1.Alert.Description.certificate_expired:
                    return vA.pki.certificateError.certificate_expired;
                case T1.Alert.Description.certificate_unknown:
                    return vA.pki.certificateError.certificate_unknown;
                case T1.Alert.Description.unknown_ca:
                    return vA.pki.certificateError.unknown_ca;
                default:
                    return vA.pki.certificateError.bad_certificate
            }
        };
    T1.verifyCertificateChain = function(A, B) {
        try {
            var Q = {};
            for (var Z in A.verifyOptions) Q[Z] = A.verifyOptions[Z];
            Q.verify = function(G, F, I) {
                var Y = zO0(G),
                    W = A.verify(A, G, F, I);
                if (W !== !0) {
                    if (typeof W === "object" && !vA.util.isArray(W)) {
                        var J = new Error("The application rejected the certificate.");
                        if (J.send = !0, J.alert = {
                                level: T1.Alert.Level.fatal,
                                description: T1.Alert.Description.bad_certificate
                            }, W.message) J.message = W.message;
                        if (W.alert) J.alert.description = W.alert;
                        throw J
                    }
                    if (W !== G) W = Bq8(W)
                }
                return W
            }, vA.pki.verifyCertificateChain(A.caStore, B, Q)
        } catch (G) {
            var D = G;
            if (typeof D !== "object" || vA.util.isArray(D)) D = {
                send: !0,
                alert: {
                    level: T1.Alert.Level.fatal,
                    description: zO0(G)
                }
            };
            if (!("send" in D)) D.send = !0;
            if (!("alert" in D)) D.alert = {
                level: T1.Alert.Level.fatal,
                description: zO0(D.error)
            };
            A.error(A, D)
        }
        return !A.fail
    };
    T1.createSessionCache = function(A, B) {
        var Q = null;
        if (A && A.getSession && A.setSession && A.order) Q = A;
        else {
            Q = {}, Q.cache = A || {}, Q.capacity = Math.max(B || 100, 1), Q.order = [];
            for (var Z in A)
                if (Q.order.length <= B) Q.order.push(Z);
                else delete A[Z];
            Q.getSession = function(D) {
                var G = null,
                    F = null;
                if (D) F = vA.util.bytesToHex(D);
                else if (Q.order.length > 0) F = Q.order[0];
                if (F !== null && F in Q.cache) {
                    G = Q.cache[F], delete Q.cache[F];
                    for (var I in Q.order)
                        if (Q.order[I] === F) {
                            Q.order.splice(I, 1);
                            break
                        }
                }
                return G
            }, Q.setSession = function(D, G) {
                if (Q.order.length === Q.capacity) {
                    var F = Q.order.shift();
                    delete Q.cache[F]
                }
                var F = vA.util.bytesToHex(D);
                Q.order.push(F), Q.cache[F] = G
            }
        }
        return Q
    };
    T1.createConnection = function(A) {
        var B = null;
        if (A.caStore)
            if (vA.util.isArray(A.caStore)) B = vA.pki.createCaStore(A.caStore);
            else B = A.caStore;
        else B = vA.pki.createCaStore();
        var Q = A.cipherSuites || null;
        if (Q === null) {
            Q = [];
            for (var Z in T1.CipherSuites) Q.push(T1.CipherSuites[Z])
        }
        var D = A.server ? T1.ConnectionEnd.server : T1.ConnectionEnd.client,
            G = A.sessionCache ? T1.createSessionCache(A.sessionCache) : null,
            F = {
                version: {
                    major: T1.Version.major,
                    minor: T1.Version.minor
                },
                entity: D,
                sessionId: A.sessionId,
                caStore: B,
                sessionCache: G,
                cipherSuites: Q,
                connected: A.connected,
                virtualHost: A.virtualHost || null,
                verifyClient: A.verifyClient || !1,
                verify: A.verify || function(J, X, V, C) {
                    return X
                },
                verifyOptions: A.verifyOptions || {},
                getCertificate: A.getCertificate || null,
                getPrivateKey: A.getPrivateKey || null,
                getSignature: A.getSignature || null,
                input: vA.util.createBuffer(),
                tlsData: vA.util.createBuffer(),
                data: vA.util.createBuffer(),
                tlsDataReady: A.tlsDataReady,
                dataReady: A.dataReady,
                heartbeatReceived: A.heartbeatReceived,
                closed: A.closed,
                error: function(J, X) {
                    if (X.origin = X.origin || (J.entity === T1.ConnectionEnd.client ? "client" : "server"), X.send) T1.queue(J, T1.createAlert(J, X.alert)), T1.flush(J);
                    var V = X.fatal !== !1;
                    if (V) J.fail = !0;
                    if (A.error(J, X), V) J.close(!1)
                },
                deflate: A.deflate || null,
                inflate: A.inflate || null
            };
        F.reset = function(J) {
            F.version = {
                major: T1.Version.major,
                minor: T1.Version.minor
            }, F.record = null, F.session = null, F.peerCertificate = null, F.state = {
                pending: null,
                current: null
            }, F.expect = F.entity === T1.ConnectionEnd.client ? g$8 : i$8, F.fragmented = null, F.records = [], F.open = !1, F.handshakes = 0, F.handshaking = !1, F.isConnected = !1, F.fail = !(J || typeof J === "undefined"), F.input.clear(), F.tlsData.clear(), F.data.clear(), F.state.current = T1.createConnectionState(F)
        }, F.reset();
        var I = function(J, X) {
                var V = X.type - T1.ContentType.change_cipher_spec,
                    C = wO0[J.entity][J.expect];
                if (V in C) C[V](J, X);
                else T1.handleUnexpected(J, X)
            },
            Y = function(J) {
                var X = 0,
                    V = J.input,
                    C = V.length();
                if (C < 5) X = 5 - C;
                else {
                    J.record = {
                        type: V.getByte(),
                        version: {
                            major: V.getByte(),
                            minor: V.getByte()
                        },
                        length: V.getInt16(),
                        fragment: vA.util.createBuffer(),
                        ready: !1
                    };
                    var K = J.record.version.major === J.version.major;
                    if (K && J.session && J.session.version) K = J.record.version.minor === J.version.minor;
                    if (!K) J.error(J, {
                        message: "Incompatible TLS version.",
                        send: !0,
                        alert: {
                            level: T1.Alert.Level.fatal,
                            description: T1.Alert.Description.protocol_version
                        }
                    })
                }
                return X
            },
            W = function(J) {
                var X = 0,
                    V = J.input,
                    C = V.length();
                if (C < J.record.length) X = J.record.length - C;
                else {
                    J.record.fragment.putBytes(V.getBytes(J.record.length)), V.compact();
                    var K = J.state.current.read;
                    if (K.update(J, J.record)) {
                        if (J.fragmented !== null)
                            if (J.fragmented.type === J.record.type) J.fragmented.fragment.putBuffer(J.record.fragment), J.record = J.fragmented;
                            else J.error(J, {
                                message: "Invalid fragmented record.",
                                send: !0,
                                alert: {
                                    level: T1.Alert.Level.fatal,
                                    description: T1.Alert.Description.unexpected_message
                                }
                            });
                        J.record.ready = !0
                    }
                }
                return X
            };
        return F.handshake = function(J) {
            if (F.entity !== T1.ConnectionEnd.client) F.error(F, {
                message: "Cannot initiate handshake as a server.",
                fatal: !1
            });
            else if (F.handshaking) F.error(F, {
                message: "Handshake already in progress.",
                fatal: !1
            });
            else {
                if (F.fail && !F.open && F.handshakes === 0) F.fail = !1;
                F.handshaking = !0, J = J || "";
                var X = null;
                if (J.length > 0) {
                    if (F.sessionCache) X = F.sessionCache.getSession(J);
                    if (X === null) J = ""
                }
                if (J.length === 0 && F.sessionCache) {
                    if (X = F.sessionCache.getSession(), X !== null) J = X.id
                }
                if (F.session = {
                        id: J,
                        version: null,
                        cipherSuite: null,
                        compressionMethod: null,
                        serverCertificate: null,
                        certificateRequest: null,
                        clientCertificate: null,
                        sp: {},
                        md5: vA.md.md5.create(),
                        sha1: vA.md.sha1.create()
                    }, X) F.version = X.version, F.session.sp = X.sp;
                F.session.sp.client_random = T1.createRandom().getBytes(), F.open = !0, T1.queue(F, T1.createRecord(F, {
                    type: T1.ContentType.handshake,
                    data: T1.createClientHello(F)
                })), T1.flush(F)
            }
        }, F.process = function(J) {
            var X = 0;
            if (J) F.input.putBytes(J);
            if (!F.fail) {
                if (F.record !== null && F.record.ready && F.record.fragment.isEmpty()) F.record = null;
                if (F.record === null) X = Y(F);
                if (!F.fail && F.record !== null && !F.record.ready) X = W(F);
                if (!F.fail && F.record !== null && F.record.ready) I(F, F.record)
            }
            return X
        }, F.prepare = function(J) {
            return T1.queue(F, T1.createRecord(F, {
                type: T1.ContentType.application_data,
                data: vA.util.createBuffer(J)
            })), T1.flush(F)
        }, F.prepareHeartbeatRequest = function(J, X) {
            if (J instanceof vA.util.ByteBuffer) J = J.bytes();
            if (typeof X === "undefined") X = J.length;
            return F.expectedHeartbeatPayload = J, T1.queue(F, T1.createRecord(F, {
                type: T1.ContentType.heartbeat,
                data: T1.createHeartbeat(T1.HeartbeatMessageType.heartbeat_request, J, X)
            })), T1.flush(F)
        }, F.close = function(J) {
            if (!F.fail && F.sessionCache && F.session) {
                var X = {
                    id: F.session.id,
                    version: F.session.version,
                    sp: F.session.sp
                };
                X.sp.keys = null, F.sessionCache.setSession(X.id, X)
            }
            if (F.open) {
                if (F.open = !1, F.input.clear(), F.isConnected || F.handshaking) F.isConnected = F.handshaking = !1, T1.queue(F, T1.createAlert(F, {
                    level: T1.Alert.Level.warning,
                    description: T1.Alert.Description.close_notify
                })), T1.flush(F);
                F.closed(F)
            }
            F.reset(J)
        }, F
    };
    jhB.exports = vA.tls = vA.tls || {};
    for (KI1 in T1)
        if (typeof T1[KI1] !== "function") vA.tls[KI1] = T1[KI1];
    var KI1;
    vA.tls.prf_tls1 = yh1;
    vA.tls.hmac_sha1 = b$8;
    vA.tls.createSessionCache = T1.createSessionCache;
    vA.tls.createConnection = T1.createConnection
});